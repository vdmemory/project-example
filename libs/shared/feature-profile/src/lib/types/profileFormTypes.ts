import {
    AccountInfoRequestType,
    BillingDataMergedType,
    ChangePasswordRequestType,
    SetPasswordRequestType,
    TeamMemberRequestType,
} from '@breef/shared/types';

export type AccountInfoFormValuesType = AccountInfoRequestType;
export type SetPasswordFormValuesType = SetPasswordRequestType;
export type ChangePasswordFormValuesType = ChangePasswordRequestType;
export type InviteTeamMemberFormValuesType = TeamMemberRequestType;
export type BillingDataFormValuesType = BillingDataMergedType;

export type setPasswordErrorType = {
    status: number;
    data: {
        confirm_password?: string[];
        new_password?: string[];
    };
};

export type changePasswordErrorType = {
    status: number;
    data: {
        old_password?: string[];
        confirm_password?: string[];
        new_password?: string[];
        non_field_errors?: string[];
    };
};

export type changeAccountInfoErrorType = {
    status: number;
    data: {
        email?: string[] | string;
        time_left?: string;
    };
};

export type changeCompanyInfoErrorType = {
    status: number;
    data: {
        social_links?: {
            link: string[];
        }[];
    };
};

export enum PaymentsView {
    LIST = 'LIST_ACCOUNT',
    CHOICE = 'CHOICE_PAYMENT_METHOD',
    ADD_CARD = 'ADD_CREDIT_CARD',
}

export type CardType = {
    id: string;
    fullName: string;
    cardNumber: string;
    cardType: string;
};

export type BankType = {
    id: string;
    bankName: string;
    accountNumber: string;
};

export type ListAccountsType = {
    id: string;
    type: string;
    name: string;
    number: string;
    typeIcon: string;

    displayName?: string;
    token?: string;
    brand: string;
};

export type ValueSelectType = {
    name: string;
    id: number;
};
