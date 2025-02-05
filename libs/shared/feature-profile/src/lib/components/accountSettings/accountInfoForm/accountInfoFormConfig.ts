import { ConfigInnerFormType } from '@breef/shared/ui-components';

export const accountInfoFormConfig = [
    {
        row: [
            {
                label: 'First name',
                name: 'firstName',
                placeholder: 'Your First Name',
                type: 'text',
                maxLength: 100,
                removeBreakSpaces: 'partially',
            },
            {
                label: 'Last name',
                name: 'lastName',
                placeholder: 'Your Last Name',
                type: 'text',
                maxLength: 100,
                removeBreakSpaces: 'partially',
            },
        ],
    },
    {
        label: 'Email',
        name: 'email',
        placeholder: 'Your Email',
        type: 'text',
        maxLength: 255,
        removeBreakSpaces: 'all',
    },
    {
        row: [
            {
                label: 'Phone number',
                name: 'phoneNumber',
                placeholder: '01-1234 5678',
                type: 'phone',
            },
            {
                label: 'Your role',
                name: 'role',
                type: 'text',
                isDisabled: true,
                isDisplayUppercaseValue: false,
                isDisplayCapitalizeValue: true,
            },
        ],
    },
] as ConfigInnerFormType;
