import { expert_support, eyes, agency_asap } from '@breef/shared/assets';

export const successOnboardingConfigAgency = {
    title: 'great stuff.',
    note: "We'll be in touch with more details + resources about Breef shortly.",
    nextSteps: [
        {
            imageUrl: eyes.src,
            title: 'Vetted projects',
            note: 'We only share opportunities curated for your agency. You’ll be notified when there’s a fit.',
        },
        {
            imageUrl: agency_asap.src,
            title: 'Streamlined Pitches',
            note: 'We’ve simplified the pitch process to take minutes (vs. days).',
        },
        {
            imageUrl: expert_support.src,
            title: 'Project Support ',
            note: 'All projects + pitches are personally reviewed by our team. We’re here to help if any ?s.',
        },
    ],
};
