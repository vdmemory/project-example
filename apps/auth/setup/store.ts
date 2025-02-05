import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { authReducer } from '@breef/shared/feature-auth';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiProject } from '@breef/shared/data-access-project';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { apiGoogle } from '@breef/shared/data-access-google-event';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { projectDetailsReducer } from '@breef/shared/feature-projects';
import { pitchListByClientReducer } from '@breef/shared/feature-project-dashboard-agency';
import { dashboardReducer } from '@breef/shared/feature-project-dashboard-client';
import { apiProjects } from '@breef/shared/data-access-projects';

const rootReducer = combineReducers({
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authReducer,
    [apiProject.reducerPath]: apiProject.reducer,
    [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    [apiGoogle.reducerPath]: apiGoogle.reducer,
    [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
    projectDetails: projectDetailsReducer,
    pitchListByClient: pitchListByClientReducer,
    dashboard: dashboardReducer,
    [apiProjects.reducerPath]: apiProjects.reducer,
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
                apiPitchCreate.middleware,
                apiProjects.middleware,
            ),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
