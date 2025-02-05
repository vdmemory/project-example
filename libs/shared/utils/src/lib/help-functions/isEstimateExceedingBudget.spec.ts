import { isEstimateExceedingBudget } from './isEstimateExceedingBudget';

describe('isEstimateExceedingBudget', () => {
    it('returns true if the estimate exceeds the budget by the specified percentage', () => {
        const result = isEstimateExceedingBudget({
            budget: 1000,
            estimate: '500-1500',
            percent: 20,
        });

        expect(result).toBeTruthy();
    });

    it('returns false if the estimate does not exceed the budget by the specified percentage', () => {
        const result = isEstimateExceedingBudget({
            budget: 1000,
            estimate: '500-700',
            percent: 20,
        });

        expect(result).toBeFalsy();
    });

    it('returns false if the estimate does not have a valid format', () => {
        const result = isEstimateExceedingBudget({
            budget: 1000,
            estimate: 'invalid-format',
            percent: 20,
        });

        expect(result).toBeFalsy();
    });

    it('returns false if the maximum allowable estimate calculation is zero', () => {
        const result = isEstimateExceedingBudget({
            budget: 0,
            estimate: '500-700',
            percent: 20,
        });

        expect(result).toBeTruthy();
    });
});
