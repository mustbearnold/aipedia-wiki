---
type: news
slug: 2026-05-13-anthropic-surpasses-openai-business-adoption-ramp
title: "Anthropic passes OpenAI in US business AI adoption for the first time: Ramp's May 2026 AI Index says 34.4% vs. 32.3%"
date: 2026-05-13
severity: major
summary: "Ramp's May 2026 AI Index, drawn from expense data across more than 50,000 US companies, shows 34.4% paying for Anthropic services in April vs. 32.3% paying for OpenAI. It is the first month Anthropic has led on business adoption since the AI race began. Anthropic's share has gone from roughly 9% in May 2025 to 35%+ today, a 26-point year-over-year jump."
categories: [ai-enterprise, ai-business, ai-models]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-13
last_verified: 2026-05-13
affects: [claude, chatgpt, claude-code]
related_tools: [claude, claude-code, chatgpt]
sources:
  - url: https://ramp.com/leading-indicators/ai-index-may-2026
    title: "Ramp AI Index, May 2026: Anthropic beats OpenAI on business adoption"
  - url: https://techcrunch.com/2026/05/13/anthropic-now-has-more-business-customers-than-openai-according-to-ramp-data/
    title: "Anthropic now has more business customers than OpenAI, according to Ramp data"
  - url: https://venturebeat.com/technology/anthropic-finally-beat-openai-in-business-ai-adoption-but-3-big-threats-could-erase-its-lead
    title: "Anthropic finally beat OpenAI in business AI adoption, but 3 big threats could erase its lead"
  - url: https://www.pymnts.com/artificial-intelligence-2/2026/anthropic-gains-on-openai-amid-rising-adoption-among-enterprises/
    title: "Anthropic Gains On OpenAI Amid Rising Adoption Among Enterprises"
  - url: https://officechai.com/ai/anthropic-has-passed-openai-in-us-business-adoption-for-the-first-time-says-ramp-data/
    title: "Anthropic Has Passed OpenAI In US Business Adoption For The First Time, Says Ramp Data"
---

# Anthropic passes OpenAI in US business AI adoption for the first time: Ramp's May 2026 AI Index says 34.4% vs. 32.3%

**Ramp** released its **May 2026 AI Index** on May 13, drawn from corporate-card expense data across more than **50,000 US businesses**. The headline number: **34.4% of those companies paid for Anthropic** services in April, against **32.3% for OpenAI**. It is the first month in which Anthropic has led on business AI adoption since the index began tracking.

The trajectory matters more than the snapshot. Twelve months ago, in May 2025, Anthropic sat near **9%** of paying businesses and OpenAI commanded roughly **32%**. Anthropic's share has roughly **quadrupled** in a year, lifting **26 percentage points**. OpenAI's share has been effectively flat, drifting up about 0.3 points over the same window.

Ramp economist **Ara Kharazian** attributed the move to compounding strength in three segments where Anthropic has been winning since late 2025: **finance, technology, and professional services**. In those high-adoption verticals, Anthropic has been the preferred vendor for months. The May data point is the moment the lead in the high-adoption segments was big enough to flip the overall number.

The Ramp report lands on the same news cycle as the New York Times's **May 12 report of a potential $30-50B Anthropic raise at a $950B valuation**, and Dario Amodei's Code with Claude statement that Anthropic has crossed **$30 billion in annualized revenue**. Each data point is independently sourced; together they describe one story.

## Why this matters

Three things change when a Ramp-style adoption print flips in the AI category.

**The enterprise default question reopens.** Procurement teams pick a default model platform because that is where their security review, SSO, data-residency, and audit work has already been done. OpenAI has been that default for most US companies for two years. A single month of Ramp data does not flip that default, but it is the first quantitative argument a buyer can use to justify reopening the question. Expect a wave of "should we be running Claude as our default and ChatGPT as the alternate" reviews to start in May.

**Pricing pressure inverts.** When OpenAI was uncontested at the top, Claude was the disciplined-pricing alternative. With Anthropic now ahead on business adoption and pricing power, Claude can hold the line on token costs in a way it could not last year. OpenAI is the side under pricing pressure now, particularly on the GPT-5.5 and Codex SKUs that compete directly with Claude Sonnet and Claude Code.

**Distribution leverage compounds.** Ramp's data is concentrated in the segment of companies that buy on corporate cards rather than long enterprise contracts. That is precisely the segment where Anthropic's Claude Code, the Microsoft 365 Claude integration shipped May 12, and Claude for Legal launched the same day are landing. The next index update will show whether the lead widens through May.

VentureBeat's coverage names three threats that could erase the lead. Compute is the first: even with the SpaceX Colossus deal, Anthropic remains capacity-constrained against the demand curve. Token pricing is the second: as model providers absorb more inference cost into per-task agent pricing, Anthropic's premium positioning is harder to maintain. Distribution is the third: Microsoft and Google's bundled Copilot and Gemini deployments still reach buyers who do not show up in Ramp's expense dataset.

## Buyer take

If you are running AI procurement at a US business, three things this week:

- **Pull your own data.** Ramp's 50,000-company sample is large but skews to corporate-card-paid SaaS spend. Run the same query against your own AP system: how much is your organization actually paying Anthropic vs. OpenAI vs. Google in the last 90 days, and how is that mix trending. The macro print is the cover story; your own number is the brief.
- **Re-bid your enterprise contract.** If your current OpenAI or Anthropic master agreement is up for renewal in the next six months, this is the moment to put both vendors in a competitive RFP. Both are now incentivized to win the deal; pricing will not be more favorable than it is right now.
- **Track Claude Code adoption inside your engineering org separately.** Ramp specifically calls out coding workloads as the wedge. If your engineering team is shadow-buying Claude Code seats on personal credit cards, that is a sign your central procurement is lagging the actual usage; pull those into the enterprise contract before renewal.

For OpenAI customers specifically: the May print is not a reason to switch, but it is the reason to demand parity on the things that have historically pulled buyers toward Claude. Ask for written commitments on agent-execution sandboxing, on-premise / VPC deployment options, and per-seat enterprise pricing visibility.

## What is still unclear

Ramp's data is concentrated in mid-market US businesses that use corporate cards. It does not capture large multi-year contracts paid via invoice (where OpenAI is widely believed to still lead through Microsoft co-sell), nor international adoption (where Gemini and Mistral are stronger), nor consumer ChatGPT subscriptions (the world's largest single AI revenue line, which does not show up as business spend at all).

The May print also does not separate Claude Code revenue from Claude API revenue from Claude.ai seat revenue. A more granular breakdown would clarify whether the adoption flip is driven by Claude Code's coding wedge or by broader Claude API usage replacing OpenAI for general LLM workloads. Watch the June index for either confirmation or reversion.
