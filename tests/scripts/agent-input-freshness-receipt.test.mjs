import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const SCRIPT_PATH = join(process.cwd(), 'scripts', 'agent-input-freshness-receipt.mjs');
const LEDGER_SCRIPT_PATH = join(process.cwd(), 'scripts', 'generate-page-refresh-ledger.mjs');

function runReceipt(args = []) {
  return spawnSync(process.execPath, [SCRIPT_PATH, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function runLedger(projectDir, args = []) {
  return spawnSync(process.execPath, [LEDGER_SCRIPT_PATH, '--project-dir', projectDir, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function makeProject() {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-input-freshness-'));
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'use-cases'), { recursive: true });
  writeFileSync(join(dir, 'src', 'content', 'use-cases', 'old-guide.md'), [
    '---',
    'slug: old-guide',
    'title: Old Guide',
    'last_updated: 2026-06-01',
    '---',
    '',
    'Body.',
    '',
  ].join('\n'));
  return dir;
}

function writeBacklog(projectDir, generatedAt) {
  writeFileSync(
    join(projectDir, 'src', 'data', 'coverage-backlog.json'),
    `${JSON.stringify({
      ok: true,
      generated_at: generatedAt,
      backlog: { comparisons: [] },
    }, null, 2)}\n`,
  );
}

test('input freshness receipt passes fresh decision backlog and writes receipt', () => {
  const dir = makeProject();
  try {
    writeBacklog(dir, new Date().toISOString());
    const outPath = 'local/tmp/input-freshness.json';
    const result = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'decision-content',
      '--require-fresh',
      '--out',
      outPath,
      '--json',
    ]);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.schema_version, 'aipedia.input-freshness-receipt.v1');
    assert.equal(report.workflows.length, 1);
    assert.equal(report.workflows[0].id, 'decision-content');
    assert.equal(report.workflows[0].status, 'fresh');
    assert.equal(report.summary.ok_count, 1);
    const receiptPath = join(dir, outPath);
    assert.equal(existsSync(receiptPath), true);
    assert.equal(JSON.parse(readFileSync(receiptPath, 'utf8')).ok, true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('input freshness receipt fails stale decision backlog when required', () => {
  const dir = makeProject();
  try {
    writeBacklog(dir, '2026-06-01T00:00:00.000Z');
    const result = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'decision-content',
      '--require-fresh',
      '--json',
    ]);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.workflows[0].status, 'stale');
    assert.match(report.next_actions.join('\n'), /coverage:backlog/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('input freshness receipt blocks tracked refreshes without mutation acknowledgement', () => {
  const dir = makeProject();
  try {
    writeBacklog(dir, '2026-06-01T00:00:00.000Z');
    const result = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'decision-content',
      '--refresh-stale',
      '--apply-refreshes',
      '--require-fresh',
      '--json',
    ]);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.refresh_plan[0].status, 'blocked');
    assert.match(report.refresh_plan[0].blocked_reasons.join('\n'), /allow-tracked-mutations/);
    assert.equal(JSON.parse(readFileSync(join(dir, 'src', 'data', 'coverage-backlog.json'), 'utf8')).generated_at, '2026-06-01T00:00:00.000Z');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('input freshness receipt can refresh stale decision backlog with explicit policy flags', () => {
  const dir = makeProject();
  try {
    writeBacklog(dir, '2026-06-01T00:00:00.000Z');
    const result = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'decision-content',
      '--refresh-stale',
      '--apply-refreshes',
      '--allow-tracked-mutations',
      '--require-fresh',
      '--json',
    ]);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.workflows[0].status, 'fresh');
    assert.equal(report.refresh_plan[0].status, 'applied');
    assert.equal(report.refresh_plan[0].after_ok, true);
    assert.notEqual(JSON.parse(readFileSync(join(dir, 'src', 'data', 'coverage-backlog.json'), 'utf8')).generated_at, '2026-06-01T00:00:00.000Z');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('input freshness receipt reports page ledger current and stale states', () => {
  const dir = makeProject();
  try {
    const ledgerResult = runLedger(dir, ['--date', '2026-06-30', '--json']);
    assert.equal(ledgerResult.status, 0, `${ledgerResult.stdout}\n${ledgerResult.stderr}`);

    const freshResult = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'page-refresh',
      '--require-fresh',
      '--json',
    ]);
    assert.equal(freshResult.status, 0, `${freshResult.stdout}\n${freshResult.stderr}`);
    const freshReport = JSON.parse(freshResult.stdout);
    assert.equal(freshReport.workflows[0].kind, 'page-refresh-ledger');
    assert.equal(freshReport.workflows[0].status, 'current');

    const ledger = join(dir, 'PAGE_REFRESH_LEDGER.md');
    writeFileSync(ledger, `${readFileSync(ledger, 'utf8')}\n<!-- stale -->\n`);
    const staleResult = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'page-refresh',
      '--require-fresh',
      '--json',
    ]);
    assert.equal(staleResult.status, 1, `${staleResult.stdout}\n${staleResult.stderr}`);
    const staleReport = JSON.parse(staleResult.stdout);
    assert.equal(staleReport.workflows[0].status, 'stale');
    assert.match(staleReport.workflows[0].next_action, /ledger:pages/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('input freshness receipt can refresh stale page ledger with explicit policy flags', () => {
  const dir = makeProject();
  try {
    const ledgerResult = runLedger(dir, ['--date', '2026-06-30', '--json']);
    assert.equal(ledgerResult.status, 0, `${ledgerResult.stdout}\n${ledgerResult.stderr}`);

    const ledger = join(dir, 'PAGE_REFRESH_LEDGER.md');
    writeFileSync(ledger, `${readFileSync(ledger, 'utf8')}\n<!-- stale -->\n`);
    const result = runReceipt([
      '--project-dir',
      dir,
      '--workflow',
      'page-refresh',
      '--refresh-stale',
      '--apply-refreshes',
      '--allow-tracked-mutations',
      '--require-fresh',
      '--json',
    ]);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.workflows[0].status, 'current');
    assert.equal(report.refresh_plan[0].status, 'applied');
    assert.equal(report.refresh_plan[0].after_ok, true);
    assert.equal(readFileSync(ledger, 'utf8').includes('<!-- stale -->'), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
