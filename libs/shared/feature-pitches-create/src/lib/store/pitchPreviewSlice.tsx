import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';

import { createSlice } from '@reduxjs/toolkit';
import { PitchPreviewSliceType } from '../types/PitchPreviewSliceType';
import {
    BudgetType,
    Choice,
    IsInterestedProject,
    PitchProjectProgressBarStatuses,
    PitchProjectStatuses,
    ProjectAgencyActionStatuses,
    ProjectCreationStepsEnum,
    ProjectStatuses,
} from '@breef/shared/constants';

export const initialState: PitchPreviewSliceType = {
    shortProjectInfo: {
        clientName: '',
        name: '',
        budgetRange: '',
        budgetType: '',
        kickoff: '',
        requiredSkills: [],
        agencyPreferences: {
            location: '',
            preferences: [],
            advantages: [],
        },
    },
    pitchPreview: {
        kickOffStatus: 'approved_by_breef',
        companyWebsite: '',
        startDay: '',
        agencyTags: [],
        agencySkills: [],
        budgetRange: Choice['5k-7k'],
        budgetType: BudgetType.Monthly,
        step: ProjectCreationStepsEnum.ProjectScope,
        projectAgencyId: 0,
        name: '',
        description: '',
        submissionDeadline: '',
        isAcceptedTerms: false,
        companyName: '',
        companyDescription: '',
        socialLinks: [
            {
                title: 'Instagram',
                link: '',
            },
            {
                title: 'Twitter',
                link: '',
            },
            {
                title: 'TikTok',
                link: '',
            },
        ],
        companyLocation: '',
        agencyLocation: '',
        openToRemoteAgencies: false,
        agenciesAdvantages: [],
        files: [],
        pitchId: 0,
        kickoffId: null,
        brandLinks: [],
        status: ProjectStatuses.draft,
        projectAgencyStatus: PitchProjectStatuses.reviewProject,
        progressBarStatus: PitchProjectProgressBarStatuses.reviewAndPitch,
        actionValue: ProjectAgencyActionStatuses.reviewAndPitch,
        isPitchSubmitted: false,
        isInterested: IsInterestedProject.NotSelected,
        isConfidential: false,
    },
};

export const slice = createSlice({
    name: 'pitchPreview',
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            apiPitchCreate.endpoints.getPitchPreview.matchFulfilled,
            (state: PitchPreviewSliceType, { payload }) => {
                state.pitchPreview = payload;
                state.shortProjectInfo = {
                    clientName: payload.companyName,
                    name: payload.name,
                    budgetRange: payload.budgetRange || '',
                    budgetType: payload.budgetType || '',
                    kickoff: payload.startDay || '',
                    requiredSkills:
                        payload.agencySkills?.map(skill => skill.id) || [],
                    agencyPreferences: {
                        location: payload.companyLocation || '',
                        preferences:
                            payload.agencyTags?.map(
                                preference => preference.name,
                            ) || [],
                        advantages:
                            payload.agenciesAdvantages?.map(
                                advantage => advantage.name,
                            ) || [],
                    },
                };
            },
        );
    },
});

export default slice.reducer;

const rootState = slice.getInitialState();
export const previewPitchActions = slice.actions;

type State = typeof rootState;
export type SlicePreviewState = {
    [slice.name]: State;
};
