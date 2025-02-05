import { FullPaymentScheduleAgency } from '@breef/shared/types';
import {
    PaymentSchedule,
    PaymentScheduleRequest,
} from '@breef/shared/constants';
import moment from 'moment';

export const useNearestDuePaymentsInSameDay = (
    payments: FullPaymentScheduleAgency[],
) => {
    const nearestDuePayment = [...payments]
        .sort((a, b) => moment(a.paymentDue).diff(moment(b.paymentDue)))
        .find(
            item =>
                item.status ===
                PaymentSchedule[PaymentScheduleRequest.invoiceSent],
        );
    const nearestDuePaymentsInSameDayCodes = payments
        .filter(
            item =>
                item.status ===
                    PaymentSchedule[PaymentScheduleRequest.invoiceSent] &&
                item.paymentDue === nearestDuePayment?.paymentDue,
        )
        .map(item => item.invoiceCode);

    return {
        nearestDuePayment,
        nearestDuePaymentsInSameDayCodes,
    };
};
