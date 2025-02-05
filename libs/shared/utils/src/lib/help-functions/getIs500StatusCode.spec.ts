import { getIsInternalServerError } from './getIs500StatusCode';

describe('getIsInternalServerError', () => {
    it('returns true for a InternalServerError with PARSING_ERROR status', () => {
        const result = getIsInternalServerError('PARSING_ERROR');
        expect(result).toBeTruthy; // eslint-disable-line
    });

    it('returns true for a InternalServerError with CUSTOM_ERROR status', () => {
        const result = getIsInternalServerError('CUSTOM_ERROR');
        expect(result).toBeTruthy; // eslint-disable-line
    });

    it('returns true for a InternalServerError with 500 status', () => {
        const result = getIsInternalServerError('500');
        expect(result).toBeTruthy; // eslint-disable-line
    });

    it('returns false for a InternalServerError with ANY status', () => {
        const result = getIsInternalServerError('ANY');
        expect(result).toBeFalsy; // eslint-disable-line
    });
});
