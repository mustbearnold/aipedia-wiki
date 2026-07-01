#!/usr/bin/env node
// Summarize routing monitor trend receipts across a longer window.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingMonitorTrendRollup, routingMonitorTrendRollupIssue } from './lib/routing-monitor-trend-rollup.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--help',
  '-h',
  '--input',
  '--json',
  '--out',
  '--path',
  '--project-dir',
  '--receipt',
  '--rollup-task',
  '--root',
  '--trend',
]);
const VALUE_FLAGS = new Set([
  '--input',
  '--out',
  '--path',
  '--project-dir',
  '--receipt',
  '--rollup-task',
  '--root',
  '--trend',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const TREND_PATHS = valuesFor('--trend')
  .concat(valuesFor('--receipt'))
  .concat(valuesFor('--path'))
  .concat(valuesFor('--input'));
const OUT_PATH = valueFor('--out');
const ROLLUP_TASK = valueFor('--rollup-task');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trend-rollup',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const reads = TREND_PATHS.map((path) => readJsonFile(path));
const readIssues = reads.flatMap((read) => read.issues);
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trend-rollup',
    project_dir: PROJECT_DIR,
    source: reads.map((read) => read.absolutePath).filter(Boolean).map(projectPath).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingMonitorTrendRollup({
  trend_receipts: reads.map((read) => read.value),
  ...(ROLLUP_TASK ? { rollup_task: ROLLUP_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: reads.map((read) => read.absolutePath).filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trend-rollup',
    project_dir: PROJECT_DIR,
    source: reads.map((read) => read.absolutePath).filter(Boolean).map(projectPath).join(' + '),
    issues: result.issues,
  });
  process.exit(1);
}

const receipt = result.receipt;
if (OUT_PATH) {
  const outFile = resolve(PROJECT_DIR, OUT_PATH);
  mkdirSync(dirname(outFile), { recursive: true });
  receipt.receipt_path = projectPath(outFile);
  writeFileSync(outFile, `${JSON.stringify(receipt, null, 2)}\n`);
}

emit(receipt);
process.exit(receipt.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-routing-monitor-trend-rollup.mjs --trend <path> --trend <path> --json',
    '  node scripts/agent-routing-monitor-trend-rollup.mjs --receipt <path> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-monitor-trend-rollup.v1 receipt from routing monitor trend receipts.',
    'The receipt stays in attention state until it has enough unique, healthy trend windows to prove longer-window routing stability.',
    '',
    'Options:',
    '  --trend <path>       Routing monitor trend receipt or summary. Repeatable. Aliases: --receipt, --path, --input.',
    '  --rollup-task <text> Optional rollup task label.',
    '  --out <path>         Optional trend-rollup receipt output path.',
    '  --project-dir <dir>  Project root. Alias: --root.',
    '  --json               Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help               Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(routingMonitorTrendRollupIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingMonitorTrendRollupIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const values = valuesFor(flag);
    if (!values.length) issues.push(routingMonitorTrendRollupIssue('argument-invalid', `${flag} requires a value.`));
    for (const value of values) {
      if (!value || value.startsWith('-')) issues.push(routingMonitorTrendRollupIssue('argument-invalid', `${flag} requires a value.`));
    }
  }
  if (!TREND_PATHS.length) {
    issues.push(routingMonitorTrendRollupIssue('argument-invalid', '--trend, --receipt, --path, or --input is required.'));
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingMonitorTrendRollupIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-missing', `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingMonitorTrendRollupIssue('routing-monitor-trend-rollup-trend-invalid', `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
    return { absolutePath, value: null, issues };
  }
}

function emit(value) {
  const text = JSON.stringify(value, null, 2);
  if (JSON_MODE) {
    process.stdout.write(`${text}\n`);
  } else {
    process.stdout.write(`${text}\n`);
  }
}

function valueFor(flag) {
  const values = valuesFor(flag);
  return values[0] || '';
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1];
      if (value != null && !String(value).startsWith('--')) values.push(value);
      index += 1;
      continue;
    }
    if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values;
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function projectPath(path) {
  return path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length + 1) : path;
}
