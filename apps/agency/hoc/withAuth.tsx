import { getStorageData, logout } from '@breef/shared/utils';
import { ACCESS_TOKEN, PROJECTS_ROUTE } from '@breef/shared/constants';
import React, { useEffect, useState } from 'react';
import StubComponent from '../components/layout/StubComponent';
import { useRouter } from 'next/router';
import { useRouteControl } from '@breef/shared/hooks';
import { toast } from 'react-toastify';

const withAuth = (
    WrappedComponent: (props: React.ReactNode | JSX.Element) => JSX.Element,
) => {
    /* eslint-disable react/display-name */
    return (props): JSX.Element => {
        const accessToken = getStorageData('cookie', ACCESS_TOKEN);
        const [hasWindow, setHasWindow] = useState(false);
        const router = useRouter();
        const preloader = <StubComponent />;
        const { changePage } = useRouteControl();

        useEffect(() => {
            setHasWindow(true);
        }, []);

        if (!hasWindow || !router.isReady) {
            return preloader;
        }

        if (!accessToken) {
            logout(true);
            return preloader;
        }

        if (
            router.asPath.includes('/edit?current_step') ||
            router.asPath.includes('/edit?unfilled_step') ||
            router.asPath.includes('/post?unfilled_step') ||
            router.asPath.includes('/choice')
        ) {
            toast.error('No permissions to view this page');
            changePage(PROJECTS_ROUTE);
            return preloader;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
