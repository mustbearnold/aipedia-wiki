/**
 * remark-footnote-refs
 *
 * Strips bracketed citation markers like [1], [2][3] from body prose
 * because they read as raw AI output and visually clutter the page.
 * The Sources section at the bottom is now the canonical reference
 * surface — readers click through there, not from inline superscripts.
 *
 * In the Sources section we still strip the trailing [N] marker from
 * each list item and stamp it with id="ref-N" so any existing
 * deep-link still resolves.
 *
 * Rules:
 * - Skips text inside code, code blocks, links, and headings.
 * - Only matches [N] where N is 1-99 (ignores brand-style brackets).
 */
import { visit } from 'unist-util-visit';

const CITE = /\[(\d{1,2})\](?:\[\d{1,2}\])*/g;

function parseMarkers(token) {
  // "[3][1]" -> [3, 1]
  const nums = [];
  const re = /\[(\d{1,2})\]/g;
  let m;
  while ((m = re.exec(token)) !== null) {
    nums.push(Number(m[1]));
  }
  return nums;
}

// Inline citations are stripped, not rendered. Kept here for reference
// if we ever want to bring superscript footnotes back.
// function buildSupNodes(nums) { ... }

export function remarkFootnoteRefs() {
  return (tree) => {
    // First pass: find ## Sources heading and tag its list items with id="ref-N"
    let inSources = false;
    let sourcesListNode = null;

    visit(tree, (node, index, parent) => {
      if (node.type === 'heading' && node.depth === 2) {
        const headingText = getText(node).trim().toLowerCase();
        inSources = headingText === 'sources';
        sourcesListNode = null;
      } else if (inSources && node.type === 'list' && !sourcesListNode) {
        sourcesListNode = node;
        // Tag each list item with id based on its position and/or trailing [N]
        node.children.forEach((li, idx) => {
          const last = findLastTextish(li);
          if (!last) return;
          const m = last.value && last.value.match(/\[(\d{1,2})\]\s*$/);
          let refNum;
          if (m) {
            refNum = Number(m[1]);
            // Strip the trailing [N] from the text
            last.value = last.value.replace(/\s*\[(\d{1,2})\]\s*$/, '');
          } else {
            // Fall back to 1-indexed position
            refNum = idx + 1;
          }
          // Wrap the li content in an html opener/closer so we can add id
          li.data = li.data || {};
          li.data.hProperties = {
            ...(li.data.hProperties || {}),
            id: `ref-${refNum}`,
            className: 'fn-entry',
          };
        });
      }
    });

    // Second pass: in text nodes OUTSIDE the sources list, STRIP every
    // [N] inline citation. Also collapse the whitespace left behind so
    // we don't end up with double-spaces or a leading space before
    // punctuation like ". ", "; ", etc.
    visit(tree, 'text', (node, index, parent) => {
      if (!parent) return;
      if (parent.type === 'link' || parent.type === 'inlineCode' || parent.type === 'code') return;
      if (parent.type === 'heading') return;
      if (sourcesListNode && isInsideNode(parent, sourcesListNode)) return;

      const value = node.value;
      if (!CITE.test(value)) {
        CITE.lastIndex = 0;
        return;
      }
      CITE.lastIndex = 0;

      // 1. Drop trailing [N] markers (with leading whitespace) entirely:
      //    "Anthropic's flagship  [3][4]." → "Anthropic's flagship."
      // 2. Drop standalone [N] markers between words and clean up extra space.
      let next = value
        .replace(/\s*\[\d{1,2}\](?:\[\d{1,2}\])*\s*([.,;:!?])/g, '$1')
        .replace(/\s*\[\d{1,2}\](?:\[\d{1,2}\])*/g, '')
        .replace(/[ \t]{2,}/g, ' ');

      if (next === value) return;
      node.value = next;
    });
  };
}

function getText(node) {
  let out = '';
  visit(node, 'text', (t) => { out += t.value; });
  return out;
}

function findLastTextish(node) {
  // Find the last text node (or close enough) in a list item for appending to
  let last = null;
  visit(node, 'text', (t) => { last = t; });
  return last;
}

// Parent-pointer check is awkward in mdast; use a content-based heuristic:
// we already captured the sources list node, and list items contain text or
// paragraphs. If a visited parent is the list itself or any of its li's, skip.
function isInsideNode(parent, target) {
  if (parent === target) return true;
  if (!target || !target.children) return false;
  // mdast has no parent pointers, so we walk down: does target contain parent?
  let found = false;
  visit(target, (n) => {
    if (n === parent) {
      found = true;
      return false; // stop
    }
  });
  return found;
}
