import {
    ComposeIcon,
    MoneyCoinsIcon,
    BenchmarkIcon,
    PitchesIcon,
    CalendarIcon,
    EyeIcon,
} from '@breef/shared/assets';

export const configTipsAgency = [
    {
        icon: <PitchesIcon />,
        label: 'Final Contract + SOW',
        note: 'Once your contract + SOW is agreed, both sides will sign on the dotted line. Upload all signed agreements to Breef.',
    },
    {
        icon: <CalendarIcon />,
        label: 'Payment Schedule',
        note: 'Step out your payment schedule to ensure you get paid correctly, and on time.',
    },
    {
        icon: <EyeIcon />,
        label: 'Client Review',
        note: 'When all the details have been uploaded, the client will provide final approval for project commencement.',
    },
    {
        icon: <MoneyCoinsIcon />,
        label: 'Get Started!',
        note: 'Once initial payments are made, work begins. Time to make magic!',
    },
];

export const configTipsClient = [
    {
        icon: <ComposeIcon />,
        label: 'Company Info',
        note: 'Confirm company info. This helps us manage billing and future projects.',
    },
    {
        icon: <PitchesIcon />,
        label: 'Confirm Details',
        note: 'Confirm the details entered by your agency. This ensures a smooth project.',
    },
    {
        icon: <MoneyCoinsIcon />,
        label: 'Connect Payments',
        note: 'Get set up for project payments. Invite your company’s payments team.',
    },
    {
        icon: <BenchmarkIcon />,
        label: 'Project Kickoff',
        note: 'Get started with your agency. Manage your progress + scope extensions on Breef.',
    },
];
