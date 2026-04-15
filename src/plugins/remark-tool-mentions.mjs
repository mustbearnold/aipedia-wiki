/**
 * remark-tool-mentions
 *
 * Walk text nodes in markdown AST, find unlinked mentions of known tool
 * names, and wrap them in internal links to /tools/<slug>/. Skip text
 * inside existing links, code, code blocks, headings, and the page's own
 * tool name (no self-linking).
 *
 * Self-linking would produce circular "Read more" UX; the page itself
 * has the prominent CTA. Internal links to /tools/<slug>/ funnel readers
 * to that tool's page where its own affiliate CTA does the conversion.
 *
 * Only the FIRST occurrence per other-tool-name per page is wrapped, to
 * keep prose readable and avoid link spam.
 */
import { visit, SKIP } from 'unist-util-visit';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const REGISTRY_PATH = fileURLToPath(
  new URL('../data/_meta/tools-registry.json', import.meta.url)
);

let cachedTools = null;

function loadTools() {
  if (cachedTools) return cachedTools;
  try {
    const raw = readFileSync(REGISTRY_PATH, 'utf8');
    const data = JSON.parse(raw);
    const tools = Object.values(data.tools || {})
      .filter((t) => t.status === 'active' && t.slug && t.title)
      .map((t) => ({
        slug: t.slug,
        title: t.title,
        url: `/tools/${t.slug}/`,
      }));
    // Sort by title length descending so longer matches win first
    // ("Claude Code" matched before "Claude").
    tools.sort((a, b) => b.title.length - a.title.length);
    cachedTools = tools;
    return tools;
  } catch (e) {
    cachedTools = [];
    return cachedTools;
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function remarkToolMentions() {
  return (tree, file) => {
    // Derive self slug from the file path so we don't link a tool page to itself.
    let selfSlug = '';
    const filePath = (file?.history?.[0] || file?.path || '').replace(/\\/g, '/');
    const m = filePath.match(/\/tools\/([^/]+)\.md$/);
    if (m) selfSlug = m[1];

    const tools = loadTools().filter((t) => t.slug !== selfSlug);
    if (tools.length === 0) return;

    const pattern = new RegExp(
      '\\b(' + tools.map((t) => escapeRegex(t.title)).join('|') + ')\\b',
      'g'
    );

    const used = new Set();

    visit(tree, (node, index, parent) => {
      if (!parent || index == null) return;
      // Skip headings, links, code, html, image
      if (
        node.type === 'heading' ||
        node.type === 'link' ||
        node.type === 'linkReference' ||
        node.type === 'inlineCode' ||
        node.type === 'code' ||
        node.type === 'html' ||
        node.type === 'image'
      ) {
        return SKIP;
      }
      if (node.type !== 'text') return;
      if (!node.value || !pattern.test(node.value)) return;

      // Reset regex
      pattern.lastIndex = 0;

      const segments = [];
      let last = 0;
      let m;
      while ((m = pattern.exec(node.value)) !== null) {
        const title = m[1];
        const tool = tools.find((t) => t.title === title);
        if (!tool || used.has(tool.slug)) continue;
        used.add(tool.slug);

        const before = node.value.slice(last, m.index);
        if (before) segments.push({ type: 'text', value: before });
        segments.push({
          type: 'link',
          url: tool.url,
          title: null,
          data: { hProperties: { className: ['tool-mention'] } },
          children: [{ type: 'text', value: title }],
        });
        last = m.index + title.length;
      }
      if (segments.length === 0) return;

      const tail = node.value.slice(last);
      if (tail) segments.push({ type: 'text', value: tail });

      parent.children.splice(index, 1, ...segments);
      return [SKIP, index + segments.length];
    });
  };
}

