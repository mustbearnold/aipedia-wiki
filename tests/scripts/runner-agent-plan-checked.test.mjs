import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runChecked(args, options = {}) {
  return spawnSync(process.execPath, ['scripts/runner-agent-plan-checked.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: {
      ...process.env,
      AIPEDIA_AGENT_PLAN_ASSUME_WRITTEN: '1',
      ...(options.env || {}),
    },
  });
}

function writeJson(path, value) {
  mkdirSync(join(path, '..'), { recursive: true });
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function validDag(overrides = {}) {
  return {
    schema_version: 'aipedia.agent-task-dag.v1',
    mode: 'agent-task-dag',
    generated_at: '2026-06-30T08:00:00Z',
    current_date: '2026-06-30',
    route: '/tools/example/',
    graph_contract: {
      execution_status: 'contract_only',
      required_node_fields: ['id', 'permissions', 'artifacts', 'validators', 'receipt_hooks'],
      required_receipt_hooks: ['dag-node', 'node-output', 'node-validation'],
    },
    nodes: [
      node('evidence'),
      node('impact'),
      node('score'),
      node('memory_record', {
        phase: 'join',
        depends_on: ['evidence', 'impact', 'score'],
        permissions: {
          filesystem: 'write-local',
          network: 'none',
          writes: ['local/tmp/agent-memory.jsonl'],
        },
        artifacts: [
          { role: 'output', kind: 'jsonl-receipt', path: 'local/tmp/agent-memory.jsonl' },
        ],
      }),
    ],
    ...overrides,
  };
}

function node(id, overrides = {}) {
  return {
    id,
    label: `${id} node`,
    phase: 'parallel',
    kind: 'command',
    depends_on: [],
    permissions: {
      filesystem: 'read',
      network: 'none',
      writes: [],
    },
    command: {
      bin: 'npm',
      args: ['run', '--silent', `agent:${id}`, '--', '--json'],
    },
    artifacts: [
      { role: 'output', kind: 'node-output', id: `${id}-json` },
    ],
    validators: [
      { id: `${id}-json-ok`, kind: 'json-ok' },
    ],
    receipt_hooks: [
      { role: 'embedded', kind: 'dag-node', id: `agent-plan:${id}` },
      { role: 'embedded', kind: 'node-validation', id: `agent-plan:${id}-json-ok` },
    ],
    ...overrides,
  };
}

test('runner agent-plan wrapper validates written DAG artifacts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-runner-agent-plan-valid-'));
  const graphPath = join(dir, 'agent-task-graph.json');
  const validationPath = join(dir, 'agent-task-graph.validation.json');

  try {
    writeJson(graphPath, validDag());
    const result = runChecked([
      '--project-dir',
      dir,
      '--route',
      '/tools/example/',
      '--out',
      graphPath,
      '--validation-out',
      validationPath,
    ]);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.equal(existsSync(validationPath), true);

    const report = JSON.parse(readFileSync(validationPath, 'utf8'));
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].node_count, 4);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('runner agent-plan wrapper fails when DAG validation fails', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-runner-agent-plan-invalid-'));
  const graphPath = join(dir, 'agent-task-graph.json');
  const validationPath = join(dir, 'agent-task-graph.validation.json');
  const graph = validDag();
  graph.nodes = graph.nodes.filter((item) => item.id !== 'score');

  try {
    writeJson(graphPath, graph);
    const result = runChecked([
      '--project-dir',
      dir,
      '--route',
      '/tools/example/',
      '--out',
      graphPath,
      '--validation-out',
      validationPath,
    ]);
    assert.equal(result.status, 1);

    const report = JSON.parse(readFileSync(validationPath, 'utf8'));
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('dag-canonical-node-missing'));
    assert.ok(codes.includes('dag-node-missing-dependency'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
