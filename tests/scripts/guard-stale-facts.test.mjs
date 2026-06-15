import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runStaleFacts(...args) {
  return spawnSync(process.execPath, ['scripts/guard-stale-facts.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('stale fact guard exposes JSON output for baseline audits', () => {
  const result = runStaleFacts('--json');

  assert.equal(
    result.status,
    0,
    `guard JSON mode failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );
  const data = JSON.parse(result.stdout);
  assert.equal(data.ok, true);
  assert.equal(data.mode, 'guard');
  assert.deepEqual(data.argument_issues, []);
  assert.equal(data.totals.required_tools, 10);
  assert.equal(data.totals.failures, 0);
  assert.ok(data.totals.comparisons_scanned > 200);
  assert.ok(Array.isArray(data.failures));
});

test('stale fact guard rejects invalid arguments before scans', () => {
  const unknown = runStaleFacts('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.comparisons_scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runStaleFacts('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runStaleFacts('--json', 'comparisons');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument comparisons/.test(issue.detail)));

  const conflicting = runStaleFacts('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('stale fact guard reports missing fixture roots as structured JSON', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-stale-facts-'));

  try {
    const result = runStaleFacts('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 2);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'guard');
    assert.equal(report.project_dir, resolve(dir));
    assert.deepEqual(report.argument_issues, []);
    assert.equal(report.totals.comparisons_scanned, 0);
    assert.match(report.failures.join('\n'), /missing src\/content tools or comparisons directory/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('stale fact guard prints CLI help', () => {
  const result = runStaleFacts('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
