import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runPauseReceipt(...args) {
  return spawnSync(process.execPath, ['scripts/agent-pause-receipt.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('pause receipt writes a durable JSON resume contract', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-pause-receipt-'));

  try {
    spawnSync('git', ['init'], { cwd: dir, encoding: 'utf8' });
    mkdirSync(join(dir, 'scripts'), { recursive: true });
    writeFileSync(join(dir, 'scripts', 'changed.mjs'), 'console.log("changed");\n');
    const outPath = join(dir, '.agent', 'loop-runs', 'pauses', 'pause.json');

    const result = runPauseReceipt(
      '--json',
      '--project-dir',
      dir,
      '--goal-id',
      '2026-06-30-meta',
      '--run-id',
      'run-1',
      '--reason',
      'user',
      '--safe-resume-step',
      'Read the pause receipt.',
      '--in-progress-step',
      'Implement pause receipt tests.',
      '--next-command',
      'npm run test:scripts -- tests/scripts/agent-pause-receipt.test.mjs',
      '--validation-pending',
      'focused tests',
      '--out',
      outPath,
    );

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.receipt.schema_version, 'aipedia.pause-receipt.v1');
    assert.equal(report.receipt.goal_id, '2026-06-30-meta');
    assert.equal(report.receipt.run_id, 'run-1');
    assert.equal(report.receipt.latest_safe_resume_step, 'Read the pause receipt.');
    assert.deepEqual(report.receipt.validation_pending, ['focused tests']);
    assert.ok(report.receipt.dirty_tree_summary.some((line) => /scripts\/changed\.mjs/.test(line)));
    assert.ok(existsSync(outPath));

    const written = JSON.parse(readFileSync(outPath, 'utf8'));
    assert.equal(written.schema_version, 'aipedia.pause-receipt.v1');
    assert.equal(written.pause_reason, 'user');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('pause receipt requires explicit resume state', () => {
  const result = runPauseReceipt('--json', '--goal-id', 'missing-state');

  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.argument_issues.some((issue) => /safe-resume-step/.test(issue.detail)));
  assert.ok(report.argument_issues.some((issue) => /in-progress-step/.test(issue.detail)));
});
