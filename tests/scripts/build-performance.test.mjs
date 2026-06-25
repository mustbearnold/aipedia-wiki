import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function source(path) {
  return readFileSync(path, 'utf8');
}

test('global shell components use cached content helpers', () => {
  const hotFiles = [
    'src/components/Nav.astro',
    'src/components/SearchModal.astro',
    'src/components/MoatLayer.astro',
  ];

  for (const file of hotFiles) {
    const text = source(file);
    assert.match(text, /content-cache/);
    assert.doesNotMatch(text, /getCollection/);
  }
});

test('tool page repeated lookups use cached content helpers', () => {
  const layout = source('src/layouts/ToolLayout.astro');
  const relatedComparisons = source('src/components/RelatedComparisons.astro');

  assert.match(layout, /getToolCategoryPeers/);
  assert.doesNotMatch(layout, /getCollection/);
  assert.match(relatedComparisons, /getRelatedComparisonsForTool/);
  assert.doesNotMatch(relatedComparisons, /getCollection/);
});

test('tool refresh batch emits concurrent route QA', () => {
  const planner = source('scripts/tool-refresh-batch.mjs');
  assert.match(planner, /--concurrency 4/);
});

test('tool refresh batch defaults to 60 tools', () => {
  const planner = source('scripts/tool-refresh-batch.mjs');
  assert.match(planner, /numberArg\('--limit', 60\)/);
  assert.match(planner, /numberArg\('--window-days', 365\)/);
  assert.match(planner, /--include-same-day/);
  assert.match(planner, /exclude_verified_date/);
  assert.match(planner, /EXCLUDE_VERIFIED_DATE/);
  assert.match(planner, /Default: 60/);
  assert.match(planner, /Default: 365/);
});

test('tool refresh batch can emit shard worker briefs with guarded write scope', () => {
  const planner = source('scripts/tool-refresh-batch.mjs');

  assert.match(planner, /--agents/);
  assert.match(planner, /--max-workers/);
  assert.match(planner, /--tools-per-worker/);
  assert.match(planner, /MAX_CONCURRENT_WORKERS = numberArg\('--max-workers', 6\)/);
  assert.match(planner, /TOOLS_PER_WORKER = numberArg\('--tools-per-worker', 10\)/);
  assert.match(planner, /parallel shard worker/);
  assert.match(planner, /close completed agents/);
  assert.match(planner, /You may edit only these files/);
  assert.match(planner, /Do not edit shared files/);
  assert.match(planner, /Do not run typecheck, build, or route QA/);
});
