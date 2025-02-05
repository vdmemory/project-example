import { createApi } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import {
    AccountInfoRequestType,
    BillingDataMergedType,
    CapabilitiesRequestType,
    ChangePasswordRequestType,
    ChangeRole,
    CompanyInfoFormRequestType,
    CompanyInfoMergedResponseType,
    CompanyInfoRequestType,
    CompanyRequestType,
    IndustriesTagsRequestType,
    IndustriesType,
    LinksDocsRequestType,
    ListRolesResponse,
    ServicesAndSkillsResponseType,
    SetPasswordRequestType,
    TeamMemberRequestType,
    TeamMembersMergedResponseType,
    TransformAccountInfoResponseType,
} from '@breef/shared/types';
import {
    AGENCIES_ACCOUNT_INFO_PATH,
    AGENCIES_COMPANY_INFO_PATH,
    BILLING_DATA_PATH,
    changeRolePath,
    CHANGE_PASSWORD_PATH,
    CLIENTS_ACCOUNT_INFO_PATH,
    CLIENTS_COMPANY_INFO_PATH,
    getRemoveUserPath,
    IDENTITIES_PATH,
    INDUSTRIES_PATH,
    INVITE_TEAM_MEMBER_PATH,
    LIST_ROLES_PATH,
    SERVICES_AND_SKILLS_PATH,
    SET_PASSWORD_PATH,
    TEAM_MEMBERS_PATH,
    TEAM_MEMBERS_KICKOFF_PATH,
    TOKEN_PROFILE_PATH,
    AGENCIES_COMPANY_PATH,
    AGENCIES_CAPABILITIES_PATH,
    AGENCIES_INDUSTRIES_TAGS_PATH,
    AGENCIES_LINKS_DOCS_PATH,
} from '../constants/endpoints';
import {
    prepareChangeAccountInfoData,
    prepareChangeBillingData,
    prepareChangeCapabilitiesData,
    prepareChangeCompanyData,
    prepareChangeCompanyInfoData,
    prepareChangeIndustriesTagsData,
    prepareChangeLinksDocsData,
    prepareChangePasswordData,
    prepareInviteTeamMemberData,
    prepareResendInviteTeamMemberData,
    prepareSetPasswordData,
    prepareUpdateCompanyInfoData,
    transformAccountInfoData,
    transformBillingData,
    transformCompanyInfoData,
    transformTeamMembersData,
} from '../adapters/profileAdapters';
import { fetchIntercept } from '@breef/shared/data-access-auth';

export const apiProfile = createApi({
    reducerPath: 'profileService',
    baseQuery: fetchIntercept,
    extractRehydrationInfo(action, { reducerPath }) {
        if (action.type === HYDRATE) {
            return action['payload'][reducerPath];
        }
    },
    tagTypes: [
        'ProfileService',
        'AccountInfo',
        'TeamMembers',
        'CompanyInfo',
        'BillingData',
    ],
    endpoints: builder => ({
        setPassword: builder.mutation<unknown, SetPasswordRequestType>({
            query: body => ({
                url: SET_PASSWORD_PATH,
                method: 'PATCH',
                body: prepareSetPasswordData(body),
            }),
            invalidatesTags: result => (result ? ['AccountInfo'] : []),
        }),
        changePassword: builder.mutation<void, ChangePasswordRequestType>({
            query: body => ({
                url: CHANGE_PASSWORD_PATH,
                method: 'POST',
                body: prepareChangePasswordData(body),
            }),
        }),
        changeAccountInfo: builder.mutation<unknown, AccountInfoRequestType>({
            query: body => ({
                url:
                    body.companyType === 'client'
                        ? CLIENTS_ACCOUNT_INFO_PATH
                        : AGENCIES_ACCOUNT_INFO_PATH,
                method: 'PUT',
                body: prepareChangeAccountInfoData(body),
            }),
            invalidatesTags: result =>
                result ? ['AccountInfo', 'TeamMembers'] : [],
        }),
        getAccountInfo: builder.query<
            TransformAccountInfoResponseType,
            { companyType: string }
        >({
            query: arg =>
                arg.companyType === 'client'
                    ? CLIENTS_ACCOUNT_INFO_PATH
                    : AGENCIES_ACCOUNT_INFO_PATH,
            providesTags: ['AccountInfo'],
            transformResponse: transformAccountInfoData,
        }),
        changeRole: builder.mutation<unknown, ChangeRole>({
            query: body => ({
                url: changeRolePath(body.userId),

                method: 'PATCH',
                body: {
                    position: body.position,
                },
            }),
            invalidatesTags: result => (result ? ['TeamMembers'] : []),
        }),
        // Only for agencies
        changeCompany: builder.mutation<unknown, CompanyRequestType>({
            query: body => ({
                url: AGENCIES_COMPANY_PATH,
                method: 'PATCH',
                body: prepareChangeCompanyData(body),
            }),
            invalidatesTags: result => (result ? ['CompanyInfo'] : []),
        }),
        changeCapabilities: builder.mutation<unknown, CapabilitiesRequestType>({
            query: body => ({
                url: AGENCIES_CAPABILITIES_PATH,
                method: 'PATCH',
                body: prepareChangeCapabilitiesData(body),
            }),
            invalidatesTags: result => (result ? ['CompanyInfo'] : []),
        }),
        changeIndustriesTags: builder.mutation<
            unknown,
            IndustriesTagsRequestType
        >({
            query: body => ({
                url: AGENCIES_INDUSTRIES_TAGS_PATH,
                method: 'PATCH',
                body: prepareChangeIndustriesTagsData(body),
            }),
            invalidatesTags: result => (result ? ['CompanyInfo'] : []),
        }),
        changeLinksDocs: builder.mutation<unknown, LinksDocsRequestType>({
            query: body => ({
                url: AGENCIES_LINKS_DOCS_PATH,
                method: 'PATCH',
                body: prepareChangeLinksDocsData(body),
            }),
            invalidatesTags: result => (result ? ['CompanyInfo'] : []),
        }),
        // Only for clients
        changeCompanyInfo: builder.mutation<unknown, CompanyInfoRequestType>({
            query: body => ({
                url: CLIENTS_COMPANY_INFO_PATH,
                method: 'PUT',
                body: prepareChangeCompanyInfoData(body),
            }),
            invalidatesTags: result => (result ? ['CompanyInfo'] : []),
        }),
        updateCompanyInfo: builder.mutation<
            unknown,
            CompanyInfoFormRequestType
        >({
            query: body => ({
                url: CLIENTS_COMPANY_INFO_PATH,
                method: 'PATCH',
                body: prepareUpdateCompanyInfoData(body),
            }),
        }),

        getCompanyInfo: builder.query<
            CompanyInfoMergedResponseType,
            { companyType: string }
        >({
            query: arg =>
                arg.companyType === 'client'
                    ? CLIENTS_COMPANY_INFO_PATH
                    : AGENCIES_COMPANY_INFO_PATH,
            providesTags: ['CompanyInfo'],
            transformResponse: transformCompanyInfoData,
        }),

        getIndustries: builder.query<IndustriesType, void>({
            query: () => INDUSTRIES_PATH,
        }),
        getIdentities: builder.query<IndustriesType, void>({
            query: () => IDENTITIES_PATH,
        }),
        getServicesAndSkills: builder.query<
            ServicesAndSkillsResponseType,
            void
        >({
            query: () => SERVICES_AND_SKILLS_PATH,
        }),
        getTeamMembers: builder.query<TeamMembersMergedResponseType, void>({
            query: () => TEAM_MEMBERS_PATH,
            providesTags: ['TeamMembers'],
            transformResponse: transformTeamMembersData,
        }),
        getTeamMembersKickoff: builder.query<
            TeamMembersMergedResponseType,
            void
        >({
            query: () => TEAM_MEMBERS_KICKOFF_PATH,
            providesTags: ['TeamMembers'],
            transformResponse: transformTeamMembersData,
        }),
        getListRoles: builder.query<ListRolesResponse, void>({
            query: () => LIST_ROLES_PATH,
        }),
        inviteTeamMember: builder.mutation<unknown, TeamMemberRequestType>({
            query: body => ({
                url: INVITE_TEAM_MEMBER_PATH,
                method: 'POST',
                body: prepareInviteTeamMemberData(body),
            }),
            invalidatesTags: result => (result ? ['TeamMembers'] : []),
        }),
        resendInviteTeamMember: builder.mutation<
            unknown,
            TeamMemberRequestType
        >({
            query: body => ({
                url: INVITE_TEAM_MEMBER_PATH,
                method: 'PATCH',
                body: prepareResendInviteTeamMemberData(body),
            }),
            invalidatesTags: ['TeamMembers'],
        }),
        removeInviteTeamMember: builder.mutation<unknown, number>({
            query: id => ({
                url: getRemoveUserPath(id),
                method: 'DELETE',
            }),
            invalidatesTags: ['TeamMembers'],
        }),
        getBillingData: builder.query<BillingDataMergedType, void>({
            query: () => BILLING_DATA_PATH,
            transformResponse: transformBillingData,
            providesTags: ['BillingData'],
        }),
        changeBillingData: builder.mutation<unknown, BillingDataMergedType>({
            query: body => ({
                url: BILLING_DATA_PATH,
                method: 'PUT',
                body: prepareChangeBillingData(body),
            }),
            invalidatesTags: result => (result ? ['BillingData'] : []),
        }),
        getTokenProfile: builder.query<{ token: string }, void>({
            query: () => TOKEN_PROFILE_PATH,
        }),
    }),
});

export const {
    useSetPasswordMutation,
    useChangePasswordMutation,
    useChangeAccountInfoMutation,
    useGetAccountInfoQuery,
    useLazyGetAccountInfoQuery,
    useChangeCompanyInfoMutation,
    useChangeRoleMutation,
    useGetCompanyInfoQuery,
    useGetIndustriesQuery,
    useGetIdentitiesQuery,
    useGetServicesAndSkillsQuery,
    useLazyGetServicesAndSkillsQuery,
    useGetTeamMembersQuery,
    useLazyGetTeamMembersQuery,
    useGetTeamMembersKickoffQuery,
    useLazyGetCompanyInfoQuery,
    useInviteTeamMemberMutation,
    useGetListRolesQuery,
    useResendInviteTeamMemberMutation,
    useRemoveInviteTeamMemberMutation,
    useGetBillingDataQuery,
    useLazyGetBillingDataQuery,
    useChangeBillingDataMutation,
    useLazyGetTokenProfileQuery,
    useUpdateCompanyInfoMutation,
    useChangeCompanyMutation,
    useChangeCapabilitiesMutation,
    useChangeIndustriesTagsMutation,
    useChangeLinksDocsMutation,
} = apiProfile;
