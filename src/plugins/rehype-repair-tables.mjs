/**
 * rehype-repair-tables
 *
 * 225 of 266 comparison markdown files start their fact tables with a
 * separator row (|---|---|...|) and skip the header row. Markdown
 * therefore renders the whole thing as a paragraph, producing a wall
 * of pipe characters in the body.
 *
 * This plugin detects those paragraphs and rebuilds them as proper
 * <table> elements. Detection rule: paragraph whose first child is a
 * text node beginning with "|---" and contains pipe-delimited rows.
 */
import { visit } from 'unist-util-visit';

function getText(node) {
  let out = '';
  if (!node) return out;
  if (node.type === 'text') return node.value ?? '';
  if (!node.children) return out;
  for (const child of node.children) out += getText(child);
  return out;
}

function looksLikeBrokenTable(paragraph) {
  if (!paragraph || paragraph.type !== 'element' || paragraph.tagName !== 'p') return false;
  const text = getText(paragraph);
  if (!text) return false;
  const trimmed = text.trim();
  if (!trimmed.startsWith('|---')) return false;
  // Must have at least 2 pipe-row segments to be worth fixing
  return (trimmed.match(/\n\|/g) || []).length >= 1 || trimmed.includes('| |');
}

// Convert a single row string like "| **Foo** | bar | baz |" into a
// list of HAST <td> nodes with the inline markdown re-parsed.
// We do a lightweight pass here: bold (**x**), italics (*x*), and
// raw text. Inline links are preserved if already converted to <a>
// tags in the original paragraph, but since the paragraph children
// have been flattened, we re-emit text only — close enough for the
// fact-table use case.
function splitRow(line) {
  // Strip leading/trailing pipes
  const stripped = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '');
  return stripped.split('|').map((c) => c.trim());
}

function inlineFormat(text) {
  // Bold: **x**  → <strong>x</strong>
  // Italic: *x*  → <em>x</em>
  // Code: `x`    → <code>x</code>
  // Otherwise raw text
  const out = [];
  let i = 0;
  while (i < text.length) {
    // Bold
    if (text[i] === '*' && text[i + 1] === '*') {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        out.push({ type: 'element', tagName: 'strong', properties: {}, children: [{ type: 'text', value: text.slice(i + 2, end) }] });
        i = end + 2;
        continue;
      }
    }
    // Italic
    if (text[i] === '*') {
      const end = text.indexOf('*', i + 1);
      if (end !== -1 && end !== i + 1) {
        out.push({ type: 'element', tagName: 'em', properties: {}, children: [{ type: 'text', value: text.slice(i + 1, end) }] });
        i = end + 1;
        continue;
      }
    }
    // Inline code
    if (text[i] === '`') {
      const end = text.indexOf('`', i + 1);
      if (end !== -1) {
        out.push({ type: 'element', tagName: 'code', properties: {}, children: [{ type: 'text', value: text.slice(i + 1, end) }] });
        i = end + 1;
        continue;
      }
    }
    // Accumulate plain text until next special char
    let j = i;
    while (j < text.length && text[j] !== '*' && text[j] !== '`') j++;
    if (j > i) {
      out.push({ type: 'text', value: text.slice(i, j) });
      i = j;
    } else {
      // No progress — push the single char as text to avoid infinite loop
      out.push({ type: 'text', value: text[i] });
      i++;
    }
  }
  return out;
}

function makeTableFromRows(rows) {
  if (rows.length === 0) return null;
  // First row is treated as headers; if cells look empty, fall back
  // to generic "Column N" labels.
  const headerCells = rows[0].map((c, idx) => c || `Column ${idx + 1}`);
  const bodyRows = rows.slice(1);

  return {
    type: 'element',
    tagName: 'table',
    properties: {},
    children: [
      {
        type: 'element',
        tagName: 'thead',
        properties: {},
        children: [{
          type: 'element',
          tagName: 'tr',
          properties: {},
          children: headerCells.map((c) => ({
            type: 'element',
            tagName: 'th',
            properties: { scope: 'col' },
            children: inlineFormat(c),
          })),
        }],
      },
      {
        type: 'element',
        tagName: 'tbody',
        properties: {},
        children: bodyRows.map((row) => ({
          type: 'element',
          tagName: 'tr',
          properties: {},
          children: row.map((cell, cellIdx) => ({
            type: 'element',
            // First column is a row-header for accessibility.
            tagName: cellIdx === 0 ? 'th' : 'td',
            properties: cellIdx === 0 ? { scope: 'row' } : {},
            children: inlineFormat(cell),
          })),
        })),
      },
    ],
  };
}

export default function rehypeRepairTables() {
  return (tree) => {
    if (!tree || !Array.isArray(tree.children)) return;
    walk(tree);
  };
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (looksLikeBrokenTable(child)) {
      const text = getText(child);
      // Split by literal newline character (the paragraph may have <br>
      // children that show up as "\n" in getText output).
      const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
      // Drop the leading "|---|---|..." separator(s); collect rows.
      const dataLines = lines.filter((l) => !/^\|[-:|\s]+\|?$/.test(l));
      const rows = dataLines.map(splitRow).filter((r) => r.length > 0);
      if (rows.length === 0) continue;
      const table = makeTableFromRows(rows);
      if (table) {
        node.children.splice(i, 1, table);
      }
    } else {
      walk(child);
    }
  }
}
