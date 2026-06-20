import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import * as checkSmart from '../../scripts/check-smart.mjs';

const { classifyPaths, commandsForCategories, planForPaths } = checkSmart;
const operatorSurfaces = JSON.parse(readFileSync(new URL('../../src/data/operator-surfaces.json', import.meta.url), 'utf8'));
const checkSmartScriptPath = fileURLToPath(new URL('../../scripts/check-smart.mjs', import.meta.url));

function changedPathsForArgs() {
  assert.equal(typeof checkSmart.changedPathsForArgs, 'function');
  return checkSmart.changedPathsForArgs;
}

test('check-smart preserves default dirty path discovery when --base is absent', () => {
  const calls = [];
  const gitOutputs = new Map([
    ['diff\0--name-only', ['docs/dirty.md']],
    ['diff\0--name-only\0--cached', ['scripts/check-smart.mjs']],
    ['ls-files\0--others\0--exclude-standard', ['tests/scripts/check-smart.test.mjs', 'docs/dirty.md']],
  ]);

  const paths = changedPathsForArgs()([], {
    gitLines(gitArgs) {
      calls.push(gitArgs);
      const key = gitArgs.join('\0');
      assert.ok(gitOutputs.has(key), `unexpected git call: ${JSON.stringify(gitArgs)}`);
      return gitOutputs.get(key);
    },
  });

  assert.deepEqual(paths, ['docs/dirty.md', 'scripts/check-smart.mjs', 'tests/scripts/check-smart.test.mjs']);
  assert.deepEqual(calls, [
    ['diff', '--name-only'],
    ['diff', '--name-only', '--cached'],
    ['ls-files', '--others', '--exclude-standard'],
  ]);
});

test('check-smart includes committed merge-base diff paths when --base ref is provided', () => {
  const calls = [];
  const gitOutputs = new Map([
    ['merge-base\0origin/main\0HEAD', ['abc123']],
    ['diff\0--name-only\0abc123..HEAD', ['src/pages/tools/[slug].astro', 'docs/base-only.md', 'src\\styles\\global.css']],
    ['diff\0--name-only', ['docs/dirty.md']],
    ['diff\0--name-only\0--cached', ['scripts/check-smart.mjs']],
    ['ls-files\0--others\0--exclude-standard', ['tests/scripts/check-smart.test.mjs', 'docs/dirty.md']],
  ]);

  const paths = changedPathsForArgs()(['--base', 'origin/main'], {
    gitLines(gitArgs) {
      calls.push(gitArgs);
      const key = gitArgs.join('\0');
      assert.ok(gitOutputs.has(key), `unexpected git call: ${JSON.stringify(gitArgs)}`);
      return gitOutputs.get(key);
    },
  });

  assert.deepEqual(paths, [
    'docs/base-only.md',
    'docs/dirty.md',
    'scripts/check-smart.mjs',
    'src/pages/tools/[slug].astro',
    'src/styles/global.css',
    'tests/scripts/check-smart.test.mjs',
  ]);
  assert.deepEqual(calls, [
    ['merge-base', 'origin/main', 'HEAD'],
    ['diff', '--name-only', 'abc123..HEAD'],
    ['diff', '--name-only'],
    ['diff', '--name-only', '--cached'],
    ['ls-files', '--others', '--exclude-standard'],
  ]);
});

test('check-smart supports --base=<ref> syntax for committed merge-base diff paths', () => {
  const calls = [];
  const gitOutputs = new Map([
    ['merge-base\0release/candidate\0HEAD', ['def456']],
    ['diff\0--name-only\0def456..HEAD', ['src/content/tools/chatgpt.md']],
    ['diff\0--name-only', []],
    ['diff\0--name-only\0--cached', []],
    ['ls-files\0--others\0--exclude-standard', []],
  ]);

  const paths = changedPathsForArgs()(['--base=release/candidate'], {
    gitLines(gitArgs) {
      calls.push(gitArgs);
      const key = gitArgs.join('\0');
      assert.ok(gitOutputs.has(key), `unexpected git call: ${JSON.stringify(gitArgs)}`);
      return gitOutputs.get(key);
    },
  });

  assert.deepEqual(paths, ['src/content/tools/chatgpt.md']);
  assert.deepEqual(calls[0], ['merge-base', 'release/candidate', 'HEAD']);
});

test('check-smart fails closed when --base cannot be resolved', () => {
  assert.throws(
    () => changedPathsForArgs()(['--base', 'refs/heads/missing'], {
      gitLines(gitArgs) {
        assert.deepEqual(gitArgs, ['merge-base', 'refs/heads/missing', 'HEAD']);
        return [];
      },
    }),
    /could not resolve --base refs\/heads\/missing/,
  );

  const result = spawnSync(process.execPath, [checkSmartScriptPath, '--base', 'refs/heads/__missing_for_test__', '--json'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 1, result.stdout);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.match(report.error, /could not resolve --base refs\/heads\/__missing_for_test__/);
});

test('check-smart documents --base in help and accepts it as a known flag', () => {
  const help = spawnSync(process.execPath, [checkSmartScriptPath, '--help'], { encoding: 'utf8' });
  assert.equal(help.status, 0, help.stderr);
  assert.match(help.stdout, /--base <ref>/);

  const result = spawnSync(process.execPath, [checkSmartScriptPath, '--base=HEAD', '--json', '--path', 'package.json'], {
    encoding: 'utf8',
  });
  assert.equal(result.status, 0, `${result.stderr}\n${result.stdout}`);
  assert.deepEqual(JSON.parse(result.stdout).paths, ['package.json']);
});

test('check-smart classifies editorial content without requiring a build', () => {
  const plan = planForPaths(['src/content/tools/chatgpt.md', 'PAGE_REFRESH_LEDGER.md']);

  assert.deepEqual(plan.categories, ['content']);
  assert.ok(plan.commands.includes('npm run guard:check'));
  assert.ok(plan.commands.includes('npm run audit:facts'));
  assert.ok(plan.commands.includes('npm run check:links'));
  assert.ok(!plan.commands.includes('npm run build:fast'));
  assert.ok(!plan.commands.includes('npm run guard:challenge:check'));
  assert.ok(!plan.guidance.some((line) => line.includes('Open a guard challenge before changing guard pass or fail behavior')));
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

test('check-smart routes generated model surfaces through generated model audit', () => {
  const modelPlan = planForPaths(['src/lib/content-models/tool-page-model.ts']);
  const searchPlan = planForPaths(['src/lib/search-catalog.ts']);
  const auditPlan = planForPaths(['scripts/audit-generated-models.mjs']);

  assert.deepEqual(modelPlan.categories, ['runtime', 'tooling']);
  assert.deepEqual(searchPlan.categories, ['runtime', 'tooling']);
  assert.deepEqual(auditPlan.categories, ['tooling']);

  for (const plan of [modelPlan, searchPlan, auditPlan]) {
    assert.ok(plan.commands.includes('npm run audit:generated-models'));
    assert.ok(plan.commands.includes('npm run test:scripts'));
  }
  assert.ok(modelPlan.commands.includes('npm run build:fast'));
  assert.ok(searchPlan.commands.includes('npm run build:fast'));
});

test('check-smart exposes Phase 3 search surface checks and smoke routes', () => {
  const plan = planForPaths(['src/pages/search.astro']);

  assert.ok(plan.surfaces.some((surface) => surface.id === 'phase3-search-catalog'));
  assert.ok(plan.surfaces.some((surface) => surface.label === 'Phase 3 search catalog and search UI'));
  assert.ok(plan.surface_ids.includes('phase3-search-catalog'));
  assert.ok(plan.surface_labels.includes('Phase 3 search catalog and search UI'));
  assert.ok(plan.checks.includes('search-catalog'));
  assert.ok(plan.checks.includes('api'));
  assert.ok(plan.commands.includes('npm run test:scripts'));
  assert.ok(plan.commands.includes('npm run smoke:api'));
  assert.ok(plan.smoke_routes.some((route) => route.route === '/api/home-search.json' && route.command === 'npm run smoke:api'));
});

test('check-smart routes Phase 3 model, category, motion, and token surfaces', () => {
  const toolModelPlan = planForPaths(['src/lib/content-models/tool-page-model.ts']);
  assert.ok(toolModelPlan.surfaces.some((surface) => surface.id === 'phase3-tool-trust-panel'));
  assert.ok(toolModelPlan.checks.includes('tool-page-model'));
  assert.ok(toolModelPlan.commands.includes('npm run audit:generated-models'));
  assert.ok(toolModelPlan.commands.includes('npm run test:scripts'));

  const categoryPlan = planForPaths(['src/content/categories/ai-coding.md']);
  assert.ok(categoryPlan.surfaces.some((surface) => surface.id === 'phase3-category-buyer-path'));
  assert.ok(categoryPlan.checks.includes('decision-pick'));
  assert.ok(categoryPlan.commands.includes('npm run test:scripts'));
  assert.ok(categoryPlan.smoke_routes.some((route) => route.route === '/categories/ai-coding/'));

  const comparePlan = planForPaths(['src/layouts/ComparisonLayout.astro']);
  assert.ok(comparePlan.surfaces.some((surface) => surface.id === 'phase3-compare-decision-surfaces'));
  assert.ok(comparePlan.checks.includes('decision-pick'));
  assert.ok(comparePlan.checks.includes('tool-page-model'));
  assert.ok(comparePlan.checks.includes('generated-models'));
  assert.ok(comparePlan.commands.includes('npm run audit:generated-models'));
  assert.ok(comparePlan.smoke_routes.some((route) => route.route === '/compare/chatgpt-vs-claude/'));

  const motionPlan = planForPaths(['src/lib/motion-controller.ts']);
  assert.ok(motionPlan.surfaces.some((surface) => surface.id === 'phase3-motion-controller'));
  assert.ok(motionPlan.checks.includes('motion-controller'));
  assert.ok(motionPlan.checks.includes('reduced-motion-smoke'));
  assert.ok(motionPlan.smoke_routes.some((route) => route.focus.includes('reduced-motion')));
  assert.ok(motionPlan.commands.includes('npm run smoke:visual'));

  const tokenPlan = planForPaths(['src/styles/tokens.css']);
  assert.ok(tokenPlan.surfaces.some((surface) => surface.id === 'phase3-tokens-css'));
  assert.ok(tokenPlan.checks.includes('design-tokens'));
  assert.ok(tokenPlan.commands.includes('npm run test:scripts'));
  assert.ok(tokenPlan.commands.includes('npm run smoke:visual'));
});


test('operator surface contract names verification surfaces explicitly', () => {
  const surfaceIds = operatorSurfaces.surfaces.map((surface) => surface.id);

  assert.ok(surfaceIds.includes('content'));
  assert.ok(surfaceIds.includes('api-routes'));
  assert.ok(surfaceIds.includes('runtime-pages'));
  assert.ok(surfaceIds.includes('runtime-layouts'));
  assert.ok(surfaceIds.includes('runtime-components'));
  assert.ok(surfaceIds.includes('runtime-styles'));
  assert.ok(surfaceIds.includes('generated-models'));
  assert.ok(surfaceIds.includes('assets'));
  assert.ok(surfaceIds.includes('scripts'));
  assert.ok(surfaceIds.includes('config'));
  assert.ok(surfaceIds.includes('docs-agent'));
  for (const id of [
    'phase3-evidence-rail',
    'phase3-search-catalog',
    'phase3-homepage-intelligence-desk',
    'phase3-tool-trust-panel',
    'phase3-category-buyer-path',
    'phase3-compare-decision-surfaces',
    'phase3-motion-controller',
    'phase3-tokens-css',
  ]) {
    const surface = operatorSurfaces.surfaces.find((candidate) => candidate.id === id);
    assert.ok(surface, `missing ${id}`);
    assert.ok(surface.canonicalModel, `${id} missing canonical model`);
    assert.ok(surface.auditImpact, `${id} missing audit impact`);
    assert.ok(Array.isArray(surface.routeTypes), `${id} missing route types`);
    assert.ok(Array.isArray(surface.requiredChecks), `${id} missing required checks`);
    assert.ok(Array.isArray(surface.smokeRoutes), `${id} missing smoke routes`);
  }
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

test('check-smart recommends guard challenge validation for general check scripts', () => {
  const plan = planForPaths(['scripts/check-dist-budget.mjs', 'tests/scripts/check-dist-budget.test.mjs']);

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
