import {
    GetAvailabilityResponseType,
    GetScheduleCallsResponseType,
    SetAvailabilityResponseType,
    TransformAvailabilityType,
    TransformGetAvailabilityResponseType,
    TransformGetScheduleCallsResponseType,
    TransformSetAvailabilityResponseType,
    TransformUpdateAvailabilityResponseType,
    UpdateAvailabilityResponseType,
} from '@breef/shared/types';

export const transformScheduledCallsList = (
    response: GetScheduleCallsResponseType[] | null,
): TransformGetScheduleCallsResponseType[] | null => {
    if (!response) return null;

    return response.map(schedule => ({
        id: schedule.id,
        status: schedule.status,
        timeSlotDate: schedule.time_slot_date,
        pitchId: schedule.pitch?.id || -1,
        agency: {
            id: schedule.agency.id,
            name: schedule.agency.name,
            logoUrl: schedule.agency.logo_url,
            officeLocation: schedule.agency.office_locations.length
                ? schedule.agency.office_locations[0].location
                : null,
        },
        isArchived: schedule.is_archived,
    }));
};

export const transformProjectAvailability = (
    response: GetAvailabilityResponseType | null,
): TransformGetAvailabilityResponseType | null => {
    if (!response) return null;

    const schedule = response.availabilities
        ? { ...response.availabilities }
        : { ...response.time_slots };
    const transformSchedule: TransformAvailabilityType[] = [];

    Object.values(schedule).forEach(availability =>
        availability.forEach(item => {
            transformSchedule.push({
                id: item.id,
                fromTime: item.from_time,
                toTime: item.to_time,
                isBooked: item.is_booked,
            });
        }),
    );

    const transformTeamMembers = response.team_members.map(teamMember => ({
        id: teamMember.id,
        email: teamMember.email,
        firstName: teamMember.first_name,
        lastName: teamMember.last_name,
        phoneNumber: teamMember.phone_number,
    }));

    const transformExternalUsers = response.external_users.map(
        externalUser => ({
            id: externalUser.id,
            email: externalUser.email,
        }),
    );

    return {
        id: response.id,
        createdAt: response.created,
        timeZone: response.time_zone,
        availabilities: transformSchedule,
        clientName: response.client_name,
        externalUsers: transformExternalUsers,
        teamMembers: transformTeamMembers,
    };
};

export const prepareSetProjectAvailability = (
    schedule: SetAvailabilityResponseType,
): TransformSetAvailabilityResponseType => {
    return {
        time_zone: schedule.timeZone,
        availabilities: schedule.createAvailabilities.map(availability => ({
            from_time: availability.fromTime,
            to_time: availability.toTime,
            is_booked: availability.isBooked,
        })),
        external_users: schedule.externalUsers,
        team_members: schedule.teamMembers,
    };
};

export const prepareUpdateProjectAvailability = (
    schedule: UpdateAvailabilityResponseType,
): TransformUpdateAvailabilityResponseType => {
    return {
        time_zone: schedule.timeZone,
        delete_availabilities: schedule.deleteAvailabilities,
        create_availabilities: schedule.createAvailabilities.map(
            availability => ({
                from_time: availability.fromTime,
                to_time: availability.toTime,
                is_booked: availability.isBooked,
            }),
        ),
        external_users: schedule.externalUsers,
        team_members: schedule.teamMembers,
    };
};
