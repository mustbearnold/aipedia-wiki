---
type: news
slug: 2026-05-19-claude-managed-agents-self-hosted-sandboxes-mcp-tunnels
title: "Claude Managed Agents can now run tool execution inside customer-controlled sandboxes"
date: 2026-05-19
severity: major
summary: "Anthropic added self-hosted sandboxes and MCP tunnels to Claude Managed Agents, letting enterprises keep agent tool execution, files, packages, and private services inside infrastructure they control while Anthropic continues to run the agent loop. The buyer signal: Claude's agent platform is moving from demo-friendly automation toward governable runtime architecture."
categories: [ai-agents, ai-enterprise, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-21
last_verified: 2026-05-21
affects: [claude, claude-code]
related_tools: [claude, claude-code, codex, github-copilot]
sources:
  - url: https://claude.com/blog/claude-managed-agents-updates
    title: "Claude: New in Claude Managed Agents: self-hosted sandboxes and MCP tunnels"
  - url: https://blog.cloudflare.com/claude-managed-agents/
    title: "Cloudflare: Announcing Claude Managed Agents on Cloudflare"
  - url: https://vercel.com/changelog/run-claude-managed-agents-with-vercel-sandbox
    title: "Vercel: Run Claude Managed Agents with Vercel Sandbox"
---

# Claude Managed Agents can now run tool execution inside customer-controlled sandboxes

Anthropic's **May 19, 2026** Claude Managed Agents update is one of the more important enterprise-agent releases of the month because it changes where agent work actually happens.

Instead of forcing every tool call into an Anthropic-controlled execution environment, **self-hosted sandboxes** let customers run the execution side of a Claude Managed Agent inside their own infrastructure or with supported providers such as Cloudflare, Daytona, Modal, and Vercel. Anthropic still runs the agent loop, including orchestration, context handling, and error recovery, but the sandbox that touches files, packages, repositories, private services, and compute can sit inside the customer's perimeter.

Anthropic also introduced **MCP tunnels** in research preview. These let agents connect to private Model Context Protocol servers without exposing those servers to the public internet.

## What changed

Self-hosted sandboxes are now in public beta on the Claude Platform. They are designed for teams that want Claude's managed agent harness without moving sensitive execution into a vendor-owned sandbox. The customer controls the runtime image, resource sizing, network policy, observability, and local security tooling.

That matters because an agent that can read files, run shell commands, call APIs, and install packages is no longer just a chatbot. It is a runtime security object. Enterprises need to decide where that runtime lives, what it can reach, which secrets it can use, and which logs prove what happened.

MCP tunnels address the other half of the problem: private tools. A company can expose internal databases, APIs, knowledge bases, ticketing systems, and other MCP servers through an outbound gateway, without creating public endpoints or inbound firewall rules. Anthropic says MCP tunnels work in Managed Agents and the Messages API, with organization-admin management through the Claude Console.

Cloudflare and Vercel both published launch support. Cloudflare is positioning its integration around Cloudflare Sandboxes, zero-trust secret injection, customizable egress, and access to private services over Cloudflare's network. Vercel is positioning Vercel Sandbox as a Firecracker microVM execution layer with credential brokering and deny-by-default egress.

## Why this matters

This is the kind of feature enterprise buyers should care about more than another benchmark chart. Agent adoption stalls when security teams cannot answer basic runtime questions:

- Where does the agent execute code?
- Can sensitive repositories stay inside the company boundary?
- Can the agent reach private services without public exposure?
- Are credentials injected narrowly instead of copied into the sandbox?
- Can infrastructure teams log and restrict outbound traffic?

Claude Managed Agents now has a clearer answer to those questions. It still requires careful review, and MCP tunnels are not fully GA yet, but the architecture is moving in the right direction for regulated companies.

The update also sharpens the competitive line against **[OpenAI Codex](/tools/codex/)**, **[GitHub Copilot](/tools/github-copilot/)**, Cursor, and in-house agent platforms. The next stage of agent competition is not just "who has the smartest model?" It is "who can let an autonomous system act inside real infrastructure without creating an ungovernable security mess?"

## Buyer take

If your company already uses **[Claude](/tools/claude/)** or **[Claude Code](/tools/claude-code/)**, treat this as an enterprise-platform evaluation item, not a feature to switch on casually. Start with low-risk workflows, a scoped sandbox image, strict egress rules, branch protections, and logging that security can actually review.

If you are buying agent infrastructure, ask Anthropic and every competing vendor the same questions: where execution runs, how credentials are brokered, whether private MCP servers require public exposure, what audit logs exist, how memory works in self-hosted mode, and what happens when a session is interrupted.

For indie builders and small teams, the default managed experience may still be easier. Self-hosting is most valuable when data locality, compliance, private network access, or custom runtime control is the blocker.

## What to watch next

Watch for MCP tunnels moving from research preview toward general availability, clearer support for persistent memory in self-hosted mode, and broader reference architectures from Cloudflare, Vercel, Daytona, and Modal.

The big question is whether this becomes a normal enterprise pattern: lab hosts the agent brain, customer hosts the hands.
