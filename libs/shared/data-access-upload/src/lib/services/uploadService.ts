import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import {
    CreateObjectFilesRequestType,
    SetFilesRequestType,
    TransformCreateObjectResponse,
} from '@breef/shared/types';
import { SET_FILES_PATH } from '../constants/endpoints';
import {
    prepareCreateObjectData,
    transformCreateObjectFilesData,
} from '../adapters/uploadAdapters';
import { API_URL } from '@breef/shared/constants';

export const apiCreateUpload = createApi({
    reducerPath: 'createUploadService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['Files'],
    endpoints: builder => ({
        createObjectFiles: builder.mutation<
            TransformCreateObjectResponse,
            CreateObjectFilesRequestType
        >({
            query: body => {
                return {
                    url: SET_FILES_PATH,
                    method: 'POST',
                    body: prepareCreateObjectData(body),
                };
            },
            invalidatesTags: result => (result ? ['Files'] : []),
            transformResponse: transformCreateObjectFilesData,
        }),
    }),
});

export const { useCreateObjectFilesMutation } = apiCreateUpload;

export const apiUpload = createApi({
    reducerPath: 'uploadService',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
    }),
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    endpoints: builder => ({
        setFiles: builder.mutation<void, SetFilesRequestType>({
            query: ({ path, ...body }) => {
                return {
                    url: path,
                    method: 'PUT',
                    body: body.file,
                };
            },
        }),
    }),
});

export const { useSetFilesMutation } = apiUpload;
