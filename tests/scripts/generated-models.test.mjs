import assert from 'node:assert/strict';
import test from 'node:test';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();

function readSource(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

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
  assert.match(layout, /const facts = model\.facts/);
  assert.match(layout, /const sources = model\.sources/);
  assert.doesNotMatch(layout, /resolveProvenanceSource/);
});

test('generated model audit supports JSON mode', () => {
  const result = spawnSync('node', ['scripts/audit-generated-models.mjs', '--json', '--limit', '3'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'audit');
  assert.ok(report.totals.tools_scanned >= 1);
  assert.ok(Array.isArray(report.provenance.unknown_source_ids));
  for (const source of report.provenance.inline_only_sources) {
    assert.match(source.path, /^src\/content\/tools\//);
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
