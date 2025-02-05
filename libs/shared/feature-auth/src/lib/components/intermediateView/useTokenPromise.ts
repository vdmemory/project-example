import { useCallback, useEffect, useState } from 'react';
import { useLazyGetSelfQuery } from '@breef/shared/data-access-auth';
import {
    ACCESS_TOKEN,
    AGENCY_FRONT_APP_URL,
    AUTH_FRONT_APP_URL,
    CLIENT_FRONT_APP_URL,
    REFRESH_TOKEN,
} from '@breef/shared/constants';
import { logout, removeStorageData, resetAuth } from '@breef/shared/utils';
import { FetchErrorType } from '../../types/authFormTypes';

interface UseTokenPromiseProps {
    sendToken: ({ token }: { token: string }) => {
        unwrap: () => Promise<unknown>;
    };
    token: string;
    defaultErrorMessage: string;
}
export const useTokenPromise = ({
    sendToken,
    token,
    defaultErrorMessage,
}: UseTokenPromiseProps) => {
    const [errorMessage, setErrorMessage] = useState('');
    const [allowRedirect, setAllowRedirect] = useState('');

    const [getSelfData] = useLazyGetSelfQuery();

    const takeActions = useCallback(
        async (token: string) => {
            try {
                await sendToken({ token }).unwrap();
                const resultSelf = await getSelfData();
                const redirectApp =
                    resultSelf.data?.companyType === 'client'
                        ? CLIENT_FRONT_APP_URL
                        : AGENCY_FRONT_APP_URL;
                return setAllowRedirect(redirectApp);
            } catch (error) {
                const fetchError = error as FetchErrorType;

                if (fetchError?.status === 500) {
                    setErrorMessage(defaultErrorMessage);
                    resetAuth();
                    return setAllowRedirect(AUTH_FRONT_APP_URL);
                }

                const message =
                    fetchError?.data?.token?.[0] ||
                    fetchError?.data?.detail?.[0];
                setErrorMessage(message || defaultErrorMessage);
                return setAllowRedirect(AUTH_FRONT_APP_URL);
            }
        },
        //eslint-disable-next-line
        [sendToken, getSelfData],
    );

    useEffect(() => {
        if (!token) {
            setErrorMessage('Sorry, this link is not valid anymore.');
        } else {
            takeActions(token);
        }
    }, [takeActions, token]);

    return {
        errorMessage,
        allowRedirect,
        takeActions,
    };
};
