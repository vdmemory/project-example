import {
    GetAvailabilityResponseType,
    GetScheduleCallsResponseType,
    SetAvailabilityResponseType,
    UpdateAvailabilityResponseType,
} from '@breef/shared/types';
import {
    prepareSetProjectAvailability,
    prepareUpdateProjectAvailability,
    transformProjectAvailability,
    transformScheduledCallsList,
} from './availabilityAdapters';

describe('transformScheduledCallsList', () => {
    it('should transform scheduled calls list response', () => {
        const response: GetScheduleCallsResponseType[] = [
            {
                id: 1,
                status: 'Scheduled',
                time_slot_date: '2024-06-30T09:00:00Z',
                pitch: { id: 123 },
                agency: {
                    id: 456,
                    name: 'Agency ABC',
                    logo_url: 'https://agencyabc.com/logo.png',
                    office_locations: [{ id: 1, location: 'New York' }],
                },
                is_archived: false,
            },
            {
                id: 2,
                status: 'Completed',
                time_slot_date: '2024-07-01T10:00:00Z',
                pitch: { id: 1 },
                agency: {
                    id: 789,
                    name: 'Agency XYZ',
                    logo_url: 'https://agencyxyz.com/logo.png',
                    office_locations: [],
                },
                is_archived: true,
            },
        ];

        const transformedResponse = transformScheduledCallsList(response);
        expect(transformedResponse).toEqual([
            {
                id: 1,
                status: 'Scheduled',
                timeSlotDate: '2024-06-30T09:00:00Z',
                pitchId: 123,
                agency: {
                    id: 456,
                    name: 'Agency ABC',
                    logoUrl: 'https://agencyabc.com/logo.png',
                    officeLocation: 'New York',
                },
                isArchived: false,
            },
            {
                id: 2,
                status: 'Completed',
                timeSlotDate: '2024-07-01T10:00:00Z',
                pitchId: 1,
                agency: {
                    id: 789,
                    name: 'Agency XYZ',
                    logoUrl: 'https://agencyxyz.com/logo.png',
                    officeLocation: null,
                },
                isArchived: true,
            },
        ]);
    });

    it('should return null if response is null', () => {
        const response: GetScheduleCallsResponseType[] | null = null;

        const transformedResponse = transformScheduledCallsList(response);
        expect(transformedResponse).toBeNull();
    });
});

describe('prepareSetProjectAvailability', () => {
    it('should prepare project availability data correctly', () => {
        const schedule: SetAvailabilityResponseType = {
            timeZone: 'UTC',
            createAvailabilities: [
                {
                    fromTime: '2024-06-30T09:00:00Z',
                    toTime: '2024-06-30T12:00:00Z',
                    isBooked: false,
                },
                {
                    fromTime: '2024-07-01T10:00:00Z',
                    toTime: '2024-07-01T13:00:00Z',
                    isBooked: true,
                },
            ],
            externalUsers: ['user1@example.com', 'user2@example.com'],
            teamMembers: [1, 2],
        };

        const transformedData = prepareSetProjectAvailability(schedule);
        expect(transformedData).toEqual({
            time_zone: 'UTC',
            availabilities: [
                {
                    from_time: '2024-06-30T09:00:00Z',
                    to_time: '2024-06-30T12:00:00Z',
                    is_booked: false,
                },
                {
                    from_time: '2024-07-01T10:00:00Z',
                    to_time: '2024-07-01T13:00:00Z',
                    is_booked: true,
                },
            ],
            external_users: ['user1@example.com', 'user2@example.com'],
            team_members: [1, 2],
        });
    });
});

describe('prepareUpdateProjectAvailability', () => {
    it('should prepare updated project availability data correctly', () => {
        const schedule: UpdateAvailabilityResponseType = {
            timeZone: 'UTC',
            deleteAvailabilities: [1, 2],
            createAvailabilities: [
                {
                    fromTime: '2024-06-30T09:00:00Z',
                    toTime: '2024-06-30T12:00:00Z',
                    isBooked: false,
                },
                {
                    fromTime: '2024-07-01T10:00:00Z',
                    toTime: '2024-07-01T13:00:00Z',
                    isBooked: true,
                },
            ],
            externalUsers: ['user1@example.com', 'user2@example.com'],
            teamMembers: [1, 2],
        };

        const transformedData = prepareUpdateProjectAvailability(schedule);
        expect(transformedData).toEqual({
            time_zone: 'UTC',
            delete_availabilities: [1, 2],
            create_availabilities: [
                {
                    from_time: '2024-06-30T09:00:00Z',
                    to_time: '2024-06-30T12:00:00Z',
                    is_booked: false,
                },
                {
                    from_time: '2024-07-01T10:00:00Z',
                    to_time: '2024-07-01T13:00:00Z',
                    is_booked: true,
                },
            ],
            external_users: ['user1@example.com', 'user2@example.com'],
            team_members: [1, 2],
        });
    });
});

describe('transformProjectAvailability', () => {
    it('should transform project availability data correctly', () => {
        const response: GetAvailabilityResponseType = {
            id: 1,
            created: '2024-06-20T08:00:00Z',
            time_zone: 'UTC',
            availabilities: {
                '2024-06-30': [
                    {
                        id: 1,
                        from_time: '2024-06-30T09:00:00Z',
                        to_time: '2024-06-30T12:00:00Z',
                        is_booked: false,
                    },
                    {
                        id: 2,
                        from_time: '2024-06-30T14:00:00Z',
                        to_time: '2024-06-30T16:00:00Z',
                        is_booked: true,
                    },
                ],
                '2024-07-01': [
                    {
                        id: 3,
                        from_time: '2024-07-01T09:00:00Z',
                        to_time: '2024-07-01T12:00:00Z',
                        is_booked: true,
                    },
                ],
            },
            client_name: 'Client ABC',
            external_users: [
                { id: 101, email: 'user1@example.com' },
                { id: 102, email: 'user2@example.com' },
            ],
            team_members: [
                {
                    id: 201,
                    email: 'member1@example.com',
                    first_name: 'John',
                    last_name: 'Doe',
                    phone_number: '123456789',
                },
                {
                    id: 202,
                    email: 'member2@example.com',
                    first_name: 'Jane',
                    last_name: 'Doe',
                    phone_number: '987654321',
                },
            ],
        };

        const transformedData = transformProjectAvailability(response);
        expect(transformedData).toEqual({
            id: 1,
            createdAt: '2024-06-20T08:00:00Z',
            timeZone: 'UTC',
            availabilities: [
                {
                    id: 1,
                    fromTime: '2024-06-30T09:00:00Z',
                    toTime: '2024-06-30T12:00:00Z',
                    isBooked: false,
                },
                {
                    id: 2,
                    fromTime: '2024-06-30T14:00:00Z',
                    toTime: '2024-06-30T16:00:00Z',
                    isBooked: true,
                },
                {
                    id: 3,
                    fromTime: '2024-07-01T09:00:00Z',
                    toTime: '2024-07-01T12:00:00Z',
                    isBooked: true,
                },
            ],
            clientName: 'Client ABC',
            externalUsers: [
                { id: 101, email: 'user1@example.com' },
                { id: 102, email: 'user2@example.com' },
            ],
            teamMembers: [
                {
                    id: 201,
                    email: 'member1@example.com',
                    firstName: 'John',
                    lastName: 'Doe',
                    phoneNumber: '123456789',
                },
                {
                    id: 202,
                    email: 'member2@example.com',
                    firstName: 'Jane',
                    lastName: 'Doe',
                    phoneNumber: '987654321',
                },
            ],
        });
    });

    it('should return null for null response', () => {
        const transformedData = transformProjectAvailability(null);
        expect(transformedData).toBeNull();
    });
});
