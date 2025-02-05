import {
    ValidationErrorType,
    getStorageData,
    redirectToAppByUserType,
    validationErrorMessages,
    logout,
    resetAuth,
} from '@breef/shared/utils';
import {
    ACCESS_TOKEN,
    AUTH_FRONT_APP_URL,
    PUBLIC_PROJECT_ROUTE,
    PUBLIC_PITCHES_ROUTE,
    REFRESH_TOKEN,
    CONFIRM_EMAIL_ROUTE,
    IMPERSONATE_ROUTE,
} from '@breef/shared/constants';
import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PageLoader } from '@breef/shared/ui-components';
import WrapPageLoader from '../components/layout/WrapPageLoader';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useRouter } from 'next/router';

const withAuth = (
    WrappedComponent: (props: React.ReactNode | JSX.Element) => JSX.Element,
) => {
    // eslint-disable-next-line react/display-name
    return (props): JSX.Element => {
        const [accessToken, setAccessToken] = useState('');
        const { data, isSuccess, isError } = useGetSelfQuery(undefined, {
            skip: !accessToken,
        });
        const router = useRouter();
        const queryParams = router.query as { token?: string };
        const nextRoute = router.query['nextPath'] || '';

        useEffect(() => {
            setAccessToken(getStorageData('cookie', ACCESS_TOKEN));
        }, []);

        if (!router.isReady) {
            return null;
        }

        if (
            (queryParams.token &&
                (router.pathname.includes(CONFIRM_EMAIL_ROUTE) ||
                    router.pathname.includes(IMPERSONATE_ROUTE))) ||
            router.pathname.includes(PUBLIC_PROJECT_ROUTE) ||
            router.pathname.includes(PUBLIC_PITCHES_ROUTE) ||
            router.pathname.includes('/pitch') ||
            router.pathname.includes('/404') ||
            router.pathname.includes('/500') ||
            router.pathname.includes('/403')
        ) {
            return <WrappedComponent {...props} />;
        }

        if (accessToken) {
            if (isSuccess) {
                redirectToAppByUserType(data.companyType, `${nextRoute}`);
            }

            if (isError) {
                resetAuth();
                setAccessToken('');
            }

            return (
                <WrapPageLoader>
                    <PageLoader />
                </WrapPageLoader>
            );
        }
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
