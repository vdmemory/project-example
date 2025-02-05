import { createSlice } from '@reduxjs/toolkit';
import { apiAuth } from '@breef/shared/data-access-auth';
import { AuthStateType } from '../types/authStateTypes';
import {
    setStorageData,
    getStorageData,
    removeStorageData,
    getUrlQueryParams,
    setAuthTokens,
} from '@breef/shared/utils';
import {
    ACCESS_TOKEN,
    authCookieOptions,
    IS_IMPERSONATE,
    IS_OLD_USER,
    REFRESH_TOKEN,
} from '@breef/shared/constants';

const initialAuth = !!getStorageData('cookie', ACCESS_TOKEN);
const paramsUrl = getUrlQueryParams('utmOnly');

export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: initialAuth,
        registrationData: null,
        utm: paramsUrl,
        signInError: null,
    } as AuthStateType,
    reducers: {
        setSignInError: (state, action) => {
            state.signInError = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiAuth.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
                setStorageData('cookie', IS_OLD_USER, '' + payload.is_old_user);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.loginGoogle.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.registerGoogle.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.setPassword.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.confirmEmail.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.impersonate.matchFulfilled,
            (state, { payload }) => {
                setStorageData('cookie', IS_IMPERSONATE, JSON.stringify(true));
                setAuthTokens(payload);
                setStorageData('cookie', IS_OLD_USER, '' + payload.is_old_user);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.registration.matchFulfilled,
            (state, { payload }) => {
                state.registrationData = payload;
                setAuthTokens({
                    access: payload.auth_data.access,
                    refresh: payload.auth_data.refresh,
                });
            },
        );

        builder.addMatcher(
            apiAuth.endpoints.inviteUser.matchFulfilled,
            (state, { payload }) => {
                setAuthTokens(payload);
            },
        );
    },
});

export default slice.reducer;

const rootState = slice.getInitialState();
export const sliceActions = slice.actions;

type State = typeof rootState;
export type SliceState = {
    [slice.name]: State;
};
