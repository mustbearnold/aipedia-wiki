import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';
import sharp from 'sharp';

function runOptimizer(...args) {
  return spawnSync(process.execPath, ['scripts/optimize-og-images.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

async function writeFixtureProject() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-og-opt-'));
  for (const dir of ['public/og/tools', 'public/og/news', 'public/og/news/light']) {
    mkdirSync(join(fixture, dir), { recursive: true });
  }

  const png = await sharp({
    create: {
      width: 120,
      height: 80,
      channels: 4,
      background: { r: 249, g: 115, b: 22, alpha: 1 },
    },
  })
    .png({ compressionLevel: 0 })
    .toBuffer();

  writeFileSync(join(fixture, 'public/og/tools/alpha.png'), png);
  writeFileSync(join(fixture, 'public/og/news/beta.png'), png);
  writeFileSync(join(fixture, 'public/og/news/light/gamma.png'), png);
  writeFileSync(join(fixture, 'public/og/tools/ignore.txt'), 'skip\n');

  return fixture;
}

async function writeTinySavingsProject() {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-og-opt-tiny-'));
  mkdirSync(join(fixture, 'public/og/tools'), { recursive: true });

  const png = await sharp({
    create: {
      width: 16,
      height: 16,
      channels: 4,
      background: { r: 249, g: 115, b: 22, alpha: 1 },
    },
  })
    .png({ compressionLevel: 0 })
    .toBuffer();

  writeFileSync(join(fixture, 'public/og/tools/tiny.png'), png);
  return fixture;
}

test('OG optimizer dry run reports PNG savings without rewriting fixtures', async () => {
  const fixture = await writeFixtureProject();
  const target = join(fixture, 'public/og/tools/alpha.png');
  const before = readFileSync(target);

  try {
    const result = runOptimizer('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.dry_run, true);
    assert.equal(report.totals.files, 3);
    assert.equal(report.totals.written_files, 0);
    assert.equal(report.totals.issues, 0);
    assert.deepEqual(report.argument_issues, []);
    assert.ok(report.totals.saved_bytes > 0);
    assert.ok(report.files.every((file) => file.written === false));
    assert.deepEqual(readFileSync(target), before);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer writes smaller fixture PNGs during normal fixture runs', async () => {
  const fixture = await writeFixtureProject();
  const target = join(fixture, 'public/og/tools/alpha.png');
  const before = readFileSync(target).length;

  try {
    const result = runOptimizer('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'optimize');
    assert.equal(report.totals.files, 3);
    assert.equal(report.totals.written_files, 3);
    assert.ok(readFileSync(target).length < before);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer check mode fails stale PNGs without rewriting fixtures', async () => {
  const fixture = await writeFixtureProject();
  const target = join(fixture, 'public/og/tools/alpha.png');
  const before = readFileSync(target);

  try {
    const result = runOptimizer('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'check');
    assert.equal(report.dry_run, true);
    assert.equal(report.check_mode, true);
    assert.equal(report.totals.files, 3);
    assert.equal(report.totals.written_files, 0);
    assert.ok(report.totals.saved_bytes > 0);
    assert.ok(report.files.every((file) => file.written === false));
    assert.deepEqual(readFileSync(target), before);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer check mode passes after fixture optimization', async () => {
  const fixture = await writeFixtureProject();

  try {
    const optimize = runOptimizer('--json', `--project-dir=${fixture}`);
    assert.equal(optimize.status, 0, optimize.stderr || optimize.stdout);

    const result = runOptimizer('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.totals.files, 3);
    assert.equal(report.totals.saved_bytes, 0);
    assert.equal(report.totals.written_files, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer check mode tolerates immaterial native compression savings', async () => {
  const fixture = await writeTinySavingsProject();

  try {
    const result = runOptimizer('--check', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'check');
    assert.equal(report.totals.files, 1);
    assert.ok(report.totals.saved_bytes > 0);
    assert.equal(report.totals.material_savings, false);
    assert.equal(report.totals.written_files, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer reports missing fixture directories as skipped', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-og-opt-missing-'));

  try {
    const result = runOptimizer('--dry-run', '--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.totals.files, 0);
    assert.equal(report.totals.skipped_dirs, 3);
    assert.ok(report.skipped_dirs.some((dir) => dir.target === 'public/og/tools'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer can limit fixture dry-run work', async () => {
  const fixture = await writeFixtureProject();

  try {
    const result = runOptimizer('--dry-run', '--json', `--project-dir=${fixture}`, '--limit=2');
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.limit, 2);
    assert.equal(report.totals.files, 2);
    assert.equal(report.totals.written_files, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('OG optimizer rejects invalid arguments before scanning', () => {
  const unknown = runOptimizer('--dry-run', '--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.files, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runOptimizer('--dry-run', '--json', '--project-dir');
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runOptimizer('--dry-run', '--json', 'public/og');
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument public\/og/.test(issue.detail)));

  const conflicting = runOptimizer('--dry-run', '--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));

  const invalidLimit = runOptimizer('--dry-run', '--json', '--limit=0');
  assert.equal(invalidLimit.status, 1);
  const invalidLimitReport = JSON.parse(invalidLimit.stdout);
  assert.ok(invalidLimitReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--limit must be a positive integer/.test(issue.detail)));

  const conflictingModes = runOptimizer('--dry-run', '--check', '--json');
  assert.equal(conflictingModes.status, 1);
  const conflictingModesReport = JSON.parse(conflictingModes.stdout);
  assert.ok(conflictingModesReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --dry-run or --check/.test(issue.detail)));
});

test('OG optimizer prints CLI help', () => {
  const result = runOptimizer('--help');

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/optimize-og-images\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--check/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.match(result.stdout, /--limit <count>/);
  assert.equal(result.stderr, '');
});
