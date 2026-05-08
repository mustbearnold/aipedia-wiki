import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const layout = readFileSync('src/layouts/ComparisonLayout.astro', 'utf8');
const factsTable = readFileSync('src/components/comparison/ComparisonFactTable.astro', 'utf8');
const canvasCss = readFileSync('src/styles/t2-canvas.css', 'utf8');
const themedCss = readFileSync('src/styles/compare-home-cards.css', 'utf8');

test('comparison pages render a decision-first mobile hero before decorative compare assets', () => {
  const decisionHeroIndex = layout.indexOf('class="t2-cmp-decision-hero"');
  const versusBannerIndex = layout.indexOf('class="t2-vs-banner"');
  const toolCardsIndex = layout.indexOf('class="t2-cmp-cards"');

  assert.notEqual(decisionHeroIndex, -1, 'ComparisonLayout must render a decision hero near the top of the page');
  assert.notEqual(versusBannerIndex, -1, 'ComparisonLayout should still render the versus banner');
  assert.notEqual(toolCardsIndex, -1, 'ComparisonLayout should still render detailed tool cards');
  assert.ok(decisionHeroIndex < versusBannerIndex, 'decision hero must appear before the versus banner');
  assert.ok(decisionHeroIndex < toolCardsIndex, 'decision hero must appear before detailed tool cards');
  assert.match(layout, /placement="comparison_hero_winner"/, 'decision hero CTA needs a dedicated tracking placement');
  assert.match(layout, /href="#full-comparison"/, 'decision hero needs a secondary jump to the full comparison');
});

test('comparison decision hero has responsive styling hooks', () => {
  assert.match(canvasCss, /\.t2-cmp-decision-hero\b/, 'base CSS must style the decision hero');
  assert.match(canvasCss, /\.t2-cmp-decision-usecases\b/, 'base CSS must style decision use-case cards');
  assert.match(themedCss, /\.comparison-detail-page \.t2-cmp-decision-hero\b/, 'theme CSS must align the decision hero with the comparison page palette');
});

test('canonical comparison facts use mobile cards instead of a wide mobile table', () => {
  assert.match(factsTable, /t2-facts-mobile-cards/, 'ComparisonFactTable must render a mobile card alternative');
  assert.match(factsTable, /t2-fact-mobile-card/, 'ComparisonFactTable must render per-tool mobile fact cards');
  assert.match(themedCss, /@media \(max-width: 820px\)[\s\S]*\.comparison-detail-page \.t2-facts-table-wrap[\s\S]*display:\s*none/, 'mobile and tablet CSS must hide the wide fact table');
  assert.match(themedCss, /@media \(min-width: 821px\)[\s\S]*\.comparison-detail-page \.t2-facts-mobile-cards[\s\S]*display:\s*none/, 'desktop CSS must hide the mobile cards');
});
