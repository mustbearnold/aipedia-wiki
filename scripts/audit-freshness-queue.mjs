#!/usr/bin/env node
// Report-only freshness queue for AIpedia canonical facts.
// Turns provenance, volatility, due review dates, and comparison impact into an editorial work queue.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const COMPARE_DIRS = [
  join(PROJECT_DIR, 'src', 'content', 'compare'),
  join(PROJECT_DIR, 'src', 'content', 'comparisons'),
];
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
const KNOWN_FLAGS = new Set(['--json', '--window-days', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--window-days', '--project-dir', '--root']);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();
const REVIEW_WINDOW_DAYS = numberArg('--window-days', 30);
const BASELINE_MARKER = 'Non-Tier-1 canonical profile';

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      } else if (name === '--window-days' && !/^\d+$/.test(value)) {
        issues.push({ code: 'argument-invalid', detail: `${name} must be a non-negative integer` });
      }
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-freshness-queue.mjs --json',
    '  node scripts/audit-freshness-queue.mjs --window-days 14',
    '',
    'Options:',
    '  --json                 Emit a structured report.',
    '  --window-days <days>   Include fact reviews due within this many days.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emitArgumentFailure() {
  const report = {
    ok: false,
    mode: 'argument-error',
    generated_at: new Date().toISOString(),
    project_dir: PROJECT_DIR,
    review_window_days: REVIEW_WINDOW_DAYS,
    argument_issues: argumentIssues,
    totals: {
      tools: 0,
      tools_dead: 0,
      facts: 0,
      sources: 0,
      baseline_generic_pages: 0,
      due_now: 0,
      due_soon: 0,
      high_volatility_missing_next_review: 0,
      source_registry_invalid_urls: 0,
      source_registry_duplicate_ids: 0,
      unknown_source_ids: 0,
      stale_verification_candidates: 0,
    },
    queues: {
      due_now: [],
      due_soon: [],
      top_review_queue: [],
      baseline_generic_pages: [],
      top_baseline_upgrades: [],
      stale_verification_candidates: [],
    },
    source_registry: {
      invalid_urls: [],
      duplicate_ids: [],
      missing_trust_metadata: [],
      unknown_source_ids: [],
    },
  };

  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    console.error('[audit-freshness-queue] invalid arguments');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitArgumentFailure();
  process.exit(1);
}

function numberArg(name, fallback) {
  const rawValue = valueFor(name);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) ? value : fallback;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  const match = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  const value = stripYamlQuotes(match[1]);
  if (value === '[]' || value === '{}') return '';
  return value;
}

function isDeadTool(frontmatter) {
  const status = scalar(frontmatter, 'status').toLowerCase();
  return status === 'dead' || status === 'discontinued';
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

function readMarkdown(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return { path, raw, frontmatter: match?.[1] ?? '' };
}

function parseDate(value) {
  const raw = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) return null;
  const date = new Date(`${raw.slice(0, 10)}T00:00:00Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDay(date) {
  return date.toISOString().slice(0, 10);
}

function daysUntil(value, now = new Date()) {
  const date = parseDate(value);
  if (!date) return null;
  const today = new Date(`${isoDay(now)}T00:00:00Z`);
  return Math.ceil((date.getTime() - today.getTime()) / 86_400_000);
}

function parseFacts(frontmatter) {
  const facts = {};
  const lines = frontmatter.split(/\r?\n/);
  let inFacts = false;
  let currentKey = '';

  for (const line of lines) {
    if (!inFacts) {
      if (/^facts:\s*$/.test(line)) inFacts = true;
      continue;
    }
    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;

    const scalarFact = line.match(/^\s{2}([A-Za-z0-9_]+):\s*(.+)$/);
    if (scalarFact && scalarFact[2].trim() !== '') {
      currentKey = scalarFact[1];
      facts[currentKey] = { value: stripYamlQuotes(scalarFact[2]) };
      continue;
    }

    const nested = line.match(/^\s{2}([A-Za-z0-9_]+):\s*$/);
    if (nested) {
      currentKey = nested[1];
      facts[currentKey] = facts[currentKey] ?? {};
      continue;
    }

    const nestedValue = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.*)$/);
    if (currentKey && nestedValue) {
      facts[currentKey][nestedValue[1]] = stripYamlQuotes(nestedValue[2]);
    }
  }
  return facts;
}

function meaningfulValue(fact) {
  const value = String(fact?.value ?? '').trim();
  return value && value !== '[]' && value !== '{}';
}

function loadSourceRegistry() {
  if (!existsSync(SOURCE_REGISTRY_PATH)) return { sources: [] };
  const registry = JSON.parse(readFileSync(SOURCE_REGISTRY_PATH, 'utf8'));
  return { sources: Array.isArray(registry.sources) ? registry.sources : [] };
}

function countComparisonMentions(toolSlugs) {
  const counts = Object.fromEntries(toolSlugs.map((slug) => [slug, 0]));
  const compareFiles = COMPARE_DIRS.flatMap((dir) => markdownFiles(dir));
  const contents = compareFiles.map((path) => `${projectPath(path)}\n${readFileSync(path, 'utf8')}`);

  for (const slug of toolSlugs) {
    const pattern = new RegExp(`(?<![A-Za-z0-9-])${escapeRegExp(slug)}(?![A-Za-z0-9-])`);
    counts[slug] = contents.filter((content) => pattern.test(content)).length;
  }
  return counts;
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

const registry = loadSourceRegistry();
const sourceIds = registry.sources.map((source) => source.id).filter(Boolean);
const duplicateSourceIds = unique(sourceIds.filter((id, index) => sourceIds.indexOf(id) !== index));
const sourceIdSet = new Set(sourceIds);
const invalidSourceUrls = registry.sources
  .filter((source) => !/^https:\/\//.test(String(source.url ?? '')))
  .map((source) => ({ id: source.id ?? '', url: source.url ?? '' }));
const missingTrustMetadata = registry.sources
  .filter((source) => !source.trust_tier || !source.volatility)
  .map((source) => ({ id: source.id ?? '', missing: ['trust_tier', 'volatility'].filter((key) => !source[key]) }));

const toolRecordsAll = markdownFiles(TOOLS_DIR).map((path) => {
  const md = readMarkdown(path);
  const slug = scalar(md.frontmatter, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
  const title = scalar(md.frontmatter, 'title') || slug;
  const facts = parseFacts(md.frontmatter);
  const factEntries = Object.entries(facts).filter(([, fact]) => meaningfulValue(fact));
  const is_dead = isDeadTool(md.frontmatter);
  return { path, slug, title, raw: md.raw, facts, factEntries, is_dead };
});
const toolRecords = toolRecordsAll.filter((tool) => !tool.is_dead);
const comparisonImpact = countComparisonMentions(toolRecords.map((tool) => tool.slug));

const now = new Date();
const dueNow = [];
const dueSoon = [];
const missingNextReviewOnHighVolatility = [];
const unknownSourceIds = [];
const baselineGenericPages = [];
const staleVerificationCandidates = [];

for (const tool of toolRecords) {
  if (tool.raw.includes(BASELINE_MARKER)) {
    baselineGenericPages.push({
      slug: tool.slug,
      title: tool.title,
      path: projectPath(tool.path),
      comparison_mentions: comparisonImpact[tool.slug] ?? 0,
    });
  }

  for (const [key, fact] of tool.factEntries) {
    const item = {
      slug: tool.slug,
      title: tool.title,
      key,
      path: projectPath(tool.path),
      volatility: fact.volatility || 'unspecified',
      source_id: fact.source_id || '',
      comparison_mentions: comparisonImpact[tool.slug] ?? 0,
    };

    if (fact.source_id && !sourceIdSet.has(fact.source_id)) unknownSourceIds.push(item);

    if (fact.volatility === 'high' && !fact.next_review_at) {
      missingNextReviewOnHighVolatility.push(item);
    }

    const dueInDays = daysUntil(fact.next_review_at, now);
    if (dueInDays !== null) {
      const reviewItem = { ...item, next_review_at: String(fact.next_review_at).slice(0, 10), due_in_days: dueInDays };
      if (dueInDays < 0) dueNow.push(reviewItem);
      else if (dueInDays <= REVIEW_WINDOW_DAYS) dueSoon.push(reviewItem);
    }

    const verifiedDays = daysUntil(fact.verified_at, now);
    if (verifiedDays !== null && verifiedDays < -90) {
      staleVerificationCandidates.push({ ...item, verified_at: String(fact.verified_at).slice(0, 10), age_days: Math.abs(verifiedDays) });
    }
  }
}

const rankFactQueue = (items) => items.sort((a, b) => {
  const dueDelta = (a.due_in_days ?? 9999) - (b.due_in_days ?? 9999);
  if (dueDelta !== 0) return dueDelta;
  return (b.comparison_mentions ?? 0) - (a.comparison_mentions ?? 0) || a.slug.localeCompare(b.slug) || a.key.localeCompare(b.key);
});
const rankToolQueue = (items) => items.sort((a, b) => (b.comparison_mentions ?? 0) - (a.comparison_mentions ?? 0) || a.slug.localeCompare(b.slug));

rankFactQueue(dueNow);
rankFactQueue(dueSoon);
rankToolQueue(baselineGenericPages);
staleVerificationCandidates.sort((a, b) => b.age_days - a.age_days || (b.comparison_mentions ?? 0) - (a.comparison_mentions ?? 0) || a.slug.localeCompare(b.slug));

const topToolsToUpgrade = baselineGenericPages.slice(0, 25);
const topReviewQueue = [...dueNow, ...dueSoon].slice(0, 50);

const result = {
  ok: true,
  mode: 'report',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  review_window_days: REVIEW_WINDOW_DAYS,
  argument_issues: [],
  totals: {
    tools: toolRecords.length,
    tools_dead: toolRecordsAll.length - toolRecords.length,
    facts: toolRecords.reduce((sum, tool) => sum + tool.factEntries.length, 0),
    sources: registry.sources.length,
    baseline_generic_pages: baselineGenericPages.length,
    due_now: dueNow.length,
    due_soon: dueSoon.length,
    high_volatility_missing_next_review: missingNextReviewOnHighVolatility.length,
    source_registry_invalid_urls: invalidSourceUrls.length,
    source_registry_duplicate_ids: duplicateSourceIds.length,
    unknown_source_ids: unknownSourceIds.length,
    stale_verification_candidates: staleVerificationCandidates.length,
  },
  queues: {
    due_now: dueNow,
    due_soon: dueSoon,
    top_review_queue: topReviewQueue,
    baseline_generic_pages: baselineGenericPages,
    top_baseline_upgrades: topToolsToUpgrade,
    stale_verification_candidates: staleVerificationCandidates.slice(0, 100),
  },
  source_registry: {
    invalid_urls: invalidSourceUrls,
    duplicate_ids: duplicateSourceIds,
    missing_trust_metadata: missingTrustMetadata,
    unknown_source_ids: unknownSourceIds,
  },
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  console.log(`[audit-freshness-queue] report-only freshness queue`);
  console.log(`Tools: ${result.totals.tools}; facts: ${result.totals.facts}; sources: ${result.totals.sources}`);
  console.log(`Due now: ${result.totals.due_now}; due in ${REVIEW_WINDOW_DAYS}d: ${result.totals.due_soon}; generic baseline pages: ${result.totals.baseline_generic_pages}`);
  console.log(`Source issues: ${result.totals.source_registry_invalid_urls} invalid URLs; ${result.totals.source_registry_duplicate_ids} duplicate IDs; ${result.totals.unknown_source_ids} unknown fact source IDs`);
  if (topToolsToUpgrade.length) {
    console.log(`Top baseline upgrades: ${topToolsToUpgrade.slice(0, 10).map((item) => item.slug).join(', ')}`);
  }
}
