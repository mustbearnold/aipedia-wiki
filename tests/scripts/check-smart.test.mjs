import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';

import { classifyPaths, commandsForCategories, planForPaths } from '../../scripts/check-smart.mjs';

const operatorSurfaces = JSON.parse(readFileSync(new URL('../../src/data/operator-surfaces.json', import.meta.url), 'utf8'));

test('check-smart classifies editorial content without requiring a build', () => {
  const plan = planForPaths(['src/content/tools/chatgpt.md', 'PAGE_REFRESH_LEDGER.md']);

  assert.deepEqual(plan.categories, ['content']);
  assert.ok(plan.commands.includes('npm run guard:check'));
  assert.ok(plan.commands.includes('npm run audit:facts'));
  assert.ok(plan.commands.includes('npm run check:links'));
  assert.ok(!plan.commands.includes('npm run build:fast'));
});

test('check-smart keeps docs and agent files on diff-only verification', () => {
  const plan = planForPaths(['docs/notes.md', '.agent/PLANS.md']);

  assert.deepEqual(plan.categories, ['docs']);
  assert.deepEqual(plan.commands, ['git diff --check']);
});

test('check-smart classifies runtime pages, layout, components, styles, and config as runtime', () => {
  const categories = classifyPaths([
    'src/pages/tools/[slug].astro',
    'src/layouts/ToolLayout.astro',
    'src/components/seo/Meta.astro',
    'src/styles/global.css',
    'astro.config.mjs',
  ]);
  const commands = commandsForCategories(categories);

  assert.deepEqual(categories, ['runtime']);
  assert.ok(commands.includes('npm run build:fast'));
});

test('check-smart routes API pages through API verification', () => {
  const plan = planForPaths(['src/pages/api/search.json.ts']);

  assert.deepEqual(plan.categories, ['runtime']);
  assert.ok(plan.commands.includes('npm run smoke:api'));
  assert.ok(plan.commands.includes('npm run build:fast'));
});

test('operator surface contract names verification surfaces explicitly', () => {
  const surfaceIds = operatorSurfaces.surfaces.map((surface) => surface.id);

  assert.ok(surfaceIds.includes('content'));
  assert.ok(surfaceIds.includes('api-routes'));
  assert.ok(surfaceIds.includes('runtime-pages'));
  assert.ok(surfaceIds.includes('runtime-layouts'));
  assert.ok(surfaceIds.includes('runtime-components'));
  assert.ok(surfaceIds.includes('runtime-styles'));
  assert.ok(surfaceIds.includes('assets'));
  assert.ok(surfaceIds.includes('scripts'));
  assert.ok(surfaceIds.includes('config'));
  assert.ok(surfaceIds.includes('docs-agent'));
});

test('operator surface contract names the guard challenge surface explicitly', () => {
  const surfaceIds = operatorSurfaces.surfaces.map((surface) => surface.id);

  assert.ok(surfaceIds.includes('guard-challenge'));
});

test('check-smart classifies tooling work without asset checks', () => {
  const plan = planForPaths(['scripts/audit-command-surface.mjs', 'tests/scripts/audit-command-surface.test.mjs']);

  assert.deepEqual(plan.categories, ['tooling']);
  assert.ok(plan.commands.includes('npm run test:scripts'));
  assert.ok(plan.commands.includes('npm run audit:commands'));
  assert.ok(!plan.commands.includes('npm run check:assets:quick'));
});

test('check-smart recommends guard challenge validation for guard and audit scripts', () => {
  const plan = planForPaths(['scripts/guard-content.mjs', 'scripts/audit-news-rendering.mjs']);

  assert.ok(plan.commands.includes('npm run guard:challenge:check'));
  assert.ok(
    plan.guidance.some((line) =>
      line.includes('Open a guard challenge before changing guard pass or fail behavior'),
    ),
  );
});

test('check-smart keeps dependency changes on the pre-ship path', () => {
  const plan = planForPaths(['package-lock.json']);

  assert.deepEqual(plan.categories, ['dependencies']);
  assert.ok(plan.commands.includes('npm run build:fast'));
  assert.ok(plan.commands.includes('npm run check:security'));
});

test('check-smart treats package scripts as tooling unless the lockfile changed', () => {
  const plan = planForPaths(['package.json']);

  assert.deepEqual(plan.categories, ['tooling']);
  assert.ok(plan.commands.includes('npm run audit:commands'));
  assert.ok(!plan.commands.includes('npm run build:fast'));
  assert.ok(!plan.commands.includes('npm run check:security'));
});

test('check-smart combines categories once', () => {
  const plan = planForPaths(['src/content/tools/claude.md', 'public/logos/tools/claude.png', 'scripts/generate-logo-manifest.mjs']);

  assert.deepEqual(plan.categories, ['assets', 'content', 'tooling']);
  assert.equal(plan.commands.filter((command) => command === 'git diff --check').length, 1);
  assert.ok(plan.commands.includes('npm run check:assets:quick'));
  assert.ok(plan.commands.includes('npm run test:scripts'));
  assert.ok(plan.commands.includes('npm run guard:check'));
});
