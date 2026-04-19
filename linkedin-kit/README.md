# aipedia.wiki LinkedIn Launch Kit

Everything needed to spin up a professional-grade LinkedIn presence for aipedia.wiki in under 60 minutes. Generated 2026-04-19.

## What's in this kit

```
linkedin-kit/
├── README.md                      <- you are here
├── 01-personal-profile.md         <- headline, about, experience, skills
├── 02-company-page.md             <- tagline, about, specialties
├── 03-starter-posts.md            <- 5 ready-to-post pieces for week 1
├── 04-content-playbook.md         <- cadence, hook templates, engagement
└── images/
    ├── profile-photo.png          <- 400x400, personal profile pic
    ├── personal-banner.png        <- 1584x396, personal cover
    ├── company-logo.png           <- 300x300, company page logo
    ├── company-banner.png         <- 1128x191, company page cover
    └── post-template.png          <- 1200x627, reusable share image
```

## Setup order (do this once, ~45 min)

### Step 1 — Personal profile first (priority)

LinkedIn's 2026 algorithm gives **personal profile posts 4-5x more reach** than company-page posts. Personal is where the audience-building happens.

1. Go to linkedin.com, sign up with `mustbearnold@gmail.com` if you don't already have an account
2. Upload **`images/profile-photo.png`** as profile picture
3. Upload **`images/personal-banner.png`** as background cover
4. Paste the **Headline** from `01-personal-profile.md` (line limit 220 chars — the draft uses ~190)
5. Paste the **About section** from the same file (2,600 char limit)
6. Add an Experience entry: position = **"Founder and Editor"**, company = **aipedia.wiki** (this will link to the Company Page you create in Step 2), start date = the month you launched the site
7. Add skills from the skills list
8. Set your custom URL to `linkedin.com/in/benjamin-arnold-aipedia` or similar (Profile → Edit public profile → Edit URL)
9. Turn on Creator Mode (Settings → Account preferences → Creator mode)

### Step 2 — Company page

Personal profile referenced aipedia.wiki as your employer. Now create that company page so the link resolves.

1. LinkedIn home → Work (top right) → Create a Company Page → Company (or Small business)
2. Page name: **aipedia.wiki**
3. LinkedIn public URL: **/company/aipedia-wiki**
4. Website: `https://aipedia.wiki`
5. Industry: **Online Media** (closest match; Technology, Information and Internet also fits)
6. Company size: **1-10 employees** (Solo founder + agentically operated)
7. Company type: **Self-employed** or **Privately held**
8. Tagline: paste from `02-company-page.md`
9. Upload **`images/company-logo.png`** as logo
10. Upload **`images/company-banner.png`** as cover
11. Paste the About section from `02-company-page.md`
12. Add specialties (comma-separated list from `02-company-page.md`)

### Step 3 — Link the two

Open your personal profile → Experience → aipedia.wiki entry → click the Edit icon → the company field should now autocomplete to your new page. Save.

### Step 4 — Post the launch post

Day 0: post the first starter post from `03-starter-posts.md` — the introduction piece. This tells the algorithm what you're about and seeds your first round of impressions.

### Step 5 — Cadence from week 1 onward

Follow the weekly rhythm in `04-content-playbook.md`. Minimum: 3 posts/week personal + 1 repost to the company page.

## Why LinkedIn for aipedia.wiki

**Audience fit is strong.** The aipedia.wiki readers you want are buying AI tools with real money (enterprise buyers, marketing ops, developer team leads, founders, agencies). Those humans live on LinkedIn, not X. LinkedIn also surfaces your posts to the "people researching AI vendors" search audience in a way Google's SERPs do not.

**SEO lift.** A verified company page + a personal profile referencing your site both feed Google's Knowledge Panel signals. Over 3-6 months this nudges Google's understanding of "aipedia.wiki" as a real entity.

**Distribution leverage per post.** LinkedIn rewards honest, sourced analysis — exactly what your site already publishes. You can reskin existing news items as LinkedIn posts in 5 minutes each. See `04-content-playbook.md`.

## Ongoing time budget

- **Week 1:** 2 hours total (setup + 3 launch posts)
- **Week 2+:** 45 minutes/week (3 posts + engagement)

Scale up only if you see traction. Don't over-invest in LinkedIn at the expense of shipping tool reviews and news on the site itself — the site is the asset, LinkedIn is the distribution channel.

## When to revise this kit

- **New logo / brand refresh** → re-run `node scripts/gen-linkedin-kit.mjs`
- **Tool count passes 250, 500, 1000** → update taglines and banners
- **Major product ship** (e.g. benchmarks restored, new category added) → update About sections + post about it
- **Annually** → refresh the cover banner with an updated stat ("250 tools / Daily news / April 2027")

Everything in this kit was built from the same brand primitives the site uses. Colors: violet `#a78bfa`, blue `#60a5fa`, near-black `#0b0a14`. Font: Inter / Geist. Logo: the hexagonal gem.
