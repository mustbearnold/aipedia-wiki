import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

const dateish = z.union([z.string(), z.date()]).optional();

const toolFact = z.object({
  value: z.string(),
  source: z.string().optional(),
  source_id: z.string().optional(),
  source_label: z.string().optional(),
  evidence: z.array(z.object({
    source_id: z.string().optional(),
    url: z.string().optional(),
    label: z.string().optional(),
    quote: z.string().optional(),
    captured_at: dateish,
  })).optional(),
  verified_at: dateish,
  note: z.string().optional(),
  status: z.enum(['current', 'unclear', 'deprecated']).optional(),
  confidence: z.enum(['low', 'medium', 'high']).optional(),
  volatility: z.enum(['low', 'medium', 'high']).optional(),
  next_review_at: dateish,
  review_interval_days: z.number().optional(),
}).passthrough();

const toolFacts = z.object({
  flagship_model: toolFact.optional(),
  context_window: toolFact.optional(),
  pricing_anchor: toolFact.optional(),
  free_plan: toolFact.optional(),
  best_paid_tier: toolFact.optional(),
  api_available: toolFact.optional(),
  image_generation: toolFact.optional(),
  video_generation: toolFact.optional(),
  real_time_voice: toolFact.optional(),
  web_browsing: toolFact.optional(),
  coding_agent: toolFact.optional(),
  enterprise_controls: toolFact.optional(),
  data_retention_or_privacy: toolFact.optional(),
  open_source_or_local: toolFact.optional(),
  best_for: toolFact.optional(),
  watch_out_for: toolFact.optional(),
}).passthrough().optional();

const guideDecisionPick = z.object({
  tool: z.string(),
  label: z.string().optional(),
  plan: z.string().optional(),
  reason: z.string(),
  sources: z.array(z.object({
    label: z.string(),
    url: z.string().url(),
  })).optional(),
}).passthrough();

const decisionPick = z.object({
  tool: z.string(),
  label: z.string(),
  reason: z.string(),
  plan: z.string().optional(),
  source_refs: z.array(z.string()).min(1),
  verified_at: z.union([z.string(), z.date()]),
  confidence: z.enum(['high', 'medium', 'low']),
});

const categoryTopPick = z.union([
  z.string(),
  z.object({
    tool: z.string(),
    label: z.string().optional(),
    reason: z.string().optional(),
  }).passthrough(),
]);

/* ------------------------------------------------------------------ */
/*  Tools                                                              */
/* ------------------------------------------------------------------ */

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/tools' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    tagline: z.string().optional(),
    category: z.string().optional(),
    secondary_categories: z.array(z.string()).optional(),
    company: z.string().optional(),
    url: z.string().optional(),
    // Optional GitHub repository URL. When present, scripts/fetch-github-stats.mjs
    // can refresh the committed stats snapshot or the ignored build-time stats
    // override rendered by components/GithubStats.astro on the tool page.
    github_url: z.string().url().optional(),
    pricing_model: z.enum(['free', 'freemium', 'paid', 'enterprise', 'open-source']).optional(),
    price_range: z.string().optional(),
    status: z.enum(['active', 'beta', 'dead', 'acquired']).optional(),
    launched: z.union([z.string(), z.number()]).optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
    affiliate: z.object({
      has_program: z.boolean().optional().nullable(),
      commission: z.string().optional().nullable(),
      cookie_days: z.number().optional().nullable(),
      network: z.string().optional().nullable(),
      link: z.string().optional().nullable(),
      // Internal application pipeline tracking. Never surfaced in UI;
      // lets us audit who we've applied to, who approved, who rejected.
      application_status: z.enum(['none', 'applied', 'approved', 'rejected', 'paused']).optional().nullable(),
      applied_date: z.union([z.string(), z.date()]).optional().nullable(),
      approved_date: z.union([z.string(), z.date()]).optional().nullable(),
      notes: z.string().optional().nullable(),
    }).optional().nullable(),
    scores: z.object({
      utility: z.number().optional(),
      value: z.number().optional(),
      moat: z.number().optional(),
      longevity: z.number().optional(),
    }).optional(),
    facts: toolFacts,
    tags: z.array(z.string()).optional(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    quick_answer: z.string().optional(),
    best_for: z.array(z.string()).optional(),
    not_best_for: z.array(z.string()).optional(),
    price_history: z.array(z.object({
      date: z.union([z.string(), z.date()]).transform((d) => d instanceof Date ? d.toISOString().split('T')[0] : String(d)),
      plan: z.string().optional(),
      price: z.string(),
      source: z.string().optional(),
      source_id: z.string().optional(),
      source_label: z.string().optional(),
      verified_at: dateish,
      note: z.string().optional(),
    })).optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/categories' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    tool_count: z.number().optional(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
    top_picks: z.object({
      best_overall: categoryTopPick.optional(),
      budget: categoryTopPick.optional(),
      pro_team: categoryTopPick.optional(),
    }).passthrough().optional(),
    decision_picks: z.array(decisionPick).optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Comparisons                                                        */
/* ------------------------------------------------------------------ */

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/comparisons' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    tools: z.array(z.string()).optional(),
    category: z.string().optional(),
    winner: z.string().optional(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
    canonical_fact_table: z.boolean().optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Trends                                                             */
/* ------------------------------------------------------------------ */

const trends = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/trends' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    timeframe: z.string().optional(),
    impact: z.enum(['high', 'medium', 'low']).optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Companies                                                          */
/* ------------------------------------------------------------------ */

const companies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/companies' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    company_type: z.enum(['startup', 'bigtech', 'acquired', 'dead']).optional(),
    founded: z.union([z.string(), z.number()]).optional(),
    hq: z.string().optional(),
    funding: z.string().optional(),
    key_products: z.array(z.string()).optional(),
    last_updated: dateish,
    update_frequency: z.string().optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Use Cases (also includes stacks)                                   */
/* ------------------------------------------------------------------ */

const useCases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/use-cases' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    tools_mentioned: z.array(z.string()).optional(),
    guide_picks: z.object({
      best_overall: guideDecisionPick.optional(),
      budget: guideDecisionPick.optional(),
      pro_team: guideDecisionPick.optional(),
    }).passthrough().optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Dead / Discontinued                                                */
/* ------------------------------------------------------------------ */

const dead = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/dead' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
    died: dateish,
    cause: z.enum(['acquired', 'shutdown', 'pivoted', 'bankrupt', 'divested']).optional(),
    acquired_by: z.string().optional(),
    last_updated: dateish,
  }).passthrough(),
});

/* ------------------------------------------------------------------ */
/*  Glossary                                                           */
/* ------------------------------------------------------------------ */

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/glossary' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string().optional(),
  }).passthrough(),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/reports' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    description: z.string().optional(),
    author: z.string().optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
  }).passthrough(),
});

const workflows = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/workflows' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    description: z.string().optional(),
    stack: z.array(z.string()).optional(),
    tools_mentioned: z.array(z.string()).optional(),
    author: z.string().optional(),
    last_updated: dateish,
    last_verified: dateish,
    update_frequency: z.string().optional(),
  }).passthrough(),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/news' }),
  schema: z.object({
    type: z.string().optional(),
    slug: z.string().optional(),
    title: z.string(),
    date: z.union([z.string(), z.date()]).transform((d) => d instanceof Date ? d.toISOString().split('T')[0] : String(d)),
    severity: z.enum(['minor', 'major', 'breaking']).optional(),
    summary: z.string().optional(),
    affects: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    author: z.string().optional(),
    last_updated: dateish,
    last_verified: dateish,
    // Optional hero image URL shown at the top of the article. Use real
    // source images only (vendor screenshots, chart embeds, official press
    // photos). Never stock photos. Accepts absolute URLs or /-rooted
    // paths; /og/tools/<slug>.png is a reasonable default when the tool
    // page's OG card is thematically relevant.
    hero: z.object({
      url: z.string(),
      alt: z.string(),
      credit: z.string().optional(),
      credit_url: z.string().optional(),
    }).optional(),
    // Optional list of tool slugs to surface as a visual card strip at the
    // top of the article. Distinct from `affects:` which drives the news
    // xref audit. Use `related_tools` when you want a visible "these are
    // the tools to know for this story" rail without triggering the
    // xref cascade discipline.
    related_tools: z.array(z.string()).optional(),
    sources: z.array(z.object({
      url: z.string(),
      title: z.string().optional(),
    })).optional(),
  }).passthrough(),
});

/* Benchmarks collection retired 2026-04-18. The three seed benchmark files
   (coding-same-task, image-generator-grid, tts-blind-comparison) presented
   detailed timing and scoring data that was never actually produced. Removed
   along with the /benchmarks/ routes. If real benchmark infrastructure is
   ever built, this collection can be re-added. */

/* ------------------------------------------------------------------ */
/*  Export                                                              */
/* ------------------------------------------------------------------ */

export const collections = {
  tools,
  categories,
  comparisons,
  trends,
  companies,
  'use-cases': useCases,
  dead,
  glossary,
  reports,
  workflows,
  news,
};
