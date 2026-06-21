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

test('coverage backlog keeps adjacent workflow pairs review-only even if policy lists them', () => {
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
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);
    assert.ok(!selectableSlugs.includes('chatgpt-vs-grammarly'));
    assert.ok(reviewSlugs.includes('chatgpt-vs-grammarly'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog requires a shared workflow lane for broad categories', () => {
  const dir = writeFixtureProject();

  for (const [slug, title] of [
    ['ada', 'Ada'],
    ['n8n', 'n8n'],
    ['activepieces', 'Activepieces'],
    ['zapier', 'Zapier'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${title}"`,
        'category: ai-automation',
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${title}`,
        '',
      ].join('\n'),
    );
  }
  writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-automation.md'), '---\nslug: ai-automation\n---\n');
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    `${JSON.stringify(
      {
        workflow_lanes: {
          'ai-automation': {
            customer_support_automation: ['ada'],
            general_app_automation: ['activepieces', 'zapier', 'n8n'],
          },
        },
        blocked_pairs: [],
      },
      null,
      2,
    )}\n`,
  );

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=80');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('activepieces-vs-zapier'));
    assert.ok(!selectableSlugs.includes('ada-vs-n8n'));
    assert.ok(!selectableSlugs.includes('ada-vs-zapier'));
    assert.ok(reviewSlugs.includes('ada-vs-n8n'));
    assert.ok(reviewSlugs.includes('ada-vs-zapier'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog keeps broad image tools inside explicit buyer workflow lanes', () => {
  const dir = writeFixtureProject();

  for (const [slug, title] of [
    ['adobe-firefly', 'Adobe Firefly'],
    ['clipdrop', 'Clipdrop'],
    ['meshy', 'Meshy'],
    ['tripo3d', 'Tripo3D'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${title}"`,
        'category: ai-image',
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${title}`,
        '',
      ].join('\n'),
    );
  }
  writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-image.md'), '---\nslug: ai-image\n---\n');
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

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=80');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('meshy-vs-tripo3d'));
    assert.ok(!selectableSlugs.includes('adobe-firefly-vs-clipdrop'));
    assert.ok(!selectableSlugs.includes('adobe-firefly-vs-meshy'));
    assert.ok(reviewSlugs.includes('adobe-firefly-vs-clipdrop'));
    assert.ok(reviewSlugs.includes('adobe-firefly-vs-meshy'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog keeps broad design and writing tools inside explicit workflow lanes', () => {
  const dir = writeFixtureProject();

  for (const [slug, title, category] of [
    ['base44', 'Base44', 'ai-design'],
    ['canva', 'Canva', 'ai-design'],
    ['lovable', 'Lovable', 'ai-design'],
    ['v0', 'v0', 'ai-design'],
    ['beehiiv', 'beehiiv', 'ai-writing'],
    ['grammarly', 'Grammarly', 'ai-writing'],
    ['quillbot', 'QuillBot', 'ai-writing'],
    ['wordtune', 'Wordtune', 'ai-writing'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${title}"`,
        `category: ${category}`,
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${title}`,
        '',
      ].join('\n'),
    );
  }
  for (const category of ['ai-design', 'ai-writing']) {
    writeFileSync(join(dir, 'src', 'content', 'categories', `${category}.md`), `---\nslug: ${category}\n---\n`);
  }
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    `${JSON.stringify(
      {
        workflow_lanes: {
          'ai-design': {
            app_and_website_builders: ['base44', 'lovable', 'v0'],
            visual_design_canvas: ['canva'],
          },
          'ai-writing': {
            grammar_rewriting_and_paraphrase: ['grammarly', 'quillbot', 'wordtune'],
            newsletter_publishing: ['beehiiv'],
          },
        },
        blocked_pairs: [],
      },
      null,
      2,
    )}\n`,
  );

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=120');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('base44-vs-lovable'));
    assert.ok(selectableSlugs.includes('lovable-vs-v0'));
    assert.ok(selectableSlugs.includes('grammarly-vs-quillbot'));
    assert.ok(selectableSlugs.includes('grammarly-vs-wordtune'));
    assert.ok(!selectableSlugs.includes('base44-vs-canva'));
    assert.ok(!selectableSlugs.includes('beehiiv-vs-grammarly'));
    assert.ok(reviewSlugs.includes('base44-vs-canva'));
    assert.ok(reviewSlugs.includes('beehiiv-vs-grammarly'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog separates notes workspaces from meeting capture tools', () => {
  const dir = writeFixtureProject();

  for (const [slug, title] of [
    ['capacities', 'Capacities'],
    ['fireflies', 'Fireflies'],
    ['notion-ai', 'Notion AI'],
    ['otter-ai', 'Otter.ai'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${title}"`,
        'category: ai-notes',
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${title}`,
        '',
      ].join('\n'),
    );
  }
  writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-notes.md'), '---\nslug: ai-notes\n---\n');
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    `${JSON.stringify(
      {
        workflow_lanes: {
          'ai-notes': {
            personal_knowledge_workspace: ['capacities', 'notion-ai'],
            meeting_capture_and_transcription: ['fireflies', 'otter-ai'],
          },
        },
        blocked_pairs: [],
      },
      null,
      2,
    )}\n`,
  );

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=80');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('capacities-vs-notion-ai'));
    assert.ok(selectableSlugs.includes('fireflies-vs-otter-ai'));
    assert.ok(!selectableSlugs.includes('capacities-vs-fireflies'));
    assert.ok(!selectableSlugs.includes('notion-ai-vs-otter-ai'));
    assert.ok(reviewSlugs.includes('capacities-vs-fireflies'));
    assert.ok(reviewSlugs.includes('notion-ai-vs-otter-ai'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('coverage backlog separates search answer engines from browsers and enterprise search', () => {
  const dir = writeFixtureProject();

  for (const [slug, title] of [
    ['comet', 'Perplexity Comet'],
    ['dia', 'Dia'],
    ['glean', 'Glean'],
    ['morphic', 'Morphic'],
    ['perplexity', 'Perplexity'],
  ]) {
    writeFileSync(
      join(dir, 'src', 'content', 'tools', `${slug}.md`),
      [
        '---',
        `slug: ${slug}`,
        `title: "${title}"`,
        'category: ai-search',
        'status: active',
        'scores:',
        '  utility: 8',
        '---',
        '',
        `# ${title}`,
        '',
      ].join('\n'),
    );
  }
  writeFileSync(join(dir, 'src', 'content', 'categories', 'ai-search.md'), '---\nslug: ai-search\n---\n');
  writeFileSync(
    join(dir, 'src', 'data', 'comparison-policy.json'),
    `${JSON.stringify(
      {
        workflow_lanes: {
          'ai-search': {
            answer_engines: ['morphic', 'perplexity'],
            ai_browsers: ['comet', 'dia'],
            enterprise_knowledge_search: ['glean'],
          },
        },
        blocked_pairs: [],
      },
      null,
      2,
    )}\n`,
  );

  try {
    const result = runCoverageGaps(`--project-dir=${dir}`, '--limit=80');
    assert.equal(result.status, 0, result.stderr);

    const report = JSON.parse(result.stdout);
    const selectableSlugs = report.backlog.comparisons.map((item) => item.slug);
    const reviewSlugs = report.backlog.review_only_comparisons.map((item) => item.slug);

    assert.ok(selectableSlugs.includes('comet-vs-dia'));
    assert.ok(selectableSlugs.includes('morphic-vs-perplexity'));
    assert.ok(!selectableSlugs.includes('comet-vs-perplexity'));
    assert.ok(!selectableSlugs.includes('glean-vs-perplexity'));
    assert.ok(reviewSlugs.includes('comet-vs-perplexity'));
    assert.ok(reviewSlugs.includes('glean-vs-perplexity'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
