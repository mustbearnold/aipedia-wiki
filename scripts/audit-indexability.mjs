#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtSiteDir } from './lib/built-site-dir.mjs';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = argValue('--project-dir') || argValue('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const SITE_ORIGIN = 'https://aipedia.wiki';
const jsonMode = args.includes('--json');
const KNOWN_FLAGS = new Set(['--json', '--dist', '--site-dir', '--dist-dir', '--project-dir', '--root', '--help', '-h']);
const REQUIRED_NOINDEX_PATHS = [
  '/admin/reviews/',
  '/compare/build/',
  '/search/',
];

function argValue(name) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
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
      if (!['--dist', '--site-dir', '--dist-dir', '--project-dir', '--root'].includes(previous)) {
        issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      }
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
  }

  for (const flag of ['--dist', '--site-dir', '--dist-dir', '--project-dir', '--root']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : args[args.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${flag} requires a path` });
  }

  const distFlags = ['--dist', '--site-dir', '--dist-dir'].filter(hasFlag);
  if (distFlags.length > 1) {
    issues.push({ code: 'argument-invalid', detail: `choose one built-output flag, got ${distFlags.join(', ')}` });
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-indexability.mjs --json',
    '  node scripts/audit-indexability.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --dist <dir>         Check a specific built output directory.',
    '  --site-dir <dir>     Alias for --dist.',
    '  --project-dir <dir>  Resolve vercel.json and relative paths from another project root.',
  ].join('\n');
}

const argumentIssues = collectArgumentIssues();
if (args.includes('--help') || args.includes('-h')) {
  console.log(usage());
  process.exit(0);
}

const distArg = argValue('--dist') || argValue('--site-dir') || argValue('--dist-dir');
const distDir = builtSiteDir(PROJECT_DIR, distArg);

function read(path) {
  return readFileSync(path, 'utf8');
}

function decodeXml(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map((match) => decodeXml(match[1].trim()));
}

function normalizePath(pathname) {
  if (!pathname.startsWith('/')) return `/${pathname}`;
  return pathname;
}

function parseRedirectSources() {
  const vercelConfigPath = join(PROJECT_DIR, 'vercel.json');
  if (existsSync(vercelConfigPath)) {
    const config = JSON.parse(read(vercelConfigPath));
    const sources = new Set();
    for (const redirect of config.redirects ?? []) {
      const source = String(redirect?.source ?? '').trim();
      if (!source || redirect?.permanent !== true) continue;
      if (source.includes(':') || source.includes('*') || source.includes('(')) continue;
      sources.add(normalizePath(source));
    }
    return sources;
  }

  const sources = new Set();
  return sources;
}

function headerBlocks() {
  const vercelConfigPath = join(PROJECT_DIR, 'vercel.json');
  if (existsSync(vercelConfigPath)) {
    const config = JSON.parse(read(vercelConfigPath));
    return (config.headers ?? []).map((block) => ({
      pattern: String(block?.source ?? ''),
      lines: (block?.headers ?? []).map((header) => `${header.key}: ${header.value}`),
    }));
  }

  return [];
}

function matchesRoutePattern(pattern, pathname) {
  if (pattern === pathname) return true;
  if (pattern === '/(.*)') return true;
  if (pattern.endsWith('/(.*)')) return pathname.startsWith(pattern.slice(0, -4));
  if (pattern.endsWith('/*')) return pathname.startsWith(pattern.slice(0, -1));
  return false;
}

function formatDistLabel(path) {
  return relative(PROJECT_DIR, path).replaceAll(sep, '/');
}

function emitReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    console.log(
      `[audit-indexability] OK: ${report.sitemap_urls} sitemap URLs checked; ${report.checked_html} HTML pages scanned for noindex.`,
    );
  } else {
    console.error('[audit-indexability] Indexability issues found:');
    for (const issue of report.issues) {
      console.error(`- ${issue.code}${issue.url ? ` ${issue.url}` : ''}${issue.detail ? ` (${issue.detail})` : ''}`);
    }
  }
}

if (argumentIssues.length > 0) {
  const report = {
    ok: false,
    dist: formatDistLabel(distDir),
    sitemap_urls: 0,
    checked_html: 0,
    required_noindex_paths: REQUIRED_NOINDEX_PATHS,
    redirect_source_paths: [],
    noindex_header_patterns: [],
    issues: argumentIssues,
  };
  emitReport(report);
  process.exit(1);
}

const redirectSourcePaths = parseRedirectSources();
const noindexHeaderPatterns = headerBlocks()
  .filter((block) => block.lines.some((line) => /^x-robots-tag:\s*.*noindex/i.test(line)))
  .map((block) => block.pattern);

const sitemapFiles = existsSync(distDir)
  ? readdirSync(distDir).filter((name) => /^sitemap-\d+\.xml$/.test(name)).sort()
  : [];

const issues = [];
if (!existsSync(distDir)) {
  issues.push({ code: 'dist-missing', detail: formatDistLabel(distDir) });
}

if (!sitemapFiles.length) {
  issues.push({ code: 'sitemap-missing', detail: formatDistLabel(distDir) });
}

const sitemapUrls = [];
for (const fileName of sitemapFiles) {
  sitemapUrls.push(...locsFromXml(read(join(distDir, fileName))));
}

function builtHtmlPath(pathname) {
  if (pathname === '/') return join(distDir, 'index.html');
  const clean = pathname.replace(/^\/|\/$/g, '');
  return join(distDir, clean, 'index.html');
}

let checkedHtml = 0;
const seen = new Set();
for (const loc of sitemapUrls) {
  if (seen.has(loc)) issues.push({ code: 'duplicate-sitemap-url', url: loc });
  seen.add(loc);

  let url;
  try {
    url = new URL(loc);
  } catch {
    issues.push({ code: 'invalid-url', url: loc });
    continue;
  }

  if (url.origin !== SITE_ORIGIN) {
    issues.push({ code: 'wrong-origin', url: loc, detail: url.origin });
  }

  if (url.pathname.includes('.md')) {
    issues.push({ code: 'markdown-url-in-sitemap', url: loc });
  }

  const lastSegment = url.pathname.split('/').filter(Boolean).at(-1) ?? '';
  if (!url.pathname.endsWith('/') && !lastSegment.includes('.')) {
    issues.push({ code: 'non-canonical-trailing-slash', url: loc });
  }

  if (redirectSourcePaths.has(url.pathname)) {
    issues.push({ code: 'redirect-source-in-sitemap', url: loc });
  }

  const blockedByNoindexHeader = noindexHeaderPatterns.find((pattern) => matchesRoutePattern(pattern, url.pathname));
  if (blockedByNoindexHeader) {
    issues.push({ code: 'x-robots-noindex-in-sitemap', url: loc, detail: blockedByNoindexHeader });
  }

  const htmlPath = builtHtmlPath(url.pathname);
  if (existsSync(htmlPath)) {
    checkedHtml += 1;
    const html = read(htmlPath);
    if (/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
      issues.push({ code: 'meta-noindex-in-sitemap', url: loc });
    }
  }
}

for (const pathname of REQUIRED_NOINDEX_PATHS) {
  const htmlPath = builtHtmlPath(pathname);
  if (!existsSync(htmlPath)) continue;

  const html = read(htmlPath);
  const url = new URL(pathname, SITE_ORIGIN).href;
  if (seen.has(url)) {
    issues.push({ code: 'required-noindex-url-in-sitemap', url });
  }
  if (!/<meta\s+[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)) {
    issues.push({ code: 'required-noindex-missing', url });
  }
}

const report = {
  ok: issues.length === 0,
  dist: formatDistLabel(distDir),
  sitemap_urls: sitemapUrls.length,
  checked_html: checkedHtml,
  required_noindex_paths: REQUIRED_NOINDEX_PATHS,
  redirect_source_paths: [...redirectSourcePaths].sort(),
  noindex_header_patterns: noindexHeaderPatterns,
  issues,
};

emitReport(report);

process.exit(report.ok ? 0 : 1);
