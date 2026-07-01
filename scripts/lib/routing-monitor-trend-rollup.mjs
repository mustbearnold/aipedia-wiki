import { validateRoutingMonitorTrendsReceipt } from './routing-monitor-trends.mjs';

export const ROUTING_MONITOR_TREND_ROLLUP_SCHEMA_VERSION = 'aipedia.agent-routing-monitor-trend-rollup.v1';

export const ROUTING_MONITOR_TREND_ROLLUP_DEFAULT_THRESHOLDS = {
  min_trend_count: 2,
  max_quality_drop: 0.03,
  max_accuracy_drop: 0.03,
  max_exact_model_token_delta_drop: 1000,
  max_wall_duration_delta_ms_drop: 1000,
  max_new_failing_scenarios: 0,
};

export function buildRoutingMonitorTrendRollup(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-input-invalid', 'Input must be an object.')],
    };
  }

  const thresholds = normalizeThresholds(input.thresholds, issues);
  const trends = normalizeTrends(input, issues);
  if (issues.length) return { receipt: null, issues };

  const sortedTrends = trends.toSorted(compareTrendOrder);
  const totals = rollupTotals(sortedTrends);
  const baseline = trendPoint(sortedTrends[0] || null);
  const latest = trendPoint(sortedTrends.at(-1) || null);
  const previous = trendPoint(sortedTrends.length > 1 ? sortedTrends.at(-2) : null);
  const deltas = rollupDeltas(baseline, previous, latest);
  const scenarioRollups = buildScenarioRollups(sortedTrends);
  const stabilitySummary = buildStabilitySummary(sortedTrends, scenarioRollups);
  const rollupEvaluation = buildRollupEvaluation(sortedTrends, totals, thresholds, baseline, latest, deltas, scenarioRollups);
  const guardrails = rollupGuardrails(rollupEvaluation, scenarioRollups);
  const nextActions = rollupNextActions(rollupEvaluation);
  const source = options.source || input.source || sortedTrends.map((trend) => trend.receipt_path).filter(Boolean).join(' + ');

  return {
    receipt: {
      ok: rollupEvaluation.rollup_ready,
      mode: 'agent-routing-monitor-trend-rollup',
      schema_version: ROUTING_MONITOR_TREND_ROLLUP_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source,
      goal_id: stringValue(input.goal_id) || firstString(sortedTrends.map((trend) => trend.goal_id)),
      run_id: stringValue(input.run_id) || defaultRunId(sortedTrends),
      workflow: stringValue(input.workflow) || firstString(sortedTrends.map((trend) => trend.workflow)),
      rollup_task: stringValue(input.rollup_task || input.task) || 'Longer-window routing monitor trend rollup.',
      thresholds,
      trend_receipts: sortedTrends,
      totals,
      baseline,
      previous,
      latest,
      deltas,
      scenario_rollups: scenarioRollups,
      stability_summary: stabilitySummary,
      rollup_evaluation: rollupEvaluation,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingMonitorTrendRollupReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-monitor-trend-rollup'],
    ['schema_version', ROUTING_MONITOR_TREND_ROLLUP_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', `${field} must be ${expected}.`));
    }
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'rollup_task']) {
    if (typeof value[field] !== 'string') issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'rollup_task']) {
    if (!stringValue(value[field])) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.thresholds)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', 'thresholds must be an object.'));
  if (!Array.isArray(value.trend_receipts)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', 'trend_receipts must be an array.'));
  if (!isObject(value.totals)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.baseline)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-baseline-invalid', 'baseline must be an object.'));
  if (value.previous != null && !isObject(value.previous)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-previous-invalid', 'previous must be an object or null.'));
  if (!isObject(value.latest)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-latest-invalid', 'latest must be an object.'));
  if (!isObject(value.deltas)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-delta-mismatch', 'deltas must be an object.'));
  if (!Array.isArray(value.scenario_rollups)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-scenario-invalid', 'scenario_rollups must be an array.'));
  if (!isObject(value.stability_summary)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-stability-mismatch', 'stability_summary must be an object.'));
  if (!isObject(value.rollup_evaluation)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-evaluation-mismatch', 'rollup_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingMonitorTrendRollup({
    thresholds: value.thresholds,
    trend_receipts: value.trend_receipts,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    rollup_task: value.rollup_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['thresholds', 'trend_receipts', 'totals', 'baseline', 'previous', 'latest', 'deltas', 'scenario_rollups', 'stability_summary', 'rollup_evaluation', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-mismatch', `${field} must match canonical routing monitor trend rollup computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-mismatch', 'ok must match canonical routing monitor trend rollup computation.'));
  }
  return issues;
}

export function routingMonitorTrendRollupIssue(code, message) {
  return { code, message };
}

function normalizeTrends(input, issues) {
  const rawTrends = []
    .concat(arrayValue(input.trend_receipts))
    .concat(arrayValue(input.trends))
    .concat(arrayValue(input.receipts))
    .concat(arrayValue(input.trend))
    .concat(arrayValue(input.receipt))
    .filter((item) => item != null);

  if (rawTrends.length === 0) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', 'At least one routing monitor trend receipt or trend summary is required.'));
    return [];
  }

  return rawTrends.map((trend, index) => normalizeTrend(trend, index, issues));
}

function normalizeTrend(value, index, issues) {
  if (isRoutingMonitorTrendsReceipt(value)) {
    const receiptIssues = validateRoutingMonitorTrendsReceipt(value);
    for (const item of receiptIssues) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `trend[${index}]: ${item.message}`));
    }
    return receiptIssues.length ? emptyTrendSummary() : trendFromReceipt(value);
  }
  if (isObject(value)) return trendFromSummary(value, index, issues);
  issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `trend[${index}] must be a routing monitor trend receipt or summary.`));
  return emptyTrendSummary();
}

function isRoutingMonitorTrendsReceipt(value) {
  return isObject(value)
    && value.schema_version === 'aipedia.agent-routing-monitor-trends.v1'
    && value.mode === 'agent-routing-monitor-trends'
    && Array.isArray(value.monitor_receipts)
    && isObject(value.drift_evaluation);
}

function trendFromReceipt(receipt) {
  return trendSummary({
    receipt_path: receipt.receipt_path,
    schema_version: receipt.schema_version,
    generated_at: receipt.generated_at,
    source: receipt.source,
    goal_id: receipt.goal_id,
    run_id: receipt.run_id,
    workflow: receipt.workflow,
    trend_task: receipt.trend_task,
    ok: receipt.ok,
    drift_evaluation: receipt.drift_evaluation,
    totals: receipt.totals,
    latest: receipt.latest,
    scenario_trends: receipt.scenario_trends,
  });
}

function trendFromSummary(summary, index, issues) {
  const normalized = trendSummary(summary);
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'trend_task', 'status']) {
    if (!normalized[field]) issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `trend[${index}].${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-monitor-trends.v1') {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `trend[${index}].schema_version must be aipedia.agent-routing-monitor-trends.v1.`));
  }
  if (!normalized.latest.source_rollout_receipt && !normalized.latest.source_rollout_run_id && !normalized.latest.source_rollout_policy_change_id) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `trend[${index}] must include latest source rollout lineage.`));
  }
  return normalized;
}

function trendSummary(value) {
  const evaluation = value?.drift_evaluation || {};
  const latest = value?.latest || {};
  return {
    receipt_path: stringValue(value?.receipt_path),
    schema_version: stringValue(value?.schema_version),
    generated_at: stringValue(value?.generated_at),
    source: stringValue(value?.source),
    goal_id: stringValue(value?.goal_id),
    run_id: stringValue(value?.run_id),
    workflow: stringValue(value?.workflow),
    trend_task: stringValue(value?.trend_task),
    ok: value?.ok === true,
    status: stringValue(value?.status || evaluation.status),
    trend_healthy: value?.trend_healthy === true || evaluation.trend_healthy === true,
    repeated_monitoring_ready: value?.repeated_monitoring_ready === true || evaluation.repeated_monitoring_ready === true,
    all_trends_healthy: value?.all_trends_healthy === true,
    same_source_rollout: value?.same_source_rollout === true || evaluation.same_source_rollout === true,
    unique_monitoring_suites: value?.unique_monitoring_suites === true || evaluation.unique_monitoring_suites === true,
    all_suites_fresh: value?.all_suites_fresh === true || evaluation.all_suites_fresh === true,
    latest_no_failing_scenarios: value?.latest_no_failing_scenarios === true || evaluation.latest_no_failing_scenarios === true,
    scenario_coverage_stable: value?.scenario_coverage_stable === true || evaluation.scenario_coverage_stable === true,
    scenarios_comparable: value?.scenarios_comparable === true || evaluation.scenarios_comparable === true,
    monitor_count: nonNegativeInteger(value?.monitor_count ?? value?.totals?.monitor_count),
    healthy_monitor_count: nonNegativeInteger(value?.healthy_monitor_count ?? value?.totals?.healthy_monitor_count),
    unique_monitoring_suite_count: nonNegativeInteger(value?.unique_monitoring_suite_count ?? value?.totals?.unique_monitoring_suite_count),
    source_rollout_count: nonNegativeInteger(value?.source_rollout_count ?? value?.totals?.source_rollout_count),
    latest: trendLatestPoint(latest),
    scenario_points: Array.isArray(value?.scenario_points)
      ? value.scenario_points.map(scenarioPointSummary).sort((left, right) => left.id.localeCompare(right.id))
      : scenarioPointsFromTrendReceipt(value?.scenario_trends),
  };
}

function trendLatestPoint(value) {
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

function scenarioPointsFromTrendReceipt(scenarioTrends) {
  if (!Array.isArray(scenarioTrends)) return [];
  return scenarioTrends.map((trend) => {
    const latestObservation = Array.isArray(trend.observations) ? trend.observations.at(-1) : null;
    return scenarioPointSummary({
      id: trend.id,
      task_class: trend.task_class,
      passed: trend.latest_passed,
      recommended_candidate_id: latestObservation?.recommended_candidate_id,
      winner_id: latestObservation?.winner_id,
      exact_model_token_delta: latestObservation?.exact_model_token_delta,
      wall_duration_delta_ms: latestObservation?.wall_duration_delta_ms,
      quality_score: latestObservation?.quality_score,
      accuracy_score: latestObservation?.accuracy_score,
      residual_issue_count: latestObservation?.residual_issue_count,
      regression_count: latestObservation?.regression_count,
      recommendation_stable: trend.recommendation_stable,
    });
  }).sort((left, right) => left.id.localeCompare(right.id));
}

function scenarioPointSummary(value) {
  return {
    id: stringValue(value?.id),
    task_class: stringValue(value?.task_class),
    passed: value?.passed === true,
    recommended_candidate_id: stringValue(value?.recommended_candidate_id),
    winner_id: stringValue(value?.winner_id),
    exact_model_token_delta: numberValue(value?.exact_model_token_delta),
    wall_duration_delta_ms: numberValue(value?.wall_duration_delta_ms),
    quality_score: numberValue(value?.quality_score),
    accuracy_score: numberValue(value?.accuracy_score),
    residual_issue_count: nonNegativeInteger(value?.residual_issue_count),
    regression_count: nonNegativeInteger(value?.regression_count),
    recommendation_stable: value?.recommendation_stable === true,
  };
}

function emptyTrendSummary() {
  return trendSummary({});
}

function normalizeThresholds(value, issues) {
  const thresholds = { ...ROUTING_MONITOR_TREND_ROLLUP_DEFAULT_THRESHOLDS };
  if (value == null) return thresholds;
  if (!isObject(value)) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', 'thresholds must be an object when supplied.'));
    return thresholds;
  }
  if (value.min_trend_count != null) {
    if (!Number.isInteger(value.min_trend_count) || value.min_trend_count < 1) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', 'thresholds.min_trend_count must be a positive integer.'));
    } else {
      thresholds.min_trend_count = value.min_trend_count;
    }
  }
  for (const field of ['max_quality_drop', 'max_accuracy_drop']) {
    if (value[field] == null) continue;
    if (!isRatio(value[field])) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', `thresholds.${field} must be between 0 and 1.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  for (const field of ['max_exact_model_token_delta_drop', 'max_wall_duration_delta_ms_drop']) {
    if (value[field] == null) continue;
    if (typeof value[field] !== 'number' || !Number.isFinite(value[field]) || value[field] < 0) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', `thresholds.${field} must be a non-negative number.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  if (value.max_new_failing_scenarios != null) {
    if (!Number.isInteger(value.max_new_failing_scenarios) || value.max_new_failing_scenarios < 0) {
      issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-threshold-invalid', 'thresholds.max_new_failing_scenarios must be a non-negative integer.'));
    } else {
      thresholds.max_new_failing_scenarios = value.max_new_failing_scenarios;
    }
  }
  return thresholds;
}

function rollupTotals(trends) {
  const receiptKeys = trends.map(trendIdentity).filter(Boolean);
  const runIds = trends.map((trend) => trend.run_id).filter(Boolean);
  const rolloutKeys = trends.map((trend) => sourceRolloutKey(trend.latest)).filter(Boolean);
  const policyChangeIds = trends.map((trend) => trend.latest.source_rollout_policy_change_id).filter(Boolean);
  return {
    trend_count: trends.length,
    healthy_trend_count: trends.filter((trend) => trend.trend_healthy).length,
    attention_trend_count: trends.filter((trend) => !trend.trend_healthy).length,
    unique_trend_receipt_count: new Set(receiptKeys).size,
    unique_trend_run_id_count: new Set(runIds).size,
    source_rollout_count: new Set(rolloutKeys).size,
    source_rollout_policy_change_count: new Set(policyChangeIds).size,
    monitor_window_count: trends.reduce((sum, trend) => sum + trend.monitor_count, 0),
    scenario_window_observation_count: trends.reduce((sum, trend) => sum + trend.scenario_points.length, 0),
    compared_trend_window_count: Math.max(0, trends.length - 1),
    latest_failing_scenario_count: trends.at(-1)?.latest.failing_scenario_count || 0,
  };
}

function trendPoint(trend) {
  if (!trend) return null;
  return {
    receipt_path: trend.receipt_path,
    generated_at: trend.generated_at,
    run_id: trend.run_id,
    status: trend.status,
    trend_healthy: trend.trend_healthy,
    monitor_count: trend.monitor_count,
    healthy_monitor_count: trend.healthy_monitor_count,
    source_rollout_receipt: trend.latest.source_rollout_receipt,
    source_rollout_run_id: trend.latest.source_rollout_run_id,
    source_rollout_policy_change_id: trend.latest.source_rollout_policy_change_id,
    latest_monitor_receipt: trend.latest.receipt_path,
    latest_monitor_run_id: trend.latest.run_id,
    latest_monitor_status: trend.latest.status,
    scenario_count: trend.latest.scenario_count,
    passing_scenario_count: trend.latest.passing_scenario_count,
    failing_scenario_count: trend.latest.failing_scenario_count,
    total_exact_model_token_delta: trend.latest.total_exact_model_token_delta,
    total_wall_duration_delta_ms: trend.latest.total_wall_duration_delta_ms,
    min_quality_score: trend.latest.min_quality_score,
    min_accuracy_score: trend.latest.min_accuracy_score,
    max_residual_issue_count: trend.latest.max_residual_issue_count,
    max_regression_count: trend.latest.max_regression_count,
  };
}

function rollupDeltas(baseline, previous, latest) {
  return {
    baseline_to_latest: pointDelta(baseline, latest),
    previous_to_latest: pointDelta(previous, latest),
  };
}

function pointDelta(left, right) {
  if (!left || !right) return null;
  return {
    trend_time_delta_ms: timestampDelta(left.generated_at, right.generated_at),
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

function buildScenarioRollups(trends) {
  const scenarioIds = [...new Set(trends.flatMap((trend) => trend.scenario_points.map((scenario) => scenario.id)).filter(Boolean))].sort();
  return scenarioIds.map((id) => {
    const observations = trends
      .map((trend) => {
        const scenario = trend.scenario_points.find((item) => item.id === id);
        if (!scenario) return null;
        return {
          trend_run_id: trend.run_id,
          trend_receipt: trend.receipt_path,
          generated_at: trend.generated_at,
          passed: scenario.passed,
          recommended_candidate_id: scenario.recommended_candidate_id,
          winner_id: scenario.winner_id,
          exact_model_token_delta: scenario.exact_model_token_delta,
          wall_duration_delta_ms: scenario.wall_duration_delta_ms,
          quality_score: scenario.quality_score,
          accuracy_score: scenario.accuracy_score,
          residual_issue_count: scenario.residual_issue_count,
          regression_count: scenario.regression_count,
        };
      })
      .filter(Boolean);
    const baseline = observations[0] || null;
    const latest = observations.at(-1) || null;
    return {
      id,
      task_class: firstString(trends.flatMap((trend) => trend.scenario_points.filter((scenario) => scenario.id === id).map((scenario) => scenario.task_class))),
      window_count: observations.length,
      comparable: observations.length === trends.length && trends.length >= 2,
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

function buildStabilitySummary(trends, scenarioRollups) {
  const trendStatusTransitions = [];
  for (let index = 1; index < trends.length; index += 1) {
    const previous = trends[index - 1];
    const current = trends[index];
    if (previous.status !== current.status || previous.trend_healthy !== current.trend_healthy) {
      trendStatusTransitions.push({
        from_run_id: previous.run_id,
        to_run_id: current.run_id,
        from_status: previous.status,
        to_status: current.status,
        from_healthy: previous.trend_healthy,
        to_healthy: current.trend_healthy,
      });
    }
  }
  const scenarioStatusTransitions = scenarioRollups
    .filter((rollup) => rollup.observations.length > 1)
    .flatMap((rollup) => {
      const changes = [];
      for (let index = 1; index < rollup.observations.length; index += 1) {
        const previous = rollup.observations[index - 1];
        const current = rollup.observations[index];
        if (previous.passed !== current.passed) {
          changes.push({
            scenario_id: rollup.id,
            from_run_id: previous.trend_run_id,
            to_run_id: current.trend_run_id,
            from_passed: previous.passed,
            to_passed: current.passed,
          });
        }
      }
      return changes;
    });
  return {
    trend_status_comparisons: Math.max(0, trends.length - 1),
    trend_status_changes: trendStatusTransitions.length,
    trend_status_change_rate: ratio(trendStatusTransitions.length, Math.max(0, trends.length - 1)),
    scenario_status_comparisons: scenarioRollups.reduce((sum, rollup) => sum + Math.max(0, rollup.observations.length - 1), 0),
    scenario_status_changes: scenarioStatusTransitions.length,
    scenario_status_change_rate: ratio(scenarioStatusTransitions.length, scenarioRollups.reduce((sum, rollup) => sum + Math.max(0, rollup.observations.length - 1), 0)),
    recommendation_change_scenarios: scenarioRollups.filter((rollup) => rollup.observations.length > 1 && rollup.recommendation_stable !== true).map((rollup) => rollup.id).sort(),
    new_failure_scenarios: scenarioRollups.filter((rollup) => rollup.new_failure).map((rollup) => rollup.id).sort(),
    persistent_failure_scenarios: scenarioRollups.filter((rollup) => rollup.observations.length > 1 && rollup.observations.every((row) => row.passed !== true)).map((rollup) => rollup.id).sort(),
    trend_status_transitions: trendStatusTransitions,
    scenario_status_transitions: scenarioStatusTransitions,
  };
}

function buildRollupEvaluation(trends, totals, thresholds, baseline, latest, deltas, scenarioRollups) {
  const longWindowReady = totals.trend_count >= thresholds.min_trend_count;
  const allTrendsHealthy = totals.healthy_trend_count === totals.trend_count && totals.trend_count > 0;
  const latestTrendHealthy = latest?.trend_healthy === true;
  const uniqueTrendReceipts = totals.unique_trend_receipt_count === totals.trend_count && trends.every((trend) => trend.receipt_path);
  const uniqueTrendRunIds = totals.unique_trend_run_id_count === totals.trend_count && trends.every((trend) => trend.run_id);
  const latestNoFailingScenarios = latest?.failing_scenario_count === 0;
  const baselineDelta = deltas.baseline_to_latest;
  const scenarioCoverageStable = longWindowReady && baselineDelta?.scenario_count_delta === 0;
  const scenariosComparable = longWindowReady && scenarioRollups.length > 0 && scenarioRollups.every((rollup) => rollup.comparable);
  const newFailingScenarioCount = scenarioRollups.filter((rollup) => rollup.new_failure).length;
  const noNewFailingScenarios = newFailingScenarioCount <= thresholds.max_new_failing_scenarios;
  const qualityDrop = baseline && latest ? Math.max(0, round(baseline.min_quality_score - latest.min_quality_score)) : 0;
  const accuracyDrop = baseline && latest ? Math.max(0, round(baseline.min_accuracy_score - latest.min_accuracy_score)) : 0;
  const exactTokenDeltaDrop = baseline && latest ? Math.max(0, round(baseline.total_exact_model_token_delta - latest.total_exact_model_token_delta)) : 0;
  const wallDurationDeltaDrop = baseline && latest ? Math.max(0, round(baseline.total_wall_duration_delta_ms - latest.total_wall_duration_delta_ms)) : 0;
  const qualityDropPassed = longWindowReady && qualityDrop <= thresholds.max_quality_drop;
  const accuracyDropPassed = longWindowReady && accuracyDrop <= thresholds.max_accuracy_drop;
  const exactTokenDeltaDropPassed = longWindowReady && exactTokenDeltaDrop <= thresholds.max_exact_model_token_delta_drop;
  const wallDurationDeltaDropPassed = longWindowReady && wallDurationDeltaDrop <= thresholds.max_wall_duration_delta_ms_drop;
  const rollupReady = longWindowReady
    && allTrendsHealthy
    && latestTrendHealthy
    && uniqueTrendReceipts
    && uniqueTrendRunIds
    && latestNoFailingScenarios
    && scenarioCoverageStable
    && scenariosComparable
    && noNewFailingScenarios
    && qualityDropPassed
    && accuracyDropPassed
    && exactTokenDeltaDropPassed
    && wallDurationDeltaDropPassed;
  const status = rollupReady
    ? 'rollup-ready'
    : (latest?.status === 'rollback-required' || latestTrendHealthy === false ? 'rollback-required' : 'rollup-attention');
  return {
    status,
    rollup_ready: rollupReady,
    long_window_ready: longWindowReady,
    all_trends_healthy: allTrendsHealthy,
    latest_trend_healthy: latestTrendHealthy,
    unique_trend_receipts: uniqueTrendReceipts,
    unique_trend_run_ids: uniqueTrendRunIds,
    latest_no_failing_scenarios: latestNoFailingScenarios,
    scenario_coverage_stable: scenarioCoverageStable,
    scenarios_comparable: scenariosComparable,
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
    reason: rollupReason({
      rollupReady,
      longWindowReady,
      allTrendsHealthy,
      latestTrendHealthy,
      uniqueTrendReceipts,
      uniqueTrendRunIds,
      latestNoFailingScenarios,
      scenarioCoverageStable,
      scenariosComparable,
      noNewFailingScenarios,
      qualityDropPassed,
      accuracyDropPassed,
      exactTokenDeltaDropPassed,
      wallDurationDeltaDropPassed,
    }),
  };
}

function rollupReason(state) {
  if (state.rollupReady) return 'Multiple routing monitor trend windows are healthy, unique, comparable, and stable within longer-window drift thresholds.';
  if (!state.longWindowReady) return 'At least two routing monitor trend receipts are required before longer-window trend health can pass.';
  if (!state.uniqueTrendReceipts || !state.uniqueTrendRunIds) return 'Longer-window trend proof requires unique trend receipts and run ids.';
  if (!state.allTrendsHealthy || !state.latestTrendHealthy) return 'One or more routing monitor trend windows are unhealthy or need rollback attention.';
  if (!state.latestNoFailingScenarios || !state.noNewFailingScenarios) return 'The latest trend window introduced failing scenarios.';
  if (!state.scenarioCoverageStable || !state.scenariosComparable) return 'Scenario coverage changed across trend windows, so longer-window drift is not comparable.';
  if (!state.qualityDropPassed || !state.accuracyDropPassed) return 'Quality or accuracy dropped beyond the configured longer-window threshold.';
  if (!state.exactTokenDeltaDropPassed || !state.wallDurationDeltaDropPassed) return 'Exact-token or wall-time improvement dropped beyond the configured longer-window threshold.';
  return 'Routing monitor trend rollup did not pass.';
}

function rollupGuardrails(evaluation, scenarioRollups) {
  const guardrails = [];
  if (!evaluation.long_window_ready) guardrails.push('Collect at least two routing monitor trend receipts before claiming longer-window routing stability.');
  if (!evaluation.unique_trend_receipts || !evaluation.unique_trend_run_ids) guardrails.push('Do not reuse the same trend receipt or run id as a separate longer-window observation.');
  if (!evaluation.all_trends_healthy || !evaluation.latest_trend_healthy) guardrails.push('Treat any unhealthy trend window as rollback attention before another default routing change.');
  if (!evaluation.scenarios_comparable) guardrails.push('Keep scenario ids stable across trend windows so longer-window drift can be compared like-for-like.');
  for (const rollup of scenarioRollups.filter((item) => item.new_failure)) {
    guardrails.push(`Scenario ${rollup.id} became failing in the latest trend window and requires review before further routing changes.`);
  }
  guardrails.push('Regenerate this rollup after every model, prompt, routing policy, tool, workflow, or runtime default-change update.');
  return guardrails;
}

function rollupNextActions(evaluation) {
  if (evaluation.rollup_ready) {
    return ['Attach this rollup to the next routing handoff or runtime-completion review, and regenerate it after the next model, prompt, policy, tool, workflow, or runtime default-change update.'];
  }
  if (!evaluation.long_window_ready) {
    return ['Collect another closeout-checked routing monitor trend receipt after the next relevant runtime or workflow change, then regenerate this rollup.'];
  }
  if (!evaluation.unique_trend_receipts || !evaluation.unique_trend_run_ids) {
    return ['Regenerate the rollup with distinct trend receipts and run ids.'];
  }
  if (!evaluation.all_trends_healthy || !evaluation.latest_trend_healthy) {
    return ['Review the unhealthy trend window, run rollback verification if needed, and collect a fresh healthy monitor trend before further routing promotion.'];
  }
  return ['Review longer-window drift, refresh comparable trend evidence, and regenerate the rollup before the next routing default change.'];
}

function compareTrendOrder(left, right) {
  const timeDelta = timestampValue(left.generated_at) - timestampValue(right.generated_at);
  if (timeDelta !== 0) return timeDelta;
  return left.run_id.localeCompare(right.run_id);
}

function defaultRunId(trends) {
  const last = trends.at(-1);
  return last?.run_id ? `routing-monitor-trend-rollup:${last.run_id}` : 'routing-monitor-trend-rollup';
}

function trendIdentity(trend) {
  return trend.receipt_path || (trend.run_id ? `${trend.run_id}@${trend.generated_at}` : '');
}

function sourceRolloutKey(point) {
  return point?.source_rollout_receipt || point?.source_rollout_run_id || point?.source_rollout_policy_change_id || '';
}

function timestampDelta(left, right) {
  const leftMs = timestampValue(left);
  const rightMs = timestampValue(right);
  if (!leftMs || !rightMs) return 0;
  return rightMs - leftMs;
}

function timestampValue(value) {
  const time = Date.parse(value || '');
  return Number.isFinite(time) ? time : 0;
}

function ratio(numerator, denominator) {
  return denominator > 0 ? round(numerator / denominator) : 0;
}

function round(value) {
  return Math.round((Number(value) || 0) * 1000) / 1000;
}

function numberValue(value) {
  return typeof value === 'number' && Number.isFinite(value) ? round(value) : 0;
}

function nonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function stringArray(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === 'string').map((item) => item.trim()).filter(Boolean).sort() : [];
}

function arrayValue(value) {
  if (Array.isArray(value)) return value;
  if (value == null) return [];
  return [value];
}

function firstString(values) {
  return stringArray(values)[0] || '';
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function isRatio(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

function deepEqual(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}
