import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { join } from 'node:path';
import { test } from 'node:test';

let importCounter = 0;

async function loadPlaywrightConfig(env = {}) {
  const keys = [
    'AIPEDIA_PLAYWRIGHT_HOST',
    'AIPEDIA_PLAYWRIGHT_PORT',
    'AIPEDIA_PLAYWRIGHT_SITE_DIR',
    'AIPEDIA_PLAYWRIGHT_STATIC_DIR',
    'AIPEDIA_PLAYWRIGHT_REUSE_SERVER',
    'CI',
  ];
  const previous = new Map(keys.map((key) => [key, process.env[key]]));

  for (const key of keys) delete process.env[key];
  for (const [key, value] of Object.entries(env)) {
    if (value !== undefined) process.env[key] = value;
  }

  try {
    const url = pathToFileURL(join(process.cwd(), 'playwright.config.mjs'));
    url.search = `?test=${importCounter++}`;
    return await import(url.href);
  } finally {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test('playwright config serves the default built output with host and port', async () => {
  const configModule = await loadPlaywrightConfig();

  assert.equal(
    configModule.serveStaticCommand,
    'node scripts/serve-static.mjs --host 127.0.0.1 --port 4321',
  );
  assert.equal(configModule.default.webServer.command, configModule.serveStaticCommand);
  assert.equal(configModule.default.webServer.url, 'http://127.0.0.1:4321');
});

test('playwright config can point smoke tests at an explicit static output directory', async () => {
  const configModule = await loadPlaywrightConfig({
    AIPEDIA_PLAYWRIGHT_HOST: '0.0.0.0',
    AIPEDIA_PLAYWRIGHT_PORT: '4599',
    AIPEDIA_PLAYWRIGHT_SITE_DIR: '.vercel/output/static',
    CI: 'true',
  });

  assert.equal(
    configModule.serveStaticCommand,
    'node scripts/serve-static.mjs --host 0.0.0.0 --port 4599 --site-dir .vercel/output/static',
  );
  assert.equal(configModule.default.webServer.url, 'http://0.0.0.0:4599');
  assert.equal(configModule.default.webServer.reuseExistingServer, false);
});

test('playwright config can force a fresh server for generated output checks', async () => {
  const configModule = await loadPlaywrightConfig({
    AIPEDIA_PLAYWRIGHT_SITE_DIR: 'dist-fast/client',
    AIPEDIA_PLAYWRIGHT_REUSE_SERVER: '0',
  });

  assert.equal(
    configModule.serveStaticCommand,
    'node scripts/serve-static.mjs --host 127.0.0.1 --port 4321 --site-dir dist-fast/client',
  );
  assert.equal(configModule.default.webServer.reuseExistingServer, false);
});

test('playwright config can force server reuse in CI when explicitly requested', async () => {
  const configModule = await loadPlaywrightConfig({
    AIPEDIA_PLAYWRIGHT_REUSE_SERVER: '1',
    CI: 'true',
  });

  assert.equal(configModule.default.webServer.reuseExistingServer, true);
});

test('playwright config keeps a backwards-compatible static-dir alias and quotes spaces', async () => {
  const configModule = await loadPlaywrightConfig({
    AIPEDIA_PLAYWRIGHT_STATIC_DIR: 'tmp/site output',
  });

  assert.equal(
    configModule.serveStaticCommand,
    'node scripts/serve-static.mjs --host 127.0.0.1 --port 4321 --site-dir "tmp/site output"',
  );
});
