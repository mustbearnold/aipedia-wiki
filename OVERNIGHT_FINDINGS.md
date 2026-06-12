# Overnight Staleness & Cross-Reference Sweep — Findings

Run start: 2026-06-13. Mission: systematically fix passed-date framing, dead-tool
recommendations, superseded model references, broken links, and em dashes across
all aipedia content pages. Small verified commits. This file logs anything that
could NOT be safely auto-fixed (ambiguous pricing, judgment calls, needs-a-human).

## Auto-fixed (see git log for full detail)

### Pass 1 — passed-date framing (future tense on now-past dates)
- github-copilot.md (x2): "GitHub will deprecate Grok Code Fast 1 ... on May 15" -> past/reported tense (May 15 passed).
- grok.md: same May 15 Grok Code Fast deprecation -> reported past tense.
- langflow.md: DataStax migration "need to migrate ... by April 9, 2026" -> "had to migrate ... by the April 9 cutoff; data deleted after."
- adobe-firefly.md: April 15 changelog "Public beta in the coming weeks; full demos at Adobe Summit April 19-22" -> past tense (beta opened April, Summit passed).
- grok-code-fast.md: migration bullet "developers will hit broken workflows on May 15 ... before the cutoff" -> present/past (cutoff passed).

### Pass 2 — dead-tool cross-references
- categories/ai-chatbots.md: removed dead Phind from the current AI-search tool list ("Perplexity, Kagi, Exa, Phind" -> "Perplexity, Kagi, Exa"). All other Tome/Phind/DALL-E mentions are correct dead-context (migration sources, sunset notices).

### Pass 3 — superseded model references
- CLEAN. No superseded model framed as current. Spot notes: claude-design.md deliberately keeps "Opus 4.7 (launch model)" with explicit "no verified switch to 4.8" reasoning (correct no-guess behavior); augment-code lists Opus 4.7 as a selectable third-party model menu item (accurate); GPT-4o references are third-party tier claims (Sudowrite/ChatPDF) or the separate GPT-4o transcription line (Whisper) and are left as-is.

### Pass 4 — em dashes in rendered output (hard rule) — HIGH YIELD
Many were invisible to a source grep because they render from `--` (markdown
smartypants) or from layout/component code, not literal em dashes in content:
- ToolLayout.astro + ToolLayout.legacy.astro: CiteThisPage title `${f.title} — Editorial Review` -> `: Editorial Review`. This was on ALL ~260 tool pages.
- SearchModal.astro (global, every page): inline-script JS comment em dash -> comma.
- demo-godtier.astro: page `title` and `terminalTitle` em dashes -> "Claude Code Demo" / "claude · fish".
- llms-full.txt.ts: manifest H1 "# aipedia.wiki — full manifest" -> "# aipedia.wiki full manifest".
- 4 content files used ` -- ` which the markdown pipeline renders as an em dash: companies/google-deepmind.md (3 source-list separators -> ": "), dead/play-ht.md (heading -> "(Discontinued)", 3 sources -> ": "), glossary/index.md (" -- use" -> "; use"), use-cases/best-ai-for-unit-tests.md (**bug**: `npm test -- path` rendered as `npm test — path`, corrupting a real CLI command; wrapped in a code span so the `--` is preserved AND not converted).
- public/robots.txt: two crawler-facing comment em dashes -> hyphens.
- stack-builder.astro: 3 inline-script comment em dashes -> commas.
- Result: 0 visible em dashes on every page type (QA confirmed); only the compare/build empty-cell placeholders remain (see below).
- Left as-is: build-time doc-comment em dashes in .astro/.ts frontmatter (not shipped to HTML).

### Pass 5 — other staleness (quarters, relative time, beta/preview) — CLEAN
- No passed future-quarter framing. "this week"/"last week" are all speed idioms ("ship an MVP this week"), not calendar claims. "as of early 2026" markers are correct GA/establishment history (Firefly Image 5, Eleven v3, Doubao DAU). Ollama "Team coming soon" is vendor-sourced with an explicit June 8 check date and caveats. Nothing to fix.

## Sweep summary (staleness mission)
Passes 1-5 complete. Auto-fixed: 6 passed-date framings, 1 dead-tool cross-ref, and a site-wide em-dash elimination (13 files incl. all ~260 tool-page citations and a real `npm test --` CLI-rendering bug). Passes 3 and 5 confirmed clean. The June sweep + these passes leave the content genuinely current and the rendered output em-dash-free (except the compare-tool empty-cell placeholders, flagged below). Remaining staleness categories needing EXTERNAL data (live pricing re-verification, valuation/funding drift, external-link rot) are out of safe-autonomous scope.

## Needs human review / could not safely auto-fix

- compare/build.astro (lines ~352-389): uses the em-dash glyph "—" as empty-table-cell placeholders (no-value marker), not prose. Left intact to avoid a compare-tool UI change on judgment; convert to "-"/"N/A"/en-dash if you want the hard em-dash rule applied to functional placeholders too.

- claude-design.md backing model: page states Opus 4.7 (launch) with no official source confirming a switch to Opus 4.8. If Anthropic has since documented a Design-specific model upgrade, update lines ~119/154/267. Left unchanged (no source = no claim).
- GPT-4o on third-party tools (sudowrite Basic tier, chatpdf): unverifiable whether these vendors migrated off GPT-4o after its Feb 2026 retirement. Left as vendor-stated; revisit if vendor docs are checked.

## Notes

- Build blocker (untracked Jun 11-13 news missing OG) resolved by background process before sweep start.
