#!/usr/bin/env node
// Scan public/logos/tools/ and write a slug -> URL map to
// src/data/logo-manifest.json so components can resolve logos without
// touching node:fs at render time. Cloudflare's prerender runs in
// miniflare and doesn't have node:fs, so any fs.existsSync call inside
// Astro component frontmatter breaks the build.
//
// Run as part of copy-content.sh on every build.

import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const LOGO_DIR = join(ROOT, 'public/logos/tools');
const OUT_DIR = join(ROOT, 'src/data');
const OUT_PATH = join(OUT_DIR, 'logo-manifest.json');

const EXT_PRIORITY = ['.png', '.svg', '.jpg', '.webp', '.gif', '.ico'];

if (!existsSync(LOGO_DIR)) {
  console.error('Logo dir not found, writing empty manifest');
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, '{}\n');
  process.exit(0);
}

const files = readdirSync(LOGO_DIR);
const bySlug = {};
for (const f of files) {
  const ext = f.slice(f.lastIndexOf('.'));
  const slug = f.slice(0, f.lastIndexOf('.'));
  if (!EXT_PRIORITY.includes(ext)) continue;
  // Prefer higher-priority extensions when multiple exist for same slug
  const existing = bySlug[slug];
  if (existing) {
    const existingRank = EXT_PRIORITY.indexOf(existing.slice(existing.lastIndexOf('.')));
    const newRank = EXT_PRIORITY.indexOf(ext);
    if (newRank >= existingRank) continue;
  }
  bySlug[slug] = `/logos/tools/${f}`;
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(bySlug, null, 2) + '\n');

const count = Object.keys(bySlug).length;
console.log(`Logo manifest: ${count} entries written to src/data/logo-manifest.json`);
