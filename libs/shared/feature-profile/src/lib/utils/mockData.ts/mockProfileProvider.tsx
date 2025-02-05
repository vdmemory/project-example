import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { apiProfile } from '@breef/shared/data-access-profile';
import profileReducer from '../../store/profileSlice';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiPayments } from '@breef/shared/data-access-payments';

const mockStore = {
    servicesAndSkills: [
        {
            id: 6,
            name: 'Brand Strategy / Refresh',
        },
        {
            id: 16,
            name: 'Affiliate Marketing',
        },
    ],
    listAccountsCard: [],
    listAccountsBank: [],
};
const mockConfigureStore = configureStore({
    reducer: {
        [apiProfile.reducerPath]: apiProfile.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiPayments.reducerPath]: apiPayments.reducer,
        profile: profileReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiProfile.middleware,
            apiAuth.middleware,
            apiPayments.middleware,
        ),
    preloadedState: {
        profile: mockStore,
    },
});

export const MockProfileProvider = ({ children }: { children: ReactNode }) => (
    <Provider store={mockConfigureStore}>{children}</Provider>
);
