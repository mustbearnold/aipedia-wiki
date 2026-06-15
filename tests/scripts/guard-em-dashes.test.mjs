import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import test from 'node:test';

function runGuard(...args) {
  return spawnSync(process.execPath, ['scripts/guard-em-dashes.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixture(markdown) {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-em-dash-'));
  const toolsDir = join(fixture, 'src/content/tools');
  mkdirSync(toolsDir, { recursive: true });
  writeFileSync(join(toolsDir, 'fixture.md'), markdown);
  return fixture;
}

test('em-dash guard passes on current content (no em dashes in rendered output)', () => {
  const res = runGuard('--json');
  const out = JSON.parse(res.stdout);
  assert.equal(res.status, 0, `guard should pass; failures: ${out.failures.join('; ')}`);
  assert.equal(out.ok, true);
  assert.equal(out.mode, 'guard');
  assert.deepEqual(out.argument_issues, []);
  assert.ok(out.scanned > 500, 'should scan the full content tree');
});

test('em-dash guard catches a literal em dash and a prose " -- " but ignores code spans in fixtures', () => {
  const fixture = writeFixture(
    '---\ntitle: Test\n---\n\nThis prose has an em dash — here.\nAnd a separator -- here.\nBut code `npm test -- path` is fine.\n',
  );

  try {
    const res = runGuard('--json', `--project-dir=${fixture}`);
    const out = JSON.parse(res.stdout);
    assert.equal(res.status, 2, 'guard should fail on fixture violations');
    assert.equal(out.ok, false);
    assert.equal(out.project_dir, resolve(fixture));
    assert.equal(out.scanned, 1);
    const mine = out.failures.filter((failure) => failure.includes('fixture.md'));
    assert.ok(mine.some((failure) => failure.includes('literal em dash')), 'should flag the literal em dash');
    assert.ok(mine.some((failure) => failure.includes(' -- ')), 'should flag the prose " -- "');
    // The code-span `npm test -- path` must not produce a separate failure;
    // exactly two violations (em dash + prose separator) are expected.
    assert.equal(mine.length, 2, `expected 2 violations, got ${mine.length}: ${mine.join(' | ')}`);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('em-dash guard rejects invalid arguments before scans', () => {
  const unknown = runGuard('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runGuard('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runGuard('--json', 'content');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));

  const conflicting = runGuard('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('em-dash guard reports missing fixture roots as structured JSON', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-em-dash-missing-'));

  try {
    const res = runGuard('--json', `--project-dir=${fixture}`);
    assert.equal(res.status, 1);
    assert.equal(res.stderr, '');

    const out = JSON.parse(res.stdout);
    assert.equal(out.ok, false);
    assert.equal(out.mode, 'guard');
    assert.equal(out.project_dir, resolve(fixture));
    assert.deepEqual(out.argument_issues, []);
    assert.ok(out.issues.some((issue) => issue.code === 'content-root-missing' && issue.file === 'src/content'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('em-dash guard prints CLI help', () => {
  const result = runGuard('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
