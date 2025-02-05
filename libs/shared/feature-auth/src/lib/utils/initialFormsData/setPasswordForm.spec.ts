import { defaultSetPasswordFormValues } from './setPasswordForm';

describe('defaultSetPasswordFormValues', () => {
    it('returns an object with token and empty password', () => {
        const token = 'testtoken';
        const expectedOutput = {
            token,
            password: '',
        };
        expect(defaultSetPasswordFormValues(token)).toEqual(expectedOutput);
    });
});
