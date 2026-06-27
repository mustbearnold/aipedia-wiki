import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import yaml from 'js-yaml';

function writeTool(projectDir, slug, { title = slug, link = null, status = null } = {}) {
  const toolDir = join(projectDir, 'src', 'content', 'tools');
  mkdirSync(toolDir, { recursive: true });
  const affiliateBlock = link
    ? [
        'affiliate:',
        '  has_program: true',
        `  link: "${link}"`,
        `  application_status: ${status ?? 'none'}`,
      ].join('\n')
    : '';
  writeFileSync(join(toolDir, `${slug}.md`), [
    '---',
    'type: tool',
    `slug: ${slug}`,
    `title: "${title}"`,
    affiliateBlock,
    '---',
    '',
  ].filter(Boolean).join('\n'));
}

function guideFrontmatter(overrides = {}) {
  const data = {
    slug: 'best-live-tool',
    title: 'Best Live Tool',
    intent_type: 'best-of',
    primary_tool: 'live-tool',
    affiliate_tools: ['live-tool'],
    commercial_tools: ['live-tool'],
    configured_affiliate_tools: [],
    competitor_tools: ['competitor-tool'],
    buyer_job: 'Choose a live affiliate tool for a specific buyer job.',
    audience: 'Operators comparing a specific software workflow.',
    not_for: ['Teams with unrelated workflows'],
    decision_criteria: ['Fit', 'Price', 'Proof'],
    search_intent: 'Best live tool for operators',
    conversion_angle: 'Audience: operators. Buyer job: choose a live affiliate tool.',
    unique_angle: 'Distinct buyer job with a clear editorial winner.',
    sibling_cluster: 'live-tool-cluster',
    overlap_guard: 'Keep this page focused on the stated buyer job, not tool-name swaps.',
    cta_plan: {
      primary: 'Lead with the editorial winner.',
      secondary: 'Use approved commercial alternatives after the verdict.',
      disclosure: 'Show affiliate disclosure beside every commercial CTA.',
    },
    canonical_parent: '/guides/',
    cluster_id: 'live-tool-cluster',
    freshness_window_days: 45,
    volatile_claims: ['pricing', 'affiliate link status'],
    monetization_disclosure_required: true,
    indexability_reason: 'Distinct buyer job with source-backed tool fit.',
    last_verified: '2026-06-27',
    sources: [
      { label: 'Live tool pricing', url: 'https://example.com/live-pricing' },
      { label: 'Live tool docs', url: 'https://example.com/live-docs' },
    ],
    guide_picks: {
      best_overall: {
        tool: 'live-tool',
        label: 'Best overall',
        plan: 'Pro',
        reason: 'Best fit for this buyer job.',
        sources: [{ label: 'Live tool pricing', url: 'https://example.com/live-pricing' }],
      },
    },
    ...overrides,
  };
  return data;
}

function writeGuide(projectDir, slug, overrides = {}) {
  const guideDir = join(projectDir, 'src', 'content', 'use-cases');
  mkdirSync(guideDir, { recursive: true });
  const data = guideFrontmatter({ slug, ...overrides });
  const frontmatter = yaml.dump(data, { lineWidth: 120, noRefs: true });
  writeFileSync(join(guideDir, `${slug}.md`), `---\n${frontmatter}\n---\n\n# ${data.title}\n`);
}

function makeProject() {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-affiliate-conversion-'));
  writeTool(projectDir, 'live-tool', { title: 'Live Tool', link: 'https://example.com/live-affiliate', status: 'approved' });
  writeTool(projectDir, 'configured-tool', { title: 'Configured Tool', link: 'https://example.com/configured-affiliate', status: 'none' });
  writeTool(projectDir, 'competitor-tool', { title: 'Competitor Tool' });
  return projectDir;
}

function runAudit(projectDir) {
  return spawnSync(process.execPath, [
    join(process.cwd(), 'scripts', 'audit-affiliate-conversion-pages.mjs'),
    '--strict',
    '--json',
  ], {
    cwd: projectDir,
    env: { ...process.env, AIPEDIA_CURRENT_DATE: '2026-06-27' },
    encoding: 'utf8',
  });
}

test('affiliate conversion audit accepts a fully declared money guide', () => {
  const projectDir = makeProject();
  try {
    writeGuide(projectDir, 'best-live-tool');
    const result = runAudit(projectDir);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.money_guides, 1);
    assert.equal(report.errors, 0);
    assert.equal(report.warnings, 0);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('affiliate conversion audit fails typo-only affiliate_tools declarations', () => {
  const projectDir = makeProject();
  try {
    writeGuide(projectDir, 'typo-affiliate-tool', {
      monetization_disclosure_required: false,
      affiliate_tools: ['typo-affiliate-slug'],
      commercial_tools: [],
      configured_affiliate_tools: [],
    });
    const result = runAudit(projectDir);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((issue) => issue.code === 'unknown-affiliate-tool'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('affiliate conversion audit keeps configured-not-live tools out of commercial_tools', () => {
  const projectDir = makeProject();
  try {
    writeGuide(projectDir, 'configured-commercial-tool', {
      affiliate_tools: ['configured-tool'],
      commercial_tools: ['configured-tool'],
      configured_affiliate_tools: ['configured-tool'],
      primary_tool: 'configured-tool',
      guide_picks: {
        best_overall: {
          tool: 'configured-tool',
          label: 'Best overall',
          plan: 'Pro',
          reason: 'Best fit for this buyer job.',
          sources: [{ label: 'Configured tool pricing', url: 'https://example.com/configured-pricing' }],
        },
      },
    });
    const result = runAudit(projectDir);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((issue) => issue.code === 'commercial-tool-not-live'));
    assert.ok(report.issues.some((issue) => issue.code === 'configured-tool-marked-commercial'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('affiliate conversion audit requires a meaningful cta_plan', () => {
  const projectDir = makeProject();
  try {
    writeGuide(projectDir, 'empty-cta-plan', {
      cta_plan: {},
    });
    const result = runAudit(projectDir);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((issue) => issue.code === 'incomplete-cta-plan'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('affiliate conversion audit warns on reused unique angles for near-duplicate money pages', () => {
  const projectDir = makeProject();
  try {
    writeGuide(projectDir, 'best-live-tool-one', {
      unique_angle: 'Same generic angle.',
    });
    writeGuide(projectDir, 'best-live-tool-two', {
      title: 'Best Live Tool Two',
      unique_angle: 'Same generic angle.',
    });
    const result = runAudit(projectDir);
    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((issue) => issue.code === 'near-duplicate-angle-reused'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});
