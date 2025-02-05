import React, { ReactNode } from 'react';
import { StyledTeamMember } from './TeamMember.styled';
import { CheckMinIcon } from '@breef/shared/assets';

interface TeamMemberProps {
    isChecked: boolean;
    onClick: (e: React.SyntheticEvent) => void;
    firstName?: string;
    lastName?: string;
    email?: string;
    isInvitees?: boolean;
}

export const TeamMember = ({
    isChecked,
    onClick,
    firstName,
    lastName,
    email,
    isInvitees,
}: TeamMemberProps) => {
    const renderChildren = (): ReactNode => {
        if (isInvitees) {
            return (
                <>
                    <span className="user-data">{email}</span>
                    <span>&nbsp;(pending)</span>
                </>
            );
        }
        return (
            <span>
                {firstName}&nbsp;{lastName}
            </span>
        );
    };

    return (
        <StyledTeamMember
            data-testid="main-container"
            isChecked={isChecked}
            isInvitees={isInvitees}
            onClick={onClick}
        >
            <CheckMinIcon className="checkmark" />
            {renderChildren()}
            <input
                data-testid="checkbox"
                type="checkbox"
                defaultChecked={isChecked}
            />
        </StyledTeamMember>
    );
};

export default TeamMember;
