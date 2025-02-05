import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { apiProject } from '@breef/shared/data-access-project';
import { PitchesList } from '@breef/shared/types';
import numeral from 'numeral';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiAuth } from '@breef/shared/data-access-auth';

export type InitialStatePitchesList = {
    pitchesList: PitchesList[];
    viewedTabs: Array<string | number>;
    initialTab: number | null;
    brandLead: {
        firstName: string;
        lastName: string;
        logoUrl: string;
    };
    isDisabledPayments: boolean;
};

export const initialStatePitchesList: InitialStatePitchesList = {
    pitchesList: [] as PitchesList[],
    viewedTabs: [],
    initialTab: null,
    brandLead: {
        firstName: '',
        lastName: '',
        logoUrl: '',
    },
    isDisabledPayments: false,
};

export const slice = createSlice({
    name: 'pitchListByClient',
    initialState: initialStatePitchesList,
    reducers: {
        setViewedTabs: (
            state: InitialStatePitchesList,
            action: PayloadAction<number | string>,
        ) => {
            if (
                state.viewedTabs.length &&
                state.viewedTabs.includes(action.payload)
            ) {
                return;
            } else {
                state.viewedTabs = [...state.viewedTabs, action.payload];
            }
        },
        setInitialTab: (
            state: InitialStatePitchesList,
            action: PayloadAction<number | null>,
        ) => {
            state.initialTab = action.payload;
        },
        clearState: (state: InitialStatePitchesList) => {
            state.pitchesList = [];
            state.viewedTabs = [];
            state.initialTab = null;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiProject.endpoints.getPitchesListByClient.matchFulfilled,
            (state, { payload }) => {
                if (payload.pitches.length) {
                    state.pitchesList = payload.pitches.map(item => ({
                        ...item,
                        // budget: numeral(item.budget).value() as number,
                    }));
                } else {
                    state.pitchesList = [];
                }
            },
        );
        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state, { payload }) => {
                state = {
                    ...state,
                    brandLead: {
                        firstName: payload.brandLead.firstName,
                        lastName: payload.brandLead.lastName,
                        logoUrl: payload.brandLead.brandLead.logoUrl || '',
                    },
                };
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.getSelf.matchFulfilled,
            (state, { payload }) => {
                const isClient = payload.companyType?.includes('client');
                const isMember = payload.companyPosition?.includes('member');
                state.isDisabledPayments = isClient && isMember;
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
