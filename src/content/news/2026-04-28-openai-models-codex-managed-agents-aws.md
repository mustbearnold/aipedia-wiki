---
type: news
slug: 2026-04-28-openai-models-codex-managed-agents-aws
title: "OpenAI brings GPT-5.5, Codex, and managed agents to Amazon Bedrock"
date: 2026-04-28
severity: major
summary: "OpenAI and AWS expanded their partnership with limited previews for OpenAI models on Bedrock, Codex on Bedrock, and Amazon Bedrock Managed Agents powered by OpenAI. The move turns Monday's Microsoft/OpenAI cloud reset into an immediate enterprise distribution shift."
affects: [chatgpt, codex]
categories: [ai-tools, ai-coding, ai-agents, ai-infrastructure, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-29
last_verified: 2026-04-29
related_tools: [chatgpt, codex]
sources:
  - url: "https://openai.com/index/openai-on-aws/"
    title: "OpenAI models, Codex, and Managed Agents come to AWS - OpenAI"
  - url: "https://aws.amazon.com/blogs/aws/top-announcements-of-the-whats-next-with-aws-2026/"
    title: "Top announcements of the What's Next with AWS, 2026 - AWS News Blog"
  - url: "https://aws.amazon.com/bedrock/openai/"
    title: "OpenAI on Amazon Bedrock - AWS"
  - url: "https://apnews.com/article/amazon-openai-microsoft-06a952e75217c14c98278d6ae78d9daf"
    title: "Amazon touts a major expansion with OpenAI as Microsoft ties loosen - AP News"
---

OpenAI's multi-cloud moment now has a concrete AWS product shape.

On April 28, 2026, OpenAI and AWS announced limited previews for three related capabilities: **OpenAI models on Amazon Bedrock**, **Codex on Amazon Bedrock**, and **Amazon Bedrock Managed Agents powered by OpenAI**. OpenAI says the bundle is meant to let enterprises use OpenAI models and tools inside AWS environments they already govern.

This is separate from, but directly enabled by, the Microsoft/OpenAI partnership reset covered in [OpenAI and Microsoft revise their partnership around nonexclusive model rights](/news/2026-04-27-openai-microsoft-nonexclusive-partnership/). The Microsoft deal removed the effective lock-in. The AWS announcement shows how fast OpenAI intends to use that room.

## What changed

OpenAI models, including GPT-5.5 and GPT-5.4, are coming to Amazon Bedrock in limited preview. The practical pitch is not "another place to call an API." It is model access through Bedrock's existing security, identity, procurement, governance, and cost-control layer.

Codex is also coming to Bedrock. OpenAI says Codex on Bedrock begins with Codex CLI, the Codex desktop app, and the VS Code extension, configured to use Bedrock as the provider. Eligible customers can apply usage toward AWS cloud commitments.

The third piece is Bedrock Managed Agents powered by OpenAI. AWS describes this as a managed runtime for OpenAI-powered agents that can maintain context, execute multi-step workflows, use tools, and operate inside AWS security and compliance controls.

## Why it matters

This is the most important OpenAI enterprise distribution story since the Microsoft relationship changed.

Many large buyers already run production data, apps, IAM, monitoring, procurement, and compliance on AWS. Before this, adopting OpenAI at scale often meant stitching together direct OpenAI access, Azure, or another provider path. Bedrock availability lowers that organizational friction.

For developers, the Codex piece is the sharper tool-market signal. If a team already standardizes around AWS, Codex can now move closer to the same cloud commitments and controls as the rest of the engineering platform.

That matters because coding agents are quickly becoming budget items, not experiments. The winner is not just the model with the best demo. It is the model and agent stack that procurement, security, and engineering operations can actually approve.

## Tool impact

For Codex, AWS distribution gives OpenAI a better enterprise wedge against Claude Code, Cursor, GitHub Copilot, and AWS's own Kiro/Amazon Q family. Codex is no longer only a direct OpenAI product story; it becomes a Bedrock procurement story too.

For ChatGPT and OpenAI API buyers, the model availability could reduce cloud architecture objections. Teams that did not want a new vendor path may be more willing to test GPT-5.5 inside Bedrock.

For AWS, the announcement makes Bedrock more credible as a neutral model and agent layer. Anthropic has long been central to AWS's AI story. Adding OpenAI gives buyers more leverage and gives AWS a better answer to Azure AI Foundry and Google Vertex AI.

## What to watch

The words "limited preview" matter.

Buyers should wait for concrete details on regions, model SKUs, latency, quota, data retention, pricing, and feature parity with direct OpenAI access. Codex behavior also needs real testing when Bedrock becomes the provider, especially for large repositories, long-running tasks, and enterprise network restrictions.

The strategic direction is clear, though: OpenAI wants to meet enterprises where their workloads already live. AWS now has the clearest early proof.

