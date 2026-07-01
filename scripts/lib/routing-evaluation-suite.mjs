import { buildRoutingEvaluation, validateRoutingEvaluationReceipt, routingIssue } from './routing-evaluation.mjs';
import { CORRECTION_TELEMETRY_SCHEMA_VERSION } from './correction-telemetry.mjs';

export const ROUTING_EVALUATION_SUITE_SCHEMA_VERSION = 'aipedia.agent-routing-evaluation-suite.v1';

export function buildRoutingEvaluationSuite(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [suiteIssue('routing-suite-input-invalid', 'Input must be an object.')],
    };
  }

  for (const field of ['goal_id', 'run_id', 'workflow', 'suite_task']) {
    if (!stringValue(input[field])) issues.push(suiteIssue('routing-suite-identity-invalid', `${field} is required.`));
  }

  const scenariosInput = Array.isArray(input.scenarios) ? input.scenarios : [];
  if (!Array.isArray(input.scenarios)) {
    issues.push(suiteIssue('routing-suite-scenarios-invalid', 'scenarios must be an array.'));
  }
  if (scenariosInput.length < 2) {
    issues.push(suiteIssue('routing-suite-scenarios-invalid', 'At least two routing evaluation scenarios are required.'));
  }

  const generatedAt = options.generatedAt || input.generated_at || new Date().toISOString();
  const scenarioIds = new Set();
  const scenarios = scenariosInput.map((scenario, index) => normalizeScenario(scenario, index, scenarioIds, input, generatedAt, options, issues));
  if (issues.length) return { receipt: null, issues };

  const totals = suiteTotals(scenarios);
  const aggregate = suiteAggregate(scenarios);
  const nextActions = suiteNextActions(totals, aggregate);

  return {
    receipt: {
      ok: true,
      mode: 'agent-routing-evaluation-suite',
      schema_version: ROUTING_EVALUATION_SUITE_SCHEMA_VERSION,
      generated_at: generatedAt,
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || '',
      goal_id: stringValue(input.goal_id),
      run_id: stringValue(input.run_id),
      workflow: stringValue(input.workflow),
      suite_task: stringValue(input.suite_task),
      totals,
      scenarios,
      aggregate,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingEvaluationSuiteReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [suiteIssue('routing-suite-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-evaluation-suite'],
    ['schema_version', ROUTING_EVALUATION_SUITE_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(suiteIssue('routing-suite-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'suite_task']) {
    if (typeof value[field] !== 'string') issues.push(suiteIssue('routing-suite-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'suite_task']) {
    if (!stringValue(value[field])) issues.push(suiteIssue('routing-suite-identity-invalid', `${field} is required.`));
  }
  if (!isObject(value.totals)) issues.push(suiteIssue('routing-suite-total-mismatch', 'totals must be an object.'));
  if (!Array.isArray(value.scenarios)) issues.push(suiteIssue('routing-suite-scenarios-invalid', 'scenarios must be an array.'));
  if (!isObject(value.aggregate)) issues.push(suiteIssue('routing-suite-aggregate-mismatch', 'aggregate must be an object.'));
  if (!Array.isArray(value.next_actions)) issues.push(suiteIssue('routing-suite-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  for (const scenario of value.scenarios) {
    if (!isObject(scenario.routing_evaluation)) {
      issues.push(suiteIssue('routing-suite-scenario-invalid', 'Each scenario must embed a routing_evaluation receipt.'));
      continue;
    }
    const nestedIssues = validateRoutingEvaluationReceipt(scenario.routing_evaluation);
    for (const item of nestedIssues) {
      issues.push(suiteIssue('routing-suite-scenario-invalid', item.message));
    }
  }
  if (issues.length) return issues;

  const rebuilt = buildRoutingEvaluationSuite(value, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['totals', 'scenarios', 'aggregate', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(suiteIssue('routing-suite-aggregate-mismatch', `${field} must match canonical routing suite computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(suiteIssue('routing-suite-aggregate-mismatch', 'ok must match canonical routing suite computation.'));
  }
  return issues;
}

export function suiteIssue(code, message) {
  return { code, message };
}

function normalizeScenario(scenario, index, scenarioIds, suiteInput, generatedAt, options, issues) {
  const path = `scenarios[${index}]`;
  if (!isObject(scenario)) {
    issues.push(suiteIssue('routing-suite-scenario-invalid', `${path} must be an object.`));
    return emptyScenario();
  }
  const id = stringValue(scenario.id);
  if (!id) issues.push(suiteIssue('routing-suite-scenario-invalid', `${path}.id is required.`));
  if (id && scenarioIds.has(id)) issues.push(suiteIssue('routing-suite-scenario-invalid', `${path}.id must be unique.`));
  if (id) scenarioIds.add(id);

  const taskClass = stringValue(scenario.task_class);
  if (!taskClass) issues.push(suiteIssue('routing-suite-scenario-invalid', `${path}.task_class is required.`));

  const routingInput = routingInputForScenario(scenario);
  if (!isObject(routingInput)) {
    issues.push(suiteIssue('routing-suite-scenario-invalid', `${path}.routing_input must be an object.`));
    return emptyScenario(id, taskClass);
  }

  const correctionTelemetry = scenario.correction_telemetry || routingInput.correction_telemetry || suiteInput.correction_telemetry;
  const evaluationInput = {
    goal_id: stringValue(suiteInput.goal_id),
    run_id: `${stringValue(suiteInput.run_id)}:${id}`,
    workflow: stringValue(suiteInput.workflow),
    evaluation_task: stringValue(scenario.task_label || scenario.task_class || suiteInput.suite_task),
    ...routingInput,
    ...(correctionTelemetry ? { correction_telemetry: correctionTelemetry } : {}),
  };
  const evaluation = buildRoutingEvaluation(evaluationInput, {
    generatedAt,
    projectDir: options.projectDir || suiteInput.project_dir || '.',
    source: `${options.source || suiteInput.source || ''}#${id}`,
  });
  if (evaluation.issues.length) {
    for (const item of evaluation.issues) {
      issues.push(suiteIssue('routing-suite-scenario-invalid', `${path}: ${item.message}`));
    }
    return emptyScenario(id, taskClass);
  }

  const receipt = evaluation.receipt;
  const ranked = rankedEligibleCandidates(receipt);
  const winner = ranked[0] || null;
  const runnerUp = ranked[1] || null;
  const telemetryBacked = receipt.candidates.some((candidate) => candidate.correction_outcomes_source === 'correction-telemetry');
  return {
    id,
    task_class: taskClass,
    task_label: stringValue(scenario.task_label) || taskClass,
    correction_telemetry_schema: telemetryBacked ? CORRECTION_TELEMETRY_SCHEMA_VERSION : '',
    recommendation_status: receipt.recommendation.status,
    recommended_candidate_id: stringValue(receipt.recommendation.candidate_id),
    winner_id: winner?.id || '',
    runner_up_id: runnerUp?.id || '',
    improvement_margin: receipt.recommendation.improvement_margin || 0,
    winner_exact_model_total_tokens: winner?.exact_model_tokens?.total_tokens || 0,
    runner_up_exact_model_total_tokens: runnerUp?.exact_model_tokens?.total_tokens || 0,
    exact_model_token_delta: runnerUp && winner ? runnerUp.exact_model_tokens.total_tokens - winner.exact_model_tokens.total_tokens : 0,
    winner_wall_duration_ms: winner?.wall_duration_ms || 0,
    runner_up_wall_duration_ms: runnerUp?.wall_duration_ms || 0,
    wall_duration_delta_ms: runnerUp && winner ? runnerUp.wall_duration_ms - winner.wall_duration_ms : 0,
    routing_evaluation: receipt,
  };
}

function routingInputForScenario(scenario) {
  if (isObject(scenario.routing_input)) return scenario.routing_input;
  if (isObject(scenario.routing_evaluation)) return scenario.routing_evaluation;
  return null;
}

function suiteTotals(scenarios) {
  return {
    scenario_count: scenarios.length,
    recommendation_count: scenarios.filter((scenario) => scenario.recommendation_status === 'recommend').length,
    monitor_count: scenarios.filter((scenario) => scenario.recommendation_status === 'monitor').length,
    blocked_count: scenarios.filter((scenario) => scenario.recommendation_status === 'blocked').length,
    telemetry_backed_scenario_count: scenarios.filter((scenario) => scenario.correction_telemetry_schema === CORRECTION_TELEMETRY_SCHEMA_VERSION).length,
  };
}

function suiteAggregate(scenarios) {
  const recommended = scenarios.filter((scenario) => scenario.recommendation_status === 'recommend');
  const winCounts = countBy(recommended.map((scenario) => scenario.recommended_candidate_id).filter(Boolean));
  const topWinner = [...winCounts].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))[0] || ['', 0];
  return {
    recommended_candidate_counts: Object.fromEntries(winCounts),
    dominant_recommended_candidate_id: topWinner[0],
    dominant_recommended_candidate_count: topWinner[1],
    all_recommended_same_candidate: recommended.length > 0 && topWinner[1] === recommended.length,
    average_improvement_margin: average(recommended.map((scenario) => scenario.improvement_margin)),
    total_exact_model_token_delta: recommended.reduce((sum, scenario) => sum + scenario.exact_model_token_delta, 0),
    total_wall_duration_delta_ms: recommended.reduce((sum, scenario) => sum + scenario.wall_duration_delta_ms, 0),
    telemetry_coverage_rate: scenarios.length ? round(scenarios.filter((scenario) => scenario.correction_telemetry_schema === CORRECTION_TELEMETRY_SCHEMA_VERSION).length / scenarios.length) : 0,
  };
}

function suiteNextActions(totals, aggregate) {
  const actions = [];
  if (totals.blocked_count > 0) actions.push('Inspect blocked routing scenarios before using this suite to change orchestration defaults.');
  if (aggregate.telemetry_coverage_rate < 1) actions.push('Add correction telemetry for every scenario before claiming exact correction coverage.');
  if (!aggregate.all_recommended_same_candidate) actions.push('Keep orchestration routing conditional by task class because the suite does not recommend one candidate everywhere.');
  if (aggregate.all_recommended_same_candidate && totals.recommendation_count >= 2 && aggregate.telemetry_coverage_rate === 1) {
    actions.push('Use this suite as evidence for a bounded routing pilot, then validate on real workloads before changing defaults.');
  }
  return actions;
}

function rankedEligibleCandidates(receipt) {
  return [...receipt.candidates]
    .filter((candidate) => candidate.eligible)
    .sort((left, right) => {
      if (right.overall_score !== left.overall_score) return right.overall_score - left.overall_score;
      if (left.exact_model_tokens.total_tokens !== right.exact_model_tokens.total_tokens) return left.exact_model_tokens.total_tokens - right.exact_model_tokens.total_tokens;
      if (left.wall_duration_ms !== right.wall_duration_ms) return left.wall_duration_ms - right.wall_duration_ms;
      return left.id.localeCompare(right.id);
    });
}

function emptyScenario(id = '', taskClass = '') {
  return {
    id,
    task_class: taskClass,
    task_label: taskClass,
    correction_telemetry_schema: '',
    recommendation_status: '',
    recommended_candidate_id: '',
    winner_id: '',
    runner_up_id: '',
    improvement_margin: 0,
    winner_exact_model_total_tokens: 0,
    runner_up_exact_model_total_tokens: 0,
    exact_model_token_delta: 0,
    winner_wall_duration_ms: 0,
    runner_up_wall_duration_ms: 0,
    wall_duration_delta_ms: 0,
    routing_evaluation: null,
  };
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) counts.set(value, (counts.get(value) || 0) + 1);
  return counts;
}

function average(values) {
  if (!values.length) return 0;
  return round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function deepEqual(left, right) {
  return JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map((item) => canonicalize(item));
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}
