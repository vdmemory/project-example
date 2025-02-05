import {
    ACCESS_TOKEN,
    AGENCY_FRONT_APP_URL,
    AUTH_FRONT_APP_URL,
    CLIENT_FRONT_APP_URL,
    GENERAL_ERROR_MESSAGE,
    REFRESH_TOKEN,
} from '@breef/shared/constants';
import {
    SHOW_INVITE_POPUP_QUERY,
    useGetSelfQuery,
    useInviteUserMutation,
} from '@breef/shared/data-access-auth';
import {
    logout,
    redirectToApp,
    removeStorageData,
    resetAuth,
} from '@breef/shared/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FetchErrorType } from '../../../types/authFormTypes';

export const useInviteUser = () => {
    const router = useRouter();
    const [isSkipSelf, setIsSkipSelf] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [allowRedirect, setAllowRedirect] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {
        data: selfData,
        isLoading: isLoadingGetSelf,
        error: errorGetSelf,
        isError: isErrorGetSelf,
    } = useGetSelfQuery(undefined, { skip: isSkipSelf });

    const [
        inviteUser,
        {
            isLoading: isLoadingInvite,
            error: errorInvite,
            isSuccess,
            isError: isErrorInvite,
        },
    ] = useInviteUserMutation();

    useEffect(() => {
        if (isLoadingGetSelf || isLoadingInvite) {
            return setIsLoading(true);
        }
        if (isErrorInvite) {
            return setIsLoading(false);
        }
    }, [isErrorGetSelf, isErrorInvite, isLoadingGetSelf, isLoadingInvite]);

    useEffect(() => {
        if (!isSkipSelf && selfData?.companyType) {
            const redirectApp =
                selfData.companyType === 'client'
                    ? `${CLIENT_FRONT_APP_URL}?${SHOW_INVITE_POPUP_QUERY}`
                    : `${AGENCY_FRONT_APP_URL}?${SHOW_INVITE_POPUP_QUERY}`;
            redirectToApp(redirectApp);
        }
    }, [isSkipSelf, selfData]);

    useEffect(() => {
        if (isSuccess) {
            setIsSkipSelf(false);
        }
    }, [isSuccess, router]);

    useEffect(() => {
        if (!isErrorGetSelf) return;
        const fetchError = errorGetSelf as FetchErrorType;

        if (fetchError?.status === 500) {
            setErrorMessage(GENERAL_ERROR_MESSAGE);
            resetAuth();
            return setAllowRedirect(AUTH_FRONT_APP_URL);
        }

        const message = fetchError?.data?.detail;

        if (Array.isArray(message)) {
            setErrorMessage(message[0]);
            return setAllowRedirect(AUTH_FRONT_APP_URL);
        }

        setErrorMessage(message || GENERAL_ERROR_MESSAGE);
        return setAllowRedirect(AUTH_FRONT_APP_URL);
    }, [errorGetSelf, isErrorGetSelf]);

    useEffect(() => {
        const fetchedError = errorInvite as FetchErrorType;

        if (fetchedError?.data?.detail) {
            const responseMessage = Array.isArray(fetchedError.data.detail)
                ? fetchedError.data.detail[0]
                : fetchedError.data.detail;
            setErrorMessage(responseMessage || GENERAL_ERROR_MESSAGE);
            return setAllowRedirect(AUTH_FRONT_APP_URL);
        }
    }, [errorInvite]);

    return {
        inviteUser,
        isLoading,
        isErrorGetSelf,
        allowRedirect,
        errorMessage,
    };
};
