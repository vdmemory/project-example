import { createApi } from '@reduxjs/toolkit/query/react';
import {
    AgencyProjectType,
    AgencyProjectTypeRequest,
    CollectionPostTransformResponse,
    CTAActionButtonType,
    CTAActionButtonTypeRequest,
    FilterProjectsType,
    ProjectsResponseType,
    ProjectsTypeRequest,
    StreamlinedProjectTransformResponseType,
} from '@breef/shared/types';
import {
    COLLECTION_POSTS_PATH,
    DASHBOARD_CTA_ACTION_PATH,
    PROJECTS_PATH,
    STREAMLINED_PROJECT_DATA_PATH,
} from '../constants/endpoints';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import {
    agencyProjectsAdapter,
    collectionPostsAdapter,
    projectsAdapter,
    transformActionButtonCTA,
} from '../adapters/projectsAdapters';
import { transformStreamlinedProjectData } from '../adapters/streamlinedProjectAdapters';

export const apiProjects = createApi({
    reducerPath: 'projectsService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['StreamlinedProject'],
    endpoints: builder => ({
        getProjects: builder.query<ProjectsResponseType, FilterProjectsType>({
            query: queryArgs => PROJECTS_PATH('client', queryArgs),
            transformResponse: (
                data: ProjectsTypeRequest,
            ): ProjectsResponseType => projectsAdapter(data),
        }),
        getAgencyProjects: builder.query<AgencyProjectType, FilterProjectsType>(
            {
                query: queryArgs => PROJECTS_PATH('agency', queryArgs),
                transformResponse: (
                    results: AgencyProjectTypeRequest,
                ): AgencyProjectType => agencyProjectsAdapter(results),
            },
        ),
        getActionMainCTA: builder.query<CTAActionButtonType, void>({
            query: () => DASHBOARD_CTA_ACTION_PATH,
            transformResponse: (
                results: CTAActionButtonTypeRequest,
            ): CTAActionButtonType => transformActionButtonCTA(results),
        }),
        getCollectionPosts: builder.query<
            CollectionPostTransformResponse[],
            void
        >({
            query: () => COLLECTION_POSTS_PATH,
            transformResponse: collectionPostsAdapter,
        }),
        getStreamlinedProjectData: builder.query<
            StreamlinedProjectTransformResponseType | null,
            void
        >({
            query: () => STREAMLINED_PROJECT_DATA_PATH,
            providesTags: ['StreamlinedProject'],
            transformResponse: transformStreamlinedProjectData,
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useLazyGetProjectsQuery,
    useGetAgencyProjectsQuery,
    useGetActionMainCTAQuery,
    useGetCollectionPostsQuery,
    useLazyGetStreamlinedProjectDataQuery,
} = apiProjects;
