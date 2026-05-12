#!/usr/bin/env node
/**
 * Batch-migrate the 12 standalone /answers/*.astro pages to the
 * godtier visual system.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ANSWERS_DIR = 'src/pages/answers';
const files = readdirSync(ANSWERS_DIR)
  .filter((f) => f.endsWith('.astro') && f !== 'index.astro');

let migrated = 0;
let skipped = 0;

for (const file of files) {
  const path = join(ANSWERS_DIR, file);
  let src = readFileSync(path, 'utf8');

  if (src.includes('gt-canvas')) { skipped++; continue; }

  // 1. Swap Breadcrumb import for Hero
  src = src.replace(
    /import Breadcrumb from '\.\.\/\.\.\/components\/Breadcrumb\.astro';/,
    `import Hero from '../../components/godtier/Hero.astro';`
  );

  // 2. Extract page title from breadcrumb
  const titleMatch = src.match(/\{ label: 'Answers', href: '\/answers\/' \},\s*\{ label: '([^']+)' \}/);
  const pageTitle = titleMatch ? titleMatch[1] : '';

  // 3. Extract h1 text (may differ slightly from breadcrumb label)
  const h1Match = src.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const h1Title = h1Match ? h1Match[1].trim() : pageTitle;

  // 4. Extract verified date
  const verifiedMatch = src.match(/Verified (\w+ \d+, \d+)/);
  const verifiedDate = verifiedMatch ? verifiedMatch[1] : '';

  // 5. Replace Breadcrumb line + the next <article ... > opening + h1 + byline div with the godtier wrapper
  // Pattern: <Breadcrumb items={...} /> ... <article class="..."> ... <h1>...</h1> ... <div class="flex items-center..."> ... </div>
  const re = /<Breadcrumb items=\{[\s\S]*?\}\]\} \/>([\s\S]*?)<article class="max-w-[\s\S]*?<h1[^>]*>[\s\S]*?<\/h1>([\s\S]*?<\/div>)/;
  const match = src.match(re);
  if (!match) {
    console.warn(`⚠ ${file}: pattern not matched`);
    skipped++;
    continue;
  }

  // The byline div may be the verified date row — strip it.
  const replacement = `<div class="gt-canvas">
    <Hero
      title=${JSON.stringify(h1Title)}
      breadcrumbs={[
        { label: 'aipedia', href: '/' },
        { label: 'Answers', href: '/answers/' },
        { label: ${JSON.stringify(pageTitle)} },
      ]}${verifiedDate ? `
      verifiedLabel=${JSON.stringify(`Verified ${verifiedDate}`)}` : ''}
    />

    <article class="gt-body" id="gt-body">`;

  src = src.replace(re, replacement);

  // 6. Close the gt-canvas wrapper before </BaseLayout>
  src = src.replace(/<\/article>\s*<\/BaseLayout>/, '</article>\n  </div>\n</BaseLayout>');

  writeFileSync(path, src, 'utf8');
  migrated++;
  console.log(`✓ ${file}`);
}

console.log(`\nMigrated: ${migrated}, skipped: ${skipped}`);
