import { CouponTypeNames, POST_PROJECT_PRICE } from '@breef/shared/constants';
import { TransformCouponsResponseType } from '@breef/shared/types';
import { CouponsInfoType } from '../types/projectInfoTypes';
import { getDiscountPrice, getPercentPrice } from '../utils/getCurrentPrice';

export const replacementCouponInfo = (
    coupon: TransformCouponsResponseType,
): CouponsInfoType => {
    let discount = null;
    if (coupon.couponType === CouponTypeNames.FIXED && coupon.amountOff)
        discount = getDiscountPrice(POST_PROJECT_PRICE, coupon.amountOff);
    if (coupon.couponType === CouponTypeNames.PERCENT && coupon.percentOff)
        discount = getPercentPrice(POST_PROJECT_PRICE, coupon.percentOff);

    return {
        price: POST_PROJECT_PRICE,
        id: coupon.id,
        name: coupon.name,
        code: coupon.promoCode,
        description: coupon.description,
        discount,
    };
};
