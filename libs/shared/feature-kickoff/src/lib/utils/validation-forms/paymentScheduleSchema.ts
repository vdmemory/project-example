import {
    ValidationErrorMessageMethodValueType,
    ValidationErrorType,
    validationErrorMessages,
} from '@breef/shared/utils';
import * as yup from 'yup';

const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

export const paymentScheduleSchema = yup
    .object()
    .shape({
        paymentsType: yup.string().min(1).required(),
        paymentsMilestone: yup
            .array()
            .when('paymentsType', {
                is: (val: string) =>
                    val === 'one_time' || val === 'strategy_execution',
                then: schema =>
                    schema
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
                                        )(1, 'This field'),
                                    )
                                    .max(
                                        100,
                                        (
                                            validationErrorMessages[
                                                ValidationErrorType.maxlength
                                            ] as ValidationErrorMessageMethodValueType
                                        )(100, 'This field'),
                                    )
                                    .required(
                                        (
                                            validationErrorMessages[
                                                ValidationErrorType.required
                                            ] as ValidationErrorMessageMethodValueType
                                        )('This field'),
                                    ),
                                invoiceDate: yup
                                    .date()
                                    .min(
                                        currentDate,
                                        validationErrorMessages[
                                            ValidationErrorType.invoiceDate
                                        ],
                                    )
                                    .required(
                                        (
                                            validationErrorMessages[
                                                ValidationErrorType.required
                                            ] as ValidationErrorMessageMethodValueType
                                        )('This field'),
                                    ),
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
                                    .required(
                                        (
                                            validationErrorMessages[
                                                ValidationErrorType.required
                                            ] as ValidationErrorMessageMethodValueType
                                        )('This field'),
                                    ),
                            }),
                        )
                        .min(1)
                        .required(),
            })
            .when('paymentsType', {
                is: 'ongoing_or_retainer',
                then: schema => schema.min(0).max(0),
            }),
        paymentsRetainer: yup
            .object()
            .when('paymentsType', {
                is: 'one_time',
                then: schema => schema.nullable(),
            })
            .when('paymentsType', {
                is: (val: string) =>
                    val === 'strategy_execution' ||
                    val === 'ongoing_or_retainer',
                then: schema =>
                    schema
                        .shape({
                            deliverable: yup
                                .string()
                                .min(1)
                                .max(100)
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
                            invoiceDate: yup
                                .date()
                                .min(
                                    currentDate,
                                    validationErrorMessages[
                                        ValidationErrorType.invoiceDate
                                    ] as ValidationErrorMessageMethodValueType,
                                )
                                .required(),
                            paymentFrequency: yup.string().min(1).required(),
                            numberOfPayments: yup.string().min(1).required(),
                        })
                        .when('paymentsType', {
                            is: 'strategy_execution',
                            then: schema => schema.nullable(),
                        }),
            }),
        paymentTerms: yup.string().min(1).required(),
    })
    .required();
