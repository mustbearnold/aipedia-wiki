# Rust, CuPy, And GPU Roadmap

This is a future architecture document. It does not require immediate GPU implementation.

## Target Stack

- Rust: agent runtime, scheduler, task DAG, tool router, cache, validators, receipts, and process control.
- Python plus CuPy: warm GPU service for vector scoring, reranking, dedupe, similarity, and memory acceleration.
- Triton: future custom AI kernels when high-volume scoring patterns stabilize.
- CUDA C++: final maximum-performance hot kernels only when profiling justifies them.
- Faiss or cuVS: future vector search backend.
- TypeScript and Astro: frontend and content site layer.

## Design Rule

Do not start a new CuPy process per task.

Use:

- one long-running GPU service
- internal queues
- micro-batching
- warm CuPy memory pool
- preloaded vector or index shards
- strict HTTP or gRPC API

## Target Architecture

```text
Codex or future Rust orchestrator
  -> HTTP/gRPC
  -> CuPy GPU service
  -> embedding normalization
  -> similarity scoring
  -> memory reranking
  -> dedupe scoring
  -> context compression
```

## Possible Endpoints

- `POST /memory/search`
- `POST /memory/rerank`
- `POST /vectors/score`
- `POST /dedupe`
- `POST /context/compress`
- `POST /batch`
- `GET /health`

## Why This Matters

- Keeps GPU memory warm.
- Avoids repeated Python import overhead.
- Avoids repeated CUDA initialization.
- Avoids VRAM churn.
- Enables batching.
- Enables CUDA streams later.
- Keeps LLM context compact.
- Takes repetitive scoring load off the LLM.

## Keep Outside The GPU Layer

- Final judgment.
- Page writing.
- Factual synthesis.
- Source interpretation.
- Editorial quality decisions.
- Affiliate trust decisions.
- SEO strategy decisions.

## Belongs In The GPU Layer

- Vector scoring.
- Embedding normalization.
- Similarity matrix operations.
- Reranking candidate memories.
- Deduplication scoring.
- High-volume numerical filtering.
- Context candidate selection.

## Implementation Path

1. Keep current npm and Rust runner workflows stable.
2. Add deterministic evidence-bundle generation.
3. Store structured memory objects from page facts, source rows, ledger rows, and receipts.
4. Add CPU vector scoring first.
5. Add a long-running Python service only after scoring workloads are measurable.
6. Add CuPy micro-batching.
7. Add Rust task-DAG integration.
8. Add Triton or CUDA kernels only for profiled hot paths.

## Current CPU Baseline

The current branch uses `cpu-lexical-hash-v1` vectors from `scripts/lib/agent-cpu-vector.mjs`. These vectors support `agent:memory:record` and `agent:memory:query` without a GPU service.

The Rust runner has a bridge command:

```bash
npm --silent run runner:agent-plan -- --route /tools/cursor/ --current-date 2026-06-30
npm --silent run agent:dag:check -- --path local/tmp/aipedia-runner/agent-dag/agent-task-graph.json --json
```

It writes a validated `aipedia.agent-task-dag.v1` contract for evidence, impact, score, memory recording, synthesis, patch/report, validation, and closeout documentation. The contract includes node IDs, phases, dependencies, permissions, artifacts, validators, and receipt hooks. It does not execute a generic DAG yet.

## CuPy Gate

Do not add CuPy until CPU memory retrieval, reranking, or dedupe produces measured hotspots. The first metrics to collect are memory-record count, query latency, rerank latency, duplicate-candidate volume, and score-calibration mismatch rate.
