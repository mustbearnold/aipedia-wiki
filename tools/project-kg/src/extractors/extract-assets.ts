import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ProjectKgConfig } from '../config/schema.js';
import { DEFAULT_TEXT_EXTENSIONS, INSPECTED_ASSET_DIRS } from '../config/default-ignore.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo } from '../utils/paths.js';

export async function extractAssets(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const fileSet = new Set(scanned.files.map((file) => file.path));
  const assets = scanned.files.filter((file) => isInspectedAsset(file.path));
  const textFiles = scanned.files.filter((file) => DEFAULT_TEXT_EXTENSIONS.has(path.posix.extname(file.path).toLowerCase()));

  for (const file of textFiles) {
    const sourceNode = graph.getNodeByPath(file.path);
    if (!sourceNode) continue;
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, file.path), 'utf8');
    for (const asset of assets) {
      const publicPath = `/${asset.path.replace(/^public\//, '')}`;
      if (raw.includes(publicPath) || raw.includes(asset.path)) {
        const assetNode = graph.getNodeByPath(asset.path);
        if (assetNode) {
          graph.addEdge(sourceNode.id, 'uses_asset', assetNode.id, {
            file: file.path,
            reason: 'literal asset reference',
            asset: publicPath,
          });
        }
      }
    }
  }

  addImplicitOgAndLogoUsage(fileSet, assets.map((asset) => asset.path), graph);
}

export function isInspectedAsset(repoPath: string): boolean {
  return INSPECTED_ASSET_DIRS.some((dir) => repoPath.startsWith(`${dir}/`));
}

function addImplicitOgAndLogoUsage(fileSet: Set<string>, assetPaths: string[], graph: GraphBuilder): void {
  for (const assetPath of assetPaths) {
    const assetNode = graph.getNodeByPath(assetPath);
    if (!assetNode) continue;
    const name = path.posix.basename(assetPath).replace(/\.[^.]+$/, '');
    const inferredSources = inferAssetOwners(assetPath, name, fileSet);
    for (const sourcePath of inferredSources) {
      const sourceNode = graph.getNodeByPath(sourcePath);
      if (!sourceNode) continue;
      graph.addEdge(sourceNode.id, 'uses_asset', assetNode.id, {
        file: sourcePath,
        reason: 'implicit site asset convention',
        asset: assetPath,
      });
    }
  }
}

function inferAssetOwners(assetPath: string, name: string, fileSet: Set<string>): string[] {
  const owners: string[] = [];
  const normalized = assetPath.replace(/^public\//, '');
  if (normalized.startsWith('logos/tools/')) {
    const toolPath = `src/content/tools/${name}.md`;
    if (fileSet.has(toolPath)) owners.push(toolPath);
  }
  if (normalized.startsWith('og/news/') || normalized.startsWith('og/news/thumbs/')) {
    const newsPath = `src/content/news/${name}.md`;
    if (fileSet.has(newsPath)) owners.push(newsPath);
  }
  if (normalized.startsWith('og/tools/')) {
    const toolPath = `src/content/tools/${name}.md`;
    if (fileSet.has(toolPath)) owners.push(toolPath);
  }
  return owners;
}
