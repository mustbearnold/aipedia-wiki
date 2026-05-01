import assert from 'node:assert/strict';
import test from 'node:test';
import { GraphBuilder } from '../src/graph/merge-graph.js';

test('GraphBuilder deduplicates equivalent path nodes', () => {
  const graph = new GraphBuilder();
  const first = graph.upsertNode({ type: 'file', name: 'a.ts', path: 'src/a.ts', metadata: { one: true } });
  const second = graph.upsertNode({ type: 'file', name: 'a.ts', path: 'src/a.ts', metadata: { two: true } });
  assert.equal(first.id, second.id);
  assert.equal(graph.nodes.size, 1);
  assert.deepEqual(graph.nodes.get(first.id)?.metadata, { one: true, two: true });
});

test('GraphBuilder edge IDs are deterministic for same evidence', () => {
  const graph = new GraphBuilder();
  const a = graph.upsertNode({ type: 'file', name: 'a.ts', path: 'src/a.ts' });
  const b = graph.upsertNode({ type: 'file', name: 'b.ts', path: 'src/b.ts' });
  const first = graph.addEdge(a.id, 'imports', b.id, { file: 'src/a.ts', line: 1 });
  const second = graph.addEdge(a.id, 'imports', b.id, { file: 'src/a.ts', line: 1 });
  assert.equal(first.id, second.id);
  assert.equal(graph.edges.size, 1);
});
