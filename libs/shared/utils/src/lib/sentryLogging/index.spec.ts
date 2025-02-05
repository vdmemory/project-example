import { InterceptableErrorStatusCodesEnum } from '@breef/shared/constants';
import { gerErrorMessage } from './getErrorMessage';
import { getSeverityType } from './getSeverityType';
import { Severity } from '@sentry/react';

describe('gerErrorMessage', () => {
    it('should return correct error messages for known status codes', () => {
        expect(gerErrorMessage(400)).toBe('400 Validation Error');
        expect(gerErrorMessage(403)).toBe('403 Permission Denied');
        expect(gerErrorMessage(404)).toBe('404 Not Found');
        expect(gerErrorMessage(500)).toBe('Something went wrong (500)');
    });

    it('should return network connection error message for FetchError and TimeoutError', () => {
        expect(
            gerErrorMessage(InterceptableErrorStatusCodesEnum.FetchError),
        ).toBe('Network Connection Error (FETCH_ERROR)');
        expect(
            gerErrorMessage(InterceptableErrorStatusCodesEnum.TimeoutError),
        ).toBe('Network Connection Error (TIMEOUT_ERROR)');
    });

    it('should return default error message for unknown status codes', () => {
        expect(gerErrorMessage(999)).toBe('Unexpected Error (999)');
    });

    it('should handle status codes passed as strings', () => {
        expect(gerErrorMessage('500')).toBe('Unexpected Error (500)');
    });
});

describe('getSeverityType', () => {
    it('should return Severity.Log for 400, FetchError, and TimeoutError', () => {
        expect(getSeverityType(400)).toBe(Severity.Log);
        expect(
            getSeverityType(InterceptableErrorStatusCodesEnum.FetchError),
        ).toBe(Severity.Log);
        expect(
            getSeverityType(InterceptableErrorStatusCodesEnum.TimeoutError),
        ).toBe(Severity.Log);
    });

    it('should return Severity.Warning for 403 and 404', () => {
        expect(getSeverityType(403)).toBe(Severity.Warning);
        expect(getSeverityType(404)).toBe(Severity.Warning);
    });

    it('should return Severity.Error for other status codes', () => {
        expect(getSeverityType(500)).toBe(Severity.Error);
        expect(getSeverityType(999)).toBe(Severity.Error);
    });

    it('should handle status codes passed as strings', () => {
        expect(getSeverityType('400')).toBe(Severity.Error);
        expect(getSeverityType('403')).toBe(Severity.Error);
        expect(getSeverityType('500')).toBe(Severity.Error);
    });
});
