---
type: use-case
slug: ai-agency-stack
title: AI Automation Agency Tech Stack
description: Complete tech stack for building and selling AI automation solutions to business clients.
tools_mentioned: [n8n, claude, elevenlabs, lovable, v0]
last_updated: 2026-04-13
last_verified: 2026-04-13
update_frequency: quarterly
---

## The Stack

For building AI automation solutions for business clients.

| Layer | Tool | Cost | Purpose |
|-------|------|------|---------|
| **Workflow automation** | n8n Cloud | $20-50/mo | Visual workflows + AI agent nodes |
| **LLM backbone** | Claude API (or Max CLI) | $0-100/mo | Intelligence layer |
| **Voice AI** | ElevenLabs API | $5-99/mo | Phone/voice agents for clients |
| **CRM integration** | GoHighLevel | $97-297/mo | White-label client platform |
| **Frontend** | Lovable or Bolt.new | $20-25/mo | Build client dashboards fast |
| **Hosting** | Vercel or Railway | Free-$20/mo | Deploy client apps |

## Client Deliverable Templates

### 1. AI Customer Support Bot ($2K setup + $500/mo)
- n8n workflow: webhook → Claude evaluates query → routes to answer/human
- Integrates with client's existing help desk (Zendesk, Freshdesk, Intercom)
- 70-80% of tickets auto-resolved

### 2. AI Lead Qualification ($3K setup + $1K/mo)
- n8n scrapes leads → Claude scores/qualifies → sends to CRM
- Integrates with Apollo.io, Clay.com for enrichment
- Client gets only hot leads in their inbox

### 3. AI Appointment Booking ($1.5K setup + $500/mo)
- ElevenLabs voice agent answers phone
- n8n books into client's calendar (Calendly, Google Calendar)
- Follow-up SMS/email automated

### 4. AI Content Pipeline ($2K setup + $1K/mo)
- Claude generates blog posts/social content from client briefs
- n8n auto-publishes to WordPress, social platforms
- Human review step before publish

## Pricing Guide for Clients

| Complexity | Setup Fee | Monthly Retainer | Your Time/Month |
|-----------|-----------|-----------------|-----------------|
| Simple (1 workflow) | $1,500-2,500 | $500-1,000 | 2-4 hours |
| Standard (2-3 workflows) | $3,000-5,000 | $1,000-3,000 | 5-10 hours |
| Complex (custom agent) | $5,000-15,000 | $3,000-8,000 | 10-20 hours |

## Cross-References
- ORACLE wiki: [[ai-automation-agency]] (business model, revenue data)
- ORACLE wiki: [[ai-lead-gen]] (lead gen sub-niche)
- AI Tools wiki: [[ai-automation]] (category overview)
