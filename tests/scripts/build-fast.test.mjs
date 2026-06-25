import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

test('fast build audits the nested Vercel static client output when present', () => {
  const script = readFileSync('scripts/build-fast.mjs', 'utf8');

  assert.match(script, /existsSync\(join\(PROJECT_DIR,\s*'dist-fast',\s*'client'\)\)/);
  assert.match(script, /const fastStaticDir =/);
  assert.match(script, /\['scripts\/audit-indexability\.mjs', '--dist', fastStaticDir\]/);
  assert.match(script, /\['scripts\/audit-commercial-cta\.mjs', '--dist', fastStaticDir\]/);
  assert.match(script, /\['scripts\/check-dist-budget\.mjs', '--site-dir', fastStaticDir, '--mode', 'fast'\]/);
  assert.doesNotMatch(script, /\['scripts\/audit-indexability\.mjs', '--dist', 'dist-fast'\]/);
  assert.doesNotMatch(script, /\['scripts\/audit-commercial-cta\.mjs', '--dist', 'dist-fast'\]/);
});

test('fast build resolves Astro from the current worktree or a parent checkout before spawning the build', () => {
  const script = readFileSync('scripts/build-fast.mjs', 'utf8');
  const dependencyPreflightIndex = script.indexOf('findNodeModuleBin(PROJECT_DIR');
  const astroBuildIndex = script.indexOf("[astroBin, 'build']");

  assert.notEqual(dependencyPreflightIndex, -1);
  assert.notEqual(astroBuildIndex, -1);
  assert.ok(dependencyPreflightIndex < astroBuildIndex);
  assert.match(script, /function findNodeModuleBin/);
  assert.match(script, /dirname\(currentDir\)/);
  assert.match(script, /node_modules/);
  assert.match(script, /astro/);
  assert.match(script, /npm install/);
  assert.match(script, /worktree/);
  assert.match(script, /process\.exit\(1\)/);
});

test('fast build reports stage and total timings', () => {
  const script = readFileSync('scripts/build-fast.mjs', 'utf8');

  assert.match(script, /function formatDuration/);
  assert.match(script, /function runStage/);
  assert.match(script, /\[build-fast\] \$\{label\}/);
  assert.match(script, /Astro build/);
  assert.match(script, /Indexability audit/);
  assert.match(script, /Commercial CTA audit/);
  assert.match(script, /Fast dist budget check/);
  assert.match(script, /\[build-fast\] Total completed in/);
});
