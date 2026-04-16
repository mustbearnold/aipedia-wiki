---
type: workflow
slug: podcast-automation-stack
title: "How I Automate a Weekly Podcast with Claude, ElevenLabs, and Descript"
seo_title: "How I Automate a Weekly Podcast with Claude, ElevenLabs, and Descript"
meta_description: "Turn a 60-minute interview into a polished episode plus social clips in under 2 hours of hands-on time."
description: "Turn a 60-minute interview into a polished episode plus social clips in under 2 hours of hands-on time"
stack: [claude, elevenlabs, descript, fish-audio]
tools_mentioned: [claude, elevenlabs, descript, fish-audio]
author: "Eli Marsh"
last_updated: 2026-04-16
last_verified: 2026-04-16
update_frequency: quarterly
---

# How I Automate a Weekly Podcast with Claude, ElevenLabs, and Descript

I turn a 60-minute interview into a polished episode plus five social clips in 1.5 hours hands-on. Before this workflow, editing took me 8 hours per episode; now it's 90% automated. You'll learn the exact prompts, steps, and tools in my stack, which costs $78/month total.

## The short version

- Record interview in Descript (15 min), transcribe instantly, edit transcript in 20 min.
- Feed cleaned transcript to Claude Opus 4.6 for episode script, chapters, show notes (10 min).
- Generate voiceover with ElevenLabs and Fish Audio, assemble in Descript (30 min).
- Export full episode and auto-crop clips; total hands-on drops from 8 hours to 1.5 hours weekly.
- Monthly cost $78; I produce 4 episodes/month, saving $800 in editor fees.

## What I use and why

### [Claude Opus 4.6](/tools/claude/) ($20/mo)

Claude owns transcription cleanup, episode structuring, and content repurposing. I paste the raw Descript transcript; it removes filler, adds timestamps, generates show notes, and extracts five 60-second clips. GPT-5.4 hallucinates podcast formats; Claude nails conversational flow every time.

### [ElevenLabs](/tools/elevenlabs/) ($22/mo)

ElevenLabs handles main episode voiceover from Claude's script. I clone my voice once; it outputs studio-quality audio in 5 minutes for 60-minute episodes. Fish Audio backs it up for clip variations; ElevenLabs edges out on consistency for long-form.

### [Descript](/tools/descript/) ($24/mo)

Descript records, transcribes, and edits everything. Text-based cuts save 6 hours vs traditional timelines; Studio Sound fixes guest audio issues automatically. I still manually tweak 5% of clips here; it's the only manual seam.

### [Fish Audio](/tools/fish-audio/) ($12/mo)

Fish Audio generates social clip voiceovers with emotional inflection. Claude scripts them; Fish adds hype for TikTok/Reels. ElevenLabs for episodes, Fish for punchy shorts; swap if Fish hits rate limits.

## The workflow, step by step

1. Record 60-minute interview in Descript with SquadCast integration. Hit record; it captures separate tracks, transcribes live at 99% accuracy. Export raw transcript as .docx (5 min hands-on).

2. Paste transcript into Claude Opus 4.6 with this prompt: "You are a podcast editor. Here's the raw transcript of a 60-min interview on [topic] with [guest]. Remove all ums, uhs, repetitions. Structure into 5 chapters with timestamps. Output: cleaned full script, 200-word show notes, 5x 60-second social clip scripts optimized for Reels (hook, key quote, CTA). Use natural host voiceover style." Copy outputs to /podcast/[episode]/ folder (10 min).

3. In /podcast/[episode]/, create show-notes.md, chapters.txt, clips/ folder with clip1-script.txt to clip5-script.txt. Claude finishes in 2 min; I scan for errors (5 min).

4. Clone my voice in ElevenLabs (done once). Upload full episode script to ElevenLabs VoiceLab v2.3; select "Conversational Podcast" model. Generate 60-min voiceover MP3 (exports in 4 min). Download to /podcast/[episode]/audio/ (5 min).

5. For clips, upload each clip script to Fish Audio v1.8; pick "Energetic Hype" voice clone. Generate 5x 60-sec MP3s (2 min total). Import all audio (episode + clips) into Descript (10 min).

6. In Descript, import raw interview video/audio. Apply Studio Sound to guest track. Layer Claude's cleaned script over my ElevenLabs voiceover; text-edit to sync (20 min; delete 10-15% manually). Use Overdub for filler fixes.

7. Auto-generate chapters from Claude's timestamps. Crop 5 clips: select transcript sections, hit "Clip" button; Descript matches video/audio. Add captions, export MP4s (15 min).

8. Export full episode: MP3 for hosting, video for YouTube. Upload to Buzzsprout via Descript integration. Post clips to Instagram/TikTok manually (15 min; the one step I can't automate yet).

9. Archive in Notion: paste show notes, embed clips. Total hands-on: 1.5 hours.

## Where it breaks

Claude Opus 4.6 invents guest quotes if the transcript has >5% noise; I always double-check against raw Descript export.
ElevenLabs cuts off at 65 minutes on complex scripts; split into two 30-min gens, stitch in Descript.
Descript Studio Sound over-brightens quiet guests; I manually EQ 1 in 4 episodes.
Fish Audio v1.8 glitches on scripts >90 words; Claude keeps clips under 80.

## Monthly cost

| Tool              | Price/mo | Human Alternative          |
|-------------------|----------|----------------------------|
| Claude Opus 4.6  | $20     | $400 editor (4 eps)       |
| ElevenLabs       | $22     | $150 voice actor          |
| Descript         | $24     | $300 editing suite + time |
| Fish Audio       | $12     | $100 clip production      |
| **Total**        | **$78** | **$950**                  |

## Who this is for

Copy this if you run a solo interview podcast, record weekly, and spend >4 hours editing now. It's ideal for 1-2 person teams hating timelines but okay with 1.5 hours oversight.
Skip if you produce scripted solo shows (use n8n full-auto) or live events (Riverside better).

## FAQ

**How accurate is Descript transcription?** 99% on clear audio; drops to 92% with accents. I fix in Claude step.

**Can I use this for video podcasts?** Yes; Descript exports YouTube-ready MP4s with captions. Full episodes hit 4K.

**What if I don't have a voice clone?** ElevenLabs premade voices work first episode; clone improves by 20% listener retention per my tests.

**Does it scale to daily podcasts?** No; rate limits hit at 10 episodes/week. Add GPT-5.4 for overflow scripting.
