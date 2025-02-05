import { apiAuth } from '@breef/shared/data-access-auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DayType, SlotBookingType } from '../types/projectAvailabilityTypes';
import { initialProjectAvailabilityState } from './initialSlice';
import {
    sortDate,
    replacementDays,
    replacementBookingSlots,
    replacementSelectedBookingSlot,
    replacementDaysToAgency,
} from './replacementFunction';
import { apiProjectAvailability } from '@breef/shared/data-access-project-availability';
import { getDays, getStartDay } from '../utils/getDays';
import { START_WITH } from '../components/projectAvailability/availability/Availability';
import { apiProfile } from '@breef/shared/data-access-profile';
import { TeammateType } from '@breef/shared/types';
import { apiProject } from '@breef/shared/data-access-project';

export const slice = createSlice({
    name: 'projectAvailability',
    initialState: initialProjectAvailabilityState,
    reducers: {
        setMobileOrientation: (state, { payload }: PayloadAction<boolean>) => {
            state.isMobile = payload;
        },
        resetAvailability: state => {
            const clearState = {
                ...state,
                createdAt: null,
                days: [],
                bookingSlots: [],
                timeSlotsHistory: [],
                selectedBookingSlot: null,
            };
            return clearState;
        },
        updateTimezone: (state, { payload }: PayloadAction<string>) => {
            state.timezone = payload;
        },
        setDays: (
            state,
            action: PayloadAction<{
                days: DayType[];
                type: 'days' | 'timeSlots';
            }>,
        ) => {
            const newDays = sortDate(action.payload.days, action.payload.type);
            state.days = newDays;
        },
        setBookingSlots: (
            state,
            { payload }: PayloadAction<SlotBookingType[]>,
        ) => {
            state.bookingSlots = payload;
        },
        setSelectedBookingSlot: (
            state,
            action: PayloadAction<SlotBookingType | null>,
        ) => {
            state.selectedBookingSlot = action.payload;
        },
        setIsEditingBookingSlots: (state, action: PayloadAction<boolean>) => {
            state.isEditingBookingSlots = action.payload;
        },
        changeInviteTeammates: (
            state,
            action: PayloadAction<{ email: string }>,
        ) => {
            if (
                state.inviteTeammates.some(
                    item => item.email === action.payload.email,
                )
            ) {
                state.inviteTeammates = state.inviteTeammates.filter(
                    item => item.email !== action.payload.email,
                );
            } else {
                state.inviteTeammates = [
                    ...state.inviteTeammates,
                    action.payload,
                ];
            }
        },
        changeInviteMembers: (
            state,
            action: PayloadAction<{ id: number; email: string }>,
        ) => {
            if (
                state.inviteMembers.some(
                    item => item.email === action.payload.email,
                )
            ) {
                state.inviteMembers = state.inviteMembers.filter(
                    item => item.email !== action.payload.email,
                );
            } else {
                state.inviteMembers = [...state.inviteMembers, action.payload];
            }
        },
        addTeammate: (state, action: PayloadAction<{ email: string }>) => {
            state.teammatesList = [
                ...state.teammatesList,
                { email: action.payload.email, isDisabled: false },
            ];
            state.inviteTeammates = [
                ...state.inviteTeammates,
                { email: action.payload.email, isDisabled: false },
            ];
        },
        addExternalTeam: (
            state,
            { payload }: PayloadAction<{ email: string }>,
        ) => {
            state.dashboard.addedTeammates = [
                ...state.dashboard.addedTeammates,
                { email: payload.email, isExternal: true },
            ];
        },
        addExistingTeam: (state, { payload }: PayloadAction<TeammateType>) => {
            state.dashboard.addedTeammates = [
                ...state.dashboard.addedTeammates,
                { ...payload },
            ];
            state.dashboard.suggestedTeammates =
                state.dashboard.suggestedTeammates.filter(
                    item => item.email !== payload.email,
                );
        },
        removeTeam: (state, { payload }: PayloadAction<TeammateType>) => {
            state.dashboard.addedTeammates =
                state.dashboard.addedTeammates.filter(
                    item => item.email !== payload.email,
                );
            if (payload.id) {
                state.dashboard.suggestedTeammates = [
                    ...state.dashboard.suggestedTeammates,
                    { ...payload },
                ];
            }
        },
        setIsEditingAvailability: (
            state,
            { payload }: PayloadAction<boolean>,
        ) => {
            state.isEditingAvailability = payload;
        },
        setIsExistsAvailability: (
            state,
            { payload }: PayloadAction<boolean>,
        ) => {
            state.isExistsAvailability = payload;
        },
    },
    extraReducers: builder => {
        builder.addMatcher(
            apiAuth.endpoints.getSelf.matchFulfilled,
            (state, { payload }) => {
                state.userType =
                    payload.companyType === 'agency' ? 'agency' : 'client';
                if (state.inviteMembers.length === 0) {
                    state.inviteMembers = [
                        ...state.inviteMembers,
                        {
                            id: payload.id,
                            email: payload.email,
                            position: 'owner',
                        },
                    ];
                }
                if (state.dashboard.addedTeammates.length === 0) {
                    state.dashboard.addedTeammates = [
                        ...state.dashboard.addedTeammates,
                        {
                            id: payload.id,
                            email: payload.email,
                            firstName: payload.firstName,
                            lastName: payload.lastName,
                        },
                    ];
                }

                if (!state.timezone) {
                    state.timezone = payload.timeZone;
                }
                return state;
            },
        );
        builder.addMatcher(
            apiProject.endpoints.getProjectById.matchFulfilled,
            (state, { payload }) => {
                state.isEditingAvailability = payload.isAvailabilityCreated;
                state.projectStatus = payload.status;
            },
        );
        builder.addMatcher(
            apiProjectAvailability.endpoints.getAvailability.matchFulfilled,
            (state, { payload }) => {
                const path = window.location.pathname;
                const isAvailabilityScreen = path.includes('availability');

                state.dashboard.isDashboardScreen = !isAvailabilityScreen;

                if (!payload) {
                    if (
                        state.timezone &&
                        !state.isMobile &&
                        isAvailabilityScreen
                    ) {
                        const startDate = getStartDay(
                            state.timezone,
                            START_WITH,
                        );
                        const newDays = sortDate(getDays(startDate), 'days');
                        state.days = newDays;
                    }
                    state.isLoadingData = false;
                    return;
                }

                if (state.userType === 'client') {
                    state.timezone = payload.timeZone;
                }
                state.clientName = payload.clientName || '';
                state.createdAt = payload.createdAt;
                state.isExistsAvailability = true;
                state.timeSlotsHistory = payload.availabilities;

                if (state.userType === 'client') {
                    state.days = replacementDays(payload);
                } else {
                    state.days = replacementDaysToAgency(
                        payload,
                        state.timezone || '',
                    );
                }
                state.bookingSlots = replacementBookingSlots(
                    payload,
                    state.timezone || '',
                );
                state.selectedBookingSlot = replacementSelectedBookingSlot(
                    payload,
                    state.timezone || '',
                );

                state.inviteTeammates = payload.externalUsers.map(item => ({
                    id: item.id,
                    email: item.email,
                    isDisabled: true,
                }));
                state.teammatesList = payload.externalUsers.map(item => ({
                    id: item.id,
                    email: item.email,
                    isDisabled: true,
                }));

                if (payload.teamMembers.length > 0) {
                    state.inviteMembers = payload.teamMembers.map(item => ({
                        id: item.id,
                        email: item.email,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        position: 'member',
                        isDisabled: true,
                    }));
                    state.initialInviteTeammates = payload.teamMembers.map(
                        item => item.id,
                    );
                }

                if (payload.teamMembers.length > 0) {
                    const addTeammates = payload.teamMembers.map(item => ({
                        id: item.id,
                        email: item.email,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        isSaving: true,
                    }));

                    const addInvites = payload.externalUsers.map(item => ({
                        id: item.id,
                        email: item.email,
                        isSaving: true,
                    }));

                    state.dashboard.addedTeammates = [
                        ...addTeammates,
                        ...addInvites,
                    ];
                }

                state.isLoadingData = false;
            },
        );
        builder.addMatcher(
            apiProfile.endpoints.getTeamMembers.matchFulfilled,
            (state, { payload }) => {
                const invites = payload.invites.map(item => ({
                    id: item.id,
                    email: item.email,
                }));
                const members = payload.teamMembers.map(item => ({
                    id: item.id,
                    email: item.email,
                    firstName: item.firstName,
                    lastName: item.lastName,
                }));

                const teammates = [...members, ...invites];
                const filterTeammates = teammates.filter(
                    item =>
                        !state.dashboard.addedTeammates.some(
                            added => added.email === item.email,
                        ),
                );
                state.dashboard.suggestedTeammates = filterTeammates;
            },
        );

        builder.addMatcher(
            apiProjectAvailability.endpoints.getScheduledCallsList
                .matchFulfilled,
            (state, { payload }) => {
                state.dashboard.scheduledCallsList = payload || [];
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
