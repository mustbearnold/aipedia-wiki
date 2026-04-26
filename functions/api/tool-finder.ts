// POST /api/tool-finder
// Given a user description of what they need, return 3-5 matching tools
// from the aipedia.wiki corpus with reasoning.
//
// Flow:
//   1. Turnstile CAPTCHA check (local-only bypass when secret is unset)
//   2. Rate limit per IP (D1 required outside local development)
//   3. Query Perplexity sonar-pro with the user's prompt + the wiki's
//      tool corpus as context, constrained to aipedia.wiki domain
//   4. Parse response → return array of {slug, title, reason, score}

interface Env {
  PERPLEXITY_API_KEY: string;
  TURNSTILE_SECRET_KEY?: string;
  DB?: D1Database; // optional — if present, used for rate limiting
  IP_HASH_SECRET?: string;
}

interface RequestBody {
  query: string;
  turnstile_token?: string;
}

interface ToolMatch {
  slug: string;
  title: string;
  reason: string;
  fit: number; // 1-10
}

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function isLocalRequest(request: Request): boolean {
  const host = new URL(request.url).hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

async function isKnownToolSlug(slug: string, request: Request): Promise<boolean> {
  const url = new URL(`/tools/${slug}/`, request.url).toString();
  const head = await fetch(url, { method: 'HEAD' }).catch(() => null);
  if (head?.ok) return true;
  if (head && head.status !== 405) return false;
  const get = await fetch(url, { method: 'GET' }).catch(() => null);
  return !!get?.ok;
}

async function verifyTurnstile(token: string, ip: string, secret: string, request: Request): Promise<boolean> {
  if (!secret) return isLocalRequest(request);
  if (!token) return false;
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  form.append('remoteip', ip);
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: form,
  });
  const data: any = await res.json();
  return !!data.success;
}

// Rate limit: track per-IP usage in D1 outside local development.
async function checkRateLimit(env: Env, ipHash: string, request: Request): Promise<boolean> {
  if (!env.DB) return isLocalRequest(request);
  try {
    await env.DB
      .prepare(
        `CREATE TABLE IF NOT EXISTS finder_usage (
          ip_hash TEXT NOT NULL,
          created_at INTEGER NOT NULL DEFAULT (unixepoch())
        )`,
      )
      .run();
    const recent = await env.DB
      .prepare(
        `SELECT COUNT(*) AS n FROM finder_usage
         WHERE ip_hash = ? AND created_at > unixepoch() - 86400`,
      )
      .bind(ipHash)
      .first<{ n: number }>();
    if ((recent?.n ?? 0) >= 20) return false;
    await env.DB.prepare('INSERT INTO finder_usage (ip_hash) VALUES (?)').bind(ipHash).run();
    return true;
  } catch {
    return false;
  }
}

const SYSTEM_PROMPT = `You are the aipedia.wiki Tool Finder. Your job is to recommend 3 to 5 AI tools from the aipedia.wiki catalog that best match what the user describes, with a short reason for each.

RULES:
- Only recommend tools that actually exist in the aipedia.wiki catalog (search the site to check)
- Rank by fit to the user's specific need, not generic popularity
- Be concrete: name the tool, mention the key differentiator and approximate pricing when supported by aipedia.wiki pages
- If the user's need is too vague, pick 3-5 category-leading tools and flag the ambiguity
- Never recommend retired products unless the aipedia.wiki page is explicitly about a retired product
- Use aipedia.wiki pages and citations for model, pricing, and feature facts. Do not invent current flagship versions or context windows.

OUTPUT FORMAT — strictly JSON, no prose wrapper:
{
  "matches": [
    {
      "slug": "exact-slug-as-in-url",
      "title": "Tool Name",
      "reason": "1-2 sentences on why this tool fits the user's specific need, citing a concrete differentiator and approximate price.",
      "fit": 9
    }
  ]
}

Slugs must be valid aipedia.wiki tool slugs. Fit is 1-10. Provide 3-5 matches.`;

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.PERPLEXITY_API_KEY) {
    return new Response(JSON.stringify({ error: 'finder_disabled', detail: 'PERPLEXITY_API_KEY not set' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    });
  }

  let payload: RequestBody;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }

  const query = (payload.query ?? '').trim();
  if (!query || query.length < 8 || query.length > 600) {
    return new Response(JSON.stringify({ error: 'validation_failed', detail: 'query must be 8-600 chars' }), { status: 400 });
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';

  const tsOk = await verifyTurnstile(payload.turnstile_token ?? '', ip, env.TURNSTILE_SECRET_KEY ?? '', request);
  if (!tsOk) {
    return new Response(JSON.stringify({ error: 'captcha_failed' }), { status: 403 });
  }

  const ipHash = await sha256(`${ip}|${env.IP_HASH_SECRET ?? ''}`);
  const underLimit = await checkRateLimit(env, ipHash, request);
  if (!underLimit) {
    return new Response(JSON.stringify({ error: 'rate_limited', detail: '20 queries per IP per day' }), { status: 429 });
  }

  // Call Perplexity sonar-pro with the user's query, constrained to aipedia.wiki
  // so it pulls from OUR catalog rather than random third-party lists.
  const pplxRes = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${env.PERPLEXITY_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'sonar-pro',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `User need: ${query}\n\nReturn 3-5 best-fit tools from aipedia.wiki as JSON.` },
      ],
      search_domain_filter: ['aipedia.wiki'],
      response_format: {
        type: 'json_schema',
        json_schema: {
          schema: {
            type: 'object',
            properties: {
              matches: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    slug: { type: 'string' },
                    title: { type: 'string' },
                    reason: { type: 'string' },
                    fit: { type: 'number' },
                  },
                  required: ['slug', 'title', 'reason', 'fit'],
                },
              },
            },
            required: ['matches'],
          },
        },
      },
    }),
  });

  if (!pplxRes.ok) {
    const body = await pplxRes.text().catch(() => '');
    return new Response(
      JSON.stringify({ error: 'upstream_failed', status: pplxRes.status, detail: body.slice(0, 300) }),
      { status: 502, headers: { 'content-type': 'application/json' } },
    );
  }

  const data: any = await pplxRes.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  let parsed: { matches?: ToolMatch[] };
  try {
    parsed = JSON.parse(content);
  } catch {
    return new Response(JSON.stringify({ error: 'parse_failed', detail: content.slice(0, 300) }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }

  const normalizedMatches = (parsed.matches ?? [])
    .filter((m) => m?.slug && m?.title && m?.reason && typeof m?.fit === 'number')
    .map((m) => ({
      slug: String(m.slug).toLowerCase().replace(/[^a-z0-9-]/g, ''),
      title: String(m.title).slice(0, 80),
      reason: String(m.reason).slice(0, 500),
      fit: Math.max(1, Math.min(10, Math.round(m.fit))),
    }))
    .slice(0, 5);

  const seen = new Set<string>();
  const matches: ToolMatch[] = [];
  for (const match of normalizedMatches) {
    if (!match.slug || seen.has(match.slug)) continue;
    seen.add(match.slug);
    if (await isKnownToolSlug(match.slug, request)) {
      matches.push(match);
    }
  }

  if (matches.length === 0) {
    return new Response(JSON.stringify({ error: 'no_valid_matches' }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }

  return new Response(
    JSON.stringify({ matches, citations: data.citations ?? [] }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
    },
  );
};
