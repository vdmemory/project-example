import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from '@breef/shared/data-access-auth';
import authReducer from './authSlice';
import { getStorageData } from '@breef/shared/utils';
import { ACCESS_TOKEN } from '@breef/shared/constants';
import { AuthStateType } from '../types/authStateTypes';
import { apiProject } from '@breef/shared/data-access-project';

const initialAuth = !!getStorageData('cookie', ACCESS_TOKEN);
export const mockStore: AuthStateType = {
    isAuth: initialAuth,
    registrationData: null,
    signInError: null,
    utm: {},
};

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiProject.reducerPath]: apiProject.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiProject.middleware),
    preloadedState: {
        auth: mockStore,
    },
});
