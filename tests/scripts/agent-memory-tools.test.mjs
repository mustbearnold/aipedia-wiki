import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { scorePage } from '../../scripts/agent-page-quality-score.mjs';
import { calibrateScores } from '../../scripts/agent-score-calibration.mjs';
import { buildMemoryRecords, writeMemoryRecords } from '../../scripts/agent-memory-record.mjs';
import { queryMemory } from '../../scripts/agent-memory-query.mjs';
import { buildSparseVector, cosineSparse } from '../../scripts/lib/agent-cpu-vector.mjs';

function writeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'agent-memory-tools-'));
  for (const subdir of [
    'src/content/tools',
    'src/content/comparisons',
    'src/content/news',
    'src/content/categories',
    'src/data',
    'src/pages/answers',
  ]) {
    mkdirSync(join(dir, subdir), { recursive: true });
  }

  writeFileSync(join(dir, 'PAGE_REFRESH_LEDGER.md'), [
    '# Ledger',
    '',
    '| Last updated | Page | Type | Sitemap | Date source | Source file |',
    '| --- | --- | --- | --- | --- | --- |',
    '| 2026-06-28 | /tools/example/ | Tool | Yes | frontmatter | src/content/tools/example.md |',
    '| 2026-06-28 | /compare/example-vs-other/ | Comparison | Yes | frontmatter | src/content/comparisons/example-vs-other.md |',
    '| 2026-06-28 | /answers/static-answer/ | Static page | Yes | page metadata | src/pages/answers/static-answer.astro |',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/data/source-registry.json'), JSON.stringify({
    version: 1,
    sources: [
      {
        id: 'example-pricing',
        label: 'Example pricing',
        url: 'https://example.com/pricing',
        type: 'pricing',
        trust_tier: 'primary',
        volatility: 'high',
        last_checked: '2026-06-28'
      }
    ]
  }, null, 2));

  writeFileSync(join(dir, 'src/content/tools/example.md'), [
    '---',
    'type: tool',
    'slug: example',
    'title: Example',
    'seo_title: Example AI review',
    'meta_description: Example AI tool review.',
    'category: ai-coding',
    'price_range: "$0-$20/month"',
    'last_updated: 2026-06-28',
    'last_verified: 2026-06-28',
    'facts:',
    '  pricing_anchor:',
    '    value: "$20/month Pro plan"',
    '    source_id: example-pricing',
    '    verified_at: 2026-06-28',
    '    volatility: high',
    '    next_review_at: 2026-07-12',
    '  best_for:',
    '    value: "Developers testing examples"',
    '    source_id: example-pricing',
    '    verified_at: 2026-06-28',
    '    volatility: medium',
    '  watch_out_for:',
    '    value: "Public pricing changes often"',
    '    source_id: example-pricing',
    '    verified_at: 2026-06-28',
    '    volatility: high',
    '    next_review_at: 2026-07-12',
    'best_for:',
    '  - Developers',
    'not_best_for:',
    '  - Non-coders',
    '---',
    '',
    '## Verdict',
    '',
    'Example is best for developers. See the [comparison](/compare/example-vs-other/).',
    '',
    '## Alternatives',
    '',
    'Other tools may fit better.',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/comparisons/example-vs-other.md'), [
    '---',
    'slug: example-vs-other',
    'title: Example vs Other',
    'seo_title: Example vs Other',
    'meta_description: Example comparison.',
    'tools: [example, other]',
    'winner: example',
    'last_verified: 2026-06-28',
    '---',
    '',
    'Choose Example if you want the test tool.',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/news/2026-06-29-example-news.md'), [
    '---',
    'slug: 2026-06-29-example-news',
    'title: Example News',
    'description: A source-backed example news item.',
    'date: 2026-06-29',
    'category: news',
    'sources:',
    '  - url: https://example.com/news',
    '    title: Example source',
    '  - url: https://docs.example.com/news',
    '    title: Example docs source',
    '---',
    '',
    '## Buyer value',
    '',
    'Example news helps teams decide when to keep using [Example](/tools/example/).',
    '',
    '## What to do',
    '',
    'Teams should verify source coverage before changing production workflows.',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/pages/answers/static-answer.astro'), [
    '---',
    "import BaseLayout from '../../layouts/BaseLayout.astro';",
    'const answerContent = `Use Example when the workflow is narrow: pricing checks, source review, and buyer notes.`;',
    '---',
    '',
    '<BaseLayout title="Static Answer">{answerContent}</BaseLayout>',
    '',
  ].join('\n'));

  return dir;
}

test('CPU lexical vectors rank related text above unrelated text', () => {
  const query = buildSparseVector('pricing source gaps');
  const related = buildSparseVector('pricing source registry coverage and stale source gaps');
  const unrelated = buildSparseVector('logo rendering mobile navigation cards');

  assert.ok(cosineSparse(query, related) > cosineSparse(query, unrelated));
});

test('memory recorder writes JSONL records and query ranks them', () => {
  const dir = writeFixture();
  try {
    const report = buildMemoryRecords(dir, {
      routes: ['/tools/example/'],
      currentDate: '2026-06-29',
    });
    assert.equal(report.ok, true);
    assert.ok(report.records.some((record) => record.type === 'page_snapshot'));
    assert.ok(report.records.every((record) => record.cpu_vector?.model === 'cpu-lexical-hash-v1'));

    writeMemoryRecords(dir, report.records, 'local/tmp/memory.jsonl');
    const query = queryMemory(dir, {
      memoryPath: 'local/tmp/memory.jsonl',
      query: 'example pricing source',
      limit: 3,
    });

    assert.equal(query.ok, true);
    assert.ok(query.matches.length > 0);
    assert.equal(query.matches[0].route, '/tools/example/');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('memory query filters expired records and promotes primary same-route sources', () => {
  const dir = mkdtempSync(join(tmpdir(), 'agent-memory-policy-'));
  try {
    mkdirSync(join(dir, 'local/tmp'), { recursive: true });
    const records = [
      {
        schema_version: 'aipedia.memory-record.v1',
        id: 'expired-pricing',
        type: 'pricing_fact',
        observed_at: '2026-05-01',
        route: '/tools/example/',
        expires_after_days: 14,
        embedding_text: 'pricing source gap official',
        cpu_vector: buildSparseVector('pricing source gap official'),
      },
      {
        schema_version: 'aipedia.memory-record.v1',
        id: 'current-quality-note',
        type: 'quality_note',
        observed_at: '2026-06-29',
        route: '/tools/example/',
        expires_after_days: 180,
        embedding_text: 'pricing source gap official',
        cpu_vector: buildSparseVector('pricing source gap official'),
      },
      {
        schema_version: 'aipedia.memory-record.v1',
        id: 'current-primary-source',
        type: 'source_record',
        observed_at: '2026-06-29',
        route: '/tools/example/',
        source: {
          id: 'example-pricing',
          label: 'Example pricing',
          trust_tier: 'primary',
          volatility: 'high',
        },
        embedding_text: 'pricing source gap official',
        cpu_vector: buildSparseVector('pricing source gap official'),
      },
    ];
    writeFileSync(join(dir, 'local/tmp/memory-policy.jsonl'), `${records.map((record) => JSON.stringify(record)).join('\n')}\n`);

    const query = queryMemory(dir, {
      memoryPath: 'local/tmp/memory-policy.jsonl',
      query: 'pricing source gap official',
      route: '/tools/example/',
      currentDate: '2026-06-30',
      limit: 10,
    });

    assert.equal(query.ok, true);
    assert.deepEqual(query.matches.map((match) => match.id), ['current-primary-source', 'current-quality-note']);
    assert.equal(query.matches[0].retrieval.priority, 'primary_source:same_route');
    assert.equal(query.matches[0].retrieval.expired, false);
    assert.ok(query.matches[0].rank_score > query.matches[0].score);

    const withExpired = queryMemory(dir, {
      memoryPath: 'local/tmp/memory-policy.jsonl',
      query: 'pricing source gap official',
      route: '/tools/example/',
      currentDate: '2026-06-30',
      includeExpired: true,
      limit: 10,
    });
    const expired = withExpired.matches.find((match) => match.id === 'expired-pricing');
    assert.equal(expired.retrieval.expired, true);
    assert.equal(expired.retrieval.freshness_weight, 0.2);
    assert.equal(expired.retrieval.expires_at, '2026-05-15');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('score calibration handles tools, comparisons, and static Astro routes', () => {
  const dir = writeFixture();
  try {
    const staticScore = scorePage(dir, {
      route: '/answers/static-answer/',
      currentDate: '2026-06-29',
    });
    assert.equal(staticScore.ok, true);
    assert.equal(staticScore.target.route, '/answers/static-answer/');

    const report = calibrateScores(dir, {
      routes: ['/tools/example/', '/compare/example-vs-other/', '/answers/static-answer/'],
      currentDate: '2026-06-29',
    });

    assert.equal(report.ok, true);
    assert.equal(report.summary.route_count, 3);
    assert.ok(report.summary.risk_labels.low >= 1);
    assert.ok(report.summary.confidence_labels);
    assert.ok(report.summary.stale_decay_labels);
    const comparison = report.routes.find((route) => route.route === '/compare/example-vs-other/');
    assert.equal(comparison.calibration_label, 'source_coverage_gap');
    assert.equal(comparison.recommended_action, 'improve_source_coverage');
    assert.equal(comparison.scoring_model.page_profile, 'comparison');
    assert.equal(comparison.risk_profile.label, 'low');
    assert.equal(comparison.confidence_profile.label, 'low');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('score calibration counts inline news sources as source coverage', () => {
  const dir = writeFixture();
  try {
    const report = calibrateScores(dir, {
      routes: ['/news/2026-06-29-example-news/'],
      currentDate: '2026-06-29',
    });

    assert.equal(report.ok, true);
    assert.equal(report.summary.route_count, 1);
    const news = report.routes[0];
    assert.equal(news.collection, 'news');
    assert.equal(news.source_count, 2);
    assert.equal(news.registered_source_count, 0);
    assert.equal(news.inline_source_count, 2);
    assert.equal(news.scoring_model.page_profile, 'news');
    assert.equal(news.risk_profile.label, 'low');
    assert.ok(['medium', 'high'].includes(news.confidence_profile.label));
    assert.notEqual(news.calibration_label, 'source_coverage_gap');
    assert.ok(news.calibration_notes.includes('2 inline source(s), 0 registered source IDs'));
    assert.ok(news.calibration_notes.some((note) => /confidence$/.test(note)));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('score calibration evaluates gold-set expectations', () => {
  const dir = writeFixture();
  try {
    const report = calibrateScores(dir, {
      currentDate: '2026-06-29',
      goldSet: {
        schema_version: 'aipedia.score-goldset.v1',
        name: 'fixture gold set',
        cases: [
          {
            id: 'fresh-tool-internal-link-gap',
            route: '/tools/example/',
            rationale: 'Fresh source-backed tool fixture should still expose internal-link remediation.',
            expect: {
              recommended_action: 'improve_internal_links',
              calibration_label: 'internal_link_gap',
              risk_label: 'low',
              confidence_label: 'high',
              stale_decay_label: 'fresh',
              score_min: 0.7,
              source_count_min: 1,
              stale_signal_count_min: 0,
            },
          },
          {
            id: 'comparison-source-gap',
            route: '/compare/example-vs-other/',
            rationale: 'Comparison fixture has no source coverage and should remain a source gap.',
            expect: {
              recommended_action: 'improve_source_coverage',
              calibration_label: 'source_coverage_gap',
              risk_label: 'low',
              confidence_label: 'low',
              stale_decay_label: 'fresh',
              score_max: 0.75,
            },
          },
        ],
      },
    });

    assert.equal(report.ok, true);
    assert.equal(report.gold_set.ok, true);
    assert.equal(report.gold_set.case_count, 2);
    assert.equal(report.gold_set.mismatch_count, 0);
    assert.equal(report.gold_set_governance.ok, true);
    assert.equal(report.gold_set_governance.status, 'pass');
    assert.match(report.gold_set_governance.gold_set_hash, /^[a-f0-9]{64}$/);
    assert.equal(report.threshold_review.status, 'pass');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('score calibration requires matching review for deliberate gold-set changes', () => {
  const dir = writeFixture();
  const goldSet = {
    schema_version: 'aipedia.score-goldset.v1',
    name: 'fixture gold set',
    cases: [
      {
        id: 'comparison-source-gap',
        route: '/compare/example-vs-other/',
        rationale: 'Comparison fixture has no source coverage and should remain a source gap.',
        expect: {
          recommended_action: 'improve_source_coverage',
          calibration_label: 'source_coverage_gap',
          risk_label: 'low',
          confidence_label: 'low',
          stale_decay_label: 'fresh',
          score_max: 0.75,
        },
      },
    ],
  };

  try {
    const missingReview = calibrateScores(dir, {
      currentDate: '2026-06-29',
      goldSet,
      requireGoldSetReview: true,
    });
    assert.equal(missingReview.ok, false);
    assert.equal(missingReview.gold_set_governance.status, 'review');
    assert.ok(missingReview.gold_set_governance.issues.some((issue) => issue.code === 'review-missing'));

    const reviewed = calibrateScores(dir, {
      currentDate: '2026-06-29',
      goldSet,
      requireGoldSetReview: true,
      goldSetReview: {
        schema_version: 'aipedia.score-goldset-review.v1',
        gold_set_path: '',
        gold_set_hash: missingReview.gold_set_governance.gold_set_hash,
        changed_cases: ['comparison-source-gap'],
        reviewer: 'fixture-reviewer',
        reviewed_at: '2026-06-30',
        reason: 'Fixture proves deliberate gold-set changes require a matching review record.',
        expected_effect: 'No score threshold change, only governance validation.',
        review_lenses: ['architecture', 'evaluation', 'editorial', 'risk-confidence', 'regression', 'rollout'],
      },
    });

    assert.equal(reviewed.ok, true);
    assert.equal(reviewed.gold_set_governance.ok, true);
    assert.equal(reviewed.gold_set_governance.review.changed_cases[0], 'comparison-source-gap');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('score calibration reports gold-set mismatches', () => {
  const dir = writeFixture();
  try {
    const report = calibrateScores(dir, {
      routes: ['/compare/example-vs-other/'],
      currentDate: '2026-06-29',
      goldSet: {
        cases: [
          {
            id: 'bad-expectation',
            route: '/compare/example-vs-other/',
            expect: {
              recommended_action: 'monitor',
              confidence_label: 'high',
              stale_signal_count_min: 1,
            },
          },
        ],
      },
    });

    assert.equal(report.ok, false);
    assert.equal(report.gold_set.ok, false);
    assert.equal(report.gold_set.mismatch_count, 1);
    assert.equal(report.threshold_review.status, 'review');
    const failedFields = report.gold_set.cases[0].checks.filter((check) => !check.ok).map((check) => check.field);
    assert.ok(failedFields.includes('recommended_action'));
    assert.ok(failedFields.includes('confidence_label'));
    assert.ok(failedFields.includes('stale_signal_count'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
