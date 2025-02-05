import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiProject } from '@breef/shared/data-access-project';
import {
    BrandLeadFullType,
    GetPitchesListSharing,
    GetSelfMergedResponseType,
    PitchesList,
    ProjectByIdType,
    TransformPitchesListResponse,
} from '@breef/shared/types';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiAuth } from '@breef/shared/data-access-auth';
import { ReviewDecisionNames } from '@breef/shared/constants';

export type DashboardClientType = {
    headerInfo: {
        company: {
            name: string;
            logo: string;
        } | null;
        brandLead: {
            firstName: string;
            lastName: string;
            logo: string;
        } | null;
        name: string;
        budget: string;
        budgetType: string;
    };
    brandLeadFullData: BrandLeadFullType | null;
    projectInfo: ProjectByIdType | null;
    selfInfo: GetSelfMergedResponseType | null;
    pitches: PitchesList[] | null;
    pitchesListReview: TransformPitchesListResponse[] | null;
    pitchesListSharing: GetPitchesListSharing | null;
    isDisabledPayments: boolean;
};

export const initialState: DashboardClientType = {
    headerInfo: {
        company: null,
        brandLead: null,
        name: '',
        budget: '',
        budgetType: '',
    },
    brandLeadFullData: null,
    projectInfo: null,
    selfInfo: null,
    pitches: null,
    pitchesListReview: null,
    pitchesListSharing: null,
    isDisabledPayments: false,
};

export const slice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        resetHeaderInfo: state => {
            const clearState = {
                ...state,
                headerInfo: initialState.headerInfo,
            };
            return clearState;
        },
        resetPitchesListReview: state => {
            const clearState = {
                ...state,
                pitchesListReview: initialState.pitchesListReview,
            };
            return clearState;
        },
        updateDecisionReviewPitches: (
            state,
            {
                payload: { id, decision },
            }: PayloadAction<{
                id: number;
                decision: ReviewDecisionNames;
            }>,
        ) => {
            if (!state.pitchesListReview) return;

            const updatedPitchesListReview = state.pitchesListReview.map(
                pitch => {
                    if (pitch.id !== id) return pitch;
                    return {
                        ...pitch,
                        reviewDecision: decision,
                    };
                },
            );

            return {
                ...state,
                pitchesListReview: updatedPitchesListReview,
            };
        },
        updateDecisionPitches: (
            state,
            {
                payload: { id, decision },
            }: PayloadAction<{
                id: number;
                decision: ReviewDecisionNames;
            }>,
        ) => {
            if (!state.pitches) return;

            const updatedPitchesList = state.pitches.map(pitch => {
                if (pitch.id !== id) return pitch;
                return {
                    ...pitch,
                    reviewDecision: decision,
                };
            });

            return {
                ...state,
                pitches: updatedPitchesList,
            };
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiProject.endpoints.getPitchesListByClient.matchFulfilled,
            (state, { payload }) => {
                state.pitches = payload.pitches;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.getPitchesSharing.matchFulfilled,
            (state, { payload }) => {
                state.pitchesListSharing = payload;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.updatePitchesSharing.matchFulfilled,
            (state, { payload }) => {
                state.pitchesListSharing = payload;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.getPitchesListReview.matchFulfilled,
            (state, { payload }) => {
                state.pitchesListReview = payload;
            },
        );

        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state, { payload: { brandLead, companyName, logoUrl } }) => {
                state.headerInfo = {
                    ...state.headerInfo,
                    brandLead: {
                        firstName: brandLead.firstName,
                        lastName: brandLead.lastName,
                        logo: brandLead.brandLead.logoUrl || '',
                    },
                    company: {
                        name: companyName,
                        logo: logoUrl,
                    },
                };
                state.brandLeadFullData = brandLead;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.getProjectById.matchFulfilled,
            (state, { payload }) => {
                state.projectInfo = payload;
                state.headerInfo = {
                    ...state.headerInfo,
                    name: payload.name,
                    budget: payload.budgetRange,
                    budgetType: payload.budgetType,
                };
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.getSelf.matchFulfilled,
            (state, { payload }) => {
                const isClient = payload.companyType?.includes('client');
                const isMember = payload.companyPosition?.includes('member');
                state.isDisabledPayments = isClient && isMember;
                state.selfInfo = payload;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.getAgencyPitch.matchFulfilled,
            (state, { payload }) => {
                state.pitchesListReview = state.pitchesListReview
                    ? state.pitchesListReview?.map(item => {
                          if (item.id !== payload.id) return item;
                          return {
                              ...item,
                              pitch: payload,
                          };
                      })
                    : null;
            },
        );
    },
});

export default slice.reducer;

const rootState = slice.getInitialState();
export const sliceActions = slice.actions;

type State = typeof rootState;
export type SliceState = {
    [slice.name]: State;
};
