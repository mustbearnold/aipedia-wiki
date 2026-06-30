#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
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
const goldSetPath = valueFor(args, '--gold-set');
const goldSetReviewPath = valueFor(args, '--gold-set-review');
const requireGoldSetReview = hasFlag(args, '--require-gold-set-review');
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
    '  node scripts/agent-score-calibration.mjs --gold-set .agent/evals/score-calibration-goldset.json --json',
    '  node scripts/agent-score-calibration.mjs --gold-set .agent/evals/score-calibration-goldset.json --require-gold-set-review --gold-set-review .agent/evals/score-goldset-change-reviews/<review>.json --json',
    '',
    'Compares read-only quality scores with ledger age, source coverage, stale signals, and impact breadth.',
  ].join('\n');
}

export function calibrateScores(projectDir, options = {}) {
  const currentDate = options.currentDate || new Date().toISOString().slice(0, 10);
  const goldSet = normalizeGoldSet(options.goldSet);
  const goldSetGovernance = evaluateGoldSetGovernance(goldSet, options.goldSetReview, {
    requireReview: options.requireGoldSetReview,
  });
  const routes = options.routes?.length
    ? options.routes
    : goldSet?.cases.length
      ? goldSet.cases.map((goldCase) => goldCase.route)
      : defaultRoutes();
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
      scoring_model: score.scoring_model,
      stale_decay: score.stale_decay,
      risk_profile: score.risk_profile,
      confidence_profile: score.confidence_profile,
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

  const goldSetReport = evaluateGoldSet(goldSet, results);
  const thresholdReview = thresholdReviewFor(results, goldSetReport);
  return {
    ok: results.every((result) => result.ok)
      && (goldSetReport ? goldSetReport.ok : true)
      && (goldSetGovernance ? goldSetGovernance.ok : true)
      && thresholdReview.status === 'pass',
    schema_version: 'aipedia.score-calibration.v1',
    generated_at: new Date().toISOString(),
    current_date: currentDate,
    routes: results,
    gold_set: goldSetReport,
    gold_set_governance: goldSetGovernance,
    threshold_review: thresholdReview,
    summary: summarize(results),
  };
}

function calibrationLabel({ score, ledgerAge, sourceCount, staleCount, parentSurfaceCount }) {
  if (staleCount > 0 || score.dimensions.update_urgency >= 0.75) return 'refresh_pressure';
  if (sourceCount === 0 || score.dimensions.source_quality < 0.45) return 'source_coverage_gap';
  if (score.stale_decay?.label === 'high') return 'stale_score_decay';
  if (score.risk_profile?.label === 'high' || score.confidence_profile?.label === 'low') return 'risk_confidence_review';
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
  if (score.stale_decay?.label && score.stale_decay.label !== 'fresh') {
    notes.push(`${score.stale_decay.label} stale decay, ${score.stale_decay.score_penalty} score penalty`);
  }
  if (score.risk_profile?.label) notes.push(`${score.risk_profile.label} risk`);
  if (score.confidence_profile?.label) notes.push(`${score.confidence_profile.label} confidence`);
  if (score.dimensions.source_quality < 0.45) notes.push('source_quality below 0.45');
  if (score.dimensions.internal_links < 0.5) notes.push('internal_links below 0.5');
  if (parentSurfaceCount > 50) notes.push('broad parent impact surface');
  return notes;
}

function summarize(results) {
  const okResults = results.filter((result) => result.ok);
  const actions = countBy(okResults, 'recommended_action');
  const labels = countBy(okResults, 'calibration_label');
  const riskLabels = countNestedBy(okResults, 'risk_profile', 'label');
  const confidenceLabels = countNestedBy(okResults, 'confidence_profile', 'label');
  const staleDecayLabels = countNestedBy(okResults, 'stale_decay', 'label');
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
    risk_labels: riskLabels,
    confidence_labels: confidenceLabels,
    stale_decay_labels: staleDecayLabels,
  };
}

function normalizeGoldSet(goldSet) {
  if (!goldSet) return null;
  const cases = Array.isArray(goldSet.cases) ? goldSet.cases : [];
  return {
    schema_version: goldSet.schema_version || 'aipedia.score-goldset.v1',
    name: goldSet.name || '',
    description: goldSet.description || '',
    path: goldSet.path || '',
    cases: cases
      .filter((goldCase) => goldCase?.route)
      .map((goldCase) => ({
        id: goldCase.id || goldCase.route,
        route: goldCase.route,
        rationale: goldCase.rationale || '',
        expect: goldCase.expect || goldCase.expected || {},
      })),
  };
}

function evaluateGoldSet(goldSet, results) {
  if (!goldSet) return null;
  const byRoute = new Map(results.map((result) => [result.route, result]));
  const cases = goldSet.cases.map((goldCase) => evaluateGoldCase(goldCase, byRoute.get(goldCase.route)));
  const mismatchCount = cases.filter((goldCase) => !goldCase.ok).length;
  return {
    ok: mismatchCount === 0,
    schema_version: goldSet.schema_version,
    name: goldSet.name,
    description: goldSet.description,
    path: goldSet.path,
    case_count: cases.length,
    ok_count: cases.length - mismatchCount,
    mismatch_count: mismatchCount,
    cases,
  };
}

const REQUIRED_GOLD_EXPECTATIONS = [
  'recommended_action',
  'calibration_label',
  'risk_label',
  'confidence_label',
  'stale_decay_label',
];
const GOLD_BOUND_FIELDS = [
  'score_min',
  'score_max',
  'source_count_min',
  'source_count_max',
  'source_quality_min',
  'source_quality_max',
  'buyer_intent_min',
  'buyer_intent_max',
  'parent_surface_count_min',
  'stale_signal_count_min',
  'stale_signal_count_max',
  'internal_links_min',
  'internal_links_max',
];
const REQUIRED_REVIEW_LENSES = [
  'architecture',
  'evaluation',
  'editorial',
  'risk-confidence',
  'regression',
  'rollout',
];

function evaluateGoldSetGovernance(goldSet, review, options = {}) {
  if (!goldSet) return null;
  const issues = [];
  const caseIds = new Set();
  const routes = new Set();
  for (const goldCase of goldSet.cases) {
    if (caseIds.has(goldCase.id)) issues.push(governanceIssue('duplicate-case-id', `Duplicate gold-set case id ${goldCase.id}.`));
    caseIds.add(goldCase.id);
    if (routes.has(goldCase.route)) issues.push(governanceIssue('duplicate-route', `Duplicate gold-set route ${goldCase.route}.`));
    routes.add(goldCase.route);
    if (!goldCase.rationale.trim()) issues.push(governanceIssue('case-rationale-missing', `${goldCase.id} must include a rationale.`));
    const expect = goldCase.expect || {};
    for (const field of REQUIRED_GOLD_EXPECTATIONS) {
      if (expect[field] == null || expect[field] === '') {
        issues.push(governanceIssue('case-expectation-missing', `${goldCase.id} must include expect.${field}.`));
      }
    }
    if (!GOLD_BOUND_FIELDS.some((field) => expect[field] != null && expect[field] !== '')) {
      issues.push(governanceIssue('case-bound-missing', `${goldCase.id} must include at least one numeric bound expectation.`));
    }
  }

  const goldSetHash = hashGoldSet(goldSet);
  const normalizedReview = normalizeGoldSetReview(review);
  if (options.requireReview && !normalizedReview) {
    issues.push(governanceIssue('review-missing', 'A gold-set review record is required when --require-gold-set-review is used.'));
  }
  if (normalizedReview) validateGoldSetReview(normalizedReview, goldSet, goldSetHash, caseIds, issues);

  return {
    ok: issues.length === 0,
    status: issues.length ? 'review' : 'pass',
    gold_set_hash: goldSetHash,
    required_review: options.requireReview === true,
    review_schema_version: 'aipedia.score-goldset-review.v1',
    required_review_lenses: REQUIRED_REVIEW_LENSES,
    review: normalizedReview,
    issues,
    change_policy: {
      deliberate_changes_require_review: true,
      review_must_match_hash: true,
      review_must_name_changed_cases: true,
    },
  };
}

function validateGoldSetReview(review, goldSet, goldSetHash, caseIds, issues) {
  if (review.schema_version !== 'aipedia.score-goldset-review.v1') {
    issues.push(governanceIssue('review-schema-invalid', 'Gold-set review schema_version must be aipedia.score-goldset-review.v1.'));
  }
  if (goldSet.path && review.gold_set_path !== goldSet.path) {
    issues.push(governanceIssue('review-path-mismatch', `Gold-set review path must be ${goldSet.path}.`));
  }
  if (review.gold_set_hash !== goldSetHash) {
    issues.push(governanceIssue('review-hash-mismatch', 'Gold-set review hash must match the normalized gold set.'));
  }
  for (const field of ['reviewer', 'reason', 'expected_effect']) {
    if (!review[field]) issues.push(governanceIssue('review-field-missing', `Gold-set review must include ${field}.`));
  }
  if (!review.changed_cases.length) {
    issues.push(governanceIssue('review-changed-cases-missing', 'Gold-set review must list changed_cases.'));
  }
  for (const changedCase of review.changed_cases) {
    if (!caseIds.has(changedCase)) issues.push(governanceIssue('review-case-unknown', `Gold-set review references unknown case ${changedCase}.`));
  }
  for (const lens of REQUIRED_REVIEW_LENSES) {
    if (!review.review_lenses.includes(lens)) issues.push(governanceIssue('review-lens-missing', `Gold-set review must include review lens ${lens}.`));
  }
}

function normalizeGoldSetReview(review) {
  if (!review) return null;
  return {
    schema_version: review.schema_version || '',
    path: review.path || '',
    gold_set_path: review.gold_set_path || '',
    gold_set_hash: review.gold_set_hash || '',
    changed_cases: Array.isArray(review.changed_cases) ? review.changed_cases.filter(Boolean) : [],
    reviewer: review.reviewer || review.changed_by || '',
    reviewed_at: review.reviewed_at || '',
    reason: review.reason || '',
    expected_effect: review.expected_effect || '',
    review_lenses: Array.isArray(review.review_lenses) ? review.review_lenses.filter(Boolean) : [],
  };
}

function hashGoldSet(goldSet) {
  return createHash('sha256').update(stableJson({
    schema_version: goldSet.schema_version,
    name: goldSet.name,
    description: goldSet.description,
    cases: goldSet.cases
      .map((goldCase) => ({
        id: goldCase.id,
        route: goldCase.route,
        rationale: goldCase.rationale,
        expect: goldCase.expect,
      }))
      .sort((a, b) => a.id.localeCompare(b.id)),
  })).digest('hex');
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function governanceIssue(code, detail) {
  return { code, detail };
}

function evaluateGoldCase(goldCase, result) {
  const expectations = goldCase.expect || {};
  const checks = [];
  if (!result || result.ok !== true) {
    return {
      id: goldCase.id,
      route: goldCase.route,
      ok: false,
      rationale: goldCase.rationale,
      checks: [
        {
          field: 'route',
          ok: false,
          expected: 'calibration result',
          actual: result?.errors || null,
        },
      ],
    };
  }

  compareEqual(checks, 'recommended_action', expectations.recommended_action, result.recommended_action);
  compareEqual(checks, 'calibration_label', expectations.calibration_label, result.calibration_label);
  compareEqual(checks, 'risk_label', expectations.risk_label, result.risk_profile?.label);
  compareEqual(checks, 'confidence_label', expectations.confidence_label, result.confidence_profile?.label);
  compareEqual(checks, 'stale_decay_label', expectations.stale_decay_label, result.stale_decay?.label);
  compareMin(checks, 'score', expectations.score_min, result.score);
  compareMax(checks, 'score', expectations.score_max, result.score);
  compareMin(checks, 'source_count', expectations.source_count_min, result.source_count);
  compareMax(checks, 'source_count', expectations.source_count_max, result.source_count);
  compareMin(checks, 'source_quality', expectations.source_quality_min, result.dimensions?.source_quality);
  compareMax(checks, 'source_quality', expectations.source_quality_max, result.dimensions?.source_quality);
  compareMin(checks, 'buyer_intent', expectations.buyer_intent_min, result.dimensions?.buyer_intent);
  compareMax(checks, 'buyer_intent', expectations.buyer_intent_max, result.dimensions?.buyer_intent);
  compareMin(checks, 'parent_surface_count', expectations.parent_surface_count_min, result.parent_surface_count);
  compareMin(checks, 'stale_signal_count', expectations.stale_signal_count_min, result.stale_signal_count);
  compareMax(checks, 'stale_signal_count', expectations.stale_signal_count_max, result.stale_signal_count);
  compareMin(checks, 'internal_links', expectations.internal_links_min, result.dimensions?.internal_links);
  compareMax(checks, 'internal_links', expectations.internal_links_max, result.dimensions?.internal_links);

  return {
    id: goldCase.id,
    route: goldCase.route,
    ok: checks.every((check) => check.ok),
    rationale: goldCase.rationale,
    actual: {
      score: result.score,
      recommended_action: result.recommended_action,
      calibration_label: result.calibration_label,
      risk_label: result.risk_profile?.label || '',
      confidence_label: result.confidence_profile?.label || '',
      stale_decay_label: result.stale_decay?.label || '',
      source_count: result.source_count,
      stale_signal_count: result.stale_signal_count,
      source_quality: result.dimensions?.source_quality,
      buyer_intent: result.dimensions?.buyer_intent,
      internal_links: result.dimensions?.internal_links,
    },
    checks,
  };
}

function compareEqual(checks, field, expected, actual) {
  if (expected == null || expected === '') return;
  checks.push({
    field,
    ok: actual === expected,
    expected,
    actual,
  });
}

function compareMin(checks, field, expected, actual) {
  if (expected == null || expected === '') return;
  const expectedNumber = Number(expected);
  checks.push({
    field,
    ok: Number(actual) >= expectedNumber,
    expected: `>= ${expectedNumber}`,
    actual,
  });
}

function compareMax(checks, field, expected, actual) {
  if (expected == null || expected === '') return;
  const expectedNumber = Number(expected);
  checks.push({
    field,
    ok: Number(actual) <= expectedNumber,
    expected: `<= ${expectedNumber}`,
    actual,
  });
}

function thresholdReviewFor(results, goldSetReport) {
  const okResults = results.filter((result) => result.ok);
  const notes = [];
  for (const result of okResults) {
    if (result.risk_profile?.label === 'high' && result.recommended_action === 'monitor') {
      notes.push(`${result.route} has high risk but monitor action`);
    }
    if (result.confidence_profile?.label === 'low' && !['refresh_current_facts', 'improve_source_coverage', 'risk_confidence_review'].includes(result.recommended_action)) {
      notes.push(`${result.route} has low confidence but weak remediation action`);
    }
    if (result.stale_decay?.label === 'high' && result.score >= 0.75) {
      notes.push(`${result.route} has high stale decay but high score`);
    }
  }
  if (goldSetReport && !goldSetReport.ok) notes.push(`${goldSetReport.mismatch_count} gold-set calibration mismatch(es)`);
  return {
    status: notes.length ? 'review' : 'pass',
    notes,
    thresholds: {
      high_risk_requires_non_monitor_action: true,
      low_confidence_requires_remediation_action: true,
      high_stale_decay_high_score_requires_review: true,
    },
  };
}

function countBy(items, key) {
  const counts = {};
  for (const item of items) counts[item[key]] = (counts[item[key]] ?? 0) + 1;
  return counts;
}

function countNestedBy(items, objectKey, valueKey) {
  const counts = {};
  for (const item of items) {
    const value = item[objectKey]?.[valueKey] ?? 'unknown';
    counts[value] = (counts[value] ?? 0) + 1;
  }
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

function goldSetFromFile(projectDir, path) {
  if (!path) return null;
  const absolutePath = resolve(projectDir, path);
  if (!existsSync(absolutePath)) {
    throw new Error(`gold set file not found: ${projectPath(projectDir, absolutePath)}`);
  }
  const parsed = JSON.parse(readFileSync(absolutePath, 'utf8'));
  parsed.path = projectPath(projectDir, absolutePath);
  return parsed;
}

function goldSetReviewFromFile(projectDir, path) {
  if (!path) return null;
  const absolutePath = resolve(projectDir, path);
  if (!existsSync(absolutePath)) {
    throw new Error(`gold set review file not found: ${projectPath(projectDir, absolutePath)}`);
  }
  const parsed = JSON.parse(readFileSync(absolutePath, 'utf8'));
  parsed.path = projectPath(projectDir, absolutePath);
  return parsed;
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
  let goldSet = null;
  let goldSetReview = null;
  try {
    goldSet = goldSetFromFile(projectDir, goldSetPath);
    goldSetReview = goldSetReviewFromFile(projectDir, goldSetReviewPath);
  } catch (error) {
    const report = {
      ok: false,
      mode: 'gold-set-error',
      error: error.message,
      project_dir: projectDir,
    };
    if (jsonMode) {
      process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    } else {
      console.error(`[agent-score-calibration] ${error.message}`);
    }
    process.exit(2);
  }
  const report = calibrateScores(projectDir, {
    routes,
    currentDate,
    goldSet,
    goldSetReview,
    requireGoldSetReview,
  });
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
