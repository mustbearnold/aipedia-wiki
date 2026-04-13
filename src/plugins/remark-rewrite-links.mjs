import { visit } from 'unist-util-visit';

// Maps wiki directory paths to website URL paths
const pathMap = {
  'tools': '/tools',
  'categories': '/categories',
  'comparisons': '/compare',
  'trends': '/trends',
  'companies': '/companies',
  'use-cases': '/guides',
  'stacks': '/guides',
  'dead': '/dead',
  'glossary': '/glossary',
};

export function remarkRewriteLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      let url = node.url;

      // Skip external links and anchor links
      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:')) {
        return;
      }

      // Remove .md extension
      if (url.endsWith('.md')) {
        url = url.replace(/\.md$/, '');
      }

      // Handle relative paths like ../categories/ai-voice or ../tools/elevenlabs
      // Normalize: strip leading ../ sequences
      const cleaned = url.replace(/^(\.\.\/)+/, '');

      // Split into directory and slug
      const parts = cleaned.split('/');
      if (parts.length >= 2) {
        const dir = parts[0];
        const slug = parts.slice(1).join('/');
        const mappedDir = pathMap[dir];
        if (mappedDir) {
          node.url = `${mappedDir}/${slug}/`;
          return;
        }
      }

      // Handle same-directory links like cursor.md -> /tools/cursor/
      if (parts.length === 1 && !url.startsWith('/')) {
        const slug = parts[0];
        node.url = `/tools/${slug}/`;
        return;
      }

      // Add trailing slash if missing
      if (!node.url.endsWith('/') && !node.url.includes('#') && !node.url.includes('.')) {
        node.url += '/';
      }
    });

    // Bug 3: Strip [[wikilinks]] brackets
    visit(tree, 'text', (node) => {
      if (/\[\[([^\]]+)\]\]/.test(node.value)) {
        node.value = node.value.replace(/\[\[([^\]]+)\]\]/g, '$1');
      }
    });
  };
}
