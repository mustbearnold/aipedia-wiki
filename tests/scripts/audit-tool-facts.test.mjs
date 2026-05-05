import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { test } from 'node:test';

const PROJECT_DIR = process.cwd();
const priorityPath = join(PROJECT_DIR, 'src', 'data', 'tool-priority.json');

function runAudit(...args) {
  return spawnSync(process.execPath, ['scripts/audit-tool-facts.mjs', ...args], {
    cwd: PROJECT_DIR,
    encoding: 'utf8',
  });
}

test('tool priority tiers define an existing top-25 tier1 set', () => {
  assert.equal(existsSync(priorityPath), true, 'src/data/tool-priority.json should exist');
  const priority = JSON.parse(readFileSync(priorityPath, 'utf8'));
  assert.equal(priority.tier1.length, 25, 'tier1 should contain the initial top 25 tools');

  const missing = priority.tier1.filter((slug) => !existsSync(join(PROJECT_DIR, 'src', 'content', 'tools', `${slug}.md`)));
  assert.deepEqual(missing, [], `tier1 slugs missing tool pages: ${missing.join(', ')}`);
});

test('facts schema explicitly supports tier1 decision keys and volatility metadata', () => {
  const schema = readFileSync(join(PROJECT_DIR, 'src', 'content.config.ts'), 'utf8');
  const requiredKeys = [
    'flagship_model',
    'context_window',
    'pricing_anchor',
    'free_plan',
    'best_paid_tier',
    'api_available',
    'image_generation',
    'video_generation',
    'real_time_voice',
    'web_browsing',
    'coding_agent',
    'enterprise_controls',
    'data_retention_or_privacy',
    'open_source_or_local',
    'best_for',
    'watch_out_for',
  ];

  for (const key of requiredKeys) {
    assert.match(schema, new RegExp(`${key}:\\s*toolFact\\.optional\\(\\)`), `${key} should be an explicit tool fact key`);
  }
  assert.match(schema, /volatility:\s*z\.enum\(\[/, 'tool facts should support optional volatility metadata');
});

test('tool fact audit reports catalog coverage as JSON without failing', () => {
  const result = runAudit('--json');
  assert.equal(result.status, 0, `audit should be report-only\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

  const data = JSON.parse(result.stdout);
  assert.equal(data.required_keys.length, 16);
  assert.equal(data.priority.tier1.total, 25);
  assert.ok(data.totals.tools_with_facts > 0);
  assert.ok(data.totals.tools_missing_facts >= 0);
  assert.equal(data.totals.tools_with_facts + data.totals.tools_missing_facts, data.totals.tools);
  assert.ok(data.priority.tier1.completeness_percent >= 0);
  assert.ok(Array.isArray(data.priority.tier1.missing_by_tool));
  assert.ok(Array.isArray(data.quality.facts_missing_source));
  assert.ok(Array.isArray(data.quality.facts_missing_verified_at));
  assert.ok(Array.isArray(data.quality.stale_facts));
});
