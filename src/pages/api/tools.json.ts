import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { overallScore } from '../../utils/tool-metadata';

export const GET: APIRoute = async () => {
  const allTools = await getCollection('tools');

  const tools = allTools
    .map((tool) => {
      const d = tool.data;
      const scores = d.scores ?? {};
      const avg = overallScore(scores);

      const slug = d.slug ?? tool.id;

      return {
        slug,
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
          overall: avg,
        },
        best_for: d.best_for ?? [],
        not_best_for: d.not_best_for ?? [],
        last_updated: d.last_updated ?? null,
        last_verified: d.last_verified ?? null,
        tags: d.tags ?? [],
        logo_url: `/logos/tools/${slug}.png`,
        page_url: `https://aipedia.wiki/tools/${slug}/`,
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
