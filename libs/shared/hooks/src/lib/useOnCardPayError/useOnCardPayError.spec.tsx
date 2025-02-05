import { renderHook, act } from '@testing-library/react-hooks';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useOnCardPayError } from './useOnCardPayError';
import { Stripe, StripeElements } from '@stripe/stripe-js';

jest.mock('@stripe/react-stripe-js', () => ({
    useStripe: jest.fn(),
    useElements: jest.fn(),
}));

type ConfirmCardPaymentData = {
    error?: {
        message?: string;
    };
};

describe('useOnCardPayError', () => {
    let stripe: Stripe;
    let elements: StripeElements;

    beforeEach(() => {
        stripe = {
            confirmCardPayment: jest.fn(),
        } as unknown as Stripe;
        elements = {} as StripeElements;

        (useStripe as jest.Mock).mockReturnValue(stripe);
        (useElements as jest.Mock).mockReturnValue(elements);
    });

    it('should call onPayError with the correct message when there is an error', async () => {
        const onPayError = jest.fn();
        const onSuccessCallbackFn = jest.fn();

        const confirmCardPaymentData: ConfirmCardPaymentData = {
            error: { message: 'Test error message' },
        };
        (stripe.confirmCardPayment as jest.Mock).mockResolvedValue(
            confirmCardPaymentData,
        );

        const { result } = renderHook(() =>
            useOnCardPayError({ onPayError, onSuccessCallbackFn }),
        );

        await act(() =>
            result.current.onCardPayErrorRequiresAction(
                'secureKey',
                'Default error message',
            ),
        );

        expect(onPayError).toHaveBeenCalledWith('Test error message');
        expect(onSuccessCallbackFn).not.toHaveBeenCalled();
    });

    it('should call onPayError with the default error message when there is no error message provided', async () => {
        const onPayError = jest.fn();
        const onSuccessCallbackFn = jest.fn();

        const confirmCardPaymentData: ConfirmCardPaymentData = { error: {} };
        (stripe.confirmCardPayment as jest.Mock).mockResolvedValue(
            confirmCardPaymentData,
        );

        const { result } = renderHook(() =>
            useOnCardPayError({ onPayError, onSuccessCallbackFn }),
        );

        await act(() =>
            result.current.onCardPayErrorRequiresAction(
                'secureKey',
                'Default error message',
            ),
        );

        expect(onPayError).toHaveBeenCalledWith('Default error message');
        expect(onSuccessCallbackFn).not.toHaveBeenCalled();
    });

    it('should call onSuccessCallbackFn when there is no error', async () => {
        const onPayError = jest.fn();
        const onSuccessCallbackFn = jest.fn();

        const confirmCardPaymentData: ConfirmCardPaymentData = {};
        (stripe.confirmCardPayment as jest.Mock).mockResolvedValue(
            confirmCardPaymentData,
        );

        const { result } = renderHook(() =>
            useOnCardPayError({ onPayError, onSuccessCallbackFn }),
        );

        await act(() =>
            result.current.onCardPayErrorRequiresAction(
                'secureKey',
                'Default error message',
            ),
        );

        expect(onSuccessCallbackFn).toHaveBeenCalled();
        expect(onPayError).not.toHaveBeenCalled();
    });
});
