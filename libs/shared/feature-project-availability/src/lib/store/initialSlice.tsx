import { InitialProjectAvailabilityState } from '../types/projectAvailabilityTypes';

export const initialProjectAvailabilityState: InitialProjectAvailabilityState =
    {
        isMobile: false,
        createdAt: null,
        isExistsAvailability: false,
        isEditingAvailability: null,
        isEditingBookingSlots: false,
        timezone: null,
        userType: null,
        clientName: '',
        days: [],
        bookingSlots: [],
        timeSlotsHistory: [],
        selectedBookingSlot: null,
        teammatesList: [],
        inviteTeammates: [],
        inviteMembers: [],
        initialInviteTeammates: [],
        isLoadingData: true,
        projectStatus: null,

        dashboard: {
            isDashboardScreen: false,
            addedTeammates: [],
            suggestedTeammates: [],
            scheduledCallsList: [],
        },
    };
