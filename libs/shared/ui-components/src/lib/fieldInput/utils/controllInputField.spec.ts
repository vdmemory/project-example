/* eslint-disable @typescript-eslint/ban-ts-comment */
import { controlInputField } from './controlInputField';
import { TypeFieldNames } from '@breef/shared/constants';

describe('controlInputField', () => {
    it('correctly formats text input', () => {
        const inputValue = '  Test   input ';
        const formattedValue = controlInputField(
            TypeFieldNames.TEXT,
            inputValue,
        );
        expect(formattedValue).toBe(' Test input ');
    });

    it('removes spaces for password input', () => {
        const inputValue = ' Password 123 ';
        const formattedValue = controlInputField(
            TypeFieldNames.PASSWORD,
            inputValue,
        );
        expect(formattedValue).toBe('Password123');
    });

    it('removes spaces for email input', () => {
        const inputValue = ' test@example.com ';
        const formattedValue = controlInputField(
            TypeFieldNames.EMAIL,
            inputValue,
        );
        expect(formattedValue).toBe('test@example.com');
    });

    it('returns value as is for unknown type', () => {
        const inputValue = ' Test Input ';
        // @ts-ignore
        const formattedValue = controlInputField('unknown', inputValue);
        expect(formattedValue).toBe(inputValue);
    });
});
