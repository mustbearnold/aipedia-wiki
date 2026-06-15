import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { test } from 'node:test';

function runEnforcer(args) {
  return spawnSync(process.execPath, ['scripts/enforce-built-font-policy.mjs', '--json', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFile(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
}

function writeFixtureProject() {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-enforce-font-policy-'));
  const siteDir = join(projectDir, '.vercel', 'output', 'static');
  const pagefindDir = join(projectDir, 'public', 'pagefind');
  mkdirSync(siteDir, { recursive: true });
  mkdirSync(pagefindDir, { recursive: true });
  return { projectDir, siteDir, pagefindDir };
}

test('built font policy enforcer normalizes generated site and Pagefind assets in fixtures', () => {
  const { projectDir, siteDir, pagefindDir } = writeFixtureProject();
  const siteCss = join(siteDir, 'assets', 'app.css');
  const siteHtml = join(siteDir, 'index.html');
  const pagefindCss = join(pagefindDir, 'pagefind-ui.css');

  writeFile(
    siteCss,
    [
      'body{font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif)}',
      ':root{--font-sans:ui-sans-serif,system-ui,sans-serif;}',
    ].join('\n'),
  );
  writeFile(siteHtml, '<p style="font-family: Arial, sans-serif">AiPedia</p>\n');
  writeFile(
    pagefindCss,
    '.pagefind{--pagefind-ui-font:system-ui,sans-serif;font-family:var(--pf-font, system-ui, Arial, sans-serif)}\n',
  );

  try {
    const result = runEnforcer(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.scanned_files, 3);
    assert.equal(report.normalized_files, 3);
    assert.deepEqual(report.issues, []);

    assert.match(readFileSync(siteCss, 'utf8'), /font-family:var\(--default-font-family\)/);
    assert.match(readFileSync(siteCss, 'utf8'), /--font-sans:"Metropolis", sans-serif;/);
    assert.match(readFileSync(siteHtml, 'utf8'), /font-family: Metropolis, sans-serif/);
    assert.match(readFileSync(pagefindCss, 'utf8'), /--pagefind-ui-font:'Metropolis',sans-serif;/);
    assert.match(readFileSync(pagefindCss, 'utf8'), /var\(--pf-font, 'Metropolis', sans-serif\)/);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('built font policy enforcer leaves clean fixture assets untouched', () => {
  const { projectDir, siteDir } = writeFixtureProject();
  writeFile(join(siteDir, 'index.html'), '<style>body{font-family:"Metropolis", sans-serif}</style>\n');

  try {
    const result = runEnforcer(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);

    assert.equal(result.status, 0);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.scanned_files, 1);
    assert.equal(report.normalized_files, 0);
    assert.deepEqual(report.normalized_paths, []);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('built font policy enforcer reports structured invalid and missing-directory arguments', () => {
  const unknown = runEnforcer(['--wat']);

  assert.equal(unknown.status, 1);

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.scanned_files, 0);
  assert.ok(unknownReport.issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missingValue = runEnforcer(['--site-dir']);

  assert.equal(missingValue.status, 1);

  const missingValueReport = JSON.parse(missingValue.stdout);
  assert.equal(missingValueReport.ok, false);
  assert.ok(missingValueReport.issues.some((issue) => issue.code === 'argument-invalid' && /--site-dir requires a path/.test(issue.detail)));

  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-enforce-font-policy-missing-'));
  try {
    const missingSite = runEnforcer(['--project-dir', projectDir, '--site-dir', '.vercel/output/static']);

    assert.equal(missingSite.status, 1);

    const missingSiteReport = JSON.parse(missingSite.stdout);
    assert.equal(missingSiteReport.ok, false);
    assert.ok(missingSiteReport.issues.some((issue) => issue.code === 'site-dir-missing'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('built font policy enforcer prints CLI help', () => {
  const result = spawnSync(process.execPath, ['scripts/enforce-built-font-policy.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--site-dir <dir>/);
  assert.match(result.stdout, /--json/);
});
