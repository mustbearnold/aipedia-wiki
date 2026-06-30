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

function workflowReceipt(id, status = 'fresh') {
  const ok = status === 'fresh';
  const metadata = {
    'page-refresh': {
      kind: 'page-refresh-ledger',
      input: 'PAGE_REFRESH_LEDGER.md',
      refresh_command: 'npm run ledger:pages && npm run ledger:pages:check',
      enforce_command: 'npm run page:refresh:batch -- --fail-on-stale-ledger --json',
    },
    'tool-refresh': {
      kind: 'tool-refresh-freshness-report',
      input: 'audit-freshness-queue',
      refresh_command: 'npm run audit:freshness -- --json',
      enforce_command: 'npm run tool:refresh:batch -- --fail-on-stale-inputs --json',
    },
    'affiliate-conversion': {
      kind: 'affiliate-conversion-inventory',
      input: 'affiliate-conversion-inventory',
      refresh_command: 'npm run affiliate:conversion:inventory -- --json',
      enforce_command: 'npm run affiliate:conversion:plan -- --fail-on-stale-inputs --json',
    },
  }[id];
  return {
    id,
    ...metadata,
    ok,
    status,
    next_action: ok ? '' : `Refresh ${id}.`,
  };
}

function freshnessReceipt(workflows = { 'page-refresh': 'fresh' }) {
  const entries = Object.entries(workflows).map(([id, status]) => workflowReceipt(id, status));
  return {
    ok: entries.every((entry) => entry.ok),
    mode: 'input-freshness-receipt',
    schema_version: 'aipedia.input-freshness-receipt.v1',
    workflows: entries,
    summary: {
      workflow_count: entries.length,
      ok_count: entries.filter((entry) => entry.ok).length,
      attention_count: entries.filter((entry) => !entry.ok).length,
      stale_count: entries.filter((entry) => entry.status === 'stale').length,
    },
    next_actions: entries.filter((entry) => !entry.ok).map((entry) => entry.next_action),
  };
}

test('proof readiness reports page-refresh policy ready when inputs are fresh and content tree is clean', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-ready-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'fresh' }));
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
    writeJson(join(root, 'freshness.json'), freshnessReceipt({ 'page-refresh': 'stale' }));
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
    assert.deepEqual(report.targets[0].readiness_checks[1].dirty_paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
      'src/content/comparisons/captions-vs-synthesia.md',
    ]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('proof readiness evaluates tool-refresh and affiliate handoff targets independently', () => {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-proof-multi-'));
  try {
    writeJson(join(root, 'freshness.json'), freshnessReceipt({
      'tool-refresh': 'fresh',
      'affiliate-conversion': 'fresh',
    }));
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
      'tool-refresh-policy',
      '--target',
      'affiliate-handoff-policy',
      '--json',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.summary.target_count, 2);
    assert.equal(report.summary.ready_count, 1);
    assert.equal(report.summary.blocked_count, 1);

    const toolTarget = report.targets.find((target) => target.id === 'tool-refresh-policy');
    const affiliateTarget = report.targets.find((target) => target.id === 'affiliate-handoff-policy');
    assert.equal(toolTarget.status, 'blocked');
    assert.deepEqual(toolTarget.blockers.map((item) => item.code), ['dirty-tool-refresh-wip']);
    assert.deepEqual(toolTarget.blockers[0].paths, [
      'src/content/tools/synthesia.md',
      'src/data/source-registry.json',
    ]);
    assert.equal(affiliateTarget.status, 'ready');
    assert.equal(
      affiliateTarget.recommended_commands.at(-1),
      'npm run agent:closeout:check -- --receipt <affiliate-handoff.json> --require-workflow-policy --json',
    );
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
