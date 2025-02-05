import { UserInfoRequestType, UserInfoResponseType } from '@breef/shared/types';

export const transformUserInfo = (
    data: UserInfoRequestType,
): UserInfoResponseType => {
    return {
        givenName: data.given_name,
        familyName: data.family_name ?? data.given_name,
        email: data.email,
    };
};
