import { ANSWER_ITEMS } from '../data/answers';
import { categoryLabel, isActiveToolStatus, overallScore } from '../utils/tool-metadata';
import { buildSearchHaystack, searchEntrySlug, trimSearchDetail } from './search-index';

export type SearchKind = 'tool' | 'compare' | 'guide' | 'answer' | 'workflow' | 'trend' | 'news' | 'category' | 'company';

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
      tags: tool.data.tags ?? [],
      search: buildSearchHaystack([
        tool.data.title,
        tool.data.company,
        slug,
        tool.data.tagline,
        tool.data.meta_description,
        ...categories,
        ...categoryLabels,
        ...(tool.data.tags ?? []),
        ...(tool.data.best_for ?? []),
      ]),
    };
  });

  const comparisonItems = input.comparisons.map((comparison) => {
    const slug = searchEntrySlug(comparison);
    const comparedTools = comparison.data.tools ?? [];
    const comparedNames = comparedTools.map((tool: string) => toolTitleBySlug.get(tool) ?? tool);
    const comparedLogos = comparedTools.map((tool: string) => logoFor(input.logos, tool)).filter(Boolean) as string[];

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
      tags: [comparison.data.category, comparison.data.winner, ...comparedTools].filter(Boolean),
      search: buildSearchHaystack([
        comparison.data.title,
        comparison.data.category,
        comparison.data.winner,
        comparison.data.meta_description,
        ...comparedTools,
        ...comparedNames,
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
      search: buildSearchHaystack([
        guide.data.title,
        slug,
        guide.data.meta_description,
        guide.data.description,
        ...mentionedTools,
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
      tags: [...stack, ...mentionedTools],
      search: buildSearchHaystack([
        workflow.data.title,
        slug,
        workflow.data.meta_description,
        workflow.data.description,
        ...stack,
        ...mentionedTools,
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
      tags: [slug],
      search: buildSearchHaystack([
        category.data.title,
        slug,
        category.data.description,
        category.data.meta_description,
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
