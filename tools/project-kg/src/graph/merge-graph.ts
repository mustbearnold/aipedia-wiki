import type { EdgeType, Evidence, KgEdge, KgNode, KgObservation, NodeType, ObservationSeverity } from './graph-types.js';
import { edgeId } from './edge-id.js';
import { nodeId } from './node-id.js';
import { stableJson } from '../utils/json.js';
import { createHash } from 'node:crypto';

export class GraphBuilder {
  readonly nodes = new Map<string, KgNode>();
  readonly edges = new Map<string, KgEdge>();
  readonly observations = new Map<string, KgObservation>();

  upsertNode(input: Omit<KgNode, 'id'> & { id?: string }): KgNode {
    const id = input.id ?? nodeId(input.type, input.path, input.name);
    const current = this.nodes.get(id);
    const next: KgNode = {
      ...current,
      ...input,
      id,
      metadata: {
        ...(current?.metadata ?? {}),
        ...(input.metadata ?? {}),
      },
    };
    this.nodes.set(id, next);
    return next;
  }

  addEdge(fromNodeId: string, type: EdgeType, toNodeId: string, evidence?: Evidence, weight = 1): KgEdge {
    const id = edgeId(fromNodeId, type, toNodeId, evidence);
    const edge: KgEdge = { id, fromNodeId, toNodeId, type, evidence, weight };
    this.edges.set(id, edge);
    return edge;
  }

  addObservation(input: Omit<KgObservation, 'id'> & { id?: string; severity?: ObservationSeverity }): KgObservation {
    const id =
      input.id ??
      `observation:${createHash('sha1')
        .update(`${input.source}:${input.relatedNodeId ?? ''}:${input.message}:${stableJson(input.metadata ?? {})}`)
        .digest('hex')
        .slice(0, 20)}`;
    const observation: KgObservation = { ...input, id };
    this.observations.set(id, observation);
    this.upsertNode({
      id: nodeId('observation', input.relatedNodeId, input.message),
      type: 'observation',
      name: input.message,
      metadata: {
        source: input.source,
        severity: input.severity ?? 'info',
        observationId: id,
      },
    });
    return observation;
  }

  getNodeByPath(path: string): KgNode | undefined {
    for (const node of this.nodes.values()) {
      if (node.path === path) return node;
    }
    return undefined;
  }
}
