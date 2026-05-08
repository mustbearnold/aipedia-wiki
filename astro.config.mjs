import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkRewriteLinks } from './src/plugins/remark-rewrite-links.mjs';
import { remarkToolMentions } from './src/plugins/remark-tool-mentions.mjs';
import { remarkGlossaryMentions } from './src/plugins/remark-glossary-mentions.mjs';
import { remarkFootnoteRefs } from './src/plugins/remark-footnote-refs.mjs';
import { rehypeRemoveFirstH1 } from './src/plugins/rehype-remove-first-h1.mjs';

import cloudflare from '@astrojs/cloudflare';

const isDev = process.env.NODE_ENV !== 'production' && !process.env.CF_PAGES;
const isFastBuild = process.env.AIPEDIA_FAST_BUILD === '1';

const SITEMAP_EXCLUDED_PATHS = new Set([
  '/about/editor/',
  '/compare/build/',
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
    rehypePlugins: [rehypeRemoveFirstH1],
    shikiConfig: {
      theme: 'github-dark',
    },
  },

  ...(isDev || isFastBuild ? {} : { adapter: cloudflare() }),
});
