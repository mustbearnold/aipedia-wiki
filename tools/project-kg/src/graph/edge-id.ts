import { createHash } from 'node:crypto';
import type { EdgeType, Evidence } from './graph-types.js';
import { stableJson } from '../utils/json.js';

export function edgeId(fromNodeId: string, type: EdgeType, toNodeId: string, evidence?: Evidence): string {
  const evidenceHash = createHash('sha1').update(stableJson(evidence ?? {})).digest('hex').slice(0, 12);
  const key = `${fromNodeId}:${type}:${toNodeId}:${evidenceHash}`;
  return `edge:${createHash('sha1').update(key).digest('hex').slice(0, 20)}`;
}
