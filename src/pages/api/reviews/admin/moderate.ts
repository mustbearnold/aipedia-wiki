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

export const GET: APIRoute = () => json({ error: 'method_not_allowed' }, 405, { allow: 'POST' });

export const POST: APIRoute = async ({ request }) => {
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

  let payload: { id: number; action: string };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'bad_json' }, 400);
  }

  const id = Number(payload.id);
  const action = String(payload.action ?? '');
  if (!Number.isInteger(id) || !['approve', 'reject', 'delete'].includes(action)) {
    return json({ error: 'bad_request' }, 400);
  }

  try {
    if (action === 'delete') {
      await sql`DELETE FROM reviews WHERE id = ${id}`;
    } else {
      const approved = action === 'approve' ? 1 : 2;
      await sql`
        UPDATE reviews
        SET approved = ${approved}, approved_at = NOW()
        WHERE id = ${id}
      `;
    }

    return json({ ok: true }, 200);
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
