import { getIs404StatusCode } from './getIs404StatusCode';

describe('getIs404StatusCode', () => {
    it('returns true for a FetchBaseQueryError with PARSING_ERROR status and originalStatus 404', () => {
        const result = getIs404StatusCode({
            status: 'PARSING_ERROR',
            originalStatus: 404,
            error: 'error',
            data: '',
        });

        expect(result).toBeTruthy; // eslint-disable-line
    });

    it('returns true for a FetchBaseQueryError with status 404', () => {
        const result = getIs404StatusCode({
            status: 404,
            data: '',
        });
        expect(result).toBeTruthy; // eslint-disable-line
    });

    it('returns false for a FetchBaseQueryError with status any', () => {
        const result = getIs404StatusCode({
            status: 100,
            data: '',
        });
        expect(result).toBeFalsy; // eslint-disable-line
    });
});
