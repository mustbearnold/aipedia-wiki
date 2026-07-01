#!/usr/bin/env node
// Build a receipt-backed completion gate for runtime routing default changes.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingRuntimeCompletion, routingRuntimeCompletionIssue } from './lib/routing-runtime-completion.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set([
  '--applied-at',
  '--apply-command',
  '--change-command',
  '--change-id',
  '--completion-task',
  '--completed-at',
  '--evidence-note',
  '--handoff',
  '--handoff-receipt',
  '--help',
  '-h',
  '--input',
  '--json',
  '--monitor-trends',
  '--operator',
  '--out',
  '--project-dir',
  '--root',
  '--runtime-system',
  '--system',
  '--trend',
  '--trends',
  '--verification-command',
  '--verification-status',
  '--verify-command',
]);
const VALUE_FLAGS = new Set([
  '--applied-at',
  '--apply-command',
  '--change-command',
  '--change-id',
  '--completion-task',
  '--completed-at',
  '--evidence-note',
  '--handoff',
  '--handoff-receipt',
  '--input',
  '--monitor-trends',
  '--operator',
  '--out',
  '--project-dir',
  '--root',
  '--runtime-system',
  '--system',
  '--trend',
  '--trends',
  '--verification-command',
  '--verification-status',
  '--verify-command',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const HANDOFF_PATH = valueFor('--handoff') || valueFor('--handoff-receipt') || valueFor('--input');
const TRENDS_PATH = valueFor('--monitor-trends') || valueFor('--trends') || valueFor('--trend');
const OUT_PATH = valueFor('--out');
const COMPLETION_TASK = valueFor('--completion-task');
const RUNTIME_SYSTEM = valueFor('--runtime-system') || valueFor('--system');
const CHANGE_ID = valueFor('--change-id');
const OPERATOR = valueFor('--operator');
const APPLIED_AT = valueFor('--applied-at') || valueFor('--completed-at');
const APPLY_COMMAND = valueFor('--apply-command') || valueFor('--change-command');
const VERIFICATION_COMMAND = valueFor('--verification-command') || valueFor('--verify-command');
const VERIFICATION_STATUS = valueFor('--verification-status');
const EVIDENCE_NOTE = valueFor('--evidence-note');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-runtime-completion',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const handoffRead = readJsonFile(HANDOFF_PATH, 'routing-runtime-completion-handoff-missing', 'routing-runtime-completion-handoff-invalid');
const trendsRead = readJsonFile(TRENDS_PATH, 'routing-runtime-completion-monitor-trends-missing', 'routing-runtime-completion-monitor-trends-invalid');
const readIssues = [...handoffRead.issues, ...trendsRead.issues];
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-runtime-completion',
    project_dir: PROJECT_DIR,
    source: [HANDOFF_PATH, TRENDS_PATH].filter(Boolean).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingRuntimeCompletion({
  handoff: handoffRead.value,
  monitor_trends: trendsRead.value,
  runtime_completion: {
    runtime_system: RUNTIME_SYSTEM,
    change_id: CHANGE_ID,
    operator: OPERATOR,
    applied_at: APPLIED_AT,
    apply_command: APPLY_COMMAND,
    verification_command: VERIFICATION_COMMAND,
    verification_status: VERIFICATION_STATUS || 'not-run',
    evidence_note: EVIDENCE_NOTE,
  },
  ...(COMPLETION_TASK ? { completion_task: COMPLETION_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: [handoffRead.absolutePath, trendsRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-runtime-completion',
    project_dir: PROJECT_DIR,
    source: [handoffRead.absolutePath, trendsRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
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
    '  node scripts/agent-routing-runtime-completion.mjs --handoff <path> --monitor-trends <path> --runtime-system <id> --applied-at <iso> --verification-status passed --json',
    '  node scripts/agent-routing-runtime-completion.mjs --handoff <path> --trend <path> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-runtime-completion.v1 receipt for deployed routing default changes.',
    'The gate requires a runtime-mode handoff receipt, a healthy repeated monitor-trend receipt, matching rollout lineage, the handoff monitor inside the trend, matching runtime change fields, and passed verification.',
    '',
    'Options:',
    '  --handoff <path>                Runtime-mode routing handoff receipt. Aliases: --handoff-receipt, --input.',
    '  --monitor-trends <path>        Routing monitor-trends receipt. Aliases: --trend, --trends.',
    '  --runtime-system <id>          Runtime system or router identifier. Alias: --system.',
    '  --applied-at <iso>             ISO timestamp for the runtime completion. Alias: --completed-at.',
    '  --verification-status <status> passed, failed, or not-run.',
    '  --change-id <id>               Optional change id. Defaults to the handoff change id.',
    '  --operator <name>              Optional operator. Defaults to the handoff operator.',
    '  --apply-command <cmd>          Optional apply command. Defaults to the handoff apply command.',
    '  --change-command <cmd>         Alias for --apply-command.',
    '  --verification-command <cmd>   Optional verification command. Defaults to the handoff verification command.',
    '  --verify-command <cmd>         Alias for --verification-command.',
    '  --evidence-note <text>         Optional runtime evidence note.',
    '  --completion-task <text>       Optional completion task label.',
    '  --out <path>                   Optional runtime completion receipt output path.',
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
      if (!VALUE_FLAGS.has(previous)) issues.push(routingRuntimeCompletionIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingRuntimeCompletionIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingRuntimeCompletionIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!HANDOFF_PATH) issues.push(routingRuntimeCompletionIssue('argument-invalid', '--handoff, --handoff-receipt, or --input is required.'));
  if (!TRENDS_PATH) issues.push(routingRuntimeCompletionIssue('argument-invalid', '--monitor-trends, --trend, or --trends is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingRuntimeCompletionIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingRuntimeCompletionIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingRuntimeCompletionIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
