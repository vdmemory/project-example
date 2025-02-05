import { parsePhoneNumberWithError } from 'libphonenumber-js';

export const checkPhoneNumberError = (
    phoneNumber: string,
    onError: () => void,
    callbackFn?: () => void,
) => {
    try {
        const parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber);
        if (parsedPhoneNumber.isValid()) {
            if (callbackFn) return callbackFn();
        } else {
            onError();
        }
    } catch (error) {
        onError();
    }
};
