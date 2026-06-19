#!/usr/bin/env node
// Report-only live source health and content-change monitor for AIpedia source registry.
// Default mode is offline and deterministic. Use --live for HTTP checks and --update-snapshots to refresh /tmp snapshots.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');
const DEFAULT_SNAPSHOT_DIR = '/tmp/aipedia-source-snapshots';
const KNOWN_FLAGS = new Set([
  '--json',
  '--live',
  '--update-snapshots',
  '--limit',
  '--timeout-ms',
  '--snapshot-dir',
  '--source-id',
  '--project-dir',
  '--root',
  '--help',
  '-h',
]);
const VALUE_FLAGS = new Set(['--limit', '--timeout-ms', '--snapshot-dir', '--source-id', '--project-dir', '--root']);
const NUMBER_FLAGS = new Set(['--limit', '--timeout-ms']);

const JSON_MODE = args.includes('--json');
const LIVE_MODE = args.includes('--live');
const UPDATE_SNAPSHOTS = args.includes('--update-snapshots');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const argumentIssues = collectArgumentIssues();
const LIMIT = numberArg('--limit', LIVE_MODE ? 25 : 50);
const TIMEOUT_MS = numberArg('--timeout-ms', 8000);
const SNAPSHOT_DIR = stringArg('--snapshot-dir', DEFAULT_SNAPSHOT_DIR);
const SOURCE_IDS = valuesArg('--source-id');

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(name) {
  return args.includes(name) || args.some((arg) => arg.startsWith(`${name}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!VALUE_FLAGS.has(previous)) issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) {
        issues.push({ code: 'argument-invalid', detail: `${name} requires a value` });
      } else if (NUMBER_FLAGS.has(name) && !/^\d+$/.test(value)) {
        issues.push({ code: 'argument-invalid', detail: `${name} must be a non-negative integer` });
      }
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  if (UPDATE_SNAPSHOTS && !LIVE_MODE) {
    issues.push({ code: 'argument-invalid', detail: '--update-snapshots requires --live' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-source-health.mjs --json',
    '  node scripts/audit-source-health.mjs --live --limit 10',
    '  node scripts/audit-source-health.mjs --live --update-snapshots --snapshot-dir <dir>',
    '',
    'Options:',
    '  --json                 Emit a structured report.',
    '  --live                 Fetch selected sources over HTTP.',
    '  --update-snapshots     Refresh snapshots after successful live fetches; requires --live.',
    '  --limit <count>        Limit selected sources; 0 means all selected sources.',
    '  --timeout-ms <ms>      Per-source live fetch timeout.',
    '  --snapshot-dir <dir>   Snapshot directory for live hash comparisons.',
    '  --source-id <id>       Restrict checks to a source ID; repeatable.',
    '  --project-dir <dir>    Audit another project root.',
    '  --root <dir>           Alias for --project-dir.',
  ].join('\n');
}

function emitArgumentFailure() {
  const report = {
    ok: false,
    mode: 'argument-error',
    generated_at: new Date().toISOString(),
    live: LIVE_MODE,
    update_snapshots: UPDATE_SNAPSHOTS,
    project_dir: PROJECT_DIR,
    snapshot_dir: SNAPSHOT_DIR,
    timeout_ms: TIMEOUT_MS,
    limit: LIMIT,
    argument_issues: argumentIssues,
    totals: {
      registry_sources: 0,
      sources_selected: 0,
      sources_checked_live: 0,
      http_ok: 0,
      http_unreachable: 0,
      content_changed: 0,
      content_unchanged: 0,
      missing_snapshots: 0,
      registry_issues: 0,
      duplicate_source_ids: 0,
    },
    source_registry: {
      issues: [],
      duplicate_source_ids: [],
    },
    queues: {
      unreachable_sources: [],
      changed_sources: [],
      missing_snapshots: [],
      checked_sources: [],
      selected_sources: [],
    },
  };

  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else {
    console.error('[audit-source-health] invalid arguments');
    for (const issue of argumentIssues) console.error(`- ${issue.detail}`);
  }
}

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

if (argumentIssues.length > 0) {
  emitArgumentFailure();
  process.exit(1);
}

function numberArg(name, fallback) {
  const rawValue = valueFor(name);
  if (rawValue === undefined) return fallback;
  const value = Number.parseInt(rawValue, 10);
  return Number.isFinite(value) && value >= 0 ? value : fallback;
}

function stringArg(name, fallback) {
  const value = valueFor(name);
  return value && !value.startsWith('--') ? value : fallback;
}

function valuesArg(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg.startsWith(`${name}=`)) {
      const value = arg.slice(name.length + 1);
      if (value) values.push(value);
      continue;
    }
    if (arg === name && args[index + 1] && !args[index + 1].startsWith('--')) {
      values.push(args[index + 1]);
    }
  }
  return values;
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function safeFileName(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160) || 'source';
}

function normalizeContent(content, contentType) {
  let text = String(content ?? '');
  if (/html/i.test(String(contentType ?? ''))) {
    text = text
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, ' ')
      .replace(/<!--([\s\S]*?)-->/g, ' ')
      .replace(/\s(?:nonce|integrity|crossorigin)=("[^"]*"|'[^']*'|[^\s>]+)/gi, ' ')
      .replace(/\b(?:v|ver|version|cacheBust|timestamp|ts|t)=\d{6,}/gi, '');
  }
  return text.replace(/\s+/g, ' ').trim().slice(0, 1_000_000);
}

function loadRegistry() {
  if (!existsSync(SOURCE_REGISTRY_PATH)) return { sources: [] };
  const parsed = JSON.parse(readFileSync(SOURCE_REGISTRY_PATH, 'utf8'));
  return { sources: Array.isArray(parsed.sources) ? parsed.sources : [] };
}

function priorityWeight(source) {
  const volatility = { high: 0, medium: 1, low: 2 }[source.volatility] ?? 3;
  const type = { pricing: 0, docs: 1, official: 2, status: 3, newsroom: 4, blog: 5, repository: 6, release_notes: 7, report: 8, affiliate: 9, third_party: 10 }[source.type] ?? 11;
  return volatility * 10 + type;
}

function selectSources(sources) {
  const filtered = SOURCE_IDS.length ? sources.filter((source) => SOURCE_IDS.includes(source.id)) : sources;
  return [...filtered]
    .sort((a, b) => priorityWeight(a) - priorityWeight(b) || String(a.id).localeCompare(String(b.id)))
    .slice(0, LIMIT || filtered.length);
}

function snapshotPath(source) {
  return join(SNAPSHOT_DIR, `${safeFileName(source.id)}.json`);
}

function readSnapshot(source) {
  const path = snapshotPath(source);
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function writeSnapshot(source, snapshot) {
  mkdirSync(SNAPSHOT_DIR, { recursive: true });
  writeFileSync(snapshotPath(source), `${JSON.stringify(snapshot, null, 2)}\n`);
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  const startedAt = Date.now();
  try {
    const response = await fetch(source.url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        // Use a normal browser UA rather than a bot-identifying string. Several
        // official pricing pages return synthetic 403 pages to custom monitor UAs,
        // which creates false freshness failures even though the public URL works.
        'User-Agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    });
    const contentType = response.headers.get('content-type') ?? '';
    const body = await response.text();
    const normalized = normalizeContent(body, contentType);
    const hash = sha256(normalized);
    return {
      id: source.id,
      label: source.label ?? '',
      url: source.url,
      final_url: response.url,
      type: source.type ?? '',
      volatility: source.volatility ?? '',
      status: response.status,
      ok: response.ok,
      content_type: contentType,
      normalized_length: normalized.length,
      content_hash: hash,
      elapsed_ms: Date.now() - startedAt,
      fetched_at: new Date().toISOString(),
    };
  } catch (error) {
    return {
      id: source.id,
      label: source.label ?? '',
      url: source.url,
      type: source.type ?? '',
      volatility: source.volatility ?? '',
      status: 0,
      ok: false,
      error: error?.name === 'AbortError' ? `timeout after ${TIMEOUT_MS}ms` : String(error?.message ?? error),
      elapsed_ms: Date.now() - startedAt,
      fetched_at: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

function registryIssue(source) {
  const missing = [];
  if (!source.id) missing.push('id');
  if (!source.label) missing.push('label');
  if (!/^https:\/\//.test(String(source.url ?? ''))) missing.push('url');
  if (!source.type) missing.push('type');
  if (!source.trust_tier) missing.push('trust_tier');
  if (!source.volatility) missing.push('volatility');
  return missing.length ? { id: source.id ?? '', url: source.url ?? '', missing } : null;
}

function attachSnapshotStatus(source, liveResult) {
  const previous = readSnapshot(source);
  const snapshot = liveResult.ok ? {
    id: liveResult.id,
    url: liveResult.url,
    final_url: liveResult.final_url,
    status: liveResult.status,
    content_hash: liveResult.content_hash,
    normalized_length: liveResult.normalized_length,
    fetched_at: liveResult.fetched_at,
  } : null;

  const snapshotStatus = !previous
    ? 'missing'
    : previous.content_hash === liveResult.content_hash
      ? 'unchanged'
      : 'changed';

  if (UPDATE_SNAPSHOTS && snapshot) writeSnapshot(source, snapshot);

  return {
    ...liveResult,
    snapshot_status: liveResult.ok ? snapshotStatus : 'not_checked',
    previous_fetched_at: previous?.fetched_at ?? '',
    previous_hash: previous?.content_hash ?? '',
  };
}

const registry = loadRegistry();
const selectedSources = selectSources(registry.sources);
const registryIssues = registry.sources.map(registryIssue).filter(Boolean);
const duplicateSourceIds = [...new Set(registry.sources.map((source) => source.id).filter((id, index, ids) => id && ids.indexOf(id) !== index))].sort();

const liveResults = [];
if (LIVE_MODE) {
  for (const source of selectedSources) {
    const liveResult = await fetchSource(source);
    liveResults.push(attachSnapshotStatus(source, liveResult));
  }
}

const unreachable = liveResults.filter((result) => !result.ok);
const changed = liveResults.filter((result) => result.snapshot_status === 'changed');
const missingSnapshots = liveResults.filter((result) => result.snapshot_status === 'missing');
const unchanged = liveResults.filter((result) => result.snapshot_status === 'unchanged');

const result = {
  ok: true,
  mode: 'report',
  generated_at: new Date().toISOString(),
  live: LIVE_MODE,
  update_snapshots: UPDATE_SNAPSHOTS,
  project_dir: PROJECT_DIR,
  snapshot_dir: SNAPSHOT_DIR,
  timeout_ms: TIMEOUT_MS,
  limit: LIMIT,
  argument_issues: [],
  totals: {
    registry_sources: registry.sources.length,
    sources_selected: selectedSources.length,
    sources_checked_live: liveResults.length,
    http_ok: liveResults.filter((item) => item.ok).length,
    http_unreachable: unreachable.length,
    content_changed: changed.length,
    content_unchanged: unchanged.length,
    missing_snapshots: missingSnapshots.length,
    registry_issues: registryIssues.length,
    duplicate_source_ids: duplicateSourceIds.length,
  },
  source_registry: {
    issues: registryIssues,
    duplicate_source_ids: duplicateSourceIds,
  },
  queues: {
    unreachable_sources: unreachable,
    changed_sources: changed,
    missing_snapshots: missingSnapshots,
    checked_sources: liveResults,
    selected_sources: selectedSources.map((source) => ({
      id: source.id ?? '',
      label: source.label ?? '',
      url: source.url ?? '',
      type: source.type ?? '',
      volatility: source.volatility ?? '',
      trust_tier: source.trust_tier ?? '',
    })),
  },
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  console.log('[audit-source-health] report-only source registry health monitor');
  console.log(`Registry sources: ${result.totals.registry_sources}; selected: ${result.totals.sources_selected}; live checked: ${result.totals.sources_checked_live}`);
  console.log(`Registry issues: ${result.totals.registry_issues}; duplicate IDs: ${result.totals.duplicate_source_ids}`);
  if (LIVE_MODE) {
    console.log(`HTTP OK: ${result.totals.http_ok}; unreachable: ${result.totals.http_unreachable}; changed: ${result.totals.content_changed}; missing snapshots: ${result.totals.missing_snapshots}`);
  } else {
    console.log('Run with --live to fetch selected sources and compare content hashes against /tmp snapshots.');
  }
}
