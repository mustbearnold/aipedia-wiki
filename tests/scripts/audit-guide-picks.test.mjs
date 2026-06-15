import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { test } from 'node:test';

function runGuidePicks(...args) {
  return spawnSync(process.execPath, ['scripts/audit-guide-picks.mjs', ...args], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });
}

function tool(slug) {
  return `---
type: tool
slug: ${slug}
title: ${slug}
url: https://example.com/${slug}
pricing_model: freemium
price_range: "$0-$20/month"
---

# ${slug}
`;
}

function toolWithStatus(slug, status) {
  return `---
type: tool
slug: ${slug}
title: ${slug}
url: https://example.com/${slug}
pricing_model: freemium
price_range: "$0-$20/month"
status: ${status}
---

# ${slug}
`;
}

function guide(slug) {
  return `---
type: use-case
slug: ${slug}
title: "Guide"
tools_mentioned: [alpha, beta, gamma]
guide_picks:
  best_overall:
    tool: alpha
    label: "Best overall"
    plan: "Alpha Pro"
    reason: "Best default for the primary buyer path."
    sources:
      - label: "Alpha Pricing"
        url: "https://example.com/alpha/pricing"
  budget:
    tool: beta
    label: "Budget/free pick"
    plan: "Beta Free"
    reason: "Best low-risk option for budget-sensitive users."
    sources:
      - label: "Beta Pricing"
        url: "https://example.com/beta/pricing"
  pro_team:
    tool: gamma
    label: "Pro/team pick"
    plan: "Gamma Team"
    reason: "Best fit for teams that need governance and scale."
    sources:
      - label: "Gamma Pricing"
        url: "https://example.com/gamma/pricing"
last_updated: 2026-05-08
last_verified: 2026-05-08
---

# Guide
`;
}

test('guide-picks audit validates required structured buyer picks', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-guide-picks-'));

  try {
    const useCasesDir = join(fixture, 'use-cases');
    const toolsDir = join(fixture, 'tools');
    mkdirSync(useCasesDir, { recursive: true });
    mkdirSync(toolsDir, { recursive: true });

    writeFileSync(join(useCasesDir, 'guide-a.md'), guide('guide-a'));
    for (const slug of ['alpha', 'beta', 'gamma']) {
      writeFileSync(join(toolsDir, `${slug}.md`), tool(slug));
    }

    const result = runGuidePicks(
      '--json',
      '--use-cases',
      useCasesDir,
      '--tools',
      toolsDir,
      '--required',
      'guide-a',
    );

    assert.equal(
      result.status,
      0,
      `guide-picks audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.mode, 'audit');
    assert.deepEqual(report.argument_issues, []);
    assert.equal(report.required_guides.length, 1);
    assert.equal(report.guides_with_picks, 1);
    assert.equal(report.issues.length, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('guide-picks audit flags a discontinued tool used as a pick', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-guide-picks-dead-'));

  try {
    const useCasesDir = join(fixture, 'use-cases');
    const toolsDir = join(fixture, 'tools');
    mkdirSync(useCasesDir, { recursive: true });
    mkdirSync(toolsDir, { recursive: true });

    writeFileSync(join(useCasesDir, 'guide-a.md'), guide('guide-a'));
    // alpha is dead; beta/gamma active. The best_overall pick (alpha) must fail.
    writeFileSync(join(toolsDir, 'alpha.md'), toolWithStatus('alpha', 'dead'));
    writeFileSync(join(toolsDir, 'beta.md'), toolWithStatus('beta', 'active'));
    writeFileSync(join(toolsDir, 'gamma.md'), toolWithStatus('gamma', 'active'));

    const result = runGuidePicks(
      '--json',
      '--use-cases', useCasesDir, '--tools', toolsDir, '--required', 'guide-a',
    );

    assert.equal(result.status, 1, 'audit should fail when a pick is discontinued');
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    const dead = report.issues.filter((i) => i.code === 'guide-pick-tool-not-active');
    assert.equal(dead.length, 1, `expected one not-active issue, got ${JSON.stringify(report.issues)}`);
    assert.match(dead[0].detail, /best_overall: alpha is dead/);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('guide-picks audit rejects invalid arguments before scans', () => {
  const unknown = runGuidePicks('--json', '--wat');
  assert.equal(unknown.status, 1);
  assert.equal(unknown.stderr, '');

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.equal(unknownReport.mode, 'argument-error');
  assert.deepEqual(unknownReport.issues, []);
  assert.ok(unknownReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = runGuidePicks('--json', '--use-cases');
  assert.equal(missing.status, 1);
  assert.equal(missing.stderr, '');

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /--use-cases requires a value/.test(issue.detail)));

  const stray = runGuidePicks('--json', 'guide-a');
  assert.equal(stray.status, 1);
  assert.equal(stray.stderr, '');

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument guide-a/.test(issue.detail)));

  const conflicting = runGuidePicks('--json', '--project-dir', '.', '--root', '.');
  assert.equal(conflicting.status, 1);
  assert.equal(conflicting.stderr, '');

  const conflictingReport = JSON.parse(conflicting.stdout);
  assert.equal(conflictingReport.ok, false);
  assert.ok(conflictingReport.argument_issues.some((issue) => issue.code === 'argument-invalid' && /choose only one/.test(issue.detail)));
});

test('guide-picks audit supports project root fixtures', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-guide-picks-root-'));

  try {
    const useCasesDir = join(fixture, 'src/content/use-cases');
    const toolsDir = join(fixture, 'src/content/tools');
    mkdirSync(useCasesDir, { recursive: true });
    mkdirSync(toolsDir, { recursive: true });

    writeFileSync(join(useCasesDir, 'guide-a.md'), guide('guide-a'));
    for (const slug of ['alpha', 'beta', 'gamma']) {
      writeFileSync(join(toolsDir, `${slug}.md`), tool(slug));
    }

    const result = runGuidePicks('--json', `--project-dir=${fixture}`, '--required', 'guide-a');

    assert.equal(
      result.status,
      0,
      `project-root guide-picks fixture failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.project_dir, resolve(fixture));
    assert.deepEqual(report.argument_issues, []);
    assert.equal(report.required_guides.length, 1);
    assert.equal(report.guides_with_picks, 1);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('guide-picks audit prints CLI help', () => {
  const result = runGuidePicks('--help');
  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--required <slugs>/);
  assert.match(result.stdout, /--project-dir <dir>/);
});
