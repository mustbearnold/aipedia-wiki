#!/usr/bin/env node
// Fast gate for batched tool refreshes. It intentionally skips build, typecheck,
// and route QA so editors can validate a grouped content batch before the final
// expensive closeout.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const PROJECT_DIR = resolve(valueFor('--project-dir') || valueFor('--root') || dirname(dirname(fileURLToPath(import.meta.url))));
const JSON_MODE = args.includes('--json');
const HELP_MODE = args.includes('--help') || args.includes('-h');
const NPM = process.platform === 'win32' ? 'npm.cmd' : 'npm';

if (HELP_MODE) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/tool-refresh-batch-check.mjs',
    '  node scripts/tool-refresh-batch-check.mjs --file src/content/tools/qwen.md --file src/content/tools/hailuo.md',
    '  node scripts/tool-refresh-batch-check.mjs --plan .agent/tool-refresh-batch.json',
    '  node scripts/tool-refresh-batch-check.mjs --files-from .agent/tool-refresh-batch.json',
    '  node scripts/tool-refresh-batch-check.mjs --json',
    '',
    'Runs per-tool quality checks plus changed frontmatter parsing, changed provenance, freshness, ledger check, em-dash guard, and git diff check.',
    'It does not run typecheck, build, or route QA. Use the batch planner closeout for those.',
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

function filesFromPlan(planPath) {
  if (!planPath) return [];
  const resolved = resolve(PROJECT_DIR, planPath);
  if (!existsSync(resolved)) {
    return { error: `${planPath}: plan file not found` };
  }

  let parsed;
  try {
    parsed = JSON.parse(readFileSync(resolved, 'utf8'));
  } catch (error) {
    return { error: `${planPath}: could not parse JSON (${error.message})` };
  }

  const commandFiles = parsed?.commands?.tool_files;
  if (Array.isArray(commandFiles) && commandFiles.length) {
    return commandFiles.map((file) => String(file).replace(/\\/g, '/'));
  }

  const batchFiles = parsed?.batch;
  if (Array.isArray(batchFiles) && batchFiles.length) {
    return batchFiles
      .map((item) => item?.path)
      .filter(Boolean)
      .map((file) => String(file).replace(/\\/g, '/'));
  }

  return { error: `${planPath}: expected commands.tool_files or batch[].path` };
}

function projectPath(path) {
  return relative(PROJECT_DIR, resolve(PROJECT_DIR, path)).replace(/\\/g, '/');
}

function run(command, commandArgs, options = {}) {
  const start = Date.now();
  const result = spawnSync(command, commandArgs, {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
    shell: process.platform === 'win32' && command.endsWith('.cmd'),
    ...options,
  });
  const entry = {
    command: [command, ...commandArgs].join(' '),
    status: result.status ?? 1,
    duration_ms: Date.now() - start,
    stdout: result.stdout?.trim() ?? '',
    stderr: result.stderr?.trim() || result.error?.message || '',
  };
  return entry;
}

function changedToolFiles() {
  const tracked = run('git', ['diff', '--name-only', '--', 'src/content/tools']);
  const untracked = run('git', ['ls-files', '--others', '--exclude-standard', '--', 'src/content/tools']);
  const files = new Set();
  for (const output of [tracked.stdout, untracked.stdout]) {
    for (const line of output.split(/\r?\n/)) {
      const file = line.trim();
      if (file.endsWith('.md')) files.add(file.replace(/\\/g, '/'));
    }
  }
  return [...files].sort();
}

const planArg = valueFor('--plan') || valueFor('--files-from');
const planFilesResult = filesFromPlan(planArg);
const planFailures = planFilesResult?.error ? [planFilesResult.error] : [];
const explicitFiles = valuesFor('--file').map((file) => file.replace(/\\/g, '/'));
const planFiles = Array.isArray(planFilesResult) ? planFilesResult : [];
const toolFiles = planFiles.length ? planFiles : explicitFiles.length ? explicitFiles : changedToolFiles();
const missingFiles = toolFiles.filter((file) => !existsSync(resolve(PROJECT_DIR, file)));
const commands = [];

if (planFailures.length || missingFiles.length) {
  const result = {
    ok: false,
    project_dir: PROJECT_DIR,
    tool_files: toolFiles,
    failures: [
      ...planFailures,
      ...missingFiles.map((file) => `${file}: file not found`),
    ],
    commands,
  };
  finish(result);
}

for (const file of toolFiles) {
  commands.push(run(NPM, ['run', 'audit:tool-quality', '--', '--file', file]));
}

commands.push(run(process.execPath, ['scripts/check-frontmatter.mjs', '--changed']));
commands.push(run(NPM, ['run', 'audit:provenance:changed', '--', '--json']));
commands.push(run(NPM, ['run', 'loop:freshness', '--', '--json']));
commands.push(run(NPM, ['run', 'ledger:pages:check']));
commands.push(run(process.execPath, ['scripts/guard-em-dashes.mjs']));
commands.push(run('git', ['diff', '--check']));

const failures = commands
  .filter((command) => command.status !== 0)
  .map((command) => `${command.command} exited ${command.status}`);

finish({
  ok: failures.length === 0,
  project_dir: PROJECT_DIR,
  tool_files: toolFiles.map(projectPath),
  command_count: commands.length,
  failures,
  commands,
});

function finish(result) {
  if (JSON_MODE) {
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } else {
    console.log(`Tool refresh batch check: ${result.ok ? 'ok' : 'attention'}`);
    if (result.tool_files?.length) {
      console.log('Tool files:');
      for (const file of result.tool_files) console.log(`- ${file}`);
    }
    if (result.failures?.length) {
      console.log('Failures:');
      for (const failure of result.failures) console.log(`- ${failure}`);
    }
    for (const command of result.commands ?? []) {
      console.log(`${command.status === 0 ? 'ok' : 'fail'} ${command.duration_ms}ms ${command.command}`);
    }
  }
  process.exit(result.ok ? 0 : 1);
}
