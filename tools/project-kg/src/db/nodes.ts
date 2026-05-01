import type { DatabaseSync } from 'node:sqlite';
import type { KgNode } from '../graph/graph-types.js';
import { stableJson } from '../utils/json.js';

export function upsertNode(db: DatabaseSync, node: KgNode, updatedAt = new Date().toISOString()): void {
  db.prepare(`
    INSERT INTO nodes (id, type, name, path, start_line, end_line, hash, metadata_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      type = excluded.type,
      name = excluded.name,
      path = excluded.path,
      start_line = excluded.start_line,
      end_line = excluded.end_line,
      hash = excluded.hash,
      metadata_json = excluded.metadata_json,
      updated_at = excluded.updated_at
  `).run(
    node.id,
    node.type,
    node.name,
    node.path ?? null,
    node.startLine ?? null,
    node.endLine ?? null,
    node.hash ?? null,
    stableJson(node.metadata ?? {}),
    updatedAt,
  );
}

export function getNodeByPath(db: DatabaseSync, path: string): Record<string, unknown> | undefined {
  return db.prepare('SELECT * FROM nodes WHERE path = ? ORDER BY type LIMIT 1').get(path) as Record<string, unknown> | undefined;
}
