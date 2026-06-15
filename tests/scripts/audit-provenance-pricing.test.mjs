import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const PROJECT_DIR = process.cwd();
const registryPath = join(PROJECT_DIR, 'src', 'data', 'source-registry.json');

function runAudit(...args) {
  return spawnSync(process.execPath, ['scripts/audit-provenance-pricing.mjs', ...args], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
}

test('canonical source registry exists with stable IDs and trust metadata', () => {
  assert.equal(existsSync(registryPath), true, 'src/data/source-registry.json should exist');
  const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
  assert.ok(Array.isArray(registry.sources), 'registry.sources should be an array');
  assert.ok(registry.sources.length >= 10, 'registry should start with core official sources');

  const ids = registry.sources.map((source) => source.id);
  assert.equal(new Set(ids).size, ids.length, 'source IDs should be unique');

  for (const source of registry.sources) {
    assert.match(source.id, /^[a-z0-9][a-z0-9-]*$/, `bad source id: ${source.id}`);
    assert.match(source.url, /^https:\/\//, `${source.id} should use an https URL`);
    assert.ok(['official', 'docs', 'pricing', 'status', 'newsroom', 'blog', 'repository', 'third_party'].includes(source.type));
    assert.ok(['primary', 'secondary', 'tertiary'].includes(source.trust_tier));
    assert.ok(['low', 'medium', 'high'].includes(source.volatility));
  }
});

test('content schema supports provenance fields without requiring a migration flag day', () => {
  const schema = readFileSync(join(PROJECT_DIR, 'src', 'content.config.ts'), 'utf8');
  for (const key of ['source_id', 'confidence', 'review_interval_days']) {
    assert.match(schema, new RegExp(`${key}:\\s*z\\.`), `${key} should be supported on tool facts`);
  }
  assert.match(schema, /next_review_at:\s*dateish/, 'tool facts should support optional next_review_at dates');
  assert.match(schema, /evidence:\s*z\.array/, 'tool facts should support evidence arrays');
  assert.match(schema, /source_id:\s*z\.string\(\)\.optional\(\)/, 'price history should support source_id');
});

test('provenance and pricing audit is report-only and exposes migration debt', () => {
  const result = runAudit('--json');
  assert.equal(result.status, 0, `audit should be report-only\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
  const data = JSON.parse(result.stdout);

  assert.equal(data.ok, true);
  assert.equal(data.mode, 'report-only');
  assert.deepEqual(data.argument_issues, []);
  assert.ok(data.registry.total_sources >= 10);
  assert.ok(Array.isArray(data.provenance.facts_missing_source_id));
  assert.ok(Array.isArray(data.provenance.unknown_source_ids));
  assert.ok(Array.isArray(data.provenance.high_volatility_missing_next_review));
  assert.ok(Array.isArray(data.pricing.price_history_missing_source));
  assert.ok(data.totals.tools_scanned > 200);
});

test('provenance and pricing audit rejects invalid arguments before catalog scans', () => {
  const unknown = runAudit('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.tools_scanned, 0);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runAudit('--json', '--project-dir');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--project-dir requires a value/.test(issue.detail)));

  const stray = runAudit('--json', 'tools');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument tools/.test(issue.detail)));

  const conflicting = runAudit('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('provenance and pricing audit supports fixture project roots', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-provenance-pricing-'));

  try {
    const result = runAudit('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, `fixture provenance audit failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const data = JSON.parse(result.stdout);
    assert.equal(data.ok, true);
    assert.equal(data.project_dir, resolve(dir));
    assert.equal(data.registry.total_sources, 0);
    assert.equal(data.totals.tools_scanned, 0);
    assert.equal(data.totals.fact_records, 0);
    assert.deepEqual(data.provenance.unknown_source_ids, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('provenance and pricing audit prints CLI help', () => {
  const result = runAudit('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
