import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
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
