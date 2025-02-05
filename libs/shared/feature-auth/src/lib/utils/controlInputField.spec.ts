import { controlInputField } from './controlInputField';
import { TypeFieldNames } from '@breef/shared/constants';

describe('controlInputField function', () => {
    it('should remove leading spaces and any duplicated spaces from a text input field', () => {
        const input = ' some   input  with   extra spaces   ';
        const expectedOutput = 'some input with extra spaces ';
        const output = controlInputField(TypeFieldNames.TEXT, input);
        expect(output).toBe(expectedOutput);
    });

    it('should remove all spaces from a password input field', () => {
        const input = 'password with spaces   ';
        const expectedOutput = 'passwordwithspaces';
        const output = controlInputField(TypeFieldNames.PASSWORD, input);
        expect(output).toBe(expectedOutput);
    });

    it('should remove all spaces from an email input field', () => {
        const input = ' email@with spaces.com  ';
        const expectedOutput = 'email@withspaces.com';
        const output = controlInputField(TypeFieldNames.EMAIL, input);
        expect(output).toBe(expectedOutput);
    });

    it('should return the original value for an unsupported input type', () => {
        const input = 'unsupported field type';
        const output = controlInputField(
            'nonexistent-type' as TypeFieldNames,
            input,
        );
        expect(output).toBe(input);
    });
});
