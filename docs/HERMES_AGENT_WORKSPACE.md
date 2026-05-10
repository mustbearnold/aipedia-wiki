# Hermes Agent Workspace

This repository is a working copy of AiPedia for Hermes Agent. It should build, test, route, and publish exactly like the main AiPedia website. The folder name is different so Hermes can work independently; the website identity is not.

## Default model

- Default routine model: `deepseek-v4-flash`.
- Provider path: DeepSeek API, OpenRouter, Nous Portal, or any OpenAI-compatible endpoint that exposes `deepseek-v4-flash`.
- Verified May 10, 2026 against DeepSeek API docs: `deepseek-v4-flash` has 1M context, supports thinking and non-thinking modes, JSON output, tool calls, and chat prefix completion. Listed pricing is $0.14 per 1M cache-miss input tokens, $0.0028 per 1M cache-hit input tokens, and $0.28 per 1M output tokens.

## Operating rules

1. Keep AiPedia's public identity, canonical URLs, routes, components, and content model intact unless the user explicitly asks for a public-site change.
2. Use Hermes Agent for the same work pattern Codex follows: inspect first, make small reversible changes, update `PAGE_REFRESH_LEDGER.md` whenever a page is edited, then run the relevant checks.
3. Use DeepSeek V4 Flash for low-cost iteration, content inspection, search synthesis, routine code edits, and script-driven maintenance.
4. Escalate to a stronger model when a task involves complex architecture, high-stakes factual claims, security, large refactors, or failed verification.
5. Do not use stale repository content as proof for volatile AI facts. Search with the current month and year, then cite primary sources.
6. Do not let Hermes memory or auto-generated skills override `AGENTS.md`, the AiPedia Bible, or the current user request.

## Suggested environment

Copy `.env.hermes.example` to the environment file Hermes Agent expects, then fill in provider keys locally. Do not commit secrets.

```text
HERMES_DEFAULT_MODEL=deepseek-v4-flash
HERMES_LOW_COST_MODEL=deepseek-v4-flash
HERMES_STRONG_MODEL=
DEEPSEEK_API_BASE=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-v4-flash
```

## Verification baseline

Run these before trusting a Hermes-authored batch:

```bash
npm run ledger:pages:check
npm run check:links
npm run test:scripts
npm run build:fast
```

For page work, also run browser/mobile QA on the edited route and affected parent surfaces at 360, 390, 430, 768, and 1024 px.
