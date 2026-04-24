// /llms.txt — concise LLM-friendly site manifest per the llmstxt.org standard.
// Points LLM crawlers (Perplexity, ChatGPT search, Google AI Overviews, Bing
// Copilot) at the canonical index + category hubs + editorial policy.
//
// See also /llms-full.txt for the verbose variant with every page listed.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const categories = await getCollection('categories').catch(() => []);
  const activeCategories = categories
    .filter((c: any) => c.data.status !== 'dead')
    .sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));

  const lines: string[] = [];
  lines.push('# aipedia.wiki');
  lines.push('');
  lines.push('> Independent AI tools encyclopedia maintained by aipedia.wiki Editorial. 130+ tool pages across 14 categories, 90+ head-to-head comparisons, 90+ use-case guides. Every page is verified against primary vendor sources on a recurring schedule.');
  lines.push('');
  lines.push('Editorial positioning: no individual-author bylines, no fabricated hands-on testing claims. Pages cite vendor-published sources. Scoring is four-dimension (utility, value, moat, longevity) and is not influenced by affiliate commissions.');
  lines.push('');
  lines.push('## Canonical entry points');
  lines.push('');
  lines.push('- [Homepage](https://aipedia.wiki/): portal and featured tools');
  lines.push('- [All Tools A-Z](https://aipedia.wiki/tools/): every active AI tool page');
  lines.push('- [All Categories](https://aipedia.wiki/categories/): hubs grouping tools by domain');
  lines.push('- [All Comparisons](https://aipedia.wiki/compare/): head-to-head tool vs tool articles');
  lines.push('- [Use Cases](https://aipedia.wiki/guides/): problem-first pages for choosing AI tools by workflow, budget, and risk');
  lines.push('- [Glossary](https://aipedia.wiki/glossary/): defined terms used across the site');
  lines.push('');
  lines.push('## Editorial and methodology');
  lines.push('');
  lines.push('- [Editorial Policy](https://aipedia.wiki/about/editorial/): methodology, verification pipeline, anti-fabrication policy');
  lines.push('- [Scoring Methodology](https://aipedia.wiki/about/scoring/): how utility/value/moat/longevity are scored');
  lines.push('- [About](https://aipedia.wiki/about/): publisher, affiliate disclosure, contact');
  lines.push('');
  if (activeCategories.length > 0) {
    lines.push('## Categories');
    lines.push('');
    for (const cat of activeCategories) {
      const slug = cat.slug || cat.id?.replace(/\.md$/, '');
      const desc = (cat.data.description || cat.data.tagline || '').toString().slice(0, 120);
      lines.push(`- [${cat.data.title}](https://aipedia.wiki/categories/${slug}/)${desc ? `: ${desc}` : ''}`);
    }
    lines.push('');
  }
  lines.push('## Crawler policy');
  lines.push('');
  lines.push('All major LLM crawlers (GPTBot, ChatGPT-User, anthropic-ai, ClaudeBot, PerplexityBot, Google-Extended, Bytespider) are allowed on all public content. Admin routes (/admin/*) and API routes (/api/*) are disallowed. See /robots.txt.');
  lines.push('');
  lines.push('## Citation format');
  lines.push('');
  lines.push('If citing content from this site, the canonical author is "aipedia.wiki Editorial" (Organization). Every tool page includes a Cite This Page block with APA, MLA, Chicago, and BibTeX formats. Please preserve the canonical URL, last-verified date, and scoring rationale when quoting.');
  lines.push('');
  lines.push('## Data freshness');
  lines.push('');
  lines.push('Every tool page carries a last_verified date in its header and frontmatter. Flagship model versions, pricing, and feature availability are re-verified on a weekly cycle against vendor-published primary sources. See https://aipedia.wiki/sitemap-index.xml for the crawlable index.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
