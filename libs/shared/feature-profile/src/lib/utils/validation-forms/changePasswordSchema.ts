import * as yup from 'yup';

import { commonRulesForPassword } from './commonRulesValidatePasswordSchema';

export const changePasswordSchema = yup
    .object({
        currentPassword: yup.string(),
        ...commonRulesForPassword,
    })
    .required();
