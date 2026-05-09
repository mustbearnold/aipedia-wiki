#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const toolsDir = join(ROOT, 'src', 'content', 'tools');
const manifestPath = join(ROOT, 'src', 'data', 'logo-manifest.json');

function frontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match ? match[1] : '';
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*['"]?([^'"\\r\\n]+)['"]?`, 'm'));
  return match ? match[1].trim() : '';
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const files = (await readdir(toolsDir)).filter((file) => file.endsWith('.md'));
const missing = [];

for (const file of files) {
  const text = await readFile(join(toolsDir, file), 'utf8');
  const slug = scalar(frontmatter(text), 'slug') || file.replace(/\.md$/, '');
  if (!manifest[slug]) missing.push(slug);
}

if (missing.length > 0) {
  console.error('[audit-tool-logos] Missing tool logos:');
  for (const slug of missing.sort()) {
    console.error(`- ${slug} needs public/logos/tools/${slug}.(png|svg|webp|jpg|ico) and regenerated src/data/logo-manifest.json`);
  }
  process.exit(1);
}

console.log(`[audit-tool-logos] OK: ${files.length} tool record(s) have logo manifest entries.`);
