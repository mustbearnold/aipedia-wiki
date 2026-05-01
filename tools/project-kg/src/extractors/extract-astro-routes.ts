import type { ProjectKgConfig } from '../config/schema.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';

export async function extractAstroRoutes(_config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  for (const file of scanned.files.filter((entry) => entry.path.startsWith('src/pages/') && entry.path.endsWith('.astro'))) {
    const node = graph.getNodeByPath(file.path);
    if (!node) continue;
    graph.upsertNode({
      ...node,
      metadata: {
        ...(node.metadata ?? {}),
        route: routeFromAstroPage(file.path),
      },
    });
  }
}

export function routeFromAstroPage(repoPath: string): string {
  let route = repoPath.replace(/^src\/pages/, '').replace(/\.astro$/, '');
  route = route.replace(/\/index$/, '/');
  route = route.replace(/\[\.{3}(.+?)\]/g, ':$1*').replace(/\[(.+?)\]/g, ':$1');
  if (!route.startsWith('/')) route = `/${route}`;
  return route === '//' ? '/' : route;
}
