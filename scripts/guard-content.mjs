#!/usr/bin/env node
// Content-integrity guard. Runs as `predev` and `prebuild` — BEFORE any
// script that could damage src/content/ gets a chance to execute.
//
// If any content subdir drops below its known-good floor, the guard
// aborts the command with a loud error and a one-line recovery step.
// This makes the class of "dev server silently nuked my content" bugs
// structurally impossible.
//
// Floors are intentionally conservative — set well below current counts
// so legitimate pruning (e.g. archiving 5 dead tools) does not trip them,
// but any nuke-level regression does.
//
// To update floors after a legitimate content change:
//   npm run guard:baseline
// (updates this file with current counts minus a safety margin).
//
// Bypass (USE SPARINGLY): CONTENT_GUARD_SKIP=1 npm run dev

import { readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');

// Known-good floors. Do not hand-edit unless you've intentionally pruned
// content. Re-run `npm run guard:baseline` if you added content.
const FLOORS = {
  tools:       100,
  comparisons: 200,
  'use-cases':  50,
  categories:   10,
  trends:        3,
  companies:     3,
  dead:          3,
  glossary:      1,
  news:          3,
  benchmarks:    2,
  workflows:     3,
  reports:       1,
};

if (process.env.CONTENT_GUARD_SKIP === '1') {
  console.log('[guard-content] SKIPPED via CONTENT_GUARD_SKIP=1');
  process.exit(0);
}

const results = [];
let failed = false;

for (const [subdir, floor] of Object.entries(FLOORS)) {
  const dir = join(CONTENT_DIR, subdir);
  if (!existsSync(dir)) {
    results.push({ subdir, count: 0, floor, ok: false, reason: 'MISSING DIR' });
    failed = true;
    continue;
  }
  const count = readdirSync(dir).filter(f => f.endsWith('.md')).length;
  const ok = count >= floor;
  if (!ok) failed = true;
  results.push({ subdir, count, floor, ok });
}

const total = results.reduce((s, r) => s + r.count, 0);

if (failed) {
  console.error('\n\x1b[41;97m CONTENT GUARD FAILED \x1b[0m\n');
  console.error('One or more content directories cratered below the known-good floor.');
  console.error('Something (a script, a sync service, a rogue git restore) has destroyed content.\n');
  console.error('  ' + 'subdir'.padEnd(14) + 'count → floor');
  console.error('  ' + '──────'.padEnd(14) + '─────────────');
  for (const r of results) {
    const marker = r.ok ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
    const reason = r.reason ? ` (${r.reason})` : '';
    console.error(`  ${marker} ${r.subdir.padEnd(12)} ${String(r.count).padStart(4)} → ${r.floor}${reason}`);
  }
  console.error('\n\x1b[33mRECOVERY:\x1b[0m  cd aipedia-wiki && git restore src/content/');
  console.error('\x1b[33m          \x1b[0m  (All content is tracked — a clean restore gets you back to HEAD.)\n');
  console.error('\x1b[2mIf the floor itself is wrong (you legitimately pruned content),');
  console.error('run  npm run guard:baseline  to re-anchor the floors.\x1b[0m\n');
  process.exit(2);
}

console.log(`[guard-content] ✓ ${total} markdown files across ${results.length} subdirs, all above floor.`);
