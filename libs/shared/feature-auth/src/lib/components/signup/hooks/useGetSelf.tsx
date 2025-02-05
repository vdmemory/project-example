import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import {
    AUTH_FRONT_APP_URL,
    GENERAL_ERROR_MESSAGE,
} from '@breef/shared/constants';
import { redirectToAppByUserType, resetAuth } from '@breef/shared/utils';
import { useEffect, useState } from 'react';
import { RegistrationErrorType } from '../../../types/authFormTypes';
interface UseGetSelfRedirectProps {
    projectId?: number | null;
}
export const useGetSelfRedirect = ({ projectId }: UseGetSelfRedirectProps) => {
    const [isSkipSelf, setIsSkipSelf] = useState(true);

    const {
        data: selfData,
        isLoading,
        isSuccess,
        isError,
        error: errorSelf,
        isFetching,
    } = useGetSelfQuery(undefined, { skip: isSkipSelf });

    useEffect(() => {
        if (!isSkipSelf && isSuccess && selfData?.companyType) {
            redirectToAppByUserType(selfData.companyType);
        }
    }, [isSkipSelf, isSuccess, selfData]);

    const [allowRedirect, setAllowRedirect] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!isError) return;
        const fetchError = errorSelf as RegistrationErrorType;

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
    }, [errorSelf, isError]);

    return {
        isLoading,
        isFetching,
        isSuccess,
        setIsSkipSelf,
        allowRedirect,
        errorMessage,
    };
};
