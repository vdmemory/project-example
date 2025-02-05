import * as yup from 'yup';
import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const billingAddressSchema = yup
    .object({
        legalName: yup
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
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255),
            ),
        billingAddress: yup
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
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255),
            ),
        billingAddressAdditional: yup
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
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255),
            )
            .nullable()
            .transform(value => (value ? value : null)),
    })
    .required();
