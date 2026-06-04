// /llms-full.txt — verbose LLM-friendly site manifest.
// Lists every active tool with category + tagline, every comparison, every
// use-case guide. Intended for crawlers willing to ingest a larger manifest
// to discover the full content map without parsing the sitemap.
// Refresh metadata: 2026-06-04 research-discovery comparison slice across Connected Papers, Consensus, Elicit, nanochat, Scite, and Semantic Scholar plus nanochat/Semantic Scholar tool refresh, AI Research, tools, comparison, category, homepage, and LLM maintenance; 2026-06-04 Cline/Cody vs Cursor coding comparison slice plus AI Coding, comparison, category, homepage, and LLM maintenance; 2026-06-04 Clay automation comparison slice across Instantly, Intercom, Make, and Zapier plus Make tool, AI Automation, tools, comparison, category, homepage, and LLM maintenance; 2026-06-04 Claude specialist comparison slice across GitHub Copilot, Grammarly, Grok, Jasper, Kimi, Mistral AI, Notion AI, Perplexity, Qwen, and Sudowrite plus AI Coding, AI Writing, AI Chatbots, AI Notes, AI Search, comparison, category, homepage, and LLM maintenance; 2026-06-04 Claude comparison slice across Cline, Cody, Cursor, DeepSeek, Elicit, and Gemini plus AI Coding, AI Chatbots, AI Research, comparison, and LLM surface maintenance; 2026-06-04 Claude Code comparison slice across Continue, Devin, GitHub Copilot, and Val Town plus affected tool/category/top-layer maintenance; 2026-06-04 ChatGPT comparison continuation across Scite, Sudowrite, Surfer SEO, v0, Wordtune, Writesonic, You.com, and Zapier plus affected tool/category/top-layer maintenance; 2026-06-03 AI news catch-up across Microsoft Work IQ, GitHub Copilot SDK/AI Credits, Anthropic Glasswing, OpenAI retirements, Gemini Drive sharing, NVIDIA GTC Taipei, and enterprise-agent policy; 2026-06-03 ChatGPT comparison clusters refresh across Claude, Copy.ai, Cursor, DeepSeek, Elicit, Figma, Fireflies.ai, Gamma, Gemini, GitHub Copilot, GLM, Grammarly, Grok, Hermes Agent, Jasper, Kagi, Kimi, Lovable, MarketMuse, Mem, Mistral AI, NeuronWriter, Notion AI, Otter.ai, and QuillBot plus ChatGPT/category maintenance; 2026-06-03 Cartesia comparison cluster refresh across Descript, ElevenLabs, Fish Audio, Resemble AI, and Voxtral, plus Voxtral TTS/STT correction; 2026-06-03 Capacities comparison cluster refresh across Fireflies.ai, NotebookLM, Obsidian, Otter.ai, and Readwise; 2026-06-03 Canva comparison cluster refresh across ChatGPT, Figma, Google Stitch, Lovable, Midjourney, and v0; 2026-06-02 Aider comparison cluster refresh across Claude Code, Cursor, and GitHub Copilot; Ahrefs comparison cluster refresh across Frase, MarketMuse, NeuronWriter, and Surfer SEO; Adobe Firefly comparison cluster refresh across Canva, Flux, Magnific/Freepik, Ideogram, Midjourney, and Stable Diffusion; company/methodology refresh for Anthropic, ElevenLabs, /404, /about/, /about/scoring, and /companies; active-tool refresh for Canva, Capacities, Captions, Cartesia, Castmagic, Character.AI, ChatPDF, Claude Design, Clay, Clearscope, ClickUp, Clipdrop, Comet, Connected Papers, Consensus, Copy.ai, CrewAI, Deepgram, DeepL, DeepSeek, Descript, Dext, Dia, Doubao, Dust, Eightfold AI, ElevenLabs, Elicit, Exa, fal.ai, Fathom, Figma, Fireflies, Fireworks AI, Fish Audio, Flux, Framer AI, Galileo/Stitch, Genspark, GetResponse, Glean, GLM, Google Stitch, Goose, Grammarly, Granola, Grok, Groq, Gumloop, Hailuo, Harvey, Hedra, Helicone, Hermes Agent, Hex, Higgsfield, hireEZ, Hugging Face, Humata, Hume AI, Hunyuan, HyperWrite, Ideogram, Intercom, and Jan.ai; 2026-06-01 mixed and coding refresh retained.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const inactiveStatuses = new Set(['dead', 'retired', 'acquired']);

function isActive(item: any): boolean {
  return !inactiveStatuses.has(String(item?.data?.status ?? '').toLowerCase());
}

function excerpt(value: unknown, max = 180): string {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const clipped = text.slice(0, max);
  const boundary = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, boundary > 110 ? boundary : max).trim()}...`;
}

export const GET: APIRoute = async () => {
  const tools = await getCollection('tools').catch(() => []);
  const categories = await getCollection('categories').catch(() => []);
  const comparisons = await getCollection('comparisons').catch(() => []);
  const useCases = await getCollection('use-cases').catch(() => []);
  const companies = await getCollection('companies').catch(() => []);

  const activeTools = tools
    .filter(isActive)
    .sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));

  const toolsByCategory = new Map<string, any[]>();
  for (const t of activeTools) {
    const cat = t.data.category || 'uncategorised';
    if (!toolsByCategory.has(cat)) toolsByCategory.set(cat, []);
    toolsByCategory.get(cat)!.push(t);
  }

  const activeCategories = categories
    .filter(isActive)
    .sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));

  const lines: string[] = [];
  lines.push('# aipedia.wiki — full manifest');
  lines.push('');
  lines.push('> Extended LLM-friendly site manifest. Enumerates every active page across tools, categories, comparisons, buyer guides, and companies. See /llms.txt for the concise version.');
  lines.push('');
  lines.push('## Editorial stance');
  lines.push('');
  lines.push('aipedia.wiki publishes no fabricated first-hand testing claims and uses no individual-author byline. Content is produced by aipedia.wiki Editorial (Organization) and verified against primary vendor sources on a recurring schedule. Prices, flagship model versions, and feature availability are cross-checked against vendor documentation weekly and rechecked against current sources on every material page refresh. Full methodology at https://aipedia.wiki/about/editorial/.');
  lines.push('');
  lines.push('## Canonical entry points');
  lines.push('');
  lines.push('- [Homepage](https://aipedia.wiki/)');
  lines.push('- [All Tools A-Z](https://aipedia.wiki/tools/)');
  lines.push('- [All Categories](https://aipedia.wiki/categories/)');
  lines.push('- [All Comparisons](https://aipedia.wiki/compare/)');
  lines.push('- [Guides](https://aipedia.wiki/guides/)');
  lines.push('- [Tool Set Builder](https://aipedia.wiki/stack-builder/)');
  lines.push('- [News](https://aipedia.wiki/news/)');
  lines.push('- [Answers](https://aipedia.wiki/answers/)');
  lines.push('- [Glossary](https://aipedia.wiki/glossary/)');
  lines.push('- [Editorial Policy](https://aipedia.wiki/about/editorial/)');
  lines.push('- [Scoring Methodology](https://aipedia.wiki/about/scoring/)');
  lines.push('');

  if (activeCategories.length > 0) {
    lines.push('## Category hubs');
    lines.push('');
    for (const cat of activeCategories) {
      const slug = cat.slug || cat.id?.replace(/\.md$/, '');
      const desc = excerpt(cat.data.description || cat.data.tagline || '', 160);
      lines.push(`- [${cat.data.title}](https://aipedia.wiki/categories/${slug}/)${desc ? `: ${desc}` : ''}`);
    }
    lines.push('');
  }

  if (activeTools.length > 0) {
    lines.push('## Tools');
    lines.push('');
    lines.push(`Active tool pages: ${activeTools.length}. Each carries a four-dimension score, current pricing, current flagship model version, and a last_verified date.`);
    lines.push('');
    for (const [cat, catTools] of [...toolsByCategory.entries()].sort()) {
      lines.push(`### ${cat}`);
      lines.push('');
      for (const t of catTools) {
        const slug = t.slug || t.id?.replace(/\.md$/, '');
        const tagline = excerpt(t.data.tagline || '', 180);
        lines.push(`- [${t.data.title}](https://aipedia.wiki/tools/${slug}/)${tagline ? `: ${tagline}` : ''}`);
      }
      lines.push('');
    }
  }

  if (comparisons.length > 0) {
    lines.push('## Head-to-head comparisons');
    lines.push('');
    const sortedComparisons = [...comparisons].sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));
    for (const c of sortedComparisons) {
      const slug = c.slug || c.id?.replace(/\.md$/, '');
      lines.push(`- [${c.data.title}](https://aipedia.wiki/compare/${slug}/)`);
    }
    lines.push('');
  }

  if (useCases.length > 0) {
    lines.push('## Guides');
    lines.push('');
    const sortedUseCases = [...useCases].sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));
    for (const u of sortedUseCases) {
      const slug = u.slug || u.id?.replace(/\.md$/, '');
      lines.push(`- [${u.data.title}](https://aipedia.wiki/guides/${slug}/)`);
    }
    lines.push('');
  }

  if (companies.length > 0) {
    lines.push('## Companies covered');
    lines.push('');
    const sortedCompanies = [...companies].sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));
    for (const co of sortedCompanies) {
      const slug = co.slug || co.id?.replace(/\.md$/, '');
      lines.push(`- [${co.data.title}](https://aipedia.wiki/companies/${slug}/)`);
    }
    lines.push('');
  }

  lines.push('## Citation format');
  lines.push('');
  lines.push('Canonical author: "aipedia.wiki Editorial" (Organization). Every tool and comparison page carries a Cite This Page block with APA, MLA, Chicago, and BibTeX formats. Quote blocks should preserve the canonical URL, last-verified date, and scoring rationale.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
