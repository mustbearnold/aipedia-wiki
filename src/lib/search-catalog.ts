import { ANSWER_ITEMS } from '../data/answers';
import { categoryLabel, isActiveToolStatus, overallScore } from '../utils/tool-metadata';
import { dateishField, resolvePageSource, type ResolvedPageSource } from './provenance';
import { buildSearchHaystack, searchEntrySlug, trimSearchDetail } from './search-index';
import { buildEvidenceRailModel, evidenceRailFromDecisionPicks, type EvidenceConfidence, type EvidenceRailModel } from './content-models/evidence-rail';
import { buildToolPageModel } from './content-models/tool-page-model';
import { normalizeDecisionPick, type DecisionPick } from './content-models/decision-pick';

export type SearchKind = 'tool' | 'compare' | 'guide' | 'answer' | 'workflow' | 'trend' | 'news' | 'category' | 'company';

export interface SearchCatalogAction {
  label: string;
  href: string;
}

export interface SearchCatalogItem {
  kind: SearchKind;
  kindLabel: string;
  slug: string;
  title: string;
  href: string;
  detail: string;
  meta: string;
  badge: string;
  priority: number;
  search: string;
  logo?: string | null;
  logos?: string[];
  categorySlug?: string;
  toolSlug?: string;
  tags?: string[];
  score?: number;
  buyerFit: string;
  avoidIf?: string;
  action: SearchCatalogAction;
  evidence: EvidenceRailModel;
  verifiedAt?: string;
  sourceLabel?: string;
}

interface CatalogEntry {
  id: string;
  data: any;
}

export interface CatalogInput {
  tools: CatalogEntry[];
  comparisons: CatalogEntry[];
  categories: CatalogEntry[];
  guides: CatalogEntry[];
  news: CatalogEntry[];
  workflows: CatalogEntry[];
  trends: CatalogEntry[];
  companies: CatalogEntry[];
  logos?: Record<string, string>;
}

export type SearchCatalogInput = CatalogInput;

function logoFor(logos: Record<string, string> | undefined, slug: string | null | undefined): string | null {
  if (!slug) return null;
  return logos?.[slug] ?? null;
}

function toolScore(tool: CatalogEntry): number {
  return overallScore(tool.data.scores ?? {});
}

export function isCatalogActiveTool(tool: CatalogEntry): boolean {
  return tool?.data?.type === 'tool' && isActiveToolStatus(tool.data.status);
}


const BUYER_INTENT_TERMS_BY_CATEGORY: Record<string, string[]> = {
  'ai-coding': ['coding agent', 'ai coding agent', 'developer agent', 'code agent', 'Claude vs Cursor'],
  'ai-infrastructure': ['local model', 'open model', 'open-weight model', 'self-hosted model'],
  'ai-automation': ['marketing stack', 'automation stack', 'agent workflow', 'sales automation'],
  'ai-seo': ['marketing stack', 'seo stack', 'content marketing stack'],
  'ai-writing': ['marketing stack', 'content stack', 'copywriting stack'],
};

function uniqueStrings(values: Array<string | undefined | null>): string[] {
  return Array.from(new Set(values.map((value) => String(value ?? '').trim()).filter(Boolean)));
}

function categoryBuyerTerms(slug: string | undefined): string[] {
  return slug ? BUYER_INTENT_TERMS_BY_CATEGORY[slug] ?? [] : [];
}

function toolBuyerTerms(tool: CatalogEntry, categories: readonly string[]): string[] {
  const haystack = buildSearchHaystack([
    tool.data.title,
    tool.data.slug,
    tool.data.company,
    tool.data.tagline,
    tool.data.meta_description,
    ...(tool.data.tags ?? []),
    ...(tool.data.best_for ?? []),
    ...categories,
  ]);
  const derived: string[] = [];
  for (const category of categories) derived.push(...categoryBuyerTerms(category));
  if (/\b(local|open|ollama|lm-studio|lm studio|open-weight|self-host)/i.test(haystack)) {
    derived.push('local model', 'open model', 'open-weight model');
  }
  if (/\b(marketing|seo|automation|sales|content)\b/i.test(haystack)) {
    derived.push('marketing stack', 'automation stack');
  }
  return uniqueStrings(derived);
}

function fallbackEvidence(frontmatter: Record<string, unknown>, confidence: EvidenceConfidence = 'medium'): EvidenceRailModel {
  return buildEvidenceRailModel({
    verifiedAt: dateishField(frontmatter.last_verified) ?? dateishField(frontmatter.last_updated) ?? dateishField(frontmatter.date),
    confidence,
    diagnostics: ['Catalog item has no structured source references; using existing freshness metadata only.'],
  });
}

function decisionSourceForRef(sourceRef: string, verifiedAt: string): ResolvedPageSource {
  return resolvePageSource({
    source_id: sourceRef,
    verified_at: verifiedAt,
  }, 'decision') ?? {
    source_id: sourceRef,
    label: sourceRef,
    url: '',
    verified_at: verifiedAt,
    used_by: ['decision'],
    state: 'unknown_id',
  };
}

function decisionSources(picks: readonly DecisionPick[]): ResolvedPageSource[] {
  const sources: ResolvedPageSource[] = [];
  for (const pick of picks) {
    for (const sourceRef of pick.source_refs) {
      if (sourceRef) sources.push(decisionSourceForRef(sourceRef, pick.verified_at));
    }
  }
  return sources;
}

function categoryDecisionPicks(category: CatalogEntry): DecisionPick[] {
  if (!Array.isArray(category.data.decision_picks)) return [];
  const rawPicks = category.data.decision_picks as unknown[];
  return rawPicks.map(normalizeDecisionPick).filter((pick): pick is DecisionPick => Boolean(pick));
}

function categoryEvidence(category: CatalogEntry, picks: readonly DecisionPick[]): EvidenceRailModel {
  if (picks.length) {
    return evidenceRailFromDecisionPicks(picks, {
      sources: decisionSources(picks),
      verifiedAt: dateishField(category.data.last_verified) ?? dateishField(category.data.last_updated),
      confidence: picks.some((pick) => pick.confidence === 'low') ? 'low' : picks.some((pick) => pick.confidence === 'medium') ? 'medium' : 'high',
    });
  }
  return fallbackEvidence(category.data);
}
export function buildSearchCatalog(input: CatalogInput): SearchCatalogItem[] {
  const activeTools = input.tools.filter(isCatalogActiveTool);
  const toolTitleBySlug = new Map(activeTools.map((tool) => {
    const slug = searchEntrySlug(tool);
    return [slug, tool.data.title || slug] as const;
  }));

  const toolItems = activeTools.map((tool) => {
    const slug = searchEntrySlug(tool);
    const score = toolScore(tool);
    const categories = Array.from(new Set([tool.data.category, ...(tool.data.secondary_categories ?? [])].filter(Boolean))) as string[];
    const categoryLabels = categories.map((category) => categoryLabel(category));
    const model = buildToolPageModel(tool.data);
    const buyerTerms = toolBuyerTerms(tool, categories);

    return {
      kind: 'tool' as const,
      kindLabel: 'Tool',
      slug,
      title: tool.data.title,
      href: `/tools/${slug}/`,
      logo: logoFor(input.logos, slug),
      categorySlug: tool.data.category ?? '',
      toolSlug: slug,
      meta: `${categoryLabels[0] || 'AI tool'} · ${score}/10`,
      detail: trimSearchDetail(tool.data.tagline ?? tool.data.meta_description),
      badge: tool.data.price_range ?? tool.data.pricing_model ?? '',
      priority: Math.round(score * 10) + 90,
      score,
      tags: uniqueStrings([...(tool.data.tags ?? []), ...buyerTerms]),
      buyerFit: model.decision.buy_if[0] ?? model.decision.verdict ?? trimSearchDetail(tool.data.tagline ?? tool.data.meta_description, 96),
      avoidIf: model.decision.skip_if[0],
      action: { label: 'Review tool record', href: `/tools/${slug}/` },
      evidence: model.evidence,
      verifiedAt: model.evidence.verifiedAt,
      sourceLabel: model.evidence.primaryLabel,
      search: buildSearchHaystack([
        tool.data.title,
        tool.data.company,
        slug,
        tool.data.tagline,
        tool.data.meta_description,
        model.decision.verdict,
        model.decision.recent_change,
        model.decision.best_alternative,
        model.decision.watch_out,
        ...categories,
        ...categoryLabels,
        ...(tool.data.tags ?? []),
        ...(tool.data.best_for ?? []),
        ...(tool.data.not_best_for ?? []),
        ...buyerTerms,
      ]),
    };
  });

  const comparisonItems = input.comparisons.map((comparison) => {
    const slug = searchEntrySlug(comparison);
    const comparedTools = comparison.data.tools ?? [];
    const comparedNames = comparedTools.map((tool: string) => toolTitleBySlug.get(tool) ?? tool);
    const comparedLogos = comparedTools.map((tool: string) => logoFor(input.logos, tool)).filter(Boolean) as string[];
    const evidence = fallbackEvidence(comparison.data);
    const buyerTerms = slug === 'claude-vs-cursor' ? ['Claude vs Cursor', 'coding agent', 'developer agent'] : [];

    return {
      kind: 'compare' as const,
      kindLabel: 'Compare',
      slug,
      title: comparison.data.title,
      href: `/compare/${slug}/`,
      detail: trimSearchDetail(comparison.data.meta_description ?? comparedNames.join(' vs '), 125),
      meta: comparedTools.length ? `${comparedTools.length} tools` : 'Comparison guide',
      badge: comparedTools.length ? `${comparedTools.length} tools` : '',
      priority: 76,
      logo: comparedLogos[0] ?? null,
      logos: comparedLogos.slice(0, 2),
      tags: uniqueStrings([comparison.data.category, comparison.data.winner, ...comparedTools, ...buyerTerms]),
      buyerFit: trimSearchDetail(comparison.data.meta_description ?? `Compare ${comparedNames.join(' vs ')} before you choose.`, 96),
      action: { label: 'Compare tools', href: `/compare/${slug}/` },
      evidence,
      verifiedAt: evidence.verifiedAt,
      sourceLabel: evidence.primaryLabel,
      search: buildSearchHaystack([
        comparison.data.title,
        comparison.data.category,
        comparison.data.winner,
        comparison.data.meta_description,
        ...comparedTools,
        ...comparedNames,
        ...buyerTerms,
      ]),
    };
  });

  const guideItems = input.guides.filter((guide) => guide.data.noindex !== true).map((guide) => {
    const slug = searchEntrySlug(guide);
    const mentionedTools = guide.data.tools_mentioned ?? [];

    return {
      kind: 'guide' as const,
      kindLabel: 'Guide',
      slug,
      title: guide.data.title,
      href: `/guides/${slug}/`,
      detail: trimSearchDetail(guide.data.meta_description ?? guide.data.description, 125),
      meta: 'Buyer guide',
      badge: guide.data.last_verified ? 'Verified' : '',
      priority: 74,
      tags: mentionedTools,
      buyerFit: trimSearchDetail(guide.data.description ?? guide.data.meta_description ?? 'Use this buyer guide to narrow a tool shortlist.', 96),
      action: { label: 'Read buyer guide', href: `/guides/${slug}/` },
      evidence: fallbackEvidence(guide.data),
      verifiedAt: dateishField(guide.data.last_verified) ?? dateishField(guide.data.last_updated),
      sourceLabel: undefined,
      search: buildSearchHaystack([
        guide.data.title,
        slug,
        guide.data.meta_description,
        guide.data.description,
        ...mentionedTools,
        ...categoryBuyerTerms(guide.data.category),
      ]),
    };
  });

  const answerItems = ANSWER_ITEMS.map((answer) => ({
    kind: 'answer' as const,
    kindLabel: 'Answer',
    slug: answer.slug,
    title: answer.q,
    href: `/answers/${answer.slug}/`,
    detail: trimSearchDetail(answer.a, 125),
    meta: answer.group,
    badge: 'Fast answer',
    priority: 73,
    buyerFit: trimSearchDetail(answer.a, 96),
    action: { label: 'Open fast answer', href: `/answers/${answer.slug}/` },
    evidence: buildEvidenceRailModel({
      confidence: 'medium',
      diagnostics: ['Answer catalog entries use editorial answer text without structured source references.'],
    }),
    tags: [answer.group],
    search: buildSearchHaystack([
      answer.q,
      answer.a,
      answer.slug,
      answer.group,
    ]),
  }));

  const workflowItems = input.workflows.map((workflow) => {
    const slug = searchEntrySlug(workflow);
    const stack = workflow.data.stack ?? [];
    const mentionedTools = workflow.data.tools_mentioned ?? [];

    return {
      kind: 'workflow' as const,
      kindLabel: 'Workflow',
      slug,
      title: workflow.data.title,
      href: `/workflows/${slug}/`,
      detail: trimSearchDetail(workflow.data.meta_description ?? workflow.data.description, 125),
      meta: stack.length ? `${stack.length} tools` : 'Workflow',
      badge: 'Workflow',
      priority: 70,
      tags: uniqueStrings([...stack, ...mentionedTools, 'marketing stack', 'automation stack']),
      buyerFit: trimSearchDetail(workflow.data.description ?? workflow.data.meta_description ?? 'Follow a multi-tool workflow for a concrete job.', 96),
      action: { label: 'Open workflow', href: `/workflows/${slug}/` },
      evidence: fallbackEvidence(workflow.data),
      verifiedAt: dateishField(workflow.data.last_verified) ?? dateishField(workflow.data.last_updated),
      sourceLabel: undefined,
      search: buildSearchHaystack([
        workflow.data.title,
        slug,
        workflow.data.meta_description,
        workflow.data.description,
        ...stack,
        ...mentionedTools,
        'marketing stack',
        'automation stack',
      ]),
    };
  });

  const trendItems = input.trends.map((trend) => {
    const slug = searchEntrySlug(trend);

    return {
      kind: 'trend' as const,
      kindLabel: 'Trend',
      slug,
      title: trend.data.title,
      href: `/trends/${slug}/`,
      detail: trimSearchDetail(trend.data.meta_description ?? trend.data.description, 125),
      meta: trend.data.timeframe ?? 'Trend analysis',
      badge: trend.data.impact ? `${trend.data.impact} impact` : '',
      priority: 66,
      tags: [trend.data.impact, trend.data.timeframe].filter(Boolean),
      buyerFit: trimSearchDetail(trend.data.description ?? trend.data.meta_description ?? 'Track the market shift before buying.', 96),
      action: { label: 'Read trend', href: `/trends/${slug}/` },
      evidence: fallbackEvidence(trend.data),
      verifiedAt: dateishField(trend.data.last_verified) ?? dateishField(trend.data.last_updated),
      sourceLabel: undefined,
      search: buildSearchHaystack([
        trend.data.title,
        slug,
        trend.data.timeframe,
        trend.data.impact,
        trend.data.meta_description,
        trend.data.description,
      ]),
    };
  });

  const newsItems = input.news.map((news) => {
    const slug = searchEntrySlug(news);

    return {
      kind: 'news' as const,
      kindLabel: 'News',
      slug,
      title: news.data.title,
      href: `/news/${slug}/`,
      detail: trimSearchDetail(news.data.summary ?? news.data.description, 120),
      meta: String(news.data.date),
      badge: news.data.severity ?? '',
      priority: 64,
      tags: [news.data.severity, ...(news.data.affects ?? []), ...(news.data.categories ?? [])].filter(Boolean),
      buyerFit: trimSearchDetail(news.data.summary ?? news.data.description ?? 'Check the latest market change affecting tool choices.', 96),
      action: { label: 'Read news', href: `/news/${slug}/` },
      evidence: fallbackEvidence(news.data),
      verifiedAt: dateishField(news.data.date),
      sourceLabel: undefined,
      search: buildSearchHaystack([
        news.data.title,
        news.data.summary,
        news.data.severity,
        String(news.data.date),
        ...(news.data.affects ?? []),
        ...(news.data.categories ?? []),
      ]),
    };
  });

  const categoryItems = input.categories.map((category) => {
    const slug = searchEntrySlug(category);
    const picks = categoryDecisionPicks(category);
    const evidence = categoryEvidence(category, picks);
    const buyerTerms = categoryBuyerTerms(slug);

    return {
      kind: 'category' as const,
      kindLabel: 'Category',
      slug,
      title: category.data.title,
      href: `/categories/${slug}/`,
      detail: trimSearchDetail(category.data.description ?? category.data.meta_description),
      meta: 'Category hub',
      badge: category.data.tool_count ? `${category.data.tool_count} tools` : '',
      priority: 60,
      categorySlug: slug,
      tags: uniqueStrings([slug, ...buyerTerms, ...picks.map((pick) => pick.tool), ...picks.map((pick) => pick.label)]),
      buyerFit: picks[0]?.reason ?? trimSearchDetail(category.data.description ?? category.data.meta_description ?? 'Open the category shortlist.', 96),
      action: { label: picks.length ? 'Open buyer shortlist' : 'Open category hub', href: `/categories/${slug}/` },
      evidence,
      verifiedAt: evidence.verifiedAt,
      sourceLabel: evidence.primaryLabel,
      search: buildSearchHaystack([
        category.data.title,
        slug,
        category.data.description,
        category.data.meta_description,
        ...buyerTerms,
        ...picks.flatMap((pick) => [pick.tool, pick.label, pick.reason, pick.plan]),
      ]),
    };
  });

  const companyItems = input.companies.map((company) => {
    const slug = searchEntrySlug(company);

    return {
      kind: 'company' as const,
      kindLabel: 'Company',
      slug,
      title: company.data.title,
      href: `/companies/${slug}/`,
      detail: trimSearchDetail(company.data.meta_description, 120),
      meta: company.data.company_type ? `${company.data.company_type} company` : 'Company profile',
      badge: company.data.key_products?.length ? `${company.data.key_products.length} products` : '',
      priority: 56,
      tags: [company.data.company_type, company.data.hq, company.data.funding, ...(company.data.key_products ?? [])].filter(Boolean),
      buyerFit: trimSearchDetail(company.data.meta_description ?? 'Open the vendor profile and related products.', 96),
      action: { label: 'Open company profile', href: `/companies/${slug}/` },
      evidence: fallbackEvidence(company.data),
      verifiedAt: dateishField(company.data.last_verified) ?? dateishField(company.data.last_updated),
      sourceLabel: undefined,
      search: buildSearchHaystack([
        company.data.title,
        slug,
        company.data.company_type,
        company.data.hq,
        company.data.funding,
        company.data.meta_description,
        ...(company.data.key_products ?? []),
      ]),
    };
  });

  return [
    ...toolItems,
    ...comparisonItems,
    ...guideItems,
    ...answerItems,
    ...workflowItems,
    ...trendItems,
    ...newsItems,
    ...categoryItems,
    ...companyItems,
  ].sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title));
}
