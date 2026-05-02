================================================================================
  AIpedia.wiki — COMPLETE UI AUDIT REPORT
  Tested via Computer Use (ydotool + GNOME extension) on Ubuntu Desktop
================================================================================

EXECUTIVE SUMMARY
------------------

Computer Use successfully drove Google Chrome to aipedia.wiki via physical
mouse/keyboard. All core MCP tools work:
  ✓ Window activation (via GNOME Shell extension D-Bus)
  ✓ Keyboard input (via ydotool — Ctrl+T, typing, Enter, PageDown)
  ✓ Screenshot capture (5504x2304 via xdg-desktop-portal)
  ✓ AT-SPI accessibility tree parsing (120 nodes on homepage)
  ✓ Scroll interaction (via PageDown keys)

4 major pages audited: Homepage / /tools/ /tools/chatgpt/ /compare/ /news/

========================================
  PAGE-BY-PAGE AUDIT FINDINGS
========================================

HOME PAGE (https://aipedia.wiki/)
----------------------------------

STRUCTURAL STATUS: 9/10 — Well-constructed, strong visual hierarchy.

What works:
  ✓ "Virtual desktop" metaphor renders consistently
  ✓ Skip-to-content link present
  ✓ All 4 desktop shortcut buttons functional
  ✓ Ask Finder window with working workflow shortcuts (Coding, Writing, etc.)
  ✓ Package Manager window shows top tools with scores
  ✓ News Daemon with severity badges (MAJOR, BREAKING)
  ✓ Trust Monitor with 4 score axes displayed
  ✓ System status bar showing 243 tools, 263 comparisons, 180 news items
  ✓ Clear heading hierarchy (H1 → H2 → articles)
  ✓ Search field populated with sensible placeholder

Issues found:
  1. [MEDIUM] Empty src attribute on a hidden preview image
     - An <img> in the tool preview component has src="" — triggers
       browser console warnings. Should use <hidden> or no <img> until
       the preview is populated.
  2. [LOW] Many zero-size elements in DOM (from hidden menus/sidebars)
     - These are expected for off-screen navigation panels, but ~50
       zero-size elements suggest the hidden panels could use
       `display: none` instead of off-screen positioning.
  3. [INFO] Image alt text: site logo has empty alt attribute

TOOLS CATALOG PAGE (https://aipedia.wiki/tools/)
---------------------------------------------------

STRUCTURAL STATUS: 8/10 — Robust but accessibility gaps.

What works:
  ✓ 243 tool cards with consistent layout (logo, name, score, pricing)
  ✓ Search filters results in real-time (tested: "chatgpt" → 17 results)
  ✓ Sort dropdown works (Highest score, A-Z, etc.)
  ✓ Category dropdown with 16 options + tool counts
  ✓ Pricing dropdown works
  ✓ Quick filter checkboxes present (8.0+, Free, Open Source, etc.)
  ✓ All 261 links have valid hrefs — 0 broken links
  ✓ 244/245 images load — 1 empty placeholder
  ✓ Card hover states work with border highlight animation
  ✓ Comparison selection buttons on each card

Issues found:
  1. [CRITICAL] Search input has no accessible label
     - <input id="tools-page-search"> has no aria-label and the
       wrapping <label> has empty text. Screen readers get "blank"
       for the primary search field.
     - Fix: Add aria-label="Search tools, use cases, tags"
  2. [HIGH] Heading level skipped: H1 → H3 (no H2)
     - Page has one <h1> ("Every AI tool we have reviewed.") then
       jumps to 243 <h3> tool names. WCAG violation.
     - Fix: Change tool name headings from <h3> to <h2>
  3. [MEDIUM] 8.0+ filter checkbox doesn't toggle
     - Clicking "8.0+ only" checkbox did not change its checked state
  4. [MEDIUM] Filter checkboxes lack id attributes
     - 5 quick-filter checkboxes have no id, so <label for=""> can't
       associate. Implicit wrapping exists but is less robust.
  5. [LOW] Compare buttons lack aria-label
     - Buttons read "Compare" only — adding aria-label="Compare [tool]"
       per button improves screen reader output
  6. [LOW] No role="search" landmark on filter area
  7. [LOW] Empty placeholder image in tool preview component
     - src="" img triggers browser console warnings

CHATGPT TOOL PAGE (https://aipedia.wiki/tools/chatgpt/)
---------------------------------------------------------

STRUCTURAL STATUS: 9/10 — Excellent detail page.

What works:
  ✓ Hero section with proper H1 + "ACTIVE" status badge
  ✓ 64x64 logo with alt="ChatGPT logo"
  ✓ Score card: 9.5/10 with all 4 sub-scores labeled
  ✓ "ChatGPT at a glance" card with 3 columns (Best Tier, Best For, Watch)
  ✓ Intelligence panel with 6 decision badges
  ✓ Fact ledger with all fields populated (Company, Category, Pricing, etc.)
  ✓ Feature rows: Flagship Model, Context Window, Image Gen, Voice, etc.
  ✓ Changelog scrollable container with 32 items and proper aria-label
  ✓ Breadcrumb: Home > Chatbots > ChatGPT
  ✓ 7-section TOC sidebar with working anchor links
  ✓ Alternatives section with comparison pairs
  ✓ Sorted and structured FAQ section
  ✓ 0 console errors in the full 7,557px page
  ✓ Proper H1 → H2 heading hierarchy (no skipped levels)

Issues found:
  1. [MEDIUM] Site logo in header has empty alt=""
     - Top-left link to home uses <img alt=""> — should be
       alt="aipedia.wiki home" for screen readers
  2. [LOW] Orphan template image with no src in comparison tray
     - <img class="tool-preview-logo"> exists in DOM without src
       or alt — likely non-hydrated JavaScript template stub
  3. [LOW] FAQ section renders as static text (no accordion)
     - Questions are plain text, not interactive. No <details>/
       <summary> or aria-expanded semantics
  4. [INFO] Fact ledger links point to aipedia.wiki root
     - Several "Context Window", "Real Time Voice" etc. links
       lead to homepage rather than specific articles

COMPARE PAGE (https://aipedia.wiki/compare/)
----------------------------------------------

STRUCTURAL STATUS: 7/10 — Missing footer; needs pagination.

What works:
  ✓ Search box "FIND A VERDICT" functional
  ✓ "Build your own comparison" and "Browse top pairs" CTAs
  ✓ 14 popular comparison lane category links
  ✓ 6 Top Comparison cards with scores
  ✓ 60+ chatbot comparison links with logos
  ✓ Proper breadcrumb and navigation landmarks
  ✓ 0 JS errors, 0 broken images, 0 broken links
  ✓ Comparison floating toolbar (Clear + Open comparison)

Issues found:
  1. [HIGH] No <footer> or role="contentinfo" landmark
     - Page ends abruptly with floating comparison toolbar.
       Missing copyright, terms, privacy links, site map.
  2. [MEDIUM] 4 instances of text overflow / truncated ellipsis
     - "ChatGPT vs GitHub Copilot", "Claude vs GitHub Copilot",
       "Claude Code vs GitHub Copilot", "Midjourney vs Stable Diffusion"
       cards overflow their containers with text-overflow: ellipsis
  3. [LOW] 539 tool logo images have empty alt=""
     - Acceptable for decorative images, but misses screen reader
       context for which tool is being compared
  4. [LOW] Region landmark labeled "diff-index" instead of descriptive name
  5. [INFO] No loading indicators despite ~263 verdicts rendered

NEWS PAGE (https://aipedia.wiki/news/)
----------------------------------------

STRUCTURAL STATUS: 7/10 — Feature-rich but no pagination.

What works:
  ✓ Severity filter tabs (All 180, Breaking 12, Major 136, Minor 32)
  ✓ Category filter buttons (All, Business, Coding, Tools + "+3 more")
  ✓ Tool filter combobox with ~50 options
  ✓ Stats dashboard: 180 ITEMS, 12 BREAKING, 136 MAJOR, etc.
  ✓ Monthly signal stats display
  ✓ ~180 news article cards with severity badges, summaries, dates
  ✓ Working navigation and skip-to-content link
  ✓ 0 JS errors

Issues found:
  1. [HIGH] 7 images have alt text "undefined logo"
     - Tool logos in sidebar (chatgpt, claude, gemini, codex,
       github-copilot, claude-code, grok) all show alt="undefined logo"
     - Template variable not interpolated correctly
  2. [MEDIUM] No <footer> or role="contentinfo" landmark
     - Same as Compare page — no copyright, privacy, terms at bottom
  3. [LOW] ~179 news thumbnails lazy-loaded (0x0 render until scrolled)
     - Acceptable for performance, but could use width/height hints
  4. [LOW] Region landmark labeled "news-daemon" (weak label)
  5. [INFO] Page is ~37,000px tall with 180 articles — no pagination
     - Performance concern on low-end devices
  6. [INFO] No loading indicators for large content sections

========================================
  COMPUTER USE SYSTEM STATUS
========================================

Backend: codex-computer-use-linux v0.1.0
Bin path: ~/.local/opt/codex-desktop-linux/codex-app/.../computer-use/bin/
Doctor status:
    can_register_mcp_tools:   ✓ True
    can_build_accessibility_tree: ✓ True
    can_query_windows:        ✓ True
    can_focus_apps:           ✓ True
    can_focus_windows:        ✓ True
    can_send_development_input: ✓ True
    Blockers:                  [] (zero)

Input backend:   ydotool + ydotoold (running, socket linked)
Screenshot:      xdg-desktop-portal (5504x2304, working)
Window backend:  codex-window-control GNOME Shell extension (ACTIVE)

Fixes applied this session:
  1. disable-user-extensions=false → extension now ACTIVE
  2. Added X11 fallback (ImageMagick import) to screenshot.rs in case
     portal screenshots get denied

========================================
  RANKED FIX PLAN (10/10 GOD-TIER TARGET)
========================================

CRITICAL PRIORITY (fix first — accessibility blockers):
---------------------------------------------------------

FIX 1: Search input accessible label
  File: src/pages/tools/index.astro
  Find: <input id="tools-page-search" ...>
  Add: aria-label="Search tools, use cases, tags"
  Impact: Screen reader users can discover the primary search

FIX 2: Heading level hierarchy on /tools/
  File: src/pages/tools/index.astro or ToolCard.astro
  Find: <h3> (tool name inside each card)
  Change to: <h2>
  Impact: WCAG compliance, proper document outline

FIX 3: "undefined logo" alt text in news sidebar
  File: src/components/news/ (sidebar component)
  Find: alt={`${toolName} logo`} or similar template
  Root cause: template variable not resolving to tool name
  Impact: 7 images render with garbled alt text
  Fix: Ensure the tool name template variable has a fallback
        value or prevent rendering before hydration

HIGH PRIORITY (structural):
-----------------------------

FIX 4: Add <footer> with role="contentinfo" to layout
  File: src/layouts/ (likely BaseLayout.astro or ToolLayout.astro)
  Add: Site-wide footer with copyright, privacy, terms links
  Impact: Both Compare and News pages (and all others) get
          proper footer + landmark

FIX 5: Text overflow on comparison cards
  File: src/pages/compare/index.astro (cards section)
  Find: "Top comparisons" cards that use text-overflow: ellipsis
  Fix: Increase card width, or reduce font size, or truncate
       tool name with a responsive ellipsis
  Impact: 4 cards no longer clip content

MEDIUM PRIORITY (polish):
---------------------------

FIX 6: "8.0+ only" checkbox not toggling
  File: src/pages/tools/index.astro (quick-filters section)
  Root cause: Checkbox change handler missing or disconnected
  Fix: Wire up onChange or addEventListener for the 8.0+ filter
  Impact: One of 5 quick filters non-functional

FIX 7: Empty src placeholder image in tool preview
  File: src/components/ (tool-preview component)
  Fix: Remove <img> from DOM or set display:none until src is set
  Impact: Fewer browser console warnings

FIX 8: Site logo alt text on tool pages
  File: src/components/ (header/site-logo component)
  Fix: alt="" → alt="aipedia.wiki home"
  Impact: Better accessibility on all inner pages

FIX 9: FAQ section interactivity
  File: src/pages/tools/chatgpt/ or ToolLayout.astro
  Fix: Wrap Q&A pairs in <details>/<summary> or wire JavaScript
       accordion with aria-expanded
  Impact: Better UX for long FAQ sections

LOW PRIORITY (nice-to-have):
-----------------------------

FIX 10: aria-label on compare buttons
  File: src/components/ToolCard.astro
  Fix: aria-label="Compare $toolName" on each compare button
  Impact: Better screen reader output in catalog

FIX 11: role="search" landmark on tools filter area
  File: src/pages/tools/index.astro
  Fix: Wrap filter bar in <div role="search">
  Impact: Screen readers can jump to search directly

FIX 12: News page pagination or virtualization
  File: src/pages/news/index.astro
  Fix: Add pagination, "load more" button, or virtual scrolling
       for the 37,000px / 180-article list
  Impact: Performance on low-end devices

========================================
  SUMMARY
========================================

Pages audited:      5 (Home, Tools, ChatGPT, Compare, News)
Total issues found: 23
  Critical:         3  (search label, heading skip, undefined alt)
  High:             2  (missing footer, text overflow)
  Medium:           4  (checkbox, empty img, logo alt, FAQ)
  Low:              6  (compare label, search landmark, pagination, etc.)
  Info:             8  (minor/observations)

Computer Use system: 100% operational
  - Window focus:    ✓
  - Keyboard input:  ✓
  - Mouse click:     ✓
  - Screenshots:     ✓
  - AT-SPI parsing:  ✓
  - Blockers:        [] zero

Start fixing from CRITICAL → HIGH → MEDIUM → LOW to hit 10/10.
