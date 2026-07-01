#!/usr/bin/env node
// Gate routing-policy rollout with accepted review plus fresh runtime metrics.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildRoutingRollout, routingRolloutIssue } from './lib/routing-rollout.mjs';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--canary-rollout', '--help', '-h', '--input', '--json', '--out', '--post-canary', '--project-dir', '--review', '--rollout-stage', '--rollout-task', '--root', '--stage', '--suite', '--traffic-percent']);
const VALUE_FLAGS = new Set(['--canary-rollout', '--input', '--out', '--post-canary', '--project-dir', '--review', '--rollout-stage', '--rollout-task', '--root', '--stage', '--suite', '--traffic-percent']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const REVIEW_PATH = valueFor('--review') || valueFor('--input');
const SUITE_PATH = valueFor('--suite');
const POST_CANARY_PATH = valueFor('--post-canary') || valueFor('--canary-rollout');
const OUT_PATH = valueFor('--out');
const ROLLOUT_STAGE = valueFor('--rollout-stage') || valueFor('--stage');
const TRAFFIC_PERCENT = valueFor('--traffic-percent');
const ROLLOUT_TASK = valueFor('--rollout-task');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-rollout',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const reviewRead = readJsonFile(REVIEW_PATH, 'routing-rollout-review-missing', 'routing-rollout-review-invalid');
const suiteRead = readJsonFile(SUITE_PATH, 'routing-rollout-suite-missing', 'routing-rollout-suite-invalid');
const postCanaryRead = POST_CANARY_PATH
  ? readJsonFile(POST_CANARY_PATH, 'routing-rollout-post-canary-missing', 'routing-rollout-post-canary-invalid')
  : { absolutePath: '', value: null, issues: [] };
const readIssues = [...reviewRead.issues, ...suiteRead.issues, ...postCanaryRead.issues];
if (readIssues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-rollout',
    project_dir: PROJECT_DIR,
    source: [REVIEW_PATH, SUITE_PATH, POST_CANARY_PATH].filter(Boolean).join(' + '),
    issues: readIssues,
  });
  process.exit(1);
}

const result = buildRoutingRollout({
  review: reviewRead.value,
  suite: suiteRead.value,
  ...(postCanaryRead.value ? { post_canary: postCanaryRead.value } : {}),
  rollout: {
    stage: ROLLOUT_STAGE || 'shadow',
    ...(TRAFFIC_PERCENT ? { traffic_percent: Number(TRAFFIC_PERCENT) } : {}),
  },
  ...(ROLLOUT_TASK ? { rollout_task: ROLLOUT_TASK } : {}),
}, {
  projectDir: PROJECT_DIR,
  source: [reviewRead.absolutePath, suiteRead.absolutePath, postCanaryRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
});
if (result.issues.length) {
  emit({
    ok: false,
    mode: 'agent-routing-rollout',
    project_dir: PROJECT_DIR,
    source: [reviewRead.absolutePath, suiteRead.absolutePath, postCanaryRead.absolutePath].filter(Boolean).map(projectPath).join(' + '),
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
    '  node scripts/agent-routing-rollout.mjs --review <path> --suite <path> --stage shadow --json',
    '  node scripts/agent-routing-rollout.mjs --review <path> --suite <path> --stage canary --traffic-percent 5 --out <path> --json',
    '  node scripts/agent-routing-rollout.mjs --review <path> --suite <path> --post-canary <path> --stage default-enabled --traffic-percent 100 --out <path> --json',
    '',
    'Builds an aipedia.agent-routing-rollout.v1 receipt from an accepted review and a fresh routing-suite metrics receipt.',
    'The gate requires exact tokens, correction telemetry, quality, accuracy, and wall-time evidence for every rollout scenario.',
    'Default-enabled rollout also requires a matching canary-ready receipt plus a fresh post-canary metrics suite.',
    '',
    'Options:',
    '  --review <path>            Routing-policy-review receipt. Alias: --input.',
    '  --suite <path>             Fresh routing-evaluation-suite receipt for rollout metrics.',
    '  --post-canary <path>       Required for default-enabled rollout. Alias: --canary-rollout.',
    '  --stage <name>             shadow, canary, or default-enabled. Alias: --rollout-stage.',
    '  --traffic-percent <value>  Required for canary or default-enabled stages.',
    '  --out <path>               Optional rollout receipt output path.',
    '  --rollout-task <text>      Optional rollout task label.',
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
      if (!VALUE_FLAGS.has(previous)) issues.push(routingRolloutIssue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(routingRolloutIssue('argument-invalid', `unknown flag ${name}`));
  }
  for (const flag of VALUE_FLAGS) {
    if (!hasFlag(flag)) continue;
    const value = valueFor(flag);
    if (!value || value.startsWith('-')) issues.push(routingRolloutIssue('argument-invalid', `${flag} requires a value.`));
  }
  if (!REVIEW_PATH) issues.push(routingRolloutIssue('argument-invalid', '--review or --input is required.'));
  if (!SUITE_PATH) issues.push(routingRolloutIssue('argument-invalid', '--suite is required.'));
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(routingRolloutIssue('argument-invalid', 'choose only one of --project-dir or --root.'));
  }
  if (TRAFFIC_PERCENT && !Number.isFinite(Number(TRAFFIC_PERCENT))) {
    issues.push(routingRolloutIssue('argument-invalid', '--traffic-percent must be numeric.'));
  }
  return issues;
}

function readJsonFile(path, missingCode, invalidCode) {
  const absolutePath = resolve(PROJECT_DIR, path);
  const issues = [];
  if (!existsSync(absolutePath)) {
    issues.push(routingRolloutIssue(missingCode, `${projectPath(absolutePath)} does not exist.`));
    return { absolutePath, value: null, issues };
  }
  try {
    return { absolutePath, value: JSON.parse(readFileSync(absolutePath, 'utf8')), issues };
  } catch (error) {
    issues.push(routingRolloutIssue(invalidCode, `${projectPath(absolutePath)} could not parse as JSON: ${error.message}`));
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
