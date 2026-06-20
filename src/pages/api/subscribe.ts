import type { APIRoute } from 'astro';
import {
  DATABASE_SCHEMA_HINT,
  getClientIp,
  getIpHashSecret,
  getSql,
  isDebugApiEnabled,
  json,
  sha256,
} from '../../lib/server/runtime';

export const prerender = false;

const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

async function checkRateLimit(sql: NonNullable<ReturnType<typeof getSql>>, ipHash: string): Promise<boolean> {
  try {
    const recent = await sql`
      SELECT COUNT(*)::int AS n
      FROM subscribers
      WHERE ip_hash = ${ipHash}
        AND created_at > NOW() - INTERVAL '24 hours'
    `;
    const recentRows = Array.isArray(recent) ? recent as Array<{ n?: unknown }> : [];
    return Number(recentRows[0]?.n ?? 0) < 5;
  } catch {
    return true;
  }
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
    const sql = getSql();
    const debugApi = isDebugApiEnabled();

    if (!sql) {
      return json(
        {
          error: 'subscribe_disabled',
          ...(debugApi ? { detail: 'DATABASE_URL not configured in Vercel environment variables' } : {}),
        },
        503,
      );
    }

    const ipHashSecret = getIpHashSecret();
    if (!ipHashSecret) {
      return json(
        {
          error: 'subscribe_disabled',
          ...(debugApi ? { detail: 'IP_HASH_SECRET not configured in Vercel environment variables' } : {}),
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
    const website = String(payload?.website ?? '').trim();
    if (website) {
      return json({ ok: true, already: false }, 200);
    }

    if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
      return json({ error: 'invalid_email' }, 400);
    }

    const source = String(payload?.source ?? '').slice(0, 80) || 'unknown';
    const ip = getClientIp(request, typeof clientAddress === 'string' ? clientAddress : undefined);

    const ipHash = await sha256(`${ip}|${ipHashSecret}`);

    const underLimit = await checkRateLimit(sql, ipHash);
    if (!underLimit) {
      return json({ error: 'rate_limited', detail: '5 signups per IP per day' }, 429);
    }

    try {
      const rows = await sql`
        INSERT INTO subscribers (email, ip_hash, source)
        VALUES (${email}, ${ipHash}, ${source})
        ON CONFLICT (email) DO NOTHING
        RETURNING id
      `;

      const insertedRows = Array.isArray(rows) ? rows : [];
      const already = insertedRows.length === 0;
      return json({ ok: true, already }, 200);
    } catch (err: any) {
      return json(
        {
          error: 'db_failed',
          ...(debugApi
            ? {
                detail: String(err?.message ?? err).slice(0, 300),
                hint: DATABASE_SCHEMA_HINT,
              }
            : {}),
        },
        500,
      );
    }
  } catch {
    return json(
      {
        error: 'unhandled',
      },
      500,
    );
  }
};
