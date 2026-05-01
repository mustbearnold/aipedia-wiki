import path from 'node:path';
import type { ProjectKgConfig } from '../config/schema.js';
import { ASSET_EXTENSIONS, INSPECTED_ASSET_DIRS } from '../config/default-ignore.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import { nodeId } from '../graph/node-id.js';
import type { NodeType } from '../graph/graph-types.js';
import type { ScanFilesResult, ScannedEntry } from '../scanner/scan-files.js';
import { basenamePosix, dirnamePosix } from '../utils/paths.js';

export function extractFiles(_config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): void {
  for (const dir of scanned.directories) {
    graph.upsertNode({
      type: 'directory',
      name: dir.path === '.' ? '.' : basenamePosix(dir.path),
      path: dir.path,
      metadata: { mtimeMs: dir.mtimeMs },
    });
  }

  for (const file of scanned.files) {
    const type = classifyFile(file);
    graph.upsertNode({
      type,
      name: basenamePosix(file.path),
      path: file.path,
      hash: file.hash,
      metadata: {
        size: file.size,
        extension: path.posix.extname(file.path).toLowerCase(),
        mtimeMs: file.mtimeMs,
      },
    });
  }

  for (const entry of scanned.entries) {
    if (entry.path === '.') continue;
    const parentPath = dirnamePosix(entry.path);
    const parent = graph.getNodeByPath(parentPath);
    const child = graph.getNodeByPath(entry.path);
    if (parent && child) {
      graph.addEdge(parent.id, 'contains', child.id, { file: entry.path, reason: 'filesystem containment' });
    }
  }
}

function classifyFile(file: ScannedEntry): NodeType {
  const ext = path.posix.extname(file.path).toLowerCase();
  if (isConfigFile(file.path)) return 'config';
  if (file.path.startsWith('src/pages/') && ext === '.astro') return 'astro_page';
  if (ext === '.md' || ext === '.mdx') return 'markdown_page';
  if (isInspectableAssetPath(file.path) || ASSET_EXTENSIONS.has(ext)) return 'asset';
  return 'file';
}

export function isConfigFile(repoPath: string): boolean {
  return (
    repoPath === 'package.json' ||
    repoPath === 'package-lock.json' ||
    repoPath === 'tsconfig.json' ||
    repoPath === 'astro.config.mjs' ||
    repoPath === 'src/content.config.ts' ||
    repoPath === '.gitignore' ||
    repoPath === 'AGENTS.md' ||
    repoPath.endsWith('/package.json') ||
    repoPath.endsWith('/tsconfig.json')
  );
}

export function isInspectableAssetPath(repoPath: string): boolean {
  return INSPECTED_ASSET_DIRS.some((dir) => repoPath === dir || repoPath.startsWith(`${dir}/`));
}

export function pathNodeId(type: NodeType, repoPath: string): string {
  return nodeId(type, repoPath, basenamePosix(repoPath));
}
