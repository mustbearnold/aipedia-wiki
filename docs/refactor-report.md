# Agent Workflow Refactor Report

Date: 2026-06-29

Branch: `agent-workflow-refactor-codex`

## Summary

Created a practical Codex operating system for AiPedia: a committed central `AGENTS.md`, an architecture audit, canonical workflow docs, task templates, final report format, future parallel and memory architecture docs, page quality scoring guidance, twelve reusable skills, and two small deterministic helper scripts.

This refactor does not change public page content, rendered templates, URLs, SEO metadata, affiliate links, source facts, or generated site output.

## What Changed

- Promoted `AGENTS.md` into the committed operating entrypoint while preserving `.agent/` as current-state memory.
- Added docs that explain how Codex should inspect, plan, gather evidence, patch, validate, and report.
- Added skill packs for tool refresh, new tool pages, affiliate pages, comparisons, daily news, fact checks, internal linking, SEO briefs, page quality audits, repo maintenance, memory retrieval, and parallel research.
- Added a deterministic workflow map script.
- Added a deterministic skill contract checker.
- Narrowed `.gitignore` so only the new canonical docs and root `AGENTS.md` are unignored, while older local-only docs stay ignored.

## Files Created

- `docs/agent-audit.md`
- `docs/aipedia-agent-workflows.md`
- `docs/codex-operating-manual.md`
- `docs/codex-task-templates.md`
- `docs/codex-report-format.md`
- `docs/parallel-tooling-architecture.md`
- `docs/rust-cupy-gpu-roadmap.md`
- `docs/agent-memory-system.md`
- `docs/page-quality-scoring.md`
- `docs/refactor-report.md`
- `scripts/agent-workflow-map.mjs`
- `scripts/check-agent-skills.mjs`
- `skills/*/SKILL.md`
- `skills/*/schema.json`
- `skills/*/examples/example-input.json`
- `skills/*/examples/example-output.md`
- selected `skills/*/references/README.md`

## Files Modified

- `.gitignore`
- `AGENTS.md`
- `package.json`
- `scripts/README.md`
- `.agent/CURRENT_STATUS.md`
- `.agent/PLANS.md`
- `.agent/WORK_LOG.md`

## Commands Run

- `git status -sb`
- `git checkout -b agent-workflow-refactor-codex`
- `node --check scripts/agent-workflow-map.mjs`
- `node --check scripts/check-agent-skills.mjs`
- `npm run agent:skills:check`
- `npm run agent:workflow:map -- --json`

Final no-build verification is recorded below after closeout.

## Build/Test Result

Rendered output was not changed, so a full build and route QA were not required for this refactor. No public page content, templates, metadata, schemas, or runtime routes changed.

No-build closeout passed:

- `node --check scripts/agent-workflow-map.mjs`
- `node --check scripts/check-agent-skills.mjs`
- `npm run agent:skills:check`
- `npm run agent:workflow:map -- --json`
- `npm run audit:commands`
- `node scripts/guard-em-dashes.mjs`
- `npm run check:quick`

## New Workflows

- `docs/aipedia-agent-workflows.md` defines six canonical workflows:
  - refresh an existing AI tool page
  - create a new AI tool page
  - create an affiliate buyer-intent page
  - create a comparison page
  - run daily AI tools news
  - perform repo maintenance

## New Skills

- `tool-page-refresh`
- `new-tool-page`
- `affiliate-page-builder`
- `comparison-page-builder`
- `daily-news-update`
- `fact-check-page`
- `internal-linking`
- `seo-brief`
- `page-quality-audit`
- `repo-maintenance`
- `memory-retrieval`
- `parallel-research`

## New Tooling

- `npm run agent:workflow:map`: prints content counts, workflow directories, skills, canonical docs, and command families.
- `npm run agent:skills:check`: validates skill directory structure, required sections, schemas, and example inputs.

The requested `tools/page`, `tools/seo`, and similar folders were not created because `tools/*` is intentionally ignored except the Rust runner, and this repo already exposes operator tools through `scripts/` and package commands. The new helper scripts follow that established pattern.

## Risks

- Root `AGENTS.md` was previously local-only. This branch intentionally changes that by unignoring it, so maintainers should confirm they want the root instruction file committed.
- The skills are practical v1 instructions and schemas. They validate structure, not deep editorial judgment.
- The memory and GPU architecture docs are designs, not implementations.
- No public content was refreshed in this branch, so no current AI product facts were re-verified beyond repo architecture inspection.

## Known Limitations

- No generic evidence-bundle CLI exists yet.
- No page quality scoring script exists yet.
- No memory store or vector index exists yet.
- No Rust task-DAG orchestrator beyond the existing refresh runner was implemented.
- No CuPy, CUDA, Triton, Faiss, or cuVS code was added.

## Recommended Next Steps

1. Review and commit the operating-system docs and skills.
2. Add a read-only evidence-bundle CLI for one route or tool slug.
3. Add a parent-surface impact detector.
4. Add a page quality scoring prototype that reads existing audits and ledgers.
5. Extend the Rust runner only after the evidence-bundle and scoring contracts stabilize.

## Future Rust/CuPy Implementation Path

Start with CPU-only deterministic evidence bundles and JSONL memory objects. Add Rust task-DAG scheduling around existing scripts. Add a long-running Python plus CuPy service only after retrieval, dedupe, and reranking workloads are measured and worth accelerating. Keep final editorial judgment, factual synthesis, page writing, and publishing decisions outside the GPU layer.
