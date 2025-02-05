import {
    getPasswordPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import * as yup from 'yup';

export const setPasswordSchema = yup.object({
    password: yup
        .string()
        .min(6, validationErrorMessages[ValidationErrorType.password])
        .matches(
            getPasswordPattern(),
            validationErrorMessages[ValidationErrorType.password],
        )
        .max(
            36,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(36),
        )
        .required(
            (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Password'),
        ),
});
