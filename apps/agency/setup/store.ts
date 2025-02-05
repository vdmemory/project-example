import { apiCreateUpload, apiUpload } from '@breef/shared/data-access-upload';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { apiProfile } from '@breef/shared/data-access-profile';
import { profileReducer } from '@breef/shared/feature-profile';
import { apiAuth } from '@breef/shared/data-access-auth';
import { authReducer } from '@breef/shared/feature-auth';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import {
    pitchCreateReducer,
    pitchPreviewReducer,
} from '@frontend/shared/feature-pitches-create';
import { kickoffReducer } from '@breef/shared/feature-kickoff';
import { apiOnboarding } from '@breef/shared/data-access-onboarding';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { apiProjects } from '@breef/shared/data-access-projects';
import { apiProject } from '@breef/shared/data-access-project';
import { pitchListByClientReducer } from '@breef/shared/feature-project-dashboard-agency';
import { projectDetailsReducer } from '@breef/shared/feature-projects';
import { apiPayments } from '@breef/shared/data-access-payments';
import { apiKickoff } from '@breef/shared/data-access-kickoff';
import { apiZapierEvent } from '@breef/shared/zapier-event';
import { projectAvailabilityReducer } from '@breef/shared/feature-project-availability';
import { apiProjectAvailability } from '@breef/shared/data-access-project-availability';

const rootReducer = combineReducers({
    [apiAuth.reducerPath]: apiAuth.reducer,
    auth: authReducer,
    [apiProfile.reducerPath]: apiProfile.reducer,
    profile: profileReducer,
    [apiOnboarding.reducerPath]: apiOnboarding.reducer,
    [apiProject.reducerPath]: apiProject.reducer,
    [apiUpload.reducerPath]: apiUpload.reducer,
    [apiPitchCreate.reducerPath]: apiPitchCreate.reducer,
    [apiCreateUpload.reducerPath]: apiCreateUpload.reducer,
    [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
    [apiProjects.reducerPath]: apiProjects.reducer,
    pitchPreview: pitchPreviewReducer,
    pitchCreate: pitchCreateReducer,
    projectDetails: projectDetailsReducer,
    kickoff: kickoffReducer,
    pitchListByClient: pitchListByClientReducer,
    [apiPayments.reducerPath]: apiPayments.reducer,
    [apiKickoff.reducerPath]: apiKickoff.reducer,
    [apiZapierEvent.reducerPath]: apiZapierEvent.reducer,
    projectAvailability: projectAvailabilityReducer,
    [apiProjectAvailability.reducerPath]: apiProjectAvailability.reducer,
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
                apiPitchCreate.middleware,
                apiUpload.middleware,
                apiCreateUpload.middleware,
                apiProjectCreate.middleware,
                apiProjects.middleware,
                apiProject.middleware,
                apiPayments.middleware,
                apiKickoff.middleware,
                apiZapierEvent.middleware,
                apiOnboarding.middleware,
                apiProjectAvailability.middleware,
            ),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
