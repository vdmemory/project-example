import {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import {
    REFRESH_TK_PATH,
    SELF_PATH,
    UPDATE_TIMEZONE,
} from '../constants/endpoints';
import {
    baseQuery,
    setStorageData,
    getStorageData,
    redirectToAppByUserType,
    sendErrorToSentry,
    getIsInternalServerError,
    checkRedirectToErrorPage,
    getIs404StatusCode,
    logout,
    resetAuth,
    removeStorageData,
    setAuthTokens,
} from '@breef/shared/utils';
import {
    GetSelfMergedResponseType,
    RefreshTkResponseType,
} from '@breef/shared/types';
import {
    ACCESS_TOKEN,
    API_URL,
    authCookieOptions,
    InterceptableErrorStatusCodesEnum,
    REFRESH_TOKEN,
} from '@breef/shared/constants';
import { toast } from 'react-toastify';
import { transformGetSelf } from '../adapters/authAdapters';
import router from 'next/router';

const selfEndpointPath = API_URL + SELF_PATH;
let currentTimezone = '';
const initialRefreshToken = getStorageData('cookie', REFRESH_TOKEN);

const checkMatchingTimezone = (serverTimezone: string) => {
    currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return serverTimezone === currentTimezone;
};

const selfArgs = {
    url: SELF_PATH,
    method: 'GET',
    transformResponse: transformGetSelf,
};

const updateTimeZone = (usersTimezone: string) => {
    return {
        url: UPDATE_TIMEZONE,
        method: 'PATCH',
        body: {
            time_zone: usersTimezone,
        },
    };
};

export const fetchIntercept: BaseQueryFn<
    FetchArgs | string,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const pathname = router.pathname;
    let result = await baseQuery(args, api, extraOptions);
    const { error: originError } = result;

    const exceptionStatus = ['401'];
    if (originError && !exceptionStatus.includes(String(originError.status))) {
        sendErrorToSentry(args, api, originError, pathname);
    }

    // temporary solution for investigating the problem
    if (
        originError &&
        (originError.status === InterceptableErrorStatusCodesEnum.FetchError ||
            originError.status ===
                InterceptableErrorStatusCodesEnum.TimeoutError)
    ) {
        const refreshResult = await baseQuery(args, api, extraOptions);
        if (refreshResult.error) {
            const doubleRefreshResult = await baseQuery(
                args,
                api,
                extraOptions,
            );
            if (doubleRefreshResult.error) {
                const message =
                    'Please check your network connection (Connection Error)';
                toast.error(message, { toastId: message });
            }
            return doubleRefreshResult;
        }
        if (refreshResult.data) {
            return refreshResult;
        }
    }

    if (originError && api.type === 'mutation') {
        let message: string | null = null;
        if (getIs404StatusCode(originError)) {
            message = 'Not Found.';
        } else if (getIsInternalServerError(originError.status)) {
            message =
                'Something went wrong. Please try again later. We are already working on it.';
        }

        if (message) {
            toast.error(message, { toastId: message });
        }
    }

    // re-authentication if token is expired
    if (originError && originError.status === 401) {
        const refreshToken = getStorageData('cookie', REFRESH_TOKEN);
        if (refreshToken) {
            const refreshArgs = {
                url: REFRESH_TK_PATH,
                method: 'POST',
                body: {
                    refresh: refreshToken,
                },
            };
            const refreshResult = await baseQuery(
                refreshArgs,
                api,
                extraOptions,
            );

            if (refreshResult.error) {
                logout(true);
            }

            if (refreshResult.data) {
                const { data } = refreshResult;
                const { access } = data as RefreshTkResponseType;
                setAuthTokens({ access, refresh: refreshToken });
                result = await baseQuery(args, api, extraOptions);
            }
        } else {
            logout(true);
        }
    }

    if (result.error && result.error.status === 403 && !checkIsPublicApp()) {
        const refreshToken = getStorageData('cookie', REFRESH_TOKEN);
        if (!refreshToken) {
            logout(true);
        } else if (refreshToken !== initialRefreshToken) {
            const { data, error } = await baseQuery(
                selfArgs,
                api,
                extraOptions,
            );
            if (!error) {
                const { companyType } = data as GetSelfMergedResponseType;
                redirectToAppByUserType(companyType);
            } else {
                logout(true);
            }
        }
    }

    // update timezone if it is not matching
    if (
        selfEndpointPath ===
        (result.meta as { request: { url: string } })?.request.url
    ) {
        const isTimezoneDifferent = checkMatchingTimezone(
            (result.data as { time_zone: string })?.time_zone,
        );
        if (!isTimezoneDifferent) {
            await baseQuery(updateTimeZone(currentTimezone), api, extraOptions);
            result = await baseQuery(args, api, extraOptions);
        }
    }

    if (originError && api.type === 'query') {
        await checkRedirectToErrorPage(api, originError);
    }

    return result;
};

const checkIsPublicApp = () => window.location.href.includes('public');
