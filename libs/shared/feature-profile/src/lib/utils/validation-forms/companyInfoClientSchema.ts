import * as yup from 'yup';

import { commonRulesForInfoSchema } from './commonRulesValidateInfoSchema';
import {
    ValidationErrorMessageMethodValueType,
    ValidationErrorType,
    validationErrorMessages,
} from '@breef/shared/utils';

export const companyInfoClientSchema = yup
    .object({
        ...commonRulesForInfoSchema,
        companySize: yup
            .string()
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('Company Size'),
            ),
    })
    .required();
