export const CORRECTION_TELEMETRY_SCHEMA_VERSION = 'aipedia.correction-telemetry.v1';

const EVENT_TYPES = new Set(['finding', 'correction_applied', 'residual_issue', 'regression']);

export function buildCorrectionTelemetry(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      receipt: null,
      issues: [correctionIssue('correction-telemetry-input-invalid', 'Input must be an object.')],
    };
  }

  for (const field of ['goal_id', 'run_id', 'workflow']) {
    if (!stringValue(input[field])) {
      issues.push(correctionIssue('correction-telemetry-identity-invalid', `${field} is required.`));
    }
  }
  const telemetrySource = normalizeTelemetrySource(input.telemetry_source, issues);
  const candidatesInput = Array.isArray(input.candidates) ? input.candidates : [];
  if (!Array.isArray(input.candidates)) {
    issues.push(correctionIssue('correction-telemetry-candidates-invalid', 'candidates must be an array.'));
  }
  if (candidatesInput.length === 0) {
    issues.push(correctionIssue('correction-telemetry-candidates-invalid', 'At least one candidate is required.'));
  }

  const candidateIds = new Set();
  const candidates = candidatesInput.map((candidate, index) => normalizeCandidate(candidate, index, candidateIds, issues));
  if (issues.length) return { receipt: null, issues };

  return {
    receipt: {
      ok: true,
      mode: 'agent-correction-telemetry',
      schema_version: CORRECTION_TELEMETRY_SCHEMA_VERSION,
      generated_at: options.generatedAt || input.generated_at || new Date().toISOString(),
      project_dir: options.projectDir || input.project_dir || '.',
      source: options.source || input.source || '',
      goal_id: stringValue(input.goal_id),
      run_id: stringValue(input.run_id),
      workflow: stringValue(input.workflow),
      telemetry_source: telemetrySource,
      totals: telemetryTotals(candidates),
      candidates,
      routing_candidate_overrides: candidates.map((candidate) => ({
        id: candidate.id,
        run_id: candidate.run_id,
        correction_outcomes: candidate.correction_outcomes,
      })),
    },
    issues,
  };
}

export function validateCorrectionTelemetryReceipt(value) {
  const issues = [];
  if (!isObject(value)) {
    return [correctionIssue('correction-telemetry-receipt-invalid', 'Receipt must be an object.')];
  }
  for (const [field, expected] of [
    ['mode', 'agent-correction-telemetry'],
    ['schema_version', CORRECTION_TELEMETRY_SCHEMA_VERSION],
  ]) {
    if (value[field] !== expected) issues.push(correctionIssue('correction-telemetry-receipt-invalid', `${field} must be ${expected}.`));
  }
  for (const field of ['generated_at', 'project_dir', 'source', 'goal_id', 'run_id', 'workflow']) {
    if (typeof value[field] !== 'string') issues.push(correctionIssue('correction-telemetry-receipt-invalid', `${field} must be a string.`));
  }
  for (const field of ['goal_id', 'run_id', 'workflow']) {
    if (!stringValue(value[field])) issues.push(correctionIssue('correction-telemetry-identity-invalid', `${field} is required.`));
  }
  if (!isObject(value.telemetry_source)) issues.push(correctionIssue('correction-telemetry-source-invalid', 'telemetry_source must be an object.'));
  if (!isObject(value.totals)) issues.push(correctionIssue('correction-telemetry-total-mismatch', 'totals must be an object.'));
  if (!Array.isArray(value.candidates)) issues.push(correctionIssue('correction-telemetry-candidates-invalid', 'candidates must be an array.'));
  if (!Array.isArray(value.routing_candidate_overrides)) {
    issues.push(correctionIssue('correction-telemetry-receipt-invalid', 'routing_candidate_overrides must be an array.'));
  }
  if (issues.length) return issues;

  const rebuilt = buildCorrectionTelemetry(value, {
    generatedAt: value.generated_at,
    projectDir: value.project_dir,
    source: value.source,
  });
  if (rebuilt.issues.length) return rebuilt.issues;

  const expected = rebuilt.receipt;
  for (const field of ['telemetry_source', 'totals', 'candidates', 'routing_candidate_overrides']) {
    if (!deepEqual(value[field], expected[field])) {
      issues.push(correctionIssue('correction-telemetry-total-mismatch', `${field} must match canonical correction telemetry computation.`));
    }
  }
  if (value.ok !== expected.ok) {
    issues.push(correctionIssue('correction-telemetry-total-mismatch', 'ok must match canonical correction telemetry computation.'));
  }
  return issues;
}

export function correctionOutcomeForCandidate(receipt, candidate) {
  if (!isObject(receipt) || receipt.schema_version !== CORRECTION_TELEMETRY_SCHEMA_VERSION || !Array.isArray(receipt.candidates)) {
    return null;
  }
  const candidateId = stringValue(candidate?.id);
  const runId = stringValue(candidate?.run_id);
  const match = receipt.candidates.find((row) => row.id === candidateId)
    || receipt.candidates.find((row) => row.run_id === runId);
  if (!match) return null;
  return {
    outcomes: match.correction_outcomes,
    candidate_id: match.id,
    receipt_path: stringValue(receipt.receipt_path) || stringValue(receipt.source),
  };
}

export function correctionIssue(code, message) {
  return { code, message };
}

function normalizeTelemetrySource(value, issues) {
  if (!isObject(value)) {
    issues.push(correctionIssue('correction-telemetry-source-invalid', 'telemetry_source must be an object.'));
    return { type: '', id: '', confidence: '' };
  }
  const type = stringValue(value.type);
  if (!['runtime', 'reviewer', 'validator'].includes(type)) {
    issues.push(correctionIssue('correction-telemetry-source-invalid', 'telemetry_source.type must be runtime, reviewer, or validator.'));
  }
  const id = stringValue(value.id);
  if (!id) issues.push(correctionIssue('correction-telemetry-source-invalid', 'telemetry_source.id is required.'));
  return {
    type,
    id,
    confidence: stringValue(value.confidence) || 'exact',
  };
}

function normalizeCandidate(candidate, index, candidateIds, issues) {
  const path = `candidates[${index}]`;
  if (!isObject(candidate)) {
    issues.push(correctionIssue('correction-telemetry-candidate-invalid', `${path} must be an object.`));
    return emptyCandidate();
  }

  const id = stringValue(candidate.id);
  if (!id) issues.push(correctionIssue('correction-telemetry-candidate-invalid', `${path}.id is required.`));
  if (id && candidateIds.has(id)) issues.push(correctionIssue('correction-telemetry-candidate-invalid', `${path}.id must be unique.`));
  if (id) candidateIds.add(id);

  for (const field of ['workflow', 'run_id', 'orchestrator']) {
    if (!stringValue(candidate[field])) issues.push(correctionIssue('correction-telemetry-candidate-invalid', `${path}.${field} is required.`));
  }
  if (!Array.isArray(candidate.events)) {
    issues.push(correctionIssue('correction-telemetry-events-invalid', `${path}.events must be an array.`));
  }

  const eventIds = new Set();
  const findingIds = new Set();
  const events = (Array.isArray(candidate.events) ? candidate.events : []).map((event, eventIndex) => {
    const normalized = normalizeEvent(event, `${path}.events[${eventIndex}]`, eventIds, issues);
    if (normalized.type === 'finding') findingIds.add(normalized.id);
    return normalized;
  });
  for (const event of events) {
    if (event.type === 'correction_applied' && !findingIds.has(event.finding_id)) {
      issues.push(correctionIssue('correction-telemetry-event-mismatch', `${path}.events correction_applied finding_id must reference a finding event.`));
    }
  }
  const correctionOutcomes = correctionOutcomesFromEvents(events);
  if (correctionOutcomes.corrections_applied > correctionOutcomes.findings_count) {
    issues.push(correctionIssue('correction-telemetry-event-mismatch', `${path}.corrections_applied cannot exceed findings_count.`));
  }

  return {
    id,
    workflow: stringValue(candidate.workflow),
    run_id: stringValue(candidate.run_id),
    orchestrator: stringValue(candidate.orchestrator),
    subagent: stringValue(candidate.subagent),
    event_count: events.length,
    event_type_counts: eventTypeCounts(events),
    correction_outcomes: correctionOutcomes,
    events,
  };
}

function normalizeEvent(event, path, eventIds, issues) {
  if (!isObject(event)) {
    issues.push(correctionIssue('correction-telemetry-event-invalid', `${path} must be an object.`));
    return { id: '', type: '', finding_id: '', severity: '', note: '' };
  }
  const id = stringValue(event.id);
  const type = stringValue(event.type);
  if (!id) issues.push(correctionIssue('correction-telemetry-event-invalid', `${path}.id is required.`));
  if (id && eventIds.has(id)) issues.push(correctionIssue('correction-telemetry-event-invalid', `${path}.id must be unique within the candidate.`));
  if (id) eventIds.add(id);
  if (!EVENT_TYPES.has(type)) {
    issues.push(correctionIssue('correction-telemetry-event-invalid', `${path}.type must be finding, correction_applied, residual_issue, or regression.`));
  }
  const findingId = stringValue(event.finding_id);
  if (type === 'correction_applied' && !findingId) {
    issues.push(correctionIssue('correction-telemetry-event-invalid', `${path}.finding_id is required for correction_applied events.`));
  }
  return {
    id,
    type,
    finding_id: findingId,
    severity: stringValue(event.severity),
    note: stringValue(event.note),
  };
}

function correctionOutcomesFromEvents(events) {
  return {
    findings_count: events.filter((event) => event.type === 'finding').length,
    corrections_applied: events.filter((event) => event.type === 'correction_applied').length,
    residual_issue_count: events.filter((event) => event.type === 'residual_issue').length,
    regression_count: events.filter((event) => event.type === 'regression').length,
  };
}

function eventTypeCounts(events) {
  return {
    finding: events.filter((event) => event.type === 'finding').length,
    correction_applied: events.filter((event) => event.type === 'correction_applied').length,
    residual_issue: events.filter((event) => event.type === 'residual_issue').length,
    regression: events.filter((event) => event.type === 'regression').length,
  };
}

function telemetryTotals(candidates) {
  return {
    candidate_count: candidates.length,
    event_count: candidates.reduce((sum, candidate) => sum + candidate.event_count, 0),
    findings_count: candidates.reduce((sum, candidate) => sum + candidate.correction_outcomes.findings_count, 0),
    corrections_applied: candidates.reduce((sum, candidate) => sum + candidate.correction_outcomes.corrections_applied, 0),
    residual_issue_count: candidates.reduce((sum, candidate) => sum + candidate.correction_outcomes.residual_issue_count, 0),
    regression_count: candidates.reduce((sum, candidate) => sum + candidate.correction_outcomes.regression_count, 0),
  };
}

function emptyCandidate() {
  return {
    id: '',
    workflow: '',
    run_id: '',
    orchestrator: '',
    subagent: '',
    event_count: 0,
    event_type_counts: eventTypeCounts([]),
    correction_outcomes: correctionOutcomesFromEvents([]),
    events: [],
  };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value) {
  return typeof value === 'string' ? value.trim() : '';
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
