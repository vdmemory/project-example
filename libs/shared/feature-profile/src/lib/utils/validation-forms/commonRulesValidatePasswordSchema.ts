import * as yup from 'yup';
import {
    getPasswordPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const commonRulesForPassword = {
    newPassword: yup
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
    confirmNewPassword: yup
        .string()
        .max(
            36,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(36),
        )
        .oneOf(
            [yup.ref('newPassword'), null],
            (
                validationErrorMessages[
                    ValidationErrorType.match
                ] as ValidationErrorMessageMethodValueType
            )('Passwords'),
        ),
};
