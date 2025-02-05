import { MilestonePaymentType } from '@breef/shared/types';
import {
    calculateSummaryMilestones,
    calculateSummaryRetainer,
    calculateAmountFee,
} from './calculatePayments';
import {
    checkFirstMilestoneAmount,
    checkFirstMilestoneMonth,
} from './validationPayments';

describe('calculateSummaryMilestones', () => {
    it('calculates the summary of milestones correctly', () => {
        const milestones = [
            { amount: 500 },
            { amount: 1000 },
            { amount: '1500' },
            { amount: 'invalid amount' },
        ] as MilestonePaymentType[];
        const result = calculateSummaryMilestones(milestones);
        expect(result).toEqual(3000);
    });

    it('returns 0 when no milestones are provided', () => {
        const milestones = [] as MilestonePaymentType[];
        const result = calculateSummaryMilestones(milestones);
        expect(result).toEqual(0);
    });
});

describe('checkFirstMilestoneAmount', () => {
    it('should return true if the first milestone amount is greater than or equal to 25% of the summaryMilestones', () => {
        const milestones = [
            { amount: 400 },
            { amount: 200 },
            { amount: 300 },
            { amount: 400 },
        ] as MilestonePaymentType[];
        const summaryMilestones = 1000;
        expect(
            checkFirstMilestoneAmount(milestones, summaryMilestones),
        ).toBeTruthy();
    });

    it('should return false if the first milestone amount is less than 25% of the summaryMilestones', () => {
        const milestones = [
            { amount: 50 },
            { amount: 200 },
            { amount: 300 },
            { amount: 400 },
        ] as MilestonePaymentType[];
        const summaryMilestones = 1000;
        expect(
            checkFirstMilestoneAmount(milestones, summaryMilestones),
        ).toBeFalsy();
    });

    it('should return true if the milestones array has only one element', () => {
        const milestones = [{ amount: 500 }] as MilestonePaymentType[];
        const summaryMilestones = 500;
        expect(
            checkFirstMilestoneAmount(milestones, summaryMilestones),
        ).toBeTruthy();
    });

    it('should return true if the milestones array is empty', () => {
        const milestones: MilestonePaymentType[] = [];
        const summaryMilestones = 0;
        expect(
            checkFirstMilestoneAmount(milestones, summaryMilestones),
        ).toBeTruthy();
    });
});

describe('checkFirstMilestoneMonth', () => {
    it('should return true if the first milestone invoice date is the same or earlier than the earliest invoice date', () => {
        const milestones = [
            { invoiceDate: '2022-01-01' },
            { invoiceDate: '2022-02-01' },
            { invoiceDate: '2022-03-01' },
        ] as MilestonePaymentType[];
        expect(checkFirstMilestoneMonth(milestones)).toBeTruthy();
    });

    it('should return false if the first milestone invoice date is later than the earliest invoice date', () => {
        const milestones = [
            { invoiceDate: '2022-02-01' },
            { invoiceDate: '2022-01-01' },
            { invoiceDate: '2022-03-01' },
        ] as MilestonePaymentType[];
        expect(checkFirstMilestoneMonth(milestones)).toBeFalsy();
    });

    it('should return true if the milestones array has only one element', () => {
        const milestones = [
            { invoiceDate: '2022-01-01' },
        ] as MilestonePaymentType[];
        expect(checkFirstMilestoneMonth(milestones)).toBeTruthy();
    });

    it('should return true if the milestones array is empty', () => {
        const milestones: MilestonePaymentType[] = [];
        expect(checkFirstMilestoneMonth(milestones)).toBeTruthy();
    });
});

describe('calculateSummaryRetainer', () => {
    const props = {
        id: 1,
        deliverable: 'deliverable',
        invoiceDate: 'invoiceDate',
        paymentFrequency: 'paymentFrequency',
    };

    it('should return correct summary amount for a valid retainer object', () => {
        const retainer = {
            amount: 1000,
            numberOfPayments: '3',
            ...props,
        };
        const summary = calculateSummaryRetainer(retainer);
        expect(summary).toEqual(3000);
    });

    it('should return the amount when numberOfPayments is 0', () => {
        const retainer = {
            amount: 1500,
            numberOfPayments: '0',
            ...props,
        };
        const summary = calculateSummaryRetainer(retainer);
        expect(summary).toEqual(1500);
    });

    it('should return 0 for a null retainer object', () => {
        const summary = calculateSummaryRetainer(null);
        expect(summary).toEqual(0);
    });

    it('should return 0 when amount or numberOfPayments is missing or NaN', () => {
        const retainer1 = {
            amount: null,
            numberOfPayments: '3',
            ...props,
        };
        const retainer3 = {
            amount: 1000,
            numberOfPayments: '',
            ...props,
        };
        const summary1 = calculateSummaryRetainer(retainer1);
        const summary3 = calculateSummaryRetainer(retainer3);
        expect(summary1).toEqual(0);
        expect(summary3).toEqual(0);
    });
});

describe('calculateAmountFee function', () => {
    it('should calculate the amount fee correctly', () => {
        const amount = 100;
        const commission = 5;
        const result = calculateAmountFee(amount, commission);
        expect(result).toBe(5); // 100 * (5 / 100) = 5
    });

    it('should calculate the amount fee correctly for different values', () => {
        const amount = 250;
        const commission = 12.5;
        const result = calculateAmountFee(amount, commission);
        expect(result).toBe(31.25); // 250 * (12.5 / 100) = 31.25
    });

    it('should return 0 if either amount or commission is 0', () => {
        const amount = 0;
        const commission = 10;
        const result = calculateAmountFee(amount, commission);
        expect(result).toBe(0);

        const zeroAmount = 100;
        const zeroCommission = 0;
        const zeroResult = calculateAmountFee(zeroAmount, zeroCommission);
        expect(zeroResult).toBe(0);
    });
});
