/**
 * remark-glossary-mentions
 *
 * Walk text nodes in markdown AST, find unlinked mentions of known glossary
 * terms, and wrap the FIRST occurrence per term per page in a link to
 * /glossary/#<term-slug>. Skip headings, code, links, html, image. Skip
 * the glossary page itself.
 */
import { visit, SKIP } from 'unist-util-visit';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const GLOSSARY_PATH = fileURLToPath(
  new URL('../content/glossary/index.md', import.meta.url)
);

let cachedTerms = null;

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function loadTerms() {
  if (cachedTerms) return cachedTerms;
  try {
    const md = readFileSync(GLOSSARY_PATH, 'utf8');
    const terms = [];
    const re = /^##\s+(.+?)\s*$/gm;
    let m;
    while ((m = re.exec(md)) !== null) {
      const heading = m[1].trim();
      // For things like "TTS (Text-to-Speech)", strip the parenthetical
      // and add both the abbreviation and the full form as separate match terms.
      const paren = heading.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
      const slug = slugify(heading);
      if (paren) {
        terms.push({ title: paren[1].trim(), slug });
        terms.push({ title: paren[2].trim(), slug });
      } else {
        terms.push({ title: heading, slug });
      }
    }
    // Sort by length desc so longer terms win first ("Foundation Model" > "Model").
    terms.sort((a, b) => b.title.length - a.title.length);
    cachedTerms = terms;
    return terms;
  } catch (e) {
    cachedTerms = [];
    return cachedTerms;
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function remarkGlossaryMentions() {
  return (tree, file) => {
    const filePath = (file?.history?.[0] || file?.path || '').replace(/\\/g, '/');
    if (/\/glossary\//.test(filePath)) return;

    const terms = loadTerms();
    if (terms.length === 0) return;

    // Acronym terms (all-caps, 2-5 chars) match case-sensitively;
    // full-word terms match case-insensitively.
    const caseSensitive = terms.filter((t) => /^[A-Z0-9]{2,5}$/.test(t.title));
    const caseInsensitive = terms.filter((t) => !/^[A-Z0-9]{2,5}$/.test(t.title));

    const csPattern = caseSensitive.length
      ? new RegExp('\\b(' + caseSensitive.map((t) => escapeRegex(t.title)).join('|') + ')\\b', 'g')
      : null;
    const ciPattern = caseInsensitive.length
      ? new RegExp('\\b(' + caseInsensitive.map((t) => escapeRegex(t.title)).join('|') + ')\\b', 'gi')
      : null;

    const used = new Set();

    function findMatch(value) {
      // Try case-sensitive (acronyms) first, then case-insensitive.
      let match = null;
      let matchedTitle = null;
      if (csPattern) {
        csPattern.lastIndex = 0;
        const m = csPattern.exec(value);
        if (m) { match = m; matchedTitle = m[1]; }
      }
      if (ciPattern) {
        ciPattern.lastIndex = 0;
        const m = ciPattern.exec(value);
        if (m && (!match || m.index < match.index)) {
          match = m;
          matchedTitle = m[1];
        }
      }
      if (!match) return null;
      const term = terms.find((t) => t.title === matchedTitle || t.title.toLowerCase() === matchedTitle.toLowerCase());
      if (!term) return null;
      return { index: match.index, length: matchedTitle.length, matched: matchedTitle, term };
    }

    visit(tree, (node, index, parent) => {
      if (!parent || index == null) return;
      if (
        node.type === 'heading' ||
        node.type === 'link' ||
        node.type === 'linkReference' ||
        node.type === 'inlineCode' ||
        node.type === 'code' ||
        node.type === 'html' ||
        node.type === 'image'
      ) return SKIP;
      if (node.type !== 'text') return;

      const segments = [];
      let cursor = 0;
      let value = node.value;

      while (cursor < value.length) {
        const slice = value.slice(cursor);
        const m = findMatch(slice);
        if (!m) break;
        if (used.has(m.term.slug)) {
          // This term was already linked elsewhere on the page. Move past
          // this occurrence so we keep scanning for other unlinked terms.
          cursor += m.index + m.length;
          continue;
        }
        used.add(m.term.slug);
        const before = slice.slice(0, m.index);
        if (before) segments.push({ type: 'text', value: before });
        segments.push({
          type: 'link',
          url: `/glossary/#${m.term.slug}`,
          title: null,
          data: { hProperties: { className: ['glossary-mention'] } },
          children: [{ type: 'text', value: m.matched }],
        });
        cursor += m.index + m.length;
      }

      if (segments.length === 0) return;

      const tail = value.slice(cursor);
      if (tail) segments.push({ type: 'text', value: tail });

      parent.children.splice(index, 1, ...segments);
      return [SKIP, index + segments.length];
    });
  };
}
