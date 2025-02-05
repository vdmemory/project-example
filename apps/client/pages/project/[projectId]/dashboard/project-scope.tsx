import { AnimateLayoutPage, NavDefault } from '@breef/shared/ui-components';
import Layout from '../../../../components/layout/Layout';
import { ReactElement } from 'react';
import { NextPageWithLayout } from '../../../_app';
import { Dashboard } from '@breef/shared/feature-project-dashboard-client';
import { useRouteControl } from '@breef/shared/hooks';
import { useAppSelector } from '../../../../hooks/store';
import { ProjectScopeClient } from '@breef/shared/feature-project-dashboard-client';
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

const ProjectScopePage: NextPageWithLayout = () => {
    const { queryParams } = useRouteControl();
    const projectId = (queryParams as { projectId?: number }).projectId || 0;
    const projectInfo = useAppSelector(state => state.dashboard.projectInfo);
    const { company } = useAppSelector(state => state.dashboard.headerInfo);

    return (
        <AnimateLayoutPage>
            <ProjectScopeClient
                projectId={Number(projectId)}
                projectData={projectInfo}
                userType={'client'}
                companyName={company?.name}
            />
        </AnimateLayoutPage>
    );
};

ProjectScopePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AnimateLayoutPage headTitle="Project Scope">
                <Global styles={globalStyles} />
                <NavDefault />
                <Dashboard>{page}</Dashboard>
            </AnimateLayoutPage>
        </Layout>
    );
};

export default ProjectScopePage;
