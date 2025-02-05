import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import { ENDPOINTS, TagsQueryParams } from '../constants/endpoints';
import {
    GetPitch,
    PitchAcceptTerms,
    PitchCreate,
    PitchMergedResponseType,
    PitchPreviewResponse,
    ProjectInterestedRequestType,
    ProjectInterestedType,
    GetIsSharingType,
    IsSharingType,
    SharingResponseType,
    PitchGuideFile,
    ListIdNameType,
    PassReasonsListType,
} from '@breef/shared/types';
import {
    preparePassReasons,
    prepareSetTermsForPitch,
    transformPreviewPitch,
} from '../adapters/previewAdapters';
import {
    preparePitchCreationData,
    transformGetPitchByIdData,
    transformPitchGuideFile,
} from '../adapters/pitchCreateAdapters';

import { isSharingAdapter } from '@breef/shared/utils';

export const apiPitchCreate = createApi({
    reducerPath: 'pitchCreateService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['PitchCreate', 'IsSharingPitch', 'Tags'],
    endpoints: builder => ({
        createPitch: builder.mutation<PitchMergedResponseType, PitchCreate>({
            query: body => ({
                url: ENDPOINTS.projectPath,
                method: 'POST',
                body: preparePitchCreationData(body),
            }),
            transformResponse: transformGetPitchByIdData,
        }),
        updatePitch: builder.mutation<PitchMergedResponseType, PitchCreate>({
            query: body => ({
                url: ENDPOINTS.getPitchById(body.pitchId || 0),
                method: 'PATCH',
                body: preparePitchCreationData(body),
            }),
            transformResponse: transformGetPitchByIdData,
        }),
        getPitchById: builder.query<PitchMergedResponseType, number>({
            query: id => ENDPOINTS.getPitchById(id),
            transformResponse: transformGetPitchByIdData,
        }),
        getPitch: builder.query<GetPitch, void>({
            query: () => ENDPOINTS.projectPath,
        }),
        getPitchPreview: builder.query<PitchPreviewResponse, number>({
            query: id => ENDPOINTS.getPitchPreview(id),
            transformResponse: transformPreviewPitch,
        }),
        setTermsForPitch: builder.mutation<undefined, PitchAcceptTerms>({
            query: body => {
                return {
                    url: ENDPOINTS.setTermsForPitch(body.id),
                    method: 'PATCH',
                    body: prepareSetTermsForPitch(body),
                };
            },
        }),
        updateIsSharingPitch: builder.mutation<
            SharingResponseType,
            IsSharingType
        >({
            query: body => ({
                url:
                    body.userType === 'client'
                        ? ENDPOINTS.sharingPitchClient({ pitchId: body.id })
                        : ENDPOINTS.sharingPitchAgency({ pitchId: body.id }),
                method: 'PATCH',
                body: {
                    is_shared: body.isSharing,
                },
            }),
            invalidatesTags: result => (result ? ['IsSharingPitch'] : []),
        }),
        getSharingPitch: builder.query<
            GetIsSharingType,
            { pitchId: number; userType: string }
        >({
            query: ({ pitchId, userType }) =>
                userType === 'client'
                    ? ENDPOINTS.sharingPitchClient({ pitchId })
                    : ENDPOINTS.sharingPitchAgency({ pitchId }),
            transformResponse: (
                response: SharingResponseType,
            ): GetIsSharingType => isSharingAdapter(response),
            providesTags: ['IsSharingPitch'],
        }),
        updateIsInterestedProject: builder.mutation<
            ProjectInterestedRequestType,
            ProjectInterestedType
        >({
            query: body => ({
                url: ENDPOINTS.updateIsInterestedProject({
                    projectAgencyId: body.projectAgencyId,
                }),
                method: 'PUT',
                body: preparePassReasons(body),
            }),
        }),
        getPitchGuideFile: builder.query<PitchGuideFile, void>({
            query: () => ENDPOINTS.getPitchGuideUrl(),
            transformResponse: transformPitchGuideFile,
        }),
        getClientPreferences: builder.query<ListIdNameType[], void>({
            query: () => ENDPOINTS.preferences,
        }),
        getTags: builder.query<ListIdNameType[], TagsQueryParams>({
            query: args => ENDPOINTS.tags(args),
            providesTags: ['Tags'],
        }),
        createTag: builder.mutation<{ id: number; name: string }, string>({
            query: name => ({
                url: ENDPOINTS.tags({}),
                method: 'POST',
                body: { name },
            }),
            invalidatesTags: ['Tags'],
        }),
        getPassReasons: builder.query<PassReasonsListType[], void>({
            query: () => ENDPOINTS.passReasons,
        }),
    }),
});

export const {
    useGetPitchByIdQuery,
    useLazyGetPitchByIdQuery,
    useGetPitchQuery,
    useLazyGetPitchPreviewQuery,
    useGetPitchPreviewQuery,
    useLazyGetPitchQuery,
    useSetTermsForPitchMutation,
    useCreatePitchMutation,
    useUpdateIsSharingPitchMutation,
    useGetSharingPitchQuery,
    useUpdatePitchMutation,
    useLazyGetSharingPitchQuery,
    useUpdateIsInterestedProjectMutation,
    useLazyGetPitchGuideFileQuery,
    useGetClientPreferencesQuery,
    useGetTagsQuery,
    useLazyGetTagsQuery,
    useCreateTagMutation,
    useGetPassReasonsQuery,
} = apiPitchCreate;
