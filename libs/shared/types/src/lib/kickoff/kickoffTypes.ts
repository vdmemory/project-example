import { FileType } from '../sharingTypes';

export type TeamMemberType = {
    id: number;
    email: string;
    phoneNumber?: string;
    firstName?: string;
    lastName?: string;
};

export type BillingDataType = {
    legalName: string;
    billingAddress: string;
    billingAddressAdditional: string;
    teamMembers: { id: number; email: string }[];
    teamInvites: { id: number; email: string }[];
    invites: { email: string; phoneNumber?: string; checked?: boolean }[];
    files: FileType[];
};

export type PaymentScheduleType = {
    paymentsType: 'one_time' | 'strategy_execution' | 'ongoing_or_retainer';
    paymentsMilestone: MilestonePaymentType[];
    paymentsRetainer: RetainerPaymentType | null;
    paymentTerms: string;
};

export type PaymentTermsType = {
    isAcceptedTerms: boolean;
};

export type MilestonePaymentRequestType = {
    amount: number | null;
    deliverable: string;
    invoice_date: string;
    id: number;
    payment_due: string;
    schedule_type: string;
    status: string;
};

export type MilestonePaymentType = {
    deliverable: string;
    invoiceDate: string;
    amount: number | null;
    id: number;
    paymentDue: string;
    scheduleType: string;
    status: string;
};

export type RetainerPaymentRequestType = MilestonePaymentRequestType & {
    payment_frequency: string;
    number_of_payments: number;
    payment_due?: string;
    schedule_type?: 'retainer' | 'ongoing';
};

export type RetainerPaymentType = {
    id: number;
    amount: number | null;
    deliverable: string;
    invoiceDate: string;
    paymentDue?: string;
    paymentFrequency: string;
    numberOfPayments: string;
    scheduleType?: 'retainer' | 'ongoing';
};

type KickoffRequestAdditionalParams = {
    projectId: number;
    mode: 'create' | 'edit';
    userType: 'client' | 'agency';
};
type KickoffSaveStatusType = {
    status:
        | 'draft'
        | 'awaiting_approval'
        | 'approved_by_breef'
        | 'approved_by_client';
};

export type KickoffDataType = BillingDataType &
    PaymentScheduleType &
    PaymentTermsType;

export type KickoffRequestType = KickoffDataType &
    KickoffRequestAdditionalParams &
    KickoffSaveStatusType;

export type KickoffResponseType = {
    kickoff_members: {
        id: number;
        email: string;
        first_name: string;
        last_name: string;
        phone_number?: string;
    }[];
    contracts: {
        id?: number | string | null;
        name: string;
        url: string;
        thumbnail_url?: string;
    }[];
    kickoff_type: 'one_time' | 'strategy_execution' | 'ongoing_or_retainer';
    milestones: MilestonePaymentRequestType[];
    retainer: RetainerPaymentRequestType | null;
    payment_terms: string;
    accepted_terms: boolean;
    status:
        | 'draft'
        | 'awaiting_approval'
        | 'approved_by_breef'
        | 'approved_by_client';
};
export type KickoffMergedResponseType = {
    isAcceptedTerms: boolean;
    paymentsType: 'one_time' | 'strategy_execution' | 'ongoing_or_retainer';
    paymentsMilestone: MilestonePaymentType[];
    paymentsRetainer: RetainerPaymentType | null;
    paymentTerms: string;
    files: FileType[];
    teamMembers: TeamMemberType[];
    teamInvites: TeamMemberType[];
    invites: { email: string; phoneNumber?: string; checked?: boolean }[];
    status:
        | 'draft'
        | 'awaiting_approval'
        | 'approved_by_breef'
        | 'approved_by_client';
};

export type KickoffAgencyBillingInfoType = {
    legalName: string;
    billingAddress: string;
    billingAddressAdditional: string;
    teamMembers: TeamMemberType[];
};

export type KickoffAgencyBillingInfoRequestType = {
    legal_name: string;
    billing_address: string;
    address_additional_info?: string;
    team_members: [
        {
            id: number;
            email: string;
            phone_number?: string;
            first_name?: string;
            last_name?: string;
        },
    ];
};
