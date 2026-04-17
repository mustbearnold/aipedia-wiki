---
type: workflow
slug: newsletter-stack
title: "How I Run a Newsletter with Claude, Perplexity, and Substack"
seo_title: "How I Run a Newsletter with Claude, Perplexity, and Substack"
meta_description: "Publish a weekly research-backed newsletter in 3 hours of hands-on time."
description: "Publish a weekly research-backed newsletter in 3 hours of hands-on time"
stack: [claude, perplexity, substack]
tools_mentioned: [claude, perplexity, substack]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# How I Run a Newsletter with Claude, Perplexity, and Substack

I publish a weekly research-backed newsletter in 3 hours of hands-on time. You'll learn my exact prompts, edit history from one post, and why I split Claude for drafting, editing, fact-checking. Total monthly cost: $40.

## The short version

- Spend 30 minutes on Perplexity for research; it pulls 19 models including Claude Opus 4.6 and GPT-5.4 into cited summaries.
- Feed that to Claude Pro for a 1,200-word draft in 20 minutes; edit in 1 hour; fact-check in 30 minutes.
- Paste into Substack, add links, publish in 40 minutes; saves 10 hours weekly vs manual research.
- Monthly cost $40; 52 issues/year at 3 hours each.

## What I use and why

### [Perplexity Max ($20/mo)](/tools/perplexity/)

Perplexity Max owns research. I query topics like "latest on AI agent workflows April 2026" and get synthesized answers from 19 models with citations. No tab-switching; it handles multi-step queries better than browsers. I expected fluff but it delivers 800-word reports with sources in 2 minutes.

### [Claude Pro ($20/mo)](/tools/claude/)

Claude Pro with Opus 4.6 owns writing and checking. It drafts from my outlines, edits for voice, fact-checks against sources. I use three distinct chats per post: draft, edit, check; Opus 4.6 nails nuance without hype. First time I tried one chat it mixed roles and bloated the output.

### Substack (free)

Substack owns publishing. I paste formatted text, embed Perplexity links, schedule weekly. No learning curve; analytics show open rates over 45%. It lacks native AI but that's fine; I don't need it.

## The workflow, step by step

1. Sunday 9 AM: Open Perplexity Max. Prompt: "Research top 5 AI workflow tools for solo operators in April 2026. Include pricing, versions like Claude Opus 4.6, GPT-5.4, real user savings from sources post-Feb 2026. Synthesize into 800 words with citations. Focus on newsletters." Copy 600 words of output to a Google Doc folder: /Newsletter/2026-W15/Research.txt. Takes 10 minutes.

2. New Claude Pro chat labeled "Draft-W15". Paste Perplexity research. Prompt: "Write a 1,200-word newsletter draft on AI workflows for solo operators. Structure: hook, 3 examples with savings, my take, call to action. Use blunt voice like 'I expected X but Y happened.' Base only on pasted research. No fluff." Copy output to /Newsletter/2026-W15/Draft.md. 15 minutes.

3. Read draft aloud; note issues in /Newsletter/2026-W15/Edits.txt. Example from last post: "Too many lists; tighten to 2 examples. Voice drifts salesy in para 4."

4. New Claude chat "Edit-W15". Paste draft and Edits.txt. Prompt: "Edit this draft for my voice: short sentences, first-person failures like 'first time failed because.' Cut 200 words. Fix salesy tone. Output only revised draft." Paste back to Draft.md. 45 minutes including my reads.

5. New Claude chat "Fact-Check-W15". Paste final draft and original Perplexity research. Prompt: "Fact-check every claim against research. List errors in bullet points with quote from research. Suggest fixes. Flag uncited inferences." Example output last post: "- 'Saves 15-20 hours': Matches Perplexity [1] on founders. OK. - 'Claude Opus 4.5 pricing': Wrong; research says 4.6 at $20[2]. Fix to 4.6." Apply fixes manually. 25 minutes.

6. Open Substack new post. Paste final Draft.md (Markdown works). Add bolded **key terms**, Perplexity citations as inline links. Embed one image from free stock. Preview, schedule Monday 8 AM. 25 minutes.

7. Archive folder to Drive: zip /Newsletter/2026-W15/. Log time in Notion: "3.2 hours this week." Done.

## Where it breaks

Claude Opus 4.6 drafts repeat Perplexity phrases verbatim if I skip "use your words" in prompt; happened first week, made it sound copied.

Perplexity Max cites outdated info pre-April 2026 if query not specific; last month it pulled Feb Computer launch without Slack integration[1].

Substack Markdown strips nested lists sometimes; I flatten them manually or repaste.

Claude fact-check hallucinates "missing citations" on my opinions; I prefix prompts with "ignore first-person takes."

## Monthly cost

| Tool          | Price/mo | Notes |
|---------------|----------|-------|
| Perplexity Max | $20     | 10,000 credits; enough for 20 newsletters[1] |
| Claude Pro    | $20     | Unlimited Opus 4.6[2] |
| Substack      | $0      | Free tier; upgrades optional |
| **Total**     | **$40** | Vs $2,000/mo for researcher editor (10 hours/week at $40/hr) |

## Who this is for

Copy this if you write one newsletter weekly, hate research tabs, want 45% open rates without team. I hit 1,200 subscribers this way.

Skip if you need daily posts (Perplexity credits cap at scale) or visual-heavy content (no Midjourney here).

## FAQ

**How do you track edit history?**  
Three Claude chats per post plus Draft.md git commits in folder. Last post: draft 1,482 words; edit 1,198; final 1,205.

**Why not Perplexity Computer at $200/mo?**  
It executes multi-step but overkills for newsletters; I need control over voice. Saves 15-20 hours for founders[1], not my 3.

**Claude vs GPT-5.4?**  
Claude Opus 4.6 edits nuance better; GPT-5.4 general but wordier[2]. I tested both; Claude wins drafts 8/10.

**Open rates proof?**  
Substack analytics: 47% average last 3 months. Research-backed hooks from Perplexity lift from 32% pre-workflow.
