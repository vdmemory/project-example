/* eslint-disable @typescript-eslint/ban-ts-comment */
import { parsePhoneNumberToObj } from './parsePhoneNumberToObj';
import { parsePhoneNumberWithError } from 'libphonenumber-js';

jest.mock('libphonenumber-js', () => ({
    parsePhoneNumberWithError: jest.fn(),
}));

describe('parsePhoneNumberToObj', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should parse valid phone number and return the object', () => {
        const phoneNumber = '+123456789'; // Example valid phone number
        const parsedPhoneNumberObj = {
            countryCallingCode: '+1',
            number: '23456789',
        };
        // @ts-ignore
        parsePhoneNumberWithError.mockReturnValue(parsedPhoneNumberObj);
        const result = parsePhoneNumberToObj(phoneNumber);
        expect(parsePhoneNumberWithError).toHaveBeenCalledWith(phoneNumber);
        expect(result).toEqual({
            number: parsedPhoneNumberObj.number,
            code: '++1',
            numberWithoutCountryCode: '23456789',
        });
    });

    it('should handle invalid phone number and return an empty object', () => {
        const invalidPhoneNumber = 'invalid';
        // @ts-ignore
        parsePhoneNumberWithError.mockImplementation(() => {
            throw new Error('Invalid phone number');
        });
        const result = parsePhoneNumberToObj(invalidPhoneNumber);
        expect(parsePhoneNumberWithError).toHaveBeenCalledWith(
            invalidPhoneNumber,
        );
        expect(result).toEqual({
            number: 'invalid',
            code: '',
            numberWithoutCountryCode: '',
        });
    });
});
