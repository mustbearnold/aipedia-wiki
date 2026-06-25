#!/usr/bin/env node
// Fast YAML frontmatter parser for changed content files. This catches malformed
// markdown metadata before the slower Astro typecheck/build closeout.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || dirname(dirname(fileURLToPath(import.meta.url))));
const JSON_MODE = args.includes('--json');
const CHANGED_MODE = args.includes('--changed') || valuesFor('--file').length === 0;
const HELP_MODE = args.includes('--help') || args.includes('-h');

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/check-frontmatter.mjs --changed',
    '  node scripts/check-frontmatter.mjs --file src/content/tools/claude-design.md',
    '  node scripts/check-frontmatter.mjs --json --changed',
    '',
    'Parses YAML frontmatter in changed markdown content files or explicit files.',
  ].join('\n');
}

function valueFor(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
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
  return values;
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

function projectPath(path) {
  return relative(PROJECT_DIR, resolve(PROJECT_DIR, path)).replace(/\\/g, '/');
}

function changedMarkdownFiles() {
  const tracked = run('git', ['diff', '--name-only', '--', 'src/content']);
  const staged = run('git', ['diff', '--cached', '--name-only', '--', 'src/content']);
  const untracked = run('git', ['ls-files', '--others', '--exclude-standard', '--', 'src/content']);
  const files = new Set();

  for (const output of [tracked.stdout, staged.stdout, untracked.stdout]) {
    for (const line of output.split(/\r?\n/)) {
      const file = line.trim();
      if (file.endsWith('.md')) files.add(file.replace(/\\/g, '/'));
    }
  }

  return [...files].sort();
}

function parseFile(file) {
  const resolved = resolve(PROJECT_DIR, file);
  if (!existsSync(resolved)) {
    return { file: projectPath(file), ok: false, error: 'file not found' };
  }

  const raw = readFileSync(resolved, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    return { file: projectPath(file), ok: true, frontmatter: false };
  }

  try {
    const parsed = yaml.load(match[1]) ?? {};
    return {
      file: projectPath(file),
      ok: true,
      frontmatter: true,
      keys: typeof parsed === 'object' && !Array.isArray(parsed) ? Object.keys(parsed).length : 0,
    };
  } catch (error) {
    return {
      file: projectPath(file),
      ok: false,
      frontmatter: true,
      error: error.message,
      line: error.mark?.line !== undefined ? error.mark.line + 1 : undefined,
      column: error.mark?.column !== undefined ? error.mark.column + 1 : undefined,
    };
  }
}

const explicitFiles = valuesFor('--file').map((file) => file.replace(/\\/g, '/'));
const files = explicitFiles.length ? explicitFiles : CHANGED_MODE ? changedMarkdownFiles() : [];
const results = files.map(parseFile);
const failures = results.filter((result) => !result.ok);
const report = {
  ok: failures.length === 0,
  project_dir: PROJECT_DIR,
  mode: explicitFiles.length ? 'explicit' : 'changed',
  files_checked: results.length,
  failures,
  files: results,
};

if (JSON_MODE) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else {
  console.log(`Frontmatter check: ${report.ok ? 'ok' : 'attention'}`);
  console.log(`Files checked: ${report.files_checked}`);
  for (const failure of failures) {
    const location = failure.line ? `:${failure.line}${failure.column ? `:${failure.column}` : ''}` : '';
    console.log(`- ${failure.file}${location}: ${failure.error}`);
  }
}

process.exit(report.ok ? 0 : 1);
