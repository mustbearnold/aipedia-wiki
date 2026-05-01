import type { DatabaseSync } from 'node:sqlite';
import type { KgObservation } from '../graph/graph-types.js';
import { stableJson } from '../utils/json.js';

export function insertObservation(db: DatabaseSync, observation: KgObservation, createdAt = new Date().toISOString()): void {
  db.prepare(`
    INSERT INTO observations (id, source, severity, message, related_node_id, metadata_json, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      source = excluded.source,
      severity = excluded.severity,
      message = excluded.message,
      related_node_id = excluded.related_node_id,
      metadata_json = excluded.metadata_json
  `).run(
    observation.id,
    observation.source,
    observation.severity ?? null,
    observation.message,
    observation.relatedNodeId ?? null,
    stableJson(observation.metadata ?? {}),
    createdAt,
  );
}
