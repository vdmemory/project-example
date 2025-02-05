import * as yup from 'yup';
import {
    errorMessages,
    getPasswordPattern,
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const signUpSchema = yup.object().shape({
    user: yup.object({
        role: yup.string().required('Please select the type of your company.'),
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
        email: yup
            .string()
            .min(2, errorMessages.emailNotValid)
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'E-mail'),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('E-mail'),
            )
            .email(errorMessages.emailNotValid),

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
    company: yup.object({
        name: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'Company name'),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'Company name'),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('Company name'),
            ),
    }),
});

const emailLoginSchema = yup
    .string()
    .required(errorMessages.emailNotValid)
    .min(2, errorMessages.emailNotValid)
    .max(
        255,
        (
            validationErrorMessages[
                ValidationErrorType.maxlength
            ] as ValidationErrorMessageMethodValueType
        )(255, 'E-mail'),
    )
    .email(errorMessages.emailNotValid);

export const loginSchema = yup
    .object({
        email: emailLoginSchema,
        password: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('Password'),
            ),
    })
    .required();

export const loginLinkSchema = yup
    .object({
        email: emailLoginSchema,
    })
    .required();

export const forgotPasswordSchema = yup
    .object({
        emailFindPassword: emailLoginSchema,
    })
    .required();
