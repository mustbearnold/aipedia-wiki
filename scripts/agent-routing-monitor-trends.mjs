#!/usr/bin/env node
// Compare repeated post-default routing monitor receipts for drift.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingMonitorTrends, routingMonitorTrendsIssue } from './lib/routing-monitor-trends.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--help',
  '-h',
  '--input',
  '--json',
  '--monitor',
  '--out',
  '--path',
  '--project-dir',
  '--receipt',
  '--root',
  '--trend-task',
]);
const VALUE_FLAGS = new Set([
  '--input',
  '--monitor',
  '--out',
  '--path',
  '--project-dir',
  '--receipt',
  '--root',
  '--trend-task',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const MONITOR_PATHS = valuesFor('--monitor')
  .concat(valuesFor('--receipt'))
  .concat(valuesFor('--path'))
  .concat(valuesFor('--input'));
const OUT_PATH = valueFor('--out');
const TREND_TASK = valueFor('--trend-task');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trends',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const reads = MONITOR_PATHS.map((path) => readJsonFile(path));
const readIssues = reads.flatMap((read) => read.issues);
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trends',
    project_dir: PROJECT_DIR,
    source: reads.map((read) => read.absolutePath).filter(Boolean).map(projectPath).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingMonitorTrends({
  monitor_receipts: reads.map((read) => read.value),
  ...(TREND_TASK ? { trend_task: TREND_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: reads.map((read) => read.absolutePath).filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor-trends',
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
    '  node scripts/agent-routing-monitor-trends.mjs --monitor <path> --monitor <path> --json',
    '  node scripts/agent-routing-monitor-trends.mjs --receipt <path> --receipt <path> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-monitor-trends.v1 receipt from repeated post-default routing monitor receipts.',
    'The gate requires at least two healthy monitor receipts from one default rollout lineage, distinct fresh monitoring suites, stable scenario coverage, and drift within exact-token, wall-time, quality, accuracy, and failure thresholds.',
    '',
    'Options:',
    '  --monitor <path>     Routing monitor receipt. Repeatable. Aliases: --receipt, --path, --input.',
    '  --trend-task <text>  Optional trend task label.',
    '  --out <path>         Optional monitor-trend receipt output path.',
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
      if (!VALUE_FLAGS.has(previous)) issues.push(routingMonitorTrendsIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingMonitorTrendsIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const values = valuesFor(flag);
    if (!values.length) issues.push(routingMonitorTrendsIssue('argument-invalid', `${flag} requires a value.`));
    for (const value of values) {
      if (!value || value.startsWith('-')) issues.push(routingMonitorTrendsIssue('argument-invalid', `${flag} requires a value.`));
    }
  }
  if (!MONITOR_PATHS.length) {
    issues.push(routingMonitorTrendsIssue('argument-invalid', '--monitor, --receipt, --path, or --input is required.'));
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingMonitorTrendsIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-missing', `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingMonitorTrendsIssue('routing-monitor-trends-monitor-invalid', `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
