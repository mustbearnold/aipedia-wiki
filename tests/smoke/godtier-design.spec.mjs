/**
 * God-tier design smoke test.
 *
 * Asserts the design system invariants that mobile-first tool / category /
 * comparison / company / guide / homepage pages must uphold (May 2026+).
 */
import { expect, test } from '@playwright/test';

const MOBILE = { width: 375, height: 812 };

const routes = [
  { path: '/',                                                 type: 'home' },
  { path: '/tools/claude-code/',                               type: 'tool' },
  { path: '/tools/cursor/',                                    type: 'tool' },
  { path: '/tools/chatgpt/',                                   type: 'tool' },
  { path: '/categories/ai-coding/',                            type: 'category' },
  { path: '/categories/',                                      type: 'category-index' },
  { path: '/compare/cursor-vs-claude-code-vs-copilot/',        type: 'comparison' },
  { path: '/compare/',                                         type: 'compare-index' },
  { path: '/companies/anthropic/',                             type: 'company' },
  { path: '/guides/best-ai-video-generator/',                  type: 'guide' },
  { path: '/guides/',                                          type: 'guide-index' },
];

for (const { path, type } of routes) {
  test(`${type} page renders god-tier system: ${path}`, async ({ page }) => {
    await page.setViewportSize(MOBILE);
    await page.goto(path, { waitUntil: 'domcontentloaded' });

    // Every god-tier page must have the canvas
    await expect(page.locator('.gt-canvas')).toBeVisible();

    // Title must be visible above the fold (within first 700px)
    const title = page.locator('h1.gt-title').first();
    await expect(title).toBeVisible();
    const titleBox = await title.boundingBox();
    expect(titleBox && titleBox.y).toBeLessThan(700);

    // No horizontal overflow at mobile viewport
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);

    // Trust language: either "no paid placements" or "affiliate" disclosure shows
    const bodyText = await page.locator('body').innerText();
    expect(
      /no paid placements|affiliate/i.test(bodyText),
      `${path} must surface trust disclosure language`
    ).toBe(true);
  });
}

test('tool page sticky CTA appears after scroll and stays solid', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto('/tools/claude-code/', { waitUntil: 'domcontentloaded' });

  // Sticky CTA exists but is hidden initially
  const sticky = page.locator('#gt-sticky');
  await expect(sticky).toBeAttached();

  // Scroll past the hero card
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);

  // After scrolling, sticky should be visible
  await expect(sticky).toHaveClass(/is-visible/);

  // Background must be opaque (no rgba with alpha < 1)
  const bg = await sticky.evaluate((el) => getComputedStyle(el).backgroundColor);
  expect(bg).not.toMatch(/rgba?\([^)]*,\s*0?\.\d+\)/);
});

test('tool page hero has score + primary CTA above the fold on mobile', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto('/tools/claude-code/', { waitUntil: 'domcontentloaded' });

  // Score must be visible above the fold
  const score = page.locator('.gt-card-score-num').first();
  await expect(score).toBeVisible();
  const scoreBox = await score.boundingBox();
  expect(scoreBox && scoreBox.y).toBeLessThan(MOBILE.height);

  // Primary CTA must be visible above the fold
  const primary = page.locator('.gt-btn-primary').first();
  await expect(primary).toBeVisible();
  const primaryBox = await primary.boundingBox();
  expect(primaryBox && primaryBox.y).toBeLessThan(MOBILE.height);

  // Primary CTA must be tappable (≥44px height)
  expect(primaryBox && primaryBox.height).toBeGreaterThanOrEqual(44);
});

test('tool page facts surface confidence and verified date', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto('/tools/claude-code/', { waitUntil: 'domcontentloaded' });

  const factList = page.locator('.gt-fact-list');
  await expect(factList).toBeVisible();

  // At least one fact pill (confidence)
  await expect(page.locator('.gt-fact-pill').first()).toBeVisible();

  // At least one verified-date inline (ISO-style)
  const verifiedText = await page.locator('.gt-fact-verified').first().innerText();
  expect(verifiedText).toMatch(/\d{4}-\d{2}-\d{2}/);
});

test('homepage above-the-fold has search and decision card', async ({ page }) => {
  await page.setViewportSize(MOBILE);
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.locator('.gt-card').first()).toBeVisible();
  await expect(page.locator('.gt-search')).toBeVisible();
  await expect(page.locator('input[type="search"]')).toBeVisible();
});
