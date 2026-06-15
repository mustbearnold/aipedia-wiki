import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runManifest(...args) {
  return spawnSync(process.execPath, ['scripts/generate-logo-manifest.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function makeFixture() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-logo-manifest-'));
  mkdirSync(join(fixture, 'public/logos/tools'), { recursive: true });
  return fixture;
}

function manifestPath(fixture) {
  return join(fixture, 'src/data/logo-manifest.json');
}

test('logo manifest generator writes deterministic fixture manifests with extension priority', () => {
  const fixture = makeFixture();
  writeFileSync(join(fixture, 'public/logos/tools', 'beta.svg'), '<svg></svg>\n');
  writeFileSync(join(fixture, 'public/logos/tools', 'alpha.svg'), '<svg></svg>\n');
  writeFileSync(join(fixture, 'public/logos/tools', 'alpha.png'), 'png\n');
  writeFileSync(join(fixture, 'public/logos/tools', 'ignored.txt'), 'skip\n');

  try {
    const result = runManifest('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'generate');
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.entries, 2);
    assert.equal(report.changed, true);
    assert.equal(report.written, true);
    assert.equal(report.missing_logo_dir, false);
    assert.deepEqual(report.argument_issues, []);

    assert.deepEqual(JSON.parse(readFileSync(manifestPath(fixture), 'utf8')), {
      alpha: '/logos/tools/alpha.png',
      beta: '/logos/tools/beta.svg',
    });
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('logo manifest check mode passes without rewriting current fixture manifests', () => {
  const fixture = makeFixture();
  mkdirSync(join(fixture, 'src/data'), { recursive: true });
  writeFileSync(join(fixture, 'public/logos/tools', 'alpha.svg'), '<svg></svg>\n');
  writeFileSync(manifestPath(fixture), JSON.stringify({ alpha: '/logos/tools/alpha.svg' }, null, 2) + '\n');

  try {
    const result = runManifest('--check', '--json', '--project-dir', fixture);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.entries, 1);
    assert.equal(report.changed, false);
    assert.equal(report.written, false);
    assert.equal(readFileSync(manifestPath(fixture), 'utf8'), JSON.stringify({ alpha: '/logos/tools/alpha.svg' }, null, 2) + '\n');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('logo manifest check mode fails stale fixture manifests without writing', () => {
  const fixture = makeFixture();
  mkdirSync(join(fixture, 'src/data'), { recursive: true });
  writeFileSync(join(fixture, 'public/logos/tools', 'alpha.svg'), '<svg></svg>\n');
  writeFileSync(manifestPath(fixture), '{}\n');

  try {
    const result = runManifest('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.entries, 1);
    assert.equal(report.changed, true);
    assert.equal(report.written, false);
    assert.equal(readFileSync(manifestPath(fixture), 'utf8'), '{}\n');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('logo manifest dry-run reports stale fixture manifests without writing', () => {
  const fixture = makeFixture();
  mkdirSync(join(fixture, 'src/data'), { recursive: true });
  writeFileSync(join(fixture, 'public/logos/tools', 'alpha.svg'), '<svg></svg>\n');
  writeFileSync(manifestPath(fixture), '{}\n');

  try {
    const result = runManifest('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.entries, 1);
    assert.equal(report.changed, true);
    assert.equal(report.written, false);
    assert.equal(readFileSync(manifestPath(fixture), 'utf8'), '{}\n');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('logo manifest generator rejects invalid arguments before writing', () => {
  const fixture = makeFixture();
  const unknown = runManifest('--json', `--project-dir=${fixture}`, '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.entries, 0);
  assert.equal(unknownReport.written, false);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runManifest('--json', '--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runManifest('--json', 'logos');
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument logos/.test(issue.detail)));

  const conflicting = runManifest('--json', '--project-dir', fixture, '--root', fixture);
  assert.equal(conflicting.status, 1);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));

  const conflictingModes = runManifest('--json', '--dry-run', '--check', `--project-dir=${fixture}`);
  assert.equal(conflictingModes.status, 1);
  const conflictingModesReport = JSON.parse(conflictingModes.stdout);
  assert.ok(conflictingModesReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --dry-run or --check/.test(issue.detail)));

  rmSync(fixture, { recursive: true, force: true });
});

test('logo manifest generator prints help', () => {
  const result = runManifest('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/generate-logo-manifest\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--check/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.equal(result.stderr, '');
});
