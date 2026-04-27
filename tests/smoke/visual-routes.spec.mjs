import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

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

const paletteRoutes = [
  '/',
  '/compare/',
  '/trends/',
  '/about/',
  '/about/editorial/',
  '/about/scoring/',
  '/media-kit/',
  '/glossary/',
  '/dead/',
  '/stack-builder/?roles=solo-founder%2Ccontent-creator%2Cdeveloper',
];

const allowedPalette = [
  '#05060d',
  '#05070d',
  '#070811',
  '#080d18',
  '#0b1020',
  '#0b1324',
  '#0d121f',
  '#111827',
  '#1e293b',
  '#334155',
  '#475569',
  '#64748b',
  '#94a3b8',
  '#cbd5e1',
  '#e2e8f0',
  '#e6edf7',
  '#eef3f8',
  '#f1f5f9',
  '#f6f8fb',
  '#f8fafc',
  '#ffffff',
  '#22d3ee',
  '#38bdf8',
  '#67e8f9',
  '#5eead4',
  '#99f6e4',
];

const bannedDecorativeColorPatterns = [
  /#(?:a78bfa|c4b5fd|7c3aed|6d28d9|8b5cf6|c084fc|f472b6|fb923c|fca5a5|fbbf24|fb7185|be123c|b45309|a16207|0f766e|047857|86efac|93c5fd|60a5fa|34d399)\b/i,
  /(?:rgba?\(\s*)?(?:167\s*,\s*139\s*,\s*250|196\s*,\s*181\s*,\s*253|124\s*,\s*58\s*,\s*237|139\s*,\s*92\s*,\s*246|192\s*,\s*132\s*,\s*252|244\s*,\s*114\s*,\s*182|251\s*,\s*146\s*,\s*60|252\s*,\s*165\s*,\s*165|251\s*,\s*191\s*,\s*36|251\s*,\s*113\s*,\s*133|20\s*,\s*184\s*,\s*166|14\s*,\s*165\s*,\s*233|147\s*,\s*197\s*,\s*253|96\s*,\s*165\s*,\s*250|52\s*,\s*211\s*,\s*153)/i,
  /\b(?:violet|purple|pink|orange|amber|yellow|green|emerald|lime|rose|red)\b/i,
];

const colorSourceExtensions = new Set(['.astro', '.css', '.mjs', '.js', '.ts']);
const colorSourceRoots = ['src/components', 'src/layouts', 'src/pages', 'src/styles'];

function collectColorSourceFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectColorSourceFiles(file));
    } else if (colorSourceExtensions.has(extname(entry.name))) {
      files.push(file);
    }
  }
  return files;
}

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

test('homepage rotating cover card keeps warm orange accents out of the corner glow', async ({ page }) => {
  await page.goto('/');

  const warmAccents = await page.locator('#p3-cover-slides').evaluate((node) => {
    const hexToHue = (hex) => {
      const raw = String(hex || '').replace('#', '');
      if (!/^[0-9a-f]{6}$/i.test(raw)) return null;

      const r = parseInt(raw.slice(0, 2), 16) / 255;
      const g = parseInt(raw.slice(2, 4), 16) / 255;
      const b = parseInt(raw.slice(4, 6), 16) / 255;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;
      if (!delta) return 0;

      let hue = 0;
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      return Math.round((hue * 60 + 360) % 360);
    };

    const slides = JSON.parse(node.textContent || '[]');
    return slides
      .flatMap((slide) => [slide.colorA, slide.colorB].map((color) => ({ title: slide.title, color, hue: hexToHue(color) })))
      .filter(({ hue }) => hue !== null && (hue <= 65 || hue >= 350));
  });

  expect(warmAccents).toEqual([]);
});

test('source styles stay inside the Signal Cyan palette', () => {
  const violations = [];
  for (const root of colorSourceRoots) {
    for (const file of collectColorSourceFiles(root)) {
      const text = readFileSync(file, 'utf8');
      for (const pattern of bannedDecorativeColorPatterns) {
        const match = text.match(pattern);
        if (match) {
          violations.push(`${file}: ${match[0]}`);
        }
      }
    }
  }

  expect(violations).toEqual([]);
});

test('brand logo raster stays inside the Signal Cyan palette', async () => {
  const { data, info } = await sharp('public/brand/aipedia-logo-crystal-cyan-512.png')
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const violations = [];
  for (let i = 0; i < data.length; i += info.channels) {
    const alpha = data[i + 3] / 255;
    if (alpha < 0.2) continue;

    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const delta = max - min;
    if (max < 0.16 || delta < 0.04) continue;

    const nr = r / 255;
    const ng = g / 255;
    const nb = b / 255;
    let hue = 0;
    if (max === nr) hue = ((ng - nb) / delta) % 6;
    else if (max === ng) hue = (nb - nr) / delta + 2;
    else hue = (nr - ng) / delta + 4;
    hue = (hue * 60 + 360) % 360;
    const saturation = delta / (1 - Math.abs(max + min - 1));

    if (saturation > 0.2 && (hue < 160 || hue > 205)) {
      violations.push({ r, g, b, hue: Math.round(hue), saturation: Math.round(saturation * 100) / 100 });
      if (violations.length >= 12) break;
    }
  }

  expect(violations).toEqual([]);
});

test.describe('Signal Cyan palette', () => {
  for (const route of paletteRoutes) {
    test(`decorative surfaces avoid off-palette hues: ${route}`, async ({ page }) => {
      await page.goto(route);

      const violations = await page.evaluate((allowedHexes) => {
        const allowed = new Set(allowedHexes.map((hex) => hex.toLowerCase()));
        const hexToRgb = (hex) => {
          const raw = hex.replace('#', '');
          return {
            r: parseInt(raw.slice(0, 2), 16),
            g: parseInt(raw.slice(2, 4), 16),
            b: parseInt(raw.slice(4, 6), 16),
          };
        };
        const palette = allowedHexes.map((hex) => ({ hex, ...hexToRgb(hex) }));
        const rgbMatchesPalette = (r, g, b) => palette.some((color) => (
          Math.abs(color.r - r) <= 4 && Math.abs(color.g - g) <= 4 && Math.abs(color.b - b) <= 4
        ));
        const bannedHue = (r, g, b) => {
          const max = Math.max(r, g, b) / 255;
          const min = Math.min(r, g, b) / 255;
          const delta = max - min;
          if (max < 0.16) return false;
          if (delta < 0.04) return false;
          let hue = 0;
          const nr = r / 255;
          const ng = g / 255;
          const nb = b / 255;
          if (max === nr) hue = ((ng - nb) / delta) % 6;
          else if (max === ng) hue = (nb - nr) / delta + 2;
          else hue = (nr - ng) / delta + 4;
          hue = (hue * 60 + 360) % 360;
          const saturation = delta / (1 - Math.abs(max + min - 1));
          return saturation > 0.2 && (hue < 160 || hue > 205);
        };

        const found = [];
        const colorPattern = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([0-9.]+))?\)/g;
        const props = ['color', 'backgroundColor', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'outlineColor'];
        for (const el of document.querySelectorAll('main *')) {
          if (found.length >= 20) break;
          const style = getComputedStyle(el);
          for (const prop of props) {
            const value = style[prop];
            colorPattern.lastIndex = 0;
            let match;
            while ((match = colorPattern.exec(value))) {
              const alpha = match[4] === undefined ? 1 : Number(match[4]);
              if (alpha < 0.2) continue;
              const r = Number(match[1]);
              const g = Number(match[2]);
              const b = Number(match[3]);
              if (rgbMatchesPalette(r, g, b) || !bannedHue(r, g, b)) continue;
              found.push({
                tag: el.tagName,
                className: typeof el.className === 'string' ? el.className : '',
                prop,
                value,
              });
              break;
            }
          }
        }
        return found;
      }, allowedPalette);

      expect(violations).toEqual([]);
    });
  }
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

test('tool finder is retired in favor of catalog search', async ({ page }) => {
  await page.goto('/tool-finder/');
  await expect(page).toHaveURL(/\/search\/$/);
  await expect(page.locator('h1')).toContainText('Search');

  await page.goto('/');
  await expect(page.locator('#site-nav a[href="/tool-finder/"]')).toHaveCount(0);
});

test('search page shows the full catalog and filters it in place', async ({ page }) => {
  await page.goto('/search/');

  await expect(page.locator('.search-index-control.p3-search.p3-search-btn')).toBeVisible();
  const totalCards = await page.locator('[data-tool-card]').count();
  expect(totalCards).toBeGreaterThan(200);
  await expect(page.locator('[data-visible-count]').first()).toHaveText(String(totalCards));

  await page.locator('[data-tool-search]').fill('claude');
  const visibleCards = await page.locator('[data-tool-card]:visible').count();
  expect(visibleCards).toBeGreaterThan(0);
  expect(visibleCards).toBeLessThan(totalCards);
  await expect(page.locator('[data-tool-card]:visible').first()).toContainText(/Claude/i);
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

for (const route of ['/about/editorial/', '/about/scoring/', '/media-kit/']) {
  test(`article reference rail aligns with editorial ledger: ${route}`, async ({ page }) => {
    await page.goto(route);

    const alignment = await page.evaluate(() => {
      const ledger = document.querySelector('.ref-hero-ledger')?.getBoundingClientRect();
      const rail = document.querySelector('.ref-side-rail')?.getBoundingClientRect();
      if (!ledger || !rail) return null;
      return {
        leftDelta: Math.abs(ledger.left - rail.left),
        rightDelta: Math.abs(ledger.right - rail.right),
        widthDelta: Math.abs(ledger.width - rail.width),
      };
    });

    expect(alignment).not.toBeNull();
    expect(alignment.leftDelta).toBeLessThanOrEqual(1);
    expect(alignment.rightDelta).toBeLessThanOrEqual(1);
    expect(alignment.widthDelta).toBeLessThanOrEqual(1);
  });
}
