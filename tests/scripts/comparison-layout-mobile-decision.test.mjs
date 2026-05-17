import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const layout = readFileSync('src/layouts/ComparisonLayout.astro', 'utf8');
const factsTable = readFileSync('src/components/comparison/ComparisonFactTable.astro', 'utf8');
const decisionCard = readFileSync('src/components/godtier/DecisionCard.astro', 'utf8');

test('comparison pages render a decision-first mobile hero before decorative compare assets', () => {
  const decisionHeroIndex = layout.indexOf('<DecisionCard');
  const contendersIndex = layout.indexOf('class="gt-compare-tools"');
  const toolCardsIndex = layout.indexOf('class="gt-compare-list"');

  assert.notEqual(decisionHeroIndex, -1, 'ComparisonLayout must render a decision hero near the top of the page');
  assert.notEqual(contendersIndex, -1, 'ComparisonLayout should still render the contenders block');
  assert.notEqual(toolCardsIndex, -1, 'ComparisonLayout should still render detailed tool cards');
  assert.ok(decisionHeroIndex < contendersIndex, 'decision hero must appear before the contenders block');
  assert.ok(decisionHeroIndex < toolCardsIndex, 'decision hero must appear before detailed tool cards');
  assert.match(layout, /placement="comparison_hero_winner"/, 'decision hero CTA needs a dedicated tracking placement');
  assert.match(layout, /href="#full-comparison"/, 'decision hero needs a secondary jump to the full comparison');
});

test('comparison decision hero has responsive styling hooks', () => {
  assert.match(decisionCard, /\.gt-card\b/, 'DecisionCard must style the decision hero');
  assert.match(decisionCard, /@media \(min-width: 600px\)/, 'DecisionCard must have a desktop responsive layout');
  assert.match(layout, /class="gt-compare-use-case"/, 'comparison page must render a winner-by-use-case block');
});

test('canonical comparison facts use mobile cards instead of a wide mobile table', () => {
  assert.match(factsTable, /gt-cft-mobile/, 'ComparisonFactTable must render a mobile card alternative');
  assert.match(factsTable, /gt-cft-card/, 'ComparisonFactTable must render per-tool mobile fact cards');
  assert.match(factsTable, /\.gt-cft-table-wrap \{ display: none; \}/, 'mobile CSS must hide the wide fact table by default');
  assert.match(factsTable, /@media \(min-width: 820px\)[\s\S]*\.gt-cft-mobile \{ display: none; \}/, 'desktop CSS must hide the mobile cards');
});
