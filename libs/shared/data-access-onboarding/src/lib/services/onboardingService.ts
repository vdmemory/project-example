import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import { CLIENT_ONBOARDING_PATH } from '../constants/endpoints';

export const apiOnboarding = createApi({
    reducerPath: 'onboardingService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['OnboardingService'],
    endpoints: builder => ({
        sendClientOnboarding: builder.mutation<
            { id: number; is_onboarding_complete: boolean },
            unknown
        >({
            query: () => ({
                url: CLIENT_ONBOARDING_PATH,
                method: 'PUT',
                body: { is_onboarding_complete: true },
            }),
        }),
    }),
});

export const { useSendClientOnboardingMutation } = apiOnboarding;
