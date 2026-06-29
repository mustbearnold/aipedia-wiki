#!/usr/bin/env node

import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  DEFAULT_PROJECT_DIR,
  clamp01,
  collectInternalLinks,
  collectSourceIds,
  daysOld,
  fileExists,
  hasFlag,
  loadSourceRegistry,
  projectPath,
  readMarkdownFile,
  resolveTarget,
  unique,
  valueFor,
} from './lib/agent-workflow-utils.mjs';
import { buildEvidenceBundle } from './agent-evidence-bundle.mjs';

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
    '  node scripts/agent-page-quality-score.mjs --route /tools/cursor/ --json',
    '  node scripts/agent-page-quality-score.mjs --path src/content/tools/cursor.md --current-date 2026-06-29',
    '',
    'Read-only page quality scoring prototype. Does not perform live web verification.',
  ].join('\n');
}

export function scorePage(projectDir, options = {}) {
  const target = resolveTarget(projectDir, options);
  if (!target || !target.path || !fileExists(projectDir, target.path)) {
    return { ok: false, error: 'target route or path could not be resolved', project_dir: projectDir };
  }
  const markdown = readMarkdownFile(projectDir, target.path);
  const evidence = buildEvidenceBundle(projectDir, { ...options, path: target.path, currentDate: options.currentDate });
  const sourceRegistry = loadSourceRegistry(projectDir);
  const sourceIds = [...collectSourceIds(markdown.frontmatter)];
  const sourceRows = sourceIds.map((id) => sourceRegistry.get(id)).filter(Boolean);
  const inlineSourceCount = evidence.source_evidence.inline_source_count ?? 0;
  const totalSourceCount = evidence.source_evidence.total_sources ?? (sourceIds.length + inlineSourceCount);
  const body = markdown.body;
  const links = collectInternalLinks(body);
  const frontmatter = markdown.frontmatter;
  const sourceQuality = sourceQualityScore(sourceRows, sourceIds.length, inlineSourceCount);
  const freshness = freshnessScore(frontmatter, evidence.stale_sections, options.currentDate);
  const scores = {
    freshness,
    source_quality: sourceQuality,
    seo: seoScore(frontmatter),
    buyer_intent: buyerIntentScore(target.collection, frontmatter, body),
    affiliate: affiliateScore(frontmatter),
    cta_quality: ctaScore(frontmatter, body),
    comparison_usefulness: comparisonScore(target.collection, frontmatter, body),
    internal_links: internalLinksScore(links),
    readability: readabilityScore(body),
    unique_angle: uniqueAngleScore(frontmatter, body),
    conversion_potential: conversionScore(frontmatter),
    update_urgency: updateUrgencyScore(freshness, evidence.stale_sections),
    trustworthiness: clamp01((sourceQuality * 0.65) + (freshness * 0.35)),
    page_completeness: completenessScore(target.collection, frontmatter, body),
  };

  const qualityScore = average([
    scores.freshness,
    scores.source_quality,
    scores.seo,
    scores.buyer_intent,
    scores.internal_links,
    scores.readability,
    scores.unique_angle,
    scores.trustworthiness,
    scores.page_completeness,
  ]);

  return {
    ok: true,
    project_dir: projectDir,
    generated_at: new Date().toISOString(),
    current_date: options.currentDate,
    target: {
      route: evidence.target.route,
      path: projectPath(projectDir, target.path),
      collection: target.collection,
      type: target.type,
      title: frontmatter.title ?? '',
      last_verified: evidence.target.last_verified,
    },
    score: round(qualityScore),
    dimensions: Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, round(value)])),
    recommended_action: recommendAction(scores, evidence),
    evidence_summary: {
      sources: totalSourceCount,
      registered_sources: sourceRows.length,
      inline_sources: inlineSourceCount,
      internal_links: links.length,
      stale_signals: evidence.stale_sections.length,
      affiliate_state: evidence.affiliate_notes.state,
    },
    limitations: [
      'Read-only prototype based on repository signals.',
      'Does not perform live source verification or browser layout inspection.',
    ],
  };
}

function freshnessScore(frontmatter, staleSections, currentDate) {
  const age = daysOld(frontmatter.last_verified ?? frontmatter.last_updated, currentDate);
  const base = age === Infinity ? 0.2 : clamp01(1 - (age / 45));
  const penalty = Math.min(0.5, staleSections.length * 0.08);
  return clamp01(base - penalty);
}

function sourceQualityScore(sourceRows, totalSourceIds, inlineSourceCount = 0) {
  const totalSources = totalSourceIds + inlineSourceCount;
  if (totalSources === 0) return 0.2;
  const registeredRatio = totalSourceIds ? sourceRows.length / totalSourceIds : 1;
  const primaryRatio = sourceRows.length
    ? sourceRows.filter((source) => source.trust_tier === 'primary').length / sourceRows.length
    : 0.7;
  const countScore = clamp01(totalSources / 4);
  return clamp01((registeredRatio * 0.3) + (primaryRatio * 0.4) + (countScore * 0.3));
}

function seoScore(frontmatter) {
  const checks = [
    frontmatter.title,
    frontmatter.seo_title,
    frontmatter.meta_description,
    frontmatter.slug,
  ];
  return checks.filter(Boolean).length / checks.length;
}

function buyerIntentScore(collection, frontmatter, body) {
  if (collection === 'tools') {
    return fieldRatio([
      frontmatter.best_for?.length,
      frontmatter.not_best_for?.length,
      frontmatter.facts?.best_for,
      frontmatter.facts?.watch_out_for,
      frontmatter.facts?.pricing_anchor,
      /best plan|watch-out|alternative/i.test(body),
    ]);
  }
  if (collection === 'use-cases') {
    return fieldRatio([
      frontmatter.buyer_job,
      frontmatter.audience,
      frontmatter.not_for?.length,
      frontmatter.decision_criteria?.length,
      frontmatter.guide_picks,
      frontmatter.search_intent,
    ]);
  }
  if (collection === 'comparisons') {
    return fieldRatio([frontmatter.tools?.length >= 2, frontmatter.winner, /choose|winner|best for/i.test(body)]);
  }
  if (collection === 'news') {
    return fieldRatio([
      frontmatter.summary,
      frontmatter.categories?.length,
      frontmatter.related_tools?.length || frontmatter.affects?.length,
      /buyer value|what to do|aipedia take|buyer|builders|teams should/i.test(body),
    ]);
  }
  return fieldRatio([frontmatter.description, /best|avoid|should|winner|plan/i.test(body)]);
}

function affiliateScore(frontmatter) {
  if (frontmatter.monetization_disclosure_required) return 0.9;
  if (frontmatter.affiliate?.link && frontmatter.affiliate?.application_status === 'approved') return 0.85;
  if (frontmatter.affiliate?.link) return 0.6;
  return 0.75;
}

function ctaScore(frontmatter, body) {
  if (frontmatter.cta_plan?.primary && frontmatter.cta_plan?.disclosure) return 1;
  if (/CommercialCTA|ToolCTA|Try|Start|Compare|See pricing/i.test(body)) return 0.75;
  return 0.45;
}

function comparisonScore(collection, frontmatter, body) {
  if (collection !== 'comparisons') return 0.75;
  return fieldRatio([frontmatter.tools?.length >= 2, frontmatter.winner, frontmatter.canonical_fact_table, /choose .* if|winner/i.test(body)]);
}

function internalLinksScore(links) {
  return clamp01(links.length / 8);
}

function readabilityScore(body) {
  const text = body.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, ' ');
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return 0.2;
  const longSentences = text.split(/[.!?]\s+/).filter((sentence) => sentence.split(/\s+/).filter(Boolean).length > 34).length;
  const fillerHits = (text.match(/game-changing|cutting-edge|world-class|in today's fast-paced|seamless/gi) ?? []).length;
  return clamp01(1 - (longSentences * 0.04) - (fillerHits * 0.12));
}

function uniqueAngleScore(frontmatter, body) {
  return fieldRatio([frontmatter.unique_angle, frontmatter.conversion_angle, /watch-out|not for|avoid|alternative/i.test(body)]);
}

function conversionScore(frontmatter) {
  return fieldRatio([
    frontmatter.conversion_angle,
    frontmatter.cta_plan?.primary,
    frontmatter.monetization_disclosure_required,
    frontmatter.commercial_tools?.length,
    frontmatter.affiliate_tools?.length,
  ]);
}

function updateUrgencyScore(freshness, staleSections) {
  const severityBoost = staleSections.some((signal) => signal.severity === 'high') ? 0.25 : 0;
  return clamp01((1 - freshness) + severityBoost);
}

function completenessScore(collection, frontmatter, body) {
  if (collection === 'tools') {
    return fieldRatio([
      frontmatter.title,
      frontmatter.category,
      frontmatter.price_range,
      frontmatter.last_verified,
      frontmatter.facts?.pricing_anchor,
      frontmatter.facts?.best_for,
      frontmatter.facts?.watch_out_for,
      /alternatives/i.test(body),
    ]);
  }
  if (collection === 'use-cases') {
    return fieldRatio([frontmatter.title, frontmatter.meta_description, frontmatter.buyer_job, frontmatter.audience, frontmatter.sources?.length || frontmatter.source_refs?.length, body.length > 1000]);
  }
  return fieldRatio([frontmatter.title, frontmatter.meta_description, frontmatter.last_verified, body.length > 800]);
}

function fieldRatio(values) {
  return values.filter(Boolean).length / values.length;
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value) {
  return Math.round(clamp01(value) * 100) / 100;
}

function recommendAction(scores, evidence) {
  if (evidence.source_evidence.missing_source_ids.length) return 'fix_missing_sources';
  if (scores.update_urgency >= 0.75) return 'refresh_current_facts';
  if (scores.source_quality < 0.45) return 'improve_source_coverage';
  if (scores.internal_links < 0.5) return 'improve_internal_links';
  if (scores.cta_quality < 0.6 && evidence.affiliate_notes.state !== 'none') return 'improve_cta_context';
  if (scores.buyer_intent < 0.65) return 'strengthen_buyer_decision_path';
  return 'monitor';
}

if (isCli) {
  const report = scorePage(projectDir, {
    route: valueFor(args, '--route'),
    path: valueFor(args, '--path'),
    slug: valueFor(args, '--slug'),
    type: valueFor(args, '--type'),
    currentDate,
  });

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-score] ${report.error}`);
    process.exitCode = 1;
  } else {
    console.log(`Page quality score for ${report.target.route}: ${report.score}`);
    console.log(`Recommended action: ${report.recommended_action}`);
  }
}
