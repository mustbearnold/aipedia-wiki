// /llms.txt — concise LLM-friendly site manifest per the llmstxt.org standard.
// Points LLM crawlers (Perplexity, ChatGPT search, Google AI Overviews, Bing
// Copilot) at the canonical index + category hubs + editorial policy.
//
// See also /llms-full.txt for the verbose variant with every page listed.
// Refresh metadata: 2026-06-05 ElevenLabs voice comparison slice across Fish Audio, HeyGen, Murf, Otter.ai, Resemble AI, Synthesia, Voxtral, and WellSaid plus Murf, WellSaid, AI Voice, tools, comparison, category, homepage, source registry, and LLM maintenance.
// Refresh metadata: 2026-06-05 Devin comparison slice across GitHub Copilot and Val Town plus Val Town, AI Coding, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 Codeium lineage vs GitHub Copilot comparison slice plus Codeium, AI Coding, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 Descript voice comparison slice across ElevenLabs, Fish Audio, Resemble AI, and Voxtral plus Descript, ElevenLabs, Fish Audio, Resemble AI, Voxtral, AI Voice, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 DeepSeek model-family comparison slice across Gemini, Mistral AI, and Qwen plus DeepSeek, Gemini, Mistral AI, Qwen, AI Chatbots, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 Decktopus presentation comparison slice across Gamma, Pitch, and Presentations.AI plus Decktopus, Gamma, Pitch, Presentations.AI, AI Presentation, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 Cursor comparison slice across Devin, Gemini, GitHub Copilot, Lovable, Tabnine, v0, Val Town, and Windsurf/Devin Desktop plus Devin, Lovable, Windsurf, AI Coding, AI Design, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-05 Copy.ai writing comparison slice across Grammarly, HyperWrite, QuillBot, Sudowrite, and Wordtune plus QuillBot tool refresh, AI Writing, tools, comparison, category, homepage, source registry, and LLM maintenance; 2026-06-04 Continue comparison slice across Cursor, Devin, GitHub Copilot, and Val Town plus Continue source-controlled AI PR-check tool refresh, AI Coding, tools, comparison, category, homepage, and LLM maintenance; 2026-06-04 research-discovery comparison slice across Connected Papers, Consensus, Elicit, nanochat, Scite, and Semantic Scholar plus nanochat/Semantic Scholar tool refresh, AI Research, tools, comparison, category, homepage, and LLM maintenance; 2026-06-04 Cline/Cody vs Cursor coding comparison slice plus AI Coding, comparison, category, homepage, and LLM maintenance; 2026-06-04 Clay automation comparison slice across Instantly, Intercom, Make, and Zapier plus Make tool, AI Automation, tools, comparison, category, homepage, and LLM maintenance; 2026-06-04 Claude specialist comparison slice across GitHub Copilot, Grammarly, Grok, Jasper, Kimi, Mistral AI, Notion AI, Perplexity, Qwen, and Sudowrite plus AI Coding, AI Writing, AI Chatbots, AI Notes, AI Search, comparison, category, homepage, and LLM maintenance; 2026-06-04 Claude comparison slice across Cline, Cody, Cursor, DeepSeek, Elicit, and Gemini plus AI Coding, AI Chatbots, AI Research, comparison, and LLM surface maintenance; 2026-06-04 Claude Code comparison slice across Continue, Devin, GitHub Copilot, and Val Town plus affected tool/category/top-layer maintenance; 2026-06-04 ChatGPT comparison continuation across Scite, Sudowrite, Surfer SEO, v0, Wordtune, Writesonic, You.com, and Zapier plus affected tool/category/top-layer maintenance; 2026-06-03 AI news catch-up across Microsoft Work IQ, GitHub Copilot SDK/AI Credits, Anthropic Glasswing, OpenAI retirements, Gemini Drive sharing, NVIDIA GTC Taipei, and enterprise-agent policy; 2026-06-03 ChatGPT comparison clusters refresh across Claude, Copy.ai, Cursor, DeepSeek, Elicit, Figma, Fireflies.ai, Gamma, Gemini, GitHub Copilot, GLM, Grammarly, Grok, Hermes Agent, Jasper, Kagi, Kimi, Lovable, MarketMuse, Mem, Mistral AI, NeuronWriter, Notion AI, Otter.ai, and QuillBot plus ChatGPT/category maintenance; 2026-06-03 Cartesia comparison cluster refresh across Descript, ElevenLabs, Fish Audio, Resemble AI, and Voxtral, plus Voxtral TTS/STT correction; 2026-06-03 Capacities comparison cluster refresh across Fireflies.ai, NotebookLM, Obsidian, Otter.ai, and Readwise; 2026-06-03 Canva comparison cluster refresh across ChatGPT, Figma, Google Stitch, Lovable, Midjourney, and v0; 2026-06-02 Aider comparison cluster refresh across Claude Code, Cursor, and GitHub Copilot; Ahrefs comparison cluster refresh across Frase, MarketMuse, NeuronWriter, and Surfer SEO; Adobe Firefly comparison cluster refresh across Canva, Flux, Magnific/Freepik, Ideogram, Midjourney, and Stable Diffusion; company/methodology refresh for Anthropic, ElevenLabs, /404, /about/, /about/scoring, and /companies; active-tool refresh for Canva, Capacities, Captions, Cartesia, Castmagic, Character.AI, ChatPDF, Claude Design, Clay, Clearscope, ClickUp, Clipdrop, Comet, Connected Papers, Consensus, Copy.ai, CrewAI, Deepgram, DeepL, DeepSeek, Descript, Dext, Dia, Doubao, Dust, Eightfold AI, ElevenLabs, Elicit, Exa, fal.ai, Fathom, Figma, Fireflies, Fireworks AI, Fish Audio, Flux, Framer AI, Galileo/Stitch, Genspark, GetResponse, Glean, GLM, Google Stitch, Goose, Grammarly, Granola, Grok, Groq, Gumloop, Hailuo, Harvey, Hedra, Helicone, Hermes Agent, Hex, Higgsfield, hireEZ, Hugging Face, Humata, Hume AI, Hunyuan, HyperWrite, Ideogram, Intercom, and Jan.ai; 2026-06-01 mixed and coding refresh retained.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const inactiveStatuses = new Set(['dead', 'retired', 'acquired']);

function isActive(item: any): boolean {
  return !inactiveStatuses.has(String(item?.data?.status ?? '').toLowerCase());
}

function excerpt(value: unknown, max = 140): string {
  const text = String(value ?? '').replace(/\s+/g, ' ').trim();
  if (text.length <= max) return text;
  const clipped = text.slice(0, max);
  const boundary = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, boundary > 80 ? boundary : max).trim()}...`;
}

export const GET: APIRoute = async () => {
  const categories = await getCollection('categories').catch(() => []);
  const tools = await getCollection('tools').catch(() => []);
  const comparisons = await getCollection('comparisons').catch(() => []);
  const useCases = await getCollection('use-cases').catch(() => []);
  const activeTools = tools.filter(isActive);
  const activeCategories = categories
    .filter(isActive)
    .sort((a: any, b: any) => (a.data.title || '').localeCompare(b.data.title || ''));

  const lines: string[] = [];
  lines.push('# aipedia.wiki');
  lines.push('');
  lines.push(`> Independent AI tools encyclopedia maintained by aipedia.wiki Editorial. ${activeTools.length} active tool pages across ${activeCategories.length} categories, ${comparisons.length} head-to-head comparisons, ${useCases.length} buyer guides. Public pages carry verification metadata and editorial sourcing controls.`);
  lines.push('');
  lines.push('Editorial positioning: no individual-author bylines, no fabricated hands-on testing claims. Pages cite vendor-published sources. Scoring is four-dimension (utility, value, moat, longevity) and is not influenced by affiliate commissions.');
  lines.push('');
  lines.push('## Canonical entry points');
  lines.push('');
  lines.push('- [Homepage](https://aipedia.wiki/): portal and featured tools');
  lines.push('- [All Tools A-Z](https://aipedia.wiki/tools/): every active AI tool page');
  lines.push('- [All Categories](https://aipedia.wiki/categories/): hubs grouping tools by domain');
  lines.push('- [All Comparisons](https://aipedia.wiki/compare/): head-to-head tool vs tool articles');
  lines.push('- [Guides](https://aipedia.wiki/guides/): problem-first buyer pages for choosing AI tools by workflow, budget, and risk');
  lines.push('- [Tool Set Builder](https://aipedia.wiki/stack-builder/): role-and-budget path to starter AI tool stacks');
  lines.push('- [News](https://aipedia.wiki/news/): source-linked product, model, pricing, acquisition, and shutdown updates');
  lines.push('- [Answers](https://aipedia.wiki/answers/): concise responses to high-volume AI buying questions');
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
      const desc = excerpt(cat.data.description || cat.data.tagline || '', 140);
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
  lines.push('Every tool page carries a last_verified date in its header and frontmatter. Flagship model versions, pricing, and feature availability are re-verified on a weekly cycle against vendor-published primary sources, and volatile claims are checked against current sources on every material page refresh. See https://aipedia.wiki/sitemap-index.xml for the crawlable index.');
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
