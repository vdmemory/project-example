import { renderHook, act } from '@testing-library/react-hooks';
import { useCouponPostControl } from './useCouponPostControl';
import {
    useGetCouponsDataQuery,
    useValidateCouponsMutation,
} from '@breef/shared/data-access-payments';
import { useProjectPostActions } from '../store/hooks';

jest.mock('@breef/shared/data-access-payments', () => ({
    useGetCouponsDataQuery: jest.fn(),
    useValidateCouponsMutation: jest.fn(),
}));

jest.mock('../store/hooks', () => ({
    useProjectPostActions: jest.fn(),
}));

describe('useCouponPostControl', () => {
    const mockRemoveCoupon = jest.fn();
    const mockValidateCoupon = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useProjectPostActions as jest.Mock).mockReturnValue({
            removeCoupon: mockRemoveCoupon,
        });

        (useGetCouponsDataQuery as jest.Mock).mockReturnValue({
            isSuccess: true,
            isLoading: false,
        });

        (useValidateCouponsMutation as jest.Mock).mockReturnValue([
            mockValidateCoupon,
            { isLoading: false },
        ]);
    });

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useCouponPostControl());

        expect(result.current.error).toBe('');
        expect(result.current.isSuccessCoupons).toBe(true);
        expect(result.current.isLoaderCoupons).toBe(false);
        expect(result.current.isSubmittedCoupon).toBe(false);
    });

    it('should remove coupon if value is null', async () => {
        const { result } = renderHook(() => useCouponPostControl());

        await act(async () => {
            await result.current.handleClickCoupon(null);
        });

        expect(mockRemoveCoupon).toHaveBeenCalled();
        expect(mockValidateCoupon).not.toHaveBeenCalled();
        expect(result.current.error).toBe('');
    });

    it('should handle successful coupon validation', async () => {
        mockValidateCoupon.mockResolvedValue({});

        const { result } = renderHook(() => useCouponPostControl());

        await act(async () => {
            await result.current.handleClickCoupon('VALID_CODE');
        });

        expect(result.current.error).toBe('Please enter a valid discount code');
        expect(mockValidateCoupon).toHaveBeenCalledWith('VALID_CODE');
        expect(mockRemoveCoupon).not.toHaveBeenCalled();
    });
});
