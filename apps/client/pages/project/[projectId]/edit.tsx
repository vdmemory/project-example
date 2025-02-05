import {
    ProjectCreate,
    useFetchProjects,
} from '@frontend/shared/feature-project-create';

import { useEffect } from 'react';
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import { ProjectByIdType } from '@breef/shared/types';
import { withDynamicPathIds } from '../../../hoc/withDynamicPathIds';

export function ProjectCreatePage() {
    const { getFetchData, isLoading, projectData, companyData } =
        useFetchProjects();

    useEffect(() => {
        getFetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <PageLoader />;

    return (
        <AnimateLayoutPage headTitle="Project Edit">
            <ProjectCreate
                projectData={projectData as ProjectByIdType}
                companyData={companyData}
            />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(ProjectCreatePage, ['projectId']);
