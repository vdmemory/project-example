import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BillingDataFormType,
    InitialStateKickoffType,
    PaymentScheduleFormType,
} from '../types/kickoffTypes';

import _ from 'lodash';
import { initialStateKickoffSlice } from './initialStateKickoffSlice';

const initialState = initialStateKickoffSlice;

export const slice = createSlice({
    name: 'kickoff',
    initialState,
    reducers: {
        resetStore: () => {
            return initialState;
        },
        setStep: (
            state: InitialStateKickoffType,
            action: PayloadAction<number>,
        ) => {
            state.step = action.payload;
        },
        setBillingFormData: (
            state: InitialStateKickoffType,
            action: PayloadAction<BillingDataFormType>,
        ) => {
            state.kickoff = {
                ...state.kickoff,
                ...action.payload,
            };
        },
        setPaymentScheduleFormData: (
            state: InitialStateKickoffType,
            action: PayloadAction<PaymentScheduleFormType>,
        ) => {
            state.kickoff = {
                ...state.kickoff,
                ...action.payload,
            };
        },
        setIsAcceptedTerms: (
            state: InitialStateKickoffType,
            action: PayloadAction<boolean>,
        ) => {
            state.kickoff = {
                ...state.kickoff,
                isAcceptedTerms: action.payload,
            };
        },
        savePrevPaymentsType: (
            state: InitialStateKickoffType,
            action: PayloadAction<PaymentScheduleFormType>,
        ) => {
            if (action.payload.paymentsType === 'one_time') {
                state.paymentsOneTime = {
                    paymentsMilestone: _.cloneDeep(
                        action.payload.paymentsMilestone,
                    ),
                    paymentsRetainer: null,
                };
            } else if (action.payload.paymentsType === 'strategy_execution') {
                state.paymentsStrategyExecution = {
                    paymentsMilestone: _.cloneDeep(
                        action.payload.paymentsMilestone,
                    ),
                    paymentsRetainer: _.cloneDeep(
                        action.payload.paymentsRetainer,
                    ),
                };
            } else if (action.payload.paymentsType === 'ongoing_or_retainer') {
                state.paymentsOngoingRetainer = {
                    paymentsMilestone: [],
                    paymentsRetainer: _.cloneDeep(
                        action.payload.paymentsRetainer,
                    ),
                };
            }
        },
    },
});

export default slice.reducer;

const rootState = slice.getInitialState();
export const sliceActions = slice.actions;

type State = typeof rootState;
export type SliceState = {
    [slice.name]: State;
};
