import {
    ValidationErrorMessageMethodValueType,
    ValidationErrorType,
    validationErrorMessages,
} from '@breef/shared/utils';
import * as yup from 'yup';

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

export const addPaymentsSchema = yup
    .object()
    .shape(
        {
            paymentsMilestone: yup
                .array()
                .of(
                    yup.object({
                        deliverable: yup
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
                            )
                            .required(),
                        invoiceDate: yup.date().min(currentDate).required(),
                        amount: yup
                            .number()
                            .min(
                                0.01,
                                (
                                    validationErrorMessages[
                                        ValidationErrorType.amountMin
                                    ] as ValidationErrorMessageMethodValueType
                                )(0.01),
                            )
                            .required(),
                    }),
                )
                .when('paymentsRetainer', {
                    is: (val: object | null) => val !== null,
                    then: schema => schema.min(0),
                    otherwise: schema => schema.min(1),
                })
                .required(),
            paymentsRetainer: yup
                .object({
                    deliverable: yup
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
                        )
                        .required(),
                    amount: yup
                        .number()
                        .min(
                            0.01,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.amountMin
                                ] as ValidationErrorMessageMethodValueType
                            )(0.01),
                        )
                        .required(),
                    invoiceDate: yup.date().required(),
                    paymentFrequency: yup
                        .string()
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.minlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1),
                        )
                        .required(),
                    numberOfPayments: yup
                        .string()
                        .min(
                            1,
                            (
                                validationErrorMessages[
                                    ValidationErrorType.minlength
                                ] as ValidationErrorMessageMethodValueType
                            )(1),
                        )
                        .required(),
                })
                .when('paymentsMilestone', {
                    is: (val: []) => val.length !== 0,
                    then: schema => schema.nullable(),
                }),
            files: yup.array().of(
                yup.object({
                    id: yup.string(),
                    title: yup.string(),
                    link: yup.string(),
                    loading: yup.bool().oneOf([false]),
                }),
            ),
        },
        [['paymentsMilestone', 'paymentsRetainer']],
    )
    .required();
