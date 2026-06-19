#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative as pathRelative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as parseYaml } from 'js-yaml';
import { build as bundleModule } from 'esbuild';

const args = process.argv.slice(2);
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--limit', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--limit']);

function valueFor(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const SCRIPT_PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || SCRIPT_PROJECT_DIR);
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const LIMIT = Number(valueFor('--limit') || 0);
const REQUIRED_SEARCH_FIELDS = ['kind', 'kindLabel', 'slug', 'title', 'href', 'detail', 'meta', 'badge', 'priority', 'search'];
const REQUIRED_TIER1_DECISION_FIELDS = [
  { field: 'quick_answer', modelPath: 'decision.verdict' },
  { field: 'best_for', modelPath: 'decision.buy_if' },
  { field: 'not_best_for', modelPath: 'decision.skip_if' },
];
const INACTIVE_TOOL_STATUSES = new Set(['dead', 'retired', 'acquired']);

function flagName(arg) {
  const index = arg.indexOf('=');
  return index >= 0 ? arg.slice(0, index) : arg;
}

function argumentIssues() {
  const issues = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] || '';
      if (!VALUE_FLAGS.has(previous)) issues.push(`unexpected argument ${arg}`);
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push(`unknown flag ${name}`);
    if (VALUE_FLAGS.has(name) && !arg.includes('=')) index += 1;
  }

  if (!Number.isFinite(LIMIT) || LIMIT < 0) issues.push(`invalid --limit ${valueFor('--limit')}`);
  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-generated-models.mjs --json',
    '  node scripts/audit-generated-models.mjs --limit 10',
  ].join('\n');
}

function readJson(path, fallback) {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf8'));
}

function readRegistryIds() {
  const registry = readJson(join(PROJECT_DIR, 'src/data/source-registry.json'), { sources: [] });
  return new Set(Array.isArray(registry.sources) ? registry.sources.map((source) => source.id).filter(Boolean) : []);
}

function readTier1Slugs() {
  const priority = readJson(join(PROJECT_DIR, 'src/data/tool-priority.json'), { tier1: [] });
  return new Set(Array.isArray(priority.tier1) ? priority.tier1.map(String).filter(Boolean) : []);
}

async function importBundledModule(entryPoint) {
  const sourceRegistryPath = join(PROJECT_DIR, 'src/data/source-registry.json');
  const bundled = await bundleModule({
    entryPoints: [entryPoint],
    bundle: true,
    format: 'esm',
    platform: 'node',
    write: false,
    loader: { '.json': 'json' },
    plugins: [
      {
        name: 'project-source-registry',
        setup(build) {
          build.onResolve({ filter: /source-registry\.json$/ }, () => ({ path: sourceRegistryPath }));
        },
      },
    ],
  });
  return import(`data:text/javascript;base64,${Buffer.from(bundled.outputFiles[0].text).toString('base64')}`);
}

async function loadProjectModelModules() {
  const [toolPageModel, searchCatalog] = await Promise.all([
    importBundledModule(join(SCRIPT_PROJECT_DIR, 'src/lib/content-models/tool-page-model.ts')),
    importBundledModule(join(SCRIPT_PROJECT_DIR, 'src/lib/search-catalog.ts')),
  ]);
  return {
    buildToolPageModel: toolPageModel.buildToolPageModel,
    buildSearchCatalog: searchCatalog.buildSearchCatalog,
  };
}

function markdownFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => join(dir, name));
}

function frontmatter(raw) {
  return raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
}

function parseFrontmatter(raw) {
  const parsed = parseYaml(frontmatter(raw)) ?? {};
  return isRecord(parsed) ? parsed : {};
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function stringField(value) {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}


function relative(path) {
  return pathRelative(PROJECT_DIR, path).replace(/\\/g, '/');
}


function isActiveToolStatus(status) {
  return !INACTIVE_TOOL_STATUSES.has(String(status ?? 'active'));
}


function collectSourceFindings(value, registryIds, slug, filePath, findings, path = '') {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectSourceFindings(item, registryIds, slug, filePath, findings, `${path}.${index}`.replace(/^\./, '')));
    return;
  }

  if (!isRecord(value)) return;

  const hasSourceCarrierKey = 'source_id' in value || 'source' in value || 'source_label' in value || ('label' in value && 'url' in value);
  const sourceId = stringField(value.source_id);
  const sourceUrl = hasSourceCarrierKey ? (stringField(value.source) ?? stringField(value.url)) : undefined;
  const sourceLabel = stringField(value.source_label) ?? stringField(value.label) ?? sourceUrl;
  if (sourceId && !registryIds.has(sourceId)) {
    findings.unknown.push({ slug, path: relative(filePath), source_id: sourceId, field: `${path}.source_id`.replace(/^\./, '') });
  } else if (!sourceId && sourceUrl && sourceLabel) {
    findings.inlineOnlyPaths.add(relative(filePath));
  }

  for (const [key, child] of Object.entries(value)) {
    collectSourceFindings(child, registryIds, slug, filePath, findings, `${path}.${key}`.replace(/^\./, ''));
  }
}


function fieldIsMissing(item, field) {
  if (!(field in item)) return true;
  const value = item[field];
  if (field === 'priority') return typeof value !== 'number' || !Number.isFinite(value);
  if (field === 'badge') return typeof value !== 'string';
  if (typeof value === 'string') return value.trim().length === 0;
  return value == null;
}

function validateSearchCatalogItem(item, slug, filePath) {
  return REQUIRED_SEARCH_FIELDS
    .filter((field) => fieldIsMissing(item, field))
    .map((field) => ({ slug, path: relative(filePath), field }));
}

function validateTier1DecisionModel(model, slug, filePath) {
  const diagnostics = Array.isArray(model.diagnostics) ? model.diagnostics : [];
  const missingQuickAnswer = diagnostics.some((issue) => issue.code === 'missing_decision_field' && issue.path === 'quick_answer');
  const missing = [];
  if (missingQuickAnswer || !stringField(model.decision?.verdict)) missing.push(REQUIRED_TIER1_DECISION_FIELDS[0]);
  if (!model.decision?.buy_if?.length) missing.push(REQUIRED_TIER1_DECISION_FIELDS[1]);
  if (!model.decision?.skip_if?.length) missing.push(REQUIRED_TIER1_DECISION_FIELDS[2]);
  return missing.map((issue) => ({ slug, path: relative(filePath), field: issue.field, model_path: issue.modelPath }));
}

async function buildReport() {
  const registryIds = readRegistryIds();
  const tier1Slugs = readTier1Slugs();
  const { buildToolPageModel, buildSearchCatalog } = await loadProjectModelModules();
  const files = markdownFiles(join(PROJECT_DIR, 'src/content/tools')).slice(0, LIMIT > 0 ? LIMIT : undefined);
  const findings = {
    unknown: [],
    inlineOnlyPaths: new Set(),
  };
  const missingDecision = [];
  const missingSearchFields = [];

  for (const file of files) {
    const data = parseFrontmatter(readFileSync(file, 'utf8'));
    const slug = stringField(data.slug) ?? file.split(/[\\/]/).pop().replace(/\.md$/, '');
    const model = buildToolPageModel(data);
    collectSourceFindings(data, registryIds, slug, file, findings);

    if (tier1Slugs.has(slug)) {
      missingDecision.push(...validateTier1DecisionModel(model, slug, file));
    }
    if ((stringField(data.type) ?? 'tool') === 'tool' && isActiveToolStatus(data.status)) {
      const searchItems = buildSearchCatalog({
        tools: [{ id: slug, data }],
        comparisons: [],
        categories: [],
        guides: [],
        news: [],
        workflows: [],
        trends: [],
        companies: [],
        logos: {},
      });
      const searchItem = searchItems.find((item) => item.kind === 'tool' && item.slug === slug) ?? {};
      missingSearchFields.push(...validateSearchCatalogItem(searchItem, slug, file));
    }
  }

  const inlineOnly = Array.from(findings.inlineOnlyPaths).sort().map((path) => ({
    slug: path.split('/').pop().replace(/\.md$/, ''),
    path,
  }));
  const ok = findings.unknown.length === 0 && missingDecision.length === 0 && missingSearchFields.length === 0;

  return {
    ok,
    status: ok ? 'pass' : 'fail',
    mode: 'audit',
    project_dir: PROJECT_DIR,
    totals: { tools_scanned: files.length },
    provenance: {
      unknown_source_ids: findings.unknown,
      inline_only_sources: inlineOnly,
    },
    decision: {
      required_tier: 'tier1',
      required_fields: REQUIRED_TIER1_DECISION_FIELDS.map((field) => field.field),
      missing_fields: missingDecision,
    },
    search_catalog: {
      required_fields: REQUIRED_SEARCH_FIELDS,
      missing_fields: missingSearchFields,
    },
  };
}

const issues = argumentIssues();
if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}
if (issues.length) {
  if (JSON_MODE) console.log(JSON.stringify({ ok: false, status: 'fail', argument_issues: issues }, null, 2));
  else console.error(issues.join('\n'));
  process.exit(1);
}

const report = await buildReport();
if (JSON_MODE) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`[audit-generated-models] ${report.totals.tools_scanned} tool model(s) checked.`);
  console.log(`[audit-generated-models] unknown source IDs: ${report.provenance.unknown_source_ids.length}`);
  console.log(`[audit-generated-models] inline-only sources: ${report.provenance.inline_only_sources.length}`);
  console.log(`[audit-generated-models] missing Tier-1 decision fields: ${report.decision.missing_fields.length}`);
  console.log(`[audit-generated-models] missing search catalog fields: ${report.search_catalog.missing_fields.length}`);
}
process.exit(report.ok ? 0 : 1);
