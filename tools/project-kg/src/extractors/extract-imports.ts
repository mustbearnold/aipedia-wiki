import { promises as fs } from 'node:fs';
import path from 'node:path';
import type { ProjectKgConfig } from '../config/schema.js';
import { DEFAULT_TEXT_EXTENSIONS } from '../config/default-ignore.js';
import type { GraphBuilder } from '../graph/merge-graph.js';
import type { ScanFilesResult } from '../scanner/scan-files.js';
import { absoluteFromRepo, dirnamePosix, toPosixPath } from '../utils/paths.js';

const IMPORT_RE = /\bimport\s+(?:[^'"]+\s+from\s+)?['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)|\bexport\s+[^'"]*\s+from\s+['"]([^'"]+)['"]/g;

export async function extractImports(config: ProjectKgConfig, scanned: ScanFilesResult, graph: GraphBuilder): Promise<void> {
  const fileSet = new Set(scanned.files.map((file) => file.path));
  const codeFiles = scanned.files.filter((file) => DEFAULT_TEXT_EXTENSIONS.has(path.posix.extname(file.path).toLowerCase()));
  for (const file of codeFiles) {
    const ext = path.posix.extname(file.path).toLowerCase();
    if (!['.astro', '.js', '.jsx', '.mjs', '.ts', '.tsx'].includes(ext)) continue;
    const sourceNode = graph.getNodeByPath(file.path);
    if (!sourceNode) continue;
    const raw = await fs.readFile(absoluteFromRepo(config.repoRoot, file.path), 'utf8');
    for (const match of raw.matchAll(IMPORT_RE)) {
      const specifier = match[1] ?? match[2] ?? match[3] ?? '';
      if (!specifier.startsWith('.')) continue;
      const targetPath = resolveRelativeImport(file.path, specifier, fileSet);
      if (!targetPath) continue;
      const targetNode = graph.getNodeByPath(targetPath);
      if (targetNode) {
        graph.addEdge(sourceNode.id, 'imports', targetNode.id, {
          file: file.path,
          line: lineNumberAt(raw, match.index ?? 0),
          snippet: match[0],
          specifier,
        });
      }
    }
  }
}

export function resolveRelativeImport(sourcePath: string, specifier: string, fileSet: Set<string>): string | null {
  const sourceDir = dirnamePosix(sourcePath);
  const base = toPosixPath(path.posix.normalize(path.posix.join(sourceDir, specifier)));
  const candidates = [
    base,
    `${base}.ts`,
    `${base}.tsx`,
    `${base}.js`,
    `${base}.jsx`,
    `${base}.mjs`,
    `${base}.astro`,
    `${base}.json`,
    `${base}/index.ts`,
    `${base}/index.tsx`,
    `${base}/index.js`,
    `${base}/index.mjs`,
    `${base}/index.astro`,
  ];
  return candidates.find((candidate) => fileSet.has(candidate)) ?? null;
}

function lineNumberAt(text: string, index: number): number {
  return text.slice(0, index).split(/\r?\n/).length;
}
