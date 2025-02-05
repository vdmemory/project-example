import {
    BillingDataType,
    KickoffDataType,
    MilestonePaymentType,
    PaymentScheduleType,
    RetainerPaymentType,
} from '@breef/shared/types';

export type InitialStateKickoffType = {
    kickoff: KickoffFormType;
    paymentsOneTime: {
        paymentsMilestone: MilestonePaymentType[];
        paymentsRetainer: RetainerPaymentType | null;
    };
    paymentsStrategyExecution: {
        paymentsMilestone: MilestonePaymentType[];
        paymentsRetainer: RetainerPaymentType | null;
    };
    paymentsOngoingRetainer: {
        paymentsMilestone: MilestonePaymentType[];
        paymentsRetainer: RetainerPaymentType | null;
    };

    step: number;
};

export type KickoffFormType = KickoffDataType;
export type BillingDataFormType = BillingDataType;
export type PaymentScheduleFormType = PaymentScheduleType;
