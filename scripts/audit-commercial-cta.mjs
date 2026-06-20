#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { builtSiteDir } from './lib/built-site-dir.mjs';

const args = process.argv.slice(2);
const defaultProjectDir = dirname(dirname(fileURLToPath(import.meta.url)));
const projectDirArg = argValue('--project-dir') || argValue('--root');
const PROJECT_DIR = resolve(projectDirArg || defaultProjectDir);
const jsonMode = args.includes('--json');
const KNOWN_FLAGS = new Set(['--json', '--dist', '--site-dir', '--dist-dir', '--project-dir', '--root', '--help', '-h']);

function argValue(name) {
  const equalsArg = args.find((arg) => arg.startsWith(`${name}=`));
  if (equalsArg) return equalsArg.slice(name.length + 1);
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function hasFlag(flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

function flagName(arg) {
  const equalsIndex = arg.indexOf('=');
  return equalsIndex >= 0 ? arg.slice(0, equalsIndex) : arg;
}

function collectArgumentIssues() {
  const issues = [];
  for (const [index, arg] of args.entries()) {
    if (!arg.startsWith('-')) {
      const previous = args[index - 1] ?? '';
      if (!['--dist', '--site-dir', '--dist-dir', '--project-dir', '--root'].includes(previous)) {
        issues.push({ code: 'argument-invalid', detail: `unexpected argument ${arg}` });
      }
      continue;
    }

    const name = flagName(arg);
    if (!KNOWN_FLAGS.has(name)) issues.push({ code: 'argument-invalid', detail: `unknown flag ${name}` });
  }

  for (const flag of ['--dist', '--site-dir', '--dist-dir', '--project-dir', '--root']) {
    if (!hasFlag(flag)) continue;
    const inlineArg = args.find((arg) => arg.startsWith(`${flag}=`));
    const value = inlineArg ? inlineArg.slice(flag.length + 1) : args[args.indexOf(flag) + 1] ?? '';
    if (!value || value.startsWith('-')) issues.push({ code: 'argument-invalid', detail: `${flag} requires a path` });
  }

  const distFlags = ['--dist', '--site-dir', '--dist-dir'].filter(hasFlag);
  if (distFlags.length > 1) {
    issues.push({ code: 'argument-invalid', detail: `choose one built-output flag, got ${distFlags.join(', ')}` });
  }

  if (hasFlag('--project-dir') && hasFlag('--root')) {
    issues.push({ code: 'argument-invalid', detail: 'choose only one of --project-dir or --root' });
  }

  return issues;
}

function usage() {
  return [
    'Usage:',
    '  node scripts/audit-commercial-cta.mjs --json',
    '  node scripts/audit-commercial-cta.mjs --site-dir .vercel/output/static',
    '',
    'Options:',
    '  --dist <dir>         Check a specific built output directory.',
    '  --site-dir <dir>     Alias for --dist.',
    '  --project-dir <dir>  Resolve relative paths from another project root.',
  ].join('\n');
}

const argumentIssues = collectArgumentIssues();
if (args.includes('--help') || args.includes('-h')) {
  console.log(usage());
  process.exit(0);
}

const distArg = argValue('--dist') || argValue('--site-dir') || argValue('--dist-dir');
const distDir = builtSiteDir(PROJECT_DIR, distArg);

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
  lindy: {
    href: 'https://try.lindy.ai/a1y1dlsexvk1',
    toolSlug: 'lindy',
    affiliateProgram: 'PartnerStack',
  },
};
const knownPartnerLinks = Object.values(partnerLinks);

const requiredRoutes = [
  { path: '/tools/chatgpt/', minCtas: 2, pageType: 'tool' },
  { path: '/tools/apollo/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.apollo] },
  { path: '/tools/adcreative/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.adcreative] },
  { path: '/tools/unbounce/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.unbounce] },
  { path: '/tools/lindy/', minCtas: 2, pageType: 'tool', requiredAffiliateLinks: [partnerLinks.lindy] },
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
  { path: '/guides/best-ai-personal-assistant-for-work/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.lindy] },
  { path: '/guides/best-ai-tools-for-marketers/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.adcreative, partnerLinks.unbounce] },
  { path: '/guides/best-ai-for-ad-copy/', minCtas: 5, pageType: 'guide', requiredAffiliateLinks: [partnerLinks.adcreative, partnerLinks.unbounce] },
  { path: '/compare/lindy-vs-zapier-vs-n8n/', minCtas: 4, pageType: 'comparison', requiredAffiliateLinks: [partnerLinks.lindy] },
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

const knownCtaEvents = new Set([
  'affiliate_click',
  'tool_cta_click',
  'mobile_sticky_cta_click',
  'stack_builder_tool_click',
  'affiliate_cta_view',
  'tool_cta_view',
  'official_cta_view',
  'stack_builder_try_tool_view',
  'stack_builder_try_stack_view',
]);

const genericCtaLabels = new Set(['try', 'open']);
const affiliateDisclosureText = 'Affiliate link; no extra cost to you.';

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
    index: match.index ?? 0,
  }));
}

function allAnchors(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)].map((match) => ({
    tag: match[0],
    attrs: attrsFromTag(match[0]),
    index: match.index ?? 0,
  }));
}

function walkHtml(dir) {
  if (!existsSync(dir)) return [];
  const entries = readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return walkHtml(path);
    return entry.isFile() && entry.name === 'index.html' ? [path] : [];
  });
}

function routeFromHtmlPath(htmlPath) {
  const rel = relative(distDir, htmlPath).replaceAll(sep, '/');
  if (rel === 'index.html') return '/';
  return `/${rel.replace(/\/index\.html$/, '/')}`;
}

function discoverCommercialRoutes() {
  const requiredPaths = new Set(requiredRoutes.map((route) => route.path));
  return walkHtml(distDir)
    .map((htmlPath) => {
      const route = routeFromHtmlPath(htmlPath);
      if (requiredPaths.has(route)) return null;
      const html = read(htmlPath);
      return commercialAnchors(html).length > 0
        ? { path: route, minCtas: 0, pageType: null, discovered: true }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.path.localeCompare(b.path));
}

function isExternalHref(href) {
  return /^https?:\/\//i.test(href);
}

function formatDistLabel(path) {
  return relative(PROJECT_DIR, path).replaceAll(sep, '/');
}

function emitReport(report) {
  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (report.ok) {
    const total = report.routes.reduce((sum, route) => sum + route.anchors, 0);
    console.log(`[audit-commercial-cta] OK: ${total} commercial CTA(s) checked across ${report.routes.length} built route(s).`);
  } else {
    console.error('[audit-commercial-cta] Commercial CTA issues found:');
    for (const issue of report.issues) {
      console.error(`- ${issue.code}${issue.route ? ` ${issue.route}` : ''}${issue.detail ? ` (${issue.detail})` : ''}`);
    }
  }
}

if (argumentIssues.length > 0) {
  const report = {
    ok: false,
    dist: formatDistLabel(distDir),
    routes: [],
    issues: argumentIssues,
  };
  emitReport(report);
  process.exit(1);
}

const issues = [];
const routeReports = [];

if (!existsSync(distDir)) {
  issues.push({ code: 'dist-missing', detail: formatDistLabel(distDir) });
}

const routesToCheck = existsSync(distDir)
  ? [...requiredRoutes, ...discoverCommercialRoutes()]
  : requiredRoutes;

if (existsSync(distDir)) {
  for (const htmlPath of walkHtml(distDir)) {
    const route = routeFromHtmlPath(htmlPath);
    const html = read(htmlPath);
    allAnchors(html).forEach((anchor, index) => {
      const href = anchor.attrs.get('href') ?? '';
      const partnerLink = knownPartnerLinks.find((link) => link.href === href);
      if (!partnerLink) return;

      if (!anchor.attrs.has('data-commercial-cta')) {
        issues.push({
          code: 'affiliate-link-unmarked-commercial-cta',
          route,
          detail: `anchor ${index + 1}: ${partnerLink.toolSlug} ${href}`,
        });
        return;
      }

      if (
        anchor.attrs.get('data-cta-destination-type') !== 'affiliate' ||
        anchor.attrs.get('data-cta-is-affiliate') !== 'true' ||
        anchor.attrs.get('data-cta-tool-slug') !== partnerLink.toolSlug
      ) {
        issues.push({
          code: 'affiliate-link-misclassified-commercial-cta',
          route,
          detail: `anchor ${index + 1}: ${partnerLink.toolSlug} ${href}`,
        });
      }
    });
  }
}

for (const route of routesToCheck) {
  const htmlPath = routeHtmlPath(route.path);
  if (!existsSync(htmlPath)) {
    issues.push({ code: 'representative-route-missing', route: route.path, detail: formatDistLabel(htmlPath) });
    continue;
  }

  const html = read(htmlPath);
  const anchors = commercialAnchors(html);
  const pageTypeAnchors = route.pageType
    ? anchors.filter((anchor) => anchor.attrs.get('data-cta-page-type') === route.pageType)
    : anchors;

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

    if (!html.includes(affiliateDisclosureText)) {
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
    const viewEvent = anchor.attrs.get('data-cta-view-event') ?? '';
    const clickEvent = anchor.attrs.get('data-cta-click-event') ?? '';
    const label = anchor.attrs.get('data-cta-label') ?? '';
    const isSticky = anchor.attrs.get('data-cta-is-sticky');
    const href = anchor.attrs.get('href') ?? '';
    const rel = anchor.attrs.get('rel') ?? '';

    if (!['affiliate', 'official'].includes(destinationType ?? '')) {
      issues.push({ code: 'commercial-cta-bad-destination-type', route: route.path, detail: `anchor ${index + 1}: ${destinationType}` });
    }

    if (!['true', 'false'].includes(isAffiliate ?? '')) {
      issues.push({ code: 'commercial-cta-bad-affiliate-flag', route: route.path, detail: `anchor ${index + 1}: ${isAffiliate}` });
    }

    if (viewEvent && !knownCtaEvents.has(viewEvent)) {
      issues.push({ code: 'commercial-cta-unknown-event', route: route.path, detail: `anchor ${index + 1} view ${viewEvent}` });
    }

    if (clickEvent && !knownCtaEvents.has(clickEvent)) {
      issues.push({ code: 'commercial-cta-unknown-event', route: route.path, detail: `anchor ${index + 1} click ${clickEvent}` });
    }

    if (genericCtaLabels.has(label.trim().toLowerCase())) {
      issues.push({ code: 'commercial-cta-generic-label', route: route.path, detail: `anchor ${index + 1}: ${label}` });
    }

    if (isAffiliate === 'true' && !/\bsponsored\b/i.test(rel)) {
      issues.push({ code: 'affiliate-cta-missing-sponsored-rel', route: route.path, detail: `anchor ${index + 1}` });
    }

    if (isAffiliate === 'true' && isSticky === 'true') {
      const nearby = html.slice(Math.max(0, anchor.index - 400), anchor.index + anchor.tag.length + 400);
      if (!nearby.includes(affiliateDisclosureText)) {
        issues.push({ code: 'sticky-affiliate-disclosure-not-nearby', route: route.path, detail: `anchor ${index + 1}` });
      }
    }

    if (isExternalHref(href) && !/\bnoopener\b/i.test(rel)) {
      issues.push({ code: 'external-commercial-cta-missing-noopener', route: route.path, detail: `anchor ${index + 1}` });
    }
  });

  routeReports.push({
    route: route.path,
    anchors: anchors.length,
    page_type_anchors: pageTypeAnchors.length,
    page_type: route.pageType ?? 'any',
    discovered: route.discovered === true,
    placements: [...placements].sort(),
  });
}

const report = {
  ok: issues.length === 0,
  dist: formatDistLabel(distDir),
  routes: routeReports,
  issues,
};

emitReport(report);

process.exit(report.ok ? 0 : 1);
