import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runCheck(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-task-dag-check.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function commandNode(id, overrides = {}) {
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
      commandNode('evidence'),
      commandNode('impact'),
      commandNode('score'),
      commandNode('memory_record', {
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

test('agent DAG check validates node metadata contracts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-agent-dag-valid-'));
  const path = join(dir, 'dag.json');

  try {
    writeJson(path, validDag());
    const result = runCheck(['--path', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].node_count, 4);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent DAG check fails missing dependencies and cycles', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-agent-dag-invalid-'));
  const path = join(dir, 'dag.json');
  const dag = validDag();
  dag.nodes[0].depends_on = ['memory_record'];
  dag.nodes[3].depends_on = ['evidence', 'missing-node'];
  delete dag.nodes[3].permissions.writes;

  try {
    writeJson(path, dag);
    const result = runCheck(['--path', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const codes = report.receipts[0].issues.map((item) => item.code);
    assert.ok(codes.includes('dag-node-missing-dependency'));
    assert.ok(codes.includes('dag-cycle'));
    assert.ok(codes.includes('dag-node-permissions-invalid'));
    assert.ok(codes.includes('dag-memory-dependency-missing'));
    assert.ok(codes.includes('field-invalid'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
