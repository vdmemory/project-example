import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
    prepareCalendlyEvent,
    prepareProjectPlanningEvent,
    prepareProjectTypeEvent,
} from '../adapters/zapierEventAdapters';
import {
    CALENDLY_EVENT_CATCH_PATH,
    PROJECT_PLANNING_EVENT_CATCH_PATH,
    PROJECT_TYPE_EVENT_CATCH_PATH,
    ZAPIER_API_HOOK,
} from '../constants/endpoints';
import {
    CalendlyEventType,
    ProjectPlanningEventType,
    ProjectTypeEventType,
} from '@breef/shared/types';

export const apiZapierEvent = createApi({
    reducerPath: 'zapierEventService',
    baseQuery: fetchBaseQuery({
        baseUrl: ZAPIER_API_HOOK,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    endpoints: builder => ({
        setEventCalendly: builder.mutation<void, CalendlyEventType>({
            query: body => {
                return {
                    url: CALENDLY_EVENT_CATCH_PATH,
                    method: 'POST',
                    body: prepareCalendlyEvent(body),
                };
            },
        }),
        setEventProjectType: builder.mutation<void, ProjectTypeEventType>({
            query: body => {
                return {
                    url: PROJECT_TYPE_EVENT_CATCH_PATH,
                    method: 'POST',
                    body: prepareProjectTypeEvent(body),
                };
            },
        }),
        setEventProjectPlanning: builder.mutation<
            void,
            ProjectPlanningEventType
        >({
            query: body => {
                return {
                    url: PROJECT_PLANNING_EVENT_CATCH_PATH,
                    method: 'POST',
                    body: prepareProjectPlanningEvent(body),
                };
            },
        }),
    }),
});

export const {
    useSetEventCalendlyMutation,
    useSetEventProjectTypeMutation,
    useSetEventProjectPlanningMutation,
} = apiZapierEvent;
