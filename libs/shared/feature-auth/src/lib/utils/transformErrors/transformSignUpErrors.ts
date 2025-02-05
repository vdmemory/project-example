import { getCamelCase } from '@breef/shared/utils';

enum CustomMessageNames {
    EXIST = 'An account with this email already exists. Please log in.',
    INVITED = 'This email address has already been invited to Breef. Please check your inbox, or ask a colleague to resend the invite"',
    INVALID = 'Please enter a valid email address.',
}
export enum BackMessageNames {
    EXIST = 'Email already exists.',
    INVITED = 'User with this email invited.',
    INVALID = 'Enter a valid email address.',
}

const backMessages = [
    BackMessageNames.EXIST,
    BackMessageNames.INVITED,
    BackMessageNames.INVALID,
];
const customMessages = [
    CustomMessageNames.EXIST,
    CustomMessageNames.INVITED,
    CustomMessageNames.INVALID,
];

export type SignUpErrorType = {
    data: {
        [key: string]:
            | (string[] | string)
            | {
                  [key: string]: string[];
              };
    };
    status: number | string;
};

export type SignUpErrorReturnType = {
    field: string;
    message: string;
}[];

export const updateKeyFromForm = (key: string) => {
    if (key === 'detail') return 'email';
    if (key === 'non_field_errors') return 'email';
    return getCamelCase(key);
};

export const getSignUpFormErrors = (
    errors: SignUpErrorType,
): SignUpErrorReturnType => {
    const transformedErrors: SignUpErrorReturnType = [];

    if (errors.data) {
        Object.keys(errors.data).forEach(key => {
            if (key === 'user') {
                Object.keys(errors.data['user']).forEach(item => {
                    const user = errors.data['user'] as {
                        [key: string]: string[];
                    };
                    transformedErrors.push({
                        field: `user.${updateKeyFromForm(item)}`,
                        message: user[item].join(),
                    });
                });
                return;
            }

            if (Array.isArray(errors.data[key])) {
                transformedErrors.push({
                    field: `user.${updateKeyFromForm(key)}`,
                    message: (errors.data[key] as string[]).join(),
                });
                return;
            }

            transformedErrors.push({
                field: `user.${updateKeyFromForm(key)}`,
                message: errors.data[key] as string,
            });
        });
    }

    return transformedErrors;
};

export const getCustomMessage = (message: string) => {
    if (backMessages.includes(message as BackMessageNames)) {
        return customMessages[
            backMessages.indexOf(message as BackMessageNames)
        ];
    }
    return message;
};
