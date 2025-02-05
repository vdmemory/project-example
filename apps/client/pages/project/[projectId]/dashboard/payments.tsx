import { AnimateLayoutPage, NavDefault } from '@breef/shared/ui-components';
import Layout from '../../../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import {
    Dashboard,
    PaymentsClient,
} from '@breef/shared/feature-project-dashboard-client';
import { useRouteControl } from '@breef/shared/hooks';
import { css, Global } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';

const globalStyles = css`
    .nav-control {
        @media (${mediaScreen.tablet}) {
            background-color: ${colors.beige} !important;
            height: 74px !important;
            border-bottom: none !important;
        }
    }
`;

const AccountProfilePage: NextPageWithLayout = () => {
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || 0;

    return (
        <AnimateLayoutPage>
            <PaymentsClient projectId={String(projectId)} />
        </AnimateLayoutPage>
    );
};

AccountProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Payments">
                <Global styles={globalStyles} />
                <NavDefault />
                <Dashboard>{page}</Dashboard>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default AccountProfilePage;
