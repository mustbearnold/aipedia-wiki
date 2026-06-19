#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const OPERATOR_SURFACES_PATH = resolve(PROJECT_DIR, 'src/data/operator-surfaces.json');
const args = process.argv.slice(2);
const runMode = args.includes('--run');
const jsonMode = args.includes('--json');
const helpMode = args.includes('--help') || args.includes('-h');
const explicitPaths = valuesFor('--path').concat(valuesFor('--paths'));

const KNOWN_FLAGS = new Set(['--run', '--json', '--help', '-h', '--path', '--paths']);

function valuesFor(flag) {
  const values = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === flag) {
      const value = args[i + 1];
      if (value && !value.startsWith('--')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',')).map(normalizePath).filter(Boolean);
}

function validateArgs() {
  const issues = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (!arg.startsWith('-')) continue;
    const flag = arg.includes('=') ? arg.slice(0, arg.indexOf('=')) : arg;
    if (!KNOWN_FLAGS.has(flag)) issues.push(`unknown flag ${arg}`);
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

function changedPaths() {
  if (explicitPaths.length) return [...new Set(explicitPaths)];
  const paths = [
    ...gitLines(['diff', '--name-only']),
    ...gitLines(['diff', '--name-only', '--cached']),
    ...gitLines(['ls-files', '--others', '--exclude-standard']),
  ];
  return [...new Set(paths)].sort();
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

function surfaceSummariesForSurfaces(surfaces) {
  return surfaces
    .map((surface) => ({ id: surface.id, label: surface.label }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

function smokeRoutesForSurfaces(surfaces) {
  const routes = new Map();

  for (const surface of surfaces) {
    for (const route of surface.smokeRoutes || []) {
      const key = `${route.command || ''}\0${route.route || ''}\0${route.focus || ''}`;
      if (!routes.has(key)) routes.set(key, route);
    }
  }

  return [...routes.values()].sort((a, b) => {
    const commandOrder = String(a.command || '').localeCompare(String(b.command || ''));
    return commandOrder || String(a.route || '').localeCompare(String(b.route || ''));
  });
}

function commandsForSelection(categories, checks) {
  const commands = new Set(OPERATOR_SURFACE_CONTRACT.verification.baseCommands);
  const hasAny = (values, selected) => (values || []).some((value) => selected.includes(value));

  for (const group of OPERATOR_SURFACE_CONTRACT.verification.commandGroups) {
    if (!hasAny(group.categories, categories) && !hasAny(group.checks, checks)) continue;
    for (const command of group.commands) commands.add(command);
  }

  return [...commands];
}

export function commandsForCategories(categories) {
  return commandsForSelection(categories, []);
}

export function planForPaths(paths) {
  const surfaces = matchingSurfaces(paths);
  const surfaceSummaries = surfaceSummariesForSurfaces(surfaces);
  const categories = categoriesForSurfaces(surfaces);
  const checks = checksForSurfaces(surfaces);
  return {
    project_dir: PROJECT_DIR,
    paths,
    surfaces: surfaceSummaries,
    surface_ids: surfaceSummaries.map((surface) => surface.id),
    surface_labels: surfaceSummaries.map((surface) => surface.label),
    categories,
    checks,
    smoke_routes: smokeRoutesForSurfaces(surfaces),
    commands: paths.length ? commandsForSelection(categories, checks) : [],
    note: paths.length
      ? 'Run with --run to execute these commands in order.'
      : 'No changed tracked or untracked files were detected.',
  };
}

function printHelp() {
  console.log(`Usage: node scripts/check-smart.mjs [--run] [--json] [--path <path>...]

Recommends the smallest AiPedia verification set for the current git diff.

Examples:
  npm run check:smart
  npm run check:smart:run
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
  if (plan.smoke_routes.length) {
    console.log('\nBrowser smoke routes:');
    for (const route of plan.smoke_routes) {
      const focus = route.focus ? ` (${route.focus})` : '';
      console.log(`- ${route.command}: ${route.route}${focus}`);
    }
  }
  console.log('\nRecommended verification:');
  for (const command of plan.commands) console.log(`- ${command}`);
  console.log(`\n${plan.note}`);
}

function runCommands(commands) {
  for (const command of commands) {
    console.log(`\n> ${command}`);
    const result = spawnSync(command, {
      cwd: PROJECT_DIR,
      shell: true,
      stdio: 'inherit',
    });
    if (result.status !== 0) return result.status || 1;
  }
  return 0;
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

  const plan = planForPaths(changedPaths());
  printPlan(plan);

  if (runMode && plan.commands.length) {
    process.exit(runCommands(plan.commands));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
