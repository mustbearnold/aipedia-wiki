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
  const declaredAffiliateSlugs = Array.isArray(frontmatter.affiliate_tools)
    ? frontmatter.affiliate_tools.filter((tool) => affiliateLinkSlugs.has(tool))
    : [];
  const isMoneyGuide = Boolean(frontmatter.monetization_disclosure_required)
    || pickedAffiliateSlugs.length > 0
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
    cluster_id: clusterId,
    last_verified: frontmatter.last_verified ?? null,
    source_count: sourceCount(frontmatter),
  });

  if (!frontmatter.intent_type) addIssue(file, slug, 'warning', 'missing-intent-type', 'Money guide should declare intent_type.');
  if (!frontmatter.primary_tool) addIssue(file, slug, 'warning', 'missing-primary-tool', 'Money guide should declare primary_tool.');
  if (!frontmatter.buyer_job) addIssue(file, slug, 'warning', 'missing-buyer-job', 'Money guide should declare buyer_job.');
  if (!frontmatter.audience) addIssue(file, slug, 'warning', 'missing-audience', 'Money guide should declare audience.');
  if (!Array.isArray(frontmatter.not_for) || frontmatter.not_for.length === 0) addIssue(file, slug, 'warning', 'missing-not-for', 'Money guide should declare not_for.');
  if (!Array.isArray(frontmatter.decision_criteria) || frontmatter.decision_criteria.length < 3) addIssue(file, slug, 'warning', 'missing-decision-criteria', 'Money guide should declare at least three decision_criteria.');
  if (daysOld(frontmatter.last_verified) > Number(frontmatter.freshness_window_days ?? 45)) addIssue(file, slug, 'warning', 'stale-money-guide', 'Money guide last_verified is outside its freshness window.');
  if (sourceCount(frontmatter) < 2) addIssue(file, slug, 'warning', 'weak-source-contract', 'Money guide should expose at least two page-level or guide-pick sources.');
  if (!frontmatter.monetization_disclosure_required) addIssue(file, slug, 'warning', 'missing-disclosure-flag', 'Money guide should declare monetization_disclosure_required: true.');

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

const errorCount = issues.filter((issue) => issue.severity === 'error').length;
const warningCount = issues.filter((issue) => issue.severity === 'warning').length;
const ok = strictMode ? issues.length === 0 : errorCount === 0;
const report = {
  ok,
  strict: strictMode,
  money_guides: moneyGuides.length,
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
