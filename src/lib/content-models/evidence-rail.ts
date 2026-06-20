import type { ResolvedPageSource } from '../provenance';

export type EvidenceState = 'registered' | 'inline_only' | 'evidence_only' | 'unknown_id';
export type FreshnessState = 'current' | 'aging' | 'stale' | 'unknown';
export type EvidenceConfidence = 'high' | 'medium' | 'low';
export type EvidenceVolatility = 'low' | 'medium' | 'high';

export interface EvidenceRailModel {
  sourceCount: number;
  primaryLabel?: string;
  primaryUrl?: string;
  evidenceState: EvidenceState;
  freshnessState: FreshnessState;
  confidence: EvidenceConfidence;
  verifiedAt?: string;
  nextReviewAt?: string;
  volatility?: EvidenceVolatility;
  diagnostics: string[];
}

export interface EvidenceFactModel {
  confidence?: EvidenceConfidence;
  volatility?: EvidenceVolatility;
  verified_at?: string;
  source?: ResolvedPageSource;
}

export interface EvidenceDecisionPickModel {
  source_refs: string[];
  verified_at: string;
  confidence: EvidenceConfidence;
}

export interface EvidenceRailInput {
  sources?: readonly ResolvedPageSource[];
  facts?: readonly EvidenceFactModel[];
  decisions?: readonly EvidenceDecisionPickModel[];
  verifiedAt?: string;
  nextReviewAt?: string;
  confidence?: EvidenceConfidence;
  diagnostics?: readonly string[];
}

const MS_PER_DAY = 86_400_000;

const CONFIDENCE_RANK: Record<EvidenceConfidence, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

const STATE_RANK: Record<EvidenceState, number> = {
  registered: 1,
  evidence_only: 2,
  inline_only: 3,
  unknown_id: 4,
};

const VOLATILITY_RANK: Record<EvidenceVolatility, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

function isEvidenceConfidence(value: unknown): value is EvidenceConfidence {
  return value === 'high' || value === 'medium' || value === 'low';
}

function isEvidenceState(value: unknown): value is EvidenceState {
  return value === 'registered' || value === 'inline_only' || value === 'evidence_only' || value === 'unknown_id';
}

function isEvidenceVolatility(value: unknown): value is EvidenceVolatility {
  return value === 'low' || value === 'medium' || value === 'high';
}

function validDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const time = new Date(value).getTime();
  return Number.isNaN(time) ? undefined : value;
}

function sourceDate(source: ResolvedPageSource): string | undefined {
  return validDate(source.verified_at) ?? validDate(source.last_checked);
}

function sourceKey(source: ResolvedPageSource): string {
  return source.source_id || source.url || source.label;
}

function staleLimitDays(volatility: EvidenceVolatility | undefined): number {
  if (volatility === 'high') return 30;
  if (volatility === 'low') return 180;
  return 90;
}

function daysSince(value: string): number | undefined {
  const time = new Date(value).getTime();
  if (Number.isNaN(time)) return undefined;
  return Math.floor((Date.now() - time) / MS_PER_DAY);
}

function isPastDate(value: string | undefined): boolean {
  const time = value ? new Date(value).getTime() : Number.NaN;
  return !Number.isNaN(time) && time < Date.now();
}

function mergeConfidence(left: EvidenceConfidence, right: unknown): EvidenceConfidence {
  if (!isEvidenceConfidence(right)) return left;
  return CONFIDENCE_RANK[right] < CONFIDENCE_RANK[left] ? right : left;
}

function mergeState(left: EvidenceState, right: unknown): EvidenceState {
  if (!isEvidenceState(right)) return left;
  return STATE_RANK[right] > STATE_RANK[left] ? right : left;
}

export function normalizeEvidenceVolatility(value: unknown): EvidenceVolatility | undefined {
  return isEvidenceVolatility(value) ? value : undefined;
}

export function oldestEvidenceDate(left: string | undefined, right: string | undefined): string | undefined {
  const validLeft = validDate(left);
  const validRight = validDate(right);
  if (!validLeft) return validRight;
  if (!validRight) return validLeft;
  return new Date(validRight).getTime() < new Date(validLeft).getTime() ? validRight : validLeft;
}

export function earliestEvidenceDate(left: string | undefined, right: string | undefined): string | undefined {
  return oldestEvidenceDate(left, right);
}

export function highestEvidenceVolatility(left: unknown, right: unknown): EvidenceVolatility | undefined {
  const validLeft = normalizeEvidenceVolatility(left);
  const validRight = normalizeEvidenceVolatility(right);
  if (!validLeft) return validRight;
  if (!validRight) return validLeft;
  return VOLATILITY_RANK[validRight] > VOLATILITY_RANK[validLeft] ? validRight : validLeft;
}

export function isEvidenceSourceStale(source: ResolvedPageSource): boolean {
  if (isPastDate(source.next_review_at)) return true;
  const checked = sourceDate(source);
  if (!checked) return false;
  const ageDays = daysSince(checked);
  if (ageDays === undefined) return false;
  return ageDays > staleLimitDays(normalizeEvidenceVolatility(source.volatility));
}

function freshnessForDate(
  verifiedAt: string | undefined,
  nextReviewAt: string | undefined,
  volatility: EvidenceVolatility | undefined,
): FreshnessState {
  if (isPastDate(nextReviewAt)) return 'stale';
  const checked = validDate(verifiedAt);
  if (!checked) return 'unknown';
  const ageDays = daysSince(checked);
  if (ageDays === undefined) return 'unknown';
  const staleLimit = staleLimitDays(volatility);
  if (ageDays > staleLimit) return 'stale';
  if (ageDays > Math.floor(staleLimit * 0.66)) return 'aging';
  return 'current';
}

function pushDiagnostic(diagnostics: string[], message: string): void {
  if (!diagnostics.includes(message)) diagnostics.push(message);
}

function primarySource(sources: readonly ResolvedPageSource[]): ResolvedPageSource | undefined {
  return sources.find((source) => source.state === 'registered' && source.url)
    ?? sources.find((source) => source.url)
    ?? sources[0];
}

function addSource(sourcesByKey: Map<string, ResolvedPageSource>, source: ResolvedPageSource): void {
  const key = sourceKey(source);
  const existing = sourcesByKey.get(key);
  if (!existing) {
    sourcesByKey.set(key, source);
    return;
  }

  sourcesByKey.set(key, {
    ...existing,
    state: mergeState(existing.state, source.state),
    verified_at: oldestEvidenceDate(existing.verified_at, source.verified_at),
    last_checked: oldestEvidenceDate(existing.last_checked, source.last_checked),
    next_review_at: earliestEvidenceDate(existing.next_review_at, source.next_review_at),
    volatility: highestEvidenceVolatility(existing.volatility, source.volatility),
    used_by: Array.from(new Set([...existing.used_by, ...source.used_by])),
  });
}

export function buildEvidenceRailModel(input: EvidenceRailInput = {}): EvidenceRailModel {
  const sourcesByKey = new Map<string, ResolvedPageSource>();
  const diagnostics = [...(input.diagnostics ?? [])];
  const decisionRefs = new Set<string>();
  let confidence: EvidenceConfidence = input.confidence ?? 'high';
  let verifiedAt = validDate(input.verifiedAt);
  let nextReviewAt = validDate(input.nextReviewAt);
  let volatility: EvidenceVolatility | undefined;
  let evidenceState: EvidenceState = 'registered';

  for (const source of input.sources ?? []) {
    addSource(sourcesByKey, source);
  }

  for (const fact of input.facts ?? []) {
    confidence = mergeConfidence(confidence, fact.confidence);
    verifiedAt = oldestEvidenceDate(verifiedAt, fact.verified_at);
    volatility = highestEvidenceVolatility(volatility, fact.volatility);
    if (fact.source) addSource(sourcesByKey, fact.source);
  }

  for (const decision of input.decisions ?? []) {
    confidence = mergeConfidence(confidence, decision.confidence);
    verifiedAt = oldestEvidenceDate(verifiedAt, decision.verified_at);
    for (const sourceRef of decision.source_refs) {
      if (sourceRef) decisionRefs.add(sourceRef);
    }
  }

  const sources = Array.from(sourcesByKey.values());
  for (const source of sources) {
    evidenceState = mergeState(evidenceState, source.state);
    verifiedAt = oldestEvidenceDate(verifiedAt, sourceDate(source));
    nextReviewAt = earliestEvidenceDate(nextReviewAt, source.next_review_at);
    volatility = highestEvidenceVolatility(volatility, source.volatility);
  }

  const unresolvedDecisionRefs: string[] = [];
  for (const sourceRef of decisionRefs) {
    const resolved = sources.some((source) => source.source_id === sourceRef || source.url === sourceRef);
    if (!resolved) {
      unresolvedDecisionRefs.push(sourceRef);
      evidenceState = mergeState(evidenceState, 'evidence_only');
      pushDiagnostic(diagnostics, `Decision source reference ${sourceRef} is not resolved to a page source.`);
    }
  }

  if (sources.length === 0 && decisionRefs.size === 0) {
    evidenceState = 'unknown_id';
    confidence = mergeConfidence(confidence, 'low');
    pushDiagnostic(diagnostics, 'No source evidence is attached to this model.');
  }

  for (const source of sources) {
    if (source.state === 'unknown_id') {
      pushDiagnostic(diagnostics, `Unknown source id ${source.source_id ?? source.label}.`);
    } else if (source.state === 'inline_only') {
      pushDiagnostic(diagnostics, `Inline-only source ${source.label} should be registered.`);
    } else if (source.state === 'evidence_only') {
      pushDiagnostic(diagnostics, `Evidence-only source ${source.label} is not registered.`);
    }
    if (isEvidenceSourceStale(source)) {
      pushDiagnostic(diagnostics, `Stale source ${source.source_id || source.url || source.label}.`);
    }
  }

  const freshnessState = freshnessForDate(verifiedAt, nextReviewAt, volatility);
  if (freshnessState === 'unknown') {
    confidence = mergeConfidence(confidence, 'medium');
    pushDiagnostic(diagnostics, 'Evidence freshness is unknown.');
  } else if (freshnessState === 'aging') {
    confidence = mergeConfidence(confidence, 'medium');
    pushDiagnostic(diagnostics, 'Evidence is approaching its review window.');
  } else if (freshnessState === 'stale') {
    confidence = mergeConfidence(confidence, 'low');
    pushDiagnostic(diagnostics, 'Evidence is past its review window.');
  }

  if (evidenceState === 'unknown_id') confidence = mergeConfidence(confidence, 'low');
  if (evidenceState === 'inline_only' || evidenceState === 'evidence_only') confidence = mergeConfidence(confidence, 'medium');

  if (volatility === 'high') {
    pushDiagnostic(diagnostics, 'High-volatility evidence needs frequent review.');
  }

  const primary = primarySource(sources);
  return {
    sourceCount: sources.length + unresolvedDecisionRefs.length,
    primaryLabel: primary?.label ?? unresolvedDecisionRefs[0],
    primaryUrl: primary?.url || undefined,
    evidenceState,
    freshnessState,
    confidence,
    verifiedAt,
    nextReviewAt,
    volatility,
    diagnostics,
  };
}

export function evidenceRailFromSources(
  sources: readonly ResolvedPageSource[],
  fallback: Omit<EvidenceRailInput, 'sources'> = {},
): EvidenceRailModel {
  return buildEvidenceRailModel({ ...fallback, sources });
}

export function evidenceRailFromToolFacts(
  facts: readonly EvidenceFactModel[],
  fallback: Omit<EvidenceRailInput, 'facts'> = {},
): EvidenceRailModel {
  return buildEvidenceRailModel({ ...fallback, facts });
}

export function evidenceRailFromDecisionPicks(
  decisions: readonly EvidenceDecisionPickModel[],
  fallback: Omit<EvidenceRailInput, 'decisions'> = {},
): EvidenceRailModel {
  return buildEvidenceRailModel({ ...fallback, decisions });
}

export function evidenceRailFromFallbackDates(
  verifiedAt: string | undefined,
  nextReviewAt?: string,
  confidence?: EvidenceConfidence,
): EvidenceRailModel {
  return buildEvidenceRailModel({ verifiedAt, nextReviewAt, confidence });
}
