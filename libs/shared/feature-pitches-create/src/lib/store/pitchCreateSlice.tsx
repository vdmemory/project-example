import { apiProfile } from '@breef/shared/data-access-profile';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PitchCreateSliceType } from '../types/pitchCreateType';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { getStep } from '../utils/getStep';

const initialState: PitchCreateSliceType = {
    step: 1,
    companyInfo: null,
    accountInfo: null,
    isPenMode: false,
    isDisabledSubmit: false,
    isSubmittingNext: false,
    isSubmittingSaveExit: false,
    targetElementId: null,
};

export const slice = createSlice({
    name: 'pitchCreate',
    initialState,
    reducers: {
        setStep: (
            state: PitchCreateSliceType,
            action: PayloadAction<{ stepper?: number; step: number }>,
        ) => {
            state.step = action.payload.step;
        },
        setIsSubmitting: (
            state: PitchCreateSliceType,
            action: PayloadAction<{
                isSubmitting: boolean;
                isNextAction?: boolean;
            }>,
        ) => {
            if (action.payload.isNextAction) {
                state.isSubmittingNext = action.payload.isSubmitting;
            } else {
                state.isSubmittingSaveExit = action.payload.isSubmitting;
            }
        },
        setIsDisabledSubmit: (
            state: PitchCreateSliceType,
            action: PayloadAction<boolean>,
        ) => {
            state.isDisabledSubmit = action.payload;
        },
        setPenMode: (
            state: PitchCreateSliceType,
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
        resetPenMode: (state: PitchCreateSliceType) => {
            state.targetElementId = null;
            state.isPenMode = false;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state: PitchCreateSliceType, { payload }) => {
                state.companyInfo = payload;
            },
        );
        builder.addMatcher(
            apiProfile.endpoints.getAccountInfo.matchFulfilled,
            (state, { payload }) => {
                state.accountInfo = payload;
            },
        );
        builder.addMatcher(
            apiPitchCreate.endpoints.getPitchById.matchFulfilled,
            (state, { payload }) => {
                state.step = getStep(payload.step);
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
