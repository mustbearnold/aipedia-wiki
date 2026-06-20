import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runDistBudget(siteDir) {
  return runDistBudgetArgs(['--site-dir', siteDir]);
}

function runDistBudgetArgs(args) {
  return spawnSync(process.execPath, ['scripts/check-dist-budget.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeValidBuiltSiteFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-dist-budget-'));
  writeValidBuiltSiteAt(dir);
  return dir;
}

function writeValidBuiltSiteAt(dir) {
  mkdirSync(join(dir, 'pagefind'), { recursive: true });
  mkdirSync(join(dir, 'tools'), { recursive: true });
  writeFileSync(join(dir, 'pagefind', 'pagefind.js'), 'export default {};\n');
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>AiPedia</title>\n');
  writeFileSync(join(dir, 'tools', 'index.html'), '<!doctype html><title>Tools</title>\n');
}

test('dist budget checker fails when the built site directory is missing', () => {
  const dir = join(tmpdir(), `aipedia-missing-dist-${Date.now()}`);
  const result = runDistBudget(dir);

  assert.equal(result.status, 2);
  assert.match(result.stderr, /does not exist\. Run astro build first\./);
});

test('dist budget checker fails when required built artifacts are missing', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-incomplete-dist-'));
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>AiPedia</title>\n');

  try {
    const result = runDistBudget(dir);

    assert.equal(result.status, 2);
    assert.match(result.stderr, /pagefind.*is missing/);
    assert.match(result.stderr, /tools\/index\.html.*is missing/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('dist budget checker passes against a complete small fixture', () => {
  const dir = writeValidBuiltSiteFixture();

  try {
    const result = runDistBudget(dir);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    assert.match(result.stdout, /pagefind: 0\.00MB \/ 10MB raw/);
    assert.match(result.stdout, /index\.html: 0\.00MB \/ 0\.3MB raw/);
    assert.match(result.stdout, /tools\/index\.html: 0\.00MB \/ 1\.1MB raw/);
    assert.match(result.stdout, /\[check-dist-budget\] budgets pass/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('dist budget checker skips Pagefind only for fast build output', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-fast-dist-budget-'));
  mkdirSync(join(dir, 'tools'), { recursive: true });
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>AiPedia</title>\n');
  writeFileSync(join(dir, 'tools', 'index.html'), '<!doctype html><title>Tools</title>\n');

  try {
    const fastResult = runDistBudgetArgs(['--json', '--site-dir', dir, '--mode', 'fast']);

    assert.equal(fastResult.status, 0, `stdout:\n${fastResult.stdout}\nstderr:\n${fastResult.stderr}`);
    const fastReport = JSON.parse(fastResult.stdout);
    assert.equal(fastReport.ok, true);
    assert.equal(fastReport.build_mode, 'fast');
    assert.ok(fastReport.items.some((item) => item.label === 'pagefind' && item.skipped === true));

    const fullResult = runDistBudgetArgs(['--json', '--site-dir', dir, '--mode', 'full']);

    assert.equal(fullResult.status, 2);
    const fullReport = JSON.parse(fullResult.stdout);
    assert.equal(fullReport.ok, false);
    assert.equal(fullReport.build_mode, 'full');
    assert.ok(fullReport.issues.some((issue) => issue.code === 'built-artifact-missing' && issue.label === 'pagefind'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('dist budget checker treats dist-fast paths as fast output in auto mode', () => {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-fast-dist-project-'));
  const siteDir = join(projectDir, 'dist-fast');
  mkdirSync(join(siteDir, 'tools'), { recursive: true });
  writeFileSync(join(siteDir, 'index.html'), '<!doctype html><title>AiPedia</title>\n');
  writeFileSync(join(siteDir, 'tools', 'index.html'), '<!doctype html><title>Tools</title>\n');

  try {
    const result = runDistBudgetArgs(['--json', '--project-dir', projectDir, '--site-dir', 'dist-fast']);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.build_mode, 'fast');
    assert.equal(report.site_dir, resolve(siteDir));
    assert.ok(report.items.some((item) => item.label === 'pagefind' && item.skipped === true));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('dist budget checker emits structured JSON for complete fixtures', () => {
  const dir = writeValidBuiltSiteFixture();

  try {
    const result = runDistBudgetArgs(['--json', `--site-dir=${dir}`]);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'budget');
    assert.equal(report.project_dir, resolve(process.cwd()));
    assert.equal(report.site_dir, resolve(dir));
    assert.deepEqual(report.argument_issues, []);
    assert.equal(report.totals.budgets_checked, 3);
    assert.equal(report.totals.issues, 0);
    assert.deepEqual(report.issues, []);
    assert.ok(report.items.some((item) => item.label === 'pagefind' && item.raw_max_mb === 10));
    assert.ok(report.items.some((item) => item.label === 'index.html' && item.gzip_max_mb === 0.08));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('dist budget checker resolves default Vercel output from fixture project roots', () => {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-dist-budget-project-'));
  const siteDir = join(projectDir, '.vercel', 'output', 'static');
  writeValidBuiltSiteAt(siteDir);

  try {
    const result = runDistBudgetArgs(['--json', '--project-dir', projectDir]);

    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(projectDir));
    assert.equal(report.site_dir, resolve(siteDir));
    assert.ok(report.items.some((item) => item.label === '.vercel/output/static/pagefind'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('dist budget checker emits structured JSON for missing built artifacts', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-incomplete-dist-json-'));
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>AiPedia</title>\n');

  try {
    const result = runDistBudgetArgs(['--json', '--site-dir', dir]);

    assert.equal(result.status, 2);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'budget');
    assert.equal(report.totals.issues, 2);
    assert.ok(report.issues.some((issue) => issue.code === 'built-artifact-missing' && issue.label === 'pagefind'));
    assert.ok(report.issues.some((issue) => issue.code === 'built-artifact-missing' && issue.label === 'tools/index.html'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('dist budget checker rejects invalid fixture arguments', () => {
  const unknown = runDistBudgetArgs(['--json', '--wat']);
  assert.equal(unknown.status, 2);
  assert.equal(unknown.stderr, '');
  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.budgets_checked, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runDistBudgetArgs(['--json', '--site-dir']);
  assert.equal(missing.status, 2);
  const missingReport = JSON.parse(missing.stdout);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--site-dir requires a directory path/.test(issue.detail)));

  const stray = runDistBudgetArgs(['--json', 'dist-fast']);
  assert.equal(stray.status, 2);
  const strayReport = JSON.parse(stray.stdout);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument dist-fast/.test(issue.detail)));

  const conflicting = runDistBudgetArgs(['--json', '--site-dir', 'dist', '--dist-dir', 'dist-fast']);
  assert.equal(conflicting.status, 2);
  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --site-dir or --dist-dir/.test(issue.detail)));

  const conflictingRoot = runDistBudgetArgs(['--json', '--project-dir', '.', '--root', '.']);
  assert.equal(conflictingRoot.status, 2);
  const conflictingRootReport = JSON.parse(conflictingRoot.stdout);
  assert.ok(conflictingRootReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one of --project-dir or --root/.test(issue.detail)));

  const invalidMode = runDistBudgetArgs(['--json', '--mode', 'preview']);
  assert.equal(invalidMode.status, 2);
  const invalidModeReport = JSON.parse(invalidMode.stdout);
  assert.ok(invalidModeReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--mode must be one of auto, full, or fast/.test(issue.detail)));
});

test('dist budget checker prints CLI help', () => {
  const result = runDistBudgetArgs(['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--json/);
  assert.match(result.stdout, /--site-dir <dir>/);
  assert.match(result.stdout, /--project-dir <dir>/);
  assert.match(result.stdout, /--mode <auto\|full\|fast>/);
});
