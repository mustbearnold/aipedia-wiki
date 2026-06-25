import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runNode(args = []) {
  return spawnSync(process.execPath, ['scripts/page-refresh-batch.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeLedger() {
  const dir = mkdtempSync(join(tmpdir(), 'page-refresh-ledger-'));
  const ledger = join(dir, 'PAGE_REFRESH_LEDGER.md');
  writeFileSync(ledger, [
    '# Test Ledger',
    '',
    '| Last updated | Page | Type | Sitemap | Date source | Source file |',
    '| --- | --- | --- | --- | --- | --- |',
    '| 2026-06-01 | /tools/old-tool/ | Tool | Yes | frontmatter | src/content/tools/old-tool.md |',
    '| 2026-06-02 | /guides/old-guide/ | Guide | Yes | frontmatter | src/content/use-cases/old-guide.md |',
    '| 2026-06-03 | /compare/old-vs-new/ | Comparison | Yes | frontmatter | src/content/comparisons/old-vs-new.md |',
    '| 2026-06-04 | /categories/ai-writing/ | Category | Yes | frontmatter | src/content/categories/ai-writing.md |',
    '| 2026-06-05 | /answers/example/ | Answer page | Yes | page metadata | src/pages/answers/example.astro |',
    '',
  ].join('\n'));
  return { dir, ledger };
}

test('page refresh planner excludes tools and orders oldest non-tool pages', () => {
  const { dir, ledger } = writeLedger();

  try {
    const result = runNode(['--json', '--ledger', ledger, '--limit', '3', '--max-workers', '2', '--pages-per-worker', '2']);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);

    assert.equal(report.batch.length, 3);
    assert.deepEqual(report.batch.map((page) => page.route), [
      '/guides/old-guide/',
      '/compare/old-vs-new/',
      '/categories/ai-writing/',
    ]);
    assert.ok(!report.batch.some((page) => page.type === 'Tool'));
    assert.equal(report.agent_briefs.worker_briefs.length, 2);
    assert.match(report.agent_briefs.worker_briefs[0].prompt, /Every web search/);
    assert.match(report.commands.route_qa_args, /--route \/guides\/old-guide\//);
    assert.match(report.commands.expensive_gates.at(-1), /--concurrency 6/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('page refresh planner can filter by page type', () => {
  const { dir, ledger } = writeLedger();

  try {
    const result = runNode(['--json', '--ledger', ledger, '--type', 'Comparison']);
    assert.equal(result.status, 0);
    const report = JSON.parse(result.stdout);

    assert.equal(report.batch.length, 1);
    assert.equal(report.batch[0].route, '/compare/old-vs-new/');
    assert.equal(report.batch[0].type, 'Comparison');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('page refresh planner documents the workflow flags', () => {
  const result = runNode(['--help']);

  assert.equal(result.status, 0);
  assert.match(result.stdout, /--pages-per-worker/);
  assert.match(result.stdout, /--include-tools/);
  assert.match(result.stdout, /--write-agent-prompts/);
  assert.match(result.stdout, /--type/);
});

test('page refresh planner can write exact agent prompt files', () => {
  const { dir, ledger } = writeLedger();
  const promptDir = join(dir, 'prompts');

  try {
    const result = runNode([
      '--json',
      '--ledger',
      ledger,
      '--limit',
      '2',
      '--max-workers',
      '2',
      '--pages-per-worker',
      '1',
      '--write-agent-prompts',
      promptDir,
    ]);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);

    assert.equal(report.prompt_dir, promptDir);
    assert.equal(report.agent_briefs.worker_briefs.length, 2);
    assert.ok(existsSync(join(promptDir, 'page-refresh-shard-01.md')));
    assert.ok(existsSync(join(promptDir, 'page-refresh-integrator.md')));
    assert.match(readFileSync(join(promptDir, 'page-refresh-shard-01.md'), 'utf8'), /You are page-refresh-shard-01/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
