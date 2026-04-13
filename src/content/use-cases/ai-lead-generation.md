---
type: use-case
slug: ai-lead-generation
title: "How to Build AI Lead Generation"
seo_title: "AI Lead Generation Guide (2026) — aipedia.wiki"
meta_description: "Automate lead sourcing, enrichment, and AI-powered scoring using n8n, Claude API, and Apollo.io. Delivers 1,000+ qualified leads per month for $89-349/mo."
author: "aipedia.wiki Editorial"
description: Scrape, enrich, and qualify leads automatically using n8n, Claude, and data enrichment tools.
tools_mentioned: [n8n, claude]
last_updated: 2026-04-13
update_frequency: quarterly
---

# How to Build AI Lead Generation

AI lead generation automates the process of finding, enriching, scoring, and qualifying B2B prospects, delivering a daily list of high-quality leads directly to your CRM. This guide covers a production stack using n8n ([n8n](https://n8n.io/)) for workflow orchestration, Claude API (Sonnet) ([Anthropic Claude API](https://docs.anthropic.com/)) for AI-powered lead scoring and qualification, and Apollo.io ([Apollo.io](https://www.apollo.io/)) or Clay ([Clay](https://www.clay.com/)) for data enrichment, at a total cost of $89-349 per month. The system replaces 10-20 hours per week of manual SDR research time. It sources leads from Apollo.io searches, website visitor identification, and social media buying signals, then enriches each lead with verified contact information, company data, technographics, and recent funding events. Claude scores leads against your Ideal Customer Profile on a 1-100 scale and routes hot leads to sales reps with recommended outreach angles ([HubSpot CRM](https://www.hubspot.com/products/crm)). Expected results reach 1,000+ qualified leads per month within 60 days of deployment.

## The Problem
Manual lead generation is tedious and inconsistent. SDRs spend 60-70% of their time researching prospects, finding contact info, and qualifying leads -- work that's repetitive and doesn't require human creativity. Meanwhile, good leads go cold because the pipeline is too slow. You want to automate the research and qualification so humans can focus on what they're good at: building relationships and closing deals.

## Recommended Stack
| Step | Tool | Cost | Why This Tool |
|------|------|------|---------------|
| Workflow orchestration | [n8n](../tools/n8n.md) | $20/mo (cloud) or free (self-hosted) | Connects all tools with no code. Handles scheduling, branching, error handling. |
| Lead scoring & qualification | [Claude API](../tools/claude.md) (Sonnet) | ~$20-80/mo (usage-based) | Analyzes company/person data and scores fit. Better judgment than rules-based scoring. |
| Data enrichment | Apollo.io | $49-99/mo | Contact info, company data, technographics. Best coverage for B2B. |
| Data enrichment (alt) | Clay | $149/mo | Waterfall enrichment across 50+ data sources. Higher hit rate than single-source. |
| CRM | HubSpot / Pipedrive / Close | $0-50/mo | Where qualified leads land. n8n integrates with all major CRMs. |
| **Total** | | **$89-349/mo** | Replaces 10-20 hrs/week of SDR research time. |

## Step-by-Step

### 1. Define your Ideal Customer Profile (ICP)
Before building anything, write down exactly who you're targeting:
- **Company size:** e.g., 10-200 employees.
- **Industry:** e.g., SaaS, e-commerce, professional services.
- **Revenue:** e.g., $1M-50M ARR.
- **Geography:** e.g., US, UK, DACH region.
- **Tech stack signals:** e.g., uses Shopify, runs Google Ads, has a blog.
- **Buying signals:** e.g., recently raised funding, hiring for relevant roles, posted about a problem you solve.

Turn this into a scoring rubric (1-100) that Claude will use to evaluate each lead.

### 2. Set up lead sourcing in n8n (automated)
Create n8n workflows that find potential leads from multiple sources:

**Source A -- Apollo.io search (daily):**
1. Trigger: Daily at 8 AM.
2. Search Apollo.io API with your ICP filters (industry, size, location, keywords).
3. Pull top 50 new results per day (avoid duplicates by checking against CRM).
4. Pass to enrichment step.

**Source B -- Website visitors (continuous):**
1. Trigger: New identified visitor in Clearbit Reveal / RB2B / Leadfeeder.
2. Company info auto-extracted.
3. Pass to enrichment step.

**Source C -- Social signals (daily):**
1. Monitor LinkedIn / Twitter for posts containing buying-signal keywords (e.g., "looking for a [your category]," "frustrated with [competitor]").
2. Extract poster info.
3. Pass to enrichment step.

### 3. Enrich leads automatically
For each raw lead, run through enrichment:
1. **Apollo.io or Clay:** Get verified email, phone, LinkedIn URL, company revenue, employee count, tech stack, recent funding, job title.
2. **Company website scrape (via n8n HTTP node):** Pull the homepage and About page text for Claude to analyze.
3. **LinkedIn profile (if available):** Recent posts, job history, mutual connections.

Store all enriched data in a structured JSON object.

### 4. AI-powered lead scoring with Claude
Send each enriched lead to Claude API with this prompt structure:

```
You are a B2B lead qualification expert. Score this lead 1-100 based on our ICP.

Our ICP: [paste your ICP definition and scoring rubric]

Lead data:
- Company: [name]
- Industry: [industry]
- Size: [employees]
- Revenue: [revenue]
- Tech stack: [tech stack]
- Recent news: [funding, hiring, etc.]
- Contact: [name, title, LinkedIn]
- Website summary: [scraped text]

Respond with:
1. Score (1-100)
2. Fit assessment (1-2 sentences)
3. Recommended angle (how to approach this lead)
4. Priority: hot / warm / cold
```

### 5. Route qualified leads to CRM
Based on Claude's scoring:
- **Hot (80-100):** Create deal in CRM, assign to senior rep, send Slack alert with Claude's recommended angle.
- **Warm (50-79):** Add to nurture sequence in CRM. Auto-enroll in email drip campaign.
- **Cold (below 50):** Add to CRM as low-priority. Revisit monthly.

### 6. Optional: AI-generated outreach drafts
For hot leads, add a step where Claude drafts a personalized outreach email:
```
Write a cold email to [contact name], [title] at [company].
Context: [Claude's recommended angle from scoring step].
Tone: Professional but conversational. Short (under 100 words).
Include one specific detail about their company to show research.
CTA: Suggest a 15-minute call.
```
Send draft to human for review before sending. Never auto-send cold outreach.

## Budget Alternatives
- **Minimal ($20/mo):** n8n self-hosted (free) + Claude API (~$20/mo). Manual lead sourcing from LinkedIn/Google. Skip Apollo/Clay, use free Hunter.io for emails (50 lookups/mo free). Manual CRM entry.
- **Mid-range ($90/mo):** n8n cloud ($20) + Claude API ($30) + Apollo free tier (limited) + HubSpot free CRM. Good for 50-100 leads/week.
- **Free:** Google Sheets as CRM + Claude free tier (manual, no API) + manual research. Works for <10 leads/week.

## Expected Results
- **Week 1:** Pipeline set up. Processing 20-30 leads/day.
- **Month 1:** 500-800 scored leads. Refinement of ICP and scoring prompts based on conversion data.
- **Month 2+:** 1,000+ qualified leads/month. Human time reduced from 15-20 hrs/week to 3-5 hrs/week (reviewing hot leads, sending outreach, taking calls).

## Key Metrics to Track
- **Lead-to-qualified rate:** What % of sourced leads score as hot/warm?
- **Qualified-to-meeting rate:** What % of hot leads convert to calls?
- **Cost per qualified lead:** Total tool cost / number of hot leads.
- **Time saved:** Hours of manual research replaced per week.

## Related
- [n8n](../tools/n8n.md): Workflow automation
- [Claude](../tools/claude.md): Lead scoring and outreach drafting
- [Automation Category](../categories/ai-automation.md)
- [AI Customer Support](ai-customer-support.md): Similar automation pattern for support
- [Glossary: Workflow Automation](../glossary/index.md#workflow-automation)
- [Glossary: API](../glossary/index.md#api)

## Sources
- [Apollo.io](https://www.apollo.io/) -- B2B lead database and enrichment platform providing verified contact information, company data, and technographic signals.
- [Clay](https://www.clay.com/) -- Waterfall data enrichment platform that queries 50+ data sources to maximize lead coverage and contact accuracy.
