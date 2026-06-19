import sourceRegistry from '../data/source-registry.json';

export interface ProvenanceSource {
  id: string;
  label: string;
  url: string;
  type?: string;
  trust_tier?: string;
  volatility?: string;
  last_checked?: string;
}

export interface ResolvedProvenanceSource {
  source_id?: string;
  label?: string;
  url?: string;
  type?: string;
  trust_tier?: string;
  volatility?: string;
  last_checked?: string;
  verified?: string;
  is_registered: boolean;
}

export type PageSourceUse = 'fact' | 'pricing' | 'decision' | 'evidence' | 'body';
export type PageSourceState = 'registered' | 'unknown_id' | 'inline_only' | 'evidence_only';

export interface ResolvedPageSource {
  source_id?: string;
  label: string;
  url: string;
  type?: string;
  trust_tier?: string;
  volatility?: string;
  last_checked?: string;
  verified_at?: string;
  used_by: PageSourceUse[];
  state: PageSourceState;
}

export type ProvenanceCarrier = Record<string, unknown>;

const rawRegistry: unknown = sourceRegistry;
const registryById = new Map<string, ProvenanceSource>();

for (const source of readRegistrySources(rawRegistry)) {
  registryById.set(source.id, source);
}

export function resolveSource(sourceId: unknown): ProvenanceSource | undefined {
  const id = stringField(sourceId);
  return id ? registryById.get(id) : undefined;
}

export function resolveProvenanceSource(source: ProvenanceCarrier): ResolvedProvenanceSource | undefined {
  const sourceId = stringField(source.source_id);
  const registered = resolveSource(sourceId);

  if (registered) {
    return {
      source_id: registered.id,
      label: registered.label,
      url: registered.url,
      type: registered.type,
      trust_tier: registered.trust_tier,
      volatility: registered.volatility,
      last_checked: registered.last_checked,
      verified: registered.last_checked,
      is_registered: true,
    };
  }

  const fallbackUrl = stringField(source.source);
  const fallbackLabel = stringField(source.source_label) ?? fallbackUrl;

  if (!sourceId && !fallbackUrl && !fallbackLabel) {
    return undefined;
  }

  return {
    source_id: sourceId,
    label: fallbackLabel,
    url: fallbackUrl,
    volatility: stringField(source.volatility),
    verified: dateishField(source.verified_at),
    is_registered: false,
  };
}

export function resolvePageSource(source: ProvenanceCarrier, usedBy: PageSourceUse): ResolvedPageSource | undefined {
  const sourceId = stringField(source.source_id);
  const registered = resolveSource(sourceId);
  if (registered) {
    return {
      source_id: registered.id,
      label: registered.label,
      url: registered.url,
      type: registered.type,
      trust_tier: registered.trust_tier,
      volatility: registered.volatility,
      last_checked: registered.last_checked,
      verified_at: registered.last_checked,
      used_by: [usedBy],
      state: 'registered',
    };
  }

  const fallbackUrl = stringField(source.source) ?? stringField(source.url);
  const fallbackLabel = stringField(source.source_label) ?? stringField(source.label) ?? fallbackUrl;
  if (sourceId && fallbackUrl && fallbackLabel) {
    return {
      source_id: sourceId,
      label: fallbackLabel,
      url: fallbackUrl,
      volatility: stringField(source.volatility),
      verified_at: dateishField(source.verified_at) ?? dateishField(source.captured_at),
      used_by: [usedBy],
      state: 'unknown_id',
    };
  }
  if (!sourceId && fallbackUrl && fallbackLabel) {
    return {
      label: fallbackLabel,
      url: fallbackUrl,
      volatility: stringField(source.volatility),
      verified_at: dateishField(source.verified_at) ?? dateishField(source.captured_at),
      used_by: [usedBy],
      state: usedBy === 'evidence' ? 'evidence_only' : 'inline_only',
    };
  }
  return undefined;
}

export function dateishField(value: unknown): string | undefined {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return stringField(value);
}

function readRegistrySources(registry: unknown): ProvenanceSource[] {
  if (!isRecord(registry)) return [];

  const sources = registry.sources;
  if (!Array.isArray(sources)) return [];

  const resolved: ProvenanceSource[] = [];
  for (const candidate of sources) {
    if (!isRecord(candidate)) continue;

    const id = stringField(candidate.id);
    const label = stringField(candidate.label);
    const url = stringField(candidate.url);
    if (!id || !label || !url) continue;

    resolved.push({
      id,
      label,
      url,
      type: stringField(candidate.type),
      trust_tier: stringField(candidate.trust_tier),
      volatility: stringField(candidate.volatility),
      last_checked: dateishField(candidate.last_checked),
    });
  }

  return resolved;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringField(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
