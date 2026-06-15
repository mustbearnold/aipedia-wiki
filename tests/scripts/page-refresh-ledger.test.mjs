import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

function runLedger(args = [], env = {}) {
  return spawnSync(process.execPath, ['scripts/generate-page-refresh-ledger.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, ...env },
  });
}

function writeFixture() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-ledger-'));
  mkdirSync(join(fixture, 'src/content/tools'), { recursive: true });
  mkdirSync(join(fixture, 'src/content/news'), { recursive: true });
  mkdirSync(join(fixture, 'src/pages/news'), { recursive: true });

  writeFileSync(join(fixture, 'src/content/tools/alpha.md'), [
    '---',
    'slug: alpha',
    'last_updated: 2026-06-01',
    '---',
    '',
    '# Alpha',
    '',
  ].join('\n'));

  writeFileSync(join(fixture, 'src/content/news/2026-06-01-alpha.md'), [
    '---',
    'slug: 2026-06-01-alpha',
    'date: 2026-06-01',
    '---',
    '',
    '# Alpha news',
    '',
  ].join('\n'));

  writeFileSync(join(fixture, 'src/pages/news/index.astro'), [
    '---',
    'const dateModified = "2026-06-02";',
    '---',
    '<time datetime="2026-06-02">June 2, 2026</time>',
    '',
  ].join('\n'));

  return fixture;
}

test('page refresh ledger tracks the news hub but excludes individual news articles', () => {
  const ledger = fs.readFileSync('PAGE_REFRESH_LEDGER.md', 'utf8');

  assert.match(ledger, /\| \d{4}-\d{2}-\d{2} \| \/news\/ \| Static page \|/);
  assert.doesNotMatch(ledger, /\| \d{4}-\d{2}-\d{2} \| \/news\/\d{4}-\d{2}-\d{2}-[^|]+\/ \| News \|/);
});

test('page refresh ledger generator supports fixture project roots and JSON checks', () => {
  const fixture = writeFixture();

  try {
    const write = runLedger(['--json', `--project-dir=${fixture}`, '--date=2026-06-14']);
    assert.equal(write.status, 0, write.stderr || write.stdout);

    const writeReport = JSON.parse(write.stdout);
    assert.equal(writeReport.ok, true);
    assert.equal(writeReport.mode, 'write');
    assert.equal(writeReport.project_dir, resolve(fixture));
    assert.ok(writeReport.rows >= 3);

    const ledger = fs.readFileSync(join(fixture, 'PAGE_REFRESH_LEDGER.md'), 'utf8');
    assert.match(ledger, /\| 2026-06-01 \| \/tools\/alpha\/ \| Tool \|/);
    assert.match(ledger, /\| 2026-06-02 \| \/news\/ \| Static page \|/);
    assert.doesNotMatch(ledger, /\/news\/2026-06-01-alpha\//);

    const check = runLedger(['--check', '--json', `--project-dir=${fixture}`, '--date=2026-06-14']);
    assert.equal(check.status, 0, check.stderr || check.stdout);

    const checkReport = JSON.parse(check.stdout);
    assert.equal(checkReport.ok, true);
    assert.equal(checkReport.mode, 'check');
    assert.equal(checkReport.changed, false);
    assert.equal(checkReport.rows, writeReport.rows);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('page refresh ledger check fails cleanly for stale fixture ledgers', () => {
  const fixture = writeFixture();

  try {
    const write = runLedger(['--json', `--project-dir=${fixture}`, '--date=2026-06-14']);
    assert.equal(write.status, 0, write.stderr || write.stdout);

    fs.appendFileSync(join(fixture, 'PAGE_REFRESH_LEDGER.md'), '\n<!-- stale -->\n');

    const check = runLedger(['--check', '--json', `--project-dir=${fixture}`, '--date=2026-06-14']);
    assert.equal(check.status, 1);
    assert.equal(check.stderr, '');

    const report = JSON.parse(check.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, true);
    assert.equal(report.project_dir, resolve(fixture));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('page refresh ledger generator rejects invalid arguments before scans', () => {
  const unknown = runLedger(['--json', '--wat']);
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runLedger(['--json', '--project-dir']);
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const invalidDate = runLedger(['--json', '--date=06-14-2026']);
  assert.equal(invalidDate.status, 1);
  assert.equal(invalidDate.stderr, '');

  const invalidDateReport = JSON.parse(invalidDate.stdout);
  assert.equal(invalidDateReport.ok, false);
  assert.ok(invalidDateReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--date must be YYYY-MM-DD/.test(issue.detail)));

  const stray = runLedger(['--json', 'ledger']);
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument ledger/.test(issue.detail)));

  const conflicting = runLedger(['--json', '--project-dir', '.', '--root', '.']);
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('page refresh ledger check exposes Vercel skip as structured JSON', () => {
  const result = runLedger(['--check', '--json'], { AIPEDIA_LEDGER_IGNORE_DIRTY: '1' });
  assert.equal(result.status, 0);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'check');
  assert.equal(report.skipped, true);
});

test('page refresh ledger generator prints CLI help', () => {
  const result = runLedger(['--help']);
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.match(result.stdout, /--date <YYYY-MM-DD>/);
});
