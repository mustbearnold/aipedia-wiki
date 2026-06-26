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
    '| 2026-06-02 | /guides/archived-guide/ | Guide | No | frontmatter | src/content/use-cases/archived-guide.md |',
    '| 2026-06-03 | /compare/old-vs-new/ | Comparison | Yes | frontmatter | src/content/comparisons/old-vs-new.md |',
    '| 2026-06-06 | /compare/build/ | Static page | No | file mtime | src/pages/compare/build.astro |',
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
      '/guides/archived-guide/',
      '/guides/old-guide/',
      '/compare/old-vs-new/',
    ]);
    assert.ok(!report.batch.some((page) => page.type === 'Tool'));
    assert.equal(report.agent_briefs.worker_briefs.length, 2);
    assert.match(report.agent_briefs.worker_briefs[0].prompt, /Every web search/);
    assert.match(report.agent_briefs.worker_briefs[0].prompt, /Report schema:/);
    assert.match(report.agent_briefs.worker_briefs[0].report_path, /page-refresh-shard-01\.json$/);
    assert.match(report.commands.route_qa_args, /--route \/guides\/old-guide\//);
    assert.doesNotMatch(report.commands.route_qa_args, /\/guides\/archived-guide\//);
    assert.equal(report.batch[0].route_qa_policy.kind, 'archived-noindex');
    assert.equal(report.batch[1].route_qa_policy.kind, 'indexable-buyer');
    assert.match(report.commands.cheap_gates.join('\n'), /AIPEDIA_CURRENT_DATE=/);
    assert.match(report.commands.source_health, /page:source-health/);
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
    assert.equal(report.batch[0].route_qa_policy.kind, 'indexable-buyer');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('page refresh planner exposes parent-category and top-layer route policy classes', () => {
  const { dir, ledger } = writeLedger();

  try {
    const result = runNode(['--json', '--ledger', ledger, '--type', 'Category']);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);

    assert.equal(report.batch[0].route, '/categories/ai-writing/');
    assert.equal(report.batch[0].route_qa_policy.kind, 'parent-category');
    assert.equal(report.commands.route_policies['/categories/'].kind, 'top-layer');
    assert.match(report.commands.route_qa_args, /--route \/categories\/ai-writing\//);
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
  assert.match(result.stdout, /--report-dir/);
  assert.match(result.stdout, /--write-report-scaffolds/);
  assert.match(result.stdout, /--timing-dir/);
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

test('page refresh planner splits intentional noindex interactive route QA', () => {
  const { dir, ledger } = writeLedger();

  try {
    const result = runNode(['--json', '--ledger', ledger, '--type', 'Static page']);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);

    assert.deepEqual(report.commands.interactive_routes, ['/compare/build/']);
    assert.doesNotMatch(report.commands.route_qa_args, /\/compare\/build\//);
    assert.match(report.commands.interactive_route_qa_args, /--route \/compare\/build\//);
    assert.match(report.commands.expensive_gates.join('\n'), /--allow-noindex/);
    assert.match(report.commands.expensive_gates.join('\n'), /--skip-comparison-content-checks/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('page refresh planner can write worker report scaffolds', () => {
  const { dir, ledger } = writeLedger();
  const reportDir = join(dir, 'reports');

  try {
    const result = runNode([
      '--json',
      '--ledger',
      ledger,
      '--limit',
      '1',
      '--report-dir',
      reportDir,
      '--write-report-scaffolds',
    ]);
    assert.equal(result.status, 0, `stdout:\n${result.stdout}\nstderr:\n${result.stderr}`);
    const report = JSON.parse(result.stdout);

    assert.equal(report.worker_report_dir, reportDir);
    assert.ok(existsSync(join(reportDir, 'page-refresh-shard-01.json')));
    const scaffold = JSON.parse(readFileSync(join(reportDir, 'page-refresh-shard-01.json'), 'utf8'));
    assert.equal(scaffold.shard_id, 'page-refresh-shard-01');
    assert.equal(scaffold.pages.length, 1);
    assert.equal(scaffold.pages[0].status, 'pending');
    assert.equal(scaffold.checks_schema[0].command, 'short name of the check or command');
    assert.doesNotMatch(readFileSync(join(reportDir, 'page-refresh-shard-01.json'), 'utf8'), /"name":/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
