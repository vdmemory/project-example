import styled from '@emotion/styled';
import { colors } from '../../styles/colors';
import { css } from '@emotion/react';
import { mixinTypography } from '../../styles/mixins/typography.styled';

export type InputDirection = 'left' | 'right';

interface StyledInputProps {
    inputDirection: InputDirection;
    isDisabled?: boolean;
    isError?: boolean;
    isWarning?: boolean;
    isVisibleCounter?: boolean;
    isAbsoluteErrorPosition?: boolean;
    isDollarSymbol?: boolean;
    isPercentSymbol?: boolean;
    isSearchIcon?: boolean;
    isWarningIcon?: boolean;
    isRemovable?: boolean;
    isPlaceholderIcon?: boolean;
    isPasswordField?: boolean;
}

const calculatePaddings = ({
    isDollarSymbol,
    isSearchIcon,
    isPercentSymbol,
    isWarningIcon,
    isRemovable,
    isPasswordField,
}: StyledInputProps) => {
    const leftPadding =
        12 +
        (isDollarSymbol ? 9 : 0) +
        (isSearchIcon ? 24 : 0) +
        (isDollarSymbol && isSearchIcon ? 8 : 0) +
        (isDollarSymbol || isSearchIcon ? 8 : 0);
    const rightPadding =
        12 +
        (isPercentSymbol ? 15 : 0) +
        (isWarningIcon ? 24 : 0) +
        (isRemovable ? 24 : 0) +
        (isPercentSymbol && isWarningIcon ? 8 : 0) +
        (isPercentSymbol || isWarningIcon ? 8 : 0) +
        (isWarningIcon && isRemovable ? 8 : 0) +
        (isWarningIcon || isRemovable ? 8 : 0);

    return css`
        padding-left: ${leftPadding}px;
        padding-right: ${rightPadding}px;
    `;
};

export const StyledInput = styled.div<StyledInputProps>`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;

    .input-wrapper {
        position: relative;
        display: flex;
        width: auto;
    }

    input {
        display: flex;
        flex: 1;
        min-width: 280px;
        box-sizing: border-box;
        padding-top: 14px;
        padding-bottom: 14px;
        background-color: ${colors.white};
        color: ${colors.grey.grey900};
        border: 1px solid ${colors.grey.grey100};
        border-radius: 4px;
        ${mixinTypography.text.tSmall.textSmallMedium};
        text-align: ${({ inputDirection }) => inputDirection};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: background-color 0.2s ease-in-out;

        ${({ isPlaceholderIcon }) =>
            isPlaceholderIcon &&
            css`
                padding-left: 36px !important;
            `};

        :hover {
            background-color: ${colors.secondary.secondary200};
        }
        :active,
        :focus {
            outline: none;
            border-color: ${colors.primary.primary500};
        }
        ::placeholder {
            color: ${colors.grey.grey400};
        }
        :disabled {
            cursor: not-allowed;
            border-color: ${colors.grey.grey100};
            color: ${colors.grey.grey200};
            background-color: ${colors.grey.grey50};
            ::placeholder {
                color: ${colors.grey.grey200};
            }
        }
        ${({ isError }) =>
            isError &&
            css`
                border-color: ${colors.error.error700};
            `};

        ${calculatePaddings};
        ${({ isPasswordField }) =>
            isPasswordField &&
            css`
                padding-right: 40px;
            `};
    }

    .placeholder-icon-wrapper {
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
        pointer-events: none;
        display: flex;
        align-items: center;
        svg path {
            stroke: ${colors.grey.grey400};
        }
    }

    > span {
        padding-top: 7px;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: 0.01em;
        font-weight: 300;
        color: ${colors.grey.grey400};

        ${({ isDisabled }) =>
            isDisabled &&
            css`
                color: ${colors.grey.grey100};
            `};
        ${({ isError, isWarning }) => {
            if (isError)
                return css`
                    color: ${colors.error.error700};
                `;
            if (isWarning)
                return css`
                    color: ${colors.warning.warning500};
                `;
            return null;
        }};
        ${({ isError, isWarning, isAbsoluteErrorPosition }) =>
            (isError || isWarning) &&
            isAbsoluteErrorPosition &&
            css`
                position: absolute;
                top: 100%;
            `};
    }

    span.counter,
    span.error {
        ${mixinTypography.text.tXs.textXsRegular};
        text-align: right;
        position: static;
    }

    span.counter {
        color: ${colors.grey.grey400};
    }
`;

interface StyledIconsWrapperProps {
    position: 'left' | 'right';
    isDisabled?: boolean;
    isRemovable?: boolean;
}

const checkIconsWrapperPosition = ({ position }: StyledIconsWrapperProps) => {
    if (position === 'left') {
        return css`
            left: 12px;
        `;
    }
    return css`
        right: 12px;
    `;
};
export const StyledIconsWrapper = styled.div<StyledIconsWrapperProps>`
    display: flex;
    align-items: center;
    gap: 8px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${checkIconsWrapperPosition};
    font-size: 16px;
    line-height: 20px;
    font-family: sans-serif;
    pointer-events: none;
    color: ${({ isDisabled }) =>
        !isDisabled ? colors.grey.grey900 : colors.grey.grey200};

    svg {
        min-width: 24px;
        width: 24px;
        height: auto;
        circle {
            fill: ${({ isDisabled }) =>
                !isDisabled ? colors.grey.grey400 : colors.grey.grey200};
        }
        path,
        line {
            stroke: ${({ isDisabled }) =>
                !isDisabled ? colors.grey.grey400 : colors.grey.grey200};
        }
    }

    ${({ isRemovable }) =>
        isRemovable &&
        css`
            z-index: 1;
            pointer-events: all;

            .remove-btn {
                cursor: pointer;
                border: none;
                background-color: transparent;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    min-width: 33px;
                }
            }
        `};

    .loader {
        animation: spin 0.75s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;
