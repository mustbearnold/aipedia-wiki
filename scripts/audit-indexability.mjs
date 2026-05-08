#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE_ORIGIN = 'https://aipedia.wiki';
const jsonMode = process.argv.includes('--json');
const REQUIRED_NOINDEX_PATHS = [
  '/admin/reviews/',
  '/compare/build/',
  '/search/',
];

function argValue(name) {
  const equalsArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const distArg = argValue('--dist');
const distDir = distArg
  ? join(PROJECT_DIR, distArg)
  : join(PROJECT_DIR, process.env.AIPEDIA_FAST_BUILD === '1' ? 'dist-fast' : 'dist/client');

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
  const redirectsPath = join(PROJECT_DIR, 'public', '_redirects');
  if (!existsSync(redirectsPath)) return new Set();

  const sources = new Set();
  for (const rawLine of read(redirectsPath).split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const [source, , status] = line.split(/\s+/);
    if (!source || !/^30[1278]$/.test(status ?? '')) continue;
    if (source.includes(':') || source.includes('*')) continue;

    sources.add(normalizePath(source));
  }

  return sources;
}

function headerBlocks() {
  const headersPath = join(PROJECT_DIR, 'public', '_headers');
  if (!existsSync(headersPath)) return [];

  const blocks = [];
  let current = null;

  for (const rawLine of read(headersPath).split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue;

    if (!/^\s/.test(rawLine)) {
      if (current) blocks.push(current);
      current = { pattern: rawLine.trim(), lines: [] };
      continue;
    }

    current?.lines.push(rawLine.trim());
  }

  if (current) blocks.push(current);
  return blocks;
}

function matchesCloudflarePattern(pattern, pathname) {
  if (pattern === pathname) return true;
  if (pattern.endsWith('/*')) return pathname.startsWith(pattern.slice(0, -1));
  return false;
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
  issues.push({ code: 'dist-missing', detail: relative(PROJECT_DIR, distDir).replaceAll(sep, '/') });
}

if (!sitemapFiles.length) {
  issues.push({ code: 'sitemap-missing', detail: relative(PROJECT_DIR, distDir).replaceAll(sep, '/') });
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

  const blockedByNoindexHeader = noindexHeaderPatterns.find((pattern) => matchesCloudflarePattern(pattern, url.pathname));
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
  dist: relative(PROJECT_DIR, distDir).replaceAll(sep, '/'),
  sitemap_urls: sitemapUrls.length,
  checked_html: checkedHtml,
  required_noindex_paths: REQUIRED_NOINDEX_PATHS,
  redirect_source_paths: [...redirectSourcePaths].sort(),
  noindex_header_patterns: noindexHeaderPatterns,
  issues,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  console.log(
    `[audit-indexability] OK: ${report.sitemap_urls} sitemap URLs checked; ${report.checked_html} HTML pages scanned for noindex.`,
  );
} else {
  console.error('[audit-indexability] Indexability issues found:');
  for (const issue of issues) {
    console.error(`- ${issue.code}${issue.url ? ` ${issue.url}` : ''}${issue.detail ? ` (${issue.detail})` : ''}`);
  }
}

process.exit(report.ok ? 0 : 1);
