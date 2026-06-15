import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runFontAudit(args) {
  return spawnSync(process.execPath, ['scripts/audit-font-policy.mjs', '--json', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixtureProject(fileName, content) {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-font-policy-'));
  const siteDir = join(projectDir, '.vercel', 'output', 'static');
  mkdirSync(siteDir, { recursive: true });
  writeFileSync(join(siteDir, fileName), content);
  return { projectDir, siteDir };
}

test('font policy audit passes a Metropolis-only built-site fixture', () => {
  const { projectDir } = writeFixtureProject(
    'index.html',
    '<!doctype html><style>body{font-family:"Metropolis", sans-serif}</style><h1>AiPedia</h1>\n',
  );

  try {
    const result = runFontAudit(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dist');
    assert.equal(report.files, 1);
    assert.deepEqual(report.violations, []);
    assert.deepEqual(report.issues, []);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('font policy audit flags disallowed fonts in a built-site fixture', () => {
  const { projectDir } = writeFixtureProject(
    'style.css',
    'body{font-family: Arial, sans-serif;}\n',
  );

  try {
    const result = runFontAudit(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);

    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'dist');
    assert.equal(report.files, 1);
    assert.ok(report.violations.some((violation) => violation.tokens.includes('Arial')));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('font policy audit honors explicit dist directory arguments', () => {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-font-policy-dist-'));
  const distDir = join(projectDir, 'dist-fast');
  mkdirSync(distDir, { recursive: true });
  writeFileSync(
    join(distDir, 'index.html'),
    '<!doctype html><style>body{font-family:"Metropolis", sans-serif}</style><h1>AiPedia</h1>\n',
  );

  try {
    const spaced = runFontAudit(['--project-dir', projectDir, '--dist', 'dist-fast']);
    assert.equal(spaced.status, 0, `stdout:\n${spaced.stdout}\nstderr:\n${spaced.stderr}`);

    const spacedReport = JSON.parse(spaced.stdout);
    assert.equal(spacedReport.ok, true);
    assert.equal(spacedReport.mode, 'dist');
    assert.equal(spacedReport.files, 1);

    const inline = runFontAudit(['--project-dir', projectDir, '--dist=dist-fast']);
    assert.equal(inline.status, 0, `stdout:\n${inline.stdout}\nstderr:\n${inline.stderr}`);

    const inlineReport = JSON.parse(inline.stdout);
    assert.equal(inlineReport.ok, true);
    assert.equal(inlineReport.files, 1);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('font policy audit reports structured invalid arguments', () => {
  const unknown = runFontAudit(['--wat']);

  assert.equal(unknown.status, 1);

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.files, 0);
  assert.ok(unknownReport.issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runFontAudit(['--site-dir']);

  assert.equal(missing.status, 1);

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.issues.some((issue) => issue.code === 'argument-invalid' && /--site-dir requires a path/.test(issue.detail)));

  const conflict = runFontAudit(['--source', '--dist']);

  assert.equal(conflict.status, 1);

  const conflictReport = JSON.parse(conflict.stdout);
  assert.equal(conflictReport.ok, false);
  assert.ok(conflictReport.issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --source or --dist/.test(issue.detail)));

  const stray = runFontAudit(['dist-fast']);

  assert.equal(stray.status, 1);

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument dist-fast/.test(issue.detail)));
});

test('font policy audit prints CLI help', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-font-policy.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--site-dir <dir>/);
});
