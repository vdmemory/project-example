import { parsePhoneNumberWithError } from 'libphonenumber-js';

type ParsedPhoneNumberObjType = {
    number: string;
    code: string;
    numberWithoutCountryCode: string;
};

export const parsePhoneNumberToObj = (
    phoneNumber?: string,
): ParsedPhoneNumberObjType => {
    try {
        const parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber || '');
        const countryCallingCode = '+' + parsedPhoneNumber.countryCallingCode;
        return {
            number: parsedPhoneNumber.number,
            code: countryCallingCode,
            numberWithoutCountryCode: parsedPhoneNumber.number.replace(
                countryCallingCode,
                '',
            ),
        };
    } catch (error) {
        return {
            number: phoneNumber || '',
            code: '',
            numberWithoutCountryCode: '',
        };
    }
};
