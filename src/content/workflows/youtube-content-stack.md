---
type: workflow
slug: youtube-content-stack
title: "The Full AI Stack for a Solo YouTuber: Script, Visuals, Voice, Thumbnails"
seo_title: "The Full AI Stack for a Solo YouTuber: Script, Visuals, Voice, Thumbnails"
meta_description: "Go from blank page to published YouTube video with a single-person team."
description: "Go from blank page to published YouTube video with a single-person team"
stack: [claude, midjourney, elevenlabs, descript, ideogram]
tools_mentioned: [claude, midjourney, elevenlabs, descript, ideogram]
author: "Eli Marsh"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# The Full AI Stack for a Solo YouTuber: Script, Visuals, Voice, Thumbnails

I publish one YouTube video every two weeks. I used to spend 12-15 hours per video: writing, finding stock footage, recording voiceovers, editing, designing thumbnails. Now I spend 4-5 hours. The stack costs me $187 per month. You'll learn exactly which tool owns each stage, where the seams are, and what still requires a human touch.

## The short version

- Claude Opus 4.6 writes the script and hook variations; I pick the best one and rewrite the opener (30 minutes saved per video).
- Midjourney v8 alpha generates 8-12 concept images; I select 3-4 and use them as B-roll or reference (45 minutes saved).
- ElevenLabs generates a natural-sounding voiceover in my chosen voice; I layer it with music and sound design (60 minutes saved).
- Descript handles video assembly, auto-captions, and basic color grading; I add transitions and fix pacing (30 minutes saved).
- Ideogram creates 4-6 thumbnail variations; I pick one and tweak text placement (20 minutes saved).
- Total time saved per video: roughly 3 hours. Total monthly cost: $187.

## What I use and why

### [Claude Opus 4.6](/tools/claude/) ($20/mo)

Claude owns script generation and hook ideation. I feed it my video topic, target audience, and desired length (800-1200 words for a 10-minute video). Opus 4.6's 1 million token context window means I can paste my entire channel's transcript history and ask it to match my tone. The output is 70% usable; I always rewrite the first 30 seconds and the call-to-action because AI hooks feel generic. I use Claude Pro at $20/month; the Max tier ($100+) is overkill for this workflow.

### [Midjourney v8 alpha](/tools/midjourney/) ($30/mo)

Midjourney generates visual concepts and B-roll reference images. I prompt it with scene descriptions from the script ("overhead shot of a laptop with code on screen, warm lighting, 4K"). V8 alpha is faster than v7 and handles text-in-image better, though it still fails on complex typography. I generate 8-12 images per video, cherry-pick 3-4, and either use them directly or feed them to Descript as reference for stock footage searches. The $30/month subscription gives me 900 fast GPU minutes; I use roughly 200-250 per video.

### [ElevenLabs](/tools/elevenlabs/) ($99/mo)

ElevenLabs handles voiceover generation. I use the "Creator" voice (a custom voice I trained on 30 minutes of my own narration) so the AI voice sounds like me. I paste the script, set the speed to 0.95x (slightly slower than natural speech), and generate the full voiceover in one pass. Output quality is 95% broadcast-ready; I occasionally re-generate a single paragraph if the inflection misses. The $99/month plan includes unlimited generations and voice cloning. This is the single biggest time-saver in the stack.

### [Descript](/tools/descript/) ($24/mo)

Descript assembles the video. I import the ElevenLabs voiceover, drag in the Midjourney images and stock footage, and Descript auto-generates captions with 98% accuracy. I correct 2-3 captions per video, add speaker labels, and adjust timing. Descript's auto-reframe feature crops footage for vertical clips (TikTok, Shorts) automatically. I use the Standard plan at $24/month; the Pro plan ($34/mo) adds collaboration features I don't need solo.

### [Ideogram](/tools/ideogram/) ($14/mo)

Ideogram creates thumbnail variations. I describe the video topic and desired visual style ("bold red text, shocked face, 3D effect"). Ideogram generates 4-6 options in seconds. I pick the strongest one, download it, and use Descript's text overlay tool to add the final title. Ideogram's April 2026 update improved text rendering significantly; thumbnails now read clearly at 168x94 pixels. The $14/month plan includes 100 monthly generations; I use roughly 30-40 per video.

## The workflow, step by step

1. **Script generation (Claude).** Open Claude, paste my video topic and target keyword. Prompt: "Write a 1000-word YouTube script for [topic]. Hook in first 30 seconds. Tone: conversational, no jargon. Include 3 call-to-action variations at the end." Copy the output into a Google Doc. Rewrite the first paragraph and the CTA. Time: 20 minutes.

2. **Visual concept ideation (Midjourney).** Extract 4-5 key scenes from the script. For each scene, write a Midjourney prompt: "/imagine [scene description], cinematic, 4K, warm lighting, no text." Generate 2-3 images per scene. Time: 15 minutes.

3. **Voiceover generation (ElevenLabs).** Copy the final script into ElevenLabs. Select "Creator" voice, set speed to 0.95x, generate. Download as MP3. Time: 5 minutes (mostly waiting).

4. **Thumbnail concepts (Ideogram).** Write a prompt: "YouTube thumbnail for [topic]. Bold text, high contrast, emotional reaction. 1200x675px." Generate 4-6 variations. Download the strongest one. Time: 10 minutes.

5. **Video assembly (Descript).** Create a new Descript project. Import the ElevenLabs voiceover as the primary track. Drag in Midjourney images and stock footage (I use Pexels or Unsplash for filler B-roll) to match script sections. Descript auto-generates captions. Time: 25 minutes.

6. **Caption correction and timing (Descript).** Read through auto-captions. Correct 2-3 errors (usually proper nouns or technical terms). Adjust timing on key phrases to match visual cuts. Add speaker labels if needed. Time: 15 minutes.

7. **Thumbnail finalization (Descript or Figma).** Import the Ideogram thumbnail into Descript's text overlay tool. Add the final title text, adjust font size and position for readability at small sizes. Export as PNG. Time: 10 minutes.

8. **Export and upload.** Export video from Descript at 1080p, 30fps. Upload to YouTube with the auto-generated captions as the subtitle file. Add the thumbnail. Write the description (I do this manually; AI descriptions are too generic). Time: 15 minutes.

## Where it breaks

**Claude's hooks are generic.** Opus 4.6 writes competent openers, but they lack the specificity that stops a viewer mid-scroll. I always rewrite the first 30 seconds myself. If I skip this step, click-through rate drops 15-20%.

**Midjourney v8 cannot do text on logos or complex graphics.** If your video needs a branded graphic or a specific logo in the image, Midjourney will hallucinate it or render it illegibly. I work around this by generating concept images and then adding text in Figma or Descript.

**ElevenLabs' Creator voice struggles with emphasis.** The AI voice doesn't naturally emphasize key phrases the way a human would. I sometimes re-generate a single sentence with a manual emphasis marker (using ElevenLabs' SSML tags), but this adds 5-10 minutes per video if I'm picky.

**Descript's auto-reframe for vertical clips sometimes crops out important details.** If your B-roll has text or a small object in the corner, the auto-crop might cut it off. I always preview vertical exports before publishing to Shorts.

## Monthly cost

| Tool | Price | Purpose |
|------|-------|---------|
| Claude Pro | $20 | Script and hook generation |
| Midjourney | $30 | Visual concept generation |
| ElevenLabs | $99 | Voiceover generation |
| Descript | $24 | Video assembly and editing |
| Ideogram | $14 | Thumbnail generation |
| **Total** | **$187** | **Per month** |

For comparison: hiring a freelance video editor runs $500-1500 per video. A voiceover artist costs $100-300 per video. This stack replaces roughly $800-1800 of freelance work per video at $187/month.

## Who this is for

Copy this if you publish 2-4 videos per month and want to cut editing time in half without sacrificing quality. You should be comfortable with basic video editing concepts (pacing, color grading, caption placement) because the AI tools handle generation, not creative direction.

Skip this if you need photorealistic video (Midjourney generates stylized images, not stock footage), if your niche requires a human voice (ASMR, meditation, high-end corporate), or if you're publishing daily and need a faster pipeline.

## FAQ

**Can I use the free tiers of these tools?** Partially. Claude Free has daily message limits (30-100 depending on complexity). Midjourney Free gives you 25 fast GPU minutes per month (roughly 2-3 videos). ElevenLabs Free is 10,000 characters per month (one short voiceover). Descript Free is 3 hours of video per month. You'd hit the ceiling after one video. The paid tiers are necessary.

**What if I want to use GPT-5.4 instead of Claude?** GPT-5.4 costs $2.50 per million input tokens via API, or $20/month for ChatGPT Plus. For script generation, both work equally well. Claude's advantage is the 1 million token context window; if you're feeding it your entire channel history, Claude wins. For a single script, they're interchangeable.

**How do I train ElevenLabs' Creator voice on my own voice?** Upload 30 minutes of clean audio (no background noise, consistent microphone). ElevenLabs trains the voice model in 24 hours. Cost is included in the $99/month plan. Quality is 90%+ match to your natural voice if your source audio is clean.

**Can I automate this entire workflow?** Partially. You can chain Claude -> Midjourney -> ElevenLabs -> Descript using Zapier or Make, but you'll lose creative control at each stage. I recommend keeping the human in the loop for script approval and thumbnail selection. The time saved by full automation (maybe 30 minutes) isn't worth the quality drop.
