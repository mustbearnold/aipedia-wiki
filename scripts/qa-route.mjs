#!/usr/bin/env node

import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { createServer, get } from 'node:http';
import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { builtSiteDir, resolvePathFromProject } from './lib/built-site-dir.mjs';

const rawArgs = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const DEFAULT_WIDTHS = [360, 390, 430, 768, 1024, 1366];
const KNOWN_FLAGS = new Set([
  '--route',
  '--routes',
  '--width',
  '--widths',
  '--site-dir',
  '--dist-dir',
  '--host',
  '--port',
  '--project-dir',
  '--root',
  '--json',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set([
  '--route',
  '--routes',
  '--width',
  '--widths',
  '--site-dir',
  '--dist-dir',
  '--host',
  '--port',
  '--project-dir',
  '--root',
]);
const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');

function hasFlag(flag) {
  return rawArgs.includes(flag) || rawArgs.some((arg) => arg.startsWith(`${flag}=`));
}

function valueFor(flag) {
  const inlineArg = rawArgs.find((arg) => arg.startsWith(`${flag}=`));
  if (inlineArg) return inlineArg.slice(flag.length + 1);
  const index = rawArgs.indexOf(flag);
  return index >= 0 ? rawArgs[index + 1] : '';
}

function valuesFor(...flags) {
  const values = [];
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    for (const flag of flags) {
      if (arg === flag) {
        for (let valueIndex = index + 1; valueIndex < rawArgs.length && !rawArgs[valueIndex].startsWith('--'); valueIndex += 1) {
          values.push(rawArgs[valueIndex]);
        }
      } else if (arg.startsWith(`${flag}=`)) {
        values.push(arg.slice(flag.length + 1));
      }
    }
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/qa-route.mjs --route /compare/example/',
    '  node scripts/qa-route.mjs --route /compare/example/ --widths 360,390,430,768,1024,1366',
    '',
    'Options:',
    '  --route <path>        Route to verify. Repeatable or comma-separated via --routes.',
    '  --width <px>         Viewport width. Repeatable or comma-separated via --widths.',
    '  --site-dir <dir>     Static build directory. Defaults to the detected built output.',
    '  --host <host>        Static server host. Default: 127.0.0.1.',
    '  --port <port>        Static server port. Default: first open local port.',
    '  --project-dir <dir>  Resolve paths from another project root.',
    '  --json               Emit a structured report.',
  ].join('\n');
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of rawArgs.entries()) {
    if (!arg.startsWith('-')) {
      const previous = rawArgs[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : rawArgs[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  if (hasFlag('--site-dir') && hasFlag('--dist-dir')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --site-dir or --dist-dir' });
  }

  const routes = routeArgs();
  if (!routes.length) issues.push({ code: 'argument-invalid', detail: 'at least one --route is required' });
  for (const route of routes) {
    if (!route.startsWith('/')) issues.push({ code: 'argument-invalid', detail: `route must start with /, got ${route}` });
    if (/^https?:\/\//i.test(route)) issues.push({ code: 'argument-invalid', detail: `route must be local path, got ${route}` });
  }

  for (const width of widthArgs()) {
    if (!Number.isInteger(width) || width < 240 || width > 3840) {
      issues.push({ code: 'argument-invalid', detail: `width must be an integer from 240 to 3840, got ${width}` });
    }
  }

  const portValue = valueFor('--port');
  if (portValue) {
    const parsed = Number(portValue);
    if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
      issues.push({ code: 'argument-invalid', detail: `--port must be an integer from 1 to 65535, got ${portValue}` });
    }
  }

  return issues;
}

function routeArgs() {
  return valuesFor('--route', '--routes').map(normalizeRoute);
}

function normalizeRoute(route) {
  const trimmed = route.trim();
  if (!trimmed || trimmed.includes('?') || trimmed.endsWith('/') || /\.[a-z0-9]+$/i.test(trimmed)) return trimmed;
  return `${trimmed}/`;
}

function widthArgs() {
  const rawWidths = valuesFor('--width', '--widths');
  if (!rawWidths.length) return DEFAULT_WIDTHS;
  return [...new Set(rawWidths.map((width) => Number(width)))].sort((a, b) => a - b);
}

function viewportHeight(width) {
  if (width <= 360) return 780;
  if (width <= 390) return 844;
  if (width <= 430) return 932;
  if (width <= 768) return 1024;
  return 900;
}

export function isAllowedLocalMissing(url) {
  let pathname = '';
  try {
    pathname = new URL(url).pathname;
  } catch {
    return false;
  }
  return (
    pathname === '/_vercel/insights/script.js' ||
    pathname === '/_vercel/speed-insights/script.js' ||
    /^\/api\/reviews\/for\/[^/]+\/?$/.test(pathname)
  );
}

async function findOpenPort() {
  return new Promise((resolvePort, rejectPort) => {
    const server = createServer();
    server.on('error', rejectPort);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      server.close(() => resolvePort(port));
    });
  });
}

async function waitForServer(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    const ok = await new Promise((resolveCheck) => {
      const request = get(url, (response) => {
        response.resume();
        resolveCheck(true);
      });
      request.on('error', () => resolveCheck(false));
      request.setTimeout(1000, () => {
        request.destroy();
        resolveCheck(false);
      });
    });
    if (ok) return;
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 150));
  }
  throw new Error(`static server did not respond at ${url}`);
}

function startStaticServer({ host, port, siteDir }) {
  const child = spawn(process.execPath, [
    'scripts/serve-static.mjs',
    '--host',
    host,
    '--port',
    String(port),
    '--site-dir',
    siteDir,
  ], {
    cwd: PROJECT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let output = '';
  child.stdout.on('data', (chunk) => {
    output += chunk.toString();
  });
  child.stderr.on('data', (chunk) => {
    output += chunk.toString();
  });

  return {
    child,
    output: () => output.trim(),
    stop: () => new Promise((resolveStop) => {
      if (child.exitCode !== null || child.killed) {
        resolveStop();
        return;
      }
      child.once('exit', () => resolveStop());
      child.kill('SIGTERM');
      setTimeout(resolveStop, 1500).unref();
    }),
  };
}

function routeLabel(route, width) {
  return `${route} @ ${width}px`;
}

function comparisonRoute(route) {
  const pathname = route.split('?')[0];
  return /^\/compare\/[^/]+\/?$/.test(pathname) && pathname !== '/compare/';
}

async function evaluateRoute(page, route) {
  return page.evaluate((isComparison) => {
    const doc = document.documentElement;
    const maxRight = doc.clientWidth + 1;
    const overflowing = [];
    const isContainedByHorizontalScroller = (node) => {
      for (let parent = node.parentElement; parent && parent !== document.body && parent !== doc; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        const overflowX = style.overflowX;
        const clipsHorizontally = overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'clip';
        if (!clipsHorizontally) continue;

        const rect = parent.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (rect.left < -1 || rect.right > maxRight) continue;
        return true;
      }
      return false;
    };

    for (const el of document.querySelectorAll('body *')) {
      const style = getComputedStyle(el);
      if (style.position === 'fixed') continue;

      const rect = el.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0 || rect.right <= maxRight) continue;
      if (isContainedByHorizontalScroller(el)) continue;

      overflowing.push({
        tag: el.tagName,
        className: typeof el.className === 'string' ? el.className : '',
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });

      if (overflowing.length >= 5) break;
    }

    const main = document.querySelector('main');
    const h1 = document.querySelector('h1');
    const bodyText = document.body?.innerText ?? '';
    const headings = [...document.querySelectorAll('main h2, main h3')].map((node) => node.textContent?.trim() ?? '');
    const comparisonChecks = isComparison
      ? {
          hasDecisionLanguage: /\b(?:Quick Answer|Bottom Line|winner|choose|best for|avoid)\b/i.test(bodyText),
          hasSourcesHeading: headings.some((heading) => /^Sources\b/i.test(heading)),
          sourceLinkCount: document.querySelectorAll('main a[href^="http"], main a[href^="/tools/"]').length,
          toolLinkCount: document.querySelectorAll('main a[href^="/tools/"]').length,
        }
      : null;

    return {
      title: document.title.trim(),
      metaDescription: document.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href')?.trim() ?? '',
      robots: document.querySelector('meta[name="robots"]')?.getAttribute('content')?.trim() ?? '',
      mainVisible: Boolean(main && main.getBoundingClientRect().height > 0),
      h1: h1?.textContent?.trim() ?? '',
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      overflowing,
      comparisonChecks,
    };
  }, comparisonRoute(route));
}

function failuresForResult({ route, width, responseStatus, metrics, failedRequests }) {
  const failures = [];
  const label = routeLabel(route, width);
  if (!responseStatus || responseStatus < 200 || responseStatus >= 400) failures.push(`${label}: document status ${responseStatus ?? 'missing'}`);
  if (!metrics.title) failures.push(`${label}: missing document title`);
  if (!metrics.metaDescription) failures.push(`${label}: missing meta description`);
  if (!metrics.canonical) failures.push(`${label}: missing canonical URL`);
  if (/\bnoindex\b/i.test(metrics.robots)) failures.push(`${label}: route is noindex`);
  if (!metrics.mainVisible) failures.push(`${label}: main content is missing or not visible`);
  if (!metrics.h1) failures.push(`${label}: missing H1`);
  if (metrics.scrollWidth > metrics.clientWidth + 1) {
    failures.push(`${label}: document overflows horizontally (${metrics.scrollWidth}px > ${metrics.clientWidth}px)`);
  }
  for (const item of metrics.overflowing) {
    failures.push(`${label}: ${item.tag}${item.className ? ` .${item.className}` : ''} extends to ${item.right}px at width ${item.width}px`);
  }
  for (const request of failedRequests) {
    failures.push(`${label}: failed request ${request.method} ${request.url}`);
  }

  if (metrics.comparisonChecks) {
    const checks = metrics.comparisonChecks;
    if (!checks.hasDecisionLanguage) failures.push(`${label}: comparison page lacks visible decision language`);
    if (!checks.hasSourcesHeading) failures.push(`${label}: comparison page lacks a visible Sources heading`);
    if (checks.sourceLinkCount < 4) failures.push(`${label}: comparison page has only ${checks.sourceLinkCount} source or tool links`);
    if (checks.toolLinkCount < 2) failures.push(`${label}: comparison page links fewer than two tool pages`);
  }

  return failures;
}

async function runQa({ routes, widths, host, port, siteDir }) {
  const server = startStaticServer({ host, port, siteDir });
  const baseUrl = `http://${host}:${port}`;
  const results = [];

  try {
    await waitForServer(baseUrl);
    const browser = await chromium.launch();
    try {
      for (const route of routes) {
        for (const width of widths) {
          const page = await browser.newPage({
            viewport: { width, height: viewportHeight(width) },
            isMobile: width <= 430,
          });
          const failedRequests = [];
          page.on('requestfailed', (request) => {
            if (isAllowedLocalMissing(request.url())) return;
            failedRequests.push({ method: request.method(), url: request.url(), failure: request.failure()?.errorText ?? '' });
          });
          page.on('response', (response) => {
            if (response.status() < 400 || isAllowedLocalMissing(response.url())) return;
            const request = response.request();
            if (request.resourceType() === 'document') return;
            failedRequests.push({ method: request.method(), url: response.url(), status: response.status() });
          });

          const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
          await page.waitForLoadState('networkidle', { timeout: 5000 }).catch(() => {});
          const metrics = await evaluateRoute(page, route);
          await page.close();

          const result = {
            route,
            width,
            responseStatus: response?.status() ?? null,
            metrics,
            failedRequests,
          };
          result.failures = failuresForResult(result);
          results.push(result);
        }
      }
    } finally {
      await browser.close();
    }
  } finally {
    await server.stop();
  }

  return {
    ok: results.every((result) => result.failures.length === 0),
    project_dir: PROJECT_DIR,
    site_dir: siteDir,
    routes,
    widths,
    results,
    failures: results.flatMap((result) => result.failures),
    server_output: server.output(),
  };
}

function emitReport(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (!report.ok) {
    console.error(`[qa-route] ${report.failures.length} issue(s) found.`);
    for (const failure of report.failures.slice(0, 80)) console.error(`  x ${failure}`);
    return;
  }

  console.log(`[qa-route] ok: ${report.routes.join(', ')} at ${report.widths.join(', ')} px.`);
}

async function main() {
  if (HELP_MODE) {
    console.log(usage());
    return 0;
  }

  const argumentIssues = collectArgumentIssues();
  if (argumentIssues.length) {
    emitReport({ ok: false, mode: 'argument-error', argument_issues: argumentIssues, failures: argumentIssues.map((issue) => issue.detail) });
    return 2;
  }

  const host = valueFor('--host') || '127.0.0.1';
  const port = valueFor('--port') ? Number(valueFor('--port')) : await findOpenPort();
  const siteDirArg = valueFor('--site-dir') || valueFor('--dist-dir');
  const siteDir = builtSiteDir(PROJECT_DIR, siteDirArg ? resolvePathFromProject(PROJECT_DIR, siteDirArg) : '');
  if (!existsSync(siteDir) || !statSync(siteDir).isDirectory()) {
    emitReport({
      ok: false,
      mode: 'missing-site-dir',
      site_dir: siteDir,
      routes: routeArgs(),
      widths: widthArgs(),
      failures: [`missing static build directory: ${siteDir}. Run npm run build:fast or npm run build first.`],
    });
    return 1;
  }

  const report = await runQa({
    routes: routeArgs(),
    widths: widthArgs(),
    host,
    port,
    siteDir,
  });
  emitReport(report);
  return report.ok ? 0 : 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().then((code) => process.exit(code)).catch((error) => {
    const message = error instanceof Error ? error.stack || error.message : String(error);
    emitReport({ ok: false, mode: 'exception', failures: [message] });
    process.exit(1);
  });
}
