export const ROUTING_EVALUATION_SCHEMA_VERSION = 'aipedia.agent-routing-evaluation.v1';

export const ROUTING_EVALUATION_WEIGHTS = {
  quality: 0.28,
  accuracy: 0.28,
  correction: 0.18,
  token_efficiency: 0.14,
  speed: 0.08,
  task_completion: 0.04,
};

export const ROUTING_EVALUATION_DEFAULT_THRESHOLDS = {
  min_quality_score: 0.8,
  min_accuracy_score: 0.8,
  max_residual_issue_count: 0,
  max_regression_count: 0,
  minimum_improvement_margin: 0.02,
};

const TOKEN_FIELDS = [
  'request_count',
  'input_tokens',
  'output_tokens',
  'cached_input_tokens',
  'reasoning_tokens',
  'total_tokens',
];

const NON_TOTAL_TOKEN_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cached_input_tokens',
  'reasoning_tokens',
];

export function buildRoutingEvaluation(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingIssue('routing-evaluation-input-invalid', 'Input must be an object.')],
    };
  }

  const thresholds = normalizeThresholds(input.thresholds, issues);
  const candidatesInput = Array.isArray(input.candidates) ? input.candidates : [];
  if (!Array.isArray(input.candidates)) {
    issues.push(routingIssue('routing-evaluation-candidates-invalid', 'candidates must be an array.'));
  }
  if (candidatesInput.length < 2) {
    issues.push(routingIssue('routing-evaluation-candidates-invalid', 'At least two routing candidates are required for comparison.'));
  }

  const candidateIds = new Set();
  const rawCandidates = candidatesInput.map((candidate, index) => normalizeCandidate(candidate, index, candidateIds, issues));
  const validForScoring = rawCandidates.filter((candidate) => candidate.valid);
  const minTokens = Math.min(...validForScoring.map((candidate) => candidate.exact_model_tokens.total_tokens));
  const minWall = Math.min(...validForScoring.map((candidate) => candidate.wall_duration_ms));

  if (issues.length) return { receipt: null, issues };

  const candidates = rawCandidates.map((candidate) => scoreCandidate(candidate, { minTokens, minWall, thresholds }));
  const eligibleCandidates = candidates.filter((candidate) => candidate.eligible);
  const rankedCandidates = [...eligibleCandidates].sort(compareCandidates);
  const winner = rankedCandidates[0] || null;
  const runnerUp = rankedCandidates[1] || null;
  const improvementMargin = winner && runnerUp ? round(winner.overall_score - runnerUp.overall_score) : 0;
  const recommendation = routingRecommendation({ winner, runnerUp, improvementMargin, thresholds, candidates });

  return {
    receipt: {
      ok: issues.length === 0,
      mode: 'agent-routing-evaluation',
      schema_version: ROUTING_EVALUATION_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || '',
      goal_id: stringValue(input.goal_id),
      run_id: stringValue(input.run_id),
      workflow: stringValue(input.workflow),
      evaluation_task: stringValue(input.evaluation_task || input.task),
      thresholds,
      weights: ROUTING_EVALUATION_WEIGHTS,
      totals: {
        candidate_count: candidates.length,
        eligible_candidate_count: eligibleCandidates.length,
        ineligible_candidate_count: candidates.length - eligibleCandidates.length,
      },
      candidates,
      winner: winner
        ? {
            id: winner.id,
            overall_score: winner.overall_score,
            exact_model_total_tokens: winner.exact_model_tokens.total_tokens,
            wall_duration_ms: winner.wall_duration_ms,
          }
        : null,
      recommendation,
      next_actions: recommendationNextActions(recommendation),
    },
    issues,
  };
}

export function validateRoutingEvaluationReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingIssue('routing-evaluation-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-evaluation'],
    ['schema_version', ROUTING_EVALUATION_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingIssue('routing-evaluation-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'evaluation_task']) {
    if (typeof value[field] !== 'string') issues.push(routingIssue('routing-evaluation-receipt-invalid', `${field} must be a string.`));
  }
  if (!isObject(value.totals)) issues.push(routingIssue('routing-evaluation-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.weights)) issues.push(routingIssue('routing-evaluation-receipt-invalid', 'weights must be an object.'));
  if (!isObject(value.thresholds)) issues.push(routingIssue('routing-evaluation-receipt-invalid', 'thresholds must be an object.'));
  if (!Array.isArray(value.candidates)) issues.push(routingIssue('routing-evaluation-candidates-invalid', 'candidates must be an array.'));
  if (issues.length) return issues;

  if (!deepEqual(value.weights, ROUTING_EVALUATION_WEIGHTS)) {
    issues.push(routingIssue('routing-evaluation-score-mismatch', 'weights must match the canonical routing-evaluation weights.'));
  }

  const rebuilt = buildRoutingEvaluation(value, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['thresholds', 'totals', 'candidates', 'winner', 'recommendation', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingIssue('routing-evaluation-score-mismatch', `${field} must match the canonical routing-evaluation computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingIssue('routing-evaluation-score-mismatch', 'ok must match the canonical routing-evaluation computation.'));
  }
  return issues;
}

export function routingIssue(code, message) {
  return { code, message };
}

function normalizeThresholds(value, issues) {
  const thresholds = { ...ROUTING_EVALUATION_DEFAULT_THRESHOLDS };
  if (value == null) return thresholds;
  if (!isObject(value)) {
    issues.push(routingIssue('routing-evaluation-threshold-invalid', 'thresholds must be an object when supplied.'));
    return thresholds;
  }
  for (const field of ['min_quality_score', 'min_accuracy_score', 'minimum_improvement_margin']) {
    if (value[field] == null) continue;
    if (!isRatio(value[field])) {
      issues.push(routingIssue('routing-evaluation-threshold-invalid', `thresholds.${field} must be between 0 and 1.`));
      continue;
    }
    thresholds[field] = round(value[field]);
  }
  for (const field of ['max_residual_issue_count', 'max_regression_count']) {
    if (value[field] == null) continue;
    if (!isNonNegativeInteger(value[field])) {
      issues.push(routingIssue('routing-evaluation-threshold-invalid', `thresholds.${field} must be a non-negative integer.`));
      continue;
    }
    thresholds[field] = value[field];
  }
  return thresholds;
}

function normalizeCandidate(candidate, index, candidateIds, issues) {
  const path = `candidates[${index}]`;
  if (!isObject(candidate)) {
    issues.push(routingIssue('routing-evaluation-candidate-invalid', `${path} must be an object.`));
    return { valid: false };
  }
  const id = stringValue(candidate.id);
  if (!id) issues.push(routingIssue('routing-evaluation-candidate-invalid', `${path}.id is required.`));
  if (id && candidateIds.has(id)) issues.push(routingIssue('routing-evaluation-candidate-invalid', `${path}.id must be unique.`));
  if (id) candidateIds.add(id);

  const exactTokens = normalizeExactTokens(candidate.exact_model_tokens || candidate.model_token_usage || candidate.token_usage, `${path}.exact_model_tokens`, issues);
  const correctionOutcomes = normalizeCorrectionOutcomes(candidate.correction_outcomes, `${path}.correction_outcomes`, issues);
  const taskOutcome = normalizeTaskOutcome(candidate.task_outcome, `${path}.task_outcome`, issues);
  const qualityScore = ratioField(candidate, 'quality_score', path, issues);
  const accuracyScore = ratioField(candidate, 'accuracy_score', path, issues);
  const wallDuration = positiveNumberField(candidate, 'wall_duration_ms', path, issues);

  for (const field of ['workflow', 'run_id', 'orchestrator']) {
    if (!stringValue(candidate[field])) issues.push(routingIssue('routing-evaluation-candidate-invalid', `${path}.${field} is required.`));
  }

  return {
    valid: true,
    id,
    label: stringValue(candidate.label) || id,
    strategy: stringValue(candidate.strategy) || 'unspecified',
    model: stringValue(candidate.model),
    workflow: stringValue(candidate.workflow),
    run_id: stringValue(candidate.run_id),
    orchestrator: stringValue(candidate.orchestrator),
    exact_model_tokens: exactTokens,
    wall_duration_ms: wallDuration,
    quality_score: qualityScore,
    accuracy_score: accuracyScore,
    correction_outcomes: correctionOutcomes,
    task_outcome: taskOutcome,
  };
}

function normalizeExactTokens(value, path, issues) {
  if (!isObject(value)) {
    issues.push(routingIssue('routing-evaluation-token-invalid', `${path} must be an object with exact runtime token usage.`));
    return emptyTokens();
  }
  const tokens = {};
  tokens.request_count = positiveIntegerField(value, 'request_count', path, issues);
  for (const field of NON_TOTAL_TOKEN_FIELDS) {
    tokens[field] = nonNegativeIntegerField(value, field, path, issues);
  }
  tokens.total_tokens = positiveIntegerField(value, 'total_tokens', path, issues);
  if (tokens.total_tokens !== tokens.input_tokens + tokens.output_tokens) {
    issues.push(routingIssue('routing-evaluation-token-mismatch', `${path}.total_tokens must equal input_tokens plus output_tokens.`));
  }
  if (tokens.cached_input_tokens > tokens.input_tokens) {
    issues.push(routingIssue('routing-evaluation-token-mismatch', `${path}.cached_input_tokens cannot exceed input_tokens.`));
  }
  if (tokens.reasoning_tokens > tokens.output_tokens) {
    issues.push(routingIssue('routing-evaluation-token-mismatch', `${path}.reasoning_tokens cannot exceed output_tokens.`));
  }
  const subagentBreakdown = Array.isArray(value.subagent_breakdown) ? value.subagent_breakdown.map((row, index) => normalizeTokenBreakdown(row, `${path}.subagent_breakdown[${index}]`, issues)) : [];
  if (!Array.isArray(value.subagent_breakdown) || value.subagent_breakdown.length === 0) {
    issues.push(routingIssue('routing-evaluation-token-invalid', `${path}.subagent_breakdown must contain at least one exact subagent row.`));
  } else {
    for (const field of TOKEN_FIELDS) {
      const sum = subagentBreakdown.reduce((total, row) => total + row[field], 0);
      if (sum !== tokens[field]) {
        issues.push(routingIssue('routing-evaluation-token-mismatch', `${path}.subagent_breakdown ${field} must sum to ${field}.`));
      }
    }
  }
  return {
    ...tokens,
    subagent_breakdown: subagentBreakdown,
  };
}

function normalizeTokenBreakdown(row, path, issues) {
  if (!isObject(row)) {
    issues.push(routingIssue('routing-evaluation-token-invalid', `${path} must be an object.`));
    return { id: '', ...emptyTokens() };
  }
  const tokens = {};
  tokens.request_count = positiveIntegerField(row, 'request_count', path, issues);
  for (const field of NON_TOTAL_TOKEN_FIELDS) {
    tokens[field] = nonNegativeIntegerField(row, field, path, issues);
  }
  tokens.total_tokens = positiveIntegerField(row, 'total_tokens', path, issues);
  if (!stringValue(row.id)) issues.push(routingIssue('routing-evaluation-token-invalid', `${path}.id is required.`));
  if (tokens.total_tokens !== tokens.input_tokens + tokens.output_tokens) {
    issues.push(routingIssue('routing-evaluation-token-mismatch', `${path}.total_tokens must equal input_tokens plus output_tokens.`));
  }
  return {
    id: stringValue(row.id),
    ...tokens,
  };
}

function normalizeCorrectionOutcomes(value, path, issues) {
  if (!isObject(value)) {
    issues.push(routingIssue('routing-evaluation-correction-invalid', `${path} must be an object.`));
    return emptyCorrectionOutcomes();
  }
  const outcomes = {
    findings_count: nonNegativeIntegerField(value, 'findings_count', path, issues),
    corrections_applied: nonNegativeIntegerField(value, 'corrections_applied', path, issues),
    residual_issue_count: nonNegativeIntegerField(value, 'residual_issue_count', path, issues),
    regression_count: nonNegativeIntegerField(value, 'regression_count', path, issues),
  };
  if (outcomes.corrections_applied > outcomes.findings_count) {
    issues.push(routingIssue('routing-evaluation-correction-mismatch', `${path}.corrections_applied cannot exceed findings_count.`));
  }
  return outcomes;
}

function normalizeTaskOutcome(value, path, issues) {
  if (!isObject(value)) {
    issues.push(routingIssue('routing-evaluation-task-invalid', `${path} must be an object.`));
    return { task_count: 0, completed_count: 0 };
  }
  const taskCount = positiveIntegerField(value, 'task_count', path, issues);
  const completedCount = nonNegativeIntegerField(value, 'completed_count', path, issues);
  if (completedCount > taskCount) {
    issues.push(routingIssue('routing-evaluation-task-mismatch', `${path}.completed_count cannot exceed task_count.`));
  }
  return {
    task_count: taskCount,
    completed_count: completedCount,
  };
}

function scoreCandidate(candidate, context) {
  const correctionScore = correctionOutcomeScore(candidate.correction_outcomes);
  const taskCompletionRate = round(candidate.task_outcome.completed_count / candidate.task_outcome.task_count);
  const tokenEfficiencyScore = round(context.minTokens / candidate.exact_model_tokens.total_tokens);
  const speedScore = round(context.minWall / candidate.wall_duration_ms);
  const overallScore = round(
    (candidate.quality_score * ROUTING_EVALUATION_WEIGHTS.quality)
    + (candidate.accuracy_score * ROUTING_EVALUATION_WEIGHTS.accuracy)
    + (correctionScore * ROUTING_EVALUATION_WEIGHTS.correction)
    + (tokenEfficiencyScore * ROUTING_EVALUATION_WEIGHTS.token_efficiency)
    + (speedScore * ROUTING_EVALUATION_WEIGHTS.speed)
    + (taskCompletionRate * ROUTING_EVALUATION_WEIGHTS.task_completion),
  );
  const eligible = candidate.quality_score >= context.thresholds.min_quality_score
    && candidate.accuracy_score >= context.thresholds.min_accuracy_score
    && candidate.correction_outcomes.residual_issue_count <= context.thresholds.max_residual_issue_count
    && candidate.correction_outcomes.regression_count <= context.thresholds.max_regression_count;
  return {
    ...candidate,
    correction_score: correctionScore,
    token_efficiency_score: tokenEfficiencyScore,
    speed_score: speedScore,
    task_completion_rate: taskCompletionRate,
    overall_score: overallScore,
    tokens_per_quality_point: round(candidate.exact_model_tokens.total_tokens / Math.max(candidate.quality_score, 0.001)),
    tokens_per_accuracy_point: round(candidate.exact_model_tokens.total_tokens / Math.max(candidate.accuracy_score, 0.001)),
    eligible,
    ineligible_reasons: eligible ? [] : ineligibleReasons(candidate, context.thresholds),
  };
}

function correctionOutcomeScore(outcomes) {
  if (outcomes.findings_count === 0) {
    return outcomes.residual_issue_count === 0 && outcomes.regression_count === 0 ? 1 : 0;
  }
  const correctionRate = outcomes.corrections_applied / outcomes.findings_count;
  const residualPenalty = (outcomes.residual_issue_count + outcomes.regression_count) / outcomes.findings_count;
  return round(clamp(correctionRate - residualPenalty, 0, 1));
}

function ineligibleReasons(candidate, thresholds) {
  const reasons = [];
  if (candidate.quality_score < thresholds.min_quality_score) reasons.push('quality-below-threshold');
  if (candidate.accuracy_score < thresholds.min_accuracy_score) reasons.push('accuracy-below-threshold');
  if (candidate.correction_outcomes.residual_issue_count > thresholds.max_residual_issue_count) reasons.push('residual-issues-above-threshold');
  if (candidate.correction_outcomes.regression_count > thresholds.max_regression_count) reasons.push('regressions-above-threshold');
  return reasons;
}

function routingRecommendation({ winner, runnerUp, improvementMargin, thresholds, candidates }) {
  if (!winner) {
    return {
      status: 'blocked',
      candidate_id: '',
      improvement_margin: 0,
      reason: 'No candidate met the quality, accuracy, correction, and regression thresholds.',
    };
  }
  if (!runnerUp) {
    return {
      status: 'review',
      candidate_id: winner.id,
      improvement_margin: 0,
      reason: 'Only one eligible candidate was available, so no routing comparison can be recommended automatically.',
    };
  }
  if (improvementMargin >= thresholds.minimum_improvement_margin) {
    return {
      status: 'recommend',
      candidate_id: winner.id,
      improvement_margin: improvementMargin,
      reason: `${winner.id} has the highest weighted score while meeting exact token, quality, correction, wall-time, and accuracy gates.`,
    };
  }
  const topIds = candidates
    .filter((candidate) => candidate.eligible)
    .sort(compareCandidates)
    .slice(0, 2)
    .map((candidate) => candidate.id);
  return {
    status: 'review',
    candidate_id: winner.id,
    improvement_margin: improvementMargin,
    reason: `Top eligible candidates are within the minimum improvement margin: ${topIds.join(', ')}.`,
  };
}

function recommendationNextActions(recommendation) {
  if (recommendation.status === 'recommend') {
    return [
      `Use ${recommendation.candidate_id} only for matching tasks and keep collecting exact token, correction, wall-time, accuracy, and quality receipts.`,
    ];
  }
  if (recommendation.status === 'blocked') {
    return [
      'Do not change routing. Collect a candidate that clears quality, accuracy, correction, and regression thresholds with exact token usage.',
    ];
  }
  return [
    'Keep both top routing candidates in review until the improvement margin clears the configured threshold or more evaluation tasks are recorded.',
  ];
}

function compareCandidates(left, right) {
  return right.overall_score - left.overall_score
    || left.exact_model_tokens.total_tokens - right.exact_model_tokens.total_tokens
    || left.wall_duration_ms - right.wall_duration_ms
    || left.id.localeCompare(right.id);
}

function positiveNumberField(object, field, path, issues) {
  const value = object[field];
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
    issues.push(routingIssue('routing-evaluation-number-invalid', `${path}.${field} must be a positive number.`));
    return 0;
  }
  return value;
}

function nonNegativeIntegerField(object, field, path, issues) {
  const value = object[field];
  if (!isNonNegativeInteger(value)) {
    issues.push(routingIssue('routing-evaluation-number-invalid', `${path}.${field} must be a non-negative integer.`));
    return 0;
  }
  return value;
}

function positiveIntegerField(object, field, path, issues) {
  const value = object[field];
  if (!Number.isInteger(value) || value <= 0) {
    issues.push(routingIssue('routing-evaluation-number-invalid', `${path}.${field} must be a positive integer.`));
    return 0;
  }
  return value;
}

function ratioField(object, field, path, issues) {
  const value = object[field];
  if (!isRatio(value)) {
    issues.push(routingIssue('routing-evaluation-number-invalid', `${path}.${field} must be between 0 and 1.`));
    return 0;
  }
  return round(value);
}

function emptyTokens() {
  return Object.fromEntries(TOKEN_FIELDS.map((field) => [field, 0]));
}

function emptyCorrectionOutcomes() {
  return {
    findings_count: 0,
    corrections_applied: 0,
    residual_issue_count: 0,
    regression_count: 0,
  };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function isRatio(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;
}

function isNonNegativeInteger(value) {
  return Number.isInteger(value) && value >= 0;
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
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
