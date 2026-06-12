import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

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

    const result = spawnSync(process.execPath, [
      'scripts/audit-guide-picks.mjs',
      '--json',
      '--use-cases',
      useCasesDir,
      '--tools',
      toolsDir,
      '--required',
      'guide-a',
    ], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(
      result.status,
      0,
      `guide-picks audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
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

    const result = spawnSync(process.execPath, [
      'scripts/audit-guide-picks.mjs', '--json',
      '--use-cases', useCasesDir, '--tools', toolsDir, '--required', 'guide-a',
    ], { cwd: process.cwd(), encoding: 'utf8' });

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
