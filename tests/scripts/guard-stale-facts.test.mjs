import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

test('stale fact guard exposes JSON output for baseline audits', () => {
  const result = spawnSync(process.execPath, ['scripts/guard-stale-facts.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `guard JSON mode failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  const data = JSON.parse(result.stdout);
  assert.equal(data.ok, true);
  assert.equal(data.totals.required_tools, 10);
  assert.equal(data.totals.failures, 0);
  assert.ok(data.totals.comparisons_scanned > 200);
  assert.ok(Array.isArray(data.failures));
});
