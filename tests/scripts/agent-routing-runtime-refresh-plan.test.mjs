import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingRuntimeRefreshPlan, validateRoutingRuntimeRefreshPlanReceipt } from '../../scripts/lib/routing-runtime-refresh-plan.mjs';

const HANDOFF_PATH = '.agent/evals/routing-handoffs/2026-06-30-slice-90-runtime-default-change-handoff-receipt.json';
const MONITOR_TRENDS_PATH = '.agent/evals/routing-monitor-trends/2026-06-30-slice-89-post-default-monitor-trends.json';
const ROLLUP_PATH = '.agent/evals/routing-monitor-trend-rollups/2026-06-30-slice-94-two-window-rollup.json';
const RUNTIME_COMPLETION_PATH = '.agent/evals/routing-runtime-completions/2026-06-30-slice-94-runtime-rollup-ready-completion-receipt.json';
const MODEL_TOKEN_USAGE_PATH = '.agent/evals/model-token-usage/2026-06-30-slice-91-runtime-completion-token-usage.json';
const DEFAULT_ROLLOUT_PATH = '.agent/evals/routing-rollouts/2026-06-30-slice-86-default-enabled-rollout-receipt.json';
const BASELINE_MONITOR_PATH = '.agent/evals/routing-monitors/2026-06-30-slice-87-post-default-monitor-receipt.json';

function runRefreshPlan(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-runtime-refresh-plan.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readyPlanInput(overrides = {}) {
  return {
    change: {
      change_id: 'fixture-runtime-refresh-plan',
      change_kinds: ['workflow'],
      changed_at: '2026-07-01T00:00:00.000Z',
      change_summary: 'Fixture workflow change before current runtime routing evidence.',
    },
    requirements: {
      require_monitor_trend_rollup: true,
      require_model_token_usage: true,
    },
    evidence_chain: {
      handoff: readJson(HANDOFF_PATH),
      monitor_trends: readJson(MONITOR_TRENDS_PATH),
      monitor_trend_rollup: readJson(ROLLUP_PATH),
      runtime_completion: readJson(RUNTIME_COMPLETION_PATH),
      model_token_usage: readJson(MODEL_TOKEN_USAGE_PATH),
    },
    command_inputs: {
      output_prefix: '.agent/evals/routing-runtime-refresh-plans/fixture-runtime-refresh-plan',
      baseline_monitor_trends: MONITOR_TRENDS_PATH,
      model_token_usage: MODEL_TOKEN_USAGE_PATH,
    },
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'fixture-runtime-refresh-plan',
    workflow: 'loop-system',
    ...overrides,
  };
}

test('routing runtime refresh plan marks current evidence ready', () => {
  const result = buildRoutingRuntimeRefreshPlan(readyPlanInput(), {
    generatedAt: '2026-07-01T09:15:00.000Z',
    projectDir: '.',
    source: `${HANDOFF_PATH} + ${MONITOR_TRENDS_PATH} + ${ROLLUP_PATH} + ${RUNTIME_COMPLETION_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.schema_version, 'aipedia.agent-routing-runtime-refresh-plan.v1');
  assert.equal(receipt.ok, true);
  assert.equal(receipt.refresh_evaluation.status, 'ready-current');
  assert.equal(receipt.evidence_chain.monitor_trend_rollup.ready, true);
  assert.equal(receipt.evidence_chain.runtime_completion.ready, true);
  assert.equal(receipt.evidence_chain.model_token_usage.facts.total_tokens, 3430);
  assert.equal(receipt.command_plan.every((step) => step.status === 'not-required'), true);
  assert.deepEqual(validateRoutingRuntimeRefreshPlanReceipt(receipt), []);
});

test('routing runtime refresh plan blocks relevant changes without changed_at', () => {
  const input = readyPlanInput({
    change: {
      change_id: 'fixture-missing-changed-at',
      change_kinds: ['model'],
    },
  });
  const result = buildRoutingRuntimeRefreshPlan(input, {
    generatedAt: '2026-07-01T09:20:00.000Z',
    projectDir: '.',
    source: HANDOFF_PATH,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.refresh_evaluation.status, 'blocked');
  assert.equal(result.receipt.refresh_evaluation.missing_changed_at, true);
  assert.match(result.receipt.refresh_evaluation.reason, /changed_at/);
  assert.deepEqual(validateRoutingRuntimeRefreshPlanReceipt(result.receipt), []);
});

test('routing runtime refresh plan emits ordered commands for stale evidence', () => {
  const input = readyPlanInput({
    change: {
      change_id: 'fixture-stale-runtime-routing',
      change_kinds: ['workflow'],
      changed_at: '2026-07-02T00:00:00.000Z',
      change_summary: 'Fixture change after current routing evidence.',
    },
    command_inputs: {
      output_prefix: '.agent/evals/routing-runtime-refresh-plans/fixture-stale-runtime-routing',
      events_jsonl: '.agent/evals/correction-telemetry-adapters/fixture-stale-events.jsonl',
      routing_suite_input: '.agent/evals/routing-suites/fixture-stale-suite-input.json',
      default_rollout: DEFAULT_ROLLOUT_PATH,
      baseline_monitor: BASELINE_MONITOR_PATH,
      baseline_monitor_trends: MONITOR_TRENDS_PATH,
      model_token_usage: MODEL_TOKEN_USAGE_PATH,
      rollback_command: 'npm --silent run agent:routing:policy -- --rollback fixture --json',
      rollback_verification_command: 'npm --silent run agent:meta:closeout:auto -- --receipt fixture-rollback-monitor.json --json',
      runtime_system: 'aipedia-agent-router',
      runtime_applied_at: '2026-07-02T00:05:00.000Z',
      runtime_verification_status: 'passed',
    },
  });
  const result = buildRoutingRuntimeRefreshPlan(input, {
    generatedAt: '2026-07-02T00:10:00.000Z',
    projectDir: '.',
    source: HANDOFF_PATH,
  });
  assert.deepEqual(result.issues, []);
  const receipt = result.receipt;
  assert.equal(receipt.ok, false);
  assert.equal(receipt.refresh_evaluation.status, 'refresh-required');
  assert.deepEqual(receipt.refresh_evaluation.input_blockers, []);
  assert.ok(receipt.refresh_evaluation.stale_evidence.includes('monitor_trends'));
  assert.ok(receipt.refresh_evaluation.stale_evidence.includes('runtime_completion'));
  assert.deepEqual(receipt.command_plan.map((step) => step.id), [
    'correction-telemetry',
    'routing-suite',
    'routing-monitor',
    'routing-monitor-trends',
    'routing-monitor-trend-rollup',
    'routing-runtime-completion',
  ]);
  assert.equal(receipt.command_plan.every((step) => step.status === 'ready-to-run'), true);
  assert.match(receipt.command_plan.at(-1).command, /agent:routing:runtime:complete/);
  assert.deepEqual(validateRoutingRuntimeRefreshPlanReceipt(receipt), []);
});

test('routing runtime refresh plan validation rejects tampered readiness state', () => {
  const result = buildRoutingRuntimeRefreshPlan(readyPlanInput(), {
    generatedAt: '2026-07-01T09:25:00.000Z',
    projectDir: '.',
    source: HANDOFF_PATH,
  });
  const receipt = result.receipt;
  receipt.refresh_evaluation.ready_current = false;
  const issues = validateRoutingRuntimeRefreshPlanReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-runtime-refresh-plan-mismatch'));
});

test('routing runtime refresh plan CLI writes ready-current receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-runtime-refresh-plan-'));
  try {
    const outPath = join(root, 'refresh-plan.json');
    const result = runRefreshPlan([
      '--change-id',
      'fixture-runtime-refresh-plan-cli',
      '--change-kind',
      'workflow',
      '--changed-at',
      '2026-07-01T00:00:00.000Z',
      '--handoff',
      HANDOFF_PATH,
      '--monitor-trends',
      MONITOR_TRENDS_PATH,
      '--trend-rollup',
      ROLLUP_PATH,
      '--runtime-completion',
      RUNTIME_COMPLETION_PATH,
      '--model-token-usage',
      MODEL_TOKEN_USAGE_PATH,
      '--require-model-token-usage',
      '--out',
      outPath,
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(readFileSync(outPath, 'utf8'));
    assert.equal(receipt.ok, true);
    assert.equal(receipt.refresh_evaluation.status, 'ready-current');
    assert.equal(receipt.receipt_path, outPath);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
