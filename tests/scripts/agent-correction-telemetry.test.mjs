import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runCorrectionTelemetry(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-correction-telemetry.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function runRoutingEval(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-evaluation.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function validTelemetryInput(overrides = {}) {
  return {
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-73-correction-telemetry',
    workflow: 'loop-system',
    telemetry_source: {
      type: 'reviewer',
      id: 'slice-73-fixture-review',
      confidence: 'exact',
    },
    candidates: [
      {
        id: 'single-agent',
        workflow: 'loop-system',
        run_id: 'single-run',
        orchestrator: 'single-agent',
        events: [
          { id: 'single-finding-1', type: 'finding', severity: 'medium' },
          { id: 'single-fix-1', type: 'correction_applied', finding_id: 'single-finding-1' },
          { id: 'single-finding-2', type: 'finding', severity: 'low' },
          { id: 'single-fix-2', type: 'correction_applied', finding_id: 'single-finding-2' },
        ],
      },
      {
        id: 'orchestrated-specialists',
        workflow: 'loop-system',
        run_id: 'orchestrated-run',
        orchestrator: 'meta-orchestrator',
        events: [
          { id: 'orchestrated-finding-1', type: 'finding', severity: 'medium' },
          { id: 'orchestrated-fix-1', type: 'correction_applied', finding_id: 'orchestrated-finding-1' },
          { id: 'orchestrated-finding-2', type: 'finding', severity: 'low' },
          { id: 'orchestrated-fix-2', type: 'correction_applied', finding_id: 'orchestrated-finding-2' },
        ],
      },
    ],
    ...overrides,
  };
}

function exactTokens({ requestCount, input, output, cached, reasoning, subagents }) {
  return {
    request_count: requestCount,
    input_tokens: input,
    output_tokens: output,
    cached_input_tokens: cached,
    reasoning_tokens: reasoning,
    total_tokens: input + output,
    subagent_breakdown: subagents,
  };
}

function subagent(id, { requestCount = 1, input, output, cached, reasoning }) {
  return {
    id,
    request_count: requestCount,
    input_tokens: input,
    output_tokens: output,
    cached_input_tokens: cached,
    reasoning_tokens: reasoning,
    total_tokens: input + output,
  };
}

function routingInputWithoutCorrections() {
  return {
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-73-routing-from-corrections',
    workflow: 'loop-system',
    evaluation_task: 'Compare routing variants with correction telemetry.',
    thresholds: {
      min_quality_score: 0.85,
      min_accuracy_score: 0.85,
      max_residual_issue_count: 0,
      max_regression_count: 0,
      minimum_improvement_margin: 0.02,
    },
    candidates: [
      {
        id: 'single-agent',
        label: 'Single agent',
        strategy: 'single-agent',
        model: 'gpt-5.5',
        workflow: 'loop-system',
        run_id: 'single-run',
        orchestrator: 'single-agent',
        exact_model_tokens: exactTokens({
          requestCount: 1,
          input: 4800,
          output: 1200,
          cached: 600,
          reasoning: 300,
          subagents: [subagent('single-agent', { input: 4800, output: 1200, cached: 600, reasoning: 300 })],
        }),
        wall_duration_ms: 7000,
        quality_score: 0.9,
        accuracy_score: 0.88,
        task_outcome: { task_count: 1, completed_count: 1 },
      },
      {
        id: 'orchestrated-specialists',
        label: 'Orchestrated specialists',
        strategy: 'orchestrator-plus-specialists',
        model: 'gpt-5.5',
        workflow: 'loop-system',
        run_id: 'orchestrated-run',
        orchestrator: 'meta-orchestrator',
        exact_model_tokens: exactTokens({
          requestCount: 2,
          input: 4200,
          output: 1000,
          cached: 500,
          reasoning: 250,
          subagents: [
            subagent('evidence-agent', { input: 3400, output: 800, cached: 400, reasoning: 180 }),
            subagent('validation-agent', { input: 800, output: 200, cached: 100, reasoning: 70 }),
          ],
        }),
        wall_duration_ms: 6400,
        quality_score: 0.94,
        accuracy_score: 0.93,
        task_outcome: { task_count: 1, completed_count: 1 },
      },
    ],
  };
}

test('agent correction telemetry writes exact correction-count receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-telemetry-'));
  try {
    writeJson(join(root, 'correction-input.json'), validTelemetryInput());
    const result = runCorrectionTelemetry([
      '--project-dir',
      root,
      '--input',
      'correction-input.json',
      '--out',
      '.agent/evals/corrections/fixture.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.correction-telemetry.v1');
    assert.equal(receipt.totals.candidate_count, 2);
    assert.equal(receipt.totals.findings_count, 4);
    assert.equal(receipt.totals.corrections_applied, 4);
    assert.equal(receipt.candidates[0].correction_outcomes.findings_count, 2);
    assert.equal(receipt.receipt_path, '.agent/evals/corrections/fixture.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent correction telemetry rejects correction events without matching findings', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-telemetry-bad-'));
  try {
    const input = validTelemetryInput();
    input.candidates[0].events[1].finding_id = 'missing-finding';
    writeJson(join(root, 'correction-input.json'), input);
    const result = runCorrectionTelemetry(['--project-dir', root, '--input', 'correction-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'correction-telemetry-event-mismatch'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent correction telemetry rejects missing receipt identity', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-correction-telemetry-identity-'));
  try {
    const input = validTelemetryInput({ run_id: '' });
    writeJson(join(root, 'correction-input.json'), input);
    const result = runCorrectionTelemetry(['--project-dir', root, '--input', 'correction-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'correction-telemetry-identity-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing evaluation consumes correction telemetry receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-with-correction-telemetry-'));
  try {
    writeJson(join(root, 'correction-input.json'), validTelemetryInput());
    const telemetryResult = runCorrectionTelemetry([
      '--project-dir',
      root,
      '--input',
      'correction-input.json',
      '--out',
      'correction-receipt.json',
      '--json',
    ]);
    assert.equal(telemetryResult.status, 0, telemetryResult.stderr || telemetryResult.stdout);

    writeJson(join(root, 'routing-input.json'), routingInputWithoutCorrections());
    const routingResult = runRoutingEval([
      '--project-dir',
      root,
      '--input',
      'routing-input.json',
      '--correction-telemetry',
      'correction-receipt.json',
      '--json',
    ]);
    assert.equal(routingResult.status, 0, routingResult.stderr || routingResult.stdout);
    const receipt = JSON.parse(routingResult.stdout);
    assert.equal(receipt.recommendation.status, 'recommend');
    assert.equal(receipt.recommendation.candidate_id, 'orchestrated-specialists');
    assert.equal(receipt.candidates[0].correction_outcomes_source, 'correction-telemetry');
    assert.equal(receipt.candidates[1].correction_telemetry_candidate_id, 'orchestrated-specialists');
    assert.equal(receipt.candidates[1].correction_outcomes.corrections_applied, 2);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
