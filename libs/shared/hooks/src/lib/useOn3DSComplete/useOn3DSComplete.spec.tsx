/* eslint-disable @typescript-eslint/no-var-requires */
import { renderHook, act } from '@testing-library/react-hooks';
import { useOn3DSComplete } from './useOn3DSComplete';

jest.mock('@stripe/react-stripe-js');
jest.mock('../useRouteControl/useRouteControl');

describe('useOn3DSComplete', () => {
    const stripeMock = {
        retrievePaymentIntent: jest.fn(),
    };

    beforeEach(() => {
        require('@stripe/react-stripe-js').useStripe.mockReturnValue(
            stripeMock,
        );
        require('../useRouteControl/useRouteControl').useRouteControl.mockReturnValue(
            {
                clearHistoryQueryParams: jest.fn(),
            },
        );
    });

    it('should not call on3DSComplete if clientSecret is not provided', () => {
        const { result } = renderHook(() =>
            useOn3DSComplete('', jest.fn(), jest.fn()),
        );
        expect(stripeMock.retrievePaymentIntent).not.toHaveBeenCalled();
        expect(result.current.isLoading3DSComplete).toBe(false);
    });

    it('should call retrievePaymentIntent and set successData on success', async () => {
        const clientSecret = 'pi_12345';
        const successAction = jest.fn();
        const failureAction = jest.fn();
        const paymentIntent = {
            id: 'pi_12345',
            amount: 1000,
            status: 'succeeded',
        };

        stripeMock.retrievePaymentIntent.mockResolvedValue({
            paymentIntent,
        });

        const { result } = renderHook(() =>
            useOn3DSComplete(clientSecret, successAction, failureAction),
        );

        await act(() => result.current.on3DSComplete());

        expect(stripeMock.retrievePaymentIntent).toHaveBeenCalledWith(
            clientSecret,
        );
        expect(result.current.isLoading3DSComplete).toBe(false);
        expect(result.current.successData).toEqual({
            amount: '10',
            transaction: 'pi_12345',
        });
        expect(successAction).toHaveBeenCalled();
    });

    it('should call retrievePaymentIntent and call failureAction on requires_payment_method', async () => {
        const clientSecret = 'pi_12345';
        const successAction = jest.fn();
        const failureAction = jest.fn();
        const paymentIntent = {
            id: 'pi_12345',
            amount: 1000,
            status: 'requires_payment_method',
        };

        stripeMock.retrievePaymentIntent.mockResolvedValue({
            paymentIntent,
        });

        const { result } = renderHook(() =>
            useOn3DSComplete(clientSecret, successAction, failureAction),
        );

        await act(() => result.current.on3DSComplete());

        expect(stripeMock.retrievePaymentIntent).toHaveBeenCalledWith(
            clientSecret,
        );
        expect(result.current.isLoading3DSComplete).toBe(false);
        expect(result.current.successData).toEqual(null); // unchanged
        expect(failureAction).toHaveBeenCalled();
    });

    it('should handle error from retrievePaymentIntent', async () => {
        const clientSecret = 'pi_12345';
        const successAction = jest.fn();
        const failureAction = jest.fn();

        stripeMock.retrievePaymentIntent.mockResolvedValue({
            error: { message: 'Test error message' },
        });

        const { result } = renderHook(() =>
            useOn3DSComplete(clientSecret, successAction, failureAction),
        );

        await act(() => result.current.on3DSComplete());

        expect(stripeMock.retrievePaymentIntent).toHaveBeenCalledWith(
            clientSecret,
        );
        expect(result.current.isLoading3DSComplete).toBe(false);
        expect(result.current.successData).toEqual(null); // unchanged
    });
});
