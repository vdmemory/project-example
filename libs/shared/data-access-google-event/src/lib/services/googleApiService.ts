import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { transformUserInfo } from '../adapters/googleApiAdapters';
import { GOOGLE_API, USER_INFO_PATH } from '../constants/endpoints';
import { UserInfoResponseType } from '@breef/shared/types';

export const apiGoogle = createApi({
    reducerPath: 'googleApiService',
    baseQuery: fetchBaseQuery({
        baseUrl: GOOGLE_API,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    endpoints: builder => ({
        getUserInfo: builder.query<UserInfoResponseType, string>({
            query: (token: string) => ({
                url: USER_INFO_PATH,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            transformResponse: transformUserInfo,
        }),
    }),
});

export const { useGetUserInfoQuery, useLazyGetUserInfoQuery } = apiGoogle;
