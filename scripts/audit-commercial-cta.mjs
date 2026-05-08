#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const PROJECT_DIR = dirname(dirname(fileURLToPath(import.meta.url)));
const jsonMode = process.argv.includes('--json');

function argValue(name) {
  const equalsArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const distArg = argValue('--dist');
const distDir = distArg
  ? (isAbsolute(distArg) ? distArg : join(PROJECT_DIR, distArg))
  : join(PROJECT_DIR, process.env.AIPEDIA_FAST_BUILD === '1' ? 'dist-fast' : 'dist/client');

const partnerLinks = {
  apollo: {
    href: 'https://get.apollo.io/xdiykcapi88b',
    toolSlug: 'apollo',
    affiliateProgram: 'Impact',
  },
  adcreative: {
    href: 'https://free-trial.adcreative.ai/46864ltm9g0d',
    toolSlug: 'adcreative',
    affiliateProgram: 'FirstPromoter',
  },
  unbounce: {
    href: 'https://unbounce.partnerlinks.io/f49zh5fwcfoo',
    toolSlug: 'unbounce',
    affiliateProgram: 'PartnerStack',
  },
  amplemarket: {
    href: 'https://grow.amplemarket.com/aipediawiki',
    toolSlug: 'amplemarket',
    affiliateProgram: 'direct',
  },
};

const requiredRoutes = [
  { path: '/tools/chatgpt/', minCtas: 2, pageType: 'tool' },
  { path: '/tools/apollo/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.apollo] },
  { path: '/tools/adcreative/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.adcreative] },
  { path: '/tools/unbounce/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.unbounce] },
  {
    path: '/compare/chatgpt-vs-claude/',
    minCtas: 4,
    pageType: 'comparison',
    requiredPlacements: ['comparison_hero_winner', 'comparison_tool_card', 'comparison_use_case_winner'],
  },
  { path: '/categories/ai-coding/', minCtas: 3, pageType: 'category' },
  {
    path: '/guides/best-ai-coding-assistant/',
    minCtas: 5,
    pageType: 'guide',
    requiredPlacements: [
      'guide_decision_best_overall',
      'guide_decision_budget',
      'guide_decision_pro_team',
      'guide_top_pick',
    ],
  },
  { path: '/guides/best-ai-tools-for-sales-teams/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.apollo] },
  { path: '/guides/best-ai-for-cold-email/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.apollo, partnerLinks.amplemarket] },
  { path: '/guides/ai-lead-generation/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.apollo, partnerLinks.amplemarket] },
  { path: '/guides/best-ai-tools-for-marketers/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.adcreative, partnerLinks.unbounce] },
  { path: '/guides/best-ai-for-ad-copy/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.adcreative, partnerLinks.unbounce] },
  { path: '/categories/ai-design/', minCtas: 3, pageType: 'category', requiredAffiliateLinks: [partnerLinks.adcreative, partnerLinks.unbounce] },
  { path: '/categories/ai-seo/', minCtas: 3, pageType: 'category', requiredAffiliateLinks: [partnerLinks.adcreative] },
  { path: '/companies/openai/', minCtas: 1, pageType: 'company' },
];

const requiredAttributes = [
  'href',
  'data-cta-view-event',
  'data-cta-click-event',
  'data-cta-page-type',
  'data-cta-page-slug',
  'data-cta-placement',
  'data-cta-tool-slug',
  'data-cta-tool-name',
  'data-cta-label',
  'data-cta-destination-type',
  'data-cta-is-affiliate',
  'data-cta-is-sticky',
];

function routeHtmlPath(pathname) {
  if (pathname === '/') return join(distDir, 'index.html');
  return join(distDir, pathname.replace(/^\/|\/$/g, ''), 'index.html');
}

function read(path) {
  return readFileSync(path, 'utf8');
}

function attrsFromTag(tag) {
  const attrs = new Map();
  const attrRe = /([:@A-Za-z0-9_.-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = attrRe.exec(tag))) {
    attrs.set(match[1].toLowerCase(), match[2] ?? match[3] ?? match[4] ?? '');
  }
  return attrs;
}

function commercialAnchors(html) {
  return [...html.matchAll(/<a\b(?=[^>]*\bdata-commercial-cta\b)[^>]*>/gi)].map((match) => ({
    tag: match[0],
    attrs: attrsFromTag(match[0]),
  }));
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

const issues = [];
const routeReports = [];

if (!existsSync(distDir)) {
  issues.push({ code: 'dist-missing', detail: relative(PROJECT_DIR, distDir).replaceAll(sep, '/') });
}

for (const route of requiredRoutes) {
  const htmlPath = routeHtmlPath(route.path);
  if (!existsSync(htmlPath)) {
    issues.push({ code: 'representative-route-missing', route: route.path, detail: relative(PROJECT_DIR, htmlPath).replaceAll(sep, '/') });
    continue;
  }

  const html = read(htmlPath);
  const anchors = commercialAnchors(html);
  const pageTypeAnchors = anchors.filter((anchor) => anchor.attrs.get('data-cta-page-type') === route.pageType);

  if (!html.includes('__aipediaTrackCommercialCTA')) {
    issues.push({ code: 'commercial-analytics-missing', route: route.path });
  }

  if (pageTypeAnchors.length < route.minCtas) {
    issues.push({
      code: 'commercial-cta-count-low',
      route: route.path,
      detail: `expected at least ${route.minCtas} ${route.pageType} CTA(s), found ${pageTypeAnchors.length}`,
    });
  }

  const placements = new Set(pageTypeAnchors.map((anchor) => anchor.attrs.get('data-cta-placement')).filter(Boolean));
  for (const placement of route.requiredPlacements ?? []) {
    if (!placements.has(placement)) {
      issues.push({
        code: 'commercial-cta-placement-missing',
        route: route.path,
        detail: placement,
      });
    }
  }

  for (const requiredLink of route.requiredAffiliateLinks ?? []) {
    const matchingHref = anchors.filter((anchor) => anchor.attrs.get('href') === requiredLink.href);
    if (matchingHref.length === 0) {
      issues.push({
        code: 'required-affiliate-link-missing',
        route: route.path,
        detail: `${requiredLink.toolSlug} ${requiredLink.href}`,
      });
      continue;
    }

    const trackedMatch = matchingHref.find((anchor) => (
      anchor.attrs.get('data-cta-tool-slug') === requiredLink.toolSlug &&
      anchor.attrs.get('data-cta-destination-type') === 'affiliate' &&
      anchor.attrs.get('data-cta-is-affiliate') === 'true' &&
      (!requiredLink.affiliateProgram || anchor.attrs.get('data-cta-affiliate-program') === requiredLink.affiliateProgram)
    ));

    if (!trackedMatch) {
      issues.push({
        code: 'required-affiliate-link-untracked',
        route: route.path,
        detail: `${requiredLink.toolSlug} ${requiredLink.href}`,
      });
    }

    if (!html.includes('Affiliate link; no extra cost to you.')) {
      issues.push({
        code: 'required-affiliate-disclosure-missing',
        route: route.path,
        detail: requiredLink.toolSlug,
      });
    }
  }

  anchors.forEach((anchor, index) => {
    for (const attr of requiredAttributes) {
      if (!anchor.attrs.has(attr)) {
        issues.push({ code: 'commercial-cta-missing-attribute', route: route.path, detail: `anchor ${index + 1} missing ${attr}` });
      }
    }

    const destinationType = anchor.attrs.get('data-cta-destination-type');
    const isAffiliate = anchor.attrs.get('data-cta-is-affiliate');
    const href = anchor.attrs.get('href') ?? '';
    const rel = anchor.attrs.get('rel') ?? '';

    if (!['affiliate', 'official'].includes(destinationType ?? '')) {
      issues.push({ code: 'commercial-cta-bad-destination-type', route: route.path, detail: `anchor ${index + 1}: ${destinationType}` });
    }

    if (!['true', 'false'].includes(isAffiliate ?? '')) {
      issues.push({ code: 'commercial-cta-bad-affiliate-flag', route: route.path, detail: `anchor ${index + 1}: ${isAffiliate}` });
    }

    if (isAffiliate === 'true' && !/\bsponsored\b/i.test(rel)) {
      issues.push({ code: 'affiliate-cta-missing-sponsored-rel', route: route.path, detail: `anchor ${index + 1}` });
    }

    if (isExternalHref(href) && !/\bnoopener\b/i.test(rel)) {
      issues.push({ code: 'external-commercial-cta-missing-noopener', route: route.path, detail: `anchor ${index + 1}` });
    }
  });

  routeReports.push({
    route: route.path,
    anchors: anchors.length,
    page_type_anchors: pageTypeAnchors.length,
    placements: [...placements].sort(),
  });
}

const report = {
  ok: issues.length === 0,
  dist: relative(PROJECT_DIR, distDir).replaceAll(sep, '/'),
  routes: routeReports,
  issues,
};

if (jsonMode) {
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} else if (report.ok) {
  const total = routeReports.reduce((sum, route) => sum + route.anchors, 0);
  console.log(`[audit-commercial-cta] OK: ${total} commercial CTA(s) checked across ${routeReports.length} representative money routes.`);
} else {
  console.error('[audit-commercial-cta] Commercial CTA issues found:');
  for (const issue of issues) {
    console.error(`- ${issue.code}${issue.route ? ` ${issue.route}` : ''}${issue.detail ? ` (${issue.detail})` : ''}`);
  }
}

process.exit(report.ok ? 0 : 1);
