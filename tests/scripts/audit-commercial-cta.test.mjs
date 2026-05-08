import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const routes = [
  { path: 'tools/chatgpt', count: 2, pageType: 'tool' },
  {
    path: 'compare/chatgpt-vs-claude',
    count: 3,
    pageType: 'comparison',
    requiredPlacements: ['comparison_tool_card', 'comparison_use_case_winner'],
  },
  { path: 'categories/ai-coding', count: 3, pageType: 'category' },
  {
    path: 'guides/best-ai-coding-assistant',
    count: 5,
    pageType: 'guide',
    requiredPlacements: [
      'guide_decision_best_overall',
      'guide_decision_budget',
      'guide_decision_pro_team',
      'guide_top_pick',
    ],
  },
  { path: 'companies/openai', count: 1, pageType: 'company' },
];

function cta(pageType, index, placement = `${pageType}_test_${index}`) {
  return `
    <a
      href="https://example.com/${pageType}/${index}"
      rel="noopener"
      data-commercial-cta
      data-cta-view-event="official_cta_view"
      data-cta-click-event="official_cta_click"
      data-cta-page-type="${pageType}"
      data-cta-page-slug="${pageType}-page"
      data-cta-placement="${placement}"
      data-cta-tool-slug="chatgpt"
      data-cta-tool-name="ChatGPT"
      data-cta-label="Try ChatGPT free"
      data-cta-destination-type="official"
      data-cta-is-affiliate="false"
      data-cta-is-sticky="false"
    >Try ChatGPT free</a>
  `;
}

test('commercial CTA audit validates representative built money pages', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-commercial-cta-'));

  try {
    for (const route of routes) {
      const dir = join(fixture, route.path);
      mkdirSync(dir, { recursive: true });
      const placements = route.requiredPlacements ?? [];
      const anchors = Array.from({ length: route.count }, (_, index) => {
        const placement = placements[index] ?? undefined;
        return cta(route.pageType, index + 1, placement);
      }).join('\n');
      writeFileSync(
        join(dir, 'index.html'),
        `<!doctype html><html><body><script>window.__aipediaTrackCommercialCTA = true;</script>${anchors}</body></html>`,
      );
    }

    const result = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', '--dist', fixture], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.equal(
      result.status,
      0,
      `commercial CTA audit failed unexpectedly\nstdout:\n${result.stdout}\nstderr:\n${result.stderr}`,
    );

    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, true);
    assert.equal(report.routes.length, routes.length);
    assert.equal(report.issues.length, 0);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
