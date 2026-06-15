#!/usr/bin/env node
/**
 * Post-process generated build CSS so third-party defaults cannot reintroduce
 * non-Metropolis font stacks after Astro/Tailwind/Pagefind compilation.
 */
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtSiteDir, resolvePathFromProject } from './lib/built-site-dir.mjs';

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultRoot);
const siteDirArg = valueFor('--site-dir') || valueFor('--dist-dir');
const pagefindDirArg = valueFor('--pagefind-dir');
const SITE_DIR = builtSiteDir(ROOT, siteDirArg);
const PAGEFIND_DIR = resolvePathFromProject(ROOT, pagefindDirArg || 'public/pagefind');
const json = args.has('--json');
const KNOWN_FLAGS = new Set(['--json', '--site-dir', '--dist-dir', '--project-dir', '--root', '--pagefind-dir', '--help', '-h']);
const SCANNED_EXTENSIONS = new Set(['.css', '.html', '.svg']);

function valueFor(flag) {
  const index = rawArgs.indexOf(flag);
  if (index >= 0) return rawArgs[index + 1] ?? '';
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/enforce-built-font-policy.mjs',
    '  node scripts/enforce-built-font-policy.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --site-dir <dir>       Normalize a specific built static output directory.',
    '  --dist-dir <dir>       Alias for --site-dir.',
    '  --pagefind-dir <dir>   Normalize a specific public Pagefind mirror.',
    '  --project-dir <dir>    Resolve relative paths from another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --json                 Emit a structured report.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const arg of rawArgs) {
    if (!arg.startsWith('-')) continue;
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
  }

  for (const flag of ['--site-dir', '--dist-dir', '--project-dir', '--root', '--pagefind-dir']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : rawArgs[rawArgs.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${flag} requires a path` });
  }

  const distFlags = ['--site-dir', '--dist-dir'].filter(hasFlag);
  if (distFlags.length > 1) {
    issues.push({ code: 'argument-invalid', detail: `choose one built-output flag, got ${distFlags.join(', ')}` });
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function isDirectory(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

function displayPath(path) {
  const rel = relative(ROOT, path).replace(/\\/g, '/');
  return rel && !rel.startsWith('..') ? rel : path;
}

function targetDirs() {
  const dirs = [SITE_DIR];
  if (isDirectory(PAGEFIND_DIR)) dirs.push(PAGEFIND_DIR);
  return [...new Set(dirs.map((dir) => resolve(dir)))];
}

function extname(path) {
  const idx = path.lastIndexOf('.');
  return idx === -1 ? '' : path.slice(idx).toLowerCase();
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(full));
    else if (stat.isFile() && SCANNED_EXTENSIONS.has(extname(full))) out.push(full);
  }
  return out;
}

function enforce(text) {
  return text
    // Tailwind preflight includes named system fallbacks inside var() fallbacks.
    // AIpedia defines --default-font-family/--default-mono-font-family itself,
    // so keep the variable reference and drop the non-brand fallback list.
    .replace(/font-family:var\(--default-font-family,[^)]+\)/g, 'font-family:var(--default-font-family)')
    .replace(/font-family:var\(--default-mono-font-family,[^)]+\)/g, 'font-family:var(--default-mono-font-family)')
    .replace(/--font-sans:[^;}]+/g, '--font-sans:"Metropolis", sans-serif')
    .replace(/--font-mono:[^;}]+/g, '--font-mono:"Metropolis", sans-serif')
    // Pagefind ships generated CSS with a system fallback. Keep its public CSS
    // variables but make their fallback Metropolis-only.
    .replace(/var\(--pf-font,[^)]+\)/g, "var(--pf-font, 'Metropolis', sans-serif)")
    .replace(/var\(--pagefind-ui-font,[^)]+\)/g, "var(--pagefind-ui-font, 'Metropolis', sans-serif)")
    .replace(/--pagefind-ui-font:[^;]+;/g, "--pagefind-ui-font:'Metropolis',sans-serif;")
    // Ignored debug/public SVGs can be copied into dist locally. Normalize any
    // legacy social-card or placeholder-logo font stacks they contain.
    .replace(/font-family=(['\"])(?:(?!\1).)*(?:Inter|Geist|JetBrains|system-ui|Arial|Roboto|Segoe UI|ui-monospace|monospace)(?:(?!\1).)*\1/gi, 'font-family=$1Metropolis, sans-serif$1')
    .replace(/font-family:\s*[^;}\"]*(?:Inter|Geist|JetBrains|system-ui|Arial|Roboto|Segoe UI|ui-monospace|monospace)[^;}\"]*/gi, 'font-family: Metropolis, sans-serif');
}

function emitReport(report) {
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else if (report.ok) {
    console.log(`[font-policy] normalized ${report.normalized_files} generated text asset(s).`);
  } else {
    console.error('[font-policy] failed:');
    for (const issue of report.issues) console.error(`- ${issue.code}: ${issue.detail}`);
  }
}

if (args.has('--help') || args.has('-h')) {
  console.log(usage());
  process.exit(0);
}

const issues = collectArgumentIssues();
if (!isDirectory(SITE_DIR)) {
  issues.push({ code: 'site-dir-missing', detail: `${displayPath(SITE_DIR)} does not exist or is not a directory` });
}
if (hasFlag('--pagefind-dir') && !isDirectory(PAGEFIND_DIR)) {
  issues.push({ code: 'pagefind-dir-missing', detail: `${displayPath(PAGEFIND_DIR)} does not exist or is not a directory` });
}

if (issues.length > 0) {
  emitReport({
    ok: false,
    project_dir: ROOT,
    target_dirs: [],
    scanned_files: 0,
    normalized_files: 0,
    issues,
  });
  process.exit(1);
}

let scannedFiles = 0;
let touched = 0;
const normalizedFiles = [];
const targets = targetDirs();
for (const dir of targets) {
  for (const file of walk(dir)) {
    scannedFiles += 1;
    const before = readFileSync(file, 'utf8');
    const after = enforce(before);
    if (after !== before) {
      writeFileSync(file, after);
      touched += 1;
      normalizedFiles.push(displayPath(file));
    }
  }
}

emitReport({
  ok: true,
  project_dir: ROOT,
  target_dirs: targets.map(displayPath),
  scanned_files: scannedFiles,
  normalized_files: touched,
  normalized_paths: normalizedFiles,
  issues: [],
});
