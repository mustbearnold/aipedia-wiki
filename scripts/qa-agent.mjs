#!/usr/bin/env node

import { chromium } from '@playwright/test';
import { createReadStream, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { builtSiteDir, resolvePathFromProject } from './lib/built-site-dir.mjs';

const rawArgs = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const DEFAULT_WIDTHS = [390, 1024];
const DEFAULT_JOURNEYS = ['buyer-decision-surface', 'commercial-cta-surface', 'layout-consistency-surface'];
const PAGE_AGENT_BUNDLE = join(PROJECT_DIR, 'node_modules', 'page-agent', 'dist', 'iife', 'page-agent.demo.js');
const PAGE_AGENT_PACKAGE = join(PROJECT_DIR, 'node_modules', 'page-agent', 'package.json');
const KNOWN_FLAGS = new Set([
  '--route',
  '--routes',
  '--width',
  '--widths',
  '--site-dir',
  '--dist-dir',
  '--base-url',
  '--concurrency',
  '--host',
  '--port',
  '--project-dir',
  '--root',
  '--mode',
  '--page-agent',
  '--deterministic',
  '--journey',
  '--journeys',
  '--task',
  '--llm-base-url',
  '--model',
  '--api-key',
  '--api-key-env',
  '--max-steps',
  '--temperature',
  '--timeout-ms',
  '--json',
  '--out',
  '--timing-file',
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
  '--base-url',
  '--concurrency',
  '--host',
  '--port',
  '--project-dir',
  '--root',
  '--mode',
  '--journey',
  '--journeys',
  '--task',
  '--llm-base-url',
  '--model',
  '--api-key',
  '--api-key-env',
  '--max-steps',
  '--temperature',
  '--timeout-ms',
  '--out',
  '--timing-file',
]);

const JSON_MODE = hasFlag('--json');
const HELP_MODE = hasFlag('--help') || hasFlag('-h');
const REPORT_FILE = valueFor('--out') || valueFor('--timing-file');

const JOURNEYS = {
  'buyer-decision-surface': {
    id: 'buyer-decision-surface',
    task: [
      'Assess whether this page lets a buyer make a fast, trusted decision.',
      'Confirm the visible page includes a clear title, verdict or recommendation, plan or price guidance, a warning or avoid signal, trust/source language, and a usable next click.',
      'Do not submit forms, buy anything, or leave the site.',
    ].join(' '),
  },
  'commercial-cta-surface': {
    id: 'commercial-cta-surface',
    task: [
      'Inspect the commercial CTA path.',
      'Confirm affiliate CTAs are clearly labeled, tracked with data attributes, near disclosure text, and visually contained at the current viewport.',
      'Do not click through to checkout.',
    ].join(' '),
  },
  'layout-consistency-surface': {
    id: 'layout-consistency-surface',
    task: [
      'Inspect the rendered layout for containment and scan quality.',
      'Confirm there is no horizontal overflow, clipped CTA text, broken wrapping, or tiny commercial tap targets.',
      'Do not change page state beyond scrolling if needed.',
    ].join(' '),
  },
};

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
    '  node scripts/qa-agent.mjs --route /tools/cloudtalk/ --site-dir dist-fast/client --json',
    '  node scripts/qa-agent.mjs --route /tools/cloudtalk/ --page-agent --llm-base-url http://127.0.0.1:11434/v1 --model qwen2.5 --json',
    '',
    'Options:',
    '  --route <path>        Route to inspect. Repeatable or comma-separated via --routes.',
    '  --width <px>         Viewport width. Repeatable or comma-separated via --widths. Default: 390,1024.',
    '  --site-dir <dir>     Static build directory. Defaults to the detected built output.',
    '  --base-url <url>     Existing local dev or preview server for deterministic mode only.',
    '  --concurrency <n>    Number of browser checks to run at once. Default: 1, max: 4.',
    '  --journey <id>       Journey to score. Repeatable. Built-ins: buyer-decision-surface, commercial-cta-surface, layout-consistency-surface.',
    '  --page-agent         Run optional PageAgent LLM journeys in the browser after deterministic metrics.',
    '  --llm-base-url <url> OpenAI-compatible base URL. PageAgent traffic is proxied through the local QA server.',
    '  --model <name>       Model name for PageAgent mode.',
    '  --api-key-env <name> Environment variable for the LLM API key. Default: PAGE_AGENT_API_KEY.',
    '  --max-steps <n>      Max PageAgent steps per journey. Default: 6.',
    '  --timeout-ms <n>     Per page or agent journey timeout. Default: 45000.',
    '  --json               Emit a structured report.',
    '  --out <path>         Write the full structured report.',
  ].join('\n');
}

function modeArg() {
  if (hasFlag('--page-agent')) return 'page-agent';
  if (hasFlag('--deterministic')) return 'deterministic';
  return valueFor('--mode') || 'deterministic';
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

function journeyArgs() {
  const selected = valuesFor('--journey', '--journeys');
  const ids = selected.length ? selected : DEFAULT_JOURNEYS;
  return ids.map((id) => JOURNEYS[id] || { id, task: valueFor('--task') || id });
}

function concurrencyArg() {
  const raw = valueFor('--concurrency');
  if (!raw) return 1;
  return Number(raw);
}

function timeoutArg() {
  const raw = valueFor('--timeout-ms');
  if (!raw) return 45000;
  return Number(raw);
}

function maxStepsArg() {
  const raw = valueFor('--max-steps');
  if (!raw) return 6;
  return Number(raw);
}

function temperatureArg() {
  const raw = valueFor('--temperature');
  if (!raw) return 0;
  return Number(raw);
}

function viewportHeight(width) {
  if (width <= 360) return 780;
  if (width <= 390) return 844;
  if (width <= 430) return 932;
  if (width <= 768) return 1024;
  return 900;
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

  if (hasFlag('--page-agent') && hasFlag('--deterministic')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --page-agent or --deterministic' });
  }

  const mode = modeArg();
  if (!['deterministic', 'page-agent'].includes(mode)) {
    issues.push({ code: 'argument-invalid', detail: `--mode must be deterministic or page-agent, got ${mode}` });
  }

  const baseUrl = valueFor('--base-url');
  if (baseUrl) {
    const parsed = parseLocalBaseUrl(baseUrl);
    if (!parsed.ok) issues.push({ code: 'argument-invalid', detail: parsed.detail });
    if (hasFlag('--site-dir') || hasFlag('--dist-dir')) {
      issues.push({ code: 'argument-invalid', detail: 'choose either --base-url or a static build directory, not both' });
    }
    if (hasFlag('--host') || hasFlag('--port')) {
      issues.push({ code: 'argument-invalid', detail: '--host and --port only apply when qa-agent starts its own static server' });
    }
    if (mode === 'page-agent') {
      issues.push({ code: 'argument-invalid', detail: '--page-agent requires qa-agent to start the local static server and LLM proxy, so do not use --base-url' });
    }
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

  const concurrency = concurrencyArg();
  if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 4) {
    issues.push({ code: 'argument-invalid', detail: `--concurrency must be an integer from 1 to 4, got ${valueFor('--concurrency')}` });
  }

  const timeoutMs = timeoutArg();
  if (!Number.isInteger(timeoutMs) || timeoutMs < 5000 || timeoutMs > 300000) {
    issues.push({ code: 'argument-invalid', detail: `--timeout-ms must be an integer from 5000 to 300000, got ${valueFor('--timeout-ms')}` });
  }

  const maxSteps = maxStepsArg();
  if (!Number.isInteger(maxSteps) || maxSteps < 1 || maxSteps > 40) {
    issues.push({ code: 'argument-invalid', detail: `--max-steps must be an integer from 1 to 40, got ${valueFor('--max-steps')}` });
  }

  const temperature = temperatureArg();
  if (!Number.isFinite(temperature) || temperature < 0 || temperature > 2) {
    issues.push({ code: 'argument-invalid', detail: `--temperature must be a number from 0 to 2, got ${valueFor('--temperature')}` });
  }

  const portValue = valueFor('--port');
  if (portValue) {
    const parsed = Number(portValue);
    if (!Number.isInteger(parsed) || parsed < 0 || parsed > 65535) {
      issues.push({ code: 'argument-invalid', detail: `--port must be an integer from 0 to 65535, got ${portValue}` });
    }
  }

  const unknownJourneyIds = valuesFor('--journey', '--journeys').filter((id) => !JOURNEYS[id] && !valueFor('--task'));
  for (const id of unknownJourneyIds) {
    issues.push({ code: 'argument-invalid', detail: `unknown journey ${id}; use --task for custom PageAgent tasks` });
  }

  if (valueFor('--task') && mode !== 'page-agent') {
    issues.push({ code: 'argument-invalid', detail: '--task only applies in --page-agent mode' });
  }

  if (mode === 'page-agent') {
    if (!existsSync(PAGE_AGENT_BUNDLE)) {
      issues.push({ code: 'argument-invalid', detail: 'page-agent bundle is missing; run npm install first' });
    }
    if (!valueFor('--llm-base-url')) {
      issues.push({ code: 'argument-invalid', detail: '--page-agent requires --llm-base-url for the local LLM proxy' });
    } else {
      const parsed = parseHttpUrl(valueFor('--llm-base-url'), '--llm-base-url');
      if (!parsed.ok) issues.push({ code: 'argument-invalid', detail: parsed.detail });
    }
    if (!valueFor('--model')) {
      issues.push({ code: 'argument-invalid', detail: '--page-agent requires --model' });
    }
  }

  return issues;
}

function parseLocalBaseUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false, detail: `--base-url must be a valid URL, got ${rawUrl}` };
  }

  if (parsed.protocol !== 'http:') {
    return { ok: false, detail: `--base-url must use http, got ${parsed.protocol}` };
  }

  const host = parsed.hostname.toLowerCase();
  const localHosts = new Set(['127.0.0.1', 'localhost', '::1', '[::1]']);
  if (!localHosts.has(host)) {
    return { ok: false, detail: `--base-url must point at a local server, got ${parsed.hostname}` };
  }

  return { ok: true, url: `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}` };
}

function parseHttpUrl(rawUrl, flag) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { ok: false, detail: `${flag} must be a valid URL, got ${rawUrl}` };
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    return { ok: false, detail: `${flag} must use http or https, got ${parsed.protocol}` };
  }

  return { ok: true, url: `${parsed.origin}${parsed.pathname.replace(/\/+$/, '')}` };
}

function fileForPath(rootDir, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return { error: 'bad-request' };
  }

  const cleanPath = decoded.replace(/^\/+/, '');
  const candidate = cleanPath ? join(rootDir, cleanPath) : join(rootDir, 'index.html');
  const normalized = normalize(candidate);
  if (normalized !== rootDir && !normalized.startsWith(`${rootDir}${sep}`)) return null;

  if (existsSync(normalized)) {
    const stats = statSync(normalized);
    if (stats.isDirectory()) return { path: join(normalized, 'index.html') };
    if (stats.isFile()) return { path: normalized };
  }

  return null;
}

const contentTypes = new Map([
  ['.avif', 'image/avif'],
  ['.css', 'text/css; charset=utf-8'],
  ['.gif', 'image/gif'],
  ['.html', 'text/html; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.mjs', 'text/javascript; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function startStaticServer({ host, port, siteDir, llmProxy }) {
  const proxyCalls = [];
  const server = createServer(async (request, response) => {
    try {
      const url = new URL(request.url ?? '/', `http://${host}:${port || 0}`);

      if (url.pathname === '/__aipedia-qa/page-agent.js') {
        if (!['GET', 'HEAD'].includes(request.method ?? '')) {
          response.writeHead(405, { Allow: 'GET, HEAD' });
          response.end('Method not allowed');
          return;
        }
        response.writeHead(200, {
          'Cache-Control': 'no-store',
          'Content-Type': 'text/javascript; charset=utf-8',
        });
        if (request.method === 'HEAD') {
          response.end();
          return;
        }
        createReadStream(PAGE_AGENT_BUNDLE).pipe(response);
        return;
      }

      if (url.pathname === '/__aipedia-qa/llm/chat/completions') {
        await proxyLlmRequest({ request, response, llmProxy, proxyCalls });
        return;
      }

      if (!['GET', 'HEAD'].includes(request.method ?? '')) {
        response.writeHead(405, { Allow: 'GET, HEAD' });
        response.end('Method not allowed');
        return;
      }

      const resolvedFile = fileForPath(siteDir, url.pathname);
      if (resolvedFile?.error === 'bad-request') {
        response.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Bad request');
        return;
      }

      const filePath = resolvedFile?.path;
      if (!filePath || !existsSync(filePath) || !statSync(filePath).isFile()) {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Not found');
        return;
      }

      const type = contentTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream';
      response.writeHead(200, {
        'Cache-Control': 'no-store',
        'Content-Type': type,
      });
      if (request.method === 'HEAD') {
        response.end();
        return;
      }
      createReadStream(filePath).pipe(response);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      response.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      response.end(JSON.stringify({ error: { message } }));
    }
  });

  return new Promise((resolveStart, rejectStart) => {
    server.once('error', rejectStart);
    server.listen(port, host, () => {
      server.off('error', rejectStart);
      const address = server.address();
      const resolvedPort = typeof address === 'object' && address ? address.port : port;
      resolveStart({
        baseUrl: `http://${host}:${resolvedPort}`,
        rootDir: siteDir,
        proxyCalls,
        stop: () => new Promise((resolveStop) => server.close(() => resolveStop())),
      });
    });
  });
}

async function proxyLlmRequest({ request, response, llmProxy, proxyCalls }) {
  if (!llmProxy) {
    response.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    response.end(JSON.stringify({ error: { message: 'LLM proxy is not enabled' } }));
    return;
  }

  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Headers': 'content-type, authorization',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    });
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    response.writeHead(405, { Allow: 'POST, OPTIONS' });
    response.end('Method not allowed');
    return;
  }

  const requestBody = await readRequestBody(request, 8 * 1024 * 1024);
  const startedAt = Date.now();
  const targetUrl = `${llmProxy.baseURL}/chat/completions`;
  try {
    const upstream = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': request.headers['content-type'] || 'application/json',
        ...(llmProxy.apiKey ? { Authorization: `Bearer ${llmProxy.apiKey}` } : {}),
      },
      body: requestBody,
    });
    const bytes = Buffer.from(await upstream.arrayBuffer());
    proxyCalls.push({
      status: upstream.status,
      duration_ms: Date.now() - startedAt,
      request_bytes: Buffer.byteLength(requestBody),
      response_bytes: bytes.byteLength,
    });
    response.writeHead(upstream.status, {
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store',
      'Content-Type': upstream.headers.get('content-type') || 'application/json; charset=utf-8',
    });
    response.end(bytes);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    proxyCalls.push({
      status: 0,
      duration_ms: Date.now() - startedAt,
      request_bytes: Buffer.byteLength(requestBody),
      response_bytes: 0,
      error: message,
    });
    response.writeHead(502, {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8',
    });
    response.end(JSON.stringify({ error: { message: `LLM proxy request failed: ${message}` } }));
  }
}

function readRequestBody(request, maxBytes) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let total = 0;
    request.on('data', (chunk) => {
      total += chunk.byteLength;
      if (total > maxBytes) {
        rejectBody(new Error(`request body exceeds ${maxBytes} bytes`));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    request.on('error', rejectBody);
  });
}

function routeType(route) {
  const parts = route.split('?')[0].split('/').filter(Boolean);
  if (parts.length === 0) return 'home';
  if (parts.length === 1) return `${parts[0]}-archive`;
  return `${parts[0]}-detail`;
}

function isDecisionDetailRoute(route) {
  const type = routeType(route);
  return /^(tools|guides|compare|categories|workflows|answers|use-cases|companies)-detail$/.test(type);
}

function routeLabel(route, width) {
  return `${route} @ ${width}px`;
}

function isAllowedLocalMissing(url) {
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

async function collectPageMetrics(page, route) {
  return page.evaluate((routeForEval) => {
    const clean = (value) => String(value ?? '').replace(/\s+/g, ' ').trim();
    const doc = document.documentElement;
    const viewportMaxRight = doc.clientWidth + 1;
    const bodyText = clean(document.body?.innerText ?? '');
    const lowerText = bodyText.toLowerCase();
    const isVisible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.visibility !== 'hidden' && style.display !== 'none' && rect.width > 0 && rect.height > 0;
    };
    const isContainedByHorizontalScroller = (node) => {
      for (let parent = node.parentElement; parent && parent !== document.body && parent !== doc; parent = parent.parentElement) {
        const style = getComputedStyle(parent);
        const overflowX = style.overflowX;
        const clipsHorizontally = overflowX === 'auto' || overflowX === 'scroll' || overflowX === 'hidden' || overflowX === 'clip';
        if (!clipsHorizontally) continue;

        const rect = parent.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) continue;
        if (rect.left < -1 || rect.right > viewportMaxRight) continue;
        return true;
      }
      return false;
    };

    const overflowing = [];
    for (const element of document.querySelectorAll('body *')) {
      const style = getComputedStyle(element);
      if (style.position === 'fixed') continue;

      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0 || rect.right <= viewportMaxRight) continue;
      if (isContainedByHorizontalScroller(element)) continue;

      overflowing.push({
        tag: element.tagName,
        className: typeof element.className === 'string' ? element.className : '',
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      });

      if (overflowing.length >= 8) break;
    }

    const h1 = document.querySelector('h1');
    const headings = [...document.querySelectorAll('main h1, main h2, main h3')]
      .map((node) => clean(node.textContent))
      .filter(Boolean);
    const interactiveSelector = 'a[href], button, input, select, textarea, summary, [role="button"], [role="link"], [tabindex]:not([tabindex="-1"])';
    const interactiveElements = [...document.querySelectorAll(interactiveSelector)].filter(isVisible);
    const ctaElements = [...document.querySelectorAll('a[data-cta-placement], button[data-cta-placement], [data-cta-page-type], [data-cta-is-affiliate]')].filter(isVisible);
    const commercialCtas = ctaElements.map((element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight) || 20;
      const label = clean(element.getAttribute('data-cta-label') || element.textContent || element.getAttribute('aria-label') || '');
      const ancestorText = clean(element.closest('article, section, aside, main, .commercial-cta-shell, .t2-cta, .gt-card-ctas')?.textContent || element.parentElement?.textContent || '');
      const isAffiliate = element.getAttribute('data-cta-is-affiliate') === 'true' || element.getAttribute('data-cta-destination-type') === 'affiliate';
      const nearbyDisclosure = /affiliate link; no extra cost to you|affiliate relationship|may earn|earn a commission|affiliate disclosure/i.test(ancestorText);
      const wrapped = rect.height > lineHeight * 2.4 || element.scrollWidth > element.clientWidth + 1 || element.scrollHeight > element.clientHeight + 1;
      const destinationType = element.getAttribute('data-cta-destination-type') || '';
      return {
        tag: element.tagName,
        label,
        placement: element.getAttribute('data-cta-placement') || '',
        page_type: element.getAttribute('data-cta-page-type') || '',
        tool_slug: element.getAttribute('data-cta-tool-slug') || '',
        destination_type: destinationType,
        is_affiliate: isAffiliate,
        has_click_event: Boolean(element.getAttribute('data-cta-click-event')),
        has_view_event: Boolean(element.getAttribute('data-cta-view-event')),
        has_nearby_disclosure: !isAffiliate || nearbyDisclosure,
        rel: element.getAttribute('rel') || '',
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        wrapped_or_clipped: wrapped,
        tiny_target: rect.width < 44 || rect.height < 36,
      };
    });

    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');
    const resourcesByType = {};
    let transferSize = 0;
    let encodedBodySize = 0;
    for (const resource of resources) {
      const type = resource.initiatorType || 'other';
      resourcesByType[type] = (resourcesByType[type] || 0) + 1;
      transferSize += resource.transferSize || 0;
      encodedBodySize += resource.encodedBodySize || 0;
    }

    const firstViewportElements = [...document.querySelectorAll('main h1, main h2, main p, main li, main a, main button')]
      .filter(isVisible)
      .filter((element) => element.getBoundingClientRect().top < window.innerHeight)
      .map((element) => clean(element.textContent))
      .filter(Boolean);
    const firstViewportText = firstViewportElements.join(' ').slice(0, 8000);
    const firstViewportLower = firstViewportText.toLowerCase();

    const hasPattern = (pattern) => pattern.test(lowerText);
    const hasFirstViewportPattern = (pattern) => pattern.test(firstViewportLower);

    return {
      route: routeForEval,
      title: clean(document.title),
      meta_description_length: clean(document.querySelector('meta[name="description"]')?.getAttribute('content')).length,
      canonical: clean(document.querySelector('link[rel="canonical"]')?.getAttribute('href')),
      robots: clean(document.querySelector('meta[name="robots"]')?.getAttribute('content')),
      main_visible: Boolean(document.querySelector('main') && isVisible(document.querySelector('main'))),
      h1: clean(h1?.textContent),
      headings_count: headings.length,
      headings_sample: headings.slice(0, 8),
      body_text_length: bodyText.length,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        client_width: doc.clientWidth,
        scroll_width: doc.scrollWidth,
        overflow_delta: Math.max(0, doc.scrollWidth - doc.clientWidth),
        scroll_height: doc.scrollHeight,
      },
      layout: {
        overflowing,
        overflowing_count: overflowing.length,
      },
      interactions: {
        interactive_count: interactiveElements.length,
        cta_count: ctaElements.length,
        commercial_cta_count: commercialCtas.length,
        affiliate_cta_count: commercialCtas.filter((cta) => cta.is_affiliate).length,
        official_cta_count: commercialCtas.filter((cta) => cta.destination_type === 'official').length,
        ctas: commercialCtas.slice(0, 20),
        missing_tracking_count: commercialCtas.filter((cta) => !cta.placement || !cta.page_type || !cta.has_click_event || !cta.has_view_event).length,
        affiliate_missing_nearby_disclosure_count: commercialCtas.filter((cta) => cta.is_affiliate && !cta.has_nearby_disclosure).length,
        wrapped_or_clipped_count: commercialCtas.filter((cta) => cta.wrapped_or_clipped).length,
        tiny_target_count: commercialCtas.filter((cta) => cta.tiny_target).length,
      },
      content_signals: {
        verdict: hasPattern(/\b(verdict|bottom line|quick answer|recommendation|should you use it|what to buy|use it for this|pick|choose)\b/i),
        best_for: hasPattern(/\b(best for|who should use|ideal for)\b/i),
        not_ideal: hasPattern(/\b(not ideal|avoid|skip|not for|watch out)\b/i),
        best_plan: hasPattern(/\b(best plan|plan to buy|which plan|pricing|price|starts at)\b/i),
        watch_out: hasPattern(/\b(watch-out|watch out|risk|limitation|caveat|avoid)\b/i),
        alternatives: hasPattern(/\b(alternative|alternatives|compare with|versus|vs\.)\b/i),
        sources: hasPattern(/\b(sources|source-backed|verified)\b/i),
        verified_date: hasPattern(/\blast verified\b|\bverified\s+20\d{2}-\d{2}-\d{2}\b|\bverified\s+(?:january|february|march|april|may|june|july|august|september|october|november|december)\b/i),
        disclosure: hasPattern(/\baffiliate\b|\bcommission\b|\bno paid placements\b|\bcommercial relationship\b/i),
        score: hasPattern(/\bscore\b|\b\d(?:\.\d)?\/10\b/i),
        first_viewport_verdict: hasFirstViewportPattern(/\b(verdict|bottom line|quick answer|recommendation|should you use it|what to buy|use it for this|best for|pick|choose)\b/i),
        first_viewport_plan_or_price: hasFirstViewportPattern(/\b(best plan|plan|pricing|price|starts at|free)\b/i),
        first_viewport_trust: hasFirstViewportPattern(/\bverified|source-backed|no paid placements|affiliate\b/i),
      },
      performance: {
        nav_duration_ms: navigation ? Math.round(navigation.duration) : null,
        dom_content_loaded_ms: navigation ? Math.round(navigation.domContentLoadedEventEnd - navigation.startTime) : null,
        load_event_ms: navigation ? Math.round(navigation.loadEventEnd - navigation.startTime) : null,
        response_end_ms: navigation ? Math.round(navigation.responseEnd - navigation.startTime) : null,
        resource_count: resources.length,
        resources_by_type: resourcesByType,
        transfer_size_bytes: transferSize,
        encoded_body_size_bytes: encodedBodySize,
      },
    };
  }, route);
}

function journeyEvaluationsFor(route, width, metrics, selectedJourneys) {
  return selectedJourneys.map((journey) => {
    if (journey.id === 'buyer-decision-surface') return evaluateBuyerJourney(route, width, metrics);
    if (journey.id === 'commercial-cta-surface') return evaluateCommercialJourney(route, width, metrics);
    if (journey.id === 'layout-consistency-surface') return evaluateLayoutJourney(route, width, metrics);
    return {
      journey_id: journey.id,
      status: 'not-run',
      failures: [],
      warnings: ['custom tasks require --page-agent mode'],
    };
  });
}

function evaluateBuyerJourney(route, width, metrics) {
  const failures = [];
  const warnings = [];
  const detailRoute = isDecisionDetailRoute(route);
  const signals = metrics.content_signals;
  const label = routeLabel(route, width);
  const requireOrWarn = (condition, message) => {
    if (condition) return;
    if (detailRoute) failures.push(message);
    else warnings.push(message);
  };

  requireOrWarn(Boolean(metrics.h1), `${label}: buyer journey missing H1`);
  requireOrWarn(signals.verdict || signals.first_viewport_verdict, `${label}: buyer journey lacks verdict or recommendation language`);
  requireOrWarn(signals.best_plan || signals.first_viewport_plan_or_price, `${label}: buyer journey lacks plan, price, or budget guidance`);
  requireOrWarn(signals.watch_out || signals.not_ideal, `${label}: buyer journey lacks warning, avoid, or not-ideal guidance`);
  requireOrWarn(signals.sources || signals.verified_date || signals.first_viewport_trust, `${label}: buyer journey lacks visible source or verified trust language`);
  requireOrWarn(metrics.interactions.cta_count > 0 || metrics.interactions.interactive_count > 0, `${label}: buyer journey lacks a usable next click`);

  return {
    journey_id: 'buyer-decision-surface',
    route_type: routeType(route),
    status: failures.length ? 'failed' : 'passed',
    failures,
    warnings,
    measured: {
      first_viewport_verdict: signals.first_viewport_verdict,
      first_viewport_plan_or_price: signals.first_viewport_plan_or_price,
      first_viewport_trust: signals.first_viewport_trust,
      cta_count: metrics.interactions.cta_count,
    },
  };
}

function evaluateCommercialJourney(route, width, metrics) {
  const failures = [];
  const warnings = [];
  const label = routeLabel(route, width);
  const interactions = metrics.interactions;
  if (interactions.commercial_cta_count === 0) {
    return {
      journey_id: 'commercial-cta-surface',
      status: 'skipped',
      failures,
      warnings: [`${label}: no tracked commercial CTA found`],
      measured: {
        commercial_cta_count: 0,
        affiliate_cta_count: 0,
      },
    };
  }

  if (interactions.missing_tracking_count > 0) failures.push(`${label}: ${interactions.missing_tracking_count} commercial CTA(s) missing tracking attributes`);
  if (interactions.affiliate_missing_nearby_disclosure_count > 0) {
    warnings.push(`${label}: ${interactions.affiliate_missing_nearby_disclosure_count} affiliate CTA(s) did not have disclosure text in the nearest scanned container`);
  }
  if (interactions.wrapped_or_clipped_count > 0) failures.push(`${label}: ${interactions.wrapped_or_clipped_count} commercial CTA(s) look wrapped or clipped`);
  if (interactions.tiny_target_count > 0) warnings.push(`${label}: ${interactions.tiny_target_count} commercial CTA(s) below target-size floor, often pricing-table text links`);
  if (interactions.affiliate_cta_count > 0 && !metrics.content_signals.disclosure) {
    failures.push(`${label}: affiliate CTA exists but page-level disclosure language is not visible`);
  }

  return {
    journey_id: 'commercial-cta-surface',
    status: failures.length ? 'failed' : 'passed',
    failures,
    warnings,
    measured: {
      commercial_cta_count: interactions.commercial_cta_count,
      affiliate_cta_count: interactions.affiliate_cta_count,
      official_cta_count: interactions.official_cta_count,
      missing_tracking_count: interactions.missing_tracking_count,
      affiliate_missing_nearby_disclosure_count: interactions.affiliate_missing_nearby_disclosure_count,
      wrapped_or_clipped_count: interactions.wrapped_or_clipped_count,
      tiny_target_count: interactions.tiny_target_count,
    },
  };
}

function evaluateLayoutJourney(route, width, metrics) {
  const failures = [];
  const label = routeLabel(route, width);
  if (!metrics.main_visible) failures.push(`${label}: main content is missing or not visible`);
  if (!metrics.title) failures.push(`${label}: missing document title`);
  if (!metrics.meta_description_length) failures.push(`${label}: missing meta description`);
  if (!metrics.canonical) failures.push(`${label}: missing canonical URL`);
  if (metrics.viewport.overflow_delta > 1) {
    failures.push(`${label}: document overflows horizontally by ${metrics.viewport.overflow_delta}px`);
  }
  for (const item of metrics.layout.overflowing) {
    failures.push(`${label}: ${item.tag}${item.className ? ` .${item.className}` : ''} extends to ${item.right}px at width ${item.width}px`);
  }

  return {
    journey_id: 'layout-consistency-surface',
    status: failures.length ? 'failed' : 'passed',
    failures,
    warnings: [],
    measured: {
      overflow_delta: metrics.viewport.overflow_delta,
      overflowing_count: metrics.layout.overflowing_count,
      scroll_height: metrics.viewport.scroll_height,
      resource_count: metrics.performance.resource_count,
    },
  };
}

async function runPageAgent(page, { baseUrl, journey, timeoutMs, maxSteps, model, temperature }) {
  await page.addScriptTag({ url: `${baseUrl}/__aipedia-qa/page-agent.js?autoInit=false` });
  await page.waitForFunction(() => Boolean(window.PageAgent), { timeout: 10000 });

  const result = await withTimeout(page.evaluate(async ({ baseUrl: injectedBaseUrl, task, maxSteps: injectedMaxSteps, model: injectedModel, temperature: injectedTemperature }) => {
    const startedAt = performance.now();
    const agent = new window.PageAgent({
      baseURL: `${injectedBaseUrl}/__aipedia-qa/llm`,
      model: injectedModel,
      temperature: injectedTemperature,
      language: 'en-US',
      maxSteps: injectedMaxSteps,
      stepDelay: 0,
      enableMask: false,
      promptForNextTask: false,
      experimentalLlmsTxt: true,
      instructions: {
        system: [
          'You are an AiPedia QA evaluator running inside a local browser.',
          'Measure whether the page supports a trustworthy buying decision.',
          'Do not submit forms, purchase, log in, or navigate to checkout.',
          'Prefer inspection and scrolling over clicking.',
          'When finished, use the done tool with a concise pass or fail summary.',
        ].join(' '),
      },
    });
    try {
      const execution = await agent.execute(task);
      return {
        success: execution.success,
        data: execution.data,
        status: agent.status,
        duration_ms: Math.round(performance.now() - startedAt),
        history: execution.history.map((event) => {
          if (event.type === 'step') {
            return {
              type: event.type,
              step_index: event.stepIndex,
              action: {
                name: event.action?.name || '',
                output: String(event.action?.output || '').slice(0, 500),
              },
              usage: event.usage || null,
              reflection: event.reflection || null,
            };
          }
          if (event.type === 'error') {
            return { type: event.type, message: event.message || '' };
          }
          if (event.type === 'observation') {
            return { type: event.type, content: String(event.content || '').slice(0, 500) };
          }
          return { type: event.type || 'unknown' };
        }),
      };
    } finally {
      agent.dispose('qa-agent complete');
    }
  }, {
    baseUrl,
    task: journey.task,
    maxSteps,
    model,
    temperature,
  }), timeoutMs, `PageAgent journey ${journey.id} timed out after ${timeoutMs}ms`);

  return {
    journey_id: journey.id,
    success: Boolean(result.success),
    status: result.status,
    data: String(result.data || '').slice(0, 1000),
    duration_ms: result.duration_ms,
    history: result.history,
    metrics: summarizeAgentHistory(result.history),
    failures: result.success ? [] : [`PageAgent journey ${journey.id} did not complete successfully`],
  };
}

function summarizeAgentHistory(history) {
  const summary = {
    step_count: 0,
    action_counts: {},
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0,
    cached_tokens: 0,
    reasoning_tokens: 0,
    error_count: 0,
  };

  for (const event of history || []) {
    if (event.type === 'error') summary.error_count += 1;
    if (event.type !== 'step') continue;
    summary.step_count += 1;
    const action = event.action?.name || 'unknown';
    summary.action_counts[action] = (summary.action_counts[action] || 0) + 1;
    const usage = event.usage || {};
    summary.prompt_tokens += usage.promptTokens || usage.prompt_tokens || 0;
    summary.completion_tokens += usage.completionTokens || usage.completion_tokens || 0;
    summary.total_tokens += usage.totalTokens || usage.total_tokens || 0;
    summary.cached_tokens += usage.cachedTokens || usage.cached_tokens || 0;
    summary.reasoning_tokens += usage.reasoningTokens || usage.reasoning_tokens || 0;
  }

  return summary;
}

async function withTimeout(promise, timeoutMs, message) {
  let timeout;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timeout = setTimeout(() => reject(new Error(message)), timeoutMs);
      }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

async function checkRoute({ browser, baseUrl, route, width, mode, journeys, timeoutMs, maxSteps, model, temperature }) {
  const startedAt = Date.now();
  const page = await browser.newPage({
    viewport: { width, height: viewportHeight(width) },
    isMobile: width <= 430,
  });
  page.setDefaultTimeout(timeoutMs);
  page.setDefaultNavigationTimeout(timeoutMs);
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

  let response = null;
  try {
    response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: timeoutMs });
    await page.waitForLoadState('networkidle', { timeout: Math.min(timeoutMs, 5000) }).catch(() => {});
    const metrics = await collectPageMetrics(page, route);
    const journeyEvaluations = journeyEvaluationsFor(route, width, metrics, journeys);
    const agentRuns = [];

    if (mode === 'page-agent') {
      for (const journey of journeys) {
        agentRuns.push(await runPageAgent(page, { baseUrl, journey, timeoutMs, maxSteps, model, temperature }));
      }
    }

    const result = {
      route,
      width,
      mode,
      duration_ms: Date.now() - startedAt,
      response_status: response?.status() ?? null,
      metrics,
      journey_evaluations: journeyEvaluations,
      agent_runs: agentRuns,
      failed_requests: failedRequests,
    };
    result.failures = failuresForResult(result);
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      route,
      width,
      mode,
      duration_ms: Date.now() - startedAt,
      response_status: response?.status() ?? null,
      metrics: null,
      journey_evaluations: [],
      agent_runs: [],
      failed_requests: failedRequests,
      failures: [`${routeLabel(route, width)}: ${message}`],
    };
  } finally {
    await page.close().catch(() => {});
  }
}

function failuresForResult(result) {
  const failures = [];
  const label = routeLabel(result.route, result.width);
  if (!result.response_status || result.response_status < 200 || result.response_status >= 400) {
    failures.push(`${label}: document status ${result.response_status ?? 'missing'}`);
  }

  for (const request of result.failed_requests) {
    if (/\/__aipedia-qa\/llm\/chat\/completions$/.test(request.url)) continue;
    failures.push(`${label}: failed request ${request.method} ${request.url}`);
  }

  for (const evaluation of result.journey_evaluations) {
    failures.push(...evaluation.failures);
  }

  for (const agentRun of result.agent_runs) {
    failures.push(...agentRun.failures);
  }

  return failures;
}

async function runQa({ routes, widths, host, port, siteDir, baseUrl, mode, journeys, concurrency, timeoutMs, maxSteps, model, temperature, llmProxy }) {
  const startedAt = Date.now();
  const server = baseUrl ? null : await startStaticServer({ host, port, siteDir, llmProxy });
  const resolvedBaseUrl = baseUrl || server.baseUrl;
  const jobs = routes.flatMap((route) => widths.map((width) => ({ route, width })));
  const results = new Array(jobs.length);

  try {
    const browser = await chromium.launch();
    try {
      let nextJobIndex = 0;
      const workerCount = Math.min(concurrency, jobs.length);
      await Promise.all(Array.from({ length: workerCount }, async () => {
        while (nextJobIndex < jobs.length) {
          const jobIndex = nextJobIndex;
          nextJobIndex += 1;
          results[jobIndex] = await checkRoute({
            browser,
            baseUrl: resolvedBaseUrl,
            mode,
            journeys,
            timeoutMs,
            maxSteps,
            model,
            temperature,
            ...jobs[jobIndex],
          });
        }
      }));
    } finally {
      await browser.close();
    }
  } finally {
    if (server) await server.stop();
  }

  const filledResults = results.filter(Boolean);
  const report = {
    ok: filledResults.every((result) => result.failures.length === 0),
    mode,
    generated_at: new Date().toISOString(),
    project_dir: PROJECT_DIR,
    site_dir: siteDir || null,
    base_url: resolvedBaseUrl,
    routes,
    widths,
    journeys: journeys.map((journey) => ({ id: journey.id, task: journey.task })),
    concurrency,
    timeout_ms: timeoutMs,
    duration_ms: Date.now() - startedAt,
    page_agent: {
      enabled: mode === 'page-agent',
      package: 'page-agent',
      version: pageAgentVersion(),
      model: mode === 'page-agent' ? model : null,
      max_steps: mode === 'page-agent' ? maxSteps : null,
      llm_proxy: mode === 'page-agent' ? summarizeProxyCalls(server?.proxyCalls || []) : null,
    },
    summary: summarizeResults(filledResults, Date.now() - startedAt, server?.proxyCalls || []),
    results: filledResults,
    failures: filledResults.flatMap((result) => result.failures),
  };

  return report;
}

function pageAgentVersion() {
  try {
    return JSON.parse(readFileSync(PAGE_AGENT_PACKAGE, 'utf8')).version || null;
  } catch {
    return null;
  }
}

function summarizeProxyCalls(proxyCalls) {
  return {
    call_count: proxyCalls.length,
    status_counts: countBy(proxyCalls, (call) => String(call.status)),
    total_duration_ms: sum(proxyCalls.map((call) => call.duration_ms || 0)),
    total_request_bytes: sum(proxyCalls.map((call) => call.request_bytes || 0)),
    total_response_bytes: sum(proxyCalls.map((call) => call.response_bytes || 0)),
  };
}

function summarizeResults(results, totalDurationMs, proxyCalls) {
  const durations = results.map((result) => result.duration_ms || 0);
  const navDurations = results.map((result) => result.metrics?.performance?.nav_duration_ms).filter((value) => Number.isFinite(value));
  const agentRuns = results.flatMap((result) => result.agent_runs || []);
  const agentMetrics = agentRuns.map((run) => run.metrics || {});
  const evaluations = results.flatMap((result) => result.journey_evaluations || []);
  const ctaTotals = results.map((result) => result.metrics?.interactions?.commercial_cta_count || 0);
  const affiliateCtaTotals = results.map((result) => result.metrics?.interactions?.affiliate_cta_count || 0);
  const overflowDeltas = results.map((result) => result.metrics?.viewport?.overflow_delta || 0);
  const resourceCounts = results.map((result) => result.metrics?.performance?.resource_count || 0);
  const transferSizes = results.map((result) => result.metrics?.performance?.transfer_size_bytes || 0);

  return {
    job_count: results.length,
    passed_jobs: results.filter((result) => result.failures.length === 0).length,
    failed_jobs: results.filter((result) => result.failures.length > 0).length,
    journey_evaluations: evaluations.length,
    journey_status_counts: countBy(evaluations, (evaluation) => evaluation.status),
    total_duration_ms: totalDurationMs,
    p50_job_duration_ms: percentile(durations, 0.5),
    p95_job_duration_ms: percentile(durations, 0.95),
    p50_nav_duration_ms: percentile(navDurations, 0.5),
    p95_nav_duration_ms: percentile(navDurations, 0.95),
    max_overflow_delta_px: Math.max(0, ...overflowDeltas),
    total_failed_requests: sum(results.map((result) => result.failed_requests?.length || 0)),
    total_commercial_ctas: sum(ctaTotals),
    total_affiliate_ctas: sum(affiliateCtaTotals),
    max_resource_count: Math.max(0, ...resourceCounts),
    total_transfer_size_bytes: sum(transferSizes),
    page_agent_runs: agentRuns.length,
    page_agent_successes: agentRuns.filter((run) => run.success).length,
    page_agent_failures: agentRuns.filter((run) => !run.success).length,
    page_agent_total_steps: sum(agentMetrics.map((metrics) => metrics.step_count || 0)),
    page_agent_total_tokens: sum(agentMetrics.map((metrics) => metrics.total_tokens || 0)),
    page_agent_prompt_tokens: sum(agentMetrics.map((metrics) => metrics.prompt_tokens || 0)),
    page_agent_completion_tokens: sum(agentMetrics.map((metrics) => metrics.completion_tokens || 0)),
    page_agent_cached_tokens: sum(agentMetrics.map((metrics) => metrics.cached_tokens || 0)),
    page_agent_reasoning_tokens: sum(agentMetrics.map((metrics) => metrics.reasoning_tokens || 0)),
    llm_proxy_calls: proxyCalls.length,
  };
}

function countBy(values, keyFn) {
  const counts = {};
  for (const value of values || []) {
    const key = keyFn(value) || 'unknown';
    counts[key] = (counts[key] || 0) + 1;
  }
  return counts;
}

function sum(values) {
  return values.reduce((total, value) => total + (Number(value) || 0), 0);
}

function percentile(values, ratio) {
  const sorted = values.filter((value) => Number.isFinite(value)).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil(sorted.length * ratio) - 1));
  return sorted[index];
}

function emitReport(report) {
  if (REPORT_FILE) {
    const reportPath = resolve(PROJECT_DIR, REPORT_FILE);
    mkdirSync(dirname(reportPath), { recursive: true });
    writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  }

  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }

  if (!report.ok) {
    console.error(`[qa-agent] ${report.failures.length} issue(s) found.`);
    for (const failure of report.failures.slice(0, 80)) console.error(`  x ${failure}`);
    return;
  }

  console.log(`[qa-agent] ok: ${report.routes.join(', ')} at ${report.widths.join(', ')} px.`);
  console.log(`[qa-agent] ${report.summary.job_count} job(s), p95 job ${report.summary.p95_job_duration_ms ?? 'n/a'}ms, p95 nav ${report.summary.p95_nav_duration_ms ?? 'n/a'}ms.`);
  if (report.page_agent.enabled) {
    console.log(`[qa-agent] PageAgent: ${report.summary.page_agent_runs} run(s), ${report.summary.page_agent_total_steps} step(s), ${report.summary.page_agent_total_tokens} token(s).`);
  }
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

  const mode = modeArg();
  const baseUrlResult = valueFor('--base-url') ? parseLocalBaseUrl(valueFor('--base-url')) : null;
  const baseUrl = baseUrlResult?.url || '';
  const host = valueFor('--host') || '127.0.0.1';
  const port = baseUrl ? 0 : valueFor('--port') ? Number(valueFor('--port')) : 0;
  const siteDirArg = valueFor('--site-dir') || valueFor('--dist-dir');
  const siteDir = baseUrl ? '' : builtSiteDir(PROJECT_DIR, siteDirArg ? resolvePathFromProject(PROJECT_DIR, siteDirArg) : '');
  if (!baseUrl && (!existsSync(siteDir) || !statSync(siteDir).isDirectory())) {
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

  const llmBaseUrl = valueFor('--llm-base-url') ? parseHttpUrl(valueFor('--llm-base-url'), '--llm-base-url').url : '';
  const apiKeyEnv = valueFor('--api-key-env') || 'PAGE_AGENT_API_KEY';
  const apiKey = valueFor('--api-key') || process.env[apiKeyEnv] || '';
  const llmProxy = mode === 'page-agent'
    ? {
        baseURL: llmBaseUrl,
        apiKey,
        apiKeyEnv,
      }
    : null;

  const report = await runQa({
    routes: routeArgs(),
    widths: widthArgs(),
    host,
    port,
    siteDir,
    baseUrl,
    mode,
    journeys: journeyArgs(),
    concurrency: concurrencyArg(),
    timeoutMs: timeoutArg(),
    maxSteps: maxStepsArg(),
    model: valueFor('--model'),
    temperature: temperatureArg(),
    llmProxy,
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
