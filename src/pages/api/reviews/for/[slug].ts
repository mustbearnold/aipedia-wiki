import type { APIRoute } from 'astro';
import { DATABASE_SCHEMA_HINT, getSql, isDebugApiEnabled, json } from '../../../../lib/server/runtime';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = String(params.slug ?? '').trim();
  if (!slug || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(slug)) {
    return json({ error: 'bad_slug' }, 400);
  }

  const sql = getSql();
  if (!sql) {
    return json(
      {
        count: 0,
        average: null,
        reviews: [],
      },
      200,
      { 'cache-control': 'public, max-age=60, s-maxage=300' },
    );
  }

  try {
    const [reviews, agg] = await Promise.all([
      sql`
        SELECT id, rating, title, body, author_name, EXTRACT(EPOCH FROM created_at)::int AS created_at
        FROM reviews
        WHERE tool_slug = ${slug}
          AND approved = 1
        ORDER BY created_at DESC
        LIMIT 50
      `,
      sql`
        SELECT COUNT(*)::int AS count, AVG(rating)::float AS avg
        FROM reviews
        WHERE tool_slug = ${slug}
          AND approved = 1
      `,
    ]);
    const aggRows = Array.isArray(agg) ? agg as Array<{ count?: unknown; avg?: unknown }> : [];
    const firstAgg = aggRows[0];

    return json(
      {
        count: Number(firstAgg?.count ?? 0),
        average: firstAgg?.avg ? Math.round(Number(firstAgg.avg) * 10) / 10 : null,
        reviews,
      },
      200,
      { 'cache-control': 'public, max-age=60, s-maxage=300' },
    );
  } catch (err: any) {
    return json(
      {
        error: 'db_failed',
        ...(isDebugApiEnabled()
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
