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

import { readdirSync, statSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const PROJECT_DIR = dirname(dirname(SCRIPT_PATH));
const CONTENT_DIR = join(PROJECT_DIR, 'src', 'content');
const args = new Set(process.argv.slice(2));
const jsonMode = args.has('--json');
const baselineMode = args.has('--baseline');
const dryRun = args.has('--dry-run');

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
  workflows:     3,
  reports:       1,
};

function countMarkdownFiles(subdir) {
  const dir = join(CONTENT_DIR, subdir);
  if (!existsSync(dir)) return { count: 0, reason: 'MISSING DIR' };
  return { count: readdirSync(dir).filter(f => f.endsWith('.md')).length };
}

function formatFloorsObject(floors) {
  const widest = Math.max(...Object.keys(floors).map((key) => key.length));
  const lines = Object.entries(floors).map(([key, value]) => `  ${key.includes('-') ? `'${key}'` : key}:${' '.repeat(widest - key.length + 1)}${String(value).padStart(4)},`);
  return `const FLOORS = {\n${lines.join('\n')}\n};`;
}

if (baselineMode) {
  const counts = {};
  const floors = {};
  const safetyMargin = 5;
  for (const subdir of Object.keys(FLOORS)) {
    const { count } = countMarkdownFiles(subdir);
    counts[subdir] = count;
    floors[subdir] = Math.max(1, count - safetyMargin);
  }

  if (!dryRun) {
    const current = readFileSync(SCRIPT_PATH, 'utf8');
    const updated = current.replace(/const FLOORS = \{[\s\S]*?\n\};/, formatFloorsObject(floors));
    writeFileSync(SCRIPT_PATH, updated);
  }

  const report = { mode: 'baseline', dry_run: dryRun, safety_margin: safetyMargin, counts, floors };
  if (jsonMode) {
    console.log(JSON.stringify(report, null, 2));
  } else if (dryRun) {
    console.log(`[guard-content] baseline dry run computed floors with ${safetyMargin}-file safety margin.`);
  } else {
    console.log(`[guard-content] updated baseline floors with ${safetyMargin}-file safety margin.`);
  }
  process.exit(0);
}

if (process.env.CONTENT_GUARD_SKIP === '1') {
  console.log('[guard-content] SKIPPED via CONTENT_GUARD_SKIP=1');
  process.exit(0);
}

const results = [];
let failed = false;

for (const [subdir, floor] of Object.entries(FLOORS)) {
  const { count, reason } = countMarkdownFiles(subdir);
  if (reason) {
    results.push({ subdir, count, floor, ok: false, reason });
    failed = true;
    continue;
  }
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
