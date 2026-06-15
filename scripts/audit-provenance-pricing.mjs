#!/usr/bin/env node
// Report-only provenance and pricing audit for the canonical fact migration.
// Exits 0 by design: this makes debt visible before CI gates are ratcheted up.

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  loadSourceRegistry,
  markdownFiles,
  meaningfulValue,
  parseNestedMap,
  parsePriceHistory,
  parseSlug,
  projectPath,
  readMarkdown,
} from './lib/fact-normalize.mjs';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();
const HIGH_VOLATILITY_KEYS = new Set(['pricing_anchor', 'free_plan', 'best_paid_tier', 'flagship_model', 'context_window']);

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
    '  node scripts/audit-provenance-pricing.mjs --json',
    '  node scripts/audit-provenance-pricing.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured provenance/pricing report.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emptyReport(ok, mode) {
  return {
    ok,
    mode,
    generated_at: new Date().toISOString(),
    project_dir: PROJECT_DIR,
    argument_issues: ok ? [] : argumentIssues,
    registry: {
      path: projectPath(PROJECT_DIR, SOURCE_REGISTRY_PATH),
      total_sources: 0,
      duplicate_ids: [],
      type_counts: {},
      trust_tier_counts: {},
      volatility_counts: {},
    },
    totals: {
      tools_scanned: 0,
      fact_records: 0,
      price_history_records: 0,
    },
    provenance: {
      facts_missing_source_id: [],
      facts_with_source_but_no_source_id: [],
      unknown_source_ids: [],
      facts_missing_confidence: [],
      high_volatility_missing_next_review: [],
    },
    pricing: {
      price_history_missing_source: [],
      price_history_unknown_source_ids: [],
    },
  };
}

function emitArgumentFailure() {
  const report = emptyReport(false, 'argument-error');
  if (JSON_MODE) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.error('[audit-provenance-pricing] invalid arguments');
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

const registry = loadSourceRegistry(SOURCE_REGISTRY_PATH);
const sourceIds = new Set(registry.sources.map((source) => source.id));
const registryDuplicateIds = registry.sources
  .map((source) => source.id)
  .filter((id, index, ids) => ids.indexOf(id) !== index);

const tools = markdownFiles(TOOLS_DIR).map((path) => {
  const md = readMarkdown(path);
  return {
    path,
    relpath: projectPath(PROJECT_DIR, path),
    slug: parseSlug(md.frontmatter, path),
    facts: parseNestedMap(md.frontmatter, 'facts'),
    priceHistory: parsePriceHistory(md.frontmatter),
  };
});

const factsMissingSourceId = [];
const factsWithSourceButNoSourceId = [];
const unknownSourceIds = [];
const highVolatilityMissingNextReview = [];
const factsMissingConfidence = [];
const priceHistoryMissingSource = [];
const priceHistoryUnknownSourceIds = [];

for (const tool of tools) {
  for (const [key, fact] of Object.entries(tool.facts)) {
    if (!meaningfulValue(fact)) continue;
    const item = { slug: tool.slug, key, path: tool.relpath };
    const sourceId = String(fact.source_id ?? '').trim();
    const source = String(fact.source ?? '').trim();
    const volatility = String(fact.volatility ?? '').trim();

    if (!sourceId) factsMissingSourceId.push(item);
    if (source && !sourceId) factsWithSourceButNoSourceId.push({ ...item, source });
    if (sourceId && !sourceIds.has(sourceId)) unknownSourceIds.push({ ...item, source_id: sourceId });
    if (!String(fact.confidence ?? '').trim()) factsMissingConfidence.push(item);
    const needsScheduledReview = volatility === 'high' || (!volatility && HIGH_VOLATILITY_KEYS.has(key));
    if (needsScheduledReview && !String(fact.next_review_at ?? '').trim()) {
      highVolatilityMissingNextReview.push({ ...item, volatility: volatility || 'inferred-high' });
    }
  }

  tool.priceHistory.forEach((price, index) => {
    const item = { slug: tool.slug, index, path: tool.relpath, plan: String(price.plan ?? '').trim() };
    const sourceId = String(price.source_id ?? '').trim();
    const source = String(price.source ?? '').trim();
    if (!sourceId && !source) priceHistoryMissingSource.push(item);
    if (sourceId && !sourceIds.has(sourceId)) priceHistoryUnknownSourceIds.push({ ...item, source_id: sourceId });
  });
}

const result = {
  ok: true,
  mode: 'report-only',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  argument_issues: [],
  registry: {
    path: projectPath(PROJECT_DIR, SOURCE_REGISTRY_PATH),
    total_sources: registry.sources.length,
    duplicate_ids: [...new Set(registryDuplicateIds)],
    type_counts: countBy(registry.sources, (source) => source.type ?? 'unknown'),
    trust_tier_counts: countBy(registry.sources, (source) => source.trust_tier ?? 'unknown'),
    volatility_counts: countBy(registry.sources, (source) => source.volatility ?? 'unknown'),
  },
  totals: {
    tools_scanned: tools.length,
    fact_records: tools.reduce((sum, tool) => sum + Object.values(tool.facts).filter((fact) => meaningfulValue(fact)).length, 0),
    price_history_records: tools.reduce((sum, tool) => sum + tool.priceHistory.length, 0),
  },
  provenance: {
    facts_missing_source_id: factsMissingSourceId,
    facts_with_source_but_no_source_id: factsWithSourceButNoSourceId,
    unknown_source_ids: unknownSourceIds,
    facts_missing_confidence: factsMissingConfidence,
    high_volatility_missing_next_review: highVolatilityMissingNextReview,
  },
  pricing: {
    price_history_missing_source: priceHistoryMissingSource,
    price_history_unknown_source_ids: priceHistoryUnknownSourceIds,
  },
};

if (JSON_MODE) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(`[audit-provenance-pricing] report-only: ${result.registry.total_sources} registered sources; ${result.totals.fact_records} fact records; ${result.provenance.facts_missing_source_id.length} facts missing source_id; ${result.pricing.price_history_missing_source.length} price history rows missing source.`);
}

process.exit(0);

function countBy(items, keyFn) {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
}
