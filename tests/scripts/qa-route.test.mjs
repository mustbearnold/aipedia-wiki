import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function runQaRoute(args) {
  return spawnSync(process.execPath, ['scripts/qa-route.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('qa-route documents and accepts a local base URL mode', () => {
  const script = readFileSync('scripts/qa-route.mjs', 'utf8');

  assert.match(script, /'--base-url'/);
  assert.match(script, /'--concurrency'/);
  assert.match(script, /Existing local dev or preview server/);
  assert.match(script, /Number of browser checks to run at once/);
  assert.match(script, /parseLocalBaseUrl/);
  assert.match(script, /base_url: resolvedBaseUrl/);
  assert.match(script, /concurrencyArg/);
});

test('qa-route rejects non-local base URLs before browser work', () => {
  const result = runQaRoute(['--route', '/', '--base-url', 'http://example.com', '--json']);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /must point at a local server/.test(failure)));
});

test('qa-route rejects base URL mixed with static server flags', () => {
  const result = runQaRoute(['--route', '/', '--base-url', 'http://127.0.0.1:4325', '--site-dir', 'dist-fast/client', '--json']);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /choose either --base-url or a static build directory/.test(failure)));
});

test('qa-route rejects invalid concurrency before browser work', () => {
  const result = runQaRoute(['--route', '/', '--base-url', 'http://127.0.0.1:4325', '--concurrency', '99', '--json']);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /--concurrency must be an integer from 1 to 8/.test(failure)));
});
