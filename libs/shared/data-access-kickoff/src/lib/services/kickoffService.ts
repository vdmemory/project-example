import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';

import {
    KickoffAgencyBillingInfoType,
    KickoffMergedResponseType,
    KickoffRequestType,
} from '@breef/shared/types';

import {
    prepareSendKickoffAgencyData,
    prepareSendKickoffClientData,
    transformAgencyKickoffBillingInfo,
    transformKickoffData,
} from '../adapters/kickoffAdapters';
import { ENDPOINTS } from '../constants/endpoints';

export const apiKickoff = createApi({
    reducerPath: 'kickoffService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: [],
    endpoints: builder => ({
        sendKickoff: builder.mutation<unknown, KickoffRequestType>({
            query: body => ({
                url: ENDPOINTS.kickoff(body.projectId),
                method:
                    body.mode === 'create' && body.userType !== 'client'
                        ? 'POST'
                        : 'PATCH',
                body:
                    body.userType === 'agency'
                        ? prepareSendKickoffAgencyData(body)
                        : prepareSendKickoffClientData(body),
            }),
        }),
        getKickoff: builder.query<KickoffMergedResponseType, number>({
            query: id => ENDPOINTS.kickoff(id),
            transformResponse: transformKickoffData,
        }),
        getKickoffAgencyBillingInfo: builder.query<
            KickoffAgencyBillingInfoType,
            number
        >({
            query: id => ENDPOINTS.kickoffAgencyBillingInfo(id),
            transformResponse: transformAgencyKickoffBillingInfo,
        }),
    }),
});

export const {
    useSendKickoffMutation,
    useLazyGetKickoffQuery,
    useGetKickoffAgencyBillingInfoQuery,
} = apiKickoff;
