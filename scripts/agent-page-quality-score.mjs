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
  isoDate,
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
  const effectiveCurrentDate = options.currentDate || currentDate;
  const target = resolveTarget(projectDir, options);
  if (!target || !target.path || !fileExists(projectDir, target.path)) {
    return { ok: false, error: 'target route or path could not be resolved', project_dir: projectDir };
  }
  const markdown = readMarkdownFile(projectDir, target.path);
  const evidence = buildEvidenceBundle(projectDir, { ...options, path: target.path, currentDate: effectiveCurrentDate });
  const sourceRegistry = loadSourceRegistry(projectDir);
  const sourceIds = [...collectSourceIds(markdown.frontmatter)];
  const sourceRows = sourceIds.map((id) => sourceRegistry.get(id)).filter(Boolean);
  const inlineSourceCount = evidence.source_evidence.inline_source_count ?? 0;
  const totalSourceCount = evidence.source_evidence.total_sources ?? (sourceIds.length + inlineSourceCount);
  const body = markdown.body;
  const links = collectInternalLinks(body);
  const frontmatter = markdown.frontmatter;
  const sourceQuality = sourceQualityScore(sourceRows, sourceIds.length, inlineSourceCount);
  const pageProfile = pageProfileFor(target, frontmatter, evidence);
  const staleDecay = staleDecayProfile(frontmatter, evidence, sourceRows, pageProfile, effectiveCurrentDate);
  const freshness = freshnessScore(frontmatter, evidence.stale_sections, effectiveCurrentDate, staleDecay);
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
  const weights = scoreWeightsFor(pageProfile.profile);
  const rawScore = weightedScore(scores, weights);
  const qualityScore = clamp01(rawScore - staleDecay.score_penalty);
  const riskProfile = riskProfileFor({ evidence, frontmatter, scores, staleDecay });
  const confidenceProfile = confidenceProfileFor({ evidence, scores, staleDecay, riskProfile });

  return {
    ok: true,
    schema_version: 'aipedia.page-quality-score.v2',
    project_dir: projectDir,
    generated_at: new Date().toISOString(),
    current_date: effectiveCurrentDate,
    target: {
      route: evidence.target.route,
      path: projectPath(projectDir, target.path),
      collection: target.collection,
      type: target.type,
      title: frontmatter.title ?? '',
      last_verified: evidence.target.last_verified,
    },
    score: round(qualityScore),
    raw_score: round(rawScore),
    dimensions: Object.fromEntries(Object.entries(scores).map(([key, value]) => [key, round(value)])),
    scoring_model: {
      name: 'non-stale-page-quality',
      version: '2026-06-30',
      page_profile: pageProfile.profile,
      freshness_window_days: staleDecay.freshness_window_days,
      source_window_days: staleDecay.source_window_days,
      weights,
      score_penalty: staleDecay.score_penalty,
    },
    stale_decay: staleDecay,
    risk_profile: riskProfile,
    confidence_profile: confidenceProfile,
    recommended_action: recommendAction(scores, evidence, riskProfile, confidenceProfile),
    evidence_summary: {
      sources: totalSourceCount,
      registered_sources: sourceRows.length,
      inline_sources: inlineSourceCount,
      internal_links: links.length,
      stale_signals: evidence.stale_sections.length,
      affiliate_state: evidence.affiliate_notes.state,
      risk_label: riskProfile.label,
      confidence_label: confidenceProfile.label,
      stale_decay_label: staleDecay.label,
    },
    limitations: [
      'Read-only prototype based on repository signals.',
      'Does not perform live source verification or browser layout inspection.',
    ],
  };
}

function pageProfileFor(target, frontmatter, evidence) {
  if (target.collection === 'news') return { profile: 'news' };
  if (target.collection === 'comparisons') return { profile: 'comparison' };
  if (target.collection === 'use-cases') {
    const hasAffiliateIntent = Boolean(frontmatter.affiliate_tools?.length || frontmatter.commercial_tools?.length || frontmatter.cta_plan);
    return { profile: hasAffiliateIntent ? 'affiliate_buyer' : 'guide' };
  }
  if (target.collection === 'tools') {
    const hasHighVolatility = evidence.current_page_claims.some((fact) => fact.volatility === 'high');
    const isAffiliate = evidence.affiliate_notes.state !== 'none';
    return { profile: hasHighVolatility || isAffiliate ? 'tool_high_volatility' : 'tool' };
  }
  return { profile: 'default' };
}

function freshnessScore(frontmatter, staleSections, currentDate, staleDecay) {
  const sourceDate = staleDecay?.source_date || frontmatter.last_verified || frontmatter.last_updated || frontmatter.date;
  const age = daysOld(sourceDate, currentDate);
  const windowDays = staleDecay?.freshness_window_days || 45;
  const base = age === Infinity ? 0.2 : clamp01(1 - (age / (windowDays * 1.5)));
  const severityPenalty = staleSignalScore(staleSections) * 0.35;
  const decayPenalty = (staleDecay?.score_penalty ?? 0) * 0.5;
  const penalty = Math.min(0.65, severityPenalty + decayPenalty);
  return clamp01(base - penalty);
}

function staleDecayProfile(frontmatter, evidence, sourceRows, pageProfile, currentDate) {
  const sourceDate = isoDate(frontmatter.last_verified || frontmatter.last_updated || frontmatter.date || evidence.target.last_verified || evidence.target.last_updated);
  const pageAge = daysOld(sourceDate, currentDate);
  const highVolatilityPage = pageProfile.profile === 'tool_high_volatility' || evidence.current_page_claims.some((fact) => fact.volatility === 'high');
  const freshnessWindowDays = freshnessWindowFor(pageProfile.profile, highVolatilityPage);
  const sourceWindowDays = highVolatilityPage ? 14 : pageProfile.profile === 'news' ? 7 : 45;
  const sourceAges = sourceRows
    .map((source) => daysOld(source.last_checked, currentDate))
    .filter((age) => Number.isFinite(age));
  const maxSourceAge = sourceAges.length ? Math.max(...sourceAges) : null;
  const pageAgeDecay = pageAge === Infinity ? 1 : clamp01(pageAge / freshnessWindowDays);
  const overdueDecay = pageAge === Infinity ? 1 : clamp01((pageAge - freshnessWindowDays) / freshnessWindowDays);
  const sourceAgeDecay = maxSourceAge === null ? 0 : clamp01(maxSourceAge / sourceWindowDays);
  const sourceOverdueDecay = maxSourceAge === null ? 0 : clamp01((maxSourceAge - sourceWindowDays) / sourceWindowDays);
  const staleSectionDecay = staleSignalScore(evidence.stale_sections);
  const decay = clamp01((pageAgeDecay * 0.45) + (sourceAgeDecay * 0.25) + (staleSectionDecay * 0.3));
  const scorePenalty = round(clamp01((overdueDecay * 0.12) + (sourceOverdueDecay * 0.06) + (staleSectionDecay * 0.08)));

  return {
    label: decayLabel(decay, scorePenalty),
    decay: round(decay),
    score_penalty: scorePenalty,
    age_days: Number.isFinite(pageAge) ? pageAge : null,
    source_date: sourceDate || '',
    freshness_window_days: freshnessWindowDays,
    source_window_days: sourceWindowDays,
    source_max_age_days: maxSourceAge,
    page_age_decay: round(pageAgeDecay),
    source_age_decay: round(sourceAgeDecay),
    stale_signal_decay: round(staleSectionDecay),
  };
}

function freshnessWindowFor(profile, highVolatilityPage) {
  if (profile === 'news') return 7;
  if (profile === 'tool_high_volatility' || highVolatilityPage) return 21;
  if (profile === 'affiliate_buyer') return 21;
  if (profile === 'comparison') return 30;
  if (profile === 'guide') return 45;
  if (profile === 'tool') return 30;
  return 60;
}

function staleSignalScore(staleSections = []) {
  const points = staleSections.reduce((sum, signal) => {
    if (signal.severity === 'high') return sum + 0.5;
    if (signal.severity === 'medium') return sum + 0.25;
    return sum + 0.1;
  }, 0);
  return clamp01(points / 2);
}

function decayLabel(decay, scorePenalty) {
  if (scorePenalty >= 0.15 || decay >= 0.75) return 'high';
  if (scorePenalty >= 0.08 || decay >= 0.45) return 'medium';
  if (decay >= 0.15) return 'low';
  return 'fresh';
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

function scoreWeightsFor(profile) {
  const profiles = {
    tool_high_volatility: {
      freshness: 0.18,
      source_quality: 0.18,
      buyer_intent: 0.16,
      page_completeness: 0.13,
      trustworthiness: 0.1,
      internal_links: 0.08,
      cta_quality: 0.06,
      affiliate: 0.04,
      seo: 0.04,
      readability: 0.02,
      unique_angle: 0.01,
    },
    tool: {
      freshness: 0.16,
      source_quality: 0.17,
      buyer_intent: 0.17,
      page_completeness: 0.14,
      trustworthiness: 0.1,
      internal_links: 0.09,
      cta_quality: 0.06,
      affiliate: 0.04,
      seo: 0.04,
      readability: 0.02,
      unique_angle: 0.01,
    },
    comparison: {
      freshness: 0.14,
      source_quality: 0.18,
      comparison_usefulness: 0.18,
      buyer_intent: 0.14,
      internal_links: 0.12,
      page_completeness: 0.1,
      trustworthiness: 0.06,
      seo: 0.04,
      readability: 0.02,
      unique_angle: 0.02,
    },
    guide: {
      freshness: 0.13,
      source_quality: 0.17,
      buyer_intent: 0.19,
      internal_links: 0.14,
      page_completeness: 0.12,
      trustworthiness: 0.09,
      seo: 0.07,
      cta_quality: 0.04,
      readability: 0.03,
      unique_angle: 0.02,
    },
    affiliate_buyer: {
      buyer_intent: 0.2,
      source_quality: 0.16,
      trustworthiness: 0.13,
      cta_quality: 0.12,
      affiliate: 0.09,
      unique_angle: 0.08,
      freshness: 0.12,
      internal_links: 0.06,
      seo: 0.04,
    },
    news: {
      freshness: 0.26,
      source_quality: 0.24,
      buyer_intent: 0.18,
      internal_links: 0.1,
      page_completeness: 0.08,
      readability: 0.08,
      seo: 0.06,
    },
    default: {
      freshness: 0.14,
      source_quality: 0.16,
      seo: 0.12,
      buyer_intent: 0.14,
      internal_links: 0.12,
      readability: 0.1,
      unique_angle: 0.08,
      trustworthiness: 0.1,
      page_completeness: 0.04,
    },
  };
  return profiles[profile] || profiles.default;
}

function weightedScore(scores, weights) {
  let total = 0;
  let weightTotal = 0;
  for (const [dimension, weight] of Object.entries(weights)) {
    if (!Number.isFinite(scores[dimension])) continue;
    total += scores[dimension] * weight;
    weightTotal += weight;
  }
  return weightTotal ? total / weightTotal : average(Object.values(scores));
}

function riskProfileFor({ evidence, frontmatter, scores, staleDecay }) {
  const missingSourceCount = evidence.source_evidence.missing_source_ids.length;
  const highSeverityCount = evidence.stale_sections.filter((signal) => signal.severity === 'high').length;
  const lowConfidenceFacts = evidence.current_page_claims.filter((fact) => fact.confidence && !/^(high|primary-confirmed)$/i.test(fact.confidence));
  const liveAffiliate = evidence.affiliate_notes.state === 'live_affiliate';
  const noindex = Boolean(frontmatter.noindex || frontmatter.draft);
  const riskScore = clamp01(
    (staleDecay.decay * 0.34) +
    (clamp01(highSeverityCount / 3) * 0.18) +
    (clamp01(missingSourceCount / 3) * 0.18) +
    ((1 - scores.source_quality) * 0.13) +
    ((liveAffiliate && scores.cta_quality < 0.6 ? 1 : 0) * 0.08) +
    (clamp01(lowConfidenceFacts.length / 3) * 0.06) +
    ((noindex ? 1 : 0) * 0.03),
  );
  const factors = [];
  if (staleDecay.label !== 'fresh') factors.push(`${staleDecay.label} stale decay`);
  if (highSeverityCount) factors.push(`${highSeverityCount} high severity stale signal(s)`);
  if (missingSourceCount) factors.push(`${missingSourceCount} missing source ID(s)`);
  if (scores.source_quality < 0.55) factors.push('weak source quality');
  if (liveAffiliate && scores.cta_quality < 0.6) factors.push('live affiliate page with weak CTA context');
  if (lowConfidenceFacts.length) factors.push(`${lowConfidenceFacts.length} constrained fact(s) below high confidence`);
  if (noindex) factors.push('noindex or draft flag present');

  return {
    label: riskLabel(riskScore),
    score: round(riskScore),
    factors,
  };
}

function riskLabel(score) {
  if (score >= 0.65) return 'high';
  if (score >= 0.35) return 'medium';
  return 'low';
}

function confidenceProfileFor({ evidence, scores, staleDecay, riskProfile }) {
  const sourceCoverage = evidence.source_evidence.total_sources > 0 ? 1 : 0.35;
  const confidenceScore = clamp01(
    (scores.source_quality * 0.3) +
    (scores.trustworthiness * 0.22) +
    (scores.page_completeness * 0.16) +
    (scores.freshness * 0.16) +
    ((1 - riskProfile.score) * 0.1) +
    (sourceCoverage * 0.06),
  );
  const reasons = [];
  if (scores.source_quality >= 0.75) reasons.push('source quality is strong');
  if (scores.freshness < 0.5 || staleDecay.label === 'high') reasons.push('freshness needs current-source review');
  if (scores.page_completeness < 0.65) reasons.push('page completeness is below target');
  if (riskProfile.label !== 'low') reasons.push(`${riskProfile.label} risk profile`);
  if (evidence.source_evidence.total_sources === 0) reasons.push('no source coverage found');

  return {
    label: confidenceLabel(confidenceScore),
    score: round(confidenceScore),
    reasons,
  };
}

function confidenceLabel(score) {
  if (score >= 0.8) return 'high';
  if (score >= 0.6) return 'medium';
  return 'low';
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

function recommendAction(scores, evidence, riskProfile = { label: 'low' }, confidenceProfile = { label: 'high' }) {
  if (evidence.source_evidence.missing_source_ids.length) return 'fix_missing_sources';
  if (scores.update_urgency >= 0.75) return 'refresh_current_facts';
  if (scores.source_quality < 0.45) return 'improve_source_coverage';
  if (riskProfile.label === 'high' || confidenceProfile.label === 'low') return 'risk_confidence_review';
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
