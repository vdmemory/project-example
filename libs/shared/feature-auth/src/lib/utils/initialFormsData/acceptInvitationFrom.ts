import { AcceptInviteFromValuesType } from '../../types/authFormTypes';

export const defaultAcceptInviteFormValues = (token: string) => {
    return {
        token,
        userData: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            acceptPrivacy: true,
            password: '',
        },
    } as AcceptInviteFromValuesType;
};
