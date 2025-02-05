import {
    ProjectInfoType,
    ScheduledCallsListType,
    TeammateType,
} from '@breef/shared/types';
import { Moment } from 'moment';

export type InitialProjectAvailabilityState = {
    isMobile: boolean;
    createdAt: string | null;
    isExistsAvailability: boolean;
    isEditingAvailability: boolean | null;
    isEditingBookingSlots: boolean;
    timezone: null | string;
    clientName: string;
    userType: 'agency' | 'client' | null;
    days: DayType[];
    bookingSlots: SlotBookingType[];
    timeSlotsHistory: SlotHistoryType[];
    selectedBookingSlot: SlotBookingType | null;
    teammatesList: { id?: number; email: string; isDisabled: boolean }[];
    inviteTeammates: { id?: number; email: string; isDisabled?: boolean }[];
    inviteMembers: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
        position?: string;
        isDisabled?: boolean;
    }[];
    initialInviteTeammates: number[];
    isLoadingData: boolean;
    projectStatus: string | null;

    dashboard: {
        isDashboardScreen: boolean;
        addedTeammates: TeammateType[];
        suggestedTeammates: TeammateType[];
        scheduledCallsList: ScheduledCallsListType[];
    };
};

export enum AvailabilityScreenNames {
    TEAMMATES = 'TEAMMATES_SCREEN',
    AVAILABILITY = 'AVAILABILITY_SCREEN',
    MEETINGS = 'MEETINGS_SCREEN',
}

export enum DashboardMeetScreenNames {
    AVAILABILITY = 'AVAILABILITY_SCREEN',
    SELECT_TEAM = 'SELECT_TEAM_SCREEN',
}

export type AvailabilityScreenHistory = (AvailabilityScreenNames | null)[];
export type DashboardMeetScreenHistory = (DashboardMeetScreenNames | null)[];

export type DayType = {
    id: number;
    day: Moment;
    timeSlots: SlotType[];
};

export type SlotType = {
    id: number;
    to: string;
    from: string;
    isBooked: boolean;
};

export type SlotListType = {
    id: number;
    day: Moment;
    timeSlots: SlotType[];
};

export type ErrorType = {
    dayId: number;
    id: number;
    to: string;
    from: string;
};

export type SlotHistoryType = {
    id?: number;
    fromTime: string;
    toTime: string;
    isBooked: boolean;
};

export type SlotBookingType = {
    id: number;
    fromTime: string;
    toTime: string;
    isBooked: boolean;
};
