import assert from 'node:assert/strict';
import { test } from 'node:test';

import rehypeCollapseSections from '../../src/plugins/rehype-collapse-sections.mjs';

function h2(text) {
  return {
    type: 'element',
    tagName: 'h2',
    properties: {},
    children: [{ type: 'text', value: text }],
  };
}

function paragraph(text) {
  return {
    type: 'element',
    tagName: 'p',
    children: [{ type: 'text', value: text }],
  };
}

function collapseTree(...children) {
  const tree = { type: 'root', children };
  rehypeCollapseSections()(tree);
  return tree;
}

test('collapses Recent changes sections on tool pages', () => {
  const tree = collapseTree(
    h2('Recent changes'),
    paragraph('Update log content.'),
    h2('Pricing'),
    paragraph('Pricing content.'),
  );

  assert.equal(tree.children[0].tagName, 'details');
  assert.deepEqual(tree.children[0].properties.className, ['gt-section-collapse']);
  assert.equal(tree.children[0].properties['data-section-id'], 'recent-changes');
  assert.equal(tree.children[0].children[0].tagName, 'summary');
  assert.equal(tree.children[1].tagName, 'h2');
  assert.equal(tree.children[1].children[0].value, 'Pricing');
});

test('collapses What changed recently sections on tool pages', () => {
  const tree = collapseTree(
    h2('What changed recently'),
    paragraph('Current update notes.'),
  );

  assert.equal(tree.children[0].tagName, 'details');
  assert.equal(tree.children[0].properties['data-section-id'], 'what-changed-recently');
});
