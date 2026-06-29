#!/usr/bin/env node

import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  DEFAULT_PROJECT_DIR,
  collectInternalLinks,
  collectSourceIds,
  daysOld,
  fileExists,
  hasFlag,
  isoDate,
  loadSourceRegistry,
  normalizeRoute,
  pathToRoute,
  projectPath,
  readMarkdownFile,
  resolveTarget,
  unique,
  valueFor,
} from './lib/agent-workflow-utils.mjs';
import { buildImpactReport } from './agent-parent-impact.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const currentDate = valueFor(args, '--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const jsonMode = hasFlag(args, '--json');
const helpMode = hasFlag(args, '--help') || hasFlag(args, '-h');
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli && helpMode) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-evidence-bundle.mjs --route /tools/cursor/ --json',
    '  node scripts/agent-evidence-bundle.mjs --path src/content/tools/cursor.md --current-date 2026-06-29',
    '',
    'Builds a read-only compact evidence bundle from page frontmatter, source registry, ledger, links, and parent-impact signals.',
  ].join('\n');
}

export function buildEvidenceBundle(projectDir, options = {}) {
  const target = resolveTarget(projectDir, options);
  if (!target || !target.path || !fileExists(projectDir, target.path)) {
    return { ok: false, error: 'target route or path could not be resolved', project_dir: projectDir };
  }

  const markdown = readMarkdownFile(projectDir, target.path);
  const route = target.route || pathToRoute(target.path, markdown.frontmatter);
  const sourceRegistry = loadSourceRegistry(projectDir);
  const sourceIds = [...collectSourceIds(markdown.frontmatter)].sort();
  const sourceRows = sourceIds.map((id) => sourceRegistry.get(id)).filter(Boolean);
  const missingSourceIds = sourceIds.filter((id) => !sourceRegistry.has(id));
  const inlineSources = extractInlineSources(markdown.frontmatter, markdown.body);
  const facts = extractFacts(markdown.frontmatter);
  const pricingFacts = facts.filter((fact) => /pricing|price|paid|tier|free|plan/i.test(fact.key));
  const internalLinks = collectInternalLinks(markdown.body);
  const impact = buildImpactReport(projectDir, { route, path: target.path });
  const staleSections = staleSignals({
    facts,
    sourceRows,
    frontmatter: markdown.frontmatter,
    ledgerRow: target.ledger_row,
    currentDate: options.currentDate,
  });

  return {
    ok: true,
    project_dir: projectDir,
    generated_at: new Date().toISOString(),
    current_date: options.currentDate,
    target: {
      route: normalizeRoute(route),
      path: projectPath(projectDir, target.path),
      collection: target.collection,
      type: target.type,
      slug: markdown.frontmatter.slug ?? route.split('/').filter(Boolean).at(-1) ?? '',
      title: markdown.frontmatter.title ?? '',
      category: markdown.frontmatter.category ?? '',
      last_updated: isoDate(markdown.frontmatter.last_updated),
      last_verified: isoDate(markdown.frontmatter.last_verified),
      ledger: target.ledger_row,
    },
    current_page_claims: facts,
    official_facts: facts.filter((fact) => {
      const source = fact.source_id ? sourceRegistry.get(fact.source_id) : null;
      return source?.trust_tier === 'primary' || source?.type === 'official' || source?.type === 'docs';
    }),
    pricing_facts: pricingFacts,
    source_evidence: {
      source_ids: sourceIds,
      missing_source_ids: missingSourceIds,
      inline_sources: inlineSources,
      inline_source_count: inlineSources.length,
      total_sources: sourceIds.length + inlineSources.length,
      registered_sources: sourceRows.map((source) => ({
        id: source.id,
        label: source.label ?? '',
        url: source.url ?? '',
        type: source.type ?? '',
        trust_tier: source.trust_tier ?? '',
        volatility: source.volatility ?? '',
        last_checked: source.last_checked ?? '',
      })),
      summary: summarizeSources(sourceRows),
    },
    affiliate_notes: affiliateNotes(markdown.frontmatter),
    internal_link_suggestions: {
      outgoing_links: internalLinks,
      parent_surfaces: impact.ok ? impact.surfaces.slice(0, 20) : [],
      shared_files: impact.ok ? impact.shared_files : [],
    },
    stale_sections: staleSections,
    recommended_updates: recommendUpdates(staleSections, missingSourceIds, markdown.frontmatter, target.collection),
    risk_notes: [
      'This bundle is read-only and does not perform live web verification.',
      'Treat old source registry dates and stale next_review_at values as prompts for current-source checks.',
    ],
  };
}

function extractFacts(frontmatter) {
  const facts = [];
  for (const [key, fact] of Object.entries(frontmatter.facts ?? {})) {
    if (!fact || typeof fact !== 'object') continue;
    facts.push({
      key,
      value: fact.value ?? '',
      source_id: fact.source_id ?? '',
      source_label: fact.source_label ?? '',
      verified_at: isoDate(fact.verified_at),
      confidence: fact.confidence ?? '',
      volatility: fact.volatility ?? '',
      next_review_at: isoDate(fact.next_review_at),
      status: fact.status ?? '',
    });
  }
  for (const item of frontmatter.price_history ?? []) {
    facts.push({
      key: `price_history:${item.plan ?? 'price'}`,
      value: item.price ?? '',
      source_id: item.source_id ?? '',
      source_label: item.source_label ?? item.source ?? '',
      verified_at: isoDate(item.verified_at ?? item.date),
      confidence: '',
      volatility: 'high',
      next_review_at: '',
      status: '',
      historical: true,
    });
  }
  return facts;
}

function extractInlineSources(frontmatter, body = '') {
  const frontmatterSources = Array.isArray(frontmatter.sources) ? frontmatter.sources : [];
  const sources = frontmatterSources
    .filter((source) => source && typeof source === 'object' && typeof source.url === 'string' && source.url)
    .map((source) => ({
      url: source.url,
      title: source.title ?? '',
    }));
  for (const source of extractSourcesSectionLinks(body)) sources.push(source);
  const seen = new Set();
  return sources.filter((source) => {
    if (!source.url || seen.has(source.url)) return false;
    seen.add(source.url);
    return true;
  });
}

function extractSourcesSectionLinks(body) {
  const lines = body.split(/\r?\n/);
  const start = lines.findIndex((line) => /^##\s+Sources\b/.test(line.trim()));
  if (start < 0) return [];
  const sectionLines = [];
  for (const line of lines.slice(start + 1)) {
    if (/^##\s+/.test(line.trim())) break;
    sectionLines.push(line);
  }
  const section = sectionLines.join('\n');
  const links = [];
  const re = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let linkMatch;
  while ((linkMatch = re.exec(section))) {
    links.push({
      title: linkMatch[1].trim(),
      url: linkMatch[2].trim(),
    });
  }
  return links;
}

function summarizeSources(sources) {
  const byTrustTier = {};
  const byType = {};
  const byVolatility = {};
  for (const source of sources) {
    byTrustTier[source.trust_tier || 'unknown'] = (byTrustTier[source.trust_tier || 'unknown'] ?? 0) + 1;
    byType[source.type || 'unknown'] = (byType[source.type || 'unknown'] ?? 0) + 1;
    byVolatility[source.volatility || 'unknown'] = (byVolatility[source.volatility || 'unknown'] ?? 0) + 1;
  }
  return {
    total: sources.length,
    by_trust_tier: byTrustTier,
    by_type: byType,
    by_volatility: byVolatility,
  };
}

function affiliateNotes(frontmatter) {
  const affiliate = frontmatter.affiliate ?? null;
  if (!affiliate) return { state: 'none', has_program: false, application_status: 'none' };
  const hasLink = typeof affiliate.link === 'string' && affiliate.link.length > 0;
  return {
    state: hasLink && affiliate.application_status === 'approved' ? 'live_affiliate' : hasLink ? 'configured_not_live' : 'none',
    has_program: Boolean(affiliate.has_program),
    application_status: affiliate.application_status ?? 'none',
    network: affiliate.network ?? '',
    has_link: hasLink,
  };
}

function staleSignals({ facts, sourceRows, frontmatter, ledgerRow, currentDate }) {
  const signals = [];
  const pageAge = daysOld(frontmatter.last_verified, currentDate);
  if (pageAge > 30) {
    signals.push({ code: 'page-verification-aging', severity: 'medium', detail: `last_verified is ${pageAge} days old` });
  }
  if (ledgerRow?.last_updated && frontmatter.last_updated && isoDate(ledgerRow.last_updated) < isoDate(frontmatter.last_updated)) {
    signals.push({ code: 'ledger-lags-frontmatter', severity: 'high', detail: 'ledger date is older than page last_updated' });
  }
  for (const fact of facts) {
    if (fact.historical) continue;
    if (fact.volatility === 'high' && !fact.next_review_at) {
      signals.push({ code: 'high-volatility-missing-review', severity: 'high', detail: `${fact.key} is high volatility without next_review_at` });
    }
    if (fact.next_review_at && isoDate(fact.next_review_at) < isoDate(currentDate)) {
      signals.push({ code: 'fact-review-due', severity: 'high', detail: `${fact.key} next_review_at ${fact.next_review_at} has passed` });
    }
  }
  for (const source of sourceRows) {
    if (source.volatility === 'high' && daysOld(source.last_checked, currentDate) > 14) {
      signals.push({ code: 'source-check-aging', severity: 'medium', detail: `${source.id} high-volatility source checked ${source.last_checked}` });
    }
  }
  return signals;
}

function recommendUpdates(staleSections, missingSourceIds, frontmatter, collection) {
  const updates = [];
  if (missingSourceIds.length) updates.push('Register or replace missing source IDs before publishing edits.');
  if (staleSections.some((signal) => signal.code === 'fact-review-due')) updates.push('Re-verify due high-volatility facts from current official sources.');
  if (staleSections.some((signal) => signal.code === 'high-volatility-missing-review')) updates.push('Add next_review_at or a lower volatility label to current high-volatility facts.');
  if (staleSections.some((signal) => signal.code === 'source-check-aging')) updates.push('Run a scoped source-health check for high-volatility sources.');
  if (collection === 'tools' && !frontmatter.facts?.pricing_anchor) updates.push('Add or verify pricing_anchor fact before tool-page closeout.');
  if (!updates.length) updates.push('No deterministic stale signal found; use current-source verification before factual edits.');
  return unique(updates);
}

if (isCli) {
  const report = buildEvidenceBundle(projectDir, {
    route: valueFor(args, '--route'),
    path: valueFor(args, '--path'),
    slug: valueFor(args, '--slug'),
    type: valueFor(args, '--type'),
    currentDate,
  });

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-evidence] ${report.error}`);
    process.exitCode = 1;
  } else {
    console.log(`Evidence bundle for ${report.target.route}`);
    console.log(`Sources: ${report.source_evidence.source_ids.length}`);
    console.log(`Facts: ${report.current_page_claims.length}`);
    console.log(`Stale signals: ${report.stale_sections.length}`);
  }
}
