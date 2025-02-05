import {
    getPasswordPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';
import * as yup from 'yup';

export const acceptInviteSchema = yup.object({
    userData: yup.object({
        firstName: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'First name'),
            )
            .max(
                100,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(100, 'First name'),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('First name'),
            ),
        lastName: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'Last name'),
            )
            .max(
                100,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(100, 'Last name'),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('Last name'),
            ),
        acceptPrivacy: yup
            .boolean()
            .required()
            .oneOf(
                [true],
                validationErrorMessages[
                    ValidationErrorType.checked
                ] as ValidationErrorMessageMethodValueType,
            ),
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
    }),
});
