#!/usr/bin/env node
/**
 * Trim price_history entries in tool frontmatter to the most recent 3.
 *
 * Editorial rule (permanent, from CLAUDE.md): "price_history frontmatter
 * keep only the latest 2-3 entries". This script enforces the ceiling
 * non-destructively by sorting by date and keeping the last 3.
 *
 * Run: node scripts/trim-price-history.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const TOOLS_DIR = 'src/content/tools';
const MAX_ENTRIES = 3;

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  return { yaml: match[1], body: match[2] };
}

/**
 * Lightweight line-based extractor for price_history. Preserves the
 * exact original indentation of each entry block so rewrite is safe on
 * any hand-edited YAML style. Does not try to fully parse YAML.
 */
function extractPriceHistory(yaml) {
  const lines = yaml.split('\n');
  let startIdx = -1;
  let endIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^price_history:\s*$/)) {
      startIdx = i;
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].match(/^[a-zA-Z_]+:/)) {
          endIdx = j;
          break;
        }
      }
      if (endIdx === -1) endIdx = lines.length;
      break;
    }
  }
  if (startIdx === -1) return null;

  // Each entry starts with "  - date:" at 2-space indent. Collect entries.
  const entries = [];
  let cur = null;
  for (let i = startIdx + 1; i < endIdx; i++) {
    const line = lines[i];
    if (/^  -\s*date:/.test(line)) {
      if (cur) entries.push(cur);
      cur = { startLine: i, lines: [line] };
    } else if (cur) {
      cur.lines.push(line);
    }
  }
  if (cur) entries.push(cur);

  // Parse a date-like value out of each entry's first line for sorting.
  for (const e of entries) {
    const m = e.lines[0].match(/date:\s*(.+?)\s*$/);
    e.dateRaw = m ? m[1].replace(/['"]/g, '') : '';
    const d = new Date(e.dateRaw);
    e.sortKey = isNaN(d.getTime()) ? 0 : d.getTime();
  }

  return { startIdx, endIdx, entries, before: lines.slice(0, startIdx + 1), after: lines.slice(endIdx) };
}

function trimFile(path) {
  const raw = readFileSync(path, 'utf8');
  const fm = parseFrontmatter(raw);
  if (!fm) return { path, status: 'no-frontmatter' };

  const ph = extractPriceHistory(fm.yaml);
  if (!ph) return { path, status: 'no-price-history' };
  if (ph.entries.length <= MAX_ENTRIES) {
    return { path, status: 'ok', kept: ph.entries.length };
  }

  // Keep most recent entries by date (ties preserve original order).
  const sorted = [...ph.entries]
    .map((e, i) => ({ ...e, origIdx: i }))
    .sort((a, b) => (b.sortKey - a.sortKey) || (a.origIdx - b.origIdx));
  const keep = sorted.slice(0, MAX_ENTRIES);
  // Restore original chronological order the user wrote them in (we
  // assume the file ordered entries oldest → newest; sorting kept set
  // by origIdx to match).
  keep.sort((a, b) => a.origIdx - b.origIdx);

  const rewritten = [
    ...ph.before,
    ...keep.flatMap((e) => e.lines),
    ...ph.after,
  ].join('\n');
  const newRaw = `---\n${rewritten}\n---\n${fm.body}`;
  writeFileSync(path, newRaw);
  return { path, status: 'trimmed', from: ph.entries.length, to: MAX_ENTRIES };
}

const files = readdirSync(TOOLS_DIR).filter((f) => f.endsWith('.md'));
let trimmed = 0;
let total = 0;
for (const f of files) {
  const result = trimFile(join(TOOLS_DIR, f));
  if (result.status === 'trimmed') {
    console.log(`[trim] ${result.path}: ${result.from} -> ${result.to}`);
    trimmed++;
  }
  total++;
}
console.log(`\nScanned ${total} tool files; trimmed price_history on ${trimmed}.`);
