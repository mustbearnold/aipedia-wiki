import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const searchPageSource = readFileSync('src/pages/search.astro', 'utf8');
const searchModalSource = readFileSync('src/components/SearchModal.astro', 'utf8');

test('catalog search page emits intent analytics with safe payload fields', () => {
  assert.match(searchPageSource, /function\s+trackSearchIntent/);
  assert.match(searchPageSource, /new CustomEvent\('aipedia:search'/);
  assert.match(searchPageSource, /window\.gtag\('event', eventName, payload\)/);
  assert.match(searchPageSource, /search_performed/);
  assert.match(searchPageSource, /search_zero_results/);
  assert.match(searchPageSource, /search_result_clicked/);
  assert.match(searchPageSource, /search_quick_term_clicked/);
  assert.match(searchPageSource, /query:/);
  assert.match(searchPageSource, /result_count:/);
  assert.match(searchPageSource, /categorySlug:\s*tool\.data\.category/);
  assert.match(searchPageSource, /data-category-slug=\{tool\.categorySlug\}/);
  assert.match(searchPageSource, /page_type:\s*'search'/);
  assert.match(searchPageSource, /viewport_width:/);
  assert.match(searchPageSource, /device_type:/);
});

test('global search modal emits tool and full-text search analytics', () => {
  assert.match(searchModalSource, /function\s+trackSearchIntent/);
  assert.match(searchModalSource, /new CustomEvent\('aipedia:search'/);
  assert.match(searchModalSource, /window\.gtag\('event', eventName, payload\)/);
  assert.match(searchModalSource, /search_modal_opened/);
  assert.match(searchModalSource, /search_performed/);
  assert.match(searchModalSource, /search_zero_results/);
  assert.match(searchModalSource, /search_result_clicked/);
  assert.match(searchModalSource, /search_tab_changed/);
  assert.match(searchModalSource, /search_suggestion_clicked/);
  assert.match(searchModalSource, /search_surface:/);
  assert.match(searchModalSource, /active_tab:/);
  assert.match(searchModalSource, /result_type:/);
  assert.match(searchModalSource, /result_url:/);
  assert.match(searchModalSource, /e\.key\.toLowerCase\(\) === 'k'/);
  assert.match(searchModalSource, /let\s+lastSearchQuery\s*=\s*''/);
  assert.match(searchModalSource, /query:\s*input\?\.value\.trim\(\)\s*\|\|\s*lastSearchQuery/);
});
