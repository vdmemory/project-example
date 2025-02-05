import {
    ProjectCreate,
    useFetchProjects,
} from '@frontend/shared/feature-project-create';
import React, { useEffect } from 'react';
import {
    AnimateLayoutPage,
    PageLoader,
    StartProjectPopup,
    usePopup,
} from '@breef/shared/ui-components';
import { TipType } from '@breef/shared/types';
import { useMediaContext } from '@breef/shared/hooks';

export function ProjectCreatePage() {
    const startProjectPopup = usePopup();
    const { isMobile } = useMediaContext();
    const { getFetchData, isLoading, companyData } = useFetchProjects();

    useEffect(() => {
        getFetchData();
        startProjectPopup.open();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <PageLoader />;

    return (
        <AnimateLayoutPage headTitle="Project Creation">
            <ProjectCreate companyData={companyData} />
            {startProjectPopup.isOpen && (
                <StartProjectPopup
                    title="Start your agency search"
                    subtitle="We guarantee you’ll find the perfect agency. Let’s get started!"
                    onClick={startProjectPopup.close}
                    close={startProjectPopup.close}
                    tipsConfig={!isMobile ? stepTipsDesktop : stepTipsMobile}
                />
            )}
        </AnimateLayoutPage>
    );
}

export default ProjectCreatePage;

export const stepTipsDesktop: TipType[] = [
    {
        title: 'Create Project Scope',
        description:
            'Answer a few questions to build your custom project scope (< 5 mins).',
    },
    {
        title: 'Post Your Project',
        description:
            'Post your project on Breef. We’ll invite agencies to submit pitches. ',
    },
    {
        title: 'Receive Agency Pitches',
        description:
            'Receive custom agency pitches, curated for your brand + goals.',
    },
];

export const stepTipsMobile: TipType[] = [
    {
        title: 'Create Project Scope',
        description: 'Build your custom project scope (< 5 mins).',
    },
    {
        title: 'Post Your Project',
        description: 'Post your project on Breef.',
    },
    {
        title: 'Receive Agency Pitches',
        description: 'Receive custom agency pitches, curated for you.',
    },
];
