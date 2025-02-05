import {
    ctaBubbleImage,
    manPurpleImage,
    moneyGreenImage,
} from '@breef/shared/assets';

export const whatsNextConfig = [
    {
        id: 'card-1',
        img: ctaBubbleImage.src,
        imgClassName: 'card-item-0',
        title: 'Finalize contract',
        subtitle:
            'Work with your agency to finalize contract, scope of work, + payment terms.',
    },
    {
        id: 'card-2',
        img: manPurpleImage.src,
        imgClassName: 'card-item-1',

        title: 'project kickoff',
        subtitle:
            'Get ready for kickoff. Confirm timing and details before starting work.',
    },
    {
        id: 'card-3',
        img: moneyGreenImage.src,
        imgClassName: 'card-item-2',

        title: 'Setup payments',
        subtitle:
            'It’s quick + easy. A reminder, all payments are processed on Breef.',
    },
];
