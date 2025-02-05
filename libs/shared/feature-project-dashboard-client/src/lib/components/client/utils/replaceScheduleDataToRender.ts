import {
    PaymentScheduleAgency,
    PaymentScheduleKickoff,
    PaymentsTable,
} from '@breef/shared/types';
import moment from 'moment';
import numeral from 'numeral';

type RenderPaymentScheduleAgency = PaymentScheduleAgency & {
    order: number;
};

let retainerOrder = 0;
let ongoingOrder = 0;

const getOrder = (type: string): number => {
    switch (type) {
        case 'retainer': {
            retainerOrder += 1;
            return retainerOrder;
        }
        case 'ongoing': {
            ongoingOrder += 1;
            return ongoingOrder;
        }
        default:
            return 0;
    }
};

export const scheduleDataToRender = (
    data: PaymentScheduleAgency[],
): RenderPaymentScheduleAgency[] => {
    retainerOrder = 0;
    ongoingOrder = 0;
    const newData = [];
    const dataLength = data.length - 1;
    for (let i = 0; i <= dataLength; i++) {
        newData.push({ ...data[i], order: getOrder(data[i].scheduleType) });
    }
    return newData;
};

export const paymentsMilestoneReplacement = (
    data: PaymentScheduleKickoff['oneTimePayments'] | [],
): PaymentsTable[] => {
    if (!data) return [];
    return data.map(item => ({
        type: item.scheduleType,
        invoiceDate: moment(item.invoiceDate).format('MMMM D, YYYY'),
        payBy: moment(item.paymentDue).format('MMMM D, YYYY'), //dueDate
        deliverable: item.deliverable,
        amount: numeral(item.amount).format('$0,0.00'),
        teamTake: numeral(item.teamTake).format('$0,0.00'),
        id: item.id as number,
    }));
};

export const paymentsOngoingReplacement = (
    data: PaymentScheduleKickoff['ongoingPayment'] | null,
): PaymentsTable | null => {
    if (!data) return null;
    return {
        type: data.scheduleType,
        invoiceDate: moment(data.invoiceDate).format('MMMM D, YYYY'),
        payBy: moment(data.paymentDue).format('MMMM D, YYYY'), //dueDate
        deliverable: data.deliverable,
        amount: numeral(data.amount).format('$0,0.00'),
        teamTake: numeral(data.teamTake).format('$0,0.00'),
        id: data.id as number,
    };
};
