import {
    ValidationErrorMessageMethodValueType,
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';

export const getErrorMessage = (
    type: 'email' | 'detail' | 'pattern' | 'required',
    backendMessage: string,
) => {
    switch (type) {
        case 'email':
            return emailErrorMessageTransformer(backendMessage);
        case 'detail':
            return detailErrorMessageTransformer(backendMessage);
        case 'pattern':
            return validationErrorMessages[
                ValidationErrorType.pattern
            ] as string;
        case 'required':
            return (
                validationErrorMessages[
                    ValidationErrorType.required
                ] as ValidationErrorMessageMethodValueType
            )('Field');
        default:
            return backendMessage;
    }
};

const notExistRegExp = /User with email(.*)does not exists\./gm;

const emailValidation = (message: string) => {
    switch (message) {
        case 'Enter a valid email address.':
            return validationErrorMessages[ValidationErrorType.email] as string;
        case 'User does not exists.':
            return validationErrorMessages[
                ValidationErrorType.notExistRegExp
            ] as string;
        case 'user with this email already exists.':
            return (
                (
                    validationErrorMessages[
                        ValidationErrorType.exist
                    ] as ValidationErrorMessageMethodValueType
                )(ValidationErrorType.email) + ' Please sign in.'
            );
        case 'Account is existing. Try to login.':
            return (
                (
                    validationErrorMessages[
                        ValidationErrorType.exist
                    ] as ValidationErrorMessageMethodValueType
                )(ValidationErrorType.email) + ' Please sign in.'
            );
        case 'No active account found with the given credentials':
            return validationErrorMessages[
                ValidationErrorType.notFindPassword
            ] as string;
        case 'The user is not registered in the system.':
            return validationErrorMessages[
                ValidationErrorType.notExistRegExp
            ] as string;
        default:
            return message;
    }
};

const emailErrorMessageTransformer = (message: string) => {
    if (message.match(notExistRegExp)) {
        return validationErrorMessages[
            ValidationErrorType.notExistRegExp
        ] as string;
    } else {
        return emailValidation(message);
    }
};

const detailErrorMessageTransformer = (message: string) => {
    switch (message) {
        default:
            return message;
    }
};

export const errorMessages = {
    emailNotValid: validationErrorMessages[ValidationErrorType.email],
};
