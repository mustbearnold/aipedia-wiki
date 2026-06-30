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
  assert.deepEqual(report.agent_system_artifacts, ['scripts/agent-system-progress-check.mjs']);
  assert.deepEqual(report.preexisting_dirty_paths, []);
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

test('system progress check separates preexisting dirty content from current system work', () => {
  const result = runProgressCheck(
    '--json',
    '--require-system-artifact',
    '--observed-dirty-before-agent',
    'src/content/tools/example.md',
    '--path',
    'src/content/tools/example.md',
    '--path',
    'scripts/agent-system-progress-check.mjs',
  );

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.has_system_artifact, true);
  assert.equal(report.has_agent_system_artifact, true);
  assert.deepEqual(report.preexisting_content_artifacts, ['src/content/tools/example.md']);
  assert.deepEqual(report.agent_system_artifacts, ['scripts/agent-system-progress-check.mjs']);
  assert.deepEqual(report.agent_content_artifacts, []);
});

test('system progress check does not count preexisting dirty system files as current system work', () => {
  const result = runProgressCheck(
    '--json',
    '--require-system-artifact',
    '--observed-dirty-before-agent',
    '.agent/WORK_LOG.md',
    '--path',
    '.agent/WORK_LOG.md',
  );

  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'missing-system-progress');
  assert.equal(report.has_system_artifact, true);
  assert.equal(report.has_agent_system_artifact, false);
  assert.deepEqual(report.preexisting_system_artifacts, ['.agent/WORK_LOG.md']);
  assert.deepEqual(report.agent_system_artifacts, []);
});

test('system progress check treats new content after a dirty baseline as content-only progress', () => {
  const result = runProgressCheck(
    '--json',
    '--require-system-artifact',
    '--observed-dirty-before-agent',
    'src/content/tools/preexisting.md',
    '--path',
    'src/content/tools/preexisting.md',
    '--path',
    'src/content/tools/current.md',
  );

  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'content-only-progress');
  assert.equal(report.content_only, true);
  assert.equal(report.agent_content_only, true);
  assert.deepEqual(report.preexisting_content_artifacts, ['src/content/tools/preexisting.md']);
  assert.deepEqual(report.agent_content_artifacts, ['src/content/tools/current.md']);
});

test('system progress check reports missing system progress for empty diffs', () => {
  const result = runProgressCheck('--json', '--require-system-artifact', '--path', 'local/tmp/example.json');

  assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'missing-system-progress');
  assert.deepEqual(report.other_artifacts, ['local/tmp/example.json']);
});
