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
      'src/lib/content-models/tool-page-model.ts',
      readSource('src/lib/content-models/tool-page-model.ts')
        .replace("from '../../utils/tool-metadata'", "from '../../utils/tool-metadata.ts'")
        .replace("from '../provenance'", "from '../provenance.ts'")
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
  assert.ok(registered, 'registered fact/pricing source should be retained once');
  assert.deepEqual(registered.used_by.sort(), ['fact', 'pricing']);
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

  const registeredFact = model.facts.find((fact) => fact.key === 'best_for');
  assert.equal(registeredFact.verified_at, '2026-02-04');

  const flagship = model.facts.find((fact) => fact.key === 'flagship_model');
  assert.equal(flagship.verified_at, '2026-02-03');
  assert.equal(flagship.source.label, 'Fixture model page');
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
  assert.equal(model.cta.href, 'https://partners.example.com/precedence');
  assert.equal(model.cta.disclosure, 'Affiliate link');
  assert.equal(model.cta.affiliate_state, 'applied');
  assert.equal(model.cta.affiliate_url, 'https://partners.example.com/precedence');
  assert.equal(model.cta.canonical_url, 'https://example.com/precedence');
});

test('ToolLayout adapts ToolPageModel facts and normalized page fields before rendering', () => {
  const layout = readSource('src/layouts/ToolLayout.astro');
  assert.match(layout, /const toolTitle = model\.identity\.title/);
  assert.match(layout, /const affiliateUrl = model\.cta\.affiliate_url/);
  assert.match(layout, /const primaryCtaLabel = model\.cta\.label === 'Visit tool' \? undefined : model\.cta\.label/);
  assert.match(layout, /const pricingModel = model\.cta\.pricing_model/);
  assert.match(layout, /const quickAnswer = model\.decision\.verdict/);
  assert.match(layout, /const facts = toFactListFacts\(model\.facts\)/);
  assert.match(layout, /import \{ buildToolPageModel, toFactListFacts \}/);
  assert.match(layout, /<FactList facts=\{facts\}/);
});
