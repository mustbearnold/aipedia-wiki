import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runPlaywrightInstall(extraEnv = {}) {
  return spawnSync(process.execPath, ['scripts/playwright-install.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      ...extraEnv,
    },
  });
}

test('playwright install respects explicit browser download skip env', () => {
  const result = runPlaywrightInstall({ PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '1' });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1, skipping browser download/);
});

test('playwright install skips browser downloads during Vercel deployment installs', () => {
  const result = runPlaywrightInstall({
    PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: '',
    VERCEL: '1',
    VERCEL_ENV: 'preview',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /Vercel deployment build, skipping browser download/);
});
