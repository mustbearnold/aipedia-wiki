import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultRepoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const repoRoot = path.resolve(projectDirArg || defaultRepoRoot);
const ledgerPath = path.join(repoRoot, 'PAGE_REFRESH_LEDGER.md');
const checkOnly = args.includes('--check');
const jsonMode = args.includes('--json');
const helpMode = args.includes('--help') || args.includes('-h');
const dateArg = valueFor('--date');
const knownFlags = new Set(['--check', '--json', '--date', '--project-dir', '--root', '--help', '-h']);
const valueFlags = new Set(['--date', '--project-dir', '--root']);
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
      if (!valueFlags.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!knownFlags.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });

    if (valueFlags.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  if (dateArg && !/^\d{4}-\d{2}-\d{2}$/.test(dateArg)) {
    issues.push({ code: 'argument-invalid', detail: '--date must be YYYY-MM-DD' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/generate-page-refresh-ledger.mjs',
    '  node scripts/generate-page-refresh-ledger.mjs --check',
    '  node scripts/generate-page-refresh-ledger.mjs --project-dir <dir> --date <YYYY-MM-DD>',
    '',
    'Options:',
    '  --check                Verify PAGE_REFRESH_LEDGER.md without writing.',
    '  --json                 Emit a structured ledger report.',
    '  --date <YYYY-MM-DD>    Override the local ledger date.',
    '  --project-dir <dir>    Generate or check another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function emitReport(report) {
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[generate-page-refresh-ledger] Invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  if (report.skipped) {
    console.log('PAGE_REFRESH_LEDGER.md strict check skipped for Vercel; local ledger checks remain enforced.');
    return;
  }

  if (report.mode === 'check') {
    if (report.ok) {
      console.log('PAGE_REFRESH_LEDGER.md is current.');
    } else {
      console.error('PAGE_REFRESH_LEDGER.md is out of date. Run `npm run ledger:pages`.');
    }
    return;
  }

  console.log(`Wrote ${path.relative(repoRoot, ledgerPath)} with ${report.rows} rows.`);
}

function resultFor({ ok, mode, rows = 0, ledgerUpdatedThrough = '', changed = false, skipped = false }) {
  return {
    ok,
    mode,
    project_dir: repoRoot,
    ledger_path: ledgerPath,
    check_only: checkOnly,
    skipped,
    rows,
    ledger_updated_through: ledgerUpdatedThrough,
    changed,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
  };
}

if (helpMode) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(resultFor({ ok: false, mode: 'argument-error' }));
  process.exit(1);
}

function localTodayYmd() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 10);
}

const currentDate = dateArg || process.env.AIPEDIA_LEDGER_DATE || localTodayYmd();

const collectionRoutes = [
  { name: 'Tool', base: 'src/content/tools', routePrefix: '/tools/' },
  { name: 'Category', base: 'src/content/categories', routePrefix: '/categories/' },
  { name: 'Comparison', base: 'src/content/comparisons', routePrefix: '/compare/' },
  { name: 'Trend', base: 'src/content/trends', routePrefix: '/trends/' },
  { name: 'Company', base: 'src/content/companies', routePrefix: '/companies/' },
  { name: 'Guide', base: 'src/content/use-cases', routePrefix: '/guides/' },
  { name: 'Dead tool archive', base: 'src/content/dead', routePrefix: '/dead/' },
  { name: 'Report', base: 'src/content/reports', routePrefix: '/reports/' },
  { name: 'Workflow', base: 'src/content/workflows', routePrefix: '/workflows/' },
];

const htmlStaticExtensions = ['.astro', '.md', '.mdx'];
const publicSurfaceRoutes = new Map([
  ['src/pages/llms.txt.ts', '/llms.txt'],
  ['src/pages/llms-full.txt.ts', '/llms-full.txt'],
  ['src/pages/news/rss.xml.ts', '/news/rss.xml'],
]);

const ignoredStaticPagePrefixes = [
  'src/pages/prototype/',
  'src/pages/prototypes/',
];

const sitemapExcludedPaths = new Set([
  '/about/editor/',
  '/compare/build/',
  '/guides/ai-content-pipeline/',
  '/guides/ai-customer-support/',
  '/guides/best-ai-for-medical-research/',
  '/guides/best-ai-for-legal-research/',
  '/guides/best-ai-tools-under-10-month/',
  '/guides/best-ai-tools-under-50-month/',
  '/guides/notion-ai-alternatives/',
  '/guides/otter-ai-alternatives/',
  '/search/',
  '/tool-finder/',
]);

function git(args) {
  return execFileSync('git', args, {
    cwd: repoRoot,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

function repoRel(filePath) {
  return toPosix(path.relative(repoRoot, filePath));
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function parseDirtyFiles() {
  let output = '';
  try {
    output = git(['status', '--porcelain']);
  } catch {
    return new Set();
  }
  if (!output) return new Set();

  return new Set(output.split(/\r?\n/).map((line) => {
    const rawPath = line.slice(3).trim();
    const renameTarget = rawPath.includes(' -> ') ? rawPath.split(' -> ').pop() : rawPath;
    return renameTarget.replace(/^"|"$/g, '');
  }));
}

// Vercel may mark files dirty during install/build because of checkout/cache
// normalization. CI checks should validate the committed ledger state, while
// local editorial runs still use dirty files to mark actively refreshed pages.
const ignoreDirtyFiles = process.env.AIPEDIA_LEDGER_IGNORE_DIRTY || process.env.CI || process.env.VERCEL || process.env.VERCEL_ENV;
const dirtyFiles = ignoreDirtyFiles ? new Set() : parseDirtyFiles();

if (checkOnly && process.env.AIPEDIA_LEDGER_IGNORE_DIRTY) {
  emitReport(resultFor({ ok: true, mode: 'check', skipped: true }));
  process.exit(0);
}

function gitLastDate(relPath) {
  try {
    const result = git(['log', '-1', '--format=%cs', '--', relPath]);
    return result || currentDate;
  } catch {
    return currentDate;
  }
}

function normalizeDate(value) {
  if (!value) return '';
  const raw = String(value).trim().replace(/^['"]|['"]$/g, '');
  const iso = raw.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (iso) return iso;
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? raw : parsed.toISOString().slice(0, 10);
}

function dateForFile(relPath, explicitDate = '') {
  if (dirtyFiles.has(relPath)) return currentDate;
  return normalizeDate(explicitDate) || gitLastDate(relPath);
}

function dateSourceForFile(relPath, explicitDate = '', explicitSource = 'frontmatter') {
  if (dirtyFiles.has(relPath)) return 'working tree';
  return explicitDate ? explicitSource : 'git';
}

function readFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;
    data[field[1]] = field[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function dateFromStaticSource(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return normalizeDate(
    raw.match(/dateModified:\s*['"]([^'"]+)['"]/)?.[1]
    || raw.match(/datetime=["'](\d{4}-\d{2}-\d{2})["']/)?.[1]
  );
}

function slugFromContentFile(filePath, baseDir, data) {
  const rel = toPosix(path.relative(baseDir, filePath)).replace(/\.mdx?$/, '');
  return (data.slug || rel).replace(/^\/+|\/+$/g, '');
}

function routeForContent(prefix, slug) {
  return `${prefix}${slug}/`.replace(/\/{2,}/g, '/');
}

function routeForStaticPage(relPath) {
  let route = relPath
    .replace(/^src\/pages\//, '')
    .replace(/\.(astro|md|mdx)$/, '');

  if (route === 'index') return '/';
  if (route.endsWith('/index')) route = route.slice(0, -'/index'.length);
  return `/${route}/`.replace(/\/{2,}/g, '/');
}

function isHtmlStaticPage(relPath) {
  const ext = htmlStaticExtensions.find((candidate) => relPath.endsWith(candidate));
  if (!ext) return false;
  if (ignoredStaticPagePrefixes.some((prefix) => relPath.startsWith(prefix))) return false;
  if (relPath.includes('/api/')) return false;
  if (relPath.includes('/embed/')) return false;
  if (relPath.includes('/badges/')) return false;
  return !relPath.includes('[');
}

function sitemapStatus(route) {
  if (route.startsWith('/admin/')) return 'No';
  if (route.startsWith('/api/')) return 'No';
  if (route === '/404/') return 'No';
  if (sitemapExcludedPaths.has(route)) return 'No';
  if (!route.endsWith('/')) return 'No';
  return 'Yes';
}

function mdEscape(value) {
  return String(value ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim();
}

function compareRows(a, b) {
  return a.lastUpdated.localeCompare(b.lastUpdated)
    || a.route.localeCompare(b.route);
}

const rows = [];

for (const collection of collectionRoutes) {
  const baseDir = path.join(repoRoot, collection.base);
  for (const filePath of walk(baseDir).filter((file) => /\.mdx?$/.test(file))) {
    const rel = repoRel(filePath);
    const data = readFrontmatter(filePath);
    const slug = slugFromContentFile(filePath, baseDir, data);
    const explicitDate = data.last_updated || data.last_verified || data.date;
    rows.push({
      route: routeForContent(collection.routePrefix, slug),
      type: collection.name,
      lastUpdated: dateForFile(rel, explicitDate),
      dateSource: dateSourceForFile(rel, explicitDate, 'frontmatter'),
      source: rel,
      sitemap: sitemapStatus(routeForContent(collection.routePrefix, slug)),
    });
  }
}

for (const filePath of walk(path.join(repoRoot, 'src/pages'))) {
  const rel = repoRel(filePath);
  if (!isHtmlStaticPage(rel)) continue;

  const explicitDate = dateFromStaticSource(filePath);
  const route = routeForStaticPage(rel);
  rows.push({
    route,
    type: 'Static page',
    lastUpdated: dateForFile(rel, explicitDate),
    dateSource: dateSourceForFile(rel, explicitDate, 'page metadata'),
    source: rel,
    sitemap: sitemapStatus(route),
  });
}

for (const [rel, route] of publicSurfaceRoutes) {
  const fullPath = path.join(repoRoot, rel);
  if (!fs.existsSync(fullPath)) continue;
    rows.push({
      route,
      type: 'Crawl surface',
      lastUpdated: dateForFile(rel),
      dateSource: dateSourceForFile(rel),
      source: rel,
      sitemap: 'No',
    });
}

for (const rel of ['public/robots.txt', 'astro.config.mjs']) {
  const route = rel === 'public/robots.txt' ? '/robots.txt' : '/sitemap-index.xml';
  rows.push({
    route,
    type: 'Crawl surface',
    lastUpdated: dateForFile(rel),
    dateSource: dateSourceForFile(rel),
    source: rel,
    sitemap: 'No',
  });
}

const seen = new Set();
const dedupedRows = rows
  .sort(compareRows)
  .filter((row) => {
    if (seen.has(row.route)) return false;
    seen.add(row.route);
    return true;
  });

const ledgerUpdatedThrough = dedupedRows.reduce(
  (latest, row) => row.lastUpdated > latest ? row.lastUpdated : latest,
  ''
);

const lines = [
  '# AiPedia Page Refresh Ledger',
  '',
  `Ledger updated through: ${ledgerUpdatedThrough}`,
  `Tracked public pages and crawl surfaces: ${dedupedRows.length}`,
  '',
  'Hard rule: every time a tracked website page is edited, refreshed, materially re-ranked, or has volatile facts re-verified, update that page row in this file on the same change. If a child page update affects a parent hub, archive, internal-link block, sitemap, or LLM surface, update those affected rows too.',
  '',
  'Scope note: individual news article URLs are intentionally excluded from this refresh ledger; track the `/news/` hub and crawl surfaces instead.',
  '',
  'Use `npm run ledger:pages` to regenerate this file from route files and content frontmatter. Content-driven pages use their `last_updated` frontmatter unless the source file is currently modified; static pages use page metadata when present, then the latest git date for the route source.',
  '',
  '| Last updated | Page | Type | Sitemap | Date source | Source file |',
  '| --- | --- | --- | --- | --- | --- |',
  ...dedupedRows.map((row) => (
    `| ${mdEscape(row.lastUpdated)} | ${mdEscape(row.route)} | ${mdEscape(row.type)} | ${mdEscape(row.sitemap)} | ${mdEscape(row.dateSource)} | ${mdEscape(row.source)} |`
  )),
  '',
];

const next = `${lines.join('\n')}`;

if (checkOnly) {
  const current = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, 'utf8') : '';
  if (current !== next) {
    emitReport(resultFor({
      ok: false,
      mode: 'check',
      rows: dedupedRows.length,
      ledgerUpdatedThrough,
      changed: true,
    }));
    process.exit(1);
  }
  emitReport(resultFor({
    ok: true,
    mode: 'check',
    rows: dedupedRows.length,
    ledgerUpdatedThrough,
    changed: false,
  }));
} else {
  fs.writeFileSync(ledgerPath, next);
  emitReport(resultFor({
    ok: true,
    mode: 'write',
    rows: dedupedRows.length,
    ledgerUpdatedThrough,
    changed: true,
  }));
}
