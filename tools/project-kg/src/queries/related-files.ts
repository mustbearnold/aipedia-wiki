import type { DatabaseSync } from 'node:sqlite';
import { normalizeInputPath } from '../utils/paths.js';

export interface RelatedRow {
  direction: 'outgoing' | 'incoming';
  edge_type: string;
  node_type: string;
  name: string;
  path: string | null;
}

export function relatedFiles(db: DatabaseSync, repoRoot: string, inputPath: string): RelatedRow[] {
  const path = normalizeInputPath(repoRoot, inputPath);
  const node = db.prepare('SELECT id FROM nodes WHERE path = ? LIMIT 1').get(path) as { id: string } | undefined;
  if (!node) return [];
  const outgoing = db.prepare(`
    SELECT 'outgoing' AS direction, e.type AS edge_type, n.type AS node_type, n.name, n.path
    FROM edges e JOIN nodes n ON n.id = e.to_node_id
    WHERE e.from_node_id = ?
    ORDER BY e.type, n.path
  `).all(node.id) as unknown as RelatedRow[];
  const incoming = db.prepare(`
    SELECT 'incoming' AS direction, e.type AS edge_type, n.type AS node_type, n.name, n.path
    FROM edges e JOIN nodes n ON n.id = e.from_node_id
    WHERE e.to_node_id = ?
    ORDER BY e.type, n.path
  `).all(node.id) as unknown as RelatedRow[];
  return [...outgoing, ...incoming];
}
