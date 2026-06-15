import { existsSync } from 'node:fs';
import { isAbsolute, join } from 'node:path';

export function resolvePathFromProject(projectDir, pathArg) {
  return isAbsolute(pathArg) ? pathArg : join(projectDir, pathArg);
}

export function builtSiteDir(projectDir, pathArg) {
  if (pathArg) return resolvePathFromProject(projectDir, pathArg);
  if (process.env.AIPEDIA_FAST_BUILD === '1') {
    const fastCandidates = [join(projectDir, 'dist-fast', 'client'), join(projectDir, 'dist-fast')];
    return fastCandidates.find((candidate) => existsSync(candidate)) ?? fastCandidates[0];
  }

  const candidates = [
    join(projectDir, '.vercel', 'output', 'static'),
    join(projectDir, 'dist', 'client'),
    join(projectDir, 'dist'),
  ];

  return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}
