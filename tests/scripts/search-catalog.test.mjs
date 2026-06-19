import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync('src/lib/search-catalog.ts', 'utf8');
const expectedKinds = ['tool', 'compare', 'guide', 'answer', 'workflow', 'trend', 'news', 'category', 'company'];

test('search catalog exports the canonical pure contract', () => {
  assert.match(source, /export type SearchKind\s*=/);
  assert.match(source, /export interface SearchCatalogItem/);
  assert.match(source, /export function isCatalogActiveTool\(/);
  assert.match(source, /export function buildSearchCatalog\(/);
  assert.doesNotMatch(source, /astro:content|getCollection\(/, 'catalog module must stay pure and route-independent');

  for (const field of ['kindLabel:', 'slug:', 'title:', 'href:', 'detail:', 'meta:', 'badge:', 'priority:', 'search:']) {
    assert.ok(source.includes(field), `SearchCatalogItem should expose ${field}`);
  }
});

test('search catalog declares every lowercase result kind exactly once in the public union', () => {
  const union = source.match(/export type SearchKind\s*=([\s\S]*?);/)?.[1] ?? '';
  const actualKinds = [...union.matchAll(/'([^']+)'/g)].map((match) => match[1]);

  assert.deepEqual(actualKinds, expectedKinds);
});

test('search catalog shapes every home search result family', () => {
  for (const kind of expectedKinds) {
    assert.match(source, new RegExp(`kind:\\s*'${kind}'`), `${kind} items should be shaped by buildSearchCatalog`);
  }

  for (const href of ['/tools/${slug}/', '/compare/${slug}/', '/guides/${slug}/', '/answers/${answer.slug}/', '/workflows/${slug}/', '/trends/${slug}/', '/news/${slug}/', '/categories/${slug}/', '/companies/${slug}/']) {
    assert.ok(source.includes(`href: \`${href}\``), `${href} should remain part of the catalog contract`);
  }

  assert.match(source, /guide\.data\.noindex\s*!==\s*true/, 'noindex guides should stay out of the catalog');
  assert.match(source, /filter\(isCatalogActiveTool\)/, 'tool filtering should use the exported active-tool predicate');
});
