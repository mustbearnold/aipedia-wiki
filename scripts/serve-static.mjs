#!/usr/bin/env node

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, isAbsolute, join, normalize, resolve, sep } from 'node:path';

const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (!arg.startsWith('--')) continue;
  const [key, inlineValue] = arg.split('=', 2);
  const value = inlineValue ?? process.argv[i + 1];
  args.set(key, value);
  if (inlineValue === undefined) i += 1;
}

const host = args.get('--host') ?? '127.0.0.1';
const port = Number(args.get('--port') ?? 4321);
const dirArg = args.get('--dir') ?? 'dist/client';
const rootDir = isAbsolute(dirArg) ? normalize(dirArg) : resolve(process.cwd(), dirArg);

if (!existsSync(rootDir) || !statSync(rootDir).isDirectory()) {
  console.error(`[serve-static] Missing static directory: ${rootDir}`);
  console.error('[serve-static] Run the site build before smoke tests.');
  process.exit(1);
}

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function fileForPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const cleanPath = decoded.replace(/^\/+/, '');
  const candidate = cleanPath ? join(rootDir, cleanPath) : join(rootDir, 'index.html');
  const normalized = normalize(candidate);
  if (normalized !== rootDir && !normalized.startsWith(`${rootDir}${sep}`)) return null;

  if (existsSync(normalized)) {
    const stats = statSync(normalized);
    if (stats.isDirectory()) return join(normalized, 'index.html');
    if (stats.isFile()) return normalized;
  }

  return null;
}

const server = createServer((request, response) => {
  if (!['GET', 'HEAD'].includes(request.method ?? '')) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end('Method not allowed');
    return;
  }

  const url = new URL(request.url ?? '/', `http://${host}:${port}`);
  const filePath = fileForPath(url.pathname);
  if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  const type = contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream';
  response.writeHead(200, {
    'Cache-Control': 'no-store',
    'Content-Type': type,
  });

  if (request.method === 'HEAD') {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
});

server.listen(port, host, () => {
  console.log(`[serve-static] Serving ${rootDir} at http://${host}:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
