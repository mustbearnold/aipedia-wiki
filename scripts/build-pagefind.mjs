#!/usr/bin/env node

import { cpSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const DIST_CLIENT = join(PROJECT_DIR, 'dist', 'client');
const DIST_PAGEFIND = join(DIST_CLIENT, 'pagefind');
const LEGACY_DIST_PAGEFIND = join(PROJECT_DIR, 'dist', 'pagefind');
const PUBLIC_PAGEFIND = join(PROJECT_DIR, 'public', 'pagefind');

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

if (!existsSync(DIST_CLIENT)) {
  console.error('[build-pagefind] dist/client does not exist. Run astro build first.');
  process.exit(2);
}

removeDir(DIST_PAGEFIND);
removeDir(LEGACY_DIST_PAGEFIND);
removeDir(PUBLIC_PAGEFIND);

const pagefindRunner = join(PROJECT_DIR, 'node_modules', 'pagefind', 'lib', 'runner', 'bin.cjs');
const result = spawnSync(process.execPath, [pagefindRunner, '--site', DIST_CLIENT, '--output-path', DIST_PAGEFIND], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if (result.status !== 0) process.exit(result.status ?? 1);

mkdirSync(PUBLIC_PAGEFIND, { recursive: true });
cpSync(DIST_PAGEFIND, PUBLIC_PAGEFIND, { recursive: true });

const pagefindMb = Math.round((dirBytes(DIST_PAGEFIND) / 1024 / 1024) * 10) / 10;
console.log(`[build-pagefind] wrote dist/client/pagefind and public/pagefind (${pagefindMb}MB)`);
