import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

test('build script delegates Pagefind generation to a clean helper', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

  assert.match(pkg.scripts.build, /node scripts\/build-pagefind\.mjs/);
  assert.equal(existsSync('scripts/build-pagefind.mjs'), true);

  const helper = readFileSync('scripts/build-pagefind.mjs', 'utf8');
  assert.match(helper, /rmSync\(.*recursive:\s*true,\s*force:\s*true/s);
  assert.match(helper, /--output-path/);
  assert.match(helper, /public[\\'"],\s*[\\'"]pagefind/);
  assert.match(helper, /spawnSync\(process\.execPath/);
  assert.doesNotMatch(helper, /shell:\s*process\.platform/);
});
