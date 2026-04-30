/**
 * remark-footnote-refs
 *
 * Converts bracketed citation markers like [1], [2][3], [1][2][3] in body text
 * into clickable superscript footnote links that jump to a numbered entry in
 * the ## Sources section. Also stamps source list items with id="ref-N" so the
 * anchors resolve.
 *
 * Why: Perplexity outputs [N] citation markers that look like raw AI output
 * and don't link anywhere. This plugin rewrites them to proper footnote refs.
 *
 * Rules:
 * - Skips text inside code, code blocks, links, and headings.
 * - Only matches [N] where N is 1-99. Ignores e.g. [brand] or [$10] which
 *   could collide in prose.
 * - In the Sources section, finds list items that end with [N] and tags them
 *   with id="ref-N" while stripping the trailing [N] marker.
 */
import { visit, SKIP } from 'unist-util-visit';

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

function buildSupNodes(nums) {
  // Render as <sup class="fn-ref"><a href="#ref-N">N</a>, <a href="#ref-M">M</a></sup>
  const children = [];
  nums.forEach((n, i) => {
    if (i > 0) {
      children.push({ type: 'html', value: '<span class="fn-ref-sep">,</span>' });
    }
    children.push({
      type: 'html',
      value: `<a href="#ref-${n}" class="fn-ref-link" aria-label="See source ${n}">${n}</a>`,
    });
  });
  return { type: 'html', value: `<sup class="fn-ref">[${children.map(c => c.value).join('')}]</sup>` };
}

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

    // Second pass: in text nodes OUTSIDE the sources list, replace [N] with <sup>
    visit(tree, 'text', (node, index, parent) => {
      if (!parent) return;
      if (parent.type === 'link' || parent.type === 'inlineCode' || parent.type === 'code') return;
      if (parent.type === 'heading') return;
      // Skip list items inside the sources list (their anchors are handled above)
      if (sourcesListNode && isInsideNode(parent, sourcesListNode)) return;

      const value = node.value;
      if (!CITE.test(value)) {
        CITE.lastIndex = 0;
        return;
      }
      CITE.lastIndex = 0;

      // Split text node around citation matches
      const newNodes = [];
      let lastIdx = 0;
      let m;
      while ((m = CITE.exec(value)) !== null) {
        if (m.index > lastIdx) {
          newNodes.push({ type: 'text', value: value.slice(lastIdx, m.index) });
        }
        const nums = parseMarkers(m[0]);
        newNodes.push(buildSupNodes(nums));
        lastIdx = m.index + m[0].length;
      }
      if (lastIdx < value.length) {
        newNodes.push({ type: 'text', value: value.slice(lastIdx) });
      }

      parent.children.splice(index, 1, ...newNodes);
      return [SKIP, index + newNodes.length];
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
