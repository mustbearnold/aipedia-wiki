#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const TOOL_DIR = path.join(ROOT, 'src/content/tools');
const GUIDE_DIR = path.join(ROOT, 'src/content/use-cases');
const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const strictMode = args.includes('--strict');
const currentDate = new Date(process.env.AIPEDIA_CURRENT_DATE ?? new Date().toISOString().slice(0, 10));

function readMarkdown(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return {
    frontmatter: match ? yaml.load(match[1]) ?? {} : {},
    body: match ? text.slice(match[0].length) : text,
  };
}

function listMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dir, file))
    .sort();
}

function daysOld(value) {
  if (!value) return Infinity;
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return Infinity;
  return Math.floor((currentDate.getTime() - date.getTime()) / 86400000);
}

function hasAffiliateLink(tool) {
  return typeof tool.affiliate?.link === 'string' && tool.affiliate.link.trim().length > 0;
}

function affiliateState(tool) {
  if (!hasAffiliateLink(tool)) return 'none';
  return tool.affiliate?.application_status === 'approved' ? 'live_affiliate' : 'configured_not_live';
}

function guidePicks(frontmatter) {
  return Object.values(frontmatter.guide_picks ?? {})
    .filter((pick) => pick && typeof pick === 'object');
}

function sourceCount(frontmatter) {
  const picks = guidePicks(frontmatter);
  return picks.reduce((sum, pick) => sum + (Array.isArray(pick.sources) ? pick.sources.length : 0), 0)
    + (Array.isArray(frontmatter.sources) ? frontmatter.sources.length : 0)
    + (Array.isArray(frontmatter.source_refs) ? frontmatter.source_refs.length : 0);
}

function arrayField(frontmatter, key) {
  return Array.isArray(frontmatter[key]) ? frontmatter[key] : [];
}

function stringField(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null;
}

function signatureFor(values) {
  return values.length > 0 ? values.slice().sort().join('+') : 'none';
}

const tools = new Map();
for (const file of listMarkdownFiles(TOOL_DIR)) {
  const { frontmatter } = readMarkdown(file);
  const slug = frontmatter.slug ?? path.basename(file, '.md');
  tools.set(slug, {
    slug,
    title: frontmatter.title ?? slug,
    affiliate: frontmatter.affiliate ?? null,
    state: affiliateState(frontmatter),
  });
}

const affiliateLinkSlugs = new Set(Array.from(tools.values())
  .filter((tool) => tool.state !== 'none')
  .map((tool) => tool.slug));
const liveAffiliateSlugs = new Set(Array.from(tools.values())
  .filter((tool) => tool.state === 'live_affiliate')
  .map((tool) => tool.slug));
const configuredNotLiveSlugs = new Set(Array.from(tools.values())
  .filter((tool) => tool.state === 'configured_not_live')
  .map((tool) => tool.slug));

const issues = [];
const moneyGuides = [];
const clusterMap = new Map();

function addIssue(file, slug, severity, code, detail) {
  issues.push({ file, slug, severity, code, detail });
}

for (const filePath of listMarkdownFiles(GUIDE_DIR)) {
  const { frontmatter, body } = readMarkdown(filePath);
  const slug = frontmatter.slug ?? path.basename(filePath, '.md');
  const file = path.relative(ROOT, filePath).replaceAll(path.sep, '/');
  const picks = guidePicks(frontmatter);
  const pickedAffiliateSlugs = picks
    .map((pick) => pick.tool)
    .filter((tool) => affiliateLinkSlugs.has(tool));
  const pickedLiveAffiliateSlugs = pickedAffiliateSlugs
    .filter((tool) => liveAffiliateSlugs.has(tool));
  const pickedConfiguredNotLiveSlugs = pickedAffiliateSlugs
    .filter((tool) => configuredNotLiveSlugs.has(tool));
  const rawDeclaredAffiliateSlugs = arrayField(frontmatter, 'affiliate_tools');
  const rawDeclaredCommercialSlugs = arrayField(frontmatter, 'commercial_tools');
  const rawDeclaredConfiguredNotLiveSlugs = arrayField(frontmatter, 'configured_affiliate_tools');
  const declaredCompetitorSlugs = arrayField(frontmatter, 'competitor_tools');
  const declaredExternalCompetitors = arrayField(frontmatter, 'external_competitors');
  const declaredAffiliateSlugs = rawDeclaredAffiliateSlugs.filter((tool) => affiliateLinkSlugs.has(tool));
  const declaredCommercialSlugs = rawDeclaredCommercialSlugs;
  const declaredConfiguredNotLiveSlugs = rawDeclaredConfiguredNotLiveSlugs;
  const isMoneyGuide = Boolean(frontmatter.monetization_disclosure_required)
    || pickedLiveAffiliateSlugs.length > 0
    || pickedConfiguredNotLiveSlugs.length > 0
    || declaredCommercialSlugs.length > 0
    || declaredConfiguredNotLiveSlugs.length > 0
    || rawDeclaredAffiliateSlugs.length > 0
    || declaredAffiliateSlugs.length > 0;

  if (!isMoneyGuide) continue;

  const clusterId = frontmatter.cluster_id ?? frontmatter.buyer_job ?? slug;
  moneyGuides.push({
    slug,
    file,
    title: frontmatter.title,
    intent_type: frontmatter.intent_type ?? null,
    primary_tool: frontmatter.primary_tool ?? null,
    affiliate_tools: Array.from(new Set([...pickedAffiliateSlugs, ...declaredAffiliateSlugs])),
    commercial_tools: Array.from(new Set(declaredCommercialSlugs)),
    configured_affiliate_tools: Array.from(new Set([...pickedConfiguredNotLiveSlugs, ...declaredConfiguredNotLiveSlugs])),
    competitor_tools: Array.from(new Set(declaredCompetitorSlugs)),
    external_competitors: Array.from(new Set(declaredExternalCompetitors)),
    cluster_id: clusterId,
    search_intent: frontmatter.search_intent ?? null,
    conversion_angle: frontmatter.conversion_angle ?? null,
    unique_angle: frontmatter.unique_angle ?? null,
    sibling_cluster: frontmatter.sibling_cluster ?? null,
    overlap_guard: frontmatter.overlap_guard ?? null,
    last_verified: frontmatter.last_verified ?? null,
    source_count: sourceCount(frontmatter),
  });

  if (!frontmatter.intent_type) addIssue(file, slug, 'warning', 'missing-intent-type', 'Money guide should declare intent_type.');
  if (!frontmatter.primary_tool) addIssue(file, slug, 'warning', 'missing-primary-tool', 'Money guide should declare primary_tool.');
  const bestOverallTool = frontmatter.guide_picks?.best_overall?.tool;
  if (bestOverallTool && frontmatter.primary_tool && frontmatter.primary_tool !== bestOverallTool) {
    addIssue(file, slug, 'error', 'primary-tool-mismatch', `primary_tool ${frontmatter.primary_tool} must match guide_picks.best_overall.tool ${bestOverallTool}. Use commercial_tools for approved affiliate opportunities.`);
  }
  if (!frontmatter.buyer_job) addIssue(file, slug, 'warning', 'missing-buyer-job', 'Money guide should declare buyer_job.');
  if (!frontmatter.audience) addIssue(file, slug, 'warning', 'missing-audience', 'Money guide should declare audience.');
  if (!Array.isArray(frontmatter.not_for) || frontmatter.not_for.length === 0) addIssue(file, slug, 'warning', 'missing-not-for', 'Money guide should declare not_for.');
  if (!Array.isArray(frontmatter.decision_criteria) || frontmatter.decision_criteria.length < 3) addIssue(file, slug, 'warning', 'missing-decision-criteria', 'Money guide should declare at least three decision_criteria.');
  if (!frontmatter.search_intent) addIssue(file, slug, 'warning', 'missing-search-intent', 'Money guide should declare search_intent.');
  if (!frontmatter.conversion_angle) addIssue(file, slug, 'warning', 'missing-conversion-angle', 'Money guide should declare conversion_angle.');
  if (!frontmatter.unique_angle) addIssue(file, slug, 'warning', 'missing-unique-angle', 'Money guide should declare unique_angle.');
  if (!frontmatter.sibling_cluster) addIssue(file, slug, 'warning', 'missing-sibling-cluster', 'Money guide should declare sibling_cluster for anti-doorway grouping.');
  if (!frontmatter.overlap_guard) addIssue(file, slug, 'warning', 'missing-overlap-guard', 'Money guide should declare overlap_guard.');
  const ctaPlan = frontmatter.cta_plan && typeof frontmatter.cta_plan === 'object' && !Array.isArray(frontmatter.cta_plan)
    ? frontmatter.cta_plan
    : null;
  if (!ctaPlan) {
    addIssue(file, slug, 'warning', 'missing-cta-plan', 'Money guide should declare cta_plan.');
  } else {
    for (const key of ['primary', 'secondary', 'disclosure']) {
      if (!stringField(ctaPlan[key])) {
        addIssue(file, slug, 'warning', 'incomplete-cta-plan', `Money guide cta_plan.${key} should be a meaningful string.`);
      }
    }
  }
  if (daysOld(frontmatter.last_verified) > Number(frontmatter.freshness_window_days ?? 45)) addIssue(file, slug, 'warning', 'stale-money-guide', 'Money guide last_verified is outside its freshness window.');
  if (sourceCount(frontmatter) < 2) addIssue(file, slug, 'warning', 'weak-source-contract', 'Money guide should expose at least two page-level or guide-pick sources.');
  if (!frontmatter.monetization_disclosure_required) addIssue(file, slug, 'warning', 'missing-disclosure-flag', 'Money guide should declare monetization_disclosure_required: true.');

  for (const tool of rawDeclaredAffiliateSlugs) {
    if (!tools.has(tool)) {
      addIssue(file, slug, 'error', 'unknown-affiliate-tool', `affiliate_tools includes ${tool}, but no matching tool record exists.`);
      continue;
    }
    if (!affiliateLinkSlugs.has(tool)) {
      addIssue(file, slug, 'error', 'declared-tool-not-affiliate', `affiliate_tools includes ${tool}, but that tool has no configured affiliate link.`);
      continue;
    }
    if (liveAffiliateSlugs.has(tool) && !declaredCommercialSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'affiliate-tool-not-commercial', `Live affiliate ${tool} in affiliate_tools should also be listed in commercial_tools.`);
    }
    if (configuredNotLiveSlugs.has(tool) && !declaredConfiguredNotLiveSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'affiliate-tool-not-configured-list', `Configured-not-live affiliate ${tool} in affiliate_tools should also be listed in configured_affiliate_tools.`);
    }
  }

  for (const tool of declaredCommercialSlugs) {
    if (!tools.has(tool)) {
      addIssue(file, slug, 'error', 'unknown-commercial-tool', `commercial_tools includes ${tool}, but no matching tool record exists.`);
      continue;
    }
    if (!liveAffiliateSlugs.has(tool)) {
      addIssue(file, slug, 'error', 'commercial-tool-not-live', `commercial_tools includes ${tool}, but that tool is not an approved-live affiliate.`);
    }
    if (!rawDeclaredAffiliateSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'commercial-tool-missing-affiliate-list', `commercial_tools includes ${tool}, but affiliate_tools does not list it.`);
    }
  }

  for (const tool of declaredConfiguredNotLiveSlugs) {
    if (!tools.has(tool)) {
      addIssue(file, slug, 'error', 'unknown-configured-affiliate-tool', `configured_affiliate_tools includes ${tool}, but no matching tool record exists.`);
      continue;
    }
    if (!configuredNotLiveSlugs.has(tool)) {
      addIssue(file, slug, 'error', 'configured-affiliate-tool-not-configured', `configured_affiliate_tools includes ${tool}, but that tool is not configured-not-live.`);
    }
    if (!rawDeclaredAffiliateSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'configured-tool-missing-affiliate-list', `configured_affiliate_tools includes ${tool}, but affiliate_tools does not list it.`);
    }
  }

  for (const tool of declaredCompetitorSlugs) {
    if (!tools.has(tool)) {
      addIssue(file, slug, 'error', 'unknown-competitor-tool', `competitor_tools includes ${tool}, but no matching tool record exists. Use external_competitors for market names without catalog records.`);
    }
  }

  for (const tool of pickedLiveAffiliateSlugs) {
    if (!declaredCommercialSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'missing-commercial-tool', `Approved affiliate pick ${tool} should be listed in commercial_tools.`);
    }
  }

  for (const tool of pickedConfiguredNotLiveSlugs) {
    if (!declaredConfiguredNotLiveSlugs.includes(tool)) {
      addIssue(file, slug, 'warning', 'missing-configured-not-live-tool', `Configured-but-not-live affiliate pick ${tool} should be listed in configured_affiliate_tools.`);
    }
    if (declaredCommercialSlugs.includes(tool)) {
      addIssue(file, slug, 'error', 'configured-tool-marked-commercial', `${tool} is configured but not approved-live, so it cannot be listed in commercial_tools.`);
    }
  }

  for (const pick of picks) {
    if (affiliateLinkSlugs.has(pick.tool) && !Array.isArray(pick.sources)) {
      addIssue(file, slug, 'warning', 'affiliate-pick-missing-sources', `Affiliate guide pick ${pick.tool} has no sources array.`);
    }
  }

  for (const toolSlug of affiliateLinkSlugs) {
    const tool = tools.get(toolSlug);
    const link = tool?.affiliate?.link;
    if (typeof link === 'string' && link.trim() && body.includes(link.trim())) {
      addIssue(file, slug, 'error', 'raw-affiliate-link', `Raw affiliate URL for ${toolSlug} appears in markdown body. Use CommercialCTA.`);
    }
  }

  const existing = clusterMap.get(clusterId) ?? [];
  existing.push(slug);
  clusterMap.set(clusterId, existing);
}

for (const [clusterId, slugs] of clusterMap.entries()) {
  if (slugs.length <= 1) continue;
  for (const slug of slugs) {
    const guide = moneyGuides.find((item) => item.slug === slug);
    addIssue(guide?.file ?? '', slug, 'warning', 'duplicate-cluster', `Cluster ${clusterId} is shared by: ${slugs.join(', ')}`);
  }
}

const overlapMap = new Map();
for (const guide of moneyGuides) {
  const signature = [
    guide.intent_type ?? 'unknown',
    guide.primary_tool ?? 'unknown',
    signatureFor(guide.commercial_tools),
  ].join('|');
  const existing = overlapMap.get(signature) ?? [];
  existing.push(guide.slug);
  overlapMap.set(signature, existing);
}

for (const [signature, slugs] of overlapMap.entries()) {
  if (slugs.length <= 1) continue;
  const uniqueAngles = new Set(slugs
    .map((slug) => moneyGuides.find((guide) => guide.slug === slug))
    .map((guide) => guide?.unique_angle)
    .filter(Boolean));
  for (const slug of slugs) {
    const guide = moneyGuides.find((item) => item.slug === slug);
    if (!guide?.unique_angle || !guide?.overlap_guard || !guide?.search_intent) {
      addIssue(guide?.file ?? '', slug, 'warning', 'near-duplicate-contract-missing', `Pages sharing signature ${signature} must declare search_intent, unique_angle, and overlap_guard: ${slugs.join(', ')}`);
    } else if (uniqueAngles.size < slugs.length) {
      addIssue(guide.file, slug, 'warning', 'near-duplicate-angle-reused', `Pages sharing signature ${signature} need distinct unique_angle values: ${slugs.join(', ')}`);
    }
  }
}

const errorCount = issues.filter((issue) => issue.severity === 'error').length;
const warningCount = issues.filter((issue) => issue.severity === 'warning').length;
const ok = strictMode ? issues.length === 0 : errorCount === 0;
const report = {
  ok,
  strict: strictMode,
  money_guides: moneyGuides.length,
  live_affiliate_tools: liveAffiliateSlugs.size,
  configured_not_live_tools: configuredNotLiveSlugs.size,
  errors: errorCount,
  warnings: warningCount,
  guides: moneyGuides,
  issues,
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Affiliate money guides: ${moneyGuides.length}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Warnings: ${warningCount}`);
  for (const issue of issues) {
    const prefix = issue.severity === 'error' ? 'ERROR' : 'WARN';
    console.log(`${prefix} ${issue.file}: ${issue.code}: ${issue.detail}`);
  }
}

if (!ok) process.exit(1);
