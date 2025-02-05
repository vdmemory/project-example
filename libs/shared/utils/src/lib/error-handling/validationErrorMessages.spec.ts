import {
    ValidationErrorType,
    validationErrorMessages,
} from './validationErrorMessages';

describe('Validation Error Messages', () => {
    it('Default error message', () => {
        expect(validationErrorMessages[ValidationErrorType.default]).toBe(
            'Sorry, something went wrong. Please try again later',
        );
    });

    describe('Dynamic error messages', () => {
        it('Minimum length error message', () => {
            const minLengthMessage = validationErrorMessages[
                ValidationErrorType.minlength
            ] as (minLength: number, field?: string) => string;
            expect(minLengthMessage(3)).toBe(
                'This field must be at least 3 characters.',
            );
            expect(minLengthMessage(1, 'Password')).toBe(
                'Password must be at least 1 character.',
            );
        });

        it('Maximum length error message', () => {
            const maxLengthMessage = validationErrorMessages[
                ValidationErrorType.maxlength
            ] as (minLength: number, field?: string) => string;
            expect(maxLengthMessage(10)).toBe(
                'This field should not exceed 10 characters.',
            );
            expect(maxLengthMessage(2, 'Username')).toBe(
                'Username should not exceed 2 characters.',
            );
        });

        it('Required field error message', () => {
            const requiredMessage = validationErrorMessages[
                ValidationErrorType.required
            ] as (field?: string) => string;
            expect(requiredMessage()).toBe('This field is required.');
            expect(requiredMessage('Email')).toBe('Email is required.');
        });

        it('Email error message', () => {
            expect(validationErrorMessages[ValidationErrorType.email]).toBe(
                'Please enter a valid email address.',
            );
        });

        it('User existence error message', () => {
            const existMessage = validationErrorMessages[
                ValidationErrorType.exist
            ] as (field?: string) => string;
            expect(existMessage('email')).toBe(
                'An account with this email already exists.',
            );
        });

        it('URL error message', () => {
            const urlMessage = validationErrorMessages[
                ValidationErrorType.url
            ] as (field?: string) => string;
            expect(urlMessage('Website')).toBe('Website must be a valid URL.');
        });

        it('Minimum items length message', () => {
            const minItemsMessage = validationErrorMessages[
                ValidationErrorType.minItemsLength
            ] as (minLength: number, field?: string) => string;
            expect(minItemsMessage(2)).toBe(
                'This field must have at least 2 items.',
            );
            expect(minItemsMessage(3, 'Tags')).toBe(
                'Tags must have at least 3 items.',
            );
        });

        it('Maximum items length message', () => {
            const maxItemsMessage = validationErrorMessages[
                ValidationErrorType.maxItemsLength
            ] as (maxLength: number, field?: string) => string;
            expect(maxItemsMessage(4)).toBe(
                'This field should not exceed 4 items.',
            );
            expect(maxItemsMessage(1, 'Selection')).toBe(
                'Selection should not exceed 1 item.',
            );
        });

        it('Match field error message', () => {
            const matchMessage = validationErrorMessages[
                ValidationErrorType.match
            ] as (field?: string) => string;
            expect(matchMessage('Selection')).toBe("Selection don't match.");
        });

        it('spam error message', () => {
            const matchMessage = validationErrorMessages[
                ValidationErrorType.spam
            ] as (field?: string) => string;
            expect(matchMessage('1000')).toBe(
                'Wait 1000 seconds and try again.',
            );
        });

        it('shared pages error message', () => {
            const matchMessage = validationErrorMessages[
                ValidationErrorType.sharedPages
            ] as (field?: string) => string;
            expect(matchMessage('Client')).toBe(
                'Client has closed access to the pitch information.',
            );
        });

        it('amount min error message', () => {
            const matchMessage = validationErrorMessages[
                ValidationErrorType.amountMin
            ] as (field?: string) => string;
            expect(matchMessage('200')).toBe('The amount must be at least 200');
        });
    });
});
