#!/usr/bin/env node
// Picks the next unbuilt comparison(s) from the coverage backlog.
//
// Re-validates each candidate against the live comparisons directory so a pair
// that was created since the backlog was generated is skipped. Emits a compact
// task brief the coverage agent (or a human) can act on. Read-only.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const BACKLOG_PATH = resolve(PROJECT_DIR, valueFor('--backlog') || 'src/data/coverage-backlog.json');
const COMPARISONS_DIR = join(PROJECT_DIR, 'src', 'content', 'comparisons');
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARISON_POLICY_PATH = join(PROJECT_DIR, 'src', 'data', 'comparison-policy.json');
const COUNT = numberArg('--count', 1);
const JSON_MODE = args.includes('--json');

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}
function numberArg(name, fallback) {
  const raw = valueFor(name);
  const n = raw === undefined ? NaN : Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

if (!existsSync(BACKLOG_PATH)) {
  console.error(`[coverage-next] backlog not found at ${BACKLOG_PATH}. Run: npm run coverage:backlog`);
  process.exit(1);
}

function pairKey(a, b) {
  return [a, b].sort((x, y) => x.localeCompare(y)).join('|');
}
function stripYamlQuotes(value) {
  const t = String(value ?? '').trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) return t.slice(1, -1);
  return t;
}
function readFrontmatter(path) {
  return readFileSync(path, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
}
function inlineArray(fm, key) {
  const m = fm.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]\\s*$`, 'm'));
  return m ? m[1].split(',').map(stripYamlQuotes).filter(Boolean) : [];
}

function scalar(fm, key) {
  return stripYamlQuotes(fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1] ?? '');
}

// Live set of existing comparison pairs.
const existingPairs = new Set();
if (existsSync(COMPARISONS_DIR)) {
  for (const name of readdirSync(COMPARISONS_DIR)) {
    if (!name.endsWith('.md')) continue;
    const tools = inlineArray(readFrontmatter(join(COMPARISONS_DIR, name)), 'tools');
    for (let i = 0; i < tools.length; i += 1) {
      for (let j = i + 1; j < tools.length; j += 1) existingPairs.add(pairKey(tools[i], tools[j]));
    }
  }
}

const comparisonPolicy = existsSync(COMPARISON_POLICY_PATH)
  ? JSON.parse(readFileSync(COMPARISON_POLICY_PATH, 'utf8'))
  : { allowed_adjacent_pairs: [], blocked_pairs: [] };
const allowedAdjacentPairs = new Set(
  (comparisonPolicy.allowed_adjacent_pairs || []).map((entry) => pairKey(entry.tools[0], entry.tools[1])),
);
const blockedPairs = new Set(
  (comparisonPolicy.blocked_pairs || []).map((entry) => pairKey(entry.tools[0], entry.tools[1])),
);

// Tools that require canonical_fact_table + fact tokens (mirror guard-stale-facts).
const CANONICAL_FACT_TOOLS = new Set([
  'chatgpt', 'claude', 'gemini', 'grok', 'deepseek',
  'midjourney', 'runway', 'elevenlabs', 'cursor', 'github-copilot',
]);

function toolTitle(slug) {
  const path = join(TOOLS_DIR, `${slug}.md`);
  return existsSync(path) ? stripYamlQuotes(readFrontmatter(path).match(/^title:\s*(.+)$/m)?.[1] ?? slug) : slug;
}

function toolPrimaryCategory(slug) {
  const path = join(TOOLS_DIR, `${slug}.md`);
  return existsSync(path) ? scalar(readFrontmatter(path), 'category') : '';
}

function selectableComparison(item) {
  if (item.requires_human_review || item.selectable === false) return false;
  if (['review_only', 'blocked'].includes(item.comparison_mode)) return false;

  const key = pairKey(item.tools[0], item.tools[1]);
  if (blockedPairs.has(key)) return false;
  if (allowedAdjacentPairs.has(key)) return true;

  const [firstCategory, secondCategory] = item.tools.map(toolPrimaryCategory);
  return Boolean(firstCategory && firstCategory === secondCategory);
}

const backlog = JSON.parse(readFileSync(BACKLOG_PATH, 'utf8'));
const candidates = (backlog.backlog?.comparisons ?? [])
  .filter((item) => item?.tools?.length >= 2)
  .filter((item) => selectableComparison(item))
  .filter((item) => !existingPairs.has(pairKey(item.tools[0], item.tools[1])))
  .slice(0, COUNT)
  .map((item) => {
    const [a, b] = item.tools;
    const needsCanonical = item.tools.some((slug) => CANONICAL_FACT_TOOLS.has(slug));
    return {
      ...item,
      titles: [toolTitle(a), toolTitle(b)],
      target_path: `src/content/comparisons/${item.slug}.md`,
      requires_canonical_fact_table: needsCanonical,
      canonical_fact_tools: item.tools.filter((slug) => CANONICAL_FACT_TOOLS.has(slug)),
    };
  });

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify({ ok: true, count: candidates.length, candidates }, null, 2)}\n`);
} else {
  if (!candidates.length) {
    console.log('[coverage-next] backlog drained (no unbuilt comparison candidates).');
  }
  for (const c of candidates) {
    console.log(`Next: ${c.titles[0]} vs ${c.titles[1]}`);
    console.log(`  slug:   ${c.slug}`);
    console.log(`  file:   ${c.target_path}`);
    console.log(`  tools:  [${c.tools.join(', ')}]`);
    console.log(`  score:  ${c.score}  (${c.same_category ? c.shared_categories.join('/') : 'cross-category'})`);
    if (c.requires_canonical_fact_table) {
      console.log(`  REQUIRED: canonical_fact_table: true; use {{fact:slug.key}} tokens for ${c.canonical_fact_tools.join(', ')}`);
    }
    console.log('');
  }
}
