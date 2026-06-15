#!/usr/bin/env node
// Report-only canonical tool fact completeness audit.
// Keeps the inherited fact debt visible without failing CI while Phase 2 rolls out.

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const PRIORITY_PATH = join(PROJECT_DIR, 'src', 'data', 'tool-priority.json');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();
const STALE_THRESHOLD_DAYS = 90;

const REQUIRED_KEYS = [
  'flagship_model',
  'context_window',
  'pricing_anchor',
  'free_plan',
  'best_paid_tier',
  'api_available',
  'image_generation',
  'video_generation',
  'real_time_voice',
  'web_browsing',
  'coding_agent',
  'enterprise_controls',
  'data_retention_or_privacy',
  'open_source_or_local',
  'best_for',
  'watch_out_for',
];

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
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
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
    '  node scripts/audit-tool-facts.mjs --json',
    '  node scripts/audit-tool-facts.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured fact-quality report.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emitArgumentFailure() {
  const emptyTier = (name) => ({
    name,
    total: 0,
    tools: [],
    missing_pages: [],
    required_fact_slots: 0,
    present_required_fact_slots: 0,
    completeness_percent: 100,
    complete_tools: 0,
    missing_by_tool: [],
    missing_key_counts: {},
  });
  const report = {
    ok: false,
    mode: 'argument-error',
    generated_at: new Date().toISOString(),
    project_dir: PROJECT_DIR,
    stale_threshold_days: STALE_THRESHOLD_DAYS,
    required_keys: REQUIRED_KEYS,
    argument_issues: argumentIssues,
    totals: {
      tools: 0,
      tools_with_facts: 0,
      tools_missing_facts: 0,
      facts: 0,
    },
    priority: {
      tier1: emptyTier('tier1'),
      tier2: emptyTier('tier2'),
      tier3: emptyTier('tier3'),
    },
    quality: {
      facts_missing_source: [],
      facts_missing_verified_at: [],
      stale_facts: [],
      stale_fact_age_by_key: {},
    },
  };

  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.error('[audit-tool-facts] invalid arguments');
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

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
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

function markdownFiles(dir) {
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
  return { path, raw, frontmatter };
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

function meaningfulValue(fact) {
  const value = String(fact?.value ?? '').trim();
  return value && value !== '[]' && value !== '{}';
}

function parseDate(value) {
  const raw = String(value ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}/.test(raw)) return null;
  const date = new Date(`${raw.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date;
}

function daysSince(value) {
  const date = parseDate(value);
  if (!date) return null;
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - date.getTime()) / 86_400_000));
}

function average(values) {
  if (!values.length) return null;
  return Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) / 10;
}

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}

function summarizeTier(name, slugs, toolsBySlug) {
  const records = slugs.map((slug) => toolsBySlug.get(slug)).filter(Boolean);
  const missingPages = slugs.filter((slug) => !toolsBySlug.has(slug));
  const missingByTool = [];
  let presentRequired = 0;

  for (const tool of records) {
    const missingKeys = REQUIRED_KEYS.filter((key) => !meaningfulValue(tool.facts[key]));
    presentRequired += REQUIRED_KEYS.length - missingKeys.length;
    if (missingKeys.length) {
      missingByTool.push({ slug: tool.slug, path: projectPath(tool.path), missing_keys: missingKeys });
    }
  }

  const requiredSlots = records.length * REQUIRED_KEYS.length;
  return {
    name,
    total: slugs.length,
    tools: slugs,
    missing_pages: missingPages,
    required_fact_slots: requiredSlots,
    present_required_fact_slots: presentRequired,
    completeness_percent: requiredSlots ? Math.round((presentRequired / requiredSlots) * 1000) / 10 : 100,
    complete_tools: records.length - missingByTool.length,
    missing_by_tool: missingByTool,
    missing_key_counts: countBy(
      missingByTool.flatMap((item) => item.missing_keys),
      (key) => key,
    ),
  };
}

function loadPriority() {
  if (!existsSync(PRIORITY_PATH)) return { tier1: [], tier2: [], tier3: [] };
  const raw = JSON.parse(readFileSync(PRIORITY_PATH, 'utf8'));
  return {
    tier1: Array.isArray(raw.tier1) ? raw.tier1 : [],
    tier2: Array.isArray(raw.tier2) ? raw.tier2 : [],
    tier3: Array.isArray(raw.tier3) ? raw.tier3 : [],
  };
}

const priority = loadPriority();
const toolRecords = markdownFiles(TOOLS_DIR).map((path) => {
  const md = readMarkdown(path);
  const slug = parseSlug(md.frontmatter, path);
  const facts = parseFacts(md.frontmatter);
  const factEntries = Object.entries(facts).filter(([, fact]) => meaningfulValue(fact));
  return { path, slug, facts, factEntries };
});
const toolsBySlug = new Map(toolRecords.map((tool) => [tool.slug, tool]));

const factsMissingSource = [];
const factsMissingVerifiedAt = [];
const staleFacts = [];
const factAges = [];

for (const tool of toolRecords) {
  for (const [key, fact] of tool.factEntries) {
    const item = { slug: tool.slug, key, path: projectPath(tool.path) };
    if (!String(fact.source ?? '').trim()) factsMissingSource.push(item);
    if (!String(fact.verified_at ?? '').trim()) {
      factsMissingVerifiedAt.push(item);
      continue;
    }
    const age = daysSince(fact.verified_at);
    if (age === null) {
      factsMissingVerifiedAt.push({ ...item, verified_at: String(fact.verified_at) });
      continue;
    }
    factAges.push({ ...item, verified_at: String(fact.verified_at).slice(0, 10), age_days: age });
    if (age > STALE_THRESHOLD_DAYS) {
      staleFacts.push({ ...item, verified_at: String(fact.verified_at).slice(0, 10), age_days: age });
    }
  }
}

const ageByKey = {};
for (const key of [...new Set(factAges.map((fact) => fact.key))].sort()) {
  const items = factAges.filter((fact) => fact.key === key).sort((a, b) => b.age_days - a.age_days || a.slug.localeCompare(b.slug));
  ageByKey[key] = {
    count: items.length,
    max_days: items[0]?.age_days ?? null,
    avg_days: average(items.map((item) => item.age_days)),
    oldest: items.slice(0, 5),
  };
}

const result = {
  ok: true,
  mode: 'report',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  stale_threshold_days: STALE_THRESHOLD_DAYS,
  required_keys: REQUIRED_KEYS,
  argument_issues: [],
  totals: {
    tools: toolRecords.length,
    tools_with_facts: toolRecords.filter((tool) => tool.factEntries.length > 0).length,
    tools_missing_facts: toolRecords.filter((tool) => tool.factEntries.length === 0).length,
    facts: toolRecords.reduce((sum, tool) => sum + tool.factEntries.length, 0),
  },
  priority: {
    tier1: summarizeTier('tier1', priority.tier1, toolsBySlug),
    tier2: summarizeTier('tier2', priority.tier2, toolsBySlug),
    tier3: summarizeTier('tier3', priority.tier3, toolsBySlug),
  },
  quality: {
    facts_missing_source: factsMissingSource,
    facts_missing_verified_at: factsMissingVerifiedAt,
    stale_facts: staleFacts,
    stale_fact_age_by_key: ageByKey,
  },
};

if (JSON_MODE) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('AIpedia tool facts audit');
  console.log(`Tools: ${result.totals.tools}`);
  console.log(`Tools with facts: ${result.totals.tools_with_facts}`);
  console.log(`Tools missing facts: ${result.totals.tools_missing_facts}`);
  console.log(`Total fact entries: ${result.totals.facts}`);
  console.log('');
  console.log(`Tier 1: ${result.priority.tier1.present_required_fact_slots}/${result.priority.tier1.required_fact_slots} required facts (${result.priority.tier1.completeness_percent}%)`);
  console.log(`Tier 1 complete tools: ${result.priority.tier1.complete_tools}/${result.priority.tier1.total}`);
  if (result.priority.tier1.missing_pages.length) {
    console.log(`Tier 1 missing pages: ${result.priority.tier1.missing_pages.join(', ')}`);
  }
  console.log('');
  console.log('Tier 1 missing keys by tool:');
  for (const item of result.priority.tier1.missing_by_tool.slice(0, 25)) {
    console.log(`- ${item.slug}: ${item.missing_keys.join(', ')}`);
  }
  if (result.priority.tier1.missing_by_tool.length === 0) console.log('- none');
  console.log('');
  console.log('Fact quality:');
  console.log(`- Missing source: ${result.quality.facts_missing_source.length}`);
  console.log(`- Missing verified_at: ${result.quality.facts_missing_verified_at.length}`);
  console.log(`- Stale beyond ${STALE_THRESHOLD_DAYS} days: ${result.quality.stale_facts.length}`);
}
