import assert from 'node:assert/strict';
import test from 'node:test';
import { parseFrontmatter } from '../src/extractors/extract-frontmatter.js';

test('parseFrontmatter extracts simple scalar and array values', () => {
  const parsed = parseFrontmatter(`---
title: "Hello"
tags: [alpha, beta]
draft: false
---

# Body
`);

  assert.ok(parsed);
  assert.equal(parsed.frontmatter.title, 'Hello');
  assert.deepEqual(parsed.frontmatter.tags, ['alpha', 'beta']);
  assert.equal(parsed.frontmatter.draft, false);
});

test('parseFrontmatter returns null without a frontmatter fence', () => {
  assert.equal(parseFrontmatter('# No frontmatter'), null);
});
