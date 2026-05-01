import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveRelativeImport } from '../src/extractors/extract-imports.js';

test('resolveRelativeImport resolves extensionless local imports', () => {
  const files = new Set(['src/pages/index.astro', 'src/components/Card.astro', 'src/utils/foo.ts']);
  assert.equal(resolveRelativeImport('src/pages/index.astro', '../components/Card.astro', files), 'src/components/Card.astro');
  assert.equal(resolveRelativeImport('src/pages/index.astro', '../utils/foo', files), 'src/utils/foo.ts');
});

test('resolveRelativeImport ignores missing imports', () => {
  const files = new Set(['src/pages/index.astro']);
  assert.equal(resolveRelativeImport('src/pages/index.astro', '../missing', files), null);
});
