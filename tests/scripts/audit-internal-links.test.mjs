import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runInternalLinks(...args) {
  return spawnSync(process.execPath, ['scripts/audit-internal-links.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixture({ broken = false } = {}) {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-internal-links-'));
  const toolsDir = join(fixture, 'src/content/tools');
  const newsDir = join(fixture, 'src/content/news');
  const categoriesDir = join(fixture, 'src/content/categories');
  mkdirSync(toolsDir, { recursive: true });
  mkdirSync(newsDir, { recursive: true });
  mkdirSync(categoriesDir, { recursive: true });

  writeFileSync(join(toolsDir, 'alpha.md'), '---\nslug: alpha\n---\n# Alpha\n');
  writeFileSync(join(newsDir, '2026-06-10-alpha-launch.md'), '---\nslug: 2026-06-10-alpha-launch\n---\n# Alpha launch\n');

  const toolSlug = broken ? 'missing-tool' : 'alpha';
  const newsSlug = broken ? '2026-06-10-missing-news' : '2026-06-10-alpha-launch';
  writeFileSync(
    join(categoriesDir, 'ai-test.md'),
    [
      '---',
      'slug: ai-test',
      '---',
      '# AI Test',
      '',
      `Use /tools/${toolSlug}/ with /news/${newsSlug}/ for context.`,
      'External examples like captions.ai/tools/not-a-tool and example.com/news/2026-06-10-not-local should be ignored.',
      '',
    ].join('\n'),
  );

  return fixture;
}

test('internal link audit validates clean fixture roots', () => {
  const fixture = writeFixture({ broken: false });

  try {
    const result = runInternalLinks('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.totals.broken_unique_slugs, 0);
    assert.ok(report.totals.files_scanned >= 3);
    assert.deepEqual(report.argument_issues, []);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('internal link audit flags broken tool and news slugs', () => {
  const fixture = writeFixture({ broken: true });

  try {
    const result = runInternalLinks('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.totals.broken_tool_slugs, 1);
    assert.equal(report.totals.broken_news_slugs, 1);
    assert.equal(report.broken_tools[0].slug, 'missing-tool');
    assert.equal(report.broken_news[0].slug, '2026-06-10-missing-news');
    assert.ok(report.broken_tools[0].paths.some((path) => path.endsWith('src/content/categories/ai-test.md')));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('internal link audit flags Claude Code links aimed at the generic Claude page', () => {
  const fixture = writeFixture({ broken: false });
  const toolsDir = join(fixture, 'src/content/tools');
  const categoriesDir = join(fixture, 'src/content/categories');

  try {
    writeFileSync(join(toolsDir, 'claude.md'), '---\nslug: claude\n---\n# Claude\n');
    writeFileSync(join(toolsDir, 'claude-code.md'), '---\nslug: claude-code\n---\n# Claude Code\n');
    writeFileSync(
      join(categoriesDir, 'ai-coding.md'),
      [
        '---',
        'slug: ai-coding',
        '---',
        '# AI Coding',
        '',
        'Use [Claude Code](/tools/claude/) for terminal coding work.',
        '',
      ].join('\n'),
    );

    const result = runInternalLinks('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.totals.broken_tool_slugs, 0);
    assert.equal(report.totals.issues, 1);
    assert.equal(report.issues[0].code, 'semantic-claude-code-link-target');
    assert.match(report.issues[0].detail, /\/tools\/claude-code\//);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('internal link audit flags unlinked Claude Code alternative beside Claude', () => {
  const fixture = writeFixture({ broken: false });
  const toolsDir = join(fixture, 'src/content/tools');
  const categoriesDir = join(fixture, 'src/content/categories');

  try {
    writeFileSync(join(toolsDir, 'claude.md'), '---\nslug: claude\n---\n# Claude\n');
    writeFileSync(join(toolsDir, 'claude-code.md'), '---\nslug: claude-code\n---\n# Claude Code\n');
    writeFileSync(
      join(categoriesDir, 'ai-coding.md'),
      [
        '---',
        'slug: ai-coding',
        '---',
        '# AI Coding',
        '',
        'Use [Claude](/tools/claude/) or Claude Code for existing repo work.',
        '',
      ].join('\n'),
    );

    const result = runInternalLinks('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.totals.broken_tool_slugs, 0);
    assert.equal(report.totals.issues, 1);
    assert.equal(report.issues[0].code, 'semantic-unlinked-claude-code-alternative');
    assert.match(report.issues[0].detail, /\/tools\/claude-code\//);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('internal link audit rejects invalid arguments before scans', () => {
  const unknown = runInternalLinks('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.files_scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runInternalLinks('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runInternalLinks('--json', 'content');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));

  const conflicting = runInternalLinks('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('internal link audit reports missing fixture roots as structured JSON', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-internal-links-missing-'));

  try {
    const result = runInternalLinks('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'audit');
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.argument_issues, []);
    assert.ok(report.issues.some((issue) => issue.code === 'internal-links-root-missing' && issue.file === 'src/content/tools'));
    assert.ok(report.issues.some((issue) => issue.code === 'internal-links-root-missing' && issue.file === 'src/content/news'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('internal link audit prints CLI help', () => {
  const result = runInternalLinks('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
