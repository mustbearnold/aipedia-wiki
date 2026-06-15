import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runNewsXrefs(...args) {
  return spawnSync(process.execPath, ['scripts/audit-news-xrefs.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function news(slug, toolSlug = 'alpha') {
  return `---
slug: ${slug}
title: "Alpha Control Plane Launch"
date: 2026-06-10
affects: [${toolSlug}]
---

# Alpha Control Plane Launch
`;
}

function tool({ referencesNews = true } = {}) {
  const reference = referencesNews
    ? 'Recent update: see /news/2026-06-10-alpha-control-plane-launch/ for the latest buyer impact.'
    : 'Alpha remains a solid workflow tool for teams.';

  return `---
slug: alpha
title: Alpha
---

# Alpha

${reference}
`;
}

function writeFixture({ referencesNews = true } = {}) {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-news-xrefs-'));
  const newsDir = join(fixture, 'src/content/news');
  const toolsDir = join(fixture, 'src/content/tools');
  mkdirSync(newsDir, { recursive: true });
  mkdirSync(toolsDir, { recursive: true });
  writeFileSync(join(newsDir, '2026-06-10-alpha-control-plane-launch.md'), news('2026-06-10-alpha-control-plane-launch'));
  writeFileSync(join(toolsDir, 'alpha.md'), tool({ referencesNews }));
  return fixture;
}

test('news xref audit validates affected tool links in fixture roots', () => {
  const fixture = writeFixture({ referencesNews: true });

  try {
    const result = runNewsXrefs('--json', `--project-dir=${fixture}`, '--today=2026-06-14', '--days-back=30');
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.days_back, 30);
    assert.equal(report.today, '2026-06-14');
    assert.equal(report.totals.checked, 1);
    assert.equal(report.totals.gaps, 0);
    assert.deepEqual(report.argument_issues, []);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news xref audit fails when affected tool pages omit recent news links', () => {
  const fixture = writeFixture({ referencesNews: false });

  try {
    const result = runNewsXrefs('--json', `--project-dir=${fixture}`, '--today=2026-06-14', '--days-back=30');
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.totals.checked, 1);
    assert.equal(report.totals.gaps, 1);
    assert.equal(report.gaps[0].newsSlug, '2026-06-10-alpha-control-plane-launch');
    assert.equal(report.gaps[0].toolSlug, 'alpha');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news xref audit rejects invalid arguments before scans', () => {
  const unknown = runNewsXrefs('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.checked, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runNewsXrefs('--json', '--days-back');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--days-back requires a value/.test(issue.detail)));

  const invalidWindow = runNewsXrefs('--json', '--days-back=0');
  assert.equal(invalidWindow.status, 1);
  assert.equal(invalidWindow.stderr, '');

  const invalidWindowReport = JSON.parse(invalidWindow.stdout);
  assert.equal(invalidWindowReport.ok, false);
  assert.ok(invalidWindowReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--days-back must be a positive integer/.test(issue.detail)));

  const invalidDate = runNewsXrefs('--json', '--today=06-14-2026');
  assert.equal(invalidDate.status, 1);
  assert.equal(invalidDate.stderr, '');

  const invalidDateReport = JSON.parse(invalidDate.stdout);
  assert.equal(invalidDateReport.ok, false);
  assert.ok(invalidDateReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--today must be YYYY-MM-DD/.test(issue.detail)));

  const stray = runNewsXrefs('--json', 'news');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument news/.test(issue.detail)));

  const conflicting = runNewsXrefs('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('news xref audit reports missing fixture roots as structured JSON', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-news-xrefs-missing-'));

  try {
    const result = runNewsXrefs('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'audit');
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.argument_issues, []);
    assert.ok(report.issues.some((issue) => issue.code === 'news-xrefs-root-missing' && issue.file === 'src/content/news'));
    assert.ok(report.issues.some((issue) => issue.code === 'news-xrefs-root-missing' && issue.file === 'src/content/tools'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news xref audit prints CLI help', () => {
  const result = runNewsXrefs('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--days-back <days>/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
