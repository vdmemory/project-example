import { colors, mixinTypography } from '../../styles';
import { css } from '@emotion/react';

export const getSmallButton = (isSubmitted: boolean) => css`
    min-width: 127px;
    padding: 8px 12px;
    ${mixinTypography.text.tSmall.textSmallMedium};

    ${isSubmitted &&
    css`
        padding: 10px 19.5px;
    `};

    .label svg {
        width: 16px;
        min-width: 16px;
        height: auto;
    }

    .loader {
        width: 16px;
        min-width: 16px;
        height: 16px;
        fill: ${colors.grey.grey900};
    }
`;

export const getMediumButton = (isSubmitted: boolean) => css`
    min-width: 141px;
    padding: 15px 16px;
    ${mixinTypography.text.tMd.textMdMedium};

    ${isSubmitted &&
    css`
        padding: 12px 22px;
    `};

    .label svg {
        width: 24px;
        min-width: 24px;
        height: auto;
    }

    .loader {
        width: 24px;
        min-width: 24px;
        height: 24px;
    }
`;

export const getLargeButton = (isSubmitted: boolean) => css`
    min-width: 141px;
    padding: 15px 16px;
    ${mixinTypography.text.tLg.textLgMedium};

    ${isSubmitted &&
    css`
        padding: 12px 22px;
    `};

    .label svg {
        width: 24px;
        min-width: 24px;
        height: auto;
    }

    .loader {
        width: 30px;
        min-width: 30px;
        height: 30px;
    }
`;
