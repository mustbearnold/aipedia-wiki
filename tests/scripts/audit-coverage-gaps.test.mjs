import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

function runCoverageGaps(...args) {
  return spawnSync(process.execPath, ['scripts/audit-coverage-gaps.mjs', '--json', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function writeFixtureProject() {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-coverage-gaps-'));
  mkdirSync(join(dir, 'src', 'data'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'tools'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'comparisons'), { recursive: true });
  mkdirSync(join(dir, 'src', 'content', 'categories'), { recursive: true });
  mkdirSync(join(dir, 'src', 'pages', 'answers'), { recursive: true });

  writeFileSync(
    join(dir, 'src', 'data', 'tool-priority.json'),
    `${JSON.stringify({ tier1: ['descript', 'elevenlabs', 'grok', 'chatgpt', 'grammarly'], tier2: [], tier3: [] }, null, 2)}\n`,
  );

  for (const [slug, category, secondary = []] of [
    ['descript', 'ai-voice'],
    ['elevenlabs', 'ai-voice'],
    ['grok', 'ai-chatbots', ['ai-voice']],
    ['chatgpt', 'ai-chatbots', ['ai-writing']],
    ['grammarly', 'ai-writing'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${slug}"`,
        `category: ${category}`,
        secondary.length ? `secondary_categories: [${secondary.join(', ')}]` : '',
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${slug}`,
        '',
      ]
        .filter(Boolean)
        .join('\n'),
    );
  }

  for (const category of ['ai-voice', 'ai-chatbots', 'ai-writing']) {
    writeFileSync(join(dir, 'src', 'content', 'categories', `${category}.md`), `---\nslug: ${category}\n---\n`);
  }

  return dir;
}

test('coverage backlog keeps primary-secondary overlap out of selectable comparisons', () => {
  const dir = writeFixtureProject();

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=20');
    assert.equal(result.status, 0, `coverage gaps failed\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('descript-vs-elevenlabs'));
    assert.ok(!selectableSlugs.includes('descript-vs-grok'));
    assert.ok(reviewSlugs.includes('descript-vs-grok'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog allows explicitly approved adjacent workflow pairs', () => {
  const dir = writeFixtureProject();
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    `${JSON.stringify(
      {
        allowed_adjacent_pairs: [
          {
            tools: ['chatgpt', 'grammarly'],
            workflow: 'writing and editing',
            reason: 'same writing job',
          },
        ],
        blocked_pairs: [],
      },
      null,
      2,
    )}\n`,
  );

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=20');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const pair = report.backlog.comparisons.find((item) => item.slug === 'chatgpt-vs-grammarly');
    assert.equal(pair?.comparison_mode, 'allowed_adjacent');
    assert.equal(pair?.requires_asymmetric_framing, true);
    assert.equal(pair?.workflow_family, 'writing and editing');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
