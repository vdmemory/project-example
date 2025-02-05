import { configureStore } from '@reduxjs/toolkit';
import { apiProjectAvailability } from '@breef/shared/data-access-project-availability';
import { projectAvailabilityReducer } from '../../..';
import { apiProjectCreate } from '@breef/shared/data-access-project-create';
import { projectCreateReducer } from '@breef/shared/feature-project-create';
import { InitialProjectAvailabilityState } from '../../types/projectAvailabilityTypes';
import moment from 'moment';
import { initialProjectAvailabilityState } from '../../store/initialSlice';
import { apiProfile } from '@breef/shared/data-access-profile';
import { profileReducer } from '@breef/shared/feature-profile';
import { apiAuth } from '@breef/shared/data-access-auth';
import { ScheduledCallsListType } from '@breef/shared/types';
import { ScheduledCallsStatusNames } from '@breef/shared/constants';

export const mockScheduledCallsList: ScheduledCallsListType[] = [
    {
        id: 498,
        status: ScheduledCallsStatusNames.NO_AVAILABILITY_SET,
        timeSlotDate: null,
        pitchId: 1,
        agency: {
            id: 2,
            name: 'Agency Name 1',
            logoUrl: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
            officeLocation: 'Ukraine, UA',
        },
    },
    // {
    //     id: 498,
    //     status: ScheduledCallsStatusNames.NO_AVAILABILITY_SET,
    //     timeSlotDate: null,
    //     agency: {
    //         id: 2,
    //         name: 'Agency Name 1.5',
    //         logoUrl: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
    //         officeLocation: 'Ukraine, UA',
    //     },
    // },
    {
        id: 500,
        status: ScheduledCallsStatusNames.AWAITING_TIME_SELECTION,
        timeSlotDate: null,
        pitchId: 2,
        agency: {
            id: 4,
            name: 'Agency Name 2',
            logoUrl:
                'https://ssl.sitew.org/images/blog/articles/exemples-logos/apple.png',
            officeLocation: 'Brooklyn, US',
        },
    },
    {
        id: 720,
        status: ScheduledCallsStatusNames.MEETING_BOOKING,
        timeSlotDate: '2024-03-06',
        pitchId: 3,
        agency: {
            id: 19,
            name: 'Agency Name 3',
            logoUrl:
                'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg',
            officeLocation: 'Ukraine, UA',
        },
    },
    // {
    //     id: 720,
    //     status: ScheduledCallsStatusNames.MEETING_COMPLETED,
    //     timeSlotDate: '2024-12-07',
    //     agency: {
    //         id: 19,
    //         name: 'Agency Name 4',
    //         logoUrl:
    //             'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=626&ext=jpg',
    //         officeLocation: 'Brooklyn, US',
    //     },
    // },
];

const projectAvailabilityState: InitialProjectAvailabilityState = {
    isExistsAvailability: false,
    isMobile: false,
    createdAt: '2023-10-11T15:05:16.861467Z',
    isEditingAvailability: true,
    isEditingBookingSlots: false,
    timezone: 'America/Los_Angeles',
    userType: 'client',
    clientName: '',
    days: [
        {
            id: 1,
            day: moment('2023-10-13T16:00:00.000Z'),
            timeSlots: [
                {
                    id: 535,
                    from: '09:00',
                    to: '12:00',
                    isBooked: false,
                },
            ],
        },
        {
            id: 2,
            day: moment('2023-11-21T08:00:00.000Z'),
            timeSlots: [
                {
                    id: 6,
                    from: '08:00',
                    to: '12:00',
                    isBooked: false,
                },
            ],
        },
    ],
    bookingSlots: [
        {
            id: 535,
            fromTime: '2023-10-13T09:00:00-07:00',
            toTime: '2023-10-13T12:00:00-07:00',
            isBooked: false,
        },
    ],
    timeSlotsHistory: [
        {
            id: 535,
            fromTime: '2023-10-13T16:00:00Z',
            toTime: '2023-10-13T19:00:00Z',
            isBooked: false,
        },
    ],
    selectedBookingSlot: null,
    teammatesList: [
        {
            id: 3,
            email: 'tertiary@gmail.com',
            isDisabled: false,
        },
        {
            id: 4,
            email: 'quarter@gmail.com',
            isDisabled: true,
        },
    ],
    inviteTeammates: [
        {
            id: 1,
            email: 'first@gmail.com',
            isDisabled: false,
        },
        {
            id: 2,
            email: 'second@gmail.com',
            isDisabled: true,
        },
    ],
    inviteMembers: [
        {
            id: 9,
            email: 'testclient@gmail.com',
            firstName: 'test',
            lastName: 'test11о',
            position: 'member',
            isDisabled: true,
        },
    ],
    initialInviteTeammates: [9],
    isLoadingData: false,
    projectStatus: null,
    dashboard: {
        addedTeammates: [],
        suggestedTeammates: [],
        scheduledCallsList: [],
        isDashboardScreen: true,
    },
};

export const mockConfiguredStore = (isInitial?: boolean) =>
    configureStore({
        reducer: {
            [apiProjectCreate.reducerPath]: apiProjectCreate.reducer,
            projectCreate: projectCreateReducer,
            projectAvailability: projectAvailabilityReducer,
            [apiProjectAvailability.reducerPath]:
                apiProjectAvailability.reducer,
            [apiProfile.reducerPath]: apiProfile.reducer,
            profile: profileReducer,
            [apiAuth.reducerPath]: apiAuth.reducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        'projectAvailability/setDays',
                        'projectAvailability/setSelectedBookingSlot',
                    ],
                    ignoredPaths: ['projectAvailability'],
                },
            }).concat(
                apiProjectCreate.middleware,
                apiProjectAvailability.middleware,
                apiProfile.middleware,
                apiAuth.middleware,
            ),
        preloadedState: {
            projectAvailability: isInitial
                ? initialProjectAvailabilityState
                : projectAvailabilityState,
        },
    });
