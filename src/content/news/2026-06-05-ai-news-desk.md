---
type: news
slug: 2026-06-05-ai-news-desk
title: "AI News Desk, June 5, 2026: Gemma 4 gets QAT, Copilot retires models, and enterprise plugins come to VS Code"
date: 2026-06-05
severity: major
summary: "June 5 AI news desk: Google releases quantization-aware Gemma 4 checkpoints for more efficient local deployment, GitHub deprecates GPT-5.2 and GPT-5.2-Codex across most Copilot experiences, and VS Code starts previewing enterprise-managed Copilot plugins."
categories: [ai-infrastructure, ai-coding, ai-automation]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-09
last_verified: 2026-06-09
related_tools: [github-copilot, gemini, ollama, lm-studio, open-webui]
sources:
  - url: https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/
    title: "Google: Quantization-Aware Training for Gemma 4"
  - url: https://github.blog/changelog/2026-06-05-gpt-5-2-and-gpt-5-2-codex-deprecated/
    title: "GitHub: GPT-5.2 and GPT-5.2-Codex deprecated"
  - url: https://github.blog/changelog/2026-06-05-enterprise-managed-plugins-in-vs-code-in-public-preview/
    title: "GitHub: Enterprise-managed plugins in VS Code in public preview"
---

# AI News Desk, June 5, 2026: Gemma 4 gets QAT, Copilot retires models, and enterprise plugins come to VS Code

This is the **June 5, 2026 AiPedia news desk**, verified against current primary sources on June 9.

Friday's strongest signal is maintenance becoming product strategy. Local models need efficient deployment. Coding agents need model lifecycle controls. Enterprise IDEs need managed plugin policy.

## Google optimizes Gemma 4 for smaller local deployments

Google released quantization-aware training checkpoints for Gemma 4. The stated goal is to reduce memory needs and improve on-device performance while preserving more quality than naive post-training quantization.

This matters for buyers testing local AI on laptops, workstations, phones, and edge devices. Local AI is not just model quality. It is model quality within the memory, latency, battery, and deployment constraints of the real device.

Read the standalone analysis: [Google gives Gemma 4 QAT checkpoints for on-device AI](/news/2026-06-05-google-gemma-4-qat-on-device/).

## GitHub deprecates GPT-5.2 and GPT-5.2-Codex in most Copilot experiences

GitHub's June 5 changelog says GPT-5.2 and GPT-5.2-Codex are deprecated across most Copilot experiences, while GPT-5.2 remains available for Copilot code review. GitHub points users toward newer alternatives such as GPT-5.5 and GPT-5.3-Codex.

The lesson is model churn. Teams using Copilot as a production coding surface need a process for model changes, not a spreadsheet of favorite defaults.

## VS Code starts previewing enterprise-managed Copilot plugins

GitHub also announced public-preview support for enterprise-managed plugins in VS Code 1.122. Admins can define plugin marketplaces in repository-hosted Copilot settings, and baseline standards apply to Copilot CLI and VS Code.

For enterprise buyers, this is more important than it sounds. Agent extensions and plugins can become data-access surfaces. Managed plugin policy is part of AI governance.

Read the standalone analysis: [GitHub pairs Copilot model deprecations with enterprise plugin controls](/news/2026-06-05-github-copilot-model-deprecations-plugins/).

## Desk verdict

June 5 is about operating AI after the demo. Gemma needs efficient deployability. Copilot needs model-lifecycle planning. VS Code needs plugin governance. The teams that win with AI tools in 2026 will be the teams that treat maintenance as a feature.
