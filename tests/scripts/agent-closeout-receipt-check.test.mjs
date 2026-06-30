import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runCheck(args = []) {
  return spawnSync(process.execPath, ['scripts/agent-closeout-receipt-check.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeJson(path, value) {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function validLoopReceipt(overrides = {}) {
  return {
    ok: true,
    mode: 'loop-run',
    project_dir: '.',
    registry_path: 'src/data/aipedia-loops.json',
    schema_version: 1,
    default_site_dir: 'dist-fast/client',
    generated_at: '2026-06-30T03:01:47.100Z',
    duration_ms: 123,
    totals: {
      loops: 1,
      ok: 1,
      attention: 0,
      skipped: 0,
      commands: 1,
    },
    loops: [
      {
        id: 'decision-content',
        title: 'Decision Content',
        status: 'ok',
        purpose: 'Fixture loop.',
        duration_ms: 12,
        commands: [
          {
            label: 'fixture command',
            status: 'ok',
            command: 'node fixture.mjs',
            duration_ms: 10,
            exit_code: 0,
            signal: '',
            attention_reasons: [],
          },
        ],
        attention_reasons: [],
        skip_reason: '',
        review_questions: [],
        record_targets: [],
      },
    ],
    review: {
      summary: '1 loop(s) ok; 0 attention; 0 skipped.',
      attention_loops: [],
      skipped_loops: [],
      recommendations: [],
      next_actions: [],
    },
    system_progress: {
      ok: true,
      mode: 'system-progress-check',
      command: 'node scripts/agent-system-progress-check.mjs --json --project-dir=. --require-system-artifact',
      exit_code: 0,
      require_system_artifact: true,
      changed_paths: ['scripts/example.mjs'],
      system_artifacts: ['scripts/example.mjs'],
      content_artifacts: [],
      other_artifacts: [],
      has_system_artifact: true,
      content_only: false,
      next_action: 'System artifact present or enforcement disabled.',
    },
    ledger: {
      written: true,
      file: '.agent/loop-runs/system/fixture-loop-run.json',
      latest_file: '.agent/loop-runs/system/latest.json',
      previous_file: '',
      trend: {
        previous_run: '',
        status_changes: [],
        duration_delta_ms: null,
        totals_delta: null,
      },
    },
    ...overrides,
  };
}

function validRunnerReceipt(overrides = {}) {
  return {
    schema_version: 'aipedia.closeout-receipt.v1',
    workflow: 'tool-refresh',
    status: 'passed',
    generated_at: '2026-06-30T03:01:47Z',
    current_date: null,
    elapsed_ms: 250,
    plan: 'local/tmp/plan.json',
    route_args: 'local/tmp/routes.txt',
    report_dir: null,
    report_summary: null,
    markdown_receipt: 'local/tmp/receipt.md',
    changed_routes: ['/tools/example/'],
    source_ids: ['example-pricing'],
    widths: [360, 1024],
    commands: [
      {
        label: 'typecheck',
        status: 0,
        elapsed_ms: 50,
        details_path: null,
      },
    ],
    superseded_failures: [],
    system_progress: validLoopReceipt().system_progress,
    ...overrides,
  };
}

test('closeout receipt check validates latest enforced loop receipt by default', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-loop-'));
  const systemDir = join(dir, '.agent', 'loop-runs', 'system');

  try {
    mkdirSync(systemDir, { recursive: true });
    writeJson(join(systemDir, 'latest.json'), validLoopReceipt());
    const result = runCheck(['--project-dir', dir, '--require-system-progress', '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.totals.receipts, 1);
    assert.equal(report.receipts[0].type, 'loop-run');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails enforced loop receipts without system progress', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-missing-progress-'));
  const path = join(dir, 'loop.json');
  const receipt = validLoopReceipt();
  delete receipt.system_progress;

  try {
    writeJson(path, receipt);
    const result = runCheck(['--receipt', path, '--require-system-progress', '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.receipts[0].issues[0].code, 'system-progress-missing');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check validates runner closeout receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-runner-'));
  const path = join(dir, 'runner.json');

  try {
    writeJson(path, validRunnerReceipt());
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipts[0].type, 'runner-closeout');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('closeout receipt check fails malformed runner command receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-closeout-bad-runner-'));
  const path = join(dir, 'runner.json');

  try {
    writeJson(path, validRunnerReceipt({ commands: [{ label: '', status: 'ok', elapsed_ms: -1 }] }));
    const result = runCheck(['--receipt', path, '--json']);
    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const details = report.receipts[0].issues.map((item) => item.detail).join('\n');
    assert.match(details, /commands\[0\]\.label/);
    assert.match(details, /commands\[0\]\.status/);
    assert.match(details, /commands\[0\]\.elapsed_ms/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
