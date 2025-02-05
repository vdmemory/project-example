import {
    ResetPassRequestType,
    UpdateEmailRequestType,
    InvitationUserRequestType,
    SignUpRequestType,
    SetPassRequestType,
} from '@breef/shared/types';

export type UpdateEmailFormValuesType = UpdateEmailRequestType;
export type SignUpFormValuesType = SignUpRequestType;
export type AcceptInviteFromValuesType = InvitationUserRequestType;
export type ResetPassFormValuesType = ResetPassRequestType;
export type SetPassFormValuesType = SetPassRequestType;
export type LoginLinkFormValuesType = {
    email: string;
    password: string;
    emailFindPassword?: string;
};

export type FetchErrorType = {
    status: number;
    data: {
        detail?: string;
        token?: string;
    };
};

export type ResetPassErrorType = {
    status: number;
    data: {
        confirmation_password?: string[];
        password?: string[];
        detail?: string[];
        token?: string[];
    };
};

export type RegistrationErrorType = {
    status: number;
    data: {
        user?: {
            email?: string[];
        };
        email?: string[];
        detail?: string[];
    };
};

export type LoginErrorType = {
    status: number;
    data: {
        detail?: string | string[];
        email?: string[];
        non_field_errors?: string[];
        admin?: string[];
    };
};
