import { neon } from '@neondatabase/serverless';

type Sql = ReturnType<typeof neon>;

const DATABASE_ENV_KEYS = ['DATABASE_URL', 'POSTGRES_URL', 'POSTGRES_PRISMA_URL', 'POSTGRES_URL_NON_POOLING'] as const;

let cachedDatabaseUrl = '';
let cachedSql: Sql | null = null;

export const DATABASE_SCHEMA_HINT = 'Run `npm run db:migrate -- --apply --env .env.local` after pulling the Vercel/Neon DATABASE_URL.';

export function readEnv(name: string): string {
  return process.env[name] ?? '';
}

export function isDebugApiEnabled(): boolean {
  return readEnv('AIPEDIA_DEBUG_API').toLowerCase() === 'true';
}

export function getIpHashSecret(): string {
  return readEnv('IP_HASH_SECRET').trim();
}

export function getDatabaseUrl(): string {
  for (const key of DATABASE_ENV_KEYS) {
    const value = readEnv(key).trim();
    if (value) return value;
  }
  return '';
}

export function getSql(): Sql | null {
  const databaseUrl = getDatabaseUrl();
  if (!databaseUrl) return null;

  if (cachedSql && cachedDatabaseUrl === databaseUrl) return cachedSql;
  cachedDatabaseUrl = databaseUrl;
  cachedSql = neon(databaseUrl);
  return cachedSql;
}

export function json(body: unknown, status = 200, headers?: HeadersInit): Response {
  const responseHeaders = new Headers(headers);
  if (!responseHeaders.has('content-type')) responseHeaders.set('content-type', 'application/json');
  if (!responseHeaders.has('cache-control')) responseHeaders.set('cache-control', 'no-store');

  return new Response(JSON.stringify(body), {
    status,
    headers: responseHeaders,
  });
}

export async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(hash)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function isLocalRequest(request: Request): boolean {
  const host = new URL(request.url).hostname;
  return host === 'localhost' || host === '127.0.0.1' || host === '::1';
}

export function getClientIp(request: Request, clientAddress?: string): string {
  const forwarded =
    request.headers.get('x-forwarded-for') ??
    request.headers.get('x-real-ip') ??
    request.headers.get('x-vercel-forwarded-for') ??
    clientAddress ??
    '0.0.0.0';

  return forwarded.split(',')[0]?.trim() || '0.0.0.0';
}

export function requireAdmin(request: Request): boolean {
  const expected = readEnv('ADMIN_PASSWORD');
  if (!expected) return false;

  const header = request.headers.get('authorization') ?? '';
  if (!header.startsWith('Basic ')) return false;

  try {
    const [, pass = ''] = atob(header.slice(6)).split(':');
    return pass === expected;
  } catch {
    return false;
  }
}

export function unauthorizedAdminResponse(): Response {
  return new Response('unauthorized', {
    status: 401,
    headers: {
      'www-authenticate': 'Basic realm="aipedia-admin"',
      'cache-control': 'no-store',
    },
  });
}
