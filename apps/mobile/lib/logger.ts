import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type LogContext = {
  screen?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  deviceInfo?: {
    platform: string;
    version?: string;
    model?: string;
  };
  networkInfo?: {
    connected: boolean;
    type?: string;
  };
  appInfo?: {
    version: string;
    buildNumber?: string;
    environment: 'development' | 'staging' | 'production';
  };
  [key: string]: unknown;
};

export type LogEntry = {
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
  timestamp: string;
};

class Logger {
  private posthog: unknown = null;
  private sessionId: string = '';

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setPostHog(posthog: any) {
    this.posthog = posthog;
  }

  private generateSessionId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private getBaseContext(): LogContext {
    return {
      sessionId: this.sessionId,
      deviceInfo: {
        platform: Platform.OS,
        version: Platform.Version?.toString(),
      },
      appInfo: {
        version: Constants.expoConfig?.version || '0.1.0',
        environment: __DEV__ ? 'development' : 'production',
      },
    };
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error
  ): LogEntry {
    return {
      level,
      message,
      context: {
        ...this.getBaseContext(),
        ...context,
      },
      error,
      timestamp: new Date().toISOString(),
    };
  }

  private logToConsole(entry: LogEntry) {
    if (!__DEV__) return;

    const prefix = `[${entry.level.toUpperCase()}] ${entry.timestamp}`;
    const contextStr = entry.context ? JSON.stringify(entry.context, null, 2) : '';

    switch (entry.level) {
      case 'debug':
        console.debug(prefix, entry.message, contextStr);
        break;
      case 'info':
        console.info(prefix, entry.message, contextStr);
        break;
      case 'warn':
        console.warn(prefix, entry.message, contextStr, entry.error);
        break;
      case 'error':
        console.error(prefix, entry.message, contextStr, entry.error);
        break;
      default:
        break;
    }
  }

  private logToSentry(entry: LogEntry) {
    try {
      // Set context for Sentry
      if (entry.context) {
        Sentry.setContext('log_context', entry.context);

        if (entry.context.screen) {
          Sentry.setTag('screen', entry.context.screen);
        }

        if (entry.context.action) {
          Sentry.setTag('action', entry.context.action);
        }

        if (entry.context.userId) {
          Sentry.setUser({ id: entry.context.userId });
        }
      }

      switch (entry.level) {
        case 'debug':
        case 'info':
          // Only add as breadcrumbs for context, don't spam Sentry with debug/info
          Sentry.addBreadcrumb({
            message: entry.message,
            level: entry.level,
            data: {
              screen: entry.context?.screen,
              action: entry.context?.action,
              // Only essential context to avoid bloat
            },
          });
          break;
        case 'warn':
          // Warnings are worth reporting to Sentry
          Sentry.captureMessage(entry.message, 'warning');
          break;
        case 'error':
          // Errors and crashes definitely go to Sentry
          if (entry.error) {
            Sentry.captureException(entry.error);
          } else {
            Sentry.captureMessage(entry.message, 'error');
          }
          break;
        default:
          break;
      }
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to log to Sentry:', error);
      }
    }
  }

  private logToPostHog(entry: LogEntry) {
    try {
      if (!this.posthog) return;

      // Only log debug/info to PostHog for analytics
      // Errors/warnings go to Sentry only
      if (entry.level === 'error' || entry.level === 'warn') {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.posthog as any).capture('log_entry', {
        log_level: entry.level,
        log_message: entry.message,
        log_screen: entry.context?.screen,
        log_action: entry.context?.action,
        log_session_id: entry.context?.sessionId,
        ...entry.context,
      });
    } catch (error) {
      if (__DEV__) {
        console.error('Failed to log to PostHog:', error);
      }
    }
  }

  // Logging strategy:
  // - Console: All levels in dev, none in production
  // - Sentry: Breadcrumbs for debug/info, reports for warn/error
  // - PostHog: Only debug/info (errors go to Sentry only)

  debug(message: string, context?: LogContext) {
    const entry = this.createLogEntry('debug', message, context);
    this.logToConsole(entry);
    this.logToSentry(entry); // Breadcrumb only
    this.logToPostHog(entry); // Full analytics
  }

  info(message: string, context?: LogContext) {
    const entry = this.createLogEntry('info', message, context);
    this.logToConsole(entry);
    this.logToSentry(entry); // Breadcrumb only
    this.logToPostHog(entry); // Full analytics
  }

  warn(message: string, context?: LogContext, error?: Error) {
    const entry = this.createLogEntry('warn', message, context, error);
    this.logToConsole(entry);
    this.logToSentry(entry); // Reported as warning
    this.logToPostHog(entry); // Full analytics
  }

  error(message: string, context?: LogContext, error?: Error) {
    const entry = this.createLogEntry('error', message, context, error);
    this.logToConsole(entry);
    this.logToSentry(entry); // Reported as error/exception
    this.logToPostHog(entry); // Full analytics
  }

  // Specialized methods for common scenarios
  purchaseError(message: string, error?: Error, context?: LogContext) {
    this.error(message, {
      error_type: 'purchase',
      ...context,
    }, error);
  }

  networkError(message: string, error?: Error, context?: LogContext) {
    this.error(message, {
      error_type: 'network',
      ...context,
    }, error);
  }

  permissionError(message: string, context?: LogContext) {
    this.error(message, {
      error_type: 'permission',
      ...context,
    });
  }

  // Performance logging
  logPerformance(action: string, duration: number, context?: LogContext) {
    this.info(`Performance: ${action} took ${duration}ms`, {
      action,
      performance_duration_ms: duration,
      ...context,
    });
  }

  // User flow logging
  logUserFlow(step: string, context?: LogContext) {
    this.info(`User flow: ${step}`, {
      user_flow_step: step,
      ...context,
    });
  }
}

// Create singleton instance
const logger = new Logger();

// Export logger instance
export { logger };

/**
 * Hook to use logger with PostHog integration
 *
 * NOTE: For tracking business events (user actions, feature usage),
 * use useAnalytics() from '@/lib/analytics' instead.
 * This logger is for technical logging (errors, debugging, performance).
 */
export function useLogger() {
  // PostHog integration is optional for logger
  // The logger will work without it, focusing on Sentry
  return logger;
}

/**
 * Set PostHog instance for logger (optional)
 * Call this once in your app setup if you want errors logged to PostHog
 */
export function setLoggerPostHog(posthog: unknown) {
  logger.setPostHog(posthog);
}
