"use client"

import { track } from "@vercel/analytics"
import posthog from "posthog-js"

// Define event types for better type safety
export type AnalyticsEvent =
  // Child management events
  | "child_added"
  | "child_removed"
  | "child_name_updated"
  | "child_age_viewed"

  // Payment events
  | "payment_added"
  | "payment_removed"
  | "payment_dialog_opened"
  | "payment_dialog_cancelled"

  // Calculator interactions
  | "childcare_cost_calculated"
  | "government_topup_calculated"
  | "quarterly_limit_reached"
  | "quarterly_limit_warning"

  // UI interactions
  | "theme_toggled"
  | "payment_history_viewed"
  | "add_child_dialog_opened"
  | "add_child_dialog_cancelled"

  // App store interactions
  | "app_store_clicked"
  | "play_store_clicked"

  // Blog interactions
  | "blog_filter_applied"
  | "blog_filter_cleared"
  | "blog_filter_show_more_clicked"
  | "blog_post_clicked"
  | "blog_post_shared"
  | "blog_try_calculator_clicked"
  | "featured_post_clicked"

  // FAQ interactions
  | "faq_category_selected"
  | "faq_question_opened"
  | "faq_question_closed"
  | "faq_page_viewed"
  | "faq_help_link_clicked"

  // Eligibility interactions
  | "eligibility_page_viewed"
  | "eligibility_scenario_clicked"
  | "eligibility_apply_clicked"
  | "eligibility_calculator_clicked"

  // How It Works interactions
  | "how_it_works_page_viewed"
  | "how_it_works_calculator_clicked"
  | "how_it_works_eligibility_clicked"

  // Examples page interactions
  | "examples_page_viewed"
  | "examples_scenario_viewed"
  | "examples_calculator_clicked"

  // Mistakes page interactions
  | "mistakes_page_viewed"
  | "mistakes_prevention_checklist_viewed"
  | "mistakes_calculator_clicked"

  // Compare page interactions
  | "compare_page_viewed"
  | "compare_scheme_selected"
  | "compare_scheme_deselected"
  | "compare_calculator_clicked"

  // Regional guide interactions
  | "regional_guide_page_viewed"
  | "regional_guide_region_selected"
  | "regional_guide_calculator_clicked"

  // Support page interactions
  | "support_page_viewed"
  | "support_contact_clicked"
  | "support_help_link_clicked"

export type AnalyticsProperties = {
  // Child properties
  child_age?: number
  child_count?: number
  has_child_name?: boolean

  // Payment properties
  payment_amount?: number
  government_topup?: number
  total_quarterly_received?: number
  quarterly_limit_remaining?: number
  payment_description_provided?: boolean

  // Calculator properties
  childcare_cost?: number
  calculated_parent_payment?: number
  calculated_government_topup?: number
  is_over_limit?: boolean

  // Theme properties
  theme?: "light" | "dark"

  // General properties
  page?: string
  button_location?: string

  // Blog properties
  blog_tag?: string
  blog_post_title?: string
  blog_post_slug?: string
  blog_author?: string
  blog_reading_time?: string
  is_featured_post?: boolean
  filtered_posts_count?: number
  share_method?: string

  // FAQ properties
  faq_category?: string
  faq_question?: string
  faq_question_index?: number
  help_link_type?: string

  // Eligibility properties
  scenario_name?: string
  scenario_result?: "eligible" | "not-eligible" | "maybe"
  scenario_index?: number

  // Examples properties
  example_scenario?: string
  example_type?: string

  // Compare properties
  scheme_name?: string
  schemes_selected?: string[]
  comparison_action?: string

  // Regional guide properties
  selected_region?: string

  // Support page properties
  contact_type?: string
}

/**
 * Track analytics events with optional properties
 * Abstracts the underlying analytics provider (Vercel Analytics)
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: AnalyticsProperties
): void {
  try {
    // Convert arrays to strings for Vercel Analytics compatibility
    const vercelProperties = properties ? Object.entries(properties).reduce((acc, [key, value]) => {
      acc[key] = Array.isArray(value) ? value.join(',') : value
      return acc
    }, {} as Record<string, any>) : {}

    // Track with Vercel Analytics
    track(event, vercelProperties)

    // Track with PostHog (supports arrays)
    if (typeof window !== "undefined" && posthog.__loaded) {
      posthog.capture(event, properties || {})
    }

    // Optional: Add console logging in development
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${event}`, properties)
    }
  } catch (error) {
    // Silently fail in production, log in development
    if (process.env.NODE_ENV === "development") {
      console.error("[Analytics] Error tracking event:", error)
    }
  }
}

/**
 * Helper function to calculate analytics properties for children
 */
export function getChildAnalyticsProperties(children: Array<{ dateOfBirth?: string, name?: string }>) {
  const now = new Date()

  return {
    child_count: children.length,
    child_age: children.length > 0 && children[0]?.dateOfBirth ? Math.floor((now.getTime() - new Date(children[0].dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : undefined,
    has_child_name: children.some(child => child.name && child.name.trim().length > 0)
  }
}

/**
 * Helper function to calculate analytics properties for payments
 */
export function getPaymentAnalyticsProperties(
  amount: number,
  governmentTopUp: number,
  quarterlyReceived: number,
  description?: string
) {
  const quarterlyLimit = 500 // £500 quarterly limit per child

  return {
    payment_amount: amount,
    government_topup: governmentTopUp,
    total_quarterly_received: quarterlyReceived,
    quarterly_limit_remaining: Math.max(0, quarterlyLimit - quarterlyReceived),
    payment_description_provided: !!description && description.trim().length > 0,
    is_over_limit: quarterlyReceived >= quarterlyLimit
  }
}

/**
 * Helper function to calculate analytics properties for blog interactions
 */
export function getBlogAnalyticsProperties(
  post?: {
    meta: {
      title: string
      slug: string
      author: { name: string }
      featured?: boolean
    }
    readingTime?: string
  }
) {
  if (!post) return {}

  return {
    blog_post_title: post.meta.title,
    blog_post_slug: post.meta.slug,
    blog_author: post.meta.author.name,
    blog_reading_time: post.readingTime,
    is_featured_post: !!post.meta.featured,
    page: '/blog'
  }
}