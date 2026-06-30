#!/usr/bin/env node
// Validate AiPedia loop and runner closeout receipt JSON contracts.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const ALL_SYSTEM = hasFlag('--all-system');
const REQUIRE_SYSTEM_PROGRESS = hasFlag('--require-system-progress');
const REQUIRE_CLOSEOUT_IDENTITY = hasFlag('--require-closeout-identity');
const REQUIRE_TRACE_ARTIFACTS = hasFlag('--require-trace-artifacts');
const EXPLICIT_RECEIPTS = valuesFor('--receipt').concat(valuesFor('--path'));
const KNOWN_FLAGS = new Set([
  '--all-system',
  '--json',
  '--help',
  '-h',
  '--path',
  '--project-dir',
  '--receipt',
  '--require-closeout-identity',
  '--require-system-progress',
  '--require-trace-artifacts',
  '--root',
]);
const VALUE_FLAGS = new Set(['--path', '--project-dir', '--receipt', '--root']);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
    receipts: [],
  });
  process.exit(2);
}

const receiptPaths = selectedReceipts();
const receipts = receiptPaths.map(validateReceiptFile);
const issueCount = receipts.reduce((sum, receipt) => sum + receipt.issues.length, 0);
const report = {
  ok: issueCount === 0,
  mode: 'closeout-receipt-check',
  project_dir: PROJECT_DIR,
  require_system_progress: REQUIRE_SYSTEM_PROGRESS,
  require_closeout_identity: REQUIRE_CLOSEOUT_IDENTITY,
  require_trace_artifacts: REQUIRE_TRACE_ARTIFACTS,
  totals: {
    receipts: receipts.length,
    ok: receipts.filter((receipt) => receipt.ok).length,
    failed: receipts.filter((receipt) => !receipt.ok).length,
    issues: issueCount,
  },
  receipts,
};

emitReport(report);
process.exit(report.ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-closeout-receipt-check.mjs --json',
    '  node scripts/agent-closeout-receipt-check.mjs --receipt .agent/loop-runs/system/latest.json --require-system-progress --json',
    '  node scripts/agent-closeout-receipt-check.mjs --all-system --json',
    '',
    'Options:',
    '  --receipt <path>              Validate a receipt JSON file. Repeatable.',
    '  --path <path>                 Alias for --receipt.',
    '  --all-system                  Validate every .agent/loop-runs/system/*.json receipt.',
    '  --require-system-progress     Require loop receipts to include enforced system_progress.',
    '  --require-closeout-identity   Require goal_id, run_id, residual_risks, and next_actions.',
    '  --require-trace-artifacts     Require trace and artifact_refs blocks.',
    '  --project-dir <dir>           Project root. Alias: --root.',
    '  --json                        Emit a structured report.',
  ].join('\n');
}

function selectedReceipts() {
  if (EXPLICIT_RECEIPTS.length) {
    return [...new Set(EXPLICIT_RECEIPTS.map((path) => resolve(PROJECT_DIR, path)))].sort();
  }
  const systemDir = resolve(PROJECT_DIR, '.agent/loop-runs/system');
  if (ALL_SYSTEM && existsSync(systemDir)) {
    return readdirSync(systemDir)
      .filter((name) => name.endsWith('.json'))
      .map((name) => join(systemDir, name))
      .sort();
  }
  return [resolve(systemDir, 'latest.json')];
}

function validateReceiptFile(path) {
  const issues = [];
  let value = null;
  if (!existsSync(path)) {
    issues.push(issue('receipt-missing', 'Receipt file does not exist.'));
    return receiptResult(path, 'missing', issues);
  }
  try {
    value = JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    issues.push(issue('receipt-invalid-json', `Receipt JSON could not parse: ${error.message}`));
    return receiptResult(path, 'invalid-json', issues);
  }

  const type = receiptType(value);
  if (type === 'loop-run') validateLoopReceipt(value, issues);
  else if (type === 'runner-closeout') validateRunnerReceipt(value, issues);
  else issues.push(issue('receipt-unknown-type', 'Receipt is neither a loop-run receipt nor aipedia.closeout-receipt.v1.'));

  return receiptResult(path, type, issues);
}

function receiptResult(path, type, issues) {
  return {
    ok: issues.length === 0,
    path: projectPath(path),
    type,
    issues,
  };
}

function receiptType(value) {
  if (!isObject(value)) return 'unknown';
  if (value.schema_version === 'aipedia.closeout-receipt.v1') return 'runner-closeout';
  if (typeof value.mode === 'string' && value.mode.startsWith('loop-run')) return 'loop-run';
  return 'unknown';
}

function validateLoopReceipt(value, issues) {
  requireBoolean(value, 'ok', issues);
  requireString(value, 'mode', issues, { values: ['loop-run', 'loop-run-system-progress-blocked'] });
  requireIsoString(value, 'generated_at', issues);
  requireNonNegativeNumber(value, 'duration_ms', issues);
  requireObject(value, 'totals', issues);
  requireArray(value, 'loops', issues);
  requireObject(value, 'review', issues);
  requireObject(value, 'ledger', issues);
  validateCloseoutIdentity(value, issues);
  validateTraceArtifacts(value, issues);

  if (isObject(value.totals)) {
    for (const field of ['loops', 'ok', 'attention', 'skipped', 'commands']) {
      requireNonNegativeNumber(value.totals, field, issues, `totals.${field}`);
    }
    if (Array.isArray(value.loops) && value.totals.loops !== value.loops.length) {
      issues.push(issue('loop-total-mismatch', `totals.loops is ${value.totals.loops} but loops has ${value.loops.length} item(s).`));
    }
  }

  if (isObject(value.review)) {
    requireString(value.review, 'summary', issues, { path: 'review.summary' });
    requireArray(value.review, 'next_actions', issues, 'review.next_actions');
  }

  if (isObject(value.ledger)) {
    requireBoolean(value.ledger, 'written', issues, 'ledger.written');
    requireString(value.ledger, 'file', issues, { path: 'ledger.file' });
    requireString(value.ledger, 'latest_file', issues, { path: 'ledger.latest_file' });
  }

  if (Array.isArray(value.loops)) {
    value.loops.forEach((loop, index) => validateLoopItem(loop, issues, `loops[${index}]`));
  }

  if (value.system_progress != null) validateSystemProgress(value.system_progress, value, issues);
  else if (REQUIRE_SYSTEM_PROGRESS) {
    issues.push(issue('system-progress-missing', 'Loop receipt must include system_progress when --require-system-progress is used.'));
  }
}

function validateLoopItem(loop, issues, path) {
  if (!isObject(loop)) {
    issues.push(issue('loop-invalid', `${path} must be an object.`));
    return;
  }
  requireString(loop, 'id', issues, { path: `${path}.id` });
  requireString(loop, 'title', issues, { path: `${path}.title` });
  requireString(loop, 'status', issues, { path: `${path}.status`, values: ['ok', 'attention', 'skipped'] });
  requireNonNegativeNumber(loop, 'duration_ms', issues, `${path}.duration_ms`);
  requireArray(loop, 'commands', issues, `${path}.commands`);
  requireArray(loop, 'attention_reasons', issues, `${path}.attention_reasons`);
  if (Array.isArray(loop.commands)) {
    loop.commands.forEach((command, index) => validateLoopCommand(command, issues, `${path}.commands[${index}]`));
  }
}

function validateLoopCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('loop-command-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'label', issues, { path: `${path}.label` });
  requireString(command, 'status', issues, { path: `${path}.status`, values: ['ok', 'attention', 'skipped'] });
  requireNonNegativeNumber(command, 'duration_ms', issues, `${path}.duration_ms`);
  requireArray(command, 'attention_reasons', issues, `${path}.attention_reasons`);
}

function validateSystemProgress(progress, receipt, issues) {
  if (!isObject(progress)) {
    issues.push(issue('system-progress-invalid', 'system_progress must be an object.'));
    return;
  }
  requireBoolean(progress, 'ok', issues, 'system_progress.ok');
  requireString(progress, 'mode', issues, { path: 'system_progress.mode' });
  requireString(progress, 'command', issues, { path: 'system_progress.command' });
  requireNonNegativeNumber(progress, 'exit_code', issues, 'system_progress.exit_code');
  requireBoolean(progress, 'require_system_artifact', issues, 'system_progress.require_system_artifact');
  requireArray(progress, 'changed_paths', issues, 'system_progress.changed_paths');
  requireArray(progress, 'system_artifacts', issues, 'system_progress.system_artifacts');
  requireArray(progress, 'content_artifacts', issues, 'system_progress.content_artifacts');
  requireArray(progress, 'other_artifacts', issues, 'system_progress.other_artifacts');
  requireBoolean(progress, 'has_system_artifact', issues, 'system_progress.has_system_artifact');
  requireBoolean(progress, 'content_only', issues, 'system_progress.content_only');

  if (REQUIRE_SYSTEM_PROGRESS && progress.require_system_artifact !== true) {
    issues.push(issue('system-progress-not-enforced', 'system_progress.require_system_artifact must be true when --require-system-progress is used.'));
  }
  if (receipt.ok === true && REQUIRE_SYSTEM_PROGRESS && progress.has_system_artifact !== true) {
    issues.push(issue('system-progress-no-system-artifact', 'Passing enforced loop receipt must include at least one system artifact.'));
  }
  if (receipt.ok === true && REQUIRE_SYSTEM_PROGRESS && progress.content_only === true) {
    issues.push(issue('system-progress-content-only', 'Passing enforced loop receipt cannot be content_only.'));
  }
}

function validateRunnerReceipt(value, issues) {
  requireString(value, 'workflow', issues, { values: ['tool-refresh', 'page-refresh'] });
  requireString(value, 'status', issues, { values: ['passed', 'failed'] });
  requireIsoString(value, 'generated_at', issues);
  requireNonNegativeNumber(value, 'elapsed_ms', issues);
  requireString(value, 'plan', issues);
  requireString(value, 'markdown_receipt', issues);
  requireArray(value, 'changed_routes', issues);
  requireArray(value, 'source_ids', issues);
  requireArray(value, 'widths', issues);
  requireArray(value, 'commands', issues);
  requireArray(value, 'superseded_failures', issues);
  validateCloseoutIdentity(value, issues);
  validateTraceArtifacts(value, issues);

  if (value.workflow === 'tool-refresh') {
    requireString(value, 'route_args', issues);
  }
  if (value.workflow === 'page-refresh') {
    requireIsoDateString(value, 'current_date', issues);
    requireString(value, 'report_dir', issues);
    requireString(value, 'report_summary', issues);
  }
  if (Array.isArray(value.commands) && value.commands.length === 0) {
    issues.push(issue('runner-commands-empty', 'Runner closeout receipt must include at least one command.'));
  }
  if (Array.isArray(value.commands)) {
    value.commands.forEach((command, index) => validateRunnerCommand(command, issues, `commands[${index}]`));
  }
  if (value.system_progress != null) {
    validateSystemProgress(value.system_progress, { ok: value.status === 'passed' }, issues);
  }
  if (value.input_freshness != null) {
    validateInputFreshness(value.input_freshness, value, issues);
  }
}

function validateRunnerCommand(command, issues, path) {
  if (!isObject(command)) {
    issues.push(issue('runner-command-invalid', `${path} must be an object.`));
    return;
  }
  requireString(command, 'label', issues, { path: `${path}.label` });
  if (!(typeof command.status === 'number' || command.status === null)) {
    issues.push(issue('runner-command-status-invalid', `${path}.status must be a number or null.`));
  }
  requireNonNegativeNumber(command, 'elapsed_ms', issues, `${path}.elapsed_ms`);
}

function validateInputFreshness(freshness, receipt, issues) {
  if (!isObject(freshness)) {
    issues.push(issue('input-freshness-invalid', 'input_freshness must be an object.'));
    return;
  }
  requireBoolean(freshness, 'ok', issues, 'input_freshness.ok');
  requireString(freshness, 'mode', issues, { path: 'input_freshness.mode', values: ['input-freshness-receipt'] });
  requireString(freshness, 'schema_version', issues, {
    path: 'input_freshness.schema_version',
    values: ['aipedia.input-freshness-receipt.v1'],
  });
  requireString(freshness, 'project_dir', issues, { path: 'input_freshness.project_dir' });
  requireString(freshness, 'command', issues, { path: 'input_freshness.command' });
  requireNonNegativeNumber(freshness, 'exit_code', issues, 'input_freshness.exit_code');
  requireArray(freshness, 'workflows', issues, 'input_freshness.workflows');
  requireObject(freshness, 'summary', issues, 'input_freshness.summary');
  requireArray(freshness, 'next_actions', issues, 'input_freshness.next_actions');

  if (Array.isArray(freshness.workflows)) {
    if (!freshness.workflows.some((workflow) => isObject(workflow) && workflow.id === receipt.workflow)) {
      issues.push(issue('input-freshness-workflow-missing', `input_freshness.workflows must include ${receipt.workflow}.`));
    }
    freshness.workflows.forEach((workflow, index) => validateInputFreshnessWorkflow(workflow, issues, `input_freshness.workflows[${index}]`));
  }

  if (isObject(freshness.summary)) {
    for (const field of ['workflow_count', 'ok_count', 'attention_count', 'stale_count']) {
      requireNonNegativeNumber(freshness.summary, field, issues, `input_freshness.summary.${field}`);
    }
    if (Array.isArray(freshness.workflows) && freshness.summary.workflow_count !== freshness.workflows.length) {
      issues.push(issue('input-freshness-total-mismatch', `input_freshness.summary.workflow_count is ${freshness.summary.workflow_count} but workflows has ${freshness.workflows.length} item(s).`));
    }
  }
}

function validateInputFreshnessWorkflow(workflow, issues, path) {
  if (!isObject(workflow)) {
    issues.push(issue('input-freshness-workflow-invalid', `${path} must be an object.`));
    return;
  }
  requireString(workflow, 'id', issues, { path: `${path}.id` });
  requireString(workflow, 'kind', issues, { path: `${path}.kind` });
  requireBoolean(workflow, 'ok', issues, `${path}.ok`);
  requireString(workflow, 'status', issues, { path: `${path}.status` });
  if (workflow.next_action != null && typeof workflow.next_action !== 'string') {
    issues.push(issue('input-freshness-workflow-invalid', `${path}.next_action must be a string when present.`));
  }
}

function validateCloseoutIdentity(value, issues) {
  const hasAny = value.goal_id != null || value.run_id != null || value.residual_risks != null || value.next_actions != null;
  if (!hasAny && !REQUIRE_CLOSEOUT_IDENTITY) return;
  if (typeof value.goal_id !== 'string' || !value.goal_id.trim()) {
    issues.push(issue('closeout-goal-id-missing', 'goal_id must be a non-empty string when closeout identity is required or partially present.'));
  }
  if (typeof value.run_id !== 'string' || !value.run_id.trim()) {
    issues.push(issue('closeout-run-id-missing', 'run_id must be a non-empty string when closeout identity is required or partially present.'));
  }
  if (!Array.isArray(value.residual_risks)) {
    issues.push(issue('closeout-risks-invalid', 'residual_risks must be an array.'));
  }
  if (!Array.isArray(value.next_actions)) {
    issues.push(issue('closeout-next-actions-invalid', 'next_actions must be an array.'));
  }
}

function validateTraceArtifacts(value, issues) {
  const hasAny = value.trace != null || value.artifact_refs != null;
  if (!hasAny && !REQUIRE_TRACE_ARTIFACTS) return;

  if (!isObject(value.trace)) {
    issues.push(issue('closeout-trace-invalid', 'trace must be an object when trace artifacts are required or partially present.'));
  } else {
    requireString(value.trace, 'trace_id', issues, { path: 'trace.trace_id' });
    requireString(value.trace, 'span_id', issues, { path: 'trace.span_id' });
    if (value.trace.parent_span_id != null && typeof value.trace.parent_span_id !== 'string') {
      issues.push(issue('closeout-trace-invalid', 'trace.parent_span_id must be a string when present.'));
    }
    requireString(value.trace, 'name', issues, { path: 'trace.name' });
    requireIsoString(value.trace, 'started_at', issues, 'trace.started_at');
    requireIsoString(value.trace, 'ended_at', issues, 'trace.ended_at');
    requireNonNegativeNumber(value.trace, 'duration_ms', issues, 'trace.duration_ms');
  }

  if (!Array.isArray(value.artifact_refs)) {
    issues.push(issue('closeout-artifact-refs-invalid', 'artifact_refs must be an array when trace artifacts are required or partially present.'));
    return;
  }
  if (REQUIRE_TRACE_ARTIFACTS && value.artifact_refs.length === 0) {
    issues.push(issue('closeout-artifact-refs-empty', 'artifact_refs must include at least one artifact when required.'));
  }
  value.artifact_refs.forEach((artifact, index) => validateArtifactRef(artifact, issues, `artifact_refs[${index}]`));
}

function validateArtifactRef(artifact, issues, path) {
  if (!isObject(artifact)) {
    issues.push(issue('closeout-artifact-ref-invalid', `${path} must be an object.`));
    return;
  }
  requireString(artifact, 'role', issues, { path: `${path}.role` });
  requireString(artifact, 'kind', issues, { path: `${path}.kind` });
  if (artifact.path != null && typeof artifact.path !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.path must be a string when present.`));
  }
  if (artifact.id != null && typeof artifact.id !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.id must be a string when present.`));
  }
  if (artifact.description != null && typeof artifact.description !== 'string') {
    issues.push(issue('closeout-artifact-ref-invalid', `${path}.description must be a string when present.`));
  }
  if (!artifact.path && !artifact.id) {
    issues.push(issue('closeout-artifact-ref-invalid', `${path} must include either path or id.`));
  }
}

function requireObject(value, field, issues, path = field) {
  if (!isObject(value[field])) issues.push(issue('field-invalid', `${path} must be an object.`));
}

function requireArray(value, field, issues, path = field) {
  if (!Array.isArray(value[field])) issues.push(issue('field-invalid', `${path} must be an array.`));
}

function requireBoolean(value, field, issues, path = field) {
  if (typeof value[field] !== 'boolean') issues.push(issue('field-invalid', `${path} must be a boolean.`));
}

function requireString(value, field, issues, options = {}) {
  const path = options.path || field;
  if (typeof value[field] !== 'string' || !value[field].trim()) {
    issues.push(issue('field-invalid', `${path} must be a non-empty string.`));
    return;
  }
  if (options.values && !options.values.includes(value[field])) {
    issues.push(issue('field-invalid', `${path} must be one of: ${options.values.join(', ')}.`));
  }
}

function requireIsoString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && Number.isNaN(Date.parse(value[field]))) {
    issues.push(issue('field-invalid', `${path} must be an ISO-like date/time string.`));
  }
}

function requireIsoDateString(value, field, issues, path = field) {
  requireString(value, field, issues, { path });
  if (typeof value[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(value[field])) {
    issues.push(issue('field-invalid', `${path} must be YYYY-MM-DD.`));
  }
}

function requireNonNegativeNumber(value, field, issues, path = field) {
  if (typeof value[field] !== 'number' || !Number.isFinite(value[field]) || value[field] < 0) {
    issues.push(issue('field-invalid', `${path} must be a non-negative number.`));
  }
}

function issue(code, detail) {
  return { code, detail };
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error('[agent-closeout-receipt-check] failed');
    for (const receipt of report.receipts || []) {
      for (const receiptIssue of receipt.issues || []) {
        console.error(`- ${receipt.path}: ${receiptIssue.detail}`);
      }
    }
    return;
  }
  console.log(`[agent-closeout-receipt-check] ${report.totals.receipts} receipt(s) ok`);
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag) {
      const value = args[index + 1];
      if (value && !value.startsWith('--')) values.push(value);
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => value.split(',')).map((value) => value.trim()).filter(Boolean);
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(issue('argument-invalid', `unexpected argument ${arg}`));
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) {
      issues.push(issue('argument-invalid', `unknown flag ${name}`));
      continue;
    }
    if (VALUE_FLAGS.has(name)) {
      if (arg.includes('=')) {
        if (!arg.slice(name.length + 1)) issues.push(issue('argument-invalid', `${name} requires a value`));
        continue;
      }
      const value = args[index + 1];
      if (!value || value.startsWith('-')) issues.push(issue('argument-invalid', `${name} requires a value`));
      continue;
    }
    if (arg.includes('=')) issues.push(issue('argument-invalid', `${name} does not accept a value`));
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(issue('argument-invalid', 'choose only one of --project-dir or --root'));
  }
  if (ALL_SYSTEM && EXPLICIT_RECEIPTS.length) {
    issues.push(issue('argument-invalid', 'choose either --all-system or explicit --receipt paths'));
  }
  return issues;
}

function projectPath(path) {
  return path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length + 1).replace(/\\/g, '/') : path.replace(/\\/g, '/');
}
