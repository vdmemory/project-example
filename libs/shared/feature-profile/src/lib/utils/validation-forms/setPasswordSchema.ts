import * as yup from 'yup';
import { commonRulesForPassword } from './commonRulesValidatePasswordSchema';

export const setPasswordSchema = yup
    .object({
        ...commonRulesForPassword,
    })
    .required();
