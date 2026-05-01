import { toPosixPath } from '../utils/paths.js';

export function shouldIgnorePath(repoPath: string, ignoredDirs: string[]): boolean {
  const normalized = toPosixPath(repoPath).replace(/^\.\//, '').replace(/\/$/, '');
  if (!normalized || normalized === '.') return false;
  return ignoredDirs.some((ignored) => {
    const cleanIgnored = toPosixPath(ignored).replace(/\/$/, '');
    if (!cleanIgnored.includes('/')) {
      return normalized === cleanIgnored || normalized.startsWith(`${cleanIgnored}/`) || normalized.includes(`/${cleanIgnored}/`);
    }
    return normalized === cleanIgnored || normalized.startsWith(`${cleanIgnored}/`);
  });
}
