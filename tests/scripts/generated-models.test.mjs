import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const ROOT = process.cwd();

function readSource(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function runGeneratedModelAudit(...args) {
  return spawnSync(process.execPath, ['scripts/audit-generated-models.mjs', ...args], {
    cwd: ROOT,
    encoding: 'utf8',
  });
}

function writeFixtureProject(toolFrontmatter) {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-generated-models-'));
  mkdirSync(join(projectDir, 'src/content/tools'), { recursive: true });
  mkdirSync(join(projectDir, 'src/data'), { recursive: true });
  writeFileSync(
    join(projectDir, 'src/data/source-registry.json'),
    `${JSON.stringify({ sources: [{ id: 'alpha-docs', label: 'Alpha docs', url: 'https://example.com/alpha' }] }, null, 2)}\n`,
  );
  writeFileSync(join(projectDir, 'src/data/tool-priority.json'), `${JSON.stringify({ tier1: ['alpha'], tier2: [], tier3: [] }, null, 2)}\n`);
  writeFileSync(
    join(projectDir, 'src/content/tools/alpha.md'),
    `---\n${toolFrontmatter.trim()}\n---\n# Alpha\n`,
  );
  return projectDir;
}

const VALID_TOOL_FRONTMATTER = `
type: tool
slug: alpha
title: Alpha
tagline: Alpha helps teams test generated model audits.
category: ai-test
status: active
scores:
  utility: 8
  value: 7
  moat: 6
  longevity: 8
facts:
  pricing_anchor:
    value: "$20/mo"
    source_id: alpha-docs
    source: "https://example.com/alpha"
    source_label: "Alpha docs"
best_for:
  - teams that need a valid fixture
not_best_for:
  - teams that need a broken fixture
quick_answer: Alpha is a valid generated-model audit fixture.
`;

test('ToolPageModel source defines required public contract fields', () => {
  const source = readSource('src/lib/content-models/tool-page-model.ts');
  for (const token of [
    'export interface ToolPageModel',
    'identity:',
    'scores:',
    'freshness:',
    'decision:',
    'facts:',
    'pricing:',
    'sources:',
    'cta:',
    'diagnostics:',
    'export function buildToolPageModel',
  ]) {
    assert.match(source, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('ToolPageModel distinguishes registered and inline-only provenance states', () => {
  const source = readSource('src/lib/content-models/tool-page-model.ts');
  assert.match(source, /state:\s*'registered'/);
  assert.match(source, /state:\s*'inline_only'/);
  assert.match(source, /state:\s*'unknown_id'/);
});

test('DecisionPick module defines shared pick contract', () => {
  const source = readSource('src/lib/content-models/decision-pick.ts');
  for (const token of ['export interface DecisionPick', 'source_refs:', 'verified_at:', 'confidence:', 'normalizeDecisionPick']) {
    assert.ok(source.includes(token), `missing ${token}`);
  }
});

test('content schema accepts category decision picks', () => {
  const source = readSource('src/content.config.ts');
  assert.match(source, /const decisionPick = z\.object/);
  assert.match(source, /source_refs: z\.array\(z\.string\(\)\)/);
  assert.match(source, /verified_at: z\.union\(\[z\.string\(\), z\.date\(\)\]\)/);
  assert.match(source, /decision_picks: z\.array\(decisionPick\)\.optional\(\)/);
});

test('AI coding category contains pilot decision picks', () => {
  const category = readSource('src/content/categories/ai-coding.md');
  assert.match(category, /^decision_picks:/m);
  assert.match(category, /source_refs:/);
  assert.match(category, /verified_at:/);
  assert.match(category, /^top_picks:/m);
  assert.match(category, /tool: cursor/);
  assert.match(category, /tool: github-copilot/);
  assert.match(category, /- cursor-pricing/);
  assert.match(category, /- github-copilot-plans/);
});

test('AI coding decision pick source refs are registered', () => {
  const registry = JSON.parse(readSource('src/data/source-registry.json'));
  const sourceIds = new Set(registry.sources.map((source) => source.id));

  for (const sourceId of ['cursor-pricing', 'github-copilot-plans']) {
    assert.ok(sourceIds.has(sourceId), `missing registered source ${sourceId}`);
  }
});

test('provenance source helpers expose page source states', () => {
  const source = readSource('src/lib/provenance.ts');
  for (const token of [
    'export type PageSourceUse',
    'export type PageSourceState',
    'export interface ResolvedPageSource',
    'export function resolvePageSource',
    "'registered'",
    "'inline_only'",
    "'unknown_id'",
    "'evidence_only'",
  ]) {
    assert.match(source, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('ToolLayout consumes ToolPageModel builder', () => {
  const layout = readSource('src/layouts/ToolLayout.astro');
  assert.match(layout, /buildToolPageModel/);
  assert.match(layout, /const model = buildToolPageModel\(f\)/);
  assert.match(layout, /const scores = model\.scores/);
  assert.match(layout, /const catLabel = model\.identity\.category_label/);
  assert.match(layout, /const facts = toFactListFacts\(model\.facts\)/);
  assert.match(layout, /const sources = model\.sources/);
  assert.doesNotMatch(layout, /resolveProvenanceSource/);
});

test('generated model audit supports JSON mode', () => {
  const result = runGeneratedModelAudit('--json', '--limit', '3');
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.status, 'pass');
  assert.equal(report.mode, 'audit');
  assert.ok(report.totals.tools_scanned >= 1);
  assert.ok(Array.isArray(report.provenance.unknown_source_ids));
  for (const source of report.provenance.inline_only_sources) {
    assert.match(source.path, /^src\/content\/tools\//);
  }
});

test('generated model audit fails missing Tier-1 decision fields', () => {
  const projectDir = writeFixtureProject(VALID_TOOL_FRONTMATTER.replace(/^quick_answer: .*$/m, ''));

  try {
    const result = runGeneratedModelAudit('--json', `--project-dir=${projectDir}`);
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.status, 'fail');
    assert.ok(report.decision.missing_fields.some((issue) => issue.slug === 'alpha' && issue.field === 'quick_answer'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('generated model audit fails missing required search catalog fields', () => {
  const projectDir = writeFixtureProject(VALID_TOOL_FRONTMATTER.replace(/^title: Alpha$/m, ''));

  try {
    const result = runGeneratedModelAudit('--json', `--project-dir=${projectDir}`);
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.status, 'fail');
    assert.ok(report.search_catalog.missing_fields.some((issue) => issue.slug === 'alpha' && issue.field === 'title'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('generated model audit keeps inline-only sources warning-only', () => {
  const projectDir = writeFixtureProject(VALID_TOOL_FRONTMATTER.replace(/    source_id: alpha-docs\n/, ''));

  try {
    const result = runGeneratedModelAudit('--json', `--project-dir=${projectDir}`);
    assert.equal(result.status, 0, result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.status, 'pass');
    assert.ok(report.provenance.inline_only_sources.some((issue) => issue.slug === 'alpha'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('generated model audit fails unknown registered source ids', () => {
  const projectDir = writeFixtureProject(VALID_TOOL_FRONTMATTER.replace(/    source_id: alpha-docs/, '    source_id: missing-docs'));

  try {
    const result = runGeneratedModelAudit('--json', `--project-dir=${projectDir}`);
    assert.equal(result.status, 1, result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.status, 'fail');
    assert.ok(report.provenance.unknown_source_ids.some((issue) => issue.slug === 'alpha' && issue.source_id === 'missing-docs'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('generated model audit rejects invalid arguments', () => {
  const result = spawnSync('node', ['scripts/audit-generated-models.mjs', '--bad'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr || result.stdout, /unknown flag --bad/);
});

test('package exposes generated model audit command', () => {
  const pkg = JSON.parse(readSource('package.json'));
  assert.equal(pkg.scripts['audit:generated-models'], 'node scripts/audit-generated-models.mjs');
});
