import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runTrends(...args) {
  return spawnSync(process.execPath, ['scripts/agent-loop-efficiency-trends.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeReceipt(dir, name, receipt) {
  writeFileSync(join(dir, name), `${JSON.stringify(receipt, null, 2)}\n`);
}

function loopReceipt(overrides = {}) {
  const generatedAt = overrides.generated_at || '2026-06-30T00:00:00.000Z';
  return {
    ok: true,
    mode: 'loop-run',
    generated_at: generatedAt,
    run_id: overrides.run_id || generatedAt,
    duration_ms: 100,
    totals: {
      loops: 2,
      ok: 1,
      attention: 1,
      skipped: 0,
      commands: 3,
    },
    efficiency_metrics: {
      schema_version: 'aipedia.loop-efficiency-metrics.v1',
      wall_duration_ms: 100,
      total_command_duration_ms: 90,
      command_count: 3,
      loop_count: 2,
      ok_loop_count: 1,
      attention_loop_count: 1,
      skipped_loop_count: 0,
      average_command_duration_ms: 30,
      commands_per_second: 30,
      loops_per_second: 20,
      attention_rate: 0.5,
      skipped_rate: 0,
      artifact_ref_count: 5,
      embedded_command_artifact_count: 3,
      system_artifact_count: 2,
      content_artifact_count: 0,
      other_artifact_count: 0,
      system_artifacts_per_second: 20,
      persisted_full_receipt_bytes: 4000,
      persisted_latest_receipt_bytes: 2000,
      slowest_commands: [
        {
          loop_id: 'performance-ux',
          label: 'indexability audit',
          status: 'attention',
          duration_ms: 60,
        },
      ],
    },
    ...overrides,
  };
}

test('loop efficiency trends summarize recent metric receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-efficiency-trends-'));
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    mkdirSync(ledgerDir, { recursive: true });
    writeReceipt(ledgerDir, '2026-06-30T00-00-00-000Z-loop-run.json', loopReceipt({
      generated_at: '2026-06-30T00:00:00.000Z',
      run_id: 'run-1',
    }));
    writeReceipt(ledgerDir, '2026-06-30T01-00-00-000Z-loop-run.json', loopReceipt({
      generated_at: '2026-06-30T01:00:00.000Z',
      run_id: 'run-2',
      duration_ms: 80,
      efficiency_metrics: {
        ...loopReceipt().efficiency_metrics,
        wall_duration_ms: 80,
        total_command_duration_ms: 70,
        attention_rate: 0.25,
        persisted_full_receipt_bytes: 3600,
        persisted_latest_receipt_bytes: 1600,
        system_artifact_count: 3,
        slowest_commands: [
          {
            loop_id: 'revenue-conversion',
            label: 'commercial CTA audit',
            status: 'ok',
            duration_ms: 55,
          },
        ],
      },
    }));

    const result = runTrends('--json', '--project-dir', dir, '--max-runs', '2');
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.schema_version, 'aipedia.loop-efficiency-trends.v1');
    assert.equal(report.totals.analyzed_runs, 2);
    assert.equal(report.totals.metrics_runs, 2);
    assert.equal(report.summary.median_wall_duration_ms, 90);
    assert.equal(report.summary.median_full_receipt_bytes, 3800);
    assert.equal(report.summary.latest.run_id, 'run-2');
    assert.equal(report.summary.latest.estimated_full_receipt_tokens, 900);
    assert.equal(report.summary.delta_from_previous.wall_duration_ms, -20);
    assert.equal(report.summary.delta_from_previous.persisted_full_receipt_bytes, -400);
    assert.equal(report.slowest_commands[0].label, 'indexability audit');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loop efficiency trends can fail closed on receipts without metrics', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-efficiency-missing-'));
  const ledgerDir = join(dir, '.agent', 'loop-runs', 'system');
  const staleReceipt = loopReceipt({
    generated_at: '2026-06-30T00:00:00.000Z',
    run_id: 'legacy-run',
  });
  delete staleReceipt.efficiency_metrics;

  try {
    mkdirSync(ledgerDir, { recursive: true });
    writeReceipt(ledgerDir, '2026-06-30T00-00-00-000Z-loop-run.json', staleReceipt);
    writeReceipt(ledgerDir, '2026-06-30T01-00-00-000Z-loop-run.json', loopReceipt({
      generated_at: '2026-06-30T01:00:00.000Z',
      run_id: 'metric-run',
    }));

    const result = runTrends(
      '--json',
      '--project-dir',
      dir,
      '--max-runs',
      '2',
      '--fail-on-missing-metrics',
    );
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.totals.missing_metrics_runs, 1);
    assert.equal(report.issues[0].code, 'missing-efficiency-metrics');
    assert.ok(report.next_actions[0].includes('loop:all:record'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('loop efficiency trends rejects invalid max-runs arguments', () => {
  const result = runTrends('--json', '--max-runs', '0');

  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'argument-error');
  assert.equal(report.issues[0].code, 'argument-invalid');
});
