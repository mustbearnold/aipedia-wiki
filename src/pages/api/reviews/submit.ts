import type { APIRoute } from 'astro';
import {
  DATABASE_SCHEMA_HINT,
  getClientIp,
  getIpHashSecret,
  getSql,
  isDebugApiEnabled,
  json,
  sha256,
} from '../../../lib/server/runtime';

export const prerender = false;

interface ReviewBody {
  tool_slug: string;
  rating: number;
  title: string;
  body: string;
  author_name: string;
  author_email?: string;
  website?: string;
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

export const GET: APIRoute = () => json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const sql = getSql();
  const debugApi = isDebugApiEnabled();

  if (!sql) {
    return json(
      {
        error: 'reviews_disabled',
        ...(debugApi ? { detail: 'DATABASE_URL not configured in Vercel environment variables' } : {}),
      },
      503,
    );
  }

  const ipHashSecret = getIpHashSecret();
  if (!ipHashSecret) {
    return json(
      {
        error: 'reviews_disabled',
        ...(debugApi ? { detail: 'IP_HASH_SECRET not configured in Vercel environment variables' } : {}),
      },
      503,
    );
  }

  let payload: ReviewBody;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const toolSlug = String(payload.tool_slug ?? '').trim();
  const rating = Number(payload.rating);
  const title = String(payload.title ?? '').trim();
  const body = String(payload.body ?? '').trim();
  const authorName = String(payload.author_name ?? '').trim();
  const authorEmail = String(payload.author_email ?? '').trim();
  const website = String(payload.website ?? '').trim();

  if (website) {
    return json({ ok: true, status: 'pending_review' }, 202);
  }

  if (
    !toolSlug ||
    !/^[a-z0-9][a-z0-9-]{0,63}$/.test(toolSlug) ||
    !Number.isFinite(rating) ||
    rating < 1 ||
    rating > 5 ||
    !title ||
    title.length > 140 ||
    !body ||
    body.length < 40 ||
    body.length > 4000 ||
    !authorName ||
    authorName.length > 80
  ) {
    return json({ error: 'validation_failed' }, 400);
  }

  const ip = getClientIp(request, typeof clientAddress === 'string' ? clientAddress : undefined);
  const userAgent = request.headers.get('user-agent')?.slice(0, 200) ?? '';

  const ipHash = await sha256(`${ip}|${ipHashSecret}`);
  const emailHash = authorEmail ? await sha256(authorEmail.toLowerCase()) : null;

  try {
    const recent = await sql`
      SELECT COUNT(*)::int AS n
      FROM reviews
      WHERE ip_hash = ${ipHash}
        AND created_at > NOW() - INTERVAL '24 hours'
    `;
    if (Number(recent[0]?.n ?? 0) >= 3) {
      return json({ error: 'rate_limited' }, 429);
    }

    const duplicate = await sql`
      SELECT 1
      FROM reviews
      WHERE ip_hash = ${ipHash}
        AND tool_slug = ${toolSlug}
      LIMIT 1
    `;
    if (duplicate.length > 0) {
      return json({ error: 'already_reviewed' }, 409);
    }

    const spamScore = scoreSpam(title, body, authorName);

    await sql`
      INSERT INTO reviews
        (tool_slug, rating, title, body, author_name, author_email_hash, ip_hash, user_agent, spam_score, approved)
      VALUES
        (${toolSlug}, ${Math.round(rating)}, ${title}, ${body}, ${authorName}, ${emailHash}, ${ipHash}, ${userAgent}, ${spamScore}, 0)
    `;

    return json({ ok: true, status: 'pending_review' }, 202);
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
};
