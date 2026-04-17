---
type: workflow
slug: youtube-content-stack
title: "Solo YouTuber AI Stack: Script, Visuals, Voice, Thumbnails"
seo_title: "Solo YouTuber AI Stack: Script, Visuals, Voice, Thumbnails (April 2026)"
meta_description: "Go from blank page to published YouTube video as a solo operator. 4-5 hours per video, $187/mo stack, exact tool-per-stage breakdown."
description: "Go from blank page to published YouTube video with a single-person team"
stack: [claude, midjourney, elevenlabs, descript, ideogram]
tools_mentioned: [claude, midjourney, elevenlabs, descript, ideogram]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
---

# Solo YouTuber AI Stack: Script, Visuals, Voice, Thumbnails

This stack is for a solo YouTuber publishing 2-4 videos per month on a $187/month tools budget.

Hands-on time per 10-minute video: 4-5 hours, down from a conventional 12-15 hours. Five tools cover script, visuals, voiceover, editing, and thumbnails.

## System Verdict

> **Pick this stack for 2-4 mid-length videos per month with generated voiceover and AI-assisted visuals.** Claude scripts, Midjourney visualizes, ElevenLabs voices, Descript assembles, Ideogram thumbnails.
>
> **Skip it for photoreal-video niches (Midjourney is stylized), human-voice niches (ASMR, meditation, high-end corporate), or daily-publishing cadence.**
>
> **Total cost: $187/month.** Replaces roughly $800-1,800 of freelance work per video.

## Key Facts

| | |
|---|---|
| **Format** | 10-minute video, 800-1,200 word script |
| **Cadence** | 2-4 videos/month |
| **Hands-on time** | 4-5 hours per video |
| **Monthly cost** | $187 |
| **Script model** | Claude Opus 4.7, 1M token context |
| **Visuals** | Midjourney V8 Alpha |
| **Voiceover** | ElevenLabs, cloned Creator voice |
| **Editor** | Descript Standard |
| **Thumbnails** | Ideogram |

## The short version

- Claude Opus 4.7 writes the script and hook variations. Rewrite the opener and CTA by hand. Saves ~30 min.
- Midjourney V8 Alpha generates 8-12 concept images. Pick 3-4 for B-roll or reference. Saves ~45 min.
- ElevenLabs generates a cloned-voice voiceover. Layer with music and sound design. Saves ~60 min.
- Descript assembles video, auto-captions at ~98% accuracy, handles basic color grading. Saves ~30 min.
- Ideogram creates thumbnail variations. Pick one, tweak text in Descript. Saves ~20 min.
- Net time saved per video: ~3 hours. Monthly stack cost: $187.

## The stack

### [Claude Opus 4.7](/tools/claude/) ($20/mo)

Owns script generation and hook ideation.

Inputs: video topic, target audience, desired length (800-1,200 words for a 10-minute video). The 1M-token context window accepts a full channel transcript history as voice reference.

Output is ~70% usable. Always rewrite the first 30 seconds and the CTA by hand; AI hooks feel generic. Claude Pro at $20/mo is sufficient; Max 5x at $100/mo is overkill for this workflow.

### [Midjourney V8 Alpha](/tools/midjourney/) ($30/mo)

Generates visual concepts and B-roll reference images.

Prompt with scene descriptions pulled from the script ("overhead shot of a laptop with code on screen, warm lighting, 4K"). V8 Alpha is faster than V7 and handles text-in-image better, though complex typography still fails.

Typical usage: 8-12 images per video, 3-4 selected. V8 Alpha is on [alpha.midjourney.com](https://alpha.midjourney.com). Standard $30/mo plan covers ~200-250 fast GPU minutes per video.

### [ElevenLabs](/tools/elevenlabs/) ($99/mo)

Owns voiceover generation.

Train a Creator voice clone on 30 minutes of clean narration. Paste script, set speed to 0.95x (slightly slower than natural speech), generate in one pass. Output is ~95% broadcast-ready.

The $99/mo plan includes unlimited generations and voice cloning. This is the single biggest time-saver in the stack.

### [Descript](/tools/descript/) ($24/mo)

Assembles the video.

Import the ElevenLabs voiceover, drag Midjourney images and stock footage onto the timeline. Auto-captions land at ~98% accuracy. Auto-reframe crops footage for vertical clips.

Standard plan at $24/mo covers a solo workflow. Pro at $34/mo adds collaboration; not needed for solo.

### [Ideogram](/tools/ideogram/) ($14/mo)

Owns thumbnail generation.

Prompt with topic plus visual style ("bold red text, shocked face, 3D effect"). Ideogram returns 4-6 options in seconds. April 2026 text rendering reads clearly at 168x94 pixels.

$14/mo plan includes 100 monthly generations. Typical usage: 30-40 per video.

## The workflow, step by step

1. **Script generation (Claude, 20 min).** Open Claude Pro. Paste video topic and target keyword. Prompt: "Write a 1,000-word YouTube script for [topic]. Hook in the first 30 seconds. Tone: conversational, no jargon. Include 3 call-to-action variations at the end." Copy output to a Google Doc. Rewrite paragraph 1 and the CTA by hand.

2. **Visual concept ideation (Midjourney, 15 min).** Extract 4-5 key scenes from the script. For each scene, write a Midjourney prompt: "/imagine [scene description], cinematic, 4K, warm lighting, no text." Generate 2-3 images per scene.

3. **Voiceover (ElevenLabs, 5 min).** Paste final script. Select Creator voice, set speed to 0.95x, generate. Download MP3. Wall-clock is mostly the generation wait.

4. **Thumbnail concepts (Ideogram, 10 min).** Prompt: "YouTube thumbnail for [topic]. Bold text, high contrast, emotional reaction. 1200x675px." Generate 4-6 variations. Download the strongest.

5. **Video assembly (Descript, 25 min).** Create a new Descript project. Import ElevenLabs voiceover as primary track. Drag in Midjourney images plus stock footage (Pexels or Unsplash for filler B-roll). Descript auto-generates captions.

6. **Caption correction and timing (Descript, 15 min).** Read auto-captions. Correct 2-3 errors, usually proper nouns or technical terms. Adjust timing on key phrases to match visual cuts. Add speaker labels if needed.

7. **Thumbnail finalization (Descript, 10 min).** Import Ideogram thumbnail into Descript's text overlay tool. Add final title text. Adjust font size and position for small-size legibility. Export PNG.

8. **Export and upload (15 min).** Export video from Descript at 1080p, 30fps. Upload to YouTube with auto-captions as the subtitle file. Attach thumbnail. Write the description by hand; AI-generated descriptions are too generic.

## Where it breaks

Claude hooks are generic. Opus 4.7 writes competent openers but lacks the specificity that stops a viewer mid-scroll. Skipping the manual rewrite on the first 30 seconds drops CTR by 15-20%.

Midjourney V8 Alpha cannot render logos or branded graphics reliably. Workaround: generate the concept image and add text in Figma or Descript.

ElevenLabs Creator voice does not emphasize key phrases naturally. Re-generating a single sentence with an SSML emphasis marker adds 5-10 minutes per video.

Descript auto-reframe crops out details in corners on vertical clips. Always preview vertical exports before publishing to Shorts.

## Monthly cost

| Tool | Price/mo | Purpose |
|---|---|---|
| Claude Pro | $20 | Script and hook generation |
| Midjourney | $30 | Visual concept generation |
| ElevenLabs | $99 | Voiceover generation |
| Descript | $24 | Video assembly and editing |
| Ideogram | $14 | Thumbnail generation |
| **Total** | **$187** | **Per month** |

*Prices verified 2026-04-17 via vendor pricing pages.*

For comparison: a freelance video editor runs $500-1,500 per video. A voiceover artist runs $100-300 per video. This stack replaces ~$800-1,800 of freelance spend per video for $187/month.

## Who this is for

Copy this stack for 2-4 videos per month, solo operator, looking to cut editing time in half without sacrificing quality. Baseline comfort with pacing, color grading, and caption placement is required; the tools handle generation, not creative direction.

Skip it for photoreal video needs (Midjourney generates stylized images, not stock footage), human-voice niches (ASMR, meditation, high-end corporate), or daily-publishing cadence.

## FAQ

**Can the free tiers cover this workflow?**
Partially, and not at a sustainable cadence. Claude Free caps at 30-100 daily messages depending on complexity. Midjourney has no free tier. ElevenLabs Free caps at 10,000 characters/month (~one short voiceover). Descript Free caps at 3 hours/month. Ceiling hits after one video. Paid tiers are necessary.

**GPT-5.4 instead of Claude for scripts?**
Both work equally well for a single script. Claude's advantage is the 1M-token context window for feeding full channel history as voice reference. For a one-off script, they are interchangeable.

**How is the Creator voice trained?**
Upload 30 minutes of clean audio (no background noise, consistent microphone). ElevenLabs trains the voice model in ~24 hours. Training cost is bundled in the $99/mo plan. Quality lands at ~90%+ match to the source voice given clean input.

**Can the entire workflow run fully automated?**
Partially. Zapier or Make can chain Claude to Midjourney to ElevenLabs to Descript, but creative control drops at each stage. Keep a human in the loop for script approval and thumbnail selection. Full automation saves ~30 minutes at a quality cost that is not worth the tradeoff at this cadence.

## System Notes

This page documents an operational stack verified by the aipedia.wiki editorial pipeline. Last verified 2026-04-17.

## Related

- **Tools:** [Claude](/tools/claude/) · [Midjourney](/tools/midjourney/) · [ElevenLabs](/tools/elevenlabs/) · [Descript](/tools/descript/) · [Ideogram](/tools/ideogram/)
- **Workflows:** [Podcast Automation Stack](/workflows/podcast-automation-stack/) · [Newsletter Stack](/workflows/newsletter-stack/) · [Research Assistant Stack](/workflows/research-assistant-stack/)
