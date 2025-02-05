import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { fonts, colors, mediaScreen } from '@breef/shared/assets/variables';
import { simpleAnimation } from '@breef/shared/assets';

export interface StyledButtonProps {
    border: 'all' | 'none';
    color: 'primary' | 'secondary' | 'transparent';
    isSubtitle: boolean;
    withAnimate: boolean;
    isDisabledWithActiveText: boolean;
}

const primaryBtnColorStyles = css`
    color: ${colors.mainWhite};
    background-color: ${colors.mainOrange};
    height: 100%;
    width: 100%;
    padding: 0;

    .spinner {
        right: calc(50% - 15px);
    }
    :hover,
    :active {
        background-color: ${colors.mainBlack};
        @media screen and (max-width: 1024px) {
            background-color: ${colors.mainOrange};
        }
    }
    svg path {
        transition: all 300ms ease;
    }
    :disabled {
        cursor: not-allowed;
        background-color: ${colors.mainWhite};
        color: ${colors.mainBlack};
        .arrow {
            path:first-of-type {
                fill: ${colors.mainBlack}!important;
            }
            path:last-of-type {
                stroke: ${colors.mainBlack}!important;
            }
        }
    }
`;

const secondaryBtnColorStyles = css`
    color: ${colors.mainBlack};
    background-color: ${colors.darkPurple};

    :hover,
    :active {
        background-color: ${colors.mainBlack};
        color: ${colors.mainWhite};
        @media screen and (max-width: 1024px) {
            background-color: #d96e34;
        }
    }
    :disabled {
        cursor: not-allowed;
        background-color: ${colors.mainWhite};
        color: ${colors.mainBlack};
        .arrow {
            fill: ${colors.mainBlack};
        }
    }
`;
const transparentBtnColorStyles = css`
    color: ${colors.mainBlack};
    background-color: transparent;
    :hover,
    :active {
        background-color: transparent;
        @media screen and (max-width: 1024px) {
            background-color: transparent;
        }
    }
    :disabled {
        cursor: not-allowed;
        background-color: ${colors.mainWhite};
        color: ${colors.mainBlack};
        .arrow {
            fill: ${colors.mainBlack};
        }
    }
`;

const colorSelect = (props: StyledButtonProps) => {
    switch (props.color) {
        case 'primary':
            return props.withAnimate ? null : primaryBtnColorStyles;
        case 'secondary':
            return props.withAnimate ? null : secondaryBtnColorStyles;
        case 'transparent':
            return props.withAnimate ? null : transparentBtnColorStyles;
        default:
            return primaryBtnColorStyles;
    }
};

const borderSelect = (props: StyledButtonProps) => {
    switch (props.border) {
        case 'all':
            return css`
                border: 1px solid black;
            `;
        default:
            return css`
                border: none;
            `;
    }
};

const checkIsSubtitle = ({ isSubtitle }: StyledButtonProps) => {
    if (isSubtitle)
        return css`
            justify-content: space-between;
            padding-left: 60px;
            padding-right: 60px;
            &:disabled {
                opacity: 1 !important;
                .subtitle {
                    opacity: 0.5 !important;
                    color: ${colors.mainBlack}!important;
                }
                .arrow {
                    display: none !important;
                }
            }
        `;
    return null;
};

export const sharedCssForAnimationButton = css`
    .main-content {
        &-item {
            display: flex;
            width: 100%;
            align-items: center;
        }

        &-text {
            position: relative;
            display: flex;
            align-items: center;
            z-index: 10;
            .spinner {
                right: -20px;
            }
        }
    }
    .subtitle {
        position: relative;
        z-index: 10;
    }
`;

export const sharedCssActionAnimationButton = css`
    .main-content {
        .subtitle {
            transition-duration: 0.05s;
            transition-delay: 0.4s;
            transition-timing-function: linear;
        }
    }
`;

export const checkIsAnimationButton = ({
    withAnimate,
    isSubtitle,
    color,
}: StyledButtonProps) => {
    if (withAnimate && color === 'primary') {
        return css`
            color: ${colors.mainWhite};
            background-color: ${colors.mainOrange};
            height: 100%;
            width: 100%;
            padding: 0;
            overflow: hidden;
            text-transform: uppercase;

            transition: background-color 350ms ease;

            ${sharedCssForAnimationButton};
            .main-content {
                &-item {
                    justify-content: ${isSubtitle ? 'space-between' : 'center'};
                    padding-left: ${isSubtitle ? '60px' : 'unset'};
                    padding-right: ${isSubtitle ? '60px' : 'unset'};
                    @media (${mediaScreen.tablet}) {
                        padding-left: ${isSubtitle ? '15px' : 'unset'};
                        padding-right: ${isSubtitle ? '15px' : 'unset'};
                    }
                }
            }
            :hover,
            :active {
                ${sharedCssActionAnimationButton};
                background-color: ${colors.mainBlack};
                transition: background-color 350ms ease;
                .main-content {
                    .subtitle {
                        color: ${colors.mainWhite};
                    }
                }
            }
            :disabled {
                cursor: not-allowed !important;
                background-color: ${colors.mainWhite} !important;
                color: ${colors.mainBlack};

                .arrow {
                    display: none;
                }

                @media (max-width: 1024px) {
                    .main-content {
                        &:after,
                        &:before {
                            display: none;
                        }
                    }
                }
            }
        `;
    } else if (withAnimate && color === 'transparent') {
        return css`
            color: ${colors.mainBlack};
            background-color: transparent;
            height: 100%;
            width: 100%;
            padding: 0;
            overflow: hidden;
            svg path {
                transition: all 300ms ease;
            }
            ${sharedCssForAnimationButton};
            .main-content {
                &-item {
                    justify-content: ${isSubtitle ? 'space-between' : 'center'};
                    padding-left: ${isSubtitle ? '60px' : 'unset'};
                    padding-right: ${isSubtitle ? '60px' : 'unset'};
                }
                &-text {
                    display: flex;
                    align-items: center;
                }
            }
            :hover,
            :active {
                ${sharedCssActionAnimationButton};
                .main-content {
                    .subtitle {
                        color: ${colors.mainWhite};
                    }
                }
            }

            :disabled {
                cursor: not-allowed !important;
                background-color: ${colors.mainWhite};
                color: ${colors.mainBlack};
                .main-content {
                    &:after {
                        background: ${colors.mainWhite};
                    }
                    &:before {
                        background: ${colors.mainWhite};
                    }
                }
                :hover,
                :active {
                    .main-content {
                        &-text {
                            animation: unset;
                        }
                    }
                }

                .arrow {
                    fill: ${colors.mainBlack};
                }
            }
        `;
    } else if (withAnimate && color === 'secondary') {
        return css`
            color: ${colors.mainBlack};
            background-color: ${colors.darkPurple};
            height: 100%;
            width: 100%;
            padding: 0;
            overflow: hidden;
            text-transform: uppercase;
            svg path {
                transition: all 300ms ease;
            }

            ${sharedCssForAnimationButton};

            .main-content {
                &-item {
                    justify-content: ${isSubtitle ? 'space-between' : 'center'};
                    padding-left: ${isSubtitle ? '60px' : 'unset'};
                    padding-right: ${isSubtitle ? '60px' : 'unset'};
                }
                &-text {
                    display: flex;
                    align-items: center;
                }
            }
            :hover,
            :active {
                ${sharedCssActionAnimationButton};
                background-color: ${colors.mainBlack};
                color: ${colors.mainWhite};
                transition: all 350ms ease;
                .main-content {
                    .subtitle {
                        color: ${colors.darkPurple};
                    }
                }
            }

            :disabled {
                cursor: not-allowed !important;
                background-color: ${colors.mainWhite};
                color: ${colors.mainBlack};
                .main-content {
                    &:after {
                        background: ${colors.mainWhite};
                    }
                    &:before {
                        background: ${colors.mainWhite};
                    }
                }
                :hover,
                :active {
                    .main-content {
                        &-text {
                            animation: unset;
                        }
                    }
                }
                .arrow {
                    fill: ${colors.mainBlack};
                }
            }
        `;
    }

    return null;
};

const checkIsDisabledWithActiveText = ({
    isDisabledWithActiveText,
}: StyledButtonProps) =>
    isDisabledWithActiveText &&
    css`
        :disabled {
            cursor: not-allowed;
            .arrow {
                display: none !important;
            }
            > * {
                opacity: 1;
            }
        }
    `;

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 300ms ease;
    margin: auto;
    border: none;
    font-family: ${fonts.default}, sans-serif;
    width: 100%;
    ${colorSelect};
    ${borderSelect};
    ${checkIsSubtitle};
    ${checkIsAnimationButton}
    &:disabled {
        cursor: not-allowed;
        > * {
            opacity: 0.2;
        }
    }
    ${checkIsDisabledWithActiveText}
    &:hover {
        .arrow.down {
            path:first-of-type {
                transition: all 300ms ease;
                fill: ${colors.mainWhite};
            }
            path:last-of-type {
                transition: all 300ms ease;
                stroke: ${colors.mainWhite};
            }
        }
    }
    .subtitle {
        font-family: ${fonts.accent};
        text-transform: uppercase;
        font-size: 12px;
        line-height: 16px;
        letter-spacing: 0.05em;
        color: ${colors.mainWhite};
        opacity: 0.5;
    }
    .main-content {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        a {
            color: ${colors.mainOrange};
        }

        &-item {
            &-text {
                .arrow-left,
                .arrow-right {
                    position: absolute;
                    transition: margin 300ms ease !important;
                }
            }
        }
    }
    .arrow-left,
    .arrow-right {
        position: absolute;
        transition: margin 300ms ease !important;
    }
    .arrow-left {
        right: calc(100% + 10px);
        //margin-right: 10px;
    }
    .arrow-right {
        left: calc(100% + 10px);
        //margin-left: 10px;
        transform: rotate(180deg);
    }
    .arrow.down {
        transform: rotate(0deg);
        path:first-of-type {
            fill: ${colors.mainBlack};
        }
        path:last-of-type {
            stroke: ${colors.mainBlack};
        }
    }
    .arrow {
        transition: stroke 300ms ease;
        path:first-of-type {
            fill: ${colors.mainWhite};
        }
        path:last-of-type {
            stroke: ${colors.mainWhite};
        }
    }
    &:hover {
        .arrow-right {
            margin-left: 10px;
        }
        .arrow-left {
            margin-right: 10px;
        }
    }
    &.normal {
        height: 80px;
        font-size: 24px;
        overflow: hidden;
        .arrow-left {
            //margin-right: 5px;
            right: calc(100% + 5px);
            height: 35px;
        }
        .arrow-right {
            //margin-left: 5px;
            left: calc(100% + 5px);
            height: 35px;
        }
    }

    &.big {
        height: 100px;
        text-transform: uppercase;
        font-size: 48px;
        .arrow-right {
            left: calc(100% + 15px);
            height: 40px;
        }
        .arrow-left {
            right: calc(100% + 15px);
            height: 40px;
        }
        @media screen and (max-width: 1024px) {
            .arrow-right,
            .arrow-left {
                height: 30px;
            }
        }
    }

    &.small {
        padding: 0 30px;
        font-size: 18px;
        height: 60px;
        .main-content {
            width: auto;
        }

        &-accent {
            height: 100%;
            font-family: ${fonts.accent};
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            :hover {
                background-color: ${colors.mainOrange};
                text-decoration: line-through;

                @media screen and (max-width: 512px) {
                    text-decoration: unset;
                }
            }
            :disabled {
                text-decoration: none;
            }
        }
    }

    &.medium {
        font-size: 24px;
        height: 69px;
    }

    &.only-icon {
        height: 100%;
        padding: 0 10px;
        background-color: transparent;
    }

    ${simpleAnimation}

    @media (${mediaScreen.tablet}) {
        &:hover {
            color: ${colors.mainBlack};
            background-color: transparent;

            .main-content {
                .subtitle {
                    color: ${colors.darkPurple};
                }
            }
        }
    }
`;
