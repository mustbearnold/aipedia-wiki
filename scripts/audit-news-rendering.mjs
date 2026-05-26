#!/usr/bin/env node
/**
 * Fails when news pages have source/hero surfaces that can render as broken
 * trust UI: empty source lists, missing OG cards, or missing fallback thumbs.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const NEWS_DIR = join(ROOT, 'src/content/news');
const NEWS_OG_DIR = join(ROOT, 'public/og/news');
const NEWS_THUMB_DIR = join(NEWS_OG_DIR, 'thumbs');
const NEWS_THUMB_LIGHT_DIR = join(NEWS_THUMB_DIR, 'light');
const MIN_STORIES_PER_DAY = 2;

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

const files = readdirSync(NEWS_DIR).filter((file) => file.endsWith('.md')).sort();
const issues = [];
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

if (issues.length) {
  console.error('[audit-news-rendering] News rendering guard failed:');
  for (const issue of issues) {
    console.error(`${issue.code}\t${issue.slug}\t${issue.file}\t${issue.detail}`);
  }
  console.error('\nFix: add sources and run `node scripts/generate-og-news.mjs` after adding or renaming news articles.');
  process.exit(1);
}

console.log(`[audit-news-rendering] OK: ${files.length} news page(s) have sources, active-month coverage, and required OG/thumb assets.`);
