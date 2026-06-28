---
version: "0.3.0"
name: "AiPedia design contract"
description: "Agent-readable visual identity and consistency rules for aipedia.wiki."
colors:
  primary: "#F97316"
  on-primary: "#0B0A14"
  background-dark: "#0C0A09"
  surface-dark: "#1C1917"
  surface-dark-muted: "#292524"
  text-dark: "#FAFAF9"
  text-dark-secondary: "#E7E5E4"
  text-dark-muted: "#A8A29E"
  background-light: "#FAFAF9"
  surface-light: "#FFFFFF"
  border-light: "#E7E5E4"
  text-light: "#1C1917"
  text-light-secondary: "#57534E"
  text-light-muted: "#78716C"
  success: "#34D399"
  warning: "#FBBF24"
  risk: "#FB7185"
  evidence: "#38BDF8"
typography:
  display:
    fontFamily: "Metropolis, sans-serif"
    fontSize: "40px"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0em"
  page-title:
    fontFamily: "Metropolis, sans-serif"
    fontSize: "32px"
    fontWeight: 800
    lineHeight: 1.12
    letterSpacing: "0em"
  section-title:
    fontFamily: "Metropolis, sans-serif"
    fontSize: "22px"
    fontWeight: 750
    lineHeight: 1.2
    letterSpacing: "0em"
  body:
    fontFamily: "Metropolis, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  caption:
    fontFamily: "Metropolis, sans-serif"
    fontSize: "13px"
    fontWeight: 650
    lineHeight: 1.45
    letterSpacing: "0em"
spacing:
  gutter-mobile: "16px"
  gutter-desktop: "32px"
  gap-xs: "8px"
  gap-sm: "12px"
  gap-md: "16px"
  gap-lg: "24px"
  section-sm: "28px"
  section-md: "40px"
  section-lg: "52px"
  card-padding: "16px"
  control-y: "10px"
  control-x: "14px"
rounded:
  focus: "4px"
  control: "8px"
  card: "8px"
  panel: "12px"
  pill: "9999px"
components:
  page-dark:
    backgroundColor: "{colors.background-dark}"
    textColor: "{colors.text-dark-secondary}"
    rounded: "{rounded.focus}"
    padding: "{spacing.gutter-mobile}"
  page-light:
    backgroundColor: "{colors.background-light}"
    textColor: "{colors.text-light-secondary}"
    rounded: "{rounded.focus}"
    padding: "{spacing.gutter-mobile}"
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  card-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-padding}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y}"
  button-secondary-dark:
    backgroundColor: "{colors.surface-dark-muted}"
    textColor: "{colors.text-dark}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y}"
  button-secondary-light:
    backgroundColor: "{colors.border-light}"
    textColor: "{colors.text-light}"
    rounded: "{rounded.control}"
    padding: "{spacing.control-y}"
  metadata-dark:
    backgroundColor: "{colors.surface-dark-muted}"
    textColor: "{colors.text-dark-muted}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
  metadata-light:
    backgroundColor: "{colors.border-light}"
    textColor: "{colors.text-light-secondary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
  caption-light:
    backgroundColor: "{colors.surface-light}"
    textColor: "{colors.text-light-muted}"
    rounded: "{rounded.focus}"
    padding: "{spacing.gap-xs}"
  trust-chip:
    backgroundColor: "{colors.success}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
  warning-chip:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
  risk-chip:
    backgroundColor: "{colors.risk}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
  evidence-chip:
    backgroundColor: "{colors.evidence}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    padding: "{spacing.gap-xs}"
---

# AiPedia Design Contract

## Overview

AiPedia is a mobile-first AI tools wiki and buying decision engine. The interface should feel like a calm decision desk: current, source-backed, compact, and commercial only where it helps the reader choose well.

This file is the agent-facing design contract. The implementation source of truth remains `src/styles/tokens.css`, `src/styles/global.css`, and the shared layout/component files. When this file and the CSS disagree, inspect the live CSS first, then update this file or the CSS in the same change.

Read this file before editing rendered pages, layouts, shared components, route-level CSS, design tokens, CTAs, tool cards, comparison cards, guide pick cards, category hubs, homepage modules, search UI, or any page that changes visual hierarchy.

## Product North Star

AiPedia should answer five questions faster than any competing AI tools site:

- What should I use?
- What changed?
- What changed the score?
- What can be trusted?
- What are the tradeoffs?

Every visual decision should help one of those answers become clearer. If a UI pattern looks impressive but slows evaluation, remove it or simplify it.

## Design Personality

The site should feel:

- Editorial, not promotional.
- Dense where comparison matters, calm where reading matters.
- Modern, but not trend-chasing.
- Opinionated, but transparent about evidence and uncertainty.
- Distinctive through product quality, not decoration.

The OS-style chrome can be a memorable brand layer, but the content underneath must behave like a serious reference system. Avoid letting the chrome become louder than the tool, comparison, guide, or news decision.

## Page Archetypes

Use page archetypes deliberately. Pages should share rhythm, tokens, and interaction rules, but they should not all become the same card grid.

### Home

Purpose: orient new and returning users to the best parts of the site.

Required feel:

- Clear first-viewport signal that AiPedia is an AI tools wiki and decision system.
- Direct entry points into tools, comparisons, news, guides, and search.
- Evidence of freshness, scoring, and editorial standards.
- No generic agency hero or vague AI futurism.

### Directory Pages

Examples: tools, compare, news, guides, search, glossary.

Purpose: help users scan a large collection and narrow quickly.

Required feel:

- Wide directory canvas with consistent gutters.
- Filters and sort controls that feel like product controls, not decoration.
- Predictable card/list density.
- Strong empty, loading, and narrow-screen states.
- No page-specific padding experiments unless promoted to shared tokens.

### Detail Pages

Examples: tool pages, comparison pages, news articles, guides.

Purpose: help users understand and decide.

Required feel:

- Narrower reading measure than directory pages.
- A clear verdict, snapshot, or decision summary near the top.
- Fact tables, sources, score context, and caveats where relevant.
- Tables and callouts that make comparison faster, not heavier.
- A clear path to alternatives or related pages.

### Comparison Pages

Purpose: make a practical call between two tools.

Required feel:

- Winner by use case, not fake neutrality.
- Canonical facts separated from editorial judgment.
- Caveats for pricing, model availability, enterprise controls, and workflow fit.
- Strong mobile tables or stacked comparison blocks that do not require awkward horizontal reading.

### News Pages

Purpose: explain what changed and why it matters.

Required feel:

- Dated, restrained, source-grounded.
- Clear distinction between official announcement, third-party analysis, and AiPedia interpretation.
- Practical user impact and risk framing.
- No press-release energy.

## Colors

AiPedia is dark-first with an explicit light mode. The base palette is stone/off-black, not blue-black and not purple. Orange is the commercial and navigation accent. Green, yellow, rose, and sky are semantic signals only.

- Use orange for primary CTAs, active states, commercial highlights, and selected navigation.
- Use green for verified/trust states, yellow for caution, rose for risk, and sky for evidence/source cues.
- Do not introduce one-off accent colors in page sections. A new page should inherit the same semantic palette unless a broader token migration is approved.
- Do not create purple AI gradients, decorative glow blobs, beige craft palettes, or all-blue dashboard themes.
- Keep text contrast comfortably readable in both dark and light modes.

## Typography

AiPedia uses Metropolis as the site font. Typography should be dense enough for research and buying decisions, but never cramped.

- Use short, plain headings that fit their containers.
- Keep body copy readable at mobile widths. Do not reduce important mobile copy to tiny helper text.
- Use monospaced or data styling only when it improves scanning. Do not create a separate decorative mono voice.
- Keep letter spacing at `0`. Do not add negative tracking or wide uppercase labels as decoration.
- Do not introduce serif display type unless a future brand direction explicitly approves it.

## Layout

AiPedia pages are built on disciplined grids, repeatable gutters, compact cards, and source-backed decision modules.

- Mobile is complete, not a reduced version. The first screen of monetizable pages must expose the verdict, fit, plan guidance, CTA, disclosure context, and main watch-out.
- Use the canonical content widths from `src/styles/tokens.css`: container, article, narrow, and hero copy widths.
- Use grid or stable dimensions for repeated cards, boards, toolbars, CTAs, source chips, and guide pick cards.
- Prevent horizontal overflow at 319, 360, 390, 430, 768, 1024, and 1366 px when a page or component is rendered.
- No text may escape a card, collide with adjacent content, stack one letter per line, or wrap a CTA into awkward fragments.
- No card-in-card page sections. Cards are for repeated items, framed tools, or modals. Sections should be full-width bands or clean unframed layouts.

## Elevation & Depth

Depth is subtle. AiPedia should feel stable and editorial, not glassy or theatrical.

- Prefer borders, spacing, and background contrast over heavy shadows.
- Glass treatment is allowed only where the existing tokens already use it, such as navigation and compact raised panels.
- Do not add decorative bokeh, gradient orbs, floating blobs, or pure atmospheric backgrounds.
- Reserve motion for feedback, theme transitions, disclosure state, and lightweight hierarchy. Respect `prefers-reduced-motion`.

## Shapes

The default shape system is compact and squared-off:

- Controls: 8px radius.
- Cards: 8px radius.
- Panels and major framed regions: 12px radius.
- Pills: only for chips, small metadata, filters, and compact badges.

Do not mix oversized rounded cards with 8px controls on the same surface. Do not make page sections look like giant floating cards.

## Components

Shared components should look related across homepage, hubs, tool pages, guide pages, and comparison pages.

- Primary CTA labels should be specific and user-benefit oriented. Examples: `Try CloudTalk free`, `See best plan`, `Compare alternatives`.
- Commercial CTAs need clear disclosure context, placement identifiers, and consistent tracking.
- Tool cards, guide cards, comparison cards, and source chips should share gutters, radius, border weight, and text-density ratios.
- Trust strips should stay near the buying decision. Keep verified date, editorial independence, source-backed proof, and affiliate disclosure discoverable.
- Use icons from the repo's existing icon or component patterns. Do not hand-roll decorative SVGs for routine UI.
- Loading, empty, error, active, focus, and reduced-motion states are part of a component, not optional polish.

## Trust Layer

The site needs a visible trust system, not just attractive pages.

Prefer reusable patterns for:

- Last verified dates.
- Source quality and source count.
- Pricing caveats.
- Model/version caveats.
- Score explanations.
- What changed since the previous update.
- Editorial disclosure and affiliate disclosure.
- Known limitations or reasons to avoid a tool.

For a 10/10 AI tools wiki, trust signals should be visible enough that users know why to believe the page, but quiet enough that the page still scans.

## Mobile Bar

Mobile is not a shrunken desktop.

Before shipping a visual PR, check:

- No overlapping chrome, controls, cards, or text.
- Filters remain usable without pushing the content too far down.
- Tables become readable stacked layouts where needed.
- Tap targets are stable and large enough.
- The first viewport still says what page the user is on and why it matters.
- Long tool names, model names, prices, and category labels wrap without breaking the layout.

## Accessibility And Performance

Do not trade credibility for polish.

Required checks for meaningful UI work:

- Preserve semantic headings, lists, buttons, links, and labels.
- Keep visible focus states.
- Respect reduced-motion preferences.
- Keep contrast readable in light and dark modes.
- Avoid unnecessary client-side JavaScript.
- Avoid large assets where static CSS or existing data will do.
- Check that generated assets are intentional before staging.

## Using External UI Skills

Third-party UI/UX skills, design generators, and style libraries can be useful as reviewers. They are not the source of truth for AiPedia.

Use them to:

- Audit a page for hierarchy, spacing, contrast, and mobile issues.
- Generate alternative layouts for comparison.
- Stress-test whether a page archetype is clear.
- Build a checklist for a narrow PR.

Do not use them to:

- Replace this contract.
- Apply generic palettes, fonts, spacing, or landing-page structures without adapting them.
- Add a new visual style because it appears in a generated recommendation.
- Make every page look like a SaaS homepage.

When an external recommendation conflicts with this contract, prefer this contract and the existing codebase patterns.

## Do's and Don'ts

Do:

- Start from `src/styles/tokens.css` before adding CSS.
- Reuse shared layouts and components before creating page-specific UI.
- Keep mobile content complete, crawlable, and decision-oriented.
- Check 319 px when a change touches nav, homepage cards, top-layer grids, sticky CTAs, or compact commercial modules.
- Run `npm run design:lint` after changing this file.
- Run `npm run check:smart -- --path DESIGN.md` when changing this contract or related token surfaces.

Do not:

- Create new visual languages per page or category.
- Add decorative gradients, glows, dots, fake screenshots, or ornamental labels to make a page feel designed.
- Use em dashes in visible copy, docs that guide editorial output, or comments.
- Add wide comparison/pricing tables as the primary mobile experience.
- Hide critical buying information behind interaction on mobile.
- Let affiliate conversion outrank trust, source evidence, or plain caveats.

## Pre-PR UI Checklist

Before a UI PR is ready, verify:

- The page follows the correct archetype.
- Gutters, top spacing, section rhythm, and content width match the shared system.
- The page answers at least one north-star question more clearly than before.
- Desktop and mobile have no overlap, cropped text, broken scroll, or unreadable controls.
- Dark mode still works.
- New components reuse existing patterns unless a new abstraction clearly reduces future inconsistency.
- The lightest relevant verification command passed, or the failure is clearly reported.
