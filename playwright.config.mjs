const host = process.env.AIPEDIA_PLAYWRIGHT_HOST ?? '127.0.0.1';
const port = process.env.AIPEDIA_PLAYWRIGHT_PORT ?? '4321';
const siteDir = process.env.AIPEDIA_PLAYWRIGHT_SITE_DIR ?? process.env.AIPEDIA_PLAYWRIGHT_STATIC_DIR ?? '';
const baseURL = `http://${host}:${port}`;

function reuseExistingServer() {
  const value = process.env.AIPEDIA_PLAYWRIGHT_REUSE_SERVER;
  if (value === '1' || value === 'true') return true;
  if (value === '0' || value === 'false') return false;
  return !process.env.CI;
}

function commandArg(value) {
  const text = String(value);
  if (/^[A-Za-z0-9_./:=@+-]+$/.test(text)) return text;
  return `"${text.replaceAll('"', '\\"')}"`;
}

const serveArgs = [
  'node',
  'scripts/serve-static.mjs',
  '--host',
  host,
  '--port',
  port,
];

if (siteDir) {
  serveArgs.push('--site-dir', siteDir);
}

export const serveStaticCommand = serveArgs.map(commandArg).join(' ');

export default {
  webServer: {
    command: serveStaticCommand,
    url: baseURL,
    reuseExistingServer: reuseExistingServer(),
    timeout: 30000,
  },
  use: {
    baseURL,
    viewport: { width: 1280, height: 900 },
  },
};
