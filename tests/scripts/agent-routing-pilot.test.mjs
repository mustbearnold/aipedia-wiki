import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingPolicyPilot, validateRoutingPolicyPilotReceipt } from '../../scripts/lib/routing-policy-pilot.mjs';

const POLICY_FIXTURE_PATH = '.agent/evals/routing-policies/2026-06-30-slice-79-conditional-routing-policy-receipt.json';
const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-78-v2-telemetry-lineage-suite-receipt.json';

function runRoutingPilot(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-pilot.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function policyFixture() {
  return JSON.parse(readFileSync(POLICY_FIXTURE_PATH, 'utf8'));
}

function suiteFixture() {
  return JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing pilot writes replay-only receipts from source-suite replays', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-pilot-'));
  try {
    writeJson(join(root, 'policy.json'), policyFixture());
    writeJson(join(root, 'suite.json'), suiteFixture());
    const result = runRoutingPilot([
      '--project-dir',
      root,
      '--policy',
      'policy.json',
      '--suite',
      'suite.json',
      '--out',
      '.agent/evals/routing-policy-pilots/fixture-pilot.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-policy-pilot.v1');
    assert.equal(receipt.policy_fit.status, 'replay-only');
    assert.equal(receipt.policy_fit.promotion_candidate, false);
    assert.equal(receipt.totals.same_source_replay, true);
    assert.equal(receipt.totals.policy_rule_count, 2);
    assert.equal(receipt.totals.pilot_scenario_count, 2);
    assert.equal(receipt.totals.matched_rule_count, 2);
    assert.equal(receipt.totals.mismatched_rule_count, 0);
    assert.equal(receipt.totals.uncovered_policy_rule_count, 0);
    assert.equal(receipt.scenarios[0].match_status, 'matched');
    assert.ok(receipt.guardrails.some((guardrail) => guardrail.includes('source-suite replay')));
    assert.equal(receipt.receipt_path, '.agent/evals/routing-policy-pilots/fixture-pilot.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('routing policy pilot validation rejects tampered scenario decisions', () => {
  const result = buildRoutingPolicyPilot({
    policy: policyFixture(),
    suite: suiteFixture(),
  }, {
    generatedAt: '2026-07-01T04:45:00.000Z',
    projectDir: '.',
    source: `${POLICY_FIXTURE_PATH} + ${SUITE_FIXTURE_PATH}`,
  });
  assert.deepEqual(result.issues, []);
  const receipt = structuredClone(result.receipt);
  receipt.scenarios[0].expected_candidate_id = 'single-agent';
  const issues = validateRoutingPolicyPilotReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-policy-pilot-mismatch'));
});

test('agent routing pilot rejects invalid policy receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-pilot-invalid-'));
  try {
    writeJson(join(root, 'policy.json'), {
      ok: true,
      mode: 'agent-routing-policy',
      schema_version: 'aipedia.agent-routing-policy.v1',
      rules: [],
    });
    writeJson(join(root, 'suite.json'), suiteFixture());
    const result = runRoutingPilot(['--project-dir', root, '--policy', 'policy.json', '--suite', 'suite.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-policy-pilot-source-policy-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
