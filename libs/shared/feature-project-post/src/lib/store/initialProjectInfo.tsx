import { POST_PROJECT_PRICE } from '@breef/shared/constants';
import { CouponsInfoType } from '../types/projectInfoTypes';

export const initialCouponInfo: CouponsInfoType = {
    id: null,
    price: POST_PROJECT_PRICE,
    discount: null,
    name: null,
    description: null,
    code: null,
};
