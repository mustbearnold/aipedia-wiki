#!/usr/bin/env node
// Scan public/logos/tools/ and write a slug -> URL map to
// src/data/logo-manifest.json so components can resolve logos without
// touching node:fs at render time. Keeping fs.existsSync out of Astro
// component frontmatter also makes builds portable across hosted runtimes.
//
// Run as part of copy-content.mjs on every build.

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const checkMode = args.includes('--check');
const dryRunMode = args.includes('--dry-run');
const helpMode = args.includes('--help') || args.includes('-h');
const knownFlags = new Set(['--dry-run', '--check', '--json', '--project-dir', '--root', '--help', '-h']);
const valueFlags = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();
const defaultRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultRoot);
const LOGO_DIR = join(ROOT, 'public/logos/tools');
const OUT_DIR = join(ROOT, 'src/data');
const OUT_PATH = join(OUT_DIR, 'logo-manifest.json');

const EXT_PRIORITY = ['.png', '.svg', '.jpg', '.webp', '.gif', '.ico'];

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
    const flag = equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;

    if (!arg.startsWith('-')) {
      issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    if (!knownFlags.has(flag)) {
      issues.push({ code: 'argument-invalid', detail: `unknown flag ${flag}` });
      continue;
    }

    if (valueFlags.has(flag)) {
      foundValueFlags.add(flag);

      if (equalsIndex >= 0) {
        if (!arg.slice(equalsIndex + 1)) issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
        continue;
      }

      const next = args[index + 1];
      if (!next || next.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${flag} requires a value` });
      } else {
        index += 1;
      }
      continue;
    }

    if (equalsIndex >= 0) issues.push({ code: 'argument-invalid', detail: `${flag} does not accept a value` });
  }

  if (foundValueFlags.has('--project-dir') && foundValueFlags.has('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }
  if (dryRunMode && checkMode) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --dry-run or --check' });
  }

  return issues;
}

function usage() {
  return [
    'Usage: node scripts/generate-logo-manifest.mjs [options]',
    '',
    'Options:',
    '  --dry-run             Build the manifest and report changes without writing.',
    '  --check               Compare generated manifest with the existing file without writing.',
    '  --json                Print a structured JSON report.',
    '  --project-dir <dir>   Generate or check another project root.',
    '  --root <dir>          Alias for --project-dir.',
    '  --help, -h            Print this help message.',
  ].join('\n');
}

function buildManifest() {
  if (!existsSync(LOGO_DIR)) return { manifest: {}, missingLogoDir: true };

  const bySlug = {};
  for (const file of readdirSync(LOGO_DIR).sort((a, b) => a.localeCompare(b))) {
    const dotIndex = file.lastIndexOf('.');
    if (dotIndex <= 0) continue;

    const ext = file.slice(dotIndex).toLowerCase();
    const slug = file.slice(0, dotIndex);
    if (!EXT_PRIORITY.includes(ext)) continue;

    const existing = bySlug[slug];
    if (existing && EXT_PRIORITY.indexOf(ext) >= EXT_PRIORITY.indexOf(existing.ext)) continue;

    bySlug[slug] = { ext, path: `/logos/tools/${file}` };
  }

  const manifest = {};
  for (const slug of Object.keys(bySlug).sort((a, b) => a.localeCompare(b))) {
    manifest[slug] = bySlug[slug].path;
  }

  return { manifest, missingLogoDir: false };
}

function reportFor({ mode, manifest = {}, changed = false, written = false, missingLogoDir = false }) {
  return {
    ok: mode === 'argument-error' ? false : !checkMode || !changed,
    mode,
    project_dir: ROOT,
    logo_dir: LOGO_DIR,
    output_path: OUT_PATH,
    entries: Object.keys(manifest).length,
    changed,
    written,
    missing_logo_dir: missingLogoDir,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

function emitReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[generate-logo-manifest] Invalid command arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    return;
  }

  if (report.missing_logo_dir) console.error('Logo dir not found, using empty manifest');

  if (report.mode === 'check') {
    if (report.changed) {
      console.error(`Logo manifest check failed: regenerate ${report.output_path}`);
    } else {
      console.log(`Logo manifest: ${report.entries} entries already up to date.`);
    }
    return;
  }

  if (report.mode === 'dry-run') {
    const action = report.changed ? 'would update' : 'would leave unchanged';
    console.log(`Logo manifest: ${report.entries} entries ${action} src/data/logo-manifest.json`);
    return;
  }

  const action = report.written ? 'written to' : 'already up to date at';
  console.log(`Logo manifest: ${report.entries} entries ${action} src/data/logo-manifest.json`);
}

if (helpMode) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  const report = reportFor({ mode: 'argument-error' });
  emitReport(report);
  process.exit(1);
}

const { manifest, missingLogoDir } = buildManifest();
const rendered = `${JSON.stringify(manifest, null, 2)}\n`;
const existing = existsSync(OUT_PATH) ? readFileSync(OUT_PATH, 'utf8') : '';
const changed = existing !== rendered;
const written = !checkMode && !dryRunMode && changed;

if (written) {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, rendered);
}

const report = reportFor({ mode: dryRunMode ? 'dry-run' : checkMode ? 'check' : 'generate', manifest, changed, written, missingLogoDir });
emitReport(report);
process.exit(report.ok ? 0 : 1);
