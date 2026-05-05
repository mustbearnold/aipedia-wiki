# aipedia Design Doctrine

This is the working design standard for aipedia.wiki. Use it before major UI, layout, component, homepage, directory, comparison, news, guide, search, or tool-detail changes.

The goal is not to look like a fashionable AI landing page. The goal is to feel like the most trustworthy AI tools reference product on the web: fast to scan, pleasant to browse, hard to fool, and useful when someone has to make a real decision.

## Product North Star

aipedia should answer five questions faster than any competing AI tools site:

- What should I use?
- What changed?
- What changed the score?
- What can be trusted?
- What are the tradeoffs?

Every visual decision should help one of those answers become clearer. If a UI pattern looks impressive but slows down evaluation, remove it or simplify it.

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

- Clear first-viewport signal that aipedia is an AI tools wiki and decision system.
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
- Clear distinction between official announcement, third-party analysis, and aipedia interpretation.
- Practical user impact and risk framing.
- No press-release energy.

## Layout Rhythm

Use shared spacing tokens before adding page-specific padding.

Rules:

- Directory pages should align to one wide canvas.
- Detail pages should use a narrower readable measure.
- Top spacing, section spacing, and bottom spacing should come from shared tokens.
- Avoid stacking wrappers that each add their own left/right padding.
- Cards inside grids should align to the same outer rail as filters, headings, and pagination.
- If one page needs different spacing, document why and consider a named archetype token instead of an inline one-off.

## Component Rules

Use components like a reference product:

- Use tables for structured comparisons and facts.
- Use compact cards for repeated entities.
- Use callouts for important caveats, not routine decoration.
- Use badges for status, category, source type, or freshness.
- Use tabs or segmented controls for mode switches.
- Use icon buttons for compact tooling actions when the icon is familiar.
- Use text buttons for clear commands.
- Do not put cards inside cards.
- Do not make page sections look like floating cards.
- Do not rely on decorative gradients, oversized hero type, or background effects to carry weak information architecture.

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

## Visual Style Guardrails

Avoid:

- AI-purple sameness.
- Generic SaaS landing-page hero sections.
- Decorative card-heavy pages with weak information scent.
- Repeated bento grids that hide priority.
- Large empty margins on one page and tight rails on another.
- Trend terms driving implementation: glassmorphism, neumorphism, cyberpunk, vaporwave, and similar styles must earn their place through user value.
- Text that explains how to use the UI instead of making the UI obvious.

Prefer:

- Clear hierarchy.
- Sharp spacing consistency.
- Tables and lists where they help scanning.
- Subtle motion that responds to navigation or state.
- Durable typography and restrained color.
- Strong contrast in light and dark mode.
- Compact, decision-oriented summaries.

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

Third-party UI/UX skills, design generators, and style libraries can be useful as reviewers. They are not the source of truth for aipedia.

Use them to:

- Audit a page for hierarchy, spacing, contrast, and mobile issues.
- Generate alternative layouts for comparison.
- Stress-test whether a page archetype is clear.
- Build a checklist for a narrow PR.

Do not use them to:

- Replace this doctrine.
- Apply generic palettes, fonts, spacing, or landing-page structures without adapting them.
- Add a new visual style because it appears in a generated recommendation.
- Make every page look like a SaaS homepage.

When an external recommendation conflicts with this doctrine, prefer this doctrine and the existing codebase patterns.

## Pre-PR UI Checklist

Before a UI PR is ready, verify:

- The page follows the correct archetype.
- Gutters, top spacing, section rhythm, and content width match the shared system.
- The page answers at least one of the five north-star questions more clearly than before.
- Desktop and mobile have no overlap, cropped text, broken scroll, or unreadable controls.
- Dark mode still works.
- New components reuse existing patterns unless a new abstraction clearly reduces future inconsistency.
- The changelog has a searchable `DD-MM-YYYY HH:MM TZ` entry.
- The lightest relevant verification command passed, or the failure is clearly reported.
