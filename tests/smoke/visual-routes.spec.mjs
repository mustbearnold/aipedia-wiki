import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/tools/chatgpt/',
  '/tools/claude/',
  '/compare/chatgpt-vs-claude/',
  '/tools/',
  '/search/',
];

for (const route of routes) {
  test(`route renders without obvious breakage: ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1
    );
    expect(overflow).toBe(false);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });
}

test('homepage lead mover shows its rank as text', async ({ page }) => {
  await page.goto('/');

  const rank = page.locator('.p3-mover-lead .p3-mover-rank');
  await expect(rank).toHaveCount(1);
  await expect(rank).toHaveText('1');

  const rankPaint = await rank.evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      backgroundClip: style.backgroundClip,
      webkitBackgroundClip: style.webkitBackgroundClip,
      webkitTextFillColor: style.webkitTextFillColor,
    };
  });

  expect(
    [rankPaint.backgroundClip, rankPaint.webkitBackgroundClip].includes('text')
  ).toBe(true);
  expect(rankPaint.webkitTextFillColor).toBe('rgba(0, 0, 0, 0)');
});

test('compare featured cards use the cyan catalog palette', async ({ page }) => {
  await page.goto('/compare/');

  const featuredCards = page.locator('.compare-featured-grid .compare-card');
  await expect(featuredCards).toHaveCount(6);

  const cardPaint = await featuredCards.first().evaluate((node) => {
    const style = window.getComputedStyle(node);
    return {
      borderColor: style.borderColor,
      backgroundImage: style.backgroundImage,
    };
  });

  expect(cardPaint.borderColor).not.toContain('167, 139, 250');
  expect(cardPaint.backgroundImage).not.toContain('167, 139, 250');
  expect(cardPaint.backgroundImage).toMatch(/34, 211, 238|94, 234, 212/);
});

test('tool finder matches the static catalog without an AI API call', async ({ page }) => {
  const apiRequests = [];
  page.on('request', (request) => {
    if (request.url().includes('/api/tool-finder')) apiRequests.push(request.url());
  });

  await page.goto('/tool-finder/');
  await expect(page.locator('.finder-note')).toContainText('No AI model');

  await page.locator('[data-finder-query]').fill('I need a coding tool for TypeScript, VS Code, and pull request reviews.');
  await page.locator('[data-finder-submit]').click();

  await expect(page.locator('.finder-result')).not.toHaveCount(0);
  await expect(page.locator('[data-finder-meta]')).toContainText('catalog match');
  expect(apiRequests).toEqual([]);
});
