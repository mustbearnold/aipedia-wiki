---
type: news
slug: 2026-04-17-anthropic-launches-claude-design
title: "Anthropic Launches Claude Design, Figma Stock Drops 7%"
date: 2026-04-17
severity: breaking
summary: "Anthropic launched Claude Design on April 17, 2026, a research-preview product that turns text prompts into prototypes, slide decks, one-pagers, and mockups. Powered by Claude Opus 4.7. Reads codebases and design files to apply a team's design system automatically. Exports to PDF, PPTX, URL, and Canva. Hands off to Claude Code for production builds. Figma stock fell ~7% on the news; Mike Krieger (Anthropic CPO) had resigned from Figma's board April 14, three days before the launch."
affects: [claude, claude-code, figma, canva, lovable]
categories: [ai-design, ai-chatbots]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-18
last_verified: 2026-04-18
sources:
  - url: "https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/"
    title: "Anthropic launches Claude Design - TechCrunch"
  - url: "https://venturebeat.com/technology/anthropic-just-launched-claude-design-an-ai-tool-that-turns-prompts-into-prototypes-and-challenges-figma"
    title: "Anthropic launches Claude Design - VentureBeat"
  - url: "https://gizmodo.com/anthropic-launches-claude-design-figma-stock-immediately-nosedives-2000748071"
    title: "Figma Stock Immediately Nosedives - Gizmodo"
  - url: "https://www.theregister.com/2026/04/17/anthropic_debuts_claude_design/"
    title: "Anthropic debuts Claude Design - The Register"
---

Anthropic launched **Claude Design** on April 17, 2026. It's a research-preview product that turns text prompts into prototypes, slide decks, marketing one-pagers, and app mockups. Powered by Claude Opus 4.7. Available to Claude Pro, Max, Team, and Enterprise subscribers.

Figma stock fell approximately **7%** within hours. The timing is not accidental: **Mike Krieger**, Anthropic's CPO and Instagram co-founder, resigned from Figma's board on April 14, three days before the launch. The Information reported the same day that Anthropic's next product would compete directly with Figma's core offering.

## What Claude Design actually does

**Inputs:**
- Text prompts (primary)
- Uploaded codebases (for pulling design system conventions)
- Uploaded design files (for visual consistency)

**Outputs:**
- App prototypes
- Slide decks
- Marketing one-pagers
- Mockups

**Refinement modes:**
- Conversational iteration (talk to Claude to change the design)
- Inline comments on the design
- Direct visual edits
- Custom sliders that Claude builds for the specific project (e.g., "spacing tightness", "brand energy")

**Exports:**
- PDF
- PowerPoint (PPTX)
- Shareable URL
- Canva (fully editable and collaborative after export)
- **Handoff bundle to Claude Code** for production build

## The closed loop: prompt → prototype → code

The piece that makes Claude Design more than a Figma clone is the **handoff to Claude Code**. When a design is ready to build, Claude packages everything (components, layout, design tokens, content) into a bundle that passes to Claude Code with a single instruction. Claude Code then generates the working codebase.

That's the full loop: prompt → prototype → production code, all inside Anthropic's ecosystem. Lovable, Bolt, and v0 all do "prompt to code" but start from scratch every time. Claude Design adds the design-system-aware layer that enterprises actually need.

## Design system awareness

The feature that separates Claude Design from generic AI design tools: it can **read a company's codebase and design files** to extract the design system, then apply it consistently across every new project.

What that means in practice:
- Upload your React component library and Figma file
- Claude Design extracts colors, typography, spacing, component patterns
- Every new prototype or deck automatically uses those conventions
- Results stay on-brand without a human designer curating every output

This is the feature Figma has been building toward with AI features in 2025-2026 but hasn't shipped at this integration level.

## Who it's for

Per Anthropic's framing: **founders, product managers, marketers, and developers** who need to get from idea to visual artifact quickly without opening a design tool. The explicit positioning is "for people who aren't starting from a design tool."

Product teams use cases:
- PMs creating pitch decks from bullet points
- Founders making investor one-pagers
- Developers mocking up UI before writing code
- Marketers generating campaign visuals
- Anyone building an internal prototype to test an idea

Not positioned for: professional designers doing pixel-perfect work in Figma or Sketch. Anthropic is explicitly targeting the **non-designer** segment where Figma has been trying to expand.

## The Figma backstory

Three dates tell the sequence:

1. **April 14, 2026:** Mike Krieger (Anthropic CPO) resigns from Figma's board. Same day, The Information reports Anthropic's next product will compete with Figma.
2. **April 16, 2026:** Claude Opus 4.7 ships (the model that powers Claude Design).
3. **April 17, 2026:** Claude Design launches. Figma stock drops ~7%.

Krieger remaining on the Figma board through April 14 while Anthropic built a competitor was an obvious governance conflict. The resignation and the product launch effectively happened as one coordinated announcement.

## Where Claude Design sits in the competitive map

| | Claude Design | Figma + AI | Lovable / Bolt / v0 | Canva |
|---|---|---|---|---|
| **Primary input** | Text prompt | Drag + drop | Text prompt | Templates |
| **Design system awareness** | Reads codebase + design files | Manual config | Limited | Manual |
| **Code handoff** | To Claude Code, full project | Dev Mode (inspect only) | Generates code directly | None |
| **Export formats** | PDF, PPTX, URL, Canva | PDF, PPTX, code inspection | Code only | PDF, PPTX, image |
| **Best for** | Non-designers, closed-loop workflows | Professional designers | Prototype-first builders | Template marketing |
| **Pricing** | Claude Pro ($20) and up | Free / $12-$45 per seat | Free tier / $20-$40 | Free / $15/user |

Claude Design is directly competitive with **Lovable** and **Bolt.new** on the prototype-to-code loop, and with **Canva** on the export-to-presentation use case. Its competition with Figma is more nuanced: Figma owns professional designers; Claude Design owns non-designers.

## Pricing + availability

- **Tier required:** Claude Pro ($20/mo), Max ($100-$200/mo), Team ($30/user/mo), or Enterprise
- **Status:** Research preview (feature flag, not full production)
- **Free tier:** Not available
- **Geography:** Global rollout with Claude itself

No separate Claude Design subscription. If you already pay for any Claude paid tier, it's bundled.

## Implications

**For Anthropic:** The product stack is filling out. Claude Code for autonomous coding, Claude Agent SDK for agent building, [Claude Computer Use](https://www.anthropic.com/news/computer-use) for desktop agents, and now Claude Design for visual work. This is Anthropic becoming a full product ecosystem, not just an API provider.

**For Figma:** The 7% stock drop is the market reading this as a real competitive threat. Figma's response will likely be accelerated AI features (FigJam AI, Make, Dev Mode automations) and possibly a direct Anthropic-integration pitch.

**For Lovable, Bolt, v0:** The closed-loop pitch (prompt → design → Claude Code) competes directly with their prompt-to-app value proposition. Expect these tools to respond with their own design-layer additions or tighter integrations.

**For designers:** Unchanged at the high end. The argument "AI will replace designers" keeps getting tested by these launches and keeps being empirically false. Designers who adopt Claude Design as a prototyping accelerator win; those who ignore it lose.

## Sources

- [TechCrunch: Anthropic launches Claude Design](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/)
- [VentureBeat: Anthropic just launched Claude Design](https://venturebeat.com/technology/anthropic-just-launched-claude-design-an-ai-tool-that-turns-prompts-into-prototypes-and-challenges-figma)
- [9to5Mac: Anthropic launches Claude Design following Opus 4.7](https://9to5mac.com/2026/04/17/anthropic-launches-claude-design-for-mac-following-opus-4-7-model-upgrade/)
- [Gizmodo: Figma Stock Immediately Nosedives](https://gizmodo.com/anthropic-launches-claude-design-figma-stock-immediately-nosedives-2000748071)
- [The Register: Anthropic debuts Claude Design, because who needs designers?](https://www.theregister.com/2026/04/17/anthropic_debuts_claude_design/)
- [SiliconANGLE: Anthropic launches Claude Design to speed up graphic design](https://siliconangle.com/2026/04/17/anthropic-launches-claude-design-speed-graphic-design-projects/)
- [MacRumors: Anthropic Debuts Claude Design](https://www.macrumors.com/2026/04/17/anthropic-claude-design/)
