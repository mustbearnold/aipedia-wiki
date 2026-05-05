import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

test('content guard can compute baseline floors without mutating files', () => {
  const result = spawnSync(process.execPath, ['scripts/guard-content.mjs', '--baseline', '--dry-run', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `baseline dry run failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, 'baseline');
  assert.equal(report.dry_run, true);
  assert.ok(report.floors.tools >= 100);
  assert.ok(report.counts.tools > report.floors.tools);
  assert.ok(report.safety_margin >= 1);
});
