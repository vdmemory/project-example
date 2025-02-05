import { colors } from '../../styles';
import { css } from '@emotion/react';

const setIconColor = (color: string) => css`
    svg line {
        stroke: ${color};
    }
`;

export const outlinedButton = css`
    background-color: ${colors.primary.primary100};

    &:active {
        border: 1px solid ${colors.grey.grey900};
        ${setIconColor(colors.grey.grey900)}
    }

    &:disabled {
        background-color: ${colors.grey.grey50};
        border: 1px solid ${colors.grey.grey50};
    }
`;

export const ghostButton = css`
    background-color: transparent;

    &:active {
        background-color: ${colors.primary.primary100};
        ${setIconColor(colors.grey.grey900)}
    }
`;
