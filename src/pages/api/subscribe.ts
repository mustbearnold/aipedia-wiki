// POST /api/subscribe
// Accepts an email address and stores it in the subscribers table.
//
// Astro v6 moved Cloudflare binding access from locals.runtime.env to
// a direct module import from 'cloudflare:workers'. The binding object
// is typed from wrangler.jsonc + the Pages dashboard bindings.

import type { APIRoute } from 'astro';
// @ts-expect-error - cloudflare:workers is a Worker runtime module
// provided by the Cloudflare environment at runtime, not a normal npm
// package, so TypeScript's module resolver doesn't find it at build
// time. Runtime resolves it correctly on the worker.
import { env } from 'cloudflare:workers';

export const prerender = false;

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token: string, ip: string, secret: string): Promise<boolean> {
  if (!secret) return true;
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

async function checkRateLimit(db: any, ipHash: string): Promise<boolean> {
  if (!db) return true;
  try {
    const recent = await db
      .prepare(
        `SELECT COUNT(*) AS n FROM subscribers
         WHERE ip_hash = ? AND created_at > unixepoch() - 86400`,
      )
      .bind(ipHash)
      .first();
    if ((recent?.n ?? 0) >= 5) return false;
    return true;
  } catch {
    return true;
  }
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
    },
  });
}

// GET: redirect crawlers / direct visitors to the homepage signup section.
export const GET: APIRoute = () =>
  new Response(null, {
    status: 301,
    headers: {
      location: 'https://aipedia.wiki/#subscribe',
      'cache-control': 'public, max-age=3600',
    },
  });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    const workerEnv: any = env ?? {};
    const db: any = workerEnv?.DB ?? null;

    if (!db) {
      return json(
        {
          error: 'subscribe_disabled',
          detail: 'DB not bound',
          envKeys: workerEnv ? Object.keys(workerEnv).slice(0, 20) : [],
        },
        503,
      );
    }

    let payload: any;
    try {
      payload = await request.json();
    } catch {
      return json({ error: 'invalid_json' }, 400);
    }

    const email = String(payload?.email ?? '').trim().toLowerCase();
    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ error: 'invalid_email' }, 400);
    }

    const source = String(payload?.source ?? '').slice(0, 80) || 'unknown';
    const ip =
      request.headers.get('CF-Connecting-IP') ??
      (typeof clientAddress === 'string' ? clientAddress : '0.0.0.0');

    const tsSecret = String(workerEnv?.TURNSTILE_SECRET_KEY ?? '');
    const tsOk = await verifyTurnstile(String(payload?.turnstile_token ?? ''), ip, tsSecret);
    if (!tsOk) {
      return json({ error: 'captcha_failed' }, 403);
    }

    const ipHash = await sha256(`${ip}|${workerEnv?.IP_HASH_SECRET ?? ''}`);

    const underLimit = await checkRateLimit(db, ipHash);
    if (!underLimit) {
      return json({ error: 'rate_limited', detail: '5 signups per IP per day' }, 429);
    }

    try {
      const result: any = await db
        .prepare(
          `INSERT OR IGNORE INTO subscribers (email, ip_hash, source)
           VALUES (?, ?, ?)`,
        )
        .bind(email, ipHash, source)
        .run();

      const already = !(result?.meta?.changes && result.meta.changes > 0);
      return json({ ok: true, already }, 200);
    } catch (err: any) {
      return json(
        {
          error: 'db_failed',
          detail: String(err?.message ?? err).slice(0, 300),
          hint: 'Run: CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, ip_hash TEXT NOT NULL, source TEXT DEFAULT \'unknown\', created_at INTEGER DEFAULT (unixepoch()));',
        },
        500,
      );
    }
  } catch (err: any) {
    return json(
      {
        error: 'unhandled',
        detail: String(err?.message ?? err).slice(0, 300),
      },
      500,
    );
  }
};
