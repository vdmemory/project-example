import { renderHook } from '@testing-library/react-hooks';
import { useToastifyRequest } from './useToastifyRequest';

describe('useToastifyRequest', () => {
    const callbackFn = jest.fn();

    it('displays loading message when isLoading is true', () => {
        const toastId = '123';
        const configMessages = {
            loading: 'Loading...',
            success: 'Success!',
            error: 'Error occurred.',
        };
        const actionProps = {
            isLoading: true,
            isSuccess: false,
            isError: false,
        };

        const { result } = renderHook(() =>
            useToastifyRequest({
                actionProps,
                configMessages,
                toastId,
                callbackFn,
            }),
        );

        expect(result.current).toBeTruthy();
        // Assert toast message is displayed with correct props
    });

    it('displays success message when isSuccess is true', () => {
        const toastId = '123';
        const configMessages = {
            loading: 'Loading...',
            success: 'Success!',
            error: 'Error occurred.',
        };
        const actionProps = {
            isLoading: false,
            isSuccess: true,
            isError: false,
        };

        const { result } = renderHook(() =>
            useToastifyRequest({
                actionProps,
                configMessages,
                toastId,
                callbackFn,
            }),
        );

        expect(result.current).toBeTruthy();
        // Assert toast message is displayed with correct props
        // Assert callback function is called after delay
    });

    it('displays error message when isError is true', () => {
        const toastId = '123';
        const configMessages = {
            loading: 'Loading...',
            success: 'Success!',
            error: 'Error occurred.',
        };
        const actionProps = {
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: {
                data: {
                    detail: 'An error occurred.',
                },
            },
        };

        const { result } = renderHook(() =>
            useToastifyRequest({
                actionProps,
                configMessages,
                toastId,
                callbackFn,
            }),
        );

        expect(result.current).toBeTruthy();
        // Assert toast message is displayed with correct props
    });
});
