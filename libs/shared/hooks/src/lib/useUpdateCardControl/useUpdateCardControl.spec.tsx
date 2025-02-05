import { renderHook, act } from '@testing-library/react-hooks';
import { useUpdateCardBillingDetailsMutation } from '@breef/shared/data-access-payments';
import { useUpdateCardControl } from './useUpdateCardControl';

jest.mock('@breef/shared/data-access-payments');
jest.mock('react-toastify');

const mockUseUpdateCardBillingDetailsMutation =
    useUpdateCardBillingDetailsMutation as jest.MockedFunction<
        typeof useUpdateCardBillingDetailsMutation
    >;

describe('useUpdateCardControl', () => {
    it('should handle card update successfully', async () => {
        const callback = jest.fn();
        const mockUpdateCard = jest.fn().mockResolvedValue({ data: 'success' });
        mockUseUpdateCardBillingDetailsMutation.mockReturnValue([
            mockUpdateCard,
            { isLoading: false, reset: jest.fn() },
        ]);

        const { result } = renderHook(() => useUpdateCardControl({ callback }));

        await act(async () => {
            await result.current.handleUpdateCard('token', { name: 'Test' });
        });

        expect(mockUpdateCard).toHaveBeenCalledWith({
            cardToken: 'token',
            options: { name: 'Test' },
        });
    });
});
