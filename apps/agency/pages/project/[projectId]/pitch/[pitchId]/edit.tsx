import {
    PitchCreate,
    useFetchPitchCreate,
} from '@frontend/shared/feature-pitches-create';
import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import { withDynamicPathIds } from '../../../../../hoc/withDynamicPathIds';

export function PitchEditPage() {
    const { isLoading, pitchData } = useFetchPitchCreate({ mode: 'edit' });

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <AnimateLayoutPage headTitle="Pitch Create">
            <PitchCreate mode="edit" pitchData={pitchData} />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(PitchEditPage, ['projectId', 'pitchId']);
