import { validateRoutingMonitorReceipt } from './routing-monitor.mjs';
import { validateRoutingRolloutReceipt } from './routing-rollout.mjs';

export const ROUTING_HANDOFF_SCHEMA_VERSION = 'aipedia.agent-routing-handoff.v1';

const CHANGE_MODES = new Set(['record-only', 'runtime']);

export function buildRoutingHandoff(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingHandoffIssue('routing-handoff-input-invalid', 'Input must be an object.')],
    };
  }

  const defaultRollout = normalizeDefaultRollout(input, issues);
  const monitor = normalizeMonitor(input, issues);
  const changePlan = normalizeChangePlan(input, defaultRollout, issues);
  if (issues.length) return { receipt: null, issues };

  const handoffEvaluation = handoffEvaluationSummary(defaultRollout, monitor, changePlan);
  const guardrails = handoffGuardrails(handoffEvaluation);
  const nextActions = handoffNextActions(handoffEvaluation);
  const source = options.source || input.source || [
    defaultRollout.receipt_path,
    monitor.receipt_path,
  ].filter(Boolean).join(' + ');

  return {
    receipt: {
      ok: handoffEvaluation.handoff_ready,
      mode: 'agent-routing-handoff',
      schema_version: ROUTING_HANDOFF_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source,
      goal_id: stringValue(input.goal_id) || defaultRollout.goal_id || monitor.goal_id,
      run_id: stringValue(input.run_id) || `${defaultRollout.run_id}:handoff:${monitor.run_id}`,
      workflow: stringValue(input.workflow) || defaultRollout.workflow || monitor.workflow,
      handoff_task: stringValue(input.handoff_task || input.task) || `Default routing handoff for ${defaultRollout.run_id}`,
      default_rollout: defaultRollout,
      monitor,
      change_plan: changePlan,
      handoff_evaluation: handoffEvaluation,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingHandoffReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingHandoffIssue('routing-handoff-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-handoff'],
    ['schema_version', ROUTING_HANDOFF_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingHandoffIssue('routing-handoff-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'handoff_task']) {
    if (typeof value[field] !== 'string') issues.push(routingHandoffIssue('routing-handoff-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'handoff_task']) {
    if (!stringValue(value[field])) issues.push(routingHandoffIssue('routing-handoff-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingHandoffIssue('routing-handoff-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.default_rollout)) issues.push(routingHandoffIssue('routing-handoff-default-rollout-invalid', 'default_rollout must be an object.'));
  if (!isObject(value.monitor)) issues.push(routingHandoffIssue('routing-handoff-monitor-invalid', 'monitor must be an object.'));
  if (!isObject(value.change_plan)) issues.push(routingHandoffIssue('routing-handoff-change-plan-invalid', 'change_plan must be an object.'));
  if (!isObject(value.handoff_evaluation)) issues.push(routingHandoffIssue('routing-handoff-evaluation-mismatch', 'handoff_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingHandoffIssue('routing-handoff-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingHandoffIssue('routing-handoff-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingHandoff({
    default_rollout: value.default_rollout,
    monitor: value.monitor,
    change_plan: value.change_plan,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    handoff_task: value.handoff_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['default_rollout', 'monitor', 'change_plan', 'handoff_evaluation', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingHandoffIssue('routing-handoff-mismatch', `${field} must match canonical routing handoff computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingHandoffIssue('routing-handoff-mismatch', 'ok must match canonical routing handoff computation.'));
  }
  return issues;
}

export function routingHandoffIssue(code, message) {
  return { code, message };
}

function normalizeDefaultRollout(input, issues) {
  const rollout = input.default_rollout || input.source_rollout || input.rollout_receipt || input.rollout || (isRoutingRolloutReceipt(input) ? input : null);
  if (rollout) {
    if (isRoutingRolloutReceipt(rollout)) {
      const receiptIssues = validateRoutingRolloutReceipt(rollout);
      for (const item of receiptIssues) {
        issues.push(routingHandoffIssue('routing-handoff-default-rollout-invalid', item.message));
      }
      return receiptIssues.length ? emptyDefaultRollout() : defaultRolloutFromReceipt(rollout);
    }
    if (isObject(rollout)) return defaultRolloutFromSummary(rollout, issues);
  }
  issues.push(routingHandoffIssue('routing-handoff-default-rollout-invalid', 'A default-ready routing rollout receipt or default_rollout summary is required.'));
  return emptyDefaultRollout();
}

function defaultRolloutFromReceipt(receipt) {
  return defaultRolloutSummary({
    receipt_path: receipt.receipt_path,
    schema_version: receipt.schema_version,
    generated_at: receipt.generated_at,
    source: receipt.source,
    goal_id: receipt.goal_id,
    run_id: receipt.run_id,
    workflow: receipt.workflow,
    rollout_task: receipt.rollout_task,
    source_review_receipt: receipt.source_review?.receipt_path,
    source_review_run_id: receipt.source_review?.run_id,
    rollout_suite_receipt: receipt.rollout_suite?.receipt_path,
    rollout_suite_run_id: receipt.rollout_suite?.run_id,
    post_canary_receipt: receipt.post_canary?.receipt_path,
    post_canary_run_id: receipt.post_canary?.run_id,
    rollout: receipt.rollout,
    rollout_evaluation: receipt.rollout_evaluation,
    totals: receipt.totals,
  });
}

function defaultRolloutFromSummary(summary, issues) {
  const normalized = defaultRolloutSummary(summary);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'rollout_task']) {
    if (!normalized[field]) issues.push(routingHandoffIssue('routing-handoff-default-rollout-invalid', `default_rollout.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-rollout.v1') {
    issues.push(routingHandoffIssue('routing-handoff-default-rollout-invalid', 'default_rollout.schema_version must be aipedia.agent-routing-rollout.v1.'));
  }
  return normalized;
}

function normalizeMonitor(input, issues) {
  const monitor = input.routing_monitor || input.monitor_receipt || input.monitor || (isRoutingMonitorReceipt(input) ? input : null);
  if (monitor) {
    if (isRoutingMonitorReceipt(monitor)) {
      const receiptIssues = validateRoutingMonitorReceipt(monitor);
      for (const item of receiptIssues) {
        issues.push(routingHandoffIssue('routing-handoff-monitor-invalid', item.message));
      }
      return receiptIssues.length ? emptyMonitor() : monitorFromReceipt(monitor);
    }
    if (isObject(monitor)) return monitorFromSummary(monitor, issues);
  }
  issues.push(routingHandoffIssue('routing-handoff-monitor-invalid', 'A routing monitor receipt or monitor summary is required.'));
  return emptyMonitor();
}

function monitorFromReceipt(receipt) {
  return monitorSummary({
    receipt_path: receipt.receipt_path,
    schema_version: receipt.schema_version,
    generated_at: receipt.generated_at,
    source: receipt.source,
    goal_id: receipt.goal_id,
    run_id: receipt.run_id,
    workflow: receipt.workflow,
    monitor_task: receipt.monitor_task,
    source_rollout: receipt.source_rollout,
    monitoring_suite_receipt: receipt.monitoring_suite?.receipt_path,
    monitoring_suite_run_id: receipt.monitoring_suite?.run_id,
    rollback_plan: receipt.rollback_plan,
    monitoring_evaluation: receipt.monitoring_evaluation,
    totals: receipt.totals,
  });
}

function monitorFromSummary(summary, issues) {
  const normalized = monitorSummary(summary);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'monitor_task']) {
    if (!normalized[field]) issues.push(routingHandoffIssue('routing-handoff-monitor-invalid', `monitor.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-monitor.v1') {
    issues.push(routingHandoffIssue('routing-handoff-monitor-invalid', 'monitor.schema_version must be aipedia.agent-routing-monitor.v1.'));
  }
  return normalized;
}

function normalizeChangePlan(input, defaultRollout, issues) {
  const source = isObject(input.change_plan) ? input.change_plan : input;
  const mode = stringValue(source.mode || source.change_mode) || 'record-only';
  if (!CHANGE_MODES.has(mode)) {
    issues.push(routingHandoffIssue('routing-handoff-change-plan-invalid', 'change_plan.mode must be record-only or runtime.'));
  }
  const plan = {
    mode,
    change_id: stringValue(source.change_id || source.policy_change_id) || defaultRollout.rollout.policy_change_id || defaultRollout.run_id,
    operator: stringValue(source.operator) || defaultRollout.rollout.operator,
    apply_command: stringValue(source.apply_command || source.change_command || source.command),
    verification_command: stringValue(source.verification_command || source.verify_command || source.verify),
    execution_note: stringValue(source.execution_note) || defaultExecutionNote(mode),
  };
  plan.ready = Boolean(plan.change_id && plan.operator && plan.apply_command && plan.verification_command && CHANGE_MODES.has(plan.mode));
  return plan;
}

function handoffEvaluationSummary(defaultRollout, monitor, changePlan) {
  const defaultRolloutReady = defaultRolloutReadyForHandoff(defaultRollout);
  const monitorHealthy = monitorHealthyForHandoff(monitor);
  const rolloutMonitorLineageMatch = sameLineage(
    defaultRollout.receipt_path,
    defaultRollout.run_id,
    monitor.source_rollout.receipt_path,
    monitor.source_rollout.run_id,
  );
  const sourceRolloutSummaryMatch = deepEqual(defaultRollout, monitor.source_rollout);
  const rollbackPlanReady = monitor.rollback_plan.available === true
    && Boolean(monitor.rollback_plan.rollback_command && monitor.rollback_plan.verification_command)
    && monitor.monitoring_evaluation.rollback_plan_ready === true;
  const freshMonitoringSuite = monitor.monitoring_evaluation.fresh_monitoring_suite === true;
  const handoffReady = defaultRolloutReady
    && monitorHealthy
    && rolloutMonitorLineageMatch
    && sourceRolloutSummaryMatch
    && freshMonitoringSuite
    && rollbackPlanReady
    && changePlan.ready;
  return {
    status: handoffReady ? 'handoff-ready' : 'blocked',
    handoff_ready: handoffReady,
    default_rollout_ready: defaultRolloutReady,
    monitor_healthy: monitorHealthy,
    rollout_monitor_lineage_match: rolloutMonitorLineageMatch,
    source_rollout_summary_match: sourceRolloutSummaryMatch,
    fresh_monitoring_suite: freshMonitoringSuite,
    rollback_plan_ready: rollbackPlanReady,
    change_plan_ready: changePlan.ready,
    reason: handoffReason({
      handoffReady,
      defaultRolloutReady,
      monitorHealthy,
      rolloutMonitorLineageMatch,
      sourceRolloutSummaryMatch,
      freshMonitoringSuite,
      rollbackPlanReady,
      changePlanReady: changePlan.ready,
    }),
  };
}

function defaultRolloutReadyForHandoff(defaultRollout) {
  return defaultRollout.rollout.stage === 'default-enabled'
    && defaultRollout.rollout.traffic_percent === 100
    && defaultRollout.rollout_evaluation.status === 'default-ready'
    && defaultRollout.rollout_evaluation.guard_passed === true
    && defaultRollout.rollout_evaluation.default_change_allowed === true
    && defaultRollout.rollout_evaluation.post_canary_ready === true;
}

function monitorHealthyForHandoff(monitor) {
  return monitor.monitoring_evaluation.status === 'monitoring-healthy'
    && monitor.monitoring_evaluation.monitoring_healthy === true
    && monitor.monitoring_evaluation.rollback_required === false
    && monitor.monitoring_evaluation.source_default_ready === true
    && monitor.monitoring_evaluation.metrics_ready === true
    && monitor.monitoring_evaluation.rollback_plan_ready === true;
}

function handoffReason({ handoffReady, defaultRolloutReady, monitorHealthy, rolloutMonitorLineageMatch, sourceRolloutSummaryMatch, freshMonitoringSuite, rollbackPlanReady, changePlanReady }) {
  if (handoffReady) return 'Default routing handoff is ready: default rollout, post-default monitoring, rollback plan, and apply verification command are all recorded.';
  if (!defaultRolloutReady) return 'The rollout is not a default-ready routing rollout with post-canary evidence.';
  if (!monitorHealthy) return 'The post-default monitor receipt is not healthy.';
  if (!rolloutMonitorLineageMatch) return 'The monitor source rollout does not match the default rollout receipt.';
  if (!sourceRolloutSummaryMatch) return 'The monitor source rollout summary does not match the default rollout summary.';
  if (!freshMonitoringSuite) return 'The monitor must use a fresh post-default monitoring suite.';
  if (!rollbackPlanReady) return 'The monitor must include rollback and rollback verification commands.';
  if (!changePlanReady) return 'The handoff must record change id, operator, apply command, and verification command.';
  return 'The default routing handoff did not pass.';
}

function handoffGuardrails(evaluation) {
  const guardrails = [];
  if (!evaluation.default_rollout_ready) guardrails.push('Do not hand off a routing default change without a default-ready rollout receipt.');
  if (!evaluation.monitor_healthy) guardrails.push('Do not hand off a routing default change unless post-default monitoring is healthy.');
  if (!evaluation.rollout_monitor_lineage_match) guardrails.push('Do not mix a default rollout receipt with an unrelated monitor receipt.');
  if (!evaluation.source_rollout_summary_match) guardrails.push('Do not hand off if the monitor source rollout summary differs from the default rollout summary.');
  if (!evaluation.fresh_monitoring_suite) guardrails.push('Do not use rollout evidence as post-default monitoring evidence.');
  if (!evaluation.rollback_plan_ready) guardrails.push('Record rollback and rollback verification commands before handoff.');
  if (!evaluation.change_plan_ready) guardrails.push('Record change id, operator, apply command, and verification command before handoff.');
  guardrails.push('Attach the handoff receipt to any runtime default-change command and preserve rollout, monitor, and rollback evidence together.');
  return guardrails;
}

function handoffNextActions(evaluation) {
  if (evaluation.handoff_ready) {
    return ['Attach this handoff receipt to the runtime default-change command, then rerun post-default monitoring after any routing, model, prompt, tool, or workflow change.'];
  }
  if (!evaluation.change_plan_ready) {
    return ['Record the apply command, verification command, operator, and change id, then regenerate the routing handoff receipt.'];
  }
  if (!evaluation.monitor_healthy) {
    return ['Regenerate healthy post-default monitoring with rollback instructions before handoff.'];
  }
  return ['Regenerate the default rollout, monitor, or change-plan evidence until every handoff gate passes.'];
}

function defaultExecutionNote(mode) {
  if (mode === 'runtime') return 'Runtime handoff may execute only after this receipt passes closeout validation.';
  return 'Record-only handoff: this receipt must travel with the future runtime default-change command.';
}

function defaultRolloutSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    rollout_task: stringValue(value?.rollout_task),
    source_review_receipt: stringValue(value?.source_review_receipt),
    source_review_run_id: stringValue(value?.source_review_run_id),
    rollout_suite_receipt: stringValue(value?.rollout_suite_receipt),
    rollout_suite_run_id: stringValue(value?.rollout_suite_run_id),
    post_canary_receipt: stringValue(value?.post_canary_receipt),
    post_canary_run_id: stringValue(value?.post_canary_run_id),
    rollout: rolloutConfigSummary(value?.rollout),
    rollout_evaluation: rolloutEvaluationSummary(value?.rollout_evaluation),
    totals: rolloutTotalsSummary(value?.totals),
  };
}

function monitorSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    monitor_task: stringValue(value?.monitor_task),
    source_rollout: defaultRolloutSummary(value?.source_rollout),
    monitoring_suite_receipt: stringValue(value?.monitoring_suite_receipt),
    monitoring_suite_run_id: stringValue(value?.monitoring_suite_run_id),
    rollback_plan: rollbackPlanSummary(value?.rollback_plan),
    monitoring_evaluation: monitoringEvaluationSummary(value?.monitoring_evaluation),
    totals: monitorTotalsSummary(value?.totals),
  };
}

function rollbackPlanSummary(value) {
  return {
    available: value?.available === true,
    owner: stringValue(value?.owner),
    rollback_command: stringValue(value?.rollback_command),
    verification_command: stringValue(value?.verification_command),
    communication_channel: stringValue(value?.communication_channel),
    trigger: stringValue(value?.trigger),
  };
}

function rolloutConfigSummary(value) {
  return {
    stage: stringValue(value?.stage),
    traffic_percent: numberValue(value?.traffic_percent),
    policy_change_id: stringValue(value?.policy_change_id),
    operator: stringValue(value?.operator),
  };
}

function rolloutEvaluationSummary(value) {
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

function monitoringEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    monitoring_healthy: value?.monitoring_healthy === true,
    rollback_required: value?.rollback_required === true,
    source_default_ready: value?.source_default_ready === true,
    fresh_monitoring_suite: value?.fresh_monitoring_suite === true,
    metrics_ready: value?.metrics_ready === true,
    rollback_plan_ready: value?.rollback_plan_ready === true,
    scenario_coverage_required: nonNegativeInteger(value?.scenario_coverage_required),
    scenario_coverage_passed: value?.scenario_coverage_passed === true,
    telemetry_coverage_rate: numberValue(value?.telemetry_coverage_rate),
    reason: stringValue(value?.reason),
    failing_scenario_ids: stringArray(value?.failing_scenario_ids),
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

function monitorTotalsSummary(value) {
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

function emptyDefaultRollout() {
  return defaultRolloutSummary({});
}

function emptyMonitor() {
  return monitorSummary({});
}

function isRoutingRolloutReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-rollout' && typeof value.schema_version === 'string';
}

function isRoutingMonitorReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-monitor' && typeof value.schema_version === 'string';
}

function sameLineage(leftReceipt, leftRunId, rightReceipt, rightRunId) {
  const left = stringValue(leftReceipt) || stringValue(leftRunId);
  const right = stringValue(rightReceipt) || stringValue(rightRunId);
  return Boolean(left && right && left === right);
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
