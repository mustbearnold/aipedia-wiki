#!/usr/bin/env node
// Read-only checkpoint that distinguishes system progress from content-only work.

import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const REQUIRE_SYSTEM = args.includes('--require-system-artifact');
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const EXPLICIT_PATHS = valuesFor('--path').concat(valuesFor('--paths'));
const KNOWN_FLAGS = new Set(['--json', '--help', '-h', '--require-system-artifact', '--project-dir', '--root', '--path', '--paths']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--path', '--paths']);

const SYSTEM_PREFIXES = [
  '.agent/',
  'docs/',
  'scripts/',
  'tests/',
  'tools/aipedia-runner/',
  'workflows/',
  'skills/',
];
const SYSTEM_FILES = new Set([
  'AGENTS.md',
  'INDEX.md',
  'DESIGN.md',
  'README.md',
  'package.json',
  'package-lock.json',
  'src/data/operator-surfaces.json',
  'src/data/aipedia-loops.json',
]);
const CONTENT_PREFIXES = ['src/content/', 'src/pages/', 'public/'];
const CONTENT_FILES = new Set(['PAGE_REFRESH_LEDGER.md', 'src/data/source-registry.json', 'src/data/coverage-backlog.json']);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  emitReport({
    ok: false,
    mode: 'argument-error',
    project_dir: PROJECT_DIR,
    argument_issues: argumentIssues,
  });
  process.exit(2);
}

const changedPaths = [...new Set((EXPLICIT_PATHS.length ? EXPLICIT_PATHS : gitChangedPaths()).map(normalizePath))].sort();
const classified = changedPaths.map((path) => ({ path, kind: classifyPath(path) }));
const system_artifacts = classified.filter((entry) => entry.kind === 'system').map((entry) => entry.path);
const content_artifacts = classified.filter((entry) => entry.kind === 'content').map((entry) => entry.path);
const other_artifacts = classified.filter((entry) => entry.kind === 'other').map((entry) => entry.path);
const hasSystemArtifact = system_artifacts.length > 0;
const contentOnly = changedPaths.length > 0 && !hasSystemArtifact && content_artifacts.length > 0;
const mode = REQUIRE_SYSTEM && !hasSystemArtifact ? (contentOnly ? 'content-only-progress' : 'missing-system-progress') : 'system-progress-check';
const ok = !(REQUIRE_SYSTEM && !hasSystemArtifact);

emitReport({
  ok,
  mode,
  project_dir: PROJECT_DIR,
  require_system_artifact: REQUIRE_SYSTEM,
  changed_paths: changedPaths,
  system_artifacts,
  content_artifacts,
  other_artifacts,
  has_system_artifact: hasSystemArtifact,
  content_only: contentOnly,
  next_action: ok
    ? 'System artifact present or enforcement disabled.'
    : 'Add or validate a system artifact before recording this loop as operating-system progress.',
});

process.exit(ok ? 0 : 1);

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-system-progress-check.mjs --json',
    '  node scripts/agent-system-progress-check.mjs --require-system-artifact --json',
    '  node scripts/agent-system-progress-check.mjs --path scripts/foo.mjs --path tests/scripts/foo.test.mjs --json',
    '',
    'Options:',
    '  --json                       Emit a structured report.',
    '  --require-system-artifact    Exit non-zero unless at least one system artifact changed.',
    '  --path <path>                Classify an explicit path. Repeatable.',
    '  --paths <a,b>                Classify comma-separated paths.',
    '  --project-dir <dir>          Project root. Alias: --root.',
  ].join('\n');
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  if (!report.ok) {
    console.error(`[agent-system-progress-check] ${report.mode}`);
    for (const issue of report.argument_issues ?? []) console.error(`- ${issue.detail}`);
    if (report.next_action) console.error(report.next_action);
    return;
  }
  console.log(`[agent-system-progress-check] ${report.has_system_artifact ? 'system artifact present' : 'no system artifact detected'}`);
  for (const path of report.system_artifacts ?? []) console.log(`  system: ${path}`);
  for (const path of report.content_artifacts ?? []) console.log(`  content: ${path}`);
}

function gitChangedPaths() {
  const paths = [];
  for (const gitArgs of [
    ['diff', '--name-only'],
    ['diff', '--name-only', '--cached'],
    ['ls-files', '--others', '--exclude-standard'],
  ]) {
    const result = spawnSync('git', gitArgs, { cwd: PROJECT_DIR, encoding: 'utf8' });
    if (result.status !== 0) continue;
    paths.push(...result.stdout.split(/\r?\n/).map(normalizePath).filter(Boolean));
  }
  return paths;
}

function classifyPath(path) {
  if (SYSTEM_FILES.has(path) || SYSTEM_PREFIXES.some((prefix) => path.startsWith(prefix))) return 'system';
  if (CONTENT_FILES.has(path) || CONTENT_PREFIXES.some((prefix) => path.startsWith(prefix))) return 'content';
  return 'other';
}

function normalizePath(path) {
  return String(path ?? '').replace(/\\/g, '/').replace(/^\.\//, '').trim();
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
  return values.flatMap((value) => value.split(',')).map(normalizePath).filter(Boolean);
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
    if (VALUE_FLAGS.has(name) && !arg.includes('=')) index += 1;
  }
  if (args.includes('--project-dir') && args.includes('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  return issues;
}
