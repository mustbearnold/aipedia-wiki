// POST /api/reviews/admin/moderate  { id, action: 'approve' | 'reject' | 'delete' }
// Admin only.

interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

function requireAdmin(request: Request, expected: string): boolean {
  if (!expected) return false;
  const header = request.headers.get('authorization') ?? '';
  if (!header.startsWith('Basic ')) return false;
  try {
    const [, pass] = atob(header.slice(6)).split(':');
    return pass === expected;
  } catch {
    return false;
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  if (!requireAdmin(request, env.ADMIN_PASSWORD)) {
    return new Response('unauthorized', { status: 401 });
  }
  let payload: { id: number; action: string };
  try { payload = await request.json(); } catch { return new Response('bad_json', { status: 400 }); }
  const { id, action } = payload;
  if (!Number.isInteger(id) || !['approve', 'reject', 'delete'].includes(action)) {
    return new Response('bad_request', { status: 400 });
  }

  if (action === 'delete') {
    await env.DB.prepare('DELETE FROM reviews WHERE id = ?').bind(id).run();
  } else {
    const approved = action === 'approve' ? 1 : 2;
    await env.DB
      .prepare('UPDATE reviews SET approved = ?, approved_at = unixepoch() WHERE id = ?')
      .bind(approved, id)
      .run();
  }
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });
};
