#!/usr/bin/env node
/**
 * Audit internal collection links across content and page files.
 * Flags links pointing at non-existent first-party routes.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const CONTENT = join(PROJECT_DIR, 'src/content');
const TOOLS_DIR = join(CONTENT, 'tools');
const NEWS_DIR = join(CONTENT, 'news');
const PAGES_DIR = join(PROJECT_DIR, 'src/pages');
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

const contentSubdirs = ['tools', 'news', 'comparisons', 'use-cases', 'categories', 'reports', 'trends', 'companies', 'workflows', 'dead', 'glossary'];
const scanExtensions = new Set(['.md', '.astro']);

const routeSpecs = [
  { key: 'tools', label: '/tools/', contentDir: TOOLS_DIR, routePrefix: 'tools', routeBase: 'tools' },
  { key: 'news', label: '/news/', contentDir: NEWS_DIR, routePrefix: 'news', routeBase: 'news' },
  { key: 'categories', label: '/categories/', contentDir: join(CONTENT, 'categories'), routePrefix: 'categories', routeBase: 'categories' },
  { key: 'comparisons', label: '/compare/', contentDir: join(CONTENT, 'comparisons'), routePrefix: 'compare', routeBase: 'compare', staticSlugs: ['build'] },
  { key: 'guides', label: '/guides/', contentDir: join(CONTENT, 'use-cases'), routePrefix: 'guides', routeBase: 'guides' },
  { key: 'trends', label: '/trends/', contentDir: join(CONTENT, 'trends'), routePrefix: 'trends', routeBase: 'trends' },
  { key: 'companies', label: '/companies/', contentDir: join(CONTENT, 'companies'), routePrefix: 'companies', routeBase: 'companies' },
  { key: 'reports', label: '/reports/', contentDir: join(CONTENT, 'reports'), routePrefix: 'reports', routeBase: 'reports' },
  { key: 'workflows', label: '/workflows/', contentDir: join(CONTENT, 'workflows'), routePrefix: 'workflows', routeBase: 'workflows' },
  { key: 'dead', label: '/dead/', contentDir: join(CONTENT, 'dead'), routePrefix: 'dead', routeBase: 'dead' },
  { key: 'glossary', label: '/glossary/', contentDir: join(CONTENT, 'glossary'), routePrefix: 'glossary', routeBase: 'glossary' },
  { key: 'answers', label: '/answers/', pageDir: join(PAGES_DIR, 'answers'), routePrefix: 'answers', routeBase: 'answers' },
];
const routeSpecByPrefix = new Map(routeSpecs.map((spec) => [spec.routePrefix, spec]));
const routeLinkRe = /(?<![a-zA-Z0-9.:])\/(tools|news|categories|compare|guides|trends|companies|reports|workflows|dead|glossary|answers)\/([a-z0-9][a-z0-9-]*)\/?(?=[^a-z0-9-]|$)/g;

// Match only first-party internal links, not embedded URLs (which carry
// a scheme:// or a host before the path). The lookbehind rejects the
// character immediately before /tools/ or /news/ if it is alphanumeric,
// a dot, or a colon (e.g. "captions.ai/tools/" or "example.com:443/news/").
const claudeCodeWrongTargetRe = /\[([^\]\n]*Claude Code[^\]\n]*)\]\(\/tools\/claude\/?\)/gi;
const claudeAlternativeUnlinkedClaudeCodeRe = /\[Claude\]\(\/tools\/claude\/?\)\s+(?:or|and)\s+Claude Code\b/gi;

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
    '  node scripts/audit-internal-links.mjs',
    '  node scripts/audit-internal-links.mjs --json',
    '  node scripts/audit-internal-links.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured internal-link report.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function rel(path) {
  return relative(PROJECT_DIR, path).replaceAll(sep, '/');
}

function slugsIn(dir, extensions = ['.md']) {
  if (!existsSync(dir)) return new Set();
  const allowed = new Set(extensions);
  return new Set(
    readdirSync(dir)
      .filter((file) => allowed.has(extnameLite(file)))
      .map((file) => file.replace(/\.(md|astro)$/, ''))
      .filter((slug) => !slug.startsWith('[') && slug !== 'index'),
  );
}

function extnameLite(file) {
  const index = file.lastIndexOf('.');
  return index >= 0 ? file.slice(index) : '';
}

function mapReport(broken) {
  return [...broken.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([slug, paths]) => ({ slug, paths: [...new Set(paths)].sort() }));
}

function reportFor({ ok, mode = 'audit', brokenRoutes = {}, filesScanned = 0, issues = [] }) {
  const routeReports = Object.fromEntries(
    routeSpecs.map((spec) => [spec.key, brokenRoutes[spec.key] ?? []]),
  );
  const brokenTools = routeReports.tools ?? [];
  const brokenNews = routeReports.news ?? [];
  const brokenUniqueRoutes = Object.values(routeReports).reduce((sum, routes) => sum + routes.length, 0);
  return {
    ok,
    mode,
    project_dir: PROJECT_DIR,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    totals: {
      files_scanned: filesScanned,
      broken_tool_slugs: brokenTools.length,
      broken_news_slugs: brokenNews.length,
      broken_unique_slugs: brokenTools.length + brokenNews.length,
      broken_unique_routes: brokenUniqueRoutes,
      issues: issues.length,
    },
    broken_tools: brokenTools,
    broken_news: brokenNews,
    broken_routes: routeReports,
    issues,
  };
}

function emitBroken(title, broken) {
  if (broken.length === 0) {
    console.log(`\n${title}: clean (no broken links).`);
    return;
  }

  console.log(`\n${title}: ${broken.length} unknown slug(s)`);
  for (const item of broken) {
    console.log(`  ${item.slug}  (${item.paths.length} file${item.paths.length === 1 ? '' : 's'})`);
    for (const path of item.paths.slice(0, 5)) console.log(`    - ${path}`);
    if (item.paths.length > 5) console.log(`    ... and ${item.paths.length - 5} more`);
  }
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[audit-internal-links] Invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  if (report.issues.length > 0) {
    console.error('[audit-internal-links] Internal link guard failed:');
    for (const issue of report.issues) console.error(`${issue.code}\t${issue.file}\t${issue.detail}`);
    return;
  }

  for (const spec of routeSpecs) {
    emitBroken(`Broken ${spec.label} links`, report.broken_routes[spec.key] ?? []);
  }
  console.log('');

  if (report.ok) {
    console.log('[audit-internal-links] clean.');
  } else {
    console.log(`[audit-internal-links] ${report.totals.broken_unique_routes} unique broken route(s) found.`);
  }
}

function addBroken(broken, route, path) {
  const list = broken.get(route) ?? [];
  list.push(rel(path));
  broken.set(route, list);
}

function scan(dir, context) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(path, context);
      continue;
    }

    if (!entry.isFile() || !scanExtensions.has(extnameLite(entry.name))) continue;

    context.filesScanned++;
    const raw = readFileSync(path, 'utf8');
    let match;

    routeLinkRe.lastIndex = 0;
    while ((match = routeLinkRe.exec(raw))) {
      const prefix = match[1];
      const slug = match[2];
      const spec = routeSpecByPrefix.get(prefix);
      if (!spec) continue;
      const slugs = context.routeSlugs.get(spec.key);
      if (slugs && !slugs.has(slug)) {
        addBroken(context.brokenRoutes.get(spec.key), `/${prefix}/${slug}/`, path);
      }
    }

    claudeCodeWrongTargetRe.lastIndex = 0;
    while ((match = claudeCodeWrongTargetRe.exec(raw))) {
      context.issues.push({
        code: 'semantic-claude-code-link-target',
        file: rel(path),
        detail: `Link text "${match[1]}" points to /tools/claude/; use /tools/claude-code/ for Claude Code.`,
      });
    }

    claudeAlternativeUnlinkedClaudeCodeRe.lastIndex = 0;
    while ((match = claudeAlternativeUnlinkedClaudeCodeRe.exec(raw))) {
      context.issues.push({
        code: 'semantic-unlinked-claude-code-alternative',
        file: rel(path),
        detail: 'Claude Code is named beside the generic Claude link; link Claude Code to /tools/claude-code/.',
      });
    }
  }
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
for (const spec of routeSpecs.filter((item) => item.key === 'tools' || item.key === 'news')) {
  const dir = spec.contentDir ?? spec.pageDir;
  if (!dir) continue;
  const file = spec.contentDir
    ? rel(spec.contentDir)
    : rel(spec.pageDir);
  if (!existsSync(dir)) rootIssues.push({ code: 'internal-links-root-missing', file, detail: dir });
}

if (rootIssues.length > 0) {
  const report = reportFor({ ok: false, issues: rootIssues });
  emitReport(report);
  process.exit(1);
}

const context = {
  routeSlugs: new Map(routeSpecs.map((spec) => {
    const slugs = spec.contentDir
      ? slugsIn(spec.contentDir, ['.md'])
      : slugsIn(spec.pageDir, ['.astro']);
    for (const slug of spec.staticSlugs ?? []) slugs.add(slug);
    return [spec.key, slugs];
  })),
  brokenRoutes: new Map(routeSpecs.map((spec) => [spec.key, new Map()])),
  issues: [],
  filesScanned: 0,
};

for (const subdir of contentSubdirs) {
  scan(join(CONTENT, subdir), context);
}
scan(PAGES_DIR, context);

const brokenRoutes = Object.fromEntries(
  routeSpecs.map((spec) => [spec.key, mapReport(context.brokenRoutes.get(spec.key))]),
);
const brokenRouteCount = Object.values(brokenRoutes).reduce((sum, routes) => sum + routes.length, 0);
const report = reportFor({
  ok: brokenRouteCount + context.issues.length === 0,
  brokenRoutes,
  filesScanned: context.filesScanned,
  issues: context.issues,
});

emitReport(report);
process.exit(report.ok ? 0 : 1);
