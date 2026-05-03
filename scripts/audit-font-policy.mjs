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
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const args = new Set(process.argv.slice(2));
const scanDist = args.has('--dist');
const json = args.has('--json');

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
  if (scanDist) return walk(join(ROOT, 'dist', 'client'));
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

const files = filesToScan();
const violations = files.flatMap(scanFile);

if (json) {
  console.log(JSON.stringify({ mode: scanDist ? 'dist' : 'source', files: files.length, violations }, null, 2));
} else if (violations.length === 0) {
  console.log(`Font policy OK. Scanned ${files.length} ${scanDist ? 'built' : 'source'} files.`);
} else {
  console.error(`Font policy failed: ${violations.length} non-Metropolis font reference(s).`);
  for (const v of violations.slice(0, 80)) {
    console.error(`${v.file}:${v.line}: ${v.tokens.join(', ')} :: ${v.text}`);
  }
  if (violations.length > 80) {
    console.error(`...and ${violations.length - 80} more.`);
  }
}

process.exit(violations.length === 0 ? 0 : 1);
