import { ProjectPost } from '@breef/shared/feature-project-post';
import { AnimateLayoutPage, StripeElements } from '@breef/shared/ui-components';
import { withDynamicPathIds } from '../../../../hoc/withDynamicPathIds';

export function PostProjectPage() {
    return (
        <AnimateLayoutPage headTitle="Project Post">
            <StripeElements variantRedesign="primary">
                <ProjectPost />
            </StripeElements>
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(PostProjectPage, ['projectId']);
