import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import projectPostReducer, { initialState } from '../../store/projectPostSlice';
import { apiProject } from '@breef/shared/data-access-project';
import { apiPayments } from '@breef/shared/data-access-payments';
import { TransformCouponsResponseType } from '@breef/shared/types';
import { CouponsInfoType } from '../../types/projectInfoTypes';

export type MockProjectPostStoreType = {
    couponsPrefill?: TransformCouponsResponseType | null;
    couponInfo?: CouponsInfoType;
    postProjectError?: string;
};

export const mockConfiguredStoreFn = (store?: MockProjectPostStoreType) =>
    configureStore({
        reducer: {
            [apiProfile.reducerPath]: apiProfile.reducer,
            [apiProject.reducerPath]: apiProject.reducer,
            [apiPayments.reducerPath]: apiPayments.reducer,
            projectPost: projectPostReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                apiProfile.middleware,
                apiProject.middleware,
                apiPayments.middleware,
            ),
        preloadedState: {
            projectPost:
                {
                    couponsPrefill:
                        store?.couponsPrefill || initialState.couponsPrefill,
                    couponInfo: store?.couponInfo || initialState.couponInfo,
                    postProjectError:
                        store?.postProjectError ||
                        initialState.postProjectError,
                } || initialState,
        },
    });
export const mockConfiguredStore = mockConfiguredStoreFn();
