import * as Sentry from '@sentry/react';
import { initializeErrorLogging } from './initializeErrorLogging';
import {
    APP_ENVIRONMENT,
    IS_DISABLE_SENTRY,
    SENTRY_DSN,
    SENTRY_TRACES_SAMPLE_RATE,
} from '@breef/shared/constants';

jest.mock('@sentry/react', () => ({
    init: jest.fn(),
    addBreadcrumb: jest.fn(),
}));

describe('initializeErrorLogging', () => {
    beforeAll(() => {
        initializeErrorLogging();
    });

    it('should initialize Sentry with the correct configuration', () => {
        expect(Sentry.init).toHaveBeenCalledWith({
            dsn: SENTRY_DSN,
            integrations: expect.any(Array),
            normalizeDepth: expect.any(Number),
            environment: APP_ENVIRONMENT,
            autoSessionTracking: true,
            tracesSampleRate: SENTRY_TRACES_SAMPLE_RATE,
            enabled: !IS_DISABLE_SENTRY,
            ignoreErrors: expect.any(Array),
        });
    });

    it('should add a breadcrumb for app start', () => {
        expect(Sentry.addBreadcrumb).toHaveBeenCalledWith({
            category: 'app',
            message: 'App started',
        });
    });
});
