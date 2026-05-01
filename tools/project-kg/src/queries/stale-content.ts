import type { DatabaseSync } from 'node:sqlite';
import { safeJsonParse } from '../utils/json.js';

export interface StaleContentRow {
  path: string;
  last_verified?: string;
}

export function staleContent(db: DatabaseSync, beforeIsoDate: string): StaleContentRow[] {
  const rows = db.prepare(`
    SELECT path, metadata_json FROM nodes
    WHERE type = 'markdown_page' AND path LIKE 'src/content/%'
    ORDER BY path
  `).all() as Array<{ path: string; metadata_json: string | null }>;
  return rows.flatMap((row) => {
    const metadata = safeJsonParse<Record<string, unknown>>(row.metadata_json, {});
    const frontmatter = (metadata.frontmatter ?? {}) as Record<string, unknown>;
    const verified = String(frontmatter.last_verified ?? '');
    if (verified && verified < beforeIsoDate) return [{ path: row.path, last_verified: verified }];
    return [];
  });
}
