import { buildCorrectionTelemetry, correctionIssue } from './correction-telemetry.mjs';

const EVENT_TYPE_ALIASES = new Map([
  ['finding', 'finding'],
  ['issue', 'finding'],
  ['review_finding', 'finding'],
  ['correction_applied', 'correction_applied'],
  ['correction', 'correction_applied'],
  ['fix', 'correction_applied'],
  ['fixed', 'correction_applied'],
  ['residual_issue', 'residual_issue'],
  ['residual', 'residual_issue'],
  ['open_issue', 'residual_issue'],
  ['unresolved', 'residual_issue'],
  ['regression', 'regression'],
  ['regressed', 'regression'],
]);

const CORRECTED_STATUSES = new Set(['corrected', 'fixed', 'resolved', 'applied']);
const RESIDUAL_STATUSES = new Set(['open', 'unresolved', 'residual', 'needs_fix', 'needs-fix', 'pending']);
const REGRESSION_STATUSES = new Set(['regression', 'regressed']);

export function buildCorrectionTelemetryFromAdapter(input, options = {}) {
  const issues = [];
  if (!isObject(input)) {
    return {
      telemetryInput: null,
      receipt: null,
      issues: [correctionIssue('correction-adapter-input-invalid', 'Input must be an object.')],
    };
  }

  const candidatesInput = Array.isArray(input.candidates) ? input.candidates : [];
  if (!Array.isArray(input.candidates)) {
    issues.push(correctionIssue('correction-adapter-candidates-invalid', 'candidates must be an array.'));
  }
  if (candidatesInput.length === 0) {
    issues.push(correctionIssue('correction-adapter-candidates-invalid', 'At least one candidate is required.'));
  }

  const topLevelEvents = [
    ...arrayValue(input.events),
    ...arrayValue(input.runtime_events),
    ...arrayValue(input.reviewer_events),
  ];
  const candidateIds = new Set(candidatesInput.map((candidate) => stringValue(candidate?.id)).filter(Boolean));
  for (const [index, event] of topLevelEvents.entries()) {
    const candidateId = stringValue(event?.candidate_id || event?.candidate || event?.routing_candidate_id);
    if (!candidateId) {
      issues.push(correctionIssue('correction-adapter-event-invalid', `top-level event ${index} needs candidate_id.`));
    } else if (!candidateIds.has(candidateId)) {
      issues.push(correctionIssue('correction-adapter-event-invalid', `top-level event ${index} references unknown candidate ${candidateId}.`));
    }
  }
  if (issues.length) return { telemetryInput: null, receipt: null, issues };

  const candidates = candidatesInput.map((candidate, index) => normalizeCandidate(candidate, index, topLevelEvents, issues));
  if (issues.length) return { telemetryInput: null, receipt: null, issues };

  const telemetryInput = {
    goal_id: stringValue(input.goal_id),
    run_id: stringValue(input.run_id),
    workflow: stringValue(input.workflow),
    telemetry_source: normalizeTelemetrySource(input.telemetry_source, input),
    candidates,
  };
  const result = buildCorrectionTelemetry(telemetryInput, options);
  return {
    telemetryInput,
    receipt: result.receipt,
    issues: result.issues,
  };
}

function normalizeCandidate(candidate, index, topLevelEvents, issues) {
  const path = `candidates[${index}]`;
  const id = stringValue(candidate?.id);
  const explicitCorrections = [
    ...arrayValue(candidate?.corrections),
    ...arrayValue(candidate?.corrections_applied),
    ...arrayValue(candidate?.fixes),
  ];
  const explicitResiduals = [
    ...arrayValue(candidate?.residual_issues),
    ...arrayValue(candidate?.residuals),
    ...arrayValue(candidate?.open_issues),
  ];
  const explicitRegressions = arrayValue(candidate?.regressions);
  const explicitCorrectionFindingIds = new Set(explicitCorrections.map((event) => stringValue(event.finding_id)).filter(Boolean));
  const explicitResidualFindingIds = new Set(explicitResiduals.map((event) => stringValue(event.finding_id)).filter(Boolean));
  const explicitRegressionFindingIds = new Set(explicitRegressions.map((event) => stringValue(event.finding_id)).filter(Boolean));
  const usedIds = new Set();
  const events = [];
  const pushEvent = (event, fallbackSeed) => {
    const normalized = normalizeEvent(event, fallbackSeed, usedIds, issues);
    if (normalized) events.push(normalized);
  };

  for (const [findingIndex, finding] of [
    ...arrayValue(candidate?.findings),
    ...arrayValue(candidate?.review_findings),
  ].entries()) {
    const findingId = stringValue(finding.id) || uniqueId(usedIds, `${id || 'candidate'}-finding-${findingIndex + 1}`);
    const status = normalizedStatus(finding.status || finding.outcome);
    pushEvent(
      {
        id: findingId,
        type: 'finding',
        severity: finding.severity,
        note: finding.note || finding.summary || finding.message,
      },
      `${path}.findings[${findingIndex}]`,
    );
    if ((finding.corrected === true || CORRECTED_STATUSES.has(status)) && !explicitCorrectionFindingIds.has(findingId)) {
      pushEvent(
        {
          id: stringValue(finding.correction_id) || `${findingId}-correction`,
          type: 'correction_applied',
          finding_id: findingId,
          severity: finding.severity,
          note: finding.correction_note || finding.note || finding.summary,
        },
        `${path}.findings[${findingIndex}].correction`,
      );
    }
    if ((finding.residual === true || RESIDUAL_STATUSES.has(status)) && !explicitResidualFindingIds.has(findingId)) {
      pushEvent(
        {
          id: stringValue(finding.residual_id) || `${findingId}-residual`,
          type: 'residual_issue',
          finding_id: findingId,
          severity: finding.severity,
          note: finding.residual_note || finding.note || finding.summary,
        },
        `${path}.findings[${findingIndex}].residual`,
      );
    }
    if ((finding.regression === true || REGRESSION_STATUSES.has(status)) && !explicitRegressionFindingIds.has(findingId)) {
      pushEvent(
        {
          id: stringValue(finding.regression_id) || `${findingId}-regression`,
          type: 'regression',
          finding_id: findingId,
          severity: finding.severity,
          note: finding.regression_note || finding.note || finding.summary,
        },
        `${path}.findings[${findingIndex}].regression`,
      );
    }
  }

  for (const [eventIndex, event] of arrayValue(candidate?.events).entries()) {
    pushEvent(event, `${path}.events[${eventIndex}]`);
  }
  for (const [eventIndex, event] of explicitCorrections.entries()) {
    pushEvent({ ...event, type: event.type || 'correction_applied' }, `${path}.corrections[${eventIndex}]`);
  }
  for (const [eventIndex, event] of explicitResiduals.entries()) {
    pushEvent({ ...event, type: event.type || 'residual_issue' }, `${path}.residual_issues[${eventIndex}]`);
  }
  for (const [eventIndex, event] of explicitRegressions.entries()) {
    pushEvent({ ...event, type: event.type || 'regression' }, `${path}.regressions[${eventIndex}]`);
  }
  for (const [eventIndex, event] of topLevelEvents.filter((event) => {
    const candidateId = stringValue(event?.candidate_id || event?.candidate || event?.routing_candidate_id);
    return candidateId === id;
  }).entries()) {
    pushEvent(event, `${path}.top_level_events[${eventIndex}]`);
  }

  return {
    id,
    workflow: stringValue(candidate?.workflow),
    run_id: stringValue(candidate?.run_id),
    orchestrator: stringValue(candidate?.orchestrator),
    subagent: stringValue(candidate?.subagent),
    events,
  };
}

function normalizeEvent(event, fallbackSeed, usedIds, issues) {
  if (!isObject(event)) {
    issues.push(correctionIssue('correction-adapter-event-invalid', `${fallbackSeed} must be an object.`));
    return null;
  }
  const type = eventType(event.type || event.event_type || event.kind || event.status);
  if (!type) {
    issues.push(correctionIssue('correction-adapter-event-invalid', `${fallbackSeed}.type must map to finding, correction_applied, residual_issue, or regression.`));
    return null;
  }
  const rawId = stringValue(event.id || event.event_id);
  const id = rawId ? uniqueId(usedIds, rawId) : uniqueId(usedIds, `${fallbackSeed.replaceAll(/[^a-zA-Z0-9]+/g, '-')}-${type}`);
  return {
    id,
    type,
    finding_id: stringValue(event.finding_id || event.finding || event.parent_finding_id),
    severity: stringValue(event.severity),
    note: stringValue(event.note || event.summary || event.message),
  };
}

function normalizeTelemetrySource(value, input) {
  const source = isObject(value) ? value : {};
  const sourceType = stringValue(source.type || input.source_type || input.adapter_type) || inferSourceType(input);
  return {
    type: sourceType,
    id: stringValue(source.id || input.source_id || input.adapter_id) || 'correction-telemetry-adapter',
    confidence: stringValue(source.confidence) || 'exact',
  };
}

function inferSourceType(input) {
  if (Array.isArray(input.runtime_events)) return 'runtime';
  if (Array.isArray(input.reviewer_events) || input.candidates?.some((candidate) => Array.isArray(candidate.findings) || Array.isArray(candidate.review_findings))) {
    return 'reviewer';
  }
  return 'validator';
}

function eventType(value) {
  const key = normalizedStatus(value);
  return EVENT_TYPE_ALIASES.get(key) || '';
}

function normalizedStatus(value) {
  return stringValue(value).toLowerCase().replaceAll(/\s+/g, '_');
}

function uniqueId(usedIds, seed) {
  const base = stringValue(seed) || 'event';
  let candidate = base;
  let suffix = 2;
  while (usedIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  usedIds.add(candidate);
  return candidate;
}

function arrayValue(value) {
  return Array.isArray(value) ? value : [];
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function stringValue(value) {
  if (typeof value === 'string') return value.trim();
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return '';
}
