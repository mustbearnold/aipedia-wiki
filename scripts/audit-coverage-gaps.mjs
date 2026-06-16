#!/usr/bin/env node
// Report-only coverage-gap detector for AIpedia.
// Turns the existing tool/comparison/answer inventory into a prioritized
// backlog of net-new pages worth creating: missing high-value comparisons,
// missing "best-X" / "is-X-worth-it" / "X-alternatives" answer pages.
//
// Read-only. Prints a summary by default; `--json` emits the full backlog,
// `--out <path>` writes it to a file. Never mutates content.

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARE_DIRS = [
  join(PROJECT_DIR, 'src', 'content', 'comparisons'),
  join(PROJECT_DIR, 'src', 'content', 'compare'),
];
const ANSWERS_DIR = join(PROJECT_DIR, 'src', 'pages', 'answers');
const CATEGORIES_DIR = join(PROJECT_DIR, 'src', 'content', 'categories');
const PRIORITY_PATH = join(PROJECT_DIR, 'src', 'data', 'tool-priority.json');

const JSON_MODE = args.includes('--json');
const OUT_PATH = valueFor('--out');
const LIMIT = numberArg('--limit', 60);
const HELP_MODE = args.includes('--help') || args.includes('-h');

if (HELP_MODE) {
  console.log([
    'Usage:',
    '  node scripts/audit-coverage-gaps.mjs            Summary to stdout',
    '  node scripts/audit-coverage-gaps.mjs --json     Full backlog JSON to stdout',
    '  node scripts/audit-coverage-gaps.mjs --out src/data/coverage-backlog.json',
    '',
    'Options:',
    '  --limit <n>          Cap each backlog list (default 60).',
    '  --out <path>         Write the full backlog JSON to a file.',
    '  --project-dir <dir>  Audit another project root.',
  ].join('\n'));
  process.exit(0);
}

function valueFor(name) {
  const inline = args.find((a) => a.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : undefined;
}

function numberArg(name, fallback) {
  const raw = valueFor(name);
  if (raw === undefined) return fallback;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : fallback;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function markdownFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return markdownFiles(path);
      return entry.isFile() && entry.name.endsWith('.md') ? [path] : [];
    })
    .sort((a, b) => a.localeCompare(b));
}

function readFrontmatter(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  const value = stripYamlQuotes(match[1]);
  return value === '[]' || value === '{}' ? '' : value;
}

// Parses an inline YAML array `key: [a, b, c]`. Returns [] when absent.
function inlineArray(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*?)\\]\\s*$`, 'm'));
  if (!match) return [];
  return match[1]
    .split(',')
    .map((part) => stripYamlQuotes(part))
    .filter(Boolean);
}

function slugFromPath(path) {
  return path.split(/[\\/]/).pop().replace(/\.md$/, '');
}

function pairKey(a, b) {
  return [a, b].sort((x, y) => x.localeCompare(y)).join('|');
}

function comparisonSlug(a, b) {
  return [a, b].sort((x, y) => x.localeCompare(y)).join('-vs-');
}

/* ------------------------------------------------------------------ */
/*  Load inventory                                                     */
/* ------------------------------------------------------------------ */

const priority = existsSync(PRIORITY_PATH)
  ? JSON.parse(readFileSync(PRIORITY_PATH, 'utf8'))
  : { tier1: [], tier2: [], tier3: [] };
const tier1 = new Set(priority.tier1 || []);
const tier2 = new Set(priority.tier2 || []);

const DEAD_STATUS = new Set(['dead', 'acquired', 'discontinued']);

const tools = markdownFiles(TOOLS_DIR).map((path) => {
  const fm = readFrontmatter(path);
  const slug = scalar(fm, 'slug') || slugFromPath(path);
  const cats = [scalar(fm, 'category'), ...inlineArray(fm, 'secondary_categories')].filter(Boolean);
  const hasScores = /^scores:\s*$/m.test(fm);
  return {
    slug,
    title: scalar(fm, 'title') || slug,
    status: scalar(fm, 'status').toLowerCase(),
    categories: [...new Set(cats)],
    hasScores,
  };
});
const activeTools = tools.filter((t) => !DEAD_STATUS.has(t.status));
const toolBySlug = new Map(activeTools.map((t) => [t.slug, t]));

// Notable = worth a dedicated comparison page: tier1/tier2 ranked, or scored.
function isNotable(slug) {
  const tool = toolBySlug.get(slug);
  return Boolean(tool && (tier1.has(slug) || tier2.has(slug) || tool.hasScores));
}

function priorityWeight(slug) {
  if (tier1.has(slug)) return 3;
  if (tier2.has(slug)) return 2;
  return toolBySlug.get(slug)?.hasScores ? 1 : 0;
}

// Existing comparison pairs (order-independent), keyed off the `tools:` array
// so detection is robust to filename ordering.
const existingPairs = new Set();
const existingComparisonSlugs = new Set();
for (const dir of COMPARE_DIRS) {
  for (const path of markdownFiles(dir)) {
    const fm = readFrontmatter(path);
    existingComparisonSlugs.add(scalar(fm, 'slug') || slugFromPath(path));
    const pairTools = inlineArray(fm, 'tools');
    for (let i = 0; i < pairTools.length; i += 1) {
      for (let j = i + 1; j < pairTools.length; j += 1) {
        existingPairs.add(pairKey(pairTools[i], pairTools[j]));
      }
    }
  }
}

const categories = markdownFiles(CATEGORIES_DIR).map((path) => ({
  slug: scalar(readFrontmatter(path), 'slug') || slugFromPath(path),
}));

const existingAnswers = new Set(
  existsSync(ANSWERS_DIR)
    ? readdirSync(ANSWERS_DIR)
        .filter((f) => f.endsWith('.astro') && f !== 'index.astro')
        .map((f) => f.replace(/\.astro$/, ''))
    : [],
);

/* ------------------------------------------------------------------ */
/*  Comparison gaps                                                    */
/* ------------------------------------------------------------------ */

const notable = activeTools.map((t) => t.slug).filter(isNotable);
const candidatePairs = new Map(); // pairKey -> {a, b, sharedCategories}

function addPair(a, b) {
  if (a === b) return;
  const key = pairKey(a, b);
  if (existingPairs.has(key)) return;
  if (!candidatePairs.has(key)) {
    const [x, y] = key.split('|');
    candidatePairs.set(key, { a: x, b: y, sharedCategories: [] });
  }
}

// 1) Every tier1 x tier1 pairing is high-search-volume regardless of category.
const tier1List = [...tier1].filter((slug) => toolBySlug.has(slug));
for (let i = 0; i < tier1List.length; i += 1) {
  for (let j = i + 1; j < tier1List.length; j += 1) {
    addPair(tier1List[i], tier1List[j]);
  }
}

// 2) Within-category notable pairings (same buyer is choosing between them).
const byCategory = new Map();
for (const slug of notable) {
  for (const cat of toolBySlug.get(slug).categories) {
    if (!byCategory.has(cat)) byCategory.set(cat, []);
    byCategory.get(cat).push(slug);
  }
}
for (const [cat, slugs] of byCategory) {
  for (let i = 0; i < slugs.length; i += 1) {
    for (let j = i + 1; j < slugs.length; j += 1) {
      addPair(slugs[i], slugs[j]);
      const entry = candidatePairs.get(pairKey(slugs[i], slugs[j]));
      if (entry && !entry.sharedCategories.includes(cat)) entry.sharedCategories.push(cat);
    }
  }
}

const comparisonGaps = [...candidatePairs.values()]
  .map(({ a, b, sharedCategories }) => {
    const bothTier1 = tier1.has(a) && tier1.has(b);
    const sameCategory = sharedCategories.length > 0;
    const score = priorityWeight(a) + priorityWeight(b) + (bothTier1 ? 2 : 0) + (sameCategory ? 2 : 0);
    return {
      kind: 'comparison',
      slug: comparisonSlug(a, b),
      tools: [a, b],
      shared_categories: sharedCategories,
      both_tier1: bothTier1,
      same_category: sameCategory,
      score,
    };
  })
  .sort((x, y) => y.score - x.score || x.slug.localeCompare(y.slug));

/* ------------------------------------------------------------------ */
/*  Answer-page gaps                                                   */
/* ------------------------------------------------------------------ */

// Normalized stem for near-duplicate detection: drop the best-/best-ai-
// prefix, the trailing year, and a trailing plural 's'. This keeps us from
// proposing best-ai-chatbots-2026 when best-ai-chatbot-2026 already exists,
// or best-ai-image-2026 against best-ai-image-generator-2026.
function answerStem(slug) {
  return slug
    .replace(/^best-(ai-)?/, '')
    .replace(/-?20\d\d$/, '')
    .replace(/-+$/, '')
    .replace(/s$/, '');
}
const existingAnswerStems = [...existingAnswers].map(answerStem).filter(Boolean);

function hasNearDuplicateAnswer(slug) {
  const stem = answerStem(slug);
  if (!stem) return false;
  return existingAnswerStems.some((existing) => existing.includes(stem) || stem.includes(existing));
}

const answerGaps = [];
function addAnswerGap(slug, kind, score) {
  if (existingAnswers.has(slug) || existingComparisonSlugs.has(slug)) return;
  if (hasNearDuplicateAnswer(slug)) return;
  answerGaps.push({ kind, slug, score });
}

// best-{category}-2026 for every category that lacks one.
for (const cat of categories) {
  const base = cat.slug.replace(/^ai-/, '');
  addAnswerGap(`best-ai-${base}-2026`, 'best-of', 6);
}
// is-{tool}-worth-it and {tool}-alternatives-2026 for tier1 tools.
for (const slug of tier1List) {
  addAnswerGap(`is-${slug}-worth-it`, 'worth-it', 5);
  addAnswerGap(`${slug}-alternatives-2026`, 'alternatives', 5);
}
answerGaps.sort((x, y) => y.score - x.score || x.slug.localeCompare(y.slug));

/* ------------------------------------------------------------------ */
/*  Report                                                             */
/* ------------------------------------------------------------------ */

const report = {
  ok: true,
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  totals: {
    tools_active: activeTools.length,
    tools_notable: notable.length,
    comparisons_existing: existingComparisonSlugs.size,
    answers_existing: existingAnswers.size,
    comparison_gaps: comparisonGaps.length,
    answer_gaps: answerGaps.length,
  },
  backlog: {
    comparisons: comparisonGaps.slice(0, LIMIT),
    answers: answerGaps.slice(0, LIMIT),
  },
};

if (OUT_PATH) {
  const out = resolve(PROJECT_DIR, OUT_PATH);
  writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`[audit-coverage-gaps] wrote backlog to ${projectPath(out)}`);
}

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (!OUT_PATH) {
  console.log('[audit-coverage-gaps] coverage backlog');
  console.log(`Active tools: ${report.totals.tools_active} (${report.totals.tools_notable} notable)`);
  console.log(`Existing: ${report.totals.comparisons_existing} comparisons, ${report.totals.answers_existing} answer pages`);
  console.log(`Gaps: ${report.totals.comparison_gaps} comparisons, ${report.totals.answer_gaps} answer pages`);
  console.log('');
  console.log(`Top ${Math.min(15, comparisonGaps.length)} comparison gaps:`);
  for (const gap of comparisonGaps.slice(0, 15)) {
    const tags = [gap.both_tier1 ? 'tier1' : null, gap.same_category ? gap.shared_categories[0] : 'cross-cat']
      .filter(Boolean)
      .join(', ');
    console.log(`  [${gap.score}] ${gap.slug}  (${tags})`);
  }
  console.log('');
  console.log(`Top ${Math.min(10, answerGaps.length)} answer gaps:`);
  for (const gap of answerGaps.slice(0, 10)) {
    console.log(`  [${gap.score}] ${gap.slug}  (${gap.kind})`);
  }
}
