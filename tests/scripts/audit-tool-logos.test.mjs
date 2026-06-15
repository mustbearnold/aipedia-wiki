import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runLogoAudit(...args) {
  return spawnSync(process.execPath, ['scripts/audit-tool-logos.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function tool(slug) {
  return `---
slug: ${slug}
title: ${slug}
---

# ${slug}
`;
}

function writeFixture(manifest) {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-tool-logos-'));
  const toolsDir = join(fixture, 'src/content/tools');
  const dataDir = join(fixture, 'src/data');
  mkdirSync(toolsDir, { recursive: true });
  mkdirSync(dataDir, { recursive: true });
  writeFileSync(join(toolsDir, 'alpha.md'), tool('alpha'));
  writeFileSync(join(toolsDir, 'beta.md'), tool('beta'));
  writeFileSync(join(dataDir, 'logo-manifest.json'), manifest);
  return fixture;
}

test('tool logo audit validates fixture manifest coverage', () => {
  const fixture = writeFixture(JSON.stringify({ alpha: '/logos/tools/alpha.svg', beta: '/logos/tools/beta.svg' }));

  try {
    const result = runLogoAudit('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 0, result.stderr || result.stdout);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(fixture));
    assert.equal(report.totals.tools_scanned, 2);
    assert.equal(report.totals.missing_logos, 0);
    assert.deepEqual(report.argument_issues, []);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('tool logo audit flags tools missing manifest entries', () => {
  const fixture = writeFixture(JSON.stringify({ alpha: '/logos/tools/alpha.svg' }));

  try {
    const result = runLogoAudit('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.deepEqual(report.missing, ['beta']);
    assert.equal(report.totals.tools_scanned, 2);
    assert.equal(report.totals.missing_logos, 1);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('tool logo audit rejects invalid arguments before scans', () => {
  const unknown = runLogoAudit('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.tools_scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runLogoAudit('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runLogoAudit('--json', 'tools');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument tools/.test(issue.detail)));

  const conflicting = runLogoAudit('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('tool logo audit reports missing fixture roots as structured JSON', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-tool-logos-missing-'));

  try {
    const result = runLogoAudit('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'audit');
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.argument_issues, []);
    assert.ok(report.issues.some((issue) => issue.code === 'tool-logo-root-missing' && issue.file === 'src/content/tools'));
    assert.ok(report.issues.some((issue) => issue.code === 'tool-logo-root-missing' && issue.file === 'src/data/logo-manifest.json'));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('tool logo audit reports malformed manifests as structured JSON', () => {
  const fixture = writeFixture('{not-json');

  try {
    const result = runLogoAudit('--json', `--project-dir=${fixture}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.issues[0].code, 'tool-logo-manifest-invalid-json');
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('tool logo audit prints CLI help', () => {
  const result = runLogoAudit('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
