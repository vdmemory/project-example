const tips = [
    {
        id: 1,
        title: '1. ADD YOUR TEAM',
        description: 'Invite team members to your agency intro calls.',
    },
    {
        id: 2,
        title: '2. SELECT availability',
        description: 'Share your availability for agency intro calls.',
    },
    {
        id: 3,
        title: '3. CONFIRM MEETINGS',
        description: `You'll receive meeting invites to your calendar.`,
    },
];

const config = {
    label: 'SCHEDULE AGENCY INTROS',
    note: 'Book intro calls with your favorite teams. This is an opportunity to get to know the agencies and discuss project details.',
    completeButtonLabel: 'SET MY AVAILABILITY',
};

export const tipsPopupConfig = {
    tips,
    config,
};
