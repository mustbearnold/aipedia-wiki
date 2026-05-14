---
type: news
slug: 2026-05-13-openai-codex-windows-sandbox-launch
title: "OpenAI ships a real sandbox for Codex on Windows, closing the macOS / Linux parity gap"
date: 2026-05-13
severity: minor
summary: "OpenAI announced on May 13 that Codex on Windows now ships with a native sandbox implementation built on Windows Job Objects and AppContainer primitives, closing the gap with macOS and Linux where Codex commands have been sandboxed by default since launch. Windows users no longer have to choose between approving every command or running in Full Access mode."
categories: [ai-coding, ai-agents, ai-security]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-13
last_verified: 2026-05-13
affects: [codex]
related_tools: [codex, claude-code, cursor]
sources:
  - url: https://openai.com/index/building-codex-windows-sandbox/
    title: "Building a safe, effective sandbox to enable Codex on Windows"
  - url: https://developers.openai.com/codex/windows
    title: "Codex on Windows"
  - url: https://developers.openai.com/codex/changelog
    title: "Codex Changelog"
  - url: https://windowsforum.com/threads/openai-codex-arrives-on-windows-with-native-sandbox-and-agentic-workflows.404026/
    title: "OpenAI Codex Arrives on Windows with Native Sandbox and Agentic Workflows"
---

# OpenAI ships a real sandbox for Codex on Windows, closing the macOS / Linux parity gap

**OpenAI** published an engineering note on **May 13, 2026** announcing that **Codex** on **Windows** now ships with a native sandbox implementation. The change moves Codex on Windows from "approve every command or run in Full Access mode" to the same default-sandboxed behavior that Codex has shipped with on macOS and Linux since launch.

The sandbox is built on **Windows Job Objects** for process containment and **AppContainer** primitives for filesystem and capability scoping. Every Codex-launched command runs inside the boundary, and every child process the command spawns inherits the same constraints. The agent gets read access to the working directory, scoped write access only to paths it has been granted, and explicit network egress controls. Out-of-scope syscalls are blocked rather than prompted.

The launch closes what had been the single most-cited reason for engineering teams to skip Codex on Windows fleets: the OS does not expose macOS-style **seatbelt** profiles or Linux-style **bubblewrap** / namespace isolation out of the box. Codex on Windows previously gave users two choices: approve commands individually (slow and noisy) or run with Full Access (fast but unsafe). Both options bled into production usage; the new default removes the trade-off.

## Why this matters

Three things move because of this.

It **unblocks enterprise Windows fleet rollouts**. Most Fortune-2000 dev orgs run Windows on developer laptops and require sandbox-style isolation before they will deploy any agentic coding tool. Codex on Windows previously failed that bar by default. Cursor, Claude Code, and Cline all ship Windows sandboxing through their own implementations; Codex was the conspicuous holdout. With this update, OpenAI's coding agent reaches feature parity on the security baseline.

It **changes the agent-trust dialogue on Windows broadly**. Microsoft's own MDASH agentic security system, Anthropic's Claude Code, and Cursor's Agent mode all rely on filesystem and process isolation to stay safe when they take autonomous actions. OpenAI publishing its Windows sandbox approach establishes a public reference for what "safe agent on Windows" looks like for any vendor building agentic dev tools. Expect Microsoft to publish a parallel spec for the broader Windows AI agent ecosystem.

It **changes Codex's competitive position against Claude Code on enterprise procurement**. Until this week, the security-review answer to "should we standardize on Codex or Claude Code" frequently came down to "Claude Code has better isolation primitives on Windows." That gap is now closed. The decision goes back to model quality, agent reliability, pricing, and IDE integration, which is where OpenAI would rather it sit.

The cost question is the one OpenAI did not address in the announcement. Job Objects and AppContainer add per-process overhead. The engineering note focuses on the safety win and does not quantify cold-start latency or build-step slowdown vs. the prior Full Access default. Teams running large monorepos with thousands of agent-spawned subprocesses should measure before and after.

## Buyer take

If you run Codex inside a Windows-heavy engineering organization, three things this week:

- **Flip your default from Full Access to sandboxed.** The new sandbox is opt-in for existing installs and the default for fresh ones. If your team has been running Full Access because per-command approval was unworkable, the right action is to redeploy with the sandboxed default and measure whether your actual workflows hit the egress / write boundaries. Most won't.
- **Re-run your security review.** A material capability change like this is the trigger for security to re-run the threat model. Get OpenAI's sandbox documentation in front of your AppSec team this week, before they hear about it from a release blog after a future incident.
- **Compare against your current Claude Code or Cursor isolation.** All three tools now ship Windows sandboxing. The differences are at the policy granularity layer: which syscalls are blocked by default, how network egress is whitelisted, what audit logging is emitted. Pick the tool whose sandbox policy maps closest to your existing endpoint-security rules; that is now a real decision criterion.

For platform teams managing developer fleets: this is the moment to revisit your "approved coding agents on Windows" list. Anything you blocked because of sandbox concerns has likely been resolved. Anything still on the list should be reverified against current isolation primitives.

## What is still unclear

OpenAI's announcement focuses on the design and the engineering story; it does not publish quantified performance numbers for the sandbox overhead, the exact AppContainer profile, or the audit-log schema. The relationship to the Codex CLI's Pets-style config-import feature shipped May 3 is also undocumented, sandbox policy and config-import behavior interact in ways that matter for enterprise rollouts.

Whether the sandbox is available for the API-only Codex SDK (not just the desktop / CLI agent) was not stated. The same applies to the Codex Chrome Extension shipped May 7. Buyers who run Codex headlessly should check the release notes for explicit sandboxed-mode support before standardizing.
