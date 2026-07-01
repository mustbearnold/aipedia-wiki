#!/usr/bin/env node
// Check a routing policy against a bounded routing-suite pilot receipt.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingPolicyPilot, routingPolicyPilotIssue } from './lib/routing-policy-pilot.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--help', '-h', '--input', '--json', '--out', '--pilot-task', '--policy', '--project-dir', '--root', '--suite']);
const VALUE_FLAGS = new Set(['--input', '--out', '--pilot-task', '--policy', '--project-dir', '--root', '--suite']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const POLICY_PATH = valueFor('--policy') || valueFor('--input');
const SUITE_PATH = valueFor('--suite');
const OUT_PATH = valueFor('--out');
const PILOT_TASK = valueFor('--pilot-task');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-pilot',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const policyRead = readJsonFile(POLICY_PATH, 'routing-policy-pilot-policy-missing', 'routing-policy-pilot-policy-invalid');
const suiteRead = readJsonFile(SUITE_PATH, 'routing-policy-pilot-suite-missing', 'routing-policy-pilot-suite-invalid');
const readIssues = [...policyRead.issues, ...suiteRead.issues];
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-pilot',
    project_dir: PROJECT_DIR,
    source: [POLICY_PATH, SUITE_PATH].filter(Boolean).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingPolicyPilot({
  policy: policyRead.value,
  suite: suiteRead.value,
  ...(PILOT_TASK ? { pilot_task: PILOT_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: `${projectPath(policyRead.absolutePath)} + ${projectPath(suiteRead.absolutePath)}`,
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-pilot',
    project_dir: PROJECT_DIR,
    source: `${projectPath(policyRead.absolutePath)} + ${projectPath(suiteRead.absolutePath)}`,
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
    '  node scripts/agent-routing-pilot.mjs --policy <path> --suite <path> --json',
    '  node scripts/agent-routing-pilot.mjs --policy <path> --suite <path> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-policy-pilot.v1 receipt by checking a routing policy against a bounded routing-suite receipt.',
    'Source-suite replays are marked replay-only, so they cannot be mistaken for independent workload pilots.',
    '',
    'Options:',
    '  --policy <path>      Routing-policy receipt. Alias: --input.',
    '  --suite <path>       Pilot routing-suite receipt.',
    '  --out <path>         Optional pilot receipt output path.',
    '  --pilot-task <text>  Optional pilot task label.',
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
      if (!VALUE_FLAGS.has(previous)) issues.push(routingPolicyPilotIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingPolicyPilotIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingPolicyPilotIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!POLICY_PATH) issues.push(routingPolicyPilotIssue('argument-invalid', '--policy or --input is required.'));
  if (!SUITE_PATH) issues.push(routingPolicyPilotIssue('argument-invalid', '--suite is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingPolicyPilotIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingPolicyPilotIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingPolicyPilotIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
