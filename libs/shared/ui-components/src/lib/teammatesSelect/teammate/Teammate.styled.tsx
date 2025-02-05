import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors } from '@breef/shared/assets';

interface StyledTeammateProps {
    isSelected: boolean;
}

export const StyledTeammate = styled.button`
    display: flex;
    outline: none;
    background-color: transparent;
    border: none;
    max-height: 100px;
    cursor: pointer;
    gap: 14px;

    .teammate-name {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: ${colors.mainBlack};
    }

    .check-icon {
        width: 29px;
        min-width: 29px;
        height: auto;
    }

    :disabled {
        background-color: #e2e2e2;
    }

    ${({ isSelected }: StyledTeammateProps) =>
        isSelected &&
        css`
            background-color: ${colors.darkPurple};
            color: ${colors.mainOrange};

            .teammate-name {
                color: ${colors.mainOrange};
            }
        `};
`;
