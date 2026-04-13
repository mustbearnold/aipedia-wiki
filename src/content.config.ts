import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/* ------------------------------------------------------------------ */
/*  Shared helpers                                                     */
/* ------------------------------------------------------------------ */

const dateish = z.union([z.string(), z.date()]).optional();

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
    }).optional().nullable(),
    scores: z.object({
      utility: z.number().optional(),
      value: z.number().optional(),
      moat: z.number().optional(),
      longevity: z.number().optional(),
    }).optional(),
    tags: z.array(z.string()).optional(),
    seo_title: z.string().optional(),
    meta_description: z.string().optional(),
    author: z.string().optional(),
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
    cause: z.enum(['acquired', 'shutdown', 'pivoted', 'bankrupt']).optional(),
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
};
