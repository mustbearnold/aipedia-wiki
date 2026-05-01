import { existsSync } from 'node:fs';
import path from 'node:path';

export function toPosixPath(value: string): string {
  return value.replace(/\\/g, '/').replace(/\/+/g, '/');
}

export function findRepoRoot(startDir = process.cwd()): string {
  let current = path.resolve(startDir);
  while (true) {
    if (existsSync(path.join(current, 'package.json')) && existsSync(path.join(current, 'astro.config.mjs'))) {
      return current;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      throw new Error(`Could not find repo root from ${startDir}`);
    }
    current = parent;
  }
}

export function repoRelative(root: string, filePath: string): string {
  const absolute = path.isAbsolute(filePath) ? filePath : path.resolve(root, filePath);
  const relative = path.relative(root, absolute);
  return toPosixPath(relative || '.');
}

export function absoluteFromRepo(root: string, repoPath: string): string {
  return path.resolve(root, repoPath);
}

export function normalizeInputPath(root: string, input: string): string {
  const cleaned = input.replace(/^file:\/\//, '');
  return repoRelative(root, cleaned);
}

export function dirnamePosix(repoPath: string): string {
  const dir = toPosixPath(path.posix.dirname(repoPath));
  return dir === '.' ? '.' : dir;
}

export function basenamePosix(repoPath: string): string {
  return path.posix.basename(toPosixPath(repoPath));
}

export function withoutExtension(repoPath: string): string {
  const parsed = path.posix.parse(toPosixPath(repoPath));
  return path.posix.join(parsed.dir, parsed.name);
}
