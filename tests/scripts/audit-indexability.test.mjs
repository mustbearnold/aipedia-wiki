import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function writeHtml(file, body = '<h1>AiPedia</h1>') {
  mkdirSync(join(file, '..'), { recursive: true });
  writeFileSync(file, `<!doctype html><html><head><title>AiPedia</title></head><body>${body}</body></html>\n`);
}

function writeSitemap(siteDir, paths) {
  const urls = paths.map((path) => `<url><loc>https://aipedia.wiki${path}</loc></url>`).join('');
  writeFileSync(siteDir, `<?xml version="1.0" encoding="UTF-8"?><urlset>${urls}</urlset>\n`);
}

function runIndexability(args) {
  return spawnSync(process.execPath, ['scripts/audit-indexability.mjs', '--json', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixtureProject() {
  const projectDir = mkdtempSync(join(tmpdir(), 'aipedia-indexability-'));
  const siteDir = join(projectDir, '.vercel', 'output', 'static');
  mkdirSync(siteDir, { recursive: true });
  writeFileSync(join(projectDir, 'vercel.json'), '{"headers":[],"redirects":[]}\n');
  return { projectDir, siteDir };
}

test('indexability audit passes against a minimal built-site fixture', () => {
  const { projectDir, siteDir } = writeFixtureProject();
  writeSitemap(join(siteDir, 'sitemap-0.xml'), ['/']);
  writeHtml(join(siteDir, 'index.html'));

  try {
    const result = runIndexability(['--project-dir', projectDir, '--site-dir', siteDir]);

    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.dist, '.vercel/output/static');
    assert.equal(report.sitemap_urls, 1);
    assert.equal(report.checked_html, 1);
    assert.deepEqual(report.issues, []);
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('indexability audit flags noindex routes included in a sitemap fixture', () => {
  const { projectDir, siteDir } = writeFixtureProject();
  writeSitemap(join(siteDir, 'sitemap-0.xml'), ['/search/']);
  writeHtml(
    join(siteDir, 'search', 'index.html'),
    '<meta name="robots" content="noindex"><h1>Search</h1>',
  );

  try {
    const result = runIndexability(['--project-dir', projectDir, '--site-dir', siteDir]);

    assert.equal(result.status, 1);

    const report = JSON.parse(result.stdout);
    const issueCodes = new Set(report.issues.map((issue) => issue.code));
    assert.equal(report.ok, false);
    assert.equal(report.dist, '.vercel/output/static');
    assert.ok(issueCodes.has('meta-noindex-in-sitemap'));
    assert.ok(issueCodes.has('required-noindex-url-in-sitemap'));
  } finally {
    rmSync(projectDir, { recursive: true, force: true });
  }
});

test('indexability audit reports structured invalid arguments', () => {
  const result = runIndexability(['--wat']);

  assert.equal(result.status, 1);

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.ok(report.issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const stray = runIndexability(['dist-fast']);

  assert.equal(stray.status, 1);

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument dist-fast/.test(issue.detail)));
});

test('indexability audit prints CLI help', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-indexability.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--site-dir <dir>/);
});
