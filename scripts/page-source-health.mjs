#!/usr/bin/env node
// Check page-local source URLs with bounded concurrency and per-page timing.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { performance } from 'node:perf_hooks';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const PLAN_PATH = resolve(PROJECT_DIR, valueFor('--plan') || 'local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json');
const OUT_PATH = valueFor('--out') ? resolve(PROJECT_DIR, valueFor('--out')) : undefined;
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const CONCURRENCY = numberArg('--concurrency', 8);
const TIMEOUT_MS = numberArg('--timeout-ms', 8000);
const DOMAIN_DELAY_MS = numberArg('--domain-delay-ms', 150);
const USER_AGENT = 'Mozilla/5.0 (compatible; AiPediaSourceHealth/1.0; +https://aipedia.wiki)';

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/page-source-health.mjs --plan local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json --out local/tmp/page-source-health.json',
    '',
    'Options:',
    '  --plan <path>           Page-refresh planner JSON. Default: local/tmp/aipedia-runner/page-refresh/page-refresh-batch.json.',
    '  --out <path>            Write JSON report.',
    '  --json                  Also emit JSON to stdout.',
    '  --concurrency <n>       Maximum concurrent URL checks. Default: 8.',
    '  --timeout-ms <ms>       Per-URL timeout. Default: 8000.',
    '  --domain-delay-ms <ms>  Minimum delay between requests to one hostname. Default: 150.',
    '  --project-dir <dir>     Check another project root.',
    '  --root <dir>            Alias for --project-dir.',
  ].join('\n');
}

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function numberArg(name, fallback) {
  const rawValue = valueFor(name);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) && value >= 1 ? value : fallback;
}

function cleanUrl(raw) {
  return String(raw ?? '')
    .replace(/[)"'`\].,;:>]+$/g, '')
    .replace(/[.,;:]+$/g, '');
}

function extractUrls(content) {
  const urls = [...String(content).matchAll(/https?:\/\/[^\s)\]}]+/g)].map((match) => cleanUrl(match[0]));
  return [...new Set(urls)].filter((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  });
}

function isCloudflareResponse(headers) {
  if (!headers) return false;
  const server = headers.get('server') || '';
  return server.toLowerCase().includes('cloudflare') || Boolean(headers.get('cf-ray'));
}

function classifyStatus(status, errorCode = '', headers) {
  if (status >= 200 && status < 400) return 'ok';
  if ([401, 403, 429].includes(status)) return 'access-sensitive';
  if (status === 503 && isCloudflareResponse(headers)) return 'access-sensitive';
  if (errorCode === 'timeout' || errorCode === 'network') return 'unreachable';
  return 'broken';
}

function isPassingClassification(classification) {
  return classification === 'ok' || classification === 'access-sensitive';
}

function sleep(ms) {
  return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

const nextDomainAt = new Map();

async function waitForDomainSlot(url) {
  if (DOMAIN_DELAY_MS <= 0) return;
  let hostname = 'unknown';
  try {
    hostname = new URL(url).hostname;
  } catch {
    return;
  }
  const now = performance.now();
  const nextAt = nextDomainAt.get(hostname) ?? 0;
  const waitMs = Math.max(0, nextAt - now);
  nextDomainAt.set(hostname, Math.max(now, nextAt) + DOMAIN_DELAY_MS);
  if (waitMs > 0) await sleep(waitMs);
}

async function checkUrl(url) {
  await waitForDomainSlot(url);
  const started = performance.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let response = await fetchForHealth(url, controller.signal, 'HEAD');
    let classification = classifyStatus(response.status, '', response.headers);
    if (classification === 'broken') {
      response = await fetchForHealth(url, controller.signal, 'GET');
      classification = classifyStatus(response.status, '', response.headers);
    }
    const elapsed_ms = Math.round(performance.now() - started);
    return {
      url,
      status: response.status,
      ok: isPassingClassification(classification),
      classification,
      elapsed_ms,
    };
  } catch (error) {
    const elapsed_ms = Math.round(performance.now() - started);
    const errorCode = error?.name === 'AbortError' ? 'timeout' : 'network';
    const classification = classifyStatus(0, errorCode);
    return {
      url,
      status: 0,
      ok: false,
      classification,
      error: errorCode,
      elapsed_ms,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function fetchForHealth(url, signal, method) {
  return fetch(url, {
    method,
    redirect: 'follow',
    signal,
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    },
  });
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;
  const workerCount = Math.min(limit, items.length || 1);
  await Promise.all(Array.from({ length: workerCount }, async () => {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }));
  return results;
}

function pageRows(plan) {
  return (Array.isArray(plan.batch) ? plan.batch : [])
    .filter((page) => page?.path)
    .map((page) => ({
      route: page.route,
      path: page.path,
      type: page.type,
      sitemap: page.sitemap,
      policy: page.route_qa_policy?.kind,
    }));
}

async function main() {
  if (!existsSync(PLAN_PATH)) throw new Error(`plan not found: ${PLAN_PATH}`);
  const plan = JSON.parse(readFileSync(PLAN_PATH, 'utf8'));
  const pages = pageRows(plan);
  const startedAt = new Date().toISOString();
  const started = performance.now();
  const urlEntries = [];
  const pageReports = pages.map((page) => {
    const path = resolve(PROJECT_DIR, page.path);
    const content = existsSync(path) ? readFileSync(path, 'utf8') : '';
    const urls = extractUrls(content);
    const report = {
      route: page.route,
      path: page.path,
      type: page.type,
      sitemap: page.sitemap,
      policy: page.policy,
      source_count: urls.length,
      ok: 0,
      access_sensitive: 0,
      broken: 0,
      unreachable: 0,
      elapsed_ms: 0,
      sources: [],
    };
    for (const url of urls) urlEntries.push({ page: report, url });
    return report;
  });

  await mapLimit(urlEntries, CONCURRENCY, async (entry) => {
    const pageStart = performance.now();
    const result = await checkUrl(entry.url);
    entry.page.elapsed_ms += Math.round(performance.now() - pageStart);
    entry.page.sources.push(result);
    if (result.classification === 'ok') entry.page.ok += 1;
    if (result.classification === 'access-sensitive') entry.page.access_sensitive += 1;
    if (result.classification === 'broken') entry.page.broken += 1;
    if (result.classification === 'unreachable') entry.page.unreachable += 1;
    return result;
  });

  for (const page of pageReports) {
    page.elapsed_ms = Math.round(page.elapsed_ms);
    page.passed = page.broken === 0 && page.unreachable === 0;
  }

  const totals = pageReports.reduce((acc, page) => {
    acc.pages += 1;
    acc.sources += page.source_count;
    acc.ok += page.ok;
    acc.access_sensitive += page.access_sensitive;
    acc.broken += page.broken;
    acc.unreachable += page.unreachable;
    return acc;
  }, { pages: 0, sources: 0, ok: 0, access_sensitive: 0, broken: 0, unreachable: 0 });
  totals.passed = totals.broken === 0 && totals.unreachable === 0;

  const report = {
    ok: totals.passed,
    generated_at: new Date().toISOString(),
    started_at: startedAt,
    finished_at: new Date().toISOString(),
    elapsed_ms: Math.round(performance.now() - started),
    plan: PLAN_PATH,
    project_dir: PROJECT_DIR,
    concurrency: CONCURRENCY,
    timeout_ms: TIMEOUT_MS,
    domain_delay_ms: DOMAIN_DELAY_MS,
    totals,
    pages: pageReports,
  };

  if (OUT_PATH) {
    mkdirSync(dirname(OUT_PATH), { recursive: true });
    writeFileSync(OUT_PATH, `${JSON.stringify(report, null, 2)}\n`);
  }

  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    console.log(`[page-source-health] ${totals.passed ? 'ok' : 'failed'}: ${totals.sources} source URL(s), ${totals.ok} ok, ${totals.access_sensitive} access-sensitive, ${totals.broken} broken, ${totals.unreachable} unreachable in ${report.elapsed_ms}ms.`);
    if (OUT_PATH) console.log(`[page-source-health] report: ${OUT_PATH}`);
  }

  process.exit(totals.passed ? 0 : 1);
}

main().catch((error) => {
  console.error(`[page-source-health] ${error?.message ?? error}`);
  process.exit(1);
});
