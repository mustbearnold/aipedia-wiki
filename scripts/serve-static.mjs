#!/usr/bin/env node

import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtSiteDir, resolvePathFromProject } from './lib/built-site-dir.mjs';

const rawArgs = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const KNOWN_FLAGS = new Set(['--host', '--port', '--dir', '--site-dir', '--dist-dir', '--project-dir', '--root', '--help', '-h']);

function valueFor(flag) {
  const index = rawArgs.indexOf(flag);
  if (index >= 0) return rawArgs[index + 1] ?? '';
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/serve-static.mjs',
    '  node scripts/serve-static.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --host <host>         Host to bind. Default: 127.0.0.1.',
    '  --port <port>         Port to bind. Default: 4321.',
    '  --dir <dir>           Serve a specific static directory.',
    '  --site-dir <dir>      Alias for --dir.',
    '  --dist-dir <dir>      Alias for --dir.',
    '  --project-dir <dir>   Resolve default built output from another project root.',
    '  --root <dir>          Alias for --project-dir.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of rawArgs.entries()) {
    if (!arg.startsWith('-')) {
      const previous = rawArgs[index - 1] ?? '';
      if (!['--host', '--port', '--dir', '--site-dir', '--dist-dir', '--project-dir', '--root'].includes(previous)) {
        issues.push(`unexpected argument ${arg}`);
      }
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(`unknown flag ${name}`);
  }

  for (const flag of ['--host', '--port', '--dir', '--site-dir', '--dist-dir', '--project-dir', '--root']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : rawArgs[rawArgs.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) issues.push(`${flag} requires a value`);
  }

  const dirFlags = ['--dir', '--site-dir', '--dist-dir'].filter(hasFlag);
  if (dirFlags.length > 1) {
    issues.push(`choose one static directory flag, got ${dirFlags.join(', ')}`);
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push('choose only one of --project-dir or --root');
  }

  const portValue = valueFor('--port');
  if (portValue) {
    const parsed = Number(portValue);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
      issues.push(`--port must be an integer from 0 to 65535, got ${portValue}`);
    }
  }

  return issues;
}

if (rawArgs.includes('--help') || rawArgs.includes('-h')) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  console.error('[serve-static] invalid arguments:');
  for (const issue of argumentIssues) console.error(`- ${issue}`);
  process.exit(1);
}

const host = valueFor('--host') || '127.0.0.1';
const port = Number(valueFor('--port') || 4321);
const dirArg = valueFor('--dir') || valueFor('--site-dir') || valueFor('--dist-dir');
const rootDir = normalize(dirArg ? resolvePathFromProject(PROJECT_DIR, dirArg) : builtSiteDir(PROJECT_DIR));

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
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return { error: 'bad-request' };
  }
  const cleanPath = decoded.replace(/^\/+/, '');
  const candidate = cleanPath ? join(rootDir, cleanPath) : join(rootDir, 'index.html');
  const normalized = normalize(candidate);
  if (normalized !== rootDir && !normalized.startsWith(`${rootDir}${sep}`)) return null;

  if (existsSync(normalized)) {
    const stats = statSync(normalized);
    if (stats.isDirectory()) return { path: join(normalized, 'index.html') };
    if (stats.isFile()) return { path: normalized };
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
  const resolvedFile = fileForPath(url.pathname);
  if (resolvedFile?.error === 'bad-request') {
    response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Bad request');
    return;
  }

  const filePath = resolvedFile?.path;
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
