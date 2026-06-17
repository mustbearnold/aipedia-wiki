import assert from 'node:assert/strict';
import { test } from 'node:test';

import { classifyPaths, commandsForCategories, planForPaths } from '../../scripts/check-smart.mjs';

test('check-smart classifies editorial content without requiring a build', () => {
  const plan = planForPaths(['src/content/tools/chatgpt.md', 'PAGE_REFRESH_LEDGER.md']);

  assert.deepEqual(plan.categories, ['content']);
  assert.ok(plan.commands.includes('npm run guard:check'));
  assert.ok(plan.commands.includes('npm run audit:facts'));
  assert.ok(plan.commands.includes('npm run check:links'));
  assert.ok(!plan.commands.includes('npm run build:fast'));
});

test('check-smart classifies layout and component work as runtime', () => {
  const categories = classifyPaths(['src/layouts/ToolLayout.astro', 'src/components/seo/Meta.astro']);
  const commands = commandsForCategories(categories);

  assert.deepEqual(categories, ['runtime']);
  assert.ok(commands.includes('npm run build:fast'));
});

test('check-smart classifies tooling work without asset checks', () => {
  const plan = planForPaths(['scripts/audit-command-surface.mjs', 'tests/scripts/audit-command-surface.test.mjs']);

  assert.deepEqual(plan.categories, ['tooling']);
  assert.ok(plan.commands.includes('npm run test:scripts'));
  assert.ok(plan.commands.includes('npm run audit:commands'));
  assert.ok(!plan.commands.includes('npm run check:assets:quick'));
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
