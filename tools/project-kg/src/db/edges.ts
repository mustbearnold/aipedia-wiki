import type { DatabaseSync } from 'node:sqlite';
import type { KgEdge } from '../graph/graph-types.js';
import { stableJson } from '../utils/json.js';

export function upsertEdge(db: DatabaseSync, edge: KgEdge, updatedAt = new Date().toISOString()): void {
  db.prepare(`
    INSERT INTO edges (id, from_node_id, to_node_id, type, weight, evidence_json, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      from_node_id = excluded.from_node_id,
      to_node_id = excluded.to_node_id,
      type = excluded.type,
      weight = excluded.weight,
      evidence_json = excluded.evidence_json,
      updated_at = excluded.updated_at
  `).run(
    edge.id,
    edge.fromNodeId,
    edge.toNodeId,
    edge.type,
    edge.weight ?? 1,
    stableJson(edge.evidence ?? {}),
    updatedAt,
  );
}
