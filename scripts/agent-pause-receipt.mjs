#!/usr/bin/env node
// Durable pause receipt writer for long-running AiPedia agent-system goals.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const JSON_MODE = args.includes('--json');
const DRY_RUN = args.includes('--dry-run');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const GOAL_ID = valueFor('--goal-id') || 'unspecified-goal';
const RUN_ID = valueFor('--run-id') || timestampSlug(new Date());
const TRACE_ID = valueFor('--trace-id') || process.env.AIPEDIA_TRACE_ID || '';
const PARENT_SPAN_ID = valueFor('--parent-span-id') || process.env.AIPEDIA_PARENT_SPAN_ID || '';
const PAUSE_REASON = valueFor('--reason') || 'handoff';
const PAUSE_REASONS = new Set(['user', 'time', 'blocked', 'handoff']);
const SAFE_RESUME_STEP = valueFor('--safe-resume-step') || '';
const IN_PROGRESS_STEP = valueFor('--in-progress-step') || '';
const SOURCE_CUTOFF = valueFor('--source-cutoff') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const OUT_PATH = valueFor('--out') ? resolve(PROJECT_DIR, valueFor('--out')) : defaultReceiptPath();
const VALIDATE_PATH = valueFor('--validate') || valueFor('--receipt') || '';
const KNOWN_FLAGS = new Set([
  '--json',
  '--dry-run',
  '--help',
  '-h',
  '--project-dir',
  '--root',
  '--goal-id',
  '--run-id',
  '--trace-id',
  '--parent-span-id',
  '--reason',
  '--safe-resume-step',
  '--in-progress-step',
  '--source-cutoff',
  '--out',
  '--validate',
  '--receipt',
  '--next-command',
  '--validation-done',
  '--validation-pending',
  '--must-not-repeat',
  '--observed-dirty-before-agent',
  '--open-question',
  '--blocked-on',
]);
const VALUE_FLAGS = new Set([...KNOWN_FLAGS].filter((flag) => !['--json', '--dry-run', '--help', '-h'].includes(flag)));

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (!VALIDATE_PATH && !SAFE_RESUME_STEP) {
  argumentIssues.push({ code: 'argument-invalid', detail: '--safe-resume-step is required for a useful pause receipt' });
}
if (!VALIDATE_PATH && !IN_PROGRESS_STEP) {
  argumentIssues.push({ code: 'argument-invalid', detail: '--in-progress-step is required for a useful pause receipt' });
}
if (!VALIDATE_PATH && !PAUSE_REASONS.has(PAUSE_REASON)) {
  argumentIssues.push({ code: 'argument-invalid', detail: '--reason must be one of: user, time, blocked, handoff' });
}
if (argumentIssues.length > 0) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

if (VALIDATE_PATH) {
  const validationPath = resolve(PROJECT_DIR, VALIDATE_PATH);
  const validation = validatePauseReceiptFile(validationPath);
  emitReport({
    ok: validation.ok,
    mode: 'pause-receipt-validation',
    project_dir: PROJECT_DIR,
    path: validation.path,
    validation,
  });
  process.exit(validation.ok ? 0 : 1);
}

const startedAt = new Date().toISOString();
const dirtyTreeSummary = gitStatusShort();
const pausedAt = new Date().toISOString();
const filesObservedDirtyBeforeAgent = valuesFor('--observed-dirty-before-agent');
const filesTouchedByAgent = touchedFilesFromStatus(dirtyTreeSummary, filesObservedDirtyBeforeAgent);
const receipt = {
  schema_version: 'aipedia.pause-receipt.v1',
  goal_id: GOAL_ID,
  run_id: RUN_ID,
  paused_at: pausedAt,
  pause_reason: PAUSE_REASON,
  latest_safe_resume_step: SAFE_RESUME_STEP,
  in_progress_step: IN_PROGRESS_STEP,
  dirty_tree_summary: dirtyTreeSummary,
  files_touched_by_agent: filesTouchedByAgent,
  files_observed_dirty_before_agent: filesObservedDirtyBeforeAgent,
  child_workers: [],
  open_questions: valuesFor('--open-question'),
  blocked_on: valuesFor('--blocked-on'),
  must_not_repeat: valuesFor('--must-not-repeat'),
  next_commands: valuesFor('--next-command'),
  validation_done: valuesFor('--validation-done'),
  validation_pending: valuesFor('--validation-pending'),
  source_cutoff: SOURCE_CUTOFF,
  trace: traceBlock('pause-receipt', RUN_ID, startedAt, pausedAt),
  artifact_refs: pauseArtifactRefs({
    outPath: OUT_PATH,
    dirtyTreeSummary,
    filesTouchedByAgent,
    filesObservedDirtyBeforeAgent,
    nextCommands: valuesFor('--next-command'),
    validationDone: valuesFor('--validation-done'),
    validationPending: valuesFor('--validation-pending'),
  }),
};
const validation = validatePauseReceipt(receipt, OUT_PATH);

if (!DRY_RUN) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(receipt, null, 2)}\n`);
}

emitReport({
  ok: true,
  mode: DRY_RUN ? 'pause-receipt-dry-run' : 'pause-receipt-written',
  project_dir: PROJECT_DIR,
  path: OUT_PATH,
  validation,
  receipt,
});

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-pause-receipt.mjs --goal-id <id> --safe-resume-step <step> --in-progress-step <step> --json',
    '',
    'Options:',
    '  --json                         Emit a structured report.',
    '  --dry-run                      Do not write the receipt file.',
    '  --goal-id <id>                 Stable goal ID.',
    '  --run-id <id>                  Run attempt ID. Defaults to timestamp.',
    '  --trace-id <id>                Optional trace ID. Defaults to goal_id:run_id.',
    '  --parent-span-id <id>          Optional parent span ID.',
    '  --reason <reason>              user, time, blocked, or handoff. Defaults to handoff.',
    '  --safe-resume-step <step>      Last known safe resume point. Required.',
    '  --in-progress-step <step>      The step that was active at pause time. Required.',
    '  --next-command <command>       Repeatable next command. Repeatable.',
    '  --validation-done <item>       Validation already completed. Repeatable.',
    '  --validation-pending <item>    Validation still required. Repeatable.',
    '  --must-not-repeat <item>       Work that should not be repeated. Repeatable.',
    '  --out <path>                   Receipt path. Defaults to .agent/loop-runs/pauses/<timestamp>-pause-receipt.json.',
    '  --validate <path>              Validate an existing pause receipt and exit non-zero on schema issues.',
    '  --receipt <path>               Alias for --validate.',
  ].join('\n');
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error(`[agent-pause-receipt] ${report.mode}`);
    for (const issue of report.argument_issues ?? []) console.error(`- ${issue.detail}`);
    return;
  }
  console.log(`[agent-pause-receipt] ${report.mode}: ${report.path}`);
}

function defaultReceiptPath() {
  const stamp = timestampSlug(new Date());
  return join(PROJECT_DIR, '.agent', 'loop-runs', 'pauses', `${stamp}-pause-receipt.json`);
}

function gitStatusShort() {
  const result = spawnSync('git', ['status', '--short', '--untracked-files=all'], { cwd: PROJECT_DIR, encoding: 'utf8' });
  if (result.status !== 0) return [];
  return result.stdout.split(/\r?\n/).map((line) => line.trimEnd()).filter(Boolean);
}

function touchedFilesFromStatus(lines, observedDirtyBeforeAgent = []) {
  const observed = new Set(observedDirtyBeforeAgent);
  return [...new Set(lines.map((line) => line.slice(3).trim()).filter(Boolean))]
    .filter((path) => !observed.has(path))
    .sort();
}

function timestampSlug(date) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function validatePauseReceiptFile(path) {
  if (!existsSync(path)) {
    return validationResult(path, null, [
      { code: 'pause-receipt-missing', detail: 'Pause receipt file does not exist.' },
    ]);
  }
  try {
    const receipt = JSON.parse(readFileSync(path, 'utf8'));
    return validatePauseReceipt(receipt, path);
  } catch (error) {
    return validationResult(path, null, [
      { code: 'pause-receipt-invalid-json', detail: `Pause receipt JSON could not parse: ${error.message}` },
    ]);
  }
}

function validatePauseReceipt(receipt, path = '') {
  const issues = [];
  if (!isObject(receipt)) {
    issues.push({ code: 'pause-receipt-invalid', detail: 'Pause receipt must be a JSON object.' });
    return validationResult(path, receipt, issues);
  }

  requireString(receipt, 'schema_version', issues, { values: ['aipedia.pause-receipt.v1'] });
  requireString(receipt, 'goal_id', issues);
  requireString(receipt, 'run_id', issues);
  requireIsoString(receipt, 'paused_at', issues);
  requireString(receipt, 'pause_reason', issues, { values: ['user', 'time', 'blocked', 'handoff'] });
  requireString(receipt, 'latest_safe_resume_step', issues);
  requireString(receipt, 'in_progress_step', issues);
  requireIsoDateString(receipt, 'source_cutoff', issues);
  for (const field of [
    'dirty_tree_summary',
    'files_touched_by_agent',
    'files_observed_dirty_before_agent',
    'open_questions',
    'blocked_on',
    'must_not_repeat',
    'next_commands',
    'validation_done',
    'validation_pending',
  ]) {
    requireStringArray(receipt, field, issues);
  }
  if (!Array.isArray(receipt.child_workers)) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: 'child_workers must be an array.' });
  }
  validateTraceArtifacts(receipt, issues);

  return validationResult(path, receipt, issues);
}

function traceBlock(name, runId, startedAt, endedAt) {
  const durationMs = Math.max(0, Date.parse(endedAt) - Date.parse(startedAt));
  return {
    trace_id: TRACE_ID || stableTraceId([GOAL_ID, runId]),
    span_id: stableTraceId(['span', name, runId, startedAt]),
    parent_span_id: PARENT_SPAN_ID,
    name,
    started_at: startedAt,
    ended_at: endedAt,
    duration_ms: durationMs,
  };
}

function stableTraceId(parts) {
  return parts
    .filter(Boolean)
    .join(':')
    .toLowerCase()
    .replace(/[^a-z0-9:._/-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 180) || 'unscoped-trace';
}

function pauseArtifactRefs({
  outPath,
  dirtyTreeSummary,
  filesTouchedByAgent,
  filesObservedDirtyBeforeAgent,
  nextCommands,
  validationDone,
  validationPending,
}) {
  const refs = [
    {
      role: 'output',
      kind: 'pause-receipt',
      path: projectPath(outPath),
      description: 'Written pause receipt JSON.',
    },
    {
      role: 'input',
      kind: 'git-status',
      id: 'dirty-tree',
      description: `Captured ${dirtyTreeSummary.length} git status entr${dirtyTreeSummary.length === 1 ? 'y' : 'ies'} at pause time.`,
    },
  ];
  for (const path of filesTouchedByAgent) {
    refs.push({
      role: 'dirty',
      kind: 'agent-touched-file',
      path,
      description: 'Dirty file attributed to this agent run.',
    });
  }
  for (const path of filesObservedDirtyBeforeAgent) {
    refs.push({
      role: 'input',
      kind: 'observed-dirty-before-agent',
      path,
      description: 'Dirty file observed before this agent run and excluded from touched files.',
    });
  }
  nextCommands.forEach((command, index) => {
    refs.push({
      role: 'embedded',
      kind: 'next-command',
      id: `next-command:${index + 1}`,
      description: command,
    });
  });
  validationDone.forEach((item, index) => {
    refs.push({
      role: 'embedded',
      kind: 'validation-done',
      id: `validation-done:${index + 1}`,
      description: item,
    });
  });
  validationPending.forEach((item, index) => {
    refs.push({
      role: 'embedded',
      kind: 'validation-pending',
      id: `validation-pending:${index + 1}`,
      description: item,
    });
  });
  return dedupeArtifactRefs(refs);
}

function dedupeArtifactRefs(refs) {
  const seen = new Set();
  return refs.filter((ref) => {
    const key = [ref.role, ref.kind, ref.path || '', ref.id || '', ref.description || ''].join('\0');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function validateTraceArtifacts(receipt, issues) {
  const hasAny = receipt.trace != null || receipt.artifact_refs != null;
  if (!hasAny) return;

  if (!isObject(receipt.trace)) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: 'trace must be an object when present.' });
  } else {
    requireString(receipt.trace, 'trace_id', issues);
    requireString(receipt.trace, 'span_id', issues);
    if (receipt.trace.parent_span_id != null && typeof receipt.trace.parent_span_id !== 'string') {
      issues.push({ code: 'pause-receipt-field-invalid', detail: 'trace.parent_span_id must be a string when present.' });
    }
    requireString(receipt.trace, 'name', issues);
    requireIsoString(receipt.trace, 'started_at', issues);
    requireIsoString(receipt.trace, 'ended_at', issues);
    requireNonNegativeNumber(receipt.trace, 'duration_ms', issues);
  }

  if (!Array.isArray(receipt.artifact_refs)) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: 'artifact_refs must be an array when present.' });
    return;
  }
  for (const [index, artifact] of receipt.artifact_refs.entries()) {
    validateArtifactRef(artifact, issues, `artifact_refs[${index}]`);
  }
}

function validateArtifactRef(artifact, issues, path) {
  if (!isObject(artifact)) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${path} must be an object.` });
    return;
  }
  requireString(artifact, 'role', issues);
  requireString(artifact, 'kind', issues);
  if (artifact.path != null && typeof artifact.path !== 'string') {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${path}.path must be a string when present.` });
  }
  if (artifact.id != null && typeof artifact.id !== 'string') {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${path}.id must be a string when present.` });
  }
  if (artifact.description != null && typeof artifact.description !== 'string') {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${path}.description must be a string when present.` });
  }
  if (!artifact.path && !artifact.id) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${path} must include path or id.` });
  }
}

function requireNonNegativeNumber(value, field, issues) {
  if (typeof value[field] !== 'number' || !Number.isFinite(value[field]) || value[field] < 0) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be a non-negative number.` });
  }
}

function validationResult(path, receipt, issues) {
  return {
    schema_version: 'aipedia.pause-receipt-validation.v1',
    ok: issues.length === 0,
    path: path ? projectPath(path) : '',
    receipt_schema_version: isObject(receipt) ? receipt.schema_version ?? '' : '',
    issues,
    issue_count: issues.length,
  };
}

function requireString(value, field, issues, options = {}) {
  if (typeof value[field] !== 'string' || !value[field].trim()) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be a non-empty string.` });
    return;
  }
  if (options.values && !options.values.includes(value[field])) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be one of: ${options.values.join(', ')}.` });
  }
}

function requireIsoString(value, field, issues) {
  requireString(value, field, issues);
  if (typeof value[field] === 'string' && Number.isNaN(Date.parse(value[field]))) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be an ISO-like date/time string.` });
  }
}

function requireIsoDateString(value, field, issues) {
  requireString(value, field, issues);
  if (typeof value[field] === 'string' && !/^\d{4}-\d{2}-\d{2}$/.test(value[field])) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be YYYY-MM-DD.` });
  }
}

function requireStringArray(value, field, issues) {
  if (!Array.isArray(value[field]) || value[field].some((item) => typeof item !== 'string')) {
    issues.push({ code: 'pause-receipt-field-invalid', detail: `${field} must be an array of strings.` });
  }
}

function isObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function projectPath(path) {
  return path.startsWith(PROJECT_DIR) ? path.slice(PROJECT_DIR.length + 1).replace(/\\/g, '/') : path.replace(/\\/g, '/');
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
  return values.flatMap((value) => value.split('|||')).map((value) => value.trim()).filter(Boolean);
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
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name) && !arg.includes('=')) {
      const value = args[index + 1];
      if (!value || value.startsWith('--')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      index += 1;
    }
  }
  if (args.includes('--project-dir') && args.includes('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (OUT_PATH && existsSync(OUT_PATH) && !DRY_RUN) {
    issues.push({ code: 'argument-invalid', detail: `refusing to overwrite existing receipt: ${OUT_PATH}` });
  }
  return issues;
}
