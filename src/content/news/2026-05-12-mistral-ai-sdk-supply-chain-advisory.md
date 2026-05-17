---
type: news
slug: 2026-05-12-mistral-ai-sdk-supply-chain-advisory
title: "Mistral says a TanStack-linked supply-chain attack published compromised Mistral SDK packages"
date: 2026-05-12
severity: major
summary: "Mistral's May 12 advisory says compromised npm and PyPI SDK package versions were briefly published after a TanStack-linked supply-chain attack. Mistral says its infrastructure was not compromised, but developers who installed affected versions should remove them, check lockfiles and build artifacts, and rotate exposed secrets."
categories: [ai-security, ai-developer-tools, ai-infrastructure]
author: "aipedia.wiki Editorial"
last_updated: 2026-05-17
last_verified: 2026-05-17
affects: [mistral-ai]
related_tools: [mistral-ai]
sources:
  - url: https://docs.mistral.ai/resources/security-advisories
    title: "Mistral Docs: Security advisories"
  - url: https://github.com/advisories/GHSA-wx9m-wx4f-4cmg
    title: "GitHub Advisory Database: PyPI mistralai advisory"
  - url: https://github.com/advisories/GHSA-jgg6-4rpr-wfh7
    title: "GitHub Advisory Database: npm @mistralai advisory"
---

# Mistral says a TanStack-linked supply-chain attack published compromised Mistral SDK packages

Mistral published a **May 12, 2026** security advisory for a supply-chain incident that briefly put compromised Mistral SDK packages into npm and PyPI. The company ties the event to the broader TanStack security incident and says an affected developer device was involved.

The important reassurance is narrow, not absolute: Mistral says its forensics found **no compromise of Mistral infrastructure**. The buyer-relevant risk is still real for developers who installed the affected SDK versions during the exposure window, especially Python users on Linux.

## What Mistral says was affected

Mistral's advisory lists these affected versions:

| Ecosystem | Package | Affected versions |
|---|---|---|
| npm | `@mistralai/mistralai` | `2.2.2`, `2.2.3`, `2.2.4` |
| npm | `@mistralai/mistralai-azure` | `1.7.1`, `1.7.2`, `1.7.3` |
| npm | `@mistralai/mistralai-gcp` | `1.7.1`, `1.7.2`, `1.7.3` |
| PyPI | `mistralai` | `2.4.6` |

The npm packages were uploaded on May 11 at 22:45 UTC and removed on May 12 at 01:53 UTC. The PyPI release was uploaded around May 12 at 00:05 UTC and removed on May 12 at 03:05 UTC.

Mistral describes the npm compromise as ineffective because the referenced setup file did not exist. The PyPI package is the more serious path: the advisory says malicious code ran on import, targeted Linux, and spawned a background process to harvest credentials from common locations.

## Buyer take

For AI buyers, this is not a reason to remove Mistral from a shortlist. It is a reason to judge AI model vendors by the same software supply-chain controls used for cloud SDKs, CI images, and developer tools.

If your team uses Mistral SDKs, do three checks:

- Search dependency manifests, lockfiles, package caches, container images, and build artifacts for the affected versions.
- Treat any environment that imported the affected PyPI package as exposed until secrets and tokens reachable from that environment are rotated.
- Add package pinning, artifact provenance, and registry quarantine monitoring to your AI SDK rollout process.

The broader signal is that AI SDKs are now high-value supply-chain targets. A single compromised package can sit at the point where source code, prompts, API keys, production logs, and customer data meet.

## What changed for Mistral's position

Mistral still has a strong open-weight and EU-sovereignty pitch. The incident does not undermine the core model story around Mistral 3, Large 3, Ministral 3, or le Chat.

It does add an operational caveat to procurement. If the reason you pick Mistral is control, then your deployment should actually use that control: pinned versions, private mirrors, software bills of materials, signed artifacts where available, and restricted secrets in local development.

For teams that self-host Mistral models without using the hosted SDKs, this advisory may not touch runtime inference. For teams that integrate through Mistral's Python or JavaScript SDKs, it should trigger a dependency hygiene pass before the next production deploy.

## What to watch next

Watch for a post-incident timeline from Mistral or TanStack, updated GitHub advisories, and whether package-signing or provenance requirements change across AI SDK ecosystems. The next procurement question for every model vendor is no longer only "how good is the model?" It is also "how safe is the software path that gets this model into our systems?"
