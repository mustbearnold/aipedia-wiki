import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingHandoff, validateRoutingHandoffReceipt } from '../../scripts/lib/routing-handoff.mjs';
import { buildRoutingMonitor } from '../../scripts/lib/routing-monitor.mjs';
import { buildRoutingRollout } from '../../scripts/lib/routing-rollout.mjs';

const REVIEW_FIXTURE_PATH = '.agent/evals/routing-policy-reviews/2026-06-30-slice-83-fresh-policy-review-receipt.json';
const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-82-fresh-policy-pilot-suite-receipt.json';

function runRoutingHandoff(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-handoff.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function reviewFixture() {
  return JSON.parse(readFileSync(REVIEW_FIXTURE_PATH, 'utf8'));
}

function suiteFixture(overrides = {}) {
  const suite = JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8'));
  suite.receipt_path = overrides.receipt_path || '.agent/evals/routing-suites/fixture-handoff-suite.json';
  suite.run_id = overrides.run_id || 'fixture-handoff-suite';
  return suite;
}

function canaryRolloutFixture(label = 'fixture') {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: suiteFixture({
      receipt_path: `.agent/evals/routing-suites/${label}-canary-rollout-suite.json`,
      run_id: `${label}-canary-rollout-suite`,
    }),
    rollout: { stage: 'canary', traffic_percent: 5 },
  }, {
    generatedAt: '2026-07-01T07:20:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/${label}-canary-rollout-suite.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = `.agent/evals/routing-rollouts/${label}-canary-rollout.json`;
  return receipt;
}

function defaultRolloutFixture(label = 'fixture') {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: suiteFixture({
      receipt_path: `.agent/evals/routing-suites/${label}-default-rollout-suite.json`,
      run_id: `${label}-default-rollout-suite`,
    }),
    post_canary: canaryRolloutFixture(label),
    rollout: {
      stage: 'default-enabled',
      traffic_percent: 100,
      policy_change_id: `${label}-default-routing`,
      operator: 'codex-routing-operator',
    },
  }, {
    generatedAt: '2026-07-01T07:25:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/${label}-default-rollout-suite.json + .agent/evals/routing-rollouts/${label}-canary-rollout.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = `.agent/evals/routing-rollouts/${label}-default-rollout.json`;
  return receipt;
}

function rollbackPlan() {
  return {
    owner: 'codex-routing-operator',
    rollback_command: 'npm --silent run agent:routing:rollout -- --review fixture-review.json --suite fixture-canary-suite.json --stage canary --traffic-percent 5 --json',
    verification_command: 'npm --silent run agent:meta:closeout:auto -- --receipt fixture-canary-rollout.json --json',
  };
}

function healthyMonitorReceipt(defaultRollout = defaultRolloutFixture('fixture'), label = 'fixture') {
  const result = buildRoutingMonitor({
    default_rollout: defaultRollout,
    suite: suiteFixture({
      receipt_path: `.agent/evals/routing-suites/${label}-post-default-monitoring-suite.json`,
      run_id: `${label}-post-default-monitoring-suite`,
    }),
    rollback_plan: rollbackPlan(),
  }, {
    generatedAt: '2026-07-01T07:30:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + .agent/evals/routing-suites/${label}-post-default-monitoring-suite.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  receipt.receipt_path = `.agent/evals/routing-monitors/${label}-post-default-monitor.json`;
  return receipt;
}

function changePlan() {
  return {
    mode: 'record-only',
    change_id: 'fixture-default-routing',
    operator: 'codex-routing-operator',
    apply_command: 'npm --silent run agent:routing:handoff -- --default-rollout fixture-default-rollout.json --monitor fixture-monitor.json --json',
    verification_command: 'npm --silent run agent:meta:closeout:auto -- --receipt fixture-handoff.json --json',
  };
}

function readyHandoffReceipt() {
  const defaultRollout = defaultRolloutFixture('fixture');
  const monitor = healthyMonitorReceipt(defaultRollout, 'fixture');
  const result = buildRoutingHandoff({
    default_rollout: defaultRollout,
    monitor,
    change_plan: changePlan(),
  }, {
    generatedAt: '2026-07-01T07:35:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + ${monitor.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing handoff writes ready default-change handoff receipts', () => {
  const receipt = readyHandoffReceipt();
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-handoff.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.handoff_evaluation.status, 'handoff-ready');
  assert.equal(receipt.handoff_evaluation.default_rollout_ready, true);
  assert.equal(receipt.handoff_evaluation.monitor_healthy, true);
  assert.equal(receipt.handoff_evaluation.rollout_monitor_lineage_match, true);
  assert.equal(receipt.handoff_evaluation.rollback_plan_ready, true);
  assert.equal(receipt.handoff_evaluation.change_plan_ready, true);
});

test('agent routing handoff blocks missing apply or verification commands', () => {
  const defaultRollout = defaultRolloutFixture('missing-command');
  const monitor = healthyMonitorReceipt(defaultRollout, 'missing-command');
  const result = buildRoutingHandoff({
    default_rollout: defaultRollout,
    monitor,
    change_plan: {
      change_id: 'missing-command-default-routing',
      operator: 'codex-routing-operator',
    },
  }, {
    generatedAt: '2026-07-01T07:40:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + ${monitor.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.handoff_evaluation.status, 'blocked');
  assert.equal(result.receipt.handoff_evaluation.change_plan_ready, false);
});

test('agent routing handoff blocks valid monitors from different default rollouts', () => {
  const defaultRollout = defaultRolloutFixture('primary');
  const otherDefaultRollout = defaultRolloutFixture('other');
  const otherMonitor = healthyMonitorReceipt(otherDefaultRollout, 'other');
  const result = buildRoutingHandoff({
    default_rollout: defaultRollout,
    monitor: otherMonitor,
    change_plan: changePlan(),
  }, {
    generatedAt: '2026-07-01T07:45:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + ${otherMonitor.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.handoff_evaluation.rollout_monitor_lineage_match, false);
  assert.equal(result.receipt.handoff_evaluation.source_rollout_summary_match, false);
});

test('agent routing handoff blocks unhealthy monitor receipts', () => {
  const defaultRollout = defaultRolloutFixture('unhealthy-monitor');
  const result = buildRoutingMonitor({
    default_rollout: defaultRollout,
    suite: suiteFixture({
      receipt_path: '.agent/evals/routing-suites/unhealthy-monitor-post-default-suite.json',
      run_id: 'unhealthy-monitor-post-default-suite',
    }),
  }, {
    generatedAt: '2026-07-01T07:50:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + .agent/evals/routing-suites/unhealthy-monitor-post-default-suite.json`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);

  const handoff = buildRoutingHandoff({
    default_rollout: defaultRollout,
    monitor: result.receipt,
    change_plan: changePlan(),
  }, {
    generatedAt: '2026-07-01T07:55:00.000Z',
    projectDir: '.',
    source: `${defaultRollout.receipt_path} + ${result.receipt.receipt_path || 'unhealthy-monitor'}`,
  });
  assert.deepEqual(handoff.issues, []);
  assert.equal(handoff.receipt.ok, false);
  assert.equal(handoff.receipt.handoff_evaluation.monitor_healthy, false);
  assert.equal(handoff.receipt.handoff_evaluation.rollback_plan_ready, false);
});

test('routing handoff validation rejects tampered readiness state', () => {
  const receipt = readyHandoffReceipt();
  receipt.handoff_evaluation.change_plan_ready = false;
  const issues = validateRoutingHandoffReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-handoff-mismatch'));
});

test('agent routing handoff CLI writes ready receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-handoff-'));
  try {
    const defaultRollout = defaultRolloutFixture('cli');
    const monitor = healthyMonitorReceipt(defaultRollout, 'cli');
    writeJson(join(root, 'default-rollout.json'), defaultRollout);
    writeJson(join(root, 'monitor.json'), monitor);
    const result = runRoutingHandoff([
      '--project-dir',
      root,
      '--default-rollout',
      'default-rollout.json',
      '--monitor',
      'monitor.json',
      '--operator',
      'codex-routing-operator',
      '--apply-command',
      'npm --silent run agent:routing:handoff -- --default-rollout default-rollout.json --monitor monitor.json --json',
      '--verification-command',
      'npm --silent run agent:meta:closeout:auto -- --receipt .agent/evals/routing-handoffs/fixture-handoff.json --json',
      '--out',
      '.agent/evals/routing-handoffs/fixture-handoff.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-handoffs/fixture-handoff.json');
    assert.equal(receipt.handoff_evaluation.status, 'handoff-ready');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
