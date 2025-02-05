import * as yup from 'yup';
import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import { commonRulesForAccountInfoSchema } from './commonRulesValidateAccountInfoSchema';

export const accountInfoAgencySchema = yup
    .object({
        ...commonRulesForAccountInfoSchema,
        phoneNumber: yup.object({
            number: yup.string(),
            code: yup.string(),
            numberWithoutCountryCode: yup
                .string()
                .min(
                    2,
                    (
                        validationErrorMessages[
                            ValidationErrorType.required
                        ] as ValidationErrorMessageMethodValueType
                    )('Phone Number'),
                ),
        }),
    })
    .required();
