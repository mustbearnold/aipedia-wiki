import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const DEFAULT_PROJECT_DIR = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

export const COLLECTION_ROUTE_MAP = {
  tools: { dir: 'src/content/tools', routePrefix: '/tools/', type: 'Tool' },
  categories: { dir: 'src/content/categories', routePrefix: '/categories/', type: 'Category' },
  comparisons: { dir: 'src/content/comparisons', routePrefix: '/compare/', type: 'Comparison' },
  'use-cases': { dir: 'src/content/use-cases', routePrefix: '/guides/', type: 'Guide' },
  news: { dir: 'src/content/news', routePrefix: '/news/', type: 'News' },
  companies: { dir: 'src/content/companies', routePrefix: '/companies/', type: 'Company' },
  trends: { dir: 'src/content/trends', routePrefix: '/trends/', type: 'Trend' },
  reports: { dir: 'src/content/reports', routePrefix: '/reports/', type: 'Report' },
  workflows: { dir: 'src/content/workflows', routePrefix: '/workflows/', type: 'Workflow' },
  dead: { dir: 'src/content/dead', routePrefix: '/dead/', type: 'Dead' },
  glossary: { dir: 'src/content/glossary', routePrefix: '/glossary/', type: 'Glossary' },
};

export function valueFor(args, flag) {
  const inline = args.find((arg) => arg.startsWith(`${flag}=`));
  if (inline) return inline.slice(flag.length + 1);
  const index = args.indexOf(flag);
  return index >= 0 ? args[index + 1] : undefined;
}

export function valuesFor(args, flag) {
  const values = [];
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === flag && args[index + 1]) {
      values.push(args[index + 1]);
      index += 1;
    } else if (arg.startsWith(`${flag}=`)) {
      values.push(arg.slice(flag.length + 1));
    }
  }
  return values.flatMap((value) => String(value).split(',').map((part) => part.trim()).filter(Boolean));
}

export function hasFlag(args, flag) {
  return args.includes(flag) || args.some((arg) => arg.startsWith(`${flag}=`));
}

export function projectPath(projectDir, path) {
  return relative(projectDir, resolve(projectDir, path)).replaceAll(sep, '/');
}

export function normalizeRoute(route) {
  if (!route) return '';
  if (route === '/') return '/';
  const withoutHash = String(route).split('#')[0].split('?')[0];
  const withLeading = withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`;
  if (/\.[a-z0-9]+$/i.test(withLeading)) return withLeading;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

export function slugFromPath(path) {
  return basename(path).replace(/\.(md|astro|ts)$/, '');
}

export function readMarkdownFile(projectDir, relativePath) {
  const absolutePath = resolve(projectDir, relativePath);
  const raw = readFileSync(absolutePath, 'utf8');
  if (!relativePath.endsWith('.md')) {
    return {
      path: projectPath(projectDir, absolutePath),
      raw,
      frontmatter: {},
      body: raw,
    };
  }
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const frontmatter = match ? yaml.load(match[1]) ?? {} : {};
  const body = match ? raw.slice(match[0].length) : raw;
  return {
    path: projectPath(projectDir, absolutePath),
    raw,
    frontmatter,
    body,
  };
}

export function listMarkdownFiles(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files.sort();
}

export function allContentPages(projectDir) {
  const pages = [];
  for (const [collection, spec] of Object.entries(COLLECTION_ROUTE_MAP)) {
    for (const absolutePath of listMarkdownFiles(join(projectDir, spec.dir))) {
      const relPath = projectPath(projectDir, absolutePath);
      const slug = slugFromPath(relPath);
      const route = slug === 'index' && collection === 'glossary'
        ? '/glossary/'
        : `${spec.routePrefix}${slug}/`;
      const isGlossaryIndex = collection === 'glossary' && basename(relPath) === 'index.md';
      const markdown = readMarkdownFile(projectDir, relPath);
      pages.push({
        collection,
        type: spec.type,
        path: relPath,
        route: normalizeRoute(isGlossaryIndex ? '/glossary/' : markdown.frontmatter.slug ? `${spec.routePrefix}${markdown.frontmatter.slug}/` : route),
        slug: markdown.frontmatter.slug ?? slug,
        frontmatter: markdown.frontmatter,
        body: markdown.body,
        raw: markdown.raw,
      });
    }
  }
  return pages.sort((a, b) => a.route.localeCompare(b.route));
}

export function pathToRoute(relativePath, frontmatter = {}) {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  for (const [collection, spec] of Object.entries(COLLECTION_ROUTE_MAP)) {
    if (!normalizedPath.startsWith(`${spec.dir}/`)) continue;
    const pathSlug = slugFromPath(normalizedPath);
    const slug = frontmatter.slug ?? pathSlug;
    if (collection === 'glossary' && pathSlug === 'index') return '/glossary/';
    return normalizeRoute(`${spec.routePrefix}${slug}/`);
  }

  if (normalizedPath === 'src/pages/index.astro') return '/';
  if (normalizedPath.startsWith('src/pages/')) {
    const route = normalizedPath
      .replace(/^src\/pages\//, '/')
      .replace(/\.(astro|ts)$/, '')
      .replace(/\/index$/, '/');
    return normalizeRoute(route);
  }

  return '';
}

export function collectionForPath(relativePath) {
  const normalizedPath = relativePath.replaceAll('\\', '/');
  for (const [collection, spec] of Object.entries(COLLECTION_ROUTE_MAP)) {
    if (normalizedPath.startsWith(`${spec.dir}/`)) return { collection, type: spec.type, ...spec };
  }
  return { collection: 'static', type: 'Static page', routePrefix: '/', dir: 'src/pages' };
}

export function loadLedger(projectDir) {
  const ledgerPath = join(projectDir, 'PAGE_REFRESH_LEDGER.md');
  if (!existsSync(ledgerPath)) return [];
  return readFileSync(ledgerPath, 'utf8')
    .split(/\r?\n/)
    .filter((line) => /^\|\s*\d{4}-\d{2}-\d{2}\s*\|/.test(line))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      return {
        last_updated: cells[0] ?? '',
        route: normalizeRoute(cells[1] ?? ''),
        type: cells[2] ?? '',
        sitemap: cells[3] ?? '',
        date_source: cells[4] ?? '',
        path: cells[5] ?? '',
      };
    });
}

export function loadSourceRegistry(projectDir) {
  const registryPath = join(projectDir, 'src/data/source-registry.json');
  if (!existsSync(registryPath)) return new Map();
  const parsed = JSON.parse(readFileSync(registryPath, 'utf8'));
  return new Map((parsed.sources ?? []).map((source) => [source.id, source]));
}

export function resolveTarget(projectDir, { route, path, slug, type } = {}) {
  const ledger = loadLedger(projectDir);
  const normalizedRoute = normalizeRoute(route);
  if (path) {
    const relPath = projectPath(projectDir, path);
    const markdown = existsSync(resolve(projectDir, relPath)) && relPath.endsWith('.md')
      ? readMarkdownFile(projectDir, relPath)
      : { frontmatter: {} };
    return {
      route: pathToRoute(relPath, markdown.frontmatter),
      path: relPath,
      ledger_row: ledger.find((row) => row.path === relPath) ?? null,
      ...collectionForPath(relPath),
    };
  }

  if (normalizedRoute) {
    const ledgerRow = ledger.find((row) => row.route === normalizedRoute);
    if (ledgerRow?.path) {
      return {
        route: normalizedRoute,
        path: ledgerRow.path,
        ledger_row: ledgerRow,
        ...collectionForPath(ledgerRow.path),
      };
    }

    const contentPage = allContentPages(projectDir).find((page) => page.route === normalizedRoute);
    if (contentPage?.path) {
      return {
        route: normalizedRoute,
        path: contentPage.path,
        ledger_row: null,
        ...collectionForPath(contentPage.path),
      };
    }
  }

  if (slug && type) {
    const spec = COLLECTION_ROUTE_MAP[type] ?? COLLECTION_ROUTE_MAP[`${type}s`];
    if (spec) {
      const relPath = `${spec.dir}/${slug}.md`;
      return {
        route: normalizeRoute(`${spec.routePrefix}${slug}/`),
        path: relPath,
        ledger_row: ledger.find((row) => row.path === relPath) ?? null,
        ...collectionForPath(relPath),
      };
    }
  }

  return null;
}

export function collectSourceIds(value, found = new Set()) {
  if (!value || typeof value !== 'object') return found;
  if (Array.isArray(value)) {
    for (const item of value) collectSourceIds(item, found);
    return found;
  }
  for (const [key, item] of Object.entries(value)) {
    if (key === 'source_id' && typeof item === 'string') found.add(item);
    if (key === 'source_refs' && Array.isArray(item)) {
      for (const sourceId of item) if (typeof sourceId === 'string') found.add(sourceId);
    }
    if (key === 'sources' && Array.isArray(item)) {
      for (const source of item) {
        if (source?.source_id) found.add(source.source_id);
      }
    }
    collectSourceIds(item, found);
  }
  return found;
}

export function collectInternalLinks(text) {
  const links = new Set();
  const re = /(?<![a-zA-Z0-9.:])\/(tools|news|categories|compare|guides|trends|companies|reports|workflows|dead|glossary|answers)\/([a-z0-9][a-z0-9-]*)?\/?/g;
  let match;
  while ((match = re.exec(text))) {
    links.add(normalizeRoute(match[0]));
  }
  return [...links].sort();
}

export function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function isoDate(value) {
  if (!value) return '';
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10);
  const stringValue = String(value);
  const match = stringValue.match(/\d{4}-\d{2}-\d{2}/);
  return match ? match[0] : stringValue;
}

export function daysOld(value, currentDate) {
  const date = Date.parse(isoDate(value));
  const current = Date.parse(isoDate(currentDate));
  if (!Number.isFinite(date) || !Number.isFinite(current)) return Infinity;
  return Math.floor((current - date) / 86400000);
}

export function clamp01(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function fileExists(projectDir, relativePath) {
  return Boolean(relativePath) && existsSync(resolve(projectDir, relativePath));
}

export function mtimeIso(projectDir, relativePath) {
  if (!fileExists(projectDir, relativePath)) return '';
  return statSync(resolve(projectDir, relativePath)).mtime.toISOString();
}
