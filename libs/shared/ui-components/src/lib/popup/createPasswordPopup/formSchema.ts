import * as yup from 'yup';
import {
    getPasswordPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const setPasswordSchema = yup
    .object({
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
            ),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref('password'), null],
                (
                    validationErrorMessages[
                        ValidationErrorType.match
                    ] as ValidationErrorMessageMethodValueType
                )('Passwords'),
            ),
    })
    .required();
