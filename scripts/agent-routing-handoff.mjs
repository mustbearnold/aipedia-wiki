#!/usr/bin/env node
// Build a receipt-backed handoff gate for routing default changes.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingHandoff, routingHandoffIssue } from './lib/routing-handoff.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--apply-command',
  '--change-command',
  '--change-id',
  '--change-mode',
  '--default-rollout',
  '--handoff-task',
  '--help',
  '-h',
  '--input',
  '--json',
  '--monitor',
  '--operator',
  '--out',
  '--project-dir',
  '--root',
  '--rollout',
  '--verification-command',
  '--verify-command',
]);
const VALUE_FLAGS = new Set([
  '--apply-command',
  '--change-command',
  '--change-id',
  '--change-mode',
  '--default-rollout',
  '--handoff-task',
  '--input',
  '--monitor',
  '--operator',
  '--out',
  '--project-dir',
  '--root',
  '--rollout',
  '--verification-command',
  '--verify-command',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const ROLLOUT_PATH = valueFor('--default-rollout') || valueFor('--rollout') || valueFor('--input');
const MONITOR_PATH = valueFor('--monitor');
const OUT_PATH = valueFor('--out');
const HANDOFF_TASK = valueFor('--handoff-task');
const CHANGE_MODE = valueFor('--change-mode');
const CHANGE_ID = valueFor('--change-id');
const OPERATOR = valueFor('--operator');
const APPLY_COMMAND = valueFor('--apply-command') || valueFor('--change-command');
const VERIFICATION_COMMAND = valueFor('--verification-command') || valueFor('--verify-command');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-handoff',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const rolloutRead = readJsonFile(ROLLOUT_PATH, 'routing-handoff-rollout-missing', 'routing-handoff-rollout-invalid');
const monitorRead = readJsonFile(MONITOR_PATH, 'routing-handoff-monitor-missing', 'routing-handoff-monitor-invalid');
const readIssues = [...rolloutRead.issues, ...monitorRead.issues];
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-handoff',
    project_dir: PROJECT_DIR,
    source: [ROLLOUT_PATH, MONITOR_PATH].filter(Boolean).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingHandoff({
  default_rollout: rolloutRead.value,
  monitor: monitorRead.value,
  change_plan: {
    mode: CHANGE_MODE || 'record-only',
    change_id: CHANGE_ID,
    operator: OPERATOR,
    apply_command: APPLY_COMMAND,
    verification_command: VERIFICATION_COMMAND,
  },
  ...(HANDOFF_TASK ? { handoff_task: HANDOFF_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: [rolloutRead.absolutePath, monitorRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-handoff',
    project_dir: PROJECT_DIR,
    source: [rolloutRead.absolutePath, monitorRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
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
    '  node scripts/agent-routing-handoff.mjs --default-rollout <path> --monitor <path> --apply-command <cmd> --verification-command <cmd> --operator <name> --json',
    '  node scripts/agent-routing-handoff.mjs --rollout <path> --monitor <path> --change-command <cmd> --verify-command <cmd> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-handoff.v1 receipt before a routing default-change handoff.',
    'The gate requires a default-ready rollout, a healthy post-default monitor, matching lineage, rollback instructions, and apply plus verification commands.',
    '',
    'Options:',
    '  --default-rollout <path>       Default-ready routing rollout receipt. Aliases: --rollout, --input.',
    '  --monitor <path>               Healthy routing-monitor receipt for that same rollout.',
    '  --apply-command <cmd>          Command or runbook step that applies the default routing change.',
    '  --change-command <cmd>         Alias for --apply-command.',
    '  --verification-command <cmd>   Command that verifies the default routing change.',
    '  --verify-command <cmd>         Alias for --verification-command.',
    '  --change-id <id>               Optional change id. Defaults to rollout policy_change_id or run_id.',
    '  --operator <name>              Operator responsible for the handoff.',
    '  --change-mode <mode>           record-only or runtime. Default: record-only.',
    '  --handoff-task <text>          Optional handoff task label.',
    '  --out <path>                   Optional handoff receipt output path.',
    '  --project-dir <dir>            Project root. Alias: --root.',
    '  --json                         Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help                         Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(routingHandoffIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingHandoffIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingHandoffIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!ROLLOUT_PATH) issues.push(routingHandoffIssue('argument-invalid', '--default-rollout, --rollout, or --input is required.'));
  if (!MONITOR_PATH) issues.push(routingHandoffIssue('argument-invalid', '--monitor is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingHandoffIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingHandoffIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingHandoffIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
