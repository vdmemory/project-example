import { StyledTeamMembers } from './TeamMembers.styled';
import { TeamMembersMergedResponseType } from '@breef/shared/types';
import TeamMember from './teamMember/TeamMember';
import InviteMemberForm from './InviteMemberForm/InviteMemberForm';
import { useGetRestrictions } from '@breef/shared/hooks';
import { Restrictions } from '@breef/shared/constants';
import LipsLoader from '../loader/lipsLoader/LipsLoader';

export interface TeamMembersProps {
    teamMembersInfo?: TeamMembersMergedResponseType;
    disabledEvents?: boolean;
    isLoading?: boolean;
    hideOwnerRole?: boolean;
    onlyRemoveMember?: boolean;
    type?: 'profile' | 'project' | 'pitch';
}

export default function TeamMembers({
    teamMembersInfo,
    disabledEvents,
    isLoading = false,
    hideOwnerRole = false,
    onlyRemoveMember = false,
    type = 'profile',
}: TeamMembersProps) {
    const ownerUser = teamMembersInfo?.teamMembers.find(member =>
        member.position.match(/owner/i),
    );

    const teamMembers = teamMembersInfo?.teamMembers.filter(
        member => !member.position.match(/owner/i),
    );

    const isEmpty = !teamMembers?.length && !teamMembersInfo?.invites.length;

    const { checkIsHaveRestriction } = useGetRestrictions();

    if (isLoading) {
        return <LipsLoader />;
    }

    if (isEmpty && hideOwnerRole) {
        return <div className="wrap-loading member-list">No added members</div>;
    }

    return (
        <StyledTeamMembers className="team-member-list">
            {!hideOwnerRole && ownerUser && (
                <TeamMember disabledEvents={disabledEvents} data={ownerUser} />
            )}
            {teamMembers?.map(member => (
                <TeamMember
                    disabledEvents={disabledEvents}
                    key={member.id}
                    data={member}
                    isAction={checkIsHaveRestriction({
                        restriction: Restrictions.editTeamMembersRole,
                    })}
                    onlyRemoveMember={onlyRemoveMember}
                    type={type}
                />
            ))}
            {teamMembersInfo?.invites.map((invite, key) => (
                <TeamMember
                    disabledEvents={disabledEvents}
                    key={invite.id}
                    data={invite}
                />
            ))}
            {!disabledEvents && (
                <InviteMemberForm teamMembersInfo={teamMembersInfo} />
            )}
        </StyledTeamMembers>
    );
}
