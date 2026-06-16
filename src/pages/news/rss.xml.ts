import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Refresh metadata: 2026-06-16 Google Cloud data-agents coverage added after current June Google Cloud data agents, Data Engineering Agent, Conversational Analytics, and MCP server source checks; June 16 desk, AI Automation, AI Infrastructure, homepage, news archive, tools/categories indexes, /explore/, source registry, and LLM surfaces inspected.
// Refresh metadata: 2026-06-16 June 12 OpenAI Academy workplace-courses backfill after current June OpenAI Academy and OpenAI announcement checks; June 12 desk, homepage, news archive, /explore/, source registry, and LLM surfaces inspected.
// Refresh metadata: 2026-06-16 Work IQ GA desk and buyer checklist added after current June Microsoft Work IQ API/licensing/Partner Center and Council of the EU source checks; Microsoft Agent Framework, AI Automation, homepage, news archive, tools/categories indexes, /explore/, and LLM surfaces inspected.
// Refresh metadata: 2026-06-16 June 1 and June 2 AI news desks backfilled after current June GitHub, NVIDIA, Microsoft, Anthropic, Postman, RelationalAI, 7AI, and White House source checks; homepage, news archive, /explore/, and LLM surfaces inspected.
// Refresh metadata: 2026-06-15 Visa/ChatGPT agent-payments coverage added after current June AP and Visa Intelligent Commerce source checks; ChatGPT, OpenAI, agent-commerce trend, June 10 desk, homepage, news/trends/tools/categories indexes, and LLM surfaces inspected.
// Refresh metadata: 2026-06-15 OpenAI/Ona Codex persistent-agent acquisition coverage added after current June official OpenAI, Ona, Codex product, and Codex pricing source checks; Codex, AI Coding, June 11 desk, homepage, news archive, and LLM surfaces inspected.
// Refresh metadata: 2026-06-15 AI news desk and Google AI search risk checklist refresh across G7 Evian opening, AP AI-regulation agenda and state-law patchwork reporting, Google AI Overviews liability coverage, Google's Gemini-related phishing lawsuit coverage, Gemini/AI Search/AI Chatbots notes, homepage, news archive, and LLM surfaces.
// Refresh metadata: 2026-06-15 AI coding token-budget governance story refresh across Business Insider/Times of India Disney reporting, Claude/Cursor usage, tokenmaxxing, AI-coded release quality, Cursor, Claude Code, AI Coding, homepage, news archive, and LLM surfaces.
// Refresh metadata: 2026-06-14 AI news desk refresh across OpenAI probe coverage and buyer-safety checklist, Anthropic Fable/Mythos access risk, ChatGPT GPT-5.2 retirement, G7 governance, homepage, news archive, and LLM surfaces.
// Refresh metadata: 2026-06-13 late AI news coverage refresh across Claude Fable/Mythos access suspension, ChatGPT GPT-5.2 retirement, OpenAI state-attorneys-general scrutiny, affected tool/company/category pages, homepage, news archive, and LLM surfaces.
// Refresh metadata: 2026-06-10 news collection coverage refresh across June 9-10 AI tools news, including Claude Fable 5, Siri AI, Copilot CLI custom agents, Datadog DASH agents, and Similarweb AI chatbot rankings.

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
    .sort((a, b) => (b.date || '').localeCompare(a.date || '') || b.slug.localeCompare(a.slug))
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
    <description>Daily AI tools industry news, verified and edited by aipedia.wiki Editorial. New launches, model releases, pricing changes, shutdowns.</description>
    <language>en-us</language>
    <generator>aipedia.wiki Astro RSS generator</generator>
    <ttl>15</ttl>
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
