import { LayoutStyled } from './Layout.styled';
import GlobalStyles from './GlobalStyles';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import withAuth from '../../hoc/withAuth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import {
    useUrlPathContains,
    useViewSize,
    MediaProvider,
    useCheckAppRole,
} from '@breef/shared/hooks';
import { LoaderWrapper, Toastify } from '@breef/shared/ui-components';
import { FC, ReactNode, useEffect } from 'react';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { useRouter } from 'next/router';
import {
    AGENCY_FRONT_APP_URL,
    IS_IMPERSONATE,
    INTERCOM_APP_ID,
} from '@breef/shared/constants';
import { getStorageData, redirectToApp } from '@breef/shared/utils';
import { useAppSelector } from '../../hooks/store';
import { IntercomProvider } from 'react-use-intercom';
import { ImpersonateTip } from '@breef/shared/feature-auth';
import { _ } from 'numeral';

const isImpersonate = JSON.parse(
    getStorageData('cookie', IS_IMPERSONATE) ?? false,
);

const Layout = ({ children }: { children: ReactNode }) => {
    const { viewHeight } = useViewSize();
    const { dashboardIsLoaded } = useAppSelector(state => state.projectDetails);
    const router = useRouter();
    const { isError, isLoading, isAnotherUserType, userData } = useCheckAppRole(
        { userType: 'client' },
    );

    const pathNamesNotRender = [
        'agency-selection',
        'create',
        'pitches-review',
        'edit',
        'streamline',
        'pitch/',
        'kick-off',
        'choice',
        'pitches-make-intro',
        'post',
        '/pitches',
        '/registration-complete',
        'availability',
        '/dashboard/review-pitches',
        '/dashboard/payments',
        '/dashboard/project-scope',
        '/dashboard/meet-agencies',
        '/dashboard/hire',
    ];

    const { hasMatchedPath } = useUrlPathContains({
        pathNames: pathNamesNotRender,
    });

    const renderHeader = () => {
        if (hasMatchedPath) {
            return <></>;
        } else {
            return <Header />;
        }
    };

    const isDashboardLoader =
        router.pathname === '/projects' && !dashboardIsLoaded;
    const isEmptyLoader = !dashboardIsLoaded;

    const getViewHeight = () => {
        if (router.pathname.includes('post')) return undefined;
        return viewHeight;
    };

    if (isLoading || isError || isAnotherUserType) {
        return (
            <>
                <GlobalStyles />
                <LoaderWrapper
                    isEmpty={isEmptyLoader}
                    isDashboard={isDashboardLoader}
                    errorMessage={
                        isError
                            ? 'Sorry, something went wrong. Please try again later'
                            : ''
                    }
                />
            </>
        );
    }

    return (
        <MediaProvider>
            <IntercomProvider
                apiBase={'https://api-iam.intercom.io'}
                appId={INTERCOM_APP_ID}
            >
                <GlobalStyles />
                <LayoutStyled viewHeight={getViewHeight()}>
                    {isImpersonate && (
                        <ImpersonateTip email={userData?.email} />
                    )}
                    {renderHeader()}
                    {children}
                    <Footer />
                    <Toastify />
                </LayoutStyled>
            </IntercomProvider>
        </MediaProvider>
    );
};

export default withAuth(Layout as FC);
