import { FullPaymentScheduleAgency } from '@breef/shared/types';
import React from 'react';
import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import moment from 'moment';

export const useNearestAwaitingPaymentsInSameDay = (
    payments: FullPaymentScheduleAgency[],
) => {
    const nearestAwaitingPayment = React.useMemo(
        () =>
            payments.find(
                item =>
                    item.tag ===
                        PaymentScheduleTag[
                            PaymentScheduleTagRequest.awaiting
                        ] &&
                    moment()
                        .set('minutes', 0)
                        .set('hours', 0)
                        .set('seconds', 0)
                        .set('milliseconds', 0)
                        .diff(item.invoiceDate, 'days') <= 0,
            ),
        [payments],
    );

    const nearestAwaitingPaymentsInSameDayCodes = React.useMemo(
        () =>
            payments
                .filter(
                    item =>
                        item.tag ===
                            PaymentScheduleTag[
                                PaymentScheduleTagRequest.awaiting
                            ] &&
                        item.invoiceDate ===
                            nearestAwaitingPayment?.invoiceDate,
                )
                .map(item => item.invoiceCode),
        [nearestAwaitingPayment?.invoiceDate, payments],
    );

    return { nearestAwaitingPayment, nearestAwaitingPaymentsInSameDayCodes };
};
