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
              slug: 'activepieces-vs-zapier',
              tools: ['activepieces', 'zapier'],
              shared_categories: ['ai-automation'],
              same_category: true,
              both_tier1: true,
              score: 10,
            },
            {
              kind: 'comparison',
              slug: 'chatgpt-vs-claude',
              tools: ['chatgpt', 'claude'],
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
    ['activepieces', 'Activepieces', 'ai-automation'],
    ['zapier', 'Zapier', 'ai-automation'],
    ['chatgpt', 'ChatGPT', 'ai-chatbots'],
    ['claude', 'Claude', 'ai-chatbots'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      ['---', `slug: ${slug}`, `title: "${title}"`, `category: ${category}`, 'status: active', '---', '', `# ${title}`, ''].join('\n'),
    );
  }

  for (const category of ['ai-automation', 'ai-chatbots']) {
    writeFileSync(join(dir, 'src', 'content', 'categories', `${category}.md`), `---\nslug: ${category}\ntitle: ${category}\n---\n`);
  }

  if (existingComparison) {
    writeFileSync(
      join(dir, 'src', 'content', 'comparisons', 'activepieces-vs-zapier.md'),
      '---\ntype: comparison\nslug: activepieces-vs-zapier\ntitle: Activepieces vs Zapier\ntools: [activepieces, zapier]\n---\n',
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
    assert.equal(cluster.slug, 'activepieces-vs-zapier');
    assert.equal(cluster.title, 'Activepieces vs Zapier');
    assert.equal(cluster.requires_canonical_fact_table, false);
    assert.deepEqual(cluster.canonical_fact_tools, []);
    assert.equal(cluster.working_set.comparison, 'src/content/comparisons/activepieces-vs-zapier.md');
    assert.ok(cluster.working_set.tool_pages.includes('src/content/tools/activepieces.md'));
    assert.ok(cluster.working_set.category_pages.includes('src/content/categories/ai-automation.md'));
    assert.equal(cluster.working_set.source_registry, 'src/data/source-registry.json');
    assert.ok(cluster.discovery_commands.some((command) => command.includes('rg -n "activepieces|zapier|activepieces-vs-zapier"')));
    assert.equal(cluster.route_qa.route, '/compare/activepieces-vs-zapier/');
    assert.deepEqual(cluster.route_qa.widths, [360, 390, 430, 768, 1024, 1366]);
    assert.ok(cluster.route_qa.checks.some((check) => /desktop 1024 and 1366/.test(check)));
    assert.ok(cluster.route_qa.checks.some((check) => /text-to-card ratios/.test(check)));
    assert.ok(cluster.verification_commands.includes('npm run audit:coverage-quality:changed'));
    assert.ok(cluster.verification_commands.some((command) => /npm run loop:verify/.test(command)));
    assert.ok(cluster.verification_commands.some((command) => /npm run qa:route/.test(command) && /360,390,430,768,1024,1366/.test(command)));
    assert.ok(cluster.verification_commands.some((command) => /npm run loop:record/.test(command)));
    assert.ok(cluster.done_definition.some((item) => /Desktop 1024 and 1366/.test(item)));
    assert.ok(cluster.done_definition.some((item) => /Layout precision/.test(item)));
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
    assert.equal(report.stale_input_policy.status, 'warning');
    assert.equal(report.stale_input_policy.enforce_flag, '--fail-on-stale-backlog');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop can block stale backlog input when freshness is required', () => {
  const dir = writeFixtureProject({ generatedAt: '2026-06-01T00:00:00.000Z' });

  try {
    const result = runDecisionLoop('--json', '--fail-on-stale-backlog', `--project-dir=${dir}`);
    assert.equal(result.status, 3, result.stderr);

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.equal(report.mode, 'stale-backlog');
    assert.equal(report.stale_input_policy.status, 'blocked');
    assert.ok(report.warnings.some((warning) => warning.code === 'backlog-stale'));
    assert.match(report.next_action, /coverage:backlog/);
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
    assert.equal(report.clusters[0].slug, 'chatgpt-vs-claude');
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
                slug: 'chatgpt-vs-claude',
                tools: ['chatgpt', 'claude'],
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
    assert.equal(report.clusters[0].slug, 'chatgpt-vs-claude');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop skips same-category pairs without a shared workflow lane', () => {
  const dir = writeFixtureProject();

  try {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', 'ada.md'),
      '---\nslug: ada\ntitle: Ada\ncategory: ai-automation\nstatus: active\n---\n',
    );
    writeFileSync(
      join(dir, 'src', 'content', 'tools', 'n8n.md'),
      '---\nslug: n8n\ntitle: n8n\ncategory: ai-automation\nstatus: active\n---\n',
    );
    writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-automation.md'), '---\nslug: ai-automation\ntitle: Automation\n---\n');
    writeFileSync(
      join(dir, 'src', 'data', 'comparison-policy.json'),
      `${JSON.stringify(
        {
          workflow_lanes: {
            'ai-automation': {
              customer_support_automation: ['ada'],
              general_app_automation: ['n8n'],
            },
          },
          blocked_pairs: [],
        },
        null,
        2,
      )}\n`,
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
                slug: 'ada-vs-n8n',
                tools: ['ada', 'n8n'],
                shared_categories: ['ai-automation'],
                same_category: true,
                comparison_mode: 'direct',
                score: 10,
              },
              {
                kind: 'comparison',
                slug: 'chatgpt-vs-claude',
                tools: ['chatgpt', 'claude'],
                shared_categories: ['ai-chatbots'],
                same_category: true,
                comparison_mode: 'direct',
                score: 9,
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
    assert.equal(report.clusters[0].slug, 'chatgpt-vs-claude');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('decision loop skips stale broad image pairs without a shared workflow lane', () => {
  const dir = writeFixtureProject();

  try {
    for (const [slug, title] of [
      ['adobe-firefly', 'Adobe Firefly'],
      ['clipdrop', 'Clipdrop'],
      ['meshy', 'Meshy'],
      ['tripo3d', 'Tripo3D'],
    ]) {
      writeFileSync(
        join(dir, 'src', 'content', 'tools', `${slug}.md`),
        ['---', `slug: ${slug}`, `title: "${title}"`, 'category: ai-image', 'status: active', '---', '', `# ${title}`, ''].join('\n'),
      );
    }
    writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-image.md'), '---\nslug: ai-image\ntitle: AI Image\n---\n');
    writeFileSync(
      join(dir, 'src', 'data', 'comparison-policy.json'),
      `${JSON.stringify(
        {
          workflow_lanes: {
            'ai-image': {
              creative_cloud_production: ['adobe-firefly'],
              utility_image_editing: ['clipdrop'],
              '3d_asset_generation': ['meshy', 'tripo3d'],
            },
          },
          blocked_pairs: [],
        },
        null,
        2,
      )}\n`,
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
                slug: 'adobe-firefly-vs-clipdrop',
                tools: ['adobe-firefly', 'clipdrop'],
                shared_categories: ['ai-image'],
                same_category: true,
                comparison_mode: 'direct',
                score: 10,
              },
              {
                kind: 'comparison',
                slug: 'meshy-vs-tripo3d',
                tools: ['meshy', 'tripo3d'],
                shared_categories: ['ai-image'],
                same_category: true,
                comparison_mode: 'direct',
                score: 9,
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
    assert.equal(report.clusters[0].slug, 'meshy-vs-tripo3d');
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
