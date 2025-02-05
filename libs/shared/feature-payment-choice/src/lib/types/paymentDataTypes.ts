export enum PaymentMethodNames {
    ACH = 'ach-payment',
    CARD = 'credit-card',
    WIRE = 'wire-transfer',
    BREEF = 'breef-pay',
}

export enum CreditCardView {
    LIST = 'LIST_CREDIT_CARD',
    FORM = 'FORM_PAY_CARD',
    SUCCESS = 'CARD_SUCCESS',
    FAILURE = 'CARD_FAILURE',
    PLACEHOLDER = 'CARD_PLACEHOLDER',
}

export enum AchView {
    LIST = 'LIST_BANKS_ACCOUNT',
    PREVIEW = 'BANK_PREVIEW',
    SUCCESS = 'BANK_SUCCESS',
    FAILURE = 'BANK_FAILURE',
}

export type CardType = {
    id: string;
    fullName: string;
    cardNumber: string;
    cardType: string;
};

export type BankType = {
    id: number | string;
    token: string;
    displayName?: string;
    institutionName: string;
    last4: string | null;
    type: string;
};

export type PaymentInfoType = {
    id: number | null;
    amount: string;
    deliverable: string;
};

export type PaymentCompanyInfoType = {
    id: number | null;
    agencyName: string;
    agencyLogoUrl: string;
};
