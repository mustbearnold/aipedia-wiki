#!/usr/bin/env node
// Canonical agent-plan wrapper: write the Rust DAG contract, then validate it.

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDir = resolve(repoRoot, valueFor('--project-dir') || '.');
const outPath = valueFor('--out') || 'local/tmp/aipedia-runner/agent-dag/agent-task-graph.json';
const validationOut = valueFor('--validation-out');
const dryRun = hasFlag('--dry-run');
const assumeWritten = process.env.AIPEDIA_AGENT_PLAN_ASSUME_WRITTEN === '1';

const runnerArgs = stripWrapperArgs(args);

if (!assumeWritten) {
  const result = spawnSync(
    'cargo',
    ['run', '--manifest-path', 'tools/aipedia-runner/Cargo.toml', '--', 'agent-plan', ...runnerArgs],
    {
      cwd: repoRoot,
      encoding: 'utf8',
    },
  );
  relay(result);
  if (result.status !== 0) process.exit(result.status ?? 1);
} else {
  process.stderr.write('[runner-agent-plan] assume-written mode: skipped Rust writer.\n');
}

if (dryRun) {
  process.stderr.write('[runner-agent-plan] dry-run mode: DAG validation skipped because no graph file was written.\n');
  process.exit(0);
}

const checkArgs = [
  'scripts/agent-task-dag-check.mjs',
  '--project-dir',
  projectDir,
  '--path',
  outPath,
  '--json',
];
const check = spawnSync(process.execPath, checkArgs, {
  cwd: repoRoot,
  encoding: 'utf8',
});

relay(check);
if (validationOut) writeValidationReport(validationOut, check.stdout);
process.exit(check.status ?? 1);

function stripWrapperArgs(input) {
  const output = [];
  for (let index = 0; index < input.length; index += 1) {
    const arg = input[index];
    if (arg === '--validation-out') {
      index += 1;
      continue;
    }
    if (arg.startsWith('--validation-out=')) continue;
    output.push(arg);
  }
  return output;
}

function writeValidationReport(path, content) {
  const resolved = resolve(projectDir, path);
  mkdirSync(dirname(resolved), { recursive: true });
  writeFileSync(resolved, content.endsWith('\n') ? content : `${content}\n`);
}

function relay(result) {
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
}

function valueFor(flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('-')) return undefined;
  return value;
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}
