import assert from 'node:assert/strict';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runReadiness(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-proof-readiness.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function freshnessReceipt(status = 'fresh') {
  const ok = status === 'fresh';
  return {
    ok,
    mode: 'input-freshness-receipt',
    schema_version: 'aipedia.input-freshness-receipt.v1',
    workflows: [
      {
        id: 'page-refresh',
        kind: 'page-refresh-ledger',
        ok,
        status,
        input: 'PAGE_REFRESH_LEDGER.md',
        refresh_command: 'npm run ledger:pages && npm run ledger:pages:check',
        enforce_command: 'npm run page:refresh:batch -- --fail-on-stale-ledger --json',
        next_action: ok ? '' : 'Run npm run ledger:pages && npm run ledger:pages:check.',
      },
    ],
    summary: {
      workflow_count: 1,
      ok_count: ok ? 1 : 0,
      attention_count: ok ? 0 : 1,
      stale_count: ok ? 0 : 1,
    },
    next_actions: ok ? [] : ['Run npm run ledger:pages && npm run ledger:pages:check.'],
  };
}

test('proof readiness reports page-refresh policy ready when inputs are fresh and content tree is clean', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-ready-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt('fresh'));
    writeFileSync(join(root, 'status.txt'), '');

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--json',
    ]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.targets[0].status, 'ready');
    assert.equal(report.targets[0].recommended_commands.at(-1), 'npm run agent:meta:closeout:auto -- --receipt <page-refresh-closeout.json> --json');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness blocks stale page-refresh inputs and dirty content WIP', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-blocked-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt('stale'));
    writeFileSync(
      join(root, 'status.txt'),
      [
        ' M src/content/tools/synthesia.md',
        ' M src/data/source-registry.json',
        '?? src/content/comparisons/captions-vs-synthesia.md',
      ].join('\n'),
    );

    const result = runReadiness([
      '--project-dir',
      root,
      '--input-freshness',
      'freshness.json',
      '--git-status-file',
      'status.txt',
      '--target',
      'page-refresh-policy',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.summary.blocked_count, 1);
    assert.deepEqual(
      report.targets[0].blockers.map((item) => item.code),
      ['input-freshness-stale', 'dirty-content-wip'],
    );
    assert.deepEqual(report.targets[0].blockers[1].paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness rejects unknown targets before running checks', () => {
  const result = runReadiness(['--target', 'not-real', '--json']);
  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.argument_issues[0].code, 'argument-invalid');
});
