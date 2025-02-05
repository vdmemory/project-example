type AvailabilityType = {
    id?: number;
    from_time: string;
    to_time: string;
    is_booked: boolean;
};

export type TransformAvailabilityType = {
    id?: number;
    fromTime: string;
    toTime: string;
    isBooked: boolean;
};

type TeamMemberType = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
};

type ExternalUserType = {
    id: number;
    email: string;
};

type TransformTeamMemberType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

type TransformExternalUserType = {
    id: number;
    email: string;
};

export type GetScheduleCallsResponseType = {
    id: number;
    status: string;
    time_slot_date: string | null;
    pitch: {
        id: number;
    };
    agency: {
        id: number;
        name: string;
        logo_url: string;
        office_locations: {
            id: number;
            location: string;
        }[];
    };
    is_archived?: boolean;
};

export type TransformGetScheduleCallsResponseType = {
    id: number;
    status: string | null;
    timeSlotDate: string | null;
    pitchId: number;
    agency: {
        id: number;
        name: string;
        logoUrl: string;
        officeLocation: string | null;
    };
    isArchived?: boolean;
};

export type GetAvailabilityResponseType = {
    id: number;
    created: string;
    time_zone: string;
    availabilities?: {
        [key: string]: AvailabilityType[];
    };
    time_slots?: {
        [key: string]: AvailabilityType[];
    };
    client_name?: string;
    external_users: ExternalUserType[];
    team_members: TeamMemberType[];
};

export type TransformGetAvailabilityResponseType = {
    id: number;
    createdAt: string;
    timeZone: string;
    availabilities: TransformAvailabilityType[];
    clientName?: string;
    externalUsers: TransformExternalUserType[];
    teamMembers: TransformTeamMemberType[];
};

export type SetAvailabilityResponseType = {
    timeZone: string;
    createAvailabilities: TransformAvailabilityType[];
    externalUsers: string[];
    teamMembers: number[];
};

export type TransformSetAvailabilityResponseType = {
    time_zone: string;
    availabilities: AvailabilityType[];
    external_users: string[];
    team_members: number[];
};

export type UpdateAvailabilityResponseType = {
    timeZone: string;
    deleteAvailabilities: number[];
    createAvailabilities: TransformAvailabilityType[];
    externalUsers: string[];
    teamMembers: number[];
};

export type TransformUpdateAvailabilityResponseType = {
    time_zone: string;
    delete_availabilities: number[];
    create_availabilities: AvailabilityType[];
    external_users: string[];
    team_members: number[];
};

export type TeammateType = {
    id?: number;
    email: string;
    firstName?: string;
    lastName?: string;
    isDisabled?: boolean;
    isSaving?: boolean;
    isExternal?: boolean;
};

export type ScheduledCallsListType = {
    id: number;
    status: string | null;
    isArchived?: boolean;
    timeSlotDate: string | null;
    pitchId: number;
    agency: {
        id: number;
        name: string;
        logoUrl: string;
        officeLocation: string | null;
    };
};
