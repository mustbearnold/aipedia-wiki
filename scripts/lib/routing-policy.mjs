import { validateRoutingEvaluationSuiteReceipt } from './routing-evaluation-suite.mjs';

export const ROUTING_POLICY_SCHEMA_VERSION = 'aipedia.agent-routing-policy.v1';

export function buildRoutingPolicy(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingPolicyIssue('routing-policy-input-invalid', 'Input must be an object.')],
    };
  }

  const sourceSuite = normalizeSourceSuite(input, issues);
  if (issues.length) return { receipt: null, issues };

  const policy = policySummary(sourceSuite);
  const rules = policyRules(sourceSuite);
  const totals = policyTotals(sourceSuite, rules);
  const guardrails = policyGuardrails(sourceSuite, policy);
  const nextActions = policyNextActions(sourceSuite, policy);

  return {
    receipt: {
      ok: true,
      mode: 'agent-routing-policy',
      schema_version: ROUTING_POLICY_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || sourceSuite.receipt_path || '',
      goal_id: sourceSuite.goal_id,
      run_id: stringValue(input.run_id) || `${sourceSuite.run_id}:routing-policy`,
      workflow: sourceSuite.workflow,
      policy_task: stringValue(input.policy_task || input.task) || `Routing policy from ${sourceSuite.run_id}`,
      source_suite: sourceSuite,
      totals,
      policy,
      rules,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingPolicyReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingPolicyIssue('routing-policy-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-policy'],
    ['schema_version', ROUTING_POLICY_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingPolicyIssue('routing-policy-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'policy_task']) {
    if (typeof value[field] !== 'string') issues.push(routingPolicyIssue('routing-policy-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'policy_task']) {
    if (!stringValue(value[field])) issues.push(routingPolicyIssue('routing-policy-identity-invalid', `${field} is required.`));
  }
  if (!isObject(value.source_suite)) issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', 'source_suite must be an object.'));
  if (!isObject(value.totals)) issues.push(routingPolicyIssue('routing-policy-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.policy)) issues.push(routingPolicyIssue('routing-policy-mismatch', 'policy must be an object.'));
  if (!Array.isArray(value.rules)) issues.push(routingPolicyIssue('routing-policy-rules-invalid', 'rules must be an array.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingPolicyIssue('routing-policy-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingPolicyIssue('routing-policy-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingPolicy({
    source_suite: value.source_suite,
    run_id: value.run_id,
    policy_task: value.policy_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['source_suite', 'totals', 'policy', 'rules', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingPolicyIssue('routing-policy-mismatch', `${field} must match canonical routing policy computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingPolicyIssue('routing-policy-mismatch', 'ok must match canonical routing policy computation.'));
  }
  return issues;
}

export function routingPolicyIssue(code, message) {
  return { code, message };
}

function normalizeSourceSuite(input, issues) {
  const suite = input.routing_suite || input.suite || (isRoutingSuiteReceipt(input) ? input : null);
  if (suite) {
    const suiteIssues = validateRoutingEvaluationSuiteReceipt(suite);
    for (const issue of suiteIssues) {
      issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', issue.message));
    }
    return suiteIssues.length ? emptySourceSuite() : sourceSuiteFromReceipt(suite);
  }

  if (isObject(input.source_suite)) {
    return sourceSuiteFromSummary(input.source_suite, issues);
  }

  issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', 'A routing suite receipt or source_suite summary is required.'));
  return emptySourceSuite();
}

function sourceSuiteFromReceipt(suite) {
  return {
    receipt_path: stringValue(suite.receipt_path),
    schema_version: stringValue(suite.schema_version),
    generated_at: stringValue(suite.generated_at),
    source: stringValue(suite.source),
    goal_id: stringValue(suite.goal_id),
    run_id: stringValue(suite.run_id),
    workflow: stringValue(suite.workflow),
    suite_task: stringValue(suite.suite_task),
    totals: suiteTotals(suite.totals),
    aggregate: suiteAggregate(suite.aggregate),
    correction_telemetry_refs: telemetryRefs(suite.correction_telemetry_refs),
    scenarios: Array.isArray(suite.scenarios) ? suite.scenarios.map(sourceScenario) : [],
  };
}

function sourceSuiteFromSummary(summary, issues) {
  const normalized = {
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    suite_task: stringValue(summary.suite_task),
    totals: suiteTotals(summary.totals),
    aggregate: suiteAggregate(summary.aggregate),
    correction_telemetry_refs: telemetryRefs(summary.correction_telemetry_refs),
    scenarios: Array.isArray(summary.scenarios) ? summary.scenarios.map(sourceScenario) : [],
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'suite_task']) {
    if (!normalized[field]) issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', `source_suite.${field} is required.`));
  }
  if (!Array.isArray(summary.scenarios) || normalized.scenarios.length < 2) {
    issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', 'source_suite.scenarios must contain at least two scenarios.'));
  }
  if (normalized.totals.scenario_count !== normalized.scenarios.length) {
    issues.push(routingPolicyIssue('routing-policy-source-suite-invalid', 'source_suite.totals.scenario_count must match source_suite.scenarios length.'));
  }
  return normalized;
}

function sourceScenario(scenario) {
  return {
    id: stringValue(scenario.id),
    task_class: stringValue(scenario.task_class),
    task_label: stringValue(scenario.task_label),
    correction_telemetry_schema: stringValue(scenario.correction_telemetry_schema),
    correction_telemetry_refs: telemetryRefs(scenario.correction_telemetry_refs),
    recommendation_status: stringValue(scenario.recommendation_status),
    recommended_candidate_id: stringValue(scenario.recommended_candidate_id),
    winner_id: stringValue(scenario.winner_id),
    runner_up_id: stringValue(scenario.runner_up_id),
    improvement_margin: numberValue(scenario.improvement_margin),
    winner_exact_model_total_tokens: nonNegativeInteger(scenario.winner_exact_model_total_tokens),
    runner_up_exact_model_total_tokens: nonNegativeInteger(scenario.runner_up_exact_model_total_tokens),
    exact_model_token_delta: numberValue(scenario.exact_model_token_delta),
    winner_wall_duration_ms: numberValue(scenario.winner_wall_duration_ms),
    runner_up_wall_duration_ms: numberValue(scenario.runner_up_wall_duration_ms),
    wall_duration_delta_ms: numberValue(scenario.wall_duration_delta_ms),
  };
}

function suiteTotals(totals) {
  return {
    scenario_count: nonNegativeInteger(totals?.scenario_count),
    recommendation_count: nonNegativeInteger(totals?.recommendation_count),
    monitor_count: nonNegativeInteger(totals?.monitor_count),
    blocked_count: nonNegativeInteger(totals?.blocked_count),
    telemetry_backed_scenario_count: nonNegativeInteger(totals?.telemetry_backed_scenario_count),
  };
}

function suiteAggregate(aggregate) {
  return {
    recommended_candidate_counts: isObject(aggregate?.recommended_candidate_counts)
      ? Object.fromEntries(Object.entries(aggregate.recommended_candidate_counts).map(([key, value]) => [key, nonNegativeInteger(value)]).sort(([left], [right]) => left.localeCompare(right)))
      : {},
    dominant_recommended_candidate_id: stringValue(aggregate?.dominant_recommended_candidate_id),
    dominant_recommended_candidate_count: nonNegativeInteger(aggregate?.dominant_recommended_candidate_count),
    all_recommended_same_candidate: aggregate?.all_recommended_same_candidate === true,
    average_improvement_margin: numberValue(aggregate?.average_improvement_margin),
    total_exact_model_token_delta: numberValue(aggregate?.total_exact_model_token_delta),
    total_wall_duration_delta_ms: numberValue(aggregate?.total_wall_duration_delta_ms),
    telemetry_coverage_rate: numberValue(aggregate?.telemetry_coverage_rate),
  };
}

function telemetryRefs(refs) {
  if (!Array.isArray(refs)) return [];
  return refs
    .map((ref) => ({
      receipt_path: stringValue(ref.receipt_path),
      schema_version: stringValue(ref.schema_version),
      scenario_ids: Array.isArray(ref.scenario_ids) ? ref.scenario_ids.map(stringValue).filter(Boolean).sort() : undefined,
      candidate_ids: Array.isArray(ref.candidate_ids) ? ref.candidate_ids.map(stringValue).filter(Boolean).sort() : [],
    }))
    .filter((ref) => ref.receipt_path)
    .sort((left, right) => left.receipt_path.localeCompare(right.receipt_path));
}

function policySummary(sourceSuite) {
  const blocked = sourceSuite.totals.blocked_count > 0;
  const recommendationCount = sourceSuite.totals.recommendation_count;
  const allSame = sourceSuite.aggregate.all_recommended_same_candidate && recommendationCount > 0;
  const status = blocked ? 'blocked' : allSame ? 'single-default-candidate' : 'conditional-by-task-class';
  return {
    status,
    default_candidate_id: status === 'single-default-candidate' ? sourceSuite.aggregate.dominant_recommended_candidate_id : '',
    conditional_routing_required: status === 'conditional-by-task-class',
    promotion_allowed: status !== 'blocked' && sourceSuite.aggregate.telemetry_coverage_rate === 1,
    reason: policyReason(sourceSuite, status),
  };
}

function policyRules(sourceSuite) {
  return sourceSuite.scenarios
    .filter((scenario) => scenario.recommendation_status === 'recommend')
    .map((scenario) => ({
      id: scenario.id,
      task_class: scenario.task_class,
      task_label: scenario.task_label,
      route_candidate_id: scenario.recommended_candidate_id,
      winner_id: scenario.winner_id,
      runner_up_id: scenario.runner_up_id,
      improvement_margin: scenario.improvement_margin,
      exact_model_token_delta: scenario.exact_model_token_delta,
      wall_duration_delta_ms: scenario.wall_duration_delta_ms,
      correction_telemetry_refs: telemetryRefs(scenario.correction_telemetry_refs),
      evidence: {
        source_suite_receipt: sourceSuite.receipt_path,
        source_suite_schema_version: sourceSuite.schema_version,
        telemetry_backed: Boolean(scenario.correction_telemetry_schema),
      },
    }))
    .sort((left, right) => left.task_class.localeCompare(right.task_class) || left.id.localeCompare(right.id));
}

function policyTotals(sourceSuite, rules) {
  return {
    scenario_count: sourceSuite.totals.scenario_count,
    rule_count: rules.length,
    conditional_rule_count: sourceSuite.aggregate.all_recommended_same_candidate ? 0 : rules.length,
    blocked_scenario_count: sourceSuite.totals.blocked_count,
    telemetry_ref_count: sourceSuite.correction_telemetry_refs.length,
  };
}

function policyGuardrails(sourceSuite, policy) {
  const guardrails = [];
  if (policy.status === 'blocked') {
    guardrails.push('Do not promote a routing policy until blocked scenarios are resolved.');
  }
  if (policy.conditional_routing_required) {
    guardrails.push('Do not set a blanket default because the suite recommends different candidates by task class.');
  }
  if (sourceSuite.aggregate.telemetry_coverage_rate < 1) {
    guardrails.push('Collect correction telemetry for every scenario before promoting this policy.');
  }
  guardrails.push('Require exact model-token, correction, quality, accuracy, and wall-time receipts before changing routing defaults.');
  guardrails.push('Re-run agent:routing:suite and agent:routing:policy after material workflow, model, or prompt changes.');
  return guardrails;
}

function policyNextActions(sourceSuite, policy) {
  if (policy.status === 'blocked') return ['Resolve blocked routing scenarios, then regenerate the routing suite and policy receipts.'];
  if (policy.conditional_routing_required) return ['Pilot the per-task-class rules on bounded real workloads before changing orchestration defaults.'];
  if (sourceSuite.aggregate.telemetry_coverage_rate < 1) return ['Add telemetry coverage before using the single default candidate outside a pilot.'];
  return ['Pilot the default candidate on bounded real workloads, then compare exact token, correction, speed, accuracy, and quality receipts.'];
}

function policyReason(sourceSuite, status) {
  if (status === 'blocked') return 'At least one suite scenario is blocked.';
  if (status === 'conditional-by-task-class') return 'The suite recommends different candidates across task classes.';
  return `${sourceSuite.aggregate.dominant_recommended_candidate_id} is recommended across every recommended scenario.`;
}

function emptySourceSuite() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    suite_task: '',
    totals: suiteTotals({}),
    aggregate: suiteAggregate({}),
    correction_telemetry_refs: [],
    scenarios: [],
  };
}

function isRoutingSuiteReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-evaluation-suite' && typeof value.schema_version === 'string';
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function numberValue(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function nonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
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
