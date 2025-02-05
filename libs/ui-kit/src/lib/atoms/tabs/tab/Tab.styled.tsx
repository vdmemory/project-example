import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';
import { mixinTypography } from '../../../styles/mixins/typography.styled';

interface StyledTabProps {
    isActive?: boolean;
}

const activeStyle = css`
    background-color: ${colors.grey.grey700};
    color: ${colors.white};

    & svg.color-inversion path {
        fill: ${colors.white};
    }
`;

export const StyledTab = styled.button<StyledTabProps>`
    display: flex;
    background-color: transparent;
    border: none;
    min-width: 108px;
    height: 100%;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0 16px;
    gap: 8px;
    transition-property: background-color, color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;

    & svg.color-inversion path {
        transition: fill 0.2s ease-in-out;
    }

    > svg {
        @media (${mediaScreen.minTablet}) {
            height: 18px;
        }
    }

    :hover {
        background-color: ${colors.grey.grey300};
        color: ${colors.white};

        & svg.color-inversion path {
            fill: ${colors.white};
        }
    }

    @media (${mediaScreen.minTablet}) {
        gap: 6px;
        padding: 0 12px;
        min-width: 65px;
        ${mixinTypography.text.tSmall.textSmallMedium};
        color: ${colors.grey.grey900};
    }
    & > p {
        margin: 0;
    }

    ${mixinTypography.text.tMd.textMdMedium};
    ${({ isActive }) => isActive && activeStyle}
`;
