#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import yaml from 'js-yaml';

const ROOT = process.cwd();
const TOOL_DIR = path.join(ROOT, 'src/content/tools');
const GUIDE_DIR = path.join(ROOT, 'src/content/use-cases');

function readFrontmatter(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  return yaml.load(match[1]) ?? {};
}

function toolScore(tool) {
  const scores = tool.scores ?? {};
  const values = ['utility', 'value', 'moat', 'longevity']
    .map((key) => Number(scores[key] ?? 0));
  return Math.round((values.reduce((sum, value) => sum + value, 0) / 4) * 100) / 100;
}

function hasAffiliateLink(tool) {
  const link = tool.affiliate?.link;
  return typeof link === 'string' && link.trim().length > 0;
}

function monetizationState(tool) {
  if (!hasAffiliateLink(tool)) return 'none';
  if (tool.affiliate?.application_status === 'approved') return 'live_affiliate';
  return 'configured_not_live';
}

function recommendedPageCount(tool) {
  const state = monetizationState(tool);
  const score = typeof tool.score === 'number' ? tool.score : toolScore(tool);
  if (state === 'live_affiliate' && score >= 7.25) return 5;
  if (state === 'live_affiliate') return 3;
  if (state === 'configured_not_live') return 2;
  return 0;
}

function listMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(dir, file))
    .sort();
}

const tools = listMarkdownFiles(TOOL_DIR)
  .map((file) => ({ file, data: readFrontmatter(file) }))
  .map(({ file, data }) => ({
    file: path.relative(ROOT, file),
    slug: data.slug ?? path.basename(file, '.md'),
    title: data.title ?? data.slug ?? path.basename(file, '.md'),
    category: data.category ?? null,
    status: data.status ?? null,
    price_range: data.price_range ?? null,
    affiliate: data.affiliate ?? null,
    score: toolScore(data),
  }));

const guides = listMarkdownFiles(GUIDE_DIR)
  .map((file) => ({ file, data: readFrontmatter(file) }))
  .map(({ file, data }) => ({
    file: path.relative(ROOT, file),
    slug: data.slug ?? path.basename(file, '.md'),
    title: data.title ?? data.slug ?? path.basename(file, '.md'),
    tools_mentioned: Array.isArray(data.tools_mentioned) ? data.tools_mentioned : [],
    guide_picks: data.guide_picks ?? {},
  }));

const affiliateTools = tools
  .filter((tool) => hasAffiliateLink(tool))
  .sort((a, b) => a.slug.localeCompare(b.slug))
  .map((tool) => {
    const existingMentionGuides = guides
      .filter((guide) => guide.tools_mentioned.includes(tool.slug))
      .map((guide) => guide.slug)
      .sort();
    const existingPickGuides = guides
      .filter((guide) => Object.values(guide.guide_picks)
        .some((pick) => pick && typeof pick === 'object' && pick.tool === tool.slug))
      .map((guide) => guide.slug)
      .sort();
    return {
      slug: tool.slug,
      title: tool.title,
      category: tool.category,
      status: tool.status,
      score: tool.score,
      monetization_state: monetizationState(tool),
      affiliate_status: tool.affiliate?.application_status ?? null,
      affiliate_network: tool.affiliate?.network ?? null,
      recommended_page_count: recommendedPageCount(tool),
      existing_mention_guides: existingMentionGuides,
      existing_pick_guides: existingPickGuides,
      source_file: tool.file,
    };
  });

const summary = {
  generated_at: new Date().toISOString(),
  total_tool_files: tools.length,
  affiliate_link_tools: affiliateTools.length,
  live_affiliate_tools: affiliateTools.filter((tool) => tool.monetization_state === 'live_affiliate').length,
  configured_not_live_tools: affiliateTools.filter((tool) => tool.monetization_state === 'configured_not_live').length,
  recommended_total_pages: affiliateTools.reduce((sum, tool) => sum + tool.recommended_page_count, 0),
  tools: affiliateTools,
};

const json = process.argv.includes('--json');
if (json) {
  console.log(JSON.stringify(summary, null, 2));
} else {
  console.log(`Affiliate link tools: ${summary.affiliate_link_tools}`);
  console.log(`Live approved affiliate tools: ${summary.live_affiliate_tools}`);
  console.log(`Configured but not live-approved: ${summary.configured_not_live_tools}`);
  console.log(`Recommended first-pass page budget: ${summary.recommended_total_pages}`);
  console.log('');
  for (const tool of summary.tools) {
    console.log([
      tool.slug,
      tool.monetization_state,
      `${tool.recommended_page_count} pages`,
      `${tool.existing_pick_guides.length} pick guides`,
      `${tool.existing_mention_guides.length} mention guides`,
    ].join(' | '));
  }
}
