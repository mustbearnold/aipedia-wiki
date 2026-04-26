#!/usr/bin/env node

import { existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));

const budgets = [
  { path: join(PROJECT_DIR, 'dist', 'client', 'pagefind'), maxMb: 10 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'index.html'), maxMb: 0.3 },
  { path: join(PROJECT_DIR, 'dist', 'client', 'tools', 'index.html'), maxMb: 0.7 },
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
  const sizeMb = bytes(budget.path) / 1024 / 1024;
  const label = relative(PROJECT_DIR, budget.path).replace(/\\/g, '/');
  console.log(`${label}: ${sizeMb.toFixed(2)}MB / ${budget.maxMb}MB`);

  if (sizeMb > budget.maxMb) {
    failed = true;
    console.error(`  x ${label} exceeds budget`);
  }
}

if (failed) process.exit(2);

console.log('[check-dist-budget] budgets pass');
