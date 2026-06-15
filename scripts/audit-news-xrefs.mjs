#!/usr/bin/env node
/**
 * audit-news-xrefs.mjs
 *
 * For every recent news item in src/content/news/ that declares
 * `affects: [tool-slug, ...]`, check whether the corresponding tool page
 * mentions either the news item's slug or a distinctive phrase from its title.
 */

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const NEWS_DIR = join(PROJECT_DIR, 'src/content/news');
const TOOLS_DIR = join(PROJECT_DIR, 'src/content/tools');
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--days-back', '--today', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--days-back', '--today', '--project-dir', '--root']);
const daysBackRaw = valueFor('--days-back') ?? process.env.DAYS_BACK ?? '30';
const todayRaw = valueFor('--today');
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

  if (!/^\d+$/.test(String(daysBackRaw)) || Number(daysBackRaw) < 1) {
    issues.push({ code: 'argument-invalid', detail: '--days-back must be a positive integer' });
  }

  if (todayRaw && !/^\d{4}-\d{2}-\d{2}$/.test(todayRaw)) {
    issues.push({ code: 'argument-invalid', detail: '--today must be YYYY-MM-DD' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-news-xrefs.mjs',
    '  node scripts/audit-news-xrefs.mjs --json',
    '  node scripts/audit-news-xrefs.mjs --project-dir <dir> --days-back <days>',
    '',
    'Options:',
    '  --json                 Emit a structured news xref report.',
    '  --days-back <days>     Audit news from the last N days. Defaults to DAYS_BACK or 30.',
    '  --today <YYYY-MM-DD>   Stabilize the current date for fixture tests.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function reportFor({ ok, mode = 'audit', checked = 0, gaps = [], issues = [], daysBack = Number(daysBackRaw), today = todayLabel() }) {
  return {
    ok,
    mode,
    project_dir: PROJECT_DIR,
    days_back: daysBack,
    today,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    totals: {
      checked,
      gaps: gaps.length,
      issues: issues.length,
    },
    gaps,
    issues,
  };
}

function todayDate() {
  return todayRaw ? new Date(`${todayRaw}T12:00:00Z`) : new Date();
}

function todayLabel() {
  return todayRaw || todayDate().toISOString().slice(0, 10);
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[audit-news-xrefs] Invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  if (report.issues.length > 0) {
    console.error('[audit-news-xrefs] News xref guard failed:');
    for (const issue of report.issues) console.error(`${issue.code}\t${issue.file}\t${issue.detail}`);
    return;
  }

  if (report.gaps.length === 0) {
    console.log(`OK. Checked ${report.totals.checked} news-to-tool cross-refs in last ${report.days_back} days. No gaps.`);
    return;
  }

  console.log(`Found ${report.gaps.length} gap(s): news items affecting a tool page that don't reference them.\n`);
  console.log('news-date\tnews-slug\ttool-slug\ttitle');
  for (const gap of report.gaps) {
    console.log(`${gap.date}\t${gap.newsSlug}\t${gap.toolSlug}\t${gap.title}`);
  }
  console.log('\nFix: add a link to /news/<news-slug>/ in the affected tool page\'s body, Key Facts, or price_history.');
}

function frontmatter(raw) {
  return raw.split('---')[1] || '';
}

function affectedTools(fm) {
  const match = fm.match(/^affects:\s*\[([^\]]*)\]/m);
  if (!match) return [];
  return match[1]
    .split(',')
    .map((item) => item.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean);
}

function titleFor(fm) {
  const match = fm.match(/^title:\s*["']?(.+?)["']?$/m);
  return match ? match[1].replace(/["']/g, '') : '(no title)';
}

function hasTitlePhrase(toolContent, title) {
  const titleWords = title
    .replace(/[^\w\s-]/g, '')
    .split(/\s+/)
    .filter((word) => word.length > 3);
  return titleWords.length >= 3 && toolContent.includes(titleWords.slice(0, 3).join(' '));
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(reportFor({ ok: false, mode: 'argument-error', daysBack: Number.isFinite(Number(daysBackRaw)) ? Number(daysBackRaw) : 0 }));
  process.exit(1);
}

const DAYS_BACK = Number(daysBackRaw);
const rootIssues = [];
for (const [file, detail] of [
  ['src/content/news', NEWS_DIR],
  ['src/content/tools', TOOLS_DIR],
]) {
  if (!existsSync(detail)) rootIssues.push({ code: 'news-xrefs-root-missing', file, detail });
}

if (rootIssues.length > 0) {
  const report = reportFor({ ok: false, issues: rootIssues, daysBack: DAYS_BACK });
  emitReport(report);
  process.exit(1);
}

const newsFiles = readdirSync(NEWS_DIR).filter((file) => file.endsWith('.md'));
const toolSlugs = new Set(
  readdirSync(TOOLS_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, '')),
);

const gaps = [];
let checked = 0;
const cutoff = todayDate();
cutoff.setDate(cutoff.getDate() - DAYS_BACK);

for (const newsFile of newsFiles) {
  const raw = readFileSync(join(NEWS_DIR, newsFile), 'utf8');
  const fm = frontmatter(raw);
  const dateMatch = fm.match(/^date:\s*([0-9-]+)/m);
  if (!dateMatch) continue;

  const date = new Date(`${dateMatch[1]}T12:00:00Z`);
  if (date < cutoff) continue;

  const affects = affectedTools(fm);
  if (affects.length === 0) continue;

  const title = titleFor(fm);
  const newsSlug = newsFile.replace(/\.md$/, '');

  for (const toolSlug of affects) {
    if (!toolSlugs.has(toolSlug)) continue;

    checked++;
    const toolContent = readFileSync(join(TOOLS_DIR, `${toolSlug}.md`), 'utf8');
    const hasSlugRef = toolContent.includes(newsSlug);
    const phraseHit = hasTitlePhrase(toolContent, title);

    if (!hasSlugRef && !phraseHit) {
      gaps.push({ newsSlug, toolSlug, title, date: dateMatch[1] });
    }
  }
}

const report = reportFor({ ok: gaps.length === 0, checked, gaps, daysBack: DAYS_BACK });
emitReport(report);
process.exit(report.ok ? 0 : 1);
