import React from 'react';
import { StyledInnerInvitesMembers } from './InnerInvitesMembers.styled';
import LinkButton from '../../../button/linkButton/LinkButton';
import TeamMember from './teamMember/TeamMember';
import AddInvitePopup from '../../../popup/defaultPopup/addInvitePopup/AddInvitePopup';
import { usePopup } from '../../../popup/usePopup';

type MembersListType = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    position: string;
};

type InvitesListType = {
    email: string;
    date: string;
    id: number;
    phoneNumber: string;
    status: string;
};

interface DefaultInputProps {
    onSelectTeamMember: (value: { email: string }[]) => void;
    teamMembers: { id: number; email: string }[];
    onSelectTeamInvites: (value: { email: string }[]) => void;
    teamInvites: { id: number; email: string }[];
    onAddInvitations: (
        value: { email: string; phoneNumber?: string }[],
    ) => void;
    invitations: { email: string; phoneNumber?: string; checked?: boolean }[];
    teamMembersList: MembersListType[];
    teamInvitesList: InvitesListType[];
}

export const InnerInvitesMembers = ({
    teamMembersList,
    teamInvitesList,
    teamInvites,
    onSelectTeamInvites,
    onSelectTeamMember,
    teamMembers,
    onAddInvitations,
    invitations,
}: DefaultInputProps) => {
    const addInvitePopup = usePopup();

    const handleClickTeamMember = (targetTeamMember: {
        id: number;
        email: string;
    }) => {
        if (teamMembers.some(item => item.email === targetTeamMember.email)) {
            onSelectTeamMember(
                teamMembers.filter(
                    item => item.email !== targetTeamMember.email,
                ),
            );
        } else {
            onSelectTeamMember([...teamMembers, targetTeamMember]);
        }
    };
    const handleClickTeamInvites = (targetTeamMember: {
        id: number;
        email: string;
    }) => {
        if (teamInvites.some(item => item.email === targetTeamMember.email)) {
            onSelectTeamInvites(
                teamInvites.filter(
                    item => item.email !== targetTeamMember.email,
                ),
            );
        } else {
            onSelectTeamInvites([...teamInvites, targetTeamMember]);
        }
    };
    const handleClickInvitation = (email: string) => {
        const updateInvitation = invitations.map(item => {
            if (item.email === email) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        onAddInvitations(updateInvitation);
    };
    const handleAddInvite = (data: { email: string; phoneNumber?: string }) => {
        onAddInvitations([...invitations, { ...data, checked: true }]);
    };

    return (
        <StyledInnerInvitesMembers>
            {addInvitePopup.isOpen && (
                <AddInvitePopup
                    titlePopup="Add payment contact"
                    addInvite={handleAddInvite}
                    invitations={invitations}
                    buttonTitle="Add"
                    isPhoneNumber
                    close={addInvitePopup.close}
                    style={{ overflow: 'visible' }}
                />
            )}
            {teamMembersList.map((item, key) => (
                <TeamMember
                    key={`teamMembersList-${key}`}
                    onClick={() => handleClickTeamMember(item)}
                    isChecked={teamMembers.some(
                        user => user.email === item.email,
                    )}
                    firstName={item.firstName}
                    lastName={item.lastName}
                />
            ))}
            {teamInvitesList.map((item, key) => (
                <TeamMember
                    isInvitees
                    onClick={() => handleClickTeamInvites(item)}
                    key={`teamInvitesList-${key}`}
                    isChecked={teamInvites.some(
                        user => user.email === item.email,
                    )}
                    email={item.email}
                />
            ))}
            {invitations.map((item, key) => (
                <TeamMember
                    isInvitees
                    onClick={() => handleClickInvitation(item.email)}
                    key={`invitations-${key}`}
                    isChecked={!!item.checked}
                    email={item.email}
                />
            ))}
            <LinkButton
                name={'Colleague'}
                className="add-colleague-button"
                onClick={addInvitePopup.open}
                size="big"
                typeView="inner"
                icon="plus"
            />
        </StyledInnerInvitesMembers>
    );
};

export default InnerInvitesMembers;
