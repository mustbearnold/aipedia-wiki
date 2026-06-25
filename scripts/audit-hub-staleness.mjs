#!/usr/bin/env node
// Ensure refreshed tool pages do not leave parent category hubs stale.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const jsonMode = args.includes('--json');
const changedMode = args.includes('--changed');
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDir = resolve(valueFor('--project-dir') || valueFor('--root') || defaultProjectDir);

function valueFor(name) {
  const inline = args.find((arg) => arg.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function runGit(commandArgs) {
  const result = spawnSync('git', commandArgs, {
    cwd: projectDir,
    encoding: 'utf8',
  });
  if (result.status !== 0) return '';
  return result.stdout ?? '';
}

function changedToolFiles() {
  const tracked = runGit(['diff', '--name-only', '--', 'src/content/tools']);
  const untracked = runGit(['ls-files', '--others', '--exclude-standard', '--', 'src/content/tools']);
  return [...new Set([...tracked.split(/\r?\n/), ...untracked.split(/\r?\n/)]
    .map((line) => line.trim())
    .filter((line) => line.endsWith('.md')))]
    .sort();
}

function explicitToolFiles() {
  const files = [];
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--file' && args[index + 1]) files.push(args[index + 1]);
    if (args[index].startsWith('--file=')) files.push(args[index].slice('--file='.length));
  }
  return files.map((file) => file.replace(/\\/g, '/'));
}

function frontmatter(file) {
  const path = resolve(projectDir, file);
  if (!existsSync(path)) return null;
  const raw = readFileSync(path, 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function scalar(fm, key) {
  const match = fm?.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  return String(match[1] ?? '').trim().replace(/^["']|["']$/g, '');
}

const files = changedMode ? changedToolFiles() : explicitToolFiles();
const issues = [];
const checked = [];

for (const file of files) {
  const toolFm = frontmatter(file);
  if (toolFm === null) {
    issues.push({ file, code: 'tool-file-missing', detail: 'tool file does not exist' });
    continue;
  }

  const slug = scalar(toolFm, 'slug') || file.split('/').pop()?.replace(/\.md$/, '') || file;
  const category = scalar(toolFm, 'category');
  const toolVerified = scalar(toolFm, 'last_verified') || scalar(toolFm, 'last_updated');

  if (!category) {
    issues.push({ file, slug, code: 'tool-category-missing', detail: 'tool has no primary category' });
    continue;
  }

  const categoryFile = `src/content/categories/${category}.md`;
  const categoryFm = frontmatter(categoryFile);
  if (categoryFm === null) {
    issues.push({
      file,
      slug,
      category,
      category_file: categoryFile,
      code: 'category-file-missing',
      detail: `parent category ${category} does not exist`,
    });
    continue;
  }

  const categoryVerified = scalar(categoryFm, 'last_verified') || scalar(categoryFm, 'last_updated');
  checked.push({ file, slug, category, category_file: categoryFile, tool_verified: toolVerified, category_verified: categoryVerified });

  if (toolVerified && (!categoryVerified || categoryVerified < toolVerified)) {
    issues.push({
      file,
      slug,
      category,
      category_file: categoryFile,
      tool_verified: toolVerified,
      category_verified: categoryVerified,
      code: 'category-stale',
      detail: `parent category ${category} is older than refreshed tool ${slug}`,
    });
  }
}

const report = {
  ok: issues.length === 0,
  mode: changedMode ? 'changed' : 'explicit',
  files_checked: files.length,
  checked,
  issues,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  console.log(`[audit-hub-staleness] OK: ${files.length} changed tool parent hub(s) checked.`);
} else {
  console.error(`[audit-hub-staleness] FAILED (${issues.length}):`);
  for (const issue of issues) {
    console.error(`  x ${issue.file}: ${issue.detail}`);
  }
}

process.exit(report.ok ? 0 : 1);
