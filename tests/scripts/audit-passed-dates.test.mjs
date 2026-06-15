import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runArgs(...args) {
  return spawnSync(process.execPath, ['scripts/audit-passed-dates.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function run(dir, today) {
  const r = runArgs('--json', '--dir', dir, '--today', today);
  assert.equal(r.status, 0, `passed-date audit failed\nstdout:\n${r.stdout}\nstderr:\n${r.stderr}`);
  const report = JSON.parse(r.stdout);
  assert.equal(report.ok, true);
  assert.deepEqual(report.argument_issues, []);
  return report;
}

test('passed-date detector flags future-framing on now-past dates and ignores timestamps/effective dates', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-passed-dates-'));
  try {
    writeFileSync(join(dir, 'a.md'), `---
title: t
---

GitHub will retire the model on May 15, 2026 across Copilot.
The plan is verified June 12, 2026 and stays current.
The feature ships from June 1, 2026 onward.
The beta is expected to launch in Q1 2026 broadly.
`);
    const report = run(dir, '2026-06-13');
    const dates = report.findings.map((f) => f.date).sort();
    // Flags: "will retire ... May 15" and "expected to launch ... Q1 2026" (end 2026-03-31).
    assert.deepEqual(dates, ['2026-03-31', '2026-05-15']);
    // Does NOT flag the "verified June 12" timestamp or the "from June 1" effective date.
    assert.ok(!report.findings.some((f) => f.date === '2026-06-12'), 'verification timestamp must not be flagged');
    assert.ok(!report.findings.some((f) => f.date === '2026-06-01'), 'effective "from <date>" must not be flagged');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('passed-date detector reports nothing when the dates are still in the future', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-passed-dates-future-'));
  try {
    writeFileSync(join(dir, 'a.md'), `---
title: t
---

The model will retire on May 15, 2026.
`);
    const report = run(dir, '2026-05-01');
    assert.equal(report.count, 0, 'May 15 is future relative to May 1');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('passed-date detector rejects invalid arguments before scans', () => {
  const unknown = runArgs('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missingToday = runArgs('--json', '--today');
  assert.equal(missingToday.status, 1);
  assert.equal(missingToday.stderr, '');

  const missingTodayReport = JSON.parse(missingToday.stdout);
  assert.equal(missingTodayReport.ok, false);
  assert.ok(missingTodayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--today requires a value/.test(issue.detail)));

  const invalidToday = runArgs('--json', '--today', '2026-99-99');
  assert.equal(invalidToday.status, 1);
  assert.equal(invalidToday.stderr, '');

  const invalidTodayReport = JSON.parse(invalidToday.stdout);
  assert.equal(invalidTodayReport.ok, false);
  assert.ok(invalidTodayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--today must be YYYY-MM-DD/.test(issue.detail)));

  const missingDir = runArgs('--json', '--dir');
  assert.equal(missingDir.status, 1);
  assert.equal(missingDir.stderr, '');

  const missingDirReport = JSON.parse(missingDir.stdout);
  assert.equal(missingDirReport.ok, false);
  assert.ok(missingDirReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--dir requires a value/.test(issue.detail)));

  const nonexistentDir = runArgs('--json', '--dir', '.codex-missing-passed-dates-dir');
  assert.equal(nonexistentDir.status, 1);
  assert.equal(nonexistentDir.stderr, '');

  const nonexistentDirReport = JSON.parse(nonexistentDir.stdout);
  assert.equal(nonexistentDirReport.ok, false);
  assert.ok(nonexistentDirReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--dir must point to a directory/.test(issue.detail)));

  const stray = runArgs('--json', 'content');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));

  const conflicting = runArgs('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('passed-date detector supports fixture project roots and inline args', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-passed-dates-root-'));
  const contentDir = join(dir, 'src', 'content', 'tools');
  mkdirSync(contentDir, { recursive: true });
  writeFileSync(
    join(contentDir, 'tool.md'),
    `---
title: fixture
---

The model will retire on May 15, 2026.
`,
  );

  try {
    const result = runArgs('--json', `--project-dir=${dir}`, '--today=2026-06-13');
    assert.equal(result.status, 0, `fixture audit failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(dir));
    assert.equal(report.today, '2026-06-13');
    assert.equal(report.scanned, 1);
    assert.equal(report.count, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('passed-date detector prints CLI help', () => {
  const result = runArgs('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--today <YYYY-MM-DD>/);
  assert.match(result.stdout, /--dir <dir>/);
});
