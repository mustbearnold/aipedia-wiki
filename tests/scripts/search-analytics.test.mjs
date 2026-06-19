import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const searchPageSource = readFileSync('src/pages/search.astro', 'utf8');
const searchModalSource = readFileSync('src/components/SearchModal.astro', 'utf8');

test('catalog search page emits intent analytics with safe payload fields', () => {
  assert.match(searchPageSource, /function\s+trackSearchIntent/);
  assert.match(searchPageSource, /new CustomEvent\('aipedia:search'/);
  assert.match(searchPageSource, /window\.aipediaAnalytics\.track\(name, payload\)/);
  assert.match(searchPageSource, /site_search_query/);
  assert.match(searchPageSource, /site_search_result_click/);
  assert.match(searchPageSource, /site_search_open/);
  assert.match(searchPageSource, /zero_results:/);
  assert.match(searchPageSource, /query:/);
  assert.match(searchPageSource, /result_count:/);
  assert.match(searchPageSource, /buildSearchCatalog\(\{/);
  assert.match(searchPageSource, /item\.categorySlug/);
  assert.match(searchPageSource, /data-category-slug=\{item\.categorySlug \?\? ''\}/);
  assert.match(searchPageSource, /const allGuides = await getCollection\('use-cases'\)/);
  assert.match(searchPageSource, /const allWorkflows = await getCollection\('workflows'\)/);
  assert.match(searchPageSource, /page_type:\s*'search'/);
  assert.match(searchPageSource, /viewport_width:/);
  assert.match(searchPageSource, /device_type:/);
});

test('global search modal emits tool and full-text search analytics', () => {
  assert.match(searchModalSource, /function\s+trackSearchIntent/);
  assert.match(searchModalSource, /new CustomEvent\('aipedia:search'/);
  assert.match(searchModalSource, /window\.aipediaAnalytics\.track\(eventName, payload\)/);
  assert.match(searchModalSource, /site_search_open/);
  assert.match(searchModalSource, /site_search_query/);
  assert.match(searchModalSource, /site_search_result_click/);
  assert.match(searchModalSource, /zero_results:/);
  assert.match(searchModalSource, /search_surface:/);
  assert.match(searchModalSource, /result_type:/);
  assert.match(searchModalSource, /result_url:/);
  assert.match(searchModalSource, /e\.key\.toLowerCase\(\) === 'k'/);
  assert.match(searchModalSource, /let\s+lastQuery\s*=\s*''/);
  assert.match(searchModalSource, /query:\s*row\.dataset\.rowQuery\s*\|\|\s*input\?\.value\.trim\(\)\s*\|\|\s*lastQuery/);
});
