import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';

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
export const getMaxItemsMessage = (name: string, number?: number) => {
    return (
        validationErrorMessages[
            ValidationErrorType.maxItemsLength
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

export const getMinItemsMessage = (name: string, number?: number) => {
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
