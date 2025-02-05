export const stepsConfig = [
    {
        label: 'What’s your first name?',
        placeholder: 'Your First name',
        maxLength: 100,
        path: 'userData.firstName',
        type: 'text',
        nameField: 'First Name',
        viewAcceptTerms: true,
    },
    {
        label: 'And your last?',
        placeholder: 'Your Last name',
        maxLength: 100,
        path: 'userData.lastName',
        type: 'text',
        nameField: 'Last Name',
        viewAcceptTerms: false,
    },
];

export type StepsConfigInviteType = typeof stepsConfig;
