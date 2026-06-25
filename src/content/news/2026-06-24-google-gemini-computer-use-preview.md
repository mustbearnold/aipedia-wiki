---
type: news
slug: 2026-06-24-google-gemini-computer-use-preview
title: "Google gives Gemini 3.5 Flash a public computer-use preview"
date: 2026-06-24
severity: major
summary: "Google's Gemini API release notes say Computer Use is now in public preview for Gemini 3.5 Flash, with browser, mobile, desktop, safety-policy, and prompt-injection controls. Buyers should treat it as an agent-evaluation milestone, not a blanket production green light."
categories: [ai-automation, ai-coding]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-25
last_verified: 2026-06-25
related_tools: [gemini]
sources:
  - url: https://ai.google.dev/gemini-api/docs/changelog
    title: "Google AI for Developers: Gemini API release notes"
  - url: https://ai.google.dev/gemini-api/docs/computer-use
    title: "Google AI for Developers: Computer Use"
---

# Google gives Gemini 3.5 Flash a public computer-use preview

Google's Gemini API release notes say that Computer Use entered public preview for [Gemini](/tools/gemini/) 3.5 Flash on June 24, 2026. The release note says the preview includes simplified actions with intents, browser, mobile, and desktop environment support, configurable safety policies, and advanced prompt-injection detection.

That combination matters because computer-use agents are moving from demos into real procurement conversations. A buyer no longer needs to ask only whether an agent can click through a workflow. The better question is whether the system can run inside a governed environment, resist hostile page content, and leave enough evidence for a human owner to review.

## What changed

- Google added public-preview Computer Use support for Gemini 3.5 Flash.
- The preview covers browser, mobile, and desktop-style environments.
- Google is positioning safety policies and prompt-injection detection as part of the feature, not an afterthought.
- The update strengthens Gemini's developer-agent story beside Antigravity, Managed Agents, and AI Studio.

## Buyer value

Computer-use agents are useful when a workflow depends on existing interfaces that do not have clean APIs. They can help with internal admin panels, QA tasks, browser-based research, and repetitive operational workflows.

They are risky when the workflow handles payments, customer records, credentials, regulated data, or public content that can contain prompt injection. Before using a computer-use agent in production, teams should test:

- whether it follows allowlisted actions;
- whether it stops on unexpected UI states;
- whether screenshots, action traces, and tool calls are logged;
- whether a human must approve irreversible actions;
- whether prompt-injection tests are part of acceptance criteria;
- whether it can be isolated from sensitive credentials.

## What to do

Use the preview for controlled evaluation first. Pick one low-risk workflow with a clear success state and a reversible outcome. Compare Gemini against your existing manual process and any competing browser-agent route. Score reliability, action trace quality, recovery from UI drift, and human-review burden.

Do not treat public preview as a reason to give an agent broad desktop authority. The governance work is the product work.

## AiPedia take

Gemini Computer Use is a serious platform signal because it moves Google deeper into agent execution, not just chat and content generation. It is most valuable for teams already building on Gemini 3.5 Flash, Antigravity, or Google Cloud. The right rollout is narrow, logged, and reversible.
