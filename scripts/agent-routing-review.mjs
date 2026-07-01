#!/usr/bin/env node
// Review a passed routing-policy pilot before any default orchestration change.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingPolicyReview, REQUIRED_ROUTING_POLICY_REVIEW_LENSES, routingPolicyReviewIssue } from './lib/routing-policy-review.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--help', '-h', '--accept-required-lenses', '--input', '--json', '--note', '--out', '--pilot', '--project-dir', '--review-task', '--reviewer', '--root']);
const VALUE_FLAGS = new Set(['--input', '--note', '--out', '--pilot', '--project-dir', '--review-task', '--reviewer', '--root']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const PILOT_PATH = valueFor('--pilot') || valueFor('--input');
const OUT_PATH = valueFor('--out');
const REVIEWER = valueFor('--reviewer');
const REVIEW_TASK = valueFor('--review-task');
const ACCEPT_REQUIRED_LENSES = hasFlag('--accept-required-lenses');
const REVIEW_NOTE = valuesFor('--note').join(' ');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-review',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const pilotRead = readJsonFile(PILOT_PATH, 'routing-policy-review-pilot-missing', 'routing-policy-review-pilot-invalid');
if (pilotRead.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-review',
    project_dir: PROJECT_DIR,
    source: PILOT_PATH,
    issues: pilotRead.issues,
  });
  process.exit(1);
}

const result = buildRoutingPolicyReview({
  pilot: pilotRead.value,
  accept_required_lenses: ACCEPT_REQUIRED_LENSES,
  reviewer: REVIEWER,
  review_note: REVIEW_NOTE,
  ...(REVIEW_TASK ? { review_task: REVIEW_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: projectPath(pilotRead.absolutePath),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-policy-review',
    project_dir: PROJECT_DIR,
    source: projectPath(pilotRead.absolutePath),
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
    '  node scripts/agent-routing-review.mjs --pilot <path> --accept-required-lenses --reviewer <name> --json',
    '  node scripts/agent-routing-review.mjs --pilot <path> --accept-required-lenses --reviewer <name> --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-policy-review.v1 receipt from a routing-policy-pilot receipt.',
    'A default-ready review requires a fresh independent pass plus accepted review rows for these lenses:',
    `  ${REQUIRED_ROUTING_POLICY_REVIEW_LENSES.join(', ')}`,
    '',
    'Options:',
    '  --pilot <path>               Routing-policy-pilot receipt. Alias: --input.',
    '  --accept-required-lenses     Generate accepted review rows for every required lens.',
    '  --reviewer <name>            Reviewer identity for generated review rows.',
    '  --note <text>                Reviewer note. Repeatable and joined with spaces.',
    '  --out <path>                 Optional review receipt output path.',
    '  --review-task <text>         Optional review task label.',
    '  --project-dir <dir>          Project root. Alias: --root.',
    '  --json                       Emit JSON. Human mode still prints compact JSON for receipt safety.',
    '  --help                       Show this help.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(routingPolicyReviewIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingPolicyReviewIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingPolicyReviewIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!PILOT_PATH) issues.push(routingPolicyReviewIssue('argument-invalid', '--pilot or --input is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingPolicyReviewIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  if (ACCEPT_REQUIRED_LENSES && !REVIEWER) {
    issues.push(routingPolicyReviewIssue('argument-invalid', '--reviewer is required with --accept-required-lenses.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingPolicyReviewIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingPolicyReviewIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1] || '';
      if (value && !value.startsWith('-')) values.push(value);
      index += 1;
      continue;
    }
    if (arg.startsWith(`${flag}=`)) values.push(arg.slice(flag.length + 1));
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
