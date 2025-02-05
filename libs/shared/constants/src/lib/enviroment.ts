export const API_URL: string = process.env['NX_API_URL'] ?? '';
export const APP_URL: string = process.env['NX_APP_URL'] ?? '';
export const NX_BOOKING_APP_URL: string =
    process.env['NX_BOOKING_APP_URL'] ?? '';
export const NX_BOOKING_COOKIE_NAME: string =
    process.env['NX_BOOKING_COOKIE_NAME'] ?? '';

export const ADMIN_BACKEND_APP_URL: string = API_URL + '/admin';
export const AUTH_FRONT_APP_URL: string =
    process.env['NX_AUTH_FRONT_APP_URL'] ?? '';
export const CLIENT_FRONT_APP_URL: string =
    process.env['NX_CLIENT_FRONT_APP_URL'] ?? '';
export const AGENCY_FRONT_APP_URL: string =
    process.env['NX_AGENCY_FRONT_APP_URL'] ?? '';
export const CURATOR_FRONT_APP_URL: string =
    process.env['NX_CURATOR_FRONT_APP_URL'] ?? '';
export const SENTRY_DSN: string = process.env['NX_SENTRY_DSN'] ?? '';
export const SENTRY_TRACES_SAMPLE_RATE: number =
    Number(process.env['NX_SENTRY_TRACES_SAMPLE_RATE']) || 1.0;
export const GOOGLE_CLIENT_ID: string =
    process.env['NX_GOOGLE_CLIENT_ID'] ?? '';
export const APP_ENVIRONMENT: string = process.env['NX_APP_ENV'] ?? '';
export const GOOGLE_API_KEY: string = process.env['NX_GOOGLE_API_KEY'] ?? '';
export const CALENDLY_URL: string = process.env['NX_CALENDLY_URL'] ?? '';
export const GIPHY_KEY: string = process.env['NX_GIPHY_KEY'] ?? '';
export const INTERCOM_APP_ID: string = process.env['NX_INTERCOM_APP_ID'] ?? '';
export const STRIPE_PUBLIC_KEY: string =
    process.env['NX_STRIPE_PUBLIC_KEY'] ?? '';

export const PLAID_CLIENT_ID: string = process.env['NX_PLAID_CLIENT_ID'] ?? '';
export const PLAID_SECRET_KEY: string =
    process.env['NX_PLAID_SECRET_KEY'] ?? '';

export const IS_DISABLE_SENTRY =
    process.env['NX_DISABLE_SENTRY'] === 'true' ? true : false;

export const GOOGLE_TAG_MANAGER_ID = 'GTM-NVVPKRB';

export const CALENDLY_URL_ONBOARDING_CALL =
    process.env['NX_CALENDLY_URL_ONBOARDING_CALL'] ?? '';
export const CALENDLY_URL_PLANNING_CALL =
    process.env['NX_CALENDLY_URL_PLANNING_CALL'] ?? '';
