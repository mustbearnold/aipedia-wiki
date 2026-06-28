#!/usr/bin/env node
// Changed-file guard for page dates, source dates, registry checks, and ledger rows.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);
const CURRENT_DATE = normalizeDateValue(valueFor('--current-date') || process.env.AIPEDIA_CURRENT_DATE || new Date().toISOString().slice(0, 10));
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const explicitFiles = valuesFor('--file').map(normalizePath);
const CHANGED_MODE = args.includes('--changed') || explicitFiles.length === 0;
const KNOWN_FLAGS = new Set(['--changed', '--current-date', '--file', '--json', '--project-dir', '--root', '--help', '-h']);
const VALUE_FLAGS = new Set(['--current-date', '--file', '--project-dir', '--root']);
const SOURCE_REGISTRY_PATH = join(PROJECT_DIR, 'src/data/source-registry.json');
const LEDGER_PATH = join(PROJECT_DIR, 'PAGE_REFRESH_LEDGER.md');
const MONTHS = new Map([
  ['january', '01'],
  ['february', '02'],
  ['march', '03'],
  ['april', '04'],
  ['may', '05'],
  ['june', '06'],
  ['july', '07'],
  ['august', '08'],
  ['september', '09'],
  ['october', '10'],
  ['november', '11'],
  ['december', '12'],
]);

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

const argumentIssues = collectArgumentIssues();
if (argumentIssues.length > 0) {
  emit({
    ok: false,
    mode: 'argument-error',
    current_date: CURRENT_DATE,
    project_dir: PROJECT_DIR,
    files_checked: 0,
    totals: emptyTotals(),
    issues: argumentIssues,
  });
  process.exit(1);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-date-consistency.mjs --changed',
    '  node scripts/audit-date-consistency.mjs --file src/content/tools/example.md --current-date 2026-06-28',
    '  node scripts/audit-date-consistency.mjs --json',
    '',
    'Checks changed website files for future dates, ledger/frontmatter drift, and source registry rows older than fact verification dates.',
  ].join('\n');
}

function valueFor(name) {
  const inlineArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) return inlineArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function valuesFor(name) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === name && args[index + 1]) values.push(args[index + 1]);
    if (arg.startsWith(`${name}=`)) values.push(arg.slice(name.length + 1));
  }
  return values.flatMap((value) => value.split(',').map((part) => part.trim()).filter(Boolean));
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
      if (!VALUE_FLAGS.has(previous)) issues.push(issue('argument-invalid', '', `unexpected argument ${arg}`));
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(issue('argument-invalid', '', `unknown flag ${name}`));
    if (VALUE_FLAGS.has(name)) {
      const value = arg.includes('=') ? arg.slice(name.length + 1) : args[index + 1] ?? '';
      if (!value || value.startsWith('-')) issues.push(issue('argument-invalid', '', `${name} requires a value`));
    }
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push(issue('argument-invalid', '', 'choose only one of --project-dir or --root'));
  }
  if (!CURRENT_DATE || !isIsoDate(CURRENT_DATE)) {
    issues.push(issue('argument-invalid', '', '--current-date must be YYYY-MM-DD'));
  }
  return issues;
}

function run(command, commandArgs) {
  const result = spawnSync(command, commandArgs, {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
  return {
    status: result.status ?? 1,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() || result.error?.message || '',
  };
}

function changedWebsiteFiles() {
  const files = new Set();
  const outputs = [
    run('git', ['diff', '--name-only', '--diff-filter=ACMRT', '--', 'src/content', 'src/pages', 'PAGE_REFRESH_LEDGER.md', 'src/data/source-registry.json']),
    run('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMRT', '--', 'src/content', 'src/pages', 'PAGE_REFRESH_LEDGER.md', 'src/data/source-registry.json']),
    run('git', ['ls-files', '--others', '--exclude-standard', '--', 'src/content', 'src/pages']),
  ];

  for (const output of outputs) {
    if (output.status !== 0) continue;
    for (const line of output.stdout.split(/\r?\n/)) {
      const file = normalizePath(line);
      if (file) files.add(file);
    }
  }

  return [...files].sort();
}

function normalizePath(path) {
  return String(path ?? '').trim().replace(/\\/g, '/');
}

function projectPath(path) {
  return relative(PROJECT_DIR, resolve(PROJECT_DIR, path)).replace(/\\/g, '/');
}

function readMarkdown(path) {
  const resolved = resolve(PROJECT_DIR, path);
  const raw = readFileSync(resolved, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { raw, body: raw, frontmatter: {}, hasFrontmatter: false };
  return {
    raw,
    body: raw.slice(match[0].length),
    frontmatter: yaml.load(match[1]) ?? {},
    hasFrontmatter: true,
  };
}

function loadSourceRegistry() {
  if (!existsSync(SOURCE_REGISTRY_PATH)) return { sources: [], byId: new Map() };
  const registry = JSON.parse(readFileSync(SOURCE_REGISTRY_PATH, 'utf8'));
  const sources = Array.isArray(registry.sources) ? registry.sources : [];
  return { sources, byId: new Map(sources.map((source) => [String(source.id ?? ''), source])) };
}

function loadLedger() {
  const bySource = new Map();
  const byPage = new Map();
  if (!existsSync(LEDGER_PATH)) return { bySource, byPage };
  for (const line of readFileSync(LEDGER_PATH, 'utf8').split(/\r?\n/)) {
    if (!line.startsWith('|')) continue;
    const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
    if (cells.length < 6 || cells[0] === '---' || cells[0] === 'Last updated') continue;
    const row = {
      last_updated: cells[0],
      page: cells[1],
      type: cells[2],
      sitemap: cells[3],
      date_source: cells[4],
      source_file: cells[5],
    };
    byPage.set(row.page, row);
    if (row.source_file) bySource.set(row.source_file, row);
  }
  return { bySource, byPage };
}

function isIsoDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value ?? ''));
}

function normalizeDateValue(value) {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').trim().replace(/^['"]|['"]$/g, '');
}

function dateGreaterThan(left, right) {
  return isIsoDate(left) && isIsoDate(right) && left > right;
}

function issue(code, file, detail, extra = {}) {
  return { code, file, detail, ...extra };
}

function emptyTotals() {
  return {
    content_files: 0,
    static_files: 0,
    source_records: 0,
    visible_dates: 0,
    ledger_rows_checked: 0,
    registry_rows_checked: 0,
  };
}

function contentRoute(file, frontmatter) {
  const name = basename(file, '.md');
  const slug = normalizePath(frontmatter.slug || name);
  if (file.startsWith('src/content/tools/')) return `/tools/${slug}/`;
  if (file.startsWith('src/content/categories/')) return `/categories/${slug}/`;
  if (file.startsWith('src/content/use-cases/')) return `/guides/${slug}/`;
  if (file.startsWith('src/content/comparisons/')) return `/compare/${slug}/`;
  if (file.startsWith('src/content/companies/')) return `/companies/${slug}/`;
  if (file.startsWith('src/content/workflows/')) return `/workflows/${slug}/`;
  if (file.startsWith('src/content/answers/')) return `/answers/${slug}/`;
  if (file.startsWith('src/content/trends/')) return `/trends/${slug}/`;
  if (file.startsWith('src/content/glossary/')) return `/glossary/${slug}/`;
  return '';
}

function staticRoute(file) {
  if (file === 'src/pages/index.astro') return '/';
  if (file === 'src/pages/llms.txt.ts') return '/llms.txt';
  if (file === 'src/pages/llms-full.txt.ts') return '/llms-full.txt';
  if (!file.startsWith('src/pages/')) return '';
  let route = file.slice('src/pages/'.length);
  route = route.replace(/\/index\.astro$/, '/');
  route = route.replace(/\.astro$/, '/');
  route = route.replace(/\.ts$/, '');
  if (route.includes('[')) return '';
  return `/${route}`.replace(/\/+/g, '/');
}

function collectSourceDateRecords(value, pointer = '', records = []) {
  if (!value || typeof value !== 'object' || value instanceof Date) return records;
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectSourceDateRecords(item, `${pointer}[${index}]`, records));
    return records;
  }

  const sourceId = value.source_id ? String(value.source_id) : '';
  const verifiedAt = normalizeDateValue(value.verified_at);
  if (sourceId || verifiedAt) {
    records.push({ pointer, source_id: sourceId, verified_at: verifiedAt });
  }
  for (const [key, child] of Object.entries(value)) {
    collectSourceDateRecords(child, pointer ? `${pointer}.${key}` : key, records);
  }
  return records;
}

function visibleVerificationDates(body) {
  const dates = [];
  const keyword = '(?:verified|rechecked|checked|updated|last verified|source checked|as of)';
  const isoPattern = new RegExp(`\\b${keyword}\\b[^\\n.]{0,140}?(\\d{4}-\\d{2}-\\d{2})\\b`, 'gi');
  const monthPattern = new RegExp(`\\b${keyword}\\b[^\\n.]{0,140}?((?:January|February|March|April|May|June|July|August|September|October|November|December)\\s+\\d{1,2},\\s+\\d{4})`, 'gi');
  for (const match of body.matchAll(isoPattern)) {
    dates.push({ text: match[1], iso: match[1] });
  }
  for (const match of body.matchAll(monthPattern)) {
    const iso = monthDateToIso(match[1]);
    if (iso) dates.push({ text: match[1], iso });
  }
  return dates;
}

function monthDateToIso(value) {
  const match = String(value).match(/^([A-Za-z]+)\s+(\d{1,2}),\s+(\d{4})$/);
  if (!match) return '';
  const month = MONTHS.get(match[1].toLowerCase());
  if (!month) return '';
  return `${match[3]}-${month}-${String(match[2]).padStart(2, '0')}`;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function checkDate(name, file, value, issues) {
  if (!value) return;
  if (!isIsoDate(value)) {
    issues.push(issue('date-format-invalid', file, `${name} must be YYYY-MM-DD`, { value }));
    return;
  }
  if (dateGreaterThan(value, CURRENT_DATE)) {
    issues.push(issue('date-in-future', file, `${name} is after current date ${CURRENT_DATE}`, { value }));
  }
}

const files = explicitFiles.length ? explicitFiles : CHANGED_MODE ? changedWebsiteFiles() : [];
const registry = loadSourceRegistry();
const ledger = loadLedger();
const issues = [];
const totals = emptyTotals();

for (const source of registry.sources) {
  const lastChecked = normalizeDateValue(source.last_checked);
  if (!lastChecked) continue;
  totals.registry_rows_checked += 1;
  if (!isIsoDate(lastChecked)) {
    issues.push(issue('registry-last-checked-invalid', 'src/data/source-registry.json', `source ${source.id} last_checked must be YYYY-MM-DD`, { source_id: source.id, value: lastChecked }));
  } else if (dateGreaterThan(lastChecked, CURRENT_DATE)) {
    issues.push(issue('registry-last-checked-future', 'src/data/source-registry.json', `source ${source.id} last_checked is after current date ${CURRENT_DATE}`, { source_id: source.id, value: lastChecked }));
  }
}

for (const file of files) {
  const resolved = resolve(PROJECT_DIR, file);
  if (!existsSync(resolved)) continue;

  if (file.startsWith('src/content/') && file.endsWith('.md')) {
    totals.content_files += 1;
    let markdown;
    try {
      markdown = readMarkdown(file);
    } catch (error) {
      issues.push(issue('frontmatter-parse-error', file, error.message));
      continue;
    }

    const frontmatter = markdown.frontmatter || {};
    const lastUpdated = normalizeDateValue(frontmatter.last_updated);
    const lastVerified = normalizeDateValue(frontmatter.last_verified);
    const pageLedgerDate = lastUpdated || lastVerified;
    const pageVerificationDate = lastVerified || lastUpdated;
    checkDate('last_updated', file, lastUpdated, issues);
    checkDate('last_verified', file, lastVerified, issues);
    if (frontmatter.type === 'tool' && !lastVerified) {
      issues.push(issue('tool-last-verified-missing', file, 'tool pages must have last_verified'));
    }

    const records = collectSourceDateRecords(frontmatter);
    totals.source_records += records.length;
    for (const record of records) {
      if (record.verified_at) checkDate(`${record.pointer}.verified_at`, file, record.verified_at, issues);
      if (!record.source_id || !record.verified_at) continue;
      const source = registry.byId.get(record.source_id);
      if (!source) continue;
      const lastChecked = normalizeDateValue(source.last_checked);
      if (!lastChecked) {
        issues.push(issue('registry-last-checked-missing', file, `${record.source_id} is missing last_checked`, { source_id: record.source_id, pointer: record.pointer }));
      } else if (isIsoDate(lastChecked) && isIsoDate(record.verified_at) && lastChecked < record.verified_at) {
        issues.push(issue('registry-last-checked-before-verified-at', file, `${record.source_id} last_checked ${lastChecked} is before ${record.pointer}.verified_at ${record.verified_at}`, { source_id: record.source_id, pointer: record.pointer }));
      }
    }

    const visibleDates = visibleVerificationDates(markdown.body);
    totals.visible_dates += visibleDates.length;
    for (const visible of visibleDates) {
      if (dateGreaterThan(visible.iso, CURRENT_DATE)) {
        issues.push(issue('visible-date-future', file, `visible date ${visible.text} is after current date ${CURRENT_DATE}`, { value: visible.iso }));
      }
      if (pageVerificationDate && dateGreaterThan(visible.iso, pageVerificationDate)) {
        issues.push(issue('visible-date-after-page-date', file, `visible date ${visible.text} is after page verification date ${pageVerificationDate}`, { value: visible.iso }));
      }
    }

    const route = contentRoute(file, frontmatter);
    const ledgerRow = ledger.bySource.get(file) || ledger.byPage.get(route);
    if (route) {
      if (!ledgerRow) {
        issues.push(issue('ledger-row-missing', file, `ledger row missing for ${route}`));
      } else {
        totals.ledger_rows_checked += 1;
        checkDate('ledger last_updated', file, ledgerRow.last_updated, issues);
        if (pageLedgerDate && ledgerRow.last_updated !== pageLedgerDate) {
          issues.push(issue('ledger-date-mismatch', file, `ledger date ${ledgerRow.last_updated} does not match page date ${pageLedgerDate}`, { route }));
        }
      }
    }
    continue;
  }

  if (file.startsWith('src/pages/')) {
    const route = staticRoute(file);
    const ledgerRow = ledger.bySource.get(file) || ledger.byPage.get(route);
    if (!ledgerRow) continue;
    totals.static_files += 1;
    totals.ledger_rows_checked += 1;
    checkDate('ledger last_updated', file, ledgerRow.last_updated, issues);
  }
}

const report = {
  ok: issues.length === 0,
  mode: explicitFiles.length ? 'explicit' : 'changed',
  generated_at: new Date().toISOString(),
  current_date: CURRENT_DATE,
  project_dir: PROJECT_DIR,
  files_checked: files.length,
  files: unique(files.map(projectPath)),
  totals,
  issues,
};

emit(report);
process.exit(report.ok ? 0 : 1);

function emit(report) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
    return;
  }
  console.log(`[audit-date-consistency] ${report.ok ? 'ok' : 'attention'}: ${report.files_checked} file(s), ${report.issues.length} issue(s).`);
  for (const item of report.issues) {
    console.log(`- ${item.code}${item.file ? ` ${item.file}` : ''}: ${item.detail}`);
  }
}
