export const REQUIRED_ANALYTICS_EVENTS = [
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
] as const;

export type RequiredAnalyticsEventName = typeof REQUIRED_ANALYTICS_EVENTS[number];

export const OPTIONAL_ANALYTICS_EVENTS = [
  'affiliate_cta_view',
  'tool_cta_view',
  'official_cta_view',
  'stack_builder_try_tool_view',
  'stack_builder_try_stack_view',
] as const;

export type OptionalAnalyticsEventName = typeof OPTIONAL_ANALYTICS_EVENTS[number];
export type AnalyticsEventName = RequiredAnalyticsEventName | OptionalAnalyticsEventName;

export type PageType =
  | 'home'
  | 'tool'
  | 'category'
  | 'guide'
  | 'comparison'
  | 'news'
  | 'workflow'
  | 'answer'
  | 'company'
  | 'search'
  | 'stack_builder'
  | 'compare_builder'
  | 'site';

export type DestinationType =
  | 'affiliate'
  | 'official'
  | 'internal'
  | 'tool'
  | 'category'
  | 'comparison'
  | 'guide'
  | 'news'
  | 'workflow'
  | 'answer'
  | 'trend'
  | 'company'
  | 'stack_builder'
  | 'search'
  | 'toc'
  | 'pricing'
  | 'section'
  | 'external';

export type AnalyticsPosition =
  | 'top'
  | 'middle'
  | 'bottom'
  | 'sticky'
  | 'sidebar'
  | 'modal'
  | 'search'
  | 'inline';

export type DeviceContext = 'mobile' | 'tablet' | 'desktop';

export type AnalyticsPrimitive = string | number | boolean | null | undefined;

export interface AnalyticsEventContext {
  event_name?: AnalyticsEventName | (string & {});
  page_type?: PageType | (string & {});
  page_slug?: string;
  page_title?: string;
  source_module?: string;
  destination_type?: DestinationType | (string & {});
  destination_slug?: string;
  destination_url?: string;
  destination_url_domain?: string;
  tool_slug?: string;
  tool_name?: string;
  category_slug?: string;
  comparison_slug?: string;
  comparison_pair?: string;
  guide_slug?: string;
  position?: AnalyticsPosition | (string & {});
  placement?: string;
  cta_placement?: string;
  cta_label?: string;
  device_context?: DeviceContext | (string & {});
  device_type?: DeviceContext | (string & {});
  viewport_width?: number;
  variant?: string;
  timestamp?: string;
  [key: string]: AnalyticsPrimitive;
}

export type AnalyticsPayload = Record<string, Exclude<AnalyticsPrimitive, undefined>>;

export interface AipediaAnalyticsClient {
  track: (eventName: AnalyticsEventName | (string & {}), context?: AnalyticsEventContext) => void;
  flush: () => void;
  consentState: () => 'accepted' | 'rejected' | 'unknown';
  debugEnabled: () => boolean;
}

declare global {
  interface Window {
    aipediaAnalytics?: AipediaAnalyticsClient;
    __aipediaTrack?: AipediaAnalyticsClient['track'];
    __aipediaTrackCommercialCTA?: (name: string, el: Element) => void;
    __aipediaGa4Loaded?: boolean;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}
