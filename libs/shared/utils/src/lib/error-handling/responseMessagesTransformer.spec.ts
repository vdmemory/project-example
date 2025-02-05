import { getErrorMessage } from './responseMessagesTransformer';

describe('getErrorMessage', () => {
    it('returns correct error message for email validation', () => {
        const backendMessage = 'Enter a valid email address.';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual('Please enter a valid email address.');
    });

    it('returns correct error message for nonexistent user email', () => {
        const backendMessage = 'User does not exists.';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual(
            "Sorry, we don't recognize that email. Create an account.",
        );
    });

    it('returns correct error message for existing user email', () => {
        const backendMessage = 'user with this email already exists.';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual(
            'An account with this email already exists. Please sign in.',
        );
    });

    it('returns correct error message for existing user account', () => {
        const backendMessage = 'Account is existing. Try to login.';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual(
            'An account with this email already exists. Please sign in.',
        );
    });

    it('returns correct error message for existing credentials', () => {
        const backendMessage =
            'No active account found with the given credentials';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual(
            'We couldn’t find those credentials. Try again, or recover your password.',
        );
    });

    it('returns correct error message by default', () => {
        const backendMessage = 'Default error message';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual('Default error message');
    });

    it('returns correct error message for not registered user', () => {
        const backendMessage = 'The user is not registered in the system.';
        const errorMessage = getErrorMessage('email', backendMessage);
        expect(errorMessage).toEqual(
            "Sorry, we don't recognize that email. Create an account.",
        );
    });

    it('returns correct error message for missing required field', () => {
        const backendMessage = '';
        const errorMessage = getErrorMessage('required', backendMessage);
        expect(errorMessage).toEqual('Field is required.');
    });

    it('returns correct error message for missing detail field', () => {
        const backendMessage = 'Field is detail.';
        const errorMessage = getErrorMessage('detail', backendMessage);
        expect(errorMessage).toEqual('Field is detail.');
    });

    it('returns correct error message for missing pattern field', () => {
        const backendMessage = '';
        const errorMessage = getErrorMessage('pattern', backendMessage);
        expect(errorMessage).toEqual("Contact's email (format: xxx@xxx.xxx)");
    });

    it('returns correct error message for missing pattern field', () => {
        const backendMessage = 'Field is any.';
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const errorMessage = getErrorMessage('any', backendMessage);
        expect(errorMessage).toEqual('Field is any.');
    });
});
