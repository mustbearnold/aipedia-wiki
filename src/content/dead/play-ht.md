---
type: dead
slug: play-ht
title: "Play.ht (Discontinued)"
seo_title: "Play.ht Shutdown & Alternatives (2026) — aipedia.wiki"
meta_description: "Play.ht shut down December 31, 2025 after Meta acqui-hired its team. Migration guide to ElevenLabs, Fish Audio S2, Voxtral, and enterprise TTS alternatives."
author: "aipedia.wiki Editorial"
died: 2025-12-31
cause: acquired
acquired_by: Meta
last_updated: 2026-04-13
---

# Play.ht -- Discontinued

Play.ht was a popular AI text-to-speech and voice cloning platform that ceased operations on December 31, 2025, after Meta acqui-hired its team to build voice capabilities for Meta's AI assistant and Llama ecosystem ([Meta AI](https://ai.meta.com/)). The shutdown was abrupt: users received 90 days notice, cloned voices were non-transferable, and no data export tool was provided for voice models. Play.ht had offered high-quality TTS with multiple voice models (PlayHT 2.0, PlayHT Turbo), voice cloning from short audio samples, API access for developers, and multi-language support across 140+ languages. Pricing ranged from free (limited) to $99 per month. The recommended migration path for former Play.ht users is ElevenLabs ([ElevenLabs](https://elevenlabs.io/)) for best overall quality, Fish Audio S2 ([Fish Audio](https://fish.audio/)) for self-hosted open-source, or Voxtral for the cheapest API pricing ([Mistral AI](https://mistral.ai/)).

## What It Was

Play.ht was a popular AI text-to-speech and voice cloning platform. It offered:

- **High-quality TTS** with multiple voice models (PlayHT 2.0, PlayHT Turbo)
- **Voice cloning** from short audio samples
- **API access** for developers building voice-enabled applications
- **Audio widget** for embedding TTS on blogs and websites
- **Multi-language support** across 140+ languages
- **Podcast creation** tools

Play.ht was widely used by content creators, podcasters, accessibility-focused developers, and businesses needing voice-overs without hiring voice talent. It had a strong developer community and was a common recommendation in the AI voice space.

Pricing ranged from free (limited) to $99/mo for business plans, with API pricing per character.

## What Happened

- **2023-2024:** Play.ht grew steadily, launching PlayHT 2.0 with improved voice quality and the Turbo model for lower latency. Competitive positioning was between ElevenLabs (higher quality, more expensive) and cheaper alternatives.
- **Mid-2025:** Meta acquired the Play.ht team (acqui-hire focused on voice AI talent). Meta was building voice capabilities for its AI assistant and Llama ecosystem.
- **October 2025:** Play.ht announced it would wind down the consumer/API product by end of year. Existing users given 90 days notice.
- **December 31, 2025:** Play.ht ceased operations. API endpoints shut down. All user data (including cloned voices) was deleted per their shutdown notice. No data export tool was provided for cloned voice models.
- **January 2026:** Former Play.ht team members confirmed working on voice AI within Meta's Reality Labs and AI divisions.

The shutdown was abrupt by industry standards. Users who had built products on Play.ht's API were given limited migration time. Cloned voices were non-transferable -- users had to re-clone with a new provider. This caused significant disruption for developers who had integrated Play.ht deeply.

## Migration Guide

Ranked alternatives for former Play.ht users:

### 1. ElevenLabs (Best Overall Replacement)
- **Why:** Closest in quality and feature parity. Better voice quality than Play.ht had. Comprehensive API.
- **Price:** $5-330/mo
- **Migration effort:** Low. API concepts are similar. Voice re-cloning required.
- **Caveat:** More expensive than Play.ht was, especially at volume.

### 2. Fish Audio S2 (Best for Cost / Self-Hosting)
- **Why:** Open-source, self-hostable, no per-character costs. Good quality.
- **Price:** Free (self-hosted)
- **Migration effort:** Medium-High. Requires infrastructure setup. Different API patterns.
- **Caveat:** Fewer features than Play.ht had. No managed platform -- you run everything.

### 3. Voxtral (Best Cheap API)
- **Why:** Mistral's voice model offers competitive quality at low API cost.
- **Price:** Low per-character API pricing
- **Migration effort:** Medium. Newer platform, less documentation.
- **Caveat:** Smaller ecosystem, fewer voices, newer platform with less track record.

### 4. Google Cloud TTS / Amazon Polly (Enterprise Fallback)
- **Why:** Will not disappear. Massive infrastructure backing.
- **Price:** Pay-per-character (cheap at scale)
- **Migration effort:** Low (well-documented APIs).
- **Caveat:** Voice quality is noticeably below Play.ht, ElevenLabs, or Fish Audio. Robotic for long-form content.

## Lessons Learned

1. **Vendor risk is real in AI voice.** Play.ht's shutdown orphaned users with zero voice portability. Cloned voices were locked to the platform.
2. **Acqui-hires kill products.** Meta wanted the team, not the product. Users were collateral.
3. **Self-hosting mitigates shutdown risk.** Fish Audio S2 users will never face this problem -- you own the model, the weights, and the infrastructure.
4. **Always have an exit plan.** If your product depends on a third-party voice API, test with at least one alternative provider and keep your voice training samples accessible.

## Related

- [ElevenLabs vs Fish Audio S2](../comparisons/elevenlabs-vs-fish-audio.md)
- [AI Voice Category](../categories/ai-voice.md)

## Sources
- [ElevenLabs](https://elevenlabs.io/) -- Recommended primary replacement for Play.ht users, offering the closest feature parity and superior voice quality.
- [Fish Audio](https://fish.audio/) -- Open-source TTS alternative allowing self-hosting, eliminating vendor shutdown risk that affected Play.ht users.
