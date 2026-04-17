---
type: tool
slug: windsurf
title: Windsurf
tagline: AI-native code editor owned by Cognition AI. Cascade agent, SWE-1.5 model, multi-provider frontier access inside a VS Code fork.
category: ai-coding
company: cognition-ai
url: https://windsurf.com
pricing_model: freemium
price_range: "$0-$200/month"
status: active
launched: 2024-11
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 8
  value: 8
  moat: 7
  longevity: 7
tags: [code-editor, ide, autocomplete, ai-coding, vscode-fork, agentic-coding, cascade, swe-1-5, cognition]
seo_title: "Windsurf: Features, Pricing & Review (April 2026)"
meta_description: "Windsurf is Cognition AI's VS Code fork with Cascade agent and SWE-1.5 model. Pro $20/mo, Max $200/mo, Teams $40/user. Free tier and SWE-1.5 access included. Verified April 2026."
author: aipedia.wiki Editorial
best_for:
  - Cursor-style agentic editing
  - multi-provider model swapping
  - VS Code-native workflows
  - Cognition-ecosystem users (Devin + Windsurf)
not_best_for:
  - the biggest extension ecosystem
  - developers already happy in Cursor
  - teams needing only autocomplete
quick_answer: >-
  Windsurf is Cognition AI's AI-native code editor. Pick it for Cascade's agentic multi-file editing with frontier-model choice and tight Devin integration. Skip it if Cursor's polish or the broader VS Code extension ecosystem matters more.
price_history:
  - date: 2025-07-15
    plan: "ownership"
    price: "acquired by Cognition"
    note: "Cognition AI acquired Windsurf after Google licensing deal and OpenAI acquisition collapse"
  - date: 2026-03-01
    plan: "Pro"
    price: "$20/mo"
    note: "Pro re-priced to $20 to match Cursor; SWE-1.5 became default"
---

# Windsurf

Cognition AI's AI-native code editor. A VS Code fork with inline autocomplete, a command bar, and Cascade: a multi-file agentic editor with full codebase context.

Owned by Cognition since July 2025, after Google took a licensing deal and an earlier OpenAI acquisition collapsed. Now a sibling product to [Devin](/tools/devin/) inside the Cognition stack.

## System Verdict

> **Pick Windsurf for agentic multi-file editing with real model choice and Cognition-stack integration.** Cascade reads the repo, plans cross-file edits, runs terminal commands, and ships with access to GPT-5.4, Claude Opus 4.7, Gemini 3.1 Pro, and Cognition's own SWE-1.5.
>
> SWE-1.5 is a fast proprietary coding model. Cognition claims it is roughly 13× faster than Sonnet 4.5 while approaching Claude 4.5-level benchmark performance. It is free for all users for three months at launch.
>
> **Skip it if Cursor already fits.** Cursor has more polish, a larger extension community, and comparable agent depth. Windsurf's edge is the Cognition ecosystem: tickets delegated to Devin flow back into the IDE cleanly.
>
> **Who pays which tier:** Free for evaluation, Pro $20/mo for most individuals, Max $200/mo for sustained heavy use, Teams $40/user for shared admin, Enterprise for SSO and hybrid deployment.

## Key Facts

| | |
|---|---|
| **Vendor** | Cognition AI (acquired July 2025) |
| **Product class** | VS Code fork, AI-native IDE |
| **Flagship agent** | Cascade, multi-file editor with repo awareness |
| **Default model** | SWE-1.5, Cognition proprietary, free 3 months from launch |
| **Other models** | GPT-5.4 · Claude Opus 4.7 · Gemini 3.1 Pro · local via Ollama |
| **Pro pricing** | $20/mo, unlimited at API price |
| **Max pricing** | $200/mo, priority support, unlimited at API price |
| **Teams pricing** | $40/user/mo with admin dashboard |
| **Enterprise** | Custom with SSO, RBAC, hybrid deployment |
| **Free tier** | Yes, with daily and weekly refresh quotas |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

A VS Code fork with AI baked into the editor shell. Tab autocomplete handles inline suggestions. A command bar (Cmd+I) takes natural-language edit requests. Cascade handles multi-file agentic edits with full codebase context.

Model selection is global or per-session. SWE-1.5 is the fast default. Heavy reasoning work routes to Claude Opus 4.7 or GPT-5.4. Gemini 3.1 Pro is available for long-context runs. Ollama covers local models.

The Cognition acquisition closed the loop with Devin. Tickets delegated to Devin can round-trip through Windsurf. The IDE also consumes the MCP Marketplace from the Cognition platform.

VS Code extension compatibility holds. Keybindings, themes, and most extensions transfer from a standard VS Code install.

## When to pick Windsurf

- **You want agentic multi-file edits with real model choice.** Cascade plans and executes across files. SWE-1.5 is fast; Opus 4.7 and GPT-5.4 cover the heavy work.
- **You already use or plan to use Devin.** Cognition's Devin-to-Windsurf handoff is tighter than any competing IDE's third-party agent integration.
- **You want VS Code compatibility with deeper AI than Copilot.** Extensions and keybindings port cleanly. Cascade outruns Copilot's agent mode on multi-file refactors.
- **You value SWE-1.5's speed on iterative edits.** The proprietary model prioritizes latency for fast-turn refactors.
- **You are cost-conscious.** Free tier with daily and weekly refresh quotas is generous enough to test realistic workflows.

## When to pick something else

- **Maximum IDE polish and community:** [Cursor](/tools/cursor/). More extensions, larger community, comparable agent depth.
- **Terminal-first agentic coding:** [Claude Code](/tools/claude/). Strongest CLI agent, flat $100/mo on Max 5x.
- **Open-source BYOK inside VS Code:** [Cline](/tools/cline/) with Plan/Act modes. No subscription floor.
- **Inline autocomplete only, cheapest option:** [GitHub Copilot](/tools/github-copilot/) at $10/mo.
- **Async ticket delegation:** [Devin](/tools/devin/) (same owner). Hand work off, review the PR.

## Pricing

Pricing via [windsurf.com/pricing](https://windsurf.com/pricing). Paid tiers move to unlimited usage billed at API price with tier-specific features and support.

| Plan | Price | Usage | Features | Who's it for |
|------|-------|-------|----------|--------------|
| Free | $0 | Daily/weekly refresh | Basic Cascade, Tab autocomplete | Evaluation |
| Pro | $20/mo | Unlimited at API price | Premium models · Fast Context · SWE-1.5 | **Most individuals** |
| Max | $200/mo | Unlimited at API price | All Pro features plus priority support | Sustained heavy workloads |
| Teams | $40/user/mo | Unlimited at API price | Admin dashboard · analytics | Small teams |
| Enterprise | Custom | Unlimited | SSO · RBAC · hybrid deployment | Compliance-heavy orgs |

*Prices verified 2026-04-17 via [Windsurf pricing](https://windsurf.com/pricing). SWE-1.5 is free for all users for three months from its launch.*

## Against the alternatives

| | Windsurf Pro | Cursor Pro | Cline (open source) |
|---|---|---|---|
| **Price** | $20/mo | $20/mo | Free (BYOK API costs) |
| **Form factor** | VS Code fork | VS Code fork | VS Code extension |
| **Flagship agent** | Cascade | Composer / Agent | Plan/Act modes |
| **Model choice** | SWE-1.5 · GPT-5.4 · Opus 4.7 · Gemini | Mostly bundled | Any BYOK provider |
| **Extension ecosystem** | VS Code compatible | VS Code compatible | Native VS Code |
| **Best viewed as** | Cognition-stack IDE | Polished default IDE | Free agentic extension |

## Failure modes

- **UI lags behind Cursor on polish.** Occasional 3-5 second agent pauses on context-heavy refactors. Cursor often handles the same work in under 2 seconds.
- **Smaller third-party ecosystem than Cursor.** Niche extensions sometimes ship for Cursor first.
- **Cognition dependency.** Windsurf's roadmap now tracks Cognition's priorities. Devin-IDE integration is a feature, vendor-lock is the trade-off.
- **SWE-1.5 quality is workload-dependent.** Fast on iterative edits. Frontier models still beat it on novel reasoning-heavy tasks.
- **Free tier quotas are daily and weekly.** Heavy evaluation hits the ceiling quickly. Budget a Pro month to run a real benchmark.
- **Teams pricing is not bundled with Devin.** The two products bill separately. Multi-product teams should model total cost before switching.
- **Post-acquisition leadership churn.** Founding leads moved to Google in 2025. Release cadence is stable so far but remains a watch item.
- **Model pricing variance.** "Unlimited at API price" means heavy users on Opus 4.7 will see real API costs land on their Cognition invoice.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and model details against primary sources, and generates the editorial analysis you are reading. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Windsurf pricing](https://windsurf.com/pricing), [Windsurf model docs](https://docs.windsurf.com/windsurf/models), and the [Cognition acquisition announcement](https://cognition.ai/blog/windsurf).

## FAQ

**Who owns Windsurf?**
Cognition AI acquired Windsurf in July 2025 after Google secured a licensing deal for Windsurf's technology and an earlier OpenAI acquisition attempt collapsed over Microsoft IP-rights disputes. Cognition owns the IP, product, brand, and team.

**What is SWE-1.5?**
Cognition's proprietary coding model. Optimized for speed on iterative edits; vendor claims roughly 13× faster than Sonnet 4.5 at near Claude 4.5-level coding-benchmark performance. Free for all users for three months from launch.

**Which external models does Windsurf support?**
GPT-5.4 (OpenAI), Claude Opus 4.7 (Anthropic), Gemini 3.1 Pro (Google), plus local models via Ollama. Selectable per session or globally. See [Windsurf model docs](https://docs.windsurf.com/windsurf/models).

**How does Windsurf compare to Cursor?**
Same $20/mo Pro price. Cursor has more polish and a larger community; Windsurf has tighter Cognition-stack integration (Devin hand-off) and broader model choice inside Cascade. Most individuals see comparable agent depth on multi-file work.

**Can I keep my VS Code extensions?**
Yes. Windsurf retains VS Code extension compatibility, keybindings, and settings sync. Most extensions install without modification.

## Sources

- [Windsurf pricing](https://windsurf.com/pricing): current plans and usage model
- [Windsurf model docs](https://docs.windsurf.com/windsurf/models): supported models and configuration
- [Cognition: acquisition of Windsurf](https://cognition.ai/blog/windsurf): ownership and acquisition details
- [CNBC: Cognition valued at $10.2B post-Windsurf](https://www.cnbc.com/2025/09/08/cognition-valued-at-10point2-billion-two-months-after-windsurf-.html): post-acquisition valuation

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
- **Comparisons:** [Cursor vs Windsurf](/comparisons/cursor-vs-windsurf/)
