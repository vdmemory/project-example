import React from 'react';
import { StyledTeamMemberReviewRow } from './TeamMemberReviewRow.styled';
import { EmailIcon, PhoneIcon } from '@breef/shared/assets';
import { Tooltip } from '@breef/shared/ui-components';

interface TeamMemberReviewRowProps {
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
}

export const TeamMemberReviewRow: React.FC<TeamMemberReviewRowProps> = ({
    firstName,
    lastName,
    email,
    phoneNumber,
}) => {
    const description =
        firstName && lastName ? `${firstName} ${lastName}` : email;

    return (
        <StyledTeamMemberReviewRow>
            <span className="member-description">{description}</span>
            <div className="member-info-icons-wrapper">
                <Tooltip placement="top-end" label={email} isCopyBtn>
                    <div className="icon-wrapper">
                        <EmailIcon />
                    </div>
                </Tooltip>
                {phoneNumber && (
                    <Tooltip placement="top-end" label={phoneNumber} isCopyBtn>
                        <div
                            data-testid="icon-phone-wrapper"
                            className="icon-wrapper"
                        >
                            <PhoneIcon className="icon-phone" />
                        </div>
                    </Tooltip>
                )}
            </div>
        </StyledTeamMemberReviewRow>
    );
};
export default TeamMemberReviewRow;
