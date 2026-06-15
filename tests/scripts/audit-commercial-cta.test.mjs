import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';

const routes = [
  { path: 'tools/chatgpt', count: 2, pageType: 'tool' },
  {
    path: 'tools/apollo',
    count: 2,
    pageType: 'tool',
    requiredAffiliateLinks: [{
      href: 'https://get.apollo.io/xdiykcapi88b',
      toolSlug: 'apollo',
      toolName: 'Apollo.io',
      affiliateProgram: 'Impact',
    }],
  },
  {
    path: 'tools/adcreative',
    count: 2,
    pageType: 'tool',
    requiredAffiliateLinks: [{
      href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
      toolSlug: 'adcreative',
      toolName: 'AdCreative.ai',
      affiliateProgram: 'FirstPromoter',
    }],
  },
  {
    path: 'tools/unbounce',
    count: 2,
    pageType: 'tool',
    requiredAffiliateLinks: [{
      href: 'https://unbounce.partnerlinks.io/f49zh5fwcfoo',
      toolSlug: 'unbounce',
      toolName: 'Unbounce',
      affiliateProgram: 'PartnerStack',
    }],
  },
  {
    path: 'tools/lindy',
    count: 2,
    pageType: 'tool',
    requiredAffiliateLinks: [{
      href: 'https://try.lindy.ai/a1y1dlsexvk1',
      toolSlug: 'lindy',
      toolName: 'Lindy',
      affiliateProgram: 'PartnerStack',
    }],
  },
  {
    path: 'compare/chatgpt-vs-claude',
    count: 4,
    pageType: 'comparison',
    requiredPlacements: ['comparison_hero_winner', 'comparison_tool_card', 'comparison_use_case_winner'],
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
  {
    path: 'guides/best-ai-tools-for-sales-teams',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [{
      href: 'https://get.apollo.io/xdiykcapi88b',
      toolSlug: 'apollo',
      toolName: 'Apollo.io',
      affiliateProgram: 'Impact',
    }],
  },
  {
    path: 'guides/best-ai-for-cold-email',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [
      {
        href: 'https://get.apollo.io/xdiykcapi88b',
        toolSlug: 'apollo',
        toolName: 'Apollo.io',
        affiliateProgram: 'Impact',
      },
      {
        href: 'https://grow.amplemarket.com/aipediawiki',
        toolSlug: 'amplemarket',
        toolName: 'Amplemarket',
        affiliateProgram: 'direct',
      },
    ],
  },
  {
    path: 'guides/ai-lead-generation',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [
      {
        href: 'https://get.apollo.io/xdiykcapi88b',
        toolSlug: 'apollo',
        toolName: 'Apollo.io',
        affiliateProgram: 'Impact',
      },
      {
        href: 'https://grow.amplemarket.com/aipediawiki',
        toolSlug: 'amplemarket',
        toolName: 'Amplemarket',
        affiliateProgram: 'direct',
      },
    ],
  },
  {
    path: 'guides/best-ai-personal-assistant-for-work',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [{
      href: 'https://try.lindy.ai/a1y1dlsexvk1',
      toolSlug: 'lindy',
      toolName: 'Lindy',
      affiliateProgram: 'PartnerStack',
    }],
  },
  {
    path: 'guides/best-ai-tools-for-marketers',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [
      {
        href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
        toolSlug: 'adcreative',
        toolName: 'AdCreative.ai',
        affiliateProgram: 'FirstPromoter',
      },
      {
        href: 'https://unbounce.partnerlinks.io/f49zh5fwcfoo',
        toolSlug: 'unbounce',
        toolName: 'Unbounce',
        affiliateProgram: 'PartnerStack',
      },
    ],
  },
  {
    path: 'guides/best-ai-for-ad-copy',
    count: 5,
    pageType: 'guide',
    requiredAffiliateLinks: [
      {
        href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
        toolSlug: 'adcreative',
        toolName: 'AdCreative.ai',
        affiliateProgram: 'FirstPromoter',
      },
      {
        href: 'https://unbounce.partnerlinks.io/f49zh5fwcfoo',
        toolSlug: 'unbounce',
        toolName: 'Unbounce',
        affiliateProgram: 'PartnerStack',
      },
    ],
  },
  {
    path: 'compare/lindy-vs-zapier-vs-n8n',
    count: 4,
    pageType: 'comparison',
    requiredAffiliateLinks: [{
      href: 'https://try.lindy.ai/a1y1dlsexvk1',
      toolSlug: 'lindy',
      toolName: 'Lindy',
      affiliateProgram: 'PartnerStack',
    }],
  },
  {
    path: 'categories/ai-design',
    count: 3,
    pageType: 'category',
    requiredAffiliateLinks: [
      {
        href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
        toolSlug: 'adcreative',
        toolName: 'AdCreative.ai',
        affiliateProgram: 'FirstPromoter',
      },
      {
        href: 'https://unbounce.partnerlinks.io/f49zh5fwcfoo',
        toolSlug: 'unbounce',
        toolName: 'Unbounce',
        affiliateProgram: 'PartnerStack',
      },
    ],
  },
  {
    path: 'categories/ai-seo',
    count: 3,
    pageType: 'category',
    requiredAffiliateLinks: [{
      href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
      toolSlug: 'adcreative',
      toolName: 'AdCreative.ai',
      affiliateProgram: 'FirstPromoter',
    }],
  },
  { path: 'companies/openai', count: 1, pageType: 'company' },
];

function cta(pageType, index, placement = `${pageType}_test_${index}`, options = {}) {
  const isAffiliate = Boolean(options.href);
  const href = options.href ?? `https://example.com/${pageType}/${index}`;
  const toolSlug = options.toolSlug ?? 'chatgpt';
  const toolName = options.toolName ?? 'ChatGPT';
  const rel = isAffiliate ? 'sponsored noopener' : 'noopener';
  const destinationType = isAffiliate ? 'affiliate' : 'official';
  const affiliateProgram = options.affiliateProgram
    ? `data-cta-affiliate-program="${options.affiliateProgram}"`
    : '';

  return `
    <a
      href="${href}"
      rel="${rel}"
      data-commercial-cta
      data-cta-view-event="${isAffiliate ? 'affiliate_cta_view' : 'tool_cta_view'}"
      data-cta-click-event="${isAffiliate ? 'affiliate_click' : 'tool_cta_click'}"
      data-cta-page-type="${pageType}"
      data-cta-page-slug="${pageType}-page"
      data-cta-placement="${placement}"
      data-cta-tool-slug="${toolSlug}"
      data-cta-tool-name="${toolName}"
      data-cta-label="${isAffiliate ? `Get ${toolName}` : 'Try ChatGPT free'}"
      data-cta-destination-type="${destinationType}"
      data-cta-is-affiliate="${String(isAffiliate)}"
      ${affiliateProgram}
      data-cta-is-sticky="false"
    >${isAffiliate ? `Get ${toolName}` : 'Try ChatGPT free'}</a>
  `;
}

function fixtureHtml(anchors) {
  return `<!doctype html><html><body><script>window.__aipediaTrackCommercialCTA = true;</script>${anchors}<p>Affiliate link; no extra cost to you.</p></body></html>`;
}

test('commercial CTA audit validates representative built money pages', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-commercial-cta-'));

  try {
    for (const route of routes) {
      const dir = join(fixture, route.path);
      mkdirSync(dir, { recursive: true });
      const placements = route.requiredPlacements ?? [];
      const requiredAffiliateLinks = route.requiredAffiliateLinks ?? [];
      const anchors = [
        ...requiredAffiliateLinks.map((link, index) => cta(route.pageType, index + 1, placements[index] ?? undefined, link)),
        ...Array.from({ length: Math.max(route.count - requiredAffiliateLinks.length, 0) }, (_, index) => {
          const offset = requiredAffiliateLinks.length + index;
          const placement = placements[offset] ?? undefined;
          return cta(route.pageType, offset + 1, placement);
        }),
      ].join('\n');
      writeFileSync(
        join(dir, 'index.html'),
        fixtureHtml(anchors),
      );
    }

    const result = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', '--site-dir', fixture], {
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

test('commercial CTA audit fails when a required affiliate link is missing from a money route', () => {
  const fixture = mkdtempSync(join(tmpdir(), 'aipedia-commercial-cta-missing-affiliate-'));

  try {
    for (const route of routes) {
      const dir = join(fixture, route.path);
      mkdirSync(dir, { recursive: true });
      const requiredAffiliateLinks = route.path === 'guides/best-ai-tools-for-sales-teams'
        ? []
        : route.requiredAffiliateLinks ?? [];
      const anchors = [
        ...requiredAffiliateLinks.map((link, index) => cta(route.pageType, index + 1, undefined, link)),
        ...Array.from({ length: Math.max(route.count - requiredAffiliateLinks.length, 0) }, (_, index) => cta(route.pageType, requiredAffiliateLinks.length + index + 1)),
      ].join('\n');
      writeFileSync(join(dir, 'index.html'), fixtureHtml(anchors));
    }

    const result = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', '--dist', fixture], {
      cwd: process.cwd(),
      encoding: 'utf8',
    });

    assert.notEqual(result.status, 0);
    const report = JSON.parse(result.stdout);
    assert.equal(report.ok, false);
    assert.ok(report.issues.some((issue) => (
      issue.code === 'required-affiliate-link-missing' &&
      issue.route === '/guides/best-ai-tools-for-sales-teams/' &&
      issue.detail.includes('apollo')
    )));
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});

test('commercial CTA audit reports structured invalid arguments', () => {
  const unknown = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', '--wat'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(unknown.status, 1);

  const unknownReport = JSON.parse(unknown.stdout);
  assert.equal(unknownReport.ok, false);
  assert.deepEqual(unknownReport.routes, []);
  assert.ok(unknownReport.issues.some((issue) => issue.code === 'argument-invalid' && /unknown flag --wat/.test(issue.detail)));

  const missing = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', '--site-dir'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(missing.status, 1);

  const missingReport = JSON.parse(missing.stdout);
  assert.equal(missingReport.ok, false);
  assert.ok(missingReport.issues.some((issue) => issue.code === 'argument-invalid' && /--site-dir requires a path/.test(issue.detail)));

  const stray = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--json', 'dist-fast'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(stray.status, 1);

  const strayReport = JSON.parse(stray.stdout);
  assert.equal(strayReport.ok, false);
  assert.ok(strayReport.issues.some((issue) => issue.code === 'argument-invalid' && /unexpected argument dist-fast/.test(issue.detail)));
});

test('commercial CTA audit prints CLI help', () => {
  const result = spawnSync(process.execPath, ['scripts/audit-commercial-cta.mjs', '--help'], {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  assert.equal(result.status, 0);
  assert.match(result.stdout, /Usage:/);
  assert.match(result.stdout, /--site-dir <dir>/);
});
