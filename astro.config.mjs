import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { remarkRewriteLinks } from './src/plugins/remark-rewrite-links.mjs';
import { rehypeRemoveFirstH1 } from './src/plugins/rehype-remove-first-h1.mjs';

export default defineConfig({
  site: 'https://aipedia.wiki',
  integrations: [sitemap()],
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkRewriteLinks],
    rehypePlugins: [rehypeRemoveFirstH1],
    shikiConfig: {
      theme: 'github-dark',
    },
  },
});
