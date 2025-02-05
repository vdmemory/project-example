import { createApi } from '@reduxjs/toolkit/query/react';
import {
    GetPitchesListSharing,
    GetPitchesListSharingRequest,
    PitchListByClient,
    PitchListByClientRequest,
    PublicPitchesList,
    PublicPitchesListRequest,
    SharedProjectRequest,
    SharedProjectType,
    UpdatePitchesListSharingRequest,
    UpdateReviewDesign,
    TeamMembersTransformResponseType,
    UsingTypesResponseType,
    GetIsSharingType,
    IsSharingType,
    SharingResponseType,
    ProjectByIdType,
    TransformAgencyPitchResponse,
    TransformPitchesListResponse,
    UpdateReviewDesignBody,
    AgenciesSchedulesList,
    UpdateAgenciesSchedulesListResponse,
    UpdateAgenciesSchedulesList,
    TransformUpdateReviewDesign,
} from '@breef/shared/types';
import {
    getDataPublicPitchesList,
    getPitchesListByClient,
    getPitchesSharing,
    getPublicSinglePitch,
    getSharedProject,
    projectById,
    sharingProjectAgency,
    sharingProjectClient,
    updateReviewDesign,
    getTeamProject,
    getTeamPitch,
    sendSelectedAgency,
    removeTeamProjectPath,
    removeTeamPitchPath,
    USING_TYPES_PATH,
    getAgencyPitch,
    getAgenciesSchedulesList,
} from '../constants/endpoints';
import { HYDRATE } from 'next-redux-wrapper';
import { projectByIdAdapters } from '../adapters/projectByIdAdapters';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import { projectSharedAdapters } from '../adapters/projectSharedAdapters';
import {
    getAgenciesSchedulesListAdapter,
    pitchesByClientAdapters,
    pitchesListTransformer,
    transformPitchAdapter,
} from '../adapters/pitchesbyClientAdapters';
import {
    pitchesSharingAdapters,
    publicPitchesListAdapters,
    publicSinglePitchAdapter,
} from '../adapters/pitchesSharingAdapters';

import { isSharingAdapter } from '@breef/shared/utils';
import { transformTeamMembersData } from '../adapters/teamMembersAdapter';

export const apiProject = createApi({
    reducerPath: 'projectService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: [
        'getProjectFromPostProject',
        'ProjectById',
        'PitchesSharing',
        'IsSharingProject',
        'IsSharingPitch',
        'PitchesList',
        'SinglePitch',
        'TeamMembers',
        'AgencyPitch',
    ],
    endpoints: builder => ({
        getUsingTypes: builder.query<UsingTypesResponseType, void>({
            query: () => USING_TYPES_PATH,
        }),
        getProjectById: builder.query<ProjectByIdType, number>({
            query: id => projectById(id),
            providesTags: ['ProjectById'],
            keepUnusedDataFor: 1,
            transformResponse: projectByIdAdapters,
        }),
        getProjectFromPostProject: builder.query<ProjectByIdType, number>({
            query: id => projectById(id),
            providesTags: ['getProjectFromPostProject'],
            keepUnusedDataFor: 1,
            transformResponse: projectByIdAdapters,
        }),
        getSharedProject: builder.query<SharedProjectType, { token: string }>({
            query: data => getSharedProject(data.token),
            transformResponse: (
                response: SharedProjectRequest,
            ): SharedProjectType => ({
                ...projectSharedAdapters(response),
            }),
        }),
        updateIsSharing: builder.mutation<SharingResponseType, IsSharingType>({
            query: body => ({
                url:
                    body.userType === 'client'
                        ? sharingProjectClient({ projectId: body.id })
                        : sharingProjectAgency({ projectId: body.id }),
                method: 'PATCH',
                body: {
                    is_shared: body.isSharing,
                },
            }),
            invalidatesTags: result => (result ? ['IsSharingProject'] : []),
        }),
        // pitches list (tab dashboard client)
        getPitchesListByClient: builder.query<PitchListByClient, string>({
            query: projectId => getPitchesListByClient(projectId),
            providesTags: ['PitchesList'],
            transformResponse: (
                response: PitchListByClientRequest,
            ): PitchListByClient => ({
                ...pitchesByClientAdapters(response),
            }),
        }),
        // review pitches (tab dashboard client)
        getPitchesListReview: builder.query<
            TransformPitchesListResponse[],
            string
        >({
            query: projectId => getPitchesListByClient(projectId),
            transformResponse: pitchesListTransformer,
        }),
        getPitchesSharing: builder.query<GetPitchesListSharing, number>({
            query: idProject => getPitchesSharing(idProject),
            providesTags: ['PitchesSharing'],
            transformResponse: (
                response: GetPitchesListSharingRequest,
            ): GetPitchesListSharing => pitchesSharingAdapters(response),
        }),
        updatePitchesSharing: builder.mutation<
            GetPitchesListSharing,
            UpdatePitchesListSharingRequest
        >({
            query: body => ({
                url: getPitchesSharing(body.idProject),
                method: 'PATCH',
                body: {
                    pitches_sharing: body.isSharing,
                },
            }),
            transformResponse: (
                response: GetPitchesListSharingRequest,
            ): GetPitchesListSharing => pitchesSharingAdapters(response),
        }),
        getSharingProject: builder.query<
            GetIsSharingType,
            { projectId: number; userType: string }
        >({
            query: ({ projectId, userType }) =>
                userType === 'client'
                    ? sharingProjectClient({ projectId })
                    : sharingProjectAgency({ projectId }),
            transformResponse: (
                response: SharingResponseType,
            ): GetIsSharingType => isSharingAdapter(response),
            providesTags: ['IsSharingProject'],
        }),
        getPublicPitchesList: builder.query<PublicPitchesList[], string>({
            query: token => getDataPublicPitchesList(token),
            transformResponse: (
                response: PublicPitchesListRequest[],
            ): PublicPitchesList[] => publicPitchesListAdapters(response),
        }),
        getPublicSinglePitch: builder.query<
            TransformAgencyPitchResponse,
            { token: string; isAdmin?: boolean }
        >({
            query: data => getPublicSinglePitch(data.token, data.isAdmin),
            transformResponse: publicSinglePitchAdapter,
        }),
        // review pitches (tab dashboard client)
        getAgencyPitch: builder.query<
            TransformAgencyPitchResponse,
            { projectId: number; pitchId: number }
        >({
            query: ({ projectId, pitchId }) =>
                getAgencyPitch({
                    projectId,
                    pitchId,
                }),
            providesTags: ['AgencyPitch'],
            transformResponse: transformPitchAdapter,
        }),
        updateReviewDecision: builder.mutation<
            TransformUpdateReviewDesign,
            UpdateReviewDesignBody
        >({
            query: body => ({
                url: updateReviewDesign(body.id),
                method: 'PATCH',
                body: {
                    review_decision: body.reviewDecision,
                },
            }),
            transformResponse: (
                response: UpdateReviewDesign,
            ): TransformUpdateReviewDesign => ({
                reviewDecision: response.review_decision,
            }),
            invalidatesTags: result => (result ? ['AgencyPitch'] : []),
        }),
        // schedule intros or make intro (tab dashboard client) - new action
        getAgenciesSchedulesList: builder.query<
            AgenciesSchedulesList[],
            number | string
        >({
            query: id => getAgenciesSchedulesList(id),
            transformResponse: getAgenciesSchedulesListAdapter,
        }),
        // schedule intros or make intro (tab dashboard client)  - new action
        updateAgenciesSchedulesList: builder.mutation<
            UpdateAgenciesSchedulesListResponse,
            UpdateAgenciesSchedulesList
        >({
            query: body => ({
                url: getAgenciesSchedulesList(body.id),
                method: 'PATCH',
                body: {
                    agencies: body.agencies,
                },
            }),
        }),

        getTeamMembersProject: builder.query<
            TeamMembersTransformResponseType,
            number | string
        >({
            query: id => getTeamProject(id),
            providesTags: ['TeamMembers'],
            transformResponse: transformTeamMembersData,
        }),
        getTeamMembersPitch: builder.query<
            TeamMembersTransformResponseType,
            number | string
        >({
            query: id => getTeamPitch(id),
            providesTags: ['TeamMembers'],
            transformResponse: transformTeamMembersData,
        }),
        removeTeamMembersProject: builder.mutation<
            unknown,
            {
                projectId: number;
                teamId: number;
            }
        >({
            query: ({ projectId, teamId }) => ({
                url: removeTeamProjectPath({
                    projectId: projectId,
                    teamId: teamId,
                }),
                method: 'DELETE',
            }),
            invalidatesTags: ['TeamMembers'],
        }),
        removeTeamMembersPitch: builder.mutation<
            unknown,
            {
                projectId: number;
                teamId: number;
            }
        >({
            query: data => ({
                url: removeTeamPitchPath(data),
                method: 'DELETE',
            }),
            invalidatesTags: ['TeamMembers'],
        }),
        sendSelectedAgency: builder.mutation<
            { id: number | string },
            { projectId: string; pitchId: string | number }
        >({
            query: ({ projectId, pitchId }) => ({
                url: sendSelectedAgency(projectId),
                method: 'PATCH',
                body: {
                    pitch: pitchId,
                },
            }),
        }),
    }),
});

export const {
    useLazyGetProjectFromPostProjectQuery,
    useLazyGetProjectByIdQuery,
    useUpdateIsSharingMutation,
    useGetProjectByIdQuery,
    useLazyGetSharedProjectQuery,
    useGetPitchesListByClientQuery,
    useLazyGetPitchesListByClientQuery,
    useUpdatePitchesSharingMutation,
    useGetPitchesSharingQuery,
    useLazyGetPitchesSharingQuery,
    useLazyGetPublicPitchesListQuery,
    useLazyGetPublicSinglePitchQuery,
    useGetSharingProjectQuery,
    useUpdateReviewDecisionMutation,
    useGetTeamMembersPitchQuery,
    useGetTeamMembersProjectQuery,
    useSendSelectedAgencyMutation,
    useRemoveTeamMembersProjectMutation,
    useRemoveTeamMembersPitchMutation,
    useGetUsingTypesQuery,
    useLazyGetAgencyPitchQuery,
    useGetAgencyPitchQuery,
    useLazyGetPitchesListReviewQuery,
    useLazyGetAgenciesSchedulesListQuery,
    useUpdateAgenciesSchedulesListMutation,
} = apiProject;
