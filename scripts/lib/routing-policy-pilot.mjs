import { buildRoutingPolicy, validateRoutingPolicyReceipt } from './routing-policy.mjs';

export const ROUTING_POLICY_PILOT_SCHEMA_VERSION = 'aipedia.agent-routing-policy-pilot.v1';

export function buildRoutingPolicyPilot(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingPolicyPilotIssue('routing-policy-pilot-input-invalid', 'Input must be an object.')],
    };
  }

  const sourcePolicy = normalizeSourcePolicy(input, issues);
  const pilotSuite = normalizePilotSuite(input, issues);
  if (issues.length) return { receipt: null, issues };

  const scenarios = pilotScenarios(sourcePolicy, pilotSuite);
  const totals = pilotTotals(sourcePolicy, pilotSuite, scenarios);
  const policyFit = policyFitSummary(sourcePolicy, pilotSuite, totals);
  const guardrails = pilotGuardrails(sourcePolicy, pilotSuite, totals, policyFit);
  const nextActions = pilotNextActions(policyFit, totals);

  return {
    receipt: {
      ok: true,
      mode: 'agent-routing-policy-pilot',
      schema_version: ROUTING_POLICY_PILOT_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || sourcePolicy.receipt_path || pilotSuite.receipt_path || '',
      goal_id: stringValue(input.goal_id) || sourcePolicy.goal_id || pilotSuite.goal_id,
      run_id: stringValue(input.run_id) || `${sourcePolicy.run_id}:pilot:${pilotSuite.run_id}`,
      workflow: stringValue(input.workflow) || sourcePolicy.workflow || pilotSuite.workflow,
      pilot_task: stringValue(input.pilot_task || input.task) || `Pilot ${sourcePolicy.run_id} on ${pilotSuite.run_id}`,
      source_policy: sourcePolicy,
      pilot_suite: pilotSuite,
      totals,
      policy_fit: policyFit,
      scenarios,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingPolicyPilotReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingPolicyPilotIssue('routing-policy-pilot-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-policy-pilot'],
    ['schema_version', ROUTING_POLICY_PILOT_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingPolicyPilotIssue('routing-policy-pilot-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'pilot_task']) {
    if (typeof value[field] !== 'string') issues.push(routingPolicyPilotIssue('routing-policy-pilot-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'pilot_task']) {
    if (!stringValue(value[field])) issues.push(routingPolicyPilotIssue('routing-policy-pilot-identity-invalid', `${field} is required.`));
  }
  if (!isObject(value.source_policy)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', 'source_policy must be an object.'));
  if (!isObject(value.pilot_suite)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-suite-invalid', 'pilot_suite must be an object.'));
  if (!isObject(value.totals)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.policy_fit)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-fit-mismatch', 'policy_fit must be an object.'));
  if (!Array.isArray(value.scenarios)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-scenarios-invalid', 'scenarios must be an array.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingPolicyPilotIssue('routing-policy-pilot-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingPolicyPilot({
    source_policy: value.source_policy,
    pilot_suite: value.pilot_suite,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    pilot_task: value.pilot_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['source_policy', 'pilot_suite', 'totals', 'policy_fit', 'scenarios', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingPolicyPilotIssue('routing-policy-pilot-mismatch', `${field} must match canonical routing policy pilot computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingPolicyPilotIssue('routing-policy-pilot-mismatch', 'ok must match canonical routing policy pilot computation.'));
  }
  return issues;
}

export function routingPolicyPilotIssue(code, message) {
  return { code, message };
}

function normalizeSourcePolicy(input, issues) {
  const policy = input.routing_policy || input.policy || (isRoutingPolicyReceipt(input) ? input : null);
  if (policy) {
    const policyIssues = validateRoutingPolicyReceipt(policy);
    for (const item of policyIssues) {
      issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', item.message));
    }
    return policyIssues.length ? emptySourcePolicy() : sourcePolicyFromReceipt(policy);
  }

  if (isObject(input.source_policy)) {
    return sourcePolicyFromSummary(input.source_policy, issues);
  }

  issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', 'A routing policy receipt or source_policy summary is required.'));
  return emptySourcePolicy();
}

function normalizePilotSuite(input, issues) {
  const suite = input.pilot_suite || input.routing_suite || input.suite || null;
  if (!suite) {
    issues.push(routingPolicyPilotIssue('routing-policy-pilot-suite-invalid', 'A pilot routing-suite receipt or pilot_suite summary is required.'));
    return emptyPilotSuite();
  }
  const result = buildRoutingPolicy(isRoutingSuiteReceipt(suite) ? { routing_suite: suite } : { source_suite: suite });
  if (result.issues.length) {
    for (const item of result.issues) {
      issues.push(routingPolicyPilotIssue('routing-policy-pilot-suite-invalid', item.message));
    }
    return emptyPilotSuite();
  }
  return result.receipt.source_suite;
}

function sourcePolicyFromReceipt(policy) {
  return {
    receipt_path: stringValue(policy.receipt_path),
    schema_version: stringValue(policy.schema_version),
    generated_at: stringValue(policy.generated_at),
    source: stringValue(policy.source),
    goal_id: stringValue(policy.goal_id),
    run_id: stringValue(policy.run_id),
    workflow: stringValue(policy.workflow),
    policy_task: stringValue(policy.policy_task),
    source_suite_receipt: stringValue(policy.source_suite?.receipt_path),
    source_suite_run_id: stringValue(policy.source_suite?.run_id),
    totals: policyTotals(policy.totals),
    policy: policyState(policy.policy),
    rules: policyRules(policy.rules),
  };
}

function sourcePolicyFromSummary(summary, issues) {
  const normalized = {
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    policy_task: stringValue(summary.policy_task),
    source_suite_receipt: stringValue(summary.source_suite_receipt),
    source_suite_run_id: stringValue(summary.source_suite_run_id),
    totals: policyTotals(summary.totals),
    policy: policyState(summary.policy),
    rules: policyRules(summary.rules),
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'policy_task']) {
    if (!normalized[field]) issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', `source_policy.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-policy.v1') {
    issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', 'source_policy.schema_version must be aipedia.agent-routing-policy.v1.'));
  }
  if (!['blocked', 'conditional-by-task-class', 'single-default-candidate'].includes(normalized.policy.status)) {
    issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', 'source_policy.policy.status is invalid.'));
  }
  const duplicateTaskClasses = duplicates(normalized.rules.map((rule) => rule.task_class).filter(Boolean));
  for (const taskClass of duplicateTaskClasses) {
    issues.push(routingPolicyPilotIssue('routing-policy-pilot-source-policy-invalid', `source_policy.rules has duplicate task_class ${taskClass}.`));
  }
  return normalized;
}

function policyTotals(totals) {
  return {
    scenario_count: nonNegativeInteger(totals?.scenario_count),
    rule_count: nonNegativeInteger(totals?.rule_count),
    conditional_rule_count: nonNegativeInteger(totals?.conditional_rule_count),
    blocked_scenario_count: nonNegativeInteger(totals?.blocked_scenario_count),
    telemetry_ref_count: nonNegativeInteger(totals?.telemetry_ref_count),
  };
}

function policyState(policy) {
  return {
    status: stringValue(policy?.status),
    default_candidate_id: stringValue(policy?.default_candidate_id),
    conditional_routing_required: policy?.conditional_routing_required === true,
    promotion_allowed: policy?.promotion_allowed === true,
    reason: stringValue(policy?.reason),
  };
}

function policyRules(rules) {
  if (!Array.isArray(rules)) return [];
  return rules
    .map((rule) => ({
      id: stringValue(rule.id),
      task_class: stringValue(rule.task_class),
      task_label: stringValue(rule.task_label),
      route_candidate_id: stringValue(rule.route_candidate_id),
      improvement_margin: numberValue(rule.improvement_margin),
      exact_model_token_delta: numberValue(rule.exact_model_token_delta),
      wall_duration_delta_ms: numberValue(rule.wall_duration_delta_ms),
      correction_telemetry_refs: telemetryRefs(rule.correction_telemetry_refs),
    }))
    .filter((rule) => rule.task_class || rule.route_candidate_id)
    .sort((left, right) => left.task_class.localeCompare(right.task_class) || left.id.localeCompare(right.id));
}

function pilotScenarios(sourcePolicy, pilotSuite) {
  const ruleByTaskClass = new Map(sourcePolicy.rules.map((rule) => [rule.task_class, rule]));
  const defaultCandidate = sourcePolicy.policy.default_candidate_id;
  return pilotSuite.scenarios
    .map((scenario) => {
      const rule = ruleByTaskClass.get(scenario.task_class) || null;
      const expectedCandidate = rule?.route_candidate_id || defaultCandidate;
      const matchStatus = scenarioMatchStatus(scenario, expectedCandidate, rule, sourcePolicy);
      return {
        id: scenario.id,
        task_class: scenario.task_class,
        task_label: scenario.task_label,
        expected_candidate_id: expectedCandidate,
        expected_source: rule ? 'task-class-rule' : defaultCandidate ? 'default-candidate' : 'missing-rule',
        actual_recommended_candidate_id: scenario.recommended_candidate_id,
        recommendation_status: scenario.recommendation_status,
        match_status: matchStatus,
        improvement_margin: scenario.improvement_margin,
        exact_model_token_delta: scenario.exact_model_token_delta,
        wall_duration_delta_ms: scenario.wall_duration_delta_ms,
        correction_telemetry_refs: telemetryRefs(scenario.correction_telemetry_refs),
      };
    })
    .sort((left, right) => left.task_class.localeCompare(right.task_class) || left.id.localeCompare(right.id));
}

function scenarioMatchStatus(scenario, expectedCandidate, rule, sourcePolicy) {
  if (scenario.recommendation_status === 'blocked') return 'blocked';
  if (sourcePolicy.policy.status === 'blocked') return 'policy-blocked';
  if (!expectedCandidate) return 'missing-rule';
  if (!rule && sourcePolicy.policy.status === 'conditional-by-task-class') return 'missing-rule';
  if (scenario.recommendation_status !== 'recommend') return 'not-recommended';
  return scenario.recommended_candidate_id === expectedCandidate ? 'matched' : 'mismatched';
}

function pilotTotals(sourcePolicy, pilotSuite, scenarios) {
  const policyTaskClasses = new Set(sourcePolicy.rules.map((rule) => rule.task_class).filter(Boolean));
  const coveredTaskClasses = new Set(scenarios.filter((scenario) => scenario.expected_source === 'task-class-rule').map((scenario) => scenario.task_class));
  const uncoveredTaskClasses = [...policyTaskClasses].filter((taskClass) => !coveredTaskClasses.has(taskClass)).sort();
  return {
    policy_rule_count: sourcePolicy.rules.length,
    pilot_scenario_count: scenarios.length,
    evaluated_scenario_count: scenarios.filter((scenario) => scenario.recommendation_status === 'recommend').length,
    matched_rule_count: scenarios.filter((scenario) => scenario.match_status === 'matched').length,
    mismatched_rule_count: scenarios.filter((scenario) => scenario.match_status === 'mismatched').length,
    missing_rule_count: scenarios.filter((scenario) => scenario.match_status === 'missing-rule').length,
    blocked_scenario_count: scenarios.filter((scenario) => scenario.match_status === 'blocked' || scenario.match_status === 'policy-blocked').length,
    not_recommended_scenario_count: scenarios.filter((scenario) => scenario.match_status === 'not-recommended').length,
    telemetry_backed_scenario_count: pilotSuite.totals.telemetry_backed_scenario_count,
    telemetry_ref_count: pilotSuite.correction_telemetry_refs.length,
    covered_policy_rule_count: coveredTaskClasses.size,
    uncovered_policy_rule_count: uncoveredTaskClasses.length,
    same_source_replay: samePolicySourceReplay(sourcePolicy, pilotSuite),
    match_rate: scenarios.length ? round(scenarios.filter((scenario) => scenario.match_status === 'matched').length / scenarios.length) : 0,
    uncovered_task_classes: uncoveredTaskClasses,
  };
}

function policyFitSummary(sourcePolicy, pilotSuite, totals) {
  const status = policyFitStatus(sourcePolicy, totals);
  return {
    status,
    promotion_candidate: status === 'pass' && pilotSuite.aggregate.telemetry_coverage_rate === 1,
    same_source_replay: totals.same_source_replay,
    match_rate: totals.match_rate,
    reason: policyFitReason(status, totals),
  };
}

function policyFitStatus(sourcePolicy, totals) {
  if (sourcePolicy.policy.status === 'blocked' || totals.blocked_scenario_count > 0) return 'blocked';
  if (totals.mismatched_rule_count > 0 || totals.missing_rule_count > 0 || totals.not_recommended_scenario_count > 0 || totals.uncovered_policy_rule_count > 0) return 'attention';
  if (totals.same_source_replay) return 'replay-only';
  return 'pass';
}

function policyFitReason(status, totals) {
  if (status === 'blocked') return 'Policy or pilot suite has blocked scenarios.';
  if (status === 'attention') return 'Pilot suite has mismatched, missing, not-recommended, or uncovered policy rules.';
  if (status === 'replay-only') return 'Pilot suite matches the policy but reuses the source suite evidence, so it is not an independent workload pilot.';
  return 'Pilot suite independently matches the policy rules.';
}

function pilotGuardrails(sourcePolicy, pilotSuite, totals, policyFit) {
  const guardrails = [];
  if (policyFit.same_source_replay) guardrails.push('Do not treat source-suite replay as an independent workload pilot.');
  if (totals.uncovered_policy_rule_count > 0) guardrails.push('Cover every policy task-class rule before promoting orchestration defaults.');
  if (totals.mismatched_rule_count > 0 || totals.missing_rule_count > 0) guardrails.push('Do not promote a policy with missing or mismatched pilot rules.');
  if (pilotSuite.aggregate.telemetry_coverage_rate < 1) guardrails.push('Collect correction telemetry for every pilot scenario before promotion.');
  if (!sourcePolicy.policy.promotion_allowed) guardrails.push('The source policy itself is not promotion-eligible.');
  guardrails.push('Require exact model-token, correction, quality, accuracy, and wall-time receipts for every pilot suite.');
  return guardrails;
}

function pilotNextActions(policyFit, totals) {
  if (policyFit.status === 'replay-only') return ['Run the policy against an independent bounded workload suite before changing orchestration defaults.'];
  if (policyFit.status === 'blocked') return ['Resolve blocked pilot scenarios, then regenerate the suite and pilot receipts.'];
  if (policyFit.status === 'attention') return ['Review mismatched, missing, not-recommended, or uncovered policy rules before changing orchestration defaults.'];
  if (totals.same_source_replay) return ['Run an independent pilot suite before promotion.'];
  return ['Require one reviewer pass before applying the policy to default orchestration.'];
}

function samePolicySourceReplay(sourcePolicy, pilotSuite) {
  if (sourcePolicy.source_suite_receipt && pilotSuite.receipt_path && sourcePolicy.source_suite_receipt === pilotSuite.receipt_path) return true;
  if (sourcePolicy.source_suite_run_id && pilotSuite.run_id && sourcePolicy.source_suite_run_id === pilotSuite.run_id) return true;
  return false;
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

function emptySourcePolicy() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    policy_task: '',
    source_suite_receipt: '',
    source_suite_run_id: '',
    totals: policyTotals({}),
    policy: policyState({}),
    rules: [],
  };
}

function emptyPilotSuite() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    suite_task: '',
    totals: {
      scenario_count: 0,
      recommendation_count: 0,
      monitor_count: 0,
      blocked_count: 0,
      telemetry_backed_scenario_count: 0,
    },
    aggregate: {
      recommended_candidate_counts: {},
      dominant_recommended_candidate_id: '',
      dominant_recommended_candidate_count: 0,
      all_recommended_same_candidate: false,
      average_improvement_margin: 0,
      total_exact_model_token_delta: 0,
      total_wall_duration_delta_ms: 0,
      telemetry_coverage_rate: 0,
    },
    correction_telemetry_refs: [],
    scenarios: [],
  };
}

function isRoutingPolicyReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-policy' && typeof value.schema_version === 'string';
}

function isRoutingSuiteReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-evaluation-suite' && typeof value.schema_version === 'string';
}

function duplicates(values) {
  const seen = new Set();
  const duplicateValues = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value);
    seen.add(value);
  }
  return [...duplicateValues].sort();
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

function round(value) {
  return Number.isFinite(value) ? Math.round(value * 1000) / 1000 : 0;
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
