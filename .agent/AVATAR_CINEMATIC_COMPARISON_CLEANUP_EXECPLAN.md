# Avatar And Cinematic Video Comparison Cleanup ExecPlan

### 1. Objective

Clean up weak comparison pages that blur avatar-video platforms, voice tools, and cinematic AI video models. The goal is to protect AiPedia trust, rank for high-intent comparison searches, and route buyers toward the right purchase decision instead of pretending every "AI video" product solves the same job.

### 2. Current state

The comparison collection contains multiple April-era pages with thin copy, stale verification dates, unsupported benchmark claims, and risky statements such as old plan prices, unverified output durations, fake or weak benchmark references, and generic "which is better" language.

Worst batch identified:

- `src/content/comparisons/heygen-vs-kling.md`
- `src/content/comparisons/heygen-vs-runway.md`
- `src/content/comparisons/heygen-vs-pika.md`
- `src/content/comparisons/runway-vs-synthesia.md`
- `src/content/comparisons/pika-vs-synthesia.md`
- `src/content/comparisons/elevenlabs-vs-heygen.md`
- `src/content/comparisons/elevenlabs-vs-synthesia.md`

Related pages that are stronger but still worth rechecking after batch 1:

- `src/content/comparisons/kling-vs-synthesia.md`
- `src/content/comparisons/seedance-vs-synthesia.md`
- `src/content/comparisons/heygen-vs-seedance.md`
- `src/content/comparisons/heygen-vs-synthesia.md`

### 3. Current source checks

Official/current sources checked on 2026-05-08:

- HeyGen pricing: Free, Creator, Pro, Business, Enterprise, avatar counts, language counts, app plan limits, business controls.
- HeyGen Avatar V announcement: current avatar model direction and digital-twin positioning.
- HeyGen developers: V3 API, per-second API pricing, Photo Avatar, Digital Twin, Video Agent, translation, lipsync, and voice API routes.
- Runway pricing: Free, Standard, Pro, Unlimited, Enterprise, Gen-4.5, Gen-4, Aleph, Act-Two, Veo 3.1, third-party video models, credits, storage, and Explore Mode.
- Runway API model docs: `gen4.5`, `gen4_turbo`, `gen4_aleph`, `act_two`, `veo3`, `veo3.1`, `veo3.1_fast`, `gwm1_avatars`, and audio model routes.
- Pika pricing: Basic, Standard, Pro, Fancy, Pika 2.5, Pikascenes, Pikadditions, Pikaswaps, Pikatwists, Pikaffects, Pikaframes, Pikaformance, credits, commercial use.
- Synthesia pricing: Basic, Starter, Creator, Enterprise, credits, avatars, API access, SCORM, SSO, brand kits, collaboration, AI dubbing, and enterprise controls.
- Synthesia Express-2 announcement: Express-2 avatar engine, 1080p/30fps output, full-body gestures, identity consistency, long-form avatar-video positioning, consent/governance claims.
- Kuaishou Kling 3.0 launch: Video 3.0 and Video 3.0 Omni, native audio, multimodal input/output, reference consistency, in-video editing, multi-shot storytelling, up to 15-second generation.
- ElevenLabs pricing and model docs: Free through Enterprise pricing, Eleven v3, Flash v2.5, Multilingual v2, Scribe v2, music, voice cloning, credits, commercial license from Starter.

### 4. Scope

Batch 1 included:

- Rebuild the worst avatar-vs-cinematic pages:
  - `heygen-vs-kling.md`
  - `heygen-vs-runway.md`
  - `heygen-vs-pika.md`
  - `runway-vs-synthesia.md`

Batch 2 planned:

- Rebuild remaining avatar/voice boundary pages:
  - `pika-vs-synthesia.md`
  - `elevenlabs-vs-heygen.md`
  - `elevenlabs-vs-synthesia.md`

Batch 3 planned:

- Recheck stronger pages and add official sources where needed:
  - `kling-vs-synthesia.md`
  - `seedance-vs-synthesia.md`
  - `heygen-vs-seedance.md`
  - `heygen-vs-synthesia.md`

Excluded:

- Any schema change.
- Any route rename.
- Any unsupported hands-on benchmark claim.
- Any current pricing claim not backed by an official source checked on 2026-05-08.

### 5. Acceptance criteria

- Each edited page uses `last_verified: 2026-05-08`.
- Each edited page clearly distinguishes avatar presenter workflows from cinematic scene generation, social effects, production workspace, or voice-only workflows.
- No edited page keeps stale "April 2026" framing, fake benchmark claims, old pricing, fake VBench links, or unsupported quality percentages.
- Each edited page includes Quick Answer, Winner By Use Case or Decision Snapshot, pricing/access guidance, who should choose each tool, bottom line, FAQ, and official sources.
- Edited pages build through the shared comparison template with canonical fact tables and tracked CTAs.
- Relevant checks pass after each batch.

### 6. Verification commands

- Focused content audit for edited files.
- `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs`
- `node --test tests/scripts/audit-commercial-cta.test.mjs`
- `npm run test:scripts`
- `npm run check`
- `npm run build:fast`
- Browser and viewport QA for edited routes.

### 7. Progress log

- 2026-05-08: Created plan after inspecting comparison routes, weak avatar/cinematic comparison files, current tool records, and official vendor sources.
- 2026-05-08: Completed batch 1 rewrites for `heygen-vs-kling.md`, `heygen-vs-runway.md`, `heygen-vs-pika.md`, and `runway-vs-synthesia.md`.
- 2026-05-08: Removed stale April-era copy, unsupported benchmark/quality claims, old plan assumptions, and fake/weak benchmark references from batch 1.
- 2026-05-08: Focused content audit passed for batch 1: all four pages have `last_verified: 2026-05-08`, `last_updated: 2026-05-08`, required buyer sections, official source links, and more than 1,000 words of decision content.
- 2026-05-08: Verification passed for batch 1: `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs tests/scripts/audit-commercial-cta.test.mjs`, `git diff --check` for edited files, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
- 2026-05-08: Browser and Playwright viewport QA passed for `/compare/heygen-vs-kling/`, `/compare/heygen-vs-runway/`, `/compare/heygen-vs-pika/`, and `/compare/runway-vs-synthesia/` at 360, 390, 430, 768, and 1024 px: no horizontal overflow, one `comparison_hero_winner` CTA per route, four tracked commercial CTAs per route, mobile fact cards visible through 820 px, desktop fact table visible at 1024 px, and no stale `April 2026` or `VBench` copy.
- 2026-05-08: Completed batch 2 rewrites for `pika-vs-synthesia.md`, `elevenlabs-vs-heygen.md`, and `elevenlabs-vs-synthesia.md`; updated `elevenlabs.md` because official ElevenLabs current product pages now expose Image to Video in ElevenCreative, making the previous no-video-generation fact stale.
- 2026-05-08: Focused content audit passed for batch 2: all three comparison pages use `last_verified: 2026-05-08`, current official sources, buyer-oriented Quick Answer and use-case sections, and more than 1,000 words of decision content; the ElevenLabs tool record now cites the current Image to Video page and keeps voice/audio as the core positioning.
- 2026-05-08: Verification passed for batch 2: `node --test tests/scripts/comparison-layout-mobile-decision.test.mjs tests/scripts/audit-commercial-cta.test.mjs`, `git diff --check` for edited files, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
- 2026-05-08: Browser and Playwright viewport QA passed for `/compare/pika-vs-synthesia/`, `/compare/elevenlabs-vs-heygen/`, `/compare/elevenlabs-vs-synthesia/`, and `/tools/elevenlabs/` at 360, 390, 430, 768, and 1024 px: no horizontal overflow, comparison hero CTA present once per comparison route, tracked commercial CTA payloads present, mobile comparison fact cards visible through 820 px, desktop fact table visible at 1024 px, and no stale `April 2026` or `No native video generation` copy.
- 2026-05-08: Completed batch 3 recheck for `kling-vs-synthesia.md`, `seedance-vs-synthesia.md`, `heygen-vs-seedance.md`, and `heygen-vs-synthesia.md`; added official Kuaishou Kling 3.0 and ByteDance Seedance 2.0 source framing, corrected stale HeyGen free-plan copy to 1 video per month up to 3 minutes, and updated Synthesia monthly/annual pricing language.
- 2026-05-08: Focused content audit passed for batch 3: updated comparison/tool records have `last_verified: 2026-05-08`, current official pricing/model sources, no stale `Seedance 3.1`, fake benchmark, April framing, or old HeyGen free-plan copy, and the comparison records remain above 1,000 words of buyer decision content.
- 2026-05-08: Verification passed for batch 3: focused Node content audit, `node --test tests\scripts\comparison-layout-mobile-decision.test.mjs tests\scripts\audit-commercial-cta.test.mjs`, `git diff --check` for edited batch files, `npm run test:scripts`, `npm run check`, and `npm run build:fast`.
- 2026-05-08: Browser and Playwright viewport QA passed for `/compare/kling-vs-synthesia/`, `/compare/seedance-vs-synthesia/`, `/compare/heygen-vs-seedance/`, `/compare/heygen-vs-synthesia/`, `/tools/heygen/`, and `/tools/synthesia/` at 360, 390, 430, 768, and 1024 px: no horizontal overflow, comparison hero CTA present once per comparison route, tracked commercial CTA payloads present, mobile comparison fact cards visible through 820 px, desktop fact table visible at 1024 px, and no stale Seedance/HeyGen pricing copy.

### 8. Final report

Pending.
