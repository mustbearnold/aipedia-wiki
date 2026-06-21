import { expect, test } from '@playwright/test';

async function expectJson(response, expectedStatus = 200) {
  expect(response.status()).toBe(expectedStatus);
  expect(response.headers()['content-type']).toContain('application/json');
  return response.json();
}

function assertCatalogItem(item) {
  for (const field of ['kind', 'kindLabel', 'slug', 'title', 'href', 'detail', 'meta', 'badge', 'priority', 'search']) {
    expect(item, `catalog item missing ${field}`).toHaveProperty(field);
  }
  expect(typeof item.href).toBe('string');
  expect(item.href.startsWith('/')).toBe(true);
}

test('tools API returns a populated, sorted tool index', async ({ request }) => {
  const data = await expectJson(await request.get('/api/tools.json'));

  expect(data.count).toBeGreaterThan(100);
  expect(Array.isArray(data.tools)).toBe(true);
  expect(data.tools.length).toBe(data.count);

  const first = data.tools[0];
  expect(first).toMatchObject({
    slug: expect.any(String),
    title: expect.any(String),
    scores: expect.objectContaining({ overall: expect.any(Number) }),
    page_url: expect.stringMatching(/^https:\/\/aipedia\.wiki\/tools\//),
  });

  for (let i = 1; i < Math.min(data.tools.length, 25); i += 1) {
    expect(data.tools[i - 1].scores.overall).toBeGreaterThanOrEqual(data.tools[i].scores.overall);
  }
});

test('search tools API returns active tools only in compact shape', async ({ request }) => {
  const data = await expectJson(await request.get('/api/search-tools.json'));

  expect(data.count).toBeGreaterThan(100);
  expect(Array.isArray(data.tools)).toBe(true);
  expect(data.tools.length).toBe(data.count);

  const chatgpt = data.tools.find((tool) => tool.slug === 'chatgpt');
  expect(chatgpt).toMatchObject({
    title: expect.stringMatching(/ChatGPT/i),
    url: '/tools/chatgpt/',
  });

  for (const tool of data.tools.slice(0, 25)) {
    expect(Object.keys(tool).sort()).toEqual(['category', 'price', 'slug', 'tagline', 'title', 'url']);
  }
});

test('home search API returns populated catalog JSON', async ({ request }) => {
  const data = await expectJson(await request.get('/api/home-search.json'));

  expect(data.count).toBeGreaterThan(100);
  expect(Array.isArray(data.items)).toBe(true);
  expect(data.items.length).toBe(data.count);

  const kinds = new Set(data.items.map((item) => item.kind));
  expect(kinds.has('tool')).toBe(true);
  expect(kinds.has('compare')).toBe(true);

  const chatgpt = data.items.find((item) => item.kind === 'tool' && item.href === '/tools/chatgpt/');
  expect(chatgpt).toMatchObject({
    kind: 'tool',
    kindLabel: 'Tool',
    slug: 'chatgpt',
    title: expect.stringMatching(/ChatGPT/i),
    href: '/tools/chatgpt/',
    meta: expect.any(String),
    detail: expect.any(String),
    badge: expect.any(String),
    priority: expect.any(Number),
    search: expect.stringMatching(/chatgpt/i),
  });

  for (const item of data.items.slice(0, 25)) {
    assertCatalogItem(item);
    expect(item.title).toEqual(expect.any(String));
    expect(item.search).toEqual(expect.any(String));
    expect(item.search.length).toBeGreaterThan(0);
  }
});

test('comparisons API returns populated comparison JSON', async ({ request }) => {
  const data = await expectJson(await request.get('/api/comparisons.json'));

  expect(data.count).toBeGreaterThan(0);
  expect(Array.isArray(data.comparisons)).toBe(true);
  expect(data.comparisons.length).toBe(data.count);

  const comparison = data.comparisons.find((item) => item.slug === 'chatgpt-vs-claude');
  expect(comparison).toMatchObject({
    slug: 'chatgpt-vs-claude',
    title: expect.any(String),
    tools: expect.arrayContaining(['chatgpt', 'claude']),
    page_url: 'https://aipedia.wiki/compare/chatgpt-vs-claude/',
    category: expect.any(String),
  });

  for (const comparison of data.comparisons.slice(0, 25)) {
    expect(Object.keys(comparison).sort()).toEqual(['category', 'last_updated', 'page_url', 'seo_title', 'slug', 'title', 'tools', 'winner']);
    expect(comparison.slug).toEqual(expect.any(String));
    expect(comparison.title).toEqual(expect.any(String));
    expect(comparison.tools.length).toBeGreaterThan(0);
    expect(comparison.page_url).toMatch(/^https:\/\/aipedia\.wiki\/compare\/.+\/$/);
  }

  for (let i = 1; i < Math.min(data.comparisons.length, 25); i += 1) {
    expect(data.comparisons[i - 1].title.localeCompare(data.comparisons[i].title)).toBeLessThanOrEqual(0);
  }
});
