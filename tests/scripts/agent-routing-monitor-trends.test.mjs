import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingMonitor } from '../../scripts/lib/routing-monitor.mjs';
import { buildRoutingMonitorTrends, validateRoutingMonitorTrendsReceipt } from '../../scripts/lib/routing-monitor-trends.mjs';
import { buildRoutingRollout } from '../../scripts/lib/routing-rollout.mjs';

const REVIEW_FIXTURE_PATH = '.agent/evals/routing-policy-reviews/2026-06-30-slice-83-fresh-policy-review-receipt.json';
const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-82-fresh-policy-pilot-suite-receipt.json';

function runRoutingMonitorTrends(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-monitor-trends.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function reviewFixture() {
  return JSON.parse(readFileSync(REVIEW_FIXTURE_PATH, 'utf8'));
}

function suiteFixture(overrides = {}) {
  const suite = JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8'));
  suite.receipt_path = overrides.receipt_path || '.agent/evals/routing-suites/fixture-monitoring-suite.json';
  suite.run_id = overrides.run_id || 'fixture-monitoring-suite';
  suite.generated_at = overrides.generated_at || suite.generated_at;
  return suite;
}

function canaryRolloutFixture() {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-canary-rollout-suite.json',
      run_id: 'fixture-canary-rollout-suite',
    }),
    rollout: { stage: 'canary', traffic_percent: 5 },
  }, {
    generatedAt: '2026-07-01T06:00:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/fixture-canary-rollout-suite.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = '.agent/evals/routing-rollouts/fixture-canary-rollout.json';
  return receipt;
}

function defaultRolloutFixture() {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-default-rollout-suite.json',
      run_id: 'fixture-default-rollout-suite',
    }),
    post_canary: canaryRolloutFixture(),
    rollout: { stage: 'default-enabled', traffic_percent: 100 },
  }, {
    generatedAt: '2026-07-01T06:05:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/fixture-default-rollout-suite.json + .agent/evals/routing-rollouts/fixture-canary-rollout.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = '.agent/evals/routing-rollouts/fixture-default-rollout.json';
  return receipt;
}

function rollbackPlan() {
  return {
    owner: 'codex-routing-operator',
    rollback_command: 'npm --silent run agent:routing:policy -- --rollback fixture-default-routing --json',
    verification_command: 'npm --silent run agent:routing:monitor -- --default-rollout fixture-rollback.json --suite fixture-rollback-suite.json --json',
  };
}

function healthyMonitorReceipt(overrides = {}) {
  const suitePath = overrides.suitePath || '.agent/evals/routing-suites/fixture-post-default-monitoring-suite.json';
  const suiteRunId = overrides.suiteRunId || 'fixture-post-default-monitoring-suite';
  const result = buildRoutingMonitor({
    default_rollout: defaultRolloutFixture(),
    suite: suiteFixture({
      receipt_path: suitePath,
      run_id: suiteRunId,
    }),
    rollback_plan: rollbackPlan(),
  }, {
    generatedAt: overrides.generatedAt || '2026-07-01T06:30:00.000Z',
    projectDir: '.',
    source: `.agent/evals/routing-rollouts/fixture-default-rollout.json + ${suitePath}`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = overrides.receiptPath || '.agent/evals/routing-monitors/fixture-monitor-a.json';
  return receipt;
}

function unhealthyMonitorReceipt() {
  const result = buildRoutingMonitor({
    default_rollout: defaultRolloutFixture(),
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-c.json',
      run_id: 'fixture-post-default-monitoring-suite-c',
    }),
  }, {
    generatedAt: '2026-07-01T06:50:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-rollouts/fixture-default-rollout.json + .agent/evals/routing-suites/fixture-post-default-monitoring-suite-c.json',
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = '.agent/evals/routing-monitors/fixture-monitor-c.json';
  return receipt;
}

function healthyTrendReceipt() {
  const result = buildRoutingMonitorTrends({
    monitor_receipts: [
      healthyMonitorReceipt({
        generatedAt: '2026-07-01T06:30:00.000Z',
        suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-a.json',
        suiteRunId: 'fixture-post-default-monitoring-suite-a',
        receiptPath: '.agent/evals/routing-monitors/fixture-monitor-a.json',
      }),
      healthyMonitorReceipt({
        generatedAt: '2026-07-01T07:00:00.000Z',
        suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-b.json',
        suiteRunId: 'fixture-post-default-monitoring-suite-b',
        receiptPath: '.agent/evals/routing-monitors/fixture-monitor-b.json',
      }),
    ],
    trend_task: 'Fixture repeated post-default routing monitor trend.',
  }, {
    generatedAt: '2026-07-01T07:05:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitors/fixture-monitor-a.json + .agent/evals/routing-monitors/fixture-monitor-b.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing monitor trends writes healthy repeated monitor trend receipts', () => {
  const receipt = healthyTrendReceipt();
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-monitor-trends.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.drift_evaluation.status, 'trend-healthy');
  assert.equal(receipt.drift_evaluation.repeated_monitoring_ready, true);
  assert.equal(receipt.drift_evaluation.same_source_rollout, true);
  assert.equal(receipt.drift_evaluation.unique_monitoring_suites, true);
  assert.equal(receipt.totals.monitor_count, 2);
  assert.equal(receipt.totals.unique_monitoring_suite_count, 2);
  assert.ok(receipt.scenario_trends.every((trend) => trend.comparable));
  assert.deepEqual(validateRoutingMonitorTrendsReceipt(receipt), []);
});

test('agent routing monitor trends keeps a single monitor in attention state', () => {
  const result = buildRoutingMonitorTrends({
    monitor_receipts: [healthyMonitorReceipt()],
  }, {
    generatedAt: '2026-07-01T07:10:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-monitors/fixture-monitor-a.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.drift_evaluation.status, 'drift-attention');
  assert.equal(result.receipt.drift_evaluation.repeated_monitoring_ready, false);
});

test('agent routing monitor trends blocks reused monitoring suites', () => {
  const first = healthyMonitorReceipt({
    generatedAt: '2026-07-01T06:30:00.000Z',
    receiptPath: '.agent/evals/routing-monitors/fixture-monitor-a.json',
  });
  const second = healthyMonitorReceipt({
    generatedAt: '2026-07-01T07:00:00.000Z',
    receiptPath: '.agent/evals/routing-monitors/fixture-monitor-b.json',
  });
  const result = buildRoutingMonitorTrends({
    monitor_receipts: [first, second],
  }, {
    generatedAt: '2026-07-01T07:15:00.000Z',
    projectDir: '.',
    source: `${first.receipt_path} + ${second.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.drift_evaluation.unique_monitoring_suites, false);
});

test('agent routing monitor trends blocks different default rollout lineage', () => {
  const first = healthyMonitorReceipt({
    generatedAt: '2026-07-01T06:30:00.000Z',
    suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-a.json',
    suiteRunId: 'fixture-post-default-monitoring-suite-a',
    receiptPath: '.agent/evals/routing-monitors/fixture-monitor-a.json',
  });
  const second = healthyMonitorReceipt({
    generatedAt: '2026-07-01T07:00:00.000Z',
    suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-b.json',
    suiteRunId: 'fixture-post-default-monitoring-suite-b',
    receiptPath: '.agent/evals/routing-monitors/fixture-monitor-b.json',
  });
  second.source_rollout.receipt_path = '.agent/evals/routing-rollouts/fixture-other-default-rollout.json';
  second.source_rollout.run_id = 'fixture-other-default-rollout';
  const result = buildRoutingMonitorTrends({
    monitor_receipts: [first, second],
  }, {
    generatedAt: '2026-07-01T07:20:00.000Z',
    projectDir: '.',
    source: `${first.receipt_path} + ${second.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.drift_evaluation.same_source_rollout, false);
});

test('agent routing monitor trends blocks degraded latest monitor', () => {
  const first = healthyMonitorReceipt({
    generatedAt: '2026-07-01T06:30:00.000Z',
    suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-a.json',
    suiteRunId: 'fixture-post-default-monitoring-suite-a',
    receiptPath: '.agent/evals/routing-monitors/fixture-monitor-a.json',
  });
  const latest = unhealthyMonitorReceipt();
  const result = buildRoutingMonitorTrends({
    monitor_receipts: [first, latest],
  }, {
    generatedAt: '2026-07-01T07:25:00.000Z',
    projectDir: '.',
    source: `${first.receipt_path} + ${latest.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.drift_evaluation.status, 'rollback-required');
  assert.equal(result.receipt.drift_evaluation.latest_healthy, false);
});

test('routing monitor trend validation rejects tampered drift state', () => {
  const receipt = healthyTrendReceipt();
  receipt.drift_evaluation.same_source_rollout = false;
  const issues = validateRoutingMonitorTrendsReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-monitor-trends-mismatch'));
});

test('agent routing monitor trends CLI writes healthy trend receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-monitor-trends-'));
  try {
    writeJson(join(root, 'monitor-a.json'), healthyMonitorReceipt({
      generatedAt: '2026-07-01T06:30:00.000Z',
      suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-a.json',
      suiteRunId: 'fixture-post-default-monitoring-suite-a',
      receiptPath: 'monitor-a.json',
    }));
    writeJson(join(root, 'monitor-b.json'), healthyMonitorReceipt({
      generatedAt: '2026-07-01T07:00:00.000Z',
      suitePath: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite-b.json',
      suiteRunId: 'fixture-post-default-monitoring-suite-b',
      receiptPath: 'monitor-b.json',
    }));
    const result = runRoutingMonitorTrends([
      '--project-dir',
      root,
      '--monitor',
      'monitor-a.json',
      '--monitor',
      'monitor-b.json',
      '--out',
      '.agent/evals/routing-monitor-trends/fixture-trends.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-monitor-trends/fixture-trends.json');
    assert.equal(receipt.drift_evaluation.status, 'trend-healthy');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
