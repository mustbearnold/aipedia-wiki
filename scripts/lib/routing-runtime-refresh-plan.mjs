import { normalizeModelTokenUsage, validateModelTokenUsageReport } from './model-token-usage.mjs';
import { validateRoutingHandoffReceipt } from './routing-handoff.mjs';
import { validateRoutingMonitorTrendsReceipt } from './routing-monitor-trends.mjs';
import { validateRoutingMonitorTrendRollupReceipt } from './routing-monitor-trend-rollup.mjs';
import { validateRoutingRuntimeCompletionReceipt } from './routing-runtime-completion.mjs';

export const ROUTING_RUNTIME_REFRESH_PLAN_SCHEMA_VERSION = 'aipedia.agent-routing-runtime-refresh-plan.v1';
export const ROUTING_RUNTIME_REFRESH_COMMAND_PLAN_ARTIFACT_SCHEMA_VERSION = 'aipedia.agent-routing-runtime-refresh-command-plan-artifact.v1';

const RELEVANT_CHANGE_KINDS = new Set(['model', 'prompt', 'policy', 'routing-policy', 'tool', 'workflow', 'runtime', 'router', 'default-routing']);
const HandoffRefreshKinds = new Set(['policy', 'routing-policy', 'runtime', 'router', 'default-routing']);

export function buildRoutingRuntimeRefreshPlan(input, options = {}) {
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-input-invalid', 'Input must be an object.')],
    };
  }

  const change = normalizeChange(input.change || input);
  const requirements = normalizeRequirements(input.requirements || input);
  const commandInputs = normalizeCommandInputs(input.command_inputs || input, change);
  const rawEvidence = input.evidence_chain || input;
  const evidenceChain = applyEvidenceStaleness({
    handoff: normalizeHandoffEvidence(rawEvidence.handoff || rawEvidence.routing_handoff || rawEvidence.handoff_receipt),
    monitor_trends: normalizeMonitorTrendsEvidence(rawEvidence.monitor_trends || rawEvidence.routing_monitor_trends || rawEvidence.trends || rawEvidence.trend),
    monitor_trend_rollup: normalizeMonitorTrendRollupEvidence(rawEvidence.monitor_trend_rollup || rawEvidence.routing_monitor_trend_rollup || rawEvidence.trend_rollup || rawEvidence.rollup),
    runtime_completion: normalizeRuntimeCompletionEvidence(rawEvidence.runtime_completion || rawEvidence.routing_runtime_completion || rawEvidence.completion),
    model_token_usage: normalizeModelTokenEvidence(rawEvidence.model_token_usage || rawEvidence.token_usage),
  }, change, requirements);

  const commandPlan = buildCommandPlan(evidenceChain, change, requirements, commandInputs);
  const refreshEvaluation = buildRefreshEvaluation(evidenceChain, change, requirements, commandPlan);
  const source = options.source || input.source || evidenceSource(evidenceChain);
  const goalId = stringValue(input.goal_id) || evidenceChain.handoff.goal_id || evidenceChain.monitor_trends.goal_id || evidenceChain.runtime_completion.goal_id || '';
  const runId = stringValue(input.run_id) || change.change_id || commandInputs.run_id || 'routing-runtime-refresh-plan';
  const workflow = stringValue(input.workflow) || evidenceChain.handoff.workflow || evidenceChain.monitor_trends.workflow || 'loop-system';
  const nextActions = buildNextActions(refreshEvaluation, commandPlan);

  const receipt = {
    ok: refreshEvaluation.status === 'ready-current',
    mode: 'agent-routing-runtime-refresh-plan',
    schema_version: ROUTING_RUNTIME_REFRESH_PLAN_SCHEMA_VERSION,
    generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
    project_dir: options.projectDir || input.project_dir || '.',
    source,
    goal_id: goalId,
    run_id: runId,
    workflow,
    refresh_task: stringValue(input.refresh_task || input.task) || `Runtime routing refresh plan for ${change.change_id || runId}`,
    change,
    requirements,
    evidence_chain: evidenceChain,
    command_inputs: commandInputs,
    command_plan: commandPlan,
    refresh_evaluation: refreshEvaluation,
    guardrails: [
      'Run this plan after every model, prompt, policy, tool, workflow, router, or runtime default-change update.',
      'Do not mark a runtime default routing change complete until the refresh plan is ready-current or the ordered refresh commands have produced closeout-checked evidence.',
      'Attach exact model-token usage whenever runtime usage is available; receipt-size estimates are not a replacement for exact usage.',
    ],
    next_actions: nextActions,
  };

  return { receipt, issues: [] };
}

export function validateRoutingRuntimeRefreshPlanReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-runtime-refresh-plan'],
    ['schema_version', ROUTING_RUNTIME_REFRESH_PLAN_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'refresh_task']) {
    if (typeof value[field] !== 'string') issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'refresh_task']) {
    if (!stringValue(value[field])) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.change)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'change must be an object.'));
  if (!isObject(value.requirements)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'requirements must be an object.'));
  if (!isObject(value.evidence_chain)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'evidence_chain must be an object.'));
  if (!isObject(value.command_inputs)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'command_inputs must be an object.'));
  if (!Array.isArray(value.command_plan)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'command_plan must be an array.'));
  if (!isObject(value.refresh_evaluation)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'refresh_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingRuntimeRefreshPlan({
    change: value.change,
    requirements: value.requirements,
    evidence_chain: value.evidence_chain,
    command_inputs: value.command_inputs,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    refresh_task: value.refresh_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['change', 'requirements', 'evidence_chain', 'command_inputs', 'command_plan', 'refresh_evaluation', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-mismatch', `${field} must match canonical routing runtime refresh plan computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-mismatch', 'ok must match canonical routing runtime refresh plan computation.'));
  }
  if (value.command_plan_artifact != null) {
    issues.push(...validateRoutingRuntimeRefreshCommandPlanArtifact(value.command_plan_artifact, value.command_plan));
  }
  return issues;
}

export function buildRoutingRuntimeRefreshCommandPlanArtifact(commandPlan, artifactPath, format = 'shell') {
  const steps = Array.isArray(commandPlan) ? commandPlan : [];
  const readyToRunCount = steps.filter((step) => step.status === 'ready-to-run').length;
  const blockedInputCount = steps.filter((step) => step.status === 'blocked-input').length;
  const notRequiredCount = steps.filter((step) => step.status === 'not-required').length;
  return {
    schema_version: ROUTING_RUNTIME_REFRESH_COMMAND_PLAN_ARTIFACT_SCHEMA_VERSION,
    path: stringValue(artifactPath),
    format: stringValue(format) || 'shell',
    status: blockedInputCount > 0 ? 'blocked-input' : readyToRunCount > 0 ? 'ready-to-run' : notRequiredCount === steps.length ? 'not-required' : 'mixed',
    command_count: steps.length,
    ready_to_run_count: readyToRunCount,
    blocked_input_count: blockedInputCount,
    not_required_count: notRequiredCount,
  };
}

export function validateRoutingRuntimeRefreshCommandPlanArtifact(artifact, commandPlan) {
  const issues = [];
  if (!isObject(artifact)) {
    return [routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-command-artifact-invalid', 'command_plan_artifact must be an object.')];
  }
  const expected = buildRoutingRuntimeRefreshCommandPlanArtifact(commandPlan, artifact.path, artifact.format);
  for (const field of ['schema_version', 'path', 'format', 'status']) {
    if (artifact[field] !== expected[field]) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-command-artifact-invalid', `${field} must be ${expected[field]}.`));
  }
  for (const field of ['command_count', 'ready_to_run_count', 'blocked_input_count', 'not_required_count']) {
    if (artifact[field] !== expected[field]) issues.push(routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-command-artifact-invalid', `${field} must be ${expected[field]}.`));
  }
  return issues;
}

export function routingRuntimeRefreshPlanIssue(code, message) {
  return { code, message };
}

function normalizeChange(source) {
  const kinds = uniqueStrings([]
    .concat(arrayValue(source.change_kinds || source.kinds || source.kind))
    .concat(arrayValue(source.change_kind)));
  const relevant = kinds.some((kind) => RELEVANT_CHANGE_KINDS.has(kind));
  return {
    change_id: stringValue(source.change_id || source.id),
    changed_at: stringValue(source.changed_at || source.timestamp),
    kinds,
    relevant_to_runtime_refresh: relevant,
    summary: stringValue(source.change_summary || source.summary),
    changed_artifacts: uniqueStrings(arrayValue(source.changed_artifacts || source.changed_artifact || source.paths)),
  };
}

function normalizeRequirements(source) {
  return {
    require_monitor_trend_rollup: source.require_monitor_trend_rollup !== false,
    require_model_token_usage: source.require_model_token_usage === true || source.require_exact_model_tokens === true,
    require_changed_at_for_relevant_changes: source.require_changed_at_for_relevant_changes !== false,
  };
}

function normalizeCommandInputs(source, change) {
  const runId = stringValue(source.run_id) || stringValue(change.change_id) || 'routing-runtime-refresh';
  const outputPrefix = stringValue(source.output_prefix || source.out_prefix) || `.agent/evals/routing-runtime-refresh-plans/${slug(runId)}`;
  return {
    run_id: runId,
    output_prefix: outputPrefix,
    events_jsonl: stringValue(source.events_jsonl || source.correction_events_jsonl),
    routing_suite_input: stringValue(source.routing_suite_input || source.suite_input),
    default_rollout: stringValue(source.default_rollout || source.default_rollout_receipt),
    baseline_monitor: stringValue(source.baseline_monitor || source.monitor || source.source_monitor),
    baseline_monitor_trends: stringValue(source.baseline_monitor_trends || source.monitor_trends || source.trends || source.trend),
    model_token_usage: stringValue(source.model_token_usage || source.token_usage),
    rollback_command: stringValue(source.rollback_command),
    rollback_verification_command: stringValue(source.rollback_verification_command || source.rollback_verify || source.rollback_verify_command),
    runtime_system: stringValue(source.runtime_system || source.system),
    runtime_applied_at: stringValue(source.runtime_applied_at || source.applied_at),
    runtime_verification_status: stringValue(source.runtime_verification_status || source.verification_status) || 'passed',
    runtime_evidence_note: stringValue(source.runtime_evidence_note || source.evidence_note),
  };
}

function normalizeHandoffEvidence(value) {
  const summary = summaryFromCanonicalEvidence(value, 'handoff');
  if (summary) return summary;
  if (!value) return missingEvidence('handoff', 'Runtime-mode routing handoff receipt is missing.');
  const issues = validateRoutingHandoffReceipt(value).map((item) => routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-handoff-invalid', item.message));
  return evidenceSummary('handoff', {
    provided: true,
    valid: issues.length === 0,
    ready: issues.length === 0 && value.ok === true && value.handoff_evaluation?.handoff_ready === true && value.change_plan?.mode === 'runtime',
    status: value.handoff_evaluation?.status || (value.ok ? 'handoff-ready' : 'handoff-attention'),
    generated_at: value.generated_at,
    receipt_path: value.receipt_path,
    run_id: value.run_id,
    workflow: value.workflow,
    goal_id: value.goal_id,
    issues,
    facts: {
      change_id: value.change_plan?.change_id || '',
      change_mode: value.change_plan?.mode || '',
      apply_command: value.change_plan?.apply_command || '',
      verification_command: value.change_plan?.verification_command || '',
      default_rollout_receipt: value.default_rollout?.receipt_path || '',
      monitor_receipt: value.monitor?.receipt_path || '',
    },
  });
}

function normalizeMonitorTrendsEvidence(value) {
  const summary = summaryFromCanonicalEvidence(value, 'monitor_trends');
  if (summary) return summary;
  if (!value) return missingEvidence('monitor_trends', 'Routing monitor-trends receipt is missing.');
  const issues = validateRoutingMonitorTrendsReceipt(value).map((item) => routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-monitor-trends-invalid', item.message));
  return evidenceSummary('monitor_trends', {
    provided: true,
    valid: issues.length === 0,
    ready: issues.length === 0 && value.ok === true && value.drift_evaluation?.trend_healthy === true,
    status: value.drift_evaluation?.status || (value.ok ? 'trend-healthy' : 'trend-attention'),
    generated_at: value.generated_at,
    receipt_path: value.receipt_path,
    run_id: value.run_id,
    workflow: value.workflow,
    goal_id: value.goal_id,
    issues,
    facts: {
      latest_monitor_receipt: value.latest?.receipt_path || '',
      monitor_count: numericValue(value.totals?.monitor_count),
      healthy_monitor_count: numericValue(value.totals?.healthy_monitor_count),
      latest_failing_scenario_count: numericValue(value.totals?.latest_failing_scenario_count),
    },
  });
}

function normalizeMonitorTrendRollupEvidence(value) {
  const summary = summaryFromCanonicalEvidence(value, 'monitor_trend_rollup');
  if (summary) return summary;
  if (!value) return missingEvidence('monitor_trend_rollup', 'Routing monitor trend rollup receipt is missing.');
  const issues = validateRoutingMonitorTrendRollupReceipt(value).map((item) => routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-rollup-invalid', item.message));
  return evidenceSummary('monitor_trend_rollup', {
    provided: true,
    valid: issues.length === 0,
    ready: issues.length === 0 && value.ok === true && value.rollup_evaluation?.rollup_ready === true,
    status: value.rollup_evaluation?.status || (value.ok ? 'rollup-ready' : 'rollup-attention'),
    generated_at: value.generated_at,
    receipt_path: value.receipt_path,
    run_id: value.run_id,
    workflow: value.workflow,
    goal_id: value.goal_id,
    issues,
    facts: {
      trend_count: numericValue(value.totals?.trend_count),
      healthy_trend_count: numericValue(value.totals?.healthy_trend_count),
      monitor_window_count: numericValue(value.totals?.monitor_window_count),
      latest_failing_scenario_count: numericValue(value.totals?.latest_failing_scenario_count),
      trend_receipts: Array.isArray(value.trend_receipts) ? value.trend_receipts.map((item) => item.receipt_path).filter(Boolean) : [],
    },
  });
}

function normalizeRuntimeCompletionEvidence(value) {
  const summary = summaryFromCanonicalEvidence(value, 'runtime_completion');
  if (summary) return summary;
  if (!value) return missingEvidence('runtime_completion', 'Routing runtime-completion receipt is missing.');
  const issues = validateRoutingRuntimeCompletionReceipt(value).map((item) => routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-runtime-completion-invalid', item.message));
  return evidenceSummary('runtime_completion', {
    provided: true,
    valid: issues.length === 0,
    ready: issues.length === 0 && value.ok === true && value.completion_evaluation?.completion_ready === true,
    status: value.completion_evaluation?.status || (value.ok ? 'completion-ready' : 'completion-attention'),
    generated_at: value.generated_at,
    receipt_path: value.receipt_path,
    run_id: value.run_id,
    workflow: value.workflow,
    goal_id: value.goal_id,
    issues,
    facts: {
      change_id: value.runtime_completion?.change_id || '',
      exact_model_total_tokens: numericValue(value.completion_evaluation?.exact_model_total_tokens),
      exact_model_request_count: numericValue(value.completion_evaluation?.exact_model_request_count),
      monitor_trend_rollup_ready: value.completion_evaluation?.monitor_trend_rollup_ready === true,
      model_token_usage_ready: value.completion_evaluation?.model_token_usage_ready === true,
    },
  });
}

function normalizeModelTokenEvidence(value) {
  const summary = summaryFromCanonicalEvidence(value, 'model_token_usage');
  if (summary) return summary;
  if (!value) return missingEvidence('model_token_usage', 'Exact model-token usage is missing.');
  const normalized = value.schema_version === 'aipedia.model-token-usage.v1'
    ? { report: value, issues: validateModelTokenUsageReport(value, 'model_token_usage') }
    : normalizeModelTokenUsage(value, { source: value.receipt_path || value.source || 'embedded:routing-runtime-refresh-plan-token-usage' });
  const issues = normalized.issues.map((item) => routingRuntimeRefreshPlanIssue('routing-runtime-refresh-plan-model-token-invalid', item.message));
  const report = normalized.report || {};
  return evidenceSummary('model_token_usage', {
    provided: true,
    valid: issues.length === 0,
    ready: issues.length === 0 && numericValue(report.request_count) > 0 && numericValue(report.total_tokens) > 0,
    status: issues.length === 0 ? 'exact-token-ready' : 'exact-token-invalid',
    generated_at: value.generated_at || value.recorded_at || '',
    receipt_path: value.receipt_path || report.source || value.source || '',
    run_id: value.run_id || '',
    workflow: value.workflow || '',
    goal_id: value.goal_id || '',
    issues,
    facts: {
      request_count: numericValue(report.request_count),
      total_tokens: numericValue(report.total_tokens),
      subagent_context_count: numericValue(report.subagent_context_count),
    },
  });
}

function evidenceSummary(kind, input) {
  return {
    kind,
    provided: input.provided === true,
    valid: input.valid === true,
    ready: input.ready === true,
    stale: false,
    status: stringValue(input.status) || (input.ready ? 'ready' : 'missing'),
    generated_at: stringValue(input.generated_at),
    receipt_path: stringValue(input.receipt_path),
    run_id: stringValue(input.run_id),
    workflow: stringValue(input.workflow),
    goal_id: stringValue(input.goal_id),
    issues: normalizeIssues(input.issues),
    facts: isObject(input.facts) ? normalizeFacts(input.facts) : {},
  };
}

function summaryFromCanonicalEvidence(value, expectedKind) {
  if (!isObject(value) || value.kind !== expectedKind) return null;
  return evidenceSummary(expectedKind, value);
}

function missingEvidence(kind, message) {
  return evidenceSummary(kind, {
    provided: false,
    valid: false,
    ready: false,
    status: 'missing',
    issues: [routingRuntimeRefreshPlanIssue(`routing-runtime-refresh-plan-${kind.replaceAll('_', '-')}-missing`, message)],
  });
}

function applyEvidenceStaleness(chain, change, requirements) {
  return Object.fromEntries(Object.entries(chain).map(([kind, summary]) => {
    const staleCheck = evidenceStaleness(kind, summary, change, requirements);
    return [kind, {
      ...summary,
      stale: staleCheck.stale,
      stale_reason: staleCheck.reason,
    }];
  }));
}

function evidenceStaleness(kind, evidence, change, requirements) {
  if (!evidence.provided || !evidence.generated_at || !change.relevant_to_runtime_refresh) return { stale: false, reason: '' };
  if (!change.changed_at) {
    return {
      stale: requirements.require_changed_at_for_relevant_changes === true,
      reason: requirements.require_changed_at_for_relevant_changes === true ? 'changed_at is required before evidence freshness can be trusted.' : '',
    };
  }
  const applies = kind !== 'handoff' || change.kinds.some((item) => HandoffRefreshKinds.has(item));
  if (!applies) return { stale: false, reason: '' };
  const evidenceTime = Date.parse(evidence.generated_at);
  const changeTime = Date.parse(change.changed_at);
  if (!Number.isFinite(evidenceTime) || !Number.isFinite(changeTime)) return { stale: true, reason: 'Evidence or change timestamp is not parseable.' };
  if (evidenceTime < changeTime) return { stale: true, reason: `${kind} evidence predates the relevant change.` };
  return { stale: false, reason: '' };
}

function buildRefreshEvaluation(chain, change, requirements, commandPlan) {
  const requiredKinds = ['handoff', 'monitor_trends', 'runtime_completion'];
  if (requirements.require_monitor_trend_rollup) requiredKinds.push('monitor_trend_rollup');
  if (requirements.require_model_token_usage) requiredKinds.push('model_token_usage');
  const requiredEvidence = requiredKinds.map((kind) => chain[kind]);
  const missing = requiredEvidence.filter((item) => !item.provided).map((item) => item.kind);
  const invalid = requiredEvidence.filter((item) => item.provided && !item.valid).map((item) => item.kind);
  const notReady = requiredEvidence.filter((item) => item.valid && !item.ready).map((item) => item.kind);
  const stale = requiredEvidence.filter((item) => item.valid && item.ready && item.stale).map((item) => item.kind);
  const missingChangedAt = change.relevant_to_runtime_refresh && requirements.require_changed_at_for_relevant_changes && !change.changed_at;
  const inputBlockers = commandPlan.filter((step) => step.status === 'blocked-input').map((step) => step.id);
  const refreshRequired = missing.length > 0 || invalid.length > 0 || notReady.length > 0 || stale.length > 0;
  const blocked = missingChangedAt || (refreshRequired && inputBlockers.length > 0);
  const status = blocked ? 'blocked' : refreshRequired ? 'refresh-required' : 'ready-current';
  return {
    status,
    ready_current: status === 'ready-current',
    refresh_required: status === 'refresh-required',
    blocked,
    relevant_change: change.relevant_to_runtime_refresh,
    missing_changed_at: missingChangedAt,
    missing_evidence: missing,
    invalid_evidence: invalid,
    not_ready_evidence: notReady,
    stale_evidence: stale,
    input_blockers: inputBlockers,
    command_plan_complete: inputBlockers.length === 0,
    reason: refreshReason(status, { missingChangedAt, missing, invalid, notReady, stale, inputBlockers }),
  };
}

function refreshReason(status, facts) {
  if (status === 'ready-current') return 'Runtime routing evidence is current, closeout-checkable, and ready for the declared change.';
  if (facts.missingChangedAt) return 'Relevant runtime-routing changes require changed_at so stale evidence cannot silently pass.';
  if (facts.inputBlockers.length) return `Refresh sequence is blocked by missing command inputs: ${facts.inputBlockers.join(', ')}.`;
  const parts = [];
  if (facts.missing.length) parts.push(`missing ${facts.missing.join(', ')}`);
  if (facts.invalid.length) parts.push(`invalid ${facts.invalid.join(', ')}`);
  if (facts.notReady.length) parts.push(`not-ready ${facts.notReady.join(', ')}`);
  if (facts.stale.length) parts.push(`stale ${facts.stale.join(', ')}`);
  return `Runtime routing evidence refresh is required: ${parts.join('; ')}.`;
}

function buildCommandPlan(chain, change, requirements, input) {
  const outputs = commandOutputs(input.output_prefix);
  const refreshKinds = ['handoff', 'monitor_trends', 'runtime_completion'];
  if (requirements.require_monitor_trend_rollup) refreshKinds.push('monitor_trend_rollup');
  if (requirements.require_model_token_usage) refreshKinds.push('model_token_usage');
  const refreshNeeded = refreshKinds.some((kind) => {
    const item = chain[kind];
    return !item.provided || !item.valid || !item.ready || item.stale;
  });
  const notRequired = refreshNeeded ? false : true;
  const defaultRollout = input.default_rollout || chain.handoff.facts.default_rollout_receipt || '';
  const baselineMonitor = input.baseline_monitor || chain.handoff.facts.monitor_receipt || chain.monitor_trends.facts.latest_monitor_receipt || '';
  const baselineTrend = input.baseline_monitor_trends || chain.monitor_trends.receipt_path || '';
  const modelTokenUsage = input.model_token_usage || chain.model_token_usage.receipt_path || '';
  const runtimeAppliedAt = input.runtime_applied_at || change.changed_at || '';
  const runtimeSystem = input.runtime_system || 'aipedia-agent-router';
  return [
    commandStep(1, 'correction-telemetry', 'Capture fresh correction telemetry', notRequired, {
      required: { events_jsonl: input.events_jsonl, output_prefix: input.output_prefix },
      output: outputs.correctionTelemetry,
      command: `npm --silent run agent:correction:adapt -- --events-jsonl ${input.events_jsonl || '<events-jsonl>'} --normalized-out ${outputs.correctionNormalized} --out ${outputs.correctionTelemetry} --json`,
    }),
    commandStep(2, 'routing-suite', 'Build a fresh routing evaluation suite', notRequired, {
      required: { routing_suite_input: input.routing_suite_input, output_prefix: input.output_prefix },
      output: outputs.routingSuite,
      command: `npm --silent run agent:routing:suite -- --input ${input.routing_suite_input || '<routing-suite-input>'} --out ${outputs.routingSuite} --json`,
    }),
    commandStep(3, 'routing-monitor', 'Build a fresh post-default routing monitor', notRequired, {
      required: {
        default_rollout: defaultRollout,
        routing_suite_receipt: outputs.routingSuite,
        rollback_command: input.rollback_command,
        rollback_verification_command: input.rollback_verification_command,
        output_prefix: input.output_prefix,
      },
      output: outputs.routingMonitor,
      command: `npm --silent run agent:routing:monitor -- --default-rollout ${defaultRollout || '<default-rollout>'} --suite ${outputs.routingSuite} --rollback-command ${shellToken(input.rollback_command || '<rollback-command>')} --rollback-verify ${shellToken(input.rollback_verification_command || '<rollback-verification-command>')} --out ${outputs.routingMonitor} --json`,
    }),
    commandStep(4, 'routing-monitor-trends', 'Regenerate repeated monitor trend evidence', notRequired, {
      required: { baseline_monitor: baselineMonitor, fresh_monitor: outputs.routingMonitor, output_prefix: input.output_prefix },
      output: outputs.monitorTrends,
      command: `npm --silent run agent:routing:monitor:trends -- --monitor ${baselineMonitor || '<baseline-monitor>'} --monitor ${outputs.routingMonitor} --out ${outputs.monitorTrends} --json`,
    }),
    commandStep(5, 'routing-monitor-trend-rollup', 'Regenerate longer-window monitor trend rollup', notRequired, {
      required: { baseline_monitor_trends: baselineTrend, fresh_monitor_trends: outputs.monitorTrends, output_prefix: input.output_prefix },
      output: outputs.monitorTrendRollup,
      command: `npm --silent run agent:routing:monitor:trend-rollup -- --trend ${baselineTrend || '<baseline-monitor-trends>'} --trend ${outputs.monitorTrends} --out ${outputs.monitorTrendRollup} --json`,
    }),
    commandStep(6, 'routing-runtime-completion', 'Rerun strict runtime completion', notRequired, {
      required: {
        handoff: chain.handoff.receipt_path,
        monitor_trends: baselineTrend,
        monitor_trend_rollup: outputs.monitorTrendRollup,
        model_token_usage: requirements.require_model_token_usage ? modelTokenUsage : 'optional',
        runtime_system: runtimeSystem,
        applied_at: runtimeAppliedAt,
        verification_status: input.runtime_verification_status,
        output_prefix: input.output_prefix,
      },
      output: outputs.runtimeCompletion,
      command: [
        `npm --silent run agent:routing:runtime:complete -- --handoff ${chain.handoff.receipt_path || '<handoff>'}`,
        `--monitor-trends ${baselineTrend || '<monitor-trends>'}`,
        `--monitor-trend-rollup ${outputs.monitorTrendRollup}`,
        requirements.require_monitor_trend_rollup ? '--require-monitor-trend-rollup' : '',
        requirements.require_model_token_usage ? `--model-token-usage ${modelTokenUsage || '<model-token-usage>'} --require-model-token-usage` : '',
        `--runtime-system ${runtimeSystem || '<runtime-system>'}`,
        `--applied-at ${runtimeAppliedAt || '<applied-at>'}`,
        `--verification-status ${input.runtime_verification_status || 'passed'}`,
        `--out ${outputs.runtimeCompletion}`,
        '--json',
      ].filter(Boolean).join(' '),
    }),
  ];
}

function commandStep(sequence, id, title, notRequired, config) {
  if (notRequired) {
    return {
      sequence,
      id,
      title,
      status: 'not-required',
      command: config.command,
      output: config.output,
      missing_inputs: [],
    };
  }
  const missingInputs = Object.entries(config.required)
    .filter(([, value]) => !stringValue(value))
    .map(([key]) => key);
  return {
    sequence,
    id,
    title,
    status: missingInputs.length ? 'blocked-input' : 'ready-to-run',
    command: config.command,
    output: config.output,
    missing_inputs: missingInputs,
  };
}

function commandOutputs(prefix) {
  return {
    correctionNormalized: `${prefix}-correction-normalized.json`,
    correctionTelemetry: `${prefix}-correction-telemetry.json`,
    routingSuite: `${prefix}-routing-suite.json`,
    routingMonitor: `${prefix}-routing-monitor.json`,
    monitorTrends: `${prefix}-monitor-trends.json`,
    monitorTrendRollup: `${prefix}-monitor-trend-rollup.json`,
    runtimeCompletion: `${prefix}-runtime-completion.json`,
  };
}

function buildNextActions(evaluation, commandPlan) {
  if (evaluation.status === 'ready-current') return ['No refresh commands are required for the declared change.'];
  if (evaluation.missing_changed_at) return ['Add changed_at to the refresh plan input before trusting runtime-routing evidence freshness.'];
  const blockers = commandPlan.filter((step) => step.status === 'blocked-input');
  if (blockers.length) {
    return blockers.map((step) => `Supply ${step.missing_inputs.join(', ')} for ${step.id}.`);
  }
  return commandPlan
    .filter((step) => step.status === 'ready-to-run')
    .map((step) => step.command);
}

function evidenceSource(chain) {
  return Object.values(chain).map((item) => item.receipt_path).filter(Boolean).join(' + ');
}

function normalizeFacts(facts) {
  return Object.fromEntries(Object.entries(facts).map(([key, value]) => {
    if (Array.isArray(value)) return [key, value.map((item) => String(item)).sort()];
    if (typeof value === 'number') return [key, Number.isFinite(value) ? value : 0];
    if (typeof value === 'boolean') return [key, value];
    return [key, stringValue(value)];
  }).sort(([a], [b]) => a.localeCompare(b)));
}

function normalizeIssues(issues) {
  if (!Array.isArray(issues)) return [];
  return issues.map((item) => routingRuntimeRefreshPlanIssue(stringValue(item.code), stringValue(item.message)))
    .filter((item) => item.code && item.message)
    .sort((a, b) => `${a.code}:${a.message}`.localeCompare(`${b.code}:${b.message}`));
}

function shellToken(value) {
  const text = String(value);
  if (!text || text.startsWith('<')) return text;
  if (/^[A-Za-z0-9_./:=@+-]+$/.test(text)) return text;
  return JSON.stringify(text);
}

function arrayValue(value) {
  if (Array.isArray(value)) return value.map((item) => stringValue(item)).filter(Boolean);
  const text = stringValue(value);
  if (!text) return [];
  return text.split(',').map((item) => item.trim()).filter(Boolean);
}

function uniqueStrings(values) {
  return [...new Set(values.map((item) => stringValue(item)).filter(Boolean))].sort();
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : value == null ? '' : String(value).trim();
}

function numericValue(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function slug(value) {
  return stringValue(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'routing-runtime-refresh';
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
