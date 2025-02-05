import * as Sentry from '@sentry/react';
import {
    APP_ENVIRONMENT,
    IS_DISABLE_SENTRY,
    SENTRY_DSN,
    SENTRY_TRACES_SAMPLE_RATE,
} from '@breef/shared/constants';
import { ExtraErrorData } from '@sentry/integrations';
import { Integrations } from '@sentry/tracing';

/**
 * Initialize error logging service.
 * Catches all unhandled errors
 * @param configuration
 */
export function initializeErrorLogging() {
    Sentry.init({
        dsn: SENTRY_DSN,
        integrations: [
            new Integrations.BrowserTracing(),
            new ExtraErrorData({ depth: EXTRA_DEPTH }),
        ],
        normalizeDepth: EXTRA_DEPTH + 1,
        environment: APP_ENVIRONMENT,
        autoSessionTracking: true,
        tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
        enabled: !IS_DISABLE_SENTRY,
        ignoreErrors: [/Abort route change. Please, ignore this error/],
    });
    Sentry.addBreadcrumb({
        category: 'app',
        message: 'App started',
    });
}

export const ErrorLogging = Sentry;

const EXTRA_DEPTH = 10;
