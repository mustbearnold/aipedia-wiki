#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { buildEvidenceBundle } from './agent-evidence-bundle.mjs';
import { buildImpactReport } from './agent-parent-impact.mjs';
import { scorePage } from './agent-page-quality-score.mjs';
import {
  DEFAULT_PROJECT_DIR,
  daysOld,
  hasFlag,
  projectPath,
  valueFor,
  valuesFor,
} from './lib/agent-workflow-utils.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const currentDate = valueFor(args, '--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const outPath = valueFor(args, '--out');
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
    '  node scripts/agent-score-calibration.mjs --route /tools/cursor/ --route /compare/gemini-vs-grok/ --json',
    '  node scripts/agent-score-calibration.mjs --routes-file local/tmp/routes.txt --current-date 2026-06-29 --out local/tmp/calibration.json',
    '',
    'Compares read-only quality scores with ledger age, source coverage, stale signals, and impact breadth.',
  ].join('\n');
}

export function calibrateScores(projectDir, options = {}) {
  const currentDate = options.currentDate || new Date().toISOString().slice(0, 10);
  const routes = options.routes?.length ? options.routes : defaultRoutes();
  const results = [];

  for (const route of routes) {
    const evidence = buildEvidenceBundle(projectDir, { route, currentDate });
    const impact = buildImpactReport(projectDir, { route });
    const score = scorePage(projectDir, { route, currentDate });
    if (!evidence.ok || !impact.ok || !score.ok) {
      results.push({
        route,
        ok: false,
        errors: {
          evidence: evidence.ok ? '' : evidence.error,
          impact: impact.ok ? '' : impact.error,
          score: score.ok ? '' : score.error,
        },
      });
      continue;
    }

    const ledgerAge = daysOld(evidence.target.ledger?.last_updated, currentDate);
    const registeredSourceCount = evidence.source_evidence.source_ids.length;
    const inlineSourceCount = evidence.source_evidence.inline_source_count || 0;
    const sourceCount = evidence.source_evidence.total_sources ?? (registeredSourceCount + inlineSourceCount);
    const staleCount = evidence.stale_sections.length;
    const parentSurfaceCount = impact.surfaces.length;
    const label = calibrationLabel({ score, ledgerAge, sourceCount, staleCount, parentSurfaceCount });

    results.push({
      route: evidence.target.route,
      ok: true,
      collection: evidence.target.collection,
      ledger_last_updated: evidence.target.ledger?.last_updated ?? '',
      ledger_age_days: Number.isFinite(ledgerAge) ? ledgerAge : null,
      score: score.score,
      recommended_action: score.recommended_action,
      source_count: sourceCount,
      registered_source_count: registeredSourceCount,
      inline_source_count: inlineSourceCount,
      stale_signal_count: staleCount,
      parent_surface_count: parentSurfaceCount,
      dimensions: score.dimensions,
      calibration_label: label,
      calibration_notes: calibrationNotes({
        score,
        ledgerAge,
        sourceCount,
        registeredSourceCount,
        inlineSourceCount,
        staleCount,
        parentSurfaceCount,
      }),
    });
  }

  return {
    ok: results.every((result) => result.ok),
    schema_version: 'aipedia.score-calibration.v1',
    generated_at: new Date().toISOString(),
    current_date: currentDate,
    routes: results,
    summary: summarize(results),
  };
}

function calibrationLabel({ score, ledgerAge, sourceCount, staleCount, parentSurfaceCount }) {
  if (staleCount > 0 || score.dimensions.update_urgency >= 0.75) return 'refresh_pressure';
  if (sourceCount === 0 || score.dimensions.source_quality < 0.45) return 'source_coverage_gap';
  if (score.dimensions.internal_links < 0.5) return 'internal_link_gap';
  if (parentSurfaceCount > 50) return 'broad_parent_impact';
  if (ledgerAge <= 7 && score.recommended_action === 'monitor') return 'recent_monitor_baseline';
  return 'review_calibration';
}

function calibrationNotes({
  score,
  ledgerAge,
  sourceCount,
  registeredSourceCount = sourceCount,
  inlineSourceCount = 0,
  staleCount,
  parentSurfaceCount,
}) {
  const notes = [];
  if (ledgerAge !== Infinity) notes.push(`ledger age ${ledgerAge} day(s)`);
  if (sourceCount === 0) notes.push('no source coverage found');
  if (registeredSourceCount === 0 && inlineSourceCount > 0) notes.push(`${inlineSourceCount} inline source(s), 0 registered source IDs`);
  if (staleCount > 0) notes.push(`${staleCount} stale signal(s)`);
  if (score.dimensions.source_quality < 0.45) notes.push('source_quality below 0.45');
  if (score.dimensions.internal_links < 0.5) notes.push('internal_links below 0.5');
  if (parentSurfaceCount > 50) notes.push('broad parent impact surface');
  return notes;
}

function summarize(results) {
  const okResults = results.filter((result) => result.ok);
  const actions = countBy(okResults, 'recommended_action');
  const labels = countBy(okResults, 'calibration_label');
  const averageScore = okResults.length
    ? okResults.reduce((sum, result) => sum + result.score, 0) / okResults.length
    : 0;
  return {
    route_count: results.length,
    ok_count: okResults.length,
    error_count: results.length - okResults.length,
    average_score: Math.round(averageScore * 100) / 100,
    actions,
    labels,
  };
}

function countBy(items, key) {
  const counts = {};
  for (const item of items) counts[item[key]] = (counts[item[key]] ?? 0) + 1;
  return counts;
}

function defaultRoutes() {
  return ['/tools/cursor/', '/compare/gemini-vs-grok/', '/answers/best-ai-for-writing-2026/'];
}

function routesFromFile(path) {
  if (!path) return [];
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

function writeJson(projectDir, outPath, report) {
  const absoluteOut = resolve(projectDir, outPath);
  mkdirSync(dirname(absoluteOut), { recursive: true });
  writeFileSync(absoluteOut, `${JSON.stringify(report, null, 2)}\n`);
  return projectPath(projectDir, absoluteOut);
}

if (isCli) {
  const routes = [
    ...valuesFor(args, '--route'),
    ...routesFromFile(valueFor(args, '--routes-file')),
  ];
  const report = calibrateScores(projectDir, { routes, currentDate });
  if (outPath) report.out = writeJson(projectDir, outPath, report);

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-score-calibration] ${report.summary.error_count} route(s) failed`);
    process.exitCode = 1;
  } else {
    console.log(`Calibrated ${report.summary.ok_count} route(s). Average score: ${report.summary.average_score}`);
  }
}
