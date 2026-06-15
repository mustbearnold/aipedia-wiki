import type { APIRoute } from 'astro';
import {
  DATABASE_SCHEMA_HINT,
  getSql,
  isDebugApiEnabled,
  json,
  requireAdmin,
  unauthorizedAdminResponse,
} from '../../../../lib/server/runtime';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  if (!requireAdmin(request)) return unauthorizedAdminResponse();

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

  const url = new URL(request.url);
  const status = url.searchParams.get('status') ?? 'pending';
  const approved = status === 'approved' ? 1 : status === 'rejected' ? 2 : 0;

  try {
    const reviews = await sql`
      SELECT
        id,
        tool_slug,
        rating,
        title,
        body,
        author_name,
        EXTRACT(EPOCH FROM created_at)::int AS created_at,
        spam_score,
        approved
      FROM reviews
      WHERE approved = ${approved}
      ORDER BY created_at DESC
      LIMIT 200
    `;

    return json({ reviews }, 200);
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
