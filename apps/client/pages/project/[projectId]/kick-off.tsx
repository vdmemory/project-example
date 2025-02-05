import { Kickoff } from '@breef/shared/feature-kickoff';
import { AnimateLayoutPage } from '@breef/shared/ui-components';
import { withDynamicPathIds } from '../../../hoc/withDynamicPathIds';

export function ProjectKickOffClient() {
    return (
        <AnimateLayoutPage headTitle="Project Kick Off">
            <Kickoff mode="create" userType="client" />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(ProjectKickOffClient, ['projectId']);
