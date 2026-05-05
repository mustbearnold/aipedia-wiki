#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const PACKAGE_PATH = join(PROJECT_DIR, 'package.json');
const DOC_PATHS = ['AGENTS.md', 'README.md'].map((path) => join(PROJECT_DIR, path));
const jsonMode = process.argv.includes('--json');
const OPTIONAL_LOCAL_SCRIPT_PATHS = new Set([
  'scripts/indexnow-ping.mjs',
  'tools/project-kg/bin/project-kg',
]);

function readIfExists(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function unique(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b));
}

const pkg = JSON.parse(readFileSync(PACKAGE_PATH, 'utf8'));
const scripts = pkg.scripts ?? {};

const documentedNpmScripts = [];
for (const docPath of DOC_PATHS) {
  const text = readIfExists(docPath);
  const matches = text.matchAll(/\bnpm\s+run\s+([A-Za-z0-9:_-]+)/g);
  for (const match of matches) documentedNpmScripts.push(match[1]);
}

const missingNpmScripts = unique(documentedNpmScripts).filter((script) => !scripts[script]);

const referencedScriptPaths = [];
for (const command of Object.values(scripts)) {
  if (typeof command !== 'string') continue;
  const matches = command.matchAll(/\bnode\s+((?!(?:-e|-p|--))[A-Za-z0-9_./-]+(?:\.mjs|\.js|\/project-kg)?)/g);
  for (const match of matches) {
    const scriptPath = match[1];
    if (scriptPath.startsWith('node_modules/')) continue;
    if (scriptPath.startsWith('./node_modules/')) continue;
    if (scriptPath.includes('/node_modules/')) continue;
    if (scriptPath.startsWith('scripts/') || scriptPath.startsWith('tools/')) {
      referencedScriptPaths.push(scriptPath);
    }
  }
}

const missingScriptPaths = unique(referencedScriptPaths).filter(
  (scriptPath) => !OPTIONAL_LOCAL_SCRIPT_PATHS.has(scriptPath) && !existsSync(join(PROJECT_DIR, scriptPath)),
);

const report = {
  ok: missingNpmScripts.length === 0 && missingScriptPaths.length === 0,
  documented_npm_scripts: unique(documentedNpmScripts),
  missing_npm_scripts: missingNpmScripts,
  referenced_script_paths: unique(referencedScriptPaths),
  optional_local_script_paths: unique([...OPTIONAL_LOCAL_SCRIPT_PATHS]),
  missing_script_paths: missingScriptPaths,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  console.log(`[audit-command-surface] ✓ ${report.documented_npm_scripts.length} documented npm scripts and ${report.referenced_script_paths.length} script paths resolve.`);
} else {
  console.error('[audit-command-surface] command surface drift detected');
  if (missingNpmScripts.length) console.error(`Missing npm scripts: ${missingNpmScripts.join(', ')}`);
  if (missingScriptPaths.length) console.error(`Missing script paths: ${missingScriptPaths.join(', ')}`);
}

process.exit(report.ok ? 0 : 1);
