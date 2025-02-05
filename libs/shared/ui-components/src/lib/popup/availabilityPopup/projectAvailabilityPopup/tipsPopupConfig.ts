const tips = [
    {
        id: 1,
        title: '1. Add Your Team',
        description: 'Invite team members to your agency intro calls.',
    },
    {
        id: 2,
        title: '2. Select Availability',
        description: 'Share your availability for agency intro calls.',
    },
    {
        id: 3,
        title: '3. Confirm Meetings',
        description: `You'll receive meeting invites to your calendar.`,
    },
];

const config = {
    label: 'Schedule Agency Intros',
    note: 'Book intro calls with your favorite teams. This is an opportunity to get to know the agencies and discuss project details.',
    completeButtonLabel: 'SET MY AVAILABILITY',
};

export const tipsPopupConfig = {
    tips,
    config,
};
