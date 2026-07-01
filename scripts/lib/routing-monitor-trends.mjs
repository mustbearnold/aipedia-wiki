import { validateRoutingMonitorReceipt } from './routing-monitor.mjs';

export const ROUTING_MONITOR_TRENDS_SCHEMA_VERSION = 'aipedia.agent-routing-monitor-trends.v1';

export const ROUTING_MONITOR_TREND_DEFAULT_THRESHOLDS = {
  max_quality_drop: 0.03,
  max_accuracy_drop: 0.03,
  max_exact_model_token_delta_drop: 1000,
  max_wall_duration_delta_ms_drop: 1000,
  max_new_failing_scenarios: 0,
};

export function buildRoutingMonitorTrends(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingMonitorTrendsIssue('routing-monitor-trends-input-invalid', 'Input must be an object.')],
    };
  }

  const thresholds = normalizeThresholds(input.thresholds, issues);
  const monitors = normalizeMonitors(input, issues);
  if (issues.length) return { receipt: null, issues };

  const sortedMonitors = monitors.toSorted(compareMonitorOrder);
  const totals = trendTotals(sortedMonitors);
  const baseline = monitorPoint(sortedMonitors[0] || null);
  const latest = monitorPoint(sortedMonitors.at(-1) || null);
  const previous = monitorPoint(sortedMonitors.length > 1 ? sortedMonitors.at(-2) : null);
  const deltas = trendDeltas(baseline, previous, latest);
  const scenarioTrends = buildScenarioTrends(sortedMonitors);
  const stabilitySummary = buildStabilitySummary(sortedMonitors, scenarioTrends);
  const driftEvaluation = buildDriftEvaluation(sortedMonitors, totals, thresholds, baseline, latest, deltas, scenarioTrends);
  const guardrails = trendGuardrails(driftEvaluation, scenarioTrends);
  const nextActions = trendNextActions(driftEvaluation);
  const source = options.source || input.source || sortedMonitors.map((monitor) => monitor.receipt_path).filter(Boolean).join(' + ');

  return {
    receipt: {
      ok: driftEvaluation.trend_healthy,
      mode: 'agent-routing-monitor-trends',
      schema_version: ROUTING_MONITOR_TRENDS_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source,
      goal_id: stringValue(input.goal_id) || firstString(sortedMonitors.map((monitor) => monitor.goal_id)),
      run_id: stringValue(input.run_id) || defaultRunId(sortedMonitors),
      workflow: stringValue(input.workflow) || firstString(sortedMonitors.map((monitor) => monitor.workflow)),
      trend_task: stringValue(input.trend_task || input.task) || 'Repeated post-default routing monitor trend.',
      thresholds,
      monitor_receipts: sortedMonitors,
      totals,
      baseline,
      previous,
      latest,
      deltas,
      scenario_trends: scenarioTrends,
      stability_summary: stabilitySummary,
      drift_evaluation: driftEvaluation,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingMonitorTrendsReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-monitor-trends'],
    ['schema_version', ROUTING_MONITOR_TRENDS_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'trend_task']) {
    if (typeof value[field] !== 'string') issues.push(routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'trend_task']) {
    if (!stringValue(value[field])) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.thresholds)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-threshold-invalid', 'thresholds must be an object.'));
  if (!Array.isArray(value.monitor_receipts)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', 'monitor_receipts must be an array.'));
  if (!isObject(value.totals)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.baseline)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-baseline-invalid', 'baseline must be an object.'));
  if (value.previous != null && !isObject(value.previous)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-previous-invalid', 'previous must be an object or null.'));
  if (!isObject(value.latest)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-latest-invalid', 'latest must be an object.'));
  if (!isObject(value.deltas)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-delta-mismatch', 'deltas must be an object.'));
  if (!Array.isArray(value.scenario_trends)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-scenario-invalid', 'scenario_trends must be an array.'));
  if (!isObject(value.stability_summary)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-stability-mismatch', 'stability_summary must be an object.'));
  if (!isObject(value.drift_evaluation)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-evaluation-mismatch', 'drift_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingMonitorTrends({
    thresholds: value.thresholds,
    monitor_receipts: value.monitor_receipts,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    trend_task: value.trend_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['thresholds', 'monitor_receipts', 'totals', 'baseline', 'previous', 'latest', 'deltas', 'scenario_trends', 'stability_summary', 'drift_evaluation', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-mismatch', `${field} must match canonical routing monitor trend computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-mismatch', 'ok must match canonical routing monitor trend computation.'));
  }
  return issues;
}

export function routingMonitorTrendsIssue(code, message) {
  return { code, message };
}

function normalizeMonitors(input, issues) {
  const rawMonitors = []
    .concat(arrayValue(input.monitor_receipts))
    .concat(arrayValue(input.monitors))
    .concat(arrayValue(input.receipts))
    .concat(arrayValue(input.monitor))
    .concat(arrayValue(input.receipt))
    .filter((item) => item != null);

  if (rawMonitors.length === 0) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', 'At least one routing monitor receipt or monitor summary is required.'));
    return [];
  }

  const monitors = rawMonitors.map((monitor, index) => normalizeMonitor(monitor, index, issues));
  const seen = new Set();
  for (const monitor of monitors) {
    const key = monitorIdentity(monitor);
    if (!key) continue;
    if (seen.has(key)) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `Duplicate monitor receipt ${key} cannot prove repeated monitoring.`));
    }
    seen.add(key);
  }
  return monitors;
}

function normalizeMonitor(value, index, issues) {
  if (isRoutingMonitorReceipt(value)) {
    const receiptIssues = validateRoutingMonitorReceipt(value);
    for (const item of receiptIssues) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `monitor[${index}]: ${item.message}`));
    }
    return receiptIssues.length ? emptyMonitorSummary() : monitorFromReceipt(value);
  }
  if (isObject(value)) return monitorFromSummary(value, index, issues);
  issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `monitor[${index}] must be a routing monitor receipt or summary.`));
  return emptyMonitorSummary();
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
    monitoring_suite: receipt.monitoring_suite,
    rollback_plan: receipt.rollback_plan,
    monitoring_evaluation: receipt.monitoring_evaluation,
    totals: receipt.totals,
    scenarios: receipt.scenarios,
  });
}

function monitorFromSummary(summary, index, issues) {
  const normalized = monitorSummary(summary);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'monitor_task']) {
    if (!normalized[field]) issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `monitor[${index}].${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-monitor.v1') {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `monitor[${index}].schema_version must be aipedia.agent-routing-monitor.v1.`));
  }
  if (!normalized.monitoring_suite_receipt && !normalized.monitoring_suite_run_id) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `monitor[${index}] must include monitoring suite lineage.`));
  }
  return normalized;
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
    source_rollout_receipt: stringValue(value?.source_rollout_receipt || value?.source_rollout?.receipt_path),
    source_rollout_run_id: stringValue(value?.source_rollout_run_id || value?.source_rollout?.run_id),
    source_rollout_stage: stringValue(value?.source_rollout_stage || value?.source_rollout?.rollout?.stage),
    source_rollout_traffic_percent: numberValue(value?.source_rollout_traffic_percent ?? value?.source_rollout?.rollout?.traffic_percent),
    source_rollout_policy_change_id: stringValue(value?.source_rollout_policy_change_id || value?.source_rollout?.rollout?.policy_change_id),
    monitoring_suite_receipt: stringValue(value?.monitoring_suite_receipt || value?.monitoring_suite?.receipt_path),
    monitoring_suite_run_id: stringValue(value?.monitoring_suite_run_id || value?.monitoring_suite?.run_id),
    monitoring_suite_generated_at: stringValue(value?.monitoring_suite_generated_at || value?.monitoring_suite?.generated_at),
    rollback_plan: rollbackPlanSummary(value?.rollback_plan),
    monitoring_evaluation: monitoringEvaluationSummary(value?.monitoring_evaluation),
    totals: monitorTotalsSummary(value?.totals),
    scenarios: Array.isArray(value?.scenarios) ? value.scenarios.map(scenarioSummary).sort((left, right) => left.id.localeCompare(right.id)) : [],
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

function scenarioSummary(value) {
  return {
    id: stringValue(value?.id),
    task_class: stringValue(value?.task_class),
    task_label: stringValue(value?.task_label),
    recommended_candidate_id: stringValue(value?.recommended_candidate_id),
    passed: value?.passed === true,
    exact_model_token_delta: numberValue(value?.exact_model_token_delta),
    wall_duration_delta_ms: numberValue(value?.wall_duration_delta_ms),
    improvement_margin: numberValue(value?.improvement_margin),
    winner: {
      id: stringValue(value?.winner?.id),
      exact_model_total_tokens: nonNegativeInteger(value?.winner?.exact_model_total_tokens),
      exact_model_request_count: nonNegativeInteger(value?.winner?.exact_model_request_count),
      wall_duration_ms: numberValue(value?.winner?.wall_duration_ms),
      quality_score: numberValue(value?.winner?.quality_score),
      accuracy_score: numberValue(value?.winner?.accuracy_score),
      residual_issue_count: nonNegativeInteger(value?.winner?.correction_outcomes?.residual_issue_count),
      regression_count: nonNegativeInteger(value?.winner?.correction_outcomes?.regression_count),
    },
    failure_reasons: stringArray(value?.failure_reasons),
  };
}

function normalizeThresholds(value, issues) {
  const thresholds = { ...ROUTING_MONITOR_TREND_DEFAULT_THRESHOLDS };
  if (value == null) return thresholds;
  if (!isObject(value)) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-threshold-invalid', 'thresholds must be an object when supplied.'));
    return thresholds;
  }
  for (const field of ['max_quality_drop', 'max_accuracy_drop']) {
    if (value[field] == null) continue;
    if (!isRatio(value[field])) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-threshold-invalid', `thresholds.${field} must be between 0 and 1.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  for (const field of ['max_exact_model_token_delta_drop', 'max_wall_duration_delta_ms_drop']) {
    if (value[field] == null) continue;
    if (typeof value[field] !== 'number' || !Number.isFinite(value[field]) || value[field] < 0) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-threshold-invalid', `thresholds.${field} must be a non-negative number.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  if (value.max_new_failing_scenarios != null) {
    if (!Number.isInteger(value.max_new_failing_scenarios) || value.max_new_failing_scenarios < 0) {
      issues.push(routingMonitorTrendsIssue('routing-monitor-trends-threshold-invalid', 'thresholds.max_new_failing_scenarios must be a non-negative integer.'));
    } else {
      thresholds.max_new_failing_scenarios = value.max_new_failing_scenarios;
    }
  }
  return thresholds;
}

function trendTotals(monitors) {
  const sourceKeys = new Set(monitors.map((monitor) => sourceRolloutKey(monitor)).filter(Boolean));
  const suiteKeys = new Set(monitors.map((monitor) => monitoringSuiteKey(monitor)).filter(Boolean));
  return {
    monitor_count: monitors.length,
    healthy_monitor_count: monitors.filter((monitor) => monitorHealthy(monitor)).length,
    rollback_required_count: monitors.filter((monitor) => monitor.monitoring_evaluation.rollback_required === true).length,
    degraded_monitor_count: monitors.filter((monitor) => !monitorHealthy(monitor)).length,
    fresh_monitoring_suite_count: monitors.filter((monitor) => monitor.monitoring_evaluation.fresh_monitoring_suite === true).length,
    unique_monitoring_suite_count: suiteKeys.size,
    source_rollout_count: sourceKeys.size,
    scenario_observation_count: monitors.reduce((sum, monitor) => sum + monitor.scenarios.length, 0),
    compared_transition_count: Math.max(0, monitors.length - 1),
    latest_failing_scenario_count: monitors.at(-1)?.totals.failing_scenario_count || 0,
  };
}

function monitorPoint(monitor) {
  if (!monitor) return null;
  return {
    receipt_path: monitor.receipt_path,
    generated_at: monitor.generated_at,
    run_id: monitor.run_id,
    status: monitor.monitoring_evaluation.status,
    monitoring_healthy: monitorHealthy(monitor),
    rollback_required: monitor.monitoring_evaluation.rollback_required,
    source_rollout_receipt: monitor.source_rollout_receipt,
    source_rollout_run_id: monitor.source_rollout_run_id,
    source_rollout_policy_change_id: monitor.source_rollout_policy_change_id,
    monitoring_suite_receipt: monitor.monitoring_suite_receipt,
    monitoring_suite_run_id: monitor.monitoring_suite_run_id,
    scenario_count: monitor.totals.scenario_count,
    passing_scenario_count: monitor.totals.passing_scenario_count,
    failing_scenario_count: monitor.totals.failing_scenario_count,
    total_exact_model_token_delta: monitor.totals.total_exact_model_token_delta,
    total_wall_duration_delta_ms: monitor.totals.total_wall_duration_delta_ms,
    min_quality_score: monitor.totals.min_quality_score,
    min_accuracy_score: monitor.totals.min_accuracy_score,
    max_residual_issue_count: monitor.totals.max_residual_issue_count,
    max_regression_count: monitor.totals.max_regression_count,
  };
}

function trendDeltas(baseline, previous, latest) {
  return {
    baseline_to_latest: pointDelta(baseline, latest),
    previous_to_latest: pointDelta(previous, latest),
  };
}

function pointDelta(left, right) {
  if (!left || !right) return null;
  return {
    monitor_time_delta_ms: timestampDelta(left.generated_at, right.generated_at),
    scenario_count_delta: right.scenario_count - left.scenario_count,
    passing_scenario_count_delta: right.passing_scenario_count - left.passing_scenario_count,
    failing_scenario_count_delta: right.failing_scenario_count - left.failing_scenario_count,
    total_exact_model_token_delta_change: round(right.total_exact_model_token_delta - left.total_exact_model_token_delta),
    total_wall_duration_delta_ms_change: round(right.total_wall_duration_delta_ms - left.total_wall_duration_delta_ms),
    min_quality_score_change: round(right.min_quality_score - left.min_quality_score),
    min_accuracy_score_change: round(right.min_accuracy_score - left.min_accuracy_score),
    max_residual_issue_count_delta: right.max_residual_issue_count - left.max_residual_issue_count,
    max_regression_count_delta: right.max_regression_count - left.max_regression_count,
  };
}

function buildScenarioTrends(monitors) {
  const scenarioIds = [...new Set(monitors.flatMap((monitor) => monitor.scenarios.map((scenario) => scenario.id)).filter(Boolean))].sort();
  return scenarioIds.map((id) => {
    const observations = monitors
      .map((monitor) => {
        const scenario = monitor.scenarios.find((item) => item.id === id);
        if (!scenario) return null;
        return {
          monitor_run_id: monitor.run_id,
          monitor_receipt: monitor.receipt_path,
          generated_at: monitor.generated_at,
          passed: scenario.passed,
          recommended_candidate_id: scenario.recommended_candidate_id,
          winner_id: scenario.winner.id,
          exact_model_token_delta: scenario.exact_model_token_delta,
          wall_duration_delta_ms: scenario.wall_duration_delta_ms,
          quality_score: scenario.winner.quality_score,
          accuracy_score: scenario.winner.accuracy_score,
          residual_issue_count: scenario.winner.residual_issue_count,
          regression_count: scenario.winner.regression_count,
          failure_reasons: scenario.failure_reasons,
        };
      })
      .filter(Boolean);
    const baseline = observations[0] || null;
    const latest = observations.at(-1) || null;
    return {
      id,
      task_class: firstString(monitors.flatMap((monitor) => monitor.scenarios.filter((scenario) => scenario.id === id).map((scenario) => scenario.task_class))),
      observation_count: observations.length,
      comparable: observations.length === monitors.length && monitors.length > 1,
      latest_passed: latest?.passed === true,
      new_failure: Boolean(baseline && latest && baseline.passed === true && latest.passed !== true),
      recommendation_stable: observations.length > 1 && new Set(observations.map((row) => row.recommended_candidate_id)).size === 1,
      deltas: scenarioObservationDelta(baseline, latest),
      observations,
    };
  });
}

function scenarioObservationDelta(baseline, latest) {
  if (!baseline || !latest) return null;
  return {
    exact_model_token_delta_change: round(latest.exact_model_token_delta - baseline.exact_model_token_delta),
    wall_duration_delta_ms_change: round(latest.wall_duration_delta_ms - baseline.wall_duration_delta_ms),
    quality_score_change: round(latest.quality_score - baseline.quality_score),
    accuracy_score_change: round(latest.accuracy_score - baseline.accuracy_score),
    residual_issue_count_delta: latest.residual_issue_count - baseline.residual_issue_count,
    regression_count_delta: latest.regression_count - baseline.regression_count,
  };
}

function buildStabilitySummary(monitors, scenarioTrends) {
  const monitorStatusTransitions = [];
  for (let index = 1; index < monitors.length; index += 1) {
    const previous = monitors[index - 1];
    const current = monitors[index];
    if (previous.monitoring_evaluation.status !== current.monitoring_evaluation.status) {
      monitorStatusTransitions.push({
        from_run_id: previous.run_id,
        to_run_id: current.run_id,
        from_status: previous.monitoring_evaluation.status,
        to_status: current.monitoring_evaluation.status,
      });
    }
  }
  const scenarioStatusChanges = scenarioTrends
    .filter((trend) => trend.observations.length > 1)
    .flatMap((trend) => {
      const changes = [];
      for (let index = 1; index < trend.observations.length; index += 1) {
        const previous = trend.observations[index - 1];
        const current = trend.observations[index];
        if (previous.passed !== current.passed) {
          changes.push({
            scenario_id: trend.id,
            from_run_id: previous.monitor_run_id,
            to_run_id: current.monitor_run_id,
            from_passed: previous.passed,
            to_passed: current.passed,
          });
        }
      }
      return changes;
    });
  const recommendationChanges = scenarioTrends
    .filter((trend) => trend.observations.length > 1 && trend.recommendation_stable !== true)
    .map((trend) => trend.id)
    .sort();
  return {
    monitor_status_comparisons: Math.max(0, monitors.length - 1),
    monitor_status_changes: monitorStatusTransitions.length,
    monitor_status_change_rate: ratio(monitorStatusTransitions.length, Math.max(0, monitors.length - 1)),
    scenario_status_comparisons: scenarioTrends.reduce((sum, trend) => sum + Math.max(0, trend.observations.length - 1), 0),
    scenario_status_changes: scenarioStatusChanges.length,
    scenario_status_change_rate: ratio(scenarioStatusChanges.length, scenarioTrends.reduce((sum, trend) => sum + Math.max(0, trend.observations.length - 1), 0)),
    recommendation_change_scenarios: recommendationChanges,
    monitor_status_transitions: monitorStatusTransitions,
    scenario_status_transitions: scenarioStatusChanges,
    new_failure_scenarios: scenarioTrends.filter((trend) => trend.new_failure).map((trend) => trend.id).sort(),
    persistent_failure_scenarios: scenarioTrends.filter((trend) => trend.observations.length > 1 && trend.observations.every((row) => row.passed !== true)).map((trend) => trend.id).sort(),
  };
}

function buildDriftEvaluation(monitors, totals, thresholds, baseline, latest, deltas, scenarioTrends) {
  const repeatedMonitoringReady = totals.monitor_count >= 2;
  const allMonitorsHealthy = totals.healthy_monitor_count === totals.monitor_count && totals.monitor_count > 0;
  const latestHealthy = latest?.monitoring_healthy === true;
  const noRollbackRequired = totals.rollback_required_count === 0;
  const sameSourceRollout = totals.source_rollout_count === 1 && Boolean(monitors[0]?.source_rollout_receipt || monitors[0]?.source_rollout_run_id);
  const uniqueMonitoringSuites = totals.unique_monitoring_suite_count === totals.monitor_count && totals.monitor_count > 0;
  const allSuitesFresh = totals.fresh_monitoring_suite_count === totals.monitor_count && totals.monitor_count > 0;
  const latestNoFailingScenarios = latest?.failing_scenario_count === 0;
  const newFailingScenarioCount = scenarioTrends.filter((trend) => trend.new_failure).length;
  const noNewFailingScenarios = newFailingScenarioCount <= thresholds.max_new_failing_scenarios;
  const baselineDelta = deltas.baseline_to_latest;
  const qualityDrop = baseline && latest ? Math.max(0, round(baseline.min_quality_score - latest.min_quality_score)) : 0;
  const accuracyDrop = baseline && latest ? Math.max(0, round(baseline.min_accuracy_score - latest.min_accuracy_score)) : 0;
  const exactTokenDeltaDrop = baseline && latest ? Math.max(0, round(baseline.total_exact_model_token_delta - latest.total_exact_model_token_delta)) : 0;
  const wallDurationDeltaDrop = baseline && latest ? Math.max(0, round(baseline.total_wall_duration_delta_ms - latest.total_wall_duration_delta_ms)) : 0;
  const qualityDropPassed = repeatedMonitoringReady && qualityDrop <= thresholds.max_quality_drop;
  const accuracyDropPassed = repeatedMonitoringReady && accuracyDrop <= thresholds.max_accuracy_drop;
  const exactTokenDeltaDropPassed = repeatedMonitoringReady && exactTokenDeltaDrop <= thresholds.max_exact_model_token_delta_drop;
  const wallDurationDeltaDropPassed = repeatedMonitoringReady && wallDurationDeltaDrop <= thresholds.max_wall_duration_delta_ms_drop;
  const scenarioCoverageStable = repeatedMonitoringReady && baselineDelta?.scenario_count_delta === 0;
  const scenariosComparable = repeatedMonitoringReady && scenarioTrends.length > 0 && scenarioTrends.every((trend) => trend.comparable);
  const trendHealthy = repeatedMonitoringReady
    && allMonitorsHealthy
    && latestHealthy
    && noRollbackRequired
    && sameSourceRollout
    && uniqueMonitoringSuites
    && allSuitesFresh
    && latestNoFailingScenarios
    && noNewFailingScenarios
    && qualityDropPassed
    && accuracyDropPassed
    && exactTokenDeltaDropPassed
    && wallDurationDeltaDropPassed
    && scenarioCoverageStable
    && scenariosComparable;
  const status = trendHealthy ? 'trend-healthy' : (latest?.rollback_required ? 'rollback-required' : 'drift-attention');
  return {
    status,
    trend_healthy: trendHealthy,
    repeated_monitoring_ready: repeatedMonitoringReady,
    all_monitors_healthy: allMonitorsHealthy,
    latest_healthy: latestHealthy,
    no_rollback_required: noRollbackRequired,
    same_source_rollout: sameSourceRollout,
    unique_monitoring_suites: uniqueMonitoringSuites,
    all_suites_fresh: allSuitesFresh,
    latest_no_failing_scenarios: latestNoFailingScenarios,
    new_failing_scenario_count: newFailingScenarioCount,
    no_new_failing_scenarios: noNewFailingScenarios,
    quality_drop: qualityDrop,
    quality_drop_passed: qualityDropPassed,
    accuracy_drop: accuracyDrop,
    accuracy_drop_passed: accuracyDropPassed,
    exact_model_token_delta_drop: exactTokenDeltaDrop,
    exact_model_token_delta_drop_passed: exactTokenDeltaDropPassed,
    wall_duration_delta_ms_drop: wallDurationDeltaDrop,
    wall_duration_delta_ms_drop_passed: wallDurationDeltaDropPassed,
    scenario_coverage_stable: scenarioCoverageStable,
    scenarios_comparable: scenariosComparable,
    reason: driftReason({
      trendHealthy,
      repeatedMonitoringReady,
      allMonitorsHealthy,
      latestHealthy,
      noRollbackRequired,
      sameSourceRollout,
      uniqueMonitoringSuites,
      allSuitesFresh,
      latestNoFailingScenarios,
      noNewFailingScenarios,
      qualityDropPassed,
      accuracyDropPassed,
      exactTokenDeltaDropPassed,
      wallDurationDeltaDropPassed,
      scenarioCoverageStable,
      scenariosComparable,
    }),
  };
}

function driftReason(state) {
  if (state.trendHealthy) return 'Repeated post-default monitor receipts are healthy, comparable, fresh, and stable within drift thresholds.';
  if (!state.repeatedMonitoringReady) return 'At least two distinct post-default monitor receipts are required before trend health can pass.';
  if (!state.allMonitorsHealthy || !state.latestHealthy || !state.noRollbackRequired) return 'One or more monitor receipts require rollback or did not pass post-default monitoring.';
  if (!state.sameSourceRollout) return 'Monitor receipts must share one default rollout lineage before drift can be compared.';
  if (!state.uniqueMonitoringSuites) return 'Repeated trend proof requires distinct monitoring suite receipts for each monitor.';
  if (!state.allSuitesFresh) return 'Every monitor in the trend must use a fresh post-default monitoring suite.';
  if (!state.latestNoFailingScenarios || !state.noNewFailingScenarios) return 'The latest monitor introduced failing scenarios.';
  if (!state.qualityDropPassed || !state.accuracyDropPassed) return 'Quality or accuracy dropped beyond the configured trend threshold.';
  if (!state.exactTokenDeltaDropPassed || !state.wallDurationDeltaDropPassed) return 'Exact-token or wall-time improvement dropped beyond the configured trend threshold.';
  if (!state.scenarioCoverageStable || !state.scenariosComparable) return 'Scenario coverage changed, so this trend cannot prove like-for-like post-default stability.';
  return 'Routing monitor trend did not pass.';
}

function trendGuardrails(evaluation, scenarioTrends) {
  const guardrails = [];
  if (!evaluation.repeated_monitoring_ready) guardrails.push('Collect at least two distinct post-default monitor receipts before claiming routing trend health.');
  if (!evaluation.same_source_rollout) guardrails.push('Do not compare monitor receipts from different default rollout lineages.');
  if (!evaluation.unique_monitoring_suites) guardrails.push('Do not reuse a monitoring suite receipt as repeated post-default evidence.');
  if (!evaluation.all_monitors_healthy || !evaluation.no_rollback_required) guardrails.push('Treat any unhealthy monitor in the trend as rollback attention until regenerated healthy.');
  if (!evaluation.scenarios_comparable) guardrails.push('Keep scenario ids stable across repeated monitor runs so drift can be compared like-for-like.');
  for (const trend of scenarioTrends.filter((item) => item.new_failure)) {
    guardrails.push(`Scenario ${trend.id} became failing in the latest monitor and requires review before further routing changes.`);
  }
  guardrails.push('Regenerate this trend after every model, prompt, routing policy, tool, workflow, or runtime default-change update.');
  return guardrails;
}

function trendNextActions(evaluation) {
  if (evaluation.trend_healthy) {
    return ['Attach this monitor trend to the routing handoff record and rerun it after the next model, prompt, policy, tool, or workflow change.'];
  }
  if (!evaluation.repeated_monitoring_ready) {
    return ['Collect a second fresh post-default monitor receipt from the same default rollout lineage, then regenerate this trend.'];
  }
  if (!evaluation.same_source_rollout || !evaluation.unique_monitoring_suites) {
    return ['Regenerate monitor receipts with the same source rollout and distinct fresh monitoring suites.'];
  }
  return ['Hold or roll back routing changes until repeated post-default monitor drift passes all thresholds.'];
}

function compareMonitorOrder(left, right) {
  const dateCompare = left.generated_at.localeCompare(right.generated_at);
  if (dateCompare !== 0) return dateCompare;
  const runCompare = left.run_id.localeCompare(right.run_id);
  if (runCompare !== 0) return runCompare;
  return left.receipt_path.localeCompare(right.receipt_path);
}

function monitorHealthy(monitor) {
  return monitor.monitoring_evaluation.status === 'monitoring-healthy'
    && monitor.monitoring_evaluation.monitoring_healthy === true
    && monitor.monitoring_evaluation.rollback_required === false
    && monitor.totals.failing_scenario_count === 0;
}

function sourceRolloutKey(monitor) {
  return stringValue(monitor.source_rollout_receipt) || stringValue(monitor.source_rollout_run_id);
}

function monitoringSuiteKey(monitor) {
  return stringValue(monitor.monitoring_suite_receipt) || stringValue(monitor.monitoring_suite_run_id);
}

function monitorIdentity(monitor) {
  return stringValue(monitor.receipt_path) || stringValue(monitor.run_id);
}

function defaultRunId(monitors) {
  const first = monitors[0]?.run_id || '';
  const last = monitors.at(-1)?.run_id || '';
  if (first && last && first !== last) return `${first}:trend:${last}`;
  if (last) return `${last}:trend`;
  return 'routing-monitor-trends';
}

function emptyMonitorSummary() {
  return monitorSummary({});
}

function isRoutingMonitorReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-monitor' && typeof value.schema_version === 'string';
}

function arrayValue(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function firstString(values) {
  return values.map(stringValue).find(Boolean) || '';
}

function timestampDelta(left, right) {
  const leftMs = Date.parse(left);
  const rightMs = Date.parse(right);
  if (!Number.isFinite(leftMs) || !Number.isFinite(rightMs)) return 0;
  return Math.max(0, rightMs - leftMs);
}

function ratio(part, total) {
  return total > 0 ? round(part / total) : 0;
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
