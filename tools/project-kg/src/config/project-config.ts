import path from 'node:path';
import { DEFAULT_IGNORE_DIRS } from './default-ignore.js';
import type { ProjectKgConfig } from './schema.js';
import { findRepoRoot } from '../utils/paths.js';

export function loadProjectConfig(startDir = process.cwd()): ProjectKgConfig {
  const repoRoot = findRepoRoot(startDir);
  return {
    repoRoot,
    dbPath: path.join(repoRoot, '.kg', 'project.db'),
    reportPath: path.join(repoRoot, 'reports', 'project-kg-report.md'),
    ignoredDirs: [...DEFAULT_IGNORE_DIRS],
  };
}
