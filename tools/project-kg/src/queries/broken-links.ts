import type { DatabaseSync } from 'node:sqlite';
import { safeJsonParse } from '../utils/json.js';

export interface BrokenLinkRow {
  message: string;
  path?: string;
  href?: string;
  line?: number;
}

export function brokenLinks(db: DatabaseSync): BrokenLinkRow[] {
  const rows = db.prepare(`
    SELECT message, metadata_json FROM observations
    WHERE source = 'broken-links'
    ORDER BY message
  `).all() as Array<{ message: string; metadata_json: string | null }>;
  return rows.map((row) => {
    const metadata = safeJsonParse<Record<string, unknown>>(row.metadata_json, {});
    return {
      message: row.message,
      path: typeof metadata.path === 'string' ? metadata.path : undefined,
      href: typeof metadata.href === 'string' ? metadata.href : undefined,
      line: typeof metadata.line === 'number' ? metadata.line : undefined,
    };
  });
}
