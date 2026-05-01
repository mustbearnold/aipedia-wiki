import type { DatabaseSync } from 'node:sqlite';
import { normalizeInputPath } from '../utils/paths.js';

export interface DependsOnRow {
  edge_type: string;
  node_type: string;
  name: string;
  path: string | null;
}

export function whatDependsOn(db: DatabaseSync, repoRoot: string, inputPath: string): DependsOnRow[] {
  const path = normalizeInputPath(repoRoot, inputPath);
  const node = db.prepare('SELECT id FROM nodes WHERE path = ? LIMIT 1').get(path) as { id: string } | undefined;
  if (!node) return [];
  return db.prepare(`
    SELECT e.type AS edge_type, n.type AS node_type, n.name, n.path
    FROM edges e JOIN nodes n ON n.id = e.from_node_id
    WHERE e.to_node_id = ? AND e.type IN ('imports', 'links_to', 'uses_asset', 'related_to')
    ORDER BY e.type, n.path
  `).all(node.id) as unknown as DependsOnRow[];
}
