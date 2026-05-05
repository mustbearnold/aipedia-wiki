import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

test('command surface audit verifies documented npm scripts and script paths', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-command-surface.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `command surface audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.missing_npm_scripts.length, 0);
  assert.equal(report.missing_script_paths.length, 0);
  assert.ok(report.documented_npm_scripts.includes('build'));
  assert.ok(report.documented_npm_scripts.includes('check'));
  assert.ok(report.referenced_script_paths.includes('scripts/audit-command-surface.mjs'));
  assert.ok(report.optional_local_script_paths.includes('tools/project-kg/bin/project-kg'));
});
