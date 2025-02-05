import { Kickoff } from '@breef/shared/feature-kickoff';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import { withDynamicPathIds } from '../../../../hoc/withDynamicPathIds';

export function ProjectKickOffAgency() {
    return (
        <AnimateLayoutPage headTitle="Project Kick Off">
            <Kickoff mode="create" userType="agency" />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(ProjectKickOffAgency, ['projectId']);
