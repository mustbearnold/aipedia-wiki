const host = process.env.AIPEDIA_PLAYWRIGHT_HOST ?? '127.0.0.1';
const port = process.env.AIPEDIA_PLAYWRIGHT_PORT ?? '4321';
const baseURL = `http://${host}:${port}`;

export default {
  webServer: {
    command: `node scripts/serve-static.mjs --dir dist/client --host ${host} --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  use: {
    baseURL,
    viewport: { width: 1280, height: 900 },
  },
};
