#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const OPERATOR_SURFACES_PATH = resolve(PROJECT_DIR, 'src/data/operator-surfaces.json');
const args = process.argv.slice(2);
const runMode = args.includes('--run');
const jsonMode = args.includes('--json');
const helpMode = args.includes('--help') || args.includes('-h');

const KNOWN_FLAGS = new Set(['--run', '--json', '--help', '-h', '--path', '--paths', '--base']);

function valuesFor(flag, sourceArgs = args, { normalize = true, split = true } = {}) {
  const values = [];
  for (let i = 0; i < sourceArgs.length; i += 1) {
    const arg = sourceArgs[i];
    if (arg === flag) {
      const value = sourceArgs[i + 1];
      if (value && !value.startsWith('--')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  const parsedValues = split ? values.flatMap((value) => value.split(',')) : values;
  return parsedValues
    .map((value) => (normalize ? normalizePath(value) : value.trim()))
    .filter(Boolean);
}

function pathValuesForArgs(sourceArgs = args) {
  return valuesFor('--path', sourceArgs).concat(valuesFor('--paths', sourceArgs));
}

function baseRefForArgs(sourceArgs = args) {
  return valuesFor('--base', sourceArgs, { normalize: false, split: false }).at(-1) || '';
}

function validateArgs(sourceArgs = args) {
  const issues = [];
  for (let i = 0; i < sourceArgs.length; i += 1) {
    const arg = sourceArgs[i];
    if (!arg.startsWith('-')) continue;
    const flag = arg.includes('=') ? arg.slice(0, arg.indexOf('=')) : arg;
    if (!KNOWN_FLAGS.has(flag)) issues.push(`unknown flag ${arg}`);
    if (flag === '--base') {
      if (arg.includes('=')) {
        if (!arg.slice(arg.indexOf('=') + 1).trim()) issues.push('missing value for --base');
      } else {
        const value = sourceArgs[i + 1];
        if (!value || value.startsWith('--')) issues.push('missing value for --base');
        else i += 1;
      }
    }
    if ((flag === '--path' || flag === '--paths') && !arg.includes('=')) i += 1;
  }
  return issues;
}

function normalizePath(path) {
  return path.replace(/\\/g, '/').replace(/^\.\//, '').trim();
}

function loadOperatorSurfaceContract() {
  return JSON.parse(readFileSync(OPERATOR_SURFACES_PATH, 'utf8'));
}

const OPERATOR_SURFACE_CONTRACT = loadOperatorSurfaceContract();

function matchesAny(value, candidates = []) {
  return candidates.includes(value);
}

function startsWithAny(value, prefixes = []) {
  return prefixes.some((prefix) => value.startsWith(prefix));
}

function matchesRegex(value, regexes = []) {
  return regexes.some((regex) => new RegExp(regex).test(value));
}

function surfaceMatchesPath(surface, path) {
  const match = surface.match || {};
  return (
    matchesAny(path, match.files) ||
    startsWithAny(path, match.prefixes) ||
    matchesRegex(path, match.regexes)
  );
}

function matchingSurfaces(paths) {
  const surfaces = new Set();

  for (const path of paths.map(normalizePath)) {
    if (!path) continue;

    for (const surface of OPERATOR_SURFACE_CONTRACT.surfaces) {
      if (surfaceMatchesPath(surface, path)) surfaces.add(surface);
    }
  }

  return [...surfaces];
}

function gitLines(gitArgs) {
  const result = spawnSync('git', gitArgs, {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  if (result.status !== 0) return [];
  return result.stdout.split(/\r?\n/).map(normalizePath).filter(Boolean);
}

function normalizedGitLines(readGitLines, gitArgs) {
  return (readGitLines(gitArgs) || []).map(normalizePath).filter(Boolean);
}

export function changedPathsForArgs(sourceArgs = args, { gitLines: readGitLines = gitLines } = {}) {
  const explicitPaths = pathValuesForArgs(sourceArgs);
  if (explicitPaths.length) return [...new Set(explicitPaths)];

  const paths = [];
  const baseRef = baseRefForArgs(sourceArgs);
  if (baseRef) {
    const mergeBase = normalizedGitLines(readGitLines, ['merge-base', baseRef, 'HEAD'])[0];
    if (!mergeBase) throw new Error(`could not resolve --base ${baseRef}`);
    if (mergeBase) paths.push(...normalizedGitLines(readGitLines, ['diff', '--name-only', `${mergeBase}..HEAD`]));
  }

  paths.push(
    ...normalizedGitLines(readGitLines, ['diff', '--name-only']),
    ...normalizedGitLines(readGitLines, ['diff', '--name-only', '--cached']),
    ...normalizedGitLines(readGitLines, ['ls-files', '--others', '--exclude-standard']),
  );
  return [...new Set(paths)].sort();
}

function changedPaths() {
  return changedPathsForArgs(args);
}

function categoriesForSurfaces(surfaces) {
  const categories = new Set();

  for (const surface of surfaces) categories.add(surface.category);

  return [...categories].sort();
}

export function classifyPaths(paths) {
  return categoriesForSurfaces(matchingSurfaces(paths));
}

function requiredChecksForSurface(surface) {
  return [...(surface.checks || []), ...(surface.requiredChecks || [])];
}

function checksForSurfaces(surfaces) {
  const checks = new Set();

  for (const surface of surfaces) {
    for (const check of requiredChecksForSurface(surface)) checks.add(check);
  }

  return [...checks].sort();
}

function guidanceForSurfaces(surfaces) {
  const guidance = new Set();

  for (const surface of surfaces) {
    for (const line of surface.guidance || []) guidance.add(line);
  }

  return [...guidance].sort();
}

function surfaceSummariesForSurfaces(surfaces) {
  return surfaces
    .map((surface) => ({ id: surface.id, label: surface.label }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function routeQaRoutesForPaths(paths) {
  const routes = [];
  for (const path of paths.map(normalizePath)) {
    const exactRoute = EXACT_ROUTE_QA_PATHS.get(path);
    if (exactRoute) {
      routes.push({ route: exactRoute.route, command: 'npm run qa:route', focus: exactRoute.focus });
      continue;
    }

    let match = path.match(/^src\/content\/comparisons\/([^/]+)\.md$/);
    if (match) {
      routes.push({ route: `/compare/${match[1]}/`, command: 'npm run qa:route', focus: 'changed comparison route' });
      continue;
    }

    match = path.match(/^src\/content\/tools\/([^/]+)\.md$/);
    if (match) {
      routes.push({ route: `/tools/${match[1]}/`, command: 'npm run qa:route', focus: 'changed tool route' });
      continue;
    }

    match = path.match(/^src\/content\/categories\/([^/]+)\.md$/);
    if (match) {
      routes.push({ route: `/categories/${match[1]}/`, command: 'npm run qa:route', focus: 'changed category route' });
    }
  }
  return routes;
}

const EXACT_ROUTE_QA_PATHS = new Map([
  ['src/pages/categories/index.astro', { route: '/categories/', focus: 'changed category hub route' }],
  ['src/pages/compare/index.astro', { route: '/compare/', focus: 'changed comparison hub route' }],
  ['src/pages/tools/index.astro', { route: '/tools/', focus: 'changed tools hub route' }],
]);

const ROUTE_QA_REPLACES_BROAD_SMOKE_PATTERNS = [
  /^\.agent\//,
  /^docs\//,
  /^src\/content\/(?:categories|comparisons|tools)\/[^/]+\.md$/,
  /^src\/data\/(?:coverage-backlog|source-registry)\.json$/,
  /^src\/pages\/(?:categories|compare|tools)\/index\.astro$/,
  /^src\/pages\/llms(?:-full)?\.txt\.ts$/,
  /^PAGE_REFRESH_LEDGER\.md$/,
  /^AGENTS\.md$/,
  /^README\.md$/,
];

function canReplaceBroadVisualSmoke(paths) {
  const normalizedPaths = paths.map(normalizePath).filter(Boolean);
  if (!routeQaRoutesForPaths(normalizedPaths).length) return false;
  return normalizedPaths.every((path) =>
    ROUTE_QA_REPLACES_BROAD_SMOKE_PATTERNS.some((pattern) => pattern.test(path)),
  );
}

function smokeRoutesForSurfaces(surfaces, paths = []) {
  const routes = new Map();
  const replaceBroadVisualSmoke = canReplaceBroadVisualSmoke(paths);

  for (const surface of surfaces) {
    for (const route of surface.smokeRoutes || []) {
      if (replaceBroadVisualSmoke && route.command === 'npm run smoke:visual') continue;
      const key = `${route.command || ''}\0${route.route || ''}\0${route.focus || ''}`;
      if (!routes.has(key)) routes.set(key, route);
    }
  }
  for (const route of routeQaRoutesForPaths(paths)) {
    const key = `${route.command || ''}\0${route.route || ''}\0${route.focus || ''}`;
    if (!routes.has(key)) routes.set(key, route);
  }

  return [...routes.values()].sort((a, b) => {
    const commandOrder = String(a.command || '').localeCompare(String(b.command || ''));
    return commandOrder || String(a.route || '').localeCompare(String(b.route || ''));
  });
}

function routeQaCommandsForPaths(paths) {
  const routes = [...new Set(routeQaRoutesForPaths(paths).map((route) => route.route))].sort();
  if (!routes.length) return [];
  return [`npm run qa:route -- ${routes.map((route) => `--route ${route}`).join(' ')}`];
}

function commandsForSelection(categories, checks) {
  const commands = new Set(OPERATOR_SURFACE_CONTRACT.verification.baseCommands);
  const hasAny = (values, selected) => (values || []).some((value) => selected.includes(value));

  for (const group of OPERATOR_SURFACE_CONTRACT.verification.commandGroups) {
    if (!hasAny(group.categories, categories) && !hasAny(group.checks, checks)) continue;
    for (const command of group.commands) commands.add(command);
  }

  return orderCommandsForExecution([...commands]);
}

function commandsForPlan(categories, checks, paths) {
  const commands = canReplaceBroadVisualSmoke(paths)
    ? commandsForSelection(categories, checks).filter((command) => command !== 'npm run smoke:visual')
    : commandsForSelection(categories, checks);
  const routeCommands = routeQaCommandsForPaths(paths);
  if (!routeCommands.length) return commands;

  const planned = [...commands];
  if (!planned.includes('npm run build:fast')) planned.push('npm run build:fast');
  for (const command of routeCommands) planned.push(command);
  return orderCommandsForExecution(planned);
}

export function commandsForCategories(categories) {
  return commandsForSelection(categories, []);
}

export function routeQaReplacesBroadVisualSmokeForPaths(paths) {
  return canReplaceBroadVisualSmoke(paths);
}

export function planForPaths(paths) {
  const surfaces = matchingSurfaces(paths);
  const surfaceSummaries = surfaceSummariesForSurfaces(surfaces);
  const categories = categoriesForSurfaces(surfaces);
  const checks = checksForSurfaces(surfaces);
  const guidance = guidanceForSurfaces(surfaces);
  const broadSmokeReplacedByRouteQa = canReplaceBroadVisualSmoke(paths);
  return {
    project_dir: PROJECT_DIR,
    paths,
    surfaces: surfaceSummaries,
    surface_ids: surfaceSummaries.map((surface) => surface.id),
    surface_labels: surfaceSummaries.map((surface) => surface.label),
    categories,
    checks,
    guidance,
    smoke_routes: smokeRoutesForSurfaces(surfaces, paths),
    broad_smoke_replaced_by_route_qa: broadSmokeReplacedByRouteQa,
    commands: paths.length ? commandsForPlan(categories, checks, paths) : [],
    note: paths.length
      ? 'Run with --run to execute these commands in order.'
      : 'No changed tracked or untracked files were detected.',
  };
}

function printHelp() {
  console.log(`Usage: node scripts/check-smart.mjs [--run] [--json] [--base <ref>] [--path <path>...]

Recommends the smallest AiPedia verification set for the current git diff.
Use --base <ref> to include committed changes from merge-base(ref, HEAD)..HEAD.

Examples:
  npm run check:smart
  npm run check:smart:run
  node scripts/check-smart.mjs --base origin/master --json
  node scripts/check-smart.mjs --path src/content/tools/chatgpt.md --json
`);
}

function printPlan(plan) {
  if (jsonMode) {
    console.log(`${JSON.stringify(plan, null, 2)}\n`);
    return;
  }

  if (!plan.paths.length) {
    console.log(plan.note);
    return;
  }

  console.log('Changed paths:');
  for (const path of plan.paths) console.log(`- ${path}`);
  console.log('\nDetected surfaces:');
  for (const surface of plan.surfaces) console.log(`- ${surface.id}: ${surface.label}`);
  console.log('\nDetected categories:');
  for (const category of plan.categories) console.log(`- ${category}`);
  if (plan.checks.length) {
    console.log('\nRequired checks:');
    for (const check of plan.checks) console.log(`- ${check}`);
  }
  if (plan.guidance.length) {
    console.log('\nOperator guidance:');
    for (const line of plan.guidance) console.log(`- ${line}`);
  }
  if (plan.smoke_routes.length) {
    console.log('\nBrowser smoke routes:');
    for (const route of plan.smoke_routes) {
      const focus = route.focus ? ` (${route.focus})` : '';
      console.log(`- ${route.command}: ${route.route}${focus}`);
    }
  }
  if (plan.broad_smoke_replaced_by_route_qa) {
    console.log('\nBroad visual smoke: replaced by exact route QA for this content-only route set.');
  }
  console.log('\nRecommended verification:');
  for (const command of plan.commands) console.log(`- ${command}`);
  console.log(`\n${plan.note}`);
}

function runCommands(commands) {
  let fastBuildReady = false;

  for (const command of commands) {
    console.log(`\n> ${command}`);
    const startedAt = performance.now();
    const result = spawnSync(command, {
      cwd: PROJECT_DIR,
      env: envForCommand(command, fastBuildReady),
      shell: true,
      stdio: 'inherit',
    });
    const durationMs = performance.now() - startedAt;
    const durationSeconds = (durationMs / 1000).toFixed(1);
    if (result.status !== 0) {
      console.log(`[check-smart] ${command} failed after ${durationSeconds}s`);
      return result.status || 1;
    }
    console.log(`[check-smart] ${command} finished in ${durationSeconds}s`);
    if (isFastBuildCommand(command)) fastBuildReady = true;
  }
  return 0;
}

function orderCommandsForExecution(commands) {
  const planned = [...commands];
  const buildIndex = planned.findIndex(isFastBuildCommand);
  if (buildIndex === -1) return planned;

  const firstBrowserIndex = planned.findIndex(isBrowserOutputCommand);
  if (firstBrowserIndex === -1 || buildIndex < firstBrowserIndex) return planned;

  const [buildCommand] = planned.splice(buildIndex, 1);
  planned.splice(firstBrowserIndex, 0, buildCommand);
  return planned;
}

function isFastBuildCommand(command) {
  return /^npm run build:fast\b/.test(command.trim());
}

function isBrowserOutputCommand(command) {
  const trimmed = command.trim();
  return /^npm run (qa:route|smoke:visual|check:dist)\b/.test(trimmed) || /\bscripts\/qa-route\.mjs\b/.test(trimmed);
}

function needsFastBuildEnv(command, fastBuildReady) {
  const trimmed = command.trim();
  if (isFastBuildCommand(trimmed)) return true;
  if (!fastBuildReady) return false;
  return isBrowserOutputCommand(trimmed);
}

export function envForCommand(command, fastBuildReady) {
  const env = { ...process.env };
  if (needsFastBuildEnv(command, fastBuildReady)) {
    env.AIPEDIA_FAST_BUILD = '1';
  } else {
    delete env.AIPEDIA_FAST_BUILD;
  }
  if (fastBuildReady && usesPlaywrightServer(command)) {
    env.AIPEDIA_PLAYWRIGHT_SITE_DIR = 'dist-fast/client';
    env.AIPEDIA_PLAYWRIGHT_REUSE_SERVER = '0';
  }
  return env;
}

function usesPlaywrightServer(command) {
  const trimmed = command.trim();
  return /^npm run (qa:route|smoke:visual)\b/.test(trimmed) || /\bscripts\/qa-route\.mjs\b/.test(trimmed);
}

function main() {
  const argIssues = validateArgs();
  if (helpMode) {
    printHelp();
    process.exit(0);
  }
  if (argIssues.length) {
    const report = { ok: false, argument_issues: argIssues };
    if (jsonMode) console.log(`${JSON.stringify(report, null, 2)}\n`);
    else console.error(argIssues.join('\n'));
    process.exit(1);
  }

  if (!existsSync(resolve(PROJECT_DIR, '.git'))) {
    console.error('check-smart must run from inside the AiPedia git checkout.');
    process.exit(1);
  }

  let plan;
  try {
    plan = planForPaths(changedPaths());
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    if (jsonMode) console.log(`${JSON.stringify({ ok: false, error: detail }, null, 2)}\n`);
    else console.error(detail);
    process.exit(1);
  }
  printPlan(plan);

  if (runMode && plan.commands.length) {
    process.exit(runCommands(plan.commands));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
