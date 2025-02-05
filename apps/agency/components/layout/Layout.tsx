import { LayoutStyled } from './Layout.styled';
import GlobalStyles from './GlobalStyles';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import withAuth from '../../hoc/withAuth';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { LoaderWrapper, Toastify } from '@breef/shared/ui-components';
import {
    useUrlPathContains,
    useViewSize,
    MediaProvider,
    useCheckAppRole,
} from '@breef/shared/hooks';
import { FC, ReactNode, useEffect } from 'react';
import { useGetSelfQuery } from '@breef/shared/data-access-auth';
import { getStorageData, redirectToApp } from '@breef/shared/utils';
import {
    CLIENT_FRONT_APP_URL,
    IS_IMPERSONATE,
    INTERCOM_APP_ID,
} from '@breef/shared/constants';
import { useAppSelector } from '../../hooks/store';
import { useRouter } from 'next/router';
import { ImpersonateTip } from '@breef/shared/feature-auth';
import { IntercomProvider } from 'react-use-intercom';

const isImpersonate = JSON.parse(
    getStorageData('cookie', IS_IMPERSONATE) ?? false,
);

export const Layout = ({ children }: { children: ReactNode }) => {
    const { viewHeight } = useViewSize();
    const { dashboardIsLoaded } = useAppSelector(state => state.projectDetails);
    const router = useRouter();

    const { isError, isLoading, isAnotherUserType, userData } = useCheckAppRole(
        { userType: 'agency' },
    );

    const pathNamesNotRender = [
        'edit',
        'create',
        'review',
        'kick-off',
        'book-meeting',
        'profile/redirect',
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
                <LayoutStyled viewHeight={viewHeight}>
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
