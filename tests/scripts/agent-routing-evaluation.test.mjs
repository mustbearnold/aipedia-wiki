import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runRoutingEval(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-evaluation.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
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

function validRoutingInput(overrides = {}) {
  return {
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-72-routing-eval',
    workflow: 'loop-system',
    evaluation_task: 'Compare single-agent versus orchestrated evidence and validation routing.',
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
        run_id: 'slice-72-single-agent',
        orchestrator: 'single-agent',
        exact_model_tokens: exactTokens({
          requestCount: 1,
          input: 4800,
          output: 1200,
          cached: 600,
          reasoning: 300,
          subagents: [
            subagent('single-agent', {
              input: 4800,
              output: 1200,
              cached: 600,
              reasoning: 300,
            }),
          ],
        }),
        wall_duration_ms: 7000,
        quality_score: 0.9,
        accuracy_score: 0.88,
        correction_outcomes: {
          findings_count: 2,
          corrections_applied: 2,
          residual_issue_count: 0,
          regression_count: 0,
        },
        task_outcome: {
          task_count: 1,
          completed_count: 1,
        },
      },
      {
        id: 'orchestrated-specialists',
        label: 'Orchestrated specialists',
        strategy: 'orchestrator-plus-specialists',
        model: 'gpt-5.5',
        workflow: 'loop-system',
        run_id: 'slice-72-orchestrated-specialists',
        orchestrator: 'meta-orchestrator',
        exact_model_tokens: exactTokens({
          requestCount: 2,
          input: 4200,
          output: 1000,
          cached: 500,
          reasoning: 250,
          subagents: [
            subagent('evidence-agent', {
              input: 3400,
              output: 800,
              cached: 400,
              reasoning: 180,
            }),
            subagent('validation-agent', {
              input: 800,
              output: 200,
              cached: 100,
              reasoning: 70,
            }),
          ],
        }),
        wall_duration_ms: 6400,
        quality_score: 0.94,
        accuracy_score: 0.93,
        correction_outcomes: {
          findings_count: 2,
          corrections_applied: 2,
          residual_issue_count: 0,
          regression_count: 0,
        },
        task_outcome: {
          task_count: 1,
          completed_count: 1,
        },
      },
    ],
    ...overrides,
  };
}

test('agent routing evaluation recommends the best exact-token candidate and writes a receipt', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-eval-'));
  try {
    writeJson(join(root, 'routing-input.json'), validRoutingInput());
    const result = runRoutingEval([
      '--project-dir',
      root,
      '--input',
      'routing-input.json',
      '--out',
      '.agent/evals/routing/fixture.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-evaluation.v1');
    assert.equal(receipt.recommendation.status, 'recommend');
    assert.equal(receipt.recommendation.candidate_id, 'orchestrated-specialists');
    assert.equal(receipt.winner.id, 'orchestrated-specialists');
    assert.equal(receipt.candidates[0].overall_score, 0.913);
    assert.equal(receipt.candidates[1].overall_score, 0.964);
    assert.equal(receipt.receipt_path, '.agent/evals/routing/fixture.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing evaluation fails without exact token usage and subagent breakdowns', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-eval-missing-tokens-'));
  try {
    const input = validRoutingInput();
    delete input.candidates[0].exact_model_tokens;
    writeJson(join(root, 'routing-input.json'), input);
    const result = runRoutingEval(['--project-dir', root, '--input', 'routing-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-evaluation-token-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing evaluation rejects zero-request exact token rows', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-eval-zero-requests-'));
  try {
    const input = validRoutingInput();
    input.candidates[0].exact_model_tokens.request_count = 0;
    input.candidates[0].exact_model_tokens.subagent_breakdown[0].request_count = 0;
    writeJson(join(root, 'routing-input.json'), input);
    const result = runRoutingEval(['--project-dir', root, '--input', 'routing-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-evaluation-number-invalid' && issue.message.includes('request_count')));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing evaluation blocks candidates below quality thresholds', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-eval-blocked-'));
  try {
    const input = validRoutingInput();
    input.candidates[0].quality_score = 0.4;
    input.candidates[1].accuracy_score = 0.3;
    writeJson(join(root, 'routing-input.json'), input);
    const result = runRoutingEval(['--project-dir', root, '--input', 'routing-input.json', '--json']);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.recommendation.status, 'blocked');
    assert.equal(receipt.totals.eligible_candidate_count, 0);
    assert.deepEqual(receipt.candidates[0].ineligible_reasons, ['quality-below-threshold']);
    assert.deepEqual(receipt.candidates[1].ineligible_reasons, ['accuracy-below-threshold']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
