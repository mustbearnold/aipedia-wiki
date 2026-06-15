---
type: trend
slug: model-availability-churn
title: "AI Model Availability & Churn Tracker"
seo_title: "AI Model Availability Tracker: Retirements, Suspensions & Buyer Risk (June 2026)"
meta_description: "Updated June 13, 2026: track current AI model availability risk across ChatGPT, Claude, Gemini, GitHub Copilot, Claude Code, Codex, and model routers."
author: "aipedia.wiki Editorial"
description: "A live buyer-risk tracker for frontier model access, app/API differences, scheduled retirements, suspensions, and routing caveats."
timeframe: "Live tracker started June 13, 2026 after GPT-5.2 left ChatGPT, Fable/Mythos access was suspended, and model-route billing changed across coding tools."
impact: high
last_updated: 2026-06-13
last_verified: 2026-06-13
update_frequency: weekly
---

AI model access is no longer a background detail. It is a buying risk.

As of June 13, 2026, AiPedia treats model availability as a first-class decision factor alongside price, quality, privacy, and workflow fit. A model can be strong and still be a bad production default if it is gated, scheduled for retirement, available only in one app surface, or routed through a plan-specific billing system.

## Current Verdict

**Safe default for most buyers:** build everyday assistant workflows around [ChatGPT](/tools/chatgpt/) GPT-5.5, [Claude](/tools/claude/) Opus 4.8 or the stable Claude app/API routes available in your plan, and [Gemini](/tools/gemini/) 3.5 Flash where Google ecosystem integration matters.

**Treat as unstable:** any workflow that hardcodes GPT-5.2 in ChatGPT, expects Claude Fable 5 or Mythos 5 access, assumes a Copilot model is free or fixed-cost, or treats a model-router listing as proof that the underlying provider route is usable.

**Enterprise rule:** if a model choice affects a customer promise, compliance workflow, benchmark claim, or product SLA, check the vendor release notes and route availability before renewal or deployment.

## Availability Matrix

| Surface | Current status as of June 13, 2026 | Buyer action |
| --- | --- | --- |
| ChatGPT GPT-5.5 | Stable current ChatGPT family. OpenAI says GPT-5.5 models remain available after GPT-5.2 retirement. | Use GPT-5.5 for new ChatGPT comparisons and update old GPT-5.2 internal docs. |
| ChatGPT GPT-5.2 | Retired from ChatGPT as of June 12, 2026. Existing GPT-5.2 conversations continue on corresponding GPT-5.5 models. | Do not cite GPT-5.2 as available in ChatGPT. Re-run important saved workflows. |
| ChatGPT o3 and GPT-4.5 | Scheduled ChatGPT-only retirements: GPT-4.5 on June 27, 2026 and o3 on August 26, 2026. OpenAI says these changes do not affect the API. | Separate ChatGPT app availability from API availability in procurement notes. |
| OpenAI API GPT-5.5 | OpenAI says GPT-5.5 and GPT-5.5 Pro are available in the API after the April 24 update. | Keep API model strings and deprecation checks separate from ChatGPT model-picker changes. |
| Claude Opus 4.8 | Stable high-end Claude route and current safest default for Claude-heavy professional or coding workflows. | Use Opus 4.8 as the fallback assumption when Fable/Mythos is unavailable. |
| Claude Fable 5 and Mythos 5 | Suspended for all users after a US government directive. Anthropic says other Claude models are unaffected. | Do not buy or build around Fable/Mythos until Anthropic restores access and publishes the new access rules. |
| Gemini 3.5 Flash | Generally available in the Gemini app, AI Mode in Search, Gemini API, Antigravity, and enterprise surfaces. | Safe Google default, but confirm plan and API route because Gemini surfaces differ. |
| Gemini preview and older API models | Gemini 2.0 Flash routes shut down June 1, 2026. Gemini 3.1 image preview routes are scheduled to shut down June 25, 2026. | Replace preview/old model strings before they reach production. |
| GitHub Copilot model routes | Supported models vary by plan, client, capability, and retirement status. Usage is now charged through AI Credits based on model and token use. | Budget by model and workflow, not by "Copilot" as a single fixed-cost product. |
| Claude Code | Strong route when Opus 4.8 is available; dynamic workflows and Fable/Mythos expectations require explicit verification. | Pin current Claude Code behavior in team docs and keep a fallback agent path. |
| Codex | GPT-5.5 is available in Codex according to OpenAI's GPT-5.5 launch details, while ChatGPT release notes continue to change model-picker and Codex features. | Track Codex app usage limits separately from API pricing and ChatGPT model retirement. |
| OpenRouter and model routers | Useful for optionality and fallback, but a listed model is not the same as a provider-guaranteed production entitlement. | Use routing for tests and fallback, but verify direct provider access for regulated or core workloads. |

## The Decision Rule

For a personal subscription, pick the assistant that gives the best answer today. For a business workflow, pick the model route with the clearest replacement path.

That means the best model is not always the most capable model. A slightly weaker route with stable access, published retirement windows, admin controls, and clear billing can be safer than a stronger route that can disappear, move behind a trusted-access program, or change cost behavior overnight.

## What Changed This Week

**Anthropic turned model access into governance risk.** Claude Fable 5 was announced as the public Mythos-class model on June 9, but Anthropic later said it had to disable Fable 5 and Mythos 5 for all users after a US government directive. The practical buyer takeaway: even public frontier access can become unavailable because of policy, export-control, or safety disputes.

**OpenAI turned model continuity into an app-surface risk.** GPT-5.2 is gone from ChatGPT, but OpenAI says existing conversations continue on corresponding GPT-5.5 models. OpenAI's release notes also distinguish ChatGPT-only retirements from API availability, which matters for buyers comparing old evals, saved prompts, and API workloads.

**Google shows why preview labels matter.** Gemini 3.5 Flash is a current stable route, while older Gemini 2.0 Flash routes have already shut down and some image preview routes have a June 25 shutdown date. Preview and latest labels should not be treated as permanent model IDs.

**GitHub Copilot made model choice a cost-control issue.** Copilot usage now depends on the model and token consumption through AI Credits. Teams should stop asking "how much is Copilot?" and start asking "which model, which client, which workflow, and what monthly budget?"

## Buyer Checklist

| Question | Why it matters |
| --- | --- |
| Is this an app model, API model, IDE model, or router model? | Availability can differ across ChatGPT, Codex, API, Copilot, Claude Code, Gemini app, and model routers. |
| Is the model stable, preview, experimental, or trusted-access only? | Preview and restricted routes carry migration risk. |
| Is there a scheduled retirement date? | Old saved workflows can quietly move to newer models or stop working. |
| Does usage depend on tokens, credits, or model class? | Coding agents and model routers can change real cost faster than subscription labels suggest. |
| Is there a direct-provider fallback? | Router convenience does not replace enterprise access, support, or data-processing terms. |
| Would a model change break a customer promise? | If yes, pin the model route, document fallback behavior, and re-test before renewing. |

## AiPedia Take

The model market has crossed from "which model is smartest?" into "which model route can I trust next month?" For individual users, the answer is still mostly product fit. For teams, availability, retirement policy, billing surface, and fallback strategy now belong in every buying decision.

AiPedia will use this tracker as the canonical reference when updating [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), [Gemini](/tools/gemini/), [Claude Code](/tools/claude-code/), [GitHub Copilot](/tools/github-copilot/), [OpenRouter](/tools/openrouter/), [AI Chatbots](/categories/ai-chatbots/), [AI Coding](/categories/ai-coding/), and [AI Infrastructure](/categories/ai-infrastructure/) pages.

## Sources

- [OpenAI ChatGPT release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes), verified June 13, 2026.
- [OpenAI GPT-5.5 launch page](https://openai.com/index/introducing-gpt-5-5/), verified June 13, 2026.
- [Anthropic statement on Fable 5 and Mythos 5 access](https://www.anthropic.com/news/fable-mythos-access), verified June 13, 2026.
- [Anthropic Claude Opus 4.8 announcement](https://www.anthropic.com/news/claude-opus-4-8), verified June 13, 2026.
- [Google Gemini 3.5 announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/), verified June 13, 2026.
- [Google Gemini API release notes](https://ai.google.dev/gemini-api/docs/changelog), verified June 13, 2026.
- [Google Gemini API model docs](https://ai.google.dev/gemini-api/docs/models), verified June 13, 2026.
- [GitHub Copilot supported models docs](https://docs.github.com/en/copilot/reference/ai-models/supported-models), verified June 13, 2026.
- [GitHub Copilot model pricing docs](https://docs.github.com/en/copilot/reference/copilot-billing/models-and-pricing), verified June 13, 2026.
- [OpenRouter pricing](https://openrouter.ai/pricing), verified June 13, 2026.
- [OpenRouter models](https://openrouter.ai/models), verified June 13, 2026.
- [AiPedia late June 13 news update](/news/2026-06-13-us-blocks-anthropic-fable-mythos-openai-probe/), verified June 13, 2026.
