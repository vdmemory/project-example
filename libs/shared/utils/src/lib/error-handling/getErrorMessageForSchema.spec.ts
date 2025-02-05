import {
    getRequiredMessage,
    getMaxLengthMessage,
    getMaxItemsMessage,
    getMinLengthMessage,
    getMinItemsMessage,
    getUrlMessage,
} from './getErrorMessageForSchema';

describe('Validation Message Generators', () => {
    it('generates a required field message correctly', () => {
        expect(getRequiredMessage('name')).toBe('name is required.');
    });

    it('generates a maximum length message correctly', () => {
        expect(getMaxLengthMessage('username', 10)).toBe(
            'username should not exceed 10 characters.',
        );
    });

    it('generates a maximum items message correctly', () => {
        expect(getMaxItemsMessage('tags', 5)).toBe(
            'tags should not exceed 5 items.',
        );
    });

    it('generates a minimum length message correctly', () => {
        expect(getMinLengthMessage('password', 8)).toBe(
            'password must be at least 8 characters.',
        );
    });

    it('generates a minimum items message correctly', () => {
        expect(getMinItemsMessage('choices', 2)).toBe(
            'choices must have at least 2 items.',
        );
    });

    it('generates a URL invalid message correctly', () => {
        expect(getUrlMessage('website')).toBe('website must be a valid URL.');
    });
});
