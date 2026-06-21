import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runDecisionLoop(...args) {
  return spawnSync(process.execPath, ['scripts/decision-loop.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixtureProject({ existingComparison = false, generatedAt = '2026-06-21T00:00:00.000Z' } = {}) {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-decision-loop-'));
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'tools'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'comparisons'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'categories'), { recursive: true });

  writeFileSync(
    join(dir, 'src', 'data', 'coverage-backlog.json'),
    `${JSON.stringify(
      {
        ok: true,
        generated_at: generatedAt,
        backlog: {
          comparisons: [
            {
              kind: 'comparison',
              slug: 'canva-vs-claude',
              tools: ['canva', 'claude'],
              shared_categories: ['ai-design'],
              same_category: true,
              both_tier1: true,
              score: 10,
            },
            {
              kind: 'comparison',
              slug: 'chatgpt-vs-poe',
              tools: ['chatgpt', 'poe'],
              shared_categories: ['ai-chatbots'],
              same_category: true,
              both_tier1: true,
              score: 10,
            },
          ],
        },
      },
      null,
      2,
    )}\n`,
  );

  for (const [slug, title, category] of [
    ['canva', 'Canva', 'ai-design'],
    ['claude', 'Claude', 'ai-design'],
    ['chatgpt', 'ChatGPT', 'ai-chatbots'],
    ['poe', 'Poe', 'ai-chatbots'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      ['---', `slug: ${slug}`, `title: "${title}"`, `category: ${category}`, 'status: active', '---', '', `# ${title}`, ''].join('\n'),
    );
  }

  for (const category of ['ai-design', 'ai-chatbots']) {
    writeFileSync(join(dir, 'src', 'content', 'categories', `${category}.md`), `---\nslug: ${category}\ntitle: ${category}\n---\n`);
  }

  if (existingComparison) {
    writeFileSync(
      join(dir, 'src', 'content', 'comparisons', 'canva-vs-claude.md'),
      '---\ntype: comparison\nslug: canva-vs-claude\ntitle: Canva vs Claude\ntools: [claude, canva]\n---\n',
    );
  }

  return dir;
}

test('decision loop emits the next cluster as JSON', () => {
  const dir = writeFixtureProject();

  try {
    const result = runDecisionLoop('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, `decision loop failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'decision-content-flywheel');
    assert.equal(report.project_dir, resolve(dir));
    assert.equal(report.count, 1);

    const [cluster] = report.clusters;
    assert.equal(cluster.slug, 'canva-vs-claude');
    assert.equal(cluster.title, 'Canva vs Claude');
    assert.equal(cluster.requires_canonical_fact_table, true);
    assert.deepEqual(cluster.canonical_fact_tools, ['claude']);
    assert.equal(cluster.working_set.comparison, 'src/content/comparisons/canva-vs-claude.md');
    assert.ok(cluster.working_set.tool_pages.includes('src/content/tools/canva.md'));
    assert.ok(cluster.working_set.category_pages.includes('src/content/categories/ai-design.md'));
    assert.equal(cluster.working_set.source_registry, 'src/data/source-registry.json');
    assert.ok(cluster.discovery_commands.some((command) => command.includes('rg -n "canva|claude|canva-vs-claude"')));
    assert.equal(cluster.route_qa.route, '/compare/canva-vs-claude/');
    assert.deepEqual(cluster.route_qa.widths, [360, 390, 430, 768, 1024, 1366]);
    assert.ok(cluster.route_qa.checks.some((check) => /desktop 1024 and 1366/.test(check)));
    assert.ok(cluster.verification_commands.includes('npm run audit:coverage-quality:changed'));
    assert.ok(cluster.verification_commands.some((command) => /npm run loop:verify/.test(command)));
    assert.ok(cluster.verification_commands.some((command) => /npm run qa:route/.test(command) && /360,390,430,768,1024,1366/.test(command)));
    assert.ok(cluster.verification_commands.some((command) => /npm run loop:record/.test(command)));
    assert.ok(cluster.done_definition.some((item) => /Desktop 1024 and 1366/.test(item)));
    assert.equal(cluster.loop_steps[0].name, 'Pick cluster');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop warns when the coverage backlog is stale', () => {
  const dir = writeFixtureProject({ generatedAt: '2026-06-01T00:00:00.000Z' });

  try {
    const result = runDecisionLoop('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.ok(report.warnings.some((warning) => warning.code === 'backlog-stale'));
    assert.match(report.warnings[0].message, /coverage:backlog/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop skips comparison pairs that already exist', () => {
  const dir = writeFixtureProject({ existingComparison: true });

  try {
    const result = runDecisionLoop('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.clusters[0].slug, 'chatgpt-vs-poe');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop skips stale false-vs backlog entries', () => {
  const dir = writeFixtureProject();

  try {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', 'descript.md'),
      '---\nslug: descript\ntitle: Descript\ncategory: ai-voice\nstatus: active\n---\n',
    );
    writeFileSync(
      join(dir, 'src', 'content', 'tools', 'grok.md'),
      '---\nslug: grok\ntitle: Grok\ncategory: ai-chatbots\nsecondary_categories: [ai-voice]\nstatus: active\n---\n',
    );
    writeFileSync(
      join(dir, 'src', 'data', 'coverage-backlog.json'),
      `${JSON.stringify(
        {
          ok: true,
          generated_at: '2026-06-21T00:00:00.000Z',
          backlog: {
            comparisons: [
              {
                kind: 'comparison',
                slug: 'descript-vs-grok',
                tools: ['descript', 'grok'],
                shared_categories: ['ai-voice'],
                same_category: true,
                both_tier1: true,
                score: 10,
              },
              {
                kind: 'comparison',
                slug: 'chatgpt-vs-poe',
                tools: ['chatgpt', 'poe'],
                shared_categories: ['ai-chatbots'],
                same_category: true,
                both_tier1: true,
                score: 10,
              },
            ],
          },
        },
        null,
        2,
      )}\n`,
    );

    const result = runDecisionLoop('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.clusters[0].slug, 'chatgpt-vs-poe');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop rejects invalid arguments before reading the backlog', () => {
  const result = runDecisionLoop('--json', '--count', 'zero');
  assert.equal(result.status, 2);
  assert.equal(result.stderr, '');

  const report = JSON.parse(result.stdout);
  assert.equal(report.ok, false);
  assert.equal(report.mode, 'argument-error');
  assert.ok(report.argument_issues.some((issue) => /--count must be a positive integer/.test(issue.detail)));
});

test('decision loop reports a missing backlog with a recovery action', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-decision-loop-empty-'));

  try {
    const result = runDecisionLoop('--json', `--project-dir=${dir}`);
    assert.equal(result.status, 1);
    assert.equal(result.stderr, '');

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'missing-backlog');
    assert.match(report.next_action, /coverage:backlog/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop prints CLI help', () => {
  const result = runDecisionLoop('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--slug <slug>/);
});
