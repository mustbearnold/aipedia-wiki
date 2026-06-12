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

## Needs human review / could not safely auto-fix

_(none yet)_

## Notes

- Build blocker (untracked Jun 11-13 news missing OG) resolved by background process before sweep start.
