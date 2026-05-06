---
type: news
slug: 2026-05-05-github-mcp-secret-dependency-scanning
title: "GitHub brings secret and dependency scanning into MCP developer workflows"
date: 2026-05-05
severity: major
summary: "GitHub made secret scanning through the GitHub MCP Server generally available and opened dependency scanning through MCP in public preview, pushing security checks closer to Copilot and other MCP-compatible coding-agent workflows."
categories: [ai-coding, ai-security, developer-tools]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-07
last_verified: 2026-05-07
affects: [github-copilot]
related_tools: [github-copilot]
sources:
  - url: https://github.blog/changelog/2026-05-05-secret-scanning-with-github-mcp-server-is-now-generally-available/
    title: "Secret scanning with GitHub MCP Server is now generally available"
  - url: https://github.blog/changelog/2026-05-05-dependency-scanning-with-github-mcp-server-is-in-public-preview/
    title: "Dependency scanning with GitHub MCP Server is in public preview"
  - url: https://github.blog/changelog/2026-05-05-code-to-cloud-risk-visibility-with-microsoft-defender-for-cloud-is-now-generally-available/
    title: "Code-to-cloud risk visibility with Microsoft Defender for Cloud is now generally available"
---

# GitHub brings secret and dependency scanning into MCP developer workflows

GitHub announced on May 5, 2026, that secret scanning through the GitHub MCP Server is now generally available. Developers using MCP-compatible agents or IDEs, including GitHub Copilot CLI and Visual Studio Code, can ask the agent to scan local changes for exposed secrets before commit or pull request creation.

The same changelog cycle added dependency scanning through GitHub MCP Server in public preview, giving coding agents a path to inspect dependency risk from the developer workflow rather than only from a repository security dashboard.

GitHub also made its Microsoft Defender for Cloud code-to-cloud risk visibility generally available. That integration correlates code, build artifacts, deployments, and runtime context, then lets teams filter and assign fixes based on what is actually deployed and exposed.

## Why this matters

AI coding agents increase the amount of code and configuration moving through local and cloud workflows. Security checks need to move closer to the agent loop, not stay only at the final pull-request gate.

For GitHub Copilot, the MCP path is especially important. It turns the GitHub MCP Server from a context pipe into part of the AppSec workflow, with secret and dependency checks available where developers are already asking the agent to make changes.

## Buyer take

Copilot teams should test whether MCP-based scans catch the issues their developers actually miss: leaked tokens, risky dependency changes, and code-to-runtime vulnerabilities in deployed services.

Treat this as a complement to branch protection, CI scanning, and human review. The agent can surface risks earlier, but it should not become the only security reviewer.

## What is still unclear

Dependency scanning through MCP is still in preview. Coverage, false positives, and compatibility with non-default agent setups need hands-on validation before policy depends on it.
