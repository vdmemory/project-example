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
    isDisabled: boolean;
    isChecked: boolean;
}
export const StyledPillOld = styled.label<StyledPillProps>`
    display: flex;
    width: fit-content;
    gap: 8px;
    align-items: center;
    border: 1px solid ${colors.grey.grey900};
    border-radius: 100px;
    background-color: ${colors.beige};
    color: ${colors.grey.grey900};
    padding: 5px 8px;
    cursor: pointer;
    text-transform: ${({ isUppercase }: StyledPillProps) =>
        isUppercase ? 'uppercase' : 'none'};
    ${mixinTypography.text.tMd.textMdMedium};
    user-select: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ isChecked }) => isChecked && checkedCss};

    :hover {
        ${getHoverStateCss};
    }

    ${({ isDisabled }) =>
        isDisabled &&
        css`
            border-color: ${colors.grey.grey300};
            color: ${colors.grey.grey300};
            background-color: transparent;
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

    input {
        display: none;
    }

    ${({ isStatic, isDisabled, isChecked }: StyledPillProps) =>
        isStatic &&
        css`
            ${
                (isDisabled || isChecked) &&
                css`
                background-color: ${colors.beige};!important;
                color: ${colors.grey.grey900}!important;
                cursor: text;
            `
            };
            :hover{
                background-color: ${colors.beige};!important;
                cursor: text;
            }
        `};

    @media screen and (${mediaScreen.tablet}) {
        ${mixinTypography.mobile.text.mobileTextSm};
        padding: 11px 12px;
    }
`;
