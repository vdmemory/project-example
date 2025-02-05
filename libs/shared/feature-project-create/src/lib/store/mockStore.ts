import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { configureStore } from '@reduxjs/toolkit';
import { initialStateProjectCreateSlice } from './initialState';
import { apiAuth } from '@breef/shared/data-access-auth';
import projectCreateReducer from '../store/projectCreateSlice';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';

const options = {
    reducer: {
        [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
        projectCreate: projectCreateReducer,
    },
};

export const mockConfiguredStore = configureStore({
    ...options,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiProjectCreate.middleware,
            apiAuth.middleware,
            apiPitchCreate.middleware,
        ),
    preloadedState: { projectCreate: initialStateProjectCreateSlice },
});
