import * as yup from 'yup';
import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const invitationPopupSchema = yup
    .object()
    .shape({
        email: yup
            .string()
            .min(
                2,
                (
                    validationErrorMessages[
                        ValidationErrorType.minlength
                    ] as ValidationErrorMessageMethodValueType
                )(2),
            )
            .max(
                255,
                (
                    validationErrorMessages[
                        ValidationErrorType.maxlength
                    ] as ValidationErrorMessageMethodValueType
                )(255),
            )
            .required(
                (
                    validationErrorMessages[
                        ValidationErrorType.required
                    ] as ValidationErrorMessageMethodValueType
                )('E-mail'),
            )
            .email(validationErrorMessages[ValidationErrorType.email]),
    })
    .required();
