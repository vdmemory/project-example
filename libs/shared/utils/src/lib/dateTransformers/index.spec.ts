import { getUtcDateString, getLocaleDateString } from './dateUtcTransformer';

describe('dateUtils', () => {
    describe('getUtcDateString', () => {
        it('should return UTC date string', () => {
            const date = '2022-03-17T10:00:00.000Z';
            const expected = '2022-03-17';
            const result = getUtcDateString(date);
            expect(result).toEqual(expected);
        });
    });

    describe('getLocaleDateString', () => {
        it('should return locale date string', () => {
            const date = '2022-03-17T10:00:00.000Z';
            const expected = '2022-03-17';
            const result = getLocaleDateString(date);
            expect(result).toEqual(expected);
        });
    });
});
