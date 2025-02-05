import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { mockConfiguredStoreFn } from '../utils/test-setup/mockConfiguredStore';
import { mockRtkQueryAction } from '@breef/shared/utils';
import { initialState, sliceActions } from './projectPostSlice';
import { POST_PROJECT_PRICE } from '@breef/shared/constants';
import { initialCouponInfo } from './initialProjectInfo';
import { CouponType } from '@breef/shared/types';
import { apiPayments } from '@breef/shared/data-access-payments';

let store: ToolkitStore;
const couponsPrefill = {
    id: 1,
    name: 'name',
    promoCode: 'promoCode',
    amountOff: 200,
    percentOff: 30,
    couponType: 'fixed_amount' as CouponType,
    description: 'your coupon',
};

const couponInfo = {
    price: POST_PROJECT_PRICE,
    id: 1,
    name: 'name',
    code: 'promoCode',
    description: 'your coupon',
    discount: POST_PROJECT_PRICE - 200,
};

const welcomeCoupon = {
    ...couponsPrefill,
    id: 2,
    name: 'welcome',
    promoCode: 'welcome',
};

jest.mock('react-toastify');
beforeEach(() => {
    store = mockConfiguredStoreFn();
});

describe('projectPostSlice', () => {
    it('addCoupon should add a coupon if coupon is exist', () => {
        store = mockConfiguredStoreFn({ couponsPrefill });
        store.dispatch(sliceActions.addCoupon(couponsPrefill));
        expect(store.getState().projectPost.couponInfo).toEqual(couponInfo);
    });
    it('removeCoupon should set coupon to initialCouponInfo', () => {
        store = mockConfiguredStoreFn({
            couponInfo: couponInfo,
        });
        expect(store.getState().projectPost.couponInfo).not.toEqual(
            initialCouponInfo,
        );
        store.dispatch(sliceActions.removeCoupon());
        expect(store.getState().projectPost.couponInfo).toEqual(
            initialCouponInfo,
        );
    });
    it('updateErrorPostProject should set error', () => {
        expect(store.getState().projectPost.postProjectError).toEqual('');
        store.dispatch(sliceActions.updateErrorPostProject('error message'));
        expect(store.getState().projectPost.postProjectError).toEqual(
            'error message',
        );
    });
    it('resetProjectPost should set state to default values', () => {
        const mockCustomState = {
            couponsPrefill: couponsPrefill,
            couponInfo: initialCouponInfo,
            postProjectError: 'test error',
        };
        store = mockConfiguredStoreFn(mockCustomState);
        expect(store.getState().projectPost).toEqual(mockCustomState);
        store.dispatch(sliceActions.resetProjectPost());
        expect(store.getState().projectPost).not.toEqual(mockCustomState);
        expect(store.getState().projectPost).toEqual(initialState);
    });
    it('should handle apiProfile.endpoints.getCouponsData.matchFulfilled', () => {
        const mockFulfilledAction = mockRtkQueryAction(
            apiPayments.reducerPath,
            apiPayments.endpoints.getCouponsData.name,
            'fulfilled',
            couponsPrefill,
        );
        store.dispatch(mockFulfilledAction);
        const nextState = store.getState().projectPost;
        expect(nextState.couponInfo).toEqual(couponInfo);
        expect(nextState.couponsPrefill).toEqual(couponsPrefill);
    });
    it('should handle apiProfile.endpoints.getCouponsData.matchFulfilled when couponsList contains welcome coupon', () => {
        const mockFulfilledAction = mockRtkQueryAction(
            apiPayments.reducerPath,
            apiPayments.endpoints.getCouponsData.name,
            'fulfilled',
            welcomeCoupon,
        );
        store.dispatch(mockFulfilledAction);
        const nextState = store.getState().projectPost;
        expect(nextState.couponInfo).toEqual({
            id: 2,
            code: 'welcome',
            description: 'your coupon',
            discount: 99,
            name: 'welcome',
            price: 299,
        });
        expect(nextState.couponsPrefill).toEqual(welcomeCoupon);
    });
    it('should handle apiProfile.endpoints.getCouponsData.matchFulfilled when couponsList is empty', () => {
        const mockFulfilledAction = mockRtkQueryAction(
            apiPayments.reducerPath,
            apiPayments.endpoints.getCouponsData.name,
            'fulfilled',
            null,
        );
        store.dispatch(mockFulfilledAction);
        const nextState = store.getState().projectPost;
        expect(nextState.couponsPrefill).toEqual(null);
        expect(nextState.couponInfo).toEqual(initialCouponInfo);
    });
});
