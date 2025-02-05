import { FullPaymentScheduleAgency } from '@breef/shared/types';
import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import moment from 'moment/moment';

export const useOverduePayments = (payments: FullPaymentScheduleAgency[]) => {
    const overduePayments = payments.filter(
        item =>
            item.tag ===
                PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue] &&
            moment(item.paymentDue).diff(
                moment()
                    .set('minutes', 0)
                    .set('hours', 0)
                    .set('seconds', 0)
                    .set('milliseconds', 0),
                'days',
            ) < 0,
    );

    return { overduePayments };
};
