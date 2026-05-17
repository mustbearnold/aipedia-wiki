import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categoryLabel, isActiveToolStatus } from '../../utils/tool-metadata';
import logoManifest from '../../data/logo-manifest.json';
import { ANSWER_ITEMS } from '../../data/answers';

export const prerender = true;

const LOGOS = logoManifest as Record<string, string>;

function entrySlug(entry: { id: string; data: { slug?: string } }): string {
  return String(entry.data.slug ?? entry.id.replace(/\.md$/, '').replace(/\\/g, '/'));
}

function logoFor(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return LOGOS[slug] ?? null;
}

function scoreFor(tool: Awaited<ReturnType<typeof getCollection<'tools'>>>[number]): number {
  const scores = tool.data.scores;
  if (!scores) return 0;
  const values = [scores.utility, scores.value, scores.moat, scores.longevity].filter((value): value is number => typeof value === 'number');
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export const GET: APIRoute = async () => {
  const allTools = await getCollection('tools');
  const allComparisons = await getCollection('comparisons');
  const allNews = await getCollection('news');
  const allCategories = await getCollection('categories');
  const allGuides = await getCollection('use-cases');
  const allWorkflows = await getCollection('workflows');
  const allTrends = await getCollection('trends');
  const allCompanies = await getCollection('companies');

  const activeTools = allTools.filter((tool) => tool.data.type === 'tool' && isActiveToolStatus(tool.data.status));

  // Build the smallest searchable haystack we can. The `search` field
  // is never shown to users; it's only used for substring matching, so
  // we lowercase + dedupe tokens, drop common stopwords, and trim long
  // prose that the title/tagline already cover. Cuts payload roughly
  // in half without changing match quality.
  const STOPWORDS = new Set([
    'a','an','and','are','as','at','be','but','by','for','from','have',
    'in','is','it','of','on','or','that','the','this','to','was','were',
    'will','with','it\'s','its','you','your','our','their','they','them',
  ]);
  function buildHaystack(parts: Array<string | undefined | null>): string {
    const seen = new Set<string>();
    const tokens: string[] = [];
    for (const part of parts) {
      if (!part) continue;
      for (const token of String(part).toLowerCase().split(/[^a-z0-9.+-]+/)) {
        if (!token || token.length < 2 || STOPWORDS.has(token)) continue;
        if (seen.has(token)) continue;
        seen.add(token);
        tokens.push(token);
      }
    }
    return tokens.join(' ');
  }

  function trimDetail(value: string | null | undefined, max = 140): string {
    const s = String(value || '').trim();
    if (s.length <= max) return s;
    return s.slice(0, max - 1).trimEnd() + '…';
  }

  const items = [
    ...activeTools.map((tool) => {
      const slug = entrySlug(tool);
      const score = scoreFor(tool);
      const categories = Array.from(new Set([
        tool.data.category,
        ...(tool.data.secondary_categories ?? []),
      ].filter(Boolean)));
      const categoryLabels = categories.map((category) => categoryLabel(category));

      return {
        kind: 'Tool',
        title: tool.data.title,
        href: `/tools/${slug}/`,
        logo: logoFor(slug),
        meta: `${categoryLabels[0] || 'AI tool'} · ${score.toFixed(1)}/10`,
        detail: trimDetail(tool.data.tagline ?? tool.data.meta_description),
        badge: tool.data.price_range ?? tool.data.pricing_model ?? '',
        priority: Math.round(score * 10) + 60,
        search: buildHaystack([
          tool.data.title,
          tool.data.company,
          slug,
          tool.data.tagline,
          ...categories,
          ...categoryLabels,
          ...(tool.data.tags ?? []),
          ...(tool.data.best_for ?? []),
        ]),
      };
    }),
    ...allComparisons.map((comparison) => {
      const slug = entrySlug(comparison);
      const comparedTools = comparison.data.tools ?? [];
      const comparedLogos = comparedTools.map((t: string) => logoFor(t)).filter(Boolean) as string[];

      return {
        kind: 'Compare',
        title: comparison.data.title,
        href: `/compare/${slug}/`,
        logo: comparedLogos[0] ?? null,
        logos: comparedLogos.slice(0, 2),
        meta: 'Comparison guide',
        detail: comparedTools.length ? comparedTools.join(' vs ') : '',
        badge: comparedTools.length ? `${comparedTools.length} tools` : '',
        priority: 54,
        search: buildHaystack([
          comparison.data.title,
          comparison.data.category,
          comparison.data.winner,
          comparison.data.meta_description,
          ...comparedTools,
        ]),
      };
    }),
    ...allGuides
      .filter((guide) => guide.data.noindex !== true)
      .map((guide) => {
        const slug = entrySlug(guide);
        const mentionedTools = guide.data.tools_mentioned ?? [];

        return {
          kind: 'Guide',
          title: guide.data.title,
          href: `/guides/${slug}/`,
          meta: 'Buyer guide',
          detail: trimDetail(guide.data.meta_description ?? guide.data.description, 125),
          badge: guide.data.last_verified ? 'Verified' : '',
          priority: 50,
          search: buildHaystack([
            guide.data.title,
            slug,
            guide.data.meta_description,
            guide.data.description,
            ...mentionedTools,
          ]),
        };
      }),
    ...ANSWER_ITEMS.map((answer) => ({
      kind: 'Answer',
      title: answer.q,
      href: `/answers/${answer.slug}/`,
      meta: answer.group,
      detail: trimDetail(answer.a, 125),
      badge: 'Fast answer',
      priority: 49,
      search: buildHaystack([
        answer.q,
        answer.a,
        answer.slug,
        answer.group,
      ]),
    })),
    ...allWorkflows.map((workflow) => {
      const slug = entrySlug(workflow);
      const stack = workflow.data.stack ?? [];
      const mentionedTools = workflow.data.tools_mentioned ?? [];

      return {
        kind: 'Workflow',
        title: workflow.data.title,
        href: `/workflows/${slug}/`,
        meta: stack.length ? `${stack.length} tools` : 'Workflow',
        detail: trimDetail(workflow.data.meta_description ?? workflow.data.description, 125),
        badge: 'Workflow',
        priority: 48,
        search: buildHaystack([
          workflow.data.title,
          slug,
          workflow.data.meta_description,
          workflow.data.description,
          ...stack,
          ...mentionedTools,
        ]),
      };
    }),
    ...allTrends.map((trend) => {
      const slug = entrySlug(trend);

      return {
        kind: 'Trend',
        title: trend.data.title,
        href: `/trends/${slug}/`,
        meta: trend.data.timeframe ?? 'Trend analysis',
        detail: trimDetail(trend.data.meta_description ?? trend.data.description, 125),
        badge: trend.data.impact ? `${trend.data.impact} impact` : '',
        priority: 47,
        search: buildHaystack([
          trend.data.title,
          slug,
          trend.data.timeframe,
          trend.data.impact,
          trend.data.meta_description,
          trend.data.description,
        ]),
      };
    }),
    ...allNews.map((news) => {
      const slug = entrySlug(news);

      return {
        kind: 'News',
        title: news.data.title,
        href: `/news/${slug}/`,
        meta: String(news.data.date),
        detail: trimDetail(news.data.summary ?? news.data.description, 120),
        badge: news.data.severity ?? '',
        priority: 46,
        search: buildHaystack([
          news.data.title,
          news.data.summary,
          news.data.severity,
          String(news.data.date),
          ...(news.data.affects ?? []),
          ...(news.data.categories ?? []),
        ]),
      };
    }),
    ...allCategories.map((category) => {
      const slug = entrySlug(category);

      return {
        kind: 'Category',
        title: category.data.title,
        href: `/categories/${slug}/`,
        meta: 'Category',
        detail: trimDetail(category.data.description ?? category.data.meta_description),
        badge: category.data.tool_count ? `${category.data.tool_count} tools` : '',
        priority: 42,
        search: buildHaystack([
          category.data.title,
          slug,
          category.data.description,
        ]),
      };
    }),
    ...allCompanies.map((company) => {
      const slug = entrySlug(company);

      return {
        kind: 'Company',
        title: company.data.title,
        href: `/companies/${slug}/`,
        meta: company.data.company_type ? `${company.data.company_type} company` : 'Company profile',
        detail: trimDetail(company.data.meta_description, 120),
        badge: company.data.key_products?.length ? `${company.data.key_products.length} products` : '',
        priority: 38,
        search: buildHaystack([
          company.data.title,
          slug,
          company.data.company_type,
          company.data.hq,
          company.data.funding,
          company.data.meta_description,
          ...(company.data.key_products ?? []),
        ]),
      };
    }),
  ];

  return new Response(JSON.stringify({ count: items.length, items }), {
    headers: {
      'Content-Type': 'application/json',
      // Static index — content changes at build time, not runtime. Allow
      // CDN + browser caching for an hour with a longer stale-while-
      // revalidate so subsequent visitors get instant search.
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
