import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';

const EXPECTED_FILES = [
  'public/favicon-16.png',
  'public/favicon-32.png',
  'public/favicon-192.png',
  'public/favicon-512.png',
  'public/favicon.ico',
  'public/apple-touch-icon.png',
];

function runPrepFavicons(...args) {
  return spawnSync(process.execPath, ['scripts/prep-favicons.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

async function writeFixtureProject() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-favicons-'));
  const brandDir = join(fixture, 'public/brand');
  mkdirSync(brandDir, { recursive: true });

  const source = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
          background: { r: 34, g: 211, b: 238, alpha: 1 },
    },
  })
    .composite([{
      input: await sharp({
        create: {
          width: 320,
          height: 320,
          channels: 4,
          background: { r: 20, g: 26, b: 38, alpha: 1 },
        },
      }).png().toBuffer(),
      left: 96,
      top: 96,
    }])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  writeFileSync(join(brandDir, 'aipedia-logo-crystal-cyan-512.png'), source);
  return fixture;
}

function assertOutputFilesExist(projectDir) {
  for (const file of EXPECTED_FILES) {
    const path = join(projectDir, file);
    assert.equal(existsSync(path), true, `${file} should exist`);
    assert.ok(readFileSync(path).length > 0, `${file} should not be empty`);
  }
}

test('prep-favicons writes fixture favicons and ico', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runPrepFavicons('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'generate');
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.generated, EXPECTED_FILES.length);
    assert.equal(report.changed, EXPECTED_FILES.length);
    assert.equal(report.written, EXPECTED_FILES.length);
    assert.deepEqual(report.argument_issues, []);
    assertOutputFilesExist(fixture);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('prep-favicons dry-run reports changes without writing fixture outputs', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runPrepFavicons('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.generated, EXPECTED_FILES.length);
    assert.equal(report.changed, EXPECTED_FILES.length);
    assert.equal(report.written, 0);
    assert.ok(report.outputs.every((output) => output.written === false));
    for (const file of EXPECTED_FILES) {
      assert.equal(existsSync(join(fixture, file)), false, `${file} should not be written`);
    }
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('prep-favicons check passes after fixture generation', async () => {
  const fixture = await writeFixtureProject();

  try {
    const generate = runPrepFavicons('--json', `--project-dir=${fixture}`);
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);

    const result = runPrepFavicons('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.generated, EXPECTED_FILES.length);
    assert.equal(report.changed, 0);
    assert.equal(report.written, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('prep-favicons check fails stale outputs without writing', async () => {
  const fixture = await writeFixtureProject();
  const stalePath = join(fixture, 'public/favicon-32.png');

  try {
    const generate = runPrepFavicons('--json', `--project-dir=${fixture}`);
    assert.equal(generate.status, 0, generate.stderr || generate.stdout);
    writeFileSync(stalePath, 'stale favicon\n');

    const result = runPrepFavicons('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');
    assert.equal(readFileSync(stalePath, 'utf8'), 'stale favicon\n');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.changed, 1);
    assert.equal(report.written, 0);
    assert.ok(report.issues.some((issue) => issue.code === 'favicon-stale'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('prep-favicons rejects invalid arguments before generating assets', () => {
  const unknown = runPrepFavicons('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.generated, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runPrepFavicons('--json', '--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runPrepFavicons('--json', 'public');
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument public/.test(issue.detail)));

  const conflictingRoot = runPrepFavicons('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflictingRoot.status, 1);
  const conflictingRootReport = JSON.parse(conflictingRoot.stdout);
  assert.ok(conflictingRootReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));

  const conflictingModes = runPrepFavicons('--json', '--dry-run', '--check');
  assert.equal(conflictingModes.status, 1);
  const conflictingModesReport = JSON.parse(conflictingModes.stdout);
  assert.ok(conflictingModesReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --dry-run or --check/.test(issue.detail)));
});

test('prep-favicons prints CLI help', () => {
  const result = runPrepFavicons('--help');

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/prep-favicons\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--check/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.equal(result.stderr, '');
});
