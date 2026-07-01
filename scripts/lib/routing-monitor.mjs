import { validateRoutingEvaluationSuiteReceipt } from './routing-evaluation-suite.mjs';
import { ROUTING_ROLLOUT_DEFAULT_THRESHOLDS, validateRoutingRolloutReceipt } from './routing-rollout.mjs';

export const ROUTING_MONITOR_SCHEMA_VERSION = 'aipedia.agent-routing-monitor.v1';

export function buildRoutingMonitor(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingMonitorIssue('routing-monitor-input-invalid', 'Input must be an object.')],
    };
  }

  const sourceRollout = normalizeSourceRollout(input, issues);
  const monitoringSuite = normalizeMonitoringSuite(input, issues);
  const thresholds = normalizeThresholds(input.thresholds, issues);
  const rollbackPlan = normalizeRollbackPlan(input.rollback_plan || input.rollback || {}, issues);
  if (issues.length) return { receipt: null, issues };

  const scenarios = monitoringSuite.scenarios.map((scenario) => monitoringScenario(scenario, thresholds));
  const totals = monitoringTotals(scenarios);
  const monitoringEvaluation = monitoringEvaluationSummary(sourceRollout, monitoringSuite, thresholds, totals, scenarios, rollbackPlan);
  const guardrails = monitoringGuardrails(sourceRollout, monitoringSuite, monitoringEvaluation, scenarios, rollbackPlan);
  const nextActions = monitoringNextActions(monitoringEvaluation);
  const source = options.source || input.source || [
    sourceRollout.receipt_path,
    monitoringSuite.receipt_path,
  ].filter(Boolean).join(' + ');

  return {
    receipt: {
      ok: monitoringEvaluation.monitoring_healthy,
      mode: 'agent-routing-monitor',
      schema_version: ROUTING_MONITOR_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source,
      goal_id: stringValue(input.goal_id) || sourceRollout.goal_id || monitoringSuite.goal_id,
      run_id: stringValue(input.run_id) || `${sourceRollout.run_id}:monitor:${monitoringSuite.run_id}`,
      workflow: stringValue(input.workflow) || sourceRollout.workflow || monitoringSuite.workflow,
      monitor_task: stringValue(input.monitor_task || input.task) || `Post-default monitoring for ${sourceRollout.run_id}`,
      source_rollout: sourceRollout,
      thresholds,
      monitoring_suite: monitoringSuite,
      totals,
      scenarios,
      rollback_plan: rollbackPlan,
      monitoring_evaluation: monitoringEvaluation,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingMonitorReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingMonitorIssue('routing-monitor-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-monitor'],
    ['schema_version', ROUTING_MONITOR_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingMonitorIssue('routing-monitor-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'monitor_task']) {
    if (typeof value[field] !== 'string') issues.push(routingMonitorIssue('routing-monitor-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'monitor_task']) {
    if (!stringValue(value[field])) issues.push(routingMonitorIssue('routing-monitor-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingMonitorIssue('routing-monitor-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.source_rollout)) issues.push(routingMonitorIssue('routing-monitor-source-rollout-invalid', 'source_rollout must be an object.'));
  if (!isObject(value.thresholds)) issues.push(routingMonitorIssue('routing-monitor-threshold-invalid', 'thresholds must be an object.'));
  if (!isObject(value.monitoring_suite)) issues.push(routingMonitorIssue('routing-monitor-suite-invalid', 'monitoring_suite must be an object.'));
  if (!isObject(value.totals)) issues.push(routingMonitorIssue('routing-monitor-total-mismatch', 'totals must be an object.'));
  if (!Array.isArray(value.scenarios)) issues.push(routingMonitorIssue('routing-monitor-scenarios-invalid', 'scenarios must be an array.'));
  if (!isObject(value.rollback_plan)) issues.push(routingMonitorIssue('routing-monitor-rollback-plan-invalid', 'rollback_plan must be an object.'));
  if (!isObject(value.monitoring_evaluation)) issues.push(routingMonitorIssue('routing-monitor-evaluation-mismatch', 'monitoring_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingMonitorIssue('routing-monitor-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingMonitorIssue('routing-monitor-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingMonitor({
    source_rollout: value.source_rollout,
    thresholds: value.thresholds,
    monitoring_suite: value.monitoring_suite,
    rollback_plan: value.rollback_plan,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    monitor_task: value.monitor_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['source_rollout', 'thresholds', 'monitoring_suite', 'totals', 'scenarios', 'rollback_plan', 'monitoring_evaluation', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingMonitorIssue('routing-monitor-mismatch', `${field} must match canonical routing monitor computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingMonitorIssue('routing-monitor-mismatch', 'ok must match canonical routing monitor computation.'));
  }
  return issues;
}

export function routingMonitorIssue(code, message) {
  return { code, message };
}

function normalizeSourceRollout(input, issues) {
  const rollout = input.default_rollout || input.source_rollout || input.rollout_receipt || input.rollout || (isRoutingRolloutReceipt(input) ? input : null);
  if (rollout) {
    if (isRoutingRolloutReceipt(rollout)) {
      const receiptIssues = validateRoutingRolloutReceipt(rollout);
      for (const item of receiptIssues) {
        issues.push(routingMonitorIssue('routing-monitor-source-rollout-invalid', item.message));
      }
      return receiptIssues.length ? emptySourceRollout() : sourceRolloutFromReceipt(rollout);
    }
    if (isObject(rollout)) return sourceRolloutFromSummary(rollout, issues);
  }
  issues.push(routingMonitorIssue('routing-monitor-source-rollout-invalid', 'A default-ready routing rollout receipt or source_rollout summary is required.'));
  return emptySourceRollout();
}

function sourceRolloutFromReceipt(receipt) {
  return {
    receipt_path: stringValue(receipt.receipt_path),
    schema_version: stringValue(receipt.schema_version),
    generated_at: stringValue(receipt.generated_at),
    source: stringValue(receipt.source),
    goal_id: stringValue(receipt.goal_id),
    run_id: stringValue(receipt.run_id),
    workflow: stringValue(receipt.workflow),
    rollout_task: stringValue(receipt.rollout_task),
    source_review_receipt: stringValue(receipt.source_review?.receipt_path),
    source_review_run_id: stringValue(receipt.source_review?.run_id),
    rollout_suite_receipt: stringValue(receipt.rollout_suite?.receipt_path),
    rollout_suite_run_id: stringValue(receipt.rollout_suite?.run_id),
    post_canary_receipt: stringValue(receipt.post_canary?.receipt_path),
    post_canary_run_id: stringValue(receipt.post_canary?.run_id),
    rollout: rolloutConfigSummary(receipt.rollout),
    rollout_evaluation: sourceRolloutEvaluationSummary(receipt.rollout_evaluation),
    totals: rolloutTotalsSummary(receipt.totals),
  };
}

function sourceRolloutFromSummary(summary, issues) {
  const normalized = {
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    rollout_task: stringValue(summary.rollout_task),
    source_review_receipt: stringValue(summary.source_review_receipt),
    source_review_run_id: stringValue(summary.source_review_run_id),
    rollout_suite_receipt: stringValue(summary.rollout_suite_receipt),
    rollout_suite_run_id: stringValue(summary.rollout_suite_run_id),
    post_canary_receipt: stringValue(summary.post_canary_receipt),
    post_canary_run_id: stringValue(summary.post_canary_run_id),
    rollout: rolloutConfigSummary(summary.rollout),
    rollout_evaluation: sourceRolloutEvaluationSummary(summary.rollout_evaluation),
    totals: rolloutTotalsSummary(summary.totals),
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'rollout_task']) {
    if (!normalized[field]) issues.push(routingMonitorIssue('routing-monitor-source-rollout-invalid', `source_rollout.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-rollout.v1') {
    issues.push(routingMonitorIssue('routing-monitor-source-rollout-invalid', 'source_rollout.schema_version must be aipedia.agent-routing-rollout.v1.'));
  }
  return normalized;
}

function normalizeMonitoringSuite(input, issues) {
  const suite = input.monitoring_suite || input.monitoring_suite_receipt || input.suite || (isRoutingSuiteReceipt(input) ? input : null);
  if (suite) {
    if (isRoutingSuiteReceipt(suite)) {
      const suiteIssues = validateRoutingEvaluationSuiteReceipt(suite);
      for (const item of suiteIssues) {
        issues.push(routingMonitorIssue('routing-monitor-suite-invalid', item.message));
      }
      return suiteIssues.length ? emptyMonitoringSuite() : monitoringSuiteFromReceipt(suite);
    }
    if (isObject(suite)) return monitoringSuiteFromSummary(suite, issues);
  }
  issues.push(routingMonitorIssue('routing-monitor-suite-invalid', 'A routing evaluation suite receipt or monitoring_suite summary is required.'));
  return emptyMonitoringSuite();
}

function monitoringSuiteFromReceipt(suite) {
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
    correction_telemetry_refs: suiteTelemetryRefs(suite.correction_telemetry_refs),
    scenarios: Array.isArray(suite.scenarios) ? suite.scenarios.map(scenarioSummaryFromSuite) : [],
  };
}

function monitoringSuiteFromSummary(summary, issues) {
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
    correction_telemetry_refs: suiteTelemetryRefs(summary.correction_telemetry_refs),
    scenarios: Array.isArray(summary.scenarios) ? summary.scenarios.map(scenarioSummaryFromSummary) : [],
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'suite_task']) {
    if (!normalized[field]) issues.push(routingMonitorIssue('routing-monitor-suite-invalid', `monitoring_suite.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-evaluation-suite.v2') {
    issues.push(routingMonitorIssue('routing-monitor-suite-invalid', 'monitoring_suite.schema_version must be aipedia.agent-routing-evaluation-suite.v2.'));
  }
  if (normalized.scenarios.length === 0) issues.push(routingMonitorIssue('routing-monitor-suite-invalid', 'monitoring_suite.scenarios must not be empty.'));
  return normalized;
}

function normalizeThresholds(value, issues) {
  const thresholds = { ...ROUTING_ROLLOUT_DEFAULT_THRESHOLDS };
  if (value == null) return thresholds;
  if (!isObject(value)) {
    issues.push(routingMonitorIssue('routing-monitor-threshold-invalid', 'thresholds must be an object when supplied.'));
    return thresholds;
  }
  for (const field of ['min_quality_score', 'min_accuracy_score', 'minimum_improvement_margin', 'min_telemetry_coverage_rate']) {
    if (value[field] == null) continue;
    if (!isRatio(value[field])) {
      issues.push(routingMonitorIssue('routing-monitor-threshold-invalid', `thresholds.${field} must be between 0 and 1.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  for (const field of ['max_residual_issue_count', 'max_regression_count']) {
    if (value[field] == null) continue;
    if (!Number.isInteger(value[field]) || value[field] < 0) {
      issues.push(routingMonitorIssue('routing-monitor-threshold-invalid', `thresholds.${field} must be a non-negative integer.`));
      continue;
    }
    thresholds[field] = value[field];
  }
  return thresholds;
}

function normalizeRollbackPlan(value, issues) {
  if (!isObject(value)) {
    issues.push(routingMonitorIssue('routing-monitor-rollback-plan-invalid', 'rollback_plan must be an object when supplied.'));
    value = {};
  }
  const plan = {
    available: false,
    owner: stringValue(value.owner),
    rollback_command: stringValue(value.rollback_command || value.command),
    verification_command: stringValue(value.verification_command || value.verify_command),
    communication_channel: stringValue(value.communication_channel),
    trigger: stringValue(value.trigger) || 'Any failed post-default monitoring gate or missing evidence requires rollback before further promotion.',
  };
  plan.available = Boolean(plan.rollback_command && plan.verification_command);
  return plan;
}

function monitoringScenario(scenario, thresholds) {
  const winner = scenario.winner;
  const checks = {
    recommended: scenario.recommendation_status === 'recommend',
    exact_tokens_present: winner.exact_model_total_tokens > 0 && winner.exact_model_request_count > 0,
    correction_telemetry_present: scenario.correction_telemetry_refs.length > 0 && winner.correction_outcomes_source === 'correction-telemetry',
    quality_passed: winner.quality_score >= thresholds.min_quality_score,
    accuracy_passed: winner.accuracy_score >= thresholds.min_accuracy_score,
    correction_passed: winner.correction_outcomes.residual_issue_count <= thresholds.max_residual_issue_count
      && winner.correction_outcomes.regression_count <= thresholds.max_regression_count,
    wall_time_present: winner.wall_duration_ms > 0,
    improvement_passed: scenario.improvement_margin >= thresholds.minimum_improvement_margin,
  };
  const passed = Object.values(checks).every(Boolean);
  return {
    id: scenario.id,
    task_class: scenario.task_class,
    task_label: scenario.task_label,
    recommendation_status: scenario.recommendation_status,
    recommended_candidate_id: scenario.recommended_candidate_id,
    improvement_margin: scenario.improvement_margin,
    exact_model_token_delta: scenario.exact_model_token_delta,
    wall_duration_delta_ms: scenario.wall_duration_delta_ms,
    correction_telemetry_refs: scenario.correction_telemetry_refs,
    winner,
    checks,
    passed,
    failure_reasons: scenarioFailureReasons(checks),
  };
}

function monitoringTotals(scenarios) {
  const qualityScores = scenarios.map((scenario) => scenario.winner.quality_score).filter((value) => value > 0);
  const accuracyScores = scenarios.map((scenario) => scenario.winner.accuracy_score).filter((value) => value > 0);
  return {
    scenario_count: scenarios.length,
    recommended_scenario_count: scenarios.filter((scenario) => scenario.recommendation_status === 'recommend').length,
    passing_scenario_count: scenarios.filter((scenario) => scenario.passed).length,
    failing_scenario_count: scenarios.filter((scenario) => !scenario.passed).length,
    telemetry_backed_scenario_count: scenarios.filter((scenario) => scenario.checks.correction_telemetry_present).length,
    exact_token_scenario_count: scenarios.filter((scenario) => scenario.checks.exact_tokens_present).length,
    total_exact_model_token_delta: scenarios.reduce((sum, scenario) => sum + scenario.exact_model_token_delta, 0),
    total_wall_duration_delta_ms: scenarios.reduce((sum, scenario) => sum + scenario.wall_duration_delta_ms, 0),
    min_quality_score: qualityScores.length ? Math.min(...qualityScores) : 0,
    min_accuracy_score: accuracyScores.length ? Math.min(...accuracyScores) : 0,
    max_residual_issue_count: scenarios.reduce((max, scenario) => Math.max(max, scenario.winner.correction_outcomes.residual_issue_count), 0),
    max_regression_count: scenarios.reduce((max, scenario) => Math.max(max, scenario.winner.correction_outcomes.regression_count), 0),
  };
}

function monitoringEvaluationSummary(sourceRollout, monitoringSuite, thresholds, totals, scenarios, rollbackPlan) {
  const sourceDefaultReady = sourceRolloutReadyForMonitoring(sourceRollout);
  const freshMonitoringSuite = !sameLineage(
    monitoringSuite.receipt_path,
    monitoringSuite.run_id,
    sourceRollout.rollout_suite_receipt,
    sourceRollout.rollout_suite_run_id,
  );
  const scenarioCoverageRequired = Math.max(1, sourceRollout.totals.scenario_count);
  const scenarioCoveragePassed = totals.scenario_count >= scenarioCoverageRequired;
  const telemetryCoverageRate = totals.scenario_count ? round(totals.telemetry_backed_scenario_count / totals.scenario_count) : 0;
  const metricsReady = totals.failing_scenario_count === 0
    && totals.scenario_count > 0
    && totals.exact_token_scenario_count === totals.scenario_count
    && telemetryCoverageRate >= thresholds.min_telemetry_coverage_rate
    && scenarioCoveragePassed;
  const rollbackPlanReady = rollbackPlan.available === true;
  const monitoringHealthy = sourceDefaultReady && freshMonitoringSuite && metricsReady && rollbackPlanReady;
  return {
    status: monitoringHealthy ? 'monitoring-healthy' : 'rollback-required',
    monitoring_healthy: monitoringHealthy,
    rollback_required: !monitoringHealthy,
    source_default_ready: sourceDefaultReady,
    fresh_monitoring_suite: freshMonitoringSuite,
    metrics_ready: metricsReady,
    rollback_plan_ready: rollbackPlanReady,
    scenario_coverage_required: scenarioCoverageRequired,
    scenario_coverage_passed: scenarioCoveragePassed,
    telemetry_coverage_rate: telemetryCoverageRate,
    reason: monitoringReason({ monitoringHealthy, sourceDefaultReady, freshMonitoringSuite, metricsReady, rollbackPlanReady, scenarioCoveragePassed }),
    failing_scenario_ids: scenarios.filter((scenario) => !scenario.passed).map((scenario) => scenario.id).sort(),
  };
}

function sourceRolloutReadyForMonitoring(sourceRollout) {
  return sourceRollout.rollout.stage === 'default-enabled'
    && sourceRollout.rollout.traffic_percent === 100
    && sourceRollout.rollout_evaluation.status === 'default-ready'
    && sourceRollout.rollout_evaluation.guard_passed === true
    && sourceRollout.rollout_evaluation.default_change_allowed === true
    && sourceRollout.rollout_evaluation.post_canary_ready === true;
}

function monitoringReason({ monitoringHealthy, sourceDefaultReady, freshMonitoringSuite, metricsReady, rollbackPlanReady, scenarioCoveragePassed }) {
  if (monitoringHealthy) return 'Default routing remains healthy under fresh post-default monitoring, with rollback instructions recorded.';
  if (!sourceDefaultReady) return 'The source rollout is not a default-ready routing rollout with post-canary evidence.';
  if (!freshMonitoringSuite) return 'The monitoring suite must be fresh and separate from the default rollout suite.';
  if (!scenarioCoveragePassed) return 'The monitoring suite does not cover enough post-default scenarios.';
  if (!metricsReady) return 'One or more post-default monitoring scenarios failed exact token, correction, quality, accuracy, wall-time, or telemetry gates.';
  if (!rollbackPlanReady) return 'A rollback command and verification command are required before treating post-default monitoring as safe.';
  return 'Post-default monitoring did not pass.';
}

function monitoringGuardrails(sourceRollout, monitoringSuite, monitoringEvaluation, scenarios, rollbackPlan) {
  const guardrails = [];
  if (!monitoringEvaluation.source_default_ready) guardrails.push('Do not use post-default monitoring unless the source rollout is default-ready with post-canary evidence.');
  if (!monitoringEvaluation.fresh_monitoring_suite) guardrails.push('Do not reuse the default rollout suite as post-default monitoring evidence.');
  if (!monitoringEvaluation.metrics_ready) guardrails.push('Roll back or hold the routing policy until every post-default scenario has exact tokens, correction telemetry, quality, accuracy, and wall-time evidence.');
  if (!monitoringEvaluation.rollback_plan_ready) guardrails.push('Record a rollback command and verification command before marking post-default routing as healthy.');
  if (!monitoringEvaluation.scenario_coverage_passed) guardrails.push('Do not treat post-default routing as healthy until monitoring covers at least the default rollout scenario count.');
  for (const scenario of scenarios.filter((row) => !row.passed)) {
    guardrails.push(`Scenario ${scenario.id} failed post-default checks: ${scenario.failure_reasons.join(', ')}.`);
  }
  if (monitoringEvaluation.rollback_required && rollbackPlan.available) {
    guardrails.push(`Rollback available via: ${rollbackPlan.rollback_command}`);
  }
  guardrails.push('Re-run post-default monitoring after model, prompt, routing policy, tool, or workflow changes.');
  if (sourceRollout.rollout_suite_receipt && monitoringSuite.receipt_path && sourceRollout.rollout_suite_receipt !== monitoringSuite.receipt_path) {
    guardrails.push('Preserve the default rollout suite and post-default monitoring suite as separate evidence layers.');
  }
  return guardrails;
}

function monitoringNextActions(monitoringEvaluation) {
  if (monitoringEvaluation.monitoring_healthy) {
    return ['Keep collecting post-default monitoring receipts and preserve the rollback plan with every default routing change.'];
  }
  if (!monitoringEvaluation.rollback_plan_ready) {
    return ['Add rollback and verification commands, then rerun post-default monitoring before claiming the routing policy is safely deployed.'];
  }
  return ['Execute or prepare the recorded rollback, collect fresh monitoring metrics, and regenerate this receipt before further default routing changes.'];
}

function scenarioFailureReasons(checks) {
  return Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .sort();
}

function rolloutConfigSummary(value) {
  return {
    stage: stringValue(value?.stage),
    traffic_percent: numberValue(value?.traffic_percent),
    policy_change_id: stringValue(value?.policy_change_id),
    operator: stringValue(value?.operator),
  };
}

function sourceRolloutEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    guard_passed: value?.guard_passed === true,
    guarded_rollout_allowed: value?.guarded_rollout_allowed === true,
    default_change_allowed: value?.default_change_allowed === true,
    review_ready: value?.review_ready === true,
    fresh_rollout_suite: value?.fresh_rollout_suite === true,
    metrics_ready: value?.metrics_ready === true,
    post_canary_required: value?.post_canary_required === true,
    post_canary_ready: value?.post_canary_ready === true,
    post_canary_present: value?.post_canary_present === true,
    post_canary_stage_ready: value?.post_canary_stage_ready === true,
    post_canary_review_lineage_match: value?.post_canary_review_lineage_match === true,
    post_canary_default_suite_fresh: value?.post_canary_default_suite_fresh === true,
    post_canary_metrics_ready: value?.post_canary_metrics_ready === true,
    telemetry_coverage_rate: numberValue(value?.telemetry_coverage_rate),
  };
}

function rolloutTotalsSummary(value) {
  return {
    scenario_count: nonNegativeInteger(value?.scenario_count),
    recommended_scenario_count: nonNegativeInteger(value?.recommended_scenario_count),
    passing_scenario_count: nonNegativeInteger(value?.passing_scenario_count),
    failing_scenario_count: nonNegativeInteger(value?.failing_scenario_count),
    telemetry_backed_scenario_count: nonNegativeInteger(value?.telemetry_backed_scenario_count),
    exact_token_scenario_count: nonNegativeInteger(value?.exact_token_scenario_count),
    total_exact_model_token_delta: numberValue(value?.total_exact_model_token_delta),
    total_wall_duration_delta_ms: numberValue(value?.total_wall_duration_delta_ms),
    min_quality_score: numberValue(value?.min_quality_score),
    min_accuracy_score: numberValue(value?.min_accuracy_score),
    max_residual_issue_count: nonNegativeInteger(value?.max_residual_issue_count),
    max_regression_count: nonNegativeInteger(value?.max_regression_count),
  };
}

function suiteTotals(value) {
  return {
    scenario_count: nonNegativeInteger(value?.scenario_count),
    recommendation_count: nonNegativeInteger(value?.recommendation_count),
    monitor_count: nonNegativeInteger(value?.monitor_count),
    blocked_count: nonNegativeInteger(value?.blocked_count),
    telemetry_backed_scenario_count: nonNegativeInteger(value?.telemetry_backed_scenario_count),
  };
}

function suiteAggregate(value) {
  return {
    dominant_recommended_candidate_id: stringValue(value?.dominant_recommended_candidate_id),
    all_recommended_same_candidate: value?.all_recommended_same_candidate === true,
    average_improvement_margin: numberValue(value?.average_improvement_margin),
    total_exact_model_token_delta: numberValue(value?.total_exact_model_token_delta),
    total_wall_duration_delta_ms: numberValue(value?.total_wall_duration_delta_ms),
    telemetry_coverage_rate: numberValue(value?.telemetry_coverage_rate),
  };
}

function scenarioSummaryFromSuite(scenario) {
  const evaluation = scenario.routing_evaluation;
  const winnerId = stringValue(scenario.recommended_candidate_id) || stringValue(scenario.winner_id);
  const winner = Array.isArray(evaluation?.candidates) ? evaluation.candidates.find((candidate) => candidate.id === winnerId) : null;
  return scenarioSummary({
    id: scenario.id,
    task_class: scenario.task_class,
    task_label: scenario.task_label,
    recommendation_status: scenario.recommendation_status,
    recommended_candidate_id: scenario.recommended_candidate_id,
    improvement_margin: scenario.improvement_margin,
    exact_model_token_delta: scenario.exact_model_token_delta,
    wall_duration_delta_ms: scenario.wall_duration_delta_ms,
    correction_telemetry_refs: scenario.correction_telemetry_refs,
    winner: winnerFromCandidate(winner),
  });
}

function scenarioSummaryFromSummary(scenario) {
  return scenarioSummary({
    ...scenario,
    winner: winnerSummary(scenario?.winner),
  });
}

function scenarioSummary(value) {
  return {
    id: stringValue(value.id),
    task_class: stringValue(value.task_class),
    task_label: stringValue(value.task_label),
    recommendation_status: stringValue(value.recommendation_status),
    recommended_candidate_id: stringValue(value.recommended_candidate_id),
    improvement_margin: numberValue(value.improvement_margin),
    exact_model_token_delta: numberValue(value.exact_model_token_delta),
    wall_duration_delta_ms: numberValue(value.wall_duration_delta_ms),
    correction_telemetry_refs: suiteTelemetryRefs(value.correction_telemetry_refs),
    winner: winnerSummary(value.winner),
  };
}

function winnerFromCandidate(candidate) {
  if (!isObject(candidate)) return winnerSummary({});
  return winnerSummary({
    id: candidate.id,
    exact_model_total_tokens: candidate.exact_model_tokens?.total_tokens,
    exact_model_request_count: candidate.exact_model_tokens?.request_count,
    wall_duration_ms: candidate.wall_duration_ms,
    quality_score: candidate.quality_score,
    accuracy_score: candidate.accuracy_score,
    correction_outcomes_source: candidate.correction_outcomes_source,
    correction_outcomes: candidate.correction_outcomes,
  });
}

function winnerSummary(value) {
  return {
    id: stringValue(value?.id),
    exact_model_total_tokens: nonNegativeInteger(value?.exact_model_total_tokens),
    exact_model_request_count: nonNegativeInteger(value?.exact_model_request_count),
    wall_duration_ms: numberValue(value?.wall_duration_ms),
    quality_score: numberValue(value?.quality_score),
    accuracy_score: numberValue(value?.accuracy_score),
    correction_outcomes_source: stringValue(value?.correction_outcomes_source),
    correction_outcomes: {
      findings_count: nonNegativeInteger(value?.correction_outcomes?.findings_count),
      corrections_applied: nonNegativeInteger(value?.correction_outcomes?.corrections_applied),
      residual_issue_count: nonNegativeInteger(value?.correction_outcomes?.residual_issue_count),
      regression_count: nonNegativeInteger(value?.correction_outcomes?.regression_count),
    },
  };
}

function suiteTelemetryRefs(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((ref) => ({
      receipt_path: stringValue(ref?.receipt_path),
      schema_version: stringValue(ref?.schema_version),
      scenario_ids: stringArray(ref?.scenario_ids),
      candidate_ids: stringArray(ref?.candidate_ids),
    }))
    .filter((ref) => ref.receipt_path)
    .sort((left, right) => left.receipt_path.localeCompare(right.receipt_path));
}

function sameLineage(leftReceipt, leftRunId, rightReceipt, rightRunId) {
  const left = stringValue(leftReceipt) || stringValue(leftRunId);
  const right = stringValue(rightReceipt) || stringValue(rightRunId);
  return Boolean(left && right && left === right);
}

function emptySourceRollout() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    rollout_task: '',
    source_review_receipt: '',
    source_review_run_id: '',
    rollout_suite_receipt: '',
    rollout_suite_run_id: '',
    post_canary_receipt: '',
    post_canary_run_id: '',
    rollout: rolloutConfigSummary({}),
    rollout_evaluation: sourceRolloutEvaluationSummary({}),
    totals: rolloutTotalsSummary({}),
  };
}

function emptyMonitoringSuite() {
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

function isRoutingRolloutReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-rollout' && typeof value.schema_version === 'string';
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

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(stringValue).filter(Boolean))].sort();
}

function numberValue(value) {
  return typeof value === 'number' && Number.isFinite(value) ? round(value) : 0;
}

function nonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function isRatio(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

function round(value) {
  return Math.round(value * 1000) / 1000;
}

function deepEqual(left, right) {
  return JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (!isObject(value)) return value;
  return Object.fromEntries(Object.entries(value).sort(([left], [right]) => left.localeCompare(right)).map(([key, item]) => [key, canonicalize(item)]));
}
