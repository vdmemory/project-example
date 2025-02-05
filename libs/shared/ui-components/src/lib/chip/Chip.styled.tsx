import styled from '@emotion/styled';
import { colors } from '@breef/shared/assets';
import { css } from '@emotion/react';

interface StyledChipProps {
    isChecked: boolean;
}

export const StyledChip = styled.label`
    padding: 6px 24px;
    background-color: ${colors.darkPurple};
    border: 1px solid ${colors.mainBlack};
    line-height: 20px;
    font-size: 14px;
    white-space: nowrap;
    color: ${colors.mainOrange};
    user-select: none;
    cursor: pointer;

    ${({ isChecked }: StyledChipProps) =>
        isChecked &&
        css`
            background-color: ${colors.mainBlack};
            color: ${colors.mainWhite};
        `}

    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
`;
