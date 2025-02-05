import { colors } from '../../styles';
import { css } from '@emotion/react';
import { mediaScreen } from '@breef/shared/assets/variables';

const setIconColor = (color: string) => css`
    .label svg path {
        fill: ${color};
    }
`;

export const getPrimaryButton = (isSubmitted: boolean) => css`
    background-color: ${colors.primary.primary500};
    color: ${colors.white};
    ${setIconColor(colors.white)};

    &:hover {
        background-color: ${colors.primary.primary300};
        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.primary.primary500};
        }
    }

    &:active {
        background-color: ${colors.primary.primary600};
    }

    &:disabled {
        background-color: ${colors.primary.primary200};
        border-color: ${colors.grey.grey300};
        color: ${colors.grey.grey50};
        ${setIconColor(colors.grey.grey50)};
    }

    .loader path {
        stroke: transparent;
        width: 20px;
        height: 20px;
    }

    ${isSubmitted &&
    css`
        background-color: ${colors.primary.primary500}!important;
        border-color: ${colors.grey.grey900}!important;
    `}
`;

export const getSecondaryButton = (isSubmitted: boolean) => css`
    background-color: ${colors.secondary.secondary500};
    color: ${colors.grey.grey900};

    &:hover {
        background-color: ${colors.secondary.secondary300};
        .label svg path {
            stroke: ${colors.primary.primary500};
        }
        span {
            color: ${colors.primary.primary500};
        }
        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.secondary.secondary500};
        }
    }

    &:active {
        background-color: ${colors.secondary.secondary600};
    }

    &:disabled {
        background-color: ${colors.grey.grey50};
        border-color: ${colors.grey.grey300};
        color: ${colors.grey.grey400};
        ${setIconColor(colors.grey.grey400)};
    }
    ${isSubmitted &&
    css`
        background-color: ${colors.secondary.secondary500}!important;
        border-color: ${colors.grey.grey900}!important;
    `};
`;

export const getSubtleButton = (isSubmitted: boolean) => css`
    background-color: ${colors.grey.grey50};
    color: ${colors.grey.grey900};

    &:hover {
        background-color: ${colors.grey.grey100};
        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.grey.grey50};
        }
    }

    &:active {
        background-color: ${colors.grey.grey200};
    }

    &:disabled {
        background-color: ${colors.grey.grey50};
        border-color: ${colors.grey.grey300};
        color: ${colors.grey.grey400};
        ${setIconColor(colors.grey.grey400)};
    }

    ${isSubmitted &&
    css`
        background-color: ${colors.grey.grey50}!important;
        border-color: ${colors.grey.grey900}!important;
    `}
`;

export const getOutlinedButton = (isSubmitted: boolean) => css`
    background-color: ${colors.white};
    color: ${colors.primary.primary600};
    ${setIconColor(colors.primary.primary600)};
    border-color: ${colors.primary.primary600};

    &:hover {
        color: ${colors.white};
        background-color: ${colors.primary.primary300};
        ${setIconColor(colors.white)};
        border-color: ${colors.primary.primary300};

        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.white};
            color: ${colors.primary.primary600};
            ${setIconColor(colors.primary.primary600)};
            border-color: ${colors.primary.primary600};
        }
    }

    &:active {
        background-color: ${colors.primary.primary600};
        color: ${colors.white};
        ${setIconColor(colors.white)};
        border-color: ${colors.primary.primary600};
    }

    &:disabled {
        background-color: ${colors.white};
        border-color: ${colors.grey.grey300};
        color: ${colors.grey.grey300};
        ${setIconColor(colors.grey.grey300)};
        -webkit-text-stroke-color: ${colors.grey.grey300};
    }
    ${isSubmitted &&
    css`
        background-color: ${colors.white}!important;
        border-color: ${colors.grey.grey900}!important;
    `}
`;

export const getOutlinedBlackButton = (isSubmitted: boolean) => css`
    background-color: transparent;
    color: ${colors.grey.grey900};
    ${setIconColor(colors.grey.grey900)};
    border-color: ${colors.grey.grey900};

    &:hover {
        color: ${colors.white};
        background-color: ${colors.grey.grey900};
        ${setIconColor(colors.white)};
        border-color: ${colors.grey.grey900};

        @media screen and (${mediaScreen.tablet}) {
            background-color: transparent;
            color: ${colors.grey.grey900};
            ${setIconColor(colors.grey.grey900)};
            border-color: ${colors.grey.grey900};
        }
    }

    &:active {
        color: ${colors.white};
        background-color: ${colors.grey.grey900};
        ${setIconColor(colors.white)};
        border-color: ${colors.grey.grey900};
    }

    &:disabled {
        background-color: transparent;
        color: ${colors.grey.grey300};
        ${setIconColor(colors.grey.grey300)};
        border-color: ${colors.grey.grey300};
    }
    ${isSubmitted &&
    css`
        background-color: transparent !important;
        border-color: ${colors.grey.grey900}!important;
    `}
`;

export const getGhostButton = (isSubmitted: boolean) => css`
    background-color: transparent;
    color: ${colors.primary.primary500};
    border-color: transparent;
    ${setIconColor(colors.primary.primary500)};

    &:hover {
        color: ${colors.grey.grey900};
        ${setIconColor(colors.grey.grey900)};
        @media screen and (${mediaScreen.tablet}) {
            color: ${colors.primary.primary500};
            ${setIconColor(colors.primary.primary500)};
        }
    }

    &:active {
        color: ${colors.primary.primary700};
        ${setIconColor(colors.primary.primary700)};
    }

    &:disabled {
        color: ${colors.grey.grey400};
        ${setIconColor(colors.grey.grey400)};
    }
`;

export const getDangerButton = (isSubmitted: boolean) => css`
    background-color: ${colors.error.error100};
    color: ${colors.error.error900};
    border-color: ${colors.error.error900};
    ${setIconColor(colors.error.error900)};

    &:hover {
        background-color: ${colors.error.error200};
        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.error.error100};
        }
    }

    &:active {
        background-color: ${colors.error.error300};
    }

    &:disabled {
        border-color: ${colors.grey.grey400};
        background-color: ${colors.grey.grey50};
        color: ${colors.grey.grey400};
        ${setIconColor(colors.grey.grey400)};
    }
    ${isSubmitted &&
    css`
        background-color: ${colors.error.error100}!important;
        border-color: ${colors.error.error900}!important;
    `}
`;

export const getSuccessButton = (isSubmitted: boolean) => css`
    background-color: ${colors.success.success100};
    color: ${colors.success.success900};
    border-color: ${colors.success.success900};
    ${setIconColor(colors.success.success900)};

    &:hover {
        background-color: ${colors.success.success200};
        @media screen and (${mediaScreen.tablet}) {
            background-color: ${colors.success.success100};
        }
    }

    &:active {
        background-color: ${colors.success.success300};
    }

    &:disabled {
        border-color: ${colors.grey.grey400};
        background-color: ${colors.grey.grey50};
        color: ${colors.grey.grey400};
        ${setIconColor(colors.grey.grey400)};
    }
    ${isSubmitted &&
    css`
        background-color: ${colors.success.success100}!important;
        border-color: ${colors.success.success100}!important;
    `}
`;
