import { validateRoutingEvaluationSuiteReceipt } from './routing-evaluation-suite.mjs';
import { validateRoutingPolicyReviewReceipt } from './routing-policy-review.mjs';

export const ROUTING_ROLLOUT_SCHEMA_VERSION = 'aipedia.agent-routing-rollout.v1';

export const ROUTING_ROLLOUT_DEFAULT_THRESHOLDS = {
  min_quality_score: 0.85,
  min_accuracy_score: 0.85,
  minimum_improvement_margin: 0.02,
  max_residual_issue_count: 0,
  max_regression_count: 0,
  min_telemetry_coverage_rate: 1,
};

const ROLLOUT_STAGES = new Set(['shadow', 'canary', 'default-enabled']);

export function buildRoutingRollout(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingRolloutIssue('routing-rollout-input-invalid', 'Input must be an object.')],
    };
  }

  const sourceReview = normalizeSourceReview(input, issues);
  const rolloutSuite = normalizeRolloutSuite(input, issues);
  const rollout = normalizeRollout(input, issues);
  const postCanary = normalizePostCanary(input, issues);
  const thresholds = normalizeThresholds(input.thresholds, issues);
  if (issues.length) return { receipt: null, issues };

  const scenarios = rolloutSuite.scenarios.map((scenario) => rolloutScenario(scenario, thresholds));
  const totals = rolloutTotals(scenarios);
  const rolloutEvaluation = rolloutEvaluationSummary(sourceReview, rolloutSuite, rollout, thresholds, totals, scenarios, postCanary);
  const guardrails = rolloutGuardrails(sourceReview, rolloutSuite, rolloutEvaluation, scenarios);
  const nextActions = rolloutNextActions(rolloutEvaluation, rollout);
  const source = options.source || input.source || [
    sourceReview.receipt_path,
    rolloutSuite.receipt_path,
    postCanary.receipt_path,
  ].filter(Boolean).join(' + ');

  return {
    receipt: {
      ok: rolloutEvaluation.guard_passed,
      mode: 'agent-routing-rollout',
      schema_version: ROUTING_ROLLOUT_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source,
      goal_id: stringValue(input.goal_id) || sourceReview.goal_id || rolloutSuite.goal_id,
      run_id: stringValue(input.run_id) || `${sourceReview.run_id}:rollout:${rolloutSuite.run_id}`,
      workflow: stringValue(input.workflow) || sourceReview.workflow || rolloutSuite.workflow,
      rollout_task: stringValue(input.rollout_task || input.task) || `Guarded rollout for ${sourceReview.run_id}`,
      source_review: sourceReview,
      rollout,
      post_canary: postCanary,
      thresholds,
      rollout_suite: rolloutSuite,
      totals,
      scenarios,
      rollout_evaluation: rolloutEvaluation,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingRolloutReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingRolloutIssue('routing-rollout-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-rollout'],
    ['schema_version', ROUTING_ROLLOUT_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingRolloutIssue('routing-rollout-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'rollout_task']) {
    if (typeof value[field] !== 'string') issues.push(routingRolloutIssue('routing-rollout-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'rollout_task']) {
    if (!stringValue(value[field])) issues.push(routingRolloutIssue('routing-rollout-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingRolloutIssue('routing-rollout-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.source_review)) issues.push(routingRolloutIssue('routing-rollout-source-review-invalid', 'source_review must be an object.'));
  if (!isObject(value.rollout)) issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'rollout must be an object.'));
  if (value.post_canary != null && !isObject(value.post_canary)) issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', 'post_canary must be an object when present.'));
  if (!isObject(value.thresholds)) issues.push(routingRolloutIssue('routing-rollout-threshold-invalid', 'thresholds must be an object.'));
  if (!isObject(value.rollout_suite)) issues.push(routingRolloutIssue('routing-rollout-suite-invalid', 'rollout_suite must be an object.'));
  if (!isObject(value.totals)) issues.push(routingRolloutIssue('routing-rollout-total-mismatch', 'totals must be an object.'));
  if (!Array.isArray(value.scenarios)) issues.push(routingRolloutIssue('routing-rollout-scenarios-invalid', 'scenarios must be an array.'));
  if (!isObject(value.rollout_evaluation)) issues.push(routingRolloutIssue('routing-rollout-evaluation-mismatch', 'rollout_evaluation must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingRolloutIssue('routing-rollout-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingRolloutIssue('routing-rollout-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingRollout({
    source_review: value.source_review,
    rollout: value.rollout,
    post_canary: value.post_canary,
    thresholds: value.thresholds,
    rollout_suite: value.rollout_suite,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    rollout_task: value.rollout_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  const canonicalFields = ['source_review', 'rollout', 'thresholds', 'rollout_suite', 'totals', 'scenarios', 'rollout_evaluation', 'guardrails', 'next_actions'];
  if (value.post_canary != null || value.rollout?.stage === 'default-enabled') canonicalFields.splice(2, 0, 'post_canary');
  for (const field of canonicalFields) {
    const expectedValue = historicalRolloutEvaluationCompatible(field, value)
      ? withoutPostCanaryEvaluationFields(expected[field])
      : expected[field];
    if (!deepEqual(value[field], expectedValue)) {
      issues.push(routingRolloutIssue('routing-rollout-mismatch', `${field} must match canonical routing rollout computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingRolloutIssue('routing-rollout-mismatch', 'ok must match canonical routing rollout computation.'));
  }
  return issues;
}

export function routingRolloutIssue(code, message) {
  return { code, message };
}

function historicalRolloutEvaluationCompatible(field, value) {
  return field === 'rollout_evaluation'
    && value.rollout?.stage !== 'default-enabled'
    && isObject(value.rollout_evaluation)
    && value.rollout_evaluation.post_canary_required == null;
}

function withoutPostCanaryEvaluationFields(value) {
  const copy = { ...value };
  delete copy.post_canary_required;
  delete copy.post_canary_ready;
  delete copy.post_canary_present;
  delete copy.post_canary_stage_ready;
  delete copy.post_canary_review_lineage_match;
  delete copy.post_canary_default_suite_fresh;
  delete copy.post_canary_metrics_ready;
  return copy;
}

function normalizeSourceReview(input, issues) {
  const review = input.routing_policy_review || input.policy_review || input.review || (isRoutingPolicyReviewReceipt(input) ? input : null);
  if (review) {
    const reviewIssues = validateRoutingPolicyReviewReceipt(review);
    for (const item of reviewIssues) {
      issues.push(routingRolloutIssue('routing-rollout-source-review-invalid', item.message));
    }
    return reviewIssues.length ? emptySourceReview() : sourceReviewFromReceipt(review);
  }
  if (isObject(input.source_review)) return sourceReviewFromSummary(input.source_review, issues);
  issues.push(routingRolloutIssue('routing-rollout-source-review-invalid', 'A routing-policy-review receipt or source_review summary is required.'));
  return emptySourceReview();
}

function sourceReviewFromReceipt(review) {
  return {
    receipt_path: stringValue(review.receipt_path),
    schema_version: stringValue(review.schema_version),
    generated_at: stringValue(review.generated_at),
    source: stringValue(review.source),
    goal_id: stringValue(review.goal_id),
    run_id: stringValue(review.run_id),
    workflow: stringValue(review.workflow),
    review_task: stringValue(review.review_task),
    promotion_review: promotionReview(review.promotion_review),
    totals: reviewTotals(review.totals),
    source_pilot: sourcePilotSummary(review.source_pilot),
  };
}

function sourceReviewFromSummary(summary, issues) {
  const normalized = {
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    review_task: stringValue(summary.review_task),
    promotion_review: promotionReview(summary.promotion_review),
    totals: reviewTotals(summary.totals),
    source_pilot: sourcePilotSummary(summary.source_pilot),
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'review_task']) {
    if (!normalized[field]) issues.push(routingRolloutIssue('routing-rollout-source-review-invalid', `source_review.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-policy-review.v1') {
    issues.push(routingRolloutIssue('routing-rollout-source-review-invalid', 'source_review.schema_version must be aipedia.agent-routing-policy-review.v1.'));
  }
  return normalized;
}

function normalizeRolloutSuite(input, issues) {
  const suite = input.routing_evaluation_suite || input.rollout_suite_receipt || input.suite || (isRoutingSuiteReceipt(input) ? input : null);
  if (suite) {
    const suiteIssues = validateRoutingEvaluationSuiteReceipt(suite);
    for (const item of suiteIssues) {
      issues.push(routingRolloutIssue('routing-rollout-suite-invalid', item.message));
    }
    return suiteIssues.length ? emptyRolloutSuite() : rolloutSuiteFromReceipt(suite);
  }
  if (isObject(input.rollout_suite)) return rolloutSuiteFromSummary(input.rollout_suite, issues);
  issues.push(routingRolloutIssue('routing-rollout-suite-invalid', 'A routing evaluation suite receipt or rollout_suite summary is required.'));
  return emptyRolloutSuite();
}

function rolloutSuiteFromReceipt(suite) {
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

function rolloutSuiteFromSummary(summary, issues) {
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
    if (!normalized[field]) issues.push(routingRolloutIssue('routing-rollout-suite-invalid', `rollout_suite.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-evaluation-suite.v2') {
    issues.push(routingRolloutIssue('routing-rollout-suite-invalid', 'rollout_suite.schema_version must be aipedia.agent-routing-evaluation-suite.v2.'));
  }
  if (normalized.scenarios.length === 0) issues.push(routingRolloutIssue('routing-rollout-suite-invalid', 'rollout_suite.scenarios must not be empty.'));
  return normalized;
}

function normalizeRollout(input, issues) {
  const config = isObject(input.rollout) ? input.rollout : input;
  const stage = stringValue(config.stage || config.rollout_stage) || 'shadow';
  if (!ROLLOUT_STAGES.has(stage)) {
    issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'rollout.stage must be shadow, canary, or default-enabled.'));
  }
  const trafficPercent = config.traffic_percent == null ? defaultTrafficPercent(stage) : numberValue(config.traffic_percent);
  if (typeof trafficPercent !== 'number' || !Number.isFinite(trafficPercent) || trafficPercent < 0 || trafficPercent > 100) {
    issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'rollout.traffic_percent must be between 0 and 100.'));
  }
  if (stage === 'shadow' && trafficPercent !== 0) {
    issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'shadow rollout traffic_percent must be 0.'));
  }
  if (stage === 'canary' && (trafficPercent <= 0 || trafficPercent > 10)) {
    issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'canary rollout traffic_percent must be greater than 0 and at most 10.'));
  }
  if (stage === 'default-enabled' && trafficPercent !== 100) {
    issues.push(routingRolloutIssue('routing-rollout-config-invalid', 'default-enabled rollout traffic_percent must be 100.'));
  }
  return {
    stage,
    traffic_percent: trafficPercent,
    policy_change_id: stringValue(config.policy_change_id),
    operator: stringValue(config.operator),
  };
}

function normalizePostCanary(input, issues) {
  const canary = input.post_canary || input.post_canary_rollout || input.canary_rollout || null;
  if (canary == null) return emptyPostCanary();
  if (isRoutingRolloutReceipt(canary)) {
    if (canary.rollout?.stage === 'default-enabled') {
      issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', 'post_canary must be a canary-stage routing rollout receipt.'));
      return postCanaryFromReceipt(canary);
    }
    const receiptIssues = validateRoutingRolloutReceipt(canary);
    for (const item of receiptIssues) {
      issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', item.message));
    }
    return receiptIssues.length ? emptyPostCanary() : postCanaryFromReceipt(canary);
  }
  if (isObject(canary)) return postCanaryFromSummary(canary, issues);
  issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', 'post_canary must be a routing rollout receipt or summary.'));
  return emptyPostCanary();
}

function postCanaryFromReceipt(receipt) {
  return {
    provided: true,
    receipt_path: stringValue(receipt.receipt_path),
    schema_version: stringValue(receipt.schema_version),
    generated_at: stringValue(receipt.generated_at),
    source: stringValue(receipt.source),
    goal_id: stringValue(receipt.goal_id),
    run_id: stringValue(receipt.run_id),
    workflow: stringValue(receipt.workflow),
    source_review_receipt: stringValue(receipt.source_review?.receipt_path),
    source_review_run_id: stringValue(receipt.source_review?.run_id),
    rollout_suite_receipt: stringValue(receipt.rollout_suite?.receipt_path),
    rollout_suite_run_id: stringValue(receipt.rollout_suite?.run_id),
    rollout: rolloutConfigSummary(receipt.rollout),
    rollout_evaluation: postCanaryEvaluationSummary(receipt.rollout_evaluation),
    totals: postCanaryTotals(receipt.totals),
  };
}

function postCanaryFromSummary(summary, issues) {
  const normalized = {
    provided: summary.provided !== false,
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    source_review_receipt: stringValue(summary.source_review_receipt),
    source_review_run_id: stringValue(summary.source_review_run_id),
    rollout_suite_receipt: stringValue(summary.rollout_suite_receipt),
    rollout_suite_run_id: stringValue(summary.rollout_suite_run_id),
    rollout: rolloutConfigSummary(summary.rollout),
    rollout_evaluation: postCanaryEvaluationSummary(summary.rollout_evaluation),
    totals: postCanaryTotals(summary.totals),
  };
  if (!normalized.provided) return emptyPostCanary();
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow']) {
    if (!normalized[field]) issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', `post_canary.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== ROUTING_ROLLOUT_SCHEMA_VERSION) {
    issues.push(routingRolloutIssue('routing-rollout-post-canary-invalid', `post_canary.schema_version must be ${ROUTING_ROLLOUT_SCHEMA_VERSION}.`));
  }
  return normalized;
}

function normalizeThresholds(value, issues) {
  const thresholds = { ...ROUTING_ROLLOUT_DEFAULT_THRESHOLDS };
  if (value == null) return thresholds;
  if (!isObject(value)) {
    issues.push(routingRolloutIssue('routing-rollout-threshold-invalid', 'thresholds must be an object when supplied.'));
    return thresholds;
  }
  for (const field of ['min_quality_score', 'min_accuracy_score', 'minimum_improvement_margin', 'min_telemetry_coverage_rate']) {
    if (value[field] == null) continue;
    if (!isRatio(value[field])) {
      issues.push(routingRolloutIssue('routing-rollout-threshold-invalid', `thresholds.${field} must be between 0 and 1.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  for (const field of ['max_residual_issue_count', 'max_regression_count']) {
    if (value[field] == null) continue;
    if (!Number.isInteger(value[field]) || value[field] < 0) {
      issues.push(routingRolloutIssue('routing-rollout-threshold-invalid', `thresholds.${field} must be a non-negative integer.`));
      continue;
    }
    thresholds[field] = value[field];
  }
  return thresholds;
}

function rolloutScenario(scenario, thresholds) {
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

function rolloutTotals(scenarios) {
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

function rolloutEvaluationSummary(sourceReview, rolloutSuite, rollout, thresholds, totals, scenarios, postCanary) {
  const reviewReady = sourceReview.promotion_review.default_ready === true;
  const freshRolloutSuite = rolloutSuite.receipt_path !== '' && rolloutSuite.receipt_path !== sourceReview.source_pilot.suite_receipt;
  const scenarioCoverageRequired = Math.max(1, sourceReview.source_pilot.totals.policy_rule_count);
  const scenarioCoveragePassed = totals.scenario_count >= scenarioCoverageRequired;
  const telemetryCoverageRate = totals.scenario_count ? round(totals.telemetry_backed_scenario_count / totals.scenario_count) : 0;
  const metricsReady = totals.failing_scenario_count === 0
    && totals.scenario_count > 0
    && totals.exact_token_scenario_count === totals.scenario_count
    && telemetryCoverageRate >= thresholds.min_telemetry_coverage_rate
    && scenarioCoveragePassed;
  const postCanaryReadiness = postCanaryReadinessSummary(sourceReview, rolloutSuite, rollout, thresholds, postCanary);
  const guardPassed = reviewReady && freshRolloutSuite && metricsReady && postCanaryReadiness.ready;
  return {
    status: rolloutStatus(guardPassed, rollout),
    guard_passed: guardPassed,
    guarded_rollout_allowed: guardPassed,
    default_change_allowed: guardPassed && rollout.stage === 'default-enabled',
    review_ready: reviewReady,
    fresh_rollout_suite: freshRolloutSuite,
    metrics_ready: metricsReady,
    post_canary_required: postCanaryReadiness.required,
    post_canary_ready: postCanaryReadiness.ready,
    post_canary_present: postCanaryReadiness.present,
    post_canary_stage_ready: postCanaryReadiness.stage_ready,
    post_canary_review_lineage_match: postCanaryReadiness.review_lineage_match,
    post_canary_default_suite_fresh: postCanaryReadiness.default_suite_fresh,
    post_canary_metrics_ready: postCanaryReadiness.metrics_ready,
    scenario_coverage_required: scenarioCoverageRequired,
    scenario_coverage_passed: scenarioCoveragePassed,
    telemetry_coverage_rate: telemetryCoverageRate,
    reason: rolloutReason({ guardPassed, reviewReady, freshRolloutSuite, metricsReady, scenarioCoveragePassed, rollout, postCanaryReadiness }),
    failing_scenario_ids: scenarios.filter((scenario) => !scenario.passed).map((scenario) => scenario.id).sort(),
  };
}

function postCanaryReadinessSummary(sourceReview, rolloutSuite, rollout, thresholds, postCanary) {
  const required = rollout.stage === 'default-enabled';
  if (!required) {
    return {
      required,
      ready: true,
      present: postCanary.provided,
      stage_ready: postCanary.provided ? postCanaryStageReady(postCanary) : true,
      review_lineage_match: postCanary.provided ? postCanaryReviewLineageMatches(sourceReview, postCanary) : true,
      default_suite_fresh: postCanary.provided ? postCanaryDefaultSuiteFresh(rolloutSuite, postCanary) : true,
      metrics_ready: postCanary.provided ? postCanaryMetricsReady(postCanary, thresholds) : true,
    };
  }
  const present = postCanary.provided === true;
  const stageReady = present && postCanaryStageReady(postCanary);
  const reviewLineageMatch = present && postCanaryReviewLineageMatches(sourceReview, postCanary);
  const defaultSuiteFresh = present && postCanaryDefaultSuiteFresh(rolloutSuite, postCanary);
  const metricsReady = present && postCanaryMetricsReady(postCanary, thresholds);
  return {
    required,
    ready: present && stageReady && reviewLineageMatch && defaultSuiteFresh && metricsReady,
    present,
    stage_ready: stageReady,
    review_lineage_match: reviewLineageMatch,
    default_suite_fresh: defaultSuiteFresh,
    metrics_ready: metricsReady,
  };
}

function postCanaryStageReady(postCanary) {
  return postCanary.rollout.stage === 'canary'
    && postCanary.rollout.traffic_percent > 0
    && postCanary.rollout.traffic_percent <= 10
    && postCanary.rollout_evaluation.status === 'canary-ready'
    && postCanary.rollout_evaluation.guard_passed === true
    && postCanary.rollout_evaluation.default_change_allowed === false;
}

function postCanaryReviewLineageMatches(sourceReview, postCanary) {
  return sameLineage(
    sourceReview.receipt_path,
    sourceReview.run_id,
    postCanary.source_review_receipt,
    postCanary.source_review_run_id,
  );
}

function postCanaryDefaultSuiteFresh(rolloutSuite, postCanary) {
  return !sameLineage(
    rolloutSuite.receipt_path,
    rolloutSuite.run_id,
    postCanary.rollout_suite_receipt,
    postCanary.rollout_suite_run_id,
  );
}

function postCanaryMetricsReady(postCanary, thresholds) {
  const totals = postCanary.totals;
  const telemetryCoverageRate = totals.scenario_count ? round(totals.telemetry_backed_scenario_count / totals.scenario_count) : 0;
  return postCanary.rollout_evaluation.metrics_ready === true
    && totals.scenario_count > 0
    && totals.failing_scenario_count === 0
    && totals.exact_token_scenario_count === totals.scenario_count
    && telemetryCoverageRate >= thresholds.min_telemetry_coverage_rate
    && totals.min_quality_score >= thresholds.min_quality_score
    && totals.min_accuracy_score >= thresholds.min_accuracy_score
    && totals.max_residual_issue_count <= thresholds.max_residual_issue_count
    && totals.max_regression_count <= thresholds.max_regression_count;
}

function sameLineage(leftReceipt, leftRunId, rightReceipt, rightRunId) {
  const left = stringValue(leftReceipt) || stringValue(leftRunId);
  const right = stringValue(rightReceipt) || stringValue(rightRunId);
  return Boolean(left && right && left === right);
}

function rolloutStatus(guardPassed, rollout) {
  if (!guardPassed) return 'blocked';
  if (rollout.stage === 'shadow') return 'shadow-ready';
  if (rollout.stage === 'canary') return 'canary-ready';
  return 'default-ready';
}

function rolloutReason({ guardPassed, reviewReady, freshRolloutSuite, metricsReady, scenarioCoveragePassed, rollout, postCanaryReadiness }) {
  if (guardPassed && rollout.stage === 'shadow') return 'Accepted review and fresh rollout metrics allow shadow execution, but not a live default change.';
  if (guardPassed && rollout.stage === 'canary') return 'Accepted review and fresh rollout metrics allow a bounded canary.';
  if (guardPassed) return 'Accepted review and fresh rollout metrics allow the guarded default change.';
  if (!reviewReady) return 'The routing-policy review is not default-ready.';
  if (!freshRolloutSuite) return 'The rollout suite must be fresh and separate from the reviewed pilot suite.';
  if (!scenarioCoveragePassed) return 'The rollout suite does not cover enough policy scenarios.';
  if (!metricsReady) return 'One or more rollout scenarios failed exact token, correction, quality, accuracy, wall-time, or telemetry gates.';
  if (postCanaryReadiness?.required && !postCanaryReadiness.ready) return 'Default-enabled rollout requires a matching canary-ready receipt plus a fresh post-canary metrics suite.';
  return 'The rollout guard did not pass.';
}

function rolloutGuardrails(sourceReview, rolloutSuite, rolloutEvaluation, scenarios) {
  const guardrails = [];
  if (!rolloutEvaluation.review_ready) guardrails.push('Do not roll out a routing policy until the reviewer-pass receipt is default-ready.');
  if (!rolloutEvaluation.fresh_rollout_suite) guardrails.push('Do not use the reviewed pilot suite as the rollout metrics suite.');
  if (!rolloutEvaluation.metrics_ready) guardrails.push('Do not roll out until every scenario has exact tokens, correction telemetry, quality, accuracy, and wall-time evidence.');
  if (rolloutEvaluation.post_canary_required && !rolloutEvaluation.post_canary_ready) {
    guardrails.push('Do not enable the routing policy by default until a matching canary-ready receipt and fresh post-canary metrics suite are attached.');
  }
  if (!rolloutEvaluation.scenario_coverage_passed) guardrails.push('Do not roll out until the suite covers the reviewed policy rule count.');
  for (const scenario of scenarios.filter((row) => !row.passed)) {
    guardrails.push(`Scenario ${scenario.id} failed rollout checks: ${scenario.failure_reasons.join(', ')}.`);
  }
  guardrails.push('Keep default orchestration changes behind rollout receipts and re-run this gate after model, prompt, policy, or workflow changes.');
  if (sourceReview.source_pilot.suite_receipt && rolloutSuite.receipt_path && sourceReview.source_pilot.suite_receipt !== rolloutSuite.receipt_path) {
    guardrails.push('Preserve the reviewed pilot suite and rollout suite as separate evidence layers.');
  }
  return guardrails;
}

function rolloutNextActions(rolloutEvaluation, rollout) {
  if (!rolloutEvaluation.guard_passed) return ['Collect fresh rollout metrics and regenerate the routing rollout receipt before changing defaults.'];
  if (rollout.stage === 'shadow') return ['Run the policy in shadow mode, collect another fresh rollout suite, then request canary or default-enabled approval.'];
  if (rollout.stage === 'canary') return ['Run the canary within the recorded traffic limit and collect post-canary exact token, correction, quality, accuracy, and wall-time receipts.'];
  return ['Apply the default change only with this receipt attached, then collect post-change monitoring receipts.'];
}

function scenarioFailureReasons(checks) {
  return Object.entries(checks)
    .filter(([, passed]) => !passed)
    .map(([name]) => name)
    .sort();
}

function promotionReview(value) {
  return {
    status: stringValue(value?.status),
    default_ready: value?.default_ready === true,
    pilot_ready: value?.pilot_ready === true,
    reviewer_pass_complete: value?.reviewer_pass_complete === true,
    reason: stringValue(value?.reason),
  };
}

function reviewTotals(value) {
  return {
    review_count: nonNegativeInteger(value?.review_count),
    required_lens_count: nonNegativeInteger(value?.required_lens_count),
    accepted_required_lens_count: nonNegativeInteger(value?.accepted_required_lens_count),
    rejected_review_count: nonNegativeInteger(value?.rejected_review_count),
    needs_work_review_count: nonNegativeInteger(value?.needs_work_review_count),
    missing_required_lens_count: nonNegativeInteger(value?.missing_required_lens_count),
  };
}

function sourcePilotSummary(value) {
  return {
    receipt_path: stringValue(value?.receipt_path),
    policy_receipt: stringValue(value?.policy_receipt),
    suite_receipt: stringValue(value?.suite_receipt),
    policy_fit: {
      status: stringValue(value?.policy_fit?.status),
      promotion_candidate: value?.policy_fit?.promotion_candidate === true,
      same_source_replay: value?.policy_fit?.same_source_replay === true,
      shared_evidence_overlap: value?.policy_fit?.shared_evidence_overlap === true,
      match_rate: numberValue(value?.policy_fit?.match_rate),
    },
    totals: {
      policy_rule_count: nonNegativeInteger(value?.totals?.policy_rule_count),
      pilot_scenario_count: nonNegativeInteger(value?.totals?.pilot_scenario_count),
      matched_rule_count: nonNegativeInteger(value?.totals?.matched_rule_count),
      mismatched_rule_count: nonNegativeInteger(value?.totals?.mismatched_rule_count),
      missing_rule_count: nonNegativeInteger(value?.totals?.missing_rule_count),
      blocked_scenario_count: nonNegativeInteger(value?.totals?.blocked_scenario_count),
      not_recommended_scenario_count: nonNegativeInteger(value?.totals?.not_recommended_scenario_count),
      telemetry_backed_scenario_count: nonNegativeInteger(value?.totals?.telemetry_backed_scenario_count),
      covered_policy_rule_count: nonNegativeInteger(value?.totals?.covered_policy_rule_count),
      uncovered_policy_rule_count: nonNegativeInteger(value?.totals?.uncovered_policy_rule_count),
      shared_telemetry_ref_count: nonNegativeInteger(value?.totals?.shared_telemetry_ref_count),
    },
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

function rolloutConfigSummary(value) {
  return {
    stage: stringValue(value?.stage),
    traffic_percent: numberValue(value?.traffic_percent),
    policy_change_id: stringValue(value?.policy_change_id),
    operator: stringValue(value?.operator),
  };
}

function postCanaryEvaluationSummary(value) {
  return {
    status: stringValue(value?.status),
    guard_passed: value?.guard_passed === true,
    guarded_rollout_allowed: value?.guarded_rollout_allowed === true,
    default_change_allowed: value?.default_change_allowed === true,
    review_ready: value?.review_ready === true,
    fresh_rollout_suite: value?.fresh_rollout_suite === true,
    metrics_ready: value?.metrics_ready === true,
    telemetry_coverage_rate: numberValue(value?.telemetry_coverage_rate),
  };
}

function postCanaryTotals(value) {
  return {
    scenario_count: nonNegativeInteger(value?.scenario_count),
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

function emptySourceReview() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    review_task: '',
    promotion_review: promotionReview({}),
    totals: reviewTotals({}),
    source_pilot: sourcePilotSummary({}),
  };
}

function emptyRolloutSuite() {
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

function emptyPostCanary() {
  return {
    provided: false,
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    source_review_receipt: '',
    source_review_run_id: '',
    rollout_suite_receipt: '',
    rollout_suite_run_id: '',
    rollout: rolloutConfigSummary({}),
    rollout_evaluation: postCanaryEvaluationSummary({}),
    totals: postCanaryTotals({}),
  };
}

function defaultTrafficPercent(stage) {
  if (stage === 'canary') return 5;
  if (stage === 'default-enabled') return 100;
  return 0;
}

function isRoutingPolicyReviewReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-policy-review' && typeof value.schema_version === 'string';
}

function isRoutingSuiteReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-evaluation-suite' && typeof value.schema_version === 'string';
}

function isRoutingRolloutReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-rollout' && typeof value.schema_version === 'string';
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
  if (Array.isArray(value)) return value.map((item) => canonicalize(item));
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .sort()
      .map((key) => [key, canonicalize(value[key])]),
  );
}
