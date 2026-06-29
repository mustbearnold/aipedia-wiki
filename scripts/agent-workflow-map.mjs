#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const root = resolve(valueFor('--root') || dirname(dirname(fileURLToPath(import.meta.url))));
const json = args.includes('--json');

const collectionDirs = [
  'tools',
  'categories',
  'comparisons',
  'use-cases',
  'news',
  'companies',
  'dead',
  'glossary',
  'reports',
  'workflows',
];

const packageJson = readJson(join(root, 'package.json')) ?? {};
const scripts = packageJson.scripts ?? {};

const report = {
  root,
  package_manager: existsSync(join(root, 'package-lock.json')) ? 'npm' : 'unknown',
  node_engine: packageJson.engines?.node ?? null,
  content_collections: Object.fromEntries(
    collectionDirs.map((name) => [name, countMarkdown(join(root, 'src/content', name))]),
  ),
  npm_scripts: {
    total: Object.keys(scripts).length,
    verification: pickScripts(scripts, ['check', 'lint', 'typecheck', 'audit', 'guard', 'qa', 'test', 'build']),
    workflows: pickScripts(scripts, ['runner', 'loop', 'tool:refresh', 'page:refresh', 'affiliate']),
  },
  workflows: listDirs(join(root, 'workflows')),
  skills: listDirs(join(root, 'skills')),
  canonical_docs: [
    'AGENTS.md',
    'INDEX.md',
    '.agent/CURRENT_STATUS.md',
    '.agent/PROJECT_MAP.md',
    '.agent/OPERATING_RULES.md',
    'docs/agent-audit.md',
    'docs/aipedia-agent-workflows.md',
    'docs/codex-operating-manual.md',
    'docs/page-quality-scoring.md',
  ].filter((path) => existsSync(join(root, path))),
  high_risk_files: [
    'PAGE_REFRESH_LEDGER.md',
    'src/data/source-registry.json',
    'src/content.config.ts',
    'src/layouts/ToolLayout.astro',
    'src/components/CommercialCTA.astro',
    'tools/aipedia-runner/src/main.rs',
  ].filter((path) => existsSync(join(root, path))),
};

if (json) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`AiPedia workflow map for ${relative(process.cwd(), root) || '.'}`);
  console.log(`Package manager: ${report.package_manager}`);
  console.log(`Node engine: ${report.node_engine ?? 'not declared'}`);
  console.log('Content collections:');
  for (const [name, count] of Object.entries(report.content_collections)) {
    console.log(`  ${name}: ${count}`);
  }
  console.log(`Workflows: ${report.workflows.join(', ') || 'none'}`);
  console.log(`Skills: ${report.skills.join(', ') || 'none'}`);
  console.log(`Npm scripts: ${report.npm_scripts.total}`);
}

function valueFor(flag) {
  const index = args.indexOf(flag);
  if (index >= 0) return args[index + 1] ?? '';
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  return inline ? inline.slice(flag.length + 1) : '';
}

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

function listDirs(path) {
  if (!existsSync(path)) return [];
  return readdirSync(path)
    .filter((name) => {
      const fullPath = join(path, name);
      return statSync(fullPath).isDirectory();
    })
    .sort();
}

function countMarkdown(path) {
  if (!existsSync(path)) return 0;
  let count = 0;
  for (const entry of readdirSync(path, { withFileTypes: true })) {
    const fullPath = join(path, entry.name);
    if (entry.isDirectory()) {
      count += countMarkdown(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      count += 1;
    }
  }
  return count;
}

function pickScripts(scripts, prefixes) {
  return Object.keys(scripts)
    .filter((name) => prefixes.some((prefix) => name === prefix || name.startsWith(`${prefix}:`)))
    .sort();
}
