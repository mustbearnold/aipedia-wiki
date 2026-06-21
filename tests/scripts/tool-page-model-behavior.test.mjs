import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
let modulePromise;

function readSource(path) {
  return readFileSync(join(ROOT, path), 'utf8');
}

function writeTemp(root, path, contents) {
  const absolute = join(root, path);
  mkdirSync(dirname(absolute), { recursive: true });
  writeFileSync(absolute, contents);
}

async function loadToolPageModel() {
  if (!modulePromise) {
    const fixture = mkdtempSync(join(tmpdir(), 'aipedia-tool-page-model-'));

    writeTemp(fixture, 'src/utils/tool-metadata.ts', readSource('src/utils/tool-metadata.ts'));
    writeTemp(
      fixture,
      'src/data/source-registry.json',
      `${JSON.stringify({
        sources: [
          {
            id: '7ai-platform',
            label: '7AI platform registry fixture',
            url: 'https://example.com/registered-source',
            trust_tier: 'primary',
            volatility: 'high',
            last_checked: '2030-01-01',
          },
        ],
      }, null, 2)}\n`,
    );
    writeTemp(
      fixture,
      'src/lib/provenance.ts',
      readSource('src/lib/provenance.ts')
        .replace("import sourceRegistry from '../data/source-registry.json';", "import sourceRegistry from '../data/source-registry.json' with { type: 'json' };")
    );
    writeTemp(
      fixture,
      'src/lib/content-models/evidence-rail.ts',
      readSource('src/lib/content-models/evidence-rail.ts')
        .replace("from '../provenance'", "from '../provenance.ts'")
    );
    writeTemp(
      fixture,
      'src/lib/content-models/tool-page-model.ts',
      readSource('src/lib/content-models/tool-page-model.ts')
        .replace("from '../../utils/tool-metadata'", "from '../../utils/tool-metadata.ts'")
        .replace("from '../provenance'", "from '../provenance.ts'")
        .replace("from './evidence-rail'", "from './evidence-rail.ts'")
    );

    modulePromise = import(pathToFileURL(join(fixture, 'src/lib/content-models/tool-page-model.ts')).href);
  }

  return modulePromise;
}

test('ToolPageModel reports provenance states and dedupes source uses', async () => {
  const { buildToolPageModel, toFactListFacts } = await loadToolPageModel();
  const model = buildToolPageModel({
    slug: 'fixture-tool',
    title: 'Fixture Tool',
    tagline: 'Fixture tagline',
    category: 'ai-coding',
    quick_answer: 'Use it for fixture work.',
    facts: {
      best_for: {
        value: 'Agent teams',
        source_id: '7ai-platform',
        verified_at: '2026-02-04',
      },
      pricing_anchor: {
        value: '$20 per seat',
        source_id: 'unregistered-fixture-source',
      },
      flagship_model: {
        value: 'Fixture Max',
        source: 'https://example.com/fixture-model',
        source_label: 'Fixture model page',
        verified_at: '2026-02-03',
      },
    },
    price_history: [
      {
        date: '2026-01-01',
        price: '$20',
        source_id: '7ai-platform',
      },
      {
        date: '2026-02-01',
        price: '$25',
        source: 'https://example.com/fixture-pricing',
        source_label: 'Fixture pricing page',
      },
    ],
  });

  const registered = model.sources.find((source) => source.source_id === '7ai-platform');
  assert.ok(registered, 'registered fact source should be retained once while older pricing rows stay historical');
  assert.deepEqual(registered.used_by.sort(), ['fact']);
  assert.equal(model.sources.filter((source) => source.source_id === '7ai-platform').length, 1);

  assert.ok(
    model.diagnostics.some((issue) => issue.code === 'unknown_source_id' && issue.path === 'facts.pricing_anchor.source_id'),
    'unknown source_id without inline URL or label must be audit-visible'
  );

  const renderedFacts = toFactListFacts(model.facts);
  const renderedRegisteredFact = renderedFacts.find((fact) => fact.label === 'Best For');
  const renderedFlagship = renderedFacts.find((fact) => fact.label === 'Flagship Model');
  assert.equal(renderedRegisteredFact.verified, '2026-02-04');
  assert.equal(renderedRegisteredFact.source, '7AI platform registry fixture');
  assert.equal(renderedFlagship.verified, '2026-02-03');
  assert.equal(renderedFlagship.source, 'Fixture model page');
  assert.ok(
    model.diagnostics.some((issue) => issue.code === 'stale_source' && issue.path === 'sources.7ai-platform'),
    'registered claim-level verified_at should drive stale source diagnostics'
  );
  assert.ok(
    model.diagnostics.some((issue) => issue.code === 'inline_only_source' && issue.path === 'facts.flagship_model.source'),
    'fact inline-only source should be reported'
  );
  assert.ok(
    model.diagnostics.some((issue) => issue.code === 'inline_only_source' && issue.path === 'price_history.1.source'),
    'pricing inline-only source should be reported'
  );
  assert.equal(model.freshness.has_stale_claims, true, 'stale source dates should mark the model freshness state');
  assert.equal(model.evidence.sourceCount, 4);
  assert.equal(model.evidence.primaryLabel, '7AI platform registry fixture');
  assert.equal(model.evidence.evidenceState, 'unknown_id');
  assert.equal(model.evidence.freshnessState, 'stale');
  assert.equal(model.evidence.confidence, 'low');
  assert.equal(model.evidence.verifiedAt, '2026-02-03');
  assert.equal(model.evidence.volatility, 'high');

  const registeredFact = model.facts.find((fact) => fact.key === 'best_for');
  assert.equal(registeredFact.verified_at, '2026-02-04');

  const flagship = model.facts.find((fact) => fact.key === 'flagship_model');
  assert.equal(flagship.verified_at, '2026-02-03');
  assert.equal(flagship.source.label, 'Fixture model page');
});

test('ToolPageModel keeps duplicate source freshness conservative', async () => {
  const { buildToolPageModel } = await loadToolPageModel();
  const model = buildToolPageModel({
    slug: 'duplicate-source-tool',
    title: 'Duplicate Source Tool',
    tagline: 'Fixture tagline',
    category: 'ai-coding',
    quick_answer: 'Use it for duplicate source checks.',
    facts: {
      best_for: {
        value: 'Fresh registry claim',
        source_id: '7ai-platform',
      },
      pricing_anchor: {
        value: 'Stale claim override',
        source_id: '7ai-platform',
        verified_at: '2020-01-01',
      },
    },
  });

  const registered = model.sources.find((source) => source.source_id === '7ai-platform');
  assert.ok(registered, 'duplicate registered source should be retained');
  assert.equal(registered.verified_at, '2020-01-01');
  assert.ok(
    model.diagnostics.some((issue) => issue.code === 'stale_source' && issue.path === 'sources.7ai-platform'),
    'later stale duplicate source claims should drive stale diagnostics'
  );
  assert.equal(model.freshness.has_stale_claims, true, 'later stale duplicate source claims should mark model freshness');
  assert.equal(model.evidence.verifiedAt, '2020-01-01');
  assert.equal(model.evidence.freshnessState, 'stale');
  assert.equal(model.evidence.confidence, 'low');
});

test('ToolPageModel applies decision and CTA precedence from normalized fields', async () => {
  const { buildToolPageModel } = await loadToolPageModel();
  const model = buildToolPageModel({
    slug: 'precedence-tool',
    title: 'Precedence Tool',
    tagline: 'Fallback tagline',
    url: 'https://example.com/precedence',
    category: 'ai-coding',
    status: 'active',
    last_updated: '2026-01-15',
    last_verified: '2026-02-16',
    update_frequency: 'monthly',
    quick_answer: 'Prefer the explicit verdict.',
    best_for: ['explicit best fit'],
    not_best_for: ['explicit skip fit'],
    best_plan: 'Explicit Pro plan',
    best_alternative: 'Alternative X',
    recent_change: 'Launched model controls',
    primary_cta_label: 'Start explicitly',
    affiliate: {
      link: 'https://partners.example.com/precedence',
      application_status: 'applied',
    },
    facts: {
      best_paid_tier: {
        value: 'Fact fallback tier',
      },
    },
  });

  assert.equal(model.identity.title, 'Precedence Tool');
  assert.equal(model.identity.category_label, 'Coding');
  assert.equal(model.identity.status, 'active');
  assert.equal(model.freshness.last_updated, '2026-01-15');
  assert.equal(model.freshness.last_verified, '2026-02-16');
  assert.equal(model.freshness.update_frequency, 'monthly');
  assert.equal(model.decision.verdict, 'Prefer the explicit verdict.');
  assert.deepEqual(model.decision.buy_if, ['explicit best fit']);
  assert.deepEqual(model.decision.skip_if, ['explicit skip fit']);
  assert.equal(model.decision.best_plan, 'Explicit Pro plan');
  assert.equal(model.decision.best_alternative, 'Alternative X');
  assert.equal(model.decision.recent_change, 'Launched model controls');
  assert.equal(model.cta.label, 'Start explicitly');
  assert.equal(model.cta.href, 'https://example.com/precedence');
  assert.equal(model.cta.disclosure, undefined);
  assert.equal(model.cta.affiliate_state, 'applied');
  assert.equal(model.cta.affiliate_url, undefined);
  assert.equal(model.cta.canonical_url, 'https://example.com/precedence');
});

test('ToolPageModel only prefers approved affiliate URLs', async () => {
  const { buildToolPageModel } = await loadToolPageModel();
  const approved = buildToolPageModel({
    slug: 'approved-affiliate-tool',
    title: 'Approved Affiliate Tool',
    tagline: 'Fixture tagline',
    url: 'https://example.com/approved',
    quick_answer: 'Use the approved public partner link.',
    affiliate: {
      link: 'https://partners.example.com/approved',
      network: 'FixtureNet',
      application_status: 'approved',
    },
  });
  const none = buildToolPageModel({
    slug: 'none-affiliate-tool',
    title: 'None Affiliate Tool',
    tagline: 'Fixture tagline',
    url: 'https://example.com/none',
    quick_answer: 'Use the official fallback.',
    affiliate: {
      link: 'https://partners.example.com/none',
      network: 'FixtureNet',
      application_status: 'none',
    },
  });
  const unknown = buildToolPageModel({
    slug: 'unknown-affiliate-tool',
    title: 'Unknown Affiliate Tool',
    tagline: 'Fixture tagline',
    url: 'https://example.com/unknown',
    quick_answer: 'Use the official fallback.',
    affiliate: {
      link: 'https://partners.example.com/unknown',
      network: 'FixtureNet',
    },
  });

  assert.equal(approved.cta.href, 'https://partners.example.com/approved');
  assert.equal(approved.cta.disclosure, 'Affiliate link');
  assert.equal(approved.cta.affiliate_state, 'approved');
  assert.equal(approved.cta.affiliate_url, 'https://partners.example.com/approved');
  assert.equal(approved.cta.affiliate_program, 'FixtureNet');

  assert.equal(none.cta.href, 'https://example.com/none');
  assert.equal(none.cta.disclosure, undefined);
  assert.equal(none.cta.affiliate_state, 'none');
  assert.equal(none.cta.affiliate_url, undefined);
  assert.equal(none.cta.affiliate_program, undefined);

  assert.equal(unknown.cta.href, 'https://example.com/unknown');
  assert.equal(unknown.cta.affiliate_state, 'unknown');
  assert.equal(unknown.cta.affiliate_url, undefined);
});

test('ToolLayout adapts ToolPageModel facts and normalized page fields before rendering', () => {
  const layout = readSource('src/layouts/ToolLayout.astro');
  assert.match(layout, /const toolTitle = model\.identity\.title/);
  assert.match(layout, /const affiliateUrl = model\.cta\.affiliate_url/);
  assert.match(layout, /const affiliateStatus = model\.cta\.affiliate_state/);
  assert.match(layout, /affiliateStatus=\{affiliateStatus\}/);
  assert.match(layout, /const primaryCtaLabel = model\.cta\.label === 'Visit tool' \? undefined : model\.cta\.label/);
  assert.match(layout, /const pricingModel = model\.cta\.pricing_model/);
  assert.match(layout, /const quickAnswer = model\.decision\.verdict/);
  assert.match(layout, /const facts = toFactListFacts\(model\.facts\)/);
  assert.match(layout, /import \{ buildToolPageModel, toFactListFacts \}/);
  assert.match(layout, /<FactList facts=\{facts\}/);
  assert.match(layout, /import EvidenceRail/);
  assert.match(layout, /<EvidenceRail evidence=\{model\.evidence\}/);
  assert.match(layout, /model\.decision\.best_alternative/);
  assert.match(layout, /model\.decision\.watch_out/);
  assert.match(layout, /model\.decision\.recent_change/);
  assert.match(layout, /href=\{`\/compare\/build\/\?tools=\$\{toolSlug\}`\}/);
});
