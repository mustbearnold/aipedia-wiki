---
type: tool
slug: amazon-q
title: Amazon Q Developer
tagline: AWS-native AI coding assistant with deep integration into IAM, CloudFormation, CDK, and the AWS SDK. Evolved from CodeWhisperer.
category: ai-coding
company: amazon-web-services
url: https://aws.amazon.com/q/developer/
pricing_model: freemium
price_range: "$0-$19/user/month"
status: active
launched: 2023-11
last_updated: 2026-05-04
last_verified: 2026-05-04
update_frequency: monthly
affiliate:
  has_program: false
  commission: null
  cookie_days: null
  network: null
  link: null
scores:
  utility: 7
  value: 8
  moat: 7
  longevity: 8
facts:
  best_for:
    value: Best for AWS-heavy engineering teams that want code assistance, cloud troubleshooting, and AWS service context inside
      the same assistant family.
    source: https://aws.amazon.com/q/developer/
    source_label: Amazon Q Developer official site
    source_id: amazon-q-official
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  pricing_anchor:
    value: Amazon Q Developer has a free tier and paid Pro pricing; check AWS pricing for current seat, usage, and feature limits.
    source: https://aws.amazon.com/q/developer/pricing/
    source_label: Amazon Q Developer pricing
    source_id: amazon-q-pricing
    verified_at: '2026-05-04'
    volatility: high
    confidence: high
    next_review_at: '2026-08-04'
  coding_agent:
    value: Amazon Q Developer is a coding and software-development assistant with AWS-specific features, not a general chatbot
      replacement.
    source: https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html
    source_label: Amazon Q Developer docs
    source_id: amazon-q-docs
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  enterprise_controls:
    value: Enterprise fit is strongest when IAM, AWS admin controls, and cloud-development workflows are already central to
      the team.
    source: https://aws.amazon.com/q/developer/features/
    source_label: Amazon Q Developer features
    source_id: amazon-q-features
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
  watch_out_for:
    value: Amazon Q Developer is less compelling as a standalone editor assistant for teams outside AWS; compare against GitHub
      Copilot, Cursor, Windsurf, and Claude Code by IDE and cloud context.
    source: https://aws.amazon.com/q/developer/
    source_label: Amazon Q Developer official site
    source_id: amazon-q-official
    verified_at: '2026-05-04'
    volatility: medium
    confidence: high
    next_review_at: '2026-11-04'
tags: [ai-coding, aws, cloud, autocomplete, ide-plugin, codewhisperer, enterprise, iam, cloudformation, cdk]
seo_title: "Amazon Q Developer: Review & Pricing (April 2026)"
meta_description: "Amazon Q Developer is AWS's AI coding assistant. Free tier 50 agentic chat interactions per month; Pro $19/user/mo for 1,000 agentic requests and 4,000 LOC transformation. Best on AWS-heavy stacks."
author: "aipedia.wiki Editorial"
best_for:
  - teams building on AWS (IAM, CDK, CloudFormation, Lambda)
  - Java or .NET modernization on AWS
  - security scanning tied to deployed AWS workloads
  - AWS Console in-browser assistance
not_best_for:
  - teams working outside AWS
  - general-purpose coding where Copilot is stronger
  - IDE-first autonomous multi-file editing (Cursor wins)
quick_answer: >-
  Amazon Q Developer is AWS's AI coding assistant, evolved from CodeWhisperer. Free tier caps agentic chat at 50 per month plus 1,000 LOC transformation; Pro is $19/user/month for 1,000 agentic requests and 4,000 LOC transformation. Pick it for AWS-native work (IAM, CDK, CloudFormation); skip for general coding where GitHub Copilot at $10/month wins.
price_history:
  - date: 2024-04-30
    plan: "Pro"
    price: "$19/user/mo"
    source: "https://aws.amazon.com/q/developer/pricing/"
    source_label: "Source"
    source_id: amazon-q-pricing
    note: "Introduced with Q Developer rebrand from CodeWhisperer."
  - date: 2026-04-17
    plan: "Pro"
    price: "$19/user/mo"
    source: "https://aws.amazon.com/q/developer/pricing/"
    source_label: "Source"
    source_id: amazon-q-pricing
    note: "Verified unchanged."
---

# Amazon Q Developer

AWS's AI coding assistant, evolved from CodeWhisperer in April 2024. Available inside VS Code, JetBrains IDEs, the AWS Management Console, and the AWS CLI. Provides inline code completion, codebase-aware chat, security scanning, and automated Java and .NET modernization.

Free tier is perpetual with a monthly cap. Pro tier is $19 per user per month with higher limits and enterprise controls.

## System Verdict

> **Pick Amazon Q Developer if AWS is the core of the stack.** No other assistant matches its native understanding of IAM policies, CloudFormation templates, CDK constructs, and the AWS SDK. The AWS Console chat answers service-specific questions without tab-switching to docs.
>
> Security scanning flags OWASP Top 10 issues and hardcoded credentials with fix suggestions. Code transformation automates Java version upgrades (Java 8 or 11 to 17 or 21) and .NET modernization to AWS patterns.
>
> **Skip it if the codebase lives outside AWS.** [GitHub Copilot](/tools/github-copilot/) at $10 per user per month remains stronger for general coding across languages, frameworks, and non-AWS infrastructure. [Cursor](/tools/cursor/) still leads on multi-file autonomous edits.
>
> **Who pays which tier:** Free for casual exploration (50 agentic chats per month), Pro $19 per user per month for serious AWS work with security scanning and transformation, Enterprise via AWS contract for volume and admin controls.

## Key Facts

| | |
|---|---|
| **Lineage** | Replaced CodeWhisperer in April 2024 |
| **IDE support** | VS Code, JetBrains family, AWS Console, AWS CLI |
| **Free tier** | 50 agentic chat interactions/mo, 1,000 LOC transformation/mo, unlimited autocomplete |
| **Pro tier** | $19/user/mo. 1,000 agentic requests/mo, 4,000 LOC transformation/mo, admin controls, IAM Identity Center SSO |
| **Transformation overage** | $0.003 per LOC above Pro allocation |
| **Security scanning** | OWASP Top 10, hardcoded credentials, fix suggestions |
| **IP indemnification** | Yes, matching GitHub Copilot's policy |
| **Underlying models** | Undisclosed by AWS |

Every data point above was verified against vendor documentation on 2026-04-17. See Sources.

## What it actually is

An AWS-tuned AI coding assistant layered onto inline autocomplete, codebase chat, security scanning, and code transformation. The differentiator is depth of AWS knowledge, not breadth.

Inside VS Code and JetBrains, Q Developer behaves like Copilot: inline suggestions, chat panel, and a growing agentic mode for multi-step tasks. Inside the AWS Console, it answers questions about services, permissions, and deployment state. Inside the AWS CLI, the `/q` commands produce and explain shell syntax.

The moat is AWS-native context. IAM policy drafting, CDK construct patterns, Lambda handler boilerplate, and CloudFormation YAML all ship with better first-pass quality than a generic tool offers.

## When to pick Amazon Q Developer

- **Infrastructure-as-code on AWS dominates daily work.** CDK, CloudFormation, Terraform-on-AWS, and IAM policy editing benefit directly.
- **Java 8 or 11 modernization is on the backlog.** The transformation agent upgrades codebases to Java 17 or 21 with Pro's 4,000 LOC per month allocation.
- **.NET apps need to move to AWS idioms.** Automated migration shifts .NET Framework code to .NET 8 on AWS.
- **Security scanning belongs inside the IDE loop.** OWASP Top 10 and credential-leak detection with fix suggestions catch issues pre-commit.
- **AWS Console is where the work happens.** Chat surfaces service docs and deployment troubleshooting without tab-switching.
- **IP indemnification is required.** Amazon indemnifies generated code against copyright claims, matching GitHub Copilot.

## When to pick something else

- **General-purpose coding outside AWS:** [GitHub Copilot](/tools/github-copilot/) at $10/user/mo. Broader language and framework coverage, cheaper.
- **AI-native IDE with multi-file agentic edits:** [Cursor](/tools/cursor/). Composer handles refactors Q Developer cannot.
- **Free autocomplete, no AWS needs:** [Codeium](/tools/codeium/). Free for individuals, no AWS lock-in.
- **Terminal-first autonomous coding on Anthropic models:** [Claude Code](/tools/claude-code/). $100 to $200 per month, much deeper agentic loop.
- **Heavy [ChatGPT](/tools/chatgpt/) Codex user already:** ChatGPT Pro bundles Codex, and Operator Mode covers agentic workflows beyond coding.

## Pricing

| Plan | Price | Key limits |
|------|-------|-----------|
| Free | $0 | 50 agentic chat interactions/mo, 1,000 LOC transformation/mo, unlimited autocomplete |
| Pro | $19/user/mo | 1,000 agentic requests/mo, 4,000 LOC transformation/mo, admin controls, SSO (IAM Identity Center), data isolation, IP indemnity |
| Transformation overage (Pro) | $0.003/LOC | Beyond the 4,000 LOC monthly allocation |

*Prices verified 2026-04-17 via [aws.amazon.com/q/developer/pricing](https://aws.amazon.com/q/developer/pricing/) and the [Q Developer tiers docs](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-tiers.html).*

## Against the alternatives

| | Amazon Q Developer Pro | GitHub Copilot Pro | Cursor Pro | Claude Code |
|---|---|---|---|---|
| **Price** | $19/user/mo | $10/user/mo | $20/user/mo | $100-$200/user/mo |
| **AWS-native depth** | **Strongest** | Weak | Weak | Weak |
| **General coding quality** | Mid | Strong | **Strongest** (multi-file agent) | Strong (CLI) |
| **Multi-file agentic edits** | Limited | Growing | **Strongest** (Composer) | Strong (Claude Code) |
| **Security scanning** | Built-in, OWASP | Available, GitHub Advanced Security | Via extensions | Via tools |
| **Language breadth** | AWS-centric | Broadest | Broadest | Broad |
| **IP indemnification** | Yes | Yes | No | Contractual |
| **Best viewed as** | AWS specialist | General default | AI-native IDE | Anthropic-native agent |

## Failure modes

- **Free tier caps hit fast.** 50 agentic chats per month is one or two days of real usage. Free is a trial, not a production tier.
- **Weaker outside AWS.** General-purpose coding quality trails [GitHub Copilot](/tools/github-copilot/) on non-AWS code.
- **Transformation overage bills separately.** Heavy Java or .NET migration workloads can exceed 4,000 LOC per user per month and trigger $0.003 per extra LOC charges.
- **JetBrains support trails VS Code.** Parity is close but updates land on VS Code first.
- **Underlying models are undisclosed.** AWS does not publish which foundation model powers Q Developer, making behavior changes hard to predict.
- **Multi-file autonomous editing is limited.** [Cursor](/tools/cursor/) Composer and Claude Code both handle bigger refactors.
- **Console chat quality varies by service.** Mature AWS services have better coverage than new or niche offerings.

## Methodology

This page was produced by the aipedia.wiki editorial pipeline, an automated system that ingests vendor documentation, verifies pricing and product details against primary sources, and generates the editorial analysis shown. No individual human wrote this review. Scoring follows the four-dimension rubric at [/about/scoring/](https://aipedia.wiki/about/scoring/) (Utility × Value × Moat × Longevity, unweighted average). Last verified 2026-04-17 against [Amazon Q Developer pricing](https://aws.amazon.com/q/developer/pricing/), the [Q Developer tiers docs](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-tiers.html), and the [Amazon Q Developer FAQ](https://aws.amazon.com/q/developer/faqs/).

## FAQ

**Is Amazon Q Developer the same as CodeWhisperer?**
Q Developer replaced CodeWhisperer in April 2024. It adds chat, code transformation, and AWS Console integration on top of the autocomplete and security scanning CodeWhisperer offered. Existing users migrated automatically.

**Does the free tier support real usage?**
For casual exploration, yes. For daily work, no. 50 agentic chat interactions per month is one or two days of real development.

**Does Q Developer work outside AWS?**
Yes. Autocomplete and chat function on any codebase. The AWS-specific advantage (IAM, CDK, CloudFormation, Lambda) is absent on non-AWS work, so [GitHub Copilot](/tools/github-copilot/) at $10 per month delivers better value there.

**Is code transformation worth the Pro upgrade alone?**
If the backlog has Java 8 or 11 upgrades or .NET Framework migrations, yes. 4,000 LOC per month per user covers a meaningful chunk of migration work; overage is $0.003 per LOC.

**Does Amazon Q Developer provide IP indemnification?**
Yes. AWS indemnifies generated code against third-party copyright claims, matching GitHub Copilot's policy.

## Sources

- [Amazon Q Developer pricing](https://aws.amazon.com/q/developer/pricing/): tier structure, limits, overage
- [Q Developer tiers documentation](https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-tiers.html): Free and Pro feature comparison
- [Amazon Q Developer FAQ](https://aws.amazon.com/q/developer/faqs/): transformation scope, IP indemnification
- [Amazon Q Developer product page](https://aws.amazon.com/q/developer/): capability overview and IDE support

## Related

- **Category:** [AI Coding](/categories/ai-coding/)
