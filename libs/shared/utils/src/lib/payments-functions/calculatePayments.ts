import { MilestonePaymentType, RetainerPaymentType } from '@breef/shared/types';

export const calculateSummaryMilestones = (
    milestones: MilestonePaymentType[],
) => {
    if (milestones.length !== 0) {
        return milestones
            .map(item =>
                !isNaN(Number(item.amount)) ? Number(item.amount) : 0,
            )
            .reduce((acc, curr) => acc + curr);
    }
    return 0;
};
export const calculateSummaryRetainer = (
    retainer: RetainerPaymentType | null,
) => {
    const amount = Number(retainer?.amount);
    const numberOfPayments = Number(retainer?.numberOfPayments);
    if (retainer && !isNaN(amount)) {
        if (retainer.numberOfPayments !== '0' && !isNaN(numberOfPayments)) {
            return amount * numberOfPayments;
        }
        return amount;
    }
    return 0;
};

export const calculateAmountFee = (amount: number, commission: number) => {
    return amount * (commission / 100);
};
