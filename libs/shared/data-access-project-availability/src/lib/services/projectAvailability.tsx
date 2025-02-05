import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import { HYDRATE } from 'next-redux-wrapper';
import {
    SetAvailabilityResponseType,
    TransformGetAvailabilityResponseType,
    TransformGetScheduleCallsResponseType,
    UpdateAvailabilityResponseType,
} from '@breef/shared/types';
import {
    getProjectBookSchedule,
    getProjectSchedule,
    getScheduleCalls,
} from '../constants/endpoints';
import {
    prepareSetProjectAvailability,
    prepareUpdateProjectAvailability,
    transformProjectAvailability,
    transformScheduledCallsList,
} from '../adapters/availabilityAdapters';

export const apiProjectAvailability = createApi({
    reducerPath: 'projectAvailabilityService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['Availability', 'ScheduleCalls'],
    endpoints: builder => ({
        getAvailability: builder.query<
            TransformGetAvailabilityResponseType | null,
            number
        >({
            query: projectId => getProjectSchedule(projectId),
            transformResponse: transformProjectAvailability,
            providesTags: ['Availability'],
            keepUnusedDataFor: 0.0001,
        }),
        setAvailability: builder.mutation<
            void,
            { projectId: number; availability: SetAvailabilityResponseType }
        >({
            query: ({ projectId, availability }) => ({
                url: getProjectSchedule(projectId),
                method: 'POST',
                body: prepareSetProjectAvailability(availability),
            }),
        }),
        updateAvailability: builder.mutation<
            void,
            { projectId: number; availability: UpdateAvailabilityResponseType }
        >({
            query: ({ projectId, availability }) => ({
                url: getProjectSchedule(projectId),
                method: 'PATCH',
                body: prepareUpdateProjectAvailability(availability),
            }),
        }),
        setBookingSlot: builder.mutation<
            void,
            {
                projectId: number;
                bookingSlotId: number | null;
                teamMembers: number[];
                externalUsers: string[];
            }
        >({
            query: ({
                projectId,
                bookingSlotId,
                teamMembers,
                externalUsers,
            }) => ({
                url: getProjectBookSchedule(projectId),
                method: 'POST',
                body: {
                    time_slot: bookingSlotId,
                    team_members: teamMembers,
                    external_users: externalUsers,
                },
            }),
        }),
        updateBookingSlot: builder.mutation<
            void,
            {
                projectId: number;
                bookingSlotId: number | null;
                teamMembers: number[];
                externalUsers: string[];
            }
        >({
            query: ({
                projectId,
                bookingSlotId,
                teamMembers,
                externalUsers,
            }) => ({
                url: getProjectBookSchedule(projectId),
                method: 'PATCH',
                body: {
                    time_slot: bookingSlotId,
                    team_members: teamMembers,
                    external_users: externalUsers,
                },
            }),
        }),
        getScheduledCallsList: builder.query<
            TransformGetScheduleCallsResponseType[] | null,
            number
        >({
            query: projectId => getScheduleCalls(projectId),
            transformResponse: transformScheduledCallsList,
            providesTags: ['ScheduleCalls'],
            keepUnusedDataFor: 0.0001,
        }),
    }),
});

export const {
    useGetAvailabilityQuery,
    useLazyGetAvailabilityQuery,
    useSetAvailabilityMutation,
    useUpdateAvailabilityMutation,
    useSetBookingSlotMutation,
    useUpdateBookingSlotMutation,
    useLazyGetScheduledCallsListQuery,
    useGetScheduledCallsListQuery,
} = apiProjectAvailability;
