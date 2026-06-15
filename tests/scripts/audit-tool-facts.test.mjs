import assert from 'node:assert/strict';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
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
  assert.equal(data.ok, true);
  assert.equal(data.mode, 'report');
  assert.deepEqual(data.argument_issues, []);
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

test('tool fact audit rejects invalid arguments before catalog scans', () => {
  const unknown = runAudit('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.equal(unknownReport.totals.tools, 0);
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

test('tool fact audit supports fixture project roots', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-tool-facts-'));

  try {
    const result = runAudit('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, `fixture tool fact audit failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const data = JSON.parse(result.stdout);
    assert.equal(data.ok, true);
    assert.equal(data.project_dir, resolve(dir));
    assert.equal(data.totals.tools, 0);
    assert.equal(data.totals.facts, 0);
    assert.equal(data.priority.tier1.total, 0);
    assert.deepEqual(data.quality.stale_facts, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('tool fact audit prints CLI help', () => {
  const result = runAudit('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
