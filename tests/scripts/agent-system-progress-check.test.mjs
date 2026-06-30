import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runProgressCheck(...args) {
  return spawnSync(process.execPath, ['scripts/agent-system-progress-check.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('system progress check passes when a system artifact is present', () => {
  const result = runProgressCheck(
    '--json',
    '--require-system-artifact',
    '--path',
    'scripts/agent-system-progress-check.mjs',
    '--path',
    'src/content/tools/example.md',
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.has_system_artifact, true);
  assert.deepEqual(report.system_artifacts, ['scripts/agent-system-progress-check.mjs']);
  assert.deepEqual(report.content_artifacts, ['src/content/tools/example.md']);
});

test('system progress check rejects content-only progress when required', () => {
  const result = runProgressCheck(
    '--json',
    '--require-system-artifact',
    '--path',
    'src/content/comparisons/foo-vs-bar.md',
    '--path',
    'PAGE_REFRESH_LEDGER.md',
  );

  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'content-only-progress');
  assert.equal(report.content_only, true);
  assert.equal(report.has_system_artifact, false);
});

test('system progress check reports missing system progress for empty diffs', () => {
  const result = runProgressCheck('--json', '--require-system-artifact', '--path', 'local/tmp/example.json');

  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'missing-system-progress');
  assert.deepEqual(report.other_artifacts, ['local/tmp/example.json']);
});
