import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const SCRIPT_PATH = join(process.cwd(), 'scripts', 'affiliate-conversion-plan.mjs');

function writeTool(projectDir, slug, { title = slug, link = null, status = null, category = 'ai-automation' } = {}) {
  const toolDir = join(projectDir, 'src', 'content', 'tools');
  mkdirSync(toolDir, { recursive: true });
  const affiliateBlock = link
    ? [
        'affiliate:',
        '  has_program: true',
        `  link: "${link}"`,
        `  application_status: ${status ?? 'none'}`,
        '  network: PartnerStack',
      ].join('\n')
    : '';
  writeFileSync(join(toolDir, `${slug}.md`), [
    '---',
    'type: tool',
    `slug: ${slug}`,
    `title: "${title}"`,
    `category: ${category}`,
    'scores:',
    '  utility: 8',
    '  value: 8',
    '  moat: 8',
    '  longevity: 8',
    affiliateBlock,
    '---',
    '',
  ].filter(Boolean).join('\n'));
}

function writeGuide(projectDir, slug, { toolsMentioned = [], pickTool = '' } = {}) {
  const guideDir = join(projectDir, 'src', 'content', 'use-cases');
  mkdirSync(guideDir, { recursive: true });
  const tools = toolsMentioned.map((tool) => `  - ${tool}`).join('\n');
  const pick = pickTool
    ? [
        'guide_picks:',
        '  best_overall:',
        `    tool: ${pickTool}`,
        '    label: Best overall',
      ].join('\n')
    : 'guide_picks: {}';
  writeFileSync(join(guideDir, `${slug}.md`), [
    '---',
    `slug: ${slug}`,
    `title: "${slug}"`,
    'tools_mentioned:',
    tools || '  []',
    pick,
    '---',
    '',
  ].join('\n'));
}

function makeProject() {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-affiliate-plan-'));
  mkdirSync(join(projectDir, 'src', 'content', 'tools'), { recursive: true });
  mkdirSync(join(projectDir, 'src', 'content', 'use-cases'), { recursive: true });
  writeTool(projectDir, 'alpha-tool', { title: 'Alpha Tool', link: 'https://example.com/alpha', status: 'approved' });
  writeTool(projectDir, 'beta-tool', { title: 'Beta Tool', link: 'https://example.com/beta', status: 'none' });
  writeTool(projectDir, 'plain-tool', { title: 'Plain Tool' });
  writeGuide(projectDir, 'best-alpha-tool', { toolsMentioned: ['alpha-tool'], pickTool: 'alpha-tool' });
  return projectDir;
}

function runPlan(projectDir, extraArgs = []) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...extraArgs], {
    cwd: projectDir,
    encoding: 'utf8',
    env: { ...process.env, AIPEDIA_CURRENT_DATE: '2026-06-27' },
  });
}

test('affiliate conversion planner emits schema-first clusters from inventory data', () => {
  const projectDir = makeProject();
  try {
    const result = runPlan(projectDir, ['--limit', '2', '--max-workers', '2', '--clusters-per-worker', '1', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const plan = JSON.parse(result.stdout);

    assert.equal(plan.schema_version, 1);
    assert.equal(plan.workflow, 'affiliate-conversion-planning');
    assert.equal(plan.current_date, '2026-06-27');
    assert.equal(plan.inventory_summary.affiliate_link_tools, 2);
    assert.equal(plan.inventory_summary.live_affiliate_tools, 1);
    assert.equal(plan.inventory_summary.configured_not_live_tools, 1);
    assert.equal(plan.clusters.length, 2);
    assert.equal(plan.agent_briefs.worker_briefs.length, 2);
    assert.ok(plan.clusters.some((cluster) => cluster.primary_tool === 'alpha-tool'));
    assert.ok(plan.clusters.some((cluster) => cluster.primary_tool === 'beta-tool'));
    assert.ok(plan.clusters.every((cluster) => cluster.recommended_worker_id.startsWith('affiliate-worker-')));
    assert.ok(plan.clusters.every((cluster) => cluster.required_sources.some((source) => source.kind === 'pricing')));
    assert.ok(plan.commands.cheap_gates.includes('npm run affiliate:conversion:inventory -- --json'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('affiliate conversion planner writes worker prompts and report scaffolds', () => {
  const projectDir = makeProject();
  try {
    const out = join(projectDir, 'local', 'tmp', 'affiliate-plan.json');
    const workerDir = join(projectDir, 'local', 'tmp', 'workers');
    const reportDir = join(projectDir, 'local', 'tmp', 'reports');
    const result = runPlan(projectDir, [
      '--limit',
      '2',
      '--max-workers',
      '2',
      '--clusters-per-worker',
      '1',
      '--out',
      out,
      '--worker-dir',
      workerDir,
      '--report-dir',
      reportDir,
      '--write-agent-prompts',
      '--write-report-scaffolds',
      '--json',
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const plan = JSON.parse(readFileSync(out, 'utf8'));
    const firstWorker = plan.agent_briefs.worker_briefs[0];
    const promptPath = join(workerDir, `${firstWorker.id}.md`);
    const reportPath = join(reportDir, `${firstWorker.id}.json`);

    assert.ok(existsSync(promptPath));
    assert.ok(existsSync(join(workerDir, 'integrator.md')));
    assert.ok(existsSync(reportPath));
    const prompt = readFileSync(promptPath, 'utf8');
    assert.match(prompt, /This MVP is planning-only/);
    assert.match(prompt, /Do not edit:/);
    assert.match(prompt, /PAGE_REFRESH_LEDGER\.md/);
    assert.match(prompt, /src\/data\/source-registry\.json/);

    const report = JSON.parse(readFileSync(reportPath, 'utf8'));
    assert.equal(report.worker_id, firstWorker.id);
    assert.ok(Array.isArray(report.clusters));
    assert.ok(report.clusters[0].claim_receipts);
    assert.ok(report.clusters[0].duplicate_intent_notes);
    assert.ok(report.clusters[0].parent_surface_notes);
    assert.ok(report.clusters[0].commercial_cta_notes);
    assert.ok(report.clusters[0].checks);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});
