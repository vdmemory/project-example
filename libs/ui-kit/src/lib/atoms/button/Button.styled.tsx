import styled from '@emotion/styled';
import { colors } from '../../styles';
import {
    getDangerButton,
    getGhostButton,
    getOutlinedBlackButton,
    getOutlinedButton,
    getPrimaryButton,
    getSecondaryButton,
    getSubtleButton,
    getSuccessButton,
} from './variant.styled';
import { getMediumButton, getLargeButton, getSmallButton } from './size.styled';
import { css } from '@emotion/react';

export type VariantButton =
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'outlined'
    | 'outlined-black'
    | 'ghost'
    | 'danger'
    | 'success';
export type SizeButton = 'small' | 'medium' | 'large';
export type IconPlacement = 'left' | 'right' | 'both';
interface StyledButtonProps {
    variant?: VariantButton;
    size?: SizeButton;
    isUppercase?: boolean;
    isAbsoluteIconPosition?: boolean;
    isSubmitted?: boolean;
}

const getButtonVariant = (props: StyledButtonProps) => {
    switch (props.variant) {
        case 'primary':
            return getPrimaryButton(!!props.isSubmitted);
        case 'secondary':
            return getSecondaryButton(!!props.isSubmitted);
        case 'subtle':
            return getSubtleButton(!!props.isSubmitted);
        case 'outlined':
            return getOutlinedButton(!!props.isSubmitted);
        case 'outlined-black':
            return getOutlinedBlackButton(!!props.isSubmitted);
        case 'ghost':
            return getGhostButton(!!props.isSubmitted);
        case 'danger':
            return getDangerButton(!!props.isSubmitted);
        case 'success':
            return getSuccessButton(!!props.isSubmitted);
        default:
            return getPrimaryButton(!!props.isSubmitted);
    }
};

const getButtonSize = (props: StyledButtonProps) => {
    switch (props.size) {
        case 'small':
            return getSmallButton(!!props.isSubmitted);
        case 'medium':
            return getMediumButton(!!props.isSubmitted);
        case 'large':
            return getLargeButton(!!props.isSubmitted);
        default:
            return getMediumButton(!!props.isSubmitted);
    }
};

export const StyledButton = styled.button<StyledButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    font-weight: 500;
    line-height: 1.5;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
        border-bottom-color 0.2s ease-in-out, border-left-color 0.2s ease-in-out,
        border-bottom-color 0.2s ease-in-out, border-top-color 0.2s ease-in-out;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    text-align: center;
    text-decoration: none;
    text-transform: ${({ isUppercase }: StyledButtonProps) =>
        isUppercase ? 'uppercase' : 'none'};
    vertical-align: middle;
    -webkit-appearance: none;
    -moz-appearance: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border-color: ${colors.grey.grey900};
    outline: none;
    min-width: fit-content;

    &:disabled {
        cursor: not-allowed;
    }

    .label {
        position: relative;
        display: flex;
        gap: 8px;
        text-overflow: ellipsis;
        align-items: center;
        white-space: nowrap;

        .icon-wrapper {
            display: flex;
            align-items: center;
        }

        svg path,
        svg line {
            transition: all 0.2s ease-in-out, all 0.2s ease-in-out;
            fill: ${colors.grey.grey900};
        }

        ${({ isAbsoluteIconPosition, size }: StyledButtonProps) => {
            if (isAbsoluteIconPosition) {
                const offset = size === 'small' ? 4 : 8;
                return css`
                    .icon-wrapper {
                        position: absolute;
                    }
                    .icon-wrapper-left {
                        right: calc(100% + ${offset}px);
                    }
                    .icon-wrapper-right {
                        left: calc(100% + ${offset}px);
                    }
                `;
            }
            return ``;
        }};
    }

    .loader {
        animation: spin 0.75s linear infinite;
    }

    ${getButtonVariant};
    ${getButtonSize};

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
