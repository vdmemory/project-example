import {
    defaultMilestonePaymentValue,
    defaultRetainerPaymentValue,
} from '../constants/defaultValues';
import _ from 'lodash';
import { InitialStateKickoffType } from '../types/kickoffTypes';

export const initialStateKickoffSlice: InitialStateKickoffType = {
    kickoff: {
        //step-1
        legalName: '',
        billingAddress: '',
        billingAddressAdditional: '',
        teamMembers: [],
        teamInvites: [],
        invites: [],
        files: [],
        //step-2
        paymentsType: 'one_time',
        paymentsMilestone: [_.cloneDeep(defaultMilestonePaymentValue)],
        paymentsRetainer: null,
        paymentTerms: '',
        //step-3
        isAcceptedTerms: false,
    },
    paymentsOneTime: {
        paymentsMilestone: [_.cloneDeep(defaultMilestonePaymentValue)],
        paymentsRetainer: null,
    },
    paymentsStrategyExecution: {
        paymentsMilestone: [_.cloneDeep(defaultMilestonePaymentValue)],
        paymentsRetainer: { ...defaultRetainerPaymentValue },
    },
    paymentsOngoingRetainer: {
        paymentsMilestone: [],
        paymentsRetainer: { ...defaultRetainerPaymentValue },
    },
    step: 1,
};
