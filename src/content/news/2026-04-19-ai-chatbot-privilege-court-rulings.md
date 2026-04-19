---
type: news
slug: 2026-04-19-ai-chatbot-privilege-court-rulings
title: "US Courts Split on AI Chatbot Privilege: Your Claude and ChatGPT Chats May Be Discoverable"
date: 2026-04-19
severity: major
summary: "Two contrasting US federal rulings on AI chatbot chat-log discoverability reached wide coverage April 15-18, 2026. SDNY Judge Jed Rakoff compelled Bradley Heppner to produce 31 Claude-generated documents tied to his GWG fraud case, ruling that 'no attorney-client relationship exists, or could exist, between an AI user and a platform such as Claude.' Michigan Magistrate Judge Anthony Patti ruled the opposite way on the same day, protecting a pro-se plaintiff's ChatGPT chats as her own work product. Legal industry warning to consumers and lawyers: consumer AI chats are treated as discoverable by default. Enterprise AI deployed under attorney direction may be protected."
affects: [chatgpt, claude]
categories: [ai-research]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-19
last_verified: 2026-04-19
sources:
  - url: "https://thedailyrecord.com/2026/04/15/us-judge-ai-chatbot-chats-used-securities-fraud/"
    title: "AI ruling prompts warnings from US lawyers - The Daily Record"
  - url: "https://www.insurancejournal.com/news/national/2026/04/15/865963.htm"
    title: "AI Ruling Prompts Warnings From Lawyers - Insurance Journal"
  - url: "https://qz.com/ai-chatbot-attorney-client-privilege-ruling-heppner-041626"
    title: "AI chatbot chats ruled not protected by attorney-client privilege - QZ"
  - url: "https://www.crowell.com/en/insights/client-alerts/federal-court-rules-some-ai-chats-are-not-protected-by-legal-privilege-what-it-means-for-you"
    title: "Federal Court Rules Some AI Chats Are Not Protected by Legal Privilege - Crowell & Moring"
  - url: "https://blog.freshfields.us/post/102mimn/your-ai-chatbot-is-not-your-lawyer-ai-privilege-issues-in-litigation"
    title: "Your AI Chatbot is Not Your Lawyer - Freshfields"
  - url: "https://americanbazaaronline.com/2026/04/16/lawyers-warn-against-confiding-in-ai-chatbots-after-court-ruling-479094/"
    title: "Lawyers warn against confiding in AI chatbots after court ruling - American Bazaar"
---

Two US federal rulings on whether AI chatbot conversations are protected by attorney-client privilege reached wide coverage this week. **The rulings disagree.** The legal industry is treating this as the first real precedent on whether your Claude or ChatGPT chats can be subpoenaed.

## The Rakoff ruling: chats are discoverable

**Case:** United States v. Heppner, SDNY.

**Who:** Bradley Heppner, former chair of bankrupt GWG Holdings and founder of Beneficent, charged with securities and wire fraud.

**What happened:** Judge Jed Rakoff orally ruled that prompts and outputs Heppner generated using Anthropic's Claude were **neither attorney-client privileged nor protected by work-product doctrine**. The court compelled production of **31 Claude-generated documents** related to the fraud case.

**The quote:**

> "No attorney-client relationship exists, or could exist, between an AI user and a platform such as Claude." - Judge Rakoff

**The court cited Anthropic's own Privacy Policy**, which notes that prompts and outputs may be used to train AI systems and may be disclosed to regulatory authorities and third parties. That public-facing disclosure, per Rakoff, destroys any expectation of confidentiality.

## The Patti ruling: chats as work product

**Case:** Unnamed employment discrimination case, E.D. Michigan.

**What happened:** US Magistrate Judge Anthony Patti ruled that a pro-se plaintiff (representing herself) **did not have to produce** her ChatGPT chats about the employment claims she brought against her former employer.

**Patti's reasoning:** the plaintiff's AI chats functioned as **her own personal work product** - notes and research she made to herself while preparing her case. That's protected the same way a lawyer's private notes are.

## Why the split matters

**The two rulings came on the same day, in different circuits, with opposite outcomes.**

The practical reading: **consumer AI chats are discoverable by default**, but there's a narrow path to work-product protection if:

- The chats are clearly for case preparation
- The user is representing themselves or directed by counsel
- The purpose is recorded as legal-strategy, not general assistance

There is **no attorney-client privilege** for any consumer AI interaction, per Rakoff. The privilege attaches to a lawyer, not a tool.

## What this means for AI users

**For consumers using [ChatGPT](/tools/chatgpt/), [Claude](/tools/claude/), Gemini, Grok, etc.:**

- **Assume every chat is discoverable** in civil or criminal litigation affecting you.
- **Providers will hand over chat logs** in response to valid subpoenas or court orders. They've done so for OpenAI and Anthropic already.
- **Deleting chats does not help.** Many providers retain chat logs server-side for weeks or months even after user-side deletion.

**For lawyers and their clients:**

- **Enterprise AI deployed under attorney direction** (Claude for Work with a retention agreement, Microsoft Copilot under an enterprise contract with the law firm) offers more protection.
- **Work-product doctrine** may apply if the AI is being used explicitly for case preparation under counsel's direction. Rakoff did not address this flavor directly.
- **Advice to clients:** don't discuss anything with a consumer AI chatbot that you wouldn't want in a deposition.

**For businesses using AI:**

- Treat all AI-assisted drafting as potentially discoverable in litigation.
- Use enterprise AI deployments with zero-retention agreements where possible.
- Train staff that AI assistance is documentation, not private thinking.

## The privacy-policy angle

**Rakoff's reasoning leans heavily on provider privacy policies.**

Both Anthropic and OpenAI publish Privacy Policies that acknowledge prompt and output data may be used for model improvement or disclosed to comply with legal process. Rakoff treated that as the user's acknowledgment that chats are not confidential.

**This creates pressure on providers:**

- If providers offered a true "no-retention, no-training, no-disclosure" tier, courts might protect those chats.
- Anthropic already offers this through Claude for Work and the Zero Data Retention API tier. OpenAI has Enterprise and API Zero Data Retention.
- Consumer tiers (ChatGPT Free/Plus, Claude Free/Pro) typically do not ship this by default.

Expect clearer consumer-tier privacy disclosures and "chat is discoverable" warnings in provider UIs over the next 6-12 months.

## What providers should do

**If Claude, ChatGPT, Gemini, or Grok want this to not scare enterprise customers away:**

1. **Default-on zero-retention** for paid tiers. Anthropic and OpenAI both have the infrastructure.
2. **Per-chat privilege labels**: let users mark chats as "legal-strategy / work-product" with clearer retention guarantees.
3. **Auditable delete**: cryptographically provable deletion, not just soft-delete in the UI.
4. **Clear in-product warnings** that chats are legally discoverable unless in a protected tier.

None of these are shipped yet. The court rulings give providers a commercial reason to accelerate them.

## What this does not mean

**The rulings don't say AI-generated content is inadmissible.** If anything, the opposite: AI output used as part of a fraud scheme remains admissible, and now the "prompts" that produced it are admissible too.

**They also don't say AI makes you more liable.** Nothing here creates new duties. It just means the electronic record of how you thought through a problem with an AI is now a standard discoverable artifact.

## Open questions

- **Appeal path.** Heppner's legal team is expected to appeal the Rakoff order. If upheld at the Second Circuit, the precedent hardens.
- **Circuit split.** Rakoff (SDNY, 2nd Circuit) and Patti (E.D. Mich, 6th Circuit) reached different conclusions. Cross-circuit resolution may land at the Supreme Court within 2-3 years.
- **Provider response.** Anthropic, OpenAI, Google, xAI, and Microsoft will likely all update their consumer privacy policies in response, though that doesn't retroactively protect chats already created.

## Sources

- [The Daily Record: AI ruling prompts warnings from US lawyers](https://thedailyrecord.com/2026/04/15/us-judge-ai-chatbot-chats-used-securities-fraud/)
- [Insurance Journal: AI Ruling Prompts Warnings From Lawyers](https://www.insurancejournal.com/news/national/2026/04/15/865963.htm)
- [QZ: AI chatbot chats ruled not protected by attorney-client privilege](https://qz.com/ai-chatbot-attorney-client-privilege-ruling-heppner-041626)
- [Crowell & Moring: Federal Court Rules Some AI Chats Are Not Protected by Legal Privilege](https://www.crowell.com/en/insights/client-alerts/federal-court-rules-some-ai-chats-are-not-protected-by-legal-privilege-what-it-means-for-you)
- [Freshfields: Your AI Chatbot is Not Your Lawyer](https://blog.freshfields.us/post/102mimn/your-ai-chatbot-is-not-your-lawyer-ai-privilege-issues-in-litigation)
- [American Bazaar: Lawyers warn against confiding in AI chatbots after court ruling](https://americanbazaaronline.com/2026/04/16/lawyers-warn-against-confiding-in-ai-chatbots-after-court-ruling-479094/)
