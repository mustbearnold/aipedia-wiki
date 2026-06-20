import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import logoManifest from '../../data/logo-manifest.json';
import { buildSearchCatalog } from '../../lib/search-catalog';

export const prerender = true;

export const GET: APIRoute = async () => {
  const items = buildSearchCatalog({
    tools: await getCollection('tools'),
    comparisons: await getCollection('comparisons'),
    news: await getCollection('news'),
    categories: await getCollection('categories'),
    guides: await getCollection('use-cases'),
    workflows: await getCollection('workflows'),
    trends: await getCollection('trends'),
    companies: await getCollection('companies'),
    logos: logoManifest as Record<string, string>,
  });

  return new Response(JSON.stringify({ count: items.length, items }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
};
