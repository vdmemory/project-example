//TODO: refactored this file to be more readable and easier to understand
export const stepsConfig = [
    {
        label: 'What’s your first name?',
        placeholder: 'First name',
        maxLength: 100,
        path: 'user.firstName',
        type: 'text',
    },
    {
        label: 'And your last name?',
        placeholder: 'Last name',
        maxLength: 100,
        path: 'user.lastName',
        type: 'text',
    },
    {
        label: "{firstName}, what's your company name?",
        placeholder: 'Your Company name',
        maxLength: 255,
        path: 'company.name',
        type: 'text',
    },
    {
        company: {
            label: 'There’s a lot we can help with. What’s #1 (for now)?',
            path: 'company.projectTypes',
            type: 'checkbox',
            choicesType: 'projectTypes',
        },
        agency: {
            label: 'How can Breef help your team?',
            path: 'company.usingTypes',
            type: 'checkbox',
            choicesType: 'usingTypes',
        },
        submit: 'button-big',
    },
];

export type StepsConfig = typeof stepsConfig;

export const stepsGoogleConfig = [
    {
        label: "{firstName}, what's your company name?",
        placeholder: 'Your Company name',
        maxLength: 255,
        path: 'company.name',
        type: 'text',
    },
    {
        company: {
            label: 'There’s a lot we can help with. What’s #1 (for now)?',
            path: 'company.projectTypes',
            type: 'checkbox',
            choicesType: 'projectTypes',
        },
        agency: {
            label: 'How can Breef help your team?',
            path: 'company.usingTypes',
            type: 'checkbox',
            choicesType: 'usingTypes',
        },
        submit: 'button-big',
    },
];

export type StepsGoogleConfig = typeof stepsGoogleConfig;
