import { dateishField } from '../provenance';

export type DecisionConfidence = 'high' | 'medium' | 'low';

export interface DecisionPick {
  tool: string;
  label: string;
  reason: string;
  plan?: string;
  source_refs: string[];
  verified_at: string;
  confidence: DecisionConfidence;
}

export function normalizeDecisionPick(value: unknown): DecisionPick | undefined {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;

  const record = value as Record<string, unknown>;
  const tool = typeof record.tool === 'string' && record.tool.trim() ? record.tool.trim() : undefined;
  const reason = typeof record.reason === 'string' && record.reason.trim() ? record.reason.trim() : undefined;
  const verified_at = dateishField(record.verified_at);
  const confidence = record.confidence === 'high' || record.confidence === 'medium' || record.confidence === 'low'
    ? record.confidence
    : undefined;

  if (!tool || !reason || !verified_at || !confidence) return undefined;

  const label = typeof record.label === 'string' && record.label.trim() ? record.label.trim() : tool;
  const plan = typeof record.plan === 'string' && record.plan.trim() ? record.plan.trim() : undefined;
  const source_refs: string[] = [];

  if (Array.isArray(record.source_refs)) {
    for (const item of record.source_refs) {
      const sourceRef = typeof item === 'string' && item.trim() ? item.trim() : undefined;
      if (sourceRef) source_refs.push(sourceRef);
    }
  }

  if (source_refs.length === 0) return undefined;

  return {
    tool,
    label,
    reason,
    plan,
    source_refs,
    verified_at,
    confidence,
  };
}
