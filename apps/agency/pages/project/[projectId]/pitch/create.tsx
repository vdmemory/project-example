import { AnimateLayoutPage, PageLoader } from '@breef/shared/ui-components';
import {
    PitchCreate,
    useFetchPitchCreate,
} from '@frontend/shared/feature-pitches-create';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import Page404 from '../../../404';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { withDynamicPathIds } from '../../../../hoc/withDynamicPathIds';

export function PitchCreatePage() {
    const { isLoading } = useFetchPitchCreate({ mode: 'create' });

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <AnimateLayoutPage headTitle="Pitch Create">
            <PitchCreate mode="create" />
        </AnimateLayoutPage>
    );
}

export default withDynamicPathIds(PitchCreatePage, ['projectId']);
