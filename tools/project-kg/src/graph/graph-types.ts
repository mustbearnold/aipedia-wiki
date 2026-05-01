export type NodeType =
  | 'file'
  | 'directory'
  | 'script'
  | 'markdown_page'
  | 'astro_page'
  | 'asset'
  | 'config'
  | 'observation';

export type EdgeType =
  | 'contains'
  | 'imports'
  | 'has_frontmatter'
  | 'links_to'
  | 'uses_asset'
  | 'defines_script'
  | 'related_to';

export type ObservationSeverity = 'info' | 'warning' | 'error';

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

export interface Evidence {
  file?: string;
  line?: number;
  snippet?: string;
  reason?: string;
  [key: string]: JsonValue | undefined;
}

export interface KgNode {
  id: string;
  type: NodeType;
  name: string;
  path?: string;
  startLine?: number;
  endLine?: number;
  hash?: string;
  metadata?: Record<string, JsonValue>;
}

export interface KgEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  type: EdgeType;
  weight?: number;
  evidence?: Evidence;
}

export interface KgObservation {
  id: string;
  source: string;
  severity?: ObservationSeverity;
  message: string;
  relatedNodeId?: string;
  metadata?: Record<string, JsonValue>;
}

export interface GraphInput {
  nodes: KgNode[];
  edges: KgEdge[];
  observations: KgObservation[];
}
