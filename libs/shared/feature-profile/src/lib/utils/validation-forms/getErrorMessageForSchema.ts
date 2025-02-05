import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from '@breef/shared/utils';

export const getRequiredMessage = (name: string, number?: number) => {
    return (
        validationErrorMessages[
            ValidationErrorType.required
        ] as ValidationErrorMessageMethodValueType
    )(name, number);
};

export const getMaxLengthMessage = (name: string, number?: number) => {
    return (
        validationErrorMessages[
            ValidationErrorType.maxlength
        ] as ValidationErrorMessageMethodValueType
    )(number, name);
};

export const getMinLengthMessage = (name: string, number?: number) => {
    return (
        validationErrorMessages[
            ValidationErrorType.minlength
        ] as ValidationErrorMessageMethodValueType
    )(number, name);
};

export const getMinLengthMessageFromArray = (name: string, number?: number) => {
    return (
        validationErrorMessages[
            ValidationErrorType.minItemsLength
        ] as ValidationErrorMessageMethodValueType
    )(number, name);
};

export const getUrlMessage = (name: string) => {
    return (
        validationErrorMessages[
            ValidationErrorType.url
        ] as ValidationErrorMessageMethodValueType
    )(name);
};
