#!/usr/bin/env node
/**
 * Enforce AIpedia's brand-font policy.
 *
 * Policy: public pages and generated public SVG/CSS/HTML should use the
 * self-hosted Metropolis family, plus generic sans-serif fallback only. Named
 * system, Inter, Geist, JetBrains, and monospace stacks are disallowed because
 * they make page typography drift across environments.
 */
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtSiteDir } from './lib/built-site-dir.mjs';

const rawArgs = process.argv.slice(2);
const args = new Set(rawArgs);
const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultRoot);
const scanSource = hasFlag('--source');
const scanDist = hasFlag('--dist') || hasFlag('--site-dir') || hasFlag('--dist-dir');
const json = args.has('--json');
const KNOWN_FLAGS = new Set(['--json', '--source', '--dist', '--site-dir', '--dist-dir', '--project-dir', '--root', '--help', '-h']);

const SCANNED_EXTENSIONS = new Set(['.astro', '.css', '.html', '.js', '.mjs', '.svg', '.ts']);
const DISALLOWED_FONT_TOKENS = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Inter',
  'Geist',
  'JetBrains',
  'ui-monospace',
  'SFMono-Regular',
  'Menlo',
  'Monaco',
  'Consolas',
  'Liberation Mono',
  'Courier New',
  'monospace',
];

function valueFor(flag) {
  const index = rawArgs.indexOf(flag);
  if (index >= 0) return rawArgs[index + 1] ?? '';
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  return inlineArg ? inlineArg.slice(flag.length + 1) : '';
}

function optionalValueFor(flag) {
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  if (inlineArg) return inlineArg.slice(flag.length + 1);
  const index = rawArgs.indexOf(flag);
  if (index < 0) return '';
  const value = rawArgs[index + 1] ?? '';
  return value.startsWith('-') ? '' : value;
}

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of rawArgs.entries()) {
    if (!arg.startsWith('-')) {
      const previous = rawArgs[index - 1] ?? '';
      const isRequiredValue = ['--site-dir', '--dist-dir', '--project-dir', '--root'].includes(previous);
      const isOptionalDistValue = previous === '--dist';
      if (!isRequiredValue && !isOptionalDistValue) {
        issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      }
      continue;
    }
    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
  }

  for (const flag of ['--site-dir', '--dist-dir', '--project-dir', '--root']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : rawArgs[rawArgs.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${flag} requires a path` });
  }

  const distFlags = ['--dist', '--site-dir', '--dist-dir'].filter(hasFlag);
  if (distFlags.length > 1) {
    issues.push({ code: 'argument-invalid', detail: `choose one built-output flag, got ${distFlags.join(', ')}` });
  }

  if (hasFlag('--source') && distFlags.length > 0) {
    issues.push({ code: 'argument-invalid', detail: `choose only one of --source or ${distFlags.join(', ')}` });
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-font-policy.mjs --source',
    '  node scripts/audit-font-policy.mjs --dist [dir]',
    '  node scripts/audit-font-policy.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --source             Scan tracked source files.',
    '  --dist [dir]         Scan built site output, optionally from a specific directory.',
    '  --site-dir <dir>     Check a specific built static output directory.',
    '  --dist-dir <dir>     Alias for --site-dir.',
    '  --project-dir <dir>  Resolve relative paths from another project root.',
    '  --root <dir>         Alias for --project-dir.',
  ].join('\n');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function tokenPattern(token) {
  const escaped = escapeRegExp(token);
  const startsWord = /^[A-Za-z0-9]/.test(token);
  const endsWord = /[A-Za-z0-9]$/.test(token);
  const left = startsWord ? '(?<![A-Za-z0-9_-])' : '';
  const right = endsWord ? '(?![A-Za-z0-9_-])' : '';
  return `${left}${escaped}${right}`;
}

const DISALLOWED_RE = new RegExp(
  DISALLOWED_FONT_TOKENS.map(tokenPattern).join('|'),
  'i'
);
const TOKEN_RES = DISALLOWED_FONT_TOKENS.map((token) => [token, new RegExp(tokenPattern(token), 'i')]);

function extname(path) {
  const idx = path.lastIndexOf('.');
  return idx === -1 ? '' : path.slice(idx).toLowerCase();
}

function trackedSourceFiles() {
  const out = execFileSync('git', ['ls-files'], { cwd: ROOT, encoding: 'utf8' });
  return out
    .split('\n')
    .filter(Boolean)
    .filter((relPath) => SCANNED_EXTENSIONS.has(extname(relPath)))
    .filter((relPath) => {
      return (
        relPath.startsWith('src/') ||
        relPath.startsWith('scripts/') ||
        relPath.startsWith('public/')
      );
    });
}

function walk(dir) {
  if (!existsSync(dir)) return [];
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) entries.push(...walk(full));
    else if (stat.isFile() && SCANNED_EXTENSIONS.has(extname(full))) {
      entries.push(relative(ROOT, full));
    }
  }
  return entries;
}

function filesToScan() {
  if (scanDist) return walk(builtSiteDir(ROOT, optionalValueFor('--dist') || valueFor('--site-dir') || valueFor('--dist-dir')));
  return trackedSourceFiles();
}

function fontFragments(line) {
  const fragments = [];
  const patterns = [
    /font-family\s*=\s*(['\"])(.*?)\1/gi,
    /font-family\s*:\s*([^;}]+)/gi,
    /fontFamily\s*[:=]\s*(['\"])(.*?)\1/gi,
    /--(?:font-[\w-]+|default-font-[\w-]+|pf-font|pagefind-ui-font)\s*:\s*([^;}]+)/gi,
    /(?:^|[;{])\s*font\s*:\s*([^;}]+)/gi,
  ];

  for (const pattern of patterns) {
    for (const match of line.matchAll(pattern)) {
      fragments.push(match[2] ?? match[1] ?? match[0]);
    }
  }

  return fragments;
}

function scanFile(relPath) {
  const full = join(ROOT, relPath);
  let text;
  try {
    text = readFileSync(full, 'utf8');
  } catch {
    return [];
  }
  return text.split(/\r?\n/).flatMap((line, index) => {
    return fontFragments(line).flatMap((fragment) => {
      if (!DISALLOWED_RE.test(fragment)) return [];
      return [{
        file: relPath,
        line: index + 1,
        text: fragment.trim().slice(0, 240),
        tokens: TOKEN_RES.filter(([, re]) => re.test(fragment)).map(([token]) => token),
      }];
    });
  });
}

function emitReport(report) {
  if (json) {
    console.log(JSON.stringify(report, null, 2));
  } else if (report.ok) {
    console.log(`Font policy OK. Scanned ${report.files} ${report.mode === 'dist' ? 'built' : 'source'} files.`);
  } else if (report.issues?.length) {
    console.error('Font policy failed: invalid arguments.');
    for (const issue of report.issues) console.error(`- ${issue.code}: ${issue.detail}`);
  } else {
    console.error(`Font policy failed: ${report.violations.length} non-Metropolis font reference(s).`);
    for (const v of report.violations.slice(0, 80)) {
      console.error(`${v.file}:${v.line}: ${v.tokens.join(', ')} :: ${v.text}`);
    }
    if (report.violations.length > 80) {
      console.error(`...and ${report.violations.length - 80} more.`);
    }
  }
}

if (args.has('--help') || args.has('-h')) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  const report = { ok: false, mode: scanDist ? 'dist' : 'source', files: 0, violations: [], issues: argumentIssues };
  emitReport(report);
  process.exit(1);
}

const files = filesToScan();
const violations = files.flatMap(scanFile);
const report = {
  ok: violations.length === 0,
  mode: scanDist ? 'dist' : 'source',
  files: files.length,
  violations,
  issues: [],
};

emitReport(report);
process.exit(report.ok ? 0 : 1);
