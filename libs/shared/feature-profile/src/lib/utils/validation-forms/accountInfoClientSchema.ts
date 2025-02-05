import * as yup from 'yup';

import { commonRulesForAccountInfoSchema } from './commonRulesValidateAccountInfoSchema';

export const accountInfoClientSchema = yup
    .object({
        ...commonRulesForAccountInfoSchema,
        phoneNumber: yup.object({
            number: yup.string(),
            code: yup.string(),
            numberWithoutCountryCode: yup
                .string()
                .nullable()
                .transform(value => (value ? value : null)),
        }),
    })
    .required();
