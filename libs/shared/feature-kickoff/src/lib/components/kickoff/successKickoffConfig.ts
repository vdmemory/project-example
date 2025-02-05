import {
    moneyPurpleImage,
    pinkHatImage,
    reachImage,
    manOliveImage,
    manYellowHandsUpImage,
    simpleLightningBlue,
} from '@breef/shared/assets';

export const successKickoffConfigAgency = {
    title: 'Here’s what’s next.',
    note: 'You’re one step closer to starting work. The client will review. Standby.',
    nextSteps: [
        {
            imageUrl: pinkHatImage.src,
            title: 'Client review',
            note: 'The info you uploaded will be confirmed by the client shortly.',
        },
        {
            imageUrl: manOliveImage.src,
            title: 'Get started',
            note: 'Once the client confirms, you’ll be notified and the project is officially a “go”!',
        },
        {
            imageUrl: reachImage.src,
            title: 'Project support',
            note: 'Questions? Changes in scope? You can always reach out to our team!',
        },
    ],
};

export const successKickoffConfigClient = {
    title: 'Here’s what’s next.',
    note: 'Finalize kickoff with any initial payments. We’ll let your agency know you’re ready to get started!',
    nextSteps: [
        {
            imageUrl: moneyPurpleImage.src,
            title: 'Project payments',
            note: 'Easily connect your bank info and make any initial payments (below).',
        },
        {
            imageUrl: simpleLightningBlue.src,
            title: 'Project updates',
            note: 'Monitor progess in your dashboard. Make any updates + payments in minutes.',
        },
        {
            imageUrl: manYellowHandsUpImage.src,
            title: 'Breef Support',
            note: 'We’re here to help. From changes to scope, payments and even new projects.',
        },
    ],
};
