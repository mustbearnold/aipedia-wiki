// GET /api/reviews/for/<slug> — fetch approved reviews + aggregate rating.

interface Env {
  DB: D1Database;
}

export const onRequestGet: PagesFunction<Env> = async ({ params, env }) => {
  const slug = String(params.slug ?? '').trim();
  if (!slug || !/^[a-z0-9][a-z0-9-]{0,63}$/.test(slug)) {
    return new Response(JSON.stringify({ error: 'bad_slug' }), { status: 400 });
  }

  const [reviewsRes, aggRes] = await Promise.all([
    env.DB
      .prepare(`SELECT id, rating, title, body, author_name, created_at
                FROM reviews
                WHERE tool_slug = ? AND approved = 1
                ORDER BY created_at DESC
                LIMIT 50`)
      .bind(slug)
      .all(),
    env.DB
      .prepare(`SELECT COUNT(*) AS count, AVG(rating) AS avg
                FROM reviews
                WHERE tool_slug = ? AND approved = 1`)
      .bind(slug)
      .first<{ count: number; avg: number | null }>(),
  ]);

  return new Response(
    JSON.stringify({
      count: aggRes?.count ?? 0,
      average: aggRes?.avg ? Math.round(aggRes.avg * 10) / 10 : null,
      reviews: reviewsRes.results ?? [],
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60, s-maxage=300',
      },
    }
  );
};
