import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildRoutingPolicyReview, REQUIRED_ROUTING_POLICY_REVIEW_LENSES, validateRoutingPolicyReviewReceipt } from '../../scripts/lib/routing-policy-review.mjs';

const PILOT_FIXTURE_PATH = '.agent/evals/routing-policy-pilots/2026-06-30-slice-82-fresh-telemetry-policy-pilot-receipt.json';

function runRoutingReview(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-review.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function pilotFixture() {
  return JSON.parse(readFileSync(PILOT_FIXTURE_PATH, 'utf8'));
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

test('agent routing review writes accepted reviewer-pass receipts for fresh independent pilots', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-review-'));
  try {
    writeJson(join(root, 'pilot.json'), pilotFixture());
    const result = runRoutingReview([
      '--project-dir',
      root,
      '--pilot',
      'pilot.json',
      '--accept-required-lenses',
      '--reviewer',
      'codex-routing-reviewer',
      '--note',
      'Accepted after checking independence, exact-token evidence, correction telemetry, and rollout guardrails.',
      '--out',
      '.agent/evals/routing-policy-reviews/fixture-review.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-policy-review.v1');
    assert.equal(receipt.ok, true);
    assert.equal(receipt.promotion_review.status, 'accepted');
    assert.equal(receipt.promotion_review.default_ready, true);
    assert.equal(receipt.totals.accepted_required_lens_count, REQUIRED_ROUTING_POLICY_REVIEW_LENSES.length);
    assert.deepEqual(receipt.totals.missing_required_lenses, []);
    assert.equal(receipt.receipt_path, '.agent/evals/routing-policy-reviews/fixture-review.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing review reports missing required lenses without pretending defaults are ready', () => {
  const reviews = REQUIRED_ROUTING_POLICY_REVIEW_LENSES.slice(0, -1).map((lens) => ({
    lens,
    reviewer: 'codex-routing-reviewer',
    status: 'accepted',
    note: 'Accepted for fixture coverage.',
    evidence_refs: [PILOT_FIXTURE_PATH],
  }));
  const result = buildRoutingPolicyReview({
    pilot: pilotFixture(),
    reviews,
  }, {
    generatedAt: '2026-07-01T05:20:00.000Z',
    projectDir: '.',
    source: PILOT_FIXTURE_PATH,
  });
  assert.deepEqual(result.issues, []);
  assert.equal(result.receipt.ok, false);
  assert.equal(result.receipt.promotion_review.status, 'needs-review');
  assert.equal(result.receipt.promotion_review.default_ready, false);
  assert.equal(result.receipt.totals.missing_required_lens_count, 1);
});

test('routing policy review validation rejects tampered readiness state', () => {
  const result = buildRoutingPolicyReview({
    pilot: pilotFixture(),
    accept_required_lenses: true,
    reviewer: 'codex-routing-reviewer',
    review_note: 'Accepted for fixture coverage.',
  }, {
    generatedAt: '2026-07-01T05:20:00.000Z',
    projectDir: '.',
    source: PILOT_FIXTURE_PATH,
  });
  assert.deepEqual(result.issues, []);
  const receipt = structuredClone(result.receipt);
  receipt.promotion_review.status = 'needs-review';
  const issues = validateRoutingPolicyReviewReceipt(receipt);
  assert.ok(issues.some((issue) => issue.code === 'routing-policy-review-mismatch'));
});

test('agent routing review rejects malformed pilot receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-review-invalid-'));
  try {
    writeJson(join(root, 'pilot.json'), {
      ok: true,
      mode: 'agent-routing-policy-pilot',
      schema_version: 'aipedia.agent-routing-policy-pilot.v2',
      policy_fit: { status: 'pass' },
    });
    const result = runRoutingReview([
      '--project-dir',
      root,
      '--pilot',
      'pilot.json',
      '--accept-required-lenses',
      '--reviewer',
      'codex-routing-reviewer',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-policy-review-source-pilot-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
