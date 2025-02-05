import { getStorageData, logout } from '@breef/shared/utils';
import { ACCESS_TOKEN } from '@breef/shared/constants';
import React, { useEffect, useState } from 'react';
import StubComponent from '../components/layout/StubComponent';
import { useRouter } from 'next/router';

const withAuth = (
    WrappedComponent: (props: React.ReactNode | JSX.Element) => JSX.Element,
) => {
    /* eslint-disable react/display-name */
    return (props): JSX.Element => {
        const accessToken = getStorageData('cookie', ACCESS_TOKEN);
        const [hasWindow, seHasWindow] = useState(false);

        const preloader = <StubComponent />;
        const router = useRouter();

        useEffect(() => {
            seHasWindow(true);
        }, []);

        if (!hasWindow || !router.isReady) {
            return preloader;
        }

        if (!accessToken) {
            logout(true);
            return preloader;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
