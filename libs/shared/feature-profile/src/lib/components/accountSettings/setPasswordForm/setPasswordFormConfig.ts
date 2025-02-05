import { ConfigInnerFormType } from '@breef/shared/ui-components';

export const setPasswordFormConfig = [
    {
        label: 'New password',
        name: 'newPassword',
        placeholder: 'Create new password.',
        type: 'password',
        maxLength: 36,
        removeBreakSpaces: 'all',
        suggested: 'new-password',
    },
    {
        label: 'Confirm new password',
        name: 'confirmNewPassword',
        placeholder: 'Confirm new password.',
        type: 'password',
        maxLength: 36,
        removeBreakSpaces: 'all',
        suggested: 'confirm-password',
    },
] as ConfigInnerFormType;
