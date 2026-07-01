import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingPolicy, validateRoutingPolicyReceipt } from '../../scripts/lib/routing-policy.mjs';

const SUITE_FIXTURE_PATH = '.agent/evals/routing-suites/2026-06-30-slice-78-v2-telemetry-lineage-suite-receipt.json';

function runRoutingPolicy(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-policy.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function suiteFixture() {
  return JSON.parse(readFileSync(SUITE_FIXTURE_PATH, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing policy writes conditional policy receipts from routing suites', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-policy-'));
  try {
    writeJson(join(root, 'suite.json'), suiteFixture());
    const result = runRoutingPolicy([
      '--project-dir',
      root,
      '--suite',
      'suite.json',
      '--out',
      '.agent/evals/routing-policies/fixture-policy.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-policy.v1');
    assert.equal(receipt.policy.status, 'conditional-by-task-class');
    assert.equal(receipt.policy.default_candidate_id, '');
    assert.equal(receipt.policy.conditional_routing_required, true);
    assert.equal(receipt.totals.rule_count, 2);
    assert.equal(receipt.totals.telemetry_ref_count, 1);
    assert.equal(receipt.rules[0].task_class, 'jsonl-correction-heavy-review');
    assert.equal(receipt.rules[1].task_class, 'jsonl-tiny-status-check');
    assert.equal(receipt.rules[0].correction_telemetry_refs[0].receipt_path, '.agent/evals/correction-telemetry-adapters/2026-06-30-slice-76-runtime-jsonl-receipt.json');
    assert.ok(receipt.guardrails.some((guardrail) => guardrail.includes('blanket default')));
    assert.equal(receipt.receipt_path, '.agent/evals/routing-policies/fixture-policy.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('routing policy validation rejects tampered rules', () => {
  const result = buildRoutingPolicy(suiteFixture(), {
    generatedAt: '2026-07-01T04:30:00.000Z',
    projectDir: '.',
    source: SUITE_FIXTURE_PATH,
  });
  assert.deepEqual(result.issues, []);
  const receipt = structuredClone(result.receipt);
  receipt.rules[0].route_candidate_id = 'single-agent';
  const issues = validateRoutingPolicyReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-policy-mismatch'));
});

test('agent routing policy rejects invalid suite receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-policy-invalid-'));
  try {
    writeJson(join(root, 'suite.json'), {
      ok: true,
      mode: 'agent-routing-evaluation-suite',
      schema_version: 'aipedia.agent-routing-evaluation-suite.v2',
      scenarios: [],
    });
    const result = runRoutingPolicy(['--project-dir', root, '--suite', 'suite.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-policy-source-suite-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
