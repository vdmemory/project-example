import { configureStore } from '@reduxjs/toolkit';
import { apiKickoff } from '@breef/shared/data-access-kickoff';
import kickoffReducer from './kickoffSlice';
import { apiProfile } from '@breef/shared/data-access-profile';
import { initialStateKickoffSlice } from './initialStateKickoffSlice';

export const mockStore = initialStateKickoffSlice;

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiKickoff.reducerPath]: apiKickoff.reducer,
        [apiProfile.reducerPath]: apiProfile.reducer,
        kickoff: kickoffReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiProfile.middleware),
    preloadedState: {
        kickoff: mockStore,
    },
});
