// path

export const UPDATE_TIMEZONE = '/auth/time-zone';
export const REFRESH_TK_PATH = '/auth/token/refresh';
export const LOGIN_PATH = '/auth/login';
export const RESET_PASSWORD_PATH = '/auth/reset-password';
export const CONFIRM_EMAIL_PATH = '/auth/confirm-email';
export const UPDATE_EMAIL_PATH = '/auth/update-email';
export const REGISTRATION_COMPANY_PATH = '/clients';
export const REGISTRATION_AGENCY_PATH = '/agencies';
export const CLIENT_GOOGLE_AUTH_PATH = '/clients/google';
export const AGENCY_GOOGLE_AUTH_PATH = '/agencies/google';
export const SET_PASSWORD_PATH = '/auth/set-user-password';
export const SELF_PATH = '/auth/self';
export const CHECK_EMAIL_EXIST = '/auth/email-validation';
export const CHECK_TOKEN_EXPIRATION = '/auth/token-validation';
export const CHECK_USER_STATUS = '/auth/user-status-validation';
export const ACCEPT_INVITATION_USER = '/auth/accept-invitation';
export const REGISTRATION_COMPLETE = '/clients/registration-complete';
export const IMPERSONATE_PATH = '/admins/impersonate';

// query
export const LOGIN_QUERY = 'process=login';
export const REGISTRATION_QUERY = 'process=connect';
export const SHOW_INVITE_POPUP_QUERY = 'pop_up=invite';
