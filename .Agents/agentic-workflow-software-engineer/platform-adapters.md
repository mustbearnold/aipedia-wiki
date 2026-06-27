# Platform Adapters

Use these notes to translate the canonical workflow into major coding-agent platforms.

## OpenAI Codex

- Prefer durable file edits over chat-only plans.
- Use subagents for independent investigation, verification, or disjoint file scopes.
- Give each worker exact allowed paths and report requirements.
- Use command output, route QA JSON, receipts, and ledgers as shared state.
- Keep the final integration in the main agent, with focused verification after merging worker outputs.

## Claude Code

- Use slash commands or local Markdown prompts to keep workflows repeatable.
- Keep worker prompts small and path-scoped.
- Ask for structured JSON or Markdown reports so integration can be audited.
- Re-run repo-native checks from the root agent after any worker edit.

## Cursor

- Store the canonical workflow as Markdown in the repo, then reference it from Cursor rules or chat.
- Prefer explicit file lists and diffs to broad workspace rewrites.
- Use terminal commands for verification, not editor-only confidence.
- Keep platform-specific instructions separate from the core workflow.

## GitHub Copilot Coding Agents

- Convert workflows into issue-ready task specs.
- Include acceptance criteria, file ownership, verification commands, and expected artifacts.
- Require PR summaries to include timing, tests, and regression risks.

## Local CLI Agent Runners

- Use machine-readable plan, report, and receipt files.
- Prefer Rust for high-throughput orchestration and deterministic batch runners.
- Prefer TypeScript or Node.js when integrating directly with existing package scripts.
- Keep logs and generated reports out of committed source unless they are canonical evidence.

## Portable Worker Report

Every worker should report:

```json
{
  "worker_id": "",
  "scope": [],
  "files_changed": [],
  "commands_run": [
    {
      "command": "",
      "status": "passed|failed|skipped",
      "duration_ms": 0,
      "notes": ""
    }
  ],
  "sources_checked": [],
  "quality_notes": [],
  "accuracy_notes": [],
  "regression_risks": [],
  "handoff_notes": ""
}
```
