#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { buildSparseVector, cosineSparse } from './lib/agent-cpu-vector.mjs';
import {
  DEFAULT_PROJECT_DIR,
  hasFlag,
  projectPath,
  valueFor,
} from './lib/agent-workflow-utils.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const memoryPath = valueFor(args, '--memory') || valueFor(args, '--file') || 'local/tmp/agent-memory.jsonl';
const query = valueFor(args, '--query') || '';
const limit = Number(valueFor(args, '--limit') || 10);
const jsonMode = hasFlag(args, '--json');
const helpMode = hasFlag(args, '--help') || hasFlag(args, '-h');
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli && helpMode) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-memory-query.mjs --memory local/tmp/agent-memory.jsonl --query "pricing source gaps" --json',
    '',
    'Ranks JSONL memory records with the CPU lexical vector scorer.',
  ].join('\n');
}

export function queryMemory(projectDir, options = {}) {
  const memoryPath = resolve(projectDir, options.memoryPath || 'local/tmp/agent-memory.jsonl');
  const query = options.query || '';
  const limit = Number(options.limit ?? 10);
  if (!query.trim()) return { ok: false, error: 'query is required', matches: [] };
  if (!existsSync(memoryPath)) return { ok: false, error: `memory file not found: ${projectPath(projectDir, memoryPath)}`, matches: [] };

  const queryVector = buildSparseVector(query);
  const records = readJsonl(memoryPath);
  const matches = records
    .map((record) => ({
      score: cosineSparse(queryVector, record.cpu_vector ?? buildSparseVector(record.embedding_text ?? JSON.stringify(record))),
      id: record.id,
      type: record.type,
      route: record.route ?? '',
      title: record.title ?? '',
      recommended_action: record.recommended_action ?? '',
      observed_at: record.observed_at ?? '',
      record,
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.id.localeCompare(b.id))
    .slice(0, limit);

  return {
    ok: true,
    memory: projectPath(projectDir, memoryPath),
    query,
    model: queryVector.model,
    matches,
  };
}

function readJsonl(path) {
  return readFileSync(path, 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line));
}

if (isCli) {
  const report = queryMemory(projectDir, { memoryPath, query, limit });
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-memory-query] ${report.error}`);
    process.exitCode = 1;
  } else {
    for (const match of report.matches) {
      console.log(`${match.score.toFixed(3)} ${match.type} ${match.route} ${match.id}`);
    }
  }
}
