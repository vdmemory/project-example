import { PaymentScheduleKickoff, PaymentStatusType } from '@breef/shared/types';
import {
    paymentsMilestoneReplacement,
    paymentsOngoingReplacement,
    scheduleDataToRender,
} from './replaceScheduleDataToRender';

const defaultData = {
    status: 'approval' as PaymentStatusType,
    deliverable: 'deliverable',
    paymentDue: '22-05-2222',
    invoiceDate: '22-05-2228',
    amount: 1000,
    teamTake: 15,
    id: 33434,
    numberOfPayments: 3,
};
describe('scheduleDataToRender', () => {
    it('scheduleDataToRender should return correct data with type retainer', () => {
        const scheduleData = [
            {
                ...defaultData,
                scheduleType: 'retainer',
            },
        ];
        const result = scheduleDataToRender(scheduleData);
        expect(result).toEqual([
            {
                amount: 1000,
                deliverable: 'deliverable',
                id: 33434,
                invoiceDate: '22-05-2228',
                numberOfPayments: 3,
                order: 1,
                paymentDue: '22-05-2222',
                scheduleType: 'retainer',
                status: 'approval',
                teamTake: 15,
            },
        ]);
    });
    it('scheduleDataToRender should return correct data with type ongoing', () => {
        const scheduleDataOngoing = [
            {
                ...defaultData,
                scheduleType: 'ongoing',
            },
        ];
        const result = scheduleDataToRender(scheduleDataOngoing);
        expect(result).toEqual([
            {
                amount: 1000,
                deliverable: 'deliverable',
                id: 33434,
                invoiceDate: '22-05-2228',
                numberOfPayments: 3,
                order: 1,
                paymentDue: '22-05-2222',
                scheduleType: 'ongoing',
                status: 'approval',
                teamTake: 15,
            },
        ]);
    });
    it('scheduleDataToRender should return correct data with type default', () => {
        const scheduleDataOngoing = [
            {
                ...defaultData,
                scheduleType: 'strategy',
            },
        ];
        const result = scheduleDataToRender(scheduleDataOngoing);
        expect(result).toEqual([
            {
                amount: 1000,
                deliverable: 'deliverable',
                id: 33434,
                invoiceDate: '22-05-2228',
                numberOfPayments: 3,
                order: 0,
                paymentDue: '22-05-2222',
                scheduleType: 'strategy',
                status: 'approval',
                teamTake: 15,
            },
        ]);
    });
});

describe('paymentsMilestoneReplacement', () => {
    const paymentsMilestone = {
        oneTimePayments: [
            {
                status: 'approval' as PaymentStatusType,
                scheduleType: 'ongoing',
                deliverable: 'deliverable',
                paymentDue: '03-23-2024',
                invoiceDate: '03-23-2024',
                amount: 1000,
                teamTake: 15,
                id: 23232,
            },
        ],
    };
    it('paymentsMilestoneReplacement should return empty array', () => {
        const result = paymentsMilestoneReplacement([]);
        expect(result).toEqual([]);
    });
    it('paymentsMilestoneReplacement should return correct data', () => {
        const result = paymentsMilestoneReplacement(
            paymentsMilestone.oneTimePayments,
        );
        expect(result).toEqual([
            {
                type: 'ongoing',
                invoiceDate: 'March 23, 2024',
                payBy: 'March 23, 2024',
                deliverable: 'deliverable',
                amount: '$1,000.00',
                teamTake: '$15.00',
                id: 23232,
            },
        ]);
    });
});

describe('paymentsOngoingReplacement', () => {
    const paymentsMilestone = {
        ongoingPayment: {
            ...defaultData,
            scheduleType: 'retainer',
            paymentTerms: '15',
            paymentFrequency: '25',
        } as PaymentScheduleKickoff['ongoingPayment'],
    };
    it('paymentsOngoingReplacement should return null', () => {
        const result = paymentsOngoingReplacement(null);
        expect(result).toEqual(null);
    });
    it('paymentsOngoingReplacement should return correct data', () => {
        const result = paymentsOngoingReplacement(
            paymentsMilestone.ongoingPayment,
        );
        expect(result).toEqual({
            type: 'retainer',
            invoiceDate: 'Invalid date',
            payBy: 'Invalid date',
            deliverable: 'deliverable',
            amount: '$1,000.00',
            teamTake: '$15.00',
            id: 33434,
        });
    });
});
