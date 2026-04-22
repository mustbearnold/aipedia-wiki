---
type: news
slug: 2026-04-23-google-wiz-agentic-defense
title: "Google + Wiz ship Agentic Defense: AI-native threat detection, engineering, and remediation agents"
date: 2026-04-23
severity: major
summary: "At Cloud Next 2026 Day 2, Google launched Agentic Defense, the first post-acquisition Wiz integration. Combines Google Threat Intelligence and Security Operations with Wiz Cloud and AI Security into a single agentic stack. Ships three agents out of the gate: threat detection, detection engineering, and remediation. Positions Google against CrowdStrike, Palo Alto, and Microsoft Sentinel in the AI-SOC race."
affects: [gemini]
categories: [ai-security, ai-business]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-22
last_verified: 2026-04-22
sources:
  - url: "https://cloud.google.com/blog/topics/google-cloud-next/welcome-to-google-cloud-next26"
    title: "Welcome to Google Cloud Next '26 - Google Cloud Blog"
  - url: "https://blog.google/innovation-and-ai/infrastructure-and-cloud/google-cloud/next-2026/"
    title: "Google Cloud Next 2026: news and updates"
---

**Google** launched **Agentic Defense** at Cloud Next 2026 Day 2 (April 23, 2026), the first product integration since closing the **$32B Wiz acquisition**. Combines Google Threat Intelligence + Security Operations with Wiz Cloud + AI Security into a unified agentic security stack.

## The three launch agents

- **Threat detection agent.** Ingests telemetry from cloud, endpoint, and network. Ranks signals. Elevates high-confidence threats with reasoning traces.
- **Detection engineering agent.** Author new detection rules from natural-language descriptions. Simulates against historical telemetry before deployment.
- **Remediation agent.** Executes bounded corrective actions (quarantine, IAM revoke, firewall rule, image rollback) with human-in-the-loop approval gates.

Built on the [Gemini Enterprise Agent Platform](/news/2026-04-23-gemini-enterprise-agent-platform/); all three inherit the platform's Agent Identity, Gateway, and Observability.

## Why it matters

AI-SOC is the hottest enterprise-security product category of 2026. Competitors:

- **CrowdStrike Charlotte AI.** Deep endpoint-telemetry data, narrower remediation autonomy.
- **Palo Alto Strata AI.** Network-plus-cloud coverage, Panw-silo ecosystem.
- **Microsoft Sentinel + Copilot for Security.** Azure-native, bundled with E5.
- **SentinelOne Purple AI.** Endpoint-first with open-telemetry integrations.

Google's differentiator is the **Wiz cloud-posture data** feeding into Google Threat Intelligence's attacker-side telemetry. That combined data surface is unique among hyperscalers.

## Availability

- **Google Cloud customers:** preview in Q2 2026, GA Q3 2026.
- **Wiz customers not on GCP:** initial availability through Wiz Defend add-on; full Agentic Defense integration requires Google Cloud Security Operations subscription.
- **Pricing:** not disclosed at launch. Expect usage-based tied to agent-run events.

## The integration question

Wiz closed in early 2026 after a long regulatory review. Two scenarios:

1. **Wiz stays multi-cloud:** Wiz Defend, Wiz Code, and Wiz Cloud remain sellable standalone to AWS and Azure customers. Agentic Defense is the GCP-exclusive super-set. This preserves Wiz's $500M+ ARR from non-GCP customers.

2. **Wiz folds into GCP:** non-GCP customers see feature velocity stall, products eventually sunset. This is the Mandiant precedent (Google acquired 2022; Mandiant's standalone consulting business shrank).

Google has publicly committed to scenario 1. The Agentic Defense integration is the first test of whether that commitment holds.

## Read for enterprise security buyers

If you already run Wiz: Agentic Defense is an obvious evaluation on GCP workloads. On AWS/Azure workloads, wait for scenario-1 proof before betting long-term.

If you already run Google Cloud Security Operations: Agentic Defense is the product roadmap you've been waiting for. Expect aggressive cross-sell pricing.

If you run CrowdStrike or Sentinel: evaluate where Agentic Defense overlaps. Likely co-exist rather than displace in 2026 given switching costs.

## Related

- [Gemini Enterprise Agent Platform launches](/news/2026-04-23-gemini-enterprise-agent-platform/)
- [TPU 8t/8i unveiled on Cloud Next Day 2](/news/2026-04-23-google-tpu-8t-8i-cloud-next-day2/)
