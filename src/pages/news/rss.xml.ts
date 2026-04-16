import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

function escapeXml(s: string) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function toYmd(v: unknown): string {
  if (!v) return '';
  if (v instanceof Date) return isNaN(v.getTime()) ? '' : v.toISOString().slice(0, 10);
  const s = String(v);
  const d = new Date(s);
  return isNaN(d.getTime()) ? s : d.toISOString().slice(0, 10);
}

function toRFC822(iso: string): string {
  const d = new Date(iso + 'T12:00:00Z');
  if (isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export const GET: APIRoute = async () => {
  const entries = await getCollection('news');
  const sorted = entries
    .map((e) => {
      const data = e.data as Record<string, any>;
      return {
        slug: data.slug ?? e.id.replace(/\.md$/, ''),
        title: data.title ?? e.id,
        summary: data.summary ?? '',
        date: toYmd(data.date),
      };
    })
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 50);

  const items = sorted.map((n) => `
    <item>
      <title>${escapeXml(n.title)}</title>
      <link>https://aipedia.wiki/news/${n.slug}/</link>
      <guid isPermaLink="true">https://aipedia.wiki/news/${n.slug}/</guid>
      <pubDate>${toRFC822(n.date)}</pubDate>
      <description>${escapeXml(n.summary)}</description>
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>aipedia.wiki News</title>
    <link>https://aipedia.wiki/news/</link>
    <atom:link href="https://aipedia.wiki/news/rss.xml" rel="self" type="application/rss+xml" />
    <description>Daily AI tools industry news, verified and edited by Eli Marsh. New launches, model releases, pricing changes, shutdowns.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=900, s-maxage=900',
    },
  });
};
