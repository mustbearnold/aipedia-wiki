---
type: tool
slug: claude
title: Claude
tagline: Anthropic's AI assistant. Opus 4.7 is the new flagship as of April 16, 2026 — 1M token context, strongest agentic coding via Claude Code, Constitutional AI training for reduced sycophancy.
category: ai-chatbots
secondary_categories: [ai-writing, ai-coding]
company: anthropic
url: https://claude.ai
pricing_model: freemium
price_range: "$0-$200/month"
status: active
launched: 2023-03
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
seo_title: "Claude: Features, Pricing & Review (2026)"
meta_description: "Claude runs Opus 4.7 (released April 16, 2026) as flagship, Sonnet 4.6, and Haiku 4.5. 1M token context, same $5/$25 per MTok API pricing as 4.6. Free tier available; Pro $20/mo. Best for reasoning, long-form writing, and agentic coding."
author: "aipedia.wiki Editorial"
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 10
  value: 9
  moat: 9
  longevity: 10
tags: [chatbot, ai-assistant, writing, coding, reasoning, analysis, long-context, artifacts, claude-code, extended-thinking, computer-use]
best_for:
  - long-form writing and editing
  - complex reasoning and analysis
  - agentic coding via Claude Code
  - large document and codebase processing
  - computer security research (via Mythos Preview, invite-only)
not_best_for:
  - image generation
  - broad plugin or integration ecosystem
  - users wanting a single tool for shopping, calendar, and search
quick_answer: >-
  Claude is Anthropic's AI assistant. Opus 4.7 became the flagship on April 16, 2026, narrowly retaking the lead for most powerful generally-available LLM against GPT-5.4 and Gemini 3.1 Pro on agentic coding, scaled tool use, computer use, and financial analysis. Pricing is unchanged from Opus 4.6 ($5 / $25 per MTok) but a new tokenizer increases effective token counts by 1.0-1.35x depending on content. Sonnet 4.6 and Haiku 4.5 round out the lineup. Free tier; Pro $20/mo; Max $100/$200/mo. Claude Code CLI is the strongest agentic coding tool available. Best for writing, reasoning, and code; skip for image generation or a broad plugin ecosystem.
price_history:
  - date: 2026-04-16
    plan: "Opus 4.7"
    price: "$5 / $25 per MTok"
    note: "New flagship released — per-token pricing matches Opus 4.6; effective cost rises 1.0-1.35x due to new tokenizer"
  - date: 2026-04-17
    plan: "Pro"
    price: "$20/mo"
    note: "Verified, unchanged"
---

# Claude

Anthropic's AI assistant. **Opus 4.7** is the flagship as of **April 16, 2026**, narrowly retaking the lead for most powerful generally-available LLM on agentic coding, scaled tool use, computer use, and financial-analysis benchmarks. Sonnet 4.6 and Haiku 4.5 round out the lineup. The 1M token context window carries across Opus and Sonnet; Claude Code CLI handles agentic coding from the terminal; Constitutional AI training targets reduced sycophancy and harmful outputs.

## System Verdict

> **Pick Claude if you need the strongest reasoning, long-form writing, or agentic coding available right now.** Opus 4.7 (released April 16) takes measurable leads on agentic coding, tool use, and financial analysis against GPT-5.4 and Gemini 3.1 Pro. Claude Code remains the strongest CLI coding agent on the market. The 1M context window on Opus and Sonnet beats ChatGPT's undisclosed window when you actually need the whole codebase loaded.
>
> **Skip it if your workload needs image generation, video, or a deep plugin / integration ecosystem.** Claude has no native image gen (use Midjourney or GPT Image 1.5), no video (Veo 3 or Kling), and a much smaller third-party tool marketplace than ChatGPT. Anthropic's conservative safety posture also refuses more requests than GPT-5.4 does.
>
> **Who pays which tier:** Free for casual Sonnet access, Pro $20/mo for most individuals needing Opus + extended thinking, Max 5x $100/mo for heavy solo coders, Max 20x $200/mo for teams or sustained agentic workloads. API developers should price against Opus 4.7's effective-token-count bump before migrating from 4.6.

## Key Facts

| | |
|---|---|
| **Flagship model** | Claude Opus 4.7 (released April 16, 2026) |
| **Other production models** | Sonnet 4.6 (speed/quality balance) · Haiku 4.5 (fast, high-volume) |
| **Context window** | 1M tokens on Opus and Sonnet · 200K on Haiku |
| **Max output** | 128K (Opus) · 64K (Sonnet) · 64K (Haiku) |
| **API pricing** | Opus 4.7: $5 in / $25 out per MTok (new tokenizer = 1.0-1.35× more tokens vs 4.6) |
| | Sonnet 4.6: $3 / $15 per MTok · Haiku 4.5: $1 / $5 per MTok |
| **Subscription pricing** | Free · Pro $20 · Max 5x $100 · Max 20x $200 · Team $30/user · Enterprise custom |
| **Agentic coding** | Claude Code CLI — strongest terminal coding agent available |
| **Image generation** | None |
| **Video generation** | None |
| **Separate frontier model** | Mythos Preview (cybersecurity, invitation-only via Project Glasswing) |

## What it actually is

A single consumer + API product covering text chat, long-form analysis, code, and agentic coding via Claude Code CLI. All current models support extended (visible chain-of-thought) thinking. Prompt caching drops cache-hit input costs to 10% of standard, and the Batch API cuts both input and output by 50% — materially cheaper than OpenAI for bulk workloads.

The real moats: the 1M token context at flat per-token rates (no long-context surcharge like GPT-5.4's), Constitutional AI training that produces more structurally coherent output on long documents, and Claude Code CLI, which autonomously reads and writes across full codebases from the terminal.

## When to pick Claude

- **Long-form writing or document analysis.** Better coherence on 10K+ word outputs than GPT-5.4; the 1M context means book-length inputs load in one session without chunking.
- **Agentic coding from the terminal.** Claude Code is the strongest CLI agent; Ultraplan auto-creates cloud environments, the Monitor tool watches running processes.
- **Legal, compliance, or regulatory analysis.** Constitutional AI training reduces sycophantic agreement with user-stated premises — the exact failure mode that kills premise-testing tasks on GPT-5.4.
- **Security research via Mythos Preview.** Scores 83.1% on vulnerability-reproduction benchmarks (vs Opus 4.6's 66.6%). Invitation-only via Project Glasswing consortium.
- **API bulk workloads.** Batch API + prompt caching combine for genuinely cheaper Opus runs than equivalent GPT-5.4 Pro workloads.

## When to pick something else

- **Image generation:** [Midjourney](/tools/midjourney/) (quality) or ChatGPT's GPT Image 1.5 (bundled with text chat). Claude has none.
- **Video generation:** [Veo 3](/tools/veo/) (via Gemini) or [Kling](/tools/kling/). Claude has none.
- **Google Workspace integration:** [Gemini 3.1 Pro](/tools/gemini/). Claude's Workspace hooks are thin.
- **Broad plugin / custom-agent marketplace:** [ChatGPT](/tools/chatgpt/). GPT Store has no Claude equivalent.
- **One tool for everything (casual use):** ChatGPT. Claude is a specialist, not a generalist.

## Pricing

Subscription pricing via [claude.com/pricing](https://claude.com/pricing):

| Plan | Price | Models | Who's it for |
|---|---|---|---|
| Free | $0 | Sonnet (capped daily messages) | Casual use, no extended thinking |
| Pro | $20/mo | Opus 4.7 · Sonnet 4.6 · Haiku 4.5 · extended thinking · Projects | **Most individuals should land here** |
| Max 5x | $100/mo | Full lineup, 5× Pro usage | Heavy solo coders / writers |
| Max 20x | $200/mo | Full lineup, 20× Pro usage | Teams or sustained agentic workloads |
| Team | $30/user/mo | Full lineup + admin + no-training-on-data | 2+ seat teams |
| Enterprise | Custom | Full lineup + SSO + SCIM + audit | Compliance-heavy orgs |

API pricing via [platform.claude.com](https://platform.claude.com/docs/en/about-claude/pricing):

| Model | Input ($/MTok) | Output ($/MTok) | Context | Max Output |
|---|---|---|---|---|
| Opus 4.7 | $5 | $25 | 1M | 128K |
| Sonnet 4.6 | $3 | $15 | 1M | 64K |
| Haiku 4.5 | $1 | $5 | 200K | 64K |

Fast Mode beta on Opus at 6× rates ($30/$150). Batch API discounts all models 50%. Prompt caching drops cache-hit input to 10% of standard.

Prices verified 2026-04-17 via [Anthropic pricing docs](https://platform.claude.com/docs/en/about-claude/pricing) and the [Opus 4.7 release coverage](https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm).

**Opus 4.7 cost-impact note:** the per-token rate is unchanged from 4.6, but the new tokenizer produces **1.0 to 1.35× more tokens for the same input**. Budget-sensitive API workloads should benchmark their own prompts before migrating.

## Against the alternatives

| | Claude Opus 4.7 | GPT-5.4 Pro | Gemini 3.1 Pro |
|---|---|---|---|
| **Agentic coding** | Claude Code (strongest CLI) | Codex (strongest IDE integration) | No native agent |
| **Image generation** | None | GPT Image 1.5 | Imagen 4 (built-in) |
| **Video generation** | None | None | Veo 3 (built-in) |
| **Long-context** | 1M tokens, flat rate | Undisclosed window | 1M tokens |
| **Workspace / ecosystem** | Narrower | Largest (GPT Store) | Best for Google |
| **Default reasoning quality** | Strongest on long-form | Broadest feature suite | Strongest Google-stack |
| **Best viewed as** | Reasoning + coding specialist | Generalist default | Google-stack integrator |

## Failure modes

- **Conservative safety refusals.** Claude declines requests that are not actually harmful at a higher rate than GPT-5.4 — noticeable on red-team research, edgy creative writing, and some analysis of adversarial content.
- **No native image or video.** Workflows that need multimodal output need a second tool alongside Claude.
- **Opus 4.7 tokenizer bump.** Same sticker price as 4.6, but 1.0-1.35× more effective tokens. API workloads need re-benchmarking before migrating.
- **Computer Use is still a research preview.** Available inside Claude Code only — not in claude.ai chat. Not production-ready.
- **Mythos Preview is invitation-only.** Advertised in Project Glasswing materials but most users cannot access it.
- **Memory is session-scoped.** Cross-conversation persistent memory is available through Projects with explicit context files, but there is no implicit cross-session memory like some ChatGPT configurations.
- **Rate limits unpublished.** Pro / Max tier message caps are not publicly specified and vary with demand. Heavy users discover limits by hitting them.
- **Smaller plugin / agent ecosystem.** No equivalent to the GPT Store. Integrations ship through the Anthropic-maintained MCP registry instead, which has narrower breadth.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline — an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against Anthropic's [pricing docs](https://platform.claude.com/docs/en/about-claude/pricing), [model docs](https://platform.claude.com/docs/en/about-claude/models), the [Opus 4.7 release coverage](https://venturebeat.com/technology/anthropic-releases-claude-opus-4-7-narrowly-retaking-lead-for-most-powerful-generally-available-llm), and the [GitHub Copilot changelog](https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/).

## FAQ

**Is Claude free to use?**
Yes — the free tier gives capped daily access to Sonnet. [Claude Pro](https://claude.ai/upgrade) at $20/month unlocks Opus 4.7, extended thinking, Projects, and higher message limits.

**What changed in Opus 4.7 vs 4.6?**
Same $5/$25 per MTok pricing, but a new tokenizer generates 1.0-1.35× more tokens per input. On benchmarks, 4.7 takes measurable leads on agentic coding, scaled tool use, computer use, and financial analysis over GPT-5.4 Pro and Gemini 3.1 Pro. Released [April 16, 2026](https://github.blog/changelog/2026-04-16-claude-opus-4-7-is-generally-available/).

**What is Claude Code?**
A CLI coding agent that reads, writes, and manages full codebases from the terminal. Supports Ultraplan (cloud environment creation, early preview), the Monitor tool for watching running processes, and a Computer Use capability in research preview.

**What is Claude Mythos Preview?**
A separate frontier model specialized for defensive cybersecurity, announced as part of Project Glasswing — a consortium including AWS, Apple, Google, and Microsoft. Not a general-release product; access requires an invitation through the Glasswing program.

**How does the 1M context compare?**
Opus 4.7 and Sonnet 4.6 both support 1M tokens at flat per-token pricing (no long-context surcharge). Gemini 3.1 Pro also offers 1M tokens. GPT-5.4 Pro does not publish its context window. At equivalent context lengths, Claude maintains strong coherence in published third-party evaluations.

## Related

- **Category:** [AI Chatbots](/categories/ai-chatbots/) · [AI Coding](/categories/ai-coding/) · [AI Writing](/categories/ai-writing/)
