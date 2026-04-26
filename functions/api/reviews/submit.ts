// POST /api/reviews/submit — accept a user review.
// Turnstile-verified, rate-limited, auto-queued as pending.

interface Env {
  DB: D1Database;
  TURNSTILE_SECRET_KEY: string;
  IP_HASH_SECRET: string;
}

interface ReviewBody {
  tool_slug: string;
  rating: number;
  title: string;
  body: string;
  author_name: string;
  author_email?: string;
  turnstile_token?: string;
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

function scoreSpam(title: string, body: string, name: string): number {
  const text = `${title} ${body} ${name}`.toLowerCase();
  let score = 0;
  const linkCount = (body.match(/https?:\/\//g) ?? []).length;
  if (linkCount >= 1) score += 0.3;
  if (linkCount >= 3) score += 0.4;
  if (/\b(viagra|casino|crypto pump|earn \$?\d{3,}|telegram\s?[@\-]|porn|xxx)\b/i.test(text)) score += 0.9;
  if (/[A-Z]{20,}/.test(title + body)) score += 0.2;
  if (body.length < 40) score += 0.2;
  if (body.length > 4000) score += 0.2;
  return Math.min(1, score);
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let payload: ReviewBody;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400 });
  }

  const { tool_slug, rating, title, body, author_name, author_email, turnstile_token } = payload;

  if (
    !tool_slug ||
    !/^[a-z0-9][a-z0-9-]{0,63}$/.test(tool_slug) ||
    typeof rating !== 'number' || rating < 1 || rating > 5 ||
    !title || title.length > 140 ||
    !body || body.length < 40 || body.length > 4000 ||
    !author_name || author_name.length > 80
  ) {
    return new Response(JSON.stringify({ error: 'validation_failed' }), { status: 400 });
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';
  const userAgent = request.headers.get('user-agent')?.slice(0, 200) ?? '';

  const tsOk = await verifyTurnstile(turnstile_token ?? '', ip, env.TURNSTILE_SECRET_KEY, request);
  if (!tsOk) {
    return new Response(JSON.stringify({ error: 'captcha_failed' }), { status: 403 });
  }

  const ipHash = await sha256(`${ip}|${env.IP_HASH_SECRET ?? ''}`);
  const emailHash = author_email ? await sha256(author_email.toLowerCase().trim()) : null;

  // Rate limit: max 3 pending-or-recent reviews per IP per 24h.
  const recent = await env.DB
    .prepare('SELECT COUNT(*) AS n FROM reviews WHERE ip_hash = ? AND created_at > unixepoch() - 86400')
    .bind(ipHash)
    .first<{ n: number }>();
  if ((recent?.n ?? 0) >= 3) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), { status: 429 });
  }

  // Dedupe: one review per IP per tool.
  const dup = await env.DB
    .prepare('SELECT 1 FROM reviews WHERE ip_hash = ? AND tool_slug = ? LIMIT 1')
    .bind(ipHash, tool_slug)
    .first();
  if (dup) {
    return new Response(JSON.stringify({ error: 'already_reviewed' }), { status: 409 });
  }

  const spamScore = scoreSpam(title, body, author_name);

  await env.DB
    .prepare(`INSERT INTO reviews
      (tool_slug, rating, title, body, author_name, author_email_hash, ip_hash, user_agent, spam_score, approved)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`)
    .bind(tool_slug, Math.round(rating), title, body, author_name, emailHash, ipHash, userAgent, spamScore)
    .run();

  return new Response(JSON.stringify({ ok: true, status: 'pending_review' }), {
    status: 202,
    headers: { 'content-type': 'application/json' },
  });
};
