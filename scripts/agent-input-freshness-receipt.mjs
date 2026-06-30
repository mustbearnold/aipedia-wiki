#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PROJECT_DIR = dirname(SCRIPT_DIR);
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || DEFAULT_PROJECT_DIR);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const REQUIRE_FRESH = hasFlag('--require-fresh');
const OUT_PATH = valueFor('--out');
const MAX_GENERATED_AGE_MINUTES = numberFor('--max-generated-age-minutes', 10, { allowZero: true });
const MAX_BACKLOG_AGE_DAYS = numberFor('--max-backlog-age-days', 2, { allowZero: true });
const KNOWN_FLAGS = new Set([
  '--all',
  '--json',
  '--max-backlog-age-days',
  '--max-generated-age-minutes',
  '--out',
  '--project-dir',
  '--require-fresh',
  '--root',
  '--workflow',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set(['--max-backlog-age-days', '--max-generated-age-minutes', '--out', '--project-dir', '--root', '--workflow']);
const WORKFLOWS = ['decision-content', 'tool-refresh', 'page-refresh', 'affiliate-conversion'];

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length) {
  emit({
    ok: false,
    mode: 'argument-error',
    schema_version: 'aipedia.input-freshness-receipt.v1',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const selectedWorkflows = selectedWorkflowIds();
const checks = selectedWorkflows.map((workflow) => checkWorkflow(workflow));
const nextActions = [...new Set(checks.filter((check) => !check.ok && check.next_action).map((check) => check.next_action))];
const report = {
  ok: checks.every((check) => check.ok),
  mode: 'input-freshness-receipt',
  schema_version: 'aipedia.input-freshness-receipt.v1',
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  require_fresh: REQUIRE_FRESH,
  max_generated_age_minutes: MAX_GENERATED_AGE_MINUTES,
  max_backlog_age_days: MAX_BACKLOG_AGE_DAYS,
  workflows: checks,
  summary: {
    workflow_count: checks.length,
    ok_count: checks.filter((check) => check.ok).length,
    attention_count: checks.filter((check) => !check.ok).length,
    stale_count: checks.filter((check) => check.status === 'stale').length,
  },
  next_actions: nextActions,
};

if (OUT_PATH) {
  const receiptPath = resolve(PROJECT_DIR, OUT_PATH);
  mkdirSync(dirname(receiptPath), { recursive: true });
  writeFileSync(receiptPath, `${JSON.stringify(report, null, 2)}\n`);
  report.out = projectPath(receiptPath);
}

emit(report);
if (REQUIRE_FRESH && !report.ok) process.exit(1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-input-freshness-receipt.mjs --all --json',
    '  node scripts/agent-input-freshness-receipt.mjs --workflow decision-content --workflow page-refresh --require-fresh --json',
    '',
    'Options:',
    '  --all                         Check every known workflow input. Default when no --workflow is supplied.',
    '  --workflow <id>                Check one workflow input. Repeatable. Known IDs: decision-content, tool-refresh, page-refresh, affiliate-conversion.',
    '  --require-fresh                Exit non-zero if any checked input is stale, missing, invalid, or failed.',
    '  --max-generated-age-minutes <n> Maximum age for live generated reports. Default: 10.',
    '  --max-backlog-age-days <n>     Maximum age for coverage backlog. Default: 2.',
    '  --out <path>                   Write receipt JSON.',
    '  --project-dir <dir>            Project root. Alias: --root.',
    '  --json                         Emit structured JSON.',
  ].join('\n');
}

function valueFor(flag) {
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inlineArg) return inlineArg.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag && args[index + 1]) {
      values.push(args[index + 1]);
      index += 1;
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => String(value).split(',').map((part) => part.trim()).filter(Boolean));
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function numberFor(flag, fallback, options = {}) {
  const rawValue = valueFor(flag);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  const minValue = options.allowZero ? 0 : 1;
  return Number.isFinite(value) && value >= minValue ? value : fallback;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }
  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  for (const workflow of valuesFor('--workflow')) {
    if (!WORKFLOWS.includes(workflow)) issues.push({ code: 'argument-invalid', detail: `unknown workflow ${workflow}` });
  }
  return issues;
}

function selectedWorkflowIds() {
  const selected = valuesFor('--workflow');
  if (!selected.length || hasFlag('--all')) return WORKFLOWS;
  return [...new Set(selected)];
}

function checkWorkflow(workflow) {
  if (workflow === 'decision-content') return checkDecisionContent();
  if (workflow === 'tool-refresh') return checkToolRefresh();
  if (workflow === 'page-refresh') return checkPageRefresh();
  if (workflow === 'affiliate-conversion') return checkAffiliateConversion();
  return {
    id: workflow,
    ok: false,
    status: 'unknown',
    next_action: `Remove unknown workflow ${workflow} from the input freshness receipt.`,
  };
}

function checkDecisionContent() {
  const inputPath = resolve(PROJECT_DIR, 'src/data/coverage-backlog.json');
  const base = {
    id: 'decision-content',
    kind: 'coverage-backlog',
    input: projectPath(inputPath),
    refresh_command: 'npm run coverage:backlog',
    enforce_command: 'npm run loop:next -- --fail-on-stale-backlog --json',
    max_age_days: MAX_BACKLOG_AGE_DAYS,
  };
  if (!existsSync(inputPath)) {
    return {
      ...base,
      ok: false,
      status: 'missing',
      generated_at: '',
      age_days: null,
      next_action: 'Run npm run coverage:backlog, then rerun npm run loop:next -- --fail-on-stale-backlog --json.',
    };
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(inputPath, 'utf8'));
  } catch (error) {
    return {
      ...base,
      ok: false,
      status: 'invalid',
      generated_at: '',
      age_days: null,
      error: error.message,
      next_action: 'Regenerate src/data/coverage-backlog.json with npm run coverage:backlog.',
    };
  }

  const generatedAt = parsed.generated_at || '';
  const ageDays = ageInDays(generatedAt);
  const ok = Number.isFinite(ageDays) && ageDays <= MAX_BACKLOG_AGE_DAYS;
  return {
    ...base,
    ok,
    status: ok ? 'fresh' : Number.isFinite(ageDays) ? 'stale' : 'invalid',
    generated_at: generatedAt,
    age_days: Number.isFinite(ageDays) ? round(ageDays) : null,
    next_action: ok ? '' : 'Run npm run coverage:backlog, then rerun npm run loop:next -- --fail-on-stale-backlog --json.',
  };
}

function checkToolRefresh() {
  const command = runJsonScript('audit-freshness-queue.mjs', ['--json', '--project-dir', PROJECT_DIR]);
  const generatedAt = command.parsed?.generated_at || '';
  const ageMs = ageInMs(generatedAt);
  const maxAgeMs = MAX_GENERATED_AGE_MINUTES * 60 * 1000;
  const ok = command.ok && Number.isFinite(ageMs) && ageMs <= maxAgeMs;
  return {
    id: 'tool-refresh',
    kind: 'tool-refresh-freshness-report',
    ok,
    status: ok ? 'fresh' : command.ok ? 'stale' : 'failed',
    generated_at: generatedAt,
    age_ms: Number.isFinite(ageMs) ? ageMs : null,
    max_age_ms: maxAgeMs,
    command: 'node scripts/audit-freshness-queue.mjs --json --project-dir .',
    refresh_command: 'npm run audit:freshness -- --json',
    enforce_command: 'npm run tool:refresh:batch -- --fail-on-stale-inputs --json',
    exit_code: command.exit_code,
    stdout_tail: command.stdout_tail,
    stderr_tail: command.stderr_tail,
    next_action: ok ? '' : 'Rerun npm run tool:refresh:batch -- --fail-on-stale-inputs --json so planning consumes a fresh queue.',
  };
}

function checkPageRefresh() {
  const command = runJsonScript('generate-page-refresh-ledger.mjs', ['--check', '--json', '--project-dir', PROJECT_DIR]);
  const ok = command.ok && command.parsed?.ok === true;
  return {
    id: 'page-refresh',
    kind: 'page-refresh-ledger',
    ok,
    status: ok ? 'current' : 'stale',
    input: 'PAGE_REFRESH_LEDGER.md',
    command: 'node scripts/generate-page-refresh-ledger.mjs --check --json --project-dir .',
    refresh_command: 'npm run ledger:pages && npm run ledger:pages:check',
    enforce_command: 'npm run page:refresh:batch -- --fail-on-stale-ledger --json',
    exit_code: command.exit_code,
    changed: command.parsed?.changed ?? null,
    ledger_updated_through: command.parsed?.ledger_updated_through || '',
    stdout_tail: command.stdout_tail,
    stderr_tail: command.stderr_tail,
    next_action: ok ? '' : 'Run npm run ledger:pages && npm run ledger:pages:check, then rerun page refresh planning with --fail-on-stale-ledger.',
  };
}

function checkAffiliateConversion() {
  const command = runJsonScript('affiliate-conversion-inventory.mjs', ['--json'], { cwd: PROJECT_DIR });
  const generatedAt = command.parsed?.generated_at || '';
  const ageMs = ageInMs(generatedAt);
  const maxAgeMs = MAX_GENERATED_AGE_MINUTES * 60 * 1000;
  const ok = command.ok && Number.isFinite(ageMs) && ageMs <= maxAgeMs;
  return {
    id: 'affiliate-conversion',
    kind: 'affiliate-conversion-inventory',
    ok,
    status: ok ? 'fresh' : command.ok ? 'stale' : 'failed',
    generated_at: generatedAt,
    age_ms: Number.isFinite(ageMs) ? ageMs : null,
    max_age_ms: maxAgeMs,
    command: 'node scripts/affiliate-conversion-inventory.mjs --json',
    refresh_command: 'npm run affiliate:conversion:inventory -- --json',
    enforce_command: 'npm run affiliate:conversion:plan -- --fail-on-stale-inputs --json',
    exit_code: command.exit_code,
    stdout_tail: command.stdout_tail,
    stderr_tail: command.stderr_tail,
    next_action: ok ? '' : 'Rerun npm run affiliate:conversion:plan -- --fail-on-stale-inputs --json so planning consumes a fresh inventory.',
  };
}

function runJsonScript(scriptName, scriptArgs = [], options = {}) {
  const scriptPath = resolve(SCRIPT_DIR, scriptName);
  const child = spawnSync(process.execPath, [scriptPath, ...scriptArgs], {
    cwd: options.cwd || PROJECT_DIR,
    encoding: 'utf8',
    timeout: 120000,
  });
  const parsed = parseJson(child.stdout);
  return {
    ok: child.status === 0 && parsed != null,
    exit_code: child.status,
    parsed,
    stdout_tail: tail(child.stdout),
    stderr_tail: tail(child.stderr),
  };
}

function parseJson(output) {
  const text = String(output || '').trim();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function emit(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    console.log(`Input freshness ok for ${report.summary?.workflow_count ?? 0} workflow(s).`);
  } else {
    console.error('Input freshness requires attention.');
    for (const action of report.next_actions ?? []) console.error(`- ${action}`);
  }
}

function projectPath(path) {
  return relative(PROJECT_DIR, resolve(PROJECT_DIR, path)).replaceAll('\\', '/');
}

function tail(output) {
  const text = String(output || '').trim();
  if (!text) return '';
  return text.split(/\r?\n/).slice(-8).join('\n').slice(-2000);
}

function ageInMs(value) {
  const parsed = Date.parse(value || '');
  if (Number.isNaN(parsed)) return Infinity;
  return Math.max(0, Date.now() - parsed);
}

function ageInDays(value) {
  const ageMs = ageInMs(value);
  if (!Number.isFinite(ageMs)) return Infinity;
  return ageMs / (24 * 60 * 60 * 1000);
}

function round(value) {
  return Math.round(value * 100) / 100;
}
