import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { once } from 'node:events';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

async function freePort() {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  await new Promise((resolve) => server.close(resolve));
  return port;
}

function runServeStatic(args) {
  return spawnSync(process.execPath, ['scripts/serve-static.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

async function startServer(args) {
  const child = spawn(process.execPath, ['scripts/serve-static.mjs', ...args], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let stdout = '';
  let stderr = '';
  child.stdout.on('data', (chunk) => {
    stdout += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    stderr += chunk.toString();
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`serve-static did not start\nstdout:\n${stdout}\nstderr:\n${stderr}`));
    }, 5000);

    child.stdout.on('data', () => {
      if (stdout.includes('[serve-static] Serving')) {
        clearTimeout(timeout);
        resolve();
      }
    });

    child.once('exit', (code) => {
      clearTimeout(timeout);
      reject(new Error(`serve-static exited before ready with ${code}\nstdout:\n${stdout}\nstderr:\n${stderr}`));
    });
  });

  return child;
}

async function stopServer(child) {
  if (child.exitCode !== null) return;
  child.kill('SIGTERM');
  await once(child, 'exit');
}

function writeFixtureProject() {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-serve-static-'));
  const siteDir = join(projectDir, '.vercel', 'output', 'static');
  mkdirSync(join(siteDir, 'docs'), { recursive: true });
  writeFileSync(join(siteDir, 'index.html'), '<!doctype html><h1>AiPedia home</h1>\n');
  writeFileSync(join(siteDir, 'docs', 'index.html'), '<!doctype html><h1>Docs</h1>\n');
  writeFileSync(join(siteDir, 'robots.txt'), 'User-agent: *\nAllow: /\n');
  return { projectDir, siteDir };
}

test('serve-static serves a Vercel-style static fixture safely', async () => {
  const { projectDir } = writeFixtureProject();
  const port = await freePort();
  let server;

  try {
    server = await startServer([
      '--host', '127.0.0.1',
      '--port', String(port),
      '--project-dir', projectDir,
      '--site-dir', '.vercel/output/static',
    ]);

    const root = await fetch(`http://127.0.0.1:${port}/`);
    assert.equal(root.status, 200);
    assert.match(await root.text(), /AiPedia home/);
    assert.match(root.headers.get('content-type') ?? '', /text\/html/);
    assert.equal(root.headers.get('cache-control'), 'no-store');

    const nested = await fetch(`http://127.0.0.1:${port}/docs/`);
    assert.equal(nested.status, 200);
    assert.match(await nested.text(), /Docs/);

    const head = await fetch(`http://127.0.0.1:${port}/robots.txt`, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.match(head.headers.get('content-type') ?? '', /text\/plain/);

    const traversal = await fetch(`http://127.0.0.1:${port}/%2e%2e/package.json`);
    assert.equal(traversal.status, 404);

    const malformed = await fetch(`http://127.0.0.1:${port}/%E0%A4%A`);
    assert.equal(malformed.status, 400);
  } finally {
    if (server) await stopServer(server);
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('serve-static fails closed for invalid arguments and missing output', () => {
  const unknown = runServeStatic(['--wat']);
  assert.equal(unknown.status, 1);
  assert.match(unknown.stderr, /unknown flag --wat/);

  const missingValue = runServeStatic(['--site-dir']);
  assert.equal(missingValue.status, 1);
  assert.match(missingValue.stderr, /--site-dir requires a value/);

  const conflicting = runServeStatic(['--dir', 'dist', '--site-dir', '.vercel/output/static']);
  assert.equal(conflicting.status, 1);
  assert.match(conflicting.stderr, /choose one static directory flag/);

  const badPort = runServeStatic(['--port', 'abc']);
  assert.equal(badPort.status, 1);
  assert.match(badPort.stderr, /--port must be an integer/);

  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-serve-static-missing-'));
  try {
    const missingSite = runServeStatic(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);
    assert.equal(missingSite.status, 1);
    assert.match(missingSite.stderr, /Missing static directory/);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('serve-static prints CLI help', () => {
  const result = runServeStatic(['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--site-dir <dir>/);
});
