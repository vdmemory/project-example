import { useEffect, useState } from 'react';
import { StyledTeamMember } from './TeamMember.styled';
import { CustomDropdown } from '../../customDropdown/customDropdown';
import { DropdownRole } from '../../customDropdown/dropdownRole/DropdownRole';
import { ChangeHandler } from 'react-hook-form';
import {
    TeamMemberDataType,
    useTeamMemberControl,
} from './hooks/useTeamMemberControl';
import { useTeamMemberGetActionList } from './hooks/useTeamMemberGetActionList';
import { useMediaContext } from '@breef/shared/hooks';

export interface TeamMemberProps {
    disabledEvents?: boolean;
    data: TeamMemberDataType;
    isAction?: boolean;
    onlyRemoveMember?: boolean;
    type?: 'profile' | 'project' | 'pitch';
}

export default function TeamMember({
    data,
    data: { email, firstName, lastName, position, date, status },
    isAction = true,
    onlyRemoveMember = false,
    disabledEvents = false,
    type = 'profile',
}: TeamMemberProps) {
    const [memberRole, setMemberRole] = useState('');
    const { isMobile } = useMediaContext();
    const { onSelectActionForInvite, onChangeMember, renderConfirmPopup } =
        useTeamMemberControl({
            type,
            data,
        });
    const { actionsList, actionsListPendingInvite } =
        useTeamMemberGetActionList(disabledEvents);

    const dateLastAction = new Date(Date.parse(date || '')).toLocaleString(
        'en-US',
        {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
        },
    );

    useEffect(() => {
        setMemberRole(position || '');
    }, [position]);

    const renderLeftSection = () => {
        if (firstName && lastName && position) {
            return (
                <>
                    <span className="text">{firstName + ' ' + lastName}</span>
                    <span className="subtext">{email}</span>
                </>
            );
        }
        return (
            <>
                <span className="text">{email}</span>
                <span className="subtext">Invited on {dateLastAction}</span>
            </>
        );
    };
    const renderRightSection = () => {
        if (status && status === 'pending' && !position) {
            return (
                <CustomDropdown
                    value={isMobile ? 'Pending' : 'Pending invite'}
                    dropdownList={actionsListPendingInvite}
                    customChange={onSelectActionForInvite}
                />
            );
        }
        return (
            <DropdownRole
                value={memberRole || ''}
                onChange={onChangeMember as ChangeHandler}
                actionsList={actionsList}
                isAction={isAction}
                onlyRemoveMember={onlyRemoveMember}
            />
        );
    };

    return (
        <StyledTeamMember disabledEvents={disabledEvents}>
            {renderConfirmPopup()}
            <div className="left-section">{renderLeftSection()}</div>
            <div className="right-section">{renderRightSection()}</div>
        </StyledTeamMember>
    );
}
