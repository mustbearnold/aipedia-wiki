#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));

const budgets = [
  { path: join(PROJECT_DIR, 'dist', 'client', 'pagefind'), rawMaxMb: 10 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'index.html'), rawMaxMb: 0.3, gzipMaxMb: 0.08 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'tools', 'index.html'), rawMaxMb: 1.1, gzipMaxMb: 0.18 },
];

function bytes(path) {
  if (!existsSync(path)) return 0;

  const stat = statSync(path);
  if (!stat.isDirectory()) return stat.size;

  let total = 0;
  for (const name of readdirSync(path)) total += bytes(join(path, name));
  return total;
}

let failed = false;

for (const budget of budgets) {
  const sizeBytes = bytes(budget.path);
  const sizeMb = sizeBytes / 1024 / 1024;
  const label = relative(PROJECT_DIR, budget.path).replace(/\\/g, '/');
  console.log(`${label}: ${sizeMb.toFixed(2)}MB / ${budget.rawMaxMb}MB raw`);

  if (sizeMb > budget.rawMaxMb) {
    failed = true;
    console.error(`  x ${label} exceeds raw budget`);
  }

  if (budget.gzipMaxMb && existsSync(budget.path) && !statSync(budget.path).isDirectory()) {
    const compressedMb = gzipSync(readFileSync(budget.path), { level: 9 }).length / 1024 / 1024;
    console.log(`${label}: ${compressedMb.toFixed(2)}MB / ${budget.gzipMaxMb}MB gzip`);
    if (compressedMb > budget.gzipMaxMb) {
      failed = true;
      console.error(`  x ${label} exceeds gzip budget`);
    }
  }
}

if (failed) process.exit(2);

console.log('[check-dist-budget] budgets pass');
