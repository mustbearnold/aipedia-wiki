#!/usr/bin/env node

import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const toolsDir = join(PROJECT_DIR, 'src', 'content', 'tools');
const manifestPath = join(PROJECT_DIR, 'src', 'data', 'logo-manifest.json');
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

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
    '  node scripts/audit-tool-logos.mjs',
    '  node scripts/audit-tool-logos.mjs --json',
    '  node scripts/audit-tool-logos.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured tool-logo audit report.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)['"]?`, 'm'));
  return match ? match[1].trim() : '';
}

function reportFor({ ok, mode = 'audit', scanned = 0, missing = [], issues = [] }) {
  return {
    ok,
    mode,
    project_dir: PROJECT_DIR,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    totals: {
      tools_scanned: scanned,
      missing_logos: missing.length,
      issues: issues.length,
    },
    missing,
    issues,
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[audit-tool-logos] Invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  if (report.issues.length > 0) {
    console.error('[audit-tool-logos] Tool logo guard failed:');
    for (const issue of report.issues) console.error(`${issue.code}\t${issue.file}\t${issue.detail}`);
    return;
  }

  if (report.missing.length > 0) {
    console.error('[audit-tool-logos] Missing tool logos:');
    for (const slug of report.missing) {
      console.error(`- ${slug} needs public/logos/tools/${slug}.(png|svg|webp|jpg|ico) and regenerated src/data/logo-manifest.json`);
    }
    return;
  }

  console.log(`[audit-tool-logos] OK: ${report.totals.tools_scanned} tool record(s) have logo manifest entries.`);
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(reportFor({ ok: false, mode: 'argument-error' }));
  process.exit(1);
}

const rootIssues = [];
for (const [file, detail] of [
  ['src/content/tools', toolsDir],
  ['src/data/logo-manifest.json', manifestPath],
]) {
  if (!existsSync(detail)) rootIssues.push({ code: 'tool-logo-root-missing', file, detail });
}

if (rootIssues.length > 0) {
  const report = reportFor({ ok: false, issues: rootIssues });
  emitReport(report);
  process.exit(1);
}

let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch (error) {
  const report = reportFor({
    ok: false,
    issues: [{ code: 'tool-logo-manifest-invalid-json', file: 'src/data/logo-manifest.json', detail: error.message }],
  });
  emitReport(report);
  process.exit(1);
}

const files = (await readdir(toolsDir)).filter((file) => file.endsWith('.md'));
const missing = [];

for (const file of files) {
  const text = await readFile(join(toolsDir, file), 'utf8');
  const slug = scalar(frontmatter(text), 'slug') || file.replace(/\.md$/, '');
  if (!manifest[slug]) missing.push(slug);
}

const report = reportFor({ ok: missing.length === 0, scanned: files.length, missing: missing.sort() });
emitReport(report);
process.exit(report.ok ? 0 : 1);
