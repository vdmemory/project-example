import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchIntercept } from '@breef/shared/data-access-auth';
import { CapabilitiesQueryParams, ENDPOINTS } from '../constants/endpoints';
import {
    prepareCompanyDetailsData,
    prepareProjectCreationData,
    projectTemplateAdapter,
} from '../adapters/projectCreateAdapters';
import {
    AgencyAdvantagesResponseType,
    AgencyTimeFramesResponseType,
    CompanyDetailsRequestType,
    CompanyDetailsResponseType,
    GetTemplateTypes,
    ListIdNameType,
    ProjectCreationRequestType,
    ProjectGoalsResponseType,
    ProjectTemplateResponseType,
    ProjectTemplateType,
    ProjectUpdateRequestType,
    ProjectUpdateResponseType,
} from '@breef/shared/types';

export const apiProjectCreate = createApi({
    reducerPath: 'projectCreateService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: ['ProjectCreate', 'Capabilities'],
    endpoints: builder => ({
        createProject: builder.mutation<unknown, ProjectCreationRequestType>({
            query: body => ({
                url: ENDPOINTS.projectPath,
                method: 'POST',
                body: prepareProjectCreationData(body),
            }),
        }),
        creatorCreateProject: builder.mutation<number, number[]>({
            query: body => ({
                url: ENDPOINTS.projectCreatorPath,
                method: 'POST',
                body: { skills: body },
            }),
            transformResponse: ({ project_id }: { project_id: number }) =>
                project_id,
        }),
        updateProject: builder.mutation<
            ProjectUpdateResponseType,
            ProjectUpdateRequestType
        >({
            query: body => ({
                url: ENDPOINTS.updateProjectPath(body.id || 0),
                method: 'PATCH',
                body: prepareProjectCreationData(body.data),
            }),
        }),
        updateCompanyDetails: builder.mutation<
            CompanyDetailsResponseType,
            CompanyDetailsRequestType
        >({
            query: body => ({
                url: ENDPOINTS.updateProjectPath(body.id || 0),
                method: 'PATCH',
                body: prepareCompanyDetailsData(body),
            }),
        }),
        getAgencyTimeFramesList: builder.query<
            AgencyTimeFramesResponseType,
            void
        >({
            query: () => ENDPOINTS.agencyTimeFramesPath,
        }),
        getProjectGoalsList: builder.query<ProjectGoalsResponseType, void>({
            query: () => ENDPOINTS.projectGoalsPath,
        }),
        getAgencyAdvantagesList: builder.query<
            AgencyAdvantagesResponseType,
            'clients' | 'agencies'
        >({
            query: type => ENDPOINTS.agencyAdvantagesPath(type),
        }),
        getCapabilities: builder.query<
            ListIdNameType[],
            CapabilitiesQueryParams
        >({
            query: params => ENDPOINTS.capabilities(params),
        }),
        getAgencyPreferences: builder.query<ListIdNameType[], void>({
            query: () => ENDPOINTS.preferences,
        }),
        getTemplateTypes: builder.query<GetTemplateTypes[], void>({
            query: () => ENDPOINTS.getTemplateTypes,
        }),
        getTemplate: builder.query<ProjectTemplateType, number[]>({
            query: arg => ENDPOINTS.getTemplate(arg),
            transformResponse: projectTemplateAdapter,
        }),
    }),
});

export const {
    useCreateProjectMutation,
    useCreatorCreateProjectMutation,
    useUpdateProjectMutation,
    useUpdateCompanyDetailsMutation,
    useGetAgencyTimeFramesListQuery,
    useGetProjectGoalsListQuery,
    useGetAgencyAdvantagesListQuery,
    useGetTemplateTypesQuery,
    useGetCapabilitiesQuery,
    useGetAgencyPreferencesQuery,
    useLazyGetTemplateQuery,
} = apiProjectCreate;
