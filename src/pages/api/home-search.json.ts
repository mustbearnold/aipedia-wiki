import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categoryLabel, isActiveToolStatus } from '../../utils/tool-metadata';
import logoManifest from '../../data/logo-manifest.json';

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

  const activeTools = allTools.filter((tool) => tool.data.type === 'tool' && isActiveToolStatus(tool.data.status));

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
        detail: tool.data.tagline ?? tool.data.meta_description ?? '',
        badge: tool.data.price_range ?? tool.data.pricing_model ?? '',
        priority: Math.round(score * 10) + 60,
        search: [
          tool.data.title,
          tool.data.company,
          slug,
          tool.data.tagline,
          tool.data.meta_description,
          tool.data.price_range,
          tool.data.pricing_model,
          ...categories,
          ...categoryLabels,
          ...(tool.data.tags ?? []),
          ...(tool.data.best_for ?? []),
          ...(tool.data.not_best_for ?? []),
        ].filter(Boolean).join(' ').toLowerCase(),
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
        detail: comparison.data.meta_description ?? (comparedTools.length ? comparedTools.join(' vs ') : ''),
        badge: comparedTools.length ? `${comparedTools.length} tools` : '',
        priority: 54,
        search: [
          comparison.data.title,
          comparison.data.category,
          comparison.data.winner,
          comparison.data.meta_description,
          ...comparedTools,
        ].filter(Boolean).join(' ').toLowerCase(),
      };
    }),
    ...allNews.map((news) => {
      const slug = entrySlug(news);

      return {
        kind: 'News',
        title: news.data.title,
        href: `/news/${slug}/`,
        meta: String(news.data.date),
        detail: news.data.summary ?? news.data.description ?? '',
        badge: news.data.severity ?? '',
        priority: 46,
        search: [
          news.data.title,
          news.data.summary,
          news.data.description,
          news.data.severity,
          String(news.data.date),
        ].filter(Boolean).join(' ').toLowerCase(),
      };
    }),
    ...allCategories.map((category) => {
      const slug = entrySlug(category);

      return {
        kind: 'Category',
        title: category.data.title,
        href: `/categories/${slug}/`,
        meta: 'Category',
        detail: category.data.description ?? category.data.meta_description ?? '',
        badge: category.data.tool_count ? `${category.data.tool_count} tools` : '',
        priority: 42,
        search: [
          category.data.title,
          slug,
          category.data.description,
          category.data.meta_description,
        ].filter(Boolean).join(' ').toLowerCase(),
      };
    }),
  ];

  return new Response(JSON.stringify({ count: items.length, items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
};
