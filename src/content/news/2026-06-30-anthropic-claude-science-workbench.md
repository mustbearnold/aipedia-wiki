---
type: news
slug: 2026-06-30-anthropic-claude-science-workbench
title: "Anthropic launches Claude Science, a research workbench with 60-plus database integrations"
date: 2026-06-30
severity: major
summary: "Anthropic launched Claude Science, a beta research app for Pro, Max, Team, and Enterprise plans that runs multi-step scientific workflows across genomics, proteomics, and cheminformatics with auditable outputs. It also opened a grant program offering up to $30,000 in credits for up to 50 research projects."
categories: [ai-research, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-06-30
last_verified: 2026-06-30
related_tools: [claude]
sources:
  - url: https://www.anthropic.com/news/claude-science-ai-workbench
    title: "Anthropic: Claude Science, an AI workbench for scientists"
  - url: https://www.anthropic.com/events/the-briefing-ai-for-science
    title: "Anthropic: The Briefing, AI for Science"
  - url: https://www.technologyreview.com/2026/06/30/1139987/claude-science-is-anthropics-newest-flagship-product/
    title: "MIT Technology Review: Claude Science is Anthropic's newest flagship product"
---

# Anthropic launches Claude Science, a research workbench with 60-plus database integrations

Anthropic introduced Claude Science on June 30, 2026, positioning it as a Claude Code equivalent for scientific research. The app consolidates literature review, multi-step analysis, figure and manuscript generation, and compute management into one environment, with a coordinating agent that has more than 60 pre-configured skills and connectors into scientific databases such as UniProt, PDB, Ensembl, and ChEMBL.

The launch happened alongside Anthropic's "AI for Science" livestreamed briefing, where the company showed the tool alongside life-sciences executives and research institutions.

## What changed

- Claude Science is in beta for Claude Pro, Max, Team, and Enterprise plans.
- It runs on Claude's existing models rather than shipping a new model.
- It is pre-configured for genomics, single-cell analysis, proteomics, structural biology, and cheminformatics, and can natively render 3D protein structures, genome tracks, and chemical structures.
- A reviewer agent flags citation errors and calculation discrepancies in generated work, and a session-forking feature supports comparative analysis.
- It can run locally on macOS or Linux, remotely via SSH, or through HPC login nodes, and can connect to lab-specific pipelines and proprietary tools.
- Team users at academic institutions and nonprofits get discounted pricing through a dedicated research lab program.
- Anthropic is funding up to 50 "Claude Science AI for Science" projects with up to $30,000 in Claude credits each, plus up to $2,000 in Modal compute credits per project. Applications close July 15, 2026, awards are announced July 31, and funded projects run September 1 through December 1, 2026.

## Buyer signal

Anthropic is explicitly framing scientific research the same way it framed software engineering with Claude Code: hand a capable agent high-level instructions and let it execute multi-step work autonomously, with auditability built in through reproducible code and message history. Early testimonials cited by Anthropic, including Manifold Bio and the Allen Institute's Jérôme Lecoq, describe the difference from a general coding assistant as end-to-end execution, meaning the agent gathers its own data and applies domain judgment rather than just writing code on request.

For research organizations already paying for [Claude](/tools/claude/) seats, Claude Science is a beta feature rather than a new subscription, which lowers the adoption barrier. The open question is how it performs on proprietary lab pipelines outside the pre-configured domains, and whether the reviewer agent catches errors reliably enough to trust in publication workflows.

## What to do

- If your organization already has Claude Pro, Max, Team, or Enterprise seats, check whether Claude Science beta access is enabled for your plan.
- Academic and nonprofit teams should ask about the discounted research lab program pricing before assuming standard Team pricing applies.
- Labs interested in funded pilot projects should review the July 15 application deadline and the September to December project window.
- Treat outputs from the reviewer agent as a first pass, not a substitute for standard peer review or lab validation, especially in early beta.

## AiPedia take

Claude Science extends Anthropic's playbook of turning a general model into a domain-specific agent platform, following the same pattern as Claude Code. The 60-plus database integrations and auditability focus suggest Anthropic is targeting pharma and biotech budgets specifically, which lines up with the grant program's early emphasis on biology and biomedical research. It is a beta, so buyers should expect rough edges, but the direction is a credible bet on [AI Research](/categories/ai-research/) tooling as the next growth line beyond coding agents.
