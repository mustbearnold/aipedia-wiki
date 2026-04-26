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
