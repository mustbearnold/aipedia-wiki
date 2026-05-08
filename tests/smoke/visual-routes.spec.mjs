import { expect, test } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';
import sharp from 'sharp';

const guidePickRoutes = [
  {
    route: '/guides/best-ai-coding-assistant/',
    bestOverallSlug: 'cursor',
    plans: ['Cursor Pro', 'Copilot Free or Individual', 'Claude Max or API usage'],
    firstRankedTitle: 'Cursor',
  },
  {
    route: '/guides/best-ai-seo-tool/',
    bestOverallSlug: 'surfer-seo',
    labels: ['Best overall', 'Budget content scoring', 'Pro/team suite'],
    plans: ['Surfer Standard', 'NeuronWriter Silver', 'Semrush Pro or Guru'],
    firstRankedTitle: 'Surfer SEO',
  },
  {
    route: '/guides/best-ai-video-generator/',
    bestOverallSlug: 'seedance',
    labels: ['Best model overall', 'Best value model', 'Best Google/API pick'],
    plans: [
      'Seedance 2.0 via ByteDance Seed or BytePlus',
      'Kling 3.0 Pro, Premier, or Ultra after verifying current access',
      'Veo 3.1 via Flow, Gemini API, or Vertex AI',
    ],
    firstRankedTitle: 'Seedance 2.0',
  },
  {
    route: '/guides/best-ai-for-presentations/',
    bestOverallSlug: 'gamma',
    plans: ['Gamma Pro for client-facing work', 'Canva Free or Canva Pro', 'Pitch Team'],
    firstRankedTitle: 'Gamma',
  },
  {
    route: '/guides/best-ai-for-meeting-notes/',
    bestOverallSlug: 'fathom',
    plans: ['Fathom Free or Team', 'NotebookLM Free', 'Fireflies Pro or Business'],
    firstRankedTitle: 'Fathom',
  },
  {
    route: '/guides/best-ai-for-blog-writing/',
    bestOverallSlug: 'chatgpt',
    plans: ['ChatGPT Plus', 'Claude Free or Pro', 'Jasper Pro or Business'],
    firstRankedTitle: 'ChatGPT',
  },
  {
    route: '/guides/best-ai-tools-for-marketers/',
    bestOverallSlug: 'chatgpt',
    labels: ['Best overall', 'Best for ad creative', 'Best for conversion pages'],
    plans: ['Plus for solo marketers; Business', 'Trial or Starter', 'Build for active campaigns'],
    firstRankedTitle: 'ChatGPT',
  },
];

const routes = [
  '/',
  '/tools/chatgpt/',
  '/tools/claude/',
  '/tools/watsonx-orchestrate/',
  '/compare/chatgpt-vs-claude/',
  '/categories/ai-coding/',
  ...guidePickRoutes.map(({ route }) => route),
  '/companies/openai/',
  '/tools/',
  '/search/',
  '/compare/build/',
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
  '/',
  '/tools/chatgpt/',
  '/tools/watsonx-orchestrate/',
  '/compare/chatgpt-vs-claude/',
  '/categories/ai-coding/',
  ...guidePickRoutes.map(({ route }) => route),
  '/companies/openai/',
  '/tools/',
  '/search/',
  '/compare/build/',
  '/stack-builder/?roles=solo-founder%2Ccontent-creator%2Cdeveloper',
  '/trends/',
  '/about/',
  '/about/editorial/',
  '/about/scoring/',
  '/media-kit/',
  '/glossary/',
  '/dead/',
];

const mobileViewports = [
  { label: '360px', width: 360, height: 780, isMobile: true },
  { label: '390px', width: 390, height: 844, isMobile: true },
  { label: '430px', width: 430, height: 932, isMobile: true },
  { label: '768px', width: 768, height: 1024, isMobile: false },
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
  '#a7b3c5',
  '#60a5fa',
  '#f59e0b',
  '#fb7185',
];

const bannedDecorativeColorPatterns = [
  /#(?:a78bfa|c4b5fd|7c3aed|6d28d9|8b5cf6|c084fc|f472b6|fca5a5|be123c)\b/i,
  /(?:rgba?\(\s*)?(?:167\s*,\s*139\s*,\s*250|196\s*,\s*181\s*,\s*253|124\s*,\s*58\s*,\s*237|139\s*,\s*92\s*,\s*246|192\s*,\s*132\s*,\s*252|244\s*,\s*114\s*,\s*182|252\s*,\s*165\s*,\s*165)/i,
  /\b(?:violet|purple|pink|rose|magenta)\b/i,
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
  for (const viewport of mobileViewports) {
    test.describe(viewport.label, () => {
      test.use({
        viewport: { width: viewport.width, height: viewport.height },
        isMobile: viewport.isMobile,
      });

      for (const route of mobileRoutes) {
        test(`route has no horizontal overflow: ${route}`, async ({ page }) => {
          await page.goto(route);

          const overflow = await page.evaluate(() => {
            const doc = document.documentElement;
            const overflowing = [];
            const maxRight = doc.clientWidth + 1;
            const isContainedByHorizontalScroller = (node) => {
              for (let parent = node.parentElement; parent && parent !== document.body && parent !== doc; parent = parent.parentElement) {
                const style = getComputedStyle(parent);
                const overflowX = style.overflowX;
                const clipsHorizontally = overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'clip';
                if (!clipsHorizontally) continue;

                const rect = parent.getBoundingClientRect();
                if (rect.width <= 0 || rect.height <= 0) continue;
                if (rect.left < -1 || rect.right > maxRight) continue;
                return true;
              }
              return false;
            };

            for (const el of document.querySelectorAll('body *')) {
              const style = getComputedStyle(el);
              if (style.position === 'fixed') continue;

              const rect = el.getBoundingClientRect();
              if (rect.width <= 0 || rect.height <= 0 || rect.right <= maxRight) continue;
              if (isContainedByHorizontalScroller(el)) continue;

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
  }
});

test('homepage search shell exposes the main catalog workspaces', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('[data-home-page]')).toBeVisible();
  await expect(page.locator('[data-home-search]')).toBeVisible();
  await expect(page.locator('.home-tools')).toBeVisible();
  await expect(page.locator('.home-news-list')).toBeVisible();
  await expect(page.locator('#home-title')).toContainText('Find the right AI tool faster');
});

test('homepage primary destination labels are readable', async ({ page }) => {
  await page.goto('/');

  const labels = page.locator('.home-path span');
  await expect(labels).toHaveCount(3);

  const labelText = await labels.allTextContents();
  expect(labelText.map((text) => text.trim())).toEqual([
    'Browse tools',
    'Compare options',
    'Track changes',
  ]);

  const clippedLabels = await labels.evaluateAll((nodes) => nodes
    .map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        text: node.textContent?.trim(),
        clipped: node.scrollWidth > node.clientWidth + 1 || node.scrollHeight > node.clientHeight + 1,
        width: rect.width,
        height: rect.height,
      };
    })
    .filter((entry) => entry.clipped));

  expect(clippedLabels).toEqual([]);
});

test('homepage catalog root keeps warm accents out of decorative beams', async ({ page }) => {
  await page.goto('/');

  const homeRoot = page.locator('.home-page');
  await expect(homeRoot).toBeVisible();

  const rootPaint = await homeRoot.evaluate((node) => {
    const style = getComputedStyle(node);
    return {
      backgroundImage: style.backgroundImage,
    };
  });

  expect(rootPaint.backgroundImage).not.toMatch(/245,\s*158,\s*11|251,\s*146,\s*60|orange|amber/i);
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

test('browser tab icon raster stays inside the Signal Cyan palette', async () => {
  const { data, info } = await sharp('public/favicon-512.png')
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
          return saturation > 0.2 && hue >= 255 && hue <= 340;
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

test('compare featured cards match homepage panel outline palette', async ({ page }) => {
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

  const violetLegacy = /167\D+139\D+250/;
  expect(cardPaint.borderColor).not.toMatch(violetLegacy);
  expect(cardPaint.backgroundImage).not.toMatch(violetLegacy);
  // Chromium may emit comma rgb(249, 115, 22) or space rgb(249 115 22 / a)
  expect(cardPaint.borderColor).toMatch(/249\D+115\D+22/);
  expect(cardPaint.backgroundImage).toBe('none');
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

for (const guide of guidePickRoutes) {
  test(`guide exposes buyer-type decision picks before full ranking: ${guide.route}`, async ({ page }) => {
    await page.goto(guide.route);

    const decisionPanel = page.locator('.t2-guide-decisions');
    await expect(decisionPanel).toBeVisible();
    const expectedLabels = guide.labels ?? ['Best overall', 'Budget/free pick', 'Pro/team pick'];
    for (const label of expectedLabels) {
      await expect(decisionPanel).toContainText(label);
    }
    for (const plan of guide.plans) {
      await expect(decisionPanel).toContainText(plan);
    }
    await expect(decisionPanel).toContainText('2 official sources');

    await expect(decisionPanel.locator('a[data-cta-placement="guide_decision_best_overall"]')).toHaveAttribute('data-cta-tool-slug', guide.bestOverallSlug);
    await expect(decisionPanel.locator('a[data-cta-placement="guide_decision_budget"]')).toHaveCount(1);
    await expect(decisionPanel.locator('a[data-cta-placement="guide_decision_pro_team"]')).toHaveCount(1);
    await expect(page.locator('.t2-guide-row-title').first()).toHaveText(guide.firstRankedTitle);
  });
}

test('trends index has expanded beyond the seed report set', async ({ page }) => {
  await page.goto('/trends/');

  await expect(page.locator('[data-trend-card]')).toHaveCount(12);
});

for (const route of ['/about/', '/about/editorial/', '/about/scoring/', '/media-kit/', '/glossary/', '/dead/']) {
  test(`reference page uses refreshed home-adjacent surface: ${route}`, async ({ page }) => {
    await page.goto(route);

    await expect(page.locator('[data-refresh-surface="home-adjacent"]').first()).toBeVisible();
    const heroCard =
      route === '/dead/'
        ? page.locator('.dead-page-root .home-surface-card').first()
        : route === '/glossary/'
          ? page.locator('.glossary-page-root .home-surface-card').first()
          : page.locator('.ref-hero-card').first();
    await expect(heroCard).toBeVisible();
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
