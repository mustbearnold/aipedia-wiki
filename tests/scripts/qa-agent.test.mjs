import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

function runQaAgent(args) {
  return spawnSync(process.execPath, ['scripts/qa-agent.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

test('qa-agent documents deterministic and PageAgent modes', () => {
  const result = runQaAgent(['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /--page-agent/);
  assert.match(result.stdout, /--llm-base-url/);
  assert.match(result.stdout, /buyer-decision-surface/);
  assert.match(result.stdout, /local QA server/);
});

test('qa-agent rejects non-local base URLs before browser work', () => {
  const result = runQaAgent(['--route', '/', '--base-url', 'http://example.com', '--json']);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /must point at a local server/.test(failure)));
});

test('qa-agent rejects PageAgent mode without LLM configuration before static checks', () => {
  const result = runQaAgent(['--route', '/', '--page-agent', '--json']);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /requires --llm-base-url/.test(failure)));
  assert.ok(report.failures.some((failure) => /requires --model/.test(failure)));
});

test('qa-agent rejects PageAgent mode with external base-url because proxy injection needs local server ownership', () => {
  const result = runQaAgent([
    '--route',
    '/',
    '--page-agent',
    '--base-url',
    'http://127.0.0.1:4325',
    '--llm-base-url',
    'http://127.0.0.1:11434/v1',
    '--model',
    'local-model',
    '--json',
  ]);
  const report = JSON.parse(result.stdout);

  assert.notEqual(result.status, 0);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.failures.some((failure) => /requires qa-agent to start the local static server/.test(failure)));
});

test('qa-agent package script and source keep PageAgent local-only and metric-rich', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  const script = readFileSync('scripts/qa-agent.mjs', 'utf8');

  assert.equal(pkg.scripts['qa:agent'], 'node scripts/qa-agent.mjs');
  assert.match(script, /page-agent\.demo\.js/);
  assert.match(script, /autoInit=false/);
  assert.match(script, /summarizeAgentHistory/);
  assert.match(script, /page_agent_total_tokens/);
  assert.match(script, /p95_nav_duration_ms/);
  assert.match(script, /affiliate_missing_nearby_disclosure_count/);
});
