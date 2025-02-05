import * as yup from 'yup';
import {
    errorMessages,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const commonRulesForAccountInfoSchema = {
    firstName: yup
        .string()
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.minlength
                ] as ValidationErrorMessageMethodValueType
            )(1),
        )
        .max(
            100,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(100),
        ),
    lastName: yup
        .string()
        .min(
            1,
            (
                validationErrorMessages[
                    ValidationErrorType.minlength
                ] as ValidationErrorMessageMethodValueType
            )(1),
        )
        .max(
            100,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(100),
        ),
    email: yup
        .string()
        .min(2, errorMessages.emailNotValid)
        .email(errorMessages.emailNotValid)
        .max(
            255,
            (
                validationErrorMessages[
                    ValidationErrorType.maxlength
                ] as ValidationErrorMessageMethodValueType
            )(255),
        ),
};
