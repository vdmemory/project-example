import { ProjectFormat } from '@breef/shared/constants';

export const configPaymentTypes = [
    {
        label: 'One-Time /\nmilestone',
        note: 'A single project that is completed within a defined timeframe.',
        paymentType: ProjectFormat.OneTime,
    },
    {
        label: 'Strategy +\nExecution',
        note: 'A project with an upfront strategy + ongoing management of that strategy.',
        paymentType: ProjectFormat.StrategyExecution,
    },
    {
        label: 'Ongoing or\nRetainer',
        note: 'A project that requires ongoing management or execution.',
        paymentType: ProjectFormat.OngoingRetainer,
    },
];
