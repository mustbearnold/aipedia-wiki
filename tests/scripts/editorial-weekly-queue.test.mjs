import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runWeeklyQueue(...args) {
  return spawnSync(process.execPath, ['scripts/editorial-weekly-queue.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('editorial weekly queue emits a grouped JSON checklist', () => {
  const result = runWeeklyQueue('--json', '--window-days', '7', '--limit', '5');
  assert.equal(result.status, 0, `weekly queue failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'weekly-queue');
  assert.deepEqual(report.argument_issues, []);
  assert.equal(report.window_days, 7);
  assert.equal(report.limit_facts, 5);
  assert.ok(report.totals.tools > 0);
  assert.ok(Array.isArray(report.tools));
  assert.ok(report.tools.length <= 5);

  for (const tool of report.tools) {
    assert.equal(typeof tool.slug, 'string');
    assert.equal(typeof tool.path, 'string');
    assert.ok(Array.isArray(tool.facts));
  }
});

test('editorial weekly queue rejects invalid arguments before freshness scans', () => {
  const unknown = runWeeklyQueue('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.deepEqual(unknownReport.tools, []);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runWeeklyQueue('--json', '--limit');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--limit requires a value/.test(issue.detail)));

  const nonNumeric = runWeeklyQueue('--json', '--window-days', 'soon');
  assert.equal(nonNumeric.status, 1);
  assert.equal(nonNumeric.stderr, '');

  const nonNumericReport = JSON.parse(nonNumeric.stdout);
  assert.equal(nonNumericReport.ok, false);
  assert.ok(
    nonNumericReport.argument_issues.some(
      (issue) => issue.code === 'argument-invalid' && /--window-days must be a non-negative integer/.test(issue.detail),
    ),
  );

  const stray = runWeeklyQueue('--json', 'queue');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument queue/.test(issue.detail)));

  const conflicting = runWeeklyQueue('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('editorial weekly queue passes fixture roots to the freshness audit', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-editorial-queue-'));

  try {
    const result = runWeeklyQueue('--json', `--project-dir=${dir}`, '--window-days=3', '--limit=2');
    assert.equal(result.status, 0, `fixture weekly queue failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(dir));
    assert.equal(report.window_days, 3);
    assert.equal(report.limit_facts, 2);
    assert.equal(report.totals.tools, 0);
    assert.deepEqual(report.tools, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('editorial weekly queue prints CLI help', () => {
  const result = runWeeklyQueue('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--window-days <days>/);
  assert.match(result.stdout, /--limit <count>/);
});
