import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { build as bundleModule } from 'esbuild';

const source = readFileSync('src/lib/search-catalog.ts', 'utf8');
const expectedKinds = ['tool', 'compare', 'guide', 'answer', 'workflow', 'trend', 'news', 'category', 'company'];
let catalogModulePromise;
let searchIndexModulePromise;

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

async function loadSearchIndex() {
  if (!searchIndexModulePromise) {
    searchIndexModulePromise = bundleModule({
      entryPoints: ['src/lib/search-index.ts'],
      bundle: true,
      format: 'esm',
      platform: 'node',
      write: false,
    }).then((bundled) => {
      const code = bundled.outputFiles[0].text;
      return import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`);
    });
  }
  return searchIndexModulePromise;
}

test('search catalog exports the canonical pure contract', () => {
  assert.match(source, /export type SearchKind\s*=/);
  assert.match(source, /export interface SearchCatalogItem/);
  assert.match(source, /export function isCatalogActiveTool\(/);
  assert.match(source, /export function buildSearchCatalog\(/);
  assert.doesNotMatch(source, /astro:content|getCollection\(/, 'catalog module must stay pure and route-independent');

  for (const field of ['kindLabel:', 'slug:', 'title:', 'href:', 'detail:', 'meta:', 'badge:', 'priority:', 'search:', 'buyerFit:', 'action:', 'evidence:']) {
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

  assert.equal(tool.buyerFit, 'multi-file refactors');
  assert.equal(tool.action.href, '/tools/cursor/');
  assert.equal(tool.action.label, 'Review tool record');
  assert.equal(tool.evidence.confidence, 'low');
  for (const field of ['kind', 'kindLabel', 'slug', 'title', 'href', 'detail', 'meta', 'badge', 'priority', 'search', 'buyerFit', 'action', 'evidence']) {
    assert.notEqual(tool[field], undefined, `${field} should be present`);
  }
});

test('buildSearchCatalog applies non-tool visibility and priority ordering rules', async () => {
  const { buildSearchCatalog } = await loadSearchCatalog();
  const catalog = buildSearchCatalog({
    tools: [{
      id: 'alpha-tool',
      data: {
        type: 'tool',
        status: 'active',
        slug: 'alpha-tool',
        title: 'Alpha Tool',
        category: 'ai-coding',
        scores: { utility: 9, value: 8, moat: 8, longevity: 8 },
      },
    }],
    comparisons: [{
      id: 'alpha-vs-beta',
      data: { slug: 'alpha-vs-beta', title: 'Alpha vs Beta', tools: ['alpha-tool', 'beta-tool'], winner: 'alpha-tool' },
    }],
    categories: [{
      id: 'ai-coding',
      data: {
        slug: 'ai-coding',
        title: 'AI Coding',
        description: 'Coding tools',
        tool_count: 12,
        decision_picks: [{
          tool: 'alpha-tool',
          label: 'Best coding agent',
          reason: 'Best fit for coding agent buyers.',
          source_refs: ['github-copilot-plans'],
          verified_at: '2026-06-15',
          confidence: 'high',
        }],
      },
    }],
    guides: [
      { id: 'visible-guide', data: { slug: 'visible-guide', title: 'Visible Guide', description: 'Shown guide', tools_mentioned: ['alpha-tool'] } },
      { id: 'hidden-guide', data: { slug: 'hidden-guide', title: 'Hidden Guide', description: 'Hidden guide', noindex: true } },
    ],
    news: [],
    workflows: [],
    trends: [],
    companies: [{
      id: 'alpha-inc',
      data: { slug: 'alpha-inc', title: 'Alpha Inc', company_type: 'vendor', key_products: ['Alpha Tool'], meta_description: 'Company profile' },
    }],
    logos: {},
  });

  assert.equal(catalog.some((item) => item.slug === 'hidden-guide'), false);
  assert.ok(catalog.find((item) => item.kind === 'guide' && item.slug === 'visible-guide'));
  assert.ok(catalog.find((item) => item.kind === 'compare' && item.slug === 'alpha-vs-beta'));
  const category = catalog.find((item) => item.kind === 'category' && item.categorySlug === 'ai-coding');
  assert.ok(category);
  assert.equal(category.action.label, 'Open buyer shortlist');
  assert.match(category.buyerFit, /coding agent buyers/);
  assert.equal(category.evidence.evidenceState, 'registered');
  assert.ok(catalog.find((item) => item.kind === 'company' && item.slug === 'alpha-inc'));

  for (let index = 1; index < catalog.length; index += 1) {
    const previous = catalog[index - 1];
    const current = catalog[index];
    assert.ok(
      previous.priority > current.priority || (previous.priority === current.priority && previous.title.localeCompare(current.title) <= 0),
      'catalog should sort by descending priority then title'
    );
  }
});

test('category decision source refs surface unknown ids in search evidence', async () => {
  const { buildSearchCatalog } = await loadSearchCatalog();
  const catalog = buildSearchCatalog({
    tools: [],
    comparisons: [],
    categories: [{
      id: 'ai-coding',
      data: {
        slug: 'ai-coding',
        title: 'AI Coding',
        description: 'Coding agents',
        decision_picks: [{
          tool: 'cursor',
          label: 'Best coding agent',
          reason: 'Best fit for coding agent buyers.',
          source_refs: ['missing-source-ref'],
          verified_at: '2026-06-15',
          confidence: 'high',
        }],
      },
    }],
    guides: [],
    news: [],
    workflows: [],
    trends: [],
    companies: [],
    logos: {},
  });

  const category = catalog.find((item) => item.kind === 'category' && item.slug === 'ai-coding');
  assert.ok(category);
  assert.equal(category.evidence.evidenceState, 'unknown_id');
  assert.equal(category.evidence.primaryLabel, 'missing-source-ref');
});

test('featured chatbot answer has registered source-backed evidence', async () => {
  const { buildSearchCatalog } = await loadSearchCatalog();
  const catalog = buildSearchCatalog({
    tools: [],
    comparisons: [],
    categories: [],
    guides: [],
    news: [],
    workflows: [],
    trends: [],
    companies: [],
    logos: {},
  });

  const answer = catalog.find((item) => item.kind === 'answer' && item.slug === 'best-ai-chatbot-2026');
  assert.ok(answer);
  assert.equal(answer.evidence.evidenceState, 'registered');
  assert.equal(answer.evidence.confidence, 'high');
  assert.ok(answer.evidence.sourceCount >= 3);
  assert.ok(answer.evidence.primaryUrl);
});

test('tool recommendation evidence ignores older historical price rows', async () => {
  const { buildSearchCatalog } = await loadSearchCatalog();
  const catalog = buildSearchCatalog({
    tools: [{
      id: 'cursor',
      data: {
        type: 'tool',
        status: 'active',
        slug: 'cursor',
        title: 'Cursor',
        category: 'ai-coding',
        tagline: 'AI-native code editor',
        last_updated: '2026-06-22',
        last_verified: '2026-06-22',
        scores: { utility: 9, value: 8, moat: 7, longevity: 9 },
        facts: {
          pricing_anchor: {
            value: 'Individual starts at $20/mo; Teams Standard is $40/user/mo monthly.',
            source_id: 'cursor-pricing',
            verified_at: '2026-06-22',
            volatility: 'high',
            confidence: 'high',
          },
          best_for: {
            value: 'GUI-first multi-agent coding workflows.',
            source_id: 'cursor-changelog',
            verified_at: '2026-06-22',
            volatility: 'high',
            confidence: 'high',
          },
        },
        price_history: [
          {
            date: '2026-06-22',
            price: 'Individual starts at $20/mo; Teams Standard is $40/user/mo monthly.',
            source_id: 'cursor-pricing',
            verified_at: '2026-06-22',
          },
          {
            date: '2026-04-02',
            price: 'Historical Cursor pricing snapshot.',
            source_id: 'cursor-pricing',
            verified_at: '2026-04-02',
          },
        ],
        best_for: ['GUI-first coding agents'],
        not_best_for: ['pure terminal-agent workflows'],
        quick_answer: 'Cursor is strongest for GUI-first coding agent workflows.',
      },
    }],
    comparisons: [],
    categories: [],
    guides: [],
    news: [],
    workflows: [],
    trends: [],
    companies: [],
    logos: {},
  });

  const tool = catalog.find((item) => item.kind === 'tool' && item.slug === 'cursor');
  assert.ok(tool);
  assert.equal(tool.evidence.evidenceState, 'registered');
  assert.equal(tool.evidence.freshnessState, 'current');
  assert.equal(tool.evidence.confidence, 'high');
  assert.doesNotMatch(tool.evidence.diagnostics.join('\n'), /Stale source|past its review window/);
});

test('buyer intent queries resolve through the shared search scoring contract', async () => {
  const { buildSearchCatalog } = await loadSearchCatalog();
  const { scoreSearchItem, searchItemMatches, searchTerms } = await loadSearchIndex();
  const catalog = buildSearchCatalog({
    tools: [
      {
        id: 'cursor',
        data: { type: 'tool', status: 'active', slug: 'cursor', title: 'Cursor', company: 'Anysphere', category: 'ai-coding', tagline: 'Agentic coding editor', best_for: ['coding agent workflows'], scores: { utility: 9, value: 8, moat: 8, longevity: 8 } },
      },
      {
        id: 'ollama',
        data: { type: 'tool', status: 'active', slug: 'ollama', title: 'Ollama', category: 'ai-infrastructure', tagline: 'Run local open models', best_for: ['local model testing'], scores: { utility: 8, value: 8, moat: 7, longevity: 8 } },
      },
    ],
    comparisons: [{ id: 'claude-vs-cursor', data: { slug: 'claude-vs-cursor', title: 'Claude vs Cursor', tools: ['claude', 'cursor'], winner: 'cursor', meta_description: 'Claude vs Cursor for coding agents' } }],
    categories: [
      { id: 'ai-coding', data: { slug: 'ai-coding', title: 'AI Coding', description: 'Coding agents', tool_count: 10 } },
      { id: 'ai-infrastructure', data: { slug: 'ai-infrastructure', title: 'AI Infrastructure', description: 'Local model and open model infrastructure', tool_count: 8 } },
      { id: 'ai-automation', data: { slug: 'ai-automation', title: 'AI Automation', description: 'Marketing stack and automation stack workflows', tool_count: 12 } },
    ],
    guides: [],
    news: [],
    workflows: [],
    trends: [],
    companies: [],
    logos: {},
  });

  for (const [query, slug] of [
    ['coding agent', 'ai-coding'],
    ['local model', 'ai-infrastructure'],
    ['marketing stack', 'ai-automation'],
    ['Claude vs Cursor', 'claude-vs-cursor'],
    ['Anysphere', 'cursor'],
  ]) {
    const terms = searchTerms(query);
    const normalized = terms.join(' ');
    const matches = catalog
      .map((item) => ({ item, score: scoreSearchItem(item, terms, normalized, { includeKindMatch: true }) }))
      .filter(({ item, score }) => searchItemMatches(item, terms, score, { includeKindMatch: true }))
      .sort((a, b) => b.score - a.score);
    assert.ok(matches.slice(0, 3).some(({ item }) => item.slug === slug), `${query} should rank ${slug} in the top 3`);
  }
});
