#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import { builtSiteDir } from './lib/built-site-dir.mjs';

const args = process.argv.slice(2);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--site-dir', '--dist-dir', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--site-dir', '--dist-dir', '--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const siteDirArg = valueFor('--site-dir') || valueFor('--dist-dir');
const explicitSiteDir = Boolean(siteDirArg);
const SITE_DIR = builtSiteDir(PROJECT_DIR, siteDirArg);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(reportFor({ mode: 'argument-error', issues: [] }));
  process.exit(2);
}

const budgets = [
  { path: join(SITE_DIR, 'pagefind'), rawMaxMb: 10 },
  { path: join(SITE_DIR, 'index.html'), rawMaxMb: 0.3, gzipMaxMb: 0.08 },
  { path: join(SITE_DIR, 'tools', 'index.html'), rawMaxMb: 1.1, gzipMaxMb: 0.18 },
];

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) {
    const next = args[index + 1] ?? '';
    return next && !next.startsWith('-') ? next : '';
  }
  const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function collectArgumentIssues() {
  const issues = [];
  const foundValueFlags = new Set();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    const equalsIndex = arg.startsWith('--') ? arg.indexOf('=') : -1;
    const name = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!KNOWN_FLAGS.has(name)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
      continue;
    }

    if (VALUE_FLAGS.has(name)) {
      foundValueFlags.add(name);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: 'argument-invalid', detail: `${name} requires a directory path` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a directory path` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: 'argument-invalid', detail: `${name} does not accept a value` });
  }

  if (foundValueFlags.has('--site-dir') && foundValueFlags.has('--dist-dir')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --site-dir or --dist-dir' });
  }
  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/check-dist-budget.mjs',
    '  node scripts/check-dist-budget.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --json                 Emit a structured budget report.',
    '  --site-dir <dir>       Check a specific built static output directory.',
    '  --dist-dir <dir>       Alias for --site-dir.',
    '  --project-dir <dir>    Resolve default built output from another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function bytes(path) {
  if (!existsSync(path)) return 0;

  const stat = statSync(path);
  if (!stat.isDirectory()) return stat.size;

  let total = 0;
  for (const name of readdirSync(path)) total += bytes(join(path, name));
  return total;
}

function mb(sizeBytes) {
  return Number((sizeBytes / 1024 / 1024).toFixed(4));
}

function budgetLabel(path) {
  const baseDir = explicitSiteDir ? SITE_DIR : PROJECT_DIR;
  return relative(baseDir, path).replace(/\\/g, '/');
}

function reportFor({ mode = 'budget', issues = [], items = [] }) {
  return {
    ok: mode !== 'argument-error' && issues.length === 0,
    mode,
    project_dir: PROJECT_DIR,
    site_dir: SITE_DIR,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    totals: {
      budgets_checked: items.length,
      issues: issues.length,
    },
    items,
    issues,
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[check-dist-budget] invalid arguments:');
    for (const issue of report.argument_issues) console.error(`  x ${issue.detail}`);
    return;
  }

  for (const item of report.items) {
    if (item.raw_mb != null) console.log(`${item.label}: ${item.raw_mb.toFixed(2)}MB / ${item.raw_max_mb}MB raw`);
    if (item.gzip_mb != null) console.log(`${item.label}: ${item.gzip_mb.toFixed(2)}MB / ${item.gzip_max_mb}MB gzip`);
  }

  for (const issue of report.issues) {
    if (issue.code === 'built-site-dir-missing') {
      console.error(`[check-dist-budget] ${issue.path} does not exist. Run astro build first.`);
    } else if (issue.code === 'built-artifact-missing') {
      console.error(`  x ${issue.label} is missing from the built site output`);
    } else if (issue.code === 'raw-budget-exceeded') {
      console.error(`  x ${issue.label} exceeds raw budget`);
    } else if (issue.code === 'gzip-budget-exceeded') {
      console.error(`  x ${issue.label} exceeds gzip budget`);
    } else {
      console.error(`  x ${issue.detail}`);
    }
  }

  if (report.ok) console.log('[check-dist-budget] budgets pass');
}

if (!existsSync(SITE_DIR)) {
  const report = reportFor({
    issues: [{ code: 'built-site-dir-missing', path: SITE_DIR, detail: 'Run astro build first.' }],
  });
  emitReport(report);
  process.exit(2);
}

const issues = [];
const items = [];

for (const budget of budgets) {
  const label = budgetLabel(budget.path);

  if (!existsSync(budget.path)) {
    issues.push({ code: 'built-artifact-missing', path: budget.path, label, detail: `${label} is missing from the built site output` });
    continue;
  }

  const sizeBytes = bytes(budget.path);
  const rawMb = mb(sizeBytes);
  const item = {
    label,
    path: budget.path,
    raw_mb: rawMb,
    raw_max_mb: budget.rawMaxMb,
  };

  if (rawMb > budget.rawMaxMb) {
    issues.push({ code: 'raw-budget-exceeded', path: budget.path, label, actual_mb: rawMb, max_mb: budget.rawMaxMb });
  }

  if (budget.gzipMaxMb && existsSync(budget.path) && !statSync(budget.path).isDirectory()) {
    const compressedMb = mb(gzipSync(readFileSync(budget.path), { level: 9 }).length);
    item.gzip_mb = compressedMb;
    item.gzip_max_mb = budget.gzipMaxMb;
    if (compressedMb > budget.gzipMaxMb) {
      issues.push({ code: 'gzip-budget-exceeded', path: budget.path, label, actual_mb: compressedMb, max_mb: budget.gzipMaxMb });
    }
  }

  items.push(item);
}

const report = reportFor({ items, issues });
emitReport(report);
if (!report.ok) process.exit(2);
