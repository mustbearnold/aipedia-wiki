import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import type { DatabaseSync } from 'node:sqlite';
import { brokenLinks } from '../queries/broken-links.js';
import { missingFrontmatter } from '../queries/missing-frontmatter.js';
import { repoSizeReport } from '../queries/repo-size-report.js';
import { unusedAssets } from '../queries/unused-assets.js';

export function writeJsonReport(db: DatabaseSync, repoRoot: string, reportPath: string): string {
  const payload = {
    generatedAt: new Date().toISOString(),
    repoSize: repoSizeReport(db),
    missingFrontmatter: missingFrontmatter(db, repoRoot),
    brokenLinks: brokenLinks(db),
    unusedAssets: unusedAssets(db),
  };
  mkdirSync(path.dirname(reportPath), { recursive: true });
  writeFileSync(reportPath, `${JSON.stringify(payload, null, 2)}\n`);
  return reportPath;
}
