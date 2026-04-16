import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const allComparisons = await getCollection('comparisons');

  const comparisons = allComparisons
    .map((comp) => {
      const d = comp.data;
      return {
        slug: d.slug ?? comp.id,
        title: d.title,
        tools: d.tools ?? [],
        category: d.category ?? null,
        winner: d.winner ?? null,
        seo_title: d.seo_title ?? null,
        last_updated: d.last_updated ?? null,
        page_url: `https://aipedia.wiki/compare/${d.slug ?? comp.id}/`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return new Response(
    JSON.stringify({ count: comparisons.length, comparisons }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=86400',
      },
    },
  );
};
