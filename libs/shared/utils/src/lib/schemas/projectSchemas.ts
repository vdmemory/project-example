import * as yup from 'yup';
import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '../error-handling/validationErrorMessages';

export const projectNameSchema = yup
    .string()
    .required(
        (
            validationErrorMessages[
                ValidationErrorType.required
            ] as ValidationErrorMessageMethodValueType
        )('Project Title'),
    )
    .min(
        1,
        (
            validationErrorMessages[
                ValidationErrorType.required
            ] as ValidationErrorMessageMethodValueType
        )('Project Title'),
    )
    .max(
        512,
        (
            validationErrorMessages[
                ValidationErrorType.maxlength
            ] as ValidationErrorMessageMethodValueType
        )(512, 'Project Title'),
    );
