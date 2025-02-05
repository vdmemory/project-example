export type UserInfoResponseType = {
    givenName: string;
    familyName: string;
    email: string;
};

export type UserInfoRequestType = {
    given_name: string;
    family_name?: string;
    email: string;
};
