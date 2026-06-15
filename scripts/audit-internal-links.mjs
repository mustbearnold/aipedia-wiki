#!/usr/bin/env node
/**
 * Audit internal /tools/<slug>/ and /news/<slug>/ links across content files.
 * Flags links pointing at non-existent first-party slugs.
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
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
const argumentIssues = collectArgumentIssues();

const subdirs = ['tools', 'news', 'comparisons', 'use-cases', 'categories', 'reports', 'trends', 'companies', 'workflows', 'benchmarks', 'glossary'];

// Match only first-party internal links, not embedded URLs (which carry
// a scheme:// or a host before the path). The lookbehind rejects the
// character immediately before /tools/ or /news/ if it is alphanumeric,
// a dot, or a colon (e.g. "captions.ai/tools/" or "example.com:443/news/").
const toolLinkRe = /(?<![a-zA-Z0-9.:])\/tools\/([a-z0-9][a-z0-9-]*)\/?(?=[^a-z0-9-]|$)/g;
const newsLinkRe = /(?<![a-zA-Z0-9.:])\/news\/(\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*)\/?(?=[^a-z0-9-]|$)/g;
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

function slugsIn(dir) {
  return new Set(
    readdirSync(dir)
      .filter((file) => file.endsWith('.md'))
      .map((file) => file.replace(/\.md$/, '')),
  );
}

function mapReport(broken) {
  return [...broken.entries()]
    .sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]))
    .map(([slug, paths]) => ({ slug, paths: [...new Set(paths)].sort() }));
}

function reportFor({ ok, mode = 'audit', brokenTools = [], brokenNews = [], filesScanned = 0, issues = [] }) {
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
      issues: issues.length,
    },
    broken_tools: brokenTools,
    broken_news: brokenNews,
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

  emitBroken('Broken /tools/ links', report.broken_tools);
  emitBroken('Broken /news/ links', report.broken_news);
  console.log('');

  if (report.ok) {
    console.log('[audit-internal-links] clean.');
  } else {
    console.log(`[audit-internal-links] ${report.totals.broken_unique_slugs} unique broken slug(s) found.`);
  }
}

function addBroken(broken, slug, path) {
  const list = broken.get(slug) ?? [];
  list.push(rel(path));
  broken.set(slug, list);
}

function scan(dir, context) {
  if (!existsSync(dir)) return;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      scan(path, context);
      continue;
    }

    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;

    context.filesScanned++;
    const raw = readFileSync(path, 'utf8');
    let match;

    toolLinkRe.lastIndex = 0;
    while ((match = toolLinkRe.exec(raw))) {
      const slug = match[1];
      if (!context.toolSlugs.has(slug)) addBroken(context.brokenTools, slug, path);
    }

    newsLinkRe.lastIndex = 0;
    while ((match = newsLinkRe.exec(raw))) {
      const slug = match[1];
      if (!context.newsSlugs.has(slug)) addBroken(context.brokenNews, slug, path);
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
for (const [file, detail] of [
  ['src/content/tools', TOOLS_DIR],
  ['src/content/news', NEWS_DIR],
]) {
  if (!existsSync(detail)) rootIssues.push({ code: 'internal-links-root-missing', file, detail });
}

if (rootIssues.length > 0) {
  const report = reportFor({ ok: false, issues: rootIssues });
  emitReport(report);
  process.exit(1);
}

const context = {
  toolSlugs: slugsIn(TOOLS_DIR),
  newsSlugs: slugsIn(NEWS_DIR),
  brokenTools: new Map(),
  brokenNews: new Map(),
  issues: [],
  filesScanned: 0,
};

for (const subdir of subdirs) {
  scan(join(CONTENT, subdir), context);
}

const brokenTools = mapReport(context.brokenTools);
const brokenNews = mapReport(context.brokenNews);
const report = reportFor({
  ok: brokenTools.length + brokenNews.length + context.issues.length === 0,
  brokenTools,
  brokenNews,
  filesScanned: context.filesScanned,
  issues: context.issues,
});

emitReport(report);
process.exit(report.ok ? 0 : 1);
