import {
    useGetCouponsDataQuery,
    useValidateCouponsMutation,
} from '@breef/shared/data-access-payments';
import { useState } from 'react';
import { useProjectPostActions } from '../store/hooks';

type ErrorType = {
    status: number;
    originalStatus: number;
    data: {
        detail: string[];
    };
};

export const useCouponPostControl = () => {
    const [error, setError] = useState<string>('');
    const { isSuccess: isSuccessGetCoupons, isLoading: isLoaderGetCoupons } =
        useGetCouponsDataQuery(undefined, {
            skip: false,
            refetchOnMountOrArgChange: true,
        });

    const [validateCoupon, { isLoading: isLoaderValidateCoupons }] =
        useValidateCouponsMutation();

    const { removeCoupon } = useProjectPostActions();
    const handleClickCoupon = async (value: string | null) => {
        if (error) setError('');
        try {
            if (!value) return removeCoupon();
            await validateCoupon(value).unwrap();
        } catch (error) {
            const { data } = error as ErrorType;
            const errorDetail = Array.isArray(data?.detail)
                ? data?.detail?.[0]
                : data?.detail;
            const errorMessage =
                errorDetail || 'Please enter a valid discount code';
            setError(errorMessage);
        }
        return;
    };

    return {
        handleClickCoupon,
        isSuccessCoupons: isSuccessGetCoupons,
        isLoaderCoupons: isLoaderGetCoupons,
        isSubmittedCoupon: isLoaderValidateCoupons,
        error,
    };
};
