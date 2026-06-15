#!/usr/bin/env node
/**
 * Fails when news pages have source/hero surfaces that can render as broken
 * trust UI: empty source lists, missing OG cards, or missing fallback thumbs.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const ROOT = resolve(projectDirArg || defaultRoot);
const NEWS_DIR = join(ROOT, 'src/content/news');
const NEWS_OG_DIR = join(ROOT, 'public/og/news');
const NEWS_THUMB_DIR = join(NEWS_OG_DIR, 'thumbs');
const NEWS_THUMB_LIGHT_DIR = join(NEWS_THUMB_DIR, 'light');
const MIN_STORIES_PER_DAY = 2;
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root']);
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

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-news-rendering.mjs',
    '  node scripts/audit-news-rendering.mjs --json',
    '  node scripts/audit-news-rendering.mjs --project-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured news rendering guard report.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
    '  --help, -h             Print this help message.',
  ].join('\n');
}

function reportFor({ ok, mode = 'guard', filesChecked = 0, issues = [] }) {
  return {
    ok,
    mode,
    project_dir: ROOT,
    argument_issues: mode === 'argument-error' ? argumentIssues : [],
    totals: {
      files_checked: filesChecked,
      issues: issues.length,
      min_stories_per_day: MIN_STORIES_PER_DAY,
    },
    issues,
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (report.ok) {
    console.log(`[audit-news-rendering] OK: ${report.totals.files_checked} news page(s) have sources, active-month coverage, and required OG/thumb assets.`);
    return;
  }

  if (report.mode === 'argument-error') {
    console.error('[audit-news-rendering] Invalid arguments:');
    for (const issue of report.argument_issues) console.error(`- ${issue.detail}`);
    console.error('');
    console.error(usage());
    return;
  }

  console.error('[audit-news-rendering] News rendering guard failed:');
  for (const issue of report.issues) {
    console.error(`${issue.code}\t${issue.slug}\t${issue.file}\t${issue.detail}`);
  }
  console.error('\nFix: add sources and run `node scripts/generate-og-news.mjs` after adding or renaming news articles.');
}

function frontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---/);
  return match ? match[1] : '';
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\n]+)['"]?\\s*$`, 'm'));
  return match ? match[1].trim() : '';
}

function sourceCount(fm) {
  const sourcesStart = fm.match(/^sources:\s*$/m);
  if (!sourcesStart) return 0;
  const afterSources = fm.slice(sourcesStart.index ?? 0);
  const nextTopLevel = afterSources.slice('sources:'.length).search(/\n[a-zA-Z_][a-zA-Z0-9_ -]*:\s*/);
  const sourcesBlock = nextTopLevel >= 0
    ? afterSources.slice(0, 'sources:'.length + nextTopLevel)
    : afterSources;
  return (sourcesBlock.match(/^\s*-\s+url:\s*\S+/gm) || []).length;
}

function hasHero(fm) {
  return /^hero:\s*$/m.test(fm);
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitReport(reportFor({ ok: false, mode: 'argument-error' }));
  process.exit(1);
}

const issues = [];

for (const [file, detail] of [
  ['src/content/news', NEWS_DIR],
  ['public/og/news', NEWS_OG_DIR],
  ['public/og/news/thumbs', NEWS_THUMB_DIR],
  ['public/og/news/thumbs/light', NEWS_THUMB_LIGHT_DIR],
]) {
  if (!existsSync(detail)) {
    issues.push({ code: 'news-rendering-root-missing', file, slug: file, detail });
  }
}

if (issues.length > 0) {
  const report = reportFor({ ok: false, issues });
  emitReport(report);
  process.exit(1);
}

const files = readdirSync(NEWS_DIR).filter((file) => file.endsWith('.md')).sort();
const countsByDate = new Map();
let latestDate = '';

for (const file of files) {
  const raw = readFileSync(join(NEWS_DIR, file), 'utf8');
  const fm = frontmatter(raw);
  const slug = scalar(fm, 'slug') || file.replace(/\.md$/, '');
  const date = scalar(fm, 'date') || file.slice(0, 10);
  const count = sourceCount(fm);
  const hero = hasHero(fm);

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    countsByDate.set(date, (countsByDate.get(date) ?? 0) + 1);
    if (date > latestDate) latestDate = date;
  }

  if (count < 1) {
    issues.push({ code: 'news-sources-empty', file, slug, detail: 'expected at least one source URL' });
  }

  const ogPath = join(NEWS_OG_DIR, `${slug}.png`);
  if (!existsSync(ogPath)) {
    issues.push({ code: 'news-og-missing', file, slug, detail: ogPath });
  }

  if (!hero) {
    const darkThumb = join(NEWS_THUMB_DIR, `${slug}.webp`);
    const lightThumb = join(NEWS_THUMB_LIGHT_DIR, `${slug}.webp`);
    if (!existsSync(darkThumb)) {
      issues.push({ code: 'news-thumb-missing', file, slug, detail: darkThumb });
    }
    if (!existsSync(lightThumb)) {
      issues.push({ code: 'news-thumb-light-missing', file, slug, detail: lightThumb });
    }
  }
}

if (latestDate) {
  const latestMonth = latestDate.slice(0, 7);
  const day = new Date(`${latestMonth}-01T12:00:00Z`);
  const last = new Date(`${latestDate}T12:00:00Z`);
  while (day <= last) {
    const date = day.toISOString().slice(0, 10);
    const count = countsByDate.get(date) ?? 0;
    if (count < MIN_STORIES_PER_DAY) {
      issues.push({
        code: 'news-daily-coverage-thin',
        file: 'src/content/news',
        slug: date,
        detail: `expected at least ${MIN_STORIES_PER_DAY} active-month news stories, found ${count}`,
      });
    }
    day.setUTCDate(day.getUTCDate() + 1);
  }
}

const report = reportFor({ ok: issues.length === 0, filesChecked: files.length, issues });
emitReport(report);

process.exit(report.ok ? 0 : 1);
