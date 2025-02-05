import { replacementCouponInfo } from './replacementFunction';
import { CouponType } from '@breef/shared/types';
import { POST_PROJECT_PRICE } from '@breef/shared/constants';

const couponNotAdaptedData = {
    id: 1,
    name: 'Test Name',
    promoCode: 'Code123',
    amountOff: 200,
    percentOff: 30,
    couponType: 'fixed_amount' as CouponType,
    description: 'Test Description',
};

const resultMock = {
    price: POST_PROJECT_PRICE,
    id: 1,
    name: 'Test Name',
    code: 'Code123',
    description: 'Test Description',
};

describe('replacementCouponInfo', () => {
    it('should return with fixed discount', () => {
        const result = replacementCouponInfo(couponNotAdaptedData);
        expect(result).toEqual({
            ...resultMock,
            discount: POST_PROJECT_PRICE - 200,
        });
    });
    it('should return with percent discount', () => {
        const result = replacementCouponInfo({
            ...couponNotAdaptedData,
            couponType: 'percentage',
        });
        expect(result).toEqual({
            ...resultMock,
            discount: POST_PROJECT_PRICE - POST_PROJECT_PRICE * 0.3,
        });
    });
});
