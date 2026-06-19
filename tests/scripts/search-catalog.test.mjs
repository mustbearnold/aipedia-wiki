import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { build as bundleModule } from 'esbuild';

const source = readFileSync('src/lib/search-catalog.ts', 'utf8');
const expectedKinds = ['tool', 'compare', 'guide', 'answer', 'workflow', 'trend', 'news', 'category', 'company'];
let catalogModulePromise;

async function loadSearchCatalog() {
  if (!catalogModulePromise) {
    catalogModulePromise = bundleModule({
      entryPoints: ['src/lib/search-catalog.ts'],
      bundle: true,
      format: 'esm',
      platform: 'node',
      write: false,
      loader: { '.json': 'json' },
    }).then((bundled) => {
      const code = bundled.outputFiles[0].text;
      return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
    });
  }
  return catalogModulePromise;
}

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

test('buildSearchCatalog filters inactive tools and preserves buyer search terms', async () => {
  const { buildSearchCatalog, isCatalogActiveTool } = await loadSearchCatalog();
  const activeTool = {
    id: 'cursor',
    data: {
      type: 'tool',
      status: 'active',
      slug: 'cursor',
      title: 'Cursor',
      company: 'Anysphere',
      category: 'ai-coding',
      secondary_categories: ['developer-tools'],
      tagline: 'Agentic coding editor',
      meta_description: 'AI coding IDE',
      price_range: '$20/mo',
      tags: ['ide', 'agentic'],
      best_for: ['multi-file refactors'],
      scores: { utility: 9, value: 8, moat: 7, longevity: 8 },
    },
  };
  const inactiveTool = {
    id: 'retired-tool',
    data: {
      type: 'tool',
      status: 'dead',
      slug: 'retired-tool',
      title: 'Retired Tool',
      category: 'ai-coding',
      scores: { utility: 10 },
    },
  };

  assert.equal(isCatalogActiveTool(activeTool), true);
  assert.equal(isCatalogActiveTool(inactiveTool), false);

  const catalog = buildSearchCatalog({
    tools: [activeTool, inactiveTool],
    comparisons: [],
    categories: [],
    guides: [],
    news: [],
    workflows: [],
    trends: [],
    companies: [],
    logos: { cursor: '/logos/tools/cursor.png' },
  });
  const tool = catalog.find((item) => item.kind === 'tool' && item.slug === 'cursor');

  assert.ok(tool, 'active tool should be included');
  assert.equal(catalog.some((item) => item.slug === 'retired-tool'), false);
  assert.equal(tool.href, '/tools/cursor/');
  assert.equal(tool.logo, '/logos/tools/cursor.png');
  assert.equal(tool.categorySlug, 'ai-coding');
  assert.equal(tool.toolSlug, 'cursor');
  assert.ok(tool.priority > 90);
  assert.match(tool.search, /anysphere/);
  assert.match(tool.search, /ai-coding/);
  assert.match(tool.search, /developer-tools/);
  assert.match(tool.search, /multi-file/);

  for (const field of ['kind', 'kindLabel', 'slug', 'title', 'href', 'detail', 'meta', 'badge', 'priority', 'search']) {
    assert.notEqual(tool[field], undefined, `${field} should be present`);
  }
});
