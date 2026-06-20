import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

import {
  parseChallenge,
  validateChallenge,
  validateProject,
} from '../../scripts/guard-challenge.mjs';

const COMPLETE_ACCEPTED = `# Guard Challenge: stale news fixture

**Date:** 2026-06-20
**Status:** accepted
**Failing command:** npm run check:news
**Guard files:** scripts/audit-news-rendering.mjs
**Product files:** src/content/news/2026-06-20-ai-news-desk.md
**Decision:** update-fixture

## Implementer brief

The news desk is valid because the article has six sourced stories and current OG assets. The failing fixture still expects the previous latest date.

## Guard defender brief

The guard protects daily news pages from shipping without multiple sourced stories, active-month coverage, and generated OG images. The current failure is from stale expected latest-date data, not missing story quality.

## Arbitrator decision

Update the fixture only. Keep the minimum story count and OG asset requirements unchanged.

## Fixture or test change

Change the expected latest daily-desk slug from the previous date to 2026-06-20 and add a regression assertion for the minimum story count.

## Verification

Run: node scripts/audit-news-rendering.mjs
Run: npm run check:news
Expected: both commands exit 0.

## Follow-up risk

Future news backfills can still fail if they add one-story days or miss OG assets.
`;

const INCOMPLETE_ACCEPTED = `# Guard Challenge: weak guard

**Date:** 2026-06-20
**Status:** accepted
**Failing command:** npm run guard:check
**Guard files:** scripts/guard-content.mjs
**Product files:** src/content/tools/example.md
**Decision:** narrow-guard

## Implementer brief

This guard is annoying.

## Guard defender brief

Pending.

## Arbitrator decision

Pending.

## Fixture or test change

Pending.

## Verification

Pending.

## Follow-up risk

Pending.
`;

const STOCK_IMPLEMENTER_BRIEF = 'The current guard failure blocks productive work. The implementer must replace this paragraph with the exact failure output, intended change, and reason the guard appears stale, over-broad, or misaligned.';

test('guard challenge validator accepts a complete accepted challenge', () => {
  const record = parseChallenge(COMPLETE_ACCEPTED, '.agent/guard-challenges/2026-06-20-news-challenge.md');
  assert.deepEqual(validateChallenge(record), []);
});

test('guard challenge validator rejects accepted records without opposition, fixture, and verification', () => {
  const record = parseChallenge(INCOMPLETE_ACCEPTED, '.agent/guard-challenges/2026-06-20-weak-guard-challenge.md');
  const issues = validateChallenge(record).map((issue) => issue.code);

  assert.ok(issues.includes('section-pending:Guard defender brief'));
  assert.ok(issues.includes('section-pending:Arbitrator decision'));
  assert.ok(issues.includes('section-pending:Fixture or test change'));
  assert.ok(issues.includes('section-pending:Verification'));
  assert.ok(issues.includes('verification-command-missing'));
});

test('guard challenge validator rejects accepted records with empty verification command labels', () => {
  const validVerificationText = 'Run: node scripts/audit-news-rendering.mjs\nRun: npm run check:news\nExpected: both commands exit 0.';
  const emptyVerificationCommands = [
    COMPLETE_ACCEPTED.replace(validVerificationText, 'Run:'),
    COMPLETE_ACCEPTED.replace(validVerificationText, 'Run:\nExpected: the command line was omitted.'),
  ];

  for (const emptyVerificationCommand of emptyVerificationCommands) {
    const record = parseChallenge(emptyVerificationCommand, '.agent/guard-challenges/2026-06-20-empty-verification-command-challenge.md');
    const issues = validateChallenge(record).map((issue) => issue.code);

    assert.ok(issues.includes('verification-command-missing'));
  }
});

test('guard challenge validator rejects accepted records with generated implementer template text', () => {
  const acceptedWithTemplateText = COMPLETE_ACCEPTED.replace(
    'The news desk is valid because the article has six sourced stories and current OG assets. The failing fixture still expects the previous latest date.',
    STOCK_IMPLEMENTER_BRIEF,
  );
  const record = parseChallenge(acceptedWithTemplateText, '.agent/guard-challenges/2026-06-20-template-implementer-challenge.md');
  const issues = validateChallenge(record).map((issue) => issue.code);

  assert.ok(issues.includes('section-template:Implementer brief'));
});

test('guard challenge validator allows proposed records with pending arbitration', () => {
  const proposed = INCOMPLETE_ACCEPTED
    .replace('**Status:** accepted', '**Status:** proposed')
    .replace('**Decision:** narrow-guard', '**Decision:** pending')
    .replace('This guard is annoying.', 'The current guard blocks a source-backed route update.');
  const record = parseChallenge(proposed, '.agent/guard-challenges/2026-06-20-proposed-challenge.md');

  assert.deepEqual(validateChallenge(record), []);
});

test('validateProject checks challenge files under .agent/guard-challenges', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-guard-challenge-'));
  try {
    mkdirSync(join(dir, '.agent', 'guard-challenges'), { recursive: true });
    writeFileSync(join(dir, '.agent', 'guard-challenges', '2026-06-20-news-challenge.md'), COMPLETE_ACCEPTED);

    const report = validateProject(dir);
    assert.equal(report.ok, true);
    assert.equal(report.checked, 1);
    assert.deepEqual(report.issues, []);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test('guard challenge CLI creates a proposed challenge artifact', () => {
  const dir = mkdtempSync(join(tmpdir(), 'aipedia-guard-challenge-cli-'));
  try {
    const result = spawnSync(
      process.execPath,
      [
        fileURLToPath(new URL('../../scripts/guard-challenge.mjs', import.meta.url)),
        '--project-dir',
        dir,
        '--date',
        '2026-06-20',
        '--command',
        'npm run guard:check',
        '--guard',
        'scripts/guard-content.mjs',
        '--files',
        'src/content/tools/example.md',
        '--title',
        'content guard',
      ],
      { encoding: 'utf8' },
    );

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    const artifact = join(dir, '.agent', 'guard-challenges', '2026-06-20-content-guard-challenge.md');
    const text = readFileSync(artifact, 'utf8');
    assert.match(text, /\*\*Status:\*\* proposed/);
    assert.match(text, /\*\*Decision:\*\* pending/);
    assert.match(text, /npm run guard:check/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
