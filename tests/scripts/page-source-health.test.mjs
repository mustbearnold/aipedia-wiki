import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

async function withServer(handler, run) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();
  try {
    return await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

function runHealth(args = []) {
  return new Promise((resolve) => {
    execFile(process.execPath, ['scripts/page-source-health.mjs', ...args], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }, (error, stdout, stderr) => {
      resolve({
        status: error?.code ?? 0,
        stdout,
        stderr,
      });
    });
  });
}

test('page source health treats access-sensitive statuses as passing', async () => {
  await withServer((request, response) => {
    if (request.url === '/ok') {
      response.writeHead(200).end('ok');
      return;
    }
    if (request.url === '/gated') {
      response.writeHead(403).end('gated');
      return;
    }
    response.writeHead(404).end('missing');
  }, async (baseUrl) => {
    const dir = mkdtempSync(join(tmpdir(), 'page-source-health-'));
    const pagePath = join(dir, 'page.md');
    const planPath = join(dir, 'plan.json');
    const outPath = join(dir, 'out.json');
    writeFileSync(pagePath, `Sources: ${baseUrl}/ok and ${baseUrl}/gated.\n`);
    writeFileSync(planPath, JSON.stringify({
      batch: [{ route: '/guide/', path: 'page.md', type: 'Guide', sitemap: 'Yes' }],
    }));

    try {
      const result = await runHealth([
        '--project-dir',
        dir,
        '--plan',
        planPath,
        '--out',
        outPath,
        '--concurrency',
        '2',
        '--timeout-ms',
        '2000',
      ]);
      assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
      const report = JSON.parse(readFileSync(outPath, 'utf8'));
      assert.equal(report.ok, true);
      assert.equal(report.totals.sources, 2);
      assert.equal(report.totals.ok, 1);
      assert.equal(report.totals.access_sensitive, 1);
      assert.equal(report.pages[0].passed, true);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});

test('page source health fails on broken source URLs', async () => {
  await withServer((request, response) => {
    if (request.url === '/missing') {
      response.writeHead(404).end('missing');
      return;
    }
    response.writeHead(200).end('ok');
  }, async (baseUrl) => {
    const dir = mkdtempSync(join(tmpdir(), 'page-source-health-'));
    const pagePath = join(dir, 'page.md');
    const planPath = join(dir, 'plan.json');
    writeFileSync(pagePath, `Broken source: ${baseUrl}/missing.\n`);
    writeFileSync(planPath, JSON.stringify({
      batch: [{ route: '/guide/', path: 'page.md', type: 'Guide', sitemap: 'Yes' }],
    }));

    try {
      const result = await runHealth([
        '--project-dir',
        dir,
        '--plan',
        planPath,
        '--concurrency',
        '1',
        '--timeout-ms',
        '2000',
      ]);
      assert.equal(result.status, 1);
      assert.match(result.stdout, /1 broken/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
