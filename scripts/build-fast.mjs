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

function formatDuration(durationMs) {
  if (durationMs < 1000) return `${durationMs}ms`;
  const seconds = durationMs / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

function runStage(label, command, commandArgs, options) {
  const startedAt = Date.now();
  const result = spawnSync(command, commandArgs, options);
  const duration = formatDuration(Date.now() - startedAt);
  const status = result.status ?? 1;
  console.log(`[build-fast] ${label} ${status === 0 ? 'completed' : 'failed'} in ${duration}.`);
  return result;
}

function exitCode(result) {
  return result.status ?? 1;
}

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

const totalStartedAt = Date.now();

const result = runStage('Astro build', process.execPath, [astroBin, 'build'], {
  cwd: PROJECT_DIR,
  env: {
    ...process.env,
    AIPEDIA_FAST_BUILD: '1',
  },
  stdio: 'inherit',
});

if (exitCode(result) !== 0) process.exit(exitCode(result));

const fastStaticDir = existsSync(join(PROJECT_DIR, 'dist-fast', 'client')) ? 'dist-fast/client' : 'dist-fast';

const auditResult = runStage('Indexability audit', process.execPath, ['scripts/audit-indexability.mjs', '--dist', fastStaticDir], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if (exitCode(auditResult) !== 0) process.exit(exitCode(auditResult));

const commercialCtaAuditResult = runStage('Commercial CTA audit', process.execPath, ['scripts/audit-commercial-cta.mjs', '--dist', fastStaticDir], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if (exitCode(commercialCtaAuditResult) !== 0) process.exit(exitCode(commercialCtaAuditResult));

const distBudgetResult = runStage('Fast dist budget check', process.execPath, ['scripts/check-dist-budget.mjs', '--site-dir', fastStaticDir, '--mode', 'fast'], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if (exitCode(distBudgetResult) !== 0) process.exit(exitCode(distBudgetResult));

console.log(`[build-fast] Total completed in ${formatDuration(Date.now() - totalStartedAt)}.`);
