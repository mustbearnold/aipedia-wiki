#!/usr/bin/env node
// Plan batched oldest-first tool refreshes from the freshness queue.

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = valueFor('--project-dir') || valueFor('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const JSON_MODE = args.includes('--json');
const LIMIT = numberArg('--limit', 4);
const WINDOW_DAYS = numberArg('--window-days', 30);
const HELP_MODE = args.includes('--help') || args.includes('-h');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/tool-refresh-batch.mjs --limit 4',
    '  node scripts/tool-refresh-batch.mjs --limit 6 --json',
    '',
    'Options:',
    '  --limit <n>          Number of tool pages to include. Default: 4.',
    '  --window-days <n>    Freshness queue window. Default: 30.',
    '  --json               Emit structured JSON.',
    '  --project-dir <dir>  Audit another project root.',
    '  --root <dir>         Alias for --project-dir.',
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
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

function projectPath(path) {
  return relative(PROJECT_DIR, path).replace(/\\/g, '/');
}

function stripYamlQuotes(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return '';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function scalar(frontmatter, key) {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  const value = stripYamlQuotes(match[1]);
  if (value === '[]' || value === '{}') return '';
  return value;
}

function readToolMeta(relativePath) {
  const path = join(PROJECT_DIR, relativePath);
  if (!existsSync(path)) return {};
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match?.[1] ?? '';
  return {
    category: scalar(frontmatter, 'category'),
    last_verified: scalar(frontmatter, 'last_verified'),
    last_updated: scalar(frontmatter, 'last_updated'),
  };
}

function freshnessReport() {
  const scriptPath = join(PROJECT_DIR, 'scripts', 'audit-freshness-queue.mjs');
  const output = execFileSync(
    process.execPath,
    [scriptPath, '--json', '--window-days', String(WINDOW_DAYS), '--project-dir', PROJECT_DIR],
    { cwd: PROJECT_DIR, encoding: 'utf8' },
  );
  return JSON.parse(output);
}

function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

function buildBatch(report) {
  const bySlug = new Map();
  const queue = report.queues?.top_review_queue ?? [];

  for (const item of queue) {
    if (!item.slug || !item.path) continue;
    if (!bySlug.has(item.slug)) {
      const meta = readToolMeta(item.path);
      bySlug.set(item.slug, {
        slug: item.slug,
        title: item.title || item.slug,
        path: item.path,
        route: `/tools/${item.slug}/`,
        category: meta.category || '',
        category_route: meta.category ? `/categories/${meta.category}/` : '',
        last_verified: meta.last_verified || '',
        last_updated: meta.last_updated || '',
        due_in_days: item.due_in_days,
        comparison_mentions: item.comparison_mentions ?? 0,
        facts: [],
        source_ids: [],
      });
    }

    const entry = bySlug.get(item.slug);
    addUnique(entry.facts, item.key);
    addUnique(entry.source_ids, item.source_id);
    entry.due_in_days = Math.min(entry.due_in_days ?? item.due_in_days, item.due_in_days ?? entry.due_in_days);
    entry.comparison_mentions = Math.max(entry.comparison_mentions, item.comparison_mentions ?? 0);
  }

  return [...bySlug.values()].slice(0, LIMIT);
}

function buildCommands(batch) {
  const toolFiles = batch.map((tool) => tool.path);
  const routes = [];
  for (const tool of batch) {
    addUnique(routes, tool.route);
    addUnique(routes, tool.category_route);
  }
  addUnique(routes, '/tools/');
  addUnique(routes, '/categories/');

  return {
    per_tool_quality: batch.map(
      (tool) => `npm run audit:tool-quality -- --file ${tool.path.replace(/\//g, '\\')}`,
    ),
    batch_fast_check: [
      'npm run ledger:pages',
      `npm run tool:refresh:batch:check -- ${toolFiles.map((file) => `--file ${file.replace(/\//g, '\\')}`).join(' ')}`,
    ],
    batch_close: [
      'npm run ledger:pages',
      `npm run tool:refresh:batch:check -- ${toolFiles.map((file) => `--file ${file.replace(/\//g, '\\')}`).join(' ')}`,
      'npm run typecheck',
      'npm run build:fast',
      `npm run qa:route -- ${routes.map((route) => `--route ${route}`).join(' ')} --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`,
    ],
    routes,
    tool_files: toolFiles,
  };
}

const report = freshnessReport();
const batch = buildBatch(report);
const commands = buildCommands(batch);
const result = {
  ok: report.ok,
  generated_at: new Date().toISOString(),
  project_dir: PROJECT_DIR,
  limit: LIMIT,
  window_days: WINDOW_DAYS,
  totals: report.totals,
  batch,
  commands,
  protocol: [
    'Verify current sources for every tool in the batch before editing.',
    'Update tool pages, affected parent hubs, source registry rows, and PAGE_REFRESH_LEDGER.md together.',
    'Run per-tool quality checks while editing.',
    'Run npm run tool:refresh:batch:check after ledger generation, then one expensive typecheck/build/route-QA closeout for the batch.',
    'If one tool blocks on source access, remove it from the batch and continue with the rest.',
  ],
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} else {
  console.log(`Tool refresh batch (${batch.length} tool${batch.length === 1 ? '' : 's'}):`);
  for (const [index, tool] of batch.entries()) {
    const facts = tool.facts.length ? tool.facts.join(', ') : 'no due facts listed';
    const sources = tool.source_ids.length ? tool.source_ids.join(', ') : 'no source ids listed';
    console.log(`${index + 1}. ${tool.title} (${tool.slug})`);
    console.log(`   path: ${projectPath(join(PROJECT_DIR, tool.path))}`);
    console.log(`   route: ${tool.route}`);
    if (tool.category_route) console.log(`   parent: ${tool.category_route}`);
    console.log(`   facts: ${facts}`);
    console.log(`   sources: ${sources}`);
  }

  console.log('\nBatch closeout commands:');
  for (const command of commands.batch_close) console.log(`- ${command}`);
}
