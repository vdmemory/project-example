import {
    formatBudgetCost,
    formatShortBudgetCost,
    shotBudgetToLongBudget,
    shotBudgetToMinMax,
    ucFirst,
    replaceAmountToString,
} from './formatText';

describe('ucFirst', () => {
    const testCases = [
        { input: 'test', expected: 'Test' },
        { input: '', expected: '' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(ucFirst(testCase.input)).toEqual(testCase.expected);
        });
    });
});

describe('replaceAmountToString', () => {
    const testCases = [
        { input: 0, expected: '$0' },
        { input: 1, expected: '$1' },
        { input: 100, expected: '$100' },
        { input: 1200, expected: '$1,200' },
        { input: 1200.12, expected: '$1,200.12' },
        { input: 1200.123, expected: '$1,200.12' },
        { input: 1200.126, expected: '$1,200.13' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(replaceAmountToString(testCase.input)).toEqual(
                testCase.expected,
            );
        });
    });
});

describe('formatShortBudgetCost', () => {
    const testCases = [
        { input: -1000, expected: '-$1,000' },
        { input: -1, expected: '-$1' },
        { input: 1, expected: '$1' },
        { input: 1000, expected: '$1,000' },
        { input: 1000000, expected: '$1,000,000' },
        { input: 0, expected: '$0' },
        { input: null, expected: '0' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(formatShortBudgetCost(testCase.input)).toEqual(
                testCase.expected,
            );
        });
    });
});

describe('formatBudgetCost', () => {
    const testCases = [
        { input: -1000, expected: '-$1,000.00' },
        { input: -1, expected: '-$1.00' },
        { input: 1, expected: '$1.00' },
        { input: 1000, expected: '$1,000.00' },
        { input: 1000000, expected: '$1,000,000.00' },
        { input: 0, expected: '$0.00' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(formatBudgetCost(testCase.input)).toEqual(testCase.expected);
        });
    });
});

describe('shotBudgetToMinMax', () => {
    const testCases = [
        { input: '', expected: { min: 0, max: 0 } },
        { input: '0', expected: { min: 0, max: 0 } },
        { input: '1k', expected: { min: 1000, max: 1200 } },
        { input: '1k+', expected: { min: 1000, max: 1200 } },
        { input: '1k - 2k', expected: { min: 1000, max: 2000 } },
        { input: '2.5k-5k', expected: { min: 2500, max: 5000 } },
        { input: '10k-15k', expected: { min: 10000, max: 15000 } },
        { input: '150k-200k', expected: { min: 150000, max: 200000 } },
        { input: '200k+', expected: { min: 200000, max: 240000 } },
    ];

    testCases.forEach(testCase => {
        it(`should return ${JSON.stringify(testCase.expected)} when input is ${
            testCase.input
        }`, () => {
            expect(shotBudgetToMinMax(testCase.input)).toEqual(
                testCase.expected,
            );
        });
    });
});

describe('shotBudgetToLongBudget', () => {
    const testCases = [
        { input: '', expected: '$0.00' },
        { input: '0', expected: '$0.00' },
        { input: '1k', expected: '$1,000.00' },
        { input: '1k+', expected: '$1,000.00' },
        { input: '1k - 2k', expected: '$1,000 - $2,000' },
        { input: '2.5k-5k', expected: '$2,500 - $5,000' },
        { input: '10k-15k', expected: '$10,000 - $15,000' },
        { input: '150k-200k', expected: '$150,000 - $200,000' },
        { input: '200k+', expected: '$200,000.00' },
    ];

    testCases.forEach(testCase => {
        it(`should return ${testCase.expected} when input is ${testCase.input}`, () => {
            expect(shotBudgetToLongBudget({ value: testCase.input })).toEqual(
                testCase.expected,
            );
        });
    });
});
