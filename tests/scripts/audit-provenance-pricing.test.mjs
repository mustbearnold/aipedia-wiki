import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
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
  assert.ok(data.registry.total_sources >= 10);
  assert.ok(Array.isArray(data.provenance.facts_missing_source_id));
  assert.ok(Array.isArray(data.provenance.unknown_source_ids));
  assert.ok(Array.isArray(data.provenance.high_volatility_missing_next_review));
  assert.ok(Array.isArray(data.pricing.price_history_missing_source));
  assert.ok(data.totals.tools_scanned > 200);
});
