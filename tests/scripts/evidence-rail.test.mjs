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

async function loadEvidenceRail() {
  if (!modulePromise) {
    const fixture = mkdtempSync(join(tmpdir(), 'aipedia-evidence-rail-'));
    writeTemp(
      fixture,
      'src/lib/content-models/evidence-rail.ts',
      readSource('src/lib/content-models/evidence-rail.ts').replace(
        "import type { ResolvedPageSource } from '../provenance';",
        "type ResolvedPageSource = { source_id?: string; label: string; url: string; volatility?: string; last_checked?: string; verified_at?: string; next_review_at?: string; used_by: string[]; state: 'registered' | 'unknown_id' | 'inline_only' | 'evidence_only'; };"
      )
    );
    modulePromise = import(pathToFileURL(join(fixture, 'src/lib/content-models/evidence-rail.ts')).href);
  }

  return modulePromise;
}

test('EvidenceRailModel derives conservative state from sources, facts, and decisions', async () => {
  const { buildEvidenceRailModel } = await loadEvidenceRail();
  const model = buildEvidenceRailModel({
    sources: [
      {
        source_id: 'registered-a',
        label: 'Registered A',
        url: 'https://example.com/a',
        verified_at: '2030-01-01',
        next_review_at: '2030-03-01',
        volatility: 'low',
        used_by: ['fact'],
        state: 'registered',
      },
    ],
    facts: [
      {
        confidence: 'medium',
        verified_at: '2026-01-15',
        volatility: 'high',
        source: {
          label: 'Inline B',
          url: 'https://example.com/b',
          verified_at: '2026-01-10',
          next_review_at: '2026-02-10',
          volatility: 'high',
          used_by: ['fact'],
          state: 'inline_only',
        },
      },
    ],
    decisions: [
      {
        source_refs: ['registered-a', 'category-pick-note'],
        verified_at: '2026-01-20',
        confidence: 'high',
      },
    ],
    confidence: 'high',
  });

  assert.equal(model.sourceCount, 3);
  assert.equal(model.primaryLabel, 'Registered A');
  assert.equal(model.primaryUrl, 'https://example.com/a');
  assert.equal(model.evidenceState, 'inline_only');
  assert.equal(model.freshnessState, 'stale');
  assert.equal(model.confidence, 'low');
  assert.equal(model.verifiedAt, '2026-01-10');
  assert.equal(model.nextReviewAt, '2026-02-10');
  assert.equal(model.volatility, 'high');
  assert.ok(model.diagnostics.some((message) => message.includes('category-pick-note')));
});

test('EvidenceRailModel supports fallback verified dates without inventing sources', async () => {
  const { evidenceRailFromFallbackDates } = await loadEvidenceRail();
  const verifiedAt = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
  const nextReviewAt = new Date(Date.now() + 60 * 86_400_000).toISOString().slice(0, 10);
  const model = evidenceRailFromFallbackDates(verifiedAt, nextReviewAt, 'high');

  assert.equal(model.sourceCount, 0);
  assert.equal(model.primaryLabel, undefined);
  assert.equal(model.evidenceState, 'unknown_id');
  assert.equal(model.freshnessState, 'current');
  assert.equal(model.confidence, 'low');
  assert.equal(model.verifiedAt, verifiedAt);
  assert.equal(model.nextReviewAt, nextReviewAt);
  assert.ok(model.diagnostics.includes('No source evidence is attached to this model.'));
});
