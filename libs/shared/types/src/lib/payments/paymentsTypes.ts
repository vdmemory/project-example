import {
    MilestonePaymentRequestType,
    MilestonePaymentType,
    RetainerPaymentRequestType,
    RetainerPaymentType,
} from '../kickoff/kickoffTypes';
import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
    PaymentStatusNames,
    PaymentTermsId,
} from '@breef/shared/constants';
import { FileType, StatusTagType } from '../sharingTypes';

export type CouponType = 'percentage' | 'fixed_amount';

export type CouponsResponseType = {
    prefill_coupon: {
        id: number;
        name: string;
        promo_code: string;
        amount_off: number | null;
        percent_off: number | null;
        coupon_type: CouponType;
        description: string | null;
    } | null;
};

export type CouponsValidateResponseType = {
    id: number;
    name: string;
    promo_code: string;
    amount_off: number | null;
    percent_off: number | null;
    coupon_type: CouponType;
    description: string | null;
};

export type TransformCouponsResponseType = {
    id: number;
    name: string;
    promoCode: string;
    amountOff: number | null;
    percentOff: number | null;
    couponType: CouponType;
    description: string | null;
};

export type TransformBanksResponseType = {
    id: number | string;
    token: string;
    last4: string;
    displayName?: string;
    institutionName: string;
    type: string;
    brand: string;
    default?: boolean;
    expiredDate?: string;
};

export type BankFinancialConnectionType = {
    id: number;
    token: string;
    last4: string;
    display_name?: string;
    institution_name: string;
    default?: boolean;
    bank_account_type: string;
};

export type BanksResponseType = BankFinancialConnectionType[];

export type CardMoreResponseType = {
    id: string;
    card_number: number;
    brand: string;
    card_year: number;
    card_month: number;
    billing_details: {
        address: {
            country: string;
            line1: string;
            line2: string | null;
            postal_code: string;
            city: string | null;
            state: string | null;
        };
        name: string;
    };
};
export type TransformCardMoreResponseType = {
    token: string;
    last4: string;
    brand: string;
    type: PaymentStatusNames.CARD_EXIST;
    expiredDate: string;
    billingDetails: {
        address: {
            country: string;
            line1: string;
            line2: string | null;
            postalCode: string;
            city: string | null;
            state: string | null;
        };
        name: string;
    };
};

export type CardsResponseType = {
    id: string;
    card_number: string;
    brand: string;
    card_year: number;
    card_month: number;
    billing_details: {
        address: ShortBillingAddress;
        name: string;
    };
}[];

export type WireResponseType = {
    bank_name: string;
    routing: string;
    account: string;
    swift_code: string;
};

export type TransformConnectSessionResponseType = {
    customer: string;
    fc_session_secret: string;
};

export type TransformCardsResponseType = {
    id: number | string;
    token: string;
    last4: string;
    displayName?: string;
    institutionName: string;
    type: string;
    brand: string;
    default?: boolean;
    expiredDate?: string;
    address: ShortBillingAddress;
};

export type TransformWireResponseType = {
    bankAccount: {
        bankName: string;
        accountNumber: string;
        routingNumber: string;
    };
    code: string;
};

export type TransformConnectSessionRequestType = {
    customer: string;
    FCSessionSecret: string;
};

export type PaymentBankRequestType = {
    accounts: {
        FCAToken: string;
        displayName: string;
        institutionName: string;
        last4: string | null;
        status?: 'active' | 'inactive' | 'disconnected';
    }[];
};

export type TransformPaymentBankRequestType = {
    token: string;
    last4: string;
    display_name: string;
    institution_name: string;
};

export type PaymentCardRequestType = {
    projectId: number;
    token: string;
    cardHolder: string;
};

export type TransformPaymentCardRequestType = {
    token: string;
    project: number;
    cardholder_name: string;
};

export type PaymentAchDefaultBankRequestType = {
    token: string;
    paymentStatus: PaymentStatusNames;
};

export type TransformPaymentAchDefaultBankRequestType = {
    token: string;
    token_type: PaymentStatusNames;
};

export type PaymentRequestType = {
    paymentId: number;
    token: string;
    paymentStatus: string;
};

export type PaymentResponseType = {
    amount: string;
    transaction: string;
    pm_data: {
        last4: string;
        institution_name: string;
        display_name: string;
    };
};

export type TransformPaymentRequestType = {
    token: string;
    token_type: string;
    set_as_default?: boolean;
};

export type TransformPaymentResponseType = {
    amount: string;
    transaction: string;
    name?: string;
    last4: string;
};

export type PostProjectRequestType = {
    token: string;
    projectId: number;
    paymentStatus: string;
    code: string;
    acceptedTerms?: boolean;
};

export type TransformPostProjectRequestType = {
    token: string;
    project: number;
    token_type: string;
    promo_code?: string;
    accepted_terms?: boolean;
};

type PaymentStatusRequestType =
    | 'awaiting'
    | 'approval'
    | 'invoice_sent'
    | 'initial_proceed'
    | 'proceed'
    | 'received'
    | 'paid'
    | 'cancelled';
export type PaymentStatusType =
    | 'awaiting'
    | 'approval'
    | 'invoiceSent'
    | 'initialProceed'
    | 'proceed'
    | 'received'
    | 'paid'
    | 'cancelled';

type PaymentScheduleRequest = {
    id: string | number;
    deliverable: string;
    amount: string | number;
    team_take: string | number;
    invoice_date: string;
    schedule_type: string;
    payment_due: string;
    status: PaymentStatusRequestType;
    payment_frequency: string;
};

type PaymentScheduleResponse = {
    status: PaymentStatusType;
    scheduleType: string;
    deliverable: string;
    paymentDue: string;
    invoiceDate: string;
    amount: string | number;
    teamTake: string | number;
    id: string | number;
};

export type PaymentsScheduleRequestType = {
    payments: FullPaymentScheduleAgencyRequest[];
    payment_frequency: string | null;
    payment_terms?: string;
};
export type PaymentsScheduleType = {
    payments: FullPaymentScheduleAgency[];
    paymentFrequency: string | null;
    paymentTerms?: PaymentTermsId;
};
export type PaymentScheduleAgencyRequest = PaymentScheduleRequest & {
    number_of_payments: number;
};
export type FullPaymentScheduleAgencyRequest = PaymentScheduleAgencyRequest & {
    invoice_code: string;
    tag: PaymentScheduleTagRequest;
};
export type PaymentScheduleAgency = PaymentScheduleResponse & {
    numberOfPayments: number;
};
export type FullPaymentScheduleAgency = PaymentScheduleAgency & {
    invoiceCode: string;
    tag: PaymentScheduleTag;
};

export type PaymentScheduleKickoffRequest = {
    one_time_payments: PaymentScheduleRequest[];
    ongoing_payment:
        | (PaymentScheduleAgencyRequest & { payment_terms: string })
        | null;
};
export type PaymentScheduleKickoff = {
    oneTimePayments: PaymentScheduleResponse[];
    ongoingPayment:
        | (PaymentScheduleAgency & {
              paymentTerms: string;
              paymentFrequency: string;
          })
        | null;
};
export type PaymentsTable = {
    type?: string;
    invoiceDate: string;
    payBy: string;
    deliverable: string;
    amount: string;
    teamTake: string;
    id?: number;
};

export type PaymentInfoRequest = {
    id: number | string;
    invoice_code: string;
    deliverable: string;
    amount: string | number;
    team_take: string | number;
    invoice_date: string;
    schedule_type: string;
    payment_due: string;
    status: PaymentStatusRequestType;
    tag: PaymentScheduleTagRequest;
    project_name: string;
    agency_company_name: string;
    agency_logo_url: string;
};

export type PaymentInfo = {
    id: number | string;
    projectName: string;
    invoiceCode: string | number;
    invoiceDate: string;
    tag: StatusTagType | null;
    status: PaymentStatusRequestType;
    agencyName: string;
    agencyLogo: string;
    dueDate: string;
    deliverable: string;
    amount: number;
    total: number;
    paymentType: string;
};

export type AddPaymentsRequestType = {
    milestones?: MilestonePaymentRequestType[];
    retainer?:
        | RetainerPaymentRequestType
        | { number_of_payments: number }
        | null;
    contracts?: number[];
};

export type AddPaymentsType = {
    paymentsMilestone: MilestonePaymentType[];
    paymentsRetainer: RetainerPaymentType | null;
    files: FileType[];
};

export type StoredRetainerPaymentResponseType = {
    deliverable: string;
    amount: number | null;
    payment_frequency: string;
    number_of_payments: number;
    schedule_type: 'retainer' | 'ongoing';
};
export type StoredRetainerPaymentType = RetainerPaymentType | null;

export type PaymentActionType =
    | 'add'
    | 'addOrEdit'
    | 'addWithOngoing'
    | 'addWithOngoingEndRetainers'
    | 'onlyEditOngoing';

export type ListAccountsType = {
    id: string;
    type: string;
    name: string;
    number: string;
    typeIcon: string;

    displayName?: string;
    token?: string;
    brand: string;
    default?: boolean;
    expiredDate?: string;
    address?: ShortBillingAddress;
};

export type ShortBillingAddress = {
    line1: string;
    city: string | null;
    country: string | null;
};
