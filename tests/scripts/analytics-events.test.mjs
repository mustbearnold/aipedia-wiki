import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const eventsSource = readFileSync('src/lib/analytics/events.ts', 'utf8');
const clientSource = readFileSync('src/lib/analytics/client.ts', 'utf8');
const baseLayoutSource = readFileSync('src/layouts/BaseLayout.astro', 'utf8');
const commercialCtaSource = readFileSync('src/components/CommercialCTA.astro', 'utf8');
const commercialAnalyticsSource = readFileSync('src/components/CommercialAnalytics.astro', 'utf8');
const compareTraySource = readFileSync('src/components/CompareTray.astro', 'utf8');
const stackBuilderSource = readFileSync('src/pages/stack-builder/index.astro', 'utf8');

const requiredEvents = [
  'affiliate_click',
  'tool_cta_click',
  'internal_cta_click',
  'related_tool_click',
  'related_comparison_click',
  'related_guide_click',
  'related_category_click',
  'category_filter_click',
  'category_goal_click',
  'comparison_open',
  'compare_tray_add',
  'compare_tray_remove',
  'compare_tray_open',
  'compare_tray_compare_click',
  'stack_builder_impression',
  'stack_builder_start',
  'stack_builder_step_complete',
  'stack_builder_complete',
  'stack_builder_tool_click',
  'stack_builder_swap_click',
  'site_search_open',
  'site_search_query',
  'site_search_result_click',
  'table_of_contents_click',
  'pricing_jump_click',
  'guide_pick_click',
  'news_related_tool_click',
  'news_related_comparison_click',
  'news_related_guide_click',
  'mobile_sticky_cta_click',
];

test('analytics event layer defines every required buyer-progress event', () => {
  assert.match(eventsSource, /REQUIRED_ANALYTICS_EVENTS/);
  for (const eventName of requiredEvents) {
    assert.match(eventsSource, new RegExp(`'${eventName}'`));
  }
  assert.match(eventsSource, /export interface AnalyticsEventContext/);
  assert.match(eventsSource, /page_type\?/);
  assert.match(eventsSource, /source_module\?/);
  assert.match(eventsSource, /destination_type\?/);
  assert.match(eventsSource, /device_context\?/);
});

test('analytics client is consent-aware, queued, and globally mounted', () => {
  assert.match(clientSource, /CONSENT_STORAGE_KEY = 'aipedia-cookie-consent'/);
  assert.match(clientSource, /consentState\(\) === 'accepted'/);
  assert.match(clientSource, /consentState\(\) === 'rejected'/);
  assert.match(clientSource, /window\.aipediaAnalytics = client/);
  assert.match(clientSource, /window\.__aipediaTrack = track/);
  assert.match(clientSource, /aipedia:analytics-ready/);
  assert.match(clientSource, /data-analytics-event/);
  assert.match(baseLayoutSource, /import AnalyticsLayer/);
  assert.match(baseLayoutSource, /<AnalyticsLayer/);
});

test('commercial, compare tray, and stack builder use the truth-layer events', () => {
  assert.match(commercialCtaSource, /affiliate_click/);
  assert.match(commercialCtaSource, /tool_cta_click/);
  assert.match(commercialCtaSource, /mobile_sticky_cta_click/);
  assert.match(commercialAnalyticsSource, /window\.aipediaAnalytics\.track/);
  assert.match(commercialAnalyticsSource, /guide_pick_click/);
  assert.match(compareTraySource, /compare_tray_add/);
  assert.match(compareTraySource, /compare_tray_remove/);
  assert.match(compareTraySource, /compare_tray_open/);
  assert.match(compareTraySource, /compare_tray_compare_click/);
  assert.match(stackBuilderSource, /stack_builder_impression/);
  assert.match(stackBuilderSource, /stack_builder_start/);
  assert.match(stackBuilderSource, /stack_builder_step_complete/);
  assert.match(stackBuilderSource, /stack_builder_complete/);
  assert.match(stackBuilderSource, /stack_builder_tool_click/);
  assert.match(stackBuilderSource, /stack_builder_swap_click/);
});
