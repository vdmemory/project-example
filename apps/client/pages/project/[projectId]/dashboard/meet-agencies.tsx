import { AnimateLayoutPage, NavDefault } from '@breef/shared/ui-components';
import Layout from '../../../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import { Dashboard } from '@breef/shared/feature-project-dashboard-client';
import { css, Global } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';
import { colors } from '@breef/ui-kit';
import { DashboardMeet } from '@breef/shared/feature-project-availability';
import moment from 'moment';
import { useAppSelector } from '../../../../hooks/store';
import { useRouter } from 'next/router';
import {
    DASHBOARD_PITCHES_ROUTE,
    PROJECTS_ROUTE,
} from '@breef/shared/constants';

const globalStyles = css`
    .nav-control {
        @media (${mediaScreen.tablet}) {
            background-color: ${colors.beige} !important;
            height: 74px !important;
            border-bottom: none !important;
        }
    }
`;

const MeetAgenciesPage: NextPageWithLayout = () => {
    const router = useRouter();
    const {
        query: { projectId },
    } = router;
    const {
        projectInfo: { isSchedulingCreated },
    } = useAppSelector(state => state.dashboard);

    if (!isSchedulingCreated) {
        router.push(DASHBOARD_PITCHES_ROUTE.reverse({ projectId }) as string);
        return;
    }

    moment.locale('en');
    return (
        <AnimateLayoutPage>
            <DashboardMeet />
        </AnimateLayoutPage>
    );
};

MeetAgenciesPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Meet Agencies">
                <Global styles={globalStyles} />
                <NavDefault />
                <Dashboard>{page}</Dashboard>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default MeetAgenciesPage;
