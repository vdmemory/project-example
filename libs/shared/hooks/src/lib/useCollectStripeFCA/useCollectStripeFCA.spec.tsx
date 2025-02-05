/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable  @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react-hooks';
import { useStripe } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useLazyGetFCSessionSecretQuery } from '@breef/shared/data-access-payments';
import { useCollectStripeFCA } from './useCollectStripeFCA';
import { Stripe } from '@stripe/stripe-js';

jest.mock('@stripe/react-stripe-js');
jest.mock('react-toastify');
jest.mock('@breef/shared/data-access-payments');

const mockUseStripe = useStripe as jest.MockedFunction<typeof useStripe>;
const mockToast = toast as jest.Mocked<typeof toast>;
const mockUseLazyGetFCSessionSecretQuery =
    useLazyGetFCSessionSecretQuery as jest.MockedFunction<
        typeof useLazyGetFCSessionSecretQuery
    >;

describe('useCollectStripeFCA', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockUseStripe.mockReturnValue({
            collectFinancialConnectionsAccounts: jest.fn().mockResolvedValue({
                financialConnectionsSession: {
                    accounts: [
                        {
                            id: 'fca_123',
                            display_name: 'Test Account',
                            institution_name: 'Test Bank',
                            last4: '4242',
                            status: 'active',
                        },
                    ],
                },
            }),
        } as any);
        // @ts-ignore
        mockUseLazyGetFCSessionSecretQuery.mockReturnValue([
            jest.fn().mockResolvedValue({
                data: { FCSessionSecret: 'test_secret' },
            }),
            { isLoading: false, isFetching: false },
        ]);
    });

    it('should collect FCA accounts successfully', async () => {
        const callback = jest.fn();
        const { result } = renderHook(() => useCollectStripeFCA(callback));

        await act(() => result.current.collect());

        expect(result.current.accounts).toEqual([]);
    });

    it('should handle error during FCA collection', async () => {
        (
            (mockUseStripe() as Stripe)
                .collectFinancialConnectionsAccounts as jest.MockedFunction<any>
        ).mockRejectedValue(new Error('Stripe collection error'));

        const { result } = renderHook(() => useCollectStripeFCA());

        await act(() => result.current.collect());

        expect(mockToast.error).toHaveBeenCalledWith(
            'There was an error getting a Financial Connections Session Secret',
        );
    });

    it('should handle missing last4 digits', async () => {
        mockUseStripe.mockReturnValue({
            collectFinancialConnectionsAccounts: jest.fn().mockResolvedValue({
                financialConnectionsSession: {
                    accounts: [
                        {
                            id: 'fca_123',
                            display_name: 'Test Account',
                            institution_name: 'Test Bank',
                            last4: null, // Missing last4
                            status: 'active',
                        },
                    ],
                },
            }),
        } as any);

        const { result } = renderHook(() => useCollectStripeFCA());

        await act(() => result.current.collect());

        expect(mockToast.error).toHaveBeenCalledWith(
            'There was an error getting a Financial Connections Session Secret',
        );
        expect(result.current.accounts).toEqual([]);
    });
});
