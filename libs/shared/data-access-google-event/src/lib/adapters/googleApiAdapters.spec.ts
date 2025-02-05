import { transformUserInfo } from './googleApiAdapters';
import { UserInfoRequestType, UserInfoResponseType } from '@breef/shared/types';

describe('transformUserInfo', () => {
    it('should transform UserInfoRequestType to UserInfoResponseType correctly when family_name is provided', () => {
        const input: UserInfoRequestType = {
            given_name: 'John',
            family_name: 'Doe',
            email: 'john.doe@example.com',
        };
        const expectedOutput: UserInfoResponseType = {
            givenName: 'John',
            familyName: 'Doe',
            email: 'john.doe@example.com',
        };
        expect(transformUserInfo(input)).toEqual(expectedOutput);
    });

    it('should transform UserInfoRequestType to UserInfoResponseType correctly when family_name is not provided', () => {
        const input: UserInfoRequestType = {
            given_name: 'John',
            email: 'john.doe@example.com',
        };
        const expectedOutput: UserInfoResponseType = {
            givenName: 'John',
            familyName: 'John', // family_name defaults to given_name if not provided
            email: 'john.doe@example.com',
        };
        expect(transformUserInfo(input)).toEqual(expectedOutput);
    });
});
