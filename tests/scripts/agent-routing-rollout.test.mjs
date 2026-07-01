import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingRollout, validateRoutingRolloutReceipt } from '../../scripts/lib/routing-rollout.mjs';

const REVIEW_FIXTURE_PATH = '.agent/evals/routing-policy-reviews/2026-06-30-slice-83-fresh-policy-review-receipt.json';
const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-82-fresh-policy-pilot-suite-receipt.json';

function runRoutingRollout(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-rollout.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function reviewFixture() {
  return JSON.parse(readFileSync(REVIEW_FIXTURE_PATH, 'utf8'));
}

function rolloutSuiteFixture(overrides = {}) {
  const suite = JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8'));
  suite.receipt_path = overrides.receipt_path || '.agent/evals/routing-suites/fixture-fresh-rollout-suite.json';
  suite.run_id = overrides.run_id || 'fixture-fresh-rollout-suite';
  return suite;
}

function canaryRolloutFixture() {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture({
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

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing rollout writes shadow-ready receipts for accepted reviews and fresh metrics suites', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-rollout-'));
  try {
    writeJson(join(root, 'review.json'), reviewFixture());
    writeJson(join(root, 'suite.json'), rolloutSuiteFixture());
    const result = runRoutingRollout([
      '--project-dir',
      root,
      '--review',
      'review.json',
      '--suite',
      'suite.json',
      '--stage',
      'shadow',
      '--out',
      '.agent/evals/routing-rollouts/fixture-rollout.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-rollout.v1');
    assert.equal(receipt.ok, true);
    assert.equal(receipt.rollout_evaluation.status, 'shadow-ready');
    assert.equal(receipt.rollout_evaluation.guard_passed, true);
    assert.equal(receipt.rollout_evaluation.default_change_allowed, false);
    assert.equal(receipt.totals.passing_scenario_count, receipt.totals.scenario_count);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-rollouts/fixture-rollout.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing rollout writes canary-ready receipts for bounded traffic', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-rollout-canary-'));
  try {
    writeJson(join(root, 'review.json'), reviewFixture());
    writeJson(join(root, 'suite.json'), rolloutSuiteFixture());
    const result = runRoutingRollout([
      '--project-dir',
      root,
      '--review',
      'review.json',
      '--suite',
      'suite.json',
      '--stage',
      'canary',
      '--traffic-percent',
      '5',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.rollout.stage, 'canary');
    assert.equal(receipt.rollout.traffic_percent, 5);
    assert.equal(receipt.rollout_evaluation.status, 'canary-ready');
    assert.equal(receipt.rollout_evaluation.guarded_rollout_allowed, true);
    assert.equal(receipt.rollout_evaluation.default_change_allowed, false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing rollout rejects unsafe canary traffic limits', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture(),
    rollout: { stage: 'canary', traffic_percent: 25 },
  }, {
    generatedAt: '2026-07-01T05:45:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + ${SUITE_FIXTURE_PATH}`,
  });
  assert.equal(result.receipt, null);
  assert.ok(result.issues.some((issue) => issue.code === 'routing-rollout-config-invalid'));
});

test('agent routing rollout blocks default-enabled without post-canary evidence', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture(),
    rollout: { stage: 'default-enabled', traffic_percent: 100 },
  }, {
    generatedAt: '2026-07-01T05:45:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + ${SUITE_FIXTURE_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollout_evaluation.status, 'blocked');
  assert.equal(result.receipt.rollout_evaluation.default_change_allowed, false);
  assert.equal(result.receipt.rollout_evaluation.post_canary_required, true);
  assert.equal(result.receipt.rollout_evaluation.post_canary_ready, false);
  assert.equal(result.receipt.rollout_evaluation.post_canary_present, false);
});

test('agent routing rollout allows default-enabled only with post-canary evidence and full traffic', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-canary-default-suite.json',
      run_id: 'fixture-post-canary-default-suite',
    }),
    post_canary: canaryRolloutFixture(),
    rollout: { stage: 'default-enabled', traffic_percent: 100 },
  }, {
    generatedAt: '2026-07-01T06:05:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/fixture-post-canary-default-suite.json + .agent/evals/routing-rollouts/fixture-canary-rollout.json`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, true);
  assert.equal(result.receipt.rollout_evaluation.status, 'default-ready');
  assert.equal(result.receipt.rollout_evaluation.default_change_allowed, true);
  assert.equal(result.receipt.rollout_evaluation.post_canary_required, true);
  assert.equal(result.receipt.rollout_evaluation.post_canary_ready, true);
  assert.equal(result.receipt.rollout_evaluation.post_canary_present, true);
  assert.equal(result.receipt.rollout_evaluation.post_canary_default_suite_fresh, true);
});

test('agent routing rollout rejects default-enabled reuse of canary metrics suite', () => {
  const canary = canaryRolloutFixture();
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture({
      receipt_path: canary.rollout_suite.receipt_path,
      run_id: canary.rollout_suite.run_id,
    }),
    post_canary: canary,
    rollout: { stage: 'default-enabled', traffic_percent: 100 },
  }, {
    generatedAt: '2026-07-01T06:10:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + ${canary.rollout_suite.receipt_path} + ${canary.receipt_path}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollout_evaluation.status, 'blocked');
  assert.equal(result.receipt.rollout_evaluation.post_canary_default_suite_fresh, false);
  assert.equal(result.receipt.rollout_evaluation.post_canary_ready, false);
});

test('agent routing rollout blocks reuse of the reviewed pilot suite as rollout metrics', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8')),
    rollout: { stage: 'shadow' },
  }, {
    generatedAt: '2026-07-01T05:40:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + ${SUITE_FIXTURE_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.rollout_evaluation.status, 'blocked');
  assert.equal(result.receipt.rollout_evaluation.fresh_rollout_suite, false);
});

test('routing rollout validation rejects tampered guard state', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture(),
    rollout: { stage: 'shadow' },
  }, {
    generatedAt: '2026-07-01T05:40:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + ${SUITE_FIXTURE_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = structuredClone(result.receipt);
  receipt.rollout_evaluation.guard_passed = false;
  const issues = validateRoutingRolloutReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-rollout-mismatch'));
});

test('routing rollout validation rejects tampered post-canary lineage state', () => {
  const result = buildRoutingRollout({
    review: reviewFixture(),
    suite: rolloutSuiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-canary-default-suite.json',
      run_id: 'fixture-post-canary-default-suite',
    }),
    post_canary: canaryRolloutFixture(),
    rollout: { stage: 'default-enabled', traffic_percent: 100 },
  }, {
    generatedAt: '2026-07-01T06:15:00.000Z',
    projectDir: '.',
    source: `${REVIEW_FIXTURE_PATH} + .agent/evals/routing-suites/fixture-post-canary-default-suite.json + .agent/evals/routing-rollouts/fixture-canary-rollout.json`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = structuredClone(result.receipt);
  receipt.post_canary.rollout_evaluation.status = 'shadow-ready';
  const issues = validateRoutingRolloutReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-rollout-mismatch'));
});

test('agent routing rollout CLI writes default-ready receipts with post-canary input', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-rollout-default-'));
  try {
    writeJson(join(root, 'review.json'), reviewFixture());
    writeJson(join(root, 'suite.json'), rolloutSuiteFixture({
      receipt_path: '.agent/evals/routing-suites/fixture-post-canary-default-suite.json',
      run_id: 'fixture-post-canary-default-suite',
    }));
    writeJson(join(root, 'canary.json'), canaryRolloutFixture());
    const result = runRoutingRollout([
      '--project-dir',
      root,
      '--review',
      'review.json',
      '--suite',
      'suite.json',
      '--post-canary',
      'canary.json',
      '--stage',
      'default-enabled',
      '--traffic-percent',
      '100',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.ok, true);
    assert.equal(receipt.rollout_evaluation.status, 'default-ready');
    assert.equal(receipt.rollout_evaluation.post_canary_ready, true);
    assert.equal(receipt.rollout_evaluation.default_change_allowed, true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing rollout rejects malformed review receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-rollout-invalid-'));
  try {
    writeJson(join(root, 'review.json'), {
      ok: true,
      mode: 'agent-routing-policy-review',
      schema_version: 'aipedia.agent-routing-policy-review.v1',
    });
    writeJson(join(root, 'suite.json'), rolloutSuiteFixture());
    const result = runRoutingRollout([
      '--project-dir',
      root,
      '--review',
      'review.json',
      '--suite',
      'suite.json',
      '--stage',
      'shadow',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-rollout-source-review-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
