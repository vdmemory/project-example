import { colors } from '@breef/ui-kit';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const setIconColor = (color: string) => css`
    .label svg path {
        fill: ${color};
    }
`;

interface StyledAccessDeniedButtonProps {
    placement: 'top' | 'left' | 'right';
}

const leftArrow = css`
    #arrow {
        border-color: ${colors.grey.grey200} transparent transparent
            ${colors.grey.grey200} !important;
    }
`;
const topArrow = css`
    #arrow {
        border-color: transparent ${colors.grey.grey200} ${colors.grey.grey200}
            transparent !important;
    }
`;
const rightArrow = css`
    #arrow {
        border-color: ${colors.grey.grey200} transparent transparent
            ${colors.grey.grey200} !important;
    }
`;

export const StyledAccessDeniedButton = styled.div<StyledAccessDeniedButtonProps>`
    .Tooltip {
        border-radius: 4px;
        background-color: ${colors.secondary.secondary100} !important;
        border: 1px solid ${colors.grey.grey200} !important;

        ${({ placement }) => placement === 'left' && leftArrow};
        ${({ placement }) => placement === 'right' && rightArrow};
        ${({ placement }) => placement === 'top' && topArrow};
    }

    .access-denied-wrapper {
        background-color: ${colors.white};
        border-color: ${colors.grey.grey300};
        color: ${colors.grey.grey300};
        ${setIconColor(colors.grey.grey300)};
    }
`;
