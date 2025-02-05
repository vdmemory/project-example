import { toast } from 'react-toastify';
import { defaultErrorHandler } from './defaultErrorHandler';
import {
    validationErrorMessages,
    ValidationErrorType,
} from './validationErrorMessages';

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

describe('defaultErrorHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('displays a detailed error message from server data', () => {
        const mockError = {
            status: 400,
            data: {
                detail: ['An error occurred processing your request'],
            },
        };
        defaultErrorHandler(mockError);
        expect(toast.error).toHaveBeenCalledWith(
            'An error occurred processing your request',
            expect.any(Object),
        );
    });

    it('displays the first error message when multiple are provided', () => {
        const mockError = {
            status: 400,
            data: {
                non_field_errors: ['First error', 'Second error'],
            },
        };
        defaultErrorHandler(mockError);
        expect(toast.error).toHaveBeenCalledWith(
            'First error',
            expect.any(Object),
        );
    });

    it('falls back to a generic error message for interceptable codes', () => {
        const mockError = {
            status: 500,
            data: {},
        };
        defaultErrorHandler(mockError);
        expect(toast.error).toHaveBeenCalledWith(
            validationErrorMessages[ValidationErrorType.default],
        );
    });

    it('displays an error when status code is not in the interceptable list', () => {
        const mockError = {
            status: 418, // Assuming it's not an interceptable error code
            data: {},
        };
        defaultErrorHandler(mockError, false);
        expect(toast.error).toHaveBeenCalledWith(
            validationErrorMessages[ValidationErrorType.default],
        );
    });
});
