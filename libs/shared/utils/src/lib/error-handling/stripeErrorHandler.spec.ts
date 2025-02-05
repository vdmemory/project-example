import { stripeErrorHandler } from './stripeErrorHandler';
import {
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';
import { toast } from 'react-toastify';

jest.mock('react-toastify');

describe('stripeErrorHandler', () => {
    it('handles 400 error with stripe data', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 400,
            data: {
                stripe: {
                    message: 'The card number is invalid',
                    code: 'invalid_number',
                },
            },
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith(
            'The card number is invalid',
        );
    });

    it('handles 400 error with detail data', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 400,
            data: {
                detail: 'The payment could not be processed',
            },
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith(
            'The payment could not be processed',
        );
    });

    it('handles FETCH_ERROR status', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 'FETCH_ERROR',
            error: 'Failed to fetch',
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith('Failed to fetch');
    });

    it('handles default error', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 500,
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith(
            validationErrorMessages[ValidationErrorType.default],
        );
    });

    it('handles 400 error with any field data in stripe', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 400,
            data: {
                cvc: 'Is invalid parameter',
            },
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith(
            'Cvc: Is invalid parameter',
        );
    });

    it('handles 400 error with any field data in stripe (error message - string)', () => {
        const mockToastError = jest.fn();
        const error = {
            status: 400,
            data: {
                cvc: 'Is invalid parameter',
            },
        };
        stripeErrorHandler({
            error,
            callbackFn: mockToastError,
        });
        expect(mockToastError).toHaveBeenCalledWith(
            'Cvc: Is invalid parameter',
        );
    });

    it('handles error when exclude callbackFn', () => {
        const mockToastError = jest.fn();
        toast.error = mockToastError;
        const error = {
            status: 400,
            data: {},
        };
        stripeErrorHandler({ error });
        expect(mockToastError).toHaveBeenCalled();
    });
});
