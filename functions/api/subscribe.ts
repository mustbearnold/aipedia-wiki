// POST /api/subscribe
// Accepts an email address and stores it in the subscribers table.
//
// Flow:
//   1. Turnstile CAPTCHA check (unless TURNSTILE_SECRET_KEY unset, dev mode)
//   2. Rate limit per IP hash (max 5 signups per IP per day)
//   3. Validate email format (simple regex, reject obvious junk)
//   4. INSERT OR IGNORE into subscribers table on unique email conflict
//   5. Return { ok: true, already?: boolean } or error JSON

interface Env {
  TURNSTILE_SECRET_KEY?: string;
  DB?: D1Database;
  IP_HASH_SECRET?: string;
}

interface RequestBody {
  email?: string;
  source?: string;
  turnstile_token?: string;
}

// Simple but effective email regex. Rejects obvious junk.
// Must have: local part, @, domain with at least one dot, TLD 2+ chars.
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  if (!secret) return true; // dev mode
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

// Rate limit: max 5 signups per IP hash per 24h.
// Falls back to permissive if no DB bound (shouldn't happen in prod).
async function checkRateLimit(env: Env, ipHash: string): Promise<boolean> {
  if (!env.DB) return true;
  try {
    const recent = await env.DB
      .prepare(
        `SELECT COUNT(*) AS n FROM subscribers
         WHERE ip_hash = ? AND created_at > unixepoch() - 86400`,
      )
      .bind(ipHash)
      .first<{ n: number }>();
    if ((recent?.n ?? 0) >= 5) return false;
    return true;
  } catch {
    return true; // fail open if DB misconfigured
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!env.DB) {
    return new Response(JSON.stringify({ error: 'subscribe_disabled', detail: 'DB not bound' }), {
      status: 503,
      headers: { 'content-type': 'application/json' },
    });
  }

  let payload: RequestBody;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const email = (payload.email ?? '').trim().toLowerCase();
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: 'invalid_email' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const source = String(payload.source ?? '').slice(0, 80) || 'unknown';

  const ip = request.headers.get('CF-Connecting-IP') ?? '0.0.0.0';

  const tsOk = await verifyTurnstile(payload.turnstile_token ?? '', ip, env.TURNSTILE_SECRET_KEY ?? '');
  if (!tsOk) {
    return new Response(JSON.stringify({ error: 'captcha_failed' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    });
  }

  const ipHash = await sha256(`${ip}|${env.IP_HASH_SECRET ?? ''}`);

  const underLimit = await checkRateLimit(env, ipHash);
  if (!underLimit) {
    return new Response(JSON.stringify({ error: 'rate_limited', detail: '5 signups per IP per day' }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const result = await env.DB
      .prepare(
        `INSERT OR IGNORE INTO subscribers (email, ip_hash, source)
         VALUES (?, ?, ?)`,
      )
      .bind(email, ipHash, source)
      .run();

    // D1's run() returns meta.changes; 0 means the row already existed
    // (UNIQUE constraint hit, INSERT OR IGNORE swallowed it).
    const already = !(result?.meta?.changes && result.meta.changes > 0);

    return new Response(JSON.stringify({ ok: true, already }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-store',
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: 'db_failed', detail: String(err?.message ?? err).slice(0, 200) }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
};
