import assert from 'node:assert/strict';
import test from 'node:test';
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
