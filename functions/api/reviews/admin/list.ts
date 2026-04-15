// GET /api/reviews/admin/list?status=pending
// Admin only. Basic auth via ADMIN_PASSWORD env var.

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

function requireAdmin(request: Request, expected: string): boolean {
  if (!expected) return false;
  const header = request.headers.get('authorization') ?? '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const decoded = atob(header.slice(6));
    const [, pass] = decoded.split(':');
    return pass === expected;
  } catch {
    return false;
  }
}

export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!requireAdmin(request, env.ADMIN_PASSWORD)) {
    return new Response('unauthorized', {
      status: 401,
      headers: { 'www-authenticate': 'Basic realm="aipedia-admin"' },
    });
  }
  const url = new URL(request.url);
  const status = url.searchParams.get('status') ?? 'pending';
  const approved = status === 'approved' ? 1 : status === 'rejected' ? 2 : 0;

  const res = await env.DB
    .prepare(`SELECT id, tool_slug, rating, title, body, author_name, created_at, spam_score, approved
              FROM reviews
              WHERE approved = ?
              ORDER BY created_at DESC
              LIMIT 200`)
    .bind(approved)
    .all();

  return new Response(JSON.stringify({ reviews: res.results ?? [] }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
