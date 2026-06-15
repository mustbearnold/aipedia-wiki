import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function runGuardContent(...args) {
  return spawnSync(process.execPath, ['scripts/guard-content.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('content guard can compute baseline floors without mutating files', () => {
  const result = runGuardContent('--baseline', '--dry-run', '--json');

  assert.equal(
    result.status,
    0,
    `baseline dry run failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'baseline');
  assert.equal(report.dry_run, true);
  assert.deepEqual(report.argument_issues, []);
  assert.ok(report.floors.tools >= 100);
  assert.ok(report.counts.tools > report.floors.tools);
  assert.ok(report.safety_margin >= 1);
});

test('content guard emits JSON in normal guard mode', () => {
  const result = runGuardContent('--json');
  assert.equal(result.status, 0, `guard JSON mode failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'guard');
  assert.deepEqual(report.argument_issues, []);
  assert.ok(report.total > 0);
  assert.ok(report.results.every((entry) => entry.ok === true));
});

test('content guard rejects invalid arguments before baseline writes', () => {
  const before = readFileSync('scripts/guard-content.mjs', 'utf8');
  const unknown = runGuardContent('--json', '--baseline', '--dry-rn');
  const after = readFileSync('scripts/guard-content.mjs', 'utf8');

  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');
  assert.equal(after, before, 'invalid baseline arguments must not rewrite guard-content.mjs');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --dry-rn/.test(issue.detail)));

  const dryRunOnly = runGuardContent('--json', '--dry-run');
  assert.equal(dryRunOnly.status, 1);
  assert.equal(dryRunOnly.stderr, '');

  const dryRunOnlyReport = JSON.parse(dryRunOnly.stdout);
  assert.equal(dryRunOnlyReport.ok, false);
  assert.ok(dryRunOnlyReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--dry-run requires --baseline/.test(issue.detail)));

  const stray = runGuardContent('--json', 'content');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));
});

test('content guard prints CLI help', () => {
  const result = runGuardContent('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--baseline/);
  assert.match(result.stdout, /--dry-run/);
});
