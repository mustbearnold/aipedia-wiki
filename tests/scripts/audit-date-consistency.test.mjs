import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runAudit(projectDir, args = []) {
  return new Promise((resolve) => {
    execFile(process.execPath, ['scripts/audit-date-consistency.mjs', '--project-dir', projectDir, '--json', ...args], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }, (error, stdout, stderr) => {
      resolve({
        status: error?.code ?? 0,
        stdout,
        stderr,
      });
    });
  });
}

function writeFixture({
  registryDate = '2026-06-28',
  ledgerDate = '2026-06-28',
  visibleDate = '2026-06-28',
  factVerifiedAt = '2026-06-28',
} = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'date-consistency-'));
  mkdirSync(join(dir, 'src/content/tools'), { recursive: true });
  mkdirSync(join(dir, 'src/data'), { recursive: true });
  writeFileSync(join(dir, 'src/data/source-registry.json'), `${JSON.stringify({
    version: 1,
    sources: [{
      id: 'alpha-pricing',
      label: 'Alpha pricing',
      url: 'https://example.com/pricing',
      type: 'official',
      trust_tier: 'primary',
      volatility: 'high',
      last_checked: registryDate,
    }],
  }, null, 2)}\n`);
  writeFileSync(join(dir, 'PAGE_REFRESH_LEDGER.md'), [
    '# AiPedia Page Refresh Ledger',
    '',
    '| Last updated | Page | Type | Sitemap | Date source | Source file |',
    '| --- | --- | --- | --- | --- | --- |',
    `| ${ledgerDate} | /tools/alpha/ | Tool | Yes | frontmatter | src/content/tools/alpha.md |`,
    '',
  ].join('\n'));
  writeFileSync(join(dir, 'src/content/tools/alpha.md'), [
    '---',
    'type: tool',
    'slug: alpha',
    'title: Alpha',
    'last_updated: 2026-06-28',
    'last_verified: 2026-06-28',
    'facts:',
    '  pricing_anchor:',
    '    value: Alpha Pro is the plan to verify.',
    '    source_id: alpha-pricing',
    `    verified_at: ${factVerifiedAt}`,
    '---',
    '',
    '# Alpha',
    '',
    `- [Alpha pricing](https://example.com/pricing) (verified ${visibleDate})`,
    '',
  ].join('\n'));
  return dir;
}

test('date consistency passes when tool dates, registry, and ledger align', async () => {
  const dir = writeFixture();
  try {
    const result = await runAudit(dir, [
      '--file',
      'src/content/tools/alpha.md',
      '--current-date',
      '2026-06-28',
    ]);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.totals.content_files, 1);
    assert.equal(report.totals.ledger_rows_checked, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('date consistency fails when registry last_checked lags fact verified_at', async () => {
  const dir = writeFixture({ registryDate: '2026-06-27' });
  try {
    const result = await runAudit(dir, [
      '--file',
      'src/content/tools/alpha.md',
      '--current-date',
      '2026-06-28',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((item) => item.code === 'registry-last-checked-before-verified-at'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('date consistency fails when ledger date drifts from changed page date', async () => {
  const dir = writeFixture({ ledgerDate: '2026-06-27' });
  try {
    const result = await runAudit(dir, [
      '--file',
      'src/content/tools/alpha.md',
      '--current-date',
      '2026-06-28',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((item) => item.code === 'ledger-date-mismatch'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('date consistency fails when visible verification dates exceed the page date', async () => {
  const dir = writeFixture({ visibleDate: '2026-06-29' });
  try {
    const result = await runAudit(dir, [
      '--file',
      'src/content/tools/alpha.md',
      '--current-date',
      '2026-06-29',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((item) => item.code === 'visible-date-after-page-date'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('date consistency fails when registry last_checked lags a visible source date', async () => {
  const dir = writeFixture({ registryDate: '2026-06-27', factVerifiedAt: '2026-06-27', visibleDate: '2026-06-28' });
  try {
    const result = await runAudit(dir, [
      '--file',
      'src/content/tools/alpha.md',
      '--current-date',
      '2026-06-28',
    ]);
    assert.equal(result.status, 1);
    const report = JSON.parse(result.stdout);
    assert.ok(report.issues.some((item) => item.code === 'registry-last-checked-before-visible-source-date'));
    assert.equal(report.totals.visible_source_records, 1);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
