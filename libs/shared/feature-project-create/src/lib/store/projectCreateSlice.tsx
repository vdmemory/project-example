import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialStateProjectCreateSlice } from './initialState';
import { StateProjectCreateSliceType } from '../types/projectCreateTypes';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiAuth } from '@breef/shared/data-access-auth';

const initialState = initialStateProjectCreateSlice;

export const slice = createSlice({
    name: 'projectCreate',
    initialState,
    reducers: {
        setStep: (
            state: StateProjectCreateSliceType,
            action: PayloadAction<{ step: number }>,
        ) => {
            state.step = action.payload.step;
        },
        setIsSubmitting: (
            state: StateProjectCreateSliceType,
            action: PayloadAction<{ value: boolean; isNext?: boolean }>,
        ) => {
            if (action.payload.isNext) {
                state.isSubmitting = action.payload.value;
            } else {
                state.isSubmittingSaveExit = action.payload.value;
            }
        },
        setPenMode: (
            state: StateProjectCreateSliceType,
            action: PayloadAction<{
                isPenMode: boolean;
                targetElementId?: string;
            }>,
        ) => {
            state.isPenMode = action.payload.isPenMode;
            if (action.payload.targetElementId) {
                state.targetElementId = action.payload.targetElementId;
            }
        },
        resetPenMode: (state: StateProjectCreateSliceType) => {
            state.targetElementId = null;
            state.isPenMode = false;
        },
        setIsTooltipProjectOverview: (
            state: StateProjectCreateSliceType,
            action: PayloadAction<boolean>,
        ) => {
            state.isTooltipProjectOverview = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state, { payload }) => {
                state.profile.companyName = payload.companyName;
                state.profile.brandLead = payload.brandLead;
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.getSelf.matchFulfilled,
            (state, { payload: { hasPassword, hasSocialAccount } }) => {
                state.user.needsPassword = !hasPassword && !hasSocialAccount;
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
