import { categoryLabel, overallScore } from '../../utils/tool-metadata';
import { dateishField, resolvePageSource, type ResolvedPageSource } from '../provenance';
import {
  buildEvidenceRailModel,
  highestEvidenceVolatility,
  isEvidenceSourceStale,
  oldestEvidenceDate,
  type EvidenceConfidence,
  type EvidenceRailModel,
} from './evidence-rail';

type Confidence = EvidenceConfidence;

type UnknownRecord = Record<string, unknown>;

export type ToolPageSourceStateContract =
  | { state: 'registered' }
  | { state: 'inline_only' }
  | { state: 'unknown_id' }
  | { state: 'evidence_only' };

export interface ToolFactModel {
  key: string;
  label: string;
  value: string;
  confidence?: Confidence;
  volatility?: 'high' | 'medium' | 'low';
  verified_at?: string;
  source?: ResolvedPageSource;
}

export interface ToolFactListItem {
  label: string;
  value: string;
  confidence?: Confidence;
  volatility?: 'high' | 'medium' | 'low';
  verified?: string;
  source?: string;
}

export interface PriceHistoryModel {
  date: string;
  plan?: string;
  price: string;
  note?: string;
  source?: ResolvedPageSource;
}

export interface ModelDiagnostic {
  severity: 'error' | 'warning';
  code: 'unknown_source_id' | 'inline_only_source' | 'stale_source' | 'missing_decision_field' | 'missing_required_field';
  path: string;
  message: string;
}

export interface ToolPageModel {
  identity: {
    slug: string;
    title: string;
    tagline: string;
    company?: string;
    url?: string;
    category?: string;
    category_label: string;
    secondary_categories: string[];
    status: string;
  };
  scores: {
    utility?: number;
    value?: number;
    moat?: number;
    longevity?: number;
    overall?: number;
    confidence: Confidence;
  };
  freshness: {
    last_updated: string;
    last_verified?: string;
    update_frequency?: string;
    has_stale_claims: boolean;
  };
  decision: {
    verdict: string;
    buy_if: string[];
    skip_if: string[];
    best_plan?: string;
    best_alternative?: string;
    watch_out?: string;
    recent_change?: string;
    source_refs: string[];
  };
  facts: ToolFactModel[];
  pricing: PriceHistoryModel[];
  sources: ResolvedPageSource[];
  evidence: EvidenceRailModel;
  cta: {
    label: string;
    href?: string;
    disclosure?: string;
    affiliate_state: 'none' | 'applied' | 'approved' | 'rejected' | 'paused' | 'unknown';
    affiliate_url?: string;
    affiliate_program?: string;
    canonical_url?: string;
    pricing_model?: string;
    price_range?: string;
  };
  diagnostics: ModelDiagnostic[];
}

const FACT_ORDER = [
  'best_for',
  'pricing_anchor',
  'flagship_model',
  'coding_agent',
  'agent_manifest',
  'context_window',
  'interface',
  'mcp_support',
  'watch_out_for',
  'best_paid_tier',
];

function isRecord(value: unknown): value is UnknownRecord {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringField(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.map(String).map((item) => item.trim()).filter(Boolean) : [];
}

function prettyLabel(key: string): string {
  return key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

function confidenceFromScore(score: number): Confidence {
  if (score >= 8.5) return 'high';
  if (score >= 6.5) return 'medium';
  return 'low';
}


export function toFactListFacts(facts: ToolFactModel[]): ToolFactListItem[] {
  return facts.map((fact) => ({
    label: fact.label,
    value: fact.value,
    confidence: fact.confidence,
    volatility: fact.volatility,
    verified: fact.verified_at,
    source: fact.source?.label,
  }));
}


function mergeSource(sources: Map<string, ResolvedPageSource>, source: ResolvedPageSource | undefined): void {
  if (!source?.url) return;
  const key = source.source_id || source.url;
  const existing = sources.get(key);
  if (!existing) {
    sources.set(key, source);
    return;
  }
  existing.used_by = Array.from(new Set([...existing.used_by, ...source.used_by]));
  existing.verified_at = oldestEvidenceDate(existing.verified_at, source.verified_at);
  existing.last_checked = oldestEvidenceDate(existing.last_checked, source.last_checked);
  existing.next_review_at = oldestEvidenceDate(existing.next_review_at, source.next_review_at);
  existing.volatility = highestEvidenceVolatility(existing.volatility, source.volatility);
}

function factModels(factsBlock: unknown, diagnostics: ModelDiagnostic[], sources: Map<string, ResolvedPageSource>): ToolFactModel[] {
  if (!isRecord(factsBlock)) return [];
  const keys = Array.from(new Set([...FACT_ORDER, ...Object.keys(factsBlock)]));
  const facts: ToolFactModel[] = [];
  for (const key of keys) {
    const raw = factsBlock[key];
    if (!raw) continue;
    if (typeof raw === 'string' && raw.trim()) {
      facts.push({ key, label: prettyLabel(key), value: raw.trim() });
      continue;
    }
    if (!isRecord(raw)) continue;
    const value = stringField(raw.value);
    if (!value) continue;
    const source = resolvePageSource(raw, 'fact');
    mergeSource(sources, source);
    if (source?.state === 'unknown_id') {
      diagnostics.push({ severity: 'error', code: 'unknown_source_id', path: `facts.${key}.source_id`, message: `Unknown source ID on ${key}` });
    } else if (source?.state === 'inline_only') {
      diagnostics.push({ severity: 'warning', code: 'inline_only_source', path: `facts.${key}.source`, message: `Inline-only source on ${key}` });
    }
    facts.push({
      key,
      label: prettyLabel(key),
      value,
      confidence: raw.confidence === 'high' || raw.confidence === 'medium' || raw.confidence === 'low' ? raw.confidence : undefined,
      volatility: raw.volatility === 'high' || raw.volatility === 'medium' || raw.volatility === 'low' ? raw.volatility : undefined,
      verified_at: dateishField(raw.verified_at) ?? source?.verified_at,
      source,
    });
  }
  return facts.slice(0, 8);
}

function pricingModels(priceHistory: unknown, diagnostics: ModelDiagnostic[], sources: Map<string, ResolvedPageSource>): PriceHistoryModel[] {
  if (!Array.isArray(priceHistory)) return [];
  return priceHistory.map((item, index) => {
    const raw = isRecord(item) ? item : {};
    const source = resolvePageSource(raw, 'pricing');
    mergeSource(sources, source);
    if (source?.state === 'unknown_id') {
      diagnostics.push({ severity: 'error', code: 'unknown_source_id', path: `price_history.${index}.source_id`, message: `Unknown source ID on price_history row ${index}` });
    } else if (source?.state === 'inline_only') {
      diagnostics.push({ severity: 'warning', code: 'inline_only_source', path: `price_history.${index}.source`, message: `Inline-only source on price_history row ${index}` });
    }
    return {
      date: dateishField(raw.date) ?? '',
      plan: stringField(raw.plan),
      price: stringField(raw.price) ?? '',
      note: stringField(raw.note),
      source,
    };
  }).filter((item) => item.date && item.price);
}

export function buildToolPageModel(frontmatter: UnknownRecord): ToolPageModel {
  const scoresRaw = isRecord(frontmatter.scores) ? frontmatter.scores : {};
  const scores = {
    utility: typeof scoresRaw.utility === 'number' ? scoresRaw.utility : undefined,
    value: typeof scoresRaw.value === 'number' ? scoresRaw.value : undefined,
    moat: typeof scoresRaw.moat === 'number' ? scoresRaw.moat : undefined,
    longevity: typeof scoresRaw.longevity === 'number' ? scoresRaw.longevity : undefined,
  };
  const overall = overallScore(scores);
  const diagnostics: ModelDiagnostic[] = [];
  const sources = new Map<string, ResolvedPageSource>();
  const facts = factModels(frontmatter.facts, diagnostics, sources);
  const pricing = pricingModels(frontmatter.price_history, diagnostics, sources);
  const buyIf = stringArray(frontmatter.best_for);
  const skipIf = stringArray(frontmatter.not_best_for);
  const watchOut = facts.find((fact) => fact.key === 'watch_out_for')?.value;
  const bestPlan = stringField(frontmatter.best_plan) ?? facts.find((fact) => fact.key === 'best_paid_tier')?.value;
  const affiliate = isRecord(frontmatter.affiliate) ? frontmatter.affiliate : {};
  const affiliateUrl = stringField(affiliate.link);
  const canonicalUrl = stringField(frontmatter.url);
  const affiliateState = stringField(affiliate.application_status) ?? (affiliateUrl ? 'approved' : 'none');
  const sourceList = Array.from(sources.values());
  for (const source of sourceList) {
    if (isEvidenceSourceStale(source)) {
      diagnostics.push({
        severity: 'warning',
        code: 'stale_source',
        path: `sources.${source.source_id || source.url}`,
        message: `Stale ${source.state} source ${source.source_id || source.url}`,
      });
    }
  }
  if (!stringField(frontmatter.quick_answer)) {
    diagnostics.push({ severity: 'warning', code: 'missing_decision_field', path: 'quick_answer', message: 'Missing quick_answer decision verdict' });
  }

  return {
    identity: {
      slug: stringField(frontmatter.slug) ?? '',
      title: stringField(frontmatter.title) ?? '',
      tagline: stringField(frontmatter.tagline) ?? '',
      company: stringField(frontmatter.company),
      url: stringField(frontmatter.url),
      category: stringField(frontmatter.category),
      category_label: categoryLabel(stringField(frontmatter.category) ?? ''),
      secondary_categories: stringArray(frontmatter.secondary_categories),
      status: stringField(frontmatter.status) ?? 'active',
    },
    scores: { ...scores, overall, confidence: confidenceFromScore(overall) },
    freshness: {
      last_updated: dateishField(frontmatter.last_updated) ?? '',
      last_verified: dateishField(frontmatter.last_verified),
      update_frequency: stringField(frontmatter.update_frequency),
      has_stale_claims: diagnostics.some((issue) => issue.code === 'unknown_source_id') || sourceList.some(isEvidenceSourceStale),
    },
    decision: {
      verdict: stringField(frontmatter.quick_answer) ?? stringField(frontmatter.tagline) ?? '',
      buy_if: buyIf,
      skip_if: skipIf,
      best_plan: bestPlan,
      best_alternative: stringField(frontmatter.best_alternative),
      watch_out: watchOut,
      recent_change: stringField(frontmatter.recent_change),
      source_refs: sourceList.map((source) => source.source_id || source.url).filter(Boolean),
    },
    facts,
    pricing,
    sources: sourceList,
    evidence: buildEvidenceRailModel({
      sources: sourceList,
      facts,
      verifiedAt: dateishField(frontmatter.last_verified) ?? dateishField(frontmatter.last_updated),
      confidence: confidenceFromScore(overall),
    }),
    cta: {
      label: stringField(frontmatter.primary_cta_label) ?? 'Visit tool',
      href: affiliateUrl ?? canonicalUrl,
      disclosure: affiliateUrl ? 'Affiliate link' : undefined,
      affiliate_state: affiliateState === 'none' || affiliateState === 'applied' || affiliateState === 'approved' || affiliateState === 'rejected' || affiliateState === 'paused' ? affiliateState : 'unknown',
      affiliate_url: affiliateUrl,
      affiliate_program: stringField(affiliate.network),
      canonical_url: canonicalUrl,
      pricing_model: stringField(frontmatter.pricing_model),
      price_range: stringField(frontmatter.price_range),
    },
    diagnostics,
  };
}
