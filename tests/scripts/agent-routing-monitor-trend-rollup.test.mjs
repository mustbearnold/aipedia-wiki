import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingMonitorTrendRollup, validateRoutingMonitorTrendRollupReceipt } from '../../scripts/lib/routing-monitor-trend-rollup.mjs';

function runRoutingMonitorTrendRollup(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-monitor-trend-rollup.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function trendSummary(overrides = {}) {
  const generatedAt = overrides.generatedAt || '2026-07-01T08:00:00.000Z';
  const runId = overrides.runId || 'fixture-routing-monitor-trend-a';
  const receiptPath = overrides.receiptPath || '.agent/evals/routing-monitor-trends/fixture-trend-a.json';
  const sourceRolloutId = overrides.sourceRolloutPolicyChangeId || 'fixture-default-routing';
  const tokenDelta = overrides.totalExactModelTokenDelta ?? 4200;
  const wallDelta = overrides.totalWallDurationDeltaMs ?? 3600;
  const quality = overrides.minQualityScore ?? 0.94;
  const accuracy = overrides.minAccuracyScore ?? 0.95;
  const healthy = overrides.healthy !== false;
  const failingScenarioCount = overrides.failingScenarioCount ?? 0;
  const scenarioBPassed = overrides.scenarioBPassed !== false;
  return {
    schema_version: 'aipedia.agent-routing-monitor-trends.v1',
    receipt_path: receiptPath,
    generated_at: generatedAt,
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: runId,
    workflow: 'routing-monitoring',
    trend_task: 'Fixture repeated routing monitor trend.',
    ok: healthy,
    status: healthy ? 'trend-healthy' : 'rollback-required',
    trend_healthy: healthy,
    repeated_monitoring_ready: true,
    same_source_rollout: true,
    unique_monitoring_suites: true,
    all_suites_fresh: true,
    latest_no_failing_scenarios: failingScenarioCount === 0,
    scenario_coverage_stable: true,
    scenarios_comparable: true,
    monitor_count: 2,
    healthy_monitor_count: healthy ? 2 : 1,
    unique_monitoring_suite_count: 2,
    source_rollout_count: 1,
    latest: {
      receipt_path: `.agent/evals/routing-monitors/${runId}-latest.json`,
      generated_at: generatedAt,
      run_id: `${runId}-latest-monitor`,
      status: healthy ? 'monitoring-healthy' : 'rollback-required',
      monitoring_healthy: healthy,
      rollback_required: !healthy,
      source_rollout_receipt: '.agent/evals/routing-rollouts/fixture-default-rollout.json',
      source_rollout_run_id: 'fixture-default-rollout',
      source_rollout_policy_change_id: sourceRolloutId,
      monitoring_suite_receipt: `.agent/evals/routing-suites/${runId}-suite.json`,
      monitoring_suite_run_id: `${runId}-suite`,
      scenario_count: 2,
      passing_scenario_count: failingScenarioCount === 0 ? 2 : 1,
      failing_scenario_count: failingScenarioCount,
      total_exact_model_token_delta: tokenDelta,
      total_wall_duration_delta_ms: wallDelta,
      min_quality_score: quality,
      min_accuracy_score: accuracy,
      max_residual_issue_count: 0,
      max_regression_count: 0,
    },
    scenario_points: [
      {
        id: 'fixture-jsonl-review',
        task_class: 'jsonl-correction-heavy-review',
        passed: true,
        recommended_candidate_id: 'orchestrated-specialists',
        winner_id: 'orchestrated-specialists',
        exact_model_token_delta: tokenDelta,
        wall_duration_delta_ms: wallDelta,
        quality_score: quality,
        accuracy_score: accuracy,
        residual_issue_count: 0,
        regression_count: 0,
        recommendation_stable: true,
      },
      {
        id: 'fixture-status-check',
        task_class: 'jsonl-tiny-status-check',
        passed: scenarioBPassed,
        recommended_candidate_id: 'single-agent',
        winner_id: 'single-agent',
        exact_model_token_delta: 600,
        wall_duration_delta_ms: 450,
        quality_score: 0.96,
        accuracy_score: 0.96,
        residual_issue_count: 0,
        regression_count: 0,
        recommendation_stable: true,
      },
    ],
  };
}

function healthyRollupReceipt() {
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [
      trendSummary({
        generatedAt: '2026-07-01T08:00:00.000Z',
        runId: 'fixture-routing-monitor-trend-a',
        receiptPath: '.agent/evals/routing-monitor-trends/fixture-trend-a.json',
        totalExactModelTokenDelta: 4200,
        totalWallDurationDeltaMs: 3600,
      }),
      trendSummary({
        generatedAt: '2026-07-01T12:00:00.000Z',
        runId: 'fixture-routing-monitor-trend-b',
        receiptPath: '.agent/evals/routing-monitor-trends/fixture-trend-b.json',
        totalExactModelTokenDelta: 4300,
        totalWallDurationDeltaMs: 3700,
      }),
    ],
    rollup_task: 'Fixture longer-window routing monitor trend rollup.',
  }, {
    generatedAt: '2026-07-01T12:05:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitor-trends/fixture-trend-a.json + .agent/evals/routing-monitor-trends/fixture-trend-b.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing monitor trend rollup writes ready longer-window receipts', () => {
  const receipt = healthyRollupReceipt();
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-monitor-trend-rollup.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.rollup_evaluation.status, 'rollup-ready');
  assert.equal(receipt.rollup_evaluation.long_window_ready, true);
  assert.equal(receipt.rollup_evaluation.all_trends_healthy, true);
  assert.equal(receipt.rollup_evaluation.scenarios_comparable, true);
  assert.equal(receipt.totals.trend_count, 2);
  assert.equal(receipt.totals.source_rollout_policy_change_count, 1);
  assert.deepEqual(validateRoutingMonitorTrendRollupReceipt(receipt), []);
});

test('agent routing monitor trend rollup keeps one trend window in attention state', () => {
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [trendSummary()],
  }, {
    generatedAt: '2026-07-01T12:10:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitor-trends/fixture-trend-a.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollup_evaluation.status, 'rollup-attention');
  assert.equal(result.receipt.rollup_evaluation.long_window_ready, false);
  assert.equal(result.receipt.rollup_evaluation.reason, 'At least two routing monitor trend receipts are required before longer-window trend health can pass.');
  assert.deepEqual(validateRoutingMonitorTrendRollupReceipt(result.receipt), []);
});

test('agent routing monitor trend rollup blocks duplicate trend windows', () => {
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [trendSummary(), trendSummary()],
  }, {
    generatedAt: '2026-07-01T12:15:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitor-trends/fixture-trend-a.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollup_evaluation.unique_trend_receipts, false);
  assert.equal(result.receipt.rollup_evaluation.unique_trend_run_ids, false);
});

test('agent routing monitor trend rollup flags latest unhealthy trend windows', () => {
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [
      trendSummary({ runId: 'fixture-routing-monitor-trend-a', receiptPath: '.agent/evals/routing-monitor-trends/fixture-trend-a.json' }),
      trendSummary({
        generatedAt: '2026-07-01T12:00:00.000Z',
        runId: 'fixture-routing-monitor-trend-b',
        receiptPath: '.agent/evals/routing-monitor-trends/fixture-trend-b.json',
        healthy: false,
        failingScenarioCount: 1,
        scenarioBPassed: false,
      }),
    ],
  }, {
    generatedAt: '2026-07-01T12:20:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitor-trends/fixture-trend-a.json + .agent/evals/routing-monitor-trends/fixture-trend-b.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollup_evaluation.status, 'rollback-required');
  assert.equal(result.receipt.rollup_evaluation.latest_trend_healthy, false);
  assert.equal(result.receipt.stability_summary.new_failure_scenarios.includes('fixture-status-check'), true);
});

test('routing monitor trend rollup validation rejects tampered readiness state', () => {
  const receipt = healthyRollupReceipt();
  receipt.rollup_evaluation.rollup_ready = false;
  const issues = validateRoutingMonitorTrendRollupReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-monitor-trend-rollup-mismatch'));
});

test('agent routing monitor trend rollup CLI writes ready rollup receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-monitor-trend-rollup-'));
  try {
    writeJson(join(root, 'trend-a.json'), trendSummary({
      generatedAt: '2026-07-01T08:00:00.000Z',
      runId: 'fixture-routing-monitor-trend-a',
      receiptPath: 'trend-a.json',
    }));
    writeJson(join(root, 'trend-b.json'), trendSummary({
      generatedAt: '2026-07-01T12:00:00.000Z',
      runId: 'fixture-routing-monitor-trend-b',
      receiptPath: 'trend-b.json',
      totalExactModelTokenDelta: 4300,
      totalWallDurationDeltaMs: 3700,
    }));
    const result = runRoutingMonitorTrendRollup([
      '--project-dir',
      root,
      '--trend',
      'trend-a.json',
      '--trend',
      'trend-b.json',
      '--out',
      '.agent/evals/routing-monitor-trend-rollups/fixture-rollup.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-monitor-trend-rollups/fixture-rollup.json');
    assert.equal(receipt.rollup_evaluation.status, 'rollup-ready');
    const written = JSON.parse(readFileSync(join(root, '.agent/evals/routing-monitor-trend-rollups/fixture-rollup.json'), 'utf8'));
    assert.equal(written.receipt_path, '.agent/evals/routing-monitor-trend-rollups/fixture-rollup.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
