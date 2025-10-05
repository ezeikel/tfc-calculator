import { usePostHog } from 'posthog-react-native'

// Define event types for better type safety (mirrored from web app)
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

export type AnalyticsProperties = {
  // Child properties
  child_age?: number
  child_count?: number
  has_child_name?: boolean

  // Payment properties
  payment_amount?: number
  payment_count?: number
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
  screen?: string
  button_location?: string
}

/**
 * Hook to track analytics events with PostHog
 */
export function useAnalytics() {
  const posthog = usePostHog()

  const trackEvent = (
    event: AnalyticsEvent,
    properties?: AnalyticsProperties
  ): void => {
    try {
      // Track with PostHog
      posthog.capture(event, properties || {})

      // Optional: Add console logging in development
      if (__DEV__) {
        console.log(`[Analytics] ${event}`, properties)
      }
    } catch (error) {
      // Silently fail in production, log in development
      if (__DEV__) {
        console.error("[Analytics] Error tracking event:", error)
      }
    }
  }

  return { trackEvent }
}

/**
 * Helper function to calculate analytics properties for children
 */
export function getChildAnalyticsProperties(children: { dateOfBirth?: string, name?: string }[]) {
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