import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runLoops(...args) {
  return spawnSync(process.execPath, ['scripts/aipedia-loops.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeRegistry(dir) {
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  const registryPath = join(dir, 'src', 'data', 'aipedia-loops.json');
  writeFileSync(
    registryPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        default_site_dir: 'dist-fast/client',
        loops: [
          {
            id: 'clean-loop',
            title: 'Clean Loop',
            purpose: 'Clean fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'clean command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true, mode: "fixture", totals: { due_now: 0 } }))'],
                required: true,
                attention_totals: ['due_now'],
              },
            ],
            review_questions: ['Is it clean?'],
            record_targets: ['.agent/WORK_LOG.md'],
          },
          {
            id: 'attention-loop',
            title: 'Attention Loop',
            purpose: 'Attention fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'attention command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true, mode: "fixture", totals: { due_now: 2 } }))'],
                required: true,
                attention_totals: ['due_now'],
              },
            ],
            review_questions: ['Is it noisy?'],
            record_targets: ['.agent/WORK_LOG.md'],
          },
          {
            id: 'built-loop',
            title: 'Built Loop',
            purpose: 'Built-output fixture loop.',
            cadence: 'fixture',
            run_commands: [
              {
                label: 'built command',
                command: 'node',
                args: ['-e', 'console.log(JSON.stringify({ ok: true }))'],
                required: false,
                requires_paths: ['dist-fast/client'],
              },
            ],
            review_questions: ['Is built output present?'],
            record_targets: ['dist-fast/client'],
          },
        ],
      },
      null,
      2,
    )}\n`,
  );
  return registryPath;
}

test('aipedia loops emits the committed registry as JSON', () => {
  const result = runLoops('--json');
  assert.equal(result.status, 0, result.stderr);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'loop-registry');
  assert.equal(report.loop_count, 7);
  assert.ok(report.loops.some((loop) => loop.id === 'decision-content'));
  assert.ok(report.loops.some((loop) => loop.id === 'performance-ux'));
});

test('aipedia loops runs fixture loops and reports attention without failing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-'));
  const registry = writeRegistry(dir);

  try {
    const result = runLoops('--json', '--run', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'loop-run');
    assert.equal(report.totals.loops, 3);
    assert.equal(report.totals.ok, 1);
    assert.equal(report.totals.attention, 1);
    assert.equal(report.totals.skipped, 1);
    assert.deepEqual(report.review.attention_loops, ['attention-loop']);
    assert.deepEqual(report.review.skipped_loops, ['built-loop']);
    assert.match(report.loops.find((loop) => loop.id === 'attention-loop').attention_reasons.join('\n'), /due_now=2/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops can select one loop', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loops-select-'));
  const registry = writeRegistry(dir);

  try {
    const result = runLoops('--json', '--run', '--loop', 'clean-loop', `--project-dir=${dir}`, `--registry=${registry}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.totals.loops, 1);
    assert.equal(report.loops[0].id, 'clean-loop');
    assert.equal(report.loops[0].status, 'ok');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('aipedia loops rejects unknown loop ids', () => {
  const result = runLoops('--json', '--loop', 'missing-loop');
  assert.equal(result.status, 2);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'argument-error');
  assert.match(report.argument_issues.map((issue) => issue.detail).join('\n'), /unknown loop missing-loop/);
});

test('aipedia loops prints CLI help', () => {
  const result = runLoops('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--loop <id>/);
});
