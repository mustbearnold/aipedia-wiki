#!/usr/bin/env node
// Verify post-default routing health with a fresh monitoring suite and rollback plan.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingMonitor, routingMonitorIssue } from './lib/routing-monitor.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--default-rollout',
  '--help',
  '-h',
  '--input',
  '--json',
  '--monitor-task',
  '--out',
  '--project-dir',
  '--rollback-command',
  '--rollback-owner',
  '--rollback-trigger',
  '--rollback-verify',
  '--root',
  '--rollout',
  '--suite',
]);
const VALUE_FLAGS = new Set([
  '--default-rollout',
  '--input',
  '--monitor-task',
  '--out',
  '--project-dir',
  '--rollback-command',
  '--rollback-owner',
  '--rollback-trigger',
  '--rollback-verify',
  '--root',
  '--rollout',
  '--suite',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const ROLLOUT_PATH = valueFor('--default-rollout') || valueFor('--rollout') || valueFor('--input');
const SUITE_PATH = valueFor('--suite');
const OUT_PATH = valueFor('--out');
const MONITOR_TASK = valueFor('--monitor-task');
const ROLLBACK_COMMAND = valueFor('--rollback-command');
const ROLLBACK_VERIFY = valueFor('--rollback-verify');
const ROLLBACK_OWNER = valueFor('--rollback-owner');
const ROLLBACK_TRIGGER = valueFor('--rollback-trigger');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const rolloutRead = readJsonFile(ROLLOUT_PATH, 'routing-monitor-rollout-missing', 'routing-monitor-rollout-invalid');
const suiteRead = readJsonFile(SUITE_PATH, 'routing-monitor-suite-missing', 'routing-monitor-suite-invalid');
const readIssues = [...rolloutRead.issues, ...suiteRead.issues];
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor',
    project_dir: PROJECT_DIR,
    source: [ROLLOUT_PATH, SUITE_PATH].filter(Boolean).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingMonitor({
  default_rollout: rolloutRead.value,
  suite: suiteRead.value,
  rollback_plan: {
    owner: ROLLBACK_OWNER,
    rollback_command: ROLLBACK_COMMAND,
    verification_command: ROLLBACK_VERIFY,
    trigger: ROLLBACK_TRIGGER,
  },
  ...(MONITOR_TASK ? { monitor_task: MONITOR_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: [rolloutRead.absolutePath, suiteRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-monitor',
    project_dir: PROJECT_DIR,
    source: [rolloutRead.absolutePath, suiteRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
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
    '  node scripts/agent-routing-monitor.mjs --default-rollout <path> --suite <path> --rollback-command <cmd> --rollback-verify <cmd> --json',
    '  node scripts/agent-routing-monitor.mjs --rollout <path> --suite <path> --out <path> --rollback-command <cmd> --rollback-verify <cmd> --json',
    '',
    'Builds an aipedia.agent-routing-monitor.v1 receipt after a default-ready routing rollout.',
    'The gate requires a fresh monitoring suite, exact tokens, correction telemetry, quality, accuracy, wall-time evidence, and rollback instructions.',
    '',
    'Options:',
    '  --default-rollout <path>   Default-ready routing rollout receipt. Aliases: --rollout, --input.',
    '  --suite <path>             Fresh routing-evaluation-suite receipt for post-default monitoring.',
    '  --rollback-command <cmd>   Command or runbook step that reverts the default routing change.',
    '  --rollback-verify <cmd>    Command that verifies rollback success.',
    '  --rollback-owner <name>    Optional owner for rollback.',
    '  --rollback-trigger <text>  Optional trigger description.',
    '  --monitor-task <text>      Optional monitor task label.',
    '  --out <path>               Optional monitor receipt output path.',
    '  --project-dir <dir>        Project root. Alias: --root.',
    '  --json                     Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help                     Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(routingMonitorIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingMonitorIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingMonitorIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!ROLLOUT_PATH) issues.push(routingMonitorIssue('argument-invalid', '--default-rollout, --rollout, or --input is required.'));
  if (!SUITE_PATH) issues.push(routingMonitorIssue('argument-invalid', '--suite is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingMonitorIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingMonitorIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingMonitorIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1] || '';
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
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
