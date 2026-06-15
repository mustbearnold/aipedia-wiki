import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

const PROJECT_DIR = process.cwd();

function runFreshnessQueue(...args) {
  return spawnSync(process.execPath, ['scripts/audit-freshness-queue.mjs', ...args], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
}

test('freshness queue reports review and baseline-upgrade work as JSON without failing', () => {
  const result = runFreshnessQueue('--json');
  assert.equal(result.status, 0, `freshness queue should be report-only\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'report');
  assert.deepEqual(report.argument_issues, []);
  assert.ok(report.totals.tools > 0);
  assert.ok(report.totals.facts > 0);
  assert.ok(report.totals.sources > 0);
  assert.ok(report.totals.baseline_generic_pages >= 0);
  assert.ok(Array.isArray(report.queues.due_now));
  assert.ok(Array.isArray(report.queues.due_soon));
  assert.ok(Array.isArray(report.queues.top_review_queue));
  assert.ok(Array.isArray(report.queues.baseline_generic_pages));
  assert.ok(Array.isArray(report.queues.top_baseline_upgrades));
  assert.ok(Array.isArray(report.source_registry.invalid_urls));
  assert.ok(Array.isArray(report.source_registry.duplicate_ids));
  assert.ok(Array.isArray(report.source_registry.unknown_source_ids));

  for (const item of report.queues.top_baseline_upgrades) {
    assert.equal(typeof item.slug, 'string');
    assert.equal(typeof item.path, 'string');
    assert.equal(typeof item.comparison_mentions, 'number');
  }
});

test('freshness queue rejects invalid arguments before repo scans', () => {
  const unknown = runFreshnessQueue('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.tools, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runFreshnessQueue('--json', '--window-days');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--window-days requires a value/.test(issue.detail)));

  const nonNumeric = runFreshnessQueue('--json', '--window-days', 'soon');
  assert.equal(nonNumeric.status, 1);
  assert.equal(nonNumeric.stderr, '');

  const nonNumericReport = JSON.parse(nonNumeric.stdout);
  assert.equal(nonNumericReport.ok, false);
  assert.ok(
    nonNumericReport.argument_issues.some(
      (issue) => issue.code === 'argument-invalid' && /--window-days must be a non-negative integer/.test(issue.detail),
    ),
  );

  const stray = runFreshnessQueue('--json', 'tools');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument tools/.test(issue.detail)));

  const conflicting = runFreshnessQueue('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('freshness queue supports fixture project roots and inline window arguments', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-freshness-queue-'));

  try {
    const result = runFreshnessQueue('--json', `--project-dir=${dir}`, '--window-days=7');
    assert.equal(result.status, 0, `fixture freshness queue failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(dir));
    assert.equal(report.review_window_days, 7);
    assert.equal(report.totals.tools, 0);
    assert.equal(report.totals.sources, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('freshness queue prints CLI help', () => {
  const result = runFreshnessQueue('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--window-days <days>/);
});
