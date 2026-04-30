import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

// Generates an embeddable SVG badge for each tool:
//   https://aipedia.wiki/badges/<slug>.svg
// Tool creators can drop this into their site with a link back to their
// aipedia.wiki tool page. Every embed = a backlink.

export const getStaticPaths: GetStaticPaths = async () => {
  const tools = await getCollection('tools');
  return tools.map((tool) => {
    const data = tool.data as Record<string, any>;
    const slug: string = data.slug ?? tool.id.replace(/\.md$/, '');
    const title: string = data.title ?? slug;
    const s = data.scores ?? {};
    const avg =
      ((s.utility ?? 0) + (s.value ?? 0) + (s.moat ?? 0) + (s.longevity ?? 0)) / 4;
    const score = Math.round(avg * 10) / 10;
    return {
      params: { slug },
      props: { title, score },
    };
  });
};

export const GET: APIRoute = ({ props }) => {
  const { title, score } = props as { title: string; score: number };

  // Color by score
  let color = '#94a3b8'; // slate
  if (score >= 9) color = '#14b8a6'; // teal
  else if (score >= 7.5) color = '#22d3ee'; // cyan
  else if (score >= 6) color = '#38bdf8'; // blue
  else if (score >= 4) color = '#67e8f9'; // cyan
  else color = '#67e8f9'; // cyan

  const truncated = title.length > 22 ? title.slice(0, 20) + '...' : title;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="260" height="72" viewBox="0 0 260 72" role="img" aria-label="${escapeXml(title)} rated ${score} out of 10 on aipedia.wiki">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#18162b"/>
      <stop offset="100%" stop-color="#0b0a14"/>
    </linearGradient>
  </defs>
  <rect width="260" height="72" rx="10" fill="url(#g)" stroke="#2a2640" stroke-width="1"/>
  <g font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif">
    <text x="16" y="22" font-size="10" font-weight="600" fill="#22d3ee" letter-spacing="1.2">AIPEDIA.WIKI</text>
    <text x="16" y="43" font-size="14" font-weight="700" fill="#ffffff">${escapeXml(truncated)}</text>
    <text x="16" y="60" font-size="11" fill="#94a3b8">Editorial score</text>
    <g transform="translate(178, 16)">
      <rect width="68" height="44" rx="8" fill="${color}" opacity="0.12" stroke="${color}" stroke-width="1"/>
      <text x="34" y="28" font-size="20" font-weight="800" fill="${color}" text-anchor="middle">${score}</text>
      <text x="34" y="40" font-size="9" fill="${color}" text-anchor="middle" opacity="0.85">/ 10</text>
    </g>
  </g>
</svg>`;

  return new Response(svg, {
    headers: {
      'content-type': 'image/svg+xml; charset=utf-8',
      'cache-control': 'public, max-age=86400, s-maxage=86400',
    },
  });
};

function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
