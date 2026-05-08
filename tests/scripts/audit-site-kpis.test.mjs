import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

test('site KPI audit emits stable JSON with core remediation metrics', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-site-kpis.mjs', '--json'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(
    result.status,
    0,
    `audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
  );

  const data = JSON.parse(result.stdout);
  assert.equal(data.collections.tools, 249);
  assert.equal(data.collections.comparisons, 263);
  assert.equal(data.collections.news, 213);
  assert.equal(data.collections['use-cases'], 93);

  assert.ok(data.tools.status.active >= 200);
  assert.ok(Array.isArray(data.tools.missing.seo_title));
  assert.ok(Array.isArray(data.tools.missing.meta_description));
  assert.ok(Array.isArray(data.tools.missing.best_for));
  assert.ok(Array.isArray(data.tools.missing.not_best_for));
  assert.ok(Array.isArray(data.tools.missing.facts));
  assert.ok(Array.isArray(data.tools.shortest));
  assert.ok(data.tools.shortest.length > 0);
  assert.ok(Number.isFinite(data.tools.freshness.median_days));

  assert.equal(data.comparisons.total, 263);
  assert.ok(data.comparisons.missing_canonical_fact_table >= 0);
  assert.ok(Array.isArray(data.comparisons.shortest));

  assert.equal(data.news.total, 213);
  assert.ok(data.news.by_month['2026-04'] >= 1);
});
