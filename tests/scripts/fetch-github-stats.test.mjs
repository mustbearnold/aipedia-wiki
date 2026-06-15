import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runGithubStats(...args) {
  return spawnSync(process.execPath, ['scripts/fetch-github-stats.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function makeFixture() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-github-stats-'));
  mkdirSync(join(fixture, 'src/content/tools'), { recursive: true });
  return fixture;
}

test('github stats dry-run discovers targets without fetching or writing', () => {
  const fixture = makeFixture();
  const outputPath = join(fixture, 'src/data/github-stats.json');
  writeFileSync(
    join(fixture, 'src/content/tools/example.md'),
    `---\ntitle: Example\ngithub_url: https://github.com/example/project\n---\n`,
  );

  try {
    const result = runGithubStats('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.target_count, 1);
    assert.equal(report.targets[0].slug, 'example');
    assert.equal(report.targets[0].owner, 'example');
    assert.equal(report.targets[0].repo, 'project');
    assert.equal(report.written, false);
    assert.equal(existsSync(outputPath), false);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('github stats fails closed for missing local tool content directory', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-github-stats-empty-'));

  try {
    const result = runGithubStats('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'fatal');
    assert.equal(report.project_dir, resolve(fixture));
    assert.match(report.error.message, /src[\\/]content[\\/]tools|ENOENT/i);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('github stats skip-render-unchanged leaves matching empty output alone', () => {
  const fixture = makeFixture();
  const outputDir = join(fixture, 'src/data');
  const outputPath = join(outputDir, 'github-stats.json');
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, '{}');
  const previousMtime = statSync(outputPath).mtimeMs;

  try {
    const result = runGithubStats('--skip-render-unchanged', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /output unchanged/);
    assert.equal(readFileSync(outputPath, 'utf8'), '{}');
    assert.equal(statSync(outputPath).mtimeMs, previousMtime);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('github stats can write no-target output to a custom path', () => {
  const fixture = makeFixture();
  const outputPath = join(fixture, 'tmp/github-stats.build.json');

  try {
    const result = runGithubStats('--output', 'tmp/github-stats.build.json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(readFileSync(outputPath, 'utf8'), '{}');
    assert.equal(existsSync(join(fixture, 'src/data/github-stats.json')), false);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('github stats rejects invalid arguments before local reads', () => {
  const unknown = runGithubStats('--dry-run', '--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runGithubStats('--dry-run', '--json', '--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const missingOutput = runGithubStats('--dry-run', '--json', '--output');
  assert.equal(missingOutput.status, 1);
  const missingOutputReport = JSON.parse(missingOutput.stdout);
  assert.ok(missingOutputReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--output requires a value/.test(issue.detail)));

  const conflicting = runGithubStats('--dry-run', '--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('github stats prints help', () => {
  const result = runGithubStats('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/fetch-github-stats\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--skip-render-unchanged/);
  assert.match(result.stdout, /--output <path>/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.equal(result.stderr, '');
});
