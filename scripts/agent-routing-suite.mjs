#!/usr/bin/env node
// Build a deterministic multi-scenario routing evaluation suite receipt.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingEvaluationSuite, suiteIssue } from './lib/routing-evaluation-suite.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--help', '-h', '--input', '--json', '--out', '--project-dir', '--root']);
const VALUE_FLAGS = new Set(['--input', '--out', '--project-dir', '--root']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const INPUT_PATH = valueFor('--input');
const OUT_PATH = valueFor('--out');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-evaluation-suite',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const inputFile = resolve(PROJECT_DIR, INPUT_PATH);
const issues = [];
let input = null;
if (!existsSync(inputFile)) {
  issues.push(suiteIssue('routing-suite-input-missing', `${projectPath(inputFile)} does not exist.`));
} else {
  try {
    input = JSON.parse(readFileSync(inputFile, 'utf8'));
  } catch (error) {
    issues.push(suiteIssue('routing-suite-input-invalid', `${projectPath(inputFile)} could not parse as JSON: ${error.message}`));
  }
}

if (issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-evaluation-suite',
    project_dir: PROJECT_DIR,
    source: projectPath(inputFile),
    issues,
  });
  process.exit(1);
}

const result = buildRoutingEvaluationSuite(input, {
  projectDir: PROJECT_DIR,
  source: projectPath(inputFile),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-evaluation-suite',
    project_dir: PROJECT_DIR,
    source: projectPath(inputFile),
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
    '  node scripts/agent-routing-suite.mjs --input <path> --json',
    '  node scripts/agent-routing-suite.mjs --input <path> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-evaluation-suite.v1 receipt from multiple routing evaluation scenarios.',
    'Use it before claiming one orchestration route is broadly better across task classes.',
    '',
    'Options:',
    '  --input <path>        Input JSON with routing evaluation scenarios.',
    '  --out <path>          Optional receipt output path.',
    '  --project-dir <dir>   Project root. Alias: --root.',
    '  --json                Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help                Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(suiteIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(suiteIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(suiteIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!INPUT_PATH) issues.push(suiteIssue('argument-invalid', '--input is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(suiteIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  return issues;
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
