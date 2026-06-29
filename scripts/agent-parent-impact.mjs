#!/usr/bin/env node

import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import {
  DEFAULT_PROJECT_DIR,
  allContentPages,
  collectInternalLinks,
  collectionForPath,
  fileExists,
  hasFlag,
  loadLedger,
  normalizeRoute,
  pathToRoute,
  projectPath,
  readMarkdownFile,
  resolveTarget,
  unique,
  valueFor,
} from './lib/agent-workflow-utils.mjs';

const args = process.argv.slice(2);
const projectDir = resolve(valueFor(args, '--project-dir') || valueFor(args, '--root') || DEFAULT_PROJECT_DIR);
const jsonMode = hasFlag(args, '--json');
const helpMode = hasFlag(args, '--help') || hasFlag(args, '-h');
const isCli = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isCli && helpMode) {
  console.log(usage());
  process.exit(0);
}

function usage() {
  return [
    'Usage:',
    '  node scripts/agent-parent-impact.mjs --route /tools/cursor/ --json',
    '  node scripts/agent-parent-impact.mjs --path src/content/tools/cursor.md',
    '',
    'Read-only parent and top-layer impact detector for AiPedia routes.',
  ].join('\n');
}

export function buildImpactReport(projectDir, options = {}) {
  const target = resolveTarget(projectDir, options);
  if (!target || !target.path) {
    return { ok: false, error: 'target route or path could not be resolved', project_dir: projectDir };
  }

  const isMarkdown = target.path.endsWith('.md') && fileExists(projectDir, target.path);
  const markdown = isMarkdown ? readMarkdownFile(projectDir, target.path) : { frontmatter: {}, body: '' };
  const route = target.route || pathToRoute(target.path, markdown.frontmatter);
  const slug = markdown.frontmatter.slug ?? route.split('/').filter(Boolean).at(-1) ?? '';
  const pages = allContentPages(projectDir);
  const ledger = loadLedger(projectDir);
  const surfaces = [];
  const sharedFiles = new Set(['PAGE_REFRESH_LEDGER.md']);

  function addSurface(surfaceRoute, path, reason, confidence = 'high') {
    const normalizedRoute = normalizeRoute(surfaceRoute);
    if (!normalizedRoute) return;
    if (surfaces.some((surface) => surface.route === normalizedRoute && surface.reason === reason)) return;
    const ledgerRow = ledger.find((row) => row.route === normalizedRoute) ?? null;
    surfaces.push({
      route: normalizedRoute,
      path: path || ledgerRow?.path || '',
      confidence,
      reason,
      ledger_last_updated: ledgerRow?.last_updated ?? '',
    });
  }

  addGlobalSurfaces(target, markdown.frontmatter, addSurface, sharedFiles);

  const targetLinks = new Set([route]);
  if (target.collection === 'tools' && slug) targetLinks.add(`/tools/${slug}/`);
  if (target.collection === 'categories' && slug) targetLinks.add(`/categories/${slug}/`);
  if (target.collection === 'comparisons' && slug) targetLinks.add(`/compare/${slug}/`);
  if (target.collection === 'use-cases' && slug) targetLinks.add(`/guides/${slug}/`);

  for (const page of pages) {
    if (page.path === target.path) continue;
    const frontmatterText = JSON.stringify(page.frontmatter);
    const bodyLinks = collectInternalLinks(page.body);
    const mentionsSlug = slug && new RegExp(`(^|[^a-z0-9-])${escapeRegExp(slug)}([^a-z0-9-]|$)`, 'i').test(frontmatterText);
    const linksTarget = bodyLinks.some((link) => targetLinks.has(link));
    if (!mentionsSlug && !linksTarget) continue;

    const reason = linksTarget
      ? `contains an internal link to ${route}`
      : `frontmatter references ${slug}`;
    const confidence = linksTarget ? 'high' : 'medium';
    addSurface(page.route, page.path, reason, confidence);
  }

  if (target.collection === 'tools') {
    sharedFiles.add('src/data/source-registry.json');
    sharedFiles.add('src/data/_meta/tools-registry.json');
    sharedFiles.add('src/data/logo-manifest.json');
    sharedFiles.add('src/data/generated-assets/og-tools-manifest.json');
  }

  return {
    ok: true,
    project_dir: projectDir,
    target: {
      route,
      path: target.path,
      collection: target.collection,
      type: target.type,
      slug,
      category: markdown.frontmatter.category ?? '',
    },
    surfaces: surfaces.sort((a, b) => a.route.localeCompare(b.route) || a.reason.localeCompare(b.reason)),
    shared_files: [...sharedFiles].sort(),
    recommended_checks: recommendedChecksFor(target.collection),
    notes: [
      'Read-only impact detector. Review surfaces before editing shared files.',
      'Confidence is based on route type, frontmatter references, and internal links, not live rendered output.',
    ],
  };
}

function addGlobalSurfaces(target, frontmatter, addSurface, sharedFiles) {
  if (target.collection === 'tools') {
    addSurface('/tools/', 'src/pages/tools/index.astro', 'tool catalog lists and searches tool records', 'high');
    addSurface('/categories/', 'src/pages/categories/index.astro', 'category index summarizes tool inventory', 'medium');
    addSurface('/', 'src/pages/index.astro', 'homepage can surface featured tools and search data', 'medium');
    if (frontmatter.category) {
      addSurface(`/categories/${frontmatter.category}/`, `src/content/categories/${frontmatter.category}.md`, 'primary category hub summarizes this tool', 'high');
    }
    addSurface('/llms.txt', 'src/pages/llms.txt.ts', 'LLM surface includes tool catalog data', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes tool details', 'high');
    sharedFiles.add('src/pages/api/tools.json.ts');
    sharedFiles.add('src/pages/api/search-tools.json.ts');
    sharedFiles.add('src/pages/api/home-search.json.ts');
  } else if (target.collection === 'categories') {
    addSurface('/categories/', 'src/pages/categories/index.astro', 'category index summarizes category hubs', 'high');
    addSurface('/tools/', 'src/pages/tools/index.astro', 'tool catalog filters by category', 'medium');
    addSurface('/', 'src/pages/index.astro', 'homepage can surface category picks', 'medium');
    addSurface('/llms.txt', 'src/pages/llms.txt.ts', 'LLM surface includes category summaries', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes category context', 'high');
  } else if (target.collection === 'comparisons') {
    addSurface('/compare/', 'src/pages/compare/index.astro', 'compare hub lists comparison pages', 'high');
    addSurface('/categories/', 'src/pages/categories/index.astro', 'category index may summarize comparison coverage', 'medium');
    addSurface('/llms.txt', 'src/pages/llms.txt.ts', 'LLM surface includes comparison routes', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes comparison content', 'high');
  } else if (target.collection === 'use-cases') {
    addSurface('/guides/', 'src/pages/guides/index.astro', 'guide hub lists buyer guides', 'high');
    addSurface('/', 'src/pages/index.astro', 'homepage can surface buyer guides', 'medium');
    addSurface('/llms.txt', 'src/pages/llms.txt.ts', 'LLM surface includes guide routes', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes guide content', 'high');
  } else if (target.collection === 'news') {
    addSurface('/news/', 'src/pages/news/index.astro', 'news hub lists news articles', 'high');
    addSurface('/', 'src/pages/index.astro', 'homepage latest-news rail can surface article changes', 'high');
    addSurface('/news/rss.xml', 'src/pages/news/rss.xml.ts', 'RSS feed includes news articles', 'high');
    addSurface('/llms.txt', 'src/pages/llms.txt.ts', 'LLM surface includes news routes', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes news content', 'high');
  } else if (target.collection === 'workflows') {
    addSurface('/workflows/', 'src/pages/workflows/index.astro', 'workflow hub lists workflow pages', 'high');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface includes workflow content', 'high');
  } else {
    const prefix = target.routePrefix || '/';
    addSurface(prefix, routePathForPrefix(prefix), 'section hub may summarize this page', 'medium');
    addSurface('/llms-full.txt', 'src/pages/llms-full.txt.ts', 'full LLM surface may include page content', 'medium');
  }
}

function routePathForPrefix(prefix) {
  const route = normalizeRoute(prefix);
  if (route === '/') return 'src/pages/index.astro';
  return `src/pages${route}index.astro`.replace('//', '/');
}

function recommendedChecksFor(collection) {
  const checks = ['npm run check:links', 'npm run ledger:pages && npm run ledger:pages:check'];
  if (collection === 'tools') checks.unshift('npm run audit:provenance:changed -- --json');
  if (collection === 'comparisons' || collection === 'use-cases') checks.unshift('npm run audit:coverage-quality:changed');
  if (collection === 'news') checks.unshift('npm run check:news');
  checks.push('npm run build:fast when rendered surfaces are edited');
  return unique(checks);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (isCli) {
  const report = buildImpactReport(projectDir, {
    route: valueFor(args, '--route'),
    path: valueFor(args, '--path'),
    slug: valueFor(args, '--slug'),
    type: valueFor(args, '--type'),
  });

  if (jsonMode) {
    process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  } else if (!report.ok) {
    console.error(`[agent-parent-impact] ${report.error}`);
    process.exitCode = 1;
  } else {
    console.log(`Parent impact for ${report.target.route}`);
    for (const surface of report.surfaces) {
      console.log(`- ${surface.route} (${surface.confidence}): ${surface.reason}`);
    }
  }
}
