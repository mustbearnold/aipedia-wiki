import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const source = readFileSync(join(process.cwd(), 'src/components/PostBodyEnhancements.astro'), 'utf8');

test('dynamic pricing table CTAs include full commercial tracking attributes', () => {
  const requiredAssignments = [
    'link.dataset.ctaViewEvent',
    'link.dataset.ctaClickEvent',
    'link.dataset.ctaPageType',
    'link.dataset.ctaPageSlug = toolSlug',
    "link.dataset.ctaPlacement = 'tool_pricing_table'",
    'link.dataset.ctaToolSlug',
    'link.dataset.ctaToolName',
    'link.dataset.ctaLabel',
    'link.dataset.ctaDestinationType',
    'link.dataset.ctaIsAffiliate',
    'link.dataset.ctaPriceRange',
    'link.dataset.ctaAffiliateProgram',
    "link.dataset.ctaIsSticky = 'false'",
  ];

  for (const assignment of requiredAssignments) {
    assert.match(source, new RegExp(assignment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});
