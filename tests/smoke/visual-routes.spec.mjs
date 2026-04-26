import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/tools/chatgpt/',
  '/tools/claude/',
  '/compare/chatgpt-vs-claude/',
  '/tools/',
  '/search/',
  '/trends/',
  '/about/',
  '/about/editorial/',
  '/about/scoring/',
  '/media-kit/',
  '/glossary/',
  '/dead/',
  '/stack-builder/?roles=solo-founder%2Ccontent-creator%2Cdeveloper',
];

const mobileRoutes = [
  '/stack-builder/?roles=solo-founder%2Ccontent-creator%2Cdeveloper',
  '/trends/',
  '/about/',
  '/about/editorial/',
  '/about/scoring/',
  '/media-kit/',
  '/glossary/',
  '/dead/',
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

test.describe('mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true });

  for (const route of mobileRoutes) {
    test(`route has no horizontal overflow on mobile: ${route}`, async ({ page }) => {
      await page.goto(route);

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflowing = [];
        const maxRight = doc.clientWidth + 1;

        for (const el of document.querySelectorAll('body *')) {
          const style = getComputedStyle(el);
          if (style.position === 'fixed') continue;

          const rect = el.getBoundingClientRect();
          if (rect.width <= 0 || rect.height <= 0 || rect.right <= maxRight) continue;

          overflowing.push({
            tag: el.tagName,
            className: typeof el.className === 'string' ? el.className : '',
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          });

          if (overflowing.length >= 5) break;
        }

        return {
          scrollWidth: doc.scrollWidth,
          clientWidth: doc.clientWidth,
          overflowing,
        };
      });

      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
      expect(overflow.overflowing).toEqual([]);
    });
  }
});

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

test('stack builder shows selected roles before budget is chosen', async ({ page }) => {
  await page.goto('/stack-builder/?roles=solo-founder%2Ccontent-creator%2Cdeveloper');

  const placeholder = page.locator('#stack-placeholder');
  await expect(placeholder).toBeVisible();
  await expect(placeholder).toContainText('Solo Founder');
  await expect(placeholder).toContainText('Content Creator');
  await expect(placeholder).toContainText('Developer');
  await expect(placeholder).toContainText('Choose a budget');
});

test('trends index has expanded beyond the seed report set', async ({ page }) => {
  await page.goto('/trends/');

  await expect(page.locator('[data-trend-card]')).toHaveCount(12);
});

for (const route of ['/about/', '/about/editorial/', '/about/scoring/', '/media-kit/', '/glossary/', '/dead/']) {
  test(`reference page uses refreshed home-adjacent surface: ${route}`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('[data-refresh-surface="home-adjacent"]').first()).toBeVisible();
    await expect(page.locator('.ref-hero-card').first()).toBeVisible();
  });
}
