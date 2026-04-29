---
type: news
slug: 2026-04-24-retrieval-poisoning-world-championship-demo
title: "A fake board-game championship shows how fragile AI retrieval can be"
date: 2026-04-24
severity: major
summary: "Security researcher Ron Stoner demonstrated a retrieval-layer poisoning attack by creating a fake 6 Nimmt! world championship claim and getting AI systems with web search to repeat it."
affects: [chatgpt, perplexity, gemini, you-com]
categories: [ai-search, ai-research, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-29
last_verified: 2026-04-29
related_tools: [chatgpt, perplexity, gemini, you-com, exa]
sources:
  - url: "https://ron.stoner.com/How_I_Won_a_Championship_That_Doesnt_Exist/"
    title: "How I Won a Championship That Doesn't Exist - Ron Stoner"
  - url: "https://ron.stoner.com/AGENTS/"
    title: "AGENTS.md - Ron Stoner"
---

A cheap fake source was enough to make AI systems repeat a fake fact.

Security researcher Ron Stoner published a demonstration showing how he manufactured a fictional claim that he was the **6 Nimmt! World Champion**, then got AI systems with web retrieval to repeat it. The claim was false. The championship did not exist. That is the point.

This is one of the clearest recent examples of retrieval-layer poisoning: attacking what AI systems read at inference time instead of attacking the model weights during training.

## What changed

Stoner created a domain, published a fabricated press-release-style claim, and added a Wikipedia edit citing that source. The setup created a circular trust pattern: a source asserted the fake claim, and a high-trust page cited that source.

For a niche query with sparse coverage, that was enough to pollute the evidence pool. LLMs with web access could then retrieve the content and present the fabricated fact back to the user.

After Stoner published the write-up, the Wikipedia entry was removed. The attack still demonstrates a real weakness: the web layer can be poisoned faster than model weights can be retrained or corrected.

## Why it matters

AI search and agent tools increasingly act as trust brokers.

Users ask ChatGPT, Perplexity, Gemini, You.com, Exa-powered agents, and other retrieval systems to summarize the web and produce a confident answer. The model often sounds more authoritative than a normal search result, which makes source poisoning more dangerous.

The failure mode is not that the model is dumb. It is that the model inherits the trust assumptions of its retrieval layer. If the sources are circular, newly created, thin, or self-citing, the model may not reliably know that.

## Tool impact

This affects every AI product that grounds answers in live web results, documents, knowledge bases, or external tools.

For AI search tools, the product requirement is stronger provenance. Users need to know whether sources are independent, fresh, reputable, and mutually corroborating, not merely numerous.

For enterprise agents, the stakes are higher. An agent that retrieves a poisoned vendor policy, install guide, or compliance page may not just answer incorrectly. It may take action based on a false instruction.

That moves retrieval poisoning from misinformation into supply-chain security.

## Buyer takeaway

The practical rule is simple: do not let agents act on single-source retrieved claims.

For internal AI deployments, teams should require source independence checks, domain-age checks where practical, approval gates for external instructions, and clear separation between retrieved facts and executable instructions.

For research workflows, users should treat circular citations as a red flag. Two pages repeating the same claim are not two sources if one exists only because the other planted the claim.

## What to watch

The next generation of AI search tools should compete on provenance quality, not just answer quality.

The best systems will show why a source should be trusted, whether corroborating sources are independent, when the page changed, and whether the claim is unusually new or low-coverage. Without that, AI search remains vulnerable to small, cheap attacks that look legitimate at the exact moment a user needs confidence.
