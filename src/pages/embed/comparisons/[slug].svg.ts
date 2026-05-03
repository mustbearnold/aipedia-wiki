import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';

// Embeddable comparison verdict SVG:
//   https://aipedia.wiki/embed/comparisons/<slug>.svg
// Drops into any page with a link back to the aipedia.wiki comparison
// page. Every embed = a backlink. The card shows the two (or three)
// tools compared plus the verdict ("depends" or "winner: X").

export const getStaticPaths: GetStaticPaths = async () => {
  const comparisons = await getCollection('comparisons');
  const tools = await getCollection('tools');
  const toolIndex = new Map<string, any>();
  for (const t of tools) {
    const data = t.data as Record<string, any>;
    const slug = data.slug ?? t.id.replace(/\.md$/, '');
    toolIndex.set(slug, data);
  }

  return comparisons.map((c) => {
    const data = c.data as Record<string, any>;
    const slug: string = data.slug ?? c.id.replace(/\.md$/, '');
    const title: string = data.title ?? slug;
    const winner: string = data.winner ?? 'depends';
    const toolSlugs: string[] = Array.isArray(data.tools) ? data.tools : [];
    const tools = toolSlugs.map(s => {
      const t = toolIndex.get(s);
      if (!t) return { slug: s, title: s, score: null };
      const sc = t.scores ?? {};
      const avg = ((sc.utility ?? 0) + (sc.value ?? 0) + (sc.moat ?? 0) + (sc.longevity ?? 0)) / 4;
      return { slug: s, title: t.title ?? s, score: Math.round(avg * 10) / 10 };
    });
    return {
      params: { slug },
      props: { title, winner, tools },
    };
  });
};

export const GET: APIRoute = ({ props }) => {
  const { title, winner, tools } = props as any;
  const verdict =
    winner && winner !== 'depends' && tools.find((t: any) => t.slug === winner)
      ? `Pick: ${tools.find((t: any) => t.slug === winner).title}`
      : 'Depends on use case';

  const rows = tools.slice(0, 3).map((t: any, i: number) => {
    const y = 68 + i * 28;
    const scoreStr = t.score != null ? `${t.score}` : '-';
    const isWinner = winner === t.slug;
    return `
      <g transform="translate(24, ${y})">
        <text x="0" y="0" font-size="14" font-weight="${isWinner ? '700' : '500'}" fill="${isWinner ? '#22d3ee' : '#ffffff'}">${escapeXml(truncate(t.title, 24))}</text>
        ${isWinner ? '<text x="' + (t.title.length * 7 + 8) + '" y="-1" font-size="10" fill="#14b8a6">WINNER</text>' : ''}
        <text x="352" y="0" font-size="14" font-weight="700" fill="${isWinner ? '#22d3ee' : '#cbd5e1'}" text-anchor="end">${scoreStr}<tspan font-size="10" fill="#64748b" font-weight="400">/10</tspan></text>
      </g>`;
  }).join('');

  const height = 88 + tools.length * 28 + 56;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="384" height="${height}" viewBox="0 0 384 ${height}" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#18162b"/>
      <stop offset="100%" stop-color="#0b0a14"/>
    </linearGradient>
  </defs>
  <rect width="384" height="${height}" rx="12" fill="url(#g)" stroke="#2a2640" stroke-width="1"/>
  <g font-family="Metropolis, sans-serif">
    <text x="24" y="28" font-size="10" font-weight="600" fill="#22d3ee" letter-spacing="1.2">AIPEDIA.WIKI</text>
    <text x="24" y="50" font-size="14" font-weight="700" fill="#ffffff">${escapeXml(truncate(title, 40))}</text>
    ${rows}
    <g transform="translate(24, ${88 + tools.length * 28})">
      <rect x="0" y="-14" width="336" height="28" rx="6" fill="rgba(34, 211, 238,0.12)" stroke="rgba(34, 211, 238,0.3)" stroke-width="1"/>
      <text x="12" y="4" font-size="12" font-weight="600" fill="#22d3ee">${escapeXml(verdict)}</text>
      <text x="324" y="4" font-size="11" fill="#94a3b8" text-anchor="end">Read full &gt;</text>
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

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}
function escapeXml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
