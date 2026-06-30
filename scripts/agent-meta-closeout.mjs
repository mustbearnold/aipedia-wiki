#!/usr/bin/env node
// Route June 30 meta-goal closeout receipts to the strict validator profile.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const KNOWN_FLAGS = new Set(['--help', '-h', '--json', '--path', '--project-dir', '--receipt', '--root']);
const VALUE_FLAGS = new Set(['--path', '--project-dir', '--receipt', '--root']);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const EXPLICIT_RECEIPTS = valuesFor('--receipt').concat(valuesFor('--path'));
const STRICT_META_FLAGS = [
  '--require-system-progress',
  '--require-closeout-identity',
  '--require-trace-artifacts',
  '--require-efficiency-metrics',
  '--require-dag-proof',
];

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'meta-closeout-router',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    route_issues: [],
    receipts: [],
  });
  process.exit(2);
}

const route = buildRoute();
if (!route.ok) {
  emit(route);
  process.exit(2);
}

const checkerScript = resolve(SCRIPT_DIR, 'agent-closeout-receipt-check.mjs');
const checkerArgs = [
  checkerScript,
  '--project-dir',
  PROJECT_DIR,
  ...route.receipts.flatMap((receipt) => ['--receipt', receipt.path]),
  ...STRICT_META_FLAGS,
  ...(route.requires_workflow_policy ? ['--require-workflow-policy'] : []),
  '--json',
];
const checker = spawnSync(process.execPath, checkerArgs, {
  cwd: DEFAULT_PROJECT_DIR,
  encoding: 'utf8',
});
const checkerReport = parseCheckerReport(checker.stdout);
const checkerIssues = [];
if (checker.error) {
  checkerIssues.push(issue('checker-spawn-failed', checker.error.message));
}
if (checkerReport == null) {
  checkerIssues.push(issue('checker-json-invalid', 'Strict closeout checker did not emit parseable JSON.'));
}
const ok = checker.status === 0 && checkerIssues.length === 0 && checkerReport?.ok === true;
const report = {
  ...route,
  ok,
  checker_command: [
    process.execPath,
    ...checkerArgs.map((part) => (part === checkerScript ? projectPath(part) : part)),
  ].join(' '),
  checker_exit_code: checker.status,
  checker_signal: checker.signal || '',
  checker_issues: checkerIssues,
  checker_report: checkerReport,
};

emit(report);
process.exit(ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-meta-closeout.mjs --json',
    '  node scripts/agent-meta-closeout.mjs --receipt <path> --json',
    '',
    'Routes June 30 meta-goal receipts to the strict closeout validator profile.',
    '',
    'Profiles:',
    '  latest-loop      Default .agent/loop-runs/system/latest.json strict loop proof.',
    '  explicit-loop    Explicit loop-run receipt strict proof.',
    '  runner-closeout  Explicit Rust runner receipt strict proof plus workflow-policy checks.',
    '',
    'Options:',
    '  --receipt <path>     Receipt to validate. Repeatable. Alias: --path.',
    '  --project-dir <dir>  Project root. Alias: --root.',
    '  --json               Emit a structured report.',
    '  --help               Show this help.',
  ].join('\n');
}

function buildRoute() {
  const rawPaths = EXPLICIT_RECEIPTS.length
    ? [...new Set(EXPLICIT_RECEIPTS)]
    : ['.agent/loop-runs/system/latest.json'];
  const receipts = rawPaths.map((rawPath) => inspectReceipt(rawPath));
  const routeIssues = receipts.flatMap((receipt) => receipt.route_issues);
  const unsupported = receipts.filter((receipt) => !['loop-run', 'runner-closeout'].includes(receipt.type));
  for (const receipt of unsupported) {
    routeIssues.push(issue(
      'unsupported-receipt-type',
      `${receipt.path} is ${receipt.type}; use agent:closeout:check with the appropriate specialized flags instead of meta closeout auto-routing.`,
    ));
  }
  const hasRunner = receipts.some((receipt) => receipt.type === 'runner-closeout');
  const hasLoop = receipts.some((receipt) => receipt.type === 'loop-run');
  const profile = profileFor({ explicit: EXPLICIT_RECEIPTS.length > 0, hasRunner, hasLoop });
  return {
    ok: routeIssues.length === 0,
    mode: 'meta-closeout-router',
    project_dir: PROJECT_DIR,
    argument_issues: [],
    route_issues: routeIssues,
    closeout_profile: profile,
    requires_workflow_policy: hasRunner,
    strict_flags: [
      ...STRICT_META_FLAGS,
      ...(hasRunner ? ['--require-workflow-policy'] : []),
    ],
    receipts: receipts.map(({ route_issues, ...receipt }) => receipt),
  };
}

function inspectReceipt(rawPath) {
  const absolutePath = resolve(PROJECT_DIR, rawPath);
  const path = projectPath(absolutePath);
  const routeIssues = [];
  if (!existsSync(absolutePath)) {
    routeIssues.push(issue('receipt-missing', `${path} does not exist.`));
    return { path, absolute_path: absolutePath, type: 'missing', route_issues: routeIssues };
  }
  let value = null;
  try {
    value = JSON.parse(readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    routeIssues.push(issue('receipt-invalid-json', `${path} could not parse as JSON: ${error.message}`));
    return { path, absolute_path: absolutePath, type: 'invalid-json', route_issues: routeIssues };
  }
  return {
    path,
    absolute_path: absolutePath,
    type: receiptType(value),
    workflow: typeof value.workflow === 'string' ? value.workflow : '',
    route_issues: routeIssues,
  };
}

function profileFor({ explicit, hasRunner, hasLoop }) {
  if (hasRunner && hasLoop) return 'mixed-loop-runner';
  if (hasRunner) return 'runner-closeout';
  if (hasLoop && explicit) return 'explicit-loop';
  if (hasLoop) return 'latest-loop';
  return 'unsupported';
}

function receiptType(value) {
  if (!isObject(value)) return 'unknown';
  if (value.schema_version === 'aipedia.closeout-receipt.v1') return 'runner-closeout';
  if (value.schema_version === 'aipedia.runner-interrupt-proof.v1') return 'runner-interrupt-proof';
  if (value.schema_version === 'aipedia.affiliate-handoff-receipt.v1') return 'affiliate-handoff';
  if (value.schema_version === 'aipedia.pause-receipt.v1') return 'pause-receipt';
  if (typeof value.mode === 'string' && value.mode.startsWith('loop-run')) return 'loop-run';
  return 'unknown';
}

function parseCheckerReport(stdout) {
  const text = typeof stdout === 'string' ? stdout.trim() : '';
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const [flag, inlineValue] = arg.includes('=') ? arg.split('=', 2) : [arg, null];
    if (!arg.startsWith('-')) continue;
    if (!KNOWN_FLAGS.has(flag)) {
      issues.push(issue('unknown-argument', `Unknown argument: ${arg}`));
      continue;
    }
    if (VALUE_FLAGS.has(flag)) {
      const value = inlineValue ?? args[index + 1];
      if (value == null || String(value).trim() === '' || String(value).startsWith('--')) {
        issues.push(issue('missing-argument-value', `${flag} requires a value.`));
      }
      if (inlineValue == null) index += 1;
    }
  }
  return issues;
}

function valuesFor(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === name) {
      const value = args[index + 1];
      if (value != null && !String(value).startsWith('--')) values.push(value);
      index += 1;
      continue;
    }
    if (arg.startsWith(`${name}=`)) {
      values.push(arg.slice(name.length + 1));
    }
  }
  return values;
}

function valueFor(name) {
  return valuesFor(name).at(-1) || '';
}

function hasFlag(name) {
  return args.includes(name);
}

function emit(report) {
  if (JSON_MODE) {
    console.log(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (report.ok) {
    console.log(`[agent-meta-closeout] ok: ${report.closeout_profile} (${report.receipts.length} receipt(s))`);
    return;
  }
  const issues = [
    ...(report.argument_issues || []),
    ...(report.route_issues || []),
    ...(report.checker_issues || []),
  ];
  const issueText = issues.map((item) => `${item.code}: ${item.message}`).join('; ') || 'strict checker failed';
  console.error(`[agent-meta-closeout] failed: ${issueText}`);
}

function projectPath(path) {
  const absolutePath = resolve(path);
  const rel = relative(PROJECT_DIR, absolutePath);
  if (!rel.startsWith('..') && !resolve(PROJECT_DIR, rel).startsWith(`${PROJECT_DIR}/..`)) {
    return rel || '.';
  }
  return absolutePath;
}

function issue(code, message) {
  return { code, message };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}
