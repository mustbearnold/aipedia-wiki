#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
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

export function classifyPaths(paths) {
  const categories = new Set();

  for (const path of paths.map(normalizePath)) {
    if (!path) continue;

    if (
      path.startsWith('.agent/') ||
      path.startsWith('.claude/') ||
      path === 'AGENTS.md' ||
      path === 'README.md' ||
      path.startsWith('docs/')
    ) {
      categories.add('docs');
    }

    if (
      path.startsWith('src/content/') ||
      path.startsWith('src/content-antigravity/') ||
      path.startsWith('src/pages/answers/') ||
      path.startsWith('src/data/') ||
      path === 'PAGE_REFRESH_LEDGER.md'
    ) {
      categories.add('content');
    }

    if (
      path.startsWith('src/layouts/') ||
      path.startsWith('src/components/') ||
      path.startsWith('src/styles/') ||
      path.startsWith('src/plugins/') ||
      path.startsWith('src/utils/') ||
      path.startsWith('src/lib/') ||
      path === 'astro.config.mjs' ||
      path === 'tsconfig.json' ||
      path === 'vercel.json' ||
      /^src\/pages\/(?!api\/).+\.(astro|ts)$/.test(path)
    ) {
      categories.add('runtime');
    }

    if (path.startsWith('public/')) categories.add('assets');
    if (path.startsWith('scripts/') || path.startsWith('tests/') || path === 'package.json') categories.add('tooling');
    if (path === 'package-lock.json') categories.add('dependencies');
    if (path.startsWith('.github/workflows/')) categories.add('ci');
    if (path === '.gitignore' || path === '.gitattributes' || path === '.mcp.json') categories.add('repo');
  }

  return [...categories].sort();
}

export function commandsForCategories(categories) {
  const commands = new Set(['git diff --check']);
  const has = (category) => categories.includes(category);

  if (has('tooling') || has('ci') || has('repo')) {
    commands.add('npm run test:scripts');
    commands.add('npm run audit:commands');
  }

  if (has('content')) {
    commands.add('npm run ledger:pages:check');
    commands.add('npm run guard:check');
    commands.add('npm run audit:facts');
    commands.add('npm run audit:sources');
    commands.add('npm run check:links');
    commands.add('npm run check:news');
  }

  if (has('assets')) commands.add('npm run check:assets:quick');
  if (has('runtime') || has('dependencies')) commands.add('npm run build:fast');
  if (has('dependencies')) commands.add('npm run check:security');

  return [...commands];
}

export function planForPaths(paths) {
  const categories = classifyPaths(paths);
  return {
    project_dir: PROJECT_DIR,
    paths,
    categories,
    commands: paths.length ? commandsForCategories(categories) : [],
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
  console.log('\nDetected categories:');
  for (const category of plan.categories) console.log(`- ${category}`);
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
