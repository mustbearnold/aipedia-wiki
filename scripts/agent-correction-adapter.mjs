#!/usr/bin/env node
// Normalize reviewer or runtime correction packets into canonical correction telemetry receipts.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildCorrectionTelemetryFromAdapter } from './lib/correction-telemetry-adapter.mjs';
import { correctionIssue } from './lib/correction-telemetry.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--help', '-h', '--input', '--json', '--out', '--normalized-out', '--project-dir', '--root']);
const VALUE_FLAGS = new Set(['--input', '--out', '--normalized-out', '--project-dir', '--root']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const INPUT_PATH = valueFor('--input');
const OUT_PATH = valueFor('--out');
const NORMALIZED_OUT_PATH = valueFor('--normalized-out');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-correction-adapter',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const inputFile = resolve(PROJECT_DIR, INPUT_PATH);
const issues = [];
let input = null;
if (!existsSync(inputFile)) {
  issues.push(correctionIssue('correction-adapter-input-missing', `${projectPath(inputFile)} does not exist.`));
} else {
  try {
    input = JSON.parse(readFileSync(inputFile, 'utf8'));
  } catch (error) {
    issues.push(correctionIssue('correction-adapter-input-invalid', `${projectPath(inputFile)} could not parse as JSON: ${error.message}`));
  }
}

if (issues.length) {
  emit({
    ok: false,
    mode: 'agent-correction-adapter',
    project_dir: PROJECT_DIR,
    source: projectPath(inputFile),
    issues,
  });
  process.exit(1);
}

const result = buildCorrectionTelemetryFromAdapter(input, {
  projectDir: PROJECT_DIR,
  source: projectPath(inputFile),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-correction-adapter',
    project_dir: PROJECT_DIR,
    source: projectPath(inputFile),
    issues: result.issues,
  });
  process.exit(1);
}

if (NORMALIZED_OUT_PATH) {
  const normalizedFile = resolve(PROJECT_DIR, NORMALIZED_OUT_PATH);
  mkdirSync(dirname(normalizedFile), { recursive: true });
  writeFileSync(normalizedFile, `${JSON.stringify(result.telemetryInput, null, 2)}\n`);
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
    '  node scripts/agent-correction-adapter.mjs --input <path> --out <path> --json',
    '  node scripts/agent-correction-adapter.mjs --input <path> --normalized-out <path> --json',
    '',
    'Normalizes reviewer finding packets or runtime event rows into aipedia.correction-telemetry.v1 receipts.',
    'Durable receipts can be validated with agent:meta:closeout:auto and consumed by agent:routing:evaluate.',
    '',
    'Options:',
    '  --input <path>           Adapter input JSON.',
    '  --out <path>             Optional correction telemetry receipt output path.',
    '  --normalized-out <path>  Optional canonical correction telemetry input output path.',
    '  --project-dir <dir>      Project root. Alias: --root.',
    '  --json                   Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help                   Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(correctionIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(correctionIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(correctionIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!INPUT_PATH) issues.push(correctionIssue('argument-invalid', '--input is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(correctionIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
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
