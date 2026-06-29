#!/usr/bin/env node

import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildEvidenceBundle } from './agent-evidence-bundle.mjs';
import { buildImpactReport } from './agent-parent-impact.mjs';
import { scorePage } from './agent-page-quality-score.mjs';
import { buildSparseVector } from './lib/agent-cpu-vector.mjs';
import {
  DEFAULT_PROJECT_DIR,
  hasFlag,
  normalizeRoute,
  projectPath,
  valueFor,
  valuesFor,
} from './lib/agent-workflow-utils.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const currentDate = valueFor(args, '--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const outPath = valueFor(args, '--out') || 'local/tmp/agent-memory.jsonl';
const appendMode = hasFlag(args, '--append');
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
    '  node scripts/agent-memory-record.mjs --route /tools/cursor/ --current-date 2026-06-29 --json',
    '  node scripts/agent-memory-record.mjs --route /tools/cursor/ --out .agent/memory/agent-memory.jsonl --append',
    '',
    'Builds durable JSONL-ready memory records from evidence, impact, and score signals.',
  ].join('\n');
}

export function buildMemoryRecords(projectDir, options = {}) {
  const currentDate = options.currentDate || new Date().toISOString().slice(0, 10);
  const targets = [
    ...(options.routes ?? []).map((route) => ({ route: normalizeRoute(route) })),
    ...(options.paths ?? []).map((path) => ({ path })),
  ];

  if (!targets.length) {
    return { ok: false, error: 'at least one --route or --path is required', records: [] };
  }

  const records = [];
  const errors = [];

  for (const target of targets) {
    const evidence = buildEvidenceBundle(projectDir, { ...target, currentDate });
    const impact = buildImpactReport(projectDir, target);
    const score = scorePage(projectDir, { ...target, currentDate });
    if (!evidence.ok || !impact.ok || !score.ok) {
      errors.push({
        target,
        evidence_error: evidence.ok ? '' : evidence.error,
        impact_error: impact.ok ? '' : impact.error,
        score_error: score.ok ? '' : score.error,
      });
      continue;
    }

    const route = evidence.target.route;
    const routeKey = keyForRoute(route);
    const embeddingText = [
      evidence.target.title,
      evidence.target.category,
      evidence.target.route,
      score.recommended_action,
      ...evidence.current_page_claims.map((fact) => `${fact.key}: ${fact.value} ${fact.source_label}`),
      ...evidence.recommended_updates,
      ...impact.surfaces.slice(0, 20).map((surface) => `${surface.route}: ${surface.reason}`),
    ].join('\n');

    const sourceCount = evidence.source_evidence.total_sources
      ?? evidence.source_evidence.source_ids.length
      + (evidence.source_evidence.inline_source_count ?? 0);

    records.push({
      schema_version: 'aipedia.memory-record.v1',
      id: `page_snapshot:${routeKey}:${currentDate}`,
      type: 'page_snapshot',
      observed_at: currentDate,
      route,
      path: evidence.target.path,
      collection: evidence.target.collection,
      title: evidence.target.title,
      category: evidence.target.category,
      last_verified: evidence.target.last_verified,
      score: score.score,
      recommended_action: score.recommended_action,
      source_count: sourceCount,
      stale_signal_count: evidence.stale_sections.length,
      parent_surface_count: impact.surfaces.length,
      affiliate_state: evidence.affiliate_notes.state,
      embedding_text: compactText(embeddingText),
      cpu_vector: buildSparseVector(embeddingText),
    });

    records.push({
      schema_version: 'aipedia.memory-record.v1',
      id: `quality_note:${routeKey}:${currentDate}`,
      type: 'quality_note',
      observed_at: currentDate,
      route,
      path: evidence.target.path,
      score: score.score,
      dimensions: score.dimensions,
      recommended_action: score.recommended_action,
      stale_signals: evidence.stale_sections,
      recommended_updates: evidence.recommended_updates,
      cpu_vector: buildSparseVector(`${route} ${score.recommended_action} ${JSON.stringify(score.dimensions)} ${evidence.recommended_updates.join(' ')}`),
    });

    records.push({
      schema_version: 'aipedia.memory-record.v1',
      id: `impact_summary:${routeKey}:${currentDate}`,
      type: 'impact_summary',
      observed_at: currentDate,
      route,
      path: evidence.target.path,
      surfaces: impact.surfaces.slice(0, 50),
      shared_files: impact.shared_files,
      recommended_checks: impact.recommended_checks,
      cpu_vector: buildSparseVector(`${route} ${impact.surfaces.map((surface) => `${surface.route} ${surface.reason}`).join(' ')}`),
    });

    for (const source of evidence.source_evidence.registered_sources) {
      records.push({
        schema_version: 'aipedia.memory-record.v1',
        id: `source_record:${source.id}:${routeKey}:${currentDate}`,
        type: 'source_record',
        observed_at: currentDate,
        route,
        path: evidence.target.path,
        source,
        cpu_vector: buildSparseVector(`${route} ${source.id} ${source.label} ${source.type} ${source.trust_tier} ${source.volatility}`),
      });
    }
  }

  return {
    ok: errors.length === 0,
    current_date: currentDate,
    generated_at: new Date().toISOString(),
    records,
    errors,
    summary: {
      target_count: targets.length,
      record_count: records.length,
      error_count: errors.length,
      types: summarizeTypes(records),
    },
  };
}

export function writeMemoryRecords(projectDir, records, outPath, options = {}) {
  const absoluteOut = resolve(projectDir, outPath);
  mkdirSync(dirname(absoluteOut), { recursive: true });
  const jsonl = records.map((record) => JSON.stringify(record)).join('\n');
  if (options.append) {
    appendFileSync(absoluteOut, jsonl ? `${jsonl}\n` : '');
  } else {
    writeFileSync(absoluteOut, jsonl ? `${jsonl}\n` : '');
  }
  return projectPath(projectDir, absoluteOut);
}

function summarizeTypes(records) {
  const types = {};
  for (const record of records) types[record.type] = (types[record.type] ?? 0) + 1;
  return types;
}

function keyForRoute(route) {
  return normalizeRoute(route).replace(/^\/|\/$/g, '').replaceAll('/', ':') || 'home';
}

function compactText(text) {
  return String(text).replace(/\s+/g, ' ').trim().slice(0, 4000);
}

if (isCli) {
  const routes = valuesFor(args, '--route');
  const paths = valuesFor(args, '--path');
  const report = buildMemoryRecords(projectDir, { routes, paths, currentDate });
  if (report.ok) {
    report.out = writeMemoryRecords(projectDir, report.records, outPath, { append: appendMode });
  }

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-memory] ${report.error || `${report.errors.length} target(s) failed`}`);
    process.exitCode = 1;
  } else {
    console.log(`Wrote ${report.records.length} memory record(s) to ${report.out}`);
  }
}
