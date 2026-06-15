#!/usr/bin/env node
// Guard the no-em-dash hard rule in RENDERED content output.
//
// Why: em dashes read as AI-generated and are banned in any written output.
// They sneak in two ways that a naive `grep` for the literal character misses:
//   1. A literal em dash (U+2014) typed into content.
//   2. A source `--` (double hyphen) that the markdown pipeline (smartypants)
//      renders as an em dash. This also silently corrupts CLI commands like
//      `npm test -- path` unless they are wrapped in a code span.
//
// This guard scans src/content markdown, strips frontmatter + fenced code
// blocks + inline code spans (where `--` is legitimate and not converted),
// and fails on a literal em dash or a ` -- ` in the remaining prose.

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

const EM_DASH = '—';

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
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

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/guard-em-dashes.mjs',
    '  node scripts/guard-em-dashes.mjs --json',
    '  node scripts/guard-em-dashes.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured prose guard report.',
    '  --project-dir <dir>    Guard another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p));
    else if (entry.endsWith('.md')) out.push(p);
  }
  return out;
}

function stripForProse(raw) {
  // Blank out frontmatter, fenced code blocks, and inline code spans so that
  // legitimate `--` inside code (e.g. `npm test -- path`) is not flagged.
  // Replacement preserves newlines so reported line numbers stay accurate.
  const blank = (s) => s.replace(/[^\n]/g, '');
  let body = raw.replace(/^---\r?\n[\s\S]*?\r?\n---/, blank);
  body = body.replace(/```[\s\S]*?```/g, blank);
  body = body.replace(/`[^`\n]*`/g, blank);
  return body;
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function rel(path) {
  return relative(PROJECT_DIR, path).replaceAll(sep, '/');
}

function resultFor({ ok, mode = 'guard', scanned = 0, failures = [], issues = [] }) {
  return {
    ok,
    mode,
    project_dir: PROJECT_DIR,
    content_dir: CONTENT_DIR,
    scanned,
    failures,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    issues,
  };
}

function emitResult(result) {
  if (JSON_MODE) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  if (result.mode === 'argument-error') {
    console.error('[guard-em-dashes] Invalid arguments:');
    for (const issue of result.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  if (result.issues.length > 0) {
    console.error('[guard-em-dashes] Guard setup failed:');
    for (const issue of result.issues) console.error(`${issue.code}\t${issue.file}\t${issue.detail}`);
    return;
  }

  if (result.failures.length > 0) {
    console.error('\n\x1b[41;97m EM DASH GUARD FAILED \x1b[0m\n');
    console.error('Em dashes are banned in rendered output (they read as AI-generated).');
    console.error('Replace a literal em dash, or change a prose " -- " to a colon/comma; wrap CLI commands in a code span so `--` is preserved and not converted.\n');
    for (const failure of result.failures.slice(0, 100)) console.error(`  ✗ ${failure}`);
    if (result.failures.length > 100) console.error(`  … ${result.failures.length - 100} more`);
    console.error('');
    return;
  }

  console.log(`[guard-em-dashes] ✓ no em dashes (literal or rendered from " -- ") across ${result.scanned} content files.`);
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitResult(resultFor({ ok: false, mode: 'argument-error' }));
  process.exit(1);
}

if (!existsSync(CONTENT_DIR)) {
  emitResult(resultFor({
    ok: false,
    issues: [{ code: 'content-root-missing', file: 'src/content', detail: CONTENT_DIR }],
  }));
  process.exit(1);
}

const failures = [];
const files = walk(CONTENT_DIR);

for (const file of files) {
  const raw = readFileSync(file, 'utf8');
  const prose = stripForProse(raw);
  const relativePath = rel(file);

  let idx = prose.indexOf(EM_DASH);
  while (idx !== -1) {
    failures.push(`${relativePath}:${lineOf(prose, idx)} contains a literal em dash (U+2014)`);
    idx = prose.indexOf(EM_DASH, idx + 1);
  }

  const dd = / -- /g;
  let m;
  while ((m = dd.exec(prose)) !== null) {
    failures.push(`${relativePath}:${lineOf(prose, m.index)} contains " -- " (renders as an em dash; use a colon/comma, or wrap a CLI command in a code span)`);
  }
}

const result = resultFor({ ok: failures.length === 0, scanned: files.length, failures });
emitResult(result);
process.exit(result.ok ? 0 : 2);
