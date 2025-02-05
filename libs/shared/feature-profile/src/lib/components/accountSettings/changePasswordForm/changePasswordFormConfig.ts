import { ConfigInnerFormType } from '@breef/shared/ui-components';

export const changePasswordFormConfig = [
    {
        label: 'Current password',
        name: 'currentPassword',
        placeholder: 'Enter Current Password',
        type: 'password',
        suggested: 'new-password',
    },
    {
        label: 'New password',
        name: 'newPassword',
        placeholder: 'Enter New Password',
        type: 'password',
        maxLength: 36,
        removeBreakSpaces: 'all',
        suggested: 'new-password',
    },
    {
        label: 'Confirm new password',
        name: 'confirmNewPassword',
        placeholder: 'Enter New Password',
        type: 'password',
        maxLength: 36,
        removeBreakSpaces: 'all',
        suggested: 'new-password',
    },
] as ConfigInnerFormType;
