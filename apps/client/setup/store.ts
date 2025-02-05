import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { authReducer } from '@breef/shared/feature-auth';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiProfile } from '@breef/shared/data-access-profile';
import { profileReducer } from '@breef/shared/feature-profile';
import { apiOnboarding } from '@breef/shared/data-access-onboarding';
import { apiProject } from '@breef/shared/data-access-project';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { projectCreateReducer } from '@frontend/shared/feature-project-create';
import { apiCreateUpload, apiUpload } from '@breef/shared/data-access-upload';
import { apiProjects } from '@breef/shared/data-access-projects';
import { projectDetailsReducer } from '@breef/shared/feature-projects';
import { pitchListByClientReducer } from '@breef/shared/feature-project-dashboard-agency';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { apiPayments } from '@breef/shared/data-access-payments';
import { projectPostReducer } from '@breef/shared/feature-project-post';
import { kickoffReducer } from '@breef/shared/feature-kickoff';
import { apiKickoff } from '@breef/shared/data-access-kickoff';
import { projectAvailabilityReducer } from '@breef/shared/feature-project-availability';
import { apiZapierEvent } from '@breef/shared/zapier-event';
import { apiProjectAvailability } from '@breef/shared/data-access-project-availability';
import { dashboardReducer } from '@breef/shared/feature-project-dashboard-client';

const rootReducer = combineReducers({
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authReducer,
    [apiProfile.reducerPath]: apiProfile.reducer,
    profile: profileReducer,
    [apiOnboarding.reducerPath]: apiOnboarding.reducer,
    [apiProject.reducerPath]: apiProject.reducer,
    [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    projectCreate: projectCreateReducer,
    [apiUpload.reducerPath]: apiUpload.reducer,
    [apiCreateUpload.reducerPath]: apiCreateUpload.reducer,
    [apiProjects.reducerPath]: apiProjects.reducer,
    [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
    projectDetails: projectDetailsReducer,
    pitchListByClient: pitchListByClientReducer,
    [apiPayments.reducerPath]: apiPayments.reducer,
    projectPost: projectPostReducer,
    kickoff: kickoffReducer,
    [apiKickoff.reducerPath]: apiKickoff.reducer,
    [apiZapierEvent.reducerPath]: apiZapierEvent.reducer,
    projectAvailability: projectAvailabilityReducer,
    [apiProjectAvailability.reducerPath]: apiProjectAvailability.reducer,
    dashboard: dashboardReducer,
});

export const makeStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        'projectAvailability/setDays',
                        'projectAvailability/setSelectedBookingSlot',
                    ],
                    ignoredPaths: ['projectAvailability'],
                },
            }).concat(
                apiAuth.middleware,
                apiProfile.middleware,
                apiOnboarding.middleware,
                apiProject.middleware,
                apiProjectCreate.middleware,
                apiUpload.middleware,
                apiCreateUpload.middleware,
                apiProjects.middleware,
                apiPitchCreate.middleware,
                apiPayments.middleware,
                apiKickoff.middleware,
                apiZapierEvent.middleware,
                apiProjectAvailability.middleware,
            ),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
