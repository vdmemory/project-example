import { CREATE_PITCH_KEY, CREATE_PROJECT_KEY } from '@breef/shared/constants';
import { apiAuth } from '@breef/shared/data-access-auth';
import { apiPitchCreate } from '@breef/shared/data-access-pitch-create';
import { apiProfile } from '@breef/shared/data-access-profile';
import { apiProject } from '@breef/shared/data-access-project';
import { BrandLead } from '@breef/shared/types';
import { removeStorageData } from '@breef/shared/utils';
import { createSlice } from '@reduxjs/toolkit';
import { getOldUserValue, removeOldUserValue } from '../utils/getOldUserValue';

interface initialState {
    dashboardIsLoaded: boolean;
    onboardingCompleted: boolean;
    isOldUser: boolean;
    emailUser: string;
    isDisabledPayments: boolean;
    brandLead: {
        brandLead: BrandLead;
        firstName: string;
        lastName: string;
        email: string;
        id: number;
    } | null;
}

const initialState: initialState = {
    dashboardIsLoaded: true,
    onboardingCompleted: false,
    isOldUser: getOldUserValue(),
    emailUser: '',
    isDisabledPayments: false,
    brandLead: null,
};

export const slice = createSlice({
    name: 'projectDetails',
    initialState,
    reducers: {
        setOnboardingCompleted: state => {
            state.onboardingCompleted = true;
        },
        resetFieldOldUser: state => {
            state.isOldUser = false;
            removeOldUserValue();
        },
        setDashboardIsLoaded: state => {
            state.dashboardIsLoaded = true;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiProject.endpoints.getProjectById.matchFulfilled,
            () => {
                removeStorageData('local', CREATE_PROJECT_KEY);
            },
        );
        builder.addMatcher(
            apiPitchCreate.endpoints.getPitchById.matchFulfilled,
            () => {
                removeStorageData('local', CREATE_PITCH_KEY);
            },
        );
        builder.addMatcher(
            apiAuth.endpoints.getSelf.matchFulfilled,
            (state, { payload }) => {
                state.onboardingCompleted =
                    payload.isOnboardingComplete || false;
                state.emailUser = payload.email || '';
                const isClient = payload.companyType?.includes('client');
                const isMember = payload.companyPosition?.includes('member');
                state.isDisabledPayments = isClient && isMember;
            },
        );
        builder.addMatcher(
            apiProfile.endpoints.getCompanyInfo.matchFulfilled,
            (state, { payload }) => {
                state.brandLead = payload.brandLead;
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
