import {
    AnimateLayoutPage,
    ErrorBoundary,
    NavDefault,
} from '@breef/shared/ui-components';
import Layout from '../../../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import { Dashboard } from '@breef/shared/feature-project-dashboard-client';
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

const HirePage: NextPageWithLayout = () => {
    return (
        <AnimateLayoutPage>
            <ErrorBoundary message="404 - Page Not Found" />
        </AnimateLayoutPage>
    );
};

HirePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Hide">
                <Global styles={globalStyles} />
                <NavDefault />
                <Dashboard>{page}</Dashboard>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default HirePage;
