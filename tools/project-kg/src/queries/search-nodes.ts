import type { DatabaseSync } from 'node:sqlite';
import { safeJsonParse } from '../utils/json.js';

export interface NodeRow {
  id: string;
  type: string;
  name: string;
  path: string | null;
  metadata_json: string | null;
}

export function searchNodes(db: DatabaseSync, query: string, limit = 20): NodeRow[] {
  const like = `%${query}%`;
  const rows = db
    .prepare('SELECT id, type, name, path, metadata_json FROM nodes WHERE name LIKE ? OR path LIKE ? ORDER BY type, path LIMIT ?')
    .all(like, like, limit) as unknown as NodeRow[];
  return rows.map((row) => ({ ...row, metadata_json: JSON.stringify(safeJsonParse(row.metadata_json, {})) }));
}
