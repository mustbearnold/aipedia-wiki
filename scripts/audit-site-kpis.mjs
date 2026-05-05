#!/usr/bin/env node
// Snapshot AIpedia remediation KPIs without failing CI.
// This is intentionally dependency-free so it can run before install-heavy steps
// and in the same environments as the existing guard scripts.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');
const JSON_MODE = process.argv.includes('--json');

const COLLECTIONS = [
  'tools',
  'comparisons',
  'use-cases',
  'categories',
  'trends',
  'companies',
  'dead',
  'glossary',
  'news',
  'workflows',
  'reports',
];

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function markdownFiles(collection) {
  const dir = join(CONTENT_DIR, collection);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => join(dir, name));
}

function readMarkdown(path) {
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match?.[1] ?? '';
  const body = match ? raw.slice(match[0].length) : raw;
  return { path, raw, frontmatter, body };
}

function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
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

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function splitInlineList(value) {
  const input = String(value ?? '').trim();
  if (!input) return [];
  const body = input.startsWith('[') && input.endsWith(']') ? input.slice(1, -1) : input;
  const out = [];
  let current = '';
  let quote = '';
  let escape = false;
  for (const char of body) {
    if (escape) {
      current += char;
      escape = false;
      continue;
    }
    if (char === '\\') {
      current += char;
      escape = true;
      continue;
    }
    if (quote) {
      current += char;
      if (char === quote) quote = '';
      continue;
    }
    if (char === '"' || char === "'") {
      quote = char;
      current += char;
      continue;
    }
    if (char === ',') {
      const item = stripYamlQuotes(current.trim());
      if (item) out.push(item);
      current = '';
      continue;
    }
    current += char;
  }
  const tail = stripYamlQuotes(current.trim());
  if (tail) out.push(tail);
  return out;
}

function listValues(frontmatter, key) {
  const inline = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*\\[([\\s\\S]*?)\\]\\s*$`, 'm'));
  if (inline) return splitInlineList(`[${inline[1]}]`);

  const keyLine = frontmatter.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.*)$`, 'm'));
  if (!keyLine) return [];
  const sameLine = stripYamlQuotes(keyLine[1]);
  if (sameLine && sameLine !== '[]') return splitInlineList(sameLine);

  const lines = frontmatter.split(/\r?\n/);
  const startIndex = lines.findIndex((line) => new RegExp(`^${escapeRegExp(key)}:\\s*$`).test(line));
  if (startIndex === -1) return [];

  const values = [];
  for (const line of lines.slice(startIndex + 1)) {
    if (line.trim() === '') continue;
    if (!/^\s+/.test(line)) break;
    const item = line.match(/^\s+-\s+(.+)$/);
    if (item) values.push(stripYamlQuotes(item[1]));
  }
  return values.filter(Boolean);
}

function parseSlug(frontmatter, path) {
  return scalar(frontmatter, 'slug') || path.split(/[\\/]/).pop().replace(/\.md$/, '');
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

    const nestedValue = line.match(/^\s{4}([A-Za-z0-9_]+):\s*(.+)$/);
    if (currentKey && nestedValue) {
      facts[currentKey][nestedValue[1]] = stripYamlQuotes(nestedValue[2]);
    }
  }

  return facts;
}

function hasMeaningfulFacts(frontmatter) {
  const facts = parseFacts(frontmatter);
  return Object.values(facts).some((fact) => String(fact?.value ?? '').trim());
}

function wordCount(markdownBody) {
  const text = markdownBody
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_#>[\](){}|:.,;!?"'“”‘’]/g, ' ');
  const words = text.match(/[A-Za-z0-9]+(?:[\u2019'][A-Za-z0-9]+)?/g);
  return words?.length ?? 0;
}

function daysSince(isoDate) {
  if (!/^\d{4}-\d{2}-\d{2}/.test(String(isoDate))) return null;
  const date = new Date(`${String(isoDate).slice(0, 10)}T00:00:00Z`);
  const now = new Date();
  if (Number.isNaN(date.getTime())) return null;
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / 86_400_000));
}

function percentile(values, p) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[index];
}

function countBy(values) {
  return values.reduce((acc, value) => {
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});
}

function summarizeShortest(items, limit = 10) {
  return items
    .sort((a, b) => a.words - b.words || a.slug.localeCompare(b.slug))
    .slice(0, limit)
    .map(({ slug, words, path }) => ({ slug, words, path: projectPath(path) }));
}

const collectionCounts = Object.fromEntries(COLLECTIONS.map((collection) => [collection, markdownFiles(collection).length]));

const toolRecords = markdownFiles('tools').map((path) => {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  return {
    path,
    slug,
    status: scalar(md.frontmatter, 'status') || 'unknown',
    seo_title: scalar(md.frontmatter, 'seo_title'),
    meta_description: scalar(md.frontmatter, 'meta_description'),
    best_for: listValues(md.frontmatter, 'best_for'),
    not_best_for: listValues(md.frontmatter, 'not_best_for'),
    has_facts: hasMeaningfulFacts(md.frontmatter),
    last_verified: scalar(md.frontmatter, 'last_verified'),
    last_updated: scalar(md.frontmatter, 'last_updated'),
    words: wordCount(md.body),
  };
});

const comparisonRecords = markdownFiles('comparisons').map((path) => {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  return {
    path,
    slug,
    canonical_fact_table: /^canonical_fact_table:\s*true\s*$/m.test(md.frontmatter),
    words: wordCount(md.body),
  };
});

const useCaseRecords = markdownFiles('use-cases').map((path) => {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  return { path, slug, words: wordCount(md.body) };
});

const newsRecords = markdownFiles('news').map((path) => {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  const date = scalar(md.frontmatter, 'date');
  const month = /^\d{4}-\d{2}/.test(date) ? date.slice(0, 7) : 'unknown';
  return { path, slug, date, month, words: wordCount(md.body) };
});

const freshnessDays = toolRecords.map((tool) => daysSince(tool.last_verified)).filter((value) => value !== null);

const result = {
  generated_at: new Date().toISOString(),
  collections: collectionCounts,
  tools: {
    total: toolRecords.length,
    status: countBy(toolRecords.map((tool) => tool.status || 'unknown')),
    missing: {
      seo_title: toolRecords.filter((tool) => !tool.seo_title).map((tool) => tool.slug),
      meta_description: toolRecords.filter((tool) => !tool.meta_description).map((tool) => tool.slug),
      best_for: toolRecords.filter((tool) => tool.best_for.length === 0).map((tool) => tool.slug),
      not_best_for: toolRecords.filter((tool) => tool.not_best_for.length === 0).map((tool) => tool.slug),
      facts: toolRecords.filter((tool) => !tool.has_facts).map((tool) => tool.slug),
      last_verified: toolRecords.filter((tool) => !tool.last_verified).map((tool) => tool.slug),
      last_updated: toolRecords.filter((tool) => !tool.last_updated).map((tool) => tool.slug),
    },
    freshness: {
      median_days: percentile(freshnessDays, 50),
      p90_days: percentile(freshnessDays, 90),
      max_days: freshnessDays.length ? Math.max(...freshnessDays) : null,
      verified_0_7_days: freshnessDays.filter((age) => age <= 7).length,
      verified_8_30_days: freshnessDays.filter((age) => age >= 8 && age <= 30).length,
      verified_over_30_days: freshnessDays.filter((age) => age > 30).length,
    },
    shortest: summarizeShortest(toolRecords),
  },
  comparisons: {
    total: comparisonRecords.length,
    with_canonical_fact_table: comparisonRecords.filter((comparison) => comparison.canonical_fact_table).length,
    missing_canonical_fact_table: comparisonRecords.filter((comparison) => !comparison.canonical_fact_table).length,
    shortest: summarizeShortest(comparisonRecords),
  },
  use_cases: {
    total: useCaseRecords.length,
    shortest: summarizeShortest(useCaseRecords),
  },
  news: {
    total: newsRecords.length,
    by_month: Object.fromEntries(Object.entries(countBy(newsRecords.map((news) => news.month))).sort()),
    shortest: summarizeShortest(newsRecords),
  },
  files: {
    public_pagefind_tracked: existsSync(join(PROJECT_DIR, 'public', 'pagefind')),
    report_artifacts_should_stay_untracked: ['.hermes/', 'reports/', 'agent-runs/'],
  },
};

function printSection(title) {
  console.log(`\n${title}`);
  console.log('='.repeat(title.length));
}

function printList(label, values, limit = 20) {
  const display = values.slice(0, limit).join(', ');
  const more = values.length > limit ? ` … +${values.length - limit} more` : '';
  console.log(`${label}: ${values.length}${values.length ? ` (${display}${more})` : ''}`);
}

if (JSON_MODE) {
  console.log(JSON.stringify(result, null, 2));
} else {
  printSection('Collections');
  for (const [collection, count] of Object.entries(result.collections)) {
    console.log(`${collection.padEnd(12)} ${String(count).padStart(4)}`);
  }

  printSection('Tools');
  console.log(`total: ${result.tools.total}`);
  console.log(`status: ${JSON.stringify(result.tools.status)}`);
  console.log(
    `freshness: median ${result.tools.freshness.median_days}d, p90 ${result.tools.freshness.p90_days}d, max ${result.tools.freshness.max_days}d`,
  );
  printList('missing seo_title', result.tools.missing.seo_title);
  printList('missing meta_description', result.tools.missing.meta_description);
  printList('missing best_for', result.tools.missing.best_for);
  printList('missing not_best_for', result.tools.missing.not_best_for);
  printList('missing facts', result.tools.missing.facts, 25);
  console.log('shortest tools:');
  for (const tool of result.tools.shortest) console.log(`  ${tool.slug.padEnd(24)} ${String(tool.words).padStart(5)} words`);

  printSection('Comparisons');
  console.log(`total: ${result.comparisons.total}`);
  console.log(`with canonical_fact_table: ${result.comparisons.with_canonical_fact_table}`);
  console.log(`missing canonical_fact_table: ${result.comparisons.missing_canonical_fact_table}`);
  console.log('shortest comparisons:');
  for (const comparison of result.comparisons.shortest) {
    console.log(`  ${comparison.slug.padEnd(38)} ${String(comparison.words).padStart(5)} words`);
  }

  printSection('Use cases');
  console.log(`total: ${result.use_cases.total}`);
  console.log('shortest use cases:');
  for (const useCase of result.use_cases.shortest) console.log(`  ${useCase.slug.padEnd(36)} ${String(useCase.words).padStart(5)} words`);

  printSection('News');
  console.log(`total: ${result.news.total}`);
  console.log(`by month: ${JSON.stringify(result.news.by_month)}`);
  console.log('shortest news:');
  for (const news of result.news.shortest) console.log(`  ${news.slug.padEnd(46)} ${String(news.words).padStart(5)} words`);
}
