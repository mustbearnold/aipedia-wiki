#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));

function findNodeModuleBin(startDir, packagePath) {
  let currentDir = startDir;
  while (true) {
    const candidate = join(currentDir, 'node_modules', ...packagePath);
    if (existsSync(candidate)) return candidate;

    const parentDir = dirname(currentDir);
    if (parentDir === currentDir) return '';
    currentDir = parentDir;
  }
}

const astroBin = findNodeModuleBin(PROJECT_DIR, ['astro', 'bin', 'astro.mjs']);

if (!astroBin) {
  console.error([
    '[build-fast] Missing Astro dependency at node_modules/astro/bin/astro.mjs.',
    `Looked from ${PROJECT_DIR} upward for a usable node_modules directory.`,
    'Install dependencies before running the fast build:',
    '  npm install',
    'If you are in a nested Git worktree, install dependencies in this worktree or a parent checkout.',
  ].join('\n'));
  process.exit(1);
}

console.log('[build-fast] Building to dist-fast; skipping GitHub stats refresh, OG generation, Pagefind, and live Worker runtime bundling.');

const result = spawnSync(process.execPath, [astroBin, 'build'], {
  cwd: PROJECT_DIR,
  env: {
    ...process.env,
    AIPEDIA_FAST_BUILD: '1',
  },
  stdio: 'inherit',
});

if ((result.status ?? 1) !== 0) process.exit(result.status ?? 1);

const fastStaticDir = existsSync(join(PROJECT_DIR, 'dist-fast', 'client')) ? 'dist-fast/client' : 'dist-fast';

const auditResult = spawnSync(process.execPath, ['scripts/audit-indexability.mjs', '--dist', fastStaticDir], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if ((auditResult.status ?? 1) !== 0) process.exit(auditResult.status ?? 1);

const commercialCtaAuditResult = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--dist', fastStaticDir], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if ((commercialCtaAuditResult.status ?? 1) !== 0) process.exit(commercialCtaAuditResult.status ?? 1);

const distBudgetResult = spawnSync(process.execPath, ['scripts/check-dist-budget.mjs', '--site-dir', fastStaticDir, '--mode', 'fast'], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

process.exit(distBudgetResult.status ?? 1);
