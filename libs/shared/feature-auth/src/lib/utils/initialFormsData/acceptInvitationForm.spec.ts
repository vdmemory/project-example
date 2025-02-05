import { AcceptInviteFromValuesType } from '../../types/authFormTypes';
import { defaultAcceptInviteFormValues } from './acceptInvitationFrom';

describe('defaultAcceptInviteFormValues', () => {
    it('returns expected object', () => {
        const token = 'randomtoken123';
        const expectedObject: AcceptInviteFromValuesType = {
            token,
            userData: {
                firstName: '',
                lastName: '',
                phoneNumber: '',
                acceptPrivacy: true,
                password: '',
            },
        };

        expect(defaultAcceptInviteFormValues(token)).toEqual(expectedObject);
    });
});
