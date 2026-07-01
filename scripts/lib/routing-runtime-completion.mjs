import { validateRoutingHandoffReceipt } from './routing-handoff.mjs';
import { validateRoutingMonitorTrendsReceipt } from './routing-monitor-trends.mjs';
import { validateRoutingMonitorTrendRollupReceipt } from './routing-monitor-trend-rollup.mjs';
import { normalizeModelTokenUsage, validateModelTokenUsageReport } from './model-token-usage.mjs';

export const ROUTING_RUNTIME_COMPLETION_SCHEMA_VERSION = 'aipedia.agent-routing-runtime-completion.v1';

const VERIFICATION_STATUSES = new Set(['passed', 'failed', 'not-run']);

export function buildRoutingRuntimeCompletion(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingRuntimeCompletionIssue('routing-runtime-completion-input-invalid', 'Input must be an object.')],
    };
  }

  const handoff = normalizeHandoff(input, issues);
  const monitorTrends = normalizeMonitorTrends(input, issues);
  const runtimeCompletion = normalizeRuntimeCompletion(input, handoff, issues);
  const monitorTrendRollup = normalizeMonitorTrendRollup(input, runtimeCompletion, issues);
  const modelTokenUsage = normalizeRuntimeModelTokenUsage(input, handoff, runtimeCompletion, issues, options);
  if (issues.length) return { receipt: null, issues };

  const requireModelTokenUsage = runtimeCompletion.require_model_token_usage === true;
  const requireMonitorTrendRollup = runtimeCompletion.require_monitor_trend_rollup === true;
  const completionEvaluation = completionEvaluationSummary(handoff, monitorTrends, runtimeCompletion, {
    monitorTrendRollup,
    requireMonitorTrendRollup,
    modelTokenUsage,
    requireModelTokenUsage,
  });
  const guardrails = completionGuardrails(completionEvaluation);
  const nextActions = completionNextActions(completionEvaluation);
  const source = options.source || input.source || [
    handoff.receipt_path,
    monitorTrends.receipt_path,
    monitorTrendRollup?.receipt_path,
  ].filter(Boolean).join(' + ');

  const receipt = {
    ok: completionEvaluation.completion_ready,
    mode: 'agent-routing-runtime-completion',
    schema_version: ROUTING_RUNTIME_COMPLETION_SCHEMA_VERSION,
    generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
    project_dir: options.projectDir || input.project_dir || '.',
    source,
    goal_id: stringValue(input.goal_id) || handoff.goal_id || monitorTrends.goal_id,
    run_id: stringValue(input.run_id) || `${handoff.run_id}:runtime-completion:${monitorTrends.run_id}`,
    workflow: stringValue(input.workflow) || handoff.workflow || monitorTrends.workflow,
    completion_task: stringValue(input.completion_task || input.task) || `Runtime routing completion for ${handoff.change_plan.change_id || handoff.run_id}`,
    handoff,
    monitor_trends: monitorTrends,
    runtime_completion: runtimeCompletion,
    completion_evaluation: completionEvaluation,
    guardrails,
    next_actions: nextActions,
  };
  if (monitorTrendRollup) receipt.monitor_trend_rollup = monitorTrendRollup;
  if (modelTokenUsage) receipt.model_token_usage = modelTokenUsage;

  return {
    receipt,
    issues,
  };
}

export function validateRoutingRuntimeCompletionReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-runtime-completion'],
    ['schema_version', ROUTING_RUNTIME_COMPLETION_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'completion_task']) {
    if (typeof value[field] !== 'string') issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'completion_task']) {
    if (!stringValue(value[field])) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.handoff)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-handoff-invalid', 'handoff must be an object.'));
  if (!isObject(value.monitor_trends)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trends-invalid', 'monitor_trends must be an object.'));
  if (value.monitor_trend_rollup != null && !isObject(value.monitor_trend_rollup)) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', 'monitor_trend_rollup must be an object when present.'));
  }
  if (!isObject(value.runtime_completion)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-runtime-invalid', 'runtime_completion must be an object.'));
  if (!isObject(value.completion_evaluation)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-evaluation-mismatch', 'completion_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-receipt-invalid', 'next_actions must be an array.'));
  if (value.model_token_usage != null) {
    for (const item of validateModelTokenUsageReport(value.model_token_usage, 'model_token_usage')) {
      issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-model-token-invalid', item.message));
    }
  }
  if (issues.length) return issues;

  const rebuilt = buildRoutingRuntimeCompletion({
    handoff: value.handoff,
    monitor_trends: value.monitor_trends,
    monitor_trend_rollup: value.monitor_trend_rollup,
    runtime_completion: value.runtime_completion,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    completion_task: value.completion_task,
    model_token_usage: value.model_token_usage,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  const canonicalFields = ['handoff', 'monitor_trends', 'runtime_completion', 'completion_evaluation', 'guardrails', 'next_actions'];
  if (value.monitor_trend_rollup != null || expected.monitor_trend_rollup != null) canonicalFields.push('monitor_trend_rollup');
  if (value.model_token_usage != null || expected.model_token_usage != null) canonicalFields.push('model_token_usage');
  for (const field of canonicalFields) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-mismatch', `${field} must match canonical routing runtime completion computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-mismatch', 'ok must match canonical routing runtime completion computation.'));
  }
  return issues;
}

export function routingRuntimeCompletionIssue(code, message) {
  return { code, message };
}

function normalizeHandoff(input, issues) {
  const handoff = input.routing_handoff || input.handoff_receipt || input.handoff || (isRoutingHandoffReceipt(input) ? input : null);
  if (handoff) {
    if (isRoutingHandoffReceipt(handoff)) {
      const receiptIssues = validateRoutingHandoffReceipt(handoff);
      for (const item of receiptIssues) {
        issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-handoff-invalid', item.message));
      }
      return receiptIssues.length ? emptyHandoff() : handoffSummary(handoff);
    }
    if (isObject(handoff)) return handoffSummaryFromObject(handoff, issues);
  }
  issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-handoff-invalid', 'A routing handoff receipt or handoff summary is required.'));
  return emptyHandoff();
}

function handoffSummaryFromObject(value, issues) {
  const normalized = handoffSummary(value);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'handoff_task']) {
    if (!normalized[field]) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-handoff-invalid', `handoff.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-handoff.v1') {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-handoff-invalid', 'handoff.schema_version must be aipedia.agent-routing-handoff.v1.'));
  }
  return normalized;
}

function normalizeMonitorTrends(input, issues) {
  const trends = input.routing_monitor_trends || input.monitor_trends_receipt || input.monitor_trends || input.trends || input.trend || (isRoutingMonitorTrendsReceipt(input) ? input : null);
  if (trends) {
    if (isRoutingMonitorTrendsReceipt(trends)) {
      const receiptIssues = validateRoutingMonitorTrendsReceipt(trends);
      for (const item of receiptIssues) {
        issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trends-invalid', item.message));
      }
      return receiptIssues.length ? emptyMonitorTrends() : monitorTrendsSummary(trends);
    }
    if (isObject(trends)) return monitorTrendsSummaryFromObject(trends, issues);
  }
  issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trends-invalid', 'A routing monitor-trends receipt or trend summary is required.'));
  return emptyMonitorTrends();
}

function monitorTrendsSummaryFromObject(value, issues) {
  const normalized = monitorTrendsSummary(value);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'trend_task']) {
    if (!normalized[field]) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trends-invalid', `monitor_trends.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-monitor-trends.v1') {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trends-invalid', 'monitor_trends.schema_version must be aipedia.agent-routing-monitor-trends.v1.'));
  }
  return normalized;
}

function normalizeMonitorTrendRollup(input, runtimeCompletion, issues) {
  const required = runtimeCompletion.require_monitor_trend_rollup === true || input.require_monitor_trend_rollup === true;
  const rollup = input.routing_monitor_trend_rollup
    || input.monitor_trend_rollup_receipt
    || input.monitor_trend_rollup
    || input.trend_rollup
    || input.rollup
    || (isRoutingMonitorTrendRollupReceipt(input) ? input : null);
  if (rollup) {
    if (isRoutingMonitorTrendRollupReceipt(rollup)) {
      const receiptIssues = validateRoutingMonitorTrendRollupReceipt(rollup);
      for (const item of receiptIssues) {
        issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', item.message));
      }
      return receiptIssues.length ? null : monitorTrendRollupSummary(rollup);
    }
    if (isObject(rollup)) return monitorTrendRollupSummaryFromObject(rollup, issues);
  }
  if (required) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-missing', 'A closeout-checked routing monitor trend rollup is required for this runtime completion.'));
  }
  return null;
}

function monitorTrendRollupSummaryFromObject(value, issues) {
  const normalized = monitorTrendRollupSummary(value);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'rollup_task']) {
    if (!normalized[field]) issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', `monitor_trend_rollup.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-monitor-trend-rollup.v1') {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', 'monitor_trend_rollup.schema_version must be aipedia.agent-routing-monitor-trend-rollup.v1.'));
  }
  if (normalized.trend_receipts.length === 0) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', 'monitor_trend_rollup.trend_receipts must include at least one trend summary.'));
  }
  if (!normalized.rollup_evaluation.status) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-monitor-trend-rollup-invalid', 'monitor_trend_rollup.rollup_evaluation.status is required.'));
  }
  return normalized;
}

function normalizeRuntimeCompletion(input, handoff, issues) {
  const source = isObject(input.runtime_completion) ? input.runtime_completion : input;
  const verificationStatus = stringValue(source.verification_status || source.status) || 'not-run';
  if (!VERIFICATION_STATUSES.has(verificationStatus)) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-runtime-invalid', 'runtime_completion.verification_status must be passed, failed, or not-run.'));
  }
  const appliedAt = stringValue(source.applied_at || source.completed_at || source.timestamp);
  const completion = {
    runtime_system: stringValue(source.runtime_system || source.system),
    change_id: stringValue(source.change_id || source.policy_change_id) || handoff.change_plan.change_id,
    operator: stringValue(source.operator) || handoff.change_plan.operator,
    applied_at: appliedAt,
    apply_command: stringValue(source.apply_command || source.change_command || source.command) || handoff.change_plan.apply_command,
    verification_command: stringValue(source.verification_command || source.verify_command || source.verify) || handoff.change_plan.verification_command,
    verification_status: verificationStatus,
    evidence_note: stringValue(source.evidence_note || source.note) || 'Runtime completion must be backed by the attached handoff and monitor-trend receipts.',
  };
  if (source.require_model_token_usage === true || source.require_exact_model_tokens === true) {
    completion.require_model_token_usage = true;
  }
  if (source.require_monitor_trend_rollup === true) {
    completion.require_monitor_trend_rollup = true;
  }
  completion.ready = Boolean(
    completion.runtime_system
    && completion.change_id
    && completion.operator
    && completion.applied_at
    && isIsoTimestamp(completion.applied_at)
    && completion.apply_command
    && completion.verification_command
    && VERIFICATION_STATUSES.has(completion.verification_status),
  );
  return completion;
}

function normalizeRuntimeModelTokenUsage(input, handoff, runtimeCompletion, issues, options) {
  const source = isObject(input.runtime_completion) ? input.runtime_completion : {};
  const candidate = input.model_token_usage
    || input.modelTokenUsage
    || input.runtime_model_token_usage
    || source.model_token_usage
    || source.modelTokenUsage
    || source.token_usage
    || null;
  const required = runtimeCompletion.require_model_token_usage === true
    || input.require_model_token_usage === true
    || input.require_exact_model_tokens === true;
  if (!candidate) {
    if (required) {
      issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-model-token-missing', 'Exact model-token usage is required for this runtime completion.'));
    }
    return null;
  }
  if (isModelTokenUsageReport(candidate)) {
    const reportIssues = validateModelTokenUsageReport(candidate, 'model_token_usage');
    for (const item of reportIssues) {
      issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-model-token-invalid', item.message));
    }
    return reportIssues.length ? null : cloneJson(candidate);
  }
  const normalized = normalizeModelTokenUsage(candidate, {
    source: stringValue(input.model_token_usage_source || source.model_token_usage_source || options.modelTokenUsageSource) || 'embedded:runtime-completion-model-token-usage',
    defaults: {
      workflow: stringValue(input.model_token_context?.workflow) || stringValue(input.workflow) || handoff.workflow,
      run_id: stringValue(input.model_token_context?.run_id) || stringValue(input.run_id) || handoff.run_id,
      orchestrator: stringValue(input.model_token_context?.orchestrator) || stringValue(input.orchestrator || source.orchestrator) || runtimeCompletion.runtime_system,
      subagent: stringValue(input.model_token_context?.subagent) || stringValue(input.subagent || source.subagent) || 'runtime-router',
    },
  });
  for (const item of normalized.issues) {
    issues.push(routingRuntimeCompletionIssue('routing-runtime-completion-model-token-invalid', item.message || item.detail));
  }
  return normalized.report;
}

function completionEvaluationSummary(handoff, monitorTrends, runtimeCompletion, options = {}) {
  const modelTokenUsage = options.modelTokenUsage || null;
  const requireModelTokenUsage = options.requireModelTokenUsage === true;
  const monitorTrendRollup = options.monitorTrendRollup || null;
  const requireMonitorTrendRollup = options.requireMonitorTrendRollup === true;
  const handoffReady = handoff.handoff_evaluation.handoff_ready === true
    && handoff.handoff_evaluation.status === 'handoff-ready';
  const handoffRuntimeMode = handoff.change_plan.mode === 'runtime';
  const monitorTrendHealthy = monitorTrends.drift_evaluation.status === 'trend-healthy'
    && monitorTrends.drift_evaluation.trend_healthy === true
    && monitorTrends.drift_evaluation.repeated_monitoring_ready === true
    && monitorTrends.drift_evaluation.all_monitors_healthy === true
    && monitorTrends.drift_evaluation.latest_healthy === true
    && monitorTrends.drift_evaluation.no_rollback_required === true
    && monitorTrends.drift_evaluation.same_source_rollout === true
    && monitorTrends.drift_evaluation.unique_monitoring_suites === true
    && monitorTrends.drift_evaluation.all_suites_fresh === true
    && monitorTrends.drift_evaluation.latest_no_failing_scenarios === true
    && monitorTrends.drift_evaluation.no_new_failing_scenarios === true
    && monitorTrends.drift_evaluation.quality_drop_passed === true
    && monitorTrends.drift_evaluation.accuracy_drop_passed === true
    && monitorTrends.drift_evaluation.exact_model_token_delta_drop_passed === true
    && monitorTrends.drift_evaluation.wall_duration_delta_ms_drop_passed === true
    && monitorTrends.drift_evaluation.scenario_coverage_stable === true
    && monitorTrends.drift_evaluation.scenarios_comparable === true;
  const rolloutLineageMatch = monitorTrends.monitor_receipts.length > 0
    && monitorTrends.monitor_receipts.every((monitor) => sameLineage(
      handoff.default_rollout_receipt,
      handoff.default_rollout_run_id,
      monitor.source_rollout_receipt,
      monitor.source_rollout_run_id,
    ));
  const handoffMonitorInTrend = monitorTrends.monitor_receipts.some((monitor) => sameLineage(
    handoff.monitor_receipt,
    handoff.monitor_run_id,
    monitor.receipt_path,
    monitor.run_id,
  ));
  const runtimeChangeIdMatch = Boolean(runtimeCompletion.change_id && runtimeCompletion.change_id === handoff.change_plan.change_id);
  const runtimeOperatorMatch = Boolean(runtimeCompletion.operator && runtimeCompletion.operator === handoff.change_plan.operator);
  const runtimeApplyCommandMatch = Boolean(runtimeCompletion.apply_command && runtimeCompletion.apply_command === handoff.change_plan.apply_command);
  const runtimeVerificationCommandMatch = Boolean(runtimeCompletion.verification_command && runtimeCompletion.verification_command === handoff.change_plan.verification_command);
  const runtimeVerificationPassed = runtimeCompletion.verification_status === 'passed';
  const runtimeCompletionReady = runtimeCompletion.ready === true
    && runtimeChangeIdMatch
    && runtimeOperatorMatch
    && runtimeApplyCommandMatch
    && runtimeVerificationCommandMatch
    && runtimeVerificationPassed;
  const monitorTrendRollupAttached = Boolean(monitorTrendRollup);
  const monitorTrendRollupReady = monitorTrendRollupAttached
    && monitorTrendRollup.rollup_evaluation.status === 'rollup-ready'
    && monitorTrendRollup.rollup_evaluation.rollup_ready === true
    && monitorTrendRollup.rollup_evaluation.long_window_ready === true
    && monitorTrendRollup.rollup_evaluation.all_trends_healthy === true
    && monitorTrendRollup.rollup_evaluation.latest_trend_healthy === true
    && monitorTrendRollup.rollup_evaluation.latest_no_failing_scenarios === true
    && monitorTrendRollup.rollup_evaluation.no_new_failing_scenarios === true
    && monitorTrendRollup.rollup_evaluation.quality_drop_passed === true
    && monitorTrendRollup.rollup_evaluation.accuracy_drop_passed === true
    && monitorTrendRollup.rollup_evaluation.exact_model_token_delta_drop_passed === true
    && monitorTrendRollup.rollup_evaluation.wall_duration_delta_ms_drop_passed === true
    && monitorTrendRollup.rollup_evaluation.scenario_coverage_stable === true
    && monitorTrendRollup.rollup_evaluation.scenarios_comparable === true;
  const monitorTrendRollupIncludesTrend = monitorTrendRollupAttached
    && monitorTrendRollup.trend_receipts.some((trend) => sameLineage(
      monitorTrends.receipt_path,
      monitorTrends.run_id,
      trend.receipt_path,
      trend.run_id,
    ));
  const monitorTrendRollupGatePassed = monitorTrendRollupAttached || requireMonitorTrendRollup
    ? monitorTrendRollupReady && monitorTrendRollupIncludesTrend
    : true;
  const modelTokenUsageReady = Boolean(modelTokenUsage);
  const completionReady = handoffReady
    && handoffRuntimeMode
    && monitorTrendHealthy
    && rolloutLineageMatch
    && handoffMonitorInTrend
    && runtimeCompletionReady
    && monitorTrendRollupGatePassed
    && (!requireModelTokenUsage || modelTokenUsageReady);
  const evaluation = {
    status: completionReady ? 'completion-ready' : 'blocked',
    completion_ready: completionReady,
    handoff_ready: handoffReady,
    handoff_runtime_mode: handoffRuntimeMode,
    monitor_trend_healthy: monitorTrendHealthy,
    rollout_lineage_match: rolloutLineageMatch,
    handoff_monitor_in_trend: handoffMonitorInTrend,
    runtime_completion_ready: runtimeCompletionReady,
    runtime_change_id_match: runtimeChangeIdMatch,
    runtime_operator_match: runtimeOperatorMatch,
    runtime_apply_command_match: runtimeApplyCommandMatch,
    runtime_verification_command_match: runtimeVerificationCommandMatch,
    runtime_verification_passed: runtimeVerificationPassed,
    reason: completionReason({
      completionReady,
      handoffReady,
      handoffRuntimeMode,
      monitorTrendHealthy,
      rolloutLineageMatch,
      handoffMonitorInTrend,
      runtimeCompletionReady,
      runtimeChangeIdMatch,
      runtimeOperatorMatch,
      runtimeApplyCommandMatch,
      runtimeVerificationCommandMatch,
      runtimeVerificationPassed,
      requireMonitorTrendRollup,
      monitorTrendRollupAttached,
      monitorTrendRollupReady,
      monitorTrendRollupIncludesTrend,
      monitorTrendRollupGatePassed,
      requireModelTokenUsage,
      modelTokenUsageReady,
    }),
  };
  if (monitorTrendRollupAttached || requireMonitorTrendRollup) {
    evaluation.monitor_trend_rollup_required = requireMonitorTrendRollup;
    evaluation.monitor_trend_rollup_attached = monitorTrendRollupAttached;
    evaluation.monitor_trend_rollup_ready = monitorTrendRollupReady;
    evaluation.monitor_trend_rollup_includes_monitor_trend = monitorTrendRollupIncludesTrend;
    evaluation.monitor_trend_rollup_gate_passed = monitorTrendRollupGatePassed;
    evaluation.monitor_trend_rollup_status = monitorTrendRollup?.rollup_evaluation.status || '';
    evaluation.monitor_trend_rollup_trend_count = monitorTrendRollup?.totals.trend_count || 0;
    evaluation.monitor_trend_rollup_healthy_trend_count = monitorTrendRollup?.totals.healthy_trend_count || 0;
  }
  if (modelTokenUsage || requireModelTokenUsage) {
    evaluation.model_token_usage_required = requireModelTokenUsage;
    evaluation.exact_model_tokens_attached = modelTokenUsageReady;
    evaluation.model_token_usage_ready = modelTokenUsageReady || !requireModelTokenUsage;
    evaluation.exact_model_request_count = modelTokenUsage ? modelTokenUsage.request_count : 0;
    evaluation.exact_model_total_tokens = modelTokenUsage ? modelTokenUsage.total_tokens : 0;
    evaluation.exact_model_subagent_context_count = modelTokenUsage ? modelTokenUsage.subagent_context_count : 0;
  }
  return evaluation;
}

function completionReason({
  completionReady,
  handoffReady,
  handoffRuntimeMode,
  monitorTrendHealthy,
  rolloutLineageMatch,
  handoffMonitorInTrend,
  runtimeCompletionReady,
  runtimeChangeIdMatch,
  runtimeOperatorMatch,
  runtimeApplyCommandMatch,
  runtimeVerificationCommandMatch,
  runtimeVerificationPassed,
  requireMonitorTrendRollup,
  monitorTrendRollupAttached,
  monitorTrendRollupReady,
  monitorTrendRollupIncludesTrend,
  monitorTrendRollupGatePassed,
  requireModelTokenUsage,
  modelTokenUsageReady,
}) {
  if (completionReady && monitorTrendRollupAttached) return 'Runtime default routing change is complete with attached handoff, repeated monitor-trend, and longer-window rollup receipts.';
  if (completionReady) return 'Runtime default routing change is complete with attached handoff and repeated monitor-trend receipts.';
  if (!handoffReady) return 'The handoff receipt is not ready.';
  if (!handoffRuntimeMode) return 'The handoff receipt must use runtime mode before a deployed default change can count as complete.';
  if (!monitorTrendHealthy) return 'The monitor-trend receipt is not healthy.';
  if (requireMonitorTrendRollup && !monitorTrendRollupAttached) return 'The runtime completion requires a routing monitor trend rollup but none was attached.';
  if ((monitorTrendRollupAttached || requireMonitorTrendRollup) && !monitorTrendRollupReady) return 'The monitor-trend rollup is not ready for longer-window runtime completion.';
  if ((monitorTrendRollupAttached || requireMonitorTrendRollup) && !monitorTrendRollupIncludesTrend) return 'The monitor-trend rollup must include the attached monitor-trend receipt.';
  if ((monitorTrendRollupAttached || requireMonitorTrendRollup) && !monitorTrendRollupGatePassed) return 'The monitor-trend rollup gate did not pass.';
  if (!rolloutLineageMatch) return 'The monitor-trend rollout lineage does not match the handoff default rollout.';
  if (!handoffMonitorInTrend) return 'The handoff monitor receipt must be included in the repeated monitor trend.';
  if (!runtimeChangeIdMatch) return 'The runtime completion change id does not match the handoff change id.';
  if (!runtimeOperatorMatch) return 'The runtime completion operator does not match the handoff operator.';
  if (!runtimeApplyCommandMatch) return 'The runtime completion apply command does not match the handoff apply command.';
  if (!runtimeVerificationCommandMatch) return 'The runtime completion verification command does not match the handoff verification command.';
  if (!runtimeVerificationPassed) return 'The runtime completion verification status must be passed.';
  if (requireModelTokenUsage && !modelTokenUsageReady) return 'The runtime completion requires exact model-token usage but none was attached.';
  if (!runtimeCompletionReady) return 'The runtime completion must include runtime system, change id, operator, ISO applied time, apply command, verification command, and verification status.';
  return 'The runtime routing completion did not pass.';
}

function completionGuardrails(evaluation) {
  const guardrails = [];
  if (!evaluation.handoff_ready) guardrails.push('Do not count a runtime default routing change complete without a ready handoff receipt.');
  if (!evaluation.handoff_runtime_mode) guardrails.push('Record runtime handoff mode before counting a deployed default routing change complete.');
  if (!evaluation.monitor_trend_healthy) guardrails.push('Do not count runtime completion without a healthy repeated post-default monitor trend.');
  if (evaluation.monitor_trend_rollup_required && !evaluation.monitor_trend_rollup_attached) guardrails.push('Attach a closeout-checked routing monitor trend rollup before counting this runtime completion complete.');
  if (evaluation.monitor_trend_rollup_attached && !evaluation.monitor_trend_rollup_ready) guardrails.push('Do not count runtime completion complete while the attached longer-window routing rollup is not ready.');
  if (evaluation.monitor_trend_rollup_attached && !evaluation.monitor_trend_rollup_includes_monitor_trend) guardrails.push('The routing monitor trend rollup must include the monitor-trend receipt used by this completion.');
  if (evaluation.monitor_trend_rollup_ready) guardrails.push('Preserve the longer-window routing rollup with runtime completion evidence for future drift comparisons.');
  if (!evaluation.rollout_lineage_match) guardrails.push('Do not combine a handoff with monitor trends from another default rollout.');
  if (!evaluation.handoff_monitor_in_trend) guardrails.push('The repeated monitor trend must include the monitor receipt used by the handoff.');
  if (!evaluation.runtime_completion_ready) guardrails.push('Record matching runtime change id, operator, commands, ISO applied time, and a passed verification status.');
  if (evaluation.model_token_usage_required && !evaluation.exact_model_tokens_attached) guardrails.push('Attach exact model-token usage before counting this runtime completion complete.');
  if (evaluation.exact_model_tokens_attached) guardrails.push('Preserve exact model-token usage with runtime completion evidence for future routing drift comparisons.');
  guardrails.push('Attach this runtime completion receipt to any deployed default routing change record.');
  return guardrails;
}

function completionNextActions(evaluation) {
  if (evaluation.completion_ready) {
    if (evaluation.monitor_trend_rollup_attached && evaluation.exact_model_tokens_attached) {
      return ['Record this runtime completion receipt with exact model-token usage and longer-window rollup evidence, then rerun monitor trends after future model, prompt, policy, tool, or workflow changes.'];
    }
    if (evaluation.monitor_trend_rollup_attached) {
      return ['Record this runtime completion receipt with longer-window rollup evidence and rerun monitor trends after future model, prompt, policy, tool, or workflow changes.'];
    }
    if (evaluation.exact_model_tokens_attached) {
      return ['Record this runtime completion receipt with its exact model-token usage and rerun monitor trends after future model, prompt, policy, tool, or workflow changes.'];
    }
    return ['Record this runtime completion receipt with the deployed default routing change and rerun monitor trends after future model, prompt, policy, tool, or workflow changes.'];
  }
  if (!evaluation.handoff_runtime_mode) {
    return ['Regenerate the handoff receipt in runtime mode and rerun runtime completion.'];
  }
  if (!evaluation.monitor_trend_healthy) {
    return ['Regenerate repeated post-default monitoring until the monitor-trend receipt is healthy.'];
  }
  if (evaluation.monitor_trend_rollup_required && !evaluation.monitor_trend_rollup_attached) {
    return ['Attach a closeout-checked routing monitor trend rollup and regenerate the completion receipt.'];
  }
  if (evaluation.monitor_trend_rollup_attached && !evaluation.monitor_trend_rollup_ready) {
    return ['Collect another closeout-checked routing monitor trend window, regenerate the longer-window rollup, and rerun runtime completion.'];
  }
  if (evaluation.monitor_trend_rollup_attached && !evaluation.monitor_trend_rollup_includes_monitor_trend) {
    return ['Regenerate the routing monitor trend rollup so it includes the monitor-trend receipt used by this runtime completion.'];
  }
  if (!evaluation.runtime_completion_ready) {
    return ['Record matching runtime completion fields and passed verification, then regenerate the receipt.'];
  }
  if (evaluation.model_token_usage_required && !evaluation.exact_model_tokens_attached) {
    return ['Attach exact model-token usage from the runtime and regenerate the completion receipt.'];
  }
  return ['Regenerate the handoff, monitor trend, or runtime completion evidence until every completion gate passes.'];
}

function handoffSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    handoff_task: stringValue(value?.handoff_task),
    default_rollout_receipt: stringValue(value?.default_rollout_receipt || value?.default_rollout?.receipt_path),
    default_rollout_run_id: stringValue(value?.default_rollout_run_id || value?.default_rollout?.run_id),
    default_rollout_stage: stringValue(value?.default_rollout_stage || value?.default_rollout?.rollout?.stage),
    default_rollout_traffic_percent: numberValue(value?.default_rollout_traffic_percent ?? value?.default_rollout?.rollout?.traffic_percent),
    monitor_receipt: stringValue(value?.monitor_receipt || value?.monitor?.receipt_path),
    monitor_run_id: stringValue(value?.monitor_run_id || value?.monitor?.run_id),
    monitor_generated_at: stringValue(value?.monitor_generated_at || value?.monitor?.generated_at),
    change_plan: changePlanSummary(value?.change_plan),
    handoff_evaluation: handoffEvaluationSummary(value?.handoff_evaluation),
  };
}

function monitorTrendsSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    trend_task: stringValue(value?.trend_task),
    monitor_receipts: arrayValue(value?.monitor_receipts).map(monitorIdentitySummary).sort(compareMonitorIdentity),
    totals: monitorTrendTotalsSummary(value?.totals),
    baseline: monitorPointSummary(value?.baseline),
    latest: monitorPointSummary(value?.latest),
    drift_evaluation: driftEvaluationSummary(value?.drift_evaluation),
  };
}

function monitorTrendRollupSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    rollup_task: stringValue(value?.rollup_task),
    trend_receipts: arrayValue(value?.trend_receipts).map(rollupTrendIdentitySummary).sort(compareMonitorIdentity),
    totals: monitorTrendRollupTotalsSummary(value?.totals),
    latest: monitorTrendRollupPointSummary(value?.latest),
    rollup_evaluation: monitorTrendRollupEvaluationSummary(value?.rollup_evaluation),
  };
}

function rollupTrendIdentitySummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    generated_at: stringValue(value?.generated_at),
    run_id: stringValue(value?.run_id),
    status: stringValue(value?.status),
    trend_healthy: value?.trend_healthy === true,
    latest_monitor_receipt: stringValue(value?.latest?.receipt_path || value?.latest_monitor_receipt),
    latest_monitor_run_id: stringValue(value?.latest?.run_id || value?.latest_monitor_run_id),
    source_rollout_receipt: stringValue(value?.latest?.source_rollout_receipt || value?.source_rollout_receipt),
    source_rollout_run_id: stringValue(value?.latest?.source_rollout_run_id || value?.source_rollout_run_id),
    source_rollout_policy_change_id: stringValue(value?.latest?.source_rollout_policy_change_id || value?.source_rollout_policy_change_id),
  };
}

function monitorTrendRollupTotalsSummary(value) {
  return {
    trend_count: nonNegativeInteger(value?.trend_count),
    healthy_trend_count: nonNegativeInteger(value?.healthy_trend_count),
    attention_trend_count: nonNegativeInteger(value?.attention_trend_count),
    unique_trend_receipt_count: nonNegativeInteger(value?.unique_trend_receipt_count),
    unique_trend_run_id_count: nonNegativeInteger(value?.unique_trend_run_id_count),
    source_rollout_count: nonNegativeInteger(value?.source_rollout_count),
    source_rollout_policy_change_count: nonNegativeInteger(value?.source_rollout_policy_change_count),
    monitor_window_count: nonNegativeInteger(value?.monitor_window_count),
    scenario_window_observation_count: nonNegativeInteger(value?.scenario_window_observation_count),
    compared_trend_window_count: nonNegativeInteger(value?.compared_trend_window_count),
    latest_failing_scenario_count: nonNegativeInteger(value?.latest_failing_scenario_count),
  };
}

function monitorTrendRollupPointSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    generated_at: stringValue(value?.generated_at),
    run_id: stringValue(value?.run_id),
    status: stringValue(value?.status),
    trend_healthy: value?.trend_healthy === true,
    monitor_count: nonNegativeInteger(value?.monitor_count),
    healthy_monitor_count: nonNegativeInteger(value?.healthy_monitor_count),
    source_rollout_receipt: stringValue(value?.source_rollout_receipt),
    source_rollout_run_id: stringValue(value?.source_rollout_run_id),
    source_rollout_policy_change_id: stringValue(value?.source_rollout_policy_change_id),
    latest_monitor_receipt: stringValue(value?.latest_monitor_receipt),
    latest_monitor_run_id: stringValue(value?.latest_monitor_run_id),
    latest_monitor_status: stringValue(value?.latest_monitor_status),
    scenario_count: nonNegativeInteger(value?.scenario_count),
    passing_scenario_count: nonNegativeInteger(value?.passing_scenario_count),
    failing_scenario_count: nonNegativeInteger(value?.failing_scenario_count),
    total_exact_model_token_delta: numberValue(value?.total_exact_model_token_delta),
    total_wall_duration_delta_ms: numberValue(value?.total_wall_duration_delta_ms),
    min_quality_score: numberValue(value?.min_quality_score),
    min_accuracy_score: numberValue(value?.min_accuracy_score),
    max_residual_issue_count: nonNegativeInteger(value?.max_residual_issue_count),
    max_regression_count: nonNegativeInteger(value?.max_regression_count),
  };
}

function monitorTrendRollupEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    rollup_ready: value?.rollup_ready === true,
    long_window_ready: value?.long_window_ready === true,
    all_trends_healthy: value?.all_trends_healthy === true,
    latest_trend_healthy: value?.latest_trend_healthy === true,
    unique_trend_receipts: value?.unique_trend_receipts === true,
    unique_trend_run_ids: value?.unique_trend_run_ids === true,
    latest_no_failing_scenarios: value?.latest_no_failing_scenarios === true,
    scenario_coverage_stable: value?.scenario_coverage_stable === true,
    scenarios_comparable: value?.scenarios_comparable === true,
    new_failing_scenario_count: nonNegativeInteger(value?.new_failing_scenario_count),
    no_new_failing_scenarios: value?.no_new_failing_scenarios === true,
    quality_drop: numberValue(value?.quality_drop),
    quality_drop_passed: value?.quality_drop_passed === true,
    accuracy_drop: numberValue(value?.accuracy_drop),
    accuracy_drop_passed: value?.accuracy_drop_passed === true,
    exact_model_token_delta_drop: numberValue(value?.exact_model_token_delta_drop),
    exact_model_token_delta_drop_passed: value?.exact_model_token_delta_drop_passed === true,
    wall_duration_delta_ms_drop: numberValue(value?.wall_duration_delta_ms_drop),
    wall_duration_delta_ms_drop_passed: value?.wall_duration_delta_ms_drop_passed === true,
    reason: stringValue(value?.reason),
  };
}

function changePlanSummary(value) {
  return {
    mode: stringValue(value?.mode),
    change_id: stringValue(value?.change_id),
    operator: stringValue(value?.operator),
    apply_command: stringValue(value?.apply_command),
    verification_command: stringValue(value?.verification_command),
    ready: value?.ready === true,
  };
}

function handoffEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    handoff_ready: value?.handoff_ready === true,
    default_rollout_ready: value?.default_rollout_ready === true,
    monitor_healthy: value?.monitor_healthy === true,
    rollout_monitor_lineage_match: value?.rollout_monitor_lineage_match === true,
    source_rollout_summary_match: value?.source_rollout_summary_match === true,
    fresh_monitoring_suite: value?.fresh_monitoring_suite === true,
    rollback_plan_ready: value?.rollback_plan_ready === true,
    change_plan_ready: value?.change_plan_ready === true,
    reason: stringValue(value?.reason),
  };
}

function monitorIdentitySummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    generated_at: stringValue(value?.generated_at),
    run_id: stringValue(value?.run_id),
    status: stringValue(value?.status || value?.monitoring_evaluation?.status),
    monitoring_healthy: value?.monitoring_healthy === true || value?.monitoring_evaluation?.monitoring_healthy === true,
    rollback_required: value?.rollback_required === true || value?.monitoring_evaluation?.rollback_required === true,
    source_rollout_receipt: stringValue(value?.source_rollout_receipt || value?.source_rollout?.receipt_path),
    source_rollout_run_id: stringValue(value?.source_rollout_run_id || value?.source_rollout?.run_id),
    source_rollout_policy_change_id: stringValue(value?.source_rollout_policy_change_id || value?.source_rollout?.rollout?.policy_change_id),
    monitoring_suite_receipt: stringValue(value?.monitoring_suite_receipt || value?.monitoring_suite?.receipt_path),
    monitoring_suite_run_id: stringValue(value?.monitoring_suite_run_id || value?.monitoring_suite?.run_id),
  };
}

function monitorPointSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    generated_at: stringValue(value?.generated_at),
    run_id: stringValue(value?.run_id),
    status: stringValue(value?.status),
    monitoring_healthy: value?.monitoring_healthy === true,
    rollback_required: value?.rollback_required === true,
    source_rollout_receipt: stringValue(value?.source_rollout_receipt),
    source_rollout_run_id: stringValue(value?.source_rollout_run_id),
    source_rollout_policy_change_id: stringValue(value?.source_rollout_policy_change_id),
    monitoring_suite_receipt: stringValue(value?.monitoring_suite_receipt),
    monitoring_suite_run_id: stringValue(value?.monitoring_suite_run_id),
  };
}

function monitorTrendTotalsSummary(value) {
  return {
    monitor_count: nonNegativeInteger(value?.monitor_count),
    healthy_monitor_count: nonNegativeInteger(value?.healthy_monitor_count),
    rollback_required_count: nonNegativeInteger(value?.rollback_required_count),
    degraded_monitor_count: nonNegativeInteger(value?.degraded_monitor_count),
    unique_monitoring_suite_count: nonNegativeInteger(value?.unique_monitoring_suite_count),
    unique_source_rollout_count: nonNegativeInteger(value?.unique_source_rollout_count),
    scenario_observation_count: nonNegativeInteger(value?.scenario_observation_count),
  };
}

function driftEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    trend_healthy: value?.trend_healthy === true,
    repeated_monitoring_ready: value?.repeated_monitoring_ready === true,
    all_monitors_healthy: value?.all_monitors_healthy === true,
    latest_healthy: value?.latest_healthy === true,
    no_rollback_required: value?.no_rollback_required === true,
    same_source_rollout: value?.same_source_rollout === true,
    unique_monitoring_suites: value?.unique_monitoring_suites === true,
    all_suites_fresh: value?.all_suites_fresh === true,
    latest_no_failing_scenarios: value?.latest_no_failing_scenarios === true,
    no_new_failing_scenarios: value?.no_new_failing_scenarios === true,
    quality_drop_passed: value?.quality_drop_passed === true,
    accuracy_drop_passed: value?.accuracy_drop_passed === true,
    exact_model_token_delta_drop_passed: value?.exact_model_token_delta_drop_passed === true,
    wall_duration_delta_ms_drop_passed: value?.wall_duration_delta_ms_drop_passed === true,
    scenario_coverage_stable: value?.scenario_coverage_stable === true,
    scenarios_comparable: value?.scenarios_comparable === true,
    reason: stringValue(value?.reason),
  };
}

function emptyHandoff() {
  return handoffSummary({});
}

function emptyMonitorTrends() {
  return monitorTrendsSummary({});
}

function isRoutingHandoffReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-handoff' && typeof value.schema_version === 'string';
}

function isRoutingMonitorTrendsReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-monitor-trends' && typeof value.schema_version === 'string';
}

function isRoutingMonitorTrendRollupReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-monitor-trend-rollup' && typeof value.schema_version === 'string';
}

function isModelTokenUsageReport(value) {
  return isObject(value) && value.schema_version === 'aipedia.model-token-usage.v1';
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function sameLineage(leftReceipt, leftRunId, rightReceipt, rightRunId) {
  const left = stringValue(leftReceipt) || stringValue(leftRunId);
  const right = stringValue(rightReceipt) || stringValue(rightRunId);
  return Boolean(left && right && left === right);
}

function compareMonitorIdentity(left, right) {
  return monitorIdentity(left).localeCompare(monitorIdentity(right));
}

function monitorIdentity(value) {
  return stringValue(value?.receipt_path) || stringValue(value?.run_id) || stringValue(value?.generated_at);
}

function arrayValue(value) {
  return Array.isArray(value) ? value : [];
}

function isIsoTimestamp(value) {
  const text = stringValue(value);
  return Boolean(text && !Number.isNaN(Date.parse(text)) && text.includes('T'));
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
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
