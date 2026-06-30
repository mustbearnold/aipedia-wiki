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
    assert.equal(report.validation.ok, true);
    assert.equal(report.validation.schema_version, 'aipedia.pause-receipt-validation.v1');
    assert.equal(report.receipt.schema_version, 'aipedia.pause-receipt.v1');
    assert.equal(report.receipt.goal_id, '2026-06-30-meta');
    assert.equal(report.receipt.run_id, 'run-1');
    assert.equal(report.receipt.latest_safe_resume_step, 'Read the pause receipt.');
    assert.deepEqual(report.receipt.validation_pending, ['focused tests']);
    assert.ok(report.receipt.dirty_tree_summary.some((line) => /scripts\/changed\.mjs/.test(line)));
    assert.equal(report.receipt.trace.name, 'pause-receipt');
    assert.equal(report.receipt.trace.trace_id, '2026-06-30-meta:run-1');
    assert.ok(report.receipt.artifact_refs.some((artifact) => (
      artifact.role === 'output'
      && artifact.kind === 'pause-receipt'
      && artifact.path === '.agent/loop-runs/pauses/pause.json'
    )));
    assert.ok(report.receipt.artifact_refs.some((artifact) => (
      artifact.role === 'embedded'
      && artifact.kind === 'next-command'
      && artifact.description.includes('agent-pause-receipt.test.mjs')
    )));
    assert.ok(existsSync(outPath));

    const written = JSON.parse(readFileSync(outPath, 'utf8'));
    assert.equal(written.schema_version, 'aipedia.pause-receipt.v1');
    assert.equal(written.pause_reason, 'user');
    assert.equal(written.trace.span_id.startsWith('span:pause-receipt:run-1:'), true);

    const validation = runPauseReceipt('--json', '--project-dir', dir, '--validate', outPath);
    assert.equal(validation.status, 0, `${validation.stdout}\n${validation.stderr}`);
    const validationReport = JSON.parse(validation.stdout);
    assert.equal(validationReport.mode, 'pause-receipt-validation');
    assert.equal(validationReport.validation.ok, true);
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

test('pause receipt separates observed dirty files from agent-touched files', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-pause-dirty-separation-'));

  try {
    spawnSync('git', ['init'], { cwd: dir, encoding: 'utf8' });
    mkdirSync(join(dir, 'src/content/tools'), { recursive: true });
    mkdirSync(join(dir, 'scripts'), { recursive: true });
    writeFileSync(join(dir, 'src/content/tools/synthesia.md'), 'pre-existing content work\n');
    writeFileSync(join(dir, 'scripts/agent-change.mjs'), 'console.log("agent");\n');
    const outPath = join(dir, '.agent', 'loop-runs', 'pauses', 'pause.json');

    const result = runPauseReceipt(
      '--json',
      '--project-dir',
      dir,
      '--goal-id',
      '2026-06-30-meta',
      '--run-id',
      'run-2',
      '--safe-resume-step',
      'Resume from the receipt.',
      '--in-progress-step',
      'Separate dirty state.',
      '--observed-dirty-before-agent',
      'src/content/tools/synthesia.md',
      '--out',
      outPath,
    );

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.deepEqual(report.receipt.files_observed_dirty_before_agent, ['src/content/tools/synthesia.md']);
    assert.ok(!report.receipt.files_touched_by_agent.includes('src/content/tools/synthesia.md'));
    assert.ok(report.receipt.files_touched_by_agent.includes('scripts/agent-change.mjs'));
    assert.ok(report.receipt.artifact_refs.some((artifact) => (
      artifact.kind === 'observed-dirty-before-agent'
      && artifact.path === 'src/content/tools/synthesia.md'
    )));
    assert.ok(report.receipt.artifact_refs.some((artifact) => (
      artifact.kind === 'agent-touched-file'
      && artifact.path === 'scripts/agent-change.mjs'
    )));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('pause receipt validation fails malformed receipts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-pause-invalid-'));
  const path = join(dir, 'pause.json');

  try {
    writeFileSync(path, JSON.stringify({
      schema_version: 'aipedia.pause-receipt.v1',
      goal_id: 'goal',
      run_id: '',
      paused_at: 'not-a-date',
      pause_reason: 'mystery',
      latest_safe_resume_step: '',
      in_progress_step: 'continue',
      dirty_tree_summary: [],
      files_touched_by_agent: [],
      files_observed_dirty_before_agent: [],
      child_workers: [],
      open_questions: [],
      blocked_on: [],
      must_not_repeat: [],
      next_commands: [],
      validation_done: [],
      validation_pending: [],
      source_cutoff: '2026/06/30',
      trace: {
        trace_id: 'trace',
        span_id: '',
        parent_span_id: 123,
        name: 'pause-receipt',
        started_at: 'not-a-date',
        ended_at: '2026-06-30T00:00:00.000Z',
        duration_ms: -1,
      },
      artifact_refs: [
        {
          role: 'output',
          kind: 'pause-receipt',
        },
      ],
    }, null, 2));

    const result = runPauseReceipt('--json', '--project-dir', dir, '--validate', path);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.validation.ok, false);
    assert.ok(report.validation.issue_count >= 4);
    assert.ok(report.validation.issues.some((issue) => /pause_reason/.test(issue.detail)));
    assert.ok(report.validation.issues.some((issue) => /source_cutoff/.test(issue.detail)));
    assert.ok(report.validation.issues.some((issue) => /trace/.test(issue.detail)));
    assert.ok(report.validation.issues.some((issue) => /artifact_refs/.test(issue.detail)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
