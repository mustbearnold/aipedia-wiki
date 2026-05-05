#!/usr/bin/env node
// Report-only provenance and pricing audit for the canonical fact migration.
// Exits 0 by design: this makes debt visible before CI gates are ratcheted up.

import { dirname, join } from 'node:path';
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

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const TOOLS_DIR = join(PROJECT_DIR, 'src', 'content', 'tools');
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
const JSON_MODE = process.argv.includes('--json');
const HIGH_VOLATILITY_KEYS = new Set(['pricing_anchor', 'free_plan', 'best_paid_tier', 'flagship_model', 'context_window']);

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
    if ((volatility === 'high' || HIGH_VOLATILITY_KEYS.has(key)) && !String(fact.next_review_at ?? '').trim()) {
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
