import { SignUpFormValuesType } from '../../types/authFormTypes';
import { defaultSignUpFormValues } from './signupForm';

describe('defaultSignUpFormValues', () => {
    it('should return an object containing default sign up form values', () => {
        const expected: SignUpFormValuesType = {
            accessToken: '',
            user: {
                role: '',
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                acceptPrivacy: false,
            },
            company: {
                name: '',
            },
        };
        const result = defaultSignUpFormValues();
        expect(result).toEqual(expected);
    });
});
