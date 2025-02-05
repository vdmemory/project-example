import {
    TeamMembersResponseType,
    TeamMembersTransformResponseType,
} from '@breef/shared/types';

export const transformTeamMembersData = (
    response: TeamMembersResponseType,
): TeamMembersTransformResponseType => {
    const teamMembers =
        (response.invitations &&
            response.invitations
                .filter(f => f.invitation_status !== 'pending')
                .map(m => ({
                    id: m.id,
                    email: m.email,
                    firstName: `${m.first_name}`,
                    lastName: `${m.last_name}`,
                    position: `${m.company_position}`,
                }))) ||
        [];

    const invites =
        (response.invitations &&
            response.invitations
                .filter(f => f.invitation_status === 'pending')
                .map(m => ({
                    email: m.email,
                    date: `${m.invitation_date}`,
                    id: m.id,
                    phoneNumber: `${m.phone_number}`,
                    status: m.invitation_status,
                }))) ||
        [];

    return {
        teamMembers,
        invites,
    };
};
