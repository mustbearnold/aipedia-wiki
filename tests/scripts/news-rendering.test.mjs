import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runNewsRendering(...args) {
  return spawnSync(process.execPath, ['scripts/audit-news-rendering.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function news(slug, title) {
  return `---
slug: ${slug}
title: "${title}"
date: 2026-06-01
sources:
  - url: https://example.com/${slug}
---

# ${title}
`;
}

test('news rendering audit catches missing source and media surfaces', () => {
  const result = runNewsRendering();

  assert.equal(result.status, 0, result.stderr || result.stdout);
  assert.match(result.stdout, /news page\(s\) have sources, active-month coverage, and required OG\/thumb assets/);
});

test('news rendering audit emits structured JSON for baseline audits', () => {
  const result = runNewsRendering('--json');
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, true);
  assert.equal(report.mode, 'guard');
  assert.equal(report.totals.issues, 0);
  assert.ok(report.totals.files_checked > 0);
  assert.deepEqual(report.argument_issues, []);
});

test('news rendering audit rejects invalid arguments before scans', () => {
  const unknown = runNewsRendering('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.files_checked, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runNewsRendering('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runNewsRendering('--json', 'news');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument news/.test(issue.detail)));

  const conflicting = runNewsRendering('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('news rendering audit supports clean project root fixtures', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-news-rendering-'));

  try {
    const newsDir = join(fixture, 'src/content/news');
    const ogDir = join(fixture, 'public/og/news');
    const thumbsDir = join(ogDir, 'thumbs');
    const thumbsLightDir = join(thumbsDir, 'light');
    mkdirSync(newsDir, { recursive: true });
    mkdirSync(thumbsDir, { recursive: true });
    mkdirSync(thumbsLightDir, { recursive: true });

    for (const slug of ['2026-06-01-alpha', '2026-06-01-beta']) {
      writeFileSync(join(newsDir, `${slug}.md`), news(slug, slug));
      writeFileSync(join(ogDir, `${slug}.png`), '');
      writeFileSync(join(thumbsDir, `${slug}.webp`), '');
      writeFileSync(join(thumbsLightDir, `${slug}.webp`), '');
    }

    const result = runNewsRendering('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.totals.files_checked, 2);
    assert.deepEqual(report.argument_issues, []);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news rendering audit reports missing fixture roots as structured JSON', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-news-rendering-missing-'));

  try {
    const result = runNewsRendering('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'guard');
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.argument_issues, []);
    assert.ok(report.issues.some((issue) => issue.code === 'news-rendering-root-missing' && issue.file === 'src/content/news'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('news rendering audit prints CLI help', () => {
  const result = runNewsRendering('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});

test('source enhancer ignores explicit not-prose source callouts', () => {
  const source = readFileSync(join(process.cwd(), 'src/components/godtier/BodyEnhancements.astro'), 'utf8');

  assert.match(source, /document\.querySelectorAll\('article\.gt-body #sources'\)/);
  assert.match(source, /!candidate\.closest\('\.not-prose'\)/);
});
