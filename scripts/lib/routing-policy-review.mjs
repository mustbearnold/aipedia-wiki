import { validateRoutingPolicyPilotReceipt } from './routing-policy-pilot.mjs';

export const ROUTING_POLICY_REVIEW_SCHEMA_VERSION = 'aipedia.agent-routing-policy-review.v1';

export const REQUIRED_ROUTING_POLICY_REVIEW_LENSES = [
  'architecture',
  'eval-scoring',
  'speed-token-efficiency',
  'editorial-factuality',
  'observability-pause-resume',
  'rollout-governance',
];

const REVIEW_STATUSES = new Set(['accepted', 'needs-work', 'rejected']);

export function buildRoutingPolicyReview(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [routingPolicyReviewIssue('routing-policy-review-input-invalid', 'Input must be an object.')],
    };
  }

  const sourcePilot = normalizeSourcePilot(input, issues);
  const reviews = normalizeReviews(reviewRows(input, sourcePilot), issues);
  if (issues.length) return { receipt: null, issues };

  const requirements = reviewRequirements();
  const totals = reviewTotals(requirements, reviews);
  const promotionReview = promotionReviewSummary(sourcePilot, totals);
  const guardrails = reviewGuardrails(sourcePilot, promotionReview, totals);
  const nextActions = reviewNextActions(promotionReview, totals);

  return {
    receipt: {
      ok: promotionReview.default_ready,
      mode: 'agent-routing-policy-review',
      schema_version: ROUTING_POLICY_REVIEW_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || sourcePilot.receipt_path || '',
      goal_id: stringValue(input.goal_id) || sourcePilot.goal_id,
      run_id: stringValue(input.run_id) || `${sourcePilot.run_id}:routing-policy-review`,
      workflow: stringValue(input.workflow) || sourcePilot.workflow,
      review_task: stringValue(input.review_task || input.task) || `Review ${sourcePilot.run_id} for routing-default readiness`,
      source_pilot: sourcePilot,
      requirements,
      reviews,
      totals,
      promotion_review: promotionReview,
      guardrails,
      next_actions: nextActions,
    },
    issues,
  };
}

export function validateRoutingPolicyReviewReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [routingPolicyReviewIssue('routing-policy-review-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-routing-policy-review'],
    ['schema_version', ROUTING_POLICY_REVIEW_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(routingPolicyReviewIssue('routing-policy-review-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow', 'review_task']) {
    if (typeof value[field] !== 'string') issues.push(routingPolicyReviewIssue('routing-policy-review-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow', 'review_task']) {
    if (!stringValue(value[field])) issues.push(routingPolicyReviewIssue('routing-policy-review-identity-invalid', `${field} is required.`));
  }
  if (value.receipt_path != null && typeof value.receipt_path !== 'string') {
    issues.push(routingPolicyReviewIssue('routing-policy-review-receipt-invalid', 'receipt_path must be a string when present.'));
  }
  if (!isObject(value.source_pilot)) issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', 'source_pilot must be an object.'));
  if (!isObject(value.requirements)) issues.push(routingPolicyReviewIssue('routing-policy-review-requirements-invalid', 'requirements must be an object.'));
  if (!Array.isArray(value.reviews)) issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', 'reviews must be an array.'));
  if (!isObject(value.totals)) issues.push(routingPolicyReviewIssue('routing-policy-review-total-mismatch', 'totals must be an object.'));
  if (!isObject(value.promotion_review)) issues.push(routingPolicyReviewIssue('routing-policy-review-mismatch', 'promotion_review must be an object.'));
  if (!Array.isArray(value.guardrails)) issues.push(routingPolicyReviewIssue('routing-policy-review-receipt-invalid', 'guardrails must be an array.'));
  if (!Array.isArray(value.next_actions)) issues.push(routingPolicyReviewIssue('routing-policy-review-receipt-invalid', 'next_actions must be an array.'));
  if (issues.length) return issues;

  const rebuilt = buildRoutingPolicyReview({
    source_pilot: value.source_pilot,
    reviews: value.reviews,
    goal_id: value.goal_id,
    run_id: value.run_id,
    workflow: value.workflow,
    review_task: value.review_task,
  }, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['source_pilot', 'requirements', 'reviews', 'totals', 'promotion_review', 'guardrails', 'next_actions']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(routingPolicyReviewIssue('routing-policy-review-mismatch', `${field} must match canonical routing policy review computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-mismatch', 'ok must match canonical routing policy review computation.'));
  }
  return issues;
}

export function routingPolicyReviewIssue(code, message) {
  return { code, message };
}

function normalizeSourcePilot(input, issues) {
  const pilot = input.routing_policy_pilot || input.policy_pilot || input.pilot || (isRoutingPolicyPilotReceipt(input) ? input : null);
  if (pilot) {
    const pilotIssues = validateRoutingPolicyPilotReceipt(pilot);
    for (const item of pilotIssues) {
      issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', item.message));
    }
    return pilotIssues.length ? emptySourcePilot() : sourcePilotFromReceipt(pilot);
  }

  if (isObject(input.source_pilot)) {
    return sourcePilotFromSummary(input.source_pilot, issues);
  }

  issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', 'A routing policy pilot receipt or source_pilot summary is required.'));
  return emptySourcePilot();
}

function sourcePilotFromReceipt(pilot) {
  return {
    receipt_path: stringValue(pilot.receipt_path),
    schema_version: stringValue(pilot.schema_version),
    generated_at: stringValue(pilot.generated_at),
    source: stringValue(pilot.source),
    goal_id: stringValue(pilot.goal_id),
    run_id: stringValue(pilot.run_id),
    workflow: stringValue(pilot.workflow),
    pilot_task: stringValue(pilot.pilot_task),
    policy_receipt: stringValue(pilot.source_policy?.receipt_path),
    suite_receipt: stringValue(pilot.pilot_suite?.receipt_path),
    policy_fit: pilotFit(pilot.policy_fit),
    totals: pilotTotals(pilot.totals),
    guardrails: stringArray(pilot.guardrails),
    next_actions: stringArray(pilot.next_actions),
  };
}

function sourcePilotFromSummary(summary, issues) {
  const normalized = {
    receipt_path: stringValue(summary.receipt_path),
    schema_version: stringValue(summary.schema_version),
    generated_at: stringValue(summary.generated_at),
    source: stringValue(summary.source),
    goal_id: stringValue(summary.goal_id),
    run_id: stringValue(summary.run_id),
    workflow: stringValue(summary.workflow),
    pilot_task: stringValue(summary.pilot_task),
    policy_receipt: stringValue(summary.policy_receipt),
    suite_receipt: stringValue(summary.suite_receipt),
    policy_fit: pilotFit(summary.policy_fit),
    totals: pilotTotals(summary.totals),
    guardrails: stringArray(summary.guardrails),
    next_actions: stringArray(summary.next_actions),
  };
  for (const field of ['schema_version', 'generated_at', 'goal_id', 'run_id', 'workflow', 'pilot_task']) {
    if (!normalized[field]) issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', `source_pilot.${field} is required.`));
  }
  if (normalized.schema_version && normalized.schema_version !== 'aipedia.agent-routing-policy-pilot.v2') {
    issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', 'source_pilot.schema_version must be aipedia.agent-routing-policy-pilot.v2.'));
  }
  if (!['pass', 'replay-only', 'evidence-overlap', 'attention', 'blocked'].includes(normalized.policy_fit.status)) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-source-pilot-invalid', 'source_pilot.policy_fit.status is invalid.'));
  }
  return normalized;
}

function pilotFit(policyFitValue) {
  return {
    status: stringValue(policyFitValue?.status),
    promotion_candidate: policyFitValue?.promotion_candidate === true,
    same_source_replay: policyFitValue?.same_source_replay === true,
    shared_evidence_overlap: policyFitValue?.shared_evidence_overlap === true,
    match_rate: numberValue(policyFitValue?.match_rate),
    reason: stringValue(policyFitValue?.reason),
  };
}

function pilotTotals(totals) {
  return {
    policy_rule_count: nonNegativeInteger(totals?.policy_rule_count),
    pilot_scenario_count: nonNegativeInteger(totals?.pilot_scenario_count),
    evaluated_scenario_count: nonNegativeInteger(totals?.evaluated_scenario_count),
    matched_rule_count: nonNegativeInteger(totals?.matched_rule_count),
    mismatched_rule_count: nonNegativeInteger(totals?.mismatched_rule_count),
    missing_rule_count: nonNegativeInteger(totals?.missing_rule_count),
    blocked_scenario_count: nonNegativeInteger(totals?.blocked_scenario_count),
    not_recommended_scenario_count: nonNegativeInteger(totals?.not_recommended_scenario_count),
    telemetry_backed_scenario_count: nonNegativeInteger(totals?.telemetry_backed_scenario_count),
    telemetry_ref_count: nonNegativeInteger(totals?.telemetry_ref_count),
    covered_policy_rule_count: nonNegativeInteger(totals?.covered_policy_rule_count),
    uncovered_policy_rule_count: nonNegativeInteger(totals?.uncovered_policy_rule_count),
    same_source_replay: totals?.same_source_replay === true,
    shared_telemetry_ref_count: nonNegativeInteger(totals?.shared_telemetry_ref_count),
    match_rate: numberValue(totals?.match_rate),
    uncovered_task_classes: stringArray(totals?.uncovered_task_classes),
  };
}

function reviewRows(input, sourcePilot) {
  if (Array.isArray(input.reviews)) return input.reviews;
  if (input.accept_required_lenses === true) return acceptedRequiredReviews(input, sourcePilot);
  return [];
}

function acceptedRequiredReviews(input, sourcePilot) {
  const reviewer = stringValue(input.reviewer);
  const note = stringValue(input.review_note || input.note) || 'Required routing-policy review lens accepted for this pilot.';
  const reviewedAt = stringValue(input.reviewed_at);
  const evidenceRefs = [
    sourcePilot.receipt_path,
    ...splitEvidenceRefs(sourcePilot.source),
    sourcePilot.policy_receipt,
    sourcePilot.suite_receipt,
  ].filter(Boolean);
  return REQUIRED_ROUTING_POLICY_REVIEW_LENSES.map((lens) => ({
    lens,
    reviewer,
    status: 'accepted',
    note,
    reviewed_at: reviewedAt,
    evidence_refs: evidenceRefs,
  }));
}

function normalizeReviews(rows, issues) {
  if (!Array.isArray(rows)) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', 'reviews must be an array.'));
    return [];
  }
  const normalized = rows.map((row, index) => normalizeReview(row, issues, index));
  const duplicateLenses = duplicates(normalized.map((row) => row.lens).filter(Boolean));
  for (const lens of duplicateLenses) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews has duplicate lens ${lens}.`));
  }
  return normalized.sort((left, right) => lensSortKey(left.lens) - lensSortKey(right.lens) || left.reviewer.localeCompare(right.reviewer));
}

function normalizeReview(row, issues, index) {
  const review = {
    lens: stringValue(row?.lens),
    reviewer: stringValue(row?.reviewer),
    status: stringValue(row?.status),
    note: stringValue(row?.note),
    reviewed_at: stringValue(row?.reviewed_at),
    evidence_refs: stringArray(row?.evidence_refs),
  };
  if (!REQUIRED_ROUTING_POLICY_REVIEW_LENSES.includes(review.lens)) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews[${index}].lens must be one of the required review lenses.`));
  }
  if (!REVIEW_STATUSES.has(review.status)) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews[${index}].status must be accepted, needs-work, or rejected.`));
  }
  if (!review.reviewer) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews[${index}].reviewer is required.`));
  }
  if (review.status === 'accepted' && !review.note) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews[${index}].note is required for accepted reviews.`));
  }
  if (review.status === 'accepted' && review.evidence_refs.length === 0) {
    issues.push(routingPolicyReviewIssue('routing-policy-review-reviews-invalid', `reviews[${index}].evidence_refs must include at least one evidence path for accepted reviews.`));
  }
  return review;
}

function reviewRequirements() {
  return {
    pilot_status_required: 'pass',
    promotion_candidate_required: true,
    evidence_independence_required: true,
    match_rate_min: 1,
    telemetry_coverage_required: true,
    all_policy_rules_covered_required: true,
    required_review_lenses: [...REQUIRED_ROUTING_POLICY_REVIEW_LENSES],
  };
}

function reviewTotals(requirements, reviews) {
  const required = new Set(requirements.required_review_lenses);
  const accepted = new Set(reviews.filter((review) => review.status === 'accepted').map((review) => review.lens));
  const rejected = reviews.filter((review) => review.status === 'rejected');
  const needsWork = reviews.filter((review) => review.status === 'needs-work');
  const missing = [...required].filter((lens) => !accepted.has(lens)).sort((left, right) => lensSortKey(left) - lensSortKey(right));
  return {
    review_count: reviews.length,
    required_lens_count: required.size,
    accepted_required_lens_count: [...accepted].filter((lens) => required.has(lens)).length,
    rejected_review_count: rejected.length,
    needs_work_review_count: needsWork.length,
    missing_required_lens_count: missing.length,
    missing_required_lenses: missing,
  };
}

function promotionReviewSummary(sourcePilot, totals) {
  const pilotReady = sourcePilot.policy_fit.status === 'pass'
    && sourcePilot.policy_fit.promotion_candidate === true
    && sourcePilot.policy_fit.same_source_replay === false
    && sourcePilot.policy_fit.shared_evidence_overlap === false
    && sourcePilot.policy_fit.match_rate >= 1
    && sourcePilot.totals.mismatched_rule_count === 0
    && sourcePilot.totals.missing_rule_count === 0
    && sourcePilot.totals.blocked_scenario_count === 0
    && sourcePilot.totals.not_recommended_scenario_count === 0
    && sourcePilot.totals.uncovered_policy_rule_count === 0
    && sourcePilot.totals.shared_telemetry_ref_count === 0
    && sourcePilot.totals.telemetry_backed_scenario_count === sourcePilot.totals.pilot_scenario_count
    && sourcePilot.totals.covered_policy_rule_count === sourcePilot.totals.policy_rule_count;
  const status = promotionReviewStatus(pilotReady, totals);
  return {
    status,
    default_ready: status === 'accepted',
    pilot_ready: pilotReady,
    reviewer_pass_complete: totals.missing_required_lens_count === 0 && totals.rejected_review_count === 0 && totals.needs_work_review_count === 0,
    reason: promotionReviewReason(status, pilotReady, totals),
  };
}

function promotionReviewStatus(pilotReady, totals) {
  if (!pilotReady) return 'pilot-not-ready';
  if (totals.rejected_review_count > 0) return 'rejected';
  if (totals.needs_work_review_count > 0 || totals.missing_required_lens_count > 0) return 'needs-review';
  return 'accepted';
}

function promotionReviewReason(status, pilotReady, totals) {
  if (!pilotReady) return 'The source pilot is not an independent pass with full telemetry, rule coverage, and no mismatches.';
  if (status === 'rejected') return 'At least one required reviewer lens rejected the routing policy promotion.';
  if (status === 'needs-review') {
    if (totals.missing_required_lens_count > 0) return 'Required reviewer lenses are missing accepted review rows.';
    return 'At least one required reviewer lens still needs work.';
  }
  return 'All required reviewer lenses accepted the fresh independent pilot.';
}

function reviewGuardrails(sourcePilot, promotionReview, totals) {
  const guardrails = [];
  if (!promotionReview.pilot_ready) guardrails.push('Do not change default orchestration from a pilot that is not an independent pass.');
  if (totals.missing_required_lens_count > 0) guardrails.push('Do not change default orchestration until every required review lens is accepted.');
  if (totals.rejected_review_count > 0 || totals.needs_work_review_count > 0) guardrails.push('Resolve rejected or needs-work review lenses before promotion.');
  if (sourcePilot.policy_fit.same_source_replay) guardrails.push('Do not use source-suite replay as a promotion review.');
  if (sourcePilot.policy_fit.shared_evidence_overlap) guardrails.push('Do not use shared correction telemetry as independent promotion evidence.');
  guardrails.push('Re-run the routing suite, policy, pilot, and review receipts after material workflow, model, prompt, or guard changes.');
  return guardrails;
}

function reviewNextActions(promotionReview, totals) {
  if (promotionReview.status === 'accepted') return ['Apply the routing policy only through a guarded rollout with exact token, correction, quality, accuracy, and wall-time receipts.'];
  if (promotionReview.status === 'pilot-not-ready') return ['Run a fresh independent passing policy pilot before requesting reviewer acceptance.'];
  if (promotionReview.status === 'rejected') return ['Fix rejected review findings, rerun the pilot, then regenerate the routing-policy review receipt.'];
  if (totals.missing_required_lens_count > 0) return [`Add accepted review rows for missing lenses: ${totals.missing_required_lenses.join(', ')}.`];
  return ['Resolve needs-work review rows, rerun the pilot if needed, then regenerate the routing-policy review receipt.'];
}

function emptySourcePilot() {
  return {
    receipt_path: '',
    schema_version: '',
    generated_at: '',
    source: '',
    goal_id: '',
    run_id: '',
    workflow: '',
    pilot_task: '',
    policy_receipt: '',
    suite_receipt: '',
    policy_fit: pilotFit({}),
    totals: pilotTotals({}),
    guardrails: [],
    next_actions: [],
  };
}

function isRoutingPolicyPilotReceipt(value) {
  return isObject(value) && value.mode === 'agent-routing-policy-pilot' && typeof value.schema_version === 'string';
}

function lensSortKey(lens) {
  const index = REQUIRED_ROUTING_POLICY_REVIEW_LENSES.indexOf(lens);
  return index >= 0 ? index : REQUIRED_ROUTING_POLICY_REVIEW_LENSES.length;
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

function stringArray(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(stringValue).filter(Boolean))].sort();
}

function splitEvidenceRefs(value) {
  const text = stringValue(value);
  if (!text) return [];
  return text.split(' + ').map(stringValue).filter(Boolean);
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
