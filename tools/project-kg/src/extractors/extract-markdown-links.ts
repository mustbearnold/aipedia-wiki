import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ProjectKgConfig } from '../config/schema.js';
import { DEFAULT_TEXT_EXTENSIONS } from '../config/default-ignore.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo, dirnamePosix, toPosixPath } from '../utils/paths.js';

const MARKDOWN_LINK_RE = /!?\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
const SITE_REF_RE = /(?:href|src)=["'](\/[^"'#?]+(?:[#?][^"']*)?)["']|["'](\/(?:tools|news|categories|companies|compare|comparisons|trends|workflows|reports|dead|logos|og|icons|images)\/[^"']+)["']/g;

export async function extractMarkdownLinks(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const fileSet = new Set(scanned.files.map((file) => file.path));
  const textFiles = scanned.files.filter((file) => DEFAULT_TEXT_EXTENSIONS.has(path.posix.extname(file.path).toLowerCase()));
  for (const file of textFiles) {
    const sourceNode = graph.getNodeByPath(file.path);
    if (!sourceNode) continue;
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, file.path), 'utf8');
    const links = collectLinks(raw);
    for (const link of links) {
      const href = stripHashAndQuery(link.href);
      if (!href || shouldSkipHref(href)) continue;
      const targetPath = resolveInternalLink(file.path, href, fileSet);
      if (!targetPath) {
        graph.addObservation({
          source: 'broken-links',
          severity: 'warning',
          message: `Broken internal link ${link.href} in ${file.path}`,
          relatedNodeId: sourceNode.id,
          metadata: { path: file.path, href: link.href, line: lineNumberAt(raw, link.index) },
        });
        continue;
      }
      const targetNode = graph.getNodeByPath(targetPath);
      if (!targetNode) continue;
      const edgeType = targetNode.type === 'asset' ? 'uses_asset' : 'links_to';
      graph.addEdge(sourceNode.id, edgeType, targetNode.id, {
        file: file.path,
        line: lineNumberAt(raw, link.index),
        snippet: link.snippet,
        href: link.href,
      });
    }
  }
}

function collectLinks(raw: string): Array<{ href: string; index: number; snippet: string }> {
  const links: Array<{ href: string; index: number; snippet: string }> = [];
  for (const match of raw.matchAll(MARKDOWN_LINK_RE)) {
    links.push({ href: match[1] ?? '', index: match.index ?? 0, snippet: match[0] });
  }
  for (const match of raw.matchAll(SITE_REF_RE)) {
    links.push({ href: match[1] ?? match[2] ?? '', index: match.index ?? 0, snippet: match[0] });
  }
  return links;
}

function shouldSkipHref(href: string): boolean {
  return (
    href.includes('${') ||
    href.includes('[') ||
    href.includes('(') ||
    href.includes('\\') ||
    href === '/logos/tools/' ||
    href.startsWith('#') ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('data:')
  );
}

function stripHashAndQuery(href: string): string {
  return href.split('#')[0].split('?')[0];
}

export function resolveInternalLink(sourcePath: string, href: string, fileSet: Set<string>): string | null {
  if (href.startsWith('/')) {
    return resolveSitePath(href, fileSet);
  }
  const base = toPosixPath(path.posix.normalize(path.posix.join(dirnamePosix(sourcePath), href)));
  const candidates = [
    base,
    `${base}.md`,
    `${base}.mdx`,
    `${base}.astro`,
    `${base}/index.md`,
    `${base}/index.mdx`,
    `${base}/index.astro`,
  ];
  return candidates.find((candidate) => fileSet.has(candidate)) ?? null;
}

function resolveSitePath(href: string, fileSet: Set<string>): string | null {
  const clean = href.replace(/^\/+/, '').replace(/\/$/, '');
  if (!clean) return fileSet.has('src/pages/index.astro') ? 'src/pages/index.astro' : null;
  const directPublic = `public/${clean}`;
  if (fileSet.has(directPublic)) return directPublic;
  const staticPageCandidates = [
    `src/pages/${clean}.astro`,
    `src/pages/${clean}/index.astro`,
    `src/pages/${clean}.ts`,
  ];
  for (const candidate of staticPageCandidates) if (fileSet.has(candidate)) return candidate;

  const [section, ...rest] = clean.split('/');
  const slug = rest.join('/');
  const collectionMap: Record<string, string> = {
    tools: 'tools',
    news: 'news',
    categories: 'categories',
    companies: 'companies',
    compare: 'comparisons',
    comparisons: 'comparisons',
    trends: 'trends',
    workflows: 'workflows',
    reports: 'reports',
    dead: 'dead',
    'use-cases': 'use-cases',
  };
  if (slug && collectionMap[section]) {
    const collection = collectionMap[section];
    const candidates = [`src/content/${collection}/${slug}.md`, `src/content/${collection}/${slug}.mdx`, `src/content/${collection}/${slug}/index.md`];
    for (const candidate of candidates) if (fileSet.has(candidate)) return candidate;
  }
  return null;
}

function lineNumberAt(text: string, index: number): number {
  return text.slice(0, index).split(/\r?\n/).length;
}
