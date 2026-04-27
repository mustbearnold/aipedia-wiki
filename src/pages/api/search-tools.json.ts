import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { shortenPrice } from '../../utils/shorten-price';

export const prerender = true;

export const GET: APIRoute = async () => {
  const allTools = await getCollection('tools');

  const tools = allTools
    .filter(
      (tool) =>
        tool.data.type === 'tool' &&
        tool.data.status !== 'dead' &&
        tool.data.status !== 'retired' &&
        tool.data.status !== 'acquired'
    )
    .map((tool) => {
      const slug = tool.data.slug || tool.id.replace(/\.md$/, '').replace(/\\/g, '/');
      return {
        slug,
        title: tool.data.title ?? '',
        tagline: tool.data.tagline ?? '',
        category: tool.data.category ?? '',
        price: shortenPrice(tool.data.price_range ?? ''),
        url: `/tools/${slug}/`,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return new Response(JSON.stringify({ count: tools.length, tools }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
