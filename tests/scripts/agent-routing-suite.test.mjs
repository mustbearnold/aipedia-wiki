import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { buildCorrectionTelemetry } from '../../scripts/lib/correction-telemetry.mjs';

function runRoutingSuite(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-routing-suite.mjs', ...args], {
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

function correctionTelemetry({ runId, singleFindings = 2, orchestratedFindings = 2 }) {
  const result = buildCorrectionTelemetry({
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: runId,
    workflow: 'loop-system',
    telemetry_source: {
      type: 'reviewer',
      id: `${runId}-reviewer`,
      confidence: 'exact',
    },
    candidates: [
      correctionCandidate('single-agent', `${runId}-single`, 'single-agent', singleFindings),
      correctionCandidate('orchestrated-specialists', `${runId}-orchestrated`, 'meta-orchestrator', orchestratedFindings),
    ],
  }, {
    generatedAt: '2026-07-01T03:30:00.000Z',
    projectDir: '.',
    source: `.agent/evals/routing-suites/${runId}-corrections.json`,
  });
  assert.deepEqual(result.issues, []);
  return result.receipt;
}

function correctionCandidate(id, runId, orchestrator, findings) {
  const events = [];
  for (let index = 1; index <= findings; index += 1) {
    events.push({ id: `${runId}-finding-${index}`, type: 'finding', severity: 'medium' });
    events.push({ id: `${runId}-fix-${index}`, type: 'correction_applied', finding_id: `${runId}-finding-${index}` });
  }
  return {
    id,
    workflow: 'loop-system',
    run_id: runId,
    orchestrator,
    events,
  };
}

function scenario({ id, taskClass, single, orchestrated, telemetry }) {
  return {
    id,
    task_class: taskClass,
    task_label: `${taskClass} routing`,
    correction_telemetry: telemetry,
    routing_input: {
      goal_id: 'june-30-agentic-tooling-meta-os',
      run_id: `slice-74-${id}`,
      workflow: 'loop-system',
      evaluation_task: `${taskClass} routing`,
      thresholds: {
        min_quality_score: 0.85,
        min_accuracy_score: 0.85,
        max_residual_issue_count: 0,
        max_regression_count: 0,
        minimum_improvement_margin: 0.02,
      },
      candidates: [
        candidate('single-agent', 'Single agent', 'single-agent', single),
        candidate('orchestrated-specialists', 'Orchestrated specialists', 'meta-orchestrator', orchestrated),
      ],
    },
  };
}

function candidate(id, label, orchestrator, values) {
  return {
    id,
    label,
    strategy: id === 'single-agent' ? 'single-agent' : 'orchestrator-plus-specialists',
    model: 'gpt-5.5',
    workflow: 'loop-system',
    run_id: values.runId,
    orchestrator,
    exact_model_tokens: exactTokens(values.tokens),
    wall_duration_ms: values.wall,
    quality_score: values.quality,
    accuracy_score: values.accuracy,
    task_outcome: { task_count: 1, completed_count: 1 },
  };
}

function suiteInput(overrides = {}) {
  return {
    goal_id: 'june-30-agentic-tooling-meta-os',
    run_id: 'slice-74-routing-suite',
    workflow: 'loop-system',
    suite_task: 'Compare routing variants across task classes.',
    scenarios: [
      scenario({
        id: 'evidence-heavy-refresh',
        taskClass: 'evidence-heavy-page-refresh',
        telemetry: correctionTelemetry({ runId: 'evidence-heavy-refresh' }),
        single: {
          runId: 'evidence-heavy-refresh-single',
          tokens: exactTokensInput(1, 7600, 1600, 900, 420, [subagent('single-agent', { input: 7600, output: 1600, cached: 900, reasoning: 420 })]),
          wall: 9200,
          quality: 0.88,
          accuracy: 0.87,
        },
        orchestrated: {
          runId: 'evidence-heavy-refresh-orchestrated',
          tokens: exactTokensInput(2, 6000, 1350, 850, 310, [
            subagent('evidence-agent', { input: 4600, output: 950, cached: 650, reasoning: 210 }),
            subagent('validation-agent', { input: 1400, output: 400, cached: 200, reasoning: 100 }),
          ]),
          wall: 7900,
          quality: 0.94,
          accuracy: 0.93,
        },
      }),
      scenario({
        id: 'validation-heavy-closeout',
        taskClass: 'validation-heavy-closeout',
        telemetry: correctionTelemetry({ runId: 'validation-heavy-closeout' }),
        single: {
          runId: 'validation-heavy-closeout-single',
          tokens: exactTokensInput(1, 6800, 1500, 700, 360, [subagent('single-agent', { input: 6800, output: 1500, cached: 700, reasoning: 360 })]),
          wall: 8700,
          quality: 0.89,
          accuracy: 0.88,
        },
        orchestrated: {
          runId: 'validation-heavy-closeout-orchestrated',
          tokens: exactTokensInput(2, 5400, 1200, 650, 260, [
            subagent('validator-agent', { input: 3400, output: 750, cached: 400, reasoning: 160 }),
            subagent('repair-agent', { input: 2000, output: 450, cached: 250, reasoning: 100 }),
          ]),
          wall: 7300,
          quality: 0.93,
          accuracy: 0.94,
        },
      }),
      scenario({
        id: 'tiny-status-check',
        taskClass: 'tiny-status-check',
        telemetry: correctionTelemetry({ runId: 'tiny-status-check', singleFindings: 0, orchestratedFindings: 0 }),
        single: {
          runId: 'tiny-status-check-single',
          tokens: exactTokensInput(1, 1000, 250, 100, 45, [subagent('single-agent', { input: 1000, output: 250, cached: 100, reasoning: 45 })]),
          wall: 1200,
          quality: 0.91,
          accuracy: 0.91,
        },
        orchestrated: {
          runId: 'tiny-status-check-orchestrated',
          tokens: exactTokensInput(2, 2100, 520, 220, 120, [
            subagent('planner-agent', { input: 1200, output: 300, cached: 120, reasoning: 70 }),
            subagent('validator-agent', { input: 900, output: 220, cached: 100, reasoning: 50 }),
          ]),
          wall: 2100,
          quality: 0.92,
          accuracy: 0.92,
        },
      }),
    ],
    ...overrides,
  };
}

function exactTokensInput(requestCount, input, output, cached, reasoning, subagents) {
  return {
    requestCount,
    input,
    output,
    cached,
    reasoning,
    subagents,
  };
}

test('agent routing suite writes multi-task routing receipts', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-suite-'));
  try {
    writeJson(join(root, 'suite-input.json'), suiteInput());
    const result = runRoutingSuite([
      '--project-dir',
      root,
      '--input',
      'suite-input.json',
      '--out',
      '.agent/evals/routing-suites/fixture.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.schema_version, 'aipedia.agent-routing-evaluation-suite.v1');
    assert.equal(receipt.totals.scenario_count, 3);
    assert.equal(receipt.totals.telemetry_backed_scenario_count, 3);
    assert.equal(receipt.aggregate.dominant_recommended_candidate_id, 'orchestrated-specialists');
    assert.equal(receipt.aggregate.dominant_recommended_candidate_count, 2);
    assert.equal(receipt.aggregate.all_recommended_same_candidate, false);
    assert.equal(receipt.scenarios[2].recommended_candidate_id, 'single-agent');
    assert.ok(receipt.next_actions.some((action) => action.includes('conditional')));
    assert.equal(receipt.receipt_path, '.agent/evals/routing-suites/fixture.json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing suite hydrates correction telemetry from a receipt path', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-suite-telemetry-path-'));
  try {
    const input = suiteInput();
    for (const scenarioInput of input.scenarios) {
      delete scenarioInput.correction_telemetry;
    }
    writeJson(join(root, 'suite-input.json'), input);
    writeJson(join(root, 'correction-telemetry.json'), correctionTelemetry({ runId: 'path-backed-jsonl-log' }));
    const result = runRoutingSuite([
      '--project-dir',
      root,
      '--input',
      'suite-input.json',
      '--correction-telemetry',
      'correction-telemetry.json',
      '--out',
      '.agent/evals/routing-suites/path-backed.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.totals.telemetry_backed_scenario_count, 3);
    assert.equal(receipt.aggregate.telemetry_coverage_rate, 1);
    assert.equal(receipt.scenarios[0].routing_evaluation.candidates[0].correction_outcomes_source, 'correction-telemetry');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing suite hydrates scenario correction telemetry paths', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-suite-scenario-path-'));
  try {
    const input = suiteInput();
    for (const [index, scenarioInput] of input.scenarios.entries()) {
      const telemetryPath = `correction-telemetry-${index}.json`;
      writeJson(join(root, telemetryPath), scenarioInput.correction_telemetry);
      delete scenarioInput.correction_telemetry;
      scenarioInput.correction_telemetry_path = telemetryPath;
    }
    writeJson(join(root, 'suite-input.json'), input);
    const result = runRoutingSuite([
      '--project-dir',
      root,
      '--input',
      'suite-input.json',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const receipt = JSON.parse(result.stdout);
    assert.equal(receipt.totals.telemetry_backed_scenario_count, 3);
    assert.equal(receipt.scenarios[1].routing_evaluation.candidates[1].correction_telemetry_candidate_id, 'orchestrated-specialists');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('agent routing suite rejects duplicate scenario ids', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-routing-suite-bad-'));
  try {
    const input = suiteInput();
    input.scenarios[1].id = input.scenarios[0].id;
    writeJson(join(root, 'suite-input.json'), input);
    const result = runRoutingSuite(['--project-dir', root, '--input', 'suite-input.json', '--json']);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => issue.code === 'routing-suite-scenario-invalid'));
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
