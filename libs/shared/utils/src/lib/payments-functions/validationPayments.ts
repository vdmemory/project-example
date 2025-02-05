import { MilestonePaymentType } from '@breef/shared/types';
import moment from 'moment/moment';

export const checkFirstMilestoneAmount = (
    milestones: MilestonePaymentType[],
    summaryMilestones: number,
) => {
    if (milestones.length > 1) {
        const amount = milestones[0].amount || 0;
        if (amount < summaryMilestones / 4) {
            return false;
        }
    }
    return true;
};
export const checkFirstMilestoneMonth = (
    milestones: MilestonePaymentType[],
) => {
    if (milestones.length > 1) {
        const milestonesDates = milestones.map(item =>
            moment(item.invoiceDate),
        );
        const minDate = moment.min(milestonesDates);
        if (milestonesDates[0] > minDate) {
            return false;
        }
    }
    return true;
};
