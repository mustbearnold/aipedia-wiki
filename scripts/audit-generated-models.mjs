#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const KNOWN_FLAGS = new Set(['--json', '--project-dir', '--root', '--limit', '--help', '-h']);
const VALUE_FLAGS = new Set(['--project-dir', '--root', '--limit']);

function valueFor(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || dirname(dirname(fileURLToPath(import.meta.url))));
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const LIMIT = Number(valueFor('--limit') || 0);

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

function readRegistryIds() {
  const registry = JSON.parse(readFileSync(join(PROJECT_DIR, 'src/data/source-registry.json'), 'utf8'));
  return new Set(Array.isArray(registry.sources) ? registry.sources.map((source) => source.id) : []);
}

function markdownFiles(dir) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => join(dir, name));
}

function frontmatter(raw) {
  return raw.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
}

function scalar(fm, key) {
  const match = fm.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  return String(match?.[1] || '').replace(/^[ '\"]|[ '\"]$/g, '').trim();
}

function sourceIds(fm) {
  return Array.from(fm.matchAll(/source_id:\s*([^\n#]+)/g)).map((match) => match[1].trim().replace(/^[ '\"]|[ '\"]$/g, ''));
}

function inlineSources(fm) {
  return Array.from(fm.matchAll(/^\s+source:\s*([^\n#]+)/gm)).map((match) => match[1].trim()).filter(Boolean);
}

function relative(path) {
  const normalizedPath = path.replace(/\\/g, '/');
  const normalizedRoot = PROJECT_DIR.replace(/\\/g, '/');
  return normalizedPath.replace(normalizedRoot, '').replace(/^[/\\]/, '');
}

function buildReport() {
  const registryIds = readRegistryIds();
  const files = markdownFiles(join(PROJECT_DIR, 'src/content/tools')).slice(0, LIMIT > 0 ? LIMIT : undefined);
  const unknown = [];
  const inlineOnly = [];
  const missingDecision = [];

  for (const file of files) {
    const fm = frontmatter(readFileSync(file, 'utf8'));
    const slug = scalar(fm, 'slug') || file.split(/[\\/]/).pop().replace(/\.md$/, '');

    for (const id of sourceIds(fm)) {
      if (id && !registryIds.has(id)) unknown.push({ slug, path: relative(file), source_id: id });
    }

    if (inlineSources(fm).length > 0) inlineOnly.push({ slug, path: relative(file) });
    if (!scalar(fm, 'quick_answer')) missingDecision.push({ slug, path: relative(file), field: 'quick_answer' });
  }

  return {
    ok: unknown.length === 0,
    mode: 'audit',
    project_dir: PROJECT_DIR,
    totals: { tools_scanned: files.length },
    provenance: {
      unknown_source_ids: unknown,
      inline_only_sources: inlineOnly,
    },
    decision: {
      missing_fields: missingDecision,
    },
  };
}

const issues = argumentIssues();
if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}
if (issues.length) {
  if (JSON_MODE) console.log(JSON.stringify({ ok: false, argument_issues: issues }, null, 2));
  else console.error(issues.join('\n'));
  process.exit(1);
}

const report = buildReport();
if (JSON_MODE) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`[audit-generated-models] ${report.totals.tools_scanned} tool model(s) checked.`);
  console.log(`[audit-generated-models] unknown source IDs: ${report.provenance.unknown_source_ids.length}`);
  console.log(`[audit-generated-models] inline-only sources: ${report.provenance.inline_only_sources.length}`);
}
process.exit(report.ok ? 0 : 1);
