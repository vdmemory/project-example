import styled from '@emotion/styled';
import { colors, mixinTypography } from '@breef/ui-kit';
import { css } from '@emotion/react';

interface StyledChipCheckboxProps {
    isDisabled: boolean;
    isChecked: boolean;
}
export const StyledChipCheckbox = styled.label<StyledChipCheckboxProps>`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px 12px;
    height: 31px;
    min-width: 175px;
    border: 1px solid ${colors.grey.grey900};
    background-color: ${colors.white};
    border-radius: 4px;
    cursor: pointer;

    :hover {
        background-color: ${colors.secondary.secondary500};
    }

    ${({ isChecked }) =>
        isChecked &&
        css`
            background-color: ${colors.secondary.secondary500};
        `};

    ${({ isDisabled }) =>
        isDisabled &&
        css`
            opacity: 0.3;
            pointer-events: none;
        `};

    svg {
        width: 17px;
        min-width: 17px;
        height: 17px;
        path {
            stroke: ${colors.grey.grey900};
            stroke-width: 2;
        }
    }

    span {
        ${mixinTypography.label.lS.labelSMedium};
        color: ${colors.grey.grey900};
    }
    input {
        display: none;
    }
`;
