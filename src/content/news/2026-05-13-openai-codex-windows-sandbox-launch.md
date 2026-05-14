---
type: news
slug: 2026-05-13-openai-codex-windows-sandbox-launch
title: "OpenAI details Codex's Windows sandbox, closing the macOS / Linux parity gap"
date: 2026-05-13
severity: minor
summary: "OpenAI published the May 13 engineering design for Codex's Windows sandbox. The final design rejects AppContainer as too narrow for agentic developer workflows and instead combines restricted tokens, dedicated sandbox users, firewall rules, ACL setup, and a command-runner binary so Codex commands inherit write and network boundaries."
categories: [ai-coding, ai-agents, ai-security]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-15
last_verified: 2026-05-15
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

# OpenAI details Codex's Windows sandbox, closing the macOS / Linux parity gap

**OpenAI** published an engineering note on **May 13, 2026** announcing that **Codex** on **Windows** now ships with a native sandbox implementation. The change moves Codex on Windows from "approve every command or run in Full Access mode" to the same default-sandboxed behavior that Codex has shipped with on macOS and Linux since launch.

The final Windows design is not AppContainer. OpenAI says AppContainer, Windows Sandbox, and Mandatory Integrity Control were evaluated and rejected for this workload. The implementation it describes combines **restricted tokens**, synthetic SIDs, targeted ACL setup, two dedicated local sandbox users (`CodexSandboxOffline` and `CodexSandboxOnline`), firewall rules for the offline user, and a `codex-command-runner.exe` helper that launches child processes inside the restricted boundary. Every Codex-launched command is meant to inherit the same write and network constraints.

The launch closes what had been the single most-cited reason for engineering teams to skip Codex on Windows fleets: the OS does not expose macOS-style **seatbelt** profiles or Linux-style **bubblewrap** / namespace isolation out of the box. Codex on Windows previously gave users two choices: approve commands individually (slow and noisy) or run with Full Access (fast but unsafe). Both options bled into production usage; the new default removes the trade-off.

## Why this matters

Three things move because of this.

It **unblocks more serious Windows fleet evaluations**. Many enterprise dev orgs run Windows on developer laptops and require sandbox-style isolation before they will deploy an agentic coding tool broadly. Codex on Windows previously failed that bar by default. With this design, OpenAI can point security teams to OS-enforced write boundaries and firewall-backed network controls rather than asking them to accept either constant approvals or Full Access mode.

It **changes the agent-trust dialogue on Windows broadly**. OpenAI publishing its Windows sandbox approach establishes a public reference for what "safe agent on Windows" requires when the agent needs developer-like access to shells, package managers, Git, build tools, and arbitrary child processes. The important detail is not one primitive; it is the composition of restricted tokens, ACLs, dedicated users, firewall rules, and a separate runner.

It **changes Codex's enterprise procurement conversation**. Security teams now have a concrete Windows isolation design to review. The decision can move back toward model quality, agent reliability, price, IDE integration, and auditability, instead of stopping at "what happens if the agent runs a local command?"

The cost question is the one OpenAI did not quantify. The engineering note describes setup work, ACL changes, dedicated users, firewall rules, and a command-runner handoff, but it does not publish cold-start latency or build-step slowdown vs. the prior Full Access path. Teams running large monorepos with thousands of agent-spawned subprocesses should measure before and after.

## Buyer take

If you run Codex inside a Windows-heavy engineering organization, three things this week:

- **Flip your default from Full Access to sandboxed.** The new sandbox is opt-in for existing installs and the default for fresh ones. If your team has been running Full Access because per-command approval was unworkable, the right action is to redeploy with the sandboxed default and measure whether your actual workflows hit the egress / write boundaries. Most won't.
- **Re-run your security review.** A material capability change like this is the trigger for security to re-run the threat model. Get OpenAI's sandbox documentation in front of your AppSec team this week, before they hear about it from a release blog after a future incident.
- **Compare against your current coding-agent isolation.** The differences are now at the policy and audit layer: where writes are allowed, how network egress is approved, what admin setup is required, and what logging security can inspect. Pick the tool whose sandbox policy maps closest to your endpoint-security rules.

For platform teams managing developer fleets: this is the moment to revisit your "approved coding agents on Windows" list. Anything you blocked because of sandbox concerns has likely been resolved. Anything still on the list should be reverified against current isolation primitives.

## What is still unclear

OpenAI's announcement focuses on the design and the engineering story; it does not publish quantified performance numbers for sandbox overhead, enterprise audit-log shape, or the exact policy controls exposed to admins. The relationship to the Codex CLI's Pets-style config-import feature shipped May 3 is also undocumented; sandbox policy and config-import behavior interact in ways that matter for enterprise rollouts.

Whether the sandbox is available for the API-only Codex SDK (not just the desktop / CLI agent) was not stated. The same applies to the Codex Chrome Extension shipped May 7. Buyers who run Codex headlessly should check the release notes for explicit sandboxed-mode support before standardizing.
