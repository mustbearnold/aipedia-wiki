#!/usr/bin/env node
// Durable pause receipt writer for long-running AiPedia agent-system goals.

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
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
const PAUSE_REASON = valueFor('--reason') || 'handoff';
const SAFE_RESUME_STEP = valueFor('--safe-resume-step') || '';
const IN_PROGRESS_STEP = valueFor('--in-progress-step') || '';
const SOURCE_CUTOFF = valueFor('--source-cutoff') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10);
const OUT_PATH = valueFor('--out') ? resolve(PROJECT_DIR, valueFor('--out')) : defaultReceiptPath();
const KNOWN_FLAGS = new Set([
  '--json',
  '--dry-run',
  '--help',
  '-h',
  '--project-dir',
  '--root',
  '--goal-id',
  '--run-id',
  '--reason',
  '--safe-resume-step',
  '--in-progress-step',
  '--source-cutoff',
  '--out',
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
if (!SAFE_RESUME_STEP) {
  argumentIssues.push({ code: 'argument-invalid', detail: '--safe-resume-step is required for a useful pause receipt' });
}
if (!IN_PROGRESS_STEP) {
  argumentIssues.push({ code: 'argument-invalid', detail: '--in-progress-step is required for a useful pause receipt' });
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

const pausedAt = new Date().toISOString();
const dirtyTreeSummary = gitStatusShort();
const receipt = {
  schema_version: 'aipedia.pause-receipt.v1',
  goal_id: GOAL_ID,
  run_id: RUN_ID,
  paused_at: pausedAt,
  pause_reason: PAUSE_REASON,
  latest_safe_resume_step: SAFE_RESUME_STEP,
  in_progress_step: IN_PROGRESS_STEP,
  dirty_tree_summary: dirtyTreeSummary,
  files_touched_by_agent: touchedFilesFromStatus(dirtyTreeSummary),
  files_observed_dirty_before_agent: valuesFor('--observed-dirty-before-agent'),
  child_workers: [],
  open_questions: valuesFor('--open-question'),
  blocked_on: valuesFor('--blocked-on'),
  must_not_repeat: valuesFor('--must-not-repeat'),
  next_commands: valuesFor('--next-command'),
  validation_done: valuesFor('--validation-done'),
  validation_pending: valuesFor('--validation-pending'),
  source_cutoff: SOURCE_CUTOFF,
};

if (!DRY_RUN) {
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, `${JSON.stringify(receipt, null, 2)}\n`);
}

emitReport({
  ok: true,
  mode: DRY_RUN ? 'pause-receipt-dry-run' : 'pause-receipt-written',
  project_dir: PROJECT_DIR,
  path: OUT_PATH,
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
    '  --reason <reason>              user, time, blocked, or handoff. Defaults to handoff.',
    '  --safe-resume-step <step>      Last known safe resume point. Required.',
    '  --in-progress-step <step>      The step that was active at pause time. Required.',
    '  --next-command <command>       Repeatable next command. Repeatable.',
    '  --validation-done <item>       Validation already completed. Repeatable.',
    '  --validation-pending <item>    Validation still required. Repeatable.',
    '  --must-not-repeat <item>       Work that should not be repeated. Repeatable.',
    '  --out <path>                   Receipt path. Defaults to .agent/loop-runs/pauses/<timestamp>-pause-receipt.json.',
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

function touchedFilesFromStatus(lines) {
  return [...new Set(lines.map((line) => line.slice(3).trim()).filter(Boolean))].sort();
}

function timestampSlug(date) {
  return date.toISOString().replace(/[:.]/g, '-');
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
