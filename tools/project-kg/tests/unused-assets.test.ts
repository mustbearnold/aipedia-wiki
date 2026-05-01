import assert from 'node:assert/strict';
import test from 'node:test';
import { isInspectedAsset } from '../src/extractors/extract-assets.js';

test('isInspectedAsset includes target public asset folders', () => {
  assert.equal(isInspectedAsset('public/logos/tools/chatgpt.png'), true);
  assert.equal(isInspectedAsset('public/og/news/example.png'), true);
  assert.equal(isInspectedAsset('public/icons/favicon.png'), true);
  assert.equal(isInspectedAsset('public/images/example.webp'), true);
});

test('isInspectedAsset excludes pagefind generated files', () => {
  assert.equal(isInspectedAsset('public/pagefind/index/foo.pf_index'), false);
});
