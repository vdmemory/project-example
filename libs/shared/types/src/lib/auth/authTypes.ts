export type RoleType = 'company' | 'agency' | '';

// login
export type LoginResponseType = {
    refresh: string;
    access: string;
    is_old_user: boolean;
};
export type LoginRequestType = {
    email: string;
    password?: string;
};
// registration
export type SignUpResponseType = {
    company: {
        id: number;
        name: string;
    };
    auth_data: {
        refresh: string;
        access: string;
    };
    project_id?: number | null;
};
export type SignUpProjectType = {
    skills?: string | string[];
    start?: string;
    budget?: string;
};
export type SignUpRequestType = {
    accessToken?: string;
    user: {
        role: RoleType;
        firstName: string;
        lastName: string;
        acceptPrivacy: boolean;
        email: string;
        password: string;
    };
    company: {
        name: string;
    };
    project?: SignUpProjectType;
    utm?: {
        [key: string]: string;
    };
};
// reset password
export type ResetPassResponseType = {
    detail: string;
};
export type ResetPassRequestType = {
    password: string;
    confirmPassword: string;
    token: string;
};
// refresh token
export type RefreshTkResponseType = {
    refresh: string;
    access: string;
};
// forgot pass
export type ForgotPassResponseType = Record<string, never>;
export type ForgotPassRequestType = {
    email: string;
};
// set pass
export type SetPassResponseType = {
    refresh: string;
    access: string;
};
export type SetPassRequestType = {
    password: string;
    token: string;
};
// confirm email
export type ConfirmEmailResponseType = {
    refresh: string;
    access: string;
};
export type ConfirmEmailRequestType = {
    token: string;
};
export type ImpersonateResponseType = {
    refresh: string;
    access: string;
    is_old_user: boolean;
};
export type ImpersonateRequestType = {
    token: string;
};
// update email
export type UpdateEmailResponseType = Record<string, never>;
export type UpdateEmailRequestType = {
    emailToConfirm: string;
    password: string;
};
// google auth
export type AuthGoogleType = {
    accessToken: string;
    user?: {
        email?: string;
        lastName?: string;
        firstName?: string;
        role?: RoleType;
        acceptPrivacy?: boolean;
    };
    company?: {
        name?: string;
    };
};
export type GoogleResponseType = {
    access: string;
    refresh: string;
    project_id?: number | null;
};
export type GoogleRequestType = {
    user?: {
        role: RoleType;
        acceptPrivacy: boolean;
    };
    accessToken: string;
    utm?: {
        [key: string]: string;
    };
    project?: SignUpProjectType;
};

export type GooglePreparedRequestType = {
    accept_privacy: boolean;
    access_token: string;
    project?: {
        skills?: number[];
    };
};

// check the type of user (client or agency)
export type GetSelfResponseType = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    company_type: string;
    phone_number?: string;
    is_onboarding_complete?: boolean;
    company_position: string;
    time_zone: string;
    has_social_account: boolean;
    date_joined: string;
    company_name: string;
    company_id: number;
    has_password: boolean;
};
export type GetSelfMergedResponseType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    companyType: string;
    phoneNumber?: string;
    isOnboardingComplete: boolean;
    companyPosition: string;
    timeZone: string;
    hasSocialAccount: boolean;
    dateJoined: string;
    companyName: string;
    companyId: number;
    hasPassword: boolean;
};

// checking the existence of the email in the database
export type CheckEmailRequestType = {
    email: string;
};

export type CheckEmailResponseType = Record<string, never>;

// check token expiration date and user status
export type CheckTokenType = {
    token: string;
};

export enum AuthValidationType {
    SIGN_UP = 'sign_up',
    ACCEPT_INVITE = 'accept_invite',
}

export type CheckUserStatusResponseType = {
    token?: string;
    email?: string;
    validation_type?: AuthValidationType;
};

export type CheckUserStatusRequestType = {
    token?: string;
    email?: string;
    validationType?: AuthValidationType;
};

// invitation user
export type InvitationUserRequestType = {
    token: string;
    userData: {
        firstName: string;
        lastName: string;
        phoneNumber: string;
        acceptPrivacy: boolean;
        password: string;
    };
};

export type InvitationUserResponseType = {
    access: string;
    refresh: string;
};
