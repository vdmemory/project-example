import { apiPayments } from '@breef/shared/data-access-payments';
import { TransformCouponsResponseType } from '@breef/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCouponInfo } from './initialProjectInfo';
import { replacementCouponInfo } from './replacementFunction';

export const initialState = {
    couponsPrefill: null as TransformCouponsResponseType | null,
    couponInfo: initialCouponInfo,
    postProjectError: '',
};

export const slice = createSlice({
    name: 'projectPost',
    initialState,
    reducers: {
        addCoupon: (
            state,
            { payload }: PayloadAction<TransformCouponsResponseType>,
        ) => {
            state.couponInfo = replacementCouponInfo(payload);
        },
        removeCoupon: state => {
            state.couponInfo = initialCouponInfo;
        },
        updateErrorPostProject: (state, action: PayloadAction<string>) => {
            state.postProjectError = action.payload;
        },

        resetProjectPost: () => {
            return { ...initialState };
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiPayments.endpoints.getCouponsData.matchFulfilled,
            (state, { payload }) => {
                state.couponInfo = payload
                    ? replacementCouponInfo(payload)
                    : initialCouponInfo;

                state.couponsPrefill = payload ?? null;
            },
        );
        builder.addMatcher(
            apiPayments.endpoints.validateCoupons.matchFulfilled,
            (state, { payload }) => {
                state.couponInfo = payload
                    ? replacementCouponInfo(payload)
                    : initialCouponInfo;
            },
        );
    },
});

export default slice.reducer;

const rootState = slice.getInitialState();
export const sliceActions = slice.actions;

export type State = typeof rootState;
export type SliceState = {
    [slice.name]: State;
};
