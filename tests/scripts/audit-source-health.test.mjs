import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runSourceHealth(...args) {
  return spawnSync(process.execPath, ['scripts/audit-source-health.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('source health monitor reports registry and snapshot queues without requiring network access', () => {
  const result = runSourceHealth('--json', '--limit', '5');
  assert.equal(result.status, 0, `source health monitor should be report-only\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'report');
  assert.equal(report.live, false);
  assert.equal(report.update_snapshots, false);
  assert.ok(report.totals.registry_sources > 0);
  assert.equal(report.totals.sources_selected, 5);
  assert.equal(report.totals.sources_checked_live, 0);
  assert.ok(Array.isArray(report.source_registry.issues));
  assert.ok(Array.isArray(report.source_registry.duplicate_source_ids));
  assert.ok(Array.isArray(report.queues.unreachable_sources));
  assert.ok(Array.isArray(report.queues.changed_sources));
  assert.ok(Array.isArray(report.queues.missing_snapshots));
  assert.ok(Array.isArray(report.queues.selected_sources));

  for (const source of report.queues.selected_sources) {
    assert.equal(typeof source.id, 'string');
    assert.equal(typeof source.url, 'string');
    assert.equal(typeof source.type, 'string');
    assert.equal(typeof source.volatility, 'string');
  }
});
