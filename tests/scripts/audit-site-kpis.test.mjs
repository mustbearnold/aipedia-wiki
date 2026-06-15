import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runSiteKpis(...args) {
  return spawnSync(process.execPath, ['scripts/audit-site-kpis.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('site KPI audit emits stable JSON with core remediation metrics', () => {
  const result = runSiteKpis('--json');

  assert.equal(
    result.status,
    0,
    `audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const data = JSON.parse(result.stdout);
  assert.equal(data.ok, true);
  assert.equal(data.mode, 'report');
  assert.deepEqual(data.argument_issues, []);
  assert.ok(data.collections.tools >= 253);
  assert.ok(data.collections.comparisons >= 266);
  assert.equal(data.collections.news, data.news.total);
  assert.ok(data.collections['use-cases'] >= 93);

  assert.ok(data.tools.status.active >= 200);
  assert.ok(Array.isArray(data.tools.missing.seo_title));
  assert.ok(Array.isArray(data.tools.missing.meta_description));
  assert.ok(Array.isArray(data.tools.missing.best_for));
  assert.ok(Array.isArray(data.tools.missing.not_best_for));
  assert.ok(Array.isArray(data.tools.missing.facts));
  assert.ok(Array.isArray(data.tools.shortest));
  assert.ok(data.tools.shortest.length > 0);
  assert.ok(Number.isFinite(data.tools.freshness.median_days));

  assert.equal(data.comparisons.total, data.collections.comparisons);
  assert.ok(data.comparisons.missing_canonical_fact_table >= 0);
  assert.ok(Array.isArray(data.comparisons.shortest));

  assert.ok(data.news.total >= 221);
  assert.ok(data.news.by_month['2026-04'] >= 1);
});

test('site KPI audit rejects invalid arguments before catalog scans', () => {
  const unknown = runSiteKpis('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.deepEqual(unknownReport.collections, {});
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runSiteKpis('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runSiteKpis('--json', 'content');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));

  const conflicting = runSiteKpis('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('site KPI audit supports fixture project roots', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-site-kpis-'));

  try {
    const result = runSiteKpis('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, `fixture site KPI audit failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const data = JSON.parse(result.stdout);
    assert.equal(data.ok, true);
    assert.equal(data.project_dir, resolve(dir));
    assert.equal(data.collections.tools, 0);
    assert.equal(data.collections.news, 0);
    assert.equal(data.tools.total, 0);
    assert.equal(data.news.total, 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('site KPI audit prints CLI help', () => {
  const result = runSiteKpis('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
