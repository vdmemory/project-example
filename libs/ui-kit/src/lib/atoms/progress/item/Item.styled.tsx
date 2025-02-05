import { mediaScreen } from '@breef/shared/assets/variables';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '../../../styles/colors';
import { mixinTypography } from '../../../styles/mixins/typography.styled';

interface StyledItemProps {
    isActive?: boolean;
    isCompleted?: boolean;
}

const activeStyle = css`
    border: 1px solid ${colors.grey.grey900};
    background-color: transparent;
    color: ${colors.grey.grey900};
`;

const completedStyle = css`
    border: 1px solid ${colors.grey.grey900};
    background-color: ${colors.grey.grey900};
    color: ${colors.white};
`;

export const StyledItem = styled.div<StyledItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    ${mixinTypography.label.lS.labelSMedium};

    .order {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 1px solid ${colors.grey.grey400};
        background-color: transparent;
        color: ${colors.grey.grey400};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 200ms ease;

        ${({ isActive }) => isActive && activeStyle};
        ${({ isCompleted }) => isCompleted && completedStyle};
    }

    .label {
        text-transform: uppercase;
        color: ${colors.grey.grey400};

        ${({ isActive, isCompleted }) =>
            (isActive || isCompleted) &&
            css`
                color: ${colors.grey.grey900};
            `};
    }

    .arrow path {
        stroke: ${colors.grey.grey400};

        ${({ isActive, isCompleted }) =>
            (isActive || isCompleted) &&
            css`
                stroke: ${colors.grey.grey900};
            `};
    }

    @media screen and (${mediaScreen.tablet}) {
        gap: 7.5px;

        .label {
            font-size: 14px;
        }
    }
`;
