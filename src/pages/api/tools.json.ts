import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allTools = await getCollection('tools');

  const tools = allTools
    .map((tool) => {
      const d = tool.data;
      const scores = d.scores ?? {};
      const avg =
        [scores.utility, scores.value, scores.moat, scores.longevity]
          .filter((v): v is number => typeof v === 'number')
          .reduce((a, b) => a + b, 0) /
        ([scores.utility, scores.value, scores.moat, scores.longevity].filter(
          (v) => typeof v === 'number',
        ).length || 1);

      return {
        slug: d.slug ?? tool.id,
        title: d.title,
        tagline: d.tagline ?? null,
        category: d.category ?? null,
        secondary_categories: d.secondary_categories ?? [],
        company: d.company ?? null,
        url: d.url ?? null,
        pricing_model: d.pricing_model ?? null,
        price_range: d.price_range ?? null,
        status: d.status ?? null,
        scores: {
          utility: scores.utility ?? null,
          value: scores.value ?? null,
          moat: scores.moat ?? null,
          longevity: scores.longevity ?? null,
          overall: Math.round(avg * 10) / 10,
        },
        best_for: d.best_for ?? [],
        not_best_for: d.not_best_for ?? [],
        last_updated: d.last_updated ?? null,
        last_verified: d.last_verified ?? null,
        page_url: `https://aipedia.wiki/tools/${d.slug ?? tool.id}/`,
      };
    })
    .sort((a, b) => (b.scores.overall ?? 0) - (a.scores.overall ?? 0));

  return new Response(JSON.stringify({ count: tools.length, tools }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
