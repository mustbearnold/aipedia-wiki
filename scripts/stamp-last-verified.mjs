#!/usr/bin/env node
// Pre-commit stamp: for every staged `src/content/*.md` file whose body
// was modified in this commit, bump `last_verified` (and `last_updated`)
// in the frontmatter to today's date.
//
// Skips files that are only frontmatter changes (e.g. someone manually
// re-verified without body changes — they can set the date themselves).
//
// Bypass: STAMP_SKIP=1 git commit ...

import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

if (process.env.STAMP_SKIP === '1') {
  console.log('[stamp-last-verified] SKIPPED via STAMP_SKIP=1');
  process.exit(0);
}

const today = new Date().toISOString().slice(0, 10);

function staged() {
  try {
    const out = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' });
    return out.split('\n').filter(Boolean);
  } catch { return []; }
}

function bodyChanged(path) {
  // A "body change" = the staged diff touches any line outside the leading
  // `---\n...\n---` frontmatter block. We detect by looking at the staged
  // hunk line numbers.
  try {
    const diff = execSync(`git diff --cached -U0 -- "${path}"`, { encoding: 'utf8' });
    // Read current file to know where frontmatter ends.
    const full = readFileSync(path, 'utf8');
    const fmMatch = full.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return true; // no frontmatter → any change is body change
    const fmEndLine = full.slice(0, fmMatch[0].length).split('\n').length;
    // Scan hunks for any line number > fmEndLine
    for (const line of diff.split('\n')) {
      const m = line.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@/);
      if (!m) continue;
      const start = Number(m[1]);
      const count = m[2] ? Number(m[2]) : 1;
      if (start + count - 1 > fmEndLine) return true;
    }
    return false;
  } catch { return false; }
}

function stampFrontmatter(path) {
  const content = readFileSync(path, 'utf8');
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return false;
  let fm = m[1];
  let changed = false;
  const upsert = (key) => {
    const re = new RegExp(`^${key}:.*$`, 'm');
    const line = `${key}: ${today}`;
    if (re.test(fm)) {
      if (!new RegExp(`^${key}:\\s*${today}\\s*$`, 'm').test(fm)) {
        fm = fm.replace(re, line);
        changed = true;
      }
    } else {
      fm = fm.replace(/\s*$/, '') + '\n' + line;
      changed = true;
    }
  };
  upsert('last_verified');
  upsert('last_updated');
  if (!changed) return false;
  const newContent = content.replace(m[0], `---\n${fm}\n---\n`);
  writeFileSync(path, newContent, 'utf8');
  return true;
}

const TARGET_PREFIX = 'aipedia-wiki/src/content/';
const PROJECT_ROOT = resolve(import.meta.dirname, '..');

// The hook is installed inside aipedia-wiki/.git, so git paths are relative
// to the repo root which IS aipedia-wiki/. But if this runs from a parent
// repo somehow, handle both.
const files = staged().filter(f => f.startsWith('src/content/') || f.startsWith(TARGET_PREFIX));
if (files.length === 0) process.exit(0);

let stamped = 0;
for (const f of files) {
  const abs = f.startsWith('src/content/') ? resolve(PROJECT_ROOT, f) : resolve(PROJECT_ROOT, '..', f);
  if (!existsSync(abs) || !abs.endsWith('.md')) continue;
  if (!bodyChanged(f)) continue;
  if (stampFrontmatter(abs)) {
    execSync(`git add "${f}"`);
    stamped++;
  }
}

if (stamped > 0) {
  console.log(`[stamp-last-verified] ✓ bumped last_verified + last_updated on ${stamped} file(s) to ${today}`);
}
