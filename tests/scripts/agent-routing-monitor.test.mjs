import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingMonitor, validateRoutingMonitorReceipt } from '../../scripts/lib/routing-monitor.mjs';
import { buildRoutingRollout } from '../../scripts/lib/routing-rollout.mjs';

const REVIEW_FIXTURE_PATH = '.agent/evals/routing-policy-reviews/2026-06-30-slice-83-fresh-policy-review-receipt.json';
const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-82-fresh-policy-pilot-suite-receipt.json';

function runRoutingMonitor(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-monitor.mjs', ...args], {
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

function healthyMonitorReceipt() {
  const result = buildRoutingMonitor({
    default_rollout: defaultRolloutFixture(),
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite.json',
      run_id: 'fixture-post-default-monitoring-suite',
    }),
    rollback_plan: rollbackPlan(),
  }, {
    generatedAt: '2026-07-01T06:30:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-rollouts/fixture-default-rollout.json + .agent/evals/routing-suites/fixture-post-default-monitoring-suite.json',
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing monitor writes healthy post-default receipts with rollback plan', () => {
  const receipt = healthyMonitorReceipt();
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-monitor.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.monitoring_evaluation.status, 'monitoring-healthy');
  assert.equal(receipt.monitoring_evaluation.rollback_required, false);
  assert.equal(receipt.monitoring_evaluation.source_default_ready, true);
  assert.equal(receipt.monitoring_evaluation.fresh_monitoring_suite, true);
  assert.equal(receipt.monitoring_evaluation.rollback_plan_ready, true);
  assert.equal(receipt.totals.passing_scenario_count, receipt.totals.scenario_count);
});

test('agent routing monitor requires rollback commands before healthy status', () => {
  const result = buildRoutingMonitor({
    default_rollout: defaultRolloutFixture(),
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite.json',
      run_id: 'fixture-post-default-monitoring-suite',
    }),
  }, {
    generatedAt: '2026-07-01T06:35:00.000Z',
    projectDir: '.',
    source: '.agent/evals/routing-rollouts/fixture-default-rollout.json + .agent/evals/routing-suites/fixture-post-default-monitoring-suite.json',
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.monitoring_evaluation.status, 'rollback-required');
  assert.equal(result.receipt.monitoring_evaluation.rollback_plan_ready, false);
});

test('agent routing monitor blocks reuse of the default rollout suite', () => {
  const sourceRollout = defaultRolloutFixture();
  const result = buildRoutingMonitor({
    default_rollout: sourceRollout,
    suite: suiteFixture({
      receipt_path: sourceRollout.rollout_suite.receipt_path,
      run_id: sourceRollout.rollout_suite.run_id,
    }),
    rollback_plan: rollbackPlan(),
  }, {
    generatedAt: '2026-07-01T06:40:00.000Z',
    projectDir: '.',
    source: `${sourceRollout.receipt_path} + ${sourceRollout.rollout_suite.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.monitoring_evaluation.fresh_monitoring_suite, false);
  assert.equal(result.receipt.monitoring_evaluation.rollback_required, true);
});

test('agent routing monitor requires rollback when post-default metrics degrade', () => {
  const healthy = healthyMonitorReceipt();
  const sourceRollout = healthy.source_rollout;
  const degradedSuite = structuredClone(healthy.monitoring_suite);
  degradedSuite.scenarios[0].winner.quality_score = 0.5;
  const result = buildRoutingMonitor({
    source_rollout: sourceRollout,
    monitoring_suite: degradedSuite,
    rollback_plan: rollbackPlan(),
  }, {
    generatedAt: '2026-07-01T06:45:00.000Z',
    projectDir: '.',
    source: healthy.source,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.monitoring_evaluation.status, 'rollback-required');
  assert.equal(result.receipt.monitoring_evaluation.metrics_ready, false);
  assert.deepEqual(result.receipt.monitoring_evaluation.failing_scenario_ids, [degradedSuite.scenarios[0].id]);
});

test('routing monitor validation rejects tampered health state', () => {
  const receipt = healthyMonitorReceipt();
  receipt.monitoring_evaluation.rollback_required = true;
  const issues = validateRoutingMonitorReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-monitor-mismatch'));
});

test('agent routing monitor CLI writes healthy receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-monitor-'));
  try {
    writeJson(join(root, 'default-rollout.json'), defaultRolloutFixture());
    writeJson(join(root, 'suite.json'), suiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-default-monitoring-suite.json',
      run_id: 'fixture-post-default-monitoring-suite',
    }));
    const result = runRoutingMonitor([
      '--project-dir',
      root,
      '--default-rollout',
      'default-rollout.json',
      '--suite',
      'suite.json',
      '--rollback-command',
      'npm --silent run agent:routing:policy -- --rollback fixture-default-routing --json',
      '--rollback-verify',
      'npm --silent run agent:routing:monitor -- --default-rollout fixture-rollback.json --suite fixture-rollback-suite.json --json',
      '--out',
      '.agent/evals/routing-monitors/fixture-monitor.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-monitors/fixture-monitor.json');
    assert.equal(receipt.monitoring_evaluation.status, 'monitoring-healthy');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
