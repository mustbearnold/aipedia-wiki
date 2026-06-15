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
  assert.match(helper, /--exclude-selectors/);
  assert.match(helper, /PAGEFIND_EXCLUDE_SELECTORS/);
  assert.match(helper, /PAGEFIND_EXCLUDED_FILES/);
  assert.match(helper, /tool-finder[\\'"],\s*[\\'"]index\.html/);
  assert.match(helper, /naver271c257f9d62ad7f37c174da981fd27e\.html/);
  assert.match(helper, /temporarilyRemoveFiles/);
  assert.match(helper, /finally\s*{\s*restoreExcludedFiles\(\)/s);
  assert.match(helper, /UNUSED_PAGEFIND_ASSETS/);
  assert.match(helper, /pagefind-ui\.js/);
  assert.match(helper, /pagefind-component-ui\.js/);
  assert.match(helper, /public[\\'"],\s*[\\'"]pagefind/);
  assert.match(helper, /spawnSync\(\s*process\.execPath/s);
  assert.doesNotMatch(helper, /shell:\s*process\.platform/);
});

test('built site helper prefers Vercel static output', () => {
  const helper = readFileSync('scripts/lib/built-site-dir.mjs', 'utf8');
  const vercelIndex = helper.indexOf("join(projectDir, '.vercel', 'output', 'static')");
  const distClientIndex = helper.indexOf("join(projectDir, 'dist', 'client')");
  const distIndex = helper.indexOf("join(projectDir, 'dist')");

  assert.notEqual(vercelIndex, -1);
  assert.notEqual(distClientIndex, -1);
  assert.notEqual(distIndex, -1);
  assert.ok(vercelIndex < distClientIndex);
  assert.ok(distClientIndex < distIndex);
});
