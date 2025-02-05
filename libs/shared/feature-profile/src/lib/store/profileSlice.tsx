import { apiPayments } from '@breef/shared/data-access-payments';
import { apiProfile } from '@breef/shared/data-access-profile';
import { createSlice } from '@reduxjs/toolkit';
import { ListAccountsType, ValueSelectType } from '../types/profileFormTypes';
import {
    replacementAccountList,
    replacementProfile,
} from './replacementFunction';

export const slice = createSlice({
    name: 'profile',
    initialState: {
        listAccountsCard: [] as ListAccountsType[],
        listAccountsBank: [] as ListAccountsType[],
        servicesAndSkills: [] as ValueSelectType[],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(
            apiPayments.endpoints.getCards.matchFulfilled,
            (state, { payload }) => {
                return {
                    ...state,
                    listAccountsCard: replacementAccountList(payload),
                };
            },
        );
        builder.addMatcher(
            apiPayments.endpoints.getBanks.matchFulfilled,
            (state, { payload }) => {
                return {
                    ...state,
                    listAccountsBank: replacementAccountList(payload),
                };
            },
        );
        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state, { payload }) => {
                return {
                    ...state,
                    servicesAndSkills: replacementProfile(payload),
                };
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
