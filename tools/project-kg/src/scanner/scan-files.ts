import { promises as fs } from 'node:fs';
import path from 'node:path';
import { shouldIgnorePath } from './ignore-rules.js';
import { hashFile } from './hash-file.js';
import type { ProjectKgConfig } from '../config/schema.js';
import { repoRelative, toPosixPath } from '../utils/paths.js';

export interface ScannedEntry {
  path: string;
  absolutePath: string;
  kind: 'file' | 'directory';
  size: number;
  hash?: string;
  mtimeMs: number;
}

export interface ScanFilesResult {
  entries: ScannedEntry[];
  files: ScannedEntry[];
  directories: ScannedEntry[];
}

export async function scanFiles(config: ProjectKgConfig): Promise<ScanFilesResult> {
  const entries: ScannedEntry[] = [];

  async function walk(absoluteDir: string): Promise<void> {
    const repoDir = repoRelative(config.repoRoot, absoluteDir);
    if (shouldIgnorePath(repoDir, config.ignoredDirs)) return;

    const dirStat = await fs.stat(absoluteDir);
    entries.push({
      path: repoDir,
      absolutePath: absoluteDir,
      kind: 'directory',
      size: 0,
      mtimeMs: dirStat.mtimeMs,
    });

    const children = await fs.readdir(absoluteDir, { withFileTypes: true });
    for (const child of children) {
      const absolute = path.join(absoluteDir, child.name);
      const repoPath = toPosixPath(path.relative(config.repoRoot, absolute));
      if (shouldIgnorePath(repoPath, config.ignoredDirs)) continue;
      if (child.isDirectory()) {
        await walk(absolute);
      } else if (child.isFile()) {
        const stat = await fs.stat(absolute);
        entries.push({
          path: repoPath,
          absolutePath: absolute,
          kind: 'file',
          size: stat.size,
          hash: await hashFile(absolute),
          mtimeMs: stat.mtimeMs,
        });
      }
    }
  }

  await walk(config.repoRoot);
  const directories = entries.filter((entry) => entry.kind === 'directory');
  const files = entries.filter((entry) => entry.kind === 'file');
  return { entries, files, directories };
}
