import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkRewriteLinks } from './src/plugins/remark-rewrite-links.mjs';
import { remarkToolMentions } from './src/plugins/remark-tool-mentions.mjs';
import { remarkGlossaryMentions } from './src/plugins/remark-glossary-mentions.mjs';
import { remarkFootnoteRefs } from './src/plugins/remark-footnote-refs.mjs';
import { rehypeRemoveFirstH1 } from './src/plugins/rehype-remove-first-h1.mjs';
import rehypeCollapseSections from './src/plugins/rehype-collapse-sections.mjs';
import rehypeRepairTables from './src/plugins/rehype-repair-tables.mjs';

import vercel from '@astrojs/vercel';

const isDev = process.env.NODE_ENV !== 'production';
const isFastBuild = process.env.AIPEDIA_FAST_BUILD === '1';

const SITEMAP_EXCLUDED_PATHS = new Set([
  '/about/editor/',
  '/compare/build/',
  '/demo-godtier/',
  '/guides/ai-content-pipeline/',
  '/guides/ai-customer-support/',
  '/guides/best-ai-for-medical-research/',
  '/guides/best-ai-for-legal-research/',
  '/guides/best-ai-tools-under-10-month/',
  '/guides/best-ai-tools-under-50-month/',
  '/guides/notion-ai-alternatives/',
  '/guides/otter-ai-alternatives/',
  '/search/',
  '/tool-finder/',
]);

function shouldIncludeInSitemap(page) {
  const url = new URL(page, 'https://aipedia.wiki');
  const path = url.pathname;

  if (path.startsWith('/admin/')) return false;
  if (path.startsWith('/api/')) return false;
  if (SITEMAP_EXCLUDED_PATHS.has(path)) return false;

  return true;
}

export default defineConfig({
  site: 'https://aipedia.wiki',
  integrations: [sitemap({ filter: shouldIncludeInSitemap })],
  output: 'static',
  outDir: isFastBuild ? './dist-fast' : './dist',
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    remarkPlugins: [remarkRewriteLinks, remarkFootnoteRefs, remarkToolMentions, remarkGlossaryMentions],
    rehypePlugins: [rehypeRemoveFirstH1, rehypeRepairTables, rehypeCollapseSections],
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  ...(isDev || isFastBuild ? {} : { adapter: vercel() }),
});
