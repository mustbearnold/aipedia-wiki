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
