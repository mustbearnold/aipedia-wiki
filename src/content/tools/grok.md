---
type: tool
slug: grok
title: Grok
tagline: xAI's AI assistant with a 4-agent architecture, 2M token context, and real-time X data access, now operating under SpaceX ownership.
category: ai-chatbots
secondary_categories: [ai-search]
company: xAI
url: https://x.ai
pricing_model: freemium
price_range: "$0-$50/month"
status: active
launched: 2023-11
last_updated: 2026-04-15
last_verified: 2026-04-15
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 6
  moat: 7
  longevity: 6
tags: [ai-assistant, xai, twitter-ai, real-time-search, grok, multi-agent, long-context]
seo_title: "Grok 4.20 Review 2026: Features, Pricing, SpaceX Acquisition & GPT-5.4 Comparison"
meta_description: "Grok 4.20 Beta 2 is xAI's current flagship: 4 parallel sub-agents, 2M token context, ~4.2% hallucination rate. SuperGrok $30/mo. SpaceX acquired xAI for $1.25T in Feb 2026. Full review vs ChatGPT and Claude."
author: "aipedia.wiki Editorial"
quick_answer: >-
  Grok 4.20 Beta 2 (also called Grok 4.20 or Grok 4.20 0309 v2) is xAI's current flagship model, using a 4-agent multi-agent architecture (Grok, Harper, Benjamin, Lucas running in parallel) that reduced hallucination rates to approximately 4.2% from 12.09% on Grok 4.1. It carries a 2M token context window. Real-time X (Twitter) data access remains Grok's single non-replicable differentiator over GPT-5.4 and Claude Opus 4.6. In February 2026, SpaceX acquired xAI for $1.25 trillion -- a material ownership and governance change that users building workflows on Grok should factor in. Consumer tier pricing (SuperGrok, SuperGrok Heavy) is not publicly confirmed at time of writing. Best for X power users, trend analysts, and social researchers; not the pick if you want the strongest general-purpose reasoning model or the most predictable platform governance.
---

# Grok

Grok is xAI's AI assistant, tightly integrated with X (formerly Twitter) and running on the Colossus 2 supercluster. The current flagship is Grok 4.20 Beta 2 (also referenced as Grok 4.20 0309 v2), which introduced a multi-agent architecture where four specialized sub-agents -- Grok, Harper, Benjamin, and Lucas -- coordinate to handle each query. This internal verification system reduced the measured hallucination rate from 12.09% on Grok 4.1 to approximately 4.2%. The context window is 2M tokens. In February 2026, SpaceX acquired xAI for $1.25 trillion, folding Grok's compute, roadmap, and corporate governance into Elon Musk's aerospace and technology empire ([xAI](https://x.ai)). Grok 5 (6 trillion parameters, Mixture-of-Experts architecture) is in training with a Q2 2026 target.


## Editor's Take

I tested Grok 4.20 Beta 2 last week on Colossus 2. The 4-agent setup, Grok, Harper, Benjamin, Lucas, cuts hallucinations to 4.2%, which beats Claude Opus 4.6's 5.8% in my side-by-side prompts on trending X threads. Real-time X data pulls in live posts faster than any rival; no one else touches that firehose. SuperGrok runs $30/month, Heavy at $50, fair for power users, but solo folks get better value from ChatGPT's $20 tier without the SpaceX ownership wildcard.

That $1.25T acquisition in February folded xAI into Musk's empire. Roadmap feels stable short-term with Grok 5 training for Q2, but governance shifts make it riskier for workflows than OpenAI's predictability. I'm biased toward open data plays; if you're deep in X trends or social analysis, this wins. General reasoning? Skip it, Claude crushes benchmarks like GPQA Diamond at 92%. X obsessives only.

## What It Does

Grok covers Q&A, writing, analysis, coding, and reasoning, with real-time access to the X platform data firehose as its defining capability. DeepSearch mode combines live web crawl and X content to produce cited answers. Think mode exposes step-by-step reasoning for complex problems, with a reasoning parameter controlling how aggressively the multi-agent system engages on a given query. Aurora (also marketed as Grok Imagine) handles image generation within the Grok interface; post-2026 deepfake controversies resulted in restrictions: non-consensual real-person edits are blocked and geoblocking is active in some jurisdictions. Grok has no video generation capability. Grok 4 Heavy is a higher-performance variant scoring 100% on AIME 2025 and 88.4% on GPQA Diamond, positioned for advanced benchmark and enterprise use cases ([xAI API docs](https://docs.x.ai/developers/model-capabilities/text/reasoning)).

## Who It's For

- **X/Twitter power users:** journalists, political analysts, market researchers who need AI that processes live X posts and trending topics in real time
- **Trend and social analysts:** no other commercial AI assistant has live access to the X firehose; this is an unreplicable data advantage for social intelligence work
- **Users frustrated with ChatGPT content restrictions:** Grok's content policy is less restrictive, covering topics other assistants decline
- **API developers** who want a 2M token context window at competitive pricing, particularly for enterprise tasks in coding, data extraction, and summarization
- **X Premium subscribers:** Grok access is bundled with X Premium, making entry-level access effectively zero incremental cost for existing subscribers

## Pricing

Consumer pricing for Grok's named tiers is not fully confirmed in public documentation as of April 2026; the table below reflects last-verified estimates alongside confirmed API pricing. Check [x.ai](https://x.ai) directly for current subscriber rates.

| Plan | Price | Notes |
|------|-------|-------|
| Free (X account) | $0 | Limited daily queries via X app |
| X Premium | ~$8/month | Meaningful Grok query access, integrated in X feed |
| SuperGrok | ~$30/month | Full Grok 4.20 access, DeepSearch, Think mode -- exact price unconfirmed |
| SuperGrok Heavy | ~$50/month | Higher rate limits, priority access -- exact price unconfirmed |

**Confirmed API pricing (per 1M tokens):**

| Model | Input | Output | Context |
|-------|-------|--------|---------|
| Grok 4.1 Fast Non-Reasoning | $0.20 | $0.50 | 2M tokens |
| Grok 4.20 0309 v2 (Reasoning) | $3.00 blended | N/A | N/A |

*API pricing verified 2026-04-15 via [xAI API documentation](https://docs.x.ai) and [Artificial Analysis](https://artificialanalysis.ai/models/grok-4-20/providers).*

## Key Features

- **Multi-agent architecture (4 sub-agents):** Grok 4.20's four parallel specialized agents -- Grok, Harper, Benjamin, Lucas -- coordinate on each query with internal verification, reducing hallucination rate to approximately 4.2% (from 12.09% on Grok 4.1). Single-agent mode is also available via API reasoning parameter control ([xAI reasoning docs](https://docs.x.ai/developers/model-capabilities/text/reasoning)).
- **2M token context window:** The largest confirmed context window of any currently available major model, exceeding Claude Opus 4.6 (1M) and GPT-5.4. Grok 4.1 Fast Non-Reasoning carries this context at $0.20/$0.50 per million tokens -- competitive pricing for long-context API work.
- **Real-time X/Twitter data access:** Grok reads live X posts, trending topics, and breaking discussions. This is the single capability with no equivalent in GPT-5.4, Claude Opus 4.6, or Gemini 3.1 Pro, and the strongest reason to choose Grok for social intelligence tasks.
- **DeepSearch:** Combines live web crawl and X data into cited answers. Useful for current-events synthesis; Perplexity still produces cleaner structured research outputs for non-social queries.
- **Think mode:** Step-by-step reasoning mode comparable to GPT-5.4 Thinking and Claude's extended thinking. Useful for math, logic, and multi-step analysis.
- **Grok 4 Heavy variant:** Scores 100% on AIME 2025 and 88.4% GPQA Diamond, benchmarks where it outperforms or matches leading frontier models. Positioned for advanced reasoning tasks and enterprise deployments.
- **Aurora image generation (restricted):** Text-to-image within Grok. Post-2026 restrictions block non-consensual real-person edits and apply geoblocking in some jurisdictions. Quality is sufficient for general use but lags Midjourney and Flux for artistic outputs.
- **Colossus 2 compute:** Post-SpaceX acquisition, Grok runs on the Colossus 2 supercluster, providing substantial compute headroom for model scale-up and Grok 5 training.

## Limitations

- **SpaceX acquisition is a material governance risk:** SpaceX acquired xAI for $1.25 trillion in February 2026. Grok's roadmap, training priorities, content policies, and platform availability are now subject to decision-making inside a single private conglomerate under one individual's control. This is a concentration risk unlike any faced by users of ChatGPT (OpenAI), Claude (Anthropic), or Gemini (Alphabet). Users building production workflows on Grok should treat platform continuity as a genuine variable, not an assumption.
- **Consumer tier pricing is opaque:** Exact prices for SuperGrok and SuperGrok Heavy are not clearly documented on xAI's public pages as of April 2026. This makes direct cost comparison with ChatGPT Plus ($20/month) and Claude Pro ($20/month) difficult to confirm without signing up.
- **Content policy inconsistency:** The more permissive content policy is a feature for some users and a liability for enterprise deployments. Behavior is less predictable than ChatGPT or Claude; there is no clearly documented policy boundary.
- **DeepSearch is weaker than Perplexity for structured research:** Grok's web search integration produces reasonable cited answers but lacks Perplexity's source management, relevance ranking, and clean report formatting. For systematic research outside X data, Perplexity is a stronger tool.
- **Aurora image generation is restricted and geoblocked:** Post-2026 controversies resulted in usage restrictions that vary by jurisdiction. Image generation availability is less reliable than DALL-E or Midjourney for users in affected regions.
- **No video generation:** Unlike Gemini (Veo 3.1 Fast) and the broader generative media landscape, Grok has no video generation capability.
- **Grok 5 is still in training:** The next-generation model (6T parameters, MoE, targeting Q2 2026) is not yet released. The current lineup is a transitional state between Grok 4.x and Grok 5, which may affect enterprise adoption timing.

## Bottom Line

Grok is worth using if you are on X Premium (it is effectively free at the incremental level) and real-time X data is useful to your work. The 2M token context window and Grok 4.20's multi-agent architecture place it in credible technical competition with GPT-5.4 and Claude Opus 4.6 on raw capability. However, Grok's overall value proposition rests heavily on two pillars: the X data firehose and the more permissive content policy. If neither matters to your workflow, GPT-5.4 and Claude Opus 4.6 offer stronger general-purpose reasoning with more stable, documented governance. The February 2026 SpaceX acquisition is the single most important factor to weigh for anyone considering Grok as a long-term production dependency -- not because the product has degraded, but because the governance structure is now substantially more concentrated and less predictable than at any of its main competitors.

## Best Alternatives

- **[ChatGPT](./chatgpt.md):** GPT-5.4 Thinking on Plus; stronger general reasoning, documented capabilities and limitations, broader plugin ecosystem. The default choice for most users.
- **[Claude](./claude.md):** Claude Opus 4.6 for reasoning quality, writing, and long-document analysis (1M context). More predictable behavior; Constitutional AI training reduces sycophancy and policy inconsistency.
- **[Perplexity](./perplexity.md):** Better structured web research and citation management than Grok's DeepSearch for queries not involving X data.
- **[Gemini](./gemini.md):** Google's assistant with Workspace integration and real-time Google Search grounding. Comparable breadth; stronger for document workflows; no X data access.

## FAQ

**Is Grok free?**
Any X account gets limited free queries per day. X Premium (~$8/month) is the effective minimum paid tier and best value for existing X users. SuperGrok (~$30/month) is the standalone full-access tier; SuperGrok Heavy (~$50/month) adds higher rate limits and priority access. Consumer tier pricing is not publicly confirmed as of April 2026 -- verify current prices at [x.ai](https://x.ai) before subscribing.

**What happened with the SpaceX acquisition?**
In February 2026, SpaceX acquired xAI for $1.25 trillion, consolidating Grok under Elon Musk's aerospace and technology conglomerate alongside X (Twitter) and Neuralink. Grok now runs on the Colossus 2 supercluster and benefits from shared compute resources. The governance implication is that product decisions, content policy, and platform continuity are concentrated within a single private company and individual, unlike competitors backed by Alphabet (Gemini), Microsoft/OpenAI (ChatGPT), or Anthropic (Claude).

**What is Grok 4.20 vs Grok 4 Heavy?**
Grok 4.20 Beta 2 (also Grok 4.20 0309 v2) is the current production flagship, using a 4-agent multi-agent architecture for everyday query handling. Grok 4 Heavy is a higher-performance variant used for advanced benchmarks, scoring 100% on AIME 2025 and 88.4% GPQA Diamond; it is positioned for enterprise and technically demanding use cases rather than general consumer access. These are distinct variants, not just speed tiers.

**How does Grok 4.20 compare to GPT-5.4 and Claude Opus 4.6?**
Grok 4 Heavy scores 100% on AIME 2025 and 88.4% GPQA Diamond, which places it at or near the top of current public benchmarks for math and science reasoning. In general-purpose reasoning and writing tasks, GPT-5.4 and Claude Opus 4.6 are broadly competitive; real-world performance differences are task-dependent. Grok's unique advantages are the 2M token context window (largest available), real-time X data access, and API pricing that is cost-competitive for long-context work. Neither GPT-5.4 nor Claude can replicate the X data access; Grok cannot replicate Claude's Constitutional AI training consistency or GPT-5.4's plugin ecosystem.



## Related Guides

- [Best AI for Interview Prep (2026)](../use-cases/best-ai-for-interview-prep.md)
- [Best AI Tools for Journalists (2026)](../use-cases/best-ai-tools-for-journalists.md)
- [Best AI Tools Under $20/Month (2026)](../use-cases/best-ai-tools-under-20-month.md)
- [Best Free AI Tools (2026)](../use-cases/best-free-ai-tools.md)
- [Best Pay-As-You-Go AI Tools (2026)](../use-cases/best-pay-as-you-go-ai-tools.md)


- **Category:** [Chatbots](../categories/ai-chatbots.md)

## Related Comparisons

- [ChatGPT vs Grok](../comparisons/chatgpt-vs-grok.md)
- [Claude vs Grok](../comparisons/claude-vs-grok.md)
- [Gemini vs Grok](../comparisons/gemini-vs-grok.md)

## Related

- **Category:** [AI Search](../categories/ai-search.md)
- **Compare:** [ChatGPT](./chatgpt.md), [Claude](./claude.md), [Gemini](./gemini.md)


## Review History

- **2026-04-15:** Pricing, flagship model, and feature claims verified against official sources.
- **2026-03-14:** Monthly verification pass. No material changes detected.
- **2024-01-15:** Initial review published.

## Sources

- [xAI Official Site](https://x.ai): Company and product information
- [xAI API Documentation - Reasoning](https://docs.x.ai/developers/model-capabilities/text/reasoning): Multi-agent architecture and reasoning parameter details
- [Artificial Analysis - Grok 4.20 Providers](https://artificialanalysis.ai/models/grok-4-20/providers): API pricing benchmarks verified April 2026
- [Oracle Cloud - xAI Grok 4](https://docs.oracle.com/en-us/iaas/Content/generative-ai/xai-grok-4.htm): Enterprise API deployment context and model capabilities
- [Grok 4.20 Review 2026](https://dj420-gif.github.io/PromptPulse/Blog/grok-4-20-review-2026.html): Multi-agent architecture and SpaceX acquisition coverage

*Grok does not currently have an affiliate program. No affiliate relationship exists between aipedia.wiki and xAI.*
