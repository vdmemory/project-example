import { ProjectDashboard } from '@breef/shared/feature-project-dashboard-agency';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import { withDynamicPathIds } from '../../../hoc/withDynamicPathIds';

export function ProjectAgencyDashboard() {
    return (
        <AnimateLayoutPage headTitle="Project Review">
            <ProjectDashboard role="agency" pitchesCount={false} />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(ProjectAgencyDashboard, ['projectId']);
