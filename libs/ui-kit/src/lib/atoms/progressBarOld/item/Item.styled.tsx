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
    background-color: ${colors.grey.grey900};
    color: ${colors.white};
`;

const completedStyle = css`
    border: 1px solid ${colors.primary.primary500};
    background-color: ${colors.primary.primary500};
    color: ${colors.white};
`;

export const StyledItem = styled.div<StyledItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    gap: 12px;
    ${mixinTypography.label.lMd.labelMdMedium};

    .order {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 1px solid ${colors.grey.grey900};
        background-color: ${colors.beige};
        color: ${colors.grey.grey900};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 200ms ease;

        ${({ isActive }) => isActive && activeStyle};
        ${({ isCompleted }) => isCompleted && completedStyle};
    }
    .label {
        text-transform: uppercase;
    }

    @media screen and (${mediaScreen.tablet}) {
        gap: 7.5px;

        .label {
            font-size: 14px;
        }
    }
`;
