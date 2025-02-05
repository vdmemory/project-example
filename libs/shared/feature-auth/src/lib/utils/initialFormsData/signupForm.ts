import { SignUpFormValuesType } from '../../types/authFormTypes';

export const defaultSignUpFormValues = () => {
    return {
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
    } as SignUpFormValuesType;
};
