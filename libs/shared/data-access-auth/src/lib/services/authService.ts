import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from './fetchIntercept';
import {
    AGENCY_GOOGLE_AUTH_PATH,
    CHECK_EMAIL_EXIST,
    CHECK_TOKEN_EXPIRATION,
    CLIENT_GOOGLE_AUTH_PATH,
    CONFIRM_EMAIL_PATH,
    LOGIN_PATH,
    LOGIN_QUERY,
    REGISTRATION_AGENCY_PATH,
    REGISTRATION_COMPANY_PATH,
    REGISTRATION_QUERY,
    RESET_PASSWORD_PATH,
    SELF_PATH,
    UPDATE_EMAIL_PATH,
    ACCEPT_INVITATION_USER,
    CHECK_USER_STATUS,
    SET_PASSWORD_PATH,
    REGISTRATION_COMPLETE,
    IMPERSONATE_PATH,
} from '../constants/endpoints';

import {
    CheckEmailRequestType,
    CheckEmailResponseType,
    CheckTokenType,
    CheckUserStatusRequestType,
    ConfirmEmailRequestType,
    ConfirmEmailResponseType,
    ForgotPassRequestType,
    ForgotPassResponseType,
    GetSelfMergedResponseType,
    GoogleRequestType,
    GoogleResponseType,
    InvitationUserRequestType,
    InvitationUserResponseType,
    LoginRequestType,
    LoginResponseType,
    ResetPassRequestType,
    ResetPassResponseType,
    SetPassRequestType,
    SetPassResponseType,
    SignUpRequestType,
    SignUpResponseType,
    UpdateEmailRequestType,
    UpdateEmailResponseType,
    ImpersonateRequestType,
    ImpersonateResponseType,
} from '@breef/shared/types';

import {
    prepareChangeGoogleRegistrationData,
    prepareChangePasswordsData,
    prepareChangeRegistrationData,
    prepareChangeUpdateEmailsData,
    prepareCheckUserStatusData,
    prepareEmailData,
    prepareInvitationUserData,
    prepareLoginData,
    prepareSetPasswordData,
    transformGetSelf,
} from '../adapters/authAdapters';
import { RoleFormNames } from '@breef/shared/constants';

export const apiAuth = createApi({
    reducerPath: 'authService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['AuthService'],
    endpoints: builder => ({
        loginGoogle: builder.mutation<GoogleResponseType, GoogleRequestType>({
            query: body => ({
                url:
                    body.user?.role === RoleFormNames.COMPANY
                        ? `${CLIENT_GOOGLE_AUTH_PATH}?${LOGIN_QUERY}`
                        : `${AGENCY_GOOGLE_AUTH_PATH}?${LOGIN_QUERY}`,
                method: 'POST',
                body: prepareChangeGoogleRegistrationData(body, false),
            }),
        }),
        registerGoogle: builder.mutation<GoogleResponseType, GoogleRequestType>(
            {
                query: body => ({
                    url:
                        body.user?.role === RoleFormNames.COMPANY
                            ? `${CLIENT_GOOGLE_AUTH_PATH}?${REGISTRATION_QUERY}`
                            : `${AGENCY_GOOGLE_AUTH_PATH}?${REGISTRATION_QUERY}`,
                    method: 'POST',
                    body: prepareChangeGoogleRegistrationData(body),
                }),
            },
        ),
        setPassword: builder.mutation<SetPassResponseType, SetPassRequestType>({
            query: body => {
                return {
                    url: SET_PASSWORD_PATH,
                    method: 'POST',
                    body: prepareSetPasswordData(body),
                };
            },
        }),
        login: builder.mutation<LoginResponseType, LoginRequestType>({
            query: body => ({
                url: LOGIN_PATH,
                method: 'POST',
                body: prepareLoginData(body),
            }),
        }),
        registration: builder.mutation<SignUpResponseType, SignUpRequestType>({
            query: body => ({
                url:
                    body.user.role === RoleFormNames.COMPANY
                        ? REGISTRATION_COMPANY_PATH
                        : REGISTRATION_AGENCY_PATH,
                method: 'POST',
                body: prepareChangeRegistrationData(body),
            }),
        }),
        resetPassword: builder.mutation<
            ResetPassResponseType,
            ResetPassRequestType
        >({
            query: body => {
                return {
                    url: RESET_PASSWORD_PATH,
                    method: 'POST',
                    body: prepareChangePasswordsData(body),
                };
            },
        }),
        forgotPassword: builder.mutation<
            ForgotPassResponseType,
            ForgotPassRequestType
        >({
            query: body => {
                return {
                    url: RESET_PASSWORD_PATH,
                    method: 'PATCH',
                    body: prepareEmailData(body),
                };
            },
        }),
        confirmEmail: builder.mutation<
            ConfirmEmailResponseType,
            ConfirmEmailRequestType
        >({
            query: body => {
                return {
                    url: CONFIRM_EMAIL_PATH,
                    method: 'PATCH',
                    body: body,
                };
            },
        }),
        updateEmail: builder.mutation<
            UpdateEmailResponseType,
            UpdateEmailRequestType
        >({
            query: body => {
                return {
                    url: UPDATE_EMAIL_PATH,
                    method: 'PATCH',
                    body: prepareChangeUpdateEmailsData(body),
                };
            },
        }),
        getSelf: builder.query<GetSelfMergedResponseType, void>({
            query: () => SELF_PATH,
            transformResponse: transformGetSelf,
        }),
        checkEmail: builder.mutation<
            CheckEmailResponseType,
            CheckEmailRequestType
        >({
            query: body => {
                return {
                    url: CHECK_EMAIL_EXIST,
                    method: 'POST',
                    body: prepareEmailData(body),
                };
            },
        }),
        checkTokenExpiration: builder.mutation<CheckTokenType, CheckTokenType>({
            query: body => {
                return {
                    url: CHECK_TOKEN_EXPIRATION,
                    method: 'POST',
                    body: body,
                };
            },
        }),
        checkUserStatus: builder.mutation<void, CheckUserStatusRequestType>({
            query: body => {
                return {
                    url: CHECK_USER_STATUS,
                    method: 'POST',
                    body: prepareCheckUserStatusData(body),
                };
            },
        }),
        inviteUser: builder.mutation<
            InvitationUserResponseType,
            InvitationUserRequestType
        >({
            query: body => {
                return {
                    url: ACCEPT_INVITATION_USER,
                    method: 'POST',
                    body: prepareInvitationUserData(body),
                };
            },
        }),
        impersonate: builder.mutation<
            ImpersonateResponseType,
            ImpersonateRequestType
        >({
            query: body => {
                return {
                    url: IMPERSONATE_PATH,
                    method: 'POST',
                    body: body,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegistrationMutation,
    useResetPasswordMutation,
    useForgotPasswordMutation,
    useConfirmEmailMutation,
    useUpdateEmailMutation,
    useLoginGoogleMutation,
    useRegisterGoogleMutation,
    useGetSelfQuery,
    useLazyGetSelfQuery,
    useCheckEmailMutation,
    useCheckTokenExpirationMutation,
    useInviteUserMutation,
    useCheckUserStatusMutation,
    useSetPasswordMutation,
    useImpersonateMutation,
} = apiAuth;
