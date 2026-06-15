#!/usr/bin/env node
/**
 * Install Playwright Chromium for smoke tests (npm run smoke:visual).
 *
 * - Runs automatically after npm install via postinstall (unless skipped).
 * - On Linux, if the host OS is newer than Playwright's supported list (e.g. Ubuntu 26),
 *   the first `playwright install` fails; we retry with PLAYWRIGHT_HOST_PLATFORM_OVERRIDE
 *   so the Ubuntu 24 browser bundle is used (same approach as manual installs on bleeding-edge distros).
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'node_modules', 'playwright', 'cli.js');

/** Ubuntu 25+ (and other hosts) may be absent from Playwright's matrix; use 24.04 browser builds. */
function preferredLinuxInstallEnv() {
  if (process.platform !== 'linux') {
    return {};
  }
  try {
    const text = readFileSync('/etc/os-release', 'utf8');
    if (!/^ID=ubuntu$/m.test(text)) {
      return {};
    }
    const match = text.match(/^VERSION_ID=(.+)$/m);
    if (!match) {
      return {};
    }
    const raw = String(match[1]).replaceAll('"', '').trim();
    const version = Number.parseFloat(raw);
    if (Number.isFinite(version) && version >= 25) {
      return { PLAYWRIGHT_HOST_PLATFORM_OVERRIDE: 'ubuntu24.04-x64' };
    }
  } catch {
    /* unreadable or missing */
  }
  return {};
}

function browserDownloadSkipReason() {
  if (process.env.PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD === '1') return 'PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1';
  if (process.env.VERCEL === '1' || process.env.VERCEL_ENV) return 'Vercel deployment build';
  return '';
}

const skipReason = browserDownloadSkipReason();
if (skipReason) {
  console.log(`[playwright-install] ${skipReason}, skipping browser download.`);
  process.exit(0);
}

if (!existsSync(cli)) {
  console.warn('[playwright-install] Skipping: playwright CLI not found (devDependencies omitted?).');
  process.exit(0);
}

function run(extraEnv = {}) {
  return spawnSync(process.execPath, [cli, 'install', 'chromium'], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  });
}

const preferred = preferredLinuxInstallEnv();
let res = run(preferred);
if (res.status === 0) {
  process.exit(0);
}

if (process.platform === 'linux' && Object.keys(preferred).length === 0) {
  console.warn(
    '[playwright-install] Retrying with PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64 (unsupported host OS).'
  );
  res = run({ PLAYWRIGHT_HOST_PLATFORM_OVERRIDE: 'ubuntu24.04-x64' });
}

process.exit(res.status === 0 ? 0 : 1);
