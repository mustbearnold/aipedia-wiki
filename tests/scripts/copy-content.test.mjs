import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runCopyContent(args = [], options = {}) {
  return spawnSync(process.execPath, ['scripts/copy-content.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, ...options.env },
  });
}

function writeFixtureProject() {
  const root = mkdtempSync(join(tmpdir(), 'aipedia-copy-content-'));
  const projectDir = join(root, 'aipedia');
  const contentDir = join(projectDir, 'src/content/tools');
  const metaDir = join(root, 'wikis/_meta');

  mkdirSync(contentDir, { recursive: true });
  mkdirSync(metaDir, { recursive: true });
  writeFileSync(join(contentDir, 'alpha.md'), '---\nslug: alpha\n---\n# Alpha\n');
  writeFileSync(join(contentDir, 'beta.md'), '---\nslug: beta\n---\n# Beta\n');
  writeFileSync(join(metaDir, 'tools-registry.json'), '{"tools":{}}\n');

  return { root, projectDir };
}

test('copy-content dry run reports prebuild tasks without writing fixture files', () => {
  const { root, projectDir } = writeFixtureProject();

  try {
    const result = runCopyContent(['--dry-run', '--json', `--project-dir=${projectDir}`]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'dry-run');
    assert.equal(report.project_dir, resolve(projectDir));
    assert.equal(report.markdown_files, 2);
    assert.equal(report.copied_meta_files, 1);
    assert.deepEqual(report.argument_issues, []);
    assert.deepEqual(
      report.tasks.map((task) => task.script),
      ['prep-favicons.mjs', 'generate-og-svgs.mjs', 'optimize-og-images.mjs', 'generate-logo-manifest.mjs'],
    );
    assert.ok(report.tasks.every((task) => task.skipped === true && task.status === 0));
    assert.equal(existsSync(join(projectDir, 'src/data/_meta/tools-registry.json')), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('copy-content dry run prints human-readable planned tasks', () => {
  const { root, projectDir } = writeFixtureProject();

  try {
    const result = runCopyContent(['--dry-run', '--project-dir', projectDir]);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    assert.match(result.stdout, /Content: 2 markdown files/);
    assert.match(result.stdout, /\[copy-content\] Dry run/);
    assert.match(result.stdout, /prep-favicons\.mjs/);
    assert.match(result.stdout, /generate-logo-manifest\.mjs/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('copy-content rejects invalid arguments before generator runs', () => {
  const unknown = runCopyContent(['--dry-run', '--json', '--wat']);
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.deepEqual(unknownReport.tasks, []);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const jsonWithoutDryRun = runCopyContent(['--json']);
  assert.equal(jsonWithoutDryRun.status, 1);
  const jsonWithoutDryRunReport = JSON.parse(jsonWithoutDryRun.stdout);
  assert.ok(jsonWithoutDryRunReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--json requires --dry-run/.test(issue.detail)));

  const missing = runCopyContent(['--dry-run', '--json', '--project-dir']);
  assert.equal(missing.status, 1);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runCopyContent(['--dry-run', '--json', 'content']);
  assert.equal(stray.status, 1);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument content/.test(issue.detail)));

  const conflicting = runCopyContent(['--dry-run', '--json', '--project-dir', '.', '--root', '.']);
  assert.equal(conflicting.status, 1);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));
});

test('copy-content prints CLI help', () => {
  const result = runCopyContent(['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage: node scripts\/copy-content\.mjs/);
  assert.match(result.stdout, /--dry-run/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.equal(result.stderr, '');
});

test('copy-content fails closed when a required generator exits nonzero', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-copy-content-scripts-'));
  const scripts = {
    'prep-favicons.mjs': 'process.exit(0);\n',
    'generate-og-svgs.mjs': 'process.exit(3);\n',
    'optimize-og-images.mjs': 'process.exit(0);\n',
    'generate-logo-manifest.mjs': 'process.exit(0);\n',
  };

  for (const [name, source] of Object.entries(scripts)) {
    writeFileSync(join(dir, name), source);
  }

  try {
    const result = runCopyContent([], { env: { AIPEDIA_COPY_CONTENT_SCRIPT_DIR: dir } });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /OG SVG generation failed with status 3/);
    assert.match(result.stderr, /Required prebuild generator\(s\) failed: generate-og-svgs\.mjs \(3\)/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
