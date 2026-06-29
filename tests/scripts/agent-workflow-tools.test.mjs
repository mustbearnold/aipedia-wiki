import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

import { buildEvidenceBundle } from '../../scripts/agent-evidence-bundle.mjs';
import { buildImpactReport } from '../../scripts/agent-parent-impact.mjs';
import { scorePage } from '../../scripts/agent-page-quality-score.mjs';

function writeFixture() {
  const dir = mkdtempSync(join(tmpdir(), 'agent-workflow-tools-'));
  for (const subdir of [
    'src/content/tools',
    'src/content/categories',
    'src/content/comparisons',
    'src/content/use-cases',
    'src/content/news',
    'src/data',
    'src/pages/tools',
    'src/pages/categories',
    'src/pages/compare',
    'src/pages/guides',
    'src/pages/news',
  ]) {
    mkdirSync(join(dir, subdir), { recursive: true });
  }

  writeFileSync(join(dir, 'PAGE_REFRESH_LEDGER.md'), [
    '# Ledger',
    '',
    '| Last updated | Page | Type | Sitemap | Date source | Source file |',
    '| --- | --- | --- | --- | --- | --- |',
    '| 2026-06-01 | /tools/example/ | Tool | Yes | frontmatter | src/content/tools/example.md |',
    '| 2026-06-01 | /categories/ai-coding/ | Category | Yes | frontmatter | src/content/categories/ai-coding.md |',
    '| 2026-06-01 | /compare/example-vs-other/ | Comparison | Yes | frontmatter | src/content/comparisons/example-vs-other.md |',
    '| 2026-06-01 | /guides/example-guide/ | Guide | Yes | frontmatter | src/content/use-cases/example-guide.md |',
    '| 2026-06-01 | /news/ | Static page | Yes | page metadata | src/pages/news/index.astro |',
    '| 2026-06-01 | /news/rss.xml | RSS feed | Yes | generated | src/pages/news/rss.xml.ts |',
    '| 2026-06-01 | /llms.txt | LLM surface | Yes | generated | src/pages/llms.txt.ts |',
    '| 2026-06-01 | /llms-full.txt | LLM surface | Yes | generated | src/pages/llms-full.txt.ts |',
    '| 2026-06-01 | /tools/ | Static page | Yes | file mtime | src/pages/tools/index.astro |',
    '| 2026-06-01 | /categories/ | Static page | Yes | file mtime | src/pages/categories/index.astro |',
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
        last_checked: '2026-06-01'
      },
      {
        id: 'example-docs',
        label: 'Example docs',
        url: 'https://docs.example.com/',
        type: 'docs',
        trust_tier: 'primary',
        volatility: 'medium',
        last_checked: '2026-06-01'
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
    'last_updated: 2026-06-01',
    'last_verified: 2026-06-01',
    'affiliate:',
    '  has_program: true',
    '  application_status: approved',
    '  link: https://example.com/ref',
    'facts:',
    '  pricing_anchor:',
    '    value: "$20/month Pro plan"',
    '    source_id: example-pricing',
    '    verified_at: 2026-06-01',
    '    volatility: high',
    '    confidence: high',
    '    next_review_at: 2026-06-15',
    '  best_for:',
    '    value: "Developers testing examples"',
    '    source_id: example-docs',
    '    verified_at: 2026-06-01',
    '    volatility: medium',
    '  watch_out_for:',
    '    value: "Public pricing changes often"',
    '    source_id: example-pricing',
    '    verified_at: 2026-06-01',
    '    volatility: high',
    '    next_review_at: 2026-06-15',
    'best_for:',
    '  - Developers',
    'not_best_for:',
    '  - Non-coders',
    '---',
    '',
    '## Verdict',
    '',
    'Example is best for developers. See the [Example guide](/guides/example-guide/) and [comparison](/compare/example-vs-other/).',
    '',
    '## Alternatives',
    '',
    'Other tools may fit better.',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/categories/ai-coding.md'), [
    '---',
    'slug: ai-coding',
    'title: AI Coding',
    'last_updated: 2026-06-01',
    '---',
    '',
    'Example appears in this category. [Example](/tools/example/).',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/comparisons/example-vs-other.md'), [
    '---',
    'slug: example-vs-other',
    'title: Example vs Other',
    'tools: [example, other]',
    'winner: example',
    'last_verified: 2026-06-01',
    '---',
    '',
    'Choose Example if you want the test tool. [Example](/tools/example/).',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/use-cases/example-guide.md'), [
    '---',
    'slug: example-guide',
    'title: Example Guide',
    'seo_title: Example guide',
    'meta_description: Guide to Example.',
    'buyer_job: Test a workflow',
    'audience: Developers',
    'tools_mentioned: [example]',
    'source_refs: [example-docs]',
    'last_verified: 2026-06-01',
    '---',
    '',
    'Use [Example](/tools/example/) for this workflow.',
    '',
  ].join('\n'));

  writeFileSync(join(dir, 'src/content/news/2026-06-01-example-news.md'), [
    '---',
    'slug: 2026-06-01-example-news',
    'title: Example News',
    'description: News about an example tool.',
    'date: 2026-06-01',
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
    'Example news links to [Example](/tools/example/), not the news hub.',
    '',
    '## What to do',
    '',
    'Teams should verify the source trail before changing production workflows.',
    '',
  ].join('\n'));

  return dir;
}

test('agent evidence bundle gathers facts, sources, stale signals, and parent surfaces', () => {
  const dir = writeFixture();
  try {
    const report = buildEvidenceBundle(dir, {
      route: '/tools/example/',
      currentDate: '2026-06-29',
    });

    assert.equal(report.ok, true);
    assert.equal(report.target.path, 'src/content/tools/example.md');
    assert.ok(report.source_evidence.source_ids.includes('example-pricing'));
    assert.ok(report.pricing_facts.some((fact) => fact.key === 'pricing_anchor'));
    assert.ok(report.stale_sections.some((signal) => signal.code === 'fact-review-due'));
    assert.ok(report.internal_link_suggestions.parent_surfaces.some((surface) => surface.route === '/categories/ai-coding/'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent impact detector finds parent hubs and referencing pages', () => {
  const dir = writeFixture();
  try {
    const report = buildImpactReport(dir, { route: '/tools/example/' });

    assert.equal(report.ok, true);
    const routes = report.surfaces.map((surface) => surface.route);
    assert.ok(routes.includes('/tools/'));
    assert.ok(routes.includes('/categories/ai-coding/'));
    assert.ok(routes.includes('/compare/example-vs-other/'));
    assert.ok(routes.includes('/guides/example-guide/'));
    assert.ok(report.shared_files.includes('src/data/source-registry.json'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent impact detector keeps static news hub impact focused', () => {
  const dir = writeFixture();
  try {
    const report = buildImpactReport(dir, { route: '/news/' });

    assert.equal(report.ok, true);
    assert.equal(report.target.collection, 'static');

    const routes = report.surfaces.map((surface) => surface.route);
    assert.ok(routes.includes('/'));
    assert.ok(routes.includes('/news/rss.xml'));
    assert.ok(routes.includes('/llms.txt'));
    assert.ok(routes.includes('/llms-full.txt'));
    assert.ok(!routes.includes('/news/2026-06-01-example-news/'));
    assert.equal(report.surfaces.some((surface) => surface.reason === 'frontmatter references news'), false);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent tools resolve content routes that are intentionally absent from the ledger', () => {
  const dir = writeFixture();
  try {
    const evidence = buildEvidenceBundle(dir, {
      route: '/news/2026-06-01-example-news/',
      currentDate: '2026-06-29',
    });
    const impact = buildImpactReport(dir, { route: '/news/2026-06-01-example-news/' });

    assert.equal(evidence.ok, true);
    assert.equal(evidence.target.collection, 'news');
    assert.equal(evidence.target.path, 'src/content/news/2026-06-01-example-news.md');
    assert.equal(evidence.target.ledger, null);
    assert.equal(evidence.source_evidence.inline_source_count, 2);
    assert.equal(evidence.source_evidence.total_sources, 2);

    assert.equal(impact.ok, true);
    assert.equal(impact.target.collection, 'news');
    const routes = impact.surfaces.map((surface) => surface.route);
    assert.ok(routes.includes('/news/'));
    assert.ok(routes.includes('/'));
    assert.ok(routes.includes('/news/rss.xml'));
    assert.ok(routes.includes('/llms.txt'));
    assert.ok(routes.includes('/llms-full.txt'));

    const score = scorePage(dir, {
      route: '/news/2026-06-01-example-news/',
      currentDate: '2026-06-29',
    });
    assert.equal(score.ok, true);
    assert.equal(score.evidence_summary.sources, 2);
    assert.equal(score.evidence_summary.inline_sources, 2);
    assert.notEqual(score.recommended_action, 'improve_source_coverage');
    assert.notEqual(score.recommended_action, 'strengthen_buyer_decision_path');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent page quality score returns read-only dimensions and refresh action', () => {
  const dir = writeFixture();
  try {
    const report = scorePage(dir, {
      route: '/tools/example/',
      currentDate: '2026-06-29',
    });

    assert.equal(report.ok, true);
    assert.equal(report.target.route, '/tools/example/');
    assert.ok(report.dimensions.source_quality > 0.8);
    assert.ok(report.dimensions.update_urgency > 0.5);
    assert.equal(report.recommended_action, 'refresh_current_facts');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('agent evidence CLI emits JSON for fixture routes', () => {
  const dir = writeFixture();
  try {
    const result = spawnSync(process.execPath, [
      'scripts/agent-evidence-bundle.mjs',
      '--project-dir',
      dir,
      '--route',
      '/tools/example/',
      '--current-date',
      '2026-06-29',
      '--json',
    ], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.target.route, '/tools/example/');
    assert.ok(report.recommended_updates.length > 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
