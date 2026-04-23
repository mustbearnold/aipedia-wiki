#!/usr/bin/env node
/**
 * Audit internal /tools/<slug>/ and /news/<slug>/ links across all
 * content files. Flags any link pointing at a non-existent slug.
 *
 * Run: node scripts/audit-internal-links.mjs
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = 'src/content';
const TOOLS_DIR = join(CONTENT, 'tools');
const NEWS_DIR = join(CONTENT, 'news');

function slugsIn(dir) {
  return new Set(
    readdirSync(dir)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
  );
}

const toolSlugs = slugsIn(TOOLS_DIR);
const newsSlugs = slugsIn(NEWS_DIR);

const subdirs = ['tools', 'news', 'comparisons', 'use-cases', 'categories', 'reports', 'trends', 'companies', 'workflows', 'benchmarks', 'glossary'];

const toolLinkRe = /\/tools\/([a-z0-9][a-z0-9-]*)\/?(?=[^a-z0-9-]|$)/g;
const newsLinkRe = /\/news\/(\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*)\/?(?=[^a-z0-9-]|$)/g;

const brokenTools = new Map();
const brokenNews = new Map();

function scan(dir) {
  for (const f of readdirSync(dir)) {
    const path = join(dir, f);
    if (f.endsWith('.md')) {
      const raw = readFileSync(path, 'utf8');
      let m;
      toolLinkRe.lastIndex = 0;
      while ((m = toolLinkRe.exec(raw))) {
        const slug = m[1];
        if (!toolSlugs.has(slug)) {
          const list = brokenTools.get(slug) ?? [];
          list.push(path);
          brokenTools.set(slug, list);
        }
      }
      newsLinkRe.lastIndex = 0;
      while ((m = newsLinkRe.exec(raw))) {
        const slug = m[1];
        if (!newsSlugs.has(slug)) {
          const list = brokenNews.get(slug) ?? [];
          list.push(path);
          brokenNews.set(slug, list);
        }
      }
    } else {
      try {
        const stat = readdirSync(path);
        if (Array.isArray(stat)) scan(path);
      } catch {
        /* not a directory */
      }
    }
  }
}

for (const sub of subdirs) {
  try {
    scan(join(CONTENT, sub));
  } catch {
    /* ignore missing subdirs */
  }
}

function report(title, broken) {
  if (broken.size === 0) {
    console.log(`\n${title}: clean (no broken links).`);
    return 0;
  }
  console.log(`\n${title}: ${broken.size} unknown slug(s)`);
  const sorted = [...broken.entries()].sort((a, b) => b[1].length - a[1].length);
  for (const [slug, paths] of sorted) {
    const uniq = [...new Set(paths)];
    console.log(`  ${slug}  (${uniq.length} file${uniq.length === 1 ? '' : 's'})`);
    for (const p of uniq.slice(0, 5)) console.log(`    - ${p}`);
    if (uniq.length > 5) console.log(`    ... and ${uniq.length - 5} more`);
  }
  return broken.size;
}

const tBroken = report('Broken /tools/ links', brokenTools);
const nBroken = report('Broken /news/ links', brokenNews);

console.log('');
if (tBroken + nBroken === 0) {
  console.log('[audit-internal-links] clean.');
  process.exit(0);
} else {
  console.log(`[audit-internal-links] ${tBroken + nBroken} unique broken slug(s) found.`);
  process.exit(0); // exit 0 so run surfaces diagnostics without blocking CI
}
