import { expect, test } from '@playwright/test';

async function expectJson(response, expectedStatus = 200) {
  expect(response.status()).toBe(expectedStatus);
  expect(response.headers()['content-type']).toContain('application/json');
  return response.json();
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
