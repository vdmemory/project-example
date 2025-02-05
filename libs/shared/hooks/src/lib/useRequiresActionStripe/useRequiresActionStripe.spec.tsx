/* eslint-disable @typescript-eslint/no-var-requires */
import { renderHook, act } from '@testing-library/react-hooks';
import { useRequiresActionStripe } from './useRequiresActionStripe';

jest.mock('@stripe/react-stripe-js');

describe('useRequiresActionStripe', () => {
    const stripeMock = {
        handleNextAction: jest.fn(),
    };

    beforeEach(() => {
        require('@stripe/react-stripe-js').useStripe.mockReturnValue(
            stripeMock,
        );
    });

    it('should call handleNextAction and set isLoadingAction', async () => {
        const clientSecret = 'pi_12345';

        stripeMock.handleNextAction.mockResolvedValue({
            paymentIntent: {
                id: 'pi_12345',
                status: 'succeeded',
            },
        });

        const { result } = renderHook(() => useRequiresActionStripe());

        await act(() => result.current.handleAction(clientSecret));

        expect(stripeMock.handleNextAction).toHaveBeenCalledWith({
            clientSecret,
        });
        expect(result.current.isLoadingAction).toBe(false);
    });

    it('should handle error from handleNextAction', async () => {
        const clientSecret = 'pi_12345';

        stripeMock.handleNextAction.mockResolvedValue({
            error: { message: 'Test error message' },
        });

        const { result } = renderHook(() => useRequiresActionStripe());

        await act(() => result.current.handleAction(clientSecret));

        expect(stripeMock.handleNextAction).toHaveBeenCalledWith({
            clientSecret,
        });
        expect(result.current.isLoadingAction).toBe(false);
    });
});
