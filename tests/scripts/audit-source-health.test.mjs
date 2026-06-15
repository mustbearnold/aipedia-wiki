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
  assert.deepEqual(report.argument_issues, []);
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

test('source health monitor rejects invalid arguments before registry work', () => {
  const unknown = runSourceHealth('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.registry_sources, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runSourceHealth('--json', '--limit');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--limit requires a value/.test(issue.detail)));

  const repeatedMissing = runSourceHealth('--json', '--source-id', 'openai-pricing', '--source-id');
  assert.equal(repeatedMissing.status, 1);
  assert.equal(repeatedMissing.stderr, '');

  const repeatedMissingReport = JSON.parse(repeatedMissing.stdout);
  assert.equal(repeatedMissingReport.ok, false);
  assert.ok(
    repeatedMissingReport.argument_issues.some(
      (issue) => issue.code === 'argument-invalid' && /--source-id requires a value/.test(issue.detail),
    ),
  );

  const stray = runSourceHealth('--json', 'registry');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument registry/.test(issue.detail)));

  const snapshotUpdate = runSourceHealth('--json', '--update-snapshots');
  assert.equal(snapshotUpdate.status, 1);
  assert.equal(snapshotUpdate.stderr, '');

  const snapshotReport = JSON.parse(snapshotUpdate.stdout);
  assert.equal(snapshotReport.ok, false);
  assert.ok(snapshotReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--update-snapshots requires --live/.test(issue.detail)));

  const conflictingRoot = runSourceHealth('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflictingRoot.status, 1);
  assert.equal(conflictingRoot.stderr, '');

  const conflictingReport = JSON.parse(conflictingRoot.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('source health monitor prints CLI help', () => {
  const result = runSourceHealth('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--live/);
  assert.match(result.stdout, /--update-snapshots/);
});
