---
type: news
slug: 2026-05-28-claude-code-21153-mcp-security-windows-fixes
title: "Claude Code 2.1.153 fixes OAuth gateway leakage, MCP policy gaps, Windows install failures, and background-agent reliability"
date: 2026-05-28
severity: major
summary: "Claude Code 2.1.153 is a practical update for serious coding-agent teams: credential-boundary fixes, stricter MCP behavior, Windows rollback and installer fixes, background-agent improvements, and update-channel corrections."
categories: [ai-coding, ai-automation, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-28
last_verified: 2026-05-28
related_tools: [claude-code, claude]
sources:
  - url: https://code.claude.com/docs/en/changelog
    title: "Anthropic: Claude Code changelog"
---

# Claude Code 2.1.153 fixes OAuth gateway leakage, MCP policy gaps, Windows install failures, and background-agent reliability

Anthropic published Claude Code 2.1.153 on May 28, 2026. The release is not a flashy model launch. It is a reliability and security update that matters for teams using **[Claude Code](/tools/claude-code/)** as an operational coding agent.

The headline fix: Anthropic says it corrected a regression where a custom API gateway could receive a user's Anthropic OAuth credential instead of the gateway's own token. For teams routing Claude Code through gateways, proxies, or managed enterprise infrastructure, that is the line to read twice.

## What changed

Claude Code 2.1.153 adds and fixes a broad set of operational details:

- a `skipLfs` option for `github` and `git` plugin marketplace sources;
- a one-time notice when an npm global install cannot auto-update;
- terminal sizing variables for status line commands;
- better `claude agents` autocomplete across native slash commands and bundled skills;
- clearer PR counts in the agent view;
- `/doctor` reporting for the last update attempt;
- combined startup notices for MCP servers and connectors that need authentication;
- macOS privacy and permission persistence improvements for background agents;
- fixes for stateful MCP servers reconnect-looping on `tools/list`;
- stricter handling of subagent MCP policy and managed allow/deny rules;
- Windows installer, update rollback, PowerShell, VS Code shutdown, and malformed terminal-link fixes;
- multiple background-agent fixes around stale daemons, deleted working directories, temp files, repainting, copy behavior, session renaming, and background response continuation.

## Why buyers should care

Coding agents are different from chatbots because they mutate state. They read repositories, edit files, run shell commands, open PRs, invoke MCP servers, and sometimes operate inside enterprise-managed infrastructure.

That makes small-sounding fixes important. OAuth token routing, MCP policy inheritance, stale daemon behavior, failed installers, and background session persistence are not cosmetic issues. They decide whether a coding agent is usable in a team environment without creating avoidable security or reliability risk.

The 2.1.153 update is also a reminder that the best coding-agent product is not only the model. It is the runtime: update channel, sandboxing, MCP permissions, tool logs, terminal behavior, background session recovery, and IDE shutdown behavior.

## Who should update first

Update and re-test immediately if you:

- use custom API gateways or proxies;
- run MCP servers through enterprise-managed config;
- rely on subagents with separate MCP permissions;
- use Claude Code on Windows or inside VS Code;
- use background agents or remote sessions heavily;
- manage Claude Code through npm channels.

## AiPedia verdict

This is a **major maintenance release**, not because it changes the product pitch, but because it tightens the operational layer that makes coding agents safe enough for real teams.

If your organization is evaluating **[Claude](/tools/claude/)** or **Claude Code** against **[Codex](/tools/codex/)**, do not compare only coding benchmark scores. Ask how each product handles credentials, MCP policy, update rollback, stale sessions, IDE cleanup, and auditability after a long-running agent changes a repository.
