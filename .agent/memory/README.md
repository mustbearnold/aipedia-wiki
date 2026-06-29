# Agent Memory Records

This folder is the durable, tracked contract for future AiPedia agent memory.

Use local output while experimenting:

```bash
npm --silent run agent:memory:record -- --route /tools/cursor/ --json
npm --silent run agent:memory:query -- --memory local/tmp/agent-memory.jsonl --query "pricing source gaps" --json
```

Write committed memory deliberately:

```bash
npm --silent run agent:memory:record -- --route /tools/cursor/ --out .agent/memory/agent-memory.jsonl --append
```

Do not commit noisy exploratory memory. Commit JSONL only when it is a durable receipt or baseline that future agents should retrieve.

Current committed baseline:

- `baselines/2026-06-29-agent-workflow-routes.jsonl`: Cursor and Gemini vs Grok records generated while calibrating the first CPU memory/query path.
