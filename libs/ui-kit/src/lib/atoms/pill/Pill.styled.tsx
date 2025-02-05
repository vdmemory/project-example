import styled from '@emotion/styled';
import { colors, mixinTypography } from '../../styles';
import { css } from '@emotion/react';
import { InputType } from './Pill.component';
import { mediaScreen } from '@breef/shared/assets/variables';

const setIconColor = (color: string) => css`
    svg path,
    svg line {
        stroke: ${color};
    }
`;
const checkedCss = css`
    background-color: ${colors.grey.grey900}!important;
    color: ${colors.beige};
    ${setIconColor(colors.beige)};
`;
const getHoverStateCss = ({ type }: StyledPillProps) =>
    type === 'button' && checkedCss;

interface StyledPillProps {
    type: InputType;
    isUppercase: boolean;
    isStatic: boolean;
    color?: 'orange';
    isResizeMobile?: boolean;
    isLeftIcon?: boolean;
    isRightIcon?: boolean;
    isTransparentInitially?: boolean;
    isDisabled: boolean;
    isChecked: boolean;
}
export const StyledPill = styled.label<StyledPillProps>`
    display: flex;
    width: fit-content;
    max-width: 100%;
    gap: 8px;
    align-items: center;
    border: 1px solid ${colors.grey.grey100};
    border-radius: 100px;
    background-color: ${({ isTransparentInitially }) =>
        isTransparentInitially ? 'transparent' : colors.grey.grey50};
    color: ${colors.grey.grey900};
    padding: 4px 9px;
    cursor: pointer;
    text-transform: ${({ isUppercase }: StyledPillProps) =>
        isUppercase ? 'uppercase' : 'none'};
    ${mixinTypography.text.tSmall.textSmallMedium};
    user-select: none;
    overflow: hidden;

    ${({ isLeftIcon }) =>
        isLeftIcon &&
        css`
            padding-left: 9px;
        `};
    ${({ isRightIcon }) =>
        isRightIcon &&
        css`
            padding-right: 9px;
        `};

    > span {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    ${({ isChecked }) => isChecked && checkedCss};

    @media (hover: hover) {
        :hover {
            ${({ isDisabled }) => !isDisabled && getHoverStateCss};
        }
    }

    ${({ isDisabled }) =>
        isDisabled &&
        css`
            border: 1px solid ${colors.grey.grey300};
            color: ${colors.grey.grey300};
            background-color: transparent !important;
            ${setIconColor(colors.grey.grey300)};
            cursor: not-allowed;
        `};

    ${({ isDisabled, isChecked }) =>
        isDisabled &&
        isChecked &&
        css`
            color: ${colors.beige};
            background-color: ${colors.grey.grey300};
            ${setIconColor(colors.beige)};
        `};

    svg {
        width: 15px;
        min-width: 15px;
        height: auto;
    }

    .plus-icon {
        width: 12px;
        height: 12px;
    }

    input {
        display: none;
    }

    ${({ isStatic, isChecked, isDisabled }: StyledPillProps) =>
        isStatic &&
        css`
            ${
                (isChecked || isDisabled) &&
                css`
                background-color: ${colors.beige};!important;
                color: ${colors.grey.grey900}!important;
                cursor: text;
            `
            };

            @media (hover: hover){
                :hover{
                    background-color: ${colors.beige};!important;
                    cursor: text;
                }
            }
        `};

    ${({ color }) =>
        color === 'orange' &&
        css`
            background-color: #fbf0eb;
            border: 1px solid #e8a885;
            color: #a85528;

            svg path {
                stroke: #a85528;
            }
            @media (hover: hover) {
                :hover {
                    background-color: #fbf0eb !important;
                    border: 1px solid #e8a885;
                    color: #a85528 !important;

                    svg path {
                        stroke: #a85528;
                    }
                }
            }
        `};

    ${({ type, isChecked }) =>
        type === 'radio' &&
        css`
            border-radius: 4px;
            min-width: 40px;
            height: 40px;
            padding: 10px 10px;
            box-sizing: inherit;
            background-color: ${colors.white};
            display: flex;
            justify-content: center;
            ${mixinTypography.label.lLg.labelLgMedium};

            @media (hover: hover) {
                :hover {
                    background-color: ${colors.secondary.secondary200};
                    ${isChecked &&
                    css`
                        background-color: ${colors.grey.grey900};
                    `};
                }
            }
        `};

    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextSm};

        ${({ isResizeMobile }) =>
            isResizeMobile &&
            css`
                padding: 11px 12px;
            `};
    }
`;
