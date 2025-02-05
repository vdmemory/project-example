import {
    ValidationErrorMessageMethodValueType,
    ValidationErrorType,
    validationErrorMessages,
} from '@breef/shared/utils';
import * as yup from 'yup';

export const billingDataSchema = yup
    .object()
    .shape({
        legalName: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'This field'),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'This field'),
            ),
        billingAddress: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'This field'),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'This field'),
            ),
        billingAddressAdditional: yup
            .string()
            .min(
                1,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(1, 'This field'),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255, 'This field'),
            )
            .nullable()
            .transform(value => (value ? value : null)),
        teamMembers: yup
            .array()
            .of(
                yup.object({
                    email: yup
                        .string()
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.minlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1, 'This field'),
                        )
                        .max(
                            100,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(100, 'This field'),
                        ),
                }),
            )
            .nullable()
            .transform(value => (value ? value : null)),
        teamInvites: yup
            .array()
            .of(
                yup.object({
                    email: yup
                        .string()
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.minlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1, 'This field'),
                        )
                        .max(
                            100,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(100, 'This field'),
                        ),
                }),
            )
            .nullable()
            .transform(value => (value ? value : null)),
        invites: yup
            .array()
            .of(
                yup.object({
                    email: yup
                        .string()
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.minlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1, 'This field'),
                        )
                        .max(
                            100,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.maxlength
                                ] as ValidationErrorMessageMethodValueType
                            )(100, 'This field'),
                        ),
                }),
            )
            .nullable()
            .transform(value => (value ? value : null)),
        files: yup
            .array()
            .of(
                yup.object({
                    id: yup.string(),
                    title: yup.string(),
                    link: yup.string(),
                    loading: yup.bool().oneOf([false]),
                }),
            )
            .min(1),
    })
    .required();
