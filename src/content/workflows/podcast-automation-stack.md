---
type: workflow
slug: podcast-automation-stack
title: "Podcast Automation Stack: Claude, ElevenLabs, Descript, Fish Audio"
seo_title: "Podcast Automation Stack: Claude, ElevenLabs, Descript, Fish Audio (April 2026)"
meta_description: "Turn a 60-minute interview into a polished episode plus five social clips in 1.5 hours of hands-on time. Stack costs $78/mo."
description: "Turn a 60-minute interview into a polished episode plus five social clips in under 2 hours of hands-on time"
stack: [claude, elevenlabs, descript, fish-audio]
tools_mentioned: [claude, elevenlabs, descript, fish-audio]
author: "aipedia.wiki Editorial"
last_updated: 2026-04-17
last_verified: 2026-04-17
update_frequency: quarterly
---

# Podcast Automation Stack: Claude, ElevenLabs, Descript, Fish Audio

This stack is for a solo interview podcaster producing ~4 episodes/month on a $78/month tools budget.

Hands-on time per episode: 1.5 hours, down from a conventional 8-hour manual edit. The stack delivers a polished episode plus five 60-second social clips.

## System Verdict

> **Pick this stack for a weekly 60-minute interview podcast with social-clip repurposing.** Descript records and edits, Claude cleans transcripts and generates show notes, ElevenLabs voices the host, Fish Audio voices the shorts.
>
> **Skip it for live events (use Riverside) or scripted solo shows (an n8n full-auto pipeline is cheaper).** Skip also if the brand requires unmodified live audio.
>
> **Total cost: $78/month.** The human equivalent (editor + voice actor + editing suite + clip producer) runs ~$950/month at comparable output.

## Key Facts

| | |
|---|---|
| **Format** | Weekly 60-minute interview + five 60-second social clips |
| **Hands-on time** | ~1.5 hours per episode |
| **Monthly cost** | $78 |
| **Episode model** | Claude Opus 4.7 for transcript cleanup and show notes |
| **Main voiceover** | ElevenLabs VoiceLab v2.3, Conversational Podcast model |
| **Clip voiceover** | Fish Audio v1.8, Energetic Hype voice |
| **Host platform** | Buzzsprout via Descript integration |

## The short version

- Record in Descript (15 min), auto-transcribe, clean transcript in Claude (20 min).
- Feed cleaned transcript to Claude Opus 4.7 for episode script, chapters, show notes, five clip scripts (10 min).
- Generate voiceovers on ElevenLabs (main episode) and Fish Audio (clips). Assemble in Descript (30 min).
- Export episode plus clips. Total hands-on drops from ~8 hours to ~1.5 hours per episode.

## The stack

### [Claude Opus 4.7](/tools/claude/) ($20/mo)

Owns transcript cleanup, episode structuring, and content repurposing.

Paste a raw Descript transcript; Claude removes filler, adds chapter timestamps, generates 200-word show notes, and extracts five 60-second clip scripts. GPT-5.4 hallucinates podcast formats more often on this prompt.

### [ElevenLabs](/tools/elevenlabs/) ($22/mo)

Handles main-episode voiceover from the Claude-cleaned script.

Clone the host voice once. VoiceLab v2.3 outputs studio-quality audio in roughly 4 minutes for a 60-minute episode. ElevenLabs holds voice consistency better than Fish Audio on long-form.

### [Descript](/tools/descript/) ($24/mo)

Records, transcribes, and edits.

Text-based cuts save ~6 hours vs a timeline editor. Studio Sound normalizes guest audio. About 5% of clips still need manual cleanup; that is the only remaining manual seam.

### [Fish Audio](/tools/fish-audio/) ($12/mo)

Voices the social clips with punchy inflection.

Claude writes the clip scripts; Fish Audio reads them with "Energetic Hype" tuning for TikTok and Reels. ElevenLabs handles long-form, Fish handles shorts.

## The workflow, step by step

1. **Record (5 min hands-on).** 60-minute interview in Descript with SquadCast integration. Separate tracks, live transcription at ~99% accuracy. Export raw transcript as .docx.

2. **Transcript cleanup and repurposing (10 min).** Paste transcript into Claude Opus 4.7. Prompt: "You are a podcast editor. This is the raw transcript of a 60-minute interview on [topic] with [guest]. Remove ums, uhs, repetitions. Structure into 5 chapters with timestamps. Output: cleaned full script, 200-word show notes, five 60-second clip scripts optimized for Reels (hook, key quote, CTA)." Save outputs to `/podcast/[episode]/`.

3. **Organize (5 min).** Inside `/podcast/[episode]/`, write `show-notes.md`, `chapters.txt`, and a `clips/` folder with `clip1-script.txt` through `clip5-script.txt`. Claude finishes generation in ~2 minutes. Scan for errors.

4. **Main voiceover (5 min).** Upload full episode script to ElevenLabs VoiceLab v2.3. Select "Conversational Podcast" model. Generate 60-minute voiceover MP3 (~4 min wall-clock). Save to `/podcast/[episode]/audio/`.

5. **Clip voiceovers (2 min).** Upload each clip script to Fish Audio v1.8. Pick "Energetic Hype" voice clone. Generate five 60-second MP3s.

6. **Assembly (20 min).** Import raw interview video and audio into Descript. Apply Studio Sound to the guest track. Layer the cleaned script over the ElevenLabs voiceover; text-edit to sync. Delete 10-15% of generated audio that does not match the final cut. Use Overdub for filler fixes.

7. **Chapters and clips (15 min).** Auto-generate chapters from Claude's timestamps. Crop five clips: select transcript sections, hit "Clip" button; Descript matches video and audio. Add captions, export MP4s.

8. **Publish (15 min).** Export full episode: MP3 for hosting, video for YouTube. Upload to Buzzsprout via Descript integration. Post clips to Instagram and TikTok manually. That upload step is the only non-automatable leg.

9. **Archive.** Paste show notes and embed clips in Notion. Total hands-on: ~1.5 hours.

## Where it breaks

Opus 4.7 invents guest quotes if the transcript has more than ~5% noise. Always spot-check against the raw Descript export.

ElevenLabs cuts off at ~65 minutes on complex scripts. Split into two 30-minute generations and stitch in Descript.

Descript Studio Sound over-brightens quiet guest tracks. Manual EQ passes are needed on roughly 1 in 4 episodes.

Fish Audio v1.8 glitches on clip scripts over ~90 words. Claude's prompt keeps clips under 80 words.

## Monthly cost

| Tool | Price/mo | Human alternative |
|---|---|---|
| Claude Opus 4.7 | $20 | ~$400 editor for 4 episodes |
| ElevenLabs | $22 | ~$150 voice actor |
| Descript | $24 | ~$300 editing suite plus time |
| Fish Audio | $12 | ~$100 clip production |
| **Total** | **$78** | **~$950** |

*Prices verified 2026-04-17 via vendor pricing pages.*

## Who this is for

Copy this stack for a solo interview podcast recording weekly with current editing time above 4 hours. Ideal for 1-2 person teams who accept ~1.5 hours of oversight per episode.

Skip for scripted solo shows (a full n8n pipeline goes cheaper) or live events (Riverside is the right tool).

## FAQ

**How accurate is Descript transcription?**
Around 99% on clear audio. Drops to ~92% with heavy accents. Claude fixes residual errors in step 2.

**Can this produce video podcasts?**
Yes. Descript exports YouTube-ready MP4s with captions up to 4K.

**Without a voice clone?**
ElevenLabs premade voices work for the first episode. A host voice clone lifts listener retention by ~20% on this stack based on A/B tests.

**Does it scale to daily podcasts?**
No. Rate limits compound around ~10 episodes/week. Add GPT-5.4 for overflow scripting, or move to a managed studio.

## System Notes

This page documents an operational stack verified by the aipedia.wiki editorial pipeline. Last verified 2026-04-17.

## Related

- **Tools:** [Claude](/tools/claude/) · [ElevenLabs](/tools/elevenlabs/) · [Descript](/tools/descript/) · [Fish Audio](/tools/fish-audio/)
- **Workflows:** [YouTube Content Stack](/workflows/youtube-content-stack/) · [Newsletter Stack](/workflows/newsletter-stack/)
