import { TypeButton } from '@breef/shared/types';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { typeFields } from '@breef/shared/ui-components';

export const findPassEmailFormConfig = {
    email: {
        isVisibleStepInfo: false,
        label: 'Please, enter your email address',
        typeField: typeFields.emailFindPasswordBackBtn,
        typeInput: 'text',
        typeButton: 'submit' as TypeButton,
        placeholder: 'Your email',
        defaultValue: '',
        path: 'emailFindPassword',
        rules: {
            required: true,
        },
        maxLength: 255,
    },
};
