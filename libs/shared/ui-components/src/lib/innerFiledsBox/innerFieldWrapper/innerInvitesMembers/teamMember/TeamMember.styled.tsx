import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledTeamMemberProps {
    isChecked: boolean;
    isInvitees?: boolean;
}

export const StyledTeamMember = styled.div`
    display: flex;
    font-size: 18px;
    height: 70px;
    align-items: center;
    outline: 1px solid ${colors.mainBlack};
    cursor: pointer;

    ${({ isInvitees }: StyledTeamMemberProps) =>
        isInvitees &&
        css`
            color: ${colors.strokeGray};
        `}

    input {
        width: 0;
        height: 0;
        opacity: 0;
    }
    .checkmark {
        display: none;
        margin-right: 14px;
    }
    .user-data {
        overflow: hidden;
        text-overflow: ellipsis;
        + span {
            color: ${colors.strokeGray};
        }
    }

    > span {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    ${({ isChecked }: StyledTeamMemberProps) =>
        isChecked &&
        css`
            background-color: ${colors.mainPurple};
            color: ${colors.mainOrange};

            .checkmark {
                display: block;
            }
        `}
`;
