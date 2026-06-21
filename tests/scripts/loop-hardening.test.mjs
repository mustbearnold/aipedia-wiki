import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
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
    '/compare/activepieces-vs-zapier/',
    '--path',
    'src/content/comparisons/activepieces-vs-zapier.md',
  ]);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.dry_run, true);
  assert.equal(report.date, '2026-06-20');
  assert.equal(report.route, '/compare/activepieces-vs-zapier/');
  assert.equal(report.smart_runs_route_qa, true);
  assert.ok(report.commands.some((command) => /generate-page-refresh-ledger\.mjs --date 2026-06-20/.test(command)));
  assert.ok(report.commands.some((command) => /generate-page-refresh-ledger\.mjs --check --date 2026-06-20/.test(command)));
  assert.ok(report.commands.some((command) => /check-smart\.mjs --run --path src\/content\/comparisons\/activepieces-vs-zapier\.md/.test(command)));
});

test('loop verify does not add a fallback build when no route or force-build is requested', () => {
  const result = runNode('scripts/loop-verify.mjs', [
    '--json',
    '--dry-run',
    '--date',
    '2026-06-20',
    '--path',
    '.agent/CURRENT_STATUS.md',
  ]);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.route, '');
  assert.equal(report.smart_runs_build, false);
  assert.ok(!report.commands.includes('npm run build:fast'));
});

test('loop verify recognizes combined smart route QA commands', () => {
  const result = runNode('scripts/loop-verify.mjs', [
    '--json',
    '--dry-run',
    '--date',
    '2026-06-20',
    '--route',
    '/compare/activepieces-vs-zapier/',
    '--path',
    'src/content/categories/ai-automation.md',
    '--path',
    'src/content/comparisons/activepieces-vs-zapier.md',
    '--path',
    'src/content/tools/activepieces.md',
  ]);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  assert.equal(report.smart_runs_route_qa, true);
  assert.ok(!report.commands.some((command) => /scripts\/qa-route\.mjs/.test(command)));
});

test('loop verify scopes provenance checks to changed tool pages', () => {
  const result = runNode('scripts/loop-verify.mjs', [
    '--json',
    '--dry-run',
    '--date',
    '2026-06-21',
    '--route',
    '/compare/chatgpt-vs-claude/',
    '--path',
    'src/content/comparisons/chatgpt-vs-claude.md',
    '--path',
    'src/content/tools/chatgpt.md',
    '--path',
    'src/content/tools/claude.md',
  ]);

  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  const report = JSON.parse(result.stdout);
  const provenanceCommand = report.commands.find((command) => /audit-provenance-pricing\.mjs/.test(command));
  assert.ok(provenanceCommand);
  assert.match(provenanceCommand, /--changed-file src\/content\/tools\/chatgpt\.md/);
  assert.match(provenanceCommand, /--changed-file src\/content\/tools\/claude\.md/);
  assert.doesNotMatch(provenanceCommand, /src\/content\/comparisons\/chatgpt-vs-claude\.md/);
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

test('route QA tolerates only known local static runtime misses', async () => {
  const { isAllowedLocalMissing } = await import(pathToFileURL(resolve('scripts/qa-route.mjs')).href);

  assert.equal(isAllowedLocalMissing('http://127.0.0.1:18080/_vercel/insights/script.js'), true);
  assert.equal(isAllowedLocalMissing('http://127.0.0.1:18080/api/reviews/for/deepseek/'), true);
  assert.equal(isAllowedLocalMissing('http://127.0.0.1:18080/api/search-tools.json'), false);
  assert.equal(isAllowedLocalMissing('not a url'), false);
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

test('loop record preserves comma-separated command text in checks', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-loop-record-command-'));

  try {
    const command = 'npm run qa:route -- --route /compare/foo-vs-bar/ --widths 360,390,430';
    const result = runNode('scripts/loop-record.mjs', [
      '--project-dir',
      dir,
      '--json',
      '--date',
      '2026-06-20',
      '--slug',
      'foo-vs-bar',
      '--check',
      command,
    ]);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.deepEqual(report.record.checks, [command]);
    const text = readFileSync(report.path, 'utf8');
    assert.match(text, /--widths 360,390,430/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
