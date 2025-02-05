import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import { apiProjects } from '@breef/shared/data-access-projects';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';

export const mockStore = {
    onboardingCompleted: false,
    isOldUser: false,
    emailUser: 'test@gmail.com',
    dashboardIsLoaded: true,
    isDisabledPayments: false,
    brandLead: {
        brandLead: {
            id: 1,
            helpText:
                'Hey {user first name}, let us know if you have any questions!',
            companyType: 'client',
            logoUrl: null,
            calendlyLink: 'https://calendly.com/brand-lead/breef',
        },
        id: 21,
        email: 'emily@gmail.com',
        firstName: 'Emily',
        lastName: 'Bibb',
    },
};

export const mockConfiguredStore = configureStore({
    reducer: {
        [apiProjects.reducerPath]: apiProjects.reducer,
        [apiProfile.reducerPath]: apiProfile.reducer,
        [apiAuth.reducerPath]: apiAuth.reducer,
        [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
        projectDetails: projectsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(
            apiProjects.middleware,
            apiAuth.middleware,
            apiProjectCreate.middleware,
        ),
    preloadedState: {
        projectDetails: mockStore,
    },
});
