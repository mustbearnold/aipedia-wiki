---
type: news
slug: 2026-06-09-github-copilot-cli-custom-agents
title: "GitHub Copilot CLI custom agents turn team workflows into repo-reviewed instructions"
date: 2026-06-09
severity: major
summary: "GitHub published guidance for Copilot CLI custom agents that live as reviewed Markdown profiles in `.github/agents`, making repeatable security, infrastructure, release, and documentation workflows part of the coding-agent control plane."
categories: [ai-coding, ai-automation, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-10
last_verified: 2026-06-10
related_tools: [github-copilot, claude-code, cursor, devin]
sources:
  - url: https://github.blog/ai-and-ml/github-copilot/from-one-off-prompts-to-workflows-how-to-use-custom-agents-in-github-copilot-cli/
    title: "GitHub: From one-off prompts to workflows: How to use custom agents in GitHub Copilot CLI"
  - url: https://github.blog/changelog/2026-06-04-agent-tasks-rest-api-now-available-for-copilot-pro-pro-and-max/
    title: "GitHub: Agent tasks REST API now available for Copilot Pro, Pro+, and Max"
  - url: https://github.blog/changelog/2026-06-04-fix-with-copilot-for-failing-actions-now-in-pro-pro-and-max/
    title: "GitHub: Fix with Copilot for failing Actions now in Pro, Pro+, and Max"
---

# GitHub Copilot CLI custom agents turn team workflows into repo-reviewed instructions

GitHub's June 9, 2026 Copilot CLI custom-agent guidance is a quiet but important coding-agent signal: the next useful agent is not always a bigger model. Sometimes it is a workflow file your team can review.

AiPedia verified GitHub's Copilot blog and related June 4 Copilot changelog entries on June 10, 2026.

## What changed

GitHub describes Copilot CLI custom agents as reusable profiles that live inside a repository's `.github/agents` directory. Each profile is a Markdown file with YAML frontmatter that defines an agent's role, scope, capabilities, and guardrails.

Because the profile is a repo file, teams can review it, update it, and share it like other engineering process assets. GitHub's examples include agents for security audits, infrastructure-as-code compliance, documentation, releases, and incident work.

That lines up with GitHub's June 4 Copilot updates for agent-task APIs and fixing failing Actions: Copilot is moving from chat assistance toward controlled, repeatable software-delivery work.

## Why it matters

Coding-agent adoption is hitting the same wall every automation wave hits: a demo can be personal, but production workflow has to be shared.

Repo-stored agent profiles help answer practical questions:

- What is this agent allowed to do?
- Which tools can it call?
- What output format should it produce?
- Which policies must it follow?
- How does the team review changes to the agent itself?

That turns prompt craft into maintainable workflow design.

## Buyer action

Teams using [GitHub Copilot](/tools/github-copilot/) should start with boring, high-repeat workflows:

- Security scan summaries.
- Dependency review checklists.
- Terraform or Kubernetes policy review.
- Release-note drafts.
- CI failure triage.
- Documentation drift checks.

Treat each custom agent like production configuration. Keep the scope narrow, require review, and make tool access explicit.

## Watch-outs

A custom agent profile can encode bad process just as easily as good process. If it tells the agent to skip evidence, paste secrets, ignore test failures, or overstep ownership boundaries, the problem becomes repeatable.

Do not give a custom agent broad shell, cloud, or repository permissions just because the instruction file looks tidy. The profile is a steering layer, not a security boundary by itself.

## AiPedia verdict

Copilot CLI custom agents make [GitHub Copilot](/tools/github-copilot/) more useful for teams that already know their workflows. The best buyers will use custom agents to standardize reviewable work. The risky buyers will use them to automate vague work without proving the process first.
