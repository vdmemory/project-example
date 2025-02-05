import { configureStore } from '@reduxjs/toolkit';
import pitchListByClientReducer, {
    InitialStatePitchesList,
    initialStatePitchesList,
} from './pitchListByClient';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { apiProject } from '@breef/shared/data-access-project';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { apiPayments } from '@breef/shared/data-access-payments';
import { apiAuth } from '@breef/shared/data-access-auth';

const getPreloadedState = ({
    anotherStoreData,
    isPrefilledStoreData,
}: {
    anotherStoreData?: InitialStatePitchesList | null;
    isPrefilledStoreData?: boolean;
}) => {
    if (anotherStoreData !== null && !isPrefilledStoreData) {
        return anotherStoreData;
    } else {
        return initialStatePitchesList;
    }
};

export const MockProjectDashboardProvider = ({
    children,
    anotherStoreData = null,
}: {
    children: ReactNode;
    anotherStoreData?: InitialStatePitchesList | null;
}) => {
    const mockConfiguredStore = configureStore({
        reducer: {
            pitchListByClient: pitchListByClientReducer,
            [apiProfile.reducerPath]: apiProfile.reducer,
            [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
            [apiPayments.reducerPath]: apiPayments.reducer,
            [apiProject.reducerPath]: apiProject.reducer,
            [apiAuth.reducerPath]: apiAuth.reducer,
        },
        preloadedState: {
            pitchListByClient: getPreloadedState({
                anotherStoreData: anotherStoreData,
            }),
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                apiProfile.middleware,
                apiPitchCreate.middleware,
                apiPayments.middleware,
                apiProject.middleware,
                apiAuth.middleware,
            ),
    });

    return <Provider store={mockConfiguredStore}>{children}</Provider>;
};
