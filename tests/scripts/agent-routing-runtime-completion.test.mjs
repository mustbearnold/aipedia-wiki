import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingHandoff } from '../../scripts/lib/routing-handoff.mjs';
import { buildRoutingMonitorTrendRollup } from '../../scripts/lib/routing-monitor-trend-rollup.mjs';
import { buildRoutingRuntimeCompletion, validateRoutingRuntimeCompletionReceipt } from '../../scripts/lib/routing-runtime-completion.mjs';

const DEFAULT_ROLLOUT_PATH = '.agent/evals/routing-rollouts/2026-06-30-slice-86-default-enabled-rollout-receipt.json';
const MONITOR_PATH = '.agent/evals/routing-monitors/2026-06-30-slice-87-post-default-monitor-receipt.json';
const TREND_PATH = '.agent/evals/routing-monitor-trends/2026-06-30-slice-89-post-default-monitor-trends.json';
const SINGLE_WINDOW_ROLLUP_PATH = '.agent/evals/routing-monitor-trend-rollups/2026-06-30-slice-92-single-window-rollup.json';

function runRuntimeCompletion(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-runtime-completion.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function runtimeHandoffFixture(mode = 'runtime') {
  const result = buildRoutingHandoff({
    default_rollout: readJson(DEFAULT_ROLLOUT_PATH),
    monitor: readJson(MONITOR_PATH),
    change_plan: {
      mode,
      change_id: 'fixture-runtime-default-routing',
      operator: 'codex-routing-operator',
      apply_command: 'runtime apply fixture default routing',
      verification_command: 'runtime verify fixture default routing',
    },
  }, {
    generatedAt: '2026-07-01T08:00:00.000Z',
    projectDir: '.',
    source: `${DEFAULT_ROLLOUT_PATH} + ${MONITOR_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = `.agent/evals/routing-handoffs/fixture-${mode}-runtime-handoff.json`;
  return receipt;
}

function healthyTrendFixture() {
  return readJson(TREND_PATH);
}

function readyRollupFixture() {
  const baseTrend = healthyTrendFixture();
  const secondTrend = compactTrendSummaryFromReceipt(baseTrend, {
    generatedAt: '2026-07-01T12:00:00.000Z',
    runId: 'fixture-routing-monitor-trend-b',
    receiptPath: '.agent/evals/routing-monitor-trends/fixture-runtime-completion-trend-b.json',
    latestMonitorReceipt: '.agent/evals/routing-monitors/fixture-runtime-completion-monitor-b.json',
    latestMonitorRunId: 'fixture-runtime-completion-monitor-b',
    monitoringSuiteReceipt: '.agent/evals/routing-suites/fixture-runtime-completion-suite-b.json',
    monitoringSuiteRunId: 'fixture-runtime-completion-suite-b',
  });
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [baseTrend, secondTrend],
    rollup_task: 'Fixture runtime completion longer-window rollup.',
  }, {
    generatedAt: '2026-07-01T12:05:00.000Z',
    projectDir: '.',
    source: `${TREND_PATH} + .agent/evals/routing-monitor-trends/fixture-runtime-completion-trend-b.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = '.agent/evals/routing-monitor-trend-rollups/fixture-runtime-completion-ready-rollup.json';
  return receipt;
}

function unrelatedReadyRollupFixture() {
  const baseTrend = healthyTrendFixture();
  const firstTrend = compactTrendSummaryFromReceipt(baseTrend, {
    generatedAt: '2026-07-01T08:00:00.000Z',
    runId: 'fixture-unrelated-routing-monitor-trend-a',
    receiptPath: '.agent/evals/routing-monitor-trends/fixture-unrelated-trend-a.json',
    latestMonitorReceipt: '.agent/evals/routing-monitors/fixture-unrelated-monitor-a.json',
    latestMonitorRunId: 'fixture-unrelated-monitor-a',
    monitoringSuiteReceipt: '.agent/evals/routing-suites/fixture-unrelated-suite-a.json',
    monitoringSuiteRunId: 'fixture-unrelated-suite-a',
  });
  const secondTrend = compactTrendSummaryFromReceipt(baseTrend, {
    generatedAt: '2026-07-01T12:00:00.000Z',
    runId: 'fixture-unrelated-routing-monitor-trend-b',
    receiptPath: '.agent/evals/routing-monitor-trends/fixture-unrelated-trend-b.json',
    latestMonitorReceipt: '.agent/evals/routing-monitors/fixture-unrelated-monitor-b.json',
    latestMonitorRunId: 'fixture-unrelated-monitor-b',
    monitoringSuiteReceipt: '.agent/evals/routing-suites/fixture-unrelated-suite-b.json',
    monitoringSuiteRunId: 'fixture-unrelated-suite-b',
  });
  const result = buildRoutingMonitorTrendRollup({
    trend_receipts: [firstTrend, secondTrend],
    rollup_task: 'Fixture unrelated runtime completion longer-window rollup.',
  }, {
    generatedAt: '2026-07-01T12:06:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitor-trends/fixture-unrelated-trend-a.json + .agent/evals/routing-monitor-trends/fixture-unrelated-trend-b.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = '.agent/evals/routing-monitor-trend-rollups/fixture-runtime-completion-unrelated-ready-rollup.json';
  return receipt;
}

function compactTrendSummaryFromReceipt(receipt, overrides = {}) {
  const generatedAt = overrides.generatedAt || receipt.generated_at;
  const runId = overrides.runId || receipt.run_id;
  const latest = receipt.latest || {};
  const healthy = overrides.healthy !== false;
  return {
    schema_version: 'aipedia.agent-routing-monitor-trends.v1',
    receipt_path: overrides.receiptPath || receipt.receipt_path,
    generated_at: generatedAt,
    goal_id: receipt.goal_id,
    run_id: runId,
    workflow: receipt.workflow,
    trend_task: receipt.trend_task,
    ok: healthy,
    status: healthy ? 'trend-healthy' : 'rollback-required',
    trend_healthy: healthy,
    repeated_monitoring_ready: true,
    same_source_rollout: true,
    unique_monitoring_suites: true,
    all_suites_fresh: true,
    latest_no_failing_scenarios: true,
    scenario_coverage_stable: true,
    scenarios_comparable: true,
    monitor_count: receipt.totals.monitor_count,
    healthy_monitor_count: receipt.totals.healthy_monitor_count,
    unique_monitoring_suite_count: receipt.totals.unique_monitoring_suite_count,
    source_rollout_count: receipt.totals.unique_source_rollout_count,
    latest: {
      receipt_path: overrides.latestMonitorReceipt || latest.receipt_path,
      generated_at: generatedAt,
      run_id: overrides.latestMonitorRunId || latest.run_id,
      status: healthy ? 'monitoring-healthy' : 'rollback-required',
      monitoring_healthy: healthy,
      rollback_required: !healthy,
      source_rollout_receipt: latest.source_rollout_receipt,
      source_rollout_run_id: latest.source_rollout_run_id,
      source_rollout_policy_change_id: latest.source_rollout_policy_change_id,
      monitoring_suite_receipt: overrides.monitoringSuiteReceipt || latest.monitoring_suite_receipt,
      monitoring_suite_run_id: overrides.monitoringSuiteRunId || latest.monitoring_suite_run_id,
      scenario_count: latest.scenario_count,
      passing_scenario_count: latest.passing_scenario_count,
      failing_scenario_count: 0,
      total_exact_model_token_delta: latest.total_exact_model_token_delta,
      total_wall_duration_delta_ms: latest.total_wall_duration_delta_ms,
      min_quality_score: latest.min_quality_score,
      min_accuracy_score: latest.min_accuracy_score,
      max_residual_issue_count: latest.max_residual_issue_count,
      max_regression_count: latest.max_regression_count,
    },
    scenario_points: receipt.scenario_trends.map((trend) => {
      const latestObservation = trend.observations.at(-1);
      return {
        id: trend.id,
        task_class: trend.task_class,
        passed: trend.latest_passed,
        recommended_candidate_id: latestObservation.recommended_candidate_id,
        winner_id: latestObservation.winner_id,
        exact_model_token_delta: latestObservation.exact_model_token_delta,
        wall_duration_delta_ms: latestObservation.wall_duration_delta_ms,
        quality_score: latestObservation.quality_score,
        accuracy_score: latestObservation.accuracy_score,
        residual_issue_count: latestObservation.residual_issue_count,
        regression_count: latestObservation.regression_count,
        recommendation_stable: trend.recommendation_stable,
      };
    }),
  };
}

function runtimeCompletionFields(overrides = {}) {
  return {
    runtime_system: 'aipedia-agent-router',
    applied_at: '2026-07-01T08:05:00.000Z',
    verification_status: 'passed',
    ...overrides,
  };
}

function modelTokenUsageFixture() {
  return {
    entries: [
      {
        model: 'gpt-5.5',
        usage: {
          input_tokens: 1200,
          output_tokens: 300,
          total_tokens: 1500,
          input_token_details: { cached_tokens: 200 },
          output_token_details: { reasoning_tokens: 90 },
        },
      },
      {
        model: 'gpt-5.5',
        usage: {
          input_tokens: 800,
          output_tokens: 200,
          total_tokens: 1000,
          input_token_details: { cached_tokens: 100 },
          output_token_details: { reasoning_tokens: 40 },
        },
      },
    ],
  };
}

function readyCompletionReceipt() {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields(),
  }, {
    generatedAt: '2026-07-01T08:10:00.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing runtime completion writes ready receipts for runtime default changes', () => {
  const receipt = readyCompletionReceipt();
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-runtime-completion.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.completion_evaluation.status, 'completion-ready');
  assert.equal(receipt.completion_evaluation.handoff_ready, true);
  assert.equal(receipt.completion_evaluation.handoff_runtime_mode, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_healthy, true);
  assert.equal(receipt.completion_evaluation.rollout_lineage_match, true);
  assert.equal(receipt.completion_evaluation.handoff_monitor_in_trend, true);
  assert.equal(receipt.completion_evaluation.runtime_verification_passed, true);
  assert.deepEqual(validateRoutingRuntimeCompletionReceipt(receipt), []);
});

test('agent routing runtime completion blocks record-only handoff receipts', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('record-only'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields(),
  }, {
    generatedAt: '2026-07-01T08:15:00.000Z',
    projectDir: '.',
    source: 'fixture-record-only-handoff.json + fixture-monitor-trends.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.completion_evaluation.handoff_runtime_mode, false);
  assert.match(result.receipt.completion_evaluation.reason, /runtime mode/);
});

test('agent routing runtime completion blocks monitor trends that omit the handoff monitor', () => {
  const ready = readyCompletionReceipt();
  const monitorTrends = structuredClone(ready.monitor_trends);
  monitorTrends.monitor_receipts = monitorTrends.monitor_receipts.filter((monitor) => monitor.receipt_path !== ready.handoff.monitor_receipt);
  const result = buildRoutingRuntimeCompletion({
    handoff: ready.handoff,
    monitor_trends: monitorTrends,
    runtime_completion: ready.runtime_completion,
  }, {
    generatedAt: '2026-07-01T08:20:00.000Z',
    projectDir: '.',
    source: ready.source,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.completion_evaluation.handoff_monitor_in_trend, false);
});

test('agent routing runtime completion blocks failed runtime verification', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields({ verification_status: 'failed' }),
  }, {
    generatedAt: '2026-07-01T08:25:00.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.completion_evaluation.runtime_verification_passed, false);
});

test('agent routing runtime completion records required exact model token usage', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields({ require_model_token_usage: true }),
    model_token_usage: modelTokenUsageFixture(),
    model_token_usage_source: 'fixture-runtime-token-usage.json',
    model_token_context: {
      workflow: 'routing-runtime-completion',
      run_id: 'runtime-token-run',
      orchestrator: 'meta-orchestrator',
      subagent: 'runtime-router',
    },
  }, {
    generatedAt: '2026-07-01T08:27:00.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.ok, true);
  assert.equal(receipt.model_token_usage.schema_version, 'aipedia.model-token-usage.v1');
  assert.equal(receipt.model_token_usage.total_tokens, 2500);
  assert.equal(receipt.model_token_usage.cached_input_tokens, 300);
  assert.equal(receipt.model_token_usage.reasoning_tokens, 130);
  assert.equal(receipt.model_token_usage.workflow_breakdown[0].id, 'routing-runtime-completion');
  assert.equal(receipt.model_token_usage.subagent_breakdown[0].id, 'runtime-router');
  assert.equal(receipt.completion_evaluation.model_token_usage_required, true);
  assert.equal(receipt.completion_evaluation.exact_model_tokens_attached, true);
  assert.equal(receipt.completion_evaluation.exact_model_total_tokens, 2500);
  assert.deepEqual(validateRoutingRuntimeCompletionReceipt(receipt), []);
});

test('agent routing runtime completion records required ready monitor trend rollups', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    monitor_trend_rollup: readyRollupFixture(),
    runtime_completion: runtimeCompletionFields({ require_monitor_trend_rollup: true }),
  }, {
    generatedAt: '2026-07-01T08:26:00.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json + fixture-rollup.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.ok, true);
  assert.equal(receipt.monitor_trend_rollup.schema_version, 'aipedia.agent-routing-monitor-trend-rollup.v1');
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_required, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_attached, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_ready, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_includes_monitor_trend, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_gate_passed, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_trend_count, 2);
  assert.match(receipt.completion_evaluation.reason, /longer-window rollup/);
  assert.deepEqual(validateRoutingRuntimeCompletionReceipt(receipt), []);
});

test('agent routing runtime completion blocks required missing monitor trend rollups', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields({ require_monitor_trend_rollup: true }),
  }, {
    generatedAt: '2026-07-01T08:26:30.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json',
  });
  assert.equal(result.receipt, null);
  assert.ok(result.issues.some((issue) => issue.code === 'routing-runtime-completion-monitor-trend-rollup-missing'));
});

test('agent routing runtime completion blocks attention monitor trend rollups when required', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    monitor_trend_rollup: readJson(SINGLE_WINDOW_ROLLUP_PATH),
    runtime_completion: runtimeCompletionFields({ require_monitor_trend_rollup: true }),
  }, {
    generatedAt: '2026-07-01T08:26:45.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json + slice-92-single-window-rollup.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.ok, false);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_attached, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_ready, false);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_includes_monitor_trend, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_gate_passed, false);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_status, 'rollup-attention');
  assert.match(receipt.completion_evaluation.reason, /not ready/);
  assert.deepEqual(validateRoutingRuntimeCompletionReceipt(receipt), []);
});

test('agent routing runtime completion blocks rollups that omit the attached monitor trend', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    monitor_trend_rollup: unrelatedReadyRollupFixture(),
    runtime_completion: runtimeCompletionFields(),
  }, {
    generatedAt: '2026-07-01T08:27:30.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json + fixture-rollup.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.ok, false);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_ready, true);
  assert.equal(receipt.completion_evaluation.monitor_trend_rollup_includes_monitor_trend, false);
  assert.match(receipt.completion_evaluation.reason, /must include/);
});

test('agent routing runtime completion blocks required missing exact model token usage', () => {
  const result = buildRoutingRuntimeCompletion({
    handoff: runtimeHandoffFixture('runtime'),
    monitor_trends: healthyTrendFixture(),
    runtime_completion: runtimeCompletionFields({ require_model_token_usage: true }),
  }, {
    generatedAt: '2026-07-01T08:28:00.000Z',
    projectDir: '.',
    source: 'fixture-runtime-handoff.json + fixture-monitor-trends.json',
  });
  assert.equal(result.receipt, null);
  assert.ok(result.issues.some((issue) => issue.code === 'routing-runtime-completion-model-token-missing'));
});

test('routing runtime completion validation rejects tampered readiness state', () => {
  const receipt = readyCompletionReceipt();
  receipt.completion_evaluation.runtime_verification_passed = false;
  const issues = validateRoutingRuntimeCompletionReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-runtime-completion-mismatch'));
});

test('agent routing runtime completion CLI writes ready receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-runtime-completion-'));
  try {
    writeJson(join(root, 'handoff.json'), runtimeHandoffFixture('runtime'));
    writeJson(join(root, 'trend.json'), healthyTrendFixture());
    const result = runRuntimeCompletion([
      '--project-dir',
      root,
      '--handoff',
      'handoff.json',
      '--monitor-trends',
      'trend.json',
      '--runtime-system',
      'aipedia-agent-router',
      '--applied-at',
      '2026-07-01T08:30:00.000Z',
      '--verification-status',
      'passed',
      '--out',
      'completion.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(readFileSync(join(root, 'completion.json'), 'utf8'));
    assert.equal(receipt.ok, true);
    assert.equal(receipt.receipt_path, 'completion.json');
    assert.equal(receipt.completion_evaluation.status, 'completion-ready');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing runtime completion CLI attaches exact model token usage from file', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-runtime-completion-token-'));
  try {
    writeJson(join(root, 'handoff.json'), runtimeHandoffFixture('runtime'));
    writeJson(join(root, 'trend.json'), healthyTrendFixture());
    writeJson(join(root, 'token-usage.json'), modelTokenUsageFixture());
    const result = runRuntimeCompletion([
      '--project-dir',
      root,
      '--handoff',
      'handoff.json',
      '--monitor-trends',
      'trend.json',
      '--runtime-system',
      'aipedia-agent-router',
      '--applied-at',
      '2026-07-01T08:35:00.000Z',
      '--verification-status',
      'passed',
      '--model-token-usage',
      'token-usage.json',
      '--require-model-token-usage',
      '--model-token-workflow',
      'routing-runtime-completion',
      '--model-token-run-id',
      'runtime-token-run',
      '--model-token-orchestrator',
      'meta-orchestrator',
      '--model-token-subagent',
      'runtime-router',
      '--out',
      'completion.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(readFileSync(join(root, 'completion.json'), 'utf8'));
    assert.equal(receipt.ok, true);
    assert.equal(receipt.model_token_usage.source, 'token-usage.json');
    assert.equal(receipt.model_token_usage.total_tokens, 2500);
    assert.equal(receipt.completion_evaluation.exact_model_tokens_attached, true);
    assert.equal(receipt.runtime_completion.require_model_token_usage, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing runtime completion CLI requires ready monitor trend rollup when requested', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-runtime-completion-rollup-'));
  try {
    writeJson(join(root, 'handoff.json'), runtimeHandoffFixture('runtime'));
    writeJson(join(root, 'trend.json'), healthyTrendFixture());
    writeJson(join(root, 'rollup.json'), readyRollupFixture());
    const result = runRuntimeCompletion([
      '--project-dir',
      root,
      '--handoff',
      'handoff.json',
      '--monitor-trends',
      'trend.json',
      '--monitor-trend-rollup',
      'rollup.json',
      '--require-monitor-trend-rollup',
      '--runtime-system',
      'aipedia-agent-router',
      '--applied-at',
      '2026-07-01T08:40:00.000Z',
      '--verification-status',
      'passed',
      '--out',
      'completion.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(readFileSync(join(root, 'completion.json'), 'utf8'));
    assert.equal(receipt.ok, true);
    assert.equal(receipt.completion_evaluation.monitor_trend_rollup_required, true);
    assert.equal(receipt.completion_evaluation.monitor_trend_rollup_ready, true);
    assert.equal(receipt.completion_evaluation.monitor_trend_rollup_includes_monitor_trend, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
