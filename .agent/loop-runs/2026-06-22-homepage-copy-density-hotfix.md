# 2026-06-22 Homepage Copy Density Hotfix

## Trigger

Matt reported that the front page had too much text and that the homepage should use smart, direct one-liners without generic AI tells.

## Scope

- Route: `/`
- Primary file: `src/pages/index.astro`
- Canonical ledger: `PAGE_REFRESH_LEDGER.md`
- Continuity docs: `.agent/CURRENT_STATUS.md`, `.agent/PLANS.md`, `.agent/WORK_LOG.md`

## Changes

- Tightened the hero tagline to a direct decision-use case line.
- Removed visible homepage portal descriptions so the six portal cards are labels, counts, and destinations only.
- Replaced featured decision-path catalog blurbs with homepage-specific one-line summaries.
- Removed top-tool taglines from the homepage section.
- Removed latest-news summaries from the homepage and shortened two long homepage news labels.
- Shortened the verified-guide panel copy and lane labels.
- Shortened the editorial trust panel copy.
- Left the deeper source-backed pages intact so the homepage stays compact without losing crawlable depth elsewhere.

## Verification

- `npm run ledger:pages`
- `npm run typecheck`
- `npm run build:fast`
- `npm run qa:route -- --route / --widths 319,360,390,430,768,1024,1366 --site-dir dist-fast/client`
- `rg -n "agentically|Product, model, pricing, funding|Choose the closest intent|These guides separate|gt-news-summary|gt-wiki-portal small|gt-tool-tagline|buyerFit|Verdicts, pricing notes|Short verdict pages|AI copy tells|generic AI" dist-fast\client\index.html src\pages\index.astro`
- `npm run ledger:pages:check`
- `node scripts/guard-em-dashes.mjs`
- `git diff --check`
- Live app-browser DOM check at `http://127.0.0.1:4321/?brand-check=lantern&copy-check=compact2` on the 319 px viewport.

## Browser Findings

- No horizontal overflow at the inspected 319 px viewport.
- No visible homepage leaf text over 90 characters in the inspected main content.
- No `.gt-wiki-portal small`, `.gt-news-summary`, or `.gt-tool-tagline` nodes remain on the homepage.
- Decision-path summaries are compact one-line copy.
- The homepage still exposes current news, decision paths, verified-guide links, and trust copy.

## Residual Risk

None known for the copy-density hotfix. The broader June 21 to June 22 freshness goal remains active.
