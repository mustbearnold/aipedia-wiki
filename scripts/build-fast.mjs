#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const astroBin = join(PROJECT_DIR, 'node_modules', 'astro', 'bin', 'astro.mjs');

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

const auditResult = spawnSync(process.execPath, ['scripts/audit-indexability.mjs', '--dist', 'dist-fast'], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

if ((auditResult.status ?? 1) !== 0) process.exit(auditResult.status ?? 1);

const commercialCtaAuditResult = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--dist', 'dist-fast'], {
  cwd: PROJECT_DIR,
  stdio: 'inherit',
});

process.exit(commercialCtaAuditResult.status ?? 1);
