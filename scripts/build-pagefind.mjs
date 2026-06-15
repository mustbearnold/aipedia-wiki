#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, mkdtempSync, readdirSync, renameSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { builtSiteDir } from './lib/built-site-dir.mjs';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const SITE_DIR = builtSiteDir(PROJECT_DIR);
const DIST_PAGEFIND = join(SITE_DIR, 'pagefind');
const LEGACY_PAGEFIND_DIRS = [
  join(PROJECT_DIR, 'dist', 'client', 'pagefind'),
  join(PROJECT_DIR, 'dist', 'pagefind'),
].filter((path) => path !== DIST_PAGEFIND);
const PUBLIC_PAGEFIND = join(PROJECT_DIR, 'public', 'pagefind');
const PAGEFIND_EXCLUDED_FILES = [
  'naver271c257f9d62ad7f37c174da981fd27e.html',
  join('tool-finder', 'index.html'),
];
const PAGEFIND_EXCLUDE_SELECTORS = [
  '[data-search-index]',
  '.gt-tools-search',
  '.gt-cat-chips',
  '.gt-tools-index',
  'section.gt-tools',
  '#gt-news-list',
  '.gt-news-filters',
  '.gt-compare-actions',
  '.gt-compare-index',
  '.gt-cat-refresh',
  '.gt-cat-index',
  '#stack-output',
  '#stack-placeholder',
  '.sb-role-grid',
  '.sb-budget-grid',
].join(', ');
const UNUSED_PAGEFIND_ASSETS = [
  'pagefind-component-ui.css',
  'pagefind-component-ui.js',
  'pagefind-highlight.js',
  'pagefind-modular-ui.css',
  'pagefind-modular-ui.js',
  'pagefind-ui.css',
  'pagefind-ui.js',
];

function removeDir(path) {
  if (existsSync(path)) rmSync(path, { recursive: true, force: true });
}

function dirBytes(path) {
  if (!existsSync(path)) return 0;
  const stat = statSync(path);
  if (!stat.isDirectory()) return stat.size;
  let total = 0;
  for (const name of readdirSync(path)) {
    total += dirBytes(join(path, name));
  }
  return total;
}

function temporarilyRemoveFiles(rootDir, relativeFiles) {
  const tempDir = mkdtempSync(join(tmpdir(), 'aipedia-pagefind-'));
  const moved = [];

  try {
    for (const relativeFile of relativeFiles) {
      const source = join(rootDir, relativeFile);
      if (!existsSync(source)) continue;

      const backup = join(tempDir, relativeFile);
      mkdirSync(dirname(backup), { recursive: true });
      renameSync(source, backup);
      moved.push({ source, backup });
    }

    return () => {
      while (moved.length > 0) {
        const { source, backup } = moved.pop();
        mkdirSync(dirname(source), { recursive: true });
        renameSync(backup, source);
      }
      removeDir(tempDir);
    };
  } catch (error) {
    for (const { source, backup } of moved.reverse()) {
      if (!existsSync(source) && existsSync(backup)) {
        mkdirSync(dirname(source), { recursive: true });
        renameSync(backup, source);
      }
    }
    removeDir(tempDir);
    throw error;
  }
}

if (!existsSync(SITE_DIR)) {
  console.error(`[build-pagefind] ${SITE_DIR} does not exist. Run astro build first.`);
  process.exit(2);
}

removeDir(DIST_PAGEFIND);
for (const legacyDir of LEGACY_PAGEFIND_DIRS) removeDir(legacyDir);
removeDir(PUBLIC_PAGEFIND);

const pagefindRunner = join(PROJECT_DIR, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');
let restoreExcludedFiles = () => {};
let result;
try {
  restoreExcludedFiles = temporarilyRemoveFiles(SITE_DIR, PAGEFIND_EXCLUDED_FILES);
  result = spawnSync(
    process.execPath,
    [
      pagefindRunner,
      '--site',
      SITE_DIR,
      '--output-path',
      DIST_PAGEFIND,
      '--exclude-selectors',
      PAGEFIND_EXCLUDE_SELECTORS,
    ],
    {
      cwd: PROJECT_DIR,
      stdio: 'inherit',
    },
  );
} finally {
  restoreExcludedFiles();
}

if (result?.status !== 0) process.exit(result?.status ?? 1);

for (const asset of UNUSED_PAGEFIND_ASSETS) removeDir(join(DIST_PAGEFIND, asset));

mkdirSync(PUBLIC_PAGEFIND, { recursive: true });
cpSync(DIST_PAGEFIND, PUBLIC_PAGEFIND, { recursive: true });

const pagefindMb = Math.round((dirBytes(DIST_PAGEFIND) / 1024 / 1024) * 10) / 10;
console.log(`[build-pagefind] wrote ${DIST_PAGEFIND} and public/pagefind (${pagefindMb}MB)`);
