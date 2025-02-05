import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { authReducer, AuthStateType } from '../../../index';
import { configureStore } from '@reduxjs/toolkit';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiProject } from '@breef/shared/data-access-project';

import { combineReducers } from '@reduxjs/toolkit';
import { apiGoogle } from '@breef/shared/data-access-google-event';

export const mockStore: AuthStateType = {
    isAuth: true,
    registrationData: null,
    signInError: null,
    utm: {},
};

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiAuth.reducerPath]: apiAuth.reducer,
        auth: authReducer,
        [apiProject.reducerPath]: apiProject.reducer,
        [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiAuth.middleware,
            apiProject.middleware,
            apiProjectCreate.middleware,
        ),
    preloadedState: {
        auth: mockStore,
    },
});

const rootReducer = combineReducers({
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authReducer,
    [apiProject.reducerPath]: apiProject.reducer,
    [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    [apiGoogle.reducerPath]: apiGoogle.reducer,
});

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware().concat(
                apiAuth.middleware,
                apiProject.middleware,
                apiProjectCreate.middleware,
                apiGoogle.middleware,
            ),
        preloadedState: {
            auth: mockStore,
        },
    });
