import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

function runNode(script, args = []) {
  return spawnSync(process.execPath, [script, ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('loop verify dry-run pins the ledger date across its command plan', () => {
  const result = runNode('scripts/loop-verify.mjs', [
    '--json',
    '--dry-run',
    '--date',
    '2026-06-20',
    '--route',
    '/compare/foo-vs-bar/',
    '--path',
    'src/content/comparisons/foo-vs-bar.md',
  ]);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.dry_run, true);
  assert.equal(report.date, '2026-06-20');
  assert.equal(report.route, '/compare/foo-vs-bar/');
  assert.ok(report.commands.some((command) => /generate-page-refresh-ledger\.mjs --date 2026-06-20/.test(command)));
  assert.ok(report.commands.some((command) => /generate-page-refresh-ledger\.mjs --check --date 2026-06-20/.test(command)));
  assert.ok(report.commands.some((command) => /qa-route\.mjs --route \/compare\/foo-vs-bar\//.test(command)));
});

test('loop verify requires an explicit date or AIPEDIA_LEDGER_DATE', () => {
  const result = spawnSync(process.execPath, ['scripts/loop-verify.mjs', '--json', '--dry-run', '--route', '/compare/foo-vs-bar/'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, AIPEDIA_LEDGER_DATE: '' },
  });

  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.argument_issues.some((issue) => /date/.test(issue.detail)));
});

test('route QA rejects remote URLs before starting a browser', () => {
  const result = runNode('scripts/qa-route.mjs', ['--json', '--route', 'https://example.com/']);

  assert.equal(result.status, 2);
  const report = JSON.parse(result.stdout);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /route must/.test(failure)));
});

test('route QA documents its reusable route command', () => {
  const result = runNode('scripts/qa-route.mjs', ['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /--route \/compare\/example\//);
  assert.match(result.stdout, /360,390,430,768,1024,1366/);
});

test('loop record writes a durable run receipt', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loop-record-'));

  try {
    const result = runNode('scripts/loop-record.mjs', [
      '--project-dir',
      dir,
      '--json',
      '--date',
      '2026-06-20',
      '--slug',
      'Foo Vs Bar',
      '--status',
      'complete',
      '--route',
      '/compare/foo-vs-bar/',
      '--check',
      'npm run loop:verify -- --date 2026-06-20',
      '--changed',
      'src/content/comparisons/foo-vs-bar.md',
      '--next',
      'Run the next cluster.',
    ]);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.ok(existsSync(report.path));
    const text = readFileSync(report.path, 'utf8');
    assert.match(text, /# 2026-06-20: foo-vs-bar/);
    assert.match(text, /\/compare\/foo-vs-bar\//);
    assert.match(text, /src\/content\/comparisons\/foo-vs-bar\.md/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
