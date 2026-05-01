import type { DatabaseSync } from 'node:sqlite';

export interface UnusedAssetRow {
  path: string;
  size: number;
}

export function unusedAssets(db: DatabaseSync, limit = 200): UnusedAssetRow[] {
  return db.prepare(`
    SELECT n.path AS path, COALESCE(json_extract(n.metadata_json, '$.size'), 0) AS size
    FROM nodes n
    LEFT JOIN edges e ON e.to_node_id = n.id AND e.type = 'uses_asset'
    WHERE n.type = 'asset'
      AND n.path IS NOT NULL
      AND (
        n.path LIKE 'public/logos/%'
        OR n.path LIKE 'public/og/%'
        OR n.path LIKE 'public/icons/%'
        OR n.path LIKE 'public/images/%'
      )
      AND e.id IS NULL
    ORDER BY size DESC, path
    LIMIT ?
  `).all(limit) as unknown as UnusedAssetRow[];
}
