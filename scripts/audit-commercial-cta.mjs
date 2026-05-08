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

const requiredRoutes = [
  { path: '/tools/chatgpt/', minCtas: 2, pageType: 'tool' },
  {
    path: '/compare/chatgpt-vs-claude/',
    minCtas: 3,
    pageType: 'comparison',
    requiredPlacements: ['comparison_tool_card', 'comparison_use_case_winner'],
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
