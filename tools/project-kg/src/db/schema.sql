CREATE TABLE IF NOT EXISTS nodes (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  name TEXT NOT NULL,
  path TEXT,
  start_line INTEGER,
  end_line INTEGER,
  hash TEXT,
  metadata_json TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS edges (
  id TEXT PRIMARY KEY,
  from_node_id TEXT NOT NULL,
  to_node_id TEXT NOT NULL,
  type TEXT NOT NULL,
  weight REAL DEFAULT 1.0,
  evidence_json TEXT,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS observations (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  severity TEXT,
  message TEXT NOT NULL,
  related_node_id TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_nodes_type ON nodes(type);
CREATE INDEX IF NOT EXISTS idx_nodes_path ON nodes(path);
CREATE INDEX IF NOT EXISTS idx_edges_from_node_id ON edges(from_node_id);
CREATE INDEX IF NOT EXISTS idx_edges_to_node_id ON edges(to_node_id);
CREATE INDEX IF NOT EXISTS idx_edges_type ON edges(type);
