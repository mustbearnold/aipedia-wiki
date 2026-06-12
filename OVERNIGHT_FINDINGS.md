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

## Needs human review / could not safely auto-fix

- claude-design.md backing model: page states Opus 4.7 (launch) with no official source confirming a switch to Opus 4.8. If Anthropic has since documented a Design-specific model upgrade, update lines ~119/154/267. Left unchanged (no source = no claim).
- GPT-4o on third-party tools (sudowrite Basic tier, chatpdf): unverifiable whether these vendors migrated off GPT-4o after its Feb 2026 retirement. Left as vendor-stated; revisit if vendor docs are checked.

## Notes

- Build blocker (untracked Jun 11-13 news missing OG) resolved by background process before sweep start.
