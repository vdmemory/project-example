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
    .order {
        background-color: ${colors.primary.primary500};
        color: ${colors.white};
    }
    .label {
        color: ${colors.grey.grey900};
    }
`;

const completedStyle = css`
    .order {
        color: ${colors.white};
    }
`;

export const StyledItem = styled.div<StyledItemProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    ${mixinTypography.label.lMd.labelMdMedium};

    .order {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: #e9ebed;
        color: ${colors.grey.grey900};
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 200ms ease;
    }
    .label {
        ${mixinTypography.text.tLg.textLgMedium};
        text-transform: capitalize;
        color: ${colors.grey.grey500};
    }

    ${({ isActive }) => isActive && activeStyle};
    ${({ isCompleted }) => isCompleted && completedStyle};

    @media screen and (${mediaScreen.tablet}) {
        gap: 7.5px;

        .label {
            display: none;
        }
    }
`;
