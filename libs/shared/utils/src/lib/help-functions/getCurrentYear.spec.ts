import { getCurrentYear } from './getCurrentYear';

describe('getCurrentYear', () => {
    it('returns the current year', () => {
        // Mock the Date object to return a specific year for testing purposes
        const mockYear = 2022;
        const originalDate = Date;
        global.Date = jest.fn(() => ({
            getFullYear: jest.fn(() => mockYear),
        })) as unknown as typeof Date;

        const result = getCurrentYear();

        expect(result).toBe(mockYear);

        // Restore the original Date object after the test
        global.Date = originalDate;
    });
});
