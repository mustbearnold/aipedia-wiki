---
type: news
slug: 2026-05-07-anthropic-petri-alignment-tool-donation
title: "Anthropic donates Petri alignment auditing tool to the open-source ecosystem"
date: 2026-05-07
severity: major
summary: "Anthropic donated Petri, its open-source alignment testing toolbox, and integrated it with Bloom so external researchers can run broader and deeper model behavior audits."
categories: [ai-infrastructure, ai-agents, ai-enterprise]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-11
last_verified: 2026-05-11
affects: []
related_tools: [claude]
sources:
  - url: https://www.anthropic.com/research/donating-open-source-petri
    title: "Donating our open-source alignment tool"
  - url: https://www.anthropic.com/research/petri-open-source-auditing
    title: "Petri: An open-source auditing tool to accelerate AI safety research"
---

# Anthropic donates Petri alignment auditing tool to the open-source ecosystem

Anthropic announced on May 7, 2026 that it is donating Petri, its open-source alignment auditing toolbox, and integrating it with Bloom for deeper model behavior assessments.

Petri is designed to test large language models for concerning tendencies such as deception, sycophancy, and cooperation with harmful requests. Anthropic says it has used Petri in its own Claude assessment pipeline since Claude Sonnet 4.5.

## Why this matters

AI buyers usually see safety as a vendor promise. Petri points toward a more inspectable model market, where labs, auditors, enterprises, and governments can run repeatable behavioral tests instead of relying only on system cards and polished demos.

This is especially relevant as agents gain access to tools, code, browsers, company files, and long-running autonomy. The important question is no longer "does the chatbot say safe things in a benchmark?" It is whether a model behaves safely when it has incentives, context, and opportunities to act.

## Buyer take

For enterprises, Petri is not a procurement silver bullet, but it is a useful signal. Ask vendors whether they run behavioral audits, whether results are reproducible, whether tests include tool-use scenarios, and whether independent evaluators can inspect failures.

For AI safety teams and model builders, the donation makes Petri easier to adopt as part of pre-deployment testing. Pair it with red teaming, policy tests, domain-specific evals, and human review rather than treating it as a single score.

For buyers comparing Claude, ChatGPT, Gemini, Grok, and open models, the bigger implication is transparency pressure. Open evaluation tools make it harder for labs to claim safety maturity without showing work.

## What is still unclear

Automated alignment audits are only as good as their scenarios, judge models, and failure thresholds. Petri can help surface concerning behavior, but it cannot prove a model is safe across every deployment context.

